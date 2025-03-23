
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import SponsorshipForms from "@/components/SponsorshipForms";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Set the page title
    document.title = "Sponofy - Connecting Sponsors & Clients";
    
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider defaultTheme="light">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          <Hero />
          
          {/* About Section */}
          <motion.section
            id="about"
            className="py-20 md:py-32 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute bottom-0 left-1/4 w-1/3 h-1/3 bg-gradient-to-tr from-primary/20 to-blue-300/20 dark:from-primary/10 dark:to-blue-700/10 rounded-full blur-3xl opacity-60"></div>
            </div>

            <div className="container px-4 md:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    About <span className="text-gradient">Sponofy</span>
                  </h2>
                  <p className="text-lg text-foreground/80 mb-6">
                    Sponofy was founded with a simple mission: to simplify the sponsorship process and create meaningful connections between sponsors and those seeking sponsorship.
                  </p>
                  <p className="text-lg text-foreground/80 mb-6">
                    We understand the challenges faced by both sides of the sponsorship equation. Projects and events struggle to find the right sponsors, while companies find it difficult to discover opportunities that align with their values and goals.
                  </p>
                  <p className="text-lg text-foreground/80">
                    Our platform bridges this gap by using sophisticated matching algorithms and a streamlined process that makes finding the perfect sponsorship partnership easier than ever before.
                  </p>
                </div>
                
                <div className="order-1 lg:order-2">
                  <div className="relative">
                    <div className="glass-card aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
                      <div className="bg-slate-100 dark:bg-slate-800 h-full flex items-center justify-center">
                        <p className="text-xl font-medium text-foreground/60">About Us Image</p>
                      </div>
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
                    <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-300/10 dark:bg-blue-700/10 rounded-full blur-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
          
          <Services />
          <SponsorshipForms />
          <FAQ />
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
