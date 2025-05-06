
import { CircleDollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { getTotalSpent, getTotalBudget } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Summary = () => {
  const totalSpent = getTotalSpent();
  const totalBudget = getTotalBudget();
  const remaining = totalBudget - totalSpent;
  const percentSpent = (totalSpent / totalBudget) * 100;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in">
      {/* Total Budget */}
      <div className="budget-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-500">Total Budget</h3>
          <div className="h-10 w-10 rounded-full bg-budget-purple-light flex items-center justify-center">
            <CircleDollarSign className="h-5 w-5 text-budget-purple" />
          </div>
        </div>
        <p className="text-3xl font-bold">${totalBudget.toFixed(2)}</p>
        <div className="mt-2 text-sm">
          <span className="text-gray-500">Monthly budget across all categories</span>
        </div>
      </div>
      
      {/* Spent So Far */}
      <div className="budget-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-500">Spent</h3>
          <div className="h-10 w-10 rounded-full bg-budget-red/10 flex items-center justify-center">
            <TrendingDown className="h-5 w-5 text-budget-red" />
          </div>
        </div>
        <p className="text-3xl font-bold">${totalSpent.toFixed(2)}</p>
        <div className="mt-2 flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={cn(
                "h-2.5 rounded-full",
                percentSpent > 90 ? "bg-budget-red" : "bg-budget-purple"
              )}
              style={{ width: `${Math.min(percentSpent, 100)}%` }}
            ></div>
          </div>
          <span className="text-sm ml-2">{Math.round(percentSpent)}%</span>
        </div>
      </div>
      
      {/* Remaining */}
      <div className="budget-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-500">Remaining</h3>
          <div className="h-10 w-10 rounded-full bg-budget-green/10 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-budget-green" />
          </div>
        </div>
        <p className={cn(
          "text-3xl font-bold",
          remaining < 0 ? "text-budget-red" : ""
        )}>${remaining.toFixed(2)}</p>
        <div className="mt-2 text-sm">
          <span className={cn(
            "text-gray-500",
            remaining < 0 ? "text-budget-red" : ""
          )}>
            {remaining < 0 
              ? "You've exceeded your budget" 
              : "Available to spend this month"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Summary;
