
import { useState, useEffect } from "react";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { motion } from "framer-motion";

interface AuthDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialView?: "signIn" | "signUp";
}

const AuthDialog = ({ isOpen, onOpenChange, initialView = "signIn" }: AuthDialogProps) => {
  const [activeTab, setActiveTab] = useState<"signIn" | "signUp">(initialView);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    setActiveTab(initialView);
  }, [initialView]);

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // This would normally go to your auth provider
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    // This would normally trigger Google signin
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  // This hidden Clerk component handles the actual auth
  const renderHiddenClerkComponent = () => {
    return (
      <div className="hidden">
        {activeTab === "signIn" ? (
          <SignIn redirectUrl="/dashboard" />
        ) : (
          <SignUp redirectUrl="/dashboard" />
        )}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-none bg-white rounded-lg">
        <div className="w-full">
          <div className="relative p-6">
            <DialogClose className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100">
              <X className="h-4 w-4 text-gray-500" />
              <span className="sr-only">Close</span>
            </DialogClose>
            
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {activeTab === "signIn" ? "Sign in to Sponofy" : "Sign up for Sponofy"}
              </h2>
              <p className="text-gray-600">
                {activeTab === "signIn" 
                  ? "Welcome back! Please sign in to continue" 
                  : "Create your account to get started"}
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-3 px-4 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg 
                  viewBox="0 0 48 48" 
                  width="20" 
                  height="20"
                >
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
                Continue with Google
              </button>

              <div className="relative flex items-center justify-center mt-6 mb-6">
                <div className="border-t border-gray-300 w-full"></div>
                <div className="bg-white px-4 text-sm text-gray-500 absolute">or</div>
              </div>

              <form onSubmit={handleSignInSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  {activeTab === "signIn" && (
                    <Button
                      type="submit"
                      className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition-colors"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Continue"}
                    </Button>
                  )}

                  {activeTab === "signUp" && (
                    <Button
                      type="submit"
                      className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition-colors"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing up..." : "Continue"}
                    </Button>
                  )}
                </div>
              </form>

              <div className="text-center mt-4 text-sm text-gray-600">
                {activeTab === "signIn" ? (
                  <p>
                    Don't have an account?{" "}
                    <button
                      onClick={() => setActiveTab("signUp")}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Sign up
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <button
                      onClick={() => setActiveTab("signIn")}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Sign in
                    </button>
                  </p>
                )}
              </div>

              <div className="text-center mt-6 pt-6 border-t border-gray-200 text-xs text-gray-500">
                Secured by{" "}
                <span className="flex items-center justify-center mt-1">
                  <svg viewBox="0 0 256 256" height="14">
                    <path fill="#505050" d="M9.79 29.4c-2.14-4.22-4.87-7.4-8.21-9.94C1 19.18 1 18.73 1 13.41v-.04c0-4.14 0-6.2.73-7.06c.72-.86 2.12-1.25 4.95-2.04C9.52 3.7 14.39 2.31 19.22 1c10.67-2.9 17.5-1.77 22.34 2.14c4.83 3.91 6.31 9.97 7.22 17.36c.37 3.36.56 6.99.78 10.9c.34 6.11.7 12.52 1.59 18.24c.45 3.24 1.06 6.88 2.31 9.82c1.25 2.93 3.27 5.44 6.61 5.44V51c-3.34 0-5.36 2.51-6.6 5.44c-1.26 2.94-1.87 6.58-2.32 9.82c-.88 5.72-1.25 12.13-1.59 18.24c-.22 3.91-.4 7.54-.78 10.9c-.9 7.39-2.39 13.45-7.22 17.36c-4.84 3.91-11.67 5.05-22.34 2.15c-4.83-1.32-9.7-2.71-14.54-4.28C2.12 109.04.73 108.65 0 107.79c-.73-.86-.73-2.92-.73-7.06v-.04c0-5.32 0-5.77.58-6.05c3.34-2.54 6.07-5.72 8.21-9.94c2.15-4.22 3.22-8.9 3.94-12.92c.76-4.02 1.13-7.7 1.38-10.42c.26-2.69.39-4.39.39-5.17v-8.16c0-.78-.13-2.48-.39-5.17c-.25-2.73-.62-6.4-1.38-10.43c-.72-4.02-1.79-8.7-3.94-12.92zM65 0h126c12.15 0 22 9.85 22 22v74c0 12.15-9.85 22-22 22H65c-12.15 0-22-9.85-22-22V22C43 9.85 52.85 0 65 0zm21 46c0-9.94 8.06-18 18-18h19c9.94 0 18 8.06 18 18v12c0 9.94-8.06 18-18 18h-19c-9.94 0-18-8.06-18-18V46zm16.5 1.5c0 4.14-3.36 7.5-7.5 7.5c-4.14 0-7.5-3.36-7.5-7.5c0-4.14 3.36-7.5 7.5-7.5c4.14 0 7.5 3.36 7.5 7.5zM162 65.5c0 4.14-3.36 7.5-7.5 7.5c-4.14 0-7.5-3.36-7.5-7.5c0-4.14 3.36-7.5 7.5-7.5c4.14 0 7.5 3.36 7.5 7.5zm-4.5-27c0 4.14-3.36 7.5-7.5 7.5c-4.14 0-7.5-3.36-7.5-7.5c0-4.14 3.36-7.5 7.5-7.5c4.14 0 7.5 3.36 7.5 7.5zM125 55.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5c-8.56 0-15.5-6.94-15.5-15.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5c0 5.8 4.7 10.5 10.5 10.5z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hidden component for actual authentication */}
        {renderHiddenClerkComponent()}
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
