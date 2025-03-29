
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState, useRef } from "react";

const Clients = () => {
  const clients = [
    {
      name: "Google",
      logo: "/lovable-uploads/ddfcd66a-48ad-4805-81a1-e94af6828ba3.png"
    },
    {
      name: "Meta",
      logo: "/lovable-uploads/59923816-5924-4674-88a2-30b1d0d9dc13.png"
    },
    {
      name: "Amazon",
      logo: "/lovable-uploads/41fbd11d-41be-49e8-8a2b-cfe2432537f2.png"
    },
    {
      name: "Alibaba",
      logo: "/lovable-uploads/51d8f059-b0d6-4613-a521-41fa99e1b18f.png"
    },
    {
      name: "Shopify",
      logo: "/lovable-uploads/8d94bf34-49a8-4ae9-adbd-a0d23d2d1f43.png"
    }
  ];
  
  // For smooth scrolling animation
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSpeed = 0.5; // Pixels per frame (lower is slower)
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    let animationFrameId: number;
    let direction = 1; // 1 for right, -1 for left
    
    const animate = () => {
      if (!container) return;
      
      setScrollPosition(prevPos => {
        const newPos = prevPos + (scrollSpeed * direction);
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        // Change direction when reaching edges
        if (newPos >= maxScroll) {
          direction = -1;
          return maxScroll;
        } else if (newPos <= 0) {
          direction = 1;
          return 0;
        }
        
        return newPos;
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);
  
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollLeft = scrollPosition;
    }
  }, [scrollPosition]);

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

        <div 
          ref={containerRef}
          className="flex gap-6 max-w-6xl mx-auto overflow-hidden"
          style={{ scrollBehavior: 'smooth' }}
        >
          {/* Duplicate clients for continuous scrolling effect */}
          {[...clients, ...clients].map((client, index) => (
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
