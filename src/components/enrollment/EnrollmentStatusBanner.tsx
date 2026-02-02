import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageCircle } from "lucide-react";

export const EnrollmentStatusBanner = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from("profiles").select("*").eq("user_id", user.id);
        if (data && data.length > 0) setProfile(data[0]);
      }
    };
    getProfile();
  }, []);

  if (!profile || profile.enrollment_status !== 'pending') return null;

  return (
    <div className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-2xl shadow-lg animate-in fade-in slide-in-from-right duration-500 shrink-0 border border-orange-400/30">
      <div className="flex h-2 w-2 relative">
        <span className="animate-ping absolute h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative rounded-full h-2 w-2 bg-white"></span>
      </div>
      <div className="flex flex-col text-left">
        <p className="text-[10px] font-black uppercase tracking-tighter leading-none">
          Application Active
        </p>
        <p className="text-[9px] font-medium opacity-90 leading-tight">
          Check WhatsApp
        </p>
      </div>
      <MessageCircle className="w-3 h-3 ml-1" />
    </div>
  );
};