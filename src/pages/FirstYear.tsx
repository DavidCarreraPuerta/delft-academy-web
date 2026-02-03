import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { EnrollmentStatusBanner } from "@/components/enrollment/EnrollmentStatusBanner";
import { supabase } from "@/integrations/supabase/client";
import { 
  Edit3, Save, Loader2, BookOpen, FileText, 
  CheckCircle2, MessageSquare, Target, Calendar, 
  Lock, Trophy, ArrowDown, Banknote, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const COURSES_DATA = [
  { id: "AE1111-1", name: "Exploring Aerospace Engineering", ects: 3, quarter: 1 },
  { id: "AE1111-2", name: "Engineering Drawing", ects: 2, quarter: 1 },
  { id: "AE1110-1", name: "Intro to Aerospace Engineering I", ects: 5, quarter: 1 },
  { id: "WI1421LR-1", name: "Calculus I-A", ects: 3, quarter: 1 },
  { id: "AE1110-2", name: "Intro to Aerospace Engineering II", ects: 4, quarter: 2 },
  { id: "WI1421LR-2", name: "Calculus I-B", ects: 3, quarter: 2 },
  { id: "WI1403", name: "Linear Algebra", ects: 4, quarter: 2 },
  { id: "AE1130-1", name: "Statics", ects: 4, quarter: 2 },
  { id: "AE1130-2", name: "Dynamics", ects: 3, quarter: 2 },
  { id: "AE1222-1", name: "Design & Construction", ects: 5, quarter: 3 },
  { id: "AE1222-2", name: "Technical Writing in English", ects: 0, quarter: 3 },
  { id: "AE1222-3", name: "Aerospace Design Elements I", ects: 4, quarter: 3 },
  { id: "AE1241", name: "Physics", ects: 6, quarter: 3 },
  { id: "AE1205", name: "Programming (Python)", ects: 3, quarter: 4 },
  { id: "AE1108", name: "Materials & Structures", ects: 6, quarter: 4 }
];

const BSATracker = ({ forceShowButton = false, isEnrolled = false }) => {
  const [courses, setCourses] = useState(COURSES_DATA.map(c => ({ ...c, grade: null, status: 'pending' })));
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStoredGrades = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data } = await supabase.from('student_grades_bulk').select('grades_data').eq('user_id', session.user.id).maybeSingle();
      if (data?.grades_data) {
        setCourses(COURSES_DATA.map(c => ({
          ...c,
          grade: data.grades_data[c.id]?.grade ?? null,
          status: data.grades_data[c.id]?.status ?? 'pending'
        })));
      }
    };
    fetchStoredGrades();
  }, []);

  const stats = useMemo(() => {
    const passed = courses.filter(c => c.status === "passed");
    const ects = passed.reduce((s, c) => s + c.ects, 0);
    const graded = passed.filter(c => c.ects > 0 && c.grade !== null);
    const totalWeightedPoints = graded.reduce((s, c) => s + (Number(c.grade) * c.ects), 0);
    const totalEctsGraded = graded.reduce((s, c) => s + c.ects, 0);
    const avgNum = totalEctsGraded > 0 ? (totalWeightedPoints / totalEctsGraded) : 0;
    
    return {
        ects, avg: avgNum.toFixed(2), honoursGap: Math.max(0, 8.5 - avgNum).toFixed(2),
        missing: Math.max(0, 45 - ects),
        color: ects >= 45 ? "#22c55e" : "#f59e0b",
        offset: (2 * Math.PI * 35) - (Math.min(ects, 60) / 60) * (2 * Math.PI * 35)
    };
  }, [courses]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No session found");
      const gradesObj = {};
      courses.forEach(c => { if (c.grade !== null) gradesObj[c.id] = { grade: c.grade, status: c.status }; });
      await supabase.from('student_grades_bulk').upsert({ user_id: session.user.id, grades_data: gradesObj, updated_at: new Date().toISOString() });
      toast({ title: "Progress Saved", description: "Your academic status has been synchronised." });
      setEditMode(false);
    } catch (e) {
      toast({ title: "Error", variant: "destructive", description: "Failed to update grades." });
    } finally { setLoading(false); }
  };

  return (
    <div id="tracker-section" className="w-full space-y-8 p-10 bg-white rounded-[3rem] border border-slate-200 shadow-2xl relative scroll-mt-24 overflow-hidden">
      {!isEnrolled && (
        <div className="absolute inset-0 z-50 bg-slate-50/40 backdrop-blur-[2px] flex items-center justify-center group cursor-not-allowed">
           <div className="bg-slate-900 text-white px-8 py-4 rounded-2xl flex items-center gap-3 shadow-2xl border border-orange-500 transform group-hover:scale-105 transition-all">
              <Lock className="w-5 h-5 text-orange-500" />
              <span className="font-black uppercase tracking-widest text-sm">Enrol in Year 1 to unlock Tracker</span>
           </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-100 pb-8">
        <div>
          <h2 className="text-4xl md:text-5xl font-black italic uppercase text-slate-900 tracking-tighter leading-none mb-3">BSA & Performance Tracker</h2>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 italic">
            <Trophy className="w-3 h-3 text-orange-500" /> Path to Honours Track (+8.5 GPA)
          </p>
        </div>
        {forceShowButton && isEnrolled && (
          <Button onClick={editMode ? handleSave : () => setEditMode(true)} className={cn("h-14 rounded-2xl font-black px-10 z-50 transition-all shadow-xl", editMode ? 'bg-green-600' : 'bg-slate-900')}>
            {loading ? <Loader2 className="animate-spin" /> : editMode ? <Save className="mr-2 h-5 w-5" /> : <Edit3 className="mr-2 h-5 w-5" />}
            {editMode ? "CONFIRM & SYNC" : "EDIT MY GRADES"}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-50/80 p-8 rounded-[2.5rem] border border-slate-100">
        <div className="flex flex-col items-center border-r border-slate-200">
          <div className="relative h-20 w-20">
            <svg className="h-full w-full -rotate-90">
              <circle cx="40" cy="40" r="35" stroke="#e2e8f0" strokeWidth="8" fill="transparent" />
              <circle cx="40" cy="40" r="35" stroke={stats.color} strokeWidth="8" fill="transparent" strokeDasharray={2 * Math.PI * 35} strokeDashoffset={stats.offset} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-black text-lg">{stats.ects}</div>
          </div>
          <span className="text-[10px] font-black uppercase text-slate-400 mt-2">Total EC</span>
        </div>
        <div className="border-r border-slate-200 pl-4 flex flex-col justify-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">BSA Status</p>
          <p className="text-2xl md:text-3xl font-black">{stats.missing > 0 ? `${stats.missing} LEFT` : "SECURED"}</p>
        </div>
        <div className="border-r border-slate-200 pl-4 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Weighted GPA</p>
            {parseFloat(stats.avg) >= 8.5 ? (
               <div className="bg-orange-500 text-white text-[8px] px-2 py-0.5 rounded-full flex items-center gap-1 font-black">
                 <Star className="w-2 h-2 fill-white" /> HONOURS
               </div>
            ) : (
               <div className="bg-slate-200 text-slate-500 text-[8px] px-2 py-0.5 rounded-full uppercase font-black tracking-tighter">
                 -{stats.honoursGap} to 8.5
               </div>
            )}
          </div>
          <p className={`text-3xl md:text-4xl font-black italic ${parseFloat(stats.avg) >= 8.5 ? 'text-orange-600' : 'text-slate-900'}`}>{stats.avg}</p>
        </div>
        <div className="pl-4 flex flex-col justify-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Current Standing</p>
          <p className={`text-lg md:text-xl font-black uppercase italic ${stats.ects >= 45 ? 'text-green-600' : 'text-orange-600'}`}>
            {stats.ects >= 45 ? "Safe" : "Warning"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-1">
        {courses.map((c) => (
          <div key={c.id} className="flex items-center justify-between py-4 border-b border-slate-100 group">
            <div className="flex flex-col max-w-[75%]">
              <span className="text-[14px] font-black text-slate-900 uppercase italic truncate group-hover:text-orange-600 transition-colors">{c.name}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Q{c.quarter} • {c.ects} ECTS • {c.id}</span>
            </div>
            <div className="flex items-center gap-3">
              {editMode ? (
                <Input type="number" step="0.1" className="w-16 h-10 text-center font-black bg-orange-50 border-orange-200 rounded-lg" value={c.grade ?? ""}
                  onChange={(e) => {
                    const val = e.target.value === "" ? null : Number(e.target.value);
                    setCourses(prev => prev.map(p => p.id === c.id ? { ...p, grade: val, status: val >= 5.8 ? 'passed' : val !== null ? 'failed' : 'pending' } : p));
                  }}
                />
              ) : (
                <div className={cn(
                  "w-14 h-10 flex items-center justify-center font-black rounded-xl text-lg transition-all",
                  c.status === 'passed' ? 'bg-green-50 text-green-600' :
                  c.status === 'failed' ? 'bg-red-50 text-red-600' :
                  'bg-slate-50 text-slate-300'
                )}>
                  {c.grade !== null ? Number(c.grade).toFixed(1) : "—"}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function FirstYear() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      if (currentSession) {
        const { data: profile } = await supabase.from('profiles').select('enrollment_status, target_programme').eq('user_id', currentSession.user.id).single();
        if (profile && profile.enrollment_status === 'active' && profile.target_programme === 'bsc-year-1') {
          setIsEnrolled(true);
        }
      }
      setLoading(false);
    };
    checkAccess();
  }, []);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto pb-32 px-4 space-y-24">
        <div className="flex justify-center -mb-16 relative z-[60]">
           <EnrollmentStatusBanner />
        </div>

        {/* HEADER */}
        <header className="bg-white rounded-[4rem] py-24 px-8 border border-slate-100 mt-6 text-center shadow-sm relative overflow-hidden flex flex-col items-center">
            <div className="bg-slate-900 text-white px-6 py-2 rounded-2xl flex items-center gap-2 shadow-lg mb-10">
                <BookOpen className="h-4 w-4 text-orange-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Elite Performance Track</span>
            </div>
            <h1 className="text-6xl md:text-[5.5rem] font-black text-slate-900 uppercase italic leading-[0.9] tracking-tighter text-balance mb-8">
                DON'T JUST SURVIVE. <br />
                <span className="text-orange-500 not-italic">AIM FOR HONOURS.</span>
            </h1>
            <p className="max-w-3xl text-slate-500 font-medium text-xl leading-relaxed mb-12 text-balance">
                Securing the BSA is just the first step. We accompany you to master Aerospace and achieve the 8.5 GPA required for the Honours Programme.
            </p>

            <div className="bg-slate-900 rounded-[2.5rem] p-8 max-w-3xl w-full text-left flex flex-col md:flex-row items-center gap-8 mb-12 border border-slate-800 shadow-2xl relative group overflow-hidden transition-all hover:border-orange-500/30">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Trophy className="w-32 h-32 text-white" />
                </div>
                <div className="bg-orange-500 p-4 rounded-2xl shrink-0 z-10 shadow-lg shadow-orange-500/20">
                    <Target className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 z-10 min-w-0">
                    <h4 className="text-white font-black uppercase italic text-xl tracking-tight leading-none mb-2">Unique Mechanism: BSA Tracker</h4>
                    <p className="text-slate-400 text-sm font-medium leading-snug max-w-md">
                        Predictive control of your credits and GPA in real-time. The definitive tool to visualise your path to academic success.
                    </p>
                </div>
                <Button variant="link" onClick={() => document.getElementById('tracker-section')?.scrollIntoView({ behavior: 'smooth' })} className="text-orange-500 font-black uppercase text-[10px] tracking-widest flex items-center gap-2 z-10 no-underline hover:text-orange-400 shrink-0">
                    VIEW TRACKER <ArrowDown className="w-4 h-4 animate-bounce" />
                </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
                {isEnrolled ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-orange-600 hover:bg-orange-700 text-white px-12 h-16 rounded-2xl font-black uppercase tracking-widest shadow-xl flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-orange-600/20">
                        <Calendar className="w-5 h-5" />
                        Secure Support
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-[2rem] border-none shadow-2xl">
                      <BookingCalendar mode="year1" />
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Button 
                    onClick={() => navigate(session ? "/free-consultation" : "/auth")} 
                    className={cn(
                      "px-12 h-16 rounded-2xl font-black uppercase tracking-widest shadow-xl flex items-center gap-3 transition-all hover:scale-105 active:scale-95",
                      session ? "bg-slate-900 text-white border-2 border-orange-500/50" : "bg-slate-900 text-white"
                    )}
                  >
                    {session ? (
                      <>
                        <Lock className="w-5 h-5 text-orange-500" />
                        Enrol to Unlock Training
                      </>
                    ) : "Get Started Now"}
                  </Button>
                )}
            </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
            <div className="font-black text-slate-300 uppercase italic tracking-widest">Initialising Tracker...</div>
          </div>
        ) : (
          <div className="flex flex-col space-y-32">
            {/* EL TRACKER SUBE AQUÍ SI ESTÁ ENROLADO */}
            {isEnrolled && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <BSATracker forceShowButton={true} isEnrolled={isEnrolled} />
              </div>
            )}

            <section className="space-y-16 py-10">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
                    Exclusive Benefits
                </div>
                <h3 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-slate-900">
                    BSc Launchpad Programme
                </h3>
                <p className="max-w-2xl text-slate-500 font-medium text-lg leading-relaxed text-balance">
                    We do not just monitor your progress. We provide elite tools to ensure every exam is a resounding success.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <MessageSquare className="w-8 h-8 text-orange-500" />,
                    title: "1:1 Tutoring",
                    desc: "Personalised sessions to prepare critical subjects. Solve your specific doubts with senior mentors.",
                    f1: "Result-oriented", f2: "TU Delft Senior Mentors"
                  },
                  {
                    icon: <FileText className="w-8 h-8 text-orange-500" />,
                    title: "Premium Summaries",
                    desc: "Access optimised materials for efficiency. All key content condensed for effective study.",
                    f1: "Updated Content", f2: "High-Yield Format"
                  },
                  {
                    icon: <Target className="w-8 h-8 text-orange-500" />,
                    title: "Exercise Bank",
                    desc: "Verify your progress with our practical exercise database. Train with real exam problems.",
                    f1: "Progress Feedback", f2: "TU Delft Difficulty"
                  }
                ].map((item, i) => (
                  <div key={i} className="group bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 relative flex flex-col overflow-hidden">
                    {!isEnrolled && (
                      <div className="absolute inset-0 z-20 bg-slate-50/60 backdrop-blur-[2px] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-slate-900 text-white px-4 py-2 rounded-xl flex items-center gap-2 border border-orange-500/50 shadow-xl">
                          <Lock className="w-4 h-4 text-orange-500" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Enrol to unlock</span>
                        </div>
                      </div>
                    )}
                    <div className="bg-slate-900 w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                      {item.icon}
                    </div>
                    <h5 className="text-2xl font-black uppercase italic mb-4 text-slate-900 tracking-tighter leading-none">{item.title}</h5>
                    <p className="text-slate-500 leading-relaxed font-medium mb-6 text-sm">{item.desc}</p>
                    <ul className="space-y-2 mt-auto">
                      <li className="flex items-center gap-2 text-[12px] font-bold text-slate-400 uppercase tracking-tight"><CheckCircle2 className="w-4 h-4 text-green-500"/> {item.f1}</li>
                      <li className="flex items-center gap-2 text-[12px] font-bold text-slate-400 uppercase tracking-tight"><CheckCircle2 className="w-4 h-4 text-green-500"/> {item.f2}</li>
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex justify-center pt-8">
                <button 
                  onClick={() => navigate("/faq#pricing")}
                  className="flex items-center gap-2 text-slate-400 hover:text-orange-500 transition-colors group"
                >
                  <Banknote className="w-4 h-4" />
                  <span className="font-bold uppercase tracking-[0.2em] text-[10px] border-b border-transparent group-hover:border-orange-500">
                    View our competitive pricing & fees
                  </span>
                </button>
              </div>
            </section>

            {/* SI NO ESTÁ ENROLADO, EL TRACKER SE QUEDA AQUÍ ABAJO */}
            {!isEnrolled && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <BSATracker forceShowButton={true} isEnrolled={isEnrolled} />
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}