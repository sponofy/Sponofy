
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  UserButton, 
  useUser, 
  SignedIn, 
  SignedOut, 
  RedirectToSignIn 
} from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Handshake, Users, Bell, Settings, LogOut } from "lucide-react";

const UserDashboard = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Set page title
    document.title = "Dashboard | Sponofy";
    
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <ThemeProvider defaultTheme="light">
      <SignedIn>
        <div className="flex flex-col min-h-screen bg-background">
          {/* Header */}
          <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-blur:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
              <div className="flex items-center gap-2">
                <a href="/" className="flex items-center space-x-2 text-xl font-bold text-primary transition-all duration-300 hover:opacity-90">
                  <span className="relative z-10">Sponofy</span>
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Button size="icon" variant="ghost" aria-label="Notifications">
                  <Bell className="h-5 w-5" />
                </Button>
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </header>

          <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr] md:gap-6 lg:gap-10 px-4 md:px-6 py-6">
            {/* Sidebar */}
            <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block border-border/40">
              <div className="py-6 px-2">
                <h2 className="text-lg font-semibold text-foreground mb-4 px-4">Dashboard</h2>
                <nav className="space-y-1">
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start ${activeTab === "overview" ? "bg-primary/10 text-primary" : ""}`}
                    onClick={() => setActiveTab("overview")}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Overview
                  </Button>
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start ${activeTab === "opportunities" ? "bg-primary/10 text-primary" : ""}`}
                    onClick={() => setActiveTab("opportunities")}
                  >
                    <Handshake className="mr-2 h-4 w-4" />
                    Opportunities
                  </Button>
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start ${activeTab === "settings" ? "bg-primary/10 text-primary" : ""}`}
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </nav>
              </div>
            </aside>

            {/* Main content */}
            <main className="flex w-full flex-col overflow-hidden">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.firstName || "User"}</h1>
                  <p className="text-muted-foreground">Here's what's happening with your sponsorship activities.</p>
                </div>

                <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      <Card className="hover:shadow-lg transition-all duration-300">
                        <CardHeader className="pb-2">
                          <CardTitle>Active Connections</CardTitle>
                          <CardDescription>Your current sponsorship connections</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="text-3xl font-bold">3</div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" size="sm" className="w-full">View All</Button>
                        </CardFooter>
                      </Card>
                      <Card className="hover:shadow-lg transition-all duration-300">
                        <CardHeader className="pb-2">
                          <CardTitle>Pending Requests</CardTitle>
                          <CardDescription>Sponsorship requests awaiting response</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="text-3xl font-bold">7</div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" size="sm" className="w-full">View All</Button>
                        </CardFooter>
                      </Card>
                      <Card className="hover:shadow-lg transition-all duration-300">
                        <CardHeader className="pb-2">
                          <CardTitle>Matches This Week</CardTitle>
                          <CardDescription>New potential sponsorship matches</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="text-3xl font-bold">12</div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" size="sm" className="w-full">View All</Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="opportunities" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Sponsorship Opportunities</CardTitle>
                        <CardDescription>Discover and manage sponsorship opportunities.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-center py-12 text-muted-foreground">No active opportunities yet. Check back soon!</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="settings" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Account Settings</CardTitle>
                        <CardDescription>Manage your account preferences and profile.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">You can update your profile information and manage your account settings here.</p>
                        <Button variant="outline" onClick={() => navigate("/")}>
                          <LogOut className="mr-2 h-4 w-4" />
                          Return to Home
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </main>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ThemeProvider>
  );
};

export default UserDashboard;
