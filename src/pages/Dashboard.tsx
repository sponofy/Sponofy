import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { 
  Users, 
  TrendingUp, 
  PieChart as PieChartIcon,
  LogOut,
  User,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  CalendarDays,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useClerk } from '@clerk/clerk-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { subDays, isAfter, startOfDay } from 'date-fns';

type ClientRequest = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  project_name: string;
  category: string;
  amount: number;
  description: string;
  benefits: string;
  status: string;
  created_at: string;
};

type CompanyOffer = {
  id: string;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string | null;
  industry: string;
  budget: number;
  interests: string;
  requirements: string;
  additional_info: string | null;
  status: string;
  created_at: string;
};

type DashboardStats = {
  total_users: number;
  active_sponsors: number;
  completed_sponsorships: number;
};

const ViewDetailsDialog = ({ 
  isOpen, 
  onClose, 
  data, 
  type 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  data: ClientRequest | CompanyOffer | null;
  type: 'client' | 'company';
}) => {
  if (!data) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="mb-2">
            {type === 'client' 
              ? `Project: ${(data as ClientRequest).project_name}`
              : `Company: ${(data as CompanyOffer).company_name}`
            }
          </DialogTitle>
          <DialogDescription>
            <Badge className="mb-4" variant={data.status === 'completed' ? 'default' : data.status === 'pending' ? 'outline' : 'destructive'}>
              {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
            </Badge>
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {type === 'client' ? (
            <>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><span className="font-medium">Name:</span> {(data as ClientRequest).name}</p>
                    <p><span className="font-medium">Email:</span> {(data as ClientRequest).email}</p>
                    <p><span className="font-medium">Phone:</span> {(data as ClientRequest).phone || 'Not provided'}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Project Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><span className="font-medium">Category:</span> {(data as ClientRequest).category}</p>
                    <p><span className="font-medium">Amount Needed:</span> ${(data as ClientRequest).amount.toLocaleString()}</p>
                    <p><span className="font-medium">Submitted:</span> {new Date((data as ClientRequest).created_at).toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Project Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{(data as ClientRequest).description}</p>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Sponsorship Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{(data as ClientRequest).benefits}</p>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Company Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><span className="font-medium">Contact Person:</span> {(data as CompanyOffer).contact_person}</p>
                    <p><span className="font-medium">Email:</span> {(data as CompanyOffer).email}</p>
                    <p><span className="font-medium">Phone:</span> {(data as CompanyOffer).phone || 'Not provided'}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Sponsorship Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><span className="font-medium">Industry:</span> {(data as CompanyOffer).industry}</p>
                    <p><span className="font-medium">Budget:</span> ${(data as CompanyOffer).budget.toLocaleString()}</p>
                    <p><span className="font-medium">Interests:</span> {(data as CompanyOffer).interests}</p>
                    <p><span className="font-medium">Submitted:</span> {new Date((data as CompanyOffer).created_at).toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{(data as CompanyOffer).requirements}</p>
                </CardContent>
              </Card>

              {(data as CompanyOffer).additional_info && (
                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Additional Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{(data as CompanyOffer).additional_info}</p>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { client: clerkClient } = useClerk();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ClientRequest | CompanyOffer | null>(null);
  const [detailsType, setDetailsType] = useState<'client' | 'company'>('client');
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const [clientForms, setClientForms] = useState<ClientRequest[]>([]);
  const [companyForms, setCompanyForms] = useState<CompanyOffer[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    total_users: 0,
    active_sponsors: 0,
    completed_sponsorships: 0
  });
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [costRange, setCostRange] = useState<[number]>([10000]);
  
  const [filteredClientForms, setFilteredClientForms] = useState<ClientRequest[]>([]);
  const [filteredCompanyForms, setFilteredCompanyForms] = useState<CompanyOffer[]>([]);

  const [performanceData, setPerformanceData] = useState([
    { name: 'Jan', value: 0 },
    { name: 'Feb', value: 0 },
    { name: 'Mar', value: 0 },
    { name: 'Apr', value: 0 },
    { name: 'May', value: 0 },
    { name: 'Jun', value: 0 },
  ]);

  const [pieData, setPieData] = useState([
    { name: 'Tech', value: 0 },
    { name: 'Sports', value: 0 },
    { name: 'Education', value: 0 },
    { name: 'Arts', value: 0 },
    { name: 'Other', value: 0 },
  ]);

  const COLORS = ['#8b5cf6', '#6366f1', '#3b82f6', '#0ea5e9', '#14b8a6'];

  useEffect(() => {
    const adminAuth = sessionStorage.getItem('adminAuth');
    if (adminAuth !== 'true') {
      toast({
        title: "Unauthorized access",
        description: "Please login to access the dashboard",
        variant: "destructive",
      });
      navigate('/admin');
    } else {
      setIsAuthenticated(true);
      fetchData();
      fetchClerkUserCount();
      setupRealtimeSubscription();
    }
  }, [navigate, toast]);

  const fetchClerkUserCount = async () => {
    try {
      const userCount = await clerkClient.users.getCount();
      setStats(prevStats => ({
        ...prevStats,
        total_users: userCount.total
      }));
    } catch (error) {
      console.error('Error fetching Clerk user count:', error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: clientData, error: clientError } = await supabase
        .from('client_requests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (clientError) throw clientError;
      setClientForms(clientData || []);
      
      const { data: companyData, error: companyError } = await supabase
        .from('company_offers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (companyError) throw companyError;
      setCompanyForms(companyData || []);
      
      const { data: statsData, error: statsError } = await supabase
        .from('dashboard_stats')
        .select('*')
        .single();
      
      if (statsError && statsError.code !== 'PGRST116') {
        throw statsError;
      }
      
      if (statsData) {
        setStats(prevStats => ({
          ...prevStats,
          active_sponsors: statsData.active_sponsors,
          completed_sponsorships: statsData.completed_sponsorships
        }));
      }
      
      updateChartData(clientData || []);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Data loading error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const clientChannel = supabase
      .channel('clients-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'client_requests'
      }, () => {
        fetchData();
      })
      .subscribe();
      
    const companyChannel = supabase
      .channel('companies-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'company_offers'
      }, () => {
        fetchData();
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(clientChannel);
      supabase.removeChannel(companyChannel);
    };
  };

  const updateChartData = (clientData: ClientRequest[]) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    
    const monthlyCounts = Array(12).fill(0);
    clientData.forEach(request => {
      const date = new Date(request.created_at);
      if (date.getFullYear() === currentYear) {
        monthlyCounts[date.getMonth()]++;
      }
    });
    
    const performanceData = monthNames.map((name, index) => ({
      name,
      value: monthlyCounts[index]
    })).slice(0, 6);
    
    setPerformanceData(performanceData);
    
    const categoryMap: Record<string, number> = {
      'Technology': 0,
      'Sports': 0,
      'Education': 0,
      'Arts & Culture': 0,
      'Other': 0
    };
    
    clientData.forEach(request => {
      const category = request.category;
      if (category === 'Technology') {
        categoryMap['Technology']++;
      } else if (category === 'Sports') {
        categoryMap['Sports']++;
      } else if (category === 'Education') {
        categoryMap['Education']++;
      } else if (category === 'Arts & Culture') {
        categoryMap['Arts']++;
      } else {
        categoryMap['Other']++;
      }
    });
    
    const pieData = [
      { name: 'Tech', value: categoryMap['Technology'] || 0 },
      { name: 'Sports', value: categoryMap['Sports'] || 0 },
      { name: 'Education', value: categoryMap['Education'] || 0 },
      { name: 'Arts', value: categoryMap['Arts'] || 0 },
      { name: 'Other', value: categoryMap['Other'] || 0 }
    ];
    
    setPieData(pieData);
  };

  useEffect(() => {
    let filtered = [...clientForms];
    
    if (dateFilter !== 'all') {
      const today = startOfDay(new Date());
      let cutoffDate: Date;
      
      switch (dateFilter) {
        case 'today':
          cutoffDate = today;
          break;
        case 'week':
          cutoffDate = subDays(today, 7);
          break;
        case 'month':
          cutoffDate = subDays(today, 30);
          break;
        case 'year':
          cutoffDate = subDays(today, 365);
          break;
        default:
          cutoffDate = new Date(0); // All time
      }
      
      filtered = filtered.filter(form => 
        isAfter(new Date(form.created_at), cutoffDate)
      );
    }
    
    filtered = filtered.filter(form => form.amount <= costRange[0]);
    
    if (categoryFilter) {
      filtered = filtered.filter(form => form.category === categoryFilter);
    }
    
    setFilteredClientForms(filtered);
  }, [clientForms, dateFilter, costRange, categoryFilter]);
  
  useEffect(() => {
    let filtered = [...companyForms];
    
    if (dateFilter !== 'all') {
      const today = startOfDay(new Date());
      let cutoffDate: Date;
      
      switch (dateFilter) {
        case 'today':
          cutoffDate = today;
          break;
        case 'week':
          cutoffDate = subDays(today, 7);
          break;
        case 'month':
          cutoffDate = subDays(today, 30);
          break;
        case 'year':
          cutoffDate = subDays(today, 365);
          break;
        default:
          cutoffDate = new Date(0); // All time
      }
      
      filtered = filtered.filter(form => 
        isAfter(new Date(form.created_at), cutoffDate)
      );
    }
    
    filtered = filtered.filter(form => form.budget <= costRange[0]);
    
    if (categoryFilter) {
      filtered = filtered.filter(form => form.industry === categoryFilter);
    }
    
    setFilteredCompanyForms(filtered);
  }, [companyForms, dateFilter, costRange, categoryFilter]);

  const handleViewDetails = (item: ClientRequest | CompanyOffer, type: 'client' | 'company') => {
    setSelectedItem(item);
    setDetailsType(type);
    setIsDetailsOpen(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/admin');
  };

  const handleStatusChange = async (item: ClientRequest | CompanyOffer, type: 'client' | 'company', completed: boolean) => {
    const newStatus = completed ? 'completed' : 'pending';
    const tableName = type === 'client' ? 'client_requests' : 'company_offers';
    
    try {
      const { error } = await supabase
        .from(tableName)
        .update({ status: newStatus })
        .eq('id', item.id);
      
      if (error) throw error;
      
      if (type === 'client') {
        setClientForms(prev => 
          prev.map(form => form.id === item.id ? { ...form, status: newStatus } : form)
        );
      } else {
        setCompanyForms(prev => 
          prev.map(form => form.id === item.id ? { ...form, status: newStatus } : form)
        );
      }
      
      if (completed) {
        const { data: currentStats } = await supabase
          .from('dashboard_stats')
          .select('completed_sponsorships')
          .single();
          
        const newCount = (currentStats?.completed_sponsorships || 0) + 1;
        
        await supabase
          .from('dashboard_stats')
          .update({ completed_sponsorships: newCount })
          .eq('total_users', stats.total_users);
          
        setStats(prev => ({
          ...prev,
          completed_sponsorships: newCount
        }));
      } else {
        if (item.status === 'completed') {
          const { data: currentStats } = await supabase
            .from('dashboard_stats')
            .select('completed_sponsorships')
            .single();
            
          const newCount = Math.max((currentStats?.completed_sponsorships || 0) - 1, 0);
          
          await supabase
            .from('dashboard_stats')
            .update({ completed_sponsorships: newCount })
            .eq('total_users', stats.total_users);
            
          setStats(prev => ({
            ...prev,
            completed_sponsorships: newCount
          }));
        }
      }
      
      toast({
        title: `Status ${completed ? 'completed' : 'marked as pending'}`,
        description: `The ${type} has been updated successfully.`,
      });
      
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Update failed",
        description: "Failed to update the status",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  const uniqueClientCategories = Array.from(new Set(clientForms.map(form => form.category)));
  const uniqueCompanyIndustries = Array.from(new Set(companyForms.map(form => form.industry)));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-card shadow-sm border-b border-border">
        <div className="container px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-primary">Sponofy Admin</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <span className="font-medium">Admin</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-left">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-left">{stats.total_users}</div>
                    <p className="text-xs text-muted-foreground text-left">From Clerk authentication</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-left">Active Sponsors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-left">{stats.active_sponsors}</div>
                    <p className="text-xs text-muted-foreground text-left">Companies offering sponsorship</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-left">Completed Sponsorships</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <PieChartIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-left">{stats.completed_sponsorships}</div>
                    <p className="text-xs text-muted-foreground text-left">Successfully matched sponsorships</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-left">Performance Overview</CardTitle>
              <CardDescription className="text-left">Monthly sponsorship requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={performanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-left">Sponsorship Categories</CardTitle>
              <CardDescription className="text-left">Distribution by industry</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-left">Form Submissions</CardTitle>
              <CardDescription className="text-left">View and manage sponsorship requests and offers</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="clients">
                <TabsList className="mb-6">
                  <TabsTrigger value="clients">Client Requests</TabsTrigger>
                  <TabsTrigger value="companies">Company Offers</TabsTrigger>
                </TabsList>
                
                <TabsContent value="clients">
                  {loading ? (
                    <div className="text-center py-8">Loading...</div>
                  ) : clientForms.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No client requests found</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="w-full flex flex-wrap gap-4 p-4 bg-muted/30 rounded-lg">
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Category</p>
                            <Select 
                              value={categoryFilter || 'all'} 
                              onValueChange={(value) => setCategoryFilter(value === 'all' ? null : value)}
                            >
                              <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="All Categories" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                {uniqueClientCategories.map(category => (
                                  <SelectItem key={category} value={category}>{category}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Date Range</p>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-[200px] justify-start flex">
                                  <CalendarDays className="mr-2 h-4 w-4" />
                                  {dateFilter === 'all' && 'All Time'}
                                  {dateFilter === 'today' && 'Today'}
                                  {dateFilter === 'week' && 'This Week'}
                                  {dateFilter === 'month' && 'This Month'}
                                  {dateFilter === 'year' && 'This Year'}
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-[200px]">
                                <DropdownMenuItem onClick={() => setDateFilter('all')}>
                                  All Time
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setDateFilter('today')}>
                                  Today
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setDateFilter('week')}>
                                  This Week
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setDateFilter('month')}>
                                  This Month
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setDateFilter('year')}>
                                  This Year
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          
                          <div className="space-y-2 w-full md:w-auto flex-1 min-w-[300px]">
                            <div className="flex justify-between">
                              <p className="text-sm font-medium">Budget Amount</p>
                              <p className="text-sm font-medium">${costRange[0].toLocaleString()}</p>
                            </div>
                            <div className="pt-4 pb-2">
                              <Slider
                                defaultValue={[10000]}
                                max={10000}
                                step={500}
                                value={costRange}
                                onValueChange={(value: [number]) => setCostRange(value)}
                              />
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>$0</span>
                              <span>$10,000</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Project</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Actions</TableHead>
                            <TableHead className="text-center">Completed</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredClientForms.map((form) => (
                            <TableRow key={form.id} className="hover:bg-muted/50">
                              <TableCell className="font-medium">{form.name}</TableCell>
                              <TableCell>
                                <div className="max-w-[180px] truncate">
                                  <div>{form.email}</div>
                                  {form.phone && <div className="text-sm text-muted-foreground">{form.phone}</div>}
                                </div>
                              </TableCell>
                              <TableCell className="max-w-[150px] truncate">{form.project_name}</TableCell>
                              <TableCell>{form.category}</TableCell>
                              <TableCell>${form.amount.toLocaleString()}</TableCell>
                              <TableCell>
                                <Badge variant={form.status === 'completed' ? 'default' : form.status === 'pending' ? 'outline' : 'destructive'}>
                                  {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>{new Date(form.created_at).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleViewDetails(form, 'client')}
                                  className="h-8 w-8 p-0"
                                >
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">View details</span>
                                </Button>
                              </TableCell>
                              <TableCell className="text-center">
                                <Checkbox 
                                  id={`complete-client-${form.id}`}
                                  checked={form.status === 'completed'}
                                  onCheckedChange={(checked) => {
                                    handleStatusChange(form, 'client', checked === true);
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="companies">
                  {loading ? (
                    <div className="text-center py-8">Loading...</div>
                  ) : companyForms.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No company offers found</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="w-full flex flex-wrap gap-4 p-4 bg-muted/30 rounded-lg">
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Industry</p>
                            <Select 
                              value={categoryFilter || 'all'} 
                              onValueChange={(value) => setCategoryFilter(value === 'all' ? null : value)}
                            >
                              <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="All Industries" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Industries</SelectItem>
                                {uniqueCompanyIndustries.map(industry => (
                                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Date Range</p>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-[200px] justify-start flex">
                                  <CalendarDays className="mr-2 h-4 w-4" />
                                  {dateFilter === 'all' && 'All Time'}
                                  {dateFilter === 'today' && 'Today'}
                                  {dateFilter === 'week' && 'This Week'}
                                  {dateFilter === 'month' && 'This Month'}
                                  {dateFilter === 'year' && 'This Year'}
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-[200px]">
                                <DropdownMenuItem onClick={() => setDateFilter('all')}>
                                  All Time
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setDateFilter('today')}>
                                  Today
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setDateFilter('week')}>
                                  This Week
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setDateFilter('month')}>
                                  This Month
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setDateFilter('year')}>
                                  This Year
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          
                          <div className="space-y-2 w-full md:w-auto flex-1 min-w-[300px]">
                            <div className="flex justify-between">
                              <p className="text-sm font-medium">Budget Amount</p>
                              <p className="text-sm font-medium">${costRange[0].toLocaleString()}</p>
                            </div>
                            <div className="pt-4 pb-2">
                              <Slider
                                defaultValue={[10000]}
                                max={10000}
                                step={500}
                                value={costRange}
                                onValueChange={(value: [number]) => setCostRange(value)}
                              />
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>$0</span>
                              <span>$10,000</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Company</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Industry</TableHead>
                            <TableHead>Budget</TableHead>
                            <TableHead>Interests</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Actions</TableHead>
                            <TableHead className="text-center">Completed</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredCompanyForms.map((form) => (
                            <TableRow key={form.id} className="hover:bg-muted/50">
                              <TableCell className="font-medium">{form.company_name}</TableCell>
                              <TableCell>
                                <div className="max-w-[180px] truncate">
                                  <div>{form.contact_person}</div>
                                  <div className="text-sm text-muted-foreground">{form.email}</div>
                                  {form.phone && <div className="text-sm text-muted-foreground">{form.phone}</div>}
                                </div>
                              </TableCell>
                              <TableCell>{form.industry}</TableCell>
                              <TableCell>${form.budget.toLocaleString()}</TableCell>
                              <TableCell className="max-w-[150px] truncate">{form.interests}</TableCell>
                              <TableCell>
                                <Badge variant={form.status === 'completed' ? 'default' : form.status === 'pending' ? 'outline' : 'destructive'}>
                                  {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>{new Date(form.created_at).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleViewDetails(form, 'company')}
                                  className="h-8 w-8 p-0"
                                >
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">View details</span>
                                </Button>
                              </TableCell>
                              <TableCell className="text-center">
                                <Checkbox 
                                  id={`complete-company-${form.id}`}
                                  checked={form.status === 'completed'}
                                  onCheckedChange={(checked) => {
                                    handleStatusChange(form, 'company', checked === true);
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <ViewDetailsDialog 
        isOpen={isDetailsOpen} 
        onClose={() => setIsDetailsOpen(false)} 
        data={selectedItem} 
        type={detailsType}
      />
    </div>
  );
};

export default Dashboard;
