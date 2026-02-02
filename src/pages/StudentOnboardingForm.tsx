import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PROGRAMS = [
  { value: "bsc-aerospace", label: "BSc Aerospace (Admission Prep)" },
  { value: "bsc-year-1", label: "BSc Aerospace Engineering (1st Year)" },
  { value: "msc-bridge", label: "MSc Bridge Programme" },
];

export default function StudentOnboardingForm() {
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [program, setProgram] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      setUserId(session.user.id);
      setUserEmail(session.user.email ?? "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("target_programme")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (profile?.target_programme) {
        // Si ya tiene programa, ya pasó por aquí
        navigate("/dashboard");
      } else {
        setCheckingStatus(false);
      }
    };

    checkUserStatus();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!program || !phone || !country) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }

    setLoading(true);

    // 1. Preparamos los datos para Formspree
    const formData = new FormData();
    formData.append("email", userEmail || "No email");
    formData.append("program", program);
    formData.append("country", country);
    formData.append("phone", phone);
    formData.append("education", education);
    formData.append("status", "PENDING_ENROLLMENT");

    try {
      // 2. Envío a Formspree (Tu ID: meezpwdw)
      const response = await fetch("https://formspree.io/f/meezpwdw", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      // 3. Intento de guardado en Supabase (opcional, para que no rompa si falla)
      try {
        await supabase
          .from("profiles")
          .update({
            target_programme: program,
            country: country,
            phone: phone,
            education: education,
            enrollment_status: 'pending'
          })
          .eq("user_id", userId);
      } catch (dbError) {
        console.warn("Database sync skipped, but lead sent to email.");
      }

      if (response.ok) {
        toast({
          title: "Application Status: PENDING",
          description: "Due to high demand, our team will review your profile and contact you on WhatsApp within 12-24h.",
          duration: 6000,
        });
        
        // Redirigimos al Dashboard de éxito
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        throw new Error("Formspree error");
      }

    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Submission Error",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (checkingStatus) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-[#00a6d6] w-8 h-8" />
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[75vh] bg-slate-50 py-4 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 leading-tight">
              Complete Your <span className="text-[#00a6d6]">Application</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium italic">High demand for March intake: Limited slots available.</p>
          </div>

          <Card className="border-none shadow-xl rounded-[2rem] bg-white overflow-hidden">
            <CardContent className="p-6 pt-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Target Programme</Label>
                  <Select onValueChange={setProgram} required>
                    <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-none font-bold text-slate-700 text-sm">
                      <SelectValue placeholder="Select your goal..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-100">
                      {PROGRAMS.map((p) => (
                        <SelectItem key={p.value} value={p.value} className="text-sm font-medium">
                          {p.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Country of Residence</Label>
                  <Input 
                    placeholder="e.g. Spain" 
                    className="h-11 rounded-xl bg-slate-50 border-none font-bold text-sm"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1 flex justify-between">
                    WhatsApp Number
                    <span className="text-green-600 flex items-center gap-1 italic"><MessageCircle className="h-2 w-2"/> Priority contact</span>
                  </Label>
                  <Input 
                    placeholder="+34 600 000 000" 
                    type="tel"
                    className="h-11 rounded-xl bg-slate-50 border-none font-bold text-sm"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Current Education</Label>
                  <Input 
                    placeholder="e.g. High School / BSc Physics" 
                    className="h-11 rounded-xl bg-slate-50 border-none font-bold text-sm"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#00a6d6] hover:bg-slate-900 text-white h-13 mt-2 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all shadow-md active:scale-[0.98]"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Request Free Strategy Call"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}