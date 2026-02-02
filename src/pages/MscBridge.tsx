import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { EnrollmentStatusBanner } from "@/components/enrollment/EnrollmentStatusBanner";
import { supabase } from "@/integrations/supabase/client";
import { 
  ArrowRight, Globe, CheckCircle2, ChevronDown, 
  BookOpen, Mail, Calendar, Lock, Trophy, Target, 
  ArrowDown, Star, Users, Loader2, Banknote 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { cn } from "@/lib/utils";

import mscHeroAirplane from "@/assets/msc-hero-airplane.png";

const services = [
  {
    id: "gre",
    icon: <BookOpen className="w-6 h-6" />,
    title: "GRE Quantitative Prep",
    desc: "Intensive preparation for the GRE Quantitative section.",
    longDesc: "Master the advanced mathematical concepts required for the GRE. Our training includes over 20 full-length practice tests and targeted strategies to hit the 165+ score range.",
    includes: ["20+ Practice Tests", "Video Lessons", "Score Analysis"],
  },
  {
    id: "motivation",
    icon: <Mail className="w-6 h-6" />,
    title: "Motivation Letter Workshop",
    desc: "Craft a persuasive letter that resonates with TU Delft.",
    longDesc: "A masterclass in storytelling for engineers. We help you align your academic background with the specific values and research goals of the Aerospace faculty.",
    includes: ["Writing Framework", "Personal Feedback", "Success Examples"],
  },
  {
    id: "bridging",
    icon: <Globe className="w-6 h-6" />,
    title: "Technical Bridging",
    desc: "Close the academic gap to meet MSc requirements.",
    longDesc: "Specific academic modules designed to ensure your background covers all prerequisites for the Aerospace Engineering Master's at TU Delft.",
    includes: ["Custom Curriculum", "Expert Tutors", "Certification"],
  },
  {
    id: "mentorship",
    icon: <Users className="w-6 h-6" />,
    title: "1:1 Tutoring Sessions",
    desc: "Personalised mentorship to secure your admission.",
    longDesc: "Direct access to senior mentors who have successfully navigated the Delft MSc process. Focused on your specific profile and academic challenges.",
    includes: ["Profile Strategy", "Entrance Exam Prep", "Direct Q&A"],
  },
];

export default function MscBridge() {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('enrollment_status, target_programme')
          .eq('user_id', session.user.id)
          .maybeSingle();

        const hasMscTarget = profile?.target_programme?.toLowerCase().includes('msc');
        
        if (profile && profile.enrollment_status === 'active' && hasMscTarget) {
          setIsEnrolled(true);
        }
      }
      setLoading(false);
    };
    
    checkAccess();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      checkAccess();
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleStartClick = () => {
    if (session) {
      navigate("/free-consultation");
    } else {
      navigate("/auth");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-20 pb-32 px-4">
        
        <div className="flex justify-center -mb-16 relative z-[60]">
           <EnrollmentStatusBanner />
        </div>

        <header className="bg-white rounded-[4rem] p-8 md:p-14 shadow-sm border border-slate-100 mt-6 overflow-hidden relative flex flex-col items-center">
          <div className="flex flex-col md:flex-row items-center gap-12 relative z-10 w-full">
            <div className="flex-1 text-center md:text-left space-y-8">
              <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                <div className="inline-flex items-center gap-3 bg-slate-900 text-white px-5 py-2 rounded-2xl shadow-lg transform -rotate-1">
                  <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest italic">The Excellence Standard</span>
                </div>
              </div>

              <h1 className="text-5xl md:text-[5.5rem] font-black text-slate-900 leading-[0.9] uppercase italic tracking-tighter">
                DON'T JUST APPLY. <br />
                <span className="text-orange-500 not-italic">STAND OUT.</span>
              </h1>
              
              <p className="text-xl text-slate-500 max-w-2xl font-medium leading-relaxed mb-10 text-balance">
                Securing an MSc spot is a complex challenge. We don't just help you bridge the academic gap; <br className="hidden md:block" /> we refine your profile to meet the elite standards of TU Delft Aerospace.
              </p>

              <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                {isEnrolled ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-orange-600 hover:bg-orange-700 text-white px-10 h-16 rounded-2xl font-black uppercase tracking-widest shadow-xl flex items-center gap-3 transition-transform hover:scale-105 active:scale-95">
                        <Calendar className="w-5 h-5" />
                        Secure Support
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-[2rem] border-none shadow-2xl">
                      <BookingCalendar mode="admissions" />
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Button 
                    onClick={handleStartClick}
                    className={cn(
                        "px-10 h-16 rounded-2xl font-black uppercase tracking-widest shadow-xl flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 group",
                        session ? "bg-slate-900 border-2 border-orange-500/50 text-white" : "bg-slate-900 text-white"
                    )}
                  >
                    {session ? (
                        <>
                            <Lock className="w-5 h-5 text-orange-500" />
                            Enrol to Unlock Program
                        </>
                    ) : (
                        <>
                            Get Started
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                  </Button>
                )}
              </div>
            </div>

            <div className="flex-1 w-full max-w-md aspect-square bg-slate-50 rounded-[3.5rem] overflow-hidden border-8 border-slate-50 relative shadow-2xl hidden md:block">
               <img src={mscHeroAirplane} alt="Flight Performance" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <section id="services-section" className="space-y-12 scroll-mt-10">
          <div className="text-center space-y-4">
              <h2 className="text-5xl font-black text-slate-900 uppercase italic tracking-tighter">Complete MSc Support</h2>
              <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Tailored for the Aerospace Faculty</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div 
                key={service.id} 
                onClick={() => setActiveCard(activeCard === service.id ? null : service.id)}
                className={cn(
                  "p-8 rounded-[3rem] border-2 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col group",
                  activeCard === service.id 
                    ? 'bg-orange-50 border-orange-500 shadow-xl scale-[1.02]' 
                    : 'bg-white border-slate-100 hover:border-orange-200'
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

                <div className={cn(
                  "w-14 h-14 rounded-[1.2rem] flex items-center justify-center mb-6 transition-colors",
                  activeCard === service.id ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'
                )}>
                  {service.icon}
                </div>
                
                <h4 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tighter italic leading-tight">{service.title}</h4>
                <p className={cn(
                  "text-sm leading-relaxed mb-6 transition-all font-medium",
                  activeCard === service.id ? 'text-slate-800' : 'text-slate-500'
                )}>
                  {activeCard === service.id ? service.longDesc : service.desc}
                </p>
                <div className="space-y-2 mb-6">
                  {service.includes.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] font-bold text-slate-600 uppercase tracking-tight">
                      <CheckCircle2 className="w-3 h-3 text-green-500" /> {item}
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-4 border-t border-slate-100 flex justify-end">
                  <ChevronDown className={cn(
                    "w-5 h-5 text-slate-300 transition-transform duration-500",
                    activeCard === service.id && 'rotate-180 text-orange-500'
                  )} />
                </div>
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

        <footer className="bg-slate-900 rounded-[4rem] py-20 px-8 text-white text-center relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h3 className="text-4xl md:text-6xl font-black italic uppercase leading-none tracking-tighter">
              Your Journey to <br /> <span className="text-orange-500 not-italic">Delft Starts Here</span>
            </h3>
            <p className="text-xl text-slate-300 font-medium leading-relaxed max-w-xl mx-auto">
              Register now to access your personalised bridging roadmap and meet the MSc requirements.
            </p>
            <Button 
              onClick={handleStartClick}
              className="bg-white text-slate-900 hover:bg-orange-600 hover:text-white px-12 py-10 rounded-[2rem] font-black text-2xl hover:scale-[1.1] transition-all group h-auto mx-auto"
            >
              {session && !isEnrolled ? "ENROL TO UNLOCK" : "START YOUR JOURNEY"}
              <ArrowRight className="w-8 h-8 ml-4 group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>
        </footer>
      </div>
    </MainLayout>
  );
}