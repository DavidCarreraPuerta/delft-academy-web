import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Clock, Users, Award, ArrowRight, Plane, Cpu } from "lucide-react";
import { Link } from "react-router-dom";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  faculty: "Aerospace" | "CSE";
  level: string;
  features: string[];
  popular?: boolean;
}

const courses: Course[] = [
  {
    id: "bsc-aerospace-selection",
    title: "Aerospace Selection Masterclass",
    description: "Complete preparation for the Aerospace Engineering selection exam including math, physics, and spatial reasoning.",
    duration: "8 weeks",
    faculty: "Aerospace",
    level: "BSc Applicant",
    features: ["Mock Exams", "Video Lessons", "1-on-1 Coaching"],
    popular: true,
  },
  {
    id: "cse-cst-prep",
    title: "CSE CST Exam Preparation",
    description: "Master the Computational Science Test with our structured program covering algorithms, logic, and problem-solving.",
    duration: "6 weeks",
    faculty: "CSE",
    level: "BSc Applicant",
    features: ["Practice Tests", "Coding Exercises", "Live Sessions"],
    popular: true,
  },
  {
    id: "first-year-survival",
    title: "First Year Success Kit",
    description: "Everything you need to conquer your first year: math refreshers, study techniques, and BSA strategy.",
    duration: "12 weeks",
    faculty: "Aerospace",
    level: "1st Year Student",
    features: ["BSA Tracker", "Study Groups", "Mentor Support"],
  },
  {
    id: "msc-gre-prep",
    title: "GRE Quantitative Intensive",
    description: "Targeted preparation for the GRE Quantitative section required for many MSc programs.",
    duration: "4 weeks",
    faculty: "CSE",
    level: "MSc Applicant",
    features: ["Full-Length Tests", "Score Guarantee", "Expert Tutors"],
  },
];

const FacultyIcon = ({ faculty }: { faculty: Course["faculty"] }) => {
  return faculty === "Aerospace" ? (
    <Plane className="h-4 w-4" />
  ) : (
    <Cpu className="h-4 w-4" />
  );
};

export function CourseCards() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Featured Programs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert-designed courses taught by TU Delft alumni and certified tutors
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="group relative overflow-hidden border-border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {course.popular && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary text-primary-foreground">Popular</Badge>
                </div>
              )}

              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1.5 text-xs"
                  >
                    <FacultyIcon faculty={course.faculty} />
                    {course.faculty}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {course.level}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
              </CardHeader>

              <CardContent className="pb-4">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-primary" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-primary" />
                    TU Delft Alumni
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {course.features.map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 rounded-full bg-accent text-accent-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <Button variant="outline" className="w-full group/btn" asChild>
                  <Link to={`/course/${course.id}`}>
                    Learn More
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="delft" size="lg" asChild>
            <Link to="/courses">
              View All Programs
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
