import { MainLayout } from "@/components/layout/MainLayout";
import { GraduationCap, Wallet, CalendarClock, PhoneCall, ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import tutorBadge from "@/assets/certified-tutor-badge.png";

const TalentHub = () => {
  return (
    <MainLayout>
      <div className="bg-slate-50 min-h-screen pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          
          {/* Recruitment Header - Softened Tone */}
          <header className="mb-16 text-center">
            <div className="flex justify-center mb-6 relative">
              <img 
                src={tutorBadge} 
                alt="Qualified Tutor Badge" 
                className="w-40 h-40 object-contain shadow-xl rounded-full border-1 border-white relative z-2"
              />
              <div className="absolute inset-0 bg-orange-400 blur-3xl opacity-10 animate-pulse"></div>
            </div>
            <span className="bg-orange-100 text-orange-700 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 inline-block border border-orange-200">
              Academy Crew
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 italic uppercase tracking-tight mb-6 leading-[1.1]">
              Help the next generation <br />
              <span className="text-orange-600 not-italic">Become a Qualified Tutor</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Would you like to join our team of Qualified Tutors to support the upcoming cohorts of students? 
              We are looking for tutors who want to share their experience and guide them through the TU Delft Aerospace challenge.
            </p>
          </header>

          {/* Pillars Grid - Fair and Professional Focus */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            
            {/* Pillar 1: Academic Mastery */}
            <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-orange-200 transition-all">
              <div className="p-4 bg-slate-50 rounded-2xl mb-6 group-hover:bg-orange-50 transition-colors">
                <GraduationCap className="w-8 h-8 text-orange-600" />
              </div>
              <h2 className="text-xl font-black text-slate-900 mb-3 italic uppercase tracking-tight">Academic Mastery</h2>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                We seek students who not only master the subject matter but also know how to communicate it effectively. Your experience is the best resource for new students.
              </p>
            </section>

            {/* Pillar 2: Fair Compensation */}
            <section className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-900 flex flex-col items-center text-center shadow-sm relative overflow-hidden">
              <div className="p-4 bg-slate-900 rounded-2xl mb-6">
                <Wallet className="w-8 h-8 text-orange-400" />
              </div>
              <h2 className="text-xl font-black mb-3 text-slate-900 italic uppercase tracking-tight">Fair Compensation</h2>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                We believe in fair pay for a role of high responsibility. A genuine, rewarding alternative to conventional, low-paid student jobs.
              </p>
              <div className="mt-4 flex items-center gap-1 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                <CheckCircle2 className="w-3 h-3 text-green-500" /> Transparent & Rewarding
              </div>
            </section>

            {/* Pillar 3: Flexibility */}
            <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-orange-200 transition-all">
              <div className="p-4 bg-slate-50 rounded-2xl mb-6 group-hover:bg-orange-50 transition-colors">
                <CalendarClock className="w-8 h-8 text-orange-600" />
              </div>
              <h2 className="text-xl font-black text-slate-900 mb-3 italic uppercase tracking-tight">Total Flexibility</h2>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                You define your availability based on your academic workload. We simply expect total commitment to the sessions you choose to accept.
              </p>
            </section>
          </div>

          {/* Application Form - Coming Soon Overlay */}
          <section className="max-w-2xl mx-auto relative group">
            {/* Coming Soon Overlay */}
            <div className="absolute inset-0 z-20 bg-slate-50/60 backdrop-blur-[2px] rounded-[3rem] flex flex-col items-center justify-center border-2 border-dashed border-slate-200">
               <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-2xl transform group-hover:scale-105 transition-transform">
                  <Lock className="w-4 h-4 text-orange-500" />
                  <span className="text-xs font-black uppercase tracking-[0.2em]">Application Form Coming Soon</span>
               </div>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4">We are currently updating our crew portal</p>
            </div>

            <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-slate-100 shadow-2xl opacity-40">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-slate-900 italic uppercase mb-2">Apply to the Crew</h2>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">
                  Personal briefing call within 48 hours
                </p>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <Input disabled placeholder="John Smith" className="rounded-2xl border-slate-100 bg-slate-50 h-14 px-6 text-sm" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Student Email</label>
                    <Input disabled type="email" placeholder="name@student.tudelft.nl" className="rounded-2xl border-slate-100 bg-slate-50 h-14 px-6 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                    <Input disabled type="tel" placeholder="+31 6..." className="rounded-2xl border-slate-100 bg-slate-50 h-14 px-6 text-sm" />
                  </div>
                </div>

                <Button disabled className="w-full bg-slate-200 text-slate-400 h-16 text-xs font-black uppercase tracking-[0.2em] rounded-2xl">
                  Submit Application <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default TalentHub;