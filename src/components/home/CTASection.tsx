// src/components/home/CTASection.tsx

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto bg-slate-900 rounded-[3.5rem] py-16 md:py-24 px-8 relative overflow-hidden shadow-[0_32px_64px_-15px_rgba(15,23,42,0.3)]">
        
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase tracking-tighter leading-[0.9] italic">
            Ready to Start Your <br />
            <span className="text-orange-500 not-italic">TU Delft Aerospace Journey?</span>
          </h2>

          {/* COLOR CORREGIDO: Gris suave para la primera línea, Blanco para la segunda */}
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto font-medium leading-relaxed">
            <span className="text-slate-300/90">Join the elite 10% of candidates. Secure your future with our</span>
            <br />
            <span className="text-white font-bold">1:1 Personalized Mentorship.</span>
          </p>

          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-black py-8 px-12 rounded-2xl text-xl uppercase tracking-tight transition-all hover:scale-105 shadow-xl shadow-orange-500/20"
              asChild
            >
              <Link to="/auth" className="flex items-center gap-4">
                <Calendar className="h-7 w-7" />
                Book Free Consultation
              </Link>
            </Button>
          </div>
          {/* Resto del código de métricas igual... */}
        </div>
      </div>
    </section>
  );
}