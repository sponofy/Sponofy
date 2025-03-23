
import { motion } from "framer-motion";
import { 
  Handshake, 
  Users, 
  Shield, 
  LineChart, 
  Clock, 
  Zap
} from "lucide-react";

const serviceItems = [
  {
    icon: Handshake,
    title: "Connect With Sponsors",
    description: "Find the perfect sponsors for your projects or events with our advanced matching system.",
    delay: 0
  },
  {
    icon: Users,
    title: "Find Sponsorship Opportunities",
    description: "Companies can discover high-potential projects and events that align with their brand values.",
    delay: 0.1
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "Our platform ensures all sponsorship transactions are secure, transparent, and protected.",
    delay: 0.2
  },
  {
    icon: LineChart,
    title: "Track Performance",
    description: "Comprehensive analytics to measure the impact and success of sponsorship collaborations.",
    delay: 0.3
  },
  {
    icon: Clock,
    title: "Save Time",
    description: "Streamlined processes eliminate the hassle of traditional sponsorship acquisition methods.",
    delay: 0.4
  },
  {
    icon: Zap,
    title: "Instant Matching",
    description: "Our AI-driven algorithm matches sponsors and clients based on mutual interests and goals.",
    delay: 0.5
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-32 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-primary/20 to-blue-300/20 dark:from-primary/10 dark:to-blue-700/10 rounded-full blur-3xl opacity-60"></div>
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
            Our <span className="text-gradient">Services</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-foreground/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Connecting sponsors and clients with innovative solutions that create meaningful partnerships.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceItems.map((service, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-2xl h-full transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: service.delay }}
            >
              {/* Background fill animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 transform translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0 rounded-2xl z-0"></div>
              
              {/* Card content */}
              <div className="glass-card p-8 rounded-2xl h-full flex flex-col items-center text-center relative z-10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-transparent group-hover:bg-transparent border border-white/20 group-hover:border-white/40">
                <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 group-hover:bg-white/10 flex items-center justify-center transition-all duration-300">
                  <service.icon className="h-8 w-8 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-white transition-colors duration-300">{service.title}</h3>
                <p className="text-foreground/70 group-hover:text-white/90 flex-grow transition-colors duration-300">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
