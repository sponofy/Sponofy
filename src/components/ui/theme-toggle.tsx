
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-10 h-10 rounded-full transition-all duration-300 hover:green-gradient"
    >
      <Sun
        className={`h-5 w-5 transition-all duration-300 ${
          theme === "dark" ? "opacity-0 rotate-90 scale-0" : "opacity-100"
        } absolute`}
      />
      <Moon
        className={`h-5 w-5 transition-all duration-300 ${
          theme === "light" ? "opacity-0 -rotate-90 scale-0" : "opacity-100"
        } absolute`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
