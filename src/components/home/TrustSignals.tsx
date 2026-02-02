import { Card, CardContent } from "@/components/ui/card";
import { Shield, TrendingUp, Heart, Lightbulb, Users, Award } from "lucide-react";

const parentReasons = [
  {
    icon: Shield,
    title: "Safety First",
    description: "All tutors are verified TU Delft students with background checks. Your child learns in a secure, professional environment.",
  },
  {
    icon: TrendingUp,
    title: "Proven ROI",
    description: "95% selection success rate. Our students don't just get in—they excel. Average first-year GPA improvement of 1.2 points.",
  },
  {
    icon: Heart,
    title: "Mental Well-being",
    description: "We address the psychological aspects of high-stakes exams. Stress management and confidence building are core to our approach.",
  },
];

const studentReasons = [
  {
    icon: Lightbulb,
    title: "Insider Knowledge",
    description: "Learn from tutors who recently passed the same exams. Get real insights into what actually matters for success.",
  },
  {
    icon: Users,
    title: "Peer Mentorship",
    description: "Connect with students who understand your journey. Our community provides support beyond just academics.",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description: "Join 2,000+ students who've achieved their TU Delft dreams with our platform.",
  },
];

export function TrustSignals() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Parents Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
              For Parents
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Parents Trust Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We understand your investment in your child's future. Here's why families choose DelftQuest Academy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {parentReasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <Card key={index} className="border-border bg-card">
                  <CardContent className="pt-8 pb-8">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                      <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {reason.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Students Section */}
        <div>
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
              For Students
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Students Love Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real support from people who've been exactly where you are now.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {studentReasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <Card key={index} className="border-border bg-card">
                  <CardContent className="pt-8 pb-8">
                    <div className="h-12 w-12 rounded-lg bg-foreground flex items-center justify-center mb-6">
                      <Icon className="h-6 w-6 text-background" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {reason.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
