
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, CheckCircle2, ClockIcon, DollarSignIcon, LineChartIcon, MessageSquareTextIcon, ArrowRight, CircleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Sample data for dashboard
const opportunitiesData = [
  {
    title: "Tech Innovation Conference",
    description: "Annual conference showcasing the latest in tech innovation",
    amount: "$10,000",
    deadline: "May 15, 2023",
    status: "Active",
    category: "Events",
  },
  {
    title: "Global Sports Championship",
    description: "International sports tournament with global audience reach",
    amount: "$25,000",
    deadline: "June 22, 2023",
    status: "Active",
    category: "Sports",
  },
  {
    title: "Creative Arts Festival",
    description: "Celebration of various creative arts and performances",
    amount: "$8,000",
    deadline: "July 5, 2023",
    status: "Active", 
    category: "Arts",
  },
  {
    title: "Environmental Summit",
    description: "Conference focused on climate change solutions",
    amount: "$15,000",
    deadline: "August 10, 2023",
    status: "Active",
    category: "Conference",
  }
];

const applicationsData = [
  {
    title: "Annual Music Festival",
    company: "SoundWave Productions",
    submittedDate: "April 5, 2023",
    status: "Under Review",
    category: "Entertainment",
  },
  {
    title: "Tech Startup Pitch Event",
    company: "InnovateTech Inc.",
    submittedDate: "March 22, 2023",
    status: "Approved",
    category: "Technology",
  },
  {
    title: "Children's Charity Fundraiser",
    company: "BrightFuture Foundation",
    submittedDate: "February 15, 2023",
    status: "Declined",
    category: "Nonprofit",
  }
];

const messagesData = [
  {
    from: "Laura Chen",
    company: "TechFest Organizers",
    preview: "Thank you for your interest in sponsoring our event...",
    time: "2 hours ago",
    unread: true,
  },
  {
    from: "Michael Rodriguez",
    company: "Global Sports Inc.",
    preview: "We've reviewed your sponsorship application and would like to discuss further...",
    time: "Yesterday",
    unread: false,
  },
  {
    from: "Sarah Johnson",
    company: "Community Arts Council",
    preview: "Your sponsorship proposal has been approved! We're excited to partner with you...",
    time: "3 days ago",
    unread: false,
  }
];

const upcomingEventsData = [
  {
    title: "Sponsorship Webinar",
    date: "May 10, 2023",
    time: "2:00 PM",
    description: "Learn how to maximize your sponsorship opportunities",
  },
  {
    title: "Tech Industry Mixer",
    date: "May 17, 2023",
    time: "6:30 PM",
    description: "Networking event for tech industry sponsors and seekers",
  },
  {
    title: "Proposal Writing Workshop",
    date: "May 24, 2023",
    time: "10:00 AM",
    description: "Workshop on crafting effective sponsorship proposals",
  }
];

// Type definitions
type Category = "All" | "Events" | "Sports" | "Arts" | "Conference" | "Technology" | "Entertainment" | "Nonprofit";
type Status = "All" | "Active" | "Under Review" | "Approved" | "Declined";

const categoriesArray: Category[] = ["All", "Events", "Sports", "Arts", "Conference", "Technology", "Entertainment", "Nonprofit"];
const statusOptions: Status[] = ["All", "Active", "Under Review", "Approved", "Declined"];

