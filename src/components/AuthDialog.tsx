
import { useState, useEffect } from "react";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface AuthDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialView?: "signIn" | "signUp";
}

const AuthDialog = ({ isOpen, onOpenChange, initialView = "signIn" }: AuthDialogProps) => {
  const [activeTab, setActiveTab] = useState<"signIn" | "signUp">(initialView);

  useEffect(() => {
    setActiveTab(initialView);
  }, [initialView]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden bg-white">
        <DialogClose className="absolute right-3 top-3 rounded-sm opacity-70 hover:opacity-100 z-10">
          <X className="h-4 w-4 text-gray-500" />
          <span className="sr-only">Close</span>
        </DialogClose>
        
        <div className="px-6 py-6">
          <div className="text-center mb-5">
            <h2 className="text-2xl font-bold text-gray-800">
              {activeTab === "signIn" ? "Sign in to Sponofy" : "Sign up for Sponofy"}
            </h2>
            <p className="text-gray-500 mt-1">
              {activeTab === "signIn" 
                ? "Welcome back! Please sign in to continue" 
                : "Create your account to get started"}
            </p>
          </div>
          
          <div>
            {activeTab === "signIn" ? (
              <SignIn 
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-none p-0 w-full",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton: "w-full border border-gray-300 hover:bg-gray-50 mb-2 text-gray-700 font-medium",
                    socialButtonsBlockButtonText: "text-sm",
                    socialButtonsProviderIcon: "w-5 h-5",
                    dividerLine: "bg-gray-200",
                    dividerText: "text-gray-400 text-sm",
                    formFieldLabel: "text-gray-700",
                    formFieldInput: "w-full border border-gray-300 focus:ring-0 focus:border-gray-400 rounded-md",
                    formButtonPrimary: "w-full bg-gray-800 hover:bg-gray-700 text-white py-2.5 rounded-md font-medium mt-2",
                    footerActionText: "text-sm text-gray-500",
                    footerActionLink: "text-sm text-gray-800 hover:text-gray-700 font-medium",
                    alert: "bg-red-50 border border-red-100 text-red-600 text-sm",
                    identityPreviewText: "text-gray-700",
                    identityPreviewEditButton: "text-gray-600 hover:text-gray-800",
                  }
                }}
              />
            ) : (
              <SignUp
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-none p-0 w-full",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton: "w-full border border-gray-300 hover:bg-gray-50 mb-2 text-gray-700 font-medium",
                    socialButtonsBlockButtonText: "text-sm",
                    socialButtonsProviderIcon: "w-5 h-5",
                    dividerLine: "bg-gray-200",
                    dividerText: "text-gray-400 text-sm",
                    formFieldLabel: "text-gray-700",
                    formFieldInput: "w-full border border-gray-300 focus:ring-0 focus:border-gray-400 rounded-md",
                    formButtonPrimary: "w-full bg-gray-800 hover:bg-gray-700 text-white py-2.5 rounded-md font-medium mt-2",
                    footerActionText: "text-sm text-gray-500",
                    footerActionLink: "text-sm text-gray-800 hover:text-gray-700 font-medium",
                    alert: "bg-red-50 border border-red-100 text-red-600 text-sm",
                    identityPreviewText: "text-gray-700",
                    identityPreviewEditButton: "text-gray-600 hover:text-gray-800",
                  }
                }}
              />
            )}
          </div>
        </div>
        
        <div className="mt-3 text-center border-t border-gray-100 py-4 bg-gray-50">
          {activeTab === "signIn" ? (
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <button
                onClick={() => setActiveTab("signUp")}
                className="text-gray-800 hover:text-gray-700 font-medium"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <button
                onClick={() => setActiveTab("signIn")}
                className="text-gray-800 hover:text-gray-700 font-medium"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
