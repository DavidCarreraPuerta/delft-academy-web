import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Clock, Rocket, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const UnlockedDashboard = () => {
  const [data, setData] = useState({ name: "", program: "" });
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("first_name, target_programme")
          .eq("user_id", session.user.id)
          .maybeSingle();

        if (profile) {
          setData({
            name: profile.first_name || "Scholar",
            program: profile.target_programme || ""
          });
        }
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setTimeout(() => setLoading(false), 1200); // Reducido un poco para mayor fluidez
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center p-10 min-h-[300px]">
      <Loader2 className="h-10 w-10 animate-spin text-orange-600" />
    </div>
  );

  const programClean = data.program 
    ? data.program.replace(/-/g, " ").toUpperCase() 
    : "PENDING ASSIGNMENT";

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-700 font-sans max-w-5xl mx-auto">
      {/* Reducido padding de p-16 a p-10/p-12 y bordes ligeramente menos exagerados */}
      <Card className="bg-slate-900 border-none rounded-[2.5rem] p-6 md:p-12 text-white relative overflow-hidden shadow-2xl">
        {/* Cohete más pequeño y discreto para no empujar contenido */}
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Rocket className="w-40 h-40 -rotate-12" />
        </div>
        
        <div className="relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-500 px-3 py-1.5 rounded-full border border-orange-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="text-[9px] font-black uppercase tracking-widest italic">Request Received</span>
          </div>

          {/* Tamaño de fuente ajustado de 6xl a 4xl/5xl */}
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-tight">
            Congratulations, <span className="text-orange-600">{data.name}!</span>
          </h2>
          
          {/* Texto más compacto y equilibrado */}
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto font-medium leading-snug">
            Your Strategy Call for <span className="text-white font-bold">{programClean}</span> has been received. 
            Our Senior Tutor will email you within 48 hours to design your plan.
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tarjetas más bajas (p-6 en lugar de p-8) */}
        <Card className="p-6 rounded-[2rem] bg-white border-none shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="bg-orange-50 p-3 rounded-xl">
            <Clock className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Status</p>
            <h4 className="text-lg font-black text-slate-900 italic uppercase">Call Pending (48h)</h4>
          </div>
        </Card>

        <Card className="p-6 rounded-[2rem] bg-white border-none shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="bg-slate-50 p-3 rounded-xl">
            <Rocket className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Programme</p>
            <h4 className="text-lg font-black text-slate-900 italic uppercase truncate max-w-[200px] md:max-w-full">
              {programClean}
            </h4>
          </div>
        </Card>
      </div>
    </div>
  );
};