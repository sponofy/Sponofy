
import { useState, useEffect } from "react";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

interface AuthDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialView?: "signIn" | "signUp";
}

const AuthDialog = ({ isOpen, onOpenChange, initialView = "signIn" }: AuthDialogProps) => {
  const [activeTab, setActiveTab] = useState<"signIn" | "signUp">(initialView);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveTab(initialView);
  }, [initialView]);

  // Close dialog and redirect to sponsorship forms
  const handleClerkComplete = () => {
    onOpenChange(false);
    navigate('/#sponsorship-forms');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden bg-white max-h-[90vh] overflow-y-auto">
        <DialogClose className="absolute right-3 top-3 rounded-sm opacity-70 hover:opacity-100 z-10">
          <X className="h-4 w-4 text-gray-500" />
          <span className="sr-only">Close</span>
        </DialogClose>
        
        <div className="py-4">
          <div className="text-center mb-3">
            <h2 className="text-xl font-bold text-gray-800">
              {activeTab === "signIn" ? "Sign in to Sponofy" : "Sign up for Sponofy"}
            </h2>
            <p className="text-gray-500 mt-1 text-sm">
              {activeTab === "signIn" 
                ? "Welcome back! Please sign in to continue" 
                : "Create your account to get started"}
            </p>
          </div>
          
          <div className="py-2">
            {activeTab === "signIn" ? (
              <SignIn
                afterSignInUrl="/#sponsorship-forms"
                redirectUrl="/#sponsorship-forms"
                routing="path"
                path="/sign-in"
              />
            ) : (
              <SignUp
                afterSignUpUrl="/#sponsorship-forms"
                redirectUrl="/#sponsorship-forms"
                routing="path"
                path="/sign-up"  
              />
            )}
          </div>
        </div>
        
        <div className="mt-2 text-center border-t border-gray-100 py-3 bg-gray-50">
          {activeTab === "signIn" ? (
            <p className="text-xs text-gray-500">
              Don't have an account?{" "}
              <button
                onClick={() => setActiveTab("signUp")}
                className="text-gray-800 hover:text-gray-700 font-medium"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p className="text-xs text-gray-500">
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
