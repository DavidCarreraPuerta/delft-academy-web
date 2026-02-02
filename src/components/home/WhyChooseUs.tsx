import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
// He añadido Plus y Target que faltaban en tu versión original y causaban parte del error
import { 
  TrendingUp, Shield, Lightbulb, Monitor, Heart, Users, Target, Quote, Star, Plus 
} from "lucide-react";

const whyChooseUsSections = [
  {
    title: "Our Metrics",
    icon: TrendingUp,
    description: "Real results from the 2024-2025 admission cycle",
    stats: [
      { value: "80%", label: "Acceptance Success Rate" },
      { value: "1:1", label: "Personalized Support" },
    ],
    color: "bg-orange-500/10",
    iconColor: "text-orange-500",
    testimonial: {
      quote: "Overall, Marcos prepared me very well, with theory, exercises and insights of how it is to be an aerospace student.",
      author: "Catarina",
      stars: 5
    }
  },
  {
    title: "Why Parents Trust Us",
    icon: Shield,
    description: "Academic and Non-Academic Mentorship for a stress-free journey",
    features: [
      { icon: Shield, text: "Verified TU Delft tutors" },
      { icon: Heart, text: "Clear student guidance" },
    ],
    color: "bg-slate-900/10",
    iconColor: "text-slate-900",
    testimonial: {
      quote: "My son got hooked from the first time. He is very clear in his explanations. We feel lucky to have him.",
      author: "Pierre Christophe (Parent)",
      stars: 5
    }
  },
  {
    title: "Student Experience",
    icon: Lightbulb,
    description: "Support tailored to your learning pace",
    features: [
      { icon: Lightbulb, text: "Thorough explanations" },
      { icon: Users, text: "Understanding of needs" },
    ],
    color: "bg-orange-500/10",
    iconColor: "text-orange-500",
    testimonial: {
      quote: "An extremely skilled teacher and very understanding of the student's needs and learning pace.",
      author: "Paul",
      stars: 5
    }
  },
  {
    title: "Thorough Exam Prep",
    icon: Monitor,
    description: "Winning techniques for the exam",
    features: [
      { icon: Target, text: "Premium Summaries" },
      { icon: Plus, text: "+500 exercises to practice" },
    ],
    color: "bg-slate-900/10",
    iconColor: "text-slate-900",
    testimonial: {
      quote: "Everything was explained thoroughly which really helped me with the preparation for the exam!",
      author: "Agni",
      stars: 5
    }
  },
];

export function WhyChooseUs() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="why-choose-us" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 uppercase tracking-tighter italic">
            Why Choose <span className="text-[#00a6d6]">Delft Engineering Academy</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-bold uppercase tracking-tight">
            The elite path to TU Delft Aerospace Engineering.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUsSections.map((section, index) => {
            const Icon = section.icon;
            const isHovered = hoveredIndex === index;

            return (
              <Card
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "relative border-2 transition-all duration-500 h-[380px] overflow-hidden group cursor-pointer rounded-[2rem]",
                  isHovered 
                    ? "border-orange-500 shadow-2xl scale-105 bg-slate-900 text-white" 
                    : "border-slate-100 bg-card text-slate-900 shadow-sm"
                )}
              >
                <CardContent className="pt-8 pb-6 h-full flex flex-col">
                  <div className={cn(
                    "transition-all duration-500 flex flex-col h-full",
                    isHovered ? "opacity-0 -translate-y-10 invisible" : "opacity-100 translate-y-0 visible"
                  )}>
                    <div className={cn(
                      "h-12 w-12 rounded-xl flex items-center justify-center mb-5",
                      section.color
                    )}>
                      <Icon className={cn("h-6 w-6", section.iconColor)} />
                    </div>
                    <h3 className="text-xl font-black uppercase mb-2 leading-tight tracking-tighter">{section.title}</h3>
                    <p className="text-[13px] text-slate-500 mb-4 font-bold uppercase tracking-tight leading-snug">{section.description}</p>
                    
                    <div className="mt-auto">
                      {section.stats ? (
                        <div className="grid grid-cols-1 gap-2">
                          {section.stats.map((stat, i) => (
                            <div key={i} className="border-t border-slate-100 pt-2">
                              <div className="text-3xl font-black text-slate-900 italic tracking-tighter">{stat.value}</div>
                              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <ul className="space-y-2">
                          {section.features?.map((f, i) => (
                            <li key={i} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-slate-600">
                              <f.icon className="h-3.5 w-3.5 text-orange-500" />
                              {f.text}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className={cn(
                    "absolute inset-0 p-8 flex flex-col justify-center transition-all duration-500 bg-slate-900",
                    isHovered ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-10 invisible"
                  )}>
                    <Quote className="h-8 w-8 text-orange-500 mb-4" />
                    <div className="flex gap-1 mb-3">
                      {[...Array(section.testimonial.stars)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-orange-500 text-orange-500" />
                      ))}
                    </div>
                    <p className="text-sm font-bold italic text-slate-200 mb-6 leading-relaxed">
                      "{section.testimonial.quote}"
                    </p>
                    <div className="mt-auto border-t border-slate-700 pt-4">
                      <p className="text-orange-500 font-black uppercase tracking-tighter text-md">
                        {section.testimonial.author}
                      </p>
                      <p className="text-slate-500 text-[9px] font-bold uppercase tracking-[0.2em]">Verified Student</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}