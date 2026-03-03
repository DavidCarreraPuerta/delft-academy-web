import { Link, useNavigate } from "react-router-dom";
import { Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import delftquestLogo from "@/assets/delftquest-logo.png";

export const Footer = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    /* Reducimos el padding vertical para hacerlo más fino (py-2) */
    <footer className="w-full bg-white border-t border-slate-100 py-2 px-6">
      <div className="max-w-[1600px] mx-auto">
        
        {/* CAMBIO CLAVE:
            1. 'justify-center' en lugar de 'justify-between' para juntar todo en el centro.
            2. 'gap-x-6' para fijar una separación pequeña y elegante entre los bloques de palabras.
        */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-y-3 md:gap-x-6">
          
          {/* 1. Branding (Más compacto para que no se corte) */}
          <div className="flex items-center gap-2 shrink-0">
            <Link to="/" className="flex items-center gap-1.5">
              <img src={delftquestLogo} alt="Logo" className="h-4 w-auto" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-tighter leading-none" style={{ color: '#00a6d6' }}>
                  Delft Engineering <span className="text-slate-900">Academy</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Separador visual opcional, lo mantenemos muy fino */}
          <span className="hidden md:block text-slate-100 text-xs">|</span>

          {/* 2. Enlaces SEO (Con separación reducida: gap-x-4) */}
          <div className="flex items-center gap-x-4">
            <Link to="/bsc-admissions" className="text-[9px] font-black text-slate-600 hover:text-[#00a6d6] uppercase tracking-widest transition-colors">
              Admissions Prep
            </Link>
            <Link to="/syllabus" className="text-[9px] font-black text-slate-600 hover:text-[#00a6d6] uppercase tracking-widest transition-colors">
              Syllabus
            </Link>
            <Link to="/simulator" className="text-[9px] font-black text-slate-600 hover:text-[#00a6d6] uppercase tracking-widest transition-colors">
              Proctortrack - Exam Simulation
            </Link>
          </div>

          {/* Separador visual opcional */}
          <span className="hidden md:block text-slate-100 text-xs">|</span>

          {/* 3. Contacto y Legal (Agrupado y compacto) */}
          <div className="flex items-center gap-x-4">
            {/* Contacto (gap-x-3 para juntar WhatsApp y Email) */}
            <div className="flex items-center gap-x-3">
              <button 
                onClick={() => handleCopy("+31 6 00000000", "wa")}
                className="relative flex items-center gap-1 text-[9px] font-black text-slate-500 hover:text-green-600 transition-colors uppercase"
              >
                <MessageCircle className="h-3 w-3" />
                <span>WHATSAPP</span>
              </button>

              <button 
                onClick={() => handleCopy("tutors@delftengineering.academy", "email")}
                className="relative flex items-center gap-1 text-[9px] font-black text-slate-500 hover:text-[#00a6d6] transition-colors uppercase"
              >
                <Mail className="h-3 w-3" />
                <span>EMAIL</span>
              </button>
            </div>

            {/* Legal (Con separación reducida: gap-x-3) */}
            <div className="flex items-center gap-x-3 border-l border-slate-100 pl-4">
              <Link to="/legal-notice" className="text-[8px] font-bold text-slate-400 hover:text-slate-900 uppercase">
                Legal
              </Link>
              <Link to="/privacy-policy" className="text-[8px] font-bold text-slate-400 hover:text-slate-900 uppercase">
                Privacy
              </Link>
              <span className="text-[8px] font-bold text-slate-300 italic">© 2026</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};