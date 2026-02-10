import React from 'react';
import { ShieldCheck, Timer, Video, Calculator, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProctorSimulatorIntroProps {
  isEnrolled?: boolean;
}

export const ProctorSimulatorIntro = ({ isEnrolled = false }: ProctorSimulatorIntroProps) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (isEnrolled) {
      // Navegación específica al simulador
      navigate('/dashboard', { state: { section: 'simulator' } });
    } else {
      navigate('/auth');
    }
  };

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-l-4 border-orange-600 pl-8">
          <div>
            <h2 className="text-5xl font-black italic uppercase text-slate-900 tracking-tighter leading-none">
              Proctortrack <span className="text-orange-600">Simulator</span>
            </h2>
            <p className="text-slate-500 font-bold uppercase text-sm tracking-widest mt-4">
              Mission Briefing for the 11th of March
            </p>
          </div>
          {isEnrolled && (
            <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
              <p className="text-[10px] font-black uppercase italic text-green-600 flex items-center gap-2">
                <ShieldCheck className="w-3 h-3" /> Full Access Granted
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div className="prose prose-slate max-w-none">
              <p className="text-xl text-slate-700 leading-relaxed font-medium">
                The TU Delft Aerospace Selection Exam isn't just about Maths or Physics. It’s about handling the pressure of <span className="text-slate-900 font-bold">90 minutes and 65+ questions</span> while an AI proctor monitors you.
              </p>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden mt-10">
              <div className="p-8 bg-slate-900 text-white flex items-center justify-between">
                <h3 className="text-xl font-black italic uppercase tracking-tighter">The Selection Exam (60%)</h3>
                <span className="text-[10px] font-bold bg-orange-600 px-3 py-1 rounded-full">OFFICIAL STRUCTURE</span>
              </div>
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="p-4 text-[10px] font-black uppercase text-slate-400 pl-8">Subject</th>
                    <th className="p-4 text-[10px] font-black uppercase text-slate-400">Duration</th>
                    <th className="p-4 text-[10px] font-black uppercase text-slate-400">Weighting</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-bold text-slate-700">
                  <tr className="border-b border-slate-50">
                    <td className="p-6 pl-8 italic">Mathematics</td>
                    <td className="p-6">30 Mins</td>
                    <td className="p-6 text-orange-600">30%</td>
                  </tr>
                  <tr className="border-b border-slate-50">
                    <td className="p-6 pl-8 italic">Physics</td>
                    <td className="p-6">30 Mins</td>
                    <td className="p-6 text-orange-600">30%</td>
                  </tr>
                  <tr>
                    <td className="p-6 pl-8 italic">First-Year Material (FYM)</td>
                    <td className="p-6">30 Mins</td>
                    <td className="p-6 text-orange-600">40%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            <h4 className="text-xs font-black uppercase text-slate-400 mb-6 tracking-widest pl-2">Simulator Core Features</h4>
            <FeatureCard icon={<Video className="w-5 h-5" />} title="Virtual Proctoring Feed" desc="Get used to your webcam feed in the corner—it's distracting until you train with it." />
            <FeatureCard icon={<Timer className="w-5 h-5" />} title="Section Lockdowns" desc="Simulates the inability to return to previous subjects. Manage your time or lose your chance." />
            <FeatureCard icon={<Calculator className="w-5 h-5" />} title="Native Digital Calculator" desc="Put your physical calculator away. You must use our integrated tool." />

            <div className="pt-6">
              <Button 
                onClick={handleAction}
                size="lg" 
                className={`w-full py-8 rounded-2xl font-black text-xs uppercase italic transition-all shadow-xl flex items-center justify-center gap-3 ${
                  isEnrolled ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-slate-900 hover:bg-orange-600 text-white'
                }`}
              >
                {isEnrolled ? (
                  <> <Play className="w-4 h-4 fill-current" /> Launch Simulator Now </>
                ) : (
                  <> Unlock Full Access Now <ChevronRight className="w-4 h-4" /> </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex gap-4 group">
    <div className="p-3 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-orange-600 group-hover:text-white transition-all h-fit">
      {icon}
    </div>
    <div>
      <h5 className="text-sm font-black italic uppercase text-slate-900 mb-1">{title}</h5>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);