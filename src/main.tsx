import { createRoot } from 'react-dom/client'
import { ClerkProvider } from "@clerk/clerk-react";
import App from './App.tsx'
import './index.css'

// Clerk publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_API;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider
    publishableKey={PUBLISHABLE_KEY}
    clerkJSVersion="5.56.0-snapshot.v20250312225817"
    signInUrl="/sign-in"
    signUpUrl="/sign-up"
    signInFallbackRedirectUrl="/dashboard"
    signUpFallbackRedirectUrl="/"
    signInForceRedirectUrl="/dashboard"
    signUpForceRedirectUrl="/"
    afterSignOutUrl="/"
  >
    <App />
  </ClerkProvider>
);
