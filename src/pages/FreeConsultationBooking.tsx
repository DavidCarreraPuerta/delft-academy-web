import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export default function FreeConsultationBooking() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", programme: "", education: "", country: "" });

  useEffect(() => {
    const loadUserData = async () => {
      const storageState = JSON.parse(localStorage.getItem("pending_consultation") || "null");
      const { data: { session } } = await supabase.auth.getSession();

      if (storageState) {
        setFormData(prev => ({
          ...prev,
          fullName: `${storageState.firstName || ""} ${storageState.lastName || ""}`.trim(),
          email: storageState.email || ""
        }));
      } else if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("first_name, last_name")
          .eq("id", session.user.id)
          .maybeSingle();
        
        setFormData(prev => ({
          ...prev,
          fullName: profile ? `${profile.first_name || ""} ${profile.last_name || ""}`.trim() : "Student",
          email: session.user.email || ""
        }));
      }
    };
    loadUserData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Session expired");

      const { error } = await supabase
        .from('profiles')
        .update({ 
          target_programme: formData.programme,
          enrollment_status: 'pending' 
        })
        .eq('id', session.user.id);

      if (error) throw error;
      localStorage.removeItem("pending_consultation");
      navigate("/dashboard");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally { setLoading(false); }
  };

  return (
    <MainLayout showSidebar={false}>
      <div className="flex flex-col items-center justify-start pt-12 px-4 pb-20">
        <div className="w-full max-w-[550px]">
          <Card className="shadow-2xl border-none rounded-[3rem] bg-white overflow-hidden">
            <div className="bg-slate-900 p-10 text-center text-white">
              <h1 className="text-3xl font-black italic uppercase tracking-tighter">
                Free Strategy <span className="text-orange-600">Call</span>
              </h1>
            </div>
            <CardContent className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input value={formData.fullName} readOnly className="rounded-xl h-12 bg-slate-50 border-none font-bold text-slate-400" />
                  <Input value={formData.email} readOnly className="rounded-xl h-12 bg-slate-50 border-none font-bold text-slate-400" />
                </div>
                <Select onValueChange={(val) => setFormData({...formData, programme: val})} required>
                  <SelectTrigger className="rounded-xl h-12 border-2 border-orange-100 font-bold">
                    <SelectValue placeholder="Target Programme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bsc-year-1">BSc Aerospace (1st Year)</SelectItem>
                    <SelectItem value="bsc-aerospace">BSc Aerospace (Admission)</SelectItem>
                    <SelectItem value="msc-bridge">MSc Bridge / Aerospace</SelectItem>
                  </SelectContent>
                </Select>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Education" className="rounded-xl h-12 bg-slate-50 border-none font-bold" onChange={(e) => setFormData({...formData, education: e.target.value})} required />
                  <Input placeholder="Country" className="rounded-xl h-12 bg-slate-50 border-none font-bold" onChange={(e) => setFormData({...formData, country: e.target.value})} required />
                </div>
                <Button type="submit" className="w-full bg-orange-600 h-14 rounded-xl font-black text-white" disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" /> : "CONFIRM & ACCESS"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}