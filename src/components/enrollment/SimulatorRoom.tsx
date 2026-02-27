import { useState, useEffect, useRef, useMemo } from "react"; // Añade useEffect aquí
import { supabase } from "@/integrations/supabase/client"; // Esta es vital para conectar con Auth
import { useNavigate } from "react-router-dom";
import { 
  Calculator, ChevronRight, ChevronLeft, 
  Award, Clock, AlertTriangle, ShieldCheck, Video, Play, Timer, LayoutDashboard, Lock, EyeOff, RefreshCw, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { generateOutcomePDF } from "./pdfGenerator";
import { toast } from "sonner";
import { ResourceFeedback } from "@/components/ResourceFeedback";

const LatexText = ({ text }: { text: string }) => {
  if (!text) return null;
  const parts = text.split(/(\$.*?\$)/g);
  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          const content = part.slice(1, -1).replace(/\\\\/g, '\\');
          return <InlineMath key={i} math={content} />;
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
};
// ==========================================
// DATA IMPORTS (Maths, Physics, Engineering)
// ==========================================
import mathsData from "./data/mathsData.json";
import physicsData from "./data/physicsData.json";
import engineeringData from "./data/engineeringData.json";

export const SimulatorRoom = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // ------------------------------------------
  // 1. CORE STATES
  // ------------------------------------------
  const [view, setView] = useState<"intro" | "exam" | "results">("intro"); 
  const [activeBlockId, setActiveBlockId] = useState<"maths" | "physics" | "engineering">("maths");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(5400); // 90 Minutes Total
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [calcDisplay, setCalcDisplay] = useState("0");
  const [currentUser, setCurrentUser] = useState({ name: "Candidato Delft", email: "aspirante@delft.nl" });
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      // 1. Obtenemos el ID del usuario logueado
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // 2. Consultamos la tabla 'profiles' buscando el nombre real
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('first_name')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) console.error("Error cargando perfil:", error);

        // 3. Actualizamos el estado con lo que encontremos
        const nameFound = profile?.first_name || user.user_metadata?.first_name || user.email?.split('@')[0] || "Estudiante";
        console.log("DEBUG - Nombre encontrado:", nameFound);

        setCurrentUser({
          name: nameFound,
          email: user.email || ""
        });
      }
    };
    getUserData();
  }, []);

  // ------------------------------------------
  // 2. DIAGNOSTIC & SECURITY METRICS
  // ------------------------------------------
  const [timeSpent, setTimeSpent] = useState<Record<string, number>>({ 
    maths: 0, 
    physics: 0, 
    engineering: 0 
  });
  
  // INSERCIÓN 1: Estado para medir tiempo por cada pregunta individual
  const [questionTimers, setQuestionTimers] = useState<Record<string, number>>({});
  
  const [warnings, setWarnings] = useState(0);
  const [showWarningModal, setShowWarningModal] = useState(false);

  // ------------------------------------------
  // 3. SHUFFLE LOGIC (Stable & Full Version)
  // ------------------------------------------
  const shuffledBlocks = useMemo(() => {
    const shuffleArray = (array: any[]) => {
      const newArr = [...array];
      for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
      }
      return newArr;
    };

    const processQuestion = (q: any) => {
      const options = [...q.options];
      const correctText = options[['A', 'B', 'C', 'D'].indexOf(q.correct)];
      const shuffledOptions = shuffleArray(options);
      const newCorrectLetter = ['A', 'B', 'C', 'D'][shuffledOptions.indexOf(correctText)];
      return { 
        ...q, 
        options: shuffledOptions, 
        correct: newCorrectLetter 
      };
    };

    return [
      { 
        id: "maths", 
        name: "Mathematics", 
        data: shuffleArray(mathsData).slice(0, 20).map(processQuestion) 
      },
      { 
        id: "physics", 
        name: "Physics", 
        data: shuffleArray(physicsData).slice(0, 20).map(processQuestion) 
      }, 
      { 
        id: "engineering", 
        name: "Engineering Fund.", 
        data: shuffleArray(engineeringData).slice(0, 30).map(processQuestion) 
      }
    ];
  }, []);

  const currentBlock = shuffledBlocks.find(b => b.id === activeBlockId)!;
  const currentBlockIdx = shuffledBlocks.findIndex(b => b.id === activeBlockId);
  const currentQuestion = currentBlock.data[currentIdx] as any;

  // ------------------------------------------
  // 4. PROCTORING & VISIBILITY SYSTEM
  // ------------------------------------------
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && view === "exam") {
        setWarnings(prev => prev + 1);
        setShowWarningModal(true);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [view]);

  // ------------------------------------------
  // 5. SMART TIMER (REVISADO: Tracking por Bloque y Pregunta)
  // ------------------------------------------
  useEffect(() => {
    if (view === "exam") {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer); // Detenemos el intervalo internamente
            if (prev === 1) handleAutoStop(); // Disparamos el aviso justo al llegar a 0
            return 0;
          }
          return prev - 1;
        });
        
        // Tiempo por bloque general
        setTimeSpent(prev => ({ 
          ...prev, 
          [activeBlockId]: (prev[activeBlockId] || 0) + 1 
        }));

        // INSERCIÓN 2: Tiempo acumulado en la pregunta específica
        const qKey = `${activeBlockId}_${currentQuestion.id}`;
        setQuestionTimers(prev => ({
          ...prev,
          [qKey]: (prev[qKey] || 0) + 1
        }));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [view, activeBlockId, currentQuestion, timeLeft]); // Aseguramos dependencias para evitar cierres de scope
  

  // ------------------------------------------
  // 6. CAMERA STREAM (Live Proctoring)
  // ------------------------------------------
  useEffect(() => {
    if (view === "exam" && videoRef.current && !videoRef.current.srcObject) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => { 
          if (videoRef.current) videoRef.current.srcObject = stream; 
        })
        .catch(err => {
          console.error("Camera access error:", err);
        });
    }
  }, [view]);

  // ------------------------------------------
  // 7. SCIENTIFIC CALCULATOR ENGINE
  // ------------------------------------------
  const handleCalc = (k: string) => {
    if (k === 'C') {
      setCalcDisplay('0');
    } else if (k === '=') {
      try {
        const cleanExpr = calcDisplay
          .replace(/π/g, 'Math.PI')
          .replace(/\^/g, '**')
          .replace(/sin\(/g, 'Math.sin(')
          .replace(/cos\(/g, 'Math.cos(')
          .replace(/√\(/g, 'Math.sqrt(');
        
        const result = new Function(`return ${cleanExpr}`)();
        setCalcDisplay(
          Number.isFinite(result) 
            ? (Number.isInteger(result) ? result.toString() : result.toFixed(3)) 
            : "Error"
        );
      } catch (e) {
        setCalcDisplay("Error");
      }
    } else {
      setCalcDisplay(prev => prev === '0' ? k : prev + k);
    }
  };

  // ------------------------------------------
  // INSERCIÓN 3: Función de recopilación para el PDF
  // ------------------------------------------
  const handleGenerateReport = () => {
    const userInfo = {
      name: "Candidato Delft", // Esto lo haremos dinámico después
      email: "aspirante@delft.nl",
      date: new Date().toLocaleString()
    };

    // Llamamos al "especialista" externo
    generateOutcomePDF(shuffledBlocks, selectedAnswers, questionTimers, userInfo);
  };
  
  // ------------------------------------------
  // 8. NAVIGATION & SUBMISSION LOGIC
  // ------------------------------------------
  const handleAutoStop = () => {
    const totalQuestions = 70;
    const answeredCount = Object.keys(selectedAnswers).length;
    const pending = totalQuestions - answeredCount;

    const confirmContinue = window.confirm(
      `TIME EXPIRED\n\n` +
      `The 90-minute limit for this test has been reached. Your current progress has been recorded for the official metrics.\n\n` +
      `You have ${pending} unanswered questions. Would you like to continue to assess your knowledge for the final report? \n\n` +
      `(Note: Further answers will be included in the diagnostic feedback but will not be counted towards your official test score).`
    );

    if (!confirmContinue) {
      setView("results");
    } else {
      console.log("Practice mode activated after time limit.");
    }
  };
  
  const handleFinishAttempt = () => {
    const totalQuestions = 70;
    const answeredCount = Object.keys(selectedAnswers).length;
    const pending = totalQuestions - answeredCount;

    let confirmMsg = "Do you want to submit your final answers?";
    if (pending > 0) {
      confirmMsg = `Wait! You have ${pending} unanswered questions. \n\nDELFT ADVICE: No negative marking. It is better to guess than leave blanks. \n\nSubmit anyway?`;
    }

    if (window.confirm(confirmMsg)) {
      setView("results");
    }
  };

  const handleBlockChange = (targetIdx: number) => {
    if (targetIdx <= currentBlockIdx) return;
    
    const answeredInBlock = currentBlock.data.filter((q: any) => selectedAnswers[q.id]).length;
    const missed = currentBlock.data.length - answeredInBlock;
    
    const blockMsg = `Switching to ${shuffledBlocks[targetIdx].name}. \n\nYou have ${missed} unanswered questions in this block. \n\nREMEMBER: You cannot come back to this section later. Proceed?`;
    
    if (window.confirm(blockMsg)) {
      setActiveBlockId(shuffledBlocks[targetIdx].id as any);
      setCurrentIdx(0);
    }
  };

// --- SISTEMA DE FEEDBACK AUTOMÁTICO ---
useEffect(() => {
  if (view === "results") {
    const today = new Date().toISOString().split('T')[0];
    const lastVote = localStorage.getItem('lastFeedback_simulator');

    if (lastVote !== today) {
      const timer = setTimeout(() => {
        toast.custom((t) => (
          <div className="bg-white border-2 border-slate-100 shadow-2xl rounded-[32px] p-6 w-[350px] animate-in slide-in-from-right-5 duration-500">
            <ResourceFeedback 
              resourceId="ADMISSION_SIMULATOR_V3" 
              programmeId="bsc-aerospace" 
              category="simulator" 
            />
          </div>
        ), { duration: 20000, position: 'bottom-right' });
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }
}, [view]);

  // ------------------------------------------
  // 9. VISTA INTRODUCCIÓN
  // ------------------------------------------
  if (view === "intro") {
    return (
      <div className="fixed inset-0 bg-slate-50 z-[10000] flex items-center justify-center p-4 font-sans">
        <div className="max-w-5xl w-full bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-10 space-y-8">
              <div className="flex items-center gap-3 bg-orange-50 text-orange-600 px-4 py-2 rounded-2xl w-fit border border-orange-100">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-widest italic">Official Training Module</span>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-5xl font-black italic uppercase text-slate-900 leading-[0.85] tracking-tighter">
                  TU DELFT <br />
                  <span className="text-orange-600">ADMISSION TEST</span>
                </h2>
                <p className="text-slate-500 font-bold text-lg italic leading-tight">
                  Simulator V2.0 — Academic Year 2026/27
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="text-slate-900 font-black uppercase text-xs flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4 text-orange-600" /> Exam Structure
                  </h4>
                  <ul className="text-[11px] text-slate-500 font-bold italic space-y-1">
                    <li>• Mathematics (20 Questions)</li>
                    <li>• Physics (20 Questions)</li>
                    <li>• Engineering Fund. (30 Questions)</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="text-slate-900 font-black uppercase text-xs flex items-center gap-2">
                    <Award className="w-4 h-4 text-orange-600" /> Strategy Tips
                  </h4>
                  <ul className="text-[11px] text-slate-500 font-bold italic space-y-1">
                    <li>• No negative marking: GUESS EVERYTHING.</li>
                    <li>• No backtracking: Check before switching.</li>
                    <li>• 90 min total: Manage your block time.</li>
                  </ul>
                </div>
              </div>

              <div className="p-6 bg-slate-900 rounded-[2rem] border border-slate-800">
                <p className="text-white text-xs font-bold italic leading-relaxed">
                  "This is not just a math test; it's a test of how you perform under pressure. 
                  Manage the calculator, watch the clock, and don't leave a single question empty."
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50 p-10 flex flex-col justify-center items-center text-center space-y-8 border-l border-slate-100">
              <div className="space-y-2">
                <div className="bg-white p-6 rounded-full shadow-xl mb-4 inline-block border-2 border-orange-100">
                  <Timer className="w-12 h-12 text-slate-900 animate-pulse" />
                </div>
                <p className="text-3xl font-black italic text-slate-900 uppercase">90:00</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Time Available</p>
              </div>

              <Button 
                onClick={() => setView("exam")} 
                className="w-full h-20 bg-slate-900 hover:bg-orange-600 text-white rounded-[1.5rem] font-black uppercase italic text-xl shadow-2xl transition-all group"
              >
                Start Simulation
                <Play className="ml-3 w-6 h-6 fill-current group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <p className="text-[9px] text-slate-400 font-bold uppercase italic px-10">
                By clicking start, you agree to the proctoring rules. Camera and window monitoring will be activated.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------------------
  // 10. RESULTS & FULL DIAGNOSTIC SCREEN (VERSIÓN FINAL PRO)
  // ------------------------------------------
  if (view === "results") {
    const currentUser = (window as any).currentUser || { name: "Candidato Delft", email: "aspirante@delft.nl" };

    const scores: Record<string, number> = { maths: 0, physics: 0, engineering: 0, total: 0 };
    shuffledBlocks.forEach(b => {
      b.data.forEach(q => {
        if (selectedAnswers[q.id] === q.correct) {
          scores[b.id]++;
          scores.total++;
        }
      });
    });

    const pending = 70 - Object.keys(selectedAnswers).length;
    const totalTimeMins = Math.floor(Object.values(questionTimers).reduce((a, b) => a + b, 0) / 60);
    const totalAccuracy = Math.round((scores.total / 70) * 100);

    // Identificación de bloques fuertes y débiles
    const strongBlocks = shuffledBlocks
      .filter(b => (scores[b.id] / b.data.length) >= 0.7)
      .map(b => b.name);
    const weakBlocks = shuffledBlocks
      .filter(b => (scores[b.id] / b.data.length) < 0.5)
      .map(b => b.name);

    const formatList = (list: string[]) => {
      if (list.length === 0) return "none";
      if (list.length === 1) return list[0];
      return list.slice(0, -1).join(", ") + " and " + list.slice(-1);
    };

    const pacingStatus = totalTimeMins > 90 ? "improvable due to overtime" : "optimal";

    return (
      <div className="fixed inset-0 bg-slate-50 z-[10000] overflow-y-auto font-sans">
        <div className="w-full max-w-4xl mx-auto my-4 px-2">
          
          <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden">
            
            {/* Cabecera */}
            <div className="p-4 text-center border-b border-slate-50 bg-white">
              <Award className="w-8 h-8 text-orange-600 mx-auto mb-1" />
              <h2 className="text-xl font-black italic uppercase text-slate-900 tracking-tighter">Training Outcome</h2>
              <div className="flex justify-center items-baseline gap-2">
                <span className="text-5xl font-black text-slate-900">{totalAccuracy}%</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase italic">Global Accuracy ({scores.total}/70)</span>
              </div>
            </div>

            {/* Grid de bloques */}
            <div className="p-3 grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-50/50">
              {shuffledBlocks.map(b => (
                <div key={b.id} className="bg-white py-3 px-4 rounded-[1.2rem] border shadow-sm text-center">
                  <h4 className="text-[8px] font-black uppercase text-orange-600 mb-0.5">{b.name}</h4>
                  <p className="text-xl font-black leading-none">{Math.round((scores[b.id] / b.data.length) * 100)}%</p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase mt-1">
                    {scores[b.id]} / {b.data.length} OK
                  </p>
                </div>
              ))}
            </div>

            {/* Sección de Coaching (Caja Oscura Pro) */}
            <div className="px-6 py-4 space-y-3 bg-white">
              <div className="bg-slate-900 text-white p-6 rounded-[1.5rem] border border-slate-800 shadow-inner">
                <h3 className="text-orange-500 font-black uppercase text-[9px] mb-4 flex items-center gap-2 italic tracking-widest">
                  <Clock className="w-3 h-3" /> Strategic Diagnostic
                </h3>
                
                <div className="text-[11px] space-y-4 text-slate-300 italic leading-relaxed">
                  <p>
                    Your overall accuracy stands at <span className="text-white font-bold not-italic">{totalAccuracy}%</span>. 
                    Based on your performance, you should prioritize reinforcing <span className="text-orange-400 font-bold not-italic">{formatList(weakBlocks)}</span>, 
                    as these areas currently fall below the competitive threshold. Conversely, you demonstrated a strong command of <span className="text-green-400 font-bold not-italic">{formatList(strongBlocks)}</span>.
                  </p>

                  <p>
                    Your time management was <span className="text-white font-bold not-italic">{pacingStatus}</span>. 
                    You completed the test in <span className="text-white font-bold not-italic">{totalTimeMins} minutes</span>, 
                    leaving <span className="text-white font-bold not-italic">{pending} questions</span> unanswered. 
                    Remember for your next attempt: TU Delft does not penalize wrong answers. It is strategically vital to guess every single question rather than leaving blanks.
                  </p>

                  <p>
                    Proctoring alerts: <span className="text-orange-500 font-bold not-italic">{warnings}</span>. 
                    This metric tracks focus changes or unauthorized window switching. Maintaining strict focus is essential, 
                    as more than 3 alerts typically trigger a manual review or disqualification in the official selection process.
                  </p>
                </div>
              </div>

              {/* Botonera */}
              <div className="flex gap-2 pb-2">
                <Button 
                  onClick={() => navigate("/")} 
                  className="flex-1 h-11 bg-slate-100 text-slate-600 rounded-xl font-black uppercase text-[10px] gap-2 hover:bg-slate-200"
                >
                  <LayoutDashboard className="w-4 h-4"/> Exit to Dashboard
                </Button>
                
                <Button 
                  onClick={() => window.location.reload()} 
                  className="flex-1 h-11 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] gap-2 shadow-lg"
                >
                  <RefreshCw className="w-4 h-4"/> Retake
                </Button>

                <Button 
                  onClick={() => {
                    const pdfUser = {
                      name: currentUser.name && currentUser.name !== "Candidato Delft" ? currentUser.name : "studentalldocs",
                      email: currentUser.email || "studentalldocs@gmail.com"
                    };
                    toast.dismiss();
                    generateOutcomePDF(shuffledBlocks, selectedAnswers, questionTimers, pdfUser, warnings);
                  }}
                  className="flex-1 h-11 bg-orange-600 text-white rounded-xl font-black uppercase text-[10px] gap-2 shadow-xl shadow-orange-100 hover:bg-orange-700 transition-colors"
                >
                  <FileText className="w-4 h-4"/> Export Audit PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------------------
  // 11. MAIN EXAM INTERFACE (GRID 2x2 + NAVIGATION)
  // ------------------------------------------
  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col font-sans overflow-hidden">
      
      {/* PROCTORING ALERT MODAL */}
      {showWarningModal && (
        <div className="fixed inset-0 bg-slate-900/95 z-[10001] flex items-center justify-center p-6 backdrop-blur-xl">
          <div className="max-w-xs w-full bg-white rounded-[2.5rem] p-8 text-center border-4 border-red-600 shadow-2xl">
            <EyeOff className="w-10 h-10 text-red-600 mx-auto mb-4" />
            <p className="text-slate-600 text-[10px] font-bold italic mb-6">
              SECURITY BREACH: Window switch detected. Your ID has been flagged. (Warnings: {warnings})
            </p>
            <Button onClick={() => setShowWarningModal(false)} className="w-full h-12 bg-red-600 text-white rounded-xl font-black uppercase text-[10px] italic">Return to Exam</Button>
          </div>
        </div>
      )}

      {/* HEADER SECTION */}
      <header className="bg-white border-b px-6 py-2 flex justify-between items-center shrink-0">
        <div className="flex gap-2">
          {shuffledBlocks.map((b, i) => (
            <button 
              key={b.id} 
              onClick={() => { if (i > currentBlockIdx) handleBlockChange(i); }} 
              disabled={i < currentBlockIdx} 
              className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase border-2 transition-all ${activeBlockId === b.id ? 'bg-slate-900 border-slate-900 text-white shadow-md scale-105' : 'bg-slate-50 border-transparent text-slate-400 opacity-60'}`}
            >
              {b.name}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          {/* SECTION ALERT */}
          {timeSpent[activeBlockId] > 1800 && (
            <span className="text-red-600 font-black text-[9px] uppercase animate-pulse flex items-center gap-1">
              <AlertTriangle className="w-4 h-4"/> Section Overtime!
            </span>
          )}
          {/* GLOBAL TIMER */}
          <div 
            className={`font-mono font-bold text-2xl px-4 py-1.5 rounded-xl bg-white border-2 transition-all duration-500 ${timeLeft === 0 ? 'text-red-700 border-red-600 bg-red-50 scale-110' : timeLeft < 600 ? 'text-red-600 border-red-200 animate-pulse' : timeLeft < 1800 ? 'text-orange-500 border-orange-100' : 'text-slate-900 border-slate-200'}`}
            style={{ letterSpacing: '0.15em', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
          >
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow flex p-4 gap-4 overflow-hidden bg-slate-50/40">
        
        {/* LEFT COLUMN: QUESTIONS & GRID */}
        <div className="flex-[5] flex flex-col gap-3 min-w-0">
          <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-slate-100 flex flex-col overflow-hidden relative">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-orange-600 font-black text-[10px] uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full border border-orange-100 italic">
                {currentBlock.name} — Question {currentIdx + 1} of {currentBlock.data.length}
              </span>
            </div>
            
            <div className="flex-grow overflow-y-auto pr-4 mb-4 no-scrollbar">
              <h3 className="text-lg font-black text-slate-900 mb-6 italic uppercase tracking-tight leading-tight">
              <LatexText text={currentQuestion.q} />
              </h3>

              {/* ANSWERS: 2x2 GRID RESTORED */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentQuestion.options.map((opt: string, i: number) => {
                  const letter = ['A', 'B', 'C', 'D'][i];
                  const isSel = selectedAnswers[currentQuestion.id] === letter;
                  return (
                    <button 
                      key={letter} 
                      onClick={() => setSelectedAnswers({...selectedAnswers, [currentQuestion.id]: letter})} 
                      className={`w-full p-4 border-2 rounded-2xl text-left flex items-center gap-4 transition-all ${isSel ? 'border-orange-500 bg-orange-50 shadow-inner' : 'border-slate-100 bg-white hover:border-orange-200'}`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black ${isSel ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        {letter}
                      </div>
                      <span className="text-[10px] font-bold text-slate-700 leading-snug"><LatexText text={opt} /></span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <div className="flex gap-2">
                <Button variant="outline" className="h-10 px-6 rounded-xl text-[10px] font-black uppercase" onClick={() => setCurrentIdx(v => Math.max(0, v - 1))}>
                  <ChevronLeft className="w-4 h-4 mr-1"/> Prev
                </Button>
                <Button className="h-10 px-8 bg-orange-600 text-white rounded-xl text-[10px] font-black uppercase italic" onClick={() => { 
                  if (currentIdx < currentBlock.data.length - 1) setCurrentIdx(v => v + 1); 
                  else if (currentBlockIdx < 2) handleBlockChange(currentBlockIdx + 1); 
                }}>
                  Next Question <ChevronRight className="ml-2 w-4 h-4"/>
                </Button>
              </div>
              <Button onClick={handleFinishAttempt} className="h-10 px-6 bg-red-50 text-red-600 rounded-xl text-[10px] font-black uppercase border-2 border-transparent hover:bg-red-600 hover:text-white transition-all">
                Finish Attempt
              </Button>
            </div>
          </div>

          {/* QUESTION NAVIGATION BAR (30 SQUARES VISIBLE) */}
          <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100 flex gap-1 overflow-x-auto justify-center shrink-0 no-scrollbar">
            {currentBlock.data.map((q: any, i: number) => (
              <button 
                key={i} 
                onClick={() => setCurrentIdx(i)} 
                className={`w-7 h-7 shrink-0 rounded-lg text-[10px] font-black transition-all ${currentIdx === i ? 'bg-orange-600 text-white shadow-md' : selectedAnswers[q.id] ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: TOOLS & PROCTORING */}
        <aside className="flex-1 max-w-[210px] flex flex-col gap-4">
          {/* CAMERA FEED */}
          <div className="bg-slate-900 rounded-[2rem] aspect-video relative border-2 border-white shadow-2xl overflow-hidden shrink-0">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover grayscale brightness-75" />
            <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-red-600 px-2 py-0.5 rounded-full animate-pulse">
               <div className="w-1 h-1 bg-white rounded-full"/><span className="text-[7px] font-black text-white uppercase tracking-tighter">Live Monitor</span>
            </div>
          </div>
          
          {/* CALCULATOR TOOL */}
          <Button onClick={() => setIsCalcOpen(!isCalcOpen)} className="w-full h-12 rounded-2xl bg-white border-2 border-slate-200 text-slate-900 font-black uppercase text-[9px] gap-2 shadow-md hover:border-orange-200 transition-all italic">
            <Calculator className="w-4 h-4 text-orange-600" /> Utility: Calculator
          </Button>

          {isCalcOpen && (
            <div className="bg-[#1a1c1e] border-2 border-slate-700 rounded-[2rem] p-3 shadow-2xl animate-in slide-in-from-top-4 duration-300">
              <div className="bg-black/40 rounded-xl p-2 mb-2 text-right text-orange-500 font-mono text-[10px] border-2 border-slate-800 overflow-hidden truncate">
                {calcDisplay}
              </div>

              {/* BETA WARNING BANNER */}
              <div className="bg-orange-900/30 border border-orange-500/50 rounded-lg p-2 mb-2 text-center">
                <p className="text-[8px] leading-tight font-bold text-orange-200 uppercase italic">
                  BETA: Use a physical calculator for 100% precision
                </p>
              </div>

              <div className="grid grid-cols-4 gap-1">
                {['sin(', 'cos(', '√(', '^', '(', ')', 'π', '/', '7','8','9','*', '4','5','6','-', '1','2','3','+', 'C','0','=','.'].map(k => (
                  <button 
                    key={k} 
                    onClick={() => handleCalc(k)} 
                    className={`h-7 rounded-lg ${['sin(','cos(','√(', '^','π'].includes(k) ? 'bg-slate-700 text-orange-300' : 'bg-slate-800 text-slate-300'} text-[9px] font-bold hover:bg-slate-600 active:scale-90 transition-all`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PROCTORING FOOTER */}
          <div className="p-4 bg-slate-900 rounded-[2rem] mt-auto border-2 border-slate-800 text-center shadow-xl">
             <div className="flex items-center justify-center gap-2 mb-2">
               <Lock className="w-4 h-4 text-orange-600" />
               <p className="text-[8px] text-slate-400 uppercase font-black tracking-widest leading-none">Safe Proctor</p>
             </div>
             <p className="text-[7px] text-slate-500 uppercase italic font-bold leading-tight">
               Identity verified via biometric analysis.
             </p>
          </div>
        </aside>
      </main>
    </div>
  );
};