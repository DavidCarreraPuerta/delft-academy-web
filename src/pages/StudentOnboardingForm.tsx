import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, MessageCircle, Check, ChevronsUpDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PROGRAMS = [
  { value: "bsc-aerospace", label: "BSc Aerospace (Admission Prep)" },
  { value: "bsc-year-1", label: "BSc Aerospace Engineering (1st Year)" },
  { value: "msc-bridge", label: "MSc Bridge Programme" },
];

const EDUCATION_OPTIONS = [
  "A-Levels (UK)",
  "International Baccalaureate (IB)",
  "French Baccalaureate (France)",
  "VWO / Dutch Baccalaureate (Netherlands)",
  "Spanish Bachillerato (Spain)",
  "Esame di Stato (Italy)",
  "CESS (Belgium)",
  "Ensino Secundário (Portugal)",
  "Romanian Baccalaureate (Romania)",
  "UAE General Secondary Education Certificate",
  "US High School Diploma",
  "Other High School System",
  "BSc / University Student",
];

const COUNTRIES = [
  { label: "Belgium", value: "be" },
  { label: "France", value: "fr" },
  { label: "Italy", value: "it" },
  { label: "Netherlands", value: "nl" },
  { label: "Portugal", value: "pt" },
  { label: "Romania", value: "ro" },
  { label: "Germany", value: "de" },
  { label: "Spain", value: "es" },
  { label: "United Arab Emirates", value: "ae" },
  { label: "United Kingdom", value: "uk" },
  { label: "United States", value: "us" },
  { label: "Other", value: "ot" },
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
  
  // State to manage the open/close status of the country combobox
  const [openCountry, setOpenCountry] = useState(false);
  
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
        navigate("/dashboard");
      } else {
        setCheckingStatus(false);
      }
    };

    checkUserStatus();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!program || !phone || !country || !education) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("email", userEmail || "No email");
    formData.append("program", program);
    formData.append("country", country);
    formData.append("phone", phone);
    formData.append("education", education);
    formData.append("status", "PENDING_ENROLLMENT");

    try {
      const response = await fetch("https://formspree.io/f/meezpwdw", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

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
          description: "Due to high demand, our team will review your profile and contact you within 12-24h.",
          duration: 6000,
        });
        
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
                
                {/* PROGRAMME SELECT */}
                <div className="space-y-1.5">
                  <Label className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Target Programme</Label>
                  <Select onValueChange={setProgram} value={program} required>
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

                {/* COUNTRY COMBOBOX */}
                <div className="space-y-1.5 flex flex-col">
                  <Label className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Country of Residence</Label>
                  <Popover open={openCountry} onOpenChange={setOpenCountry}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openCountry}
                        className={cn(
                          "w-full justify-between bg-slate-50 border-none h-11 text-sm font-bold text-slate-700 hover:bg-slate-100",
                          !country && "text-slate-400 font-normal"
                        )}
                      >
                        {country ? country : "Search country..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 rounded-xl border-slate-100 shadow-lg">
                      <Command>
                        <CommandInput placeholder="Type a country..." className="h-11" />
                        <CommandList>
                          <CommandEmpty>No country found.</CommandEmpty>
                          <CommandGroup>
                            {COUNTRIES.map((c) => (
                              <CommandItem
                                key={c.value}
                                value={c.label}
                                onSelect={(currentValue) => {
                                  // Store the label directly in state (e.g. "Spain")
                                  setCountry(currentValue === country ? "" : c.label);
                                  setOpenCountry(false);
                                }}
                                className="text-sm font-medium cursor-pointer"
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    country === c.label ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {c.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* WHATSAPP INPUT */}
                <div className="space-y-1.5">
                  <Label className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1 flex justify-between">
                    WhatsApp Number
                    <span className="text-green-600 flex items-center gap-1 italic"><MessageCircle className="h-2 w-2"/> Priority contact</span>
                  </Label>
                  <Input 
                    placeholder="+34 600 000 000" 
                    type="tel"
                    className="h-11 rounded-xl bg-slate-50 border-none font-bold text-sm text-slate-700"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                {/* EDUCATION SELECT */}
                <div className="space-y-1.5">
                  <Label className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Current Education</Label>
                  <Select onValueChange={setEducation} value={education} required>
                    <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-none font-bold text-slate-700 text-sm">
                      <SelectValue placeholder="Select your education..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-100">
                      {EDUCATION_OPTIONS.map((edu) => (
                        <SelectItem key={edu} value={edu} className="text-sm font-medium">
                          {edu}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* SUBMIT BUTTON */}
                <Button 
                  type="submit" 
                  disabled={loading || !program || !country || !phone || !education}
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