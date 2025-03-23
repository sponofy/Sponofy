
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone 
} from "lucide-react";

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle subscribe logic here
    console.log("Subscribe form submitted");
  };

  return (
    <footer className="bg-primary/10 dark:bg-primary/20 pt-16 pb-8 relative">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div className="space-y-4">
            <Link
              to="/"
              className="flex items-start text-2xl font-bold text-primary transition-all duration-300 hover:opacity-90"
            >
              <div className="relative flex items-center">
                <span className="relative z-10">Sponofy</span>
                <div className="absolute -bottom-1 h-3 w-full bg-secondary dark:bg-accent rounded-md -z-0 transform -skew-x-12"></div>
              </div>
            </Link>
            <p className="text-foreground/70">
              Connecting sponsors and clients for meaningful and impactful partnerships.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/60 hover:text-primary" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-foreground/70 hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/#about" className="text-foreground/70 hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/#services" className="text-foreground/70 hover:text-primary transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/#sponsorship-forms" className="text-foreground/70 hover:text-primary transition-colors">Sponsorship</Link>
              </li>
              <li>
                <Link to="/#faq" className="text-foreground/70 hover:text-primary transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <span className="text-foreground/70">123 Sponsorship Ave, San Francisco, CA 94103</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <span className="text-foreground/70">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <span className="text-foreground/70">contact@sponofy.com</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Subscribe</h3>
            <p className="text-foreground/70">
              Stay updated with the latest sponsorship opportunities.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-background focus-visible:ring-primary" 
                required
              />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-foreground/60">
          <p>© {new Date().getFullYear()} Sponofy. All rights reserved.</p>
          <div className="mt-2 space-x-4 text-sm">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
