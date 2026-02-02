import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  ClipboardCheck, BarChart3, BookOpen, Bike, 
  ExternalLink, Wallet, X, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Resources = () => {
  const [selectedResource, setSelectedResource] = useState<any>(null);

  const resourceCards = [
    {
      id: "guide",
      title: "Application Guide",
      icon: <ClipboardCheck className="w-8 h-8 text-orange-600" />,
      shortDesc: "The Lowdown: Getting into AE isn't just about grades; it's about the Selection Procedure.",
      fullContent: `
        <h2 class="text-2xl font-black italic uppercase mb-4 text-slate-900">The Roadmap to AE</h2>
        <p class="mb-4">Aerospace Engineering at TU Delft is a "Numerus Fixus" programme, which means only 440 students are admitted annually. This creates a highly competitive environment where preparation is key.</p>
        <h3 class="font-bold mt-4 text-orange-600 uppercase text-xs tracking-widest">Key Phases & Deadlines</h3>
        <ul class="list-disc ml-5 mb-4 text-sm">
          <li><strong>Registration:</strong> You must apply via Studielink by 15th January. Missing this date means waiting another year.</li>
          <li><strong>Selection Period:</strong> Taking place in February and March, involving academic tests (Maths/Physics) and a motivation assessment.</li>
        </ul>
        <div class="bg-slate-900 p-6 rounded-2xl text-white italic text-sm border-l-4 border-orange-600">
          <strong>Mentorship Pro Tip:</strong> Don't just study maths; understand the logic of the selection. The committee looks for "trainability"—how fast you can grasp complex aerospace concepts under pressure.
        </div>
      `
    },
    {
      id: "ranking",
      title: "Decoding the Ranking System",
      icon: <BarChart3 className="w-8 h-8 text-orange-600" />,
      shortDesc: "The Secret Sauce: How TU Delft decides who is #1 and who is #500.",
      fullContent: `
        <h2 class="text-2xl font-black italic uppercase mb-4 text-slate-900">Your Golden Ticket: The Ranking Number</h2>
        <p class="mb-4">How does TU Delft decide who gets in? It is a weighted score system designed to predict your success in Year 1.</p>
        <h3 class="font-bold mt-4 text-orange-600 uppercase text-xs tracking-widest">The Mix</h3>
        <p class="mb-4 text-sm">Your rank is usually a combination of your performance in the Academic Test and the Motivation/Interest questionnaire. It's not just about being a genius; it's about being well-rounded.</p>
        <h3 class="font-bold mt-4 text-orange-600 uppercase text-xs tracking-widest">The Outcome</h3>
        <p class="mb-4 text-sm">In mid-April, you'll receive your number. If you are within the top 440, you are in! If you are on the waiting list, stay calm—the list moves as people decline offers throughout the summer.</p>
      `
    },
    {
      id: "curriculum",
      title: "Year 1 Curriculum",
      icon: <BookOpen className="w-8 h-8 text-orange-600" />,
      shortDesc: "The Reality Check: Calculus, Physics, and Statics from week one.",
      fullContent: `
        <h2 class="text-2xl font-black italic uppercase mb-4 text-slate-900">The Survival Manual: First Year Reality</h2>
        <p class="mb-4">The first year at Delft is legendary for its intensity. You are building the foundation of an engineer at a very high pace.</p>
        <h3 class="font-bold mt-4 text-orange-600 uppercase text-xs tracking-widest">Project-Based Learning</h3>
        <p class="mb-4 text-sm">Expect to spend significant time in "Design Synthesis"—working in teams to solve real aerospace problems, from wing design to flight mechanics.</p>
        <h3 class="font-bold mt-4 text-orange-600 uppercase text-xs tracking-widest">The Goal</h3>
        <p class="mb-4 text-sm italic">It is fast and math-heavy. Mastery of Statics and Calculus early on is non-negotiable for survival.</p>
      `
    },
    {
      id: "living",
      title: "Living in Delft Guide",
      icon: <Bike className="w-8 h-8 text-orange-600" />,
      shortDesc: "Beyond the Books: Housing, bikes, and student life survival tips.",
      fullContent: `
        <h2 class="text-2xl font-black italic uppercase mb-4 text-slate-900">Delft Student Life: Beyond the Books</h2>
        <p class="mb-4">Delft is a beautiful, bike-friendly city, but navigating it as a new student requires local knowledge.</p>
        <h3 class="font-bold mt-4 text-orange-600 uppercase text-xs tracking-widest">The Housing Challenge</h3>
        <p class="mb-4 text-sm">Finding a room is the "final boss" of admission. Start your search early (April/May) via DUWO and private platforms. Beware of scams!</p>
        <h3 class="font-bold mt-4 text-orange-600 uppercase text-xs tracking-widest">Essential Transport</h3>
        <p class="mb-4 text-sm">Get a second-hand bike and a very high-quality lock immediately. It is your only essential transport in the Netherlands.</p>
      `
    },
    {
      id: "official",
      title: "Official TU Delft Info",
      icon: <ExternalLink className="w-8 h-8 text-orange-600" />,
      shortDesc: "The Source of Truth: Direct link to formal requirements and deadlines.",
      isExternal: true,
      link: "https://www.tudelft.nl/onderwijs/opleidingen/bachelors/ae/bsc-aerospace-engineering"
    },
    {
      id: "fees",
      title: "Delf Engineering Academy Fees",
      icon: <Wallet className="w-8 h-8 text-orange-600" />,
      shortDesc: "Transparent Pricing: Starting at 40€/session, clear costs for tailored mentorship and plans.",
      fullContent: `
        <h2 class="text-2xl font-black italic uppercase mb-4 text-slate-900">Transparent Pricing: Your Investment</h2>
        <p class="mb-4 text-sm text-slate-600">We believe in clear costs with no surprises. Our fees are structured to be an investment in your engineering future.</p>
        <p class="text-sm font-bold text-slate-900">You don't pay for generic content; you pay for a bespoke plan tailored to your specific academic gaps and admission goals.</p>
      `
    }
  ];

  return (
    <MainLayout>
      <div className="bg-slate-50 min-h-screen pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <header className="mb-16 max-w-2xl">
            <span className="bg-orange-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
              Knowledge Base
            </span>
            <h1 className="text-5xl font-black text-slate-900 italic uppercase tracking-tight mb-6">
              Student <span className="text-orange-600">Resources</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Mentorship and essential survival guides for your TU Delft journey, curated by senior aerospace mentors.
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourceCards.map((card) => (
              <div 
                key={card.id} 
                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  <div className="mb-6 p-3 bg-slate-50 w-fit rounded-2xl group-hover:bg-orange-50 transition-colors duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-3 italic uppercase tracking-tight leading-7">
                    {card.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                    {card.shortDesc}
                  </p>
                </div>
                
                <div>
                  {card.isExternal ? (
                    <Button asChild className="w-full bg-slate-900 hover:bg-orange-600 h-12 rounded-xl font-bold uppercase tracking-widest text-[10px]">
                      <a href={card.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        Go to Official Site <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => setSelectedResource(card)}
                      className="w-full bg-white border-2 border-slate-100 text-slate-900 hover:border-orange-600 hover:text-orange-600 h-12 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all"
                    >
                      Read Summary
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* --- MODAL SYSTEM --- */}
          {selectedResource && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
              <div className="bg-white w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-[3rem] shadow-2xl relative animate-in zoom-in duration-300">
                <button 
                  onClick={() => setSelectedResource(null)}
                  className="absolute top-8 right-8 p-3 hover:bg-slate-100 rounded-full transition-colors z-10"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
                
                <div className="p-12">
                  <div className="mb-8 p-4 bg-orange-50 w-fit rounded-2xl">
                    {selectedResource.icon}
                  </div>
                  <div 
                    className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-headings:font-black prose-headings:uppercase prose-headings:italic"
                    dangerouslySetInnerHTML={{ __html: selectedResource.fullContent }} 
                  />
                  <Button 
                    onClick={() => setSelectedResource(null)}
                    className="mt-12 w-full bg-orange-600 hover:bg-orange-700 text-white h-14 text-xs font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-orange-200"
                  >
                    Got it, thanks!
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Resources;