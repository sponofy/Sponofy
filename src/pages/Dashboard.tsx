
import { useState, useEffect, useRef } from "react";
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
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  BarChart as BarChartIcon,
  ChevronDown,
  Filter,
  Loader2,
  LogOut,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { format, subMonths } from "date-fns";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Define types for our data
interface ClientRequest {
  id: string | number;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
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
  updated_at?: string;
  status: string;
}

interface CompanyOffer {
  id: string | number;
  created_at: string;
  company_name: string;
  contact_person: string;
  email: string;
  industry: string;
  budget: number;
  interests: string;
  requirements: string;
  phone?: string;
  additional_info?: string;
  status: string;
  updated_at?: string;
}

// Time period options
const timePeriods = {
  all: "All Time",
  today: "Today",
  week: "This Week",
  month: "This Month",
  year: "This Year",
};

// Status options
const statusOptions = ["pending", "completed", "approved", "rejected"];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [clientRequests, setClientRequests] = useState<ClientRequest[]>([]);
  const [companyOffers, setCompanyOffers] = useState<CompanyOffer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<string>("all");
  const [filteredClients, setFilteredClients] = useState<ClientRequest[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<CompanyOffer[]>([]);
  const [clientPage, setClientPage] = useState(1);
  const [companyPage, setCompanyPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

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

  // Monthly data for charts
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);

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

  // Prepare monthly chart data
  useEffect(() => {
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = subMonths(new Date(), i);
      return {
        month: format(date, 'MMM'),
        monthYear: format(date, 'yyyy-MM'),
        clients: 0,
        companies: 0,
      };
    }).reverse();

    // Count client requests per month
    clientRequests.forEach(client => {
      const monthYear = format(new Date(client.created_at), 'yyyy-MM');
      const monthIndex = last6Months.findIndex(m => m.monthYear === monthYear);
      if (monthIndex >= 0) {
        last6Months[monthIndex].clients += 1;
      }
    });

    // Count company offers per month
    companyOffers.forEach(company => {
      const monthYear = format(new Date(company.created_at), 'yyyy-MM');
      const monthIndex = last6Months.findIndex(m => m.monthYear === monthYear);
      if (monthIndex >= 0) {
        last6Months[monthIndex].companies += 1;
      }
    });

    setMonthlyData(last6Months.map(item => ({
      name: item.month,
      clients: item.clients,
      companies: item.companies,
    })));

    // Prepare category data for pie chart
    const categoryCounts: Record<string, number> = {};
    
    clientRequests.forEach(client => {
      if (client.category) {
        categoryCounts[client.category] = (categoryCounts[client.category] || 0) + 1;
      }
    });
    
    setCategoryData(Object.keys(categoryCounts).map(category => ({
      name: category,
      value: categoryCounts[category],
    })));
    
  }, [clientRequests, companyOffers]);

  // Filter and search logic
  useEffect(() => {
    // Helper function to filter by time period
    const isInTimePeriod = (dateStr: string) => {
      if (selectedTimePeriod === "all") return true;
      
      const date = new Date(dateStr);
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      switch (selectedTimePeriod) {
        case "today":
          return date >= today;
        case "week": {
          const weekStart = new Date(now);
          weekStart.setDate(now.getDate() - now.getDay());
          return date >= weekStart;
        }
        case "month": {
          const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
          return date >= monthStart;
        }
        case "year": {
          const yearStart = new Date(now.getFullYear(), 0, 1);
          return date >= yearStart;
        }
        default:
          return true;
      }
    };

    // Filter clients
    const filteredClientResults = clientRequests.filter((client) => {
      const matchesSearch =
        searchTerm === "" ||
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.project_name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || client.category === selectedCategory;
        
      const matchesTimePeriod = isInTimePeriod(client.created_at);

      return matchesSearch && matchesCategory && matchesTimePeriod;
    });

    setFilteredClients(filteredClientResults);
    setClientPage(1);  // Reset to first page when filtering

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
        
      const matchesTimePeriod = isInTimePeriod(company.created_at);

      return matchesSearch && matchesIndustry && matchesTimePeriod;
    });

    setFilteredCompanies(filteredCompanyResults);
    setCompanyPage(1);  // Reset to first page when filtering
  }, [searchTerm, selectedCategory, selectedTimePeriod, clientRequests, companyOffers]);

  // Dashboard overview statistics
  const totalClients = clientRequests.length;
  const totalCompanies = companyOffers.length;
  const completedRequests = clientRequests.filter(client => client.status === "completed").length;
  const pendingRequests = clientRequests.filter(client => client.status === "pending").length;

  // Handle status update
  const updateStatus = async (table: string, id: string | number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from(table)
        .update({ status: newStatus })
        .eq("id", id);
        
      if (error) throw error;
      
      toast.success(`Status updated to ${newStatus}`);
      
      // Update local state
      if (table === "client_requests") {
        setClientRequests(prev => 
          prev.map(client => 
            client.id === id ? { ...client, status: newStatus } : client
          )
        );
      } else if (table === "company_offers") {
        setCompanyOffers(prev => 
          prev.map(company => 
            company.id === id ? { ...company, status: newStatus } : company
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  // Handle delete
  const handleDelete = async (table: string, id: string | number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq("id", id);
        
      if (error) throw error;
      
      toast.success("Item deleted successfully");
      
      // Update local state
      if (table === "client_requests") {
        setClientRequests(prev => prev.filter(client => client.id !== id));
      } else if (table === "company_offers") {
        setCompanyOffers(prev => prev.filter(company => company.id !== id));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete item");
    }
  };

  // Calculate pagination
  const clientPageCount = Math.ceil(filteredClients.length / itemsPerPage);
  const companyPageCount = Math.ceil(filteredCompanies.length / itemsPerPage);
  
  const paginatedClients = filteredClients.slice(
    (clientPage - 1) * itemsPerPage,
    clientPage * itemsPerPage
  );
  
  const paginatedCompanies = filteredCompanies.slice(
    (companyPage - 1) * itemsPerPage,
    companyPage * itemsPerPage
  );

  // Handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
    toast.success("Logged out successfully");
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "secondary";
      case "approved":
        return "default";
      case "rejected":
        return "destructive";
      case "pending":
      default:
        return "outline";
    }
  };

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

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
                      Completed Requests
                    </CardTitle>
                    <BarChartIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {completedRequests}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Successfully matched
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Pending Requests
                    </CardTitle>
                    <BarChartIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {pendingRequests}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Awaiting processing
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Requests Last 6 Months</CardTitle>
                    <CardDescription>
                      Monthly client and company activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={monthlyData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="clients" fill="#8884d8" name="Clients" />
                        <Bar dataKey="companies" fill="#82ca9d" name="Companies" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Category Distribution</CardTitle>
                    <CardDescription>
                      Requests by category
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="clients" className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex w-full md:w-auto items-center space-x-2">
                  <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search clients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-8"
                      type="search"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
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
                  
                  <Select
                    value={selectedTimePeriod}
                    onValueChange={setSelectedTimePeriod}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Time Period" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(timePeriods).map(([value, label]) => (
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
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Project</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedClients.length === 0 ? (
                          <TableRow>
                            <TableCell
                              colSpan={7}
                              className="text-center h-32"
                            >
                              No client requests found
                            </TableCell>
                          </TableRow>
                        ) : (
                          paginatedClients.map((client) => (
                            <TableRow key={client.id}>
                              <TableCell>{client.name}</TableCell>
                              <TableCell>{client.email}</TableCell>
                              <TableCell>{client.project_name}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{client.category}</Badge>
                              </TableCell>
                              <TableCell>${client.amount}</TableCell>
                              <TableCell>
                                <Badge variant={getStatusBadgeVariant(client.status || "pending")}>
                                  {client.status || "pending"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="outline" size="sm" className="h-8 gap-1">
                                        Status <ChevronDown className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      {statusOptions.map((status) => (
                                        <DropdownMenuItem
                                          key={status}
                                          onClick={() => updateStatus("client_requests", client.id, status)}
                                        >
                                          {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </DropdownMenuItem>
                                      ))}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => handleDelete("client_requests", client.id)}
                                  >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {clientPageCount > 1 && (
                    <Pagination className="mt-4">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setClientPage(p => Math.max(1, p - 1))}
                            className={clientPage <= 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                        
                        {Array.from({ length: clientPageCount }, (_, i) => i + 1).map(page => (
                          <PaginationItem key={page}>
                            <PaginationLink 
                              isActive={page === clientPage} 
                              onClick={() => setClientPage(page)}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => setClientPage(p => Math.min(clientPageCount, p + 1))}
                            className={clientPage >= clientPageCount ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="companies" className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex w-full md:w-auto items-center space-x-2">
                  <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search companies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-8"
                      type="search"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
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
                  
                  <Select
                    value={selectedTimePeriod}
                    onValueChange={setSelectedTimePeriod}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Time Period" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(timePeriods).map(([value, label]) => (
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
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Company</TableHead>
                          <TableHead>Contact Person</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Industry</TableHead>
                          <TableHead>Budget</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedCompanies.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center h-32">
                              No company offers found
                            </TableCell>
                          </TableRow>
                        ) : (
                          paginatedCompanies.map((company) => (
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
                              <TableCell>
                                <Badge variant={getStatusBadgeVariant(company.status || "pending")}>
                                  {company.status || "pending"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="outline" size="sm" className="h-8 gap-1">
                                        Status <ChevronDown className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      {statusOptions.map((status) => (
                                        <DropdownMenuItem
                                          key={status}
                                          onClick={() => updateStatus("company_offers", company.id, status)}
                                        >
                                          {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </DropdownMenuItem>
                                      ))}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => handleDelete("company_offers", company.id)}
                                  >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {companyPageCount > 1 && (
                    <Pagination className="mt-4">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setCompanyPage(p => Math.max(1, p - 1))}
                            className={companyPage <= 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                        
                        {Array.from({ length: companyPageCount }, (_, i) => i + 1).map(page => (
                          <PaginationItem key={page}>
                            <PaginationLink 
                              isActive={page === companyPage} 
                              onClick={() => setCompanyPage(page)}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => setCompanyPage(p => Math.min(companyPageCount, p + 1))}
                            className={companyPage >= companyPageCount ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
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
