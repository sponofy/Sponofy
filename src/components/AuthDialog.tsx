
import { useState, useEffect } from "react";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

interface AuthDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialView?: "signIn" | "signUp";
}

const AuthDialog = ({ isOpen, onOpenChange, initialView = "signIn" }: AuthDialogProps) => {
  const [activeTab, setActiveTab] = useState<"signIn" | "signUp">(initialView);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      setIsLoading(true);
    }
  }, [isOpen]);

  useEffect(() => {
    setActiveTab(initialView);
  }, [initialView]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-none">
        <div className="bg-white dark:bg-gray-950 rounded-lg">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "signIn" | "signUp")} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signIn">Sign In</TabsTrigger>
              <TabsTrigger value="signUp">Sign Up</TabsTrigger>
            </TabsList>
            
            <div className="px-6 py-6">
              <TabsContent value="signIn" className="mt-0 p-0">
                {isLoading && (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                  </div>
                )}
                
                <div className={isLoading ? "opacity-0 h-0 overflow-hidden" : "opacity-100 transition-opacity duration-300"}>
                  <SignIn 
                    appearance={{
                      elements: {
                        rootBox: "w-full mx-auto",
                        card: "shadow-none p-0 w-full bg-transparent",
                        header: "hidden",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        socialButtonsBlockButton: "bg-white border border-gray-300 dark:border-gray-700 dark:bg-gray-900 hover:border-primary dark:hover:border-primary rounded-lg flex items-center justify-center py-3 px-4 gap-2 transition-colors",
                        socialButtonsProviderIcon: "w-5 h-5",
                        socialButtonsBlockButtonText: "text-sm font-medium",
                        dividerLine: "bg-gray-200 dark:bg-gray-700",
                        dividerText: "text-gray-500 text-sm mx-2 px-2",
                        formFieldLabel: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",
                        formFieldInput: "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-3 px-4 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all",
                        formButtonPrimary: "w-full flex justify-center items-center text-center py-3 px-4 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium transition-colors mt-4",
                        footerActionText: "text-sm text-gray-600 dark:text-gray-400",
                        footerActionLink: "text-sm text-primary hover:text-primary/90 font-medium",
                        formField: "mb-4",
                        form: "space-y-4",
                        formFieldAction: "text-sm text-primary hover:text-primary/90 font-medium",
                        formFieldInputShowPasswordButton: "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
                        main: "mx-2", // Added margin inside main container
                        footer: "mt-4 mx-2", // Added margin inside footer
                      },
                    }}
                    redirectUrl="/dashboard"
                    signUpUrl="/sign-up"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="signUp" className="mt-0 p-0">
                {isLoading && (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                  </div>
                )}
                
                <div className={isLoading ? "opacity-0 h-0 overflow-hidden" : "opacity-100 transition-opacity duration-300"}>
                  <SignUp 
                    appearance={{
                      elements: {
                        rootBox: "w-full mx-auto",
                        card: "shadow-none p-0 w-full bg-transparent",
                        header: "hidden",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        socialButtonsBlockButton: "bg-white border border-gray-300 dark:border-gray-700 dark:bg-gray-900 hover:border-primary dark:hover:border-primary rounded-lg flex items-center justify-center py-3 px-4 gap-2 transition-colors",
                        socialButtonsProviderIcon: "w-5 h-5",
                        socialButtonsBlockButtonText: "text-sm font-medium",
                        dividerLine: "bg-gray-200 dark:bg-gray-700",
                        dividerText: "text-gray-500 text-sm mx-2 px-2",
                        formFieldLabel: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",
                        formFieldInput: "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-3 px-4 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all",
                        formButtonPrimary: "w-full flex justify-center items-center text-center py-3 px-4 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium transition-colors mt-4",
                        footerActionText: "text-sm text-gray-600 dark:text-gray-400",
                        footerActionLink: "text-sm text-primary hover:text-primary/90 font-medium",
                        formField: "mb-4",
                        form: "space-y-4",
                        formFieldAction: "text-sm text-primary hover:text-primary/90 font-medium",
                        formFieldInputShowPasswordButton: "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
                        main: "mx-2", // Added margin inside main container
                        footer: "mt-4 mx-2", // Added margin inside footer
                      },
                    }}
                    redirectUrl="/dashboard"
                    signInUrl="/sign-in"
                  />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
