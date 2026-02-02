import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// 1. Importación del protector
import { ProtectedRoute } from "./pages/ProtectedRoute";

// Páginas Base
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import StudentDashboard from "./pages/StudentDashboard";
import Resources from "./pages/Resources";
import FAQ from "./pages/FAQ";
import VirtualEmbassy from "./pages/VirtualEmbassy";
import TalentHub from "./pages/TalentHub";
import FirstYear from "./pages/FirstYear";
import BscAdmissions from "./pages/BscAdmissions";
import MscBridge from "./pages/MscBridge";

// Páginas Legales (Nuevas)
import LegalNotice from "./pages/LegalNotice";
import PrivacyPolicy from "./pages/PrivacyPolicy";

// Páginas de Proceso
import StudentOnboardingForm from "./pages/StudentOnboardingForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* --- RUTAS PÚBLICAS (Accesibles para todos) --- */}
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/bsc-admissions" element={<BscAdmissions />} />
          <Route path="/first-year" element={<FirstYear />} />
          <Route path="/msc-bridge" element={<MscBridge />} />
          
          {/* Páginas de información y legales */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/virtual-embassy" element={<VirtualEmbassy />} />
          <Route path="/talent-hub" element={<TalentHub />} />
          <Route path="/legal-notice" element={<LegalNotice />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          
          {/* --- RUTAS PROTEGIDAS (Solo con Login) --- */}
          {/* Solo dejamos bajo candado el Dashboard y el formulario de Onboarding */}
          <Route path="/onboarding" element={
            <ProtectedRoute>
              <StudentOnboardingForm />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          } />

          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;