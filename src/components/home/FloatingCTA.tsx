import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";

export function FloatingCTA() {
  return (
    <div className="fixed bottom-12 right-8 z-50">
      <Link to="/auth">
        <button
          className="h-14 px-7 rounded-full bg-orange-500 text-white shadow-[0_10px_40px_-10px_rgba(249,115,22,0.5)] hover:bg-orange-600 hover:scale-105 transition-all flex items-center gap-3 font-black border-4 border-white relative group"
        >
          <Calendar className="h-5 w-5 group-hover:rotate-12 transition-transform" />
          
          <span className="hidden sm:inline uppercase text-xs tracking-widest">
            Book Free Consultation
          </span>
          <span className="sm:hidden font-bold">BOOK</span>
          
          {/* Notificación visual refinada */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-600 border-2 border-white"></span>
          </span>
        </button>
      </Link>
    </div>
  );
}