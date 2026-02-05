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

  useEffect(() => {
    const pageTitles: Record<string, string> = {
      "/": "Delft Engineering Academy | TU Delft Aerospace Exams Prep",
      "/bsc-admissions": "Admission Prep | TU Delft Aerospace Selection Exam",
      "/first-year": "First Year & BSA Tracker | Delft Engineering Academy",
      "/auth": "Login | Delft Engineering Academy",
      "/msc-bridge": "MSc Bridge | Delft Engineering Academy",
      "/faq": "FAQ | Delft Engineering Academy",
      "/resources": "Resources | Delft Engineering Academy",
    };

    const currentTitle = pageTitles[location.pathname] || "Delft Engineering Academy";
    
    // Aplicación inmediata
    document.title = currentTitle;
    
    // Aplicación con retardo para asegurar que venza la persistencia del navegador
    const timeoutId = setTimeout(() => {
      document.title = currentTitle;
      console.log("✅ Título forzado tras carga:", document.title);
    }, 100);

    return () => clearTimeout(timeoutId);
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