
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


const testimonials = [
  {
    id: 1,
    name: "Amey Pande",
    role: "Digitl Marketing",
    company: "Vardhayani.inc",
    avatar: "/lovable-uploads/Pande1.jpg",
    quote: "Sponofy completely changed how we find sponsors. Their matching tool boosted our ROI by 40%!"
  },
  {
    id: 2,
    name: "Krishana Jhahangid",
    role: "Event Organizer",
    company: "Jhahangid Automobiles",
    avatar: "/lovable-uploads/jahangid.jpg",
    quote: "Finding the right sponsors was tough. Sponofy made it seamless. We secured top-tier partners easily!"
  },
  {
    id: 3,
    name: "Yash Naik",
    role: "Marketing Head",
    company: "Naik Beverages",
    avatar: "/lovable-uploads/Yash.jpg",
    quote: "Sponofy connects us with sponsors who truly care about our mission. The process is effortless!"
  },
  {
    id: 4,
    name: "Taufak Shaikh",
    role: "Startup Founder",
    company: "InnovateTech",
    avatar: "/lovable-uploads/tofk.jpg",
    quote: "As a startup, finding sponsors was a struggle. Sponofy made us stand out to the right brands!"
  },
  {
    id: 5,
    name: "Tanya D'Souza",
    role: "Brand Partnerships Lead",
    company: "FutureForward",
    avatar: "/lovable-uploads/Gibli.jpg",
    quote: "Sponofy’s data-driven approach changed our strategy. Now we measure sponsorship impact like never before!"
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
