"use client";

import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  Timer, Star, ChevronDown, Users, Calendar, Lock, 
  BookOpen, ShieldCheck, ArrowRight, Banknote, AlertCircle, ShieldAlert 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { EnrollmentStatusBanner } from "@/components/enrollment/EnrollmentStatusBanner";
import { ProctorSimulatorIntro } from "@/components/enrollment/ProctorSimulatorIntro";
import { cn } from "@/lib/utils";

import heroStudent from "@/assets/hero-student.png";
import mentorshipImg from "@/assets/mentorship-session.png";

const BscAdmissions = () => {
  const navigate = useNavigate();
  const examDate = new Date("2026-03-11");
  const [daysLeft, setDaysLeft] = useState(0);
  const [activePillar, setActivePillar] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showSimAlert, setShowSimAlert] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      
      if (currentSession) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('enrollment_status, target_programme')
          .eq('user_id', currentSession.user.id)
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
    { id: 'mentorship', title: "1:1 Expert Sessions", desc: "Personalized coaching with high-ranking TU Delft seniors.", icon: <Users className="w-6 h-6" /> },
    { id: 'academic', title: "Syllabus Summaries & Exam Exercises", desc: "Theory summaries and high-level practice problems.", icon: <BookOpen className="w-6 h-6" /> },
    { id: 'proctor', title: "Proctortrack Simulator", desc: "Practice in the exact technical environment of the exam.", icon: <ShieldCheck className="w-6 h-6" /> }
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-20 pb-32 px-4">
        
        <header className="bg-white rounded-[4rem] p-8 md:p-14 shadow-sm border border-slate-100 mt-2 overflow-hidden relative">
          <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="flex-1 text-center md:text-left space-y-8">
              <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
                <div className="inline-flex items-center gap-3 bg-orange-500 text-white px-6 py-3 rounded-2xl shadow-lg transform -rotate-1">
                  <Timer className="w-6 h-6 animate-pulse" />
                  <span className="text-xl md:text-2xl font-black italic">
                    {daysLeft} Days until Entrance Exam
                  </span>
                </div>
                <EnrollmentStatusBanner />
              </div>
              
              <h1 className="text-4xl md:text-[5.5rem] font-black text-slate-900 leading-[0.9] uppercase italic tracking-tighter">
                Guarantee your <br />
                <span className="text-[#00a6d6] not-italic">TU Delft Admission.</span>
              </h1>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                {isEnrolled ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-slate-900 hover:bg-[#00a6d6] text-white px-10 h-16 rounded-2xl font-black uppercase tracking-widest shadow-xl flex items-center gap-3 transition-all">
                        <Calendar className="w-5 h-5 text-orange-500" />
                        Secure My Training
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl p-0 rounded-[3rem] bg-white border-none shadow-2xl overflow-hidden">
                      <DialogTitle className="sr-only">Booking System Status</DialogTitle>
                      <div className="relative">
                        <div className="p-8 blur-[2px] opacity-40 grayscale-[0.5] pointer-events-none scale-[0.98]">
                            <BookingCalendar mode="admissions" />
                        </div>
                        <div className="absolute inset-0 z-50 flex items-center justify-center p-6">
                            <div className="bg-white/90 backdrop-blur-md border border-orange-200 p-10 rounded-[2.5rem] shadow-2xl max-w-lg text-center space-y-6 transform -rotate-1">
                               <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                                  <AlertCircle className="w-8 h-8" />
                               </div>
                               <h3 className="text-2xl font-black uppercase italic text-slate-900 leading-tight">
                                 Enrollment High Demand: <br />
                                 <span className="text-orange-600">Weekly Slots Full</span>
                               </h3>
                               <p className="text-slate-600 font-bold text-sm uppercase tracking-tight leading-relaxed">
                                 Our senior tutors are currently at 100% capacity. 
                                 <span className="block mt-4 text-slate-900">As an enrolled student, your priority status is active.</span>
                               </p>
                               <Button onClick={() => window.location.reload()} className="bg-slate-900 text-white rounded-xl px-10 h-12 uppercase font-black text-xs tracking-widest">
                                 Acknowledge
                               </Button>
                            </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Button 
                    onClick={handleCtaClick} 
                    className="bg-slate-900 text-white px-10 h-16 rounded-2xl font-black uppercase tracking-widest shadow-xl group flex items-center gap-3"
                  >
                    {session ? "Enrol to Unlock" : "Get Started Now"}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                )}
              </div>
            </div>
            <div className="flex-1 w-full max-w-md aspect-square bg-slate-100 rounded-[3.5rem] overflow-hidden border-8 border-slate-50 relative shadow-2xl hidden md:block">
                <img src={heroStudent} alt="Student" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainingPillars.map((box) => (
            <Dialog key={box.id}>
              <DialogTrigger asChild>
                <div 
                  onClick={() => {
                    if (isEnrolled && box.id === 'academic') navigate('/dashboard', { state: { section: 'materials' } });
                  }} 
                  className={cn(
                    "p-8 rounded-[3rem] border-2 transition-all duration-300 cursor-pointer flex flex-col relative min-h-[320px] bg-white border-slate-100 group overflow-hidden",
                    activePillar === box.id && 'border-orange-500 scale-[1.02]'
                  )}
                >
                  {!isEnrolled && (
                    <div className="absolute inset-0 z-20 bg-slate-900/5 backdrop-blur-[1.5px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-slate-900 text-white px-4 py-2 rounded-xl flex items-center gap-2 border border-orange-500/50 shadow-2xl">
                        <Lock className="w-3 h-3 text-orange-500" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Enrol to Unlock</span>
                      </div>
                    </div>
                  )}

                  <div className="w-14 h-14 rounded-[1.2rem] bg-slate-100 text-[#00a6d6] flex items-center justify-center mb-6">{box.icon}</div>
                  <h4 className="text-xl font-black text-slate-900 mb-4 uppercase italic tracking-tighter leading-tight">{box.title}</h4>
                  <p className="text-slate-500 font-bold uppercase text-[11px] leading-tight">{box.desc}</p>
                  <div className="mt-auto pt-4 border-t border-slate-100 flex justify-end">
                    <ChevronDown className={cn(
                      "w-5 h-5 text-slate-300 transition-transform duration-500",
                      activePillar === box.id && 'rotate-180 text-orange-500'
                    )} />
                  </div>
                </div>
              </DialogTrigger>

              {isEnrolled && box.id === 'proctor' ? (
                <DialogContent className="max-w-[95vw] w-full p-0 rounded-[3rem] bg-white border-none shadow-2xl overflow-hidden h-[85vh] md:h-[90vh] flex flex-col">
                   <DialogTitle className="sr-only">Technical Environment Update</DialogTitle>
                   <div className="relative flex-1 overflow-hidden">
                      <div className="absolute inset-0 blur-xl opacity-20 grayscale pointer-events-none">
                         <ProctorSimulatorIntro isEnrolled={true} />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center p-4 z-50">
                         <div className="bg-white p-8 md:p-14 rounded-[3.5rem] shadow-2xl border border-orange-100 max-w-xl w-full text-center space-y-8 my-auto">
                            <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner">
                               <ShieldAlert className="w-10 h-10" />
                            </div>
                            <div className="space-y-3">
                               <h3 className="text-3xl md:text-5xl font-black uppercase italic text-slate-900 tracking-tighter leading-[0.95]">
                                 We are sorry, <br />
                                 <span className="text-orange-600">Matrix Updating.</span>
                               </h3>
                               <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.3em] pt-2">
                                 Syncing with TU Delft 2026
                               </p>
                            </div>
                            <p className="text-slate-600 font-bold text-sm md:text-base leading-tight max-w-sm mx-auto italic uppercase opacity-80">
                               "We are currently synchronizing the technical environment with the latest official requirements."
                            </p>
                            <Button onClick={() => window.location.reload()} className="bg-slate-900 text-white rounded-2xl px-12 h-14 uppercase font-black tracking-widest w-full md:w-auto">
                               Acknowledge
                            </Button>
                         </div>
                      </div>
                   </div>
                </DialogContent>
              ) : isEnrolled && box.id === 'mentorship' ? (
                <DialogContent className="max-w-xl p-10 rounded-[3rem] bg-white">
                  <DialogTitle className="sr-only">Status Detail</DialogTitle>
                  <div className="text-center space-y-4">
                    <ShieldAlert className="w-12 h-12 text-orange-500 mx-auto" />
                    <h3 className="text-2xl font-black uppercase italic">Waitlist Active</h3>
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-tight">
                      Priority list active for enrolled students.
                    </p>
                  </div>
                </DialogContent>
              ) : null}
            </Dialog>
          ))}
        </div>

        <div className="relative group">
           {isEnrolled && (
             <Dialog open={showSimAlert} onOpenChange={setShowSimAlert}>
                <DialogTrigger asChild>
                  <div className="absolute inset-0 z-30 cursor-pointer bg-transparent" onClick={() => setShowSimAlert(true)} />
                </DialogTrigger>
                <div className="absolute top-8 right-8 z-20 bg-slate-900 text-white px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.2em] border border-orange-500 animate-pulse">
                   2026 Matrix Updating
                </div>
                <DialogContent className="max-w-xl p-12 rounded-[3rem] bg-white border-none shadow-2xl">
                   <DialogTitle className="sr-only">Simulator Status</DialogTitle>
                   <div className="text-center space-y-6">
                      <ShieldCheck className="w-16 h-16 text-orange-500 mx-auto animate-bounce" />
                      <h3 className="text-3xl font-black uppercase italic text-slate-900">Simulator Optimization</h3>
                      <p className="text-slate-600 font-medium leading-relaxed">
                         Access will be enabled automatically in a few days.
                      </p>
                      <Button onClick={() => setShowSimAlert(false)} className="bg-slate-900 text-white rounded-xl px-10 uppercase font-black">Understood</Button>
                   </div>
                </DialogContent>
             </Dialog>
           )}
           <div className={cn("transition-all duration-500", isEnrolled && "grayscale-[0.2]")}>
              <ProctorSimulatorIntro isEnrolled={isEnrolled} />
           </div>
        </div>

        <section className="bg-slate-900 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
                <span className="text-[#00a6d6] font-black uppercase tracking-[0.3em] text-xs">The Excellence Method</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">Personalized <br /> 1:1 Coaching</h2>
            </div>
            <div className="w-full md:w-80 aspect-[3/4] bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden relative">
                {isEnrolled && (
                   <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] z-10 flex items-center justify-center">
                      <span className="bg-orange-500 text-white px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest -rotate-12">Slots Full</span>
                   </div>
                )}
                <img src={mentorshipImg} alt="Mentorship" className="w-full h-full object-cover opacity-90" />
            </div>
          </div>
        </section>

        <footer className="text-center pt-10 bg-white rounded-[4rem] py-20 border border-slate-100 shadow-sm relative">
          <div className="max-w-3xl mx-auto space-y-10 px-6">
            <h3 className="text-4xl md:text-[3.5rem] font-black text-slate-900 uppercase italic tracking-tighter leading-none">
              Don't leave your <span className="text-orange-500">future</span> <br /> to chance.
            </h3>
            <div className="space-y-6">
              {isEnrolled ? (
                <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] inline-flex items-center gap-4 shadow-xl border-b-4 border-orange-500 mx-auto">
                   <ShieldCheck className="w-6 h-6 text-orange-500" />
                   <span className="font-black uppercase italic tracking-widest">Active Enrollment 2026</span>
                </div>
              ) : (
                <Button onClick={handleCtaClick} className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-10 rounded-[2.5rem] font-black text-2xl shadow-2xl flex items-center gap-6 mx-auto h-auto group uppercase">
                  <span>Rank in the top 440</span>
                  <ArrowRight className="w-10 h-10 group-hover:translate-x-2 transition-transform" />
                </Button>
              )}
            </div>
          </div>
        </footer>
      </div>
    </MainLayout>
  );
};

export default BscAdmissions;