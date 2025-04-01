
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { 
  Menu, 
  X, 
  ChevronRight, 
  ChevronDown, 
  MessageSquare 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthDialog from "@/components/AuthDialog";
import useMediaQuery from "@/hooks/use-media-query";

interface NavbarProps {
  openChatbot?: () => void;
}

const Navbar = ({ openChatbot }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [authInitialView, setAuthInitialView] = useState<"signIn" | "signUp">("signIn");
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (isDesktop) {
      setIsMobileMenuOpen(false);
    }
  }, [isDesktop]);

  // Handle links click - close menu and scroll to section
  const handleLinkClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
    
    if (location.pathname !== "/") {
      navigate(`/${sectionId}`);
    } else {
      const element = document.getElementById(sectionId.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Open auth dialog with specific view
  const openAuthDialog = (view: "signIn" | "signUp") => {
    setAuthInitialView(view);
    setIsAuthDialogOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur supports-backdrop-blur:bg-background/60 shadow-sm border-b border-border/40" 
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16 relative">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-primary transition-all duration-300 hover:opacity-90">
          <span className="relative z-10">Sponofy</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Button variant="ghost" onClick={() => handleLinkClick("")}>Home</Button>
          <Button variant="ghost" onClick={() => handleLinkClick("#about")}>About</Button>
          <Button variant="ghost" onClick={() => handleLinkClick("#services")}>Services</Button>
          
          <div className="relative">
            <Button 
              variant="ghost" 
              className="flex items-center"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Forms 
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </Button>
            
            {/* Dropdown */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  className="absolute right-0 mt-1 w-48 bg-popover shadow-md rounded-md overflow-hidden z-50 border border-border"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <SignedIn>
                    <div 
                      className="block w-full text-left px-4 py-2 hover:bg-muted transition-colors cursor-pointer"
                      onClick={() => {
                        handleLinkClick("#sponsorship-forms");
                        setIsDropdownOpen(false);
                      }}
                    >
                      Sponsorship Forms
                    </div>
                  </SignedIn>
                  <SignedOut>
                    <div 
                      className="block w-full text-left px-4 py-2 hover:bg-muted transition-colors cursor-pointer"
                      onClick={() => {
                        openAuthDialog("signIn");
                        setIsDropdownOpen(false);
                      }}
                    >
                      Request Sponsorship
                    </div>
                    <div 
                      className="block w-full text-left px-4 py-2 hover:bg-muted transition-colors cursor-pointer"
                      onClick={() => {
                        openAuthDialog("signIn");
                        setIsDropdownOpen(false);
                      }}
                    >
                      Offer Sponsorship
                    </div>
                  </SignedOut>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <Button variant="ghost" onClick={() => handleLinkClick("#faq")}>FAQ</Button>
          
          {openChatbot && (
            <Button 
              variant="ghost" 
              className="flex items-center"
              onClick={openChatbot}
            >
              <MessageSquare className="mr-1 h-4 w-4" /> 
              Chat
            </Button>
          )}
        </nav>
        
        {/* Auth buttons (desktop) */}
        <div className="hidden md:flex items-center space-x-3">
          <SignedIn>
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/#sponsorship-forms")}
              >
                Sponsorship Forms
              </Button>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
          <SignedOut>
            <Button 
              variant="outline" 
              onClick={() => openAuthDialog("signIn")}
            >
              Sign In
            </Button>
            <Button 
              variant="default" 
              className="bg-gradient-to-r from-[#13ae90] to-[#20d4a9] hover:opacity-90 text-white border-0"
              onClick={() => openAuthDialog("signUp")}
            >
              Sign Up
            </Button>
          </SignedOut>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border shadow-lg z-40"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              <Button 
                variant="ghost" 
                className="w-full justify-between"
                onClick={() => handleLinkClick("")}
              >
                <span>Home</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-between"
                onClick={() => handleLinkClick("#about")}
              >
                <span>About</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-between"
                onClick={() => handleLinkClick("#services")}
              >
                <span>Services</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <SignedIn>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between"
                  onClick={() => handleLinkClick("#sponsorship-forms")}
                >
                  <span>Sponsorship Forms</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </SignedIn>
              <SignedOut>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between"
                  onClick={() => openAuthDialog("signIn")}
                >
                  <span>Request Sponsorship</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between"
                  onClick={() => openAuthDialog("signIn")}
                >
                  <span>Offer Sponsorship</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </SignedOut>
              
              <Button 
                variant="ghost" 
                className="w-full justify-between"
                onClick={() => handleLinkClick("#faq")}
              >
                <span>FAQ</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              {openChatbot && (
                <Button 
                  variant="ghost" 
                  className="w-full justify-between"
                  onClick={() => {
                    openChatbot();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <span>Chat</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
              
              <SignedIn>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center">
                    {isLoaded && user && (
                      <div className="ml-2 text-sm">
                        Hi, {user.firstName || user.username || "User"}
                      </div>
                    )}
                  </div>
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
              <SignedOut>
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => openAuthDialog("signIn")}
                  >
                    Sign In
                  </Button>
                  <Button 
                    variant="default"
                    className="w-full bg-gradient-to-r from-[#13ae90] to-[#20d4a9] hover:opacity-90 text-white border-0"
                    onClick={() => openAuthDialog("signUp")}
                  >
                    Sign Up
                  </Button>
                </div>
              </SignedOut>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Auth Dialog */}
      <AuthDialog 
        isOpen={isAuthDialogOpen} 
        onOpenChange={setIsAuthDialogOpen} 
        initialView={authInitialView}
      />
    </motion.header>
  );
};

export default Navbar;