const Dashboard = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [statusFilter, setStatusFilter] = useState<Status>("All");
  const navigate = useNavigate();

  // Filter opportunities based on category and status
  const filteredOpportunities = opportunitiesData.filter(
    (opportunity) => 
      (activeCategory === "All" || opportunity.category === activeCategory) &&
      (statusFilter === "All" || opportunity.status === statusFilter)
  );

  // Filter applications based on category and status
  const filteredApplications = applicationsData.filter(
    (application) =>
      (activeCategory === "All" || application.category === activeCategory) &&
      (statusFilter === "All" || application.status === statusFilter)
  );

  // Create an object to easily reference categories
  const categoriesObj: Record<string, Category> = {};
  categoriesArray.forEach((category) => {
    categoriesObj[category] = category;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Manage your sponsorship opportunities and applications</p>
        </div>

        <Button 
          onClick={() => navigate("/#sponsorship-forms")} 
          className="bg-gradient-to-r from-[#13ae90] to-[#20d4a9] hover:opacity-90 text-white border-0"
        >
          Get Sponsored with Sponofy
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Opportunities</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">
              +4 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
            <ClockIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Sponsorships</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              +6 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <LineChartIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$283,500</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="opportunities" className="mb-8">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
        
        <div className="flex flex-wrap gap-2 my-4">
          {categoriesArray.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={activeCategory === category ? "bg-primary" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
        
        <TabsContent value="opportunities">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredOpportunities.length > 0 ? (
              filteredOpportunities.map((opportunity, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="bg-muted/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{opportunity.title}</CardTitle>
                        <CardDescription className="mt-1">{opportunity.category}</CardDescription>
                      </div>
                      <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold bg-green-50 text-green-700 border-green-200">
                        {opportunity.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-sm mb-4">{opportunity.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">{opportunity.amount}</div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <ClockIcon className="h-3 w-3 mr-1" />
                        <span>Deadline: {opportunity.deadline}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4">View Details</Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center p-8 bg-muted/30 rounded-lg">
                <CircleAlert className="h-8 w-8 text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">No opportunities found</h3>
                <p className="text-muted-foreground text-center mt-1">
                  Try changing your category filter or check back later for new opportunities.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="applications">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredApplications.length > 0 ? (
              filteredApplications.map((application, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="bg-muted/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{application.title}</CardTitle>
                        <CardDescription className="mt-1">{application.company}</CardDescription>
                      </div>
                      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold ${
                        application.status === "Approved" ? "bg-green-50 text-green-700 border-green-200" :
                        application.status === "Declined" ? "bg-red-50 text-red-700 border-red-200" :
                        "bg-yellow-50 text-yellow-700 border-yellow-200" 
                      }`}>
                        {application.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-sm">{application.category}</div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        <span>Submitted: {application.submittedDate}</span>
                      </div>
                    </div>
                    <Button className="w-full">View Application</Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center p-8 bg-muted/30 rounded-lg">
                <CircleAlert className="h-8 w-8 text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">No applications found</h3>
                <p className="text-muted-foreground text-center mt-1">
                  Try changing your filters or submit new sponsorship applications.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
              <CardDescription>
                Recent messages from sponsors and collaborators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[350px] pr-4">
                {messagesData.map((message, index) => (
                  <div key={index} className={`flex items-start space-x-4 mb-4 p-3 rounded-lg ${message.unread ? "bg-muted/50" : ""}`}>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      {message.from.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-medium">{message.from}</h4>
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{message.company}</p>
                      <p className="text-sm">{message.preview}</p>
                    </div>
                    {message.unread && (
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    )}
                  </div>
                ))}
              </ScrollArea>
              <Button className="w-full mt-4">
                <MessageSquareTextIcon className="mr-2 h-4 w-4" />
                View All Messages
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>
              Events and deadlines related to your sponsorships
            </CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingEventsData.map((event, index) => (
              <div 
                key={index} 
                className="flex items-start space-x-4 mb-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="min-w-fit">
                  <div className="text-center p-2 border rounded-md">
                    <CalendarIcon className="h-4 w-4 mx-auto mb-1" />
                    <p className="text-xs font-medium">{event.date}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{event.time}</p>
                  <p className="text-sm mt-1">{event.description}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2">View All Events</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>
              Commonly used resources and actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/#sponsorship-forms")}>
                <ArrowRight className="mr-2 h-4 w-4" />
                Submit New Application
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ArrowRight className="mr-2 h-4 w-4" />
                Browse Opportunities
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ArrowRight className="mr-2 h-4 w-4" />
                Update Profile
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ArrowRight className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ArrowRight className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
