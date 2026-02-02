import { Rocket, GraduationCap, Shield, Book, PenTool, Users } from "lucide-react";

const steps = [
  { icon: Rocket, label: "BSc Prep", sub: "Admission" },
  { icon: GraduationCap, label: "Admitted", sub: "Welcome" },
  { icon: Shield, label: "1st Year Survival", sub: "BSA Support" },
  { icon: Book, label: "BSc Graduate", sub: "Bachelor" },
  { icon: PenTool, label: "MSc Bridge", sub: "Elite Prep" },
  { icon: Users, label: "Alumni Tutor", sub: "Network" },
];

export function RoadmapSection() {
  return (
    <section className="w-full bg-white pt-8 pb-4 border-b border-slate-100">
      <div className="container mx-auto px-4">
        {/* Título de sección pequeño y discreto  */}
        <p className="text-[25px] font-black text-center text-slate-400 uppercase tracking-[0.3em] mb-8">
          Your TU Delft Journey
        </p>

        <div className="flex items-start justify-between max-w-6xl mx-auto relative">
          
          {/* Línea de conexión dinámica (Naranja/Gris) */}
          <div className="absolute top-10 left-0 w-full h-[3px] bg-slate-100 z-0 rounded-full" />
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative z-10 flex flex-col items-center flex-1 px-2 group">
                {/* Icono más grande y con más presencia */}
                <div className="bg-white p-4 rounded-2xl border-2 border-slate-100 shadow-sm mb-4 group-hover:border-orange-500 group-hover:shadow-orange-100 transition-all duration-300 transform group-hover:-translate-y-1">
                  <Icon className="h-8 w-8 text-slate-900 group-hover:text-orange-500 transition-colors" strokeWidth={2} />
                  
                  {/* Badge de número de paso */}
                  <div className="absolute -top-2 -right-2 h-6 w-6 bg-slate-900 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white group-hover:bg-orange-500 transition-colors">
                    {index + 1}
                  </div>
                </div>
                
                {/* Textos con jerarquía clara */}
                <div className="text-center">
                  <h4 className="text-sm font-black uppercase tracking-tighter text-slate-900 leading-tight">
                    {step.label}
                  </h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500 mt-1 opacity-80">
                    {step.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}