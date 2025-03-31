
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
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
          <App />
          <SonnerToaster position="top-right" />
          <Toaster />
        </QueryClientProvider>
      </ClerkProvider>
    );
  } else {
    // Fallback when no Clerk key is available - bypass authentication features
    return (
      <QueryClientProvider client={queryClient}>
        <App />
        <SonnerToaster position="top-right" />
        <Toaster />
      </QueryClientProvider>
    );
  }
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>,
);
