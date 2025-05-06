
import { CircleDollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { getTotalSpent, getTotalBudget, getTotalIncome, getMonthlyNetFlow } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Summary = () => {
  const totalSpent = getTotalSpent();
  const totalBudget = getTotalBudget();
  const totalIncome = getTotalIncome();
  const netFlow = getMonthlyNetFlow();
  const remaining = totalBudget - totalSpent;
  const percentSpent = (totalSpent / totalBudget) * 100;
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in">
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
      
      {/* Income */}
      <div className="budget-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-500">Income</h3>
          <div className="h-10 w-10 rounded-full bg-budget-green/10 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-budget-green" />
          </div>
        </div>
        <p className="text-3xl font-bold">${totalIncome.toFixed(2)}</p>
        <div className="mt-2 text-sm">
          <span className="text-gray-500">Monthly income</span>
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
      
      {/* Net Cash Flow */}
      <div className="budget-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-500">Cash Flow</h3>
          <div className={cn(
            "h-10 w-10 rounded-full flex items-center justify-center",
            netFlow >= 0 ? "bg-budget-green/10" : "bg-budget-red/10"
          )}>
            {netFlow >= 0 ? (
              <TrendingUp className="h-5 w-5 text-budget-green" />
            ) : (
              <TrendingDown className="h-5 w-5 text-budget-red" />
            )}
          </div>
        </div>
        <p className={cn(
          "text-3xl font-bold",
          netFlow >= 0 ? "text-budget-green" : "text-budget-red"
        )}>${Math.abs(netFlow).toFixed(2)}</p>
        <div className="mt-2 text-sm">
          <span className={cn(
            netFlow >= 0 ? "text-budget-green" : "text-budget-red"
          )}>
            {netFlow >= 0 ? "Net positive flow" : "Net negative flow"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Summary;
