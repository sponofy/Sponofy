
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Play, ArrowRight, HandCoins, Users, ChartBar } from "lucide-react";

const Hero = () => {
  const scrollToSponsorshipForms = () => {
    const section = document.getElementById("sponsorship-forms");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-primary/20 to-purple-300/20 dark:from-primary/10 dark:to-purple-700/10 rounded-full blur-3xl opacity-60 transform -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-gradient-to-tr from-blue-300/20 to-primary/20 dark:from-blue-700/10 dark:to-primary/10 rounded-full blur-3xl opacity-60 transform translate-y-1/2"></div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight lg:leading-tight mb-6 tracking-tight text-balance relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-foreground">Connecting </span>
            <span className="text-gradient font-extrabold relative">
              Sponsors & Clients
            </span>
            <span className="text-foreground"> Seamlessly</span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-foreground/80 max-w-3xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Sponofy bridges the gap between those seeking sponsorship and companies looking to sponsor. Our platform streamlines connections, making the process efficient and effective for everyone involved.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 text-lg shadow-lg shadow-primary/20 dark:shadow-primary/10"
              onClick={scrollToSponsorshipForms}
            >
              Get Sponsored
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:text-primary hover:bg-primary/5 rounded-full px-8 h-12 text-lg"
            >
              <Link to="/#about">
                Learn More
              </Link>
            </Button>
          </motion.div>

          <motion.div 
            className="mt-16 w-full max-w-5xl mx-auto relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-primary/10 bg-gradient-to-br from-white/80 to-white/50 dark:from-gray-900/80 dark:to-gray-900/50 backdrop-blur-sm">
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl"></div>
              
              <div className="relative p-8 md:p-12 z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="text-left space-y-6">
                    <h3 className="text-2xl md:text-3xl font-bold teal-gradient-text">
                      Connect. Collaborate. Grow.
                    </h3>
                    
                    <p className="text-foreground/80">
                      Discover our innovative platform that brings sponsors and clients together in a streamlined ecosystem.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <HandCoins size={18} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Smart Matching</h4>
                          <p className="text-sm text-foreground/70">AI-powered connections between sponsors and the right opportunities</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <Users size={18} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Collaborative Tools</h4>
                          <p className="text-sm text-foreground/70">Work together seamlessly with integrated communication features</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <ChartBar size={18} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Analytics Dashboard</h4>
                          <p className="text-sm text-foreground/70">Track performance and measure ROI with powerful insights</p>
                        </div>
                      </div>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="gap-2 group">
                          <Play size={16} className="text-primary group-hover:text-primary" />
                          Watch Demo
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] bg-background p-0 overflow-hidden">
                        <div className="aspect-video w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                          <p className="text-xl font-medium text-foreground/60">Demo Video</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  <div className="relative">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
                      
                      <div className="absolute inset-0 p-4">
                        <div className="h-full rounded-md overflow-hidden flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                          <div className="h-12 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4">
                            <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                            <div className="flex-1 h-5 mx-auto max-w-[180px] bg-gray-200 dark:bg-gray-700 rounded"></div>
                          </div>
                          
                          <div className="flex-1 p-4 grid grid-cols-5 gap-4">
                            <div className="col-span-1 bg-gray-50 dark:bg-gray-800 rounded-md p-2 flex flex-col gap-2">
                              {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                              ))}
                            </div>
                            
                            <div className="col-span-4 flex flex-col gap-4">
                              <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded-md"></div>
                              <div className="grid grid-cols-2 gap-4 flex-1">
                                <div className="flex flex-col gap-2">
                                  <div className="h-40 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-md"></div>
                                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4"></div>
                                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2"></div>
                                </div>
                                <div className="flex flex-col gap-2">
                                  <div className="h-40 bg-gradient-to-br from-blue-100/50 to-purple-100/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-md"></div>
                                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4"></div>
                                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <motion.div 
                      className="absolute -right-6 -bottom-6 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shadow-lg border border-white/30 dark:border-white/10"
                      animate={{ 
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <ArrowRight className="text-primary" size={20} />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 -right-4 h-20 bg-gradient-to-t from-background to-transparent z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
