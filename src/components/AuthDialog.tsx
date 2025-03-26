
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
      <DialogContent className="sm:max-w-[380px] p-6 overflow-hidden">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">
            {activeTab === "signIn" ? "Sign in to Sponofy" : "Sign up for Sponofy"}
          </h2>
          <p className="text-muted-foreground">
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
                  socialButtonsBlockButton: "w-full border border-input hover:bg-accent hover:text-accent-foreground mb-2",
                  dividerRow: "my-4",
                  formFieldInput: "w-full",
                  formButtonPrimary: "w-full bg-primary hover:bg-primary/90 text-primary-foreground",
                  footerActionText: "text-sm text-muted-foreground",
                  footerActionLink: "text-sm text-primary hover:text-primary/90 underline",
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
                  socialButtonsBlockButton: "w-full border border-input hover:bg-accent hover:text-accent-foreground mb-2",
                  dividerRow: "my-4",
                  formFieldInput: "w-full",
                  formButtonPrimary: "w-full bg-primary hover:bg-primary/90 text-primary-foreground",
                  footerActionText: "text-sm text-muted-foreground",
                  footerActionLink: "text-sm text-primary hover:text-primary/90 underline",
                }
              }}
            />
          )}
        </div>
        
        <div className="mt-6 text-center">
          {activeTab === "signIn" ? (
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button
                onClick={() => setActiveTab("signUp")}
                className="text-primary hover:text-primary/90 underline font-medium"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                onClick={() => setActiveTab("signIn")}
                className="text-primary hover:text-primary/90 underline font-medium"
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
