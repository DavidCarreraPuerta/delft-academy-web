import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import delftquestLogo from "@/assets/delftquest-logo.png";

const navItems = [
  { label: "Home", href: "/" },
  { label: "BSc Admissions", href: "/bsc-admissions" },
  { label: "1st Year Success", href: "/first-year" },
  { label: "MSc Bridge", href: "/msc-bridge" },
  { label: "Virtual Embassy", href: "/virtual-embassy" },
  { label: "Talent Hub", href: "/talent-hub" },
  { label: "Resources", href: "/resources" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={delftquestLogo} alt="DelftQuest Academy" className="h-10 w-auto" />
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-foreground tracking-tight">
                DelftQuest
              </span>
              <span className="text-lg font-light text-primary ml-1">Academy</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                    isActive
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            {/* MODIFICACIÓN: Enlace a /enrollment para consistencia */}
            <Button variant="default" size="sm" asChild>
              <Link to="/enrollment">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-lg transition-colors text-sm font-medium",
                      isActive
                        ? "text-primary bg-primary/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="flex gap-2 mt-4 px-4">
                <Button variant="outline" className="flex-1" size="sm" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                {/* MODIFICACIÓN: Enlace a /enrollment también en el menú móvil */}
                <Button variant="default" className="flex-1" size="sm" asChild>
                  <Link to="/enrollment">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
