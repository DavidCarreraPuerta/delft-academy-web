import { useState, useEffect, useRef } from "react";
import { 
  Calculator, AlertCircle, ChevronRight, ChevronLeft, BookOpen, 
  Play, Award, LayoutDashboard, ShieldAlert, Infinity, CheckCircle2 
} from "lucide-react";
import { Button } from "@/components/ui/button";

// --- BANCO DE DATOS ---
const EXAM_DATA = {
  maths: Array.from({ length: 25 }, (_, i) => ({
    id: `m-${i}`,
    q: `[Mathematics Block] Question ${i + 1}: Solve the technical problem using the engineering prep module standards. Layout optimized for standard view.`,
    options: ["Option A: Linear calculation", "Option B: Differential analysis", "Option C: Statistical approximation", "Option D: None of the above"],
    correct: "A"
  })),
  physics: Array.from({ length: 20 }, (_, i) => ({
    id: `p-${i}`,
    q: `[Physics Block] Question ${i + 1}: Calculate the resultant force for the given physical system using standard engineering constants.`,
    options: ["15.5 Newtons", "22.0 Newtons", "9.8 Newtons", "0.0 Newtons"],
    correct: "B"
  })),
  engineering: Array.from({ length: 20 }, (_, i) => ({
    id: `e-${i}`,
    q: `[Engineering Fund.] Question ${i + 1}: Identify the correct material property or principle for this specific structural application.`,
    options: ["Grade A Steel", "Reinforced Carbon Fiber", "Titanium Alloy", "Industrial Polymer"],
    correct: "C"
  }))
};

