import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket, Code, CheckCircle2 } from "lucide-react";

const aerospaceFeatures = [
  "Complete Selection Exam Preparation",
  "Proctortrack Simulator Access",
  "Systematic Reasoning Training",
  "Non-Cognitive Assessment Prep",
  "1-on-1 Tutoring Sessions",
  "Success Roadmap 2026/27 Guide",
];

const cseFeatures = [
  "CSE Programme Coming Soon",
  "Early Access Registration",
  "Similar Comprehensive Support",
  "Tailored for Computer Science",
  "Expert CSE Tutors",
  "Complete Application Support",
];

export default function SuccessRoadmap() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-20 lg:py-28 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
              Your Journey Starts Here
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Go to Success Roadmap 2026/27
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Choose your pathway and start your journey to TU Delft
            </p>
          </div>
        </div>
      </section>

      {/* Two Columns Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Aerospace Column */}
            <Card className="border-border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Rocket className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-foreground">
                      Aerospace Engineering
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Complete preparation programme
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {aerospaceFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="default" className="w-full" size="lg" asChild>
                  <Link to="/register?program=aerospace">
                    I want to start
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* CSE Column */}
            <Card className="border-border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-foreground">
                      Computer Science & Engineering
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Programme launching soon
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {cseFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full" size="lg" asChild>
                  <Link to="/register?program=cse">
                    I want to start
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
