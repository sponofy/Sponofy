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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { LogIn, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const SponsorshipForms = () => {
  const { toast } = useToast();
  const { isSignedIn, user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("need-sponsorship");
  
  const [clientForm, setClientForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    language: "",
    city: "",
    project_name: "",
    category: "",
    amount: "",
    social_platform: "",
    followers_count: "",
    social_link: ""
  });
  
  const [companyForm, setCompanyForm] = useState({
    company_name: "",
    contact_person: "",
    email: "",
    phone: "",
    industry: "",
    budget: "",
    interests: "",
    requirements: "",
    additional_info: ""
  });

  const handleClientFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setClientForm({
      ...clientForm,
      [e.target.id.replace('client-', '')]: e.target.value
    });
  };

  const handleCompanyFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCompanyForm({
      ...companyForm,
      [e.target.id.replace('sponsor-', '')]: e.target.value
    });
  };

  const handleSelectChange = (value: string, formType: string, field: string) => {
    if (formType === 'client') {
      setClientForm({
        ...clientForm,
        [field]: value
      });
    } else {
      setCompanyForm({
        ...companyForm,
        [field]: value
      });
    }
  };

  const handleClientSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSignedIn) {
      toast({
        title: "Authentication required",
        description: "Please sign in to submit your sponsorship request.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const userEmail = user?.primaryEmailAddress?.emailAddress || clientForm.email;
      
      const { error } = await supabase.from('client_requests').insert({
        name: clientForm.name,
        email: userEmail,
        phone: clientForm.phone,
        age: parseInt(clientForm.age) || null,
        gender: clientForm.gender,
        language: clientForm.language,
        city: clientForm.city,
        project_name: clientForm.project_name,
        category: clientForm.category,
        amount: parseFloat(clientForm.amount),
        social_platform: clientForm.social_platform,
        followers_count: clientForm.followers_count,
        social_link: clientForm.social_link,
        description: "Not required",
        benefits: "Not required"
      });
      
      if (error) throw error;
      
      toast({
        title: "Form submitted",
        description: "We've received your sponsorship request. We'll be in touch soon!",
      });
      
      setClientForm({
        name: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
        language: "",
        city: "",
        project_name: "",
        category: "",
        amount: "",
        social_platform: "",
        followers_count: "",
        social_link: ""
      });
      
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error submitting client form:", error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompanySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSignedIn) {
      toast({
        title: "Authentication required",
        description: "Please sign in to submit your sponsorship offer.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const userEmail = user?.primaryEmailAddress?.emailAddress || companyForm.email;
      
      const { error } = await supabase.from('company_offers').insert({
        company_name: companyForm.company_name,
        contact_person: companyForm.contact_person,
        email: userEmail,
        phone: companyForm.phone || null,
        industry: companyForm.industry,
        budget: parseFloat(companyForm.budget),
        interests: companyForm.interests,
        requirements: companyForm.requirements,
        additional_info: companyForm.additional_info || null
      });
      
      if (error) throw error;
      
      toast({
        title: "Form submitted",
        description: "Your sponsorship offer has been registered. We'll connect you with suitable clients!",
      });
      
      setCompanyForm({
        company_name: "",
        contact_person: "",
        email: "",
        phone: "",
        industry: "",
        budget: "",
        interests: "",
        requirements: "",
        additional_info: ""
      });
      
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error submitting company form:", error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your offer. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  if (!isSignedIn) {
    return (
      <section id="sponsorship-forms" className="py-20 md:py-32 relative">
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
              Whether you need sponsorship or want to sponsor, we've got you covered.
            </motion.p>
          </div>

          <motion.div
            className="max-w-xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass-card border-0">
              <CardHeader className="text-center">
                <CardTitle>Authentication Required</CardTitle>
                <CardDescription>
                  Please sign in to access the sponsorship forms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 py-4">
                <Alert variant="default">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Access restricted</AlertTitle>
                  <AlertDescription>
                    To submit sponsorship requests or offers, you need to be signed in. This helps us verify your identity and communicate with you efficiently.
                  </AlertDescription>
                </Alert>
                <div className="flex flex-col items-center justify-center py-6">
                  <Button asChild size="lg" className="group relative overflow-hidden">
                    <Link to="/sign-in">
                      <LogIn className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      Sign In to Continue
                    </Link>
                  </Button>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Don't have an account? <Link to="/sign-up" className="text-primary hover:underline">Sign up</Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="sponsorship-forms" className="py-20 md:py-32 relative">
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
            <div className="flex justify-center mb-12">
              <div className="relative w-full max-w-md bg-muted/30 rounded-full p-1.5 shadow-inner">
                <div
                  className={`absolute inset-y-1.5 ${
                    activeTab === "need-sponsorship" ? "left-1.5 right-[calc(50%+1.5px)]" : "left-[calc(50%+1.5px)] right-1.5"
                  } teal-gradient rounded-full shadow-lg transition-all duration-300 ease-in-out`}
                />
                <TabsList className="grid w-full grid-cols-2 relative z-10 bg-transparent rounded-full border-none h-12">
                  <TabsTrigger 
                    value="need-sponsorship" 
                    className="text-base py-3 data-[state=active]:bg-transparent data-[state=active]:text-primary-foreground data-[state=active]:shadow-none transition-colors duration-300 rounded-full flex items-center justify-center"
                  >
                    Need Sponsorship
                  </TabsTrigger>
                  <TabsTrigger 
                    value="give-sponsorship" 
                    className="text-base py-3 data-[state=active]:bg-transparent data-[state=active]:text-primary-foreground data-[state=active]:shadow-none transition-colors duration-300 rounded-full flex items-center justify-center"
                  >
                    Give Sponsorship
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            
            <TabsContent value="need-sponsorship" className="mt-0">
              <Card className="glass-card border-0">
                <CardHeader className="text-center">
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
                        <Input 
                          id="client-name" 
                          placeholder="John Doe" 
                          required 
                          value={clientForm.name}
                          onChange={handleClientFormChange}
                        />
                      </div>
                      <div className="space-y-2 text-left">
                        <Label htmlFor="client-email">Email</Label>
                        <Input 
                          id="client-email" 
                          type="email" 
                          placeholder="john@example.com" 
                          required 
                          value={clientForm.email || user?.primaryEmailAddress?.emailAddress || ''}
                          onChange={handleClientFormChange}
                          disabled={!!user?.primaryEmailAddress}
                        />
                        {user?.primaryEmailAddress && (
                          <p className="text-xs text-muted-foreground mt-1">Using your account email</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2 text-left">
                        <Label htmlFor="client-phone">Phone</Label>
                        <Input 
                          id="client-phone" 
                          placeholder="+1 (555) 123-4567" 
                          required
                          value={clientForm.phone}
                          onChange={handleClientFormChange}
                        />
                      </div>
                      <div className="space-y-2 text-left">
                        <Label htmlFor="client-age">Age</Label>
                        <Input 
                          id="client-age" 
                          type="number" 
                          placeholder="25" 
                          required
                          value={clientForm.age}
                          onChange={handleClientFormChange}
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2 text-left">
                        <Label>Gender</Label>
                        <RadioGroup 
                          value={clientForm.gender} 
                          onValueChange={(value) => handleSelectChange(value, 'client', 'gender')}
                          className="flex gap-4 pt-2"
                          required
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="client-gender-male" />
                            <Label htmlFor="client-gender-male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="client-gender-female" />
                            <Label htmlFor="client-gender-female">Female</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-2 text-left">
                        <Label htmlFor="client-language">Language You Speak</Label>
                        <Input 
                          id="client-language" 
                          placeholder="English, Spanish, etc." 
                          required 
                          value={clientForm.language}
                          onChange={handleClientFormChange}
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2 text-left">
                        <Label htmlFor="client-city">Your City</Label>
                        <Input 
                          id="client-city" 
                          placeholder="New York" 
                          required 
                          value={clientForm.city}
                          onChange={handleClientFormChange}
                        />
                      </div>
                      <div className="space-y-2 text-left">
                        <Label htmlFor="client-project_name">Your Niche</Label>
                        <Input 
                          id="client-project_name" 
                          placeholder="Fitness, Car Reviwes, etc.." 
                          required 
                          value={clientForm.project_name}
                          onChange={handleClientFormChange}
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2 text-left">
                        <Label htmlFor="client-category">Category</Label>
                        <Select 
                          required 
                          value={clientForm.category}
                          onValueChange={(value) => handleSelectChange(value, 'client', 'category')}
                        >
                          <SelectTrigger id="client-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Technology">Technology</SelectItem>
                            <SelectItem value="Arts & Culture">Arts & Culture</SelectItem>
                            <SelectItem value="Sports">Sports</SelectItem>
                            <SelectItem value="Education">Education</SelectItem>
                            <SelectItem value="Charity">Charity</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 text-left">
                        <Label htmlFor="client-amount">Sponsorship Amount Expected ($)</Label>
                        <Input 
                          id="client-amount" 
                          type="number" 
                          placeholder="5000" 
                          required 
                          value={clientForm.amount}
                          onChange={handleClientFormChange}
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2 text-left">
                        <Label htmlFor="client-social_platform">Your Commercials</Label>
                        <Select 
                          required 
                          value={clientForm.social_platform}
                          onValueChange={(value) => handleSelectChange(value, 'client', 'social_platform')}
                        >
                          <SelectTrigger id="client-social_platform">
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Youtube">Youtube</SelectItem>
                            <SelectItem value="Instagram">Instagram</SelectItem>
                            <SelectItem value="Facebook">Facebook</SelectItem>
                            <SelectItem value="Pinterest">Pinterest</SelectItem>
                            <SelectItem value="TikTok">TikTok</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 text-left">
                        <Label htmlFor="client-followers_count">Your Followers/Subscribers</Label>
                        <Input 
                          id="client-followers_count" 
                          placeholder="10000" 
                          required 
                          value={clientForm.followers_count}
                          onChange={handleClientFormChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-left">
                      <Label htmlFor="client-social_link">Link to Social Media Account</Label>
                      <Input 
                        id="client-social_link" 
                        placeholder="https://www.instagram.com/yourusername" 
                        required
                        value={clientForm.social_link}
                        onChange={handleClientFormChange}
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
                <CardHeader className="text-center">
                  <CardTitle>Offer Sponsorship</CardTitle>
                  <CardDescription>
                    Fill out this form if you're a company interested in sponsoring projects or events.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form id="company-form" onSubmit={handleCompanySubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2 text-left">
                        <Label htmlFor="sponsor-company_name">Company Name</Label>
                        <Input 
                          id="sponsor-company_name" 
                          placeholder="Acme Corporation" 
                          required 
                          value={companyForm.company_name}
                          onChange={handleCompanyFormChange}
                        />
                      </div>
                      <div className="space-y-2 text-left">
                        <Label htmlFor="sponsor-contact_person">Contact Person</Label>
                        <Input 
                          id="sponsor-contact_person" 
                          placeholder="Jane Smith" 
                          required 
                          value={companyForm.contact_person}
                          onChange={handleCompanyFormChange}
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2 text-left">
                        <Label htmlFor="sponsor-email">Email</Label>
                        <Input 
                          id="sponsor-email" 
                          type="email" 
                          placeholder="jane@acmecorp.com" 
                          required 
                          value={companyForm.email || user?.primaryEmailAddress?.emailAddress || ''}
                          onChange={handleCompanyFormChange}
                          disabled={!!user?.primaryEmailAddress}
                        />
                        {user?.primaryEmailAddress && (
                          <p className="text-xs text-muted-foreground mt-1">Using your account email</p>
                        )}
                      </div>
                      <div className="space-y-2 text-left">
                        <Label htmlFor="sponsor-phone">Phone (Optional)</Label>
                        <Input 
                          id="sponsor-phone" 
                          placeholder="+1 (555) 123-4567" 
                          value={companyForm.phone}
                          onChange={handleCompanyFormChange}
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2 text-left">
                        <Label htmlFor="sponsor-industry">Industry</Label>
                        <Select 
                          required 
                          value={companyForm.industry}
                          onValueChange={(value) => handleSelectChange(value, 'company', 'industry')}
                        >
                          <SelectTrigger id="sponsor-industry">
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Industries</SelectItem>
                            <SelectItem value="Technology">Technology</SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="Healthcare">Healthcare</SelectItem>
                            <SelectItem value="Retail">Retail</SelectItem>
                            <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 text-left">
                        <Label htmlFor="sponsor-budget">Sponsorship Budget ($)</Label>
                        <Input 
                          id="sponsor-budget" 
                          type="number" 
                          placeholder="10000" 
                          required 
                          value={companyForm.budget}
                          onChange={handleCompanyFormChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-left">
                      <Label htmlFor="sponsor-interests">Sponsorship Interests</Label>
                      <Select 
                        required 
                        value={companyForm.interests}
                        onValueChange={(value) => handleSelectChange(value, 'company', 'interests')}
                      >
                        <SelectTrigger id="sponsor-interests">
                          <SelectValue placeholder="What type of projects interest you?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="Technology Events">Technology Events</SelectItem>
                          <SelectItem value="Arts & Culture">Arts & Culture</SelectItem>
                          <SelectItem value="Sports">Sports</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Charity">Charity</SelectItem>
                          <SelectItem value="Startups">Startups</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
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
                        value={companyForm.requirements}
                        onChange={handleCompanyFormChange}
                      />
                    </div>
                    
                    <div className="space-y-2 text-left">
                      <Label htmlFor="sponsor-additional_info">Additional Information</Label>
                      <Textarea 
                        id="sponsor-additional_info" 
                        placeholder="Any other details you'd like to share about your sponsorship interests..." 
                        rows={3}
                        value={companyForm.additional_info}
                        onChange={handleCompanyFormChange}
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
