
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  BarChart,
  ChevronDown,
  Filter,
  Loader2,
  Search,
  Users,
} from "lucide-react";
import { toast } from "sonner";

// Define types for our data
interface ClientRequest {
  id: number;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  project_name: string;
  category: string;
  amount: number;
  description?: string;
  benefits?: string;
  age?: number;
  gender?: string;
  language?: string;
  city?: string;
  social_platform?: string;
  followers_count?: string;
  social_link?: string;
}

interface CompanyOffer {
  id: number;
  created_at: string;
  company_name: string;
  contact_person: string;
  email: string;
  industry: string;
  budget: number;
  interests: string;
  requirements: string;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [clientRequests, setClientRequests] = useState<ClientRequest[]>([]);
  const [companyOffers, setCompanyOffers] = useState<CompanyOffer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [filteredClients, setFilteredClients] = useState<ClientRequest[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<CompanyOffer[]>([]);

  // Categories mapping for display
  const categories = {
    all: "All Categories",
    Technology: "Technology",
    "Arts & Culture": "Arts & Culture",
    Sports: "Sports",
    Education: "Education",
    Charity: "Charity",
    Other: "Other"
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch client requests
        const { data: clientData, error: clientError } = await supabase
          .from("client_requests")
          .select("*")
          .order("created_at", { ascending: false });

        if (clientError) throw clientError;
        setClientRequests(clientData || []);

        // Fetch company offers
        const { data: companyData, error: companyError } = await supabase
          .from("company_offers")
          .select("*")
          .order("created_at", { ascending: false });

        if (companyError) throw companyError;
        setCompanyOffers(companyData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and search logic
  useEffect(() => {
    // Filter clients
    const filteredClientResults = clientRequests.filter((client) => {
      const matchesSearch =
        searchTerm === "" ||
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.project_name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || client.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    setFilteredClients(filteredClientResults);

    // Filter companies
    const filteredCompanyResults = companyOffers.filter((company) => {
      const matchesSearch =
        searchTerm === "" ||
        company.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.contact_person.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesIndustry =
        selectedCategory === "all" ||
        company.industry === selectedCategory ||
        company.interests.includes(selectedCategory);

      return matchesSearch && matchesIndustry;
    });

    setFilteredCompanies(filteredCompanyResults);
  }, [searchTerm, selectedCategory, clientRequests, companyOffers]);

  // Dashboard overview statistics
  const totalClients = clientRequests.length;
  const totalCompanies = companyOffers.length;
  const totalBudget = companyOffers.reduce(
    (sum, company) => sum + (company.budget || 0),
    0
  );
  const averageRequestAmount =
    clientRequests.length > 0
      ? clientRequests.reduce((sum, client) => sum + (client.amount || 0), 0) /
        clientRequests.length
      : 0;

  // Get stats by category
  const clientsByCategory = Object.keys(categories).reduce((acc, category) => {
    if (category !== "all") {
      acc[category] = clientRequests.filter(
        (client) => client.category === category
      ).length;
    }
    return acc;
  }, {} as Record<string, number>);

  const companiesByIndustry = Object.keys(categories).reduce((acc, category) => {
    if (category !== "all") {
      acc[category] = companyOffers.filter(
        (company) => company.industry === category || company.interests.includes(category)
      ).length;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
        </TabsList>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading dashboard data...</span>
          </div>
        ) : (
          <>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Clients
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalClients}</div>
                    <p className="text-xs text-muted-foreground">
                      Seeking sponsorship
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Companies
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalCompanies}</div>
                    <p className="text-xs text-muted-foreground">
                      Offering sponsorship
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Average Request
                    </CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${averageRequestAmount.toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Per sponsorship request
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Available Budget
                    </CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${totalBudget.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      From all companies
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Clients by Category</CardTitle>
                    <CardDescription>
                      Distribution of sponsorship requests
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(clientsByCategory).map(
                        ([category, count]) => (
                          <div
                            key={category}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center">
                              <div className="text-sm">{category}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-medium">{count}</div>
                              <div className="w-20 h-2 rounded-full bg-muted overflow-hidden">
                                <div
                                  className="h-full bg-primary"
                                  style={{
                                    width: `${
                                      totalClients > 0
                                        ? (count / totalClients) * 100
                                        : 0
                                    }%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Companies by Industry</CardTitle>
                    <CardDescription>
                      Distribution of sponsorship offers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(companiesByIndustry).map(
                        ([industry, count]) => (
                          <div
                            key={industry}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center">
                              <div className="text-sm">{industry}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-medium">{count}</div>
                              <div className="w-20 h-2 rounded-full bg-muted overflow-hidden">
                                <div
                                  className="h-full bg-primary"
                                  style={{
                                    width: `${
                                      totalCompanies > 0
                                        ? (count / totalCompanies) * 100
                                        : 0
                                    }%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="clients" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input
                    placeholder="Search clients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                    type="search"
                    icon={Search}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(categories).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Client Sponsorship Requests</CardTitle>
                  <CardDescription>
                    List of all clients seeking sponsorship
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>Language</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Social Platform</TableHead>
                        <TableHead>Followers</TableHead>
                        <TableHead>Social Link</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClients.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={14}
                            className="text-center h-32"
                          >
                            No client requests found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredClients.map((client) => (
                          <TableRow key={client.id}>
                            <TableCell>{client.name}</TableCell>
                            <TableCell>{client.email}</TableCell>
                            <TableCell>{client.phone || "N/A"}</TableCell>
                            <TableCell>{client.age || "N/A"}</TableCell>
                            <TableCell>
                              {client.gender ? (
                                <Badge variant="outline">
                                  {client.gender}
                                </Badge>
                              ) : (
                                "N/A"
                              )}
                            </TableCell>
                            <TableCell>{client.language || "N/A"}</TableCell>
                            <TableCell>{client.city || "N/A"}</TableCell>
                            <TableCell>{client.project_name}</TableCell>
                            <TableCell>
                              <Badge>{client.category}</Badge>
                            </TableCell>
                            <TableCell>${client.amount}</TableCell>
                            <TableCell>
                              {client.social_platform || "N/A"}
                            </TableCell>
                            <TableCell>{client.followers_count || "N/A"}</TableCell>
                            <TableCell>
                              {client.social_link ? (
                                <a
                                  href={client.social_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 hover:underline"
                                >
                                  Link
                                </a>
                              ) : (
                                "N/A"
                              )}
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="companies" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input
                    placeholder="Search companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                    type="search"
                    icon={Search}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(categories).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Company Sponsorship Offers</CardTitle>
                  <CardDescription>
                    List of all companies offering sponsorship
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Contact Person</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Industry</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>Interests</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCompanies.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center h-32">
                            No company offers found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredCompanies.map((company) => (
                          <TableRow key={company.id}>
                            <TableCell className="font-medium">
                              {company.company_name}
                            </TableCell>
                            <TableCell>{company.contact_person}</TableCell>
                            <TableCell>{company.email}</TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {company.industry}
                              </Badge>
                            </TableCell>
                            <TableCell>${company.budget}</TableCell>
                            <TableCell>{company.interests}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};

export default Dashboard;
