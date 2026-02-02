import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Euro, Clock } from "lucide-react";

export function TalentHubBanner() {
  return (
    <section className="py-16 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
                <GraduationCap className="h-4 w-4" />
                TU Delft Students & Alumni
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-background mb-4">
                Join Our Elite Teaching Staff
              </h2>

              <p className="text-lg text-background/70 mb-8 leading-relaxed">
                Monetize your knowledge while helping the next generation of engineers. 
                Flexible hours, competitive pay, and the satisfaction of making a real difference.
              </p>

              <Button variant="delft" size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link to="/talent-hub">
                  Become a Certified Tutor
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Euro, value: "€25-50", label: "Per Hour" },
                { icon: Clock, value: "Flexible", label: "Schedule" },
                { icon: GraduationCap, value: "50+", label: "Active Tutors" },
                { icon: ArrowRight, value: "48h", label: "Quick Approval" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="p-6 rounded-xl bg-background/5 border border-background/10 text-center"
                  >
                    <Icon className="h-6 w-6 text-primary mx-auto mb-3" strokeWidth={1.5} />
                    <div className="text-2xl font-bold text-background mb-1">
                      {item.value}
                    </div>
                    <div className="text-sm text-background/60">
                      {item.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
