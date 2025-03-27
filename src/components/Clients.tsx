
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const clientLogos = [
  {
    name: "Google",
    logo: "/lovable-uploads/bca6e34d-2454-4a41-b6e9-a94b2919a048.png",
    width: 150
  },
  {
    name: "Meta",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    width: 140
  },
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    width: 140
  },
  {
    name: "Alibaba",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/62/Alibaba_Group_logo.svg",
    width: 150
  },
  {
    name: "Shopify",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg",
    width: 140
  },
  {
    name: "IBM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    width: 120
  }
];

const Clients = () => {
  const [api, setApi] = useState<any>(null);
  
  // Auto-scroll effect
  useEffect(() => {
    if (!api) return;
    
    // Function to scroll to next slide
    const scrollToNextSlide = () => {
      api.scrollNext();
    };
    
    // Set up auto scrolling interval
    const interval = setInterval(scrollToNextSlide, 3000);
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [api]);

  return (
    <motion.section
      className="py-12 bg-gradient-to-r from-background to-background/80 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-gradient-to-tr from-primary/10 to-blue-300/10 dark:from-primary/5 dark:to-blue-700/5 rounded-full blur-3xl opacity-60"></div>
      </div>
      
      <div className="container px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            Our <span className="text-gradient">Clients</span>
          </h2>
          <p className="text-foreground/70 mt-2">Trusted by industry leaders worldwide</p>
        </div>

        <div className="mx-auto max-w-5xl relative px-6">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {clientLogos.map((client, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 xs:basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 flex items-center justify-center">
                  <div className="p-4 h-24 flex items-center justify-center">
                    <img 
                      src={client.logo} 
                      alt={`${client.name} logo`} 
                      className="max-h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      style={{ maxWidth: client.width }}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </motion.section>
  );
};

export default Clients;
