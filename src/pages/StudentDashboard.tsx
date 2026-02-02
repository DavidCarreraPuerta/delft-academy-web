import { MainLayout } from "@/components/layout/MainLayout";
import { UnlockedDashboard } from "@/components/enrollment/UnlockedDashboard";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  if (loading) return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
      </div>
    </MainLayout>
  );

  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-10">
        <UnlockedDashboard />
      </div>
    </MainLayout>
  );
}