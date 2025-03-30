
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.tsx';
import Index from './pages/Index.tsx';
import SignIn from './pages/SignIn.tsx';
import SignUp from './pages/SignUp.tsx';
import UserDashboard from './pages/UserDashboard.tsx';
import Dashboard from './pages/Dashboard.tsx';
import NotFound from './pages/NotFound.tsx';
import AdminLogin from './pages/AdminLogin.tsx';
import Admin from './pages/Admin.tsx';

import './index.css';

import { ClerkProvider } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';

// Create a client for React Query
const queryClient = new QueryClient();

// Main app component
const MainApp = () => {
  // Check if publishable key exists
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const hasClerkKey = !!publishableKey;

  // Conditional rendering based on Clerk key availability
  if (hasClerkKey) {
    return (
      <ClerkProvider publishableKey={publishableKey}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<Index />} />
                <Route path="sign-in/*" element={<SignIn />} />
                <Route path="sign-up/*" element={<SignUp />} />
                <Route path="dashboard" element={<UserDashboard />} />
                <Route path="admin-login" element={<AdminLogin />} />
                <Route path="admin" element={<Admin />} />
                <Route path="admin/dashboard" element={<Dashboard />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Router>
          <SonnerToaster position="top-right" />
          <Toaster />
        </QueryClientProvider>
      </ClerkProvider>
    );
  } else {
    // Fallback when no Clerk key is available - bypass authentication features
    return (
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Index />} />
              {/* Redirect auth-related routes to home when no auth is available */}
              <Route path="sign-in/*" element={<Navigate to="/" replace />} />
              <Route path="sign-up/*" element={<Navigate to="/" replace />} />
              <Route path="dashboard" element={<Navigate to="/" replace />} />
              <Route path="admin-login" element={<AdminLogin />} />
              <Route path="admin" element={<Admin />} />
              <Route path="admin/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <SonnerToaster position="top-right" />
          <Toaster />
        </Router>
      </QueryClientProvider>
    );
  }
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>,
);
