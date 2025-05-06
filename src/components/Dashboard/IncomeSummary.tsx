
import { PlusCircle, TrendingUp } from "lucide-react";
import { getTotalIncome, getRecentIncome } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const IncomeSummary = () => {
  const totalIncome = getTotalIncome();
  const recentIncome = getRecentIncome(3);
  
  return (
    <div className="budget-card animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h3 className="font-medium text-lg">Income</h3>
          <div className="h-6 w-6 rounded-full bg-budget-green/10 flex items-center justify-center ml-2">
            <TrendingUp className="h-3 w-3 text-budget-green" />
          </div>
        </div>
        <Link to="/income">
          <Button variant="outline" size="sm">View All</Button>
        </Link>
      </div>
      
      <div className="mb-4">
        <p className="text-2xl font-bold">${totalIncome.toFixed(2)}</p>
        <p className="text-sm text-gray-500">Total income this month</p>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-500">Recent Income</h4>
        {recentIncome.map(income => (
          <div key={income.id} className="flex justify-between items-center">
            <div>
              <p className="font-medium">{income.description}</p>
              <p className="text-xs text-gray-500">{income.date.toLocaleDateString()}</p>
            </div>
            <p className="font-medium text-budget-green">+${income.amount.toFixed(2)}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <Link to="/income/add">
          <Button variant="ghost" className="w-full flex justify-center items-center" size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New Income
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default IncomeSummary;
