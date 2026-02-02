import { useState } from "react";
import { cn } from "@/lib/utils";
import { GraduationCap, BookOpen, Users } from "lucide-react";

type Persona = "prospective" | "current" | "tutor";

interface PersonaOption {
  id: Persona;
  label: string;
  description: string;
  icon: typeof GraduationCap;
  features: string[];
}

const personas: PersonaOption[] = [
  {
    id: "prospective",
    label: "Prospective Student",
    description: "Applying to TU Delft",
    icon: GraduationCap,
    features: [
      "BSc Admission Preparation",
      "Selection Exam Training",
      "Non-Cognitive Skills Module",
      "Proctortrack Simulator",
    ],
  },
  {
    id: "current",
    label: "Current Student",
    description: "Enrolled at TU Delft",
    icon: BookOpen,
    features: [
      "1st Year Success Program",
      "BSA Strategic Tracker",
      "Design Project Toolkits",
      "MSc Preparation",
    ],
  },
  {
    id: "tutor",
    label: "Tutor / Alumni",
    description: "Share your expertise",
    icon: Users,
    features: [
      "Become a Certified Tutor",
      "Flexible Schedule",
      "Competitive Compensation",
      "Help Future Engineers",
    ],
  },
];

export function PersonaToggle() {
  const [activePersona, setActivePersona] = useState<Persona>("prospective");

  const currentPersona = personas.find((p) => p.id === activePersona)!;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Choose Your Path
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We offer tailored programs for every stage of your TU Delft journey
          </p>
        </div>

        {/* Persona Toggle */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {personas.map((persona) => {
            const Icon = persona.icon;
            const isActive = activePersona === persona.id;
            return (
              <button
                key={persona.id}
                onClick={() => setActivePersona(persona.id)}
                className={cn(
                  "flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-delft scale-105"
                    : "bg-card border border-border text-foreground hover:border-primary/50 hover:shadow-md"
                )}
              >
                <Icon className={cn("h-6 w-6", isActive ? "text-primary-foreground" : "text-primary")} />
                <div className="text-left">
                  <div className="font-semibold">{persona.label}</div>
                  <div className={cn("text-sm", isActive ? "text-primary-foreground/80" : "text-muted-foreground")}>
                    {persona.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Features Display */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg animate-fade-in" key={activePersona}>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 rounded-xl gradient-delft flex items-center justify-center shadow-delft">
                <currentPersona.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{currentPersona.label}</h3>
                <p className="text-muted-foreground">{currentPersona.description}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {currentPersona.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg bg-accent/50 border border-primary/10"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">{index + 1}</span>
                  </div>
                  <span className="font-medium text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
