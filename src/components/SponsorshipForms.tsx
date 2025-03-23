import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SponsorshipForms = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("need-sponsorship");

  const handleClientSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Form submitted",
        description: "We've received your sponsorship request. We'll be in touch soon!",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  const handleCompanySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Form submitted",
        description: "Your sponsorship offer has been registered. We'll connect you with suitable clients!",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <section id="sponsorship-forms" className="py-20 md:py-32 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute bottom-1/4 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-primary/20 to-purple-300/20 dark:from-primary/10 dark:to-purple-700/10 rounded-full blur-3xl opacity-60"></div>
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
            <span className="text-gradient">Sponsorship</span> Forms
          </motion.h2>
          <motion.p 
            className="text-lg text-foreground/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Whether you need sponsorship or want to sponsor, we've got you covered. Fill out the appropriate form below to get started.
          </motion.p>
        </div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Tabs defaultValue="need-sponsorship" className="w-full" onValueChange={handleTabChange}>
            <div className="relative mb-12 flex justify-center">
              <div className="relative w-full max-w-md overflow-hidden bg-muted/30 rounded-full p-1.5 shadow-inner">
                <div
                  className={`absolute inset-y-1.5 ${
                    activeTab === "need-sponsorship" ? "left-1.5 right-[calc(50%+1.5px)]" : "left-[calc(50%+1.5px)] right-1.5"
                  } bg-gradient-to-r from-[#13ae90] to-[#20d4a9] rounded-full shadow-lg transition-all duration-300 ease-in-out`}
                />
                <TabsList className="grid w-full grid-cols-2 relative z-10 bg-transparent rounded-full border-none">
                  <TabsTrigger 
                    value="need-sponsorship" 
                    className="text-base py-3 data-[state=active]:bg-transparent data-[state=active]:text-primary-foreground data-[state=active]:shadow-none transition-colors duration-300 rounded-full"
                  >
                    Need Sponsorship
                  </TabsTrigger>
                  <TabsTrigger 
                    value="give-sponsorship" 
                    className="text-base py-3 data-[state=active]:bg-transparent data-[state=active]:text-primary-foreground data-[state=active]:shadow-none transition-colors duration-300 rounded-full"
                  >
                    Give Sponsorship
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            
            <TabsContent value="need-sponsorship" className="mt-0">
              <Card className="glass-card border-0">
                <CardHeader className="text-left">
                  <CardTitle>Request Sponsorship</CardTitle>
                  <CardDescription>
                    Fill out this form if you're looking for sponsors for your project or event.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form id="client-form" onSubmit={handleClientSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2 text-left">
                        <Label htmlFor="client-name">Full Name</Label>
                        <Input id="client-name" placeholder="John Doe" required />
                      </div>
                      <div className="space-y-2 text-left">
                        <Label htmlFor="client-email">Email</Label>
                        <Input id="client-email" type="email" placeholder="john@example.com" required />
                      </div>
                    </div>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2 text-left">
                        <Label htmlFor="project-name">Project/Event Name</Label>
                        <Input id="project-name" placeholder="Annual Tech Conference" required />
                      </div>
                      <div className="space-y-2 text-left">
                        <Label htmlFor="client-category">Category</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tech">Technology</SelectItem>
                            <SelectItem value="arts">Arts & Culture</SelectItem>
                            <SelectItem value="sports">Sports</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="charity">Charity</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-left">
                      <Label htmlFor="client-amount">Sponsorship Amount Needed ($)</Label>
                      <Input id="client-amount" type="number" placeholder="5000" required />
                    </div>
                    
                    <div className="space-y-2 text-left">
                      <Label htmlFor="client-description">Project Description</Label>
                      <Textarea 
                        id="client-description" 
                        placeholder="Tell us about your project or event that needs sponsorship..." 
                        rows={5}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2 text-left">
                      <Label htmlFor="client-benefits">Sponsorship Benefits</Label>
                      <Textarea 
                        id="client-benefits" 
                        placeholder="What benefits will sponsors receive? (e.g., logo placement, mentions, etc.)" 
                        rows={3}
                        required
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-start">
                  <Button 
                    type="submit" 
                    form="client-form" 
                    className="w-full group relative overflow-hidden"
                    variant="outline"
                    disabled={isSubmitting}
                  >
                    <span className="relative z-10 transition-all duration-300 group-hover:text-white">
                      {isSubmitting ? "Submitting..." : "Submit Request"}
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-[#13ae90] to-[#20d4a9] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-0"></span>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="give-sponsorship" className="mt-0">
              <Card className="glass-card border-0">
                <CardHeader className="text-left">
                  <CardTitle>Offer Sponsorship</CardTitle>
                  <CardDescription>
                    Fill out this form if you're a company interested in sponsoring projects or events.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form id="company-form" onSubmit={handleCompanySubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2 text-left">
                        <Label htmlFor="company-name">Company Name</Label>
                        <Input id="company-name" placeholder="Acme Corporation" required />
                      </div>
                      <div className="space-y-2 text-left">
                        <Label htmlFor="contact-person">Contact Person</Label>
                        <Input id="contact-person" placeholder="Jane Smith" required />
                      </div>
                    </div>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2 text-left">
                        <Label htmlFor="company-email">Email</Label>
                        <Input id="company-email" type="email" placeholder="jane@acmecorp.com" required />
                      </div>
                      <div className="space-y-2 text-left">
                        <Label htmlFor="company-phone">Phone</Label>
                        <Input id="company-phone" placeholder="+1 (555) 123-4567" />
                      </div>
                    </div>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2 text-left">
                        <Label htmlFor="sponsor-category">Industry</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tech">Technology</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 text-left">
                        <Label htmlFor="sponsor-budget">Sponsorship Budget ($)</Label>
                        <Input id="sponsor-budget" type="number" placeholder="10000" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-left">
                      <Label htmlFor="sponsor-interests">Sponsorship Interests</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="What type of projects interest you?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tech-events">Technology Events</SelectItem>
                          <SelectItem value="arts">Arts & Culture</SelectItem>
                          <SelectItem value="sports">Sports</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="charity">Charity</SelectItem>
                          <SelectItem value="startups">Startups</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2 text-left">
                      <Label htmlFor="sponsor-requirements">Sponsorship Requirements</Label>
                      <Textarea 
                        id="sponsor-requirements" 
                        placeholder="What do you expect in return for your sponsorship? (e.g., brand visibility, customer acquisition, etc.)" 
                        rows={3}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2 text-left">
                      <Label htmlFor="sponsor-additional">Additional Information</Label>
                      <Textarea 
                        id="sponsor-additional" 
                        placeholder="Any other details you'd like to share about your sponsorship interests..." 
                        rows={3}
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-start">
                  <Button 
                    type="submit" 
                    form="company-form" 
                    className="w-full group relative overflow-hidden"
                    variant="outline"
                    disabled={isSubmitting}
                  >
                    <span className="relative z-10 transition-all duration-300 group-hover:text-white">
                      {isSubmitting ? "Submitting..." : "Submit Offer"}
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-[#13ae90] to-[#20d4a9] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-0"></span>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorshipForms;
