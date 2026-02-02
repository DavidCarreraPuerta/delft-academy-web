import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Feature {
  name: string;
  delftengineering: boolean;
  competitor: boolean;
  highlight?: boolean;
}

const features: Feature[] = [
  { name: "BSc Entrance Exam Prep", delftengineering: true, competitor: true },
  { name: "1:1 Tutoring", delftengineering: true, competitor: false, highlight: true },
  { name: "Proctortrack Simulator", delftengineering: true, competitor: false, highlight: true },
  { name: "Non Cognitive Assessment Training", delftengineering: true, competitor: false, highlight: true },
  { name: "Year 1 Tutoring", delftengineering: true, competitor: false, highlight: true },
  { name: "Master Exam Entrance Prep", delftengineering: true, competitor: false, highlight: true },
];

const FeatureIcon = ({ value, isCompetitor = false }: { value: boolean; isCompetitor?: boolean }) => {
  if (value === true) {
    return (
      <div className={cn(
        "h-6 w-6 rounded-full flex items-center justify-center",
        isCompetitor ? "bg-slate-100" : "bg-blue-500/10"
      )}>
        <Check className={cn("h-4 w-4", isCompetitor ? "text-slate-500" : "text-blue-500")} strokeWidth={4} />
      </div>
    );
  }
  return (
    <div className="h-6 w-6 rounded-full bg-red-50 flex items-center justify-center">
      <X className="h-4 w-4 text-red-400" strokeWidth={3} />
    </div>
  );
};

export function ComparisonTable() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          
          {/* BANNER DE IMPACTO */}
          <div className="mb-16 bg-slate-900 rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden shadow-2xl border-b-8 border-orange-500">
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] -mr-32 -mt-32" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-4">
                  Don't be just <br />
                  <span className="text-orange-500">another number</span>
                </h3>
                <p className="text-lg text-slate-400 font-bold uppercase tracking-tight max-w-md mx-auto md:mx-0">
                  Our <span className="text-white">1:1 Personalized Mentorship</span> is why we hold an <span className="text-white">80% acceptance rate</span>.
                </p>
              </div>
              
              <div className="hidden md:block w-px h-24 bg-slate-800" />
              
              <div className="flex flex-col items-center md:items-end">
                <div className="text-6xl md:text-8xl font-black text-orange-500 italic leading-none">80%</div>
                <div className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-500 mt-2">Acceptance Rate</div>
              </div>
            </div>
          </div>

          <div className="text-center mb-10">
            <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">
              The Platform <span className="text-orange-500">Breakdown</span>
            </h4>
          </div>

          <div className="bg-white rounded-[2rem] border-2 border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/50">
            <div className="grid grid-cols-3 bg-slate-900 text-white">
              <div className="px-8 py-6 font-black uppercase tracking-widest text-[11px] opacity-50">Service Blueprint</div>
              <div className="px-8 py-6 text-center font-black uppercase tracking-widest text-sm bg-orange-600">
                Delft Engineering Academy
              </div>
              <div className="px-8 py-6 text-center font-black uppercase tracking-widest text-[11px] text-slate-500">
                Others
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={cn(
                    "grid grid-cols-3 items-center transition-all duration-300",
                    feature.highlight ? "bg-orange-50/30" : "hover:bg-slate-50/80"
                  )}
                >
                  <div className="px-8 py-5 flex items-center gap-3">
                    <span className={cn(
                      "text-xs font-black uppercase tracking-tight",
                      feature.highlight ? "text-slate-900" : "text-slate-500"
                    )}>
                      {feature.name}
                    </span>
                    {feature.highlight && (
                      <span className="text-[8px] px-2 py-0.5 rounded-full bg-orange-500 text-white font-black uppercase tracking-tighter shadow-sm shadow-orange-200">
                        Unique
                      </span>
                    )}
                  </div>
                  <div className="px-8 py-5 flex justify-center bg-orange-50/10 border-x border-orange-100/30">
                    <FeatureIcon value={feature.delftengineering} />
                  </div>
                  <div className="px-8 py-5 flex justify-center">
                    <FeatureIcon value={feature.competitor} isCompetitor={true} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}