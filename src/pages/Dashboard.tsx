
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "@/integrations/supabase/client";

// Define types for our form data
interface ClientRequest {
  id: string;
  name: string;
  email: string;
  project_name: string;
  category: string;
  amount: number;
  status: string;
  created_at: string;
}

interface CompanyOffer {
  id: string;
  company_name: string;
  contact_person: string;
  email: string;
  industry: string;
  budget: number;
  status: string;
  created_at: string;
}

interface StatsData {
  total_users: number;
  active_sponsors: number;
  completed_sponsorships: number;
}

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [statsData, setStatsData] = useState<StatsData>({
    total_users: 0,
    active_sponsors: 0,
    completed_sponsorships: 0
  });
  const [clientRequests, setClientRequests] = useState<ClientRequest[]>([]);
  const [companyOffers, setCompanyOffers] = useState<CompanyOffer[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Filter for search and filters
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch dashboard statistics
      const { data: statsData, error: statsError } = await supabase
        .from('dashboard_stats')
        .select('*')
        .single();

      if (statsError) {
        console.error('Error fetching stats:', statsError);
      } else {
        setStatsData(statsData as StatsData);
      }

      // Fetch client requests
      const { data: clientData, error: clientError } = await supabase
        .from('client_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (clientError) {
        console.error('Error fetching client requests:', clientError);
      } else {
        setClientRequests(clientData as ClientRequest[]);
      }

      // Fetch company offers
      const { data: companyData, error: companyError } = await supabase
        .from('company_offers')
        .select('*')
        .order('created_at', { ascending: false });

      if (companyError) {
        console.error('Error fetching company offers:', companyError);
      } else {
        setCompanyOffers(companyData as CompanyOffer[]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string, isClientRequest: boolean) => {
    try {
      const tableName = isClientRequest ? 'client_requests' : 'company_offers';
      const { error } = await supabase
        .from(tableName)
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Status updated",
        description: "The request status has been updated successfully.",
      });

      // Update local state to reflect changes
      if (isClientRequest) {
        setClientRequests(prev => 
          prev.map(item => item.id === id ? { ...item, status: newStatus } : item)
        );
        
        // If status changed to completed, increment counter
        if (newStatus === 'completed') {
          setStatsData(prev => ({
            ...prev,
            completed_sponsorships: (prev.completed_sponsorships || 0) + 1
          }));
          
          // Update stats in database
          await supabase
            .from('dashboard_stats')
            .update({ completed_sponsorships: (statsData.completed_sponsorships || 0) + 1 })
            .eq('total_users', statsData.total_users); // Using unique field to identify the row
        }
      } else {
        setCompanyOffers(prev => 
          prev.map(item => item.id === id ? { ...item, status: newStatus } : item)
        );
        
        // If status changed to completed for company offer
        if (newStatus === 'completed') {
          setStatsData(prev => ({
            ...prev,
            completed_sponsorships: (prev.completed_sponsorships || 0) + 1
          }));
          
          // Update stats in database
          await supabase
            .from('dashboard_stats')
            .update({ completed_sponsorships: (statsData.completed_sponsorships || 0) + 1 })
            .eq('total_users', statsData.total_users); // Using unique field to identify the row
        }
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Update failed",
        description: "Failed to update the request status.",
        variant: "destructive",
      });
    }
  };

  // Filter client requests based on search term, status and category
  const filteredClientRequests = clientRequests.filter(request => {
    const matchesSearch = searchTerm === "" || 
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.project_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || request.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Filter company offers based on search term and status
  const filteredCompanyOffers = companyOffers.filter(offer => {
    const matchesSearch = searchTerm === "" || 
      offer.company_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      offer.contact_person.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || offer.status === statusFilter;
    const matchesIndustry = categoryFilter === "all" || offer.industry === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesIndustry;
  });

  // Combined filtered items for pagination
  const filteredItems = [...filteredClientRequests, ...filteredCompanyOffers];

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total for statistics
  const totalRequests = clientRequests.length + companyOffers.length;
  const pendingRequests = [...clientRequests, ...companyOffers].filter(item => item.status === 'pending').length;
  const completedRequests = [...clientRequests, ...companyOffers].filter(item => item.status === 'completed').length;

  // Find the max amount value for client requests
  const maxAmount = Math.max(
    ...clientRequests.map(request => request.amount),
    ...companyOffers.map(offer => offer.budget)
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center space-x-2 text-xl font-bold">
              <span>Sponofy Admin</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => navigate("/")}>
              Back to Site
            </Button>
            {user && (
              <div className="ml-4 flex items-center gap-2">
                <div className="text-sm">
                  <span className="font-semibold">{user.fullName || user.username}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 md:px-6 py-6">
          <div className="flex flex-col gap-8">
            {/* Admin Dashboard Title */}
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage all sponsorship requests and offers</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Total Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{totalRequests}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Client Requests: {clientRequests.length}, Company Offers: {companyOffers.length}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Pending Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{pendingRequests}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Awaiting approval or rejection
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Completed Sponsorships</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{statsData?.completed_sponsorships || completedRequests}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Successfully matched and fulfilled
                  </p>
                </CardContent>
              </Card>
            </div>

            <Separator />

            {/* Filter Controls */}
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="search">Search</Label>
                <Input
                  id="search"
                  placeholder="Search by name, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status" className="mt-1">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Category / Industry</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger id="category" className="mt-1">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Arts & Culture">Arts & Culture</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Charity">Charity</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submissions Table */}
            <Card>
              <CardHeader>
                <CardTitle>Submissions</CardTitle>
                <CardDescription>
                  {filteredItems.length} {filteredItems.length === 1 ? 'entry' : 'entries'} found
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : currentItems.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">#</TableHead>
                          <TableHead>Name / Company</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Project / Contact</TableHead>
                          <TableHead>Category / Industry</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentItems.map((item, index) => {
                          // Determine if the item is a client request or company offer
                          const isClientRequest = 'project_name' in item;
                          const clientItem = isClientRequest ? item as ClientRequest : null;
                          const companyItem = !isClientRequest ? item as CompanyOffer : null;

                          return (
                            <TableRow key={item.id}>
                              <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                              <TableCell className="font-medium">
                                {isClientRequest ? clientItem?.name : companyItem?.company_name}
                              </TableCell>
                              <TableCell>{item.email}</TableCell>
                              <TableCell>
                                {isClientRequest ? clientItem?.project_name : companyItem?.contact_person}
                              </TableCell>
                              <TableCell>
                                {isClientRequest ? clientItem?.category : companyItem?.industry}
                              </TableCell>
                              <TableCell>
                                ${isClientRequest ? clientItem?.amount.toLocaleString() : companyItem?.budget.toLocaleString()}
                              </TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                                  item.status === 'approved' ? 'bg-green-100 text-green-800' :
                                  item.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                                  item.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {item.status || 'pending'}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <Select 
                                  defaultValue={item.status || 'pending'}
                                  onValueChange={(value) => handleStatusChange(
                                    item.id, 
                                    value, 
                                    isClientRequest
                                  )}
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue placeholder="Set status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="approved">Approve</SelectItem>
                                    <SelectItem value="rejected">Reject</SelectItem>
                                    <SelectItem value="completed">Complete</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    No entries match your filters.
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-6">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => paginate(Math.max(1, currentPage - 1))}
                            className="cursor-pointer"
                            aria-disabled={currentPage === 1}
                          />
                        </PaginationItem>
                        
                        {[...Array(totalPages)].map((_, i) => (
                          <PaginationItem key={i}>
                            <button
                              className={`h-9 w-9 rounded-md text-sm ${
                                currentPage === i + 1 
                                ? "bg-primary text-primary-foreground" 
                                : "text-foreground hover:bg-muted hover:text-foreground"
                              }`}
                              onClick={() => paginate(i + 1)}
                            >
                              {i + 1}
                            </button>
                          </PaginationItem>
                        ))}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                            className="cursor-pointer"
                            aria-disabled={currentPage === totalPages}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
