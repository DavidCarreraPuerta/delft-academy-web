import { useEffect } from "react";
import { TopNavbar } from "./TopNavbar";
import { Sidebar } from "./Sidebar"; 
import { Footer } from "./Footer";
import { FloatingCTA } from "../home/FloatingCTA"; 
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export function MainLayout({ children, showSidebar = true }: MainLayoutProps) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Lógica de SEO Dinámico: Cambia el título de la pestaña según la ruta
  useEffect(() => {
    const pageTitles: Record<string, string> = {
      "/": "Delft Engineering Academy | TU Delft Aerospace Exams Prep",
      "/bsc-admissions": "Admission Prep | TU Delft Aerospace Selection Exam",
      "/year1": "First Year & BSA Tracker | Delft Engineering Academy",
      "/auth": "Login | Delft Engineering Academy",
    };

    const currentTitle = pageTitles[location.pathname] || "Delft Engineering Academy";
    document.title = currentTitle;
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopNavbar />
      
      <div className={cn("flex flex-1", isHome ? "pt-20" : "pt-16")}> 
        {showSidebar && <Sidebar />}
        
        <main className={cn(
          "flex-1 transition-all duration-300 bg-slate-50",
          !showSidebar && "ml-0",
          isHome ? "px-6 pb-6" : "px-0 pt-0 pb-6"
        )}>
          {children}
        </main>
      </div>
      
      <Footer />
      <FloatingCTA />
    </div>
  );
}