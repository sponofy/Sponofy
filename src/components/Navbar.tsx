
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold text-primary transition-all duration-300 hover:opacity-90"
          >
            <div className="relative flex items-center">
              <span className="relative z-10">Sponofy</span>
              <div className="absolute -bottom-1 h-3 w-full bg-secondary dark:bg-accent rounded-md -z-0 transform -skew-x-12"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className="px-4 py-2 text-foreground/90 dark:text-foreground/80 hover:text-primary dark:hover:text-primary transition-colors rounded-md"
            >
              Home
            </Link>
            <Link
              to="/#about"
              className="px-4 py-2 text-foreground/90 dark:text-foreground/80 hover:text-primary dark:hover:text-primary transition-colors rounded-md"
            >
              About Us
            </Link>
            <Link
              to="/#services"
              className="px-4 py-2 text-foreground/90 dark:text-foreground/80 hover:text-primary dark:hover:text-primary transition-colors rounded-md"
            >
              Services
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-white rounded-full"
            >
              <Link to="/login">Become a Member</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground/80 hover:text-primary transition-colors rounded-full"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-background/95 dark:bg-background/95 backdrop-blur-sm transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-8 space-y-8 h-full">
          <div className="flex justify-end">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-foreground/80 hover:text-primary transition-colors rounded-full"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col space-y-6 items-center justify-center flex-grow">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-medium text-foreground/90 hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              to="/#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-medium text-foreground/90 hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/#services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-medium text-foreground/90 hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Button
              asChild
              className="mt-6 w-full max-w-xs bg-primary hover:bg-primary/90 text-white rounded-full"
            >
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                Become a Member
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