export const SimulatorRoom = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [view, setView] = useState<"onboarding" | "exam" | "results">("onboarding");
  const [activeBlockId, setActiveBlockId] = useState<"maths" | "physics" | "engineering">("maths");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(5400); 
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [calcDisplay, setCalcDisplay] = useState("0");

  const blocks = [
    { id: "maths", name: "Mathematics", data: EXAM_DATA.maths },
    { id: "physics", name: "Physics", data: EXAM_DATA.physics },
    { id: "engineering", name: "Engineering Fund.", data: EXAM_DATA.engineering }
  ];

  const currentBlock = blocks.find(b => b.id === activeBlockId)!;
  const currentBlockIdx = blocks.findIndex(b => b.id === activeBlockId);

  const getUnansweredCount = (blockId: string) => {
    const answeredInBlock = Object.keys(selectedAnswers).filter(key => key.startsWith(blockId)).length;
    return EXAM_DATA[blockId as keyof typeof EXAM_DATA].length - answeredInBlock;
  };

  useEffect(() => {
    if (view === "exam") {
      const timer = setInterval(() => setTimeLeft(prev => (prev > 0 ? prev - 1 : 0)), 1000);
      return () => clearInterval(timer);
    }
  }, [view]);

  useEffect(() => {
    if (view === "exam" && videoRef.current && !videoRef.current.srcObject) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => { if (videoRef.current) videoRef.current.srcObject = stream; })
        .catch(() => console.log("Camera access restricted"));
    }
  }, [view]);

  const handleBlockChange = (targetIdx: number) => {
    if (targetIdx <= currentBlockIdx) return;
    const missed = getUnansweredCount(activeBlockId);
    if (window.confirm(`Switch to ${blocks[targetIdx].name}? You have ${missed} unanswered questions. You cannot return.`)) {
      setActiveBlockId(blocks[targetIdx].id as any);
      setCurrentIdx(0);
    }
  };

  const exitSimulator = () => {
    window.location.replace("/bsc-admissions");
  };

  if (view === "onboarding") {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center p-6 z-[9999]">
        <div className="max-w-3xl w-full text-center">
          <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-orange-600 shadow-sm"><BookOpen className="w-8 h-8" /></div>
          <h2 className="text-3xl font-black italic uppercase mb-2 leading-none tracking-tighter">Entrance Exam Simulator</h2>
          <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.3em] mb-10">Technical Entrance Preparation Environment</p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-10 text-left">
            {/* ALERT SECTION */}
            <div className="p-7 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-4 shadow-sm">
              <h4 className="font-black text-[11px] uppercase italic text-orange-600 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" /> Proctoring Protocol
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase italic">
                  <CheckCircle2 className="w-4 h-4 text-orange-400" /> Webcam monitoring enabled
                </li>
                <li className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase italic">
                  <CheckCircle2 className="w-4 h-4 text-orange-400" /> Full-screen mode is mandatory
                </li>
                <li className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase italic">
                  <CheckCircle2 className="w-4 h-4 text-orange-400" /> Tab switching is strictly forbidden
                </li>
              </ul>
            </div>
            
            {/* TIPS SECTION */}
            <div className="p-7 bg-orange-50/40 rounded-[2.5rem] border border-orange-100 space-y-4 shadow-sm">
              <h4 className="font-black text-[11px] uppercase italic text-orange-600 flex items-center gap-2">
                <Infinity className="w-4 h-4" /> Exam Guidelines
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase italic">
                  <CheckCircle2 className="w-4 h-4 text-orange-400" /> No penalty for incorrect answers
                </li>
                <li className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase italic">
                  <CheckCircle2 className="w-4 h-4 text-orange-400" /> Sequential blocks (no backtracking)
                </li>
                <li className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase italic">
                  <CheckCircle2 className="w-4 h-4 text-orange-400" /> Integrated scientific calculator
                </li>
              </ul>
            </div>
          </div>
          
          <Button onClick={() => setView("exam")} className="w-full h-20 bg-orange-600 hover:bg-slate-900 text-white rounded-[2rem] text-2xl font-black uppercase italic shadow-2xl transition-all">
            Start Exam Session <Play className="w-8 h-8 ml-4 fill-current" />
          </Button>
        </div>
      </div>
    );
  }
  if (view === "results") {
    const totalDone = Object.keys(selectedAnswers).length;
    const score = Math.round((totalDone / 65) * 100);
    return (
      <div className="fixed inset-0 bg-slate-50 flex items-center justify-center p-4 z-[10000]">
        <div className="bg-white rounded-[2.5rem] p-8 max-w-2xl w-full shadow-2xl border border-slate-100 text-center">
          <Award className="w-12 h-12 text-orange-600 mx-auto mb-4" />
          <h2 className="text-3xl font-black italic uppercase mb-2">Simulation Report</h2>
          <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest mb-6">Final Performance Review</p>
          <div className="grid grid-cols-4 gap-3 mb-6 font-black uppercase">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100"><div className="text-2xl text-green-600">10</div><div className="text-[7px] text-slate-400">Correct</div></div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100"><div className="text-2xl text-slate-900">{score}%</div><div className="text-[7px] text-slate-400">Score</div></div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100"><div className="text-2xl text-orange-600">{totalDone}</div><div className="text-[7px] text-slate-400">Done</div></div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100"><div className="text-2xl text-slate-900">20m</div><div className="text-[7px] text-slate-400">Time</div></div>
          </div>
          <div className="mb-6 p-5 bg-green-50 rounded-2xl border border-green-100">
            <p className="text-[10px] font-black text-green-700 uppercase italic">"Great effort! You are mastering the technical blocks. Keep analyzing your weak spots."</p>
          </div>
          <Button onClick={exitSimulator} className="w-full h-16 bg-slate-900 hover:bg-orange-600 text-white rounded-2xl text-lg font-black uppercase italic gap-4 shadow-xl">Exit to Dashboard <LayoutDashboard className="w-5 h-5" /></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col overflow-hidden font-sans">
      <header className="bg-white border-b px-6 py-2 flex justify-between items-center shrink-0">
        <div className="flex gap-2">
          {blocks.map((b, i) => (
            <button key={b.id} onClick={() => handleBlockChange(i)} disabled={i < currentBlockIdx} className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase border transition-all ${activeBlockId === b.id ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400'}`}>{b.name}</button>
          ))}
        </div>
        <div className="font-mono font-bold text-lg bg-slate-50 px-4 py-1.5 rounded-lg border border-slate-100 text-slate-900 tracking-tighter">
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
      </header>

      <main className="flex-grow flex p-4 gap-4 overflow-hidden bg-slate-50/20">
        <div className="flex-[5] flex flex-col gap-3 min-w-0">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-lg border border-slate-100 flex flex-col overflow-hidden relative">
            <span className="text-orange-600 font-black text-[9px] uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-100 mb-4 w-fit">{currentBlock.name} — Q{currentIdx + 1} / {currentBlock.data.length}</span>
            <div className="flex-grow overflow-y-auto pr-2 mb-6 no-scrollbar">
              <h3 className="text-base font-black text-slate-900 mb-6 italic uppercase tracking-tight leading-tight">{currentBlock.data[currentIdx].q}</h3>
              <div className="grid grid-cols-2 gap-3">
                {currentBlock.data[currentIdx].options.map((opt, i) => {
                  const letter = ['A', 'B', 'C', 'D'][i];
                  const isSel = selectedAnswers[`${activeBlockId}-${currentIdx}`] === letter;
                  return (
                    <button key={letter} onClick={() => setSelectedAnswers({...selectedAnswers, [`${activeBlockId}-${currentIdx}`]: letter})}
                      className={`w-full p-4 border-2 rounded-xl text-left flex items-center gap-3 transition-all ${isSel ? 'border-orange-500 bg-orange-50' : 'border-slate-50 hover:border-orange-100'}`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black ${isSel ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-400'}`}>{letter}</div>
                      <span className="text-[10px] font-bold text-slate-700 leading-tight">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-slate-50 shrink-0">
              <div className="flex gap-2">
                <Button variant="outline" className="h-10 px-6 rounded-xl text-[9px] font-black uppercase" onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}><ChevronLeft className="w-3 h-3 mr-2" /> Prev</Button>
                <Button className="h-10 px-8 bg-orange-600 text-white rounded-xl text-[9px] font-black uppercase italic shadow-md" onClick={() => { if (currentIdx < currentBlock.data.length - 1) setCurrentIdx(prev => prev + 1); else if (currentBlockIdx < blocks.length - 1) handleBlockChange(currentBlockIdx + 1); }}>{currentIdx === currentBlock.data.length - 1 ? "Next Block" : "Next Q"} <ChevronRight className="w-3 h-3 ml-2" /></Button>
              </div>
              <Button onClick={() => { if(window.confirm(`Submit exam? You have ${getUnansweredCount(activeBlockId)} unanswered questions.`)) setView("results"); }} className="h-10 px-6 bg-red-50 text-red-600 rounded-xl text-[9px] font-black uppercase">Finish</Button>
            </div>
          </div>
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 flex gap-1 overflow-x-auto justify-center shrink-0 no-scrollbar">
            {currentBlock.data.map((_, i) => (
              <button key={i} onClick={() => setCurrentIdx(i)} className={`min-w-[28px] h-7 rounded-lg text-[9px] font-black transition-all ${currentIdx === i ? 'bg-orange-600 text-white shadow-md' : selectedAnswers[`${activeBlockId}-${i}`] ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400'}`}>{i + 1}</button>
            ))}
          </div>
        </div>
        <aside className="flex-1 max-w-[200px] flex flex-col gap-4">
          <div className="bg-slate-900 rounded-[2rem] aspect-video relative border-2 border-white shadow-xl overflow-hidden shrink-0">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover grayscale brightness-75" />
            <div className="absolute top-2 right-2 bg-red-600 text-[7px] font-black text-white px-2 py-0.5 rounded-full animate-pulse uppercase">Live</div>
          </div>
          <Button onClick={() => setIsCalcOpen(!isCalcOpen)} className="w-full h-12 rounded-xl bg-white border border-slate-200 text-slate-900 font-black uppercase text-[9px] gap-2 shadow-sm transition-all hover:bg-slate-50"><Calculator className="w-4 h-4 text-orange-600" /> Calculator</Button>
          {isCalcOpen && (
            <div className="bg-[#1a1c1e] border border-slate-700 rounded-2xl p-3 shadow-2xl shrink-0">
              <div className="bg-black/40 rounded-lg p-2 mb-2 text-right text-orange-500 font-mono text-sm border border-slate-800">{calcDisplay}</div>
              <div className="grid grid-cols-4 gap-1">
                {['7','8','9','/','4','5','6','*','1','2','3','-','C','0','=','+'].map(k => (
                  <button key={k} onClick={() => { if(k==='C') setCalcDisplay('0'); else if(k==='=') try { setCalcDisplay(eval(calcDisplay).toFixed(1)); } catch { setCalcDisplay('Err'); } else setCalcDisplay(prev => prev === '0' ? k : prev + k); }} className="h-7 rounded bg-slate-800 text-slate-300 text-[9px] font-bold">{k}</button>
                ))}
              </div>
            </div>
          )}
          <div className="p-4 bg-orange-50 rounded-[2rem] border border-orange-100 mt-auto text-center"><p className="text-[7px] text-orange-600 font-black uppercase tracking-tight">Activity log active.</p></div>
        </aside>
      </main>
    </div>
  );
};