import { TrendingUp, Users, Award, GraduationCap } from "lucide-react";

const metrics = [
  {
    icon: TrendingUp,
    value: "95%",
    label: "Admission Rate",
    description: "Selection exam success",
  },
  {
    icon: Users,
    value: "200+",
    label: "Active Mentors",
    description: "TU Delft students & alumni",
  },
  {
    icon: Award,
    value: "98%",
    label: "BSA Pass Rate",
    description: "First-year retention",
  },
  {
    icon: GraduationCap,
    value: "2,500+",
    label: "Students Helped",
    description: "Since 2020",
  },
];

export function MetricsSection() {
  return (
    <section className="py-16 bg-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            Our Impact
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-background">
            Why Choose DelftQuest Academy
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="text-center">
                <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-background mb-1">
                  {metric.value}
                </div>
                <div className="text-sm font-medium text-background/80 mb-1">
                  {metric.label}
                </div>
                <div className="text-xs text-background/50">
                  {metric.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
