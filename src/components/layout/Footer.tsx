import { Link } from "react-router-dom";
import { Mail, MessageCircle, Copy, Check } from "lucide-react";
import { useState } from "react";
import delftquestLogo from "@/assets/delftquest-logo.png";

export const Footer = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <footer className="w-full bg-white border-t border-slate-100 py-6 px-8 pb-32 md:pb-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:pr-32">
        
        {/* Branding & Disclaimer */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={delftquestLogo} alt="Logo" className="h-5 w-auto" />
            <div className="flex flex-col">
              <span className="text-xs font-black uppercase tracking-tighter leading-none" style={{ color: '#00a6d6' }}>
                Delft Engineering <span className="text-slate-900">Academy</span>
              </span>
              <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">
                Aerospace Excellence
              </span>
            </div>
          </Link>
          <span className="hidden md:block text-slate-200">|</span>
          <p className="text-[9px] text-slate-400 font-medium max-w-xs text-center md:text-left leading-tight">
            Independent tutoring hub. Not affiliated with TU Delft. <br />
            The premier prep platform for Aerospace Engineering.
          </p>
        </div>

        {/* Contact & Legal - Interactive but Safe */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-6">
            {/* WhatsApp Safe Link */}
            <button 
              onClick={() => handleCopy("+31 6 00000000", "wa")}
              className="group relative flex items-center gap-2 text-[10px] font-black text-slate-600 hover:text-green-600 transition-colors tracking-widest uppercase"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>WhatsApp</span>
              {copied === "wa" ? (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] px-2 py-1 rounded">Number Copied!</span>
              ) : (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white border border-slate-100 shadow-sm text-slate-400 text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Click to copy info</span>
              )}
            </button>

            {/* Email Safe Link */}
            <button 
              onClick={() => handleCopy("tutors@delftengineering.academy", "email")}
              className="group relative flex items-center gap-2 text-[10px] font-black text-slate-600 hover:text-[#00a6d6] transition-colors tracking-widest uppercase"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Email</span>
              {copied === "email" ? (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] px-2 py-1 rounded">Address Copied!</span>
              ) : (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white border border-slate-100 shadow-sm text-slate-400 text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Click to copy info</span>
              )}
            </button>
          </div>

          <div className="flex items-center gap-4 border-l border-slate-100 pl-8">
            <Link to="/legal-notice" className="text-[9px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors">
              Legal Notice
            </Link>
            <Link to="/privacy-policy" className="text-[9px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors">
              Privacy
            </Link>
            <p className="text-[9px] font-bold text-slate-300 ml-2">
              © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};