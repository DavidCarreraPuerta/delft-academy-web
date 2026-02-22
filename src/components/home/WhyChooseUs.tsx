import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { 
  TrendingUp, Shield, Lightbulb, Monitor, Heart, Users, Target, Quote, Star, Plus, ChevronLeft, ChevronRight 
} from "lucide-react";

const MINIMUM_REVIEWS_VISIBLE = 1;

// Función para obtener el emoji correspondiente a la nota real
const getFeedbackEmoji = (rating: number) => {
  if (rating >= 4.5) return "🤩"; // Excellent
  if (rating >= 3.5) return "😊"; // Good
  if (rating >= 2.5) return "😐"; // OK
  if (rating >= 1.5) return "😕"; // Needs Improvement
  return "😢"; // Poor
};

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
  const [ratingStats, setRatingStats] = useState<{avg: string, total: number, reviews: any[]} | null>(null);
  const [currentReviewIdx, setCurrentReviewIdx] = useState(0);

  useEffect(() => {
    const fetchRatings = async () => {
      const { data } = await supabase
        .from('user_feedback')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data && data.length > 0) {
        const sum = data.reduce((acc, curr) => acc + (curr.rating_value || 0), 0);
        setRatingStats({
          avg: (sum / data.length).toFixed(1),
          total: data.length,
          reviews: data.filter(r => r.comment && r.comment.length > 2)
        });
      }
    };
    fetchRatings();
  }, []);

  useEffect(() => {
    if (ratingStats && ratingStats.reviews.length > 1) {
      const interval = setInterval(() => {
        setCurrentReviewIdx((prev) => (prev + 1) % ratingStats.reviews.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [ratingStats]);

  const nextReview = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!ratingStats) return;
    setCurrentReviewIdx((prev) => (prev + 1) % ratingStats.reviews.length);
  };

  const prevReview = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!ratingStats) return;
    setCurrentReviewIdx((prev) => (prev - 1 + ratingStats.reviews.length) % ratingStats.reviews.length);
  };

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
                  "relative border-2 transition-all duration-500 h-[530px] overflow-hidden group cursor-pointer rounded-[2rem]",
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
                    
                    <div className="mt-auto space-y-4">
                      {section.stats ? (
                        <div className="grid grid-cols-1 gap-1">
                          <div className="border-t border-slate-100 pt-2">
                            <div className="text-4xl font-black text-slate-900 italic tracking-tighter leading-none">{section.stats[0].value}</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{section.stats[0].label}</div>
                          </div>

                          {index === 0 && ratingStats && ratingStats.total >= MINIMUM_REVIEWS_VISIBLE && (
                            <div className="pt-3 pb-2">
                               <div className="flex items-center gap-3">
                                  <div className="text-4xl font-black text-slate-900 italic tracking-tighter leading-none">
                                    {ratingStats.avg}
                                  </div>
                                  <div className="flex flex-col justify-center">
                                    <div className="flex text-orange-500">
                                      {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={cn("h-4 w-4", i < Math.floor(parseFloat(ratingStats.avg)) ? "fill-current" : "text-slate-200")} />
                                      ))}
                                    </div>
                                    <div className="text-[9px] font-black text-[#00a6d6] uppercase tracking-widest mt-1">
                                      Avg. Rating ({ratingStats.total} reviews)
                                    </div>
                                  </div>
                               </div>

                               {ratingStats.reviews.length > 0 && (
                                 <div 
                                   className="mt-6 bg-slate-50 rounded-2xl p-4 border border-slate-100 relative shadow-sm"
                                   onClick={(e) => e.stopPropagation()}
                                 >
                                   <div className="flex items-center justify-between mb-2">
                                      <div className="flex items-center gap-2">
                                        <img 
                                          src={ratingStats.reviews[currentReviewIdx].avatar_url || `https://ui-avatars.com/api/?name=${ratingStats.reviews[currentReviewIdx].user_name || 'Student'}&background=00a6d6&color=fff`} 
                                          className="h-6 w-6 rounded-full border border-white shadow-sm" 
                                          alt="avatar" 
                                        />
                                        <span className="text-[10px] font-bold text-slate-700 uppercase tracking-tight">
                                          {ratingStats.reviews[currentReviewIdx].user_name || "Verified Student"}
                                        </span>
                                      </div>
                                      {/* SUSTITUCIÓN: EMOJI EN LUGAR DE ESTRELLAS */}
                                      <div className="text-lg" title={`Rating: ${ratingStats.reviews[currentReviewIdx].rating_value}`}>
                                        {getFeedbackEmoji(ratingStats.reviews[currentReviewIdx].rating_value)}
                                      </div>
                                   </div>
                                   <p className="text-[11px] italic text-slate-500 leading-snug min-h-[44px] line-clamp-3 px-1">
                                     "{ratingStats.reviews[currentReviewIdx].comment}"
                                   </p>
                                   <div className="flex justify-end gap-2 mt-3 border-t border-slate-200/50 pt-2">
                                      <button onClick={prevReview} className="p-1 hover:bg-white rounded-full transition-all text-slate-300 hover:text-[#00a6d6]"><ChevronLeft className="h-4 w-4" /></button>
                                      <button onClick={nextReview} className="p-1 hover:bg-white rounded-full transition-all text-slate-300 hover:text-[#00a6d6]"><ChevronRight className="h-4 w-4" /></button>
                                   </div>
                                 </div>
                               )}
                            </div>
                          )}

                          <div className="border-t border-slate-100 pt-3">
                            <div className="text-4xl font-black text-slate-900 italic tracking-tighter leading-none">{section.stats[1].value}</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{section.stats[1].label}</div>
                          </div>
                        </div>
                      ) : (
                        <ul className="space-y-2 pt-4 border-t border-slate-100">
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