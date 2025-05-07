
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  PieChart, 
  BarChart, 
  Settings,
  Menu,
  X,
  DollarSign,
  FolderIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white border-r border-border transition-all duration-300 ease-in-out", 
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="p-4 flex items-center justify-between">
          <div className={cn("flex items-center", sidebarOpen ? "" : "justify-center w-full")}>
            <div className="h-8 w-8 rounded-md gradient-purple flex items-center justify-center">
              <span className="font-bold text-white">MP</span>
            </div>
            {sidebarOpen && (
              <span className="ml-2 font-semibold text-lg">MoneyPath</span>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("", !sidebarOpen && "hidden")} 
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
                  "flex items-center p-3 rounded-md hover:bg-accent transition-colors",
                  !sidebarOpen && "justify-center",
                  isActive("/") && "bg-accent"
                )}
              >
                <LayoutDashboard className="h-5 w-5 text-budget-purple" />
                {sidebarOpen && <span className="ml-3">Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/income"
                className={cn(
                  "flex items-center p-3 rounded-md hover:bg-accent transition-colors",
                  !sidebarOpen && "justify-center",
                  isActive("/income") && "bg-accent"
                )}
              >
                <DollarSign className="h-5 w-5 text-budget-purple" />
                {sidebarOpen && <span className="ml-3">Income</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/expenses"
                className={cn(
                  "flex items-center p-3 rounded-md hover:bg-accent transition-colors",
                  !sidebarOpen && "justify-center",
                  isActive("/expenses") && "bg-accent"
                )}
              >
                <BarChart className="h-5 w-5 text-budget-purple" />
                {sidebarOpen && <span className="ml-3">Expenses</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/budgets"
                className={cn(
                  "flex items-center p-3 rounded-md hover:bg-accent transition-colors",
                  !sidebarOpen && "justify-center",
                  isActive("/budgets") && "bg-accent"
                )}
              >
                <PieChart className="h-5 w-5 text-budget-purple" />
                {sidebarOpen && <span className="ml-3">Budgets</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/categories"
                className={cn(
                  "flex items-center p-3 rounded-md hover:bg-accent transition-colors",
                  !sidebarOpen && "justify-center",
                  isActive("/categories") && "bg-accent"
                )}
              >
                <FolderIcon className="h-5 w-5 text-budget-purple" />
                {sidebarOpen && <span className="ml-3">Categories</span>}
              </Link>
            </li>

            {sidebarOpen && <div className="h-px bg-border my-2 mx-3" />}
            
            <li>
              <Link
                to="/settings"
                className={cn(
                  "flex items-center p-3 rounded-md hover:bg-accent transition-colors",
                  !sidebarOpen && "justify-center",
                  isActive("/settings") && "bg-accent"
                )}
              >
                <Settings className="h-5 w-5 text-budget-purple" />
                {sidebarOpen && <span className="ml-3">Settings</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Top Header */}
        <header className="h-16 border-b border-border flex items-center px-6 sticky top-0 bg-background z-10">
          {!sidebarOpen && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-4">
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <h1 className="font-semibold text-xl">Money Path</h1>
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
