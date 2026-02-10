import { MainLayout } from "@/components/layout/MainLayout";
import { UnlockedDashboard } from "@/components/enrollment/UnlockedDashboard";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { MaterialsVault } from "@/components/enrollment/MaterialsVault";
import { SimulatorRoom } from "@/components/enrollment/SimulatorRoom";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const checkUserAndProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/auth"); return; }
      
      const { data } = await supabase.from("profiles").select("*").eq("user_id", session.user.id).maybeSingle();
      if (data) setProfile(data);
      setLoading(false);
    };
    checkUserAndProfile();
  }, [navigate]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
    </div>
  );

  const isStudentActive = profile?.enrollment_status === 'active';
  const sectionRequested = location.state?.section;

  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-10">
        {/* LÓGICA DE SECCIONES */}
        {isStudentActive && sectionRequested === 'simulator' ? (
          <SimulatorRoom />
        ) : isStudentActive && sectionRequested === 'materials' ? (
          <MaterialsVault profile={profile} />
        ) : isStudentActive ? (
          <div className="space-y-12">
            <MaterialsVault profile={profile} />
            <div className="pt-20 border-t border-slate-100">
              <UnlockedDashboard />
            </div>
          </div>
        ) : (
          <UnlockedDashboard />
        )}
      </div>
    </MainLayout>
  );
}