import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sofia van der Berg",
    role: "Aerospace Engineering, Year 2",
    country: "Netherlands",
    image: "SV",
    rating: 5,
    quote: "The Proctortrack Simulator was a game-changer. I walked into my selection exam feeling like I'd already done it ten times. Passed with a top 10% ranking!",
    highlight: "Proctortrack Simulator",
  },
  {
    name: "Carlos Mendez",
    role: "CSE, Year 1",
    country: "Spain",
    image: "CM",
    rating: 5,
    quote: "I was struggling with my BSA at 38 credits after Q2. The tutoring and BSA Tracker helped me plan my resits strategically. Ended with 52 ECTS!",
    highlight: "BSA Tracker",
  },
  {
    name: "Aisha Patel",
    role: "Aerospace Engineering, Year 2",
    country: "India",
    image: "AP",
    rating: 5,
    quote: "As an international student, the Virtual Embassy service was invaluable. Finding housing in Delft is brutal, but they connected me with verified options before I even arrived.",
    highlight: "Virtual Embassy",
  },
  {
    name: "Thomas Andersson",
    role: "MSc Aerospace, Year 1",
    country: "Sweden",
    image: "TA",
    rating: 5,
    quote: "The MSc Bridge program prepared me perfectly for the transition. The GRE prep and portfolio coaching made my application stand out.",
    highlight: "MSc Bridge",
  },
  {
    name: "Elena Fischer",
    role: "Parent",
    country: "Germany",
    image: "EF",
    rating: 5,
    quote: "As a parent, the transparency and communication from DelftQuest gave me peace of mind. My son is now thriving in his second year at TU Delft.",
    highlight: "Parent Perspective",
  },
];

export function Testimonials() {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            Success Stories
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real feedback from students and parents who achieved their TU Delft dreams with us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <Card key={index} className="border-border bg-card relative">
              <CardContent className="pt-8 pb-6">
                <Quote className="h-8 w-8 text-primary/20 absolute top-4 right-4" />
                
                {/* Rating */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                  "{testimonial.quote}"
                </p>

                {/* Highlight Tag */}
                <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-medium mb-4 inline-block">
                  {testimonial.highlight}
                </span>

                {/* Author */}
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role} • {testimonial.country}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional testimonials in a smaller format */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-6">
          {testimonials.slice(3).map((testimonial, index) => (
            <Card key={index} className="border-border bg-muted/30">
              <CardContent className="py-6">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold flex-shrink-0">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">
                      "{testimonial.quote}"
                    </p>
                    <div className="text-sm">
                      <span className="font-semibold text-foreground">{testimonial.name}</span>
                      <span className="text-muted-foreground"> • {testimonial.role}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
