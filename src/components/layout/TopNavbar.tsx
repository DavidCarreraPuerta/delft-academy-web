import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserCircle, LogOut, User, Menu, X } from "lucide-react";
import { supabase } from "@/lib/supabase"; 
import logoImg from "@/assets/delftquest-logo.png";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

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
        
        {/* BRANDING */}
        <Link to="/" className="flex items-center gap-3 md:gap-4 shrink-0">
          <img src={logoImg} alt="Logo" className="h-8 md:h-10 w-auto object-contain" />
          <div className="flex flex-col">
            <span className="font-black text-lg md:text-xl tracking-tighter leading-none" style={{ color: '#00a6d6' }}>
              Delft Engineering <span className="text-slate-900">Academy</span>
            </span>
            <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mt-0.5">
              TU Delft <span className="text-[#00a6d6]">Aerospace Exams Prep</span>
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
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

        {/* RIGHT SECTION: USER & MOBILE MENU */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {user ? (
            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
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
                className="text-slate-600 font-bold text-[10px] md:text-xs hover:text-orange-600 transition-colors h-9 px-2 md:px-4"
              >
                <LogOut className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">LOGOUT</span>
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
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
            </div>
          )}

          {/* MOBILE HAMBURGER MENU */}
          <div className="xl:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-slate-900">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l-orange-500/20">
                <div className="flex flex-col gap-8 mt-12">
                  <div className="flex flex-col gap-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 ml-4">Navigation</p>
                    {navItems.map((item) => (
                      <SheetClose asChild key={item.label}>
                        <Link
                          to={item.href}
                          className={cn(
                            "text-2xl font-black uppercase italic tracking-tighter px-4 py-2 rounded-2xl transition-all",
                            location.pathname === item.href
                              ? "text-orange-600 bg-orange-50 translate-x-2"
                              : "text-slate-900 hover:text-[#00a6d6] hover:translate-x-2"
                          )}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                  
                  {!user && (
                    <div className="flex flex-col gap-3 px-4 pt-8 border-t border-slate-100">
                       <SheetClose asChild>
                         <Link to="/auth" className="w-full">
                           <Button variant="outline" className="w-full h-14 rounded-xl font-black uppercase tracking-widest border-2">
                             Login
                           </Button>
                         </Link>
                       </SheetClose>
                       <SheetClose asChild>
                         <Link to="/auth" className="w-full">
                           <Button className="w-full h-14 rounded-xl font-black uppercase tracking-widest bg-orange-500 text-white shadow-xl shadow-orange-500/20">
                             Get Started
                           </Button>
                         </Link>
                       </SheetClose>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}