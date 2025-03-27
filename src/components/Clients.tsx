
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

  return (
    <motion.section
      id="clients"
      className="py-16 md:py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <Badge 
              variant="secondary" 
              className="bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm text-primary dark:text-primary-foreground border border-primary/10 px-3 animate-pulse-soft"
            >
              FlyWithSponofy
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            Here are some of <span className="text-gradient">our clients</span>
          </h2>
          <p className="text-lg text-foreground/80 mt-4 max-w-3xl mx-auto">
            Trusted by leading companies worldwide
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {clients.map((client) => (
            <motion.div
              key={client.name}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Card className="h-full overflow-hidden border bg-background/50 backdrop-blur-sm dark:bg-card/30 hover:shadow-md transition-all duration-300">
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
