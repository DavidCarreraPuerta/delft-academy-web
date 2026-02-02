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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopNavbar />
      
      {/* Si es la Home (isHome), usamos pt-20 para dejar espacio a la Navbar.
          Si es una página interna, usamos pt-16 para que quede más ajustado.
      */}
      <div className={cn("flex flex-1", isHome ? "pt-20" : "pt-16")}> 
        {showSidebar && <Sidebar />}
        
        <main className={cn(
          "flex-1 transition-all duration-300 bg-slate-50",
          !showSidebar && "ml-0",
          // En la home damos un padding general. En el resto, pt-0 para que el Hero mande.
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