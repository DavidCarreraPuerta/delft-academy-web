import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Users, BookOpen, PenTool, Monitor, FileText, 
  Target, GraduationCap, Trophy, ChevronRight, HardHat // Añadido HardHat para la nueva sección
} from "lucide-react";
import { cn } from "@/lib/utils";

const pillars = [
  {
    id: "bsc-admissions",
    title: "BSc Admission",
    tagline: "Turn uncertainty into confidence",
    description: "Secure your place among the top-ranked candidates. We provide the technical mastery and psychological edge needed to guarantee your admission.",
    features: [
      { icon: Users, label: "1:1 Expert Coaching" }, // 1
      { icon: BookOpen, label: "Math & Physics Summaries" }, // 2
      { icon: HardHat, label: "Introduction to Engineering" }, // 3 (Nuevo)
      { icon: PenTool, label: "Practice Exams & Q&A" }, // 4
      { icon: Monitor, label: "Proctortrack Simulator" }, // 5
    ],
    link: "/bsc-admissions",
    accent: "bg-[#00a6d6]",
  },
  {
    id: "bsc-launchpad",
    title: "BSc Launchpad",
    tagline: "Don't just survive, aim for Honours",
    description: "Transition from high school to a +8.5 GPA. Strategic mentorship designed to help you secure your BSA and excel in your first year.",
    features: [
      { icon: Target, label: "BSA Strategic Tracker" }, // 1 (Reordenado)
      { icon: GraduationCap, label: "Academic Mentorship" }, // 2
      { icon: Trophy, label: "Honours Programme Path" }, // 3
      { icon: Users, label: "Delft Life Support" }, // 4
    ],
    link: "/first-year",
    accent: "bg-orange-500",
  },
  {
    id: "msc-bridge",
    title: "MSc Bridge",
    tagline: "Elite prep for international candidates",
    description: "The definitive bridge for external students. Master the entrance requirements and stand out in the competitive MSc selection process.",
    features: [
      { icon: Users, label: "1:1 Tutoring Sessions" }, // 1 (Reordenado)
      { icon: PenTool, label: "Entrance Exam Training" }, // 2
      { icon: FileText, label: "GRE Quantitative Prep" }, // 3
      { icon: FileText, label: "Motivation Letter Framework" }, // 4
    ],
    link: "/msc-bridge",
    accent: "bg-[#00a6d6]",
  },
];

export function ProductPillars() {
  return (
    <section className="py-12 px-4">
      <div className="bg-slate-900 rounded-[2.5rem] py-16 px-6 md:px-12 shadow-2xl max-w-6xl mx-auto relative overflow-hidden border-b-4 border-orange-500">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00a6d6]/10 rounded-full blur-3xl -mr-20 -mt-20" />
        
        <div className="relative z-10">
          <div className="text-center mb-12">
            <p className="text-[11px] font-black text-[#00a6d6] uppercase tracking-[0.3em] mb-3">
              Delft Engineering Academy
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 italic tracking-tighter">
              Three Pillars of <span className="text-orange-500">Excellence</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium leading-tight">
              From Admission Prep to Master's Excellence. <br />
              Personalized 1:1 support for every stage of your journey.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <Card
                key={pillar.id}
                className="group relative overflow-hidden border-none bg-white/5 backdrop-blur-sm hover:bg-white transition-all duration-500 hover:-translate-y-2 rounded-[2rem]"
              >
                <div className={cn("h-1.5 w-full", pillar.accent)} />
                
                <CardHeader className="pt-8 pb-4 text-center md:text-left">
                  <div className="mb-3">
                    <h3 className="text-2xl font-black text-white group-hover:text-slate-900 mb-1 italic tracking-tight transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-orange-500 font-bold text-[10px] uppercase tracking-widest">
                      {pillar.tagline}
                    </p>
                  </div>
                  <p className="text-slate-400 group-hover:text-slate-600 leading-relaxed text-xs font-medium transition-colors">
                    {pillar.description}
                  </p>
                </CardHeader>

                <CardContent className="pt-2 pb-8">
                  <div className="flex flex-col gap-2 mb-8">
                    {pillar.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 group-hover:bg-slate-50 transition-all border border-white/5 group-hover:border-slate-100">
                        <feature.icon className="h-4 w-4 text-orange-500 flex-shrink-0" />
                        <span className="text-[10px] font-black text-white group-hover:text-slate-800 uppercase tracking-tight">
                          {feature.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full h-12 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-black rounded-xl uppercase tracking-widest text-[10px] transition-all" 
                    asChild
                  >
                    <Link to={pillar.link} className="flex items-center justify-center gap-2">
                      Explore Program <ChevronRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}