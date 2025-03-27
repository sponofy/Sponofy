
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

export function useChat(systemPrompt: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async (content: string, existingMessages: Message[]) => {
    if (!content.trim()) return null;
    
    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: content.trim()
    };
    
    setIsLoading(true);

    try {
      // For demo purposes, let's create a mock response
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create a mock response based on the user's question
      let botReply = "I'm your sponsorship assistant. How can I help you today?";
      
      if (content.toLowerCase().includes("sponsor")) {
        botReply = "Sponsorships are financial or in-kind support provided by businesses to events, organizations, or individuals. They're a great way to gain exposure and connect with target audiences. How can I help you with your sponsorship strategy?";
      } else if (content.toLowerCase().includes("benefit")) {
        botReply = "Sponsorships offer many benefits! For sponsors: brand exposure, targeted marketing, and community goodwill. For recipients: financial support, increased credibility, and expanded resources. Would you like more specific information about either perspective?";
      } else if (content.toLowerCase().includes("proposal")) {
        botReply = "Creating an effective sponsorship proposal involves: 1) Research potential sponsors, 2) Clearly define your value proposition, 3) Include concrete benefits and audience data, 4) Offer tiered sponsorship levels, and 5) Make a professional, personalized presentation. Would you like me to elaborate on any of these steps?";
      } else if (content.toLowerCase().includes("find") || content.toLowerCase().includes("how")) {
        botReply = "To find the right sponsors, research companies that align with your audience demographics and values. Look at who sponsors similar events or organizations, check industry-specific directories, and leverage your existing network. Our Sponofy platform can also match you with potential sponsors based on your specific needs.";
      } else {
        botReply = "That's a great question about sponsorships. On the Sponofy platform, we connect sponsors with perfect sponsorship opportunities through data-driven matching and comprehensive tools. Can you tell me more about your specific sponsorship needs or goals?";
      }

      return {
        id: Date.now(),
        role: "assistant" as const,
        content: botReply
      };
    } catch (error) {
      console.error("Error in chat function:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    setMessages,
    isLoading,
    sendMessage
  };
}
