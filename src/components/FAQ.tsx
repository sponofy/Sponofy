
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "How does Sponofy work?",
    answer: "Sponofy works as a middleware between clients seeking sponsorship and companies looking to sponsor. Our platform allows clients to submit their sponsorship needs while companies can offer sponsorship opportunities. We then facilitate the matching process to create successful partnerships."
  },
  {
    question: "Is there a fee to use Sponofy?",
    answer: "Sponofy operates on a freemium model. Basic features are available for free, while premium features require a subscription. We also charge a small service fee when a successful sponsorship match is made."
  },
  {
    question: "How long does it take to find a sponsor?",
    answer: "The time to find a sponsor varies depending on your project, requested amount, and available sponsors. Some matches happen within days, while others may take a few weeks. Our algorithm continuously works to find the best match for your specific needs."
  },
  {
    question: "Can I sponsor multiple projects?",
    answer: "Absolutely! Companies can sponsor as many projects as they wish, depending on their available budget and interests. Our platform makes it easy to manage multiple sponsorships from one dashboard."
  },
  {
    question: "How are payments handled?",
    answer: "Payments are securely processed through our platform using industry-standard encryption. We act as an escrow service, releasing funds once all terms of the sponsorship agreement have been met, ensuring protection for both parties."
  },
  {
    question: "What makes Sponofy different from other platforms?",
    answer: "Sponofy stands out with our sophisticated matching algorithm, comprehensive verification process, and end-to-end sponsorship management tools. We don't just connect sponsors and clients; we facilitate the entire sponsorship lifecycle with transparent reporting and analytics."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 md:py-32 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-1/4 h-1/4 bg-gradient-to-bl from-blue-300/20 to-primary/20 dark:from-blue-700/10 dark:to-primary/10 rounded-full blur-3xl opacity-60"></div>
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
            Frequently Asked <span className="text-gradient">Questions</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-foreground/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Find answers to common questions about our sponsorship platform.
          </motion.p>
        </div>

        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                <AccordionTrigger className="text-left text-lg font-medium py-5 hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
