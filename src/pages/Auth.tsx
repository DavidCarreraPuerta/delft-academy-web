import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        // 1. REGISTRO EN AUTH DE SUPABASE
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { first_name: firstName },
          },
        });

        if (signUpError) throw signUpError;

        if (data.user) {
          // 2. CREACIÓN DEL PERFIL INICIAL
          // CORRECCIÓN: 'pending' es el valor aceptado por tu base de datos
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({ 
              user_id: data.user.id, 
              first_name: firstName,
              email: email,
              enrollment_status: 'pending' 
            });

          if (profileError) throw profileError;

          toast({
            title: "Account Created!",
            description: "Please check your email to confirm, then log in.",
          });
          setIsSignUp(false); 
        }
      } else {
        // 3. LOGIN - Redirigimos al ONBOARDING
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (signInError) throw signInError;
        
        // Al loguear, vamos directos al formulario de perfil académico
        navigate("/onboarding"); 
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
      <Card className="w-full max-w-md border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
        <CardHeader className="space-y-1 text-center bg-slate-900 text-white pb-10 pt-10">
          <CardTitle className="text-3xl font-black italic uppercase tracking-tighter">
            {isSignUp ? "Join" : "Welcome"} <span className="text-orange-600">DelftQuest</span>
          </CardTitle>
          <CardDescription className="text-slate-400">
            {isSignUp ? "Create your account to start" : "Enter your credentials to access"}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8">
          <form onSubmit={handleAuth} className="space-y-4">
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
                  className="rounded-xl border-slate-200"
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
                className="rounded-xl border-slate-200"
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
                className="rounded-xl border-slate-200"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-slate-900 hover:bg-orange-600 h-12 rounded-xl font-bold transition-all mt-4" 
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : (isSignUp ? "REGISTER" : "LOGIN")}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pb-8">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            type="button"
            className="text-sm text-slate-500 hover:text-orange-600 transition-colors font-medium"
          >
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}