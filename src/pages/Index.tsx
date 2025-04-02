
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Services from "@/components/Services";
import SponsorshipForms from "@/components/SponsorshipForms";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import { Handshake, Rocket, Target } from "lucide-react";

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
          
          {/* Clients Section */}
          <Clients />
          
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
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">
                  About <span className="text-gradient">Sponofy</span>
                </h2>
                <p className="text-lg text-foreground/80 mt-4 max-w-3xl mx-auto">
                  Sponofy simplifies sponsorships by connecting the right sponsors with the perfect opportunities through our innovative matching platform.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Feature 1 */}
                <motion.div 
                  className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-gradient-to-b hover:from-primary/5 hover:to-transparent transition-all duration-300 group"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative mb-6 p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <Handshake 
                      className="h-12 w-12 text-primary group-hover:text-primary-foreground transition-colors duration-300" 
                      strokeWidth={1.5}
                    />
                    <div className="absolute inset-0 rounded-full bg-primary/5 group-hover:scale-110 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">Meaningful Connections</h3>
                  <p className="text-foreground/70 group-hover:text-foreground/90 transition-colors duration-300">
                    We create valuable partnerships between sponsors and seekers based on shared goals and values.
                  </p>
                </motion.div>

                {/* Feature 2 */}
                <motion.div 
                  className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-gradient-to-b hover:from-primary/5 hover:to-transparent transition-all duration-300 group"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative mb-6 p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <Target 
                      className="h-12 w-12 text-primary group-hover:text-primary-foreground transition-colors duration-300" 
                      strokeWidth={1.5}
                    />
                    <div className="absolute inset-0 rounded-full bg-primary/5 group-hover:scale-110 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">Smart Matching</h3>
                  <p className="text-foreground/70 group-hover:text-foreground/90 transition-colors duration-300">
                    Our algorithms pair sponsors with opportunities that align perfectly with their brand objectives.
                  </p>
                </motion.div>

                {/* Feature 3 */}
                <motion.div 
                  className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-gradient-to-b hover:from-primary/5 hover:to-transparent transition-all duration-300 group"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative mb-6 p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <Rocket 
                      className="h-12 w-12 text-primary group-hover:text-primary-foreground transition-colors duration-300" 
                      strokeWidth={1.5}
                    />
                    <div className="absolute inset-0 rounded-full bg-primary/5 group-hover:scale-110 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">Streamlined Process</h3>
                  <p className="text-foreground/70 group-hover:text-foreground/90 transition-colors duration-300">
                    We simplify the entire sponsorship journey from discovery to agreement, saving time and effort.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.section>
          
          <Services />
          <SponsorshipForms />
          <FAQ />
          <Testimonials />
        </main>
        
        <Footer />
      </div>
      
      {/* Standalone ChatBot component */}
      <ChatBot />
    </ThemeProvider>
  );
};

export default Index;
