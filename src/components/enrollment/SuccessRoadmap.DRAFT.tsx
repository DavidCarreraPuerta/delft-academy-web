import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  FileCheck, 
  GraduationCap, 
  Home, 
  Trophy, 
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface SuccessRoadmapProps {
  onContinue: () => void;
}

const roadmapItems = [
  {
    date: "15 Jan 2026",
    title: "Studielink Deadline",
    description: "Official deadline for Numerus Fixus programs (Aerospace/CSE)",
    icon: FileCheck,
    status: "critical",
    isPast: false,
  },
  {
    date: "Feb 2026",
    title: "Matching Phase Begins",
    description: "Access to TU Delft Digital Environment and matching activities",
    icon: GraduationCap,
    status: "upcoming",
    isPast: false,
  },
  {
    date: "02 Mar 2026",
    title: "Academic Aptitude Assessment",
    description: "Deadline for Aerospace program assessment submission",
    icon: FileCheck,
    status: "upcoming",
    isPast: false,
  },
  {
    date: "07-14 Mar 2026",
    title: "CSE Selection Exam Days",
    description: "Computational Science Test (CST) examination period",
    icon: Calendar,
    status: "upcoming",
    isPast: false,
  },
  {
    date: "11 Mar 2026",
    title: "Aerospace Selection Exam",
    description: "The big day! Your selection exam for Aerospace Engineering",
    icon: Trophy,
    status: "critical",
    isPast: false,
  },
  {
    date: "15 Apr 2026",
    title: "Ranking Number Published",
    description: "The moment of truth! Results are announced",
    icon: Trophy,
    status: "critical",
    isPast: false,
  },
  {
    date: "May-Jun 2026",
    title: "Housing Deadline",
    description: "Critical deadline for DUWO and university accommodation",
    icon: Home,
    status: "warning",
    isPast: false,
  },
];

export function SuccessRoadmap({ onContinue }: SuccessRoadmapProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Calendar className="h-4 w-4" />
          Your Success Timeline
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Success Roadmap <span className="text-primary">2026</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          These are your critical deadlines for TU Delft admission. 
          Starting early is the key to success!
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-3xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
        
        <div className="space-y-4">
          {roadmapItems.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === roadmapItems.length - 1;
            
            return (
              <Card 
                key={index}
                className={`relative transition-all hover:shadow-md ${
                  item.status === "critical" 
                    ? "border-primary/50 bg-primary/5" 
                    : item.status === "warning"
                    ? "border-amber-500/50 bg-amber-500/5"
                    : ""
                }`}
              >
                {/* Timeline Dot - Desktop */}
                <div className="absolute left-8 -translate-x-1/2 top-1/2 -translate-y-1/2 hidden md:flex">
                  <div className={`h-4 w-4 rounded-full border-2 ${
                    item.status === "critical" 
                      ? "border-primary bg-primary" 
                      : item.status === "warning"
                      ? "border-amber-500 bg-amber-500"
                      : "border-border bg-background"
                  }`} />
                </div>

                <CardContent className="py-4 md:pl-20">
                  <div className="flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${
                      item.status === "critical" 
                        ? "bg-primary/10 text-primary" 
                        : item.status === "warning"
                        ? "bg-amber-500/10 text-amber-500"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-sm font-semibold ${
                          item.status === "critical" 
                            ? "text-primary" 
                            : item.status === "warning"
                            ? "text-amber-500"
                            : "text-muted-foreground"
                        }`}>
                          {item.date}
                        </span>
                        {item.status === "critical" && (
                          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            Critical
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <Card className="max-w-3xl mx-auto bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <CardContent className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-1">Ready to Start Your Journey?</h3>
              <p className="text-primary-foreground/80 text-sm">
                Create your account and get personalized guidance from Day 1.
              </p>
            </div>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={onContinue}
              className="shrink-0"
            >
              Create Account
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
