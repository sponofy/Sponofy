
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const Clients = () => {
  const clients = [
    {
      name: "Google",
      logo: "/lovable-uploads/GOOGLE.png"
    },
    {
      name: "Meta",
      logo: "/lovable-uploads/META.png"
    },
    {
      name: "Amazon",
      logo: "/lovable-uploads/AMAZON.png"
    },
    {
      name: "Alibaba",
      logo: "/lovable-uploads/ALIBABA.png"
    },
    {
      name: "Shopify",
      logo: "/lovable-uploads/SHOPIFY.png"
    }
  ];
  
  // Reference to the scroll container
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    let animationId: number | null = null;
    let scrollPosition = 0;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    const speed = 0.5; // pixels per frame
    
    const scroll = () => {
      if (container) {
        scrollPosition += speed;
        
        // Reset position when we've scrolled through all content
        if (scrollPosition >= scrollWidth - clientWidth) {
          scrollPosition = 0;
        }
        
        container.scrollLeft = scrollPosition;
        animationId = requestAnimationFrame(scroll);
      }
    };
    
    animationId = requestAnimationFrame(scroll);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <motion.section
      id="clients"
      className="py-16 md:py-24 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Here are some of <span className="text-gradient">our clients</span>
          </h2>
          <p className="text-lg text-foreground/80 mt-4 max-w-3xl mx-auto">
            Trusted by leading companies worldwide
          </p>
        </div>

        {/* Scrolling Clients Section */}
        <div 
          ref={containerRef}
          className="flex gap-6 max-w-6xl mx-auto overflow-hidden"
        >
          {/* Duplicate logos for infinite scroll effect */}
          {[...clients, ...clients, ...clients].map((client, index) => (
            <motion.div
              key={`${client.name}-${index}`}
              className="flex-shrink-0"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Card className="h-full overflow-hidden border bg-background/50 backdrop-blur-sm dark:bg-card/30 hover:shadow-md transition-all duration-300 w-40">
                <CardContent className="p-6 flex items-center justify-center h-full">
                  <div className="relative w-full h-16 md:h-20">
                    <img
                      src={client.logo}
                      alt={`${client.name} logo`}
                      className="object-contain w-full h-full filter dark:brightness-[1.2] dark:contrast-[1.1] transition-all duration-300"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Clients;
