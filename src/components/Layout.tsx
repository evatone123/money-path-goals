
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  PieChart, 
  BarChart, 
  Settings,
  Menu,
  X,
  DollarSign,
  FolderIcon,
  Moon,
  Sun
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if user previously set a preference
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });
  
  const location = useLocation();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Store preference
    localStorage.setItem("darkMode", String(newMode));
  };

  useEffect(() => {
    // Check for dark mode preference on initial load
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    if (storedDarkMode !== isDarkMode) {
      setIsDarkMode(storedDarkMode);
      if (storedDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out", 
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="p-4 flex items-center justify-between">
          <div className={cn("flex items-center", sidebarOpen ? "" : "justify-center w-full")}>
            <div className="h-8 w-8 rounded-md gradient-purple flex items-center justify-center">
              <span className="font-bold text-white">MP</span>
            </div>
            {sidebarOpen && (
              <span className="ml-2 font-semibold text-lg text-sidebar-foreground">MoneyPath</span>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("text-sidebar-foreground", !sidebarOpen && "hidden")} 
            onClick={toggleSidebar}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="mt-6 px-2">
          <ul className="space-y-1">
            <li>
              <Link
                to="/"
                className={cn(
                  "flex items-center p-3 rounded-md hover:bg-sidebar-accent transition-colors",
                  !sidebarOpen && "justify-center",
                  isActive("/") && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
              >
                <LayoutDashboard className="h-5 w-5 text-sidebar-primary" />
                {sidebarOpen && <span className="ml-3 text-sidebar-foreground">Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/income"
                className={cn(
                  "flex items-center p-3 rounded-md hover:bg-sidebar-accent transition-colors",
                  !sidebarOpen && "justify-center",
                  isActive("/income") && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
              >
                <DollarSign className="h-5 w-5 text-sidebar-primary" />
                {sidebarOpen && <span className="ml-3 text-sidebar-foreground">Income</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/expenses"
                className={cn(
                  "flex items-center p-3 rounded-md hover:bg-sidebar-accent transition-colors",
                  !sidebarOpen && "justify-center",
                  isActive("/expenses") && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
              >
                <BarChart className="h-5 w-5 text-sidebar-primary" />
                {sidebarOpen && <span className="ml-3 text-sidebar-foreground">Expenses</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/budgets"
                className={cn(
                  "flex items-center p-3 rounded-md hover:bg-sidebar-accent transition-colors",
                  !sidebarOpen && "justify-center",
                  isActive("/budgets") && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
              >
                <PieChart className="h-5 w-5 text-sidebar-primary" />
                {sidebarOpen && <span className="ml-3 text-sidebar-foreground">Budgets</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/categories"
                className={cn(
                  "flex items-center p-3 rounded-md hover:bg-sidebar-accent transition-colors",
                  !sidebarOpen && "justify-center",
                  isActive("/categories") && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
              >
                <FolderIcon className="h-5 w-5 text-sidebar-primary" />
                {sidebarOpen && <span className="ml-3 text-sidebar-foreground">Categories</span>}
              </Link>
            </li>

            {sidebarOpen && <div className="h-px bg-sidebar-border my-2 mx-3" />}
            
            <li>
              <Link
                to="/settings"
                className={cn(
                  "flex items-center p-3 rounded-md hover:bg-sidebar-accent transition-colors",
                  !sidebarOpen && "justify-center",
                  isActive("/settings") && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
              >
                <Settings className="h-5 w-5 text-sidebar-primary" />
                {sidebarOpen && <span className="ml-3 text-sidebar-foreground">Settings</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Top Header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6 sticky top-0 bg-background z-10">
          <div className="flex items-center">
            {!sidebarOpen && (
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-4">
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <h1 className="font-semibold text-xl">Money Path</h1>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleDarkMode} 
            className="h-10 w-10 rounded-full"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </header>
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
