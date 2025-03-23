
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
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
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 text-lg shadow-lg shadow-primary/20 dark:shadow-primary/10"
            >
              <Link to="/#sponsorship-forms">
                Get Started
              </Link>
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
            className="mt-16 w-full max-w-4xl mx-auto relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="glass-card rounded-2xl overflow-hidden aspect-video shadow-2xl shadow-primary/10">
              <div className="bg-slate-100 dark:bg-slate-800 h-full flex items-center justify-center">
                <p className="text-xl font-medium text-foreground/60">Platform Preview</p>
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
