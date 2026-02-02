import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { UnlockedDashboard } from "@/components/enrollment/UnlockedDashboard";

const PROGRAMS = [
  { value: "bsc-year-1", label: "BSc Aerospace Engineering (1st Year)" },
  { value: "bsc-aerospace", label: "BSc Aerospace (Admission Prep)" },
  { value: "msc-bridge", label: "MSc Bridge Programme" },
];

export default function StudentEnrollment() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [program, setProgram] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    };
    checkUser();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!program) {
      toast({ title: "Selection required", description: "Please choose a programme.", variant: "destructive" });
      return;
    }

    setLoading(true);
    
    // IMPORTANTE: Guardamos el programa en la tabla profiles usando user_id
    const { error } = await supabase
      .from("profiles")
      .update({ 
        target_programme: program,
        enrollment_status: 'pending' 
      })
      .eq("user_id", user.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSubmitted(true);
      toast({ title: "Success", description: "Request sent successfully!" });
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <MainLayout>
        <div className="container mx-auto px-6 py-12 max-w-5xl">
          <UnlockedDashboard />
          <div className="mt-8 text-center">
            <Button onClick={() => navigate("/dashboard")} variant="outline" className="rounded-full font-bold uppercase text-[10px] tracking-widest px-8">
              Go to My Portal
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout showSidebar={false}>
      <div className="flex flex-col items-center justify-center min-h-[90vh] bg-slate-50 p-6">
        <div className="w-full max-w-[500px] animate-in fade-in slide-in-from-bottom-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-[10px] font-black uppercase tracking-widest mb-4">
              <Sparkles className="h-3 w-3" /> Programme Selection
            </div>
            <h1 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">
              Upgrade Your <span className="text-orange-600">Support</span>
            </h1>
          </div>

          <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden">
            <CardContent className="p-10">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Target Programme</Label>
                  <Select onValueChange={setProgram} required>
                    <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-none font-bold text-sm italic px-6">
                      <SelectValue placeholder="Select a programme..." />
                    </SelectTrigger>
                    <SelectContent>
                      {PROGRAMS.map(p => (
                        <SelectItem key={p.value} value={p.value} className="font-medium">{p.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" disabled={loading} className="w-full bg-slate-900 hover:bg-orange-600 text-white h-16 rounded-[1.5rem] font-black uppercase tracking-widest text-xs shadow-xl transition-all">
                  {loading ? <Loader2 className="animate-spin" /> : "REQUEST ACCESS"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}