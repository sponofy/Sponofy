
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { SendHorizontal, Bot, X, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useChat, Message } from "@/hooks/use-chat";

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content: "Hi there! I'm SponoBot, your sponsorship assistant. How can I help you with sponsorships today?"
  }
];

const sponsorshipContext = `
You are SponoBot, a helpful AI assistant for Sponofy - a platform that connects sponsors with sponsorship opportunities.
Your expertise is specifically in:
- Helping users understand how sponsorship works
- Explaining the benefits of sponsorships for both sponsors and recipients
- Providing information about the sponsorship process
- Answering questions about common sponsorship terms and practices
- Offering advice on creating effective sponsorship proposals
- Explaining how to find the right sponsors for specific events or projects

You should ONLY answer questions related to sponsorships and the Sponofy platform. 
If asked about topics outside of this scope, politely redirect the conversation back to sponsorships.
Keep responses concise, friendly, and informative.
`;

type ChatBotDisplayMode = "floating" | "window";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(true);
  const [displayMode, setDisplayMode] = useState<ChatBotDisplayMode>("floating");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  const { messages, setMessages, isLoading, sendMessage } = useChat(sponsorshipContext);
  
  // Initialize messages if empty
  useEffect(() => {
    if (messages.length === 0) {
      setMessages(initialMessages);
    }
  }, [messages.length, setMessages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus textarea when chat is opened
  useEffect(() => {
    if (!isMinimized && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isMinimized]);

  // Simple input handler with no side effects
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  // Handles message sending with debounce protection
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const currentInput = input.trim();
    setInput(""); // Clear input immediately for better UX
    
    try {
      await sendMessage(currentInput);
    } catch (error) {
      console.error("Error handling message:", error);
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Extracted Message item component for better organization
  const MessageItem = ({ message }: { message: Message }) => (
    <div 
      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
    >
      <div 
        className={`max-w-[80%] rounded-lg p-3 ${
          message.role === "user" 
            ? "bg-primary/90 text-primary-foreground ml-4" 
            : "bg-muted-foreground/10 mr-4 flex"
        }`}
      >
        {message.role === "assistant" && (
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src="/lovable-uploads/a761c347-a465-4ed2-863f-00d1a4c64599.png" alt="SponoBot" />
            <AvatarFallback className="bg-primary/20 text-primary">SB</AvatarFallback>
          </Avatar>
        )}
        <div className={message.role === "assistant" ? "mt-0.5" : ""}>
          {message.content}
        </div>
      </div>
    </div>
  );

  // Loading indicator component
  const LoadingIndicator = () => (
    <div className="flex justify-start">
      <div className="max-w-[80%] bg-muted-foreground/10 rounded-lg p-3 mr-4 flex">
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src="/lovable-uploads/a761c347-a465-4ed2-863f-00d1a4c64599.png" alt="SponoBot" />
          <AvatarFallback className="bg-primary/20 text-primary">SB</AvatarFallback>
        </Avatar>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }}></div>
          <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "600ms" }}></div>
        </div>
      </div>
    </div>
  );

  // Message list component
  const MessageList = () => (
    <div className="h-[350px] overflow-y-auto p-4 flex flex-col gap-3 bg-muted/40">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      {isLoading && <LoadingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );

  // Chat input component
  const ChatInput = () => (
    <div className="p-3 bg-background border-t">
      <div className="flex gap-2">
        <Textarea
          ref={textareaRef}
          placeholder="Ask about sponsorships..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="min-h-[40px] max-h-[120px] resize-none"
          maxLength={500}
          disabled={isLoading}
        />
        <Button 
          onClick={handleSend} 
          disabled={isLoading || !input.trim()} 
          size="icon"
          className="bg-primary hover:bg-primary/90 text-primary-foreground h-10 w-10"
        >
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  // Floating chat UI component
  const FloatingChatUI = () => (
    <motion.div
      className="fixed bottom-5 right-5 z-40 w-auto"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {isMinimized ? (
        <Button 
          onClick={() => setIsMinimized(false)}
          className="rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
          size="icon"
        >
          <Bot className="h-5 w-5" />
        </Button>
      ) : (
        <Card className="border border-primary/20 shadow-xl overflow-hidden w-full sm:w-[400px]">
          <div className="bg-primary text-primary-foreground p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <h3 className="font-medium">SponoBot - Sponsorship Assistant</h3>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 text-primary-foreground hover:text-white hover:bg-primary/80" 
                onClick={() => setDisplayMode("window")}
                title="Open in window"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 text-primary-foreground hover:text-white hover:bg-primary/80" 
                onClick={() => setIsMinimized(true)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <CardContent className="p-0">
            <MessageList />
            <ChatInput />
          </CardContent>
        </Card>
      )}
    </motion.div>
  );

  // Window chat UI component
  const WindowChatUI = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setDisplayMode("floating")}>
      <motion.div 
        className="w-full max-w-2xl bg-background rounded-lg shadow-2xl overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6" />
            <h2 className="text-xl font-semibold">SponoBot - Sponsorship Assistant</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-primary-foreground hover:text-white hover:bg-primary/80" 
              onClick={() => {
                setDisplayMode("floating");
                setIsMinimized(false);
              }}
              title="Minimize to corner"
            >
              <Minimize2 className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-primary-foreground hover:text-white hover:bg-primary/80" 
              onClick={() => {
                setDisplayMode("floating");
                setIsMinimized(true);
              }}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="h-[500px] overflow-y-auto p-4 flex flex-col gap-3 bg-muted/40">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-lg p-4 ${
                message.role === "user" 
                  ? "bg-primary/90 text-primary-foreground ml-4" 
                  : "bg-muted-foreground/10 mr-4 flex"
              }`}>
                {message.role === "assistant" && (
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src="/lovable-uploads/a761c347-a465-4ed2-863f-00d1a4c64599.png" alt="SponoBot" />
                    <AvatarFallback className="bg-primary/20 text-primary">SB</AvatarFallback>
                  </Avatar>
                )}
                <div className={message.role === "assistant" ? "mt-1" : ""}>
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] bg-muted-foreground/10 rounded-lg p-4 mr-4 flex">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src="/lovable-uploads/a761c347-a465-4ed2-863f-00d1a4c64599.png" alt="SponoBot" />
                  <AvatarFallback className="bg-primary/20 text-primary">SB</AvatarFallback>
                </Avatar>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-3 h-3 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-3 h-3 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  <div className="w-3 h-3 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "600ms" }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 bg-background border-t">
          <div className="flex gap-3">
            <Textarea
              ref={textareaRef}
              placeholder="Ask about sponsorships..."
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="min-h-[50px] max-h-[150px] resize-none"
              maxLength={500}
              disabled={isLoading}
            />
            <Button 
              onClick={handleSend} 
              disabled={isLoading || !input.trim()} 
              className="h-auto bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <SendHorizontal className="h-5 w-5 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  // Render the appropriate UI based on the display mode
  return displayMode === "window" ? <WindowChatUI /> : <FloatingChatUI />;
};

export default ChatBot;
