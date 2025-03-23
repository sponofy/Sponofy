
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
import { 
  Users, 
  TrendingUp, 
  PieChart as PieChartIcon,
  LogOut,
  User,
} from 'lucide-react';

// Mock data
const performanceData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

const pieData = [
  { name: 'Tech', value: 35 },
  { name: 'Sports', value: 25 },
  { name: 'Education', value: 20 },
  { name: 'Arts', value: 15 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#8b5cf6', '#6366f1', '#3b82f6', '#0ea5e9', '#14b8a6'];

// Sample data for client and company forms
const mockClientForms = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    projectName: 'Tech Conference 2023',
    category: 'Technology',
    amount: 5000,
    submittedAt: '2023-09-15T10:30:00Z',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    projectName: 'Art Exhibition',
    category: 'Arts & Culture',
    amount: 3000,
    submittedAt: '2023-09-10T14:20:00Z',
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael@example.com',
    projectName: 'Sports Tournament',
    category: 'Sports',
    amount: 7500,
    submittedAt: '2023-09-05T09:15:00Z',
  },
];

const mockCompanyForms = [
  {
    id: 1,
    companyName: 'Acme Corporation',
    contactPerson: 'Jane Smith',
    email: 'jane@acmecorp.com',
    industry: 'Technology',
    budget: 10000,
    submittedAt: '2023-09-14T11:45:00Z',
  },
  {
    id: 2,
    companyName: 'Global Finance',
    contactPerson: 'Robert Wilson',
    email: 'robert@globalfinance.com',
    industry: 'Finance',
    budget: 15000,
    submittedAt: '2023-09-12T16:30:00Z',
  },
  {
    id: 3,
    companyName: 'HealthPlus',
    contactPerson: 'Emily Rodriguez',
    email: 'emily@healthplus.com',
    industry: 'Healthcare',
    budget: 8000,
    submittedAt: '2023-09-08T13:20:00Z',
  },
];

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [clientForms, setClientForms] = useState(mockClientForms);
  const [companyForms, setCompanyForms] = useState(mockCompanyForms);

  useEffect(() => {
    // Check if user is authenticated
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
    }
  }, [navigate, toast]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/admin');
  };

  if (!isAuthenticated) {
    return null; // Don't render anything if not authenticated
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
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

      {/* Main Content */}
      <main className="flex-1 container px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* User Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">1,274</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sponsors Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Sponsors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">432</div>
                    <p className="text-xs text-muted-foreground">+5% from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sponsorships Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Completed Sponsorships</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <PieChartIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">867</div>
                    <p className="text-xs text-muted-foreground">+18% from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Monthly sponsorship matches</CardDescription>
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
              <CardTitle>Sponsorship Categories</CardTitle>
              <CardDescription>Distribution by industry</CardDescription>
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

        {/* Form Data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Form Submissions</CardTitle>
              <CardDescription>View and manage sponsorship requests and offers</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="clients">
                <TabsList className="mb-6">
                  <TabsTrigger value="clients">Client Requests</TabsTrigger>
                  <TabsTrigger value="companies">Company Offers</TabsTrigger>
                </TabsList>
                
                <TabsContent value="clients">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Project</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clientForms.map((form) => (
                          <tr key={form.id} className="border-b border-border hover:bg-muted/50">
                            <td className="py-3 px-4">
                              <div>
                                <div className="font-medium">{form.name}</div>
                                <div className="text-sm text-muted-foreground">{form.email}</div>
                              </div>
                            </td>
                            <td className="py-3 px-4">{form.projectName}</td>
                            <td className="py-3 px-4">{form.category}</td>
                            <td className="py-3 px-4">${form.amount.toLocaleString()}</td>
                            <td className="py-3 px-4">{new Date(form.submittedAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="companies">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Company</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Contact</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Industry</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Budget</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {companyForms.map((form) => (
                          <tr key={form.id} className="border-b border-border hover:bg-muted/50">
                            <td className="py-3 px-4 font-medium">{form.companyName}</td>
                            <td className="py-3 px-4">
                              <div>
                                <div>{form.contactPerson}</div>
                                <div className="text-sm text-muted-foreground">{form.email}</div>
                              </div>
                            </td>
                            <td className="py-3 px-4">{form.industry}</td>
                            <td className="py-3 px-4">${form.budget.toLocaleString()}</td>
                            <td className="py-3 px-4">{new Date(form.submittedAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
