
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Quote } from "lucide-react";

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechVision Inc.",
    avatar: "/lovable-uploads/0c1f26fd-5db2-4016-a245-65b6e2b88ec2.png",
    quote: "Sponofy transformed how we approach sponsorships. Their matching algorithm helped us find partners that truly align with our brand values, resulting in a 40% increase in ROI compared to our previous partnerships."
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Event Organizer",
    company: "Global Summit Series",
    avatar: "/lovable-uploads/0c1f26fd-5db2-4016-a245-65b6e2b88ec2.png",
    quote: "As an event organizer, finding the right sponsors was always our biggest challenge. Sponofy simplified the entire process and helped us secure partnerships with top-tier brands that perfectly matched our audience demographics."
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Sponsorship Manager",
    company: "Community Sports League",
    avatar: "/lovable-uploads/0c1f26fd-5db2-4016-a245-65b6e2b88ec2.png",
    quote: "The transparency and efficiency of Sponofy's platform is unmatched. We've been able to build long-term relationships with sponsors who are genuinely interested in supporting our community initiatives."
  },
  {
    id: 4,
    name: "Daniel Rodriguez",
    role: "Startup Founder",
    company: "InnovateTech",
    avatar: "/lovable-uploads/0c1f26fd-5db2-4016-a245-65b6e2b88ec2.png",
    quote: "As a startup with limited resources, finding sponsors seemed impossible until we discovered Sponofy. Their platform made our small business attractive to major sponsors by highlighting our unique value proposition."
  },
  {
    id: 5,
    name: "Emma Williams",
    role: "Brand Partnerships Lead",
    company: "FutureForward",
    avatar: "/lovable-uploads/0c1f26fd-5db2-4016-a245-65b6e2b88ec2.png",
    quote: "Sponofy's data-driven approach to matching sponsors with opportunities has revolutionized our partnerships strategy. We're now able to quantify the impact of each sponsorship in ways we never could before."
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-gradient-to-b from-background to-primary/5 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-blue-300/20 to-primary/20 dark:from-blue-700/10 dark:to-primary/10 rounded-full blur-3xl opacity-60 transform translate-x-1/3 translate-y-1/4"></div>
      </div>
      
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Client <span className="text-gradient">Testimonials</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-foreground/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Hear what our clients say about their experience with Sponofy.
          </motion.p>
        </div>

        <motion.div 
          className="relative px-4 sm:px-12 lg:px-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Carousel 
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div 
                    className="p-1 h-full"
                    whileHover={{ 
                      scale: 1.03,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Card className="border border-primary/10 bg-card/40 backdrop-blur-sm shadow-md hover:shadow-lg hover:border-primary/30 transition-all duration-300 h-full group">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="mb-4 text-primary/80 group-hover:text-primary transition-colors duration-300">
                          <Quote className="h-8 w-8 opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
                        </div>
                        <p className="text-foreground/80 italic mb-6 flex-grow group-hover:text-foreground transition-colors duration-300">
                          "{testimonial.quote}"
                        </p>
                        <div className="flex items-center mt-auto">
                          <Avatar className="h-12 w-12 border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback className="bg-primary/10 text-primary font-medium group-hover:bg-primary/20 transition-colors duration-300">
                              {testimonial.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="ml-4">
                            <h4 className="font-semibold group-hover:text-primary transition-colors duration-300">{testimonial.name}</h4>
                            <p className="text-sm text-foreground/70 group-hover:text-foreground/90 transition-colors duration-300">
                              {testimonial.role}, {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 md:-left-6 lg:-left-12 bg-background/80 hover:bg-background" />
            <CarouselNext className="right-0 md:-right-6 lg:-right-12 bg-background/80 hover:bg-background" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
