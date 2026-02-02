import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ProductPillars } from "@/components/home/ProductPillars";
import { CTASection } from "@/components/home/CTASection";
import { JourneyProgressBar } from "@/components/home/JourneyProgressBar";
import { ComparisonTable } from "@/components/home/ComparisonTable";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { ChevronRight, Banknote } from "lucide-react"; // Añadido Banknote
import { useNavigate } from "react-router-dom"; // Importante para la navegación

const Index = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="flex flex-col w-full pb-20">
        
        <JourneyProgressBar />

        <div className="flex flex-col w-full gap-12 md:gap-20">
          
          <section className="pt-2 md:pt-4">
            <HeroSection />
          </section>

          <WhyChooseUs />

          <ProductPillars />

          <ComparisonTable />

          {/* BOTÓN MEJORADO: Estilo Premium con Icono de Precio */}
          <div className="flex justify-center px-4 -mt-8 mb-4">
            <Button 
              variant="outline"
              className="group h-auto py-5 px-10 rounded-2xl border-2 border-orange-500/20 hover:border-orange-500 bg-white hover:bg-orange-50 transition-all duration-500 shadow-xl hover:shadow-orange-200/50"
              onClick={() => {
                // Navegamos a la página de FAQ con el ancla de pricing
                navigate("/faq#pricing");
                
                // Si el FAQ está en la misma página, usamos scroll:
                setTimeout(() => {
                  const element = document.getElementById('pricing-selection');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            >
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 p-2 rounded-lg group-hover:bg-orange-500 transition-colors">
                  <Banknote className="h-6 w-6 text-orange-600 group-hover:text-white" />
                </div>
                <span className="text-slate-700 group-hover:text-slate-900 font-black uppercase tracking-tight text-sm md:text-lg text-center">
                  Competitive pricing for <span className="text-[#00a6d6] italic">personalised tutoring</span> with proven outcomes.
                </span>
                <ChevronRight className="h-5 w-5 text-orange-500 group-hover:translate-x-2 transition-transform" />
              </div>
            </Button>
          </div>

          <CTASection />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;