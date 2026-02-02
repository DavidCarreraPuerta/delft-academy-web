import { useState } from "react";
import { cn } from "@/lib/utils";
import { Rocket, Shield, GraduationCap, Users } from "lucide-react";

const journeySteps = [
  { id: "applicant", label: "Applicant", icon: Rocket, description: "Admission Prep" },
  { id: "first-year", label: "1st Year", icon: Shield, description: "BSc Launchpad" },
  { id: "master", label: "Master", icon: GraduationCap, description: "MSc Excellence" },
  { id: "tutor", label: "Tutor", icon: Users, description: "Join the Legacy" },
];

export function JourneyProgressBar() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="w-full bg-white pt-10 pb-6 border-b border-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-[9px] font-black text-[#00a6d6] uppercase tracking-[0.4em] mb-2">
            Delft Engineering Academy
          </p>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">
            From Admission Prep <span className="text-orange-600">to Master's Excellence</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto relative px-4">
          {/* Línea de conexión de fondo */}
          <div className="absolute top-10 left-0 right-0 h-1 bg-slate-100 hidden sm:block rounded-full" />
          
          {/* Línea de progreso activa */}
          <div
            className="absolute top-10 left-0 h-1 bg-orange-500 transition-all duration-700 hidden sm:block rounded-full shadow-[0_0_15px_rgba(249,115,22,0.3)]"
            style={{ width: `${(activeStep / (journeySteps.length - 1)) * 100}%` }}
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-0 relative">
            {journeySteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index <= activeStep;
              const isCurrent = index === activeStep;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className="flex flex-col items-center group transition-all"
                >
                  {/* Nodo del Icono */}
                  <div
                    className={cn(
                      "relative z-10 h-16 w-16 rounded-2xl flex items-center justify-center transition-all duration-500 border-4 shadow-lg",
                      isActive
                        ? "bg-slate-900 border-[#00a6d6] text-[#00a6d6] scale-110"
                        : "bg-white border-slate-100 text-slate-300 group-hover:border-sky-100"
                    )}
                  >
                    <Icon className={cn("h-8 w-8 transition-transform duration-500", isCurrent && "rotate-12")} />
                    
                    <div className={cn(
                      "absolute -top-2 -right-2 h-6 w-6 rounded-full flex items-center justify-center text-[9px] font-black border-2 border-white",
                      isActive ? "bg-[#00a6d6] text-white" : "bg-slate-200 text-slate-500"
                    )}>
                      {index + 1}
                    </div>
                  </div>

                  {/* Etiquetas */}
                  <div className="mt-4 text-center">
                    <div className={cn(
                      "font-black uppercase tracking-tighter text-[12px] transition-colors",
                      isActive ? "text-slate-900" : "text-slate-400"
                    )}>
                      {step.label}
                    </div>
                    <div className={cn(
                      "text-[12px] font-bold tracking-widest mt-1",
                      isActive ? "text-orange-600" : "text-slate-300"
                    )}>
                      {step.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}