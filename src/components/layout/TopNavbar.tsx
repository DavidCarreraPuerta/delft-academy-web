import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserCircle, LogOut, User } from "lucide-react";
import { supabase } from "@/lib/supabase"; 
import logoImg from "@/assets/delftquest-logo.png";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Admission Prep", href: "/bsc-admissions" },
  { label: "First Year (BSA)", href: "/first-year" },
  { label: "MSc Excellence", href: "/msc-bridge" },
];

export function TopNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profileName, setProfileName] = useState<string | null>(null);

  useEffect(() => {
    const getProfile = async (userId: string) => {
      const { data } = await supabase
        .from("profiles")
        .select("first_name")
        .eq("user_id", userId)
        .maybeSingle();
      if (data) setProfileName(data.first_name);
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) getProfile(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) getProfile(session.user.id);
      else setProfileName(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[60] bg-white/95 backdrop-blur-md border-b border-slate-100 h-20">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        
        {/* BRANDING ACTUALIZADO */}
        <Link to="/" className="flex items-center gap-4 shrink-0">
          <img src={logoImg} alt="Logo" className="h-10 w-auto object-contain" />
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tighter leading-none" style={{ color: '#00a6d6' }}>
              Delft Engineering <span className="text-slate-900">Academy</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mt-0.5">
              TU Delft <span className = "text-[12px] font-bold uppercase tracking-[0.15em]" style={{ color: '#00a6d6' }}>Aerospace Exams Prep</span>
            </span>
          </div>
        </Link>

        {/* MENÚ DE NAVEGACIÓN ACTUALIZADO */}
        <div className="hidden xl:flex items-center justify-center flex-1 gap-2 mx-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "px-3 py-2 text-[12px] font-black uppercase tracking-tight transition-all rounded-lg",
                location.pathname === item.href
                  ? "text-orange-600 bg-orange-50"
                  : "text-slate-500 hover:text-[#00a6d6] hover:bg-slate-50"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                  <User className="h-3.5 w-3.5 text-orange-600" />
                </div>
                <span className="text-xs font-black text-slate-700 uppercase tracking-tighter">
                  {profileName || "Scholar"}
                </span>
              </div>

              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="text-slate-600 font-bold text-xs hover:text-orange-600 transition-colors h-9"
              >
                <LogOut className="h-4 w-4 mr-2" />
                LOGOUT
              </Button>
            </div>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost" className="text-slate-600 font-bold text-xs tracking-widest">
                  <UserCircle className="h-4 w-4 mr-2" />
                  LOGIN
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white font-black px-5 py-5 rounded-xl shadow-lg shadow-orange-500/20 text-[11px] tracking-widest uppercase">
                  GET STARTED
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}