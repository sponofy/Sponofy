
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from "@/components/ui/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const App = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Outlet />
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default App;
