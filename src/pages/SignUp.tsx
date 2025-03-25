
import { useState, useEffect } from "react";
import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Use useEffect with a timeout to simulate the loading state
  // since onLoad is not available in the current Clerk version
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-background/95">
      <div className="p-4">
        <Link 
          to="/" 
          className="inline-flex items-center text-foreground/80 hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl"
        >
          <div className="text-center mb-8">
            <motion.h1 
              className="text-3xl font-bold mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Join <span className="text-gradient">Sponofy</span>
            </motion.h1>
            <motion.p
              className="text-foreground/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Create an account to connect with sponsors and opportunities
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="rounded-xl overflow-hidden shadow-xl bg-white dark:bg-gray-950/70 border border-white/20"
          >
            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            )}
            
            <div className={isLoading ? "opacity-0 h-0 overflow-hidden" : "opacity-100 transition-opacity duration-300"}>
              <ClerkSignUp 
                appearance={{
                  elements: {
                    rootBox: "w-full mx-auto px-6 py-8",
                    card: "shadow-none p-0 w-full",
                    headerTitle: "text-2xl font-semibold text-center mb-2",
                    headerSubtitle: "text-center text-gray-600 dark:text-gray-400 mb-6",
                    socialButtonsBlockButton: "border border-gray-300 dark:border-gray-700 hover:border-primary dark:hover:border-primary rounded-md py-3 px-4 transition-colors",
                    socialButtonsProviderIcon: "w-5 h-5 mr-2",
                    dividerRow: "my-6",
                    dividerText: "text-gray-500 px-2",
                    formFieldLabel: "text-left block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",
                    formFieldInput: "w-full rounded-md border border-gray-300 dark:border-gray-700 py-3 px-4 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all",
                    formButtonPrimary: "w-full flex justify-center items-center text-center py-3 px-4 rounded-md bg-teal-600 hover:bg-teal-700 text-white font-medium transition-colors mt-6",
                    footerActionText: "text-sm text-gray-600 dark:text-gray-400",
                    footerActionLink: "text-sm text-primary hover:text-primary/90 font-medium",
                    identityPreview: "border border-gray-300 dark:border-gray-700 rounded-lg p-4",
                    identityPreviewText: "text-gray-700 dark:text-gray-300",
                    identityPreviewEditButton: "text-primary hover:text-primary/90",
                    alert: "rounded-md bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-700 dark:text-red-400",
                    formFieldAction: "text-sm text-primary hover:text-primary/90 font-medium",
                    form: "space-y-4",
                    formField: "mb-5",
                  },
                }}
                signInUrl="/sign-in"
                redirectUrl="/dashboard"
                afterSignUpUrl="/dashboard"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
