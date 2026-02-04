import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Sparkles, Banknote, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const FAQ = () => {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  // Effect to handle smooth scrolling to #pricing
  useEffect(() => {
    if (hash === "#pricing") {
      const element = document.getElementById("pricing-selection");
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    }
  }, [hash]);

  const handleCTAClick = () => {
    if (session) {
      navigate("/free-consultation");
    } else {
      navigate("/auth");
    }
  };

  const faqSections = [
    {
      title: "Admissions & Ranking",
      id: "admissions",
      icon: HelpCircle,
      items: [
        {
          question: "When should I start preparing my entrance for the BSc in Aerospace Engineering?",
          answer: "The sooner, the better. Most successful candidates start preparing at least 3-4 months in advance to master the advanced Physics and Maths required for the selection test."
        },
        {
          question: "How is the ranking number calculated?",
          answer: "Your rank is a weighted result of your Academic Test scores and your Motivation assessment. It's a competitive process designed to predict success in the intensive first year."
        },
        {
          question: "I have a ranking number above 440. Is there still a chance to get in?",
          answer: "Yes. Many students in the top 440 decline their offers. The ranking list moves steadily through the summer, and students with numbers up to 550 or higher often secure a spot."
        }
      ]
    },
    {
      title: "Pricing & Payments",
      id: "pricing-selection",
      icon: Banknote,
      items: [
        {
          question: "How much does the preparation program cost?",
          answer: "Our prices are highly competitive within the personalized training sector: 50€/session, the total cost depends entirely on the number of sessions required for your specific path, ensuring you only pay for what you need. More details provided in the Free Consultation Call."
        },
        {
          question: "How and when do I pay for my sessions?",
          answer: "Transparency is key: payment is only made upon completion of the session. If a session is cancelled due to a justified reason, there is no cost to the student."
        },
        {
          question: "What is the policy for missed sessions?",
          answer: "Commitment is vital for success. If a student fails to attend a session without justification, they will lose their continuity in the program, and the tutor will be released from further obligation to continue."
        }
      ]
    },
    {
      title: "Academy Programs & Tutoring",
      id: "programs",
      icon: HelpCircle,
      items: [
        {
          question: "Why is the Free Consultation Call mandatory and free?",
          answer: "It's critical for our success. Our tutors invest this time to build your 'Path to Success' and ensure both parties are fully committed. It's free because we only want students who are a perfect fit for our high standards."
        },
        {
          question: "How do I secure tutor availability for my preparation?",
          answer: "Tutor spots are limited to maintain high quality. Availability is only guaranteed for students who confirm their access to the program early."
        }
      ]
    }
  ];

  return (
    <MainLayout>
      <div className="bg-slate-50 min-h-screen pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <header className="mb-16 text-left">
            <span className="bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
              Support Center
            </span>
            <h1 className="text-5xl font-black text-slate-900 italic uppercase tracking-tight mb-6">
              Frequently Asked <span className="text-orange-600">Questions</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Professional insights to help you navigate your journey to and through TU Delft.
            </p>
          </header>

          {faqSections.map((section, sIndex) => (
            <div 
              key={sIndex} 
              id={section.id} 
              className={cn(
                "mb-12 transition-all duration-1000 p-4 rounded-[2.5rem]",
                hash === "#pricing" && section.id === "pricing-selection" ? "bg-orange-100/50 ring-2 ring-orange-500/20" : ""
              )}
            >
              <div className="flex items-center gap-2 mb-6">
                <section.icon className="h-5 w-5 text-orange-600" />
                <h2 className="text-xl font-black text-slate-900 uppercase italic tracking-tight">
                  {section.title}
                </h2>
              </div>
              
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden p-2">
                <Accordion type="single" collapsible className="w-full">
                  {section.items.map((item, iIndex) => (
                    <AccordionItem 
                      key={iIndex} 
                      value={`item-${sIndex}-${iIndex}`} 
                      className="border-none px-6"
                    >
                      <AccordionTrigger className="text-left font-bold text-slate-800 hover:text-orange-600 transition-all text-lg py-5 hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-500 text-base leading-relaxed pb-6 font-medium">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          ))}

          {/* Final CTA - Now Fully Functional */}
          <div className="mt-20 p-12 bg-slate-900 rounded-[3rem] text-center relative overflow-hidden shadow-2xl border border-white/5">
             <div className="relative z-10">
                <h3 className="text-3xl font-black text-white uppercase italic mb-4">Still have doubts?</h3>
                <p className="text-slate-400 mb-10 max-w-md mx-auto font-medium">
                  Our Qualified Tutors are ready to build your custom path to TU Delft success.
                </p>
                <Button 
                  onClick={handleCTAClick}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-widest text-xs py-8 px-12 rounded-2xl shadow-xl shadow-orange-900/20 transition-all hover:scale-105 active:scale-95 group"
                >
                  Book a Free Consultation Call
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
             </div>
             <Sparkles className="absolute top-[-20px] right-[-20px] h-48 w-48 text-white/5" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FAQ;