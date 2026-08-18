import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Loader2, MessageCircle, Check, ChevronsUpDown, ArrowLeft } from "lucide-react";
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

// --- OPTIONS CONSTANTS ---
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

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [step, setStep] = useState(1); // Tracks which screen to show
  
  // Step 1 States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");

  // Step 2 States
  const [program, setProgram] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState("");
  const [openCountry, setOpenCountry] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  // Handle Step 1 (Next or Login)
  const handleAuthStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp) {
      // Just move to step 2, DO NOT create account yet
      setStep(2);
    } else {
      // Normal Login Logic
      setIsLoading(true);
      try {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (signInError) throw signInError;
        
        if (data.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("target_programme")
            .eq("user_id", data.user.id)
            .maybeSingle();

          if (!profile?.target_programme) {
            navigate("/onboarding");
          } else {
            navigate("/");
          }
        }
      } catch (error: any) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle Step 2 (Final Registration & Lead Submission)
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Create the Supabase Account
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { first_name: firstName } },
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        // 2. Insert Full Profile Data
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            user_id: data.user.id,
            first_name: firstName,
            email: email,
            target_programme: program,
            country: country,
            phone: phone,
            education: education,
            enrollment_status: 'pending'
          });

        if (profileError) throw profileError;

        // 3. Send to Formspree
        const formData = new FormData();
        formData.append("email", email);
        formData.append("firstName", firstName);
        formData.append("program", program);
        formData.append("country", country);
        formData.append("phone", phone);
        formData.append("education", education);
        formData.append("status", "PENDING_ENROLLMENT");

        await fetch("https://formspree.io/f/meezpwdw", {
          method: "POST",
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        toast({
          title: "Account Created!",
          description: "Your application is pending review. We will contact you soon.",
          duration: 6000,
        });
        
        // Take them straight to the dashboard
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    } catch (error: any) {
      toast({ title: "Registration Error", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
      <Card className="w-full max-w-md border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
        
        {/* --- DYNAMIC HEADER --- */}
        <CardHeader className="space-y-1 text-center bg-slate-900 text-white pb-10 pt-10 relative">
          {step === 2 && (
            <button 
              onClick={() => setStep(1)} 
              className="absolute top-6 left-6 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
          <CardTitle className="text-3xl font-black italic uppercase tracking-tighter">
            {step === 2 ? (
               <>Complete Your <span className="text-[#00a6d6]">Application</span></>
            ) : (
               <>{isSignUp ? "Join" : "Welcome to"} <span className="text-orange-600">Delft Engineering Academy</span></>
            )}
          </CardTitle>
          <CardDescription className="text-slate-400">
            {step === 2 ? "High demand for March intake: Limited slots available." : (isSignUp ? "Create your account to start" : "Enter your credentials to access")}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-8">
          
          {/* --- STEP 1: AUTH DETAILS --- */}
          {step === 1 && (
            <form onSubmit={handleAuthStep1} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Your Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="rounded-xl border-slate-200 h-11"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-xl border-slate-200 h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-xl border-slate-200 h-11"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-slate-900 hover:bg-orange-600 h-12 rounded-xl font-bold transition-all mt-4 text-white"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="animate-spin mx-auto" /> : (isSignUp ? "NEXT" : "LOGIN")}
              </Button>
            </form>
          )}

          {/* --- STEP 2: ONBOARDING DETAILS --- */}
          {step === 2 && (
            <form onSubmit={handleFinalSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Target Programme</Label>
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

              <div className="space-y-1.5 flex flex-col">
                <Label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Country of Residence</Label>
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
                                setCountry(currentValue === country ? "" : c.label);
                                setOpenCountry(false);
                              }}
                              className="text-sm font-medium cursor-pointer"
                            >
                              <Check
                                className={cn("mr-2 h-4 w-4", country === c.label ? "opacity-100" : "opacity-0")}
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

              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1 flex justify-between">
                  WhatsApp Number
                  <span className="text-green-600 flex items-center gap-1 italic"><MessageCircle className="h-3 w-3"/> Priority contact</span>
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

              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Current Education</Label>
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

              <Button 
                type="submit" 
                disabled={isLoading || !program || !country || !phone || !education}
                className="w-full bg-[#00a6d6] hover:bg-slate-900 disabled:bg-slate-300 disabled:opacity-50 text-white h-13 mt-4 rounded-xl font-black uppercase tracking-widest text-[11px] transition-all shadow-md active:scale-[0.98]"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : "Request Free Strategy Call"}
              </Button>
            </form>
          )}

        </CardContent>
        
        {/* Toggle between Login and Sign Up (Only shown on Step 1) */}
        {step === 1 && (
          <CardFooter className="flex flex-col space-y-4 pb-8">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              type="button"
              className="text-sm text-slate-500 hover:text-orange-600 transition-colors font-medium"
            >
              {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}