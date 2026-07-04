import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/our-work", label: "Our Work" },
  { to: "/impact", label: "Impact" },
  { to: "/get-involved", label: "Get Involved" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border transition-shadow duration-300 ${scrolled ? "shadow-md" : ""}`}>
      <div className="container flex h-16 md:h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Vidyasagar Jeev Daya Parivar Trust" className="h-12 w-12 md:h-16 md:w-16 rounded-full object-contain" />
          <div className="leading-tight">
            <span className="font-display font-bold text-lg md:text-xl text-primary block leading-none">Vidyasagar</span>
            <span className="text-xs text-muted-foreground">Jeev Daya Parivar Trust</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-2 bg-accent text-accent-foreground hover:bg-accent/80 font-bold">
            <a href='https://rzp.io/rzp/U1ekE7qi' target="_blank" rel="noopener noreferrer">
              Donate Now
            </a>
          </Button>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button className="p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav with animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden border-t border-border bg-background overflow-hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`block px-6 py-3 text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-6 py-3">
              <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/80 font-bold">
                <a href="https://wa.me/918866591008?text=I%20want%20to%20donate" target="_blank" rel="noopener noreferrer">
                  Donate Now
                </a>
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
