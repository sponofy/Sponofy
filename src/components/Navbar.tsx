
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn } from "lucide-react";
import { useUser, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";
import AuthDialog from "./AuthDialog";

interface NavbarProps {
  openChatbot?: () => void;
}

const Navbar = ({ openChatbot }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [authDialogView, setAuthDialogView] = useState<"signIn" | "signUp">("signIn");
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

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

  const handleOpenAuthDialog = (view: "signIn" | "signUp" = "signIn") => {
    setAuthDialogView(view);
    setIsAuthDialogOpen(true);
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenChat = () => {
    if (openChatbot) {
      openChatbot();
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
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
              <span className="relative z-10">Sponofy</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link
                to="/"
                className="px-4 py-2 text-foreground/90 dark:text-foreground/80 hover:text-primary dark:hover:text-primary transition-colors rounded-md"
              >
                Home
              </Link>
              <button
                onClick={() => scrollToSection("about")}
                className="px-4 py-2 text-foreground/90 dark:text-foreground/80 hover:text-primary dark:hover:text-primary transition-colors rounded-md"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="px-4 py-2 text-foreground/90 dark:text-foreground/80 hover:text-primary dark:hover:text-primary transition-colors rounded-md"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("sponsorship-forms")}
                className="px-4 py-2 text-foreground/90 dark:text-foreground/80 hover:text-primary dark:hover:text-primary transition-colors rounded-md"
              >
                Connect
              </button>
              <button
                onClick={handleOpenChat}
                className="px-4 py-2 text-foreground/90 dark:text-foreground/80 hover:text-primary dark:hover:text-primary transition-colors rounded-md"
              >
                AI Support
              </button>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              
              <SignedIn>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-4"
                >
                  <Button
                    asChild
                    variant="outline"
                    className="border-primary/30 hover:border-primary/60 transition-all duration-300"
                  >
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                  <UserButton afterSignOutUrl="/" />
                </motion.div>
              </SignedIn>
              
              <SignedOut>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    className="bg-primary hover:bg-primary/90 text-white rounded-full group relative overflow-hidden"
                    onClick={() => handleOpenAuthDialog("signIn")}
                  >
                    <span className="relative z-10 flex items-center">
                      <LogIn className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      Become a Member
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
                  </Button>
                </motion.div>
              </SignedOut>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 md:hidden">
              <ThemeToggle />
              
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              
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
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden fixed inset-0 z-40 bg-background/95 dark:bg-background/95 backdrop-blur-sm"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
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
                  <button
                    onClick={() => scrollToSection("about")}
                    className="text-2xl font-medium text-foreground/90 hover:text-primary transition-colors"
                  >
                    About Us
                  </button>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-2xl font-medium text-foreground/90 hover:text-primary transition-colors"
                  >
                    Services
                  </button>
                  <button
                    onClick={() => scrollToSection("sponsorship-forms")}
                    className="text-2xl font-medium text-foreground/90 hover:text-primary transition-colors"
                  >
                    Connect
                  </button>
                  <button
                    onClick={handleOpenChat}
                    className="text-2xl font-medium text-foreground/90 hover:text-primary transition-colors"
                  >
                    AI Support
                  </button>
                  
                  <SignedIn>
                    <Button
                      asChild
                      variant="outline"
                      className="mt-6 w-full max-w-xs border-primary/30 hover:border-primary/60"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link to="/dashboard">Dashboard</Link>
                    </Button>
                  </SignedIn>
                  
                  <SignedOut>
                    <Button
                      className="mt-6 w-full max-w-xs bg-primary hover:bg-primary/90 text-white rounded-full"
                      onClick={() => handleOpenAuthDialog("signIn")}
                    >
                      <LogIn className="mr-2 h-5 w-5" />
                      Become a Member
                    </Button>
                  </SignedOut>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Auth Dialog */}
      <AuthDialog 
        isOpen={isAuthDialogOpen} 
        onOpenChange={setIsAuthDialogOpen}
        initialView={authDialogView}
      />
    </>
  );
};

export default Navbar;
