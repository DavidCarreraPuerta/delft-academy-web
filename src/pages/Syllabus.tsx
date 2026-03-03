import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { MaterialsVault } from "@/components/enrollment/MaterialsVault";
import { supabase } from "@/integrations/supabase/client";

const Syllabus = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    setTimeout(() => { document.title = "Exam Syllabus | TU Delft Aerospace Preparation"; }, 100);
    const getProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();
        setProfile(data);
      }
    };
    getProfile();
  }, []);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Ahora le pasamos el profile. Si es null, sale bloqueado. Si existe, abre los PDF del alumno */}
        <MaterialsVault profile={profile} />
      </div>
    </MainLayout>
  );
};

export default Syllabus;