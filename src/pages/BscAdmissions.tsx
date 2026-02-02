import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  Timer, Star, ChevronDown, Users, Calendar, Lock, 
  BookOpen, PenTool, ShieldCheck, ArrowRight, Banknote 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { EnrollmentStatusBanner } from "@/components/enrollment/EnrollmentStatusBanner";
import { cn } from "@/lib/utils";

import heroStudent from "@/assets/hero-student.png";
import mentorshipImg from "@/assets/mentorship-session.png";

const BscAdmissions = () => {
  const navigate = useNavigate();
  const examDate = new Date("2026-03-15");
  const [daysLeft, setDaysLeft] = useState(0);
  const [activePillar, setActivePillar] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('enrollment_status, target_programme')
          .eq('user_id', session.user.id)
          .single();

        if (profile && profile.enrollment_status === 'active' && profile.target_programme === 'bsc-aerospace') {
          setIsEnrolled(true);
        }
      }
    };
    checkAccess();
    const calculateDays = () => {
      const diff = examDate.getTime() - new Date().getTime();
      setDaysLeft(Math.ceil(diff / (1000 * 60 * 60 * 24)));
    };
    calculateDays();
  }, []);

  const handleCtaClick = () => {
    if (session) {
      navigate("/free-consultation");
    } else {
      navigate("/auth");
    }
  };

  const trainingPillars = [
    { 
      id: 'mentorship',
      title: "1:1 Expert Sessions", 
      desc: "Personalized coaching with high-ranking TU Delft seniors.", 
      longDesc: "The core of our success. Work directly with tutors who ranked in the top 10% of their selection year to master the specific problem-solving mindset required.",
      icon: <Users className="w-6 h-6" />,
    },
    { 
      id: 'academic',
      title: "Bridge Summaries", 
      desc: "Physics, Maths and Intro to Engineering content.", 
      longDesc: "Master First-Year Physics, Maths and Introduction to Aerospace Engineering. We condense the complex TU Delft syllabus into high-yield summaries designed for the entrance exam.",
      icon: <BookOpen className="w-6 h-6" />
    },
    { 
      id: 'proctor',
      title: "Proctortrack Simulator", 
      desc: "Practice in the exact technical environment of the exam.", 
      longDesc: "Eliminate technical anxiety. Our exclusive simulator provides an exact replica of the proctored interface and lockdown conditions you will face on exam day.",
      icon: <ShieldCheck className="w-6 h-6" />,
    },
    { 
      id: 'exams',
      title: "Exam Mastery", 
      desc: "Extensive bank of exercises and practice exams.", 
      longDesc: "Hundreds of real-level questions and timed practice exams designed to build the speed and accuracy needed to beat the selection ranking.",
      icon: <PenTool className="w-6 h-6" />
    }
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-20 pb-32 px-4">
        
        {/* HERO SECTION */}
        <header className="bg-white rounded-[4rem] p-8 md:p-14 shadow-sm border border-slate-100 mt-2 overflow-hidden relative">
          <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="flex-1 text-center md:text-left space-y-8">
              <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
                <div className="inline-flex items-center gap-3 bg-orange-500 text-white px-6 py-3 rounded-2xl shadow-lg transform -rotate-1">
                  <Timer className="w-6 h-6 animate-pulse" />
                  <span className="text-3xl font-black italic">{daysLeft} Days Left</span>
                </div>
                <EnrollmentStatusBanner />
              </div>
              
              <h1 className="text-4xl md:text-[5.5rem] font-black text-slate-900 leading-[0.9] uppercase italic tracking-tighter">
                Guarantee your <br />
                <span className="text-[#00a6d6] not-italic">TU Delft Admission.</span>
              </h1>
              <p className="text-xl text-slate-500 max-w-xl font-bold uppercase tracking-tight text-balance">
                Master the selection exam and rank among the top candidates with the only program designed by seniors.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                {isEnrolled ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-slate-900 hover:bg-[#00a6d6] text-white px-10 h-16 rounded-2xl font-black uppercase tracking-widest shadow-xl flex items-center gap-3 transition-all hover:scale-105">
                        <Calendar className="w-5 h-5 text-orange-500" />
                        Secure My Training
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-[2rem] border-none shadow-2xl">
                      <BookingCalendar mode="admissions" />
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Button 
                    onClick={handleCtaClick} 
                    className={cn(
                      "px-10 h-16 rounded-2xl font-black uppercase tracking-widest shadow-xl flex items-center gap-3 transition-all hover:scale-105",
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
            </div>
            
            <div className="flex-1 w-full max-w-md aspect-square bg-slate-100 rounded-[3.5rem] overflow-hidden border-8 border-slate-50 relative shadow-2xl hidden md:block">
               <img src={heroStudent} alt="Successful Student" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* MECANISMOS - GRID CON BLOQUEO */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainingPillars.map((box) => (
            <div 
              key={box.id} 
              onClick={() => setActivePillar(activePillar === box.id ? null : box.id)} 
              className={cn(
                "p-8 rounded-[3rem] border-2 transition-all duration-300 cursor-pointer flex flex-col relative",
                activePillar === box.id ? 'bg-orange-50 border-orange-500 scale-[1.02] shadow-xl' : 'bg-white border-slate-100 hover:border-[#00a6d6]/30',
                !isEnrolled && "group/card"
              )}
            >
              {!isEnrolled && (
                <div className="absolute inset-0 z-20 bg-slate-900/5 backdrop-blur-[2px] rounded-[3rem] flex flex-col items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                  <div className="bg-slate-900 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-2xl border border-orange-500/50">
                    <Lock className="w-4 h-4 text-orange-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Enrol to unlock</span>
                  </div>
                </div>
              )}

              <div className={cn(
                "w-14 h-14 rounded-[1.2rem] flex items-center justify-center mb-6 transition-colors",
                activePillar === box.id ? 'bg-orange-500 text-white' : 'bg-slate-100 text-[#00a6d6]'
              )}>
                {box.icon}
              </div>
              
              <h4 className="text-xl font-black text-slate-900 mb-4 uppercase italic tracking-tighter leading-tight">{box.title}</h4>
              <p className="text-slate-500 leading-relaxed font-bold uppercase tracking-tight text-[11px]">
                {activePillar === box.id ? box.longDesc : box.desc}
              </p>
              
              <div className="mt-auto pt-6 border-t border-slate-100 flex justify-end italic font-black text-[9px] uppercase tracking-widest text-slate-400">
                <ChevronDown className={cn("w-5 h-5 transition-transform duration-500", activePillar === box.id && 'rotate-180 text-orange-500')} />
              </div>
            </div>
          ))}
        </div>

        {/* SECCIÓN MENTORÍA 1:1 */}
        <section className="bg-slate-900 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
                <span className="text-[#00a6d6] font-black uppercase tracking-[0.3em] text-xs">The Excellence Method</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black italic uppercase leading-none tracking-tighter">Personalized <br /> 1:1 Coaching</h2>
              <p className="text-xl text-slate-300 leading-relaxed max-w-xl font-medium">The most effective way to rank high. We don't just teach theory; we teach you how to think like a TU Delft engineer under pressure.</p>
            </div>
            <div className="w-full md:w-80 aspect-[3/4] bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
                <img src={mentorshipImg} alt="Mentorship Session" className="w-full h-full object-cover opacity-90" />
            </div>
          </div>
        </section>

        {/* CTA FINAL ACTUALIZADO */}
        <footer className="text-center pt-10 bg-white rounded-[4rem] py-20 border border-slate-100 shadow-sm overflow-hidden relative">
          <div className="max-w-3xl mx-auto space-y-10 px-6">
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
              Don't leave your <span className="text-orange-500">future</span> <br /> to chance.
            </h3>
            <div className="space-y-6">
              <Button 
                onClick={handleCtaClick} 
                className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-10 rounded-[2.5rem] font-black text-2xl hover:scale-[1.05] transition-all shadow-2xl flex items-center gap-6 mx-auto h-auto group uppercase"
              >
                <span>{isEnrolled ? "Book a Session" : "Rank in the top 440"}</span>
                <ArrowRight className="w-10 h-10 group-hover:translate-x-2 transition-transform" />
              </Button>
              
              <button 
                onClick={() => navigate("/faq#pricing")}
                className="flex items-center gap-2 mx-auto text-slate-400 hover:text-orange-500 transition-colors group"
              >
                <Banknote className="w-4 h-4" />
                <span className="font-bold uppercase tracking-[0.2em] text-[10px] border-b border-transparent group-hover:border-orange-500">
                  View our competitive pricing & fees
                </span>
              </button>
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] pt-4">Strategic training for the 2026 Selection Exam</p>
          </div>
        </footer>
      </div>
    </MainLayout>
  );
};

export default BscAdmissions;