import { Link, useLocation } from "react-router-dom";
import { BookOpen, Users, Building2, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function Sidebar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <TooltipProvider delayDuration={0}>
      <div className="fixed left-0 top-0 w-16 bg-white border-r border-slate-100 h-screen flex flex-col shadow-sm items-center transition-all duration-300 z-40">
        
        {/* Navegación de Iconos con margen superior aumentado (mt-24) */}
        <nav className="flex-1 px-2 space-y-4 mt-24">
          {[
            { to: "/resources", icon: BookOpen, label: "Resources" },
            { to: "/talent-hub", icon: Users, label: "Talent Hub" },
            { to: "/virtual-embassy", icon: Building2, label: "Virtual Embassy" },
            { to: "/faq", icon: HelpCircle, label: "FAQ" },
          ].map((item) => (
            <Tooltip key={item.to}>
              <TooltipTrigger asChild>
                <Link 
                  to={item.to} 
                  className={cn(
                    "flex items-center justify-center h-10 w-10 rounded-xl transition-all duration-200",
                    isActive(item.to) 
                      ? "bg-sky-50 text-[#00a6d6] shadow-sm shadow-sky-100" 
                      : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <item.icon className={cn("w-5 h-5", isActive(item.to) ? "text-[#00a6d6]" : "text-slate-400")} /> 
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest border-none">
                {item.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>

        <div className="pb-8 flex flex-col items-center">
          <div className="w-4 h-[1px] bg-slate-100 mb-4" />
          <p className="text-[8px] text-slate-300 font-bold uppercase [writing-mode:vertical-lr] tracking-[0.3em] opacity-50">
            MVP 2026
          </p>
        </div>
      </div>
      <div className="w-16 h-screen flex-shrink-0" />
    </TooltipProvider>
  );
}