
import { getRecentTransactions, getCategoryColor } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const RecentTransactions = () => {
  const recentTransactions = getRecentTransactions();
  
  return (
    <div className="budget-card animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg">Recent Transactions</h3>
        <Link to="/expenses">
          <Button variant="outline" size="sm">View All</Button>
        </Link>
      </div>
      <div className="divide-y">
        {recentTransactions.map((transaction) => (
          <div key={transaction.id} className="py-3 flex items-center justify-between">
            <div className="flex items-center">
              <div 
                className="h-10 w-10 rounded-full flex items-center justify-center mr-3" 
                style={{ backgroundColor: `${getCategoryColor(transaction.category)}20` }}
              >
                <span 
                  className="text-sm" 
                  style={{ color: getCategoryColor(transaction.category) }}
                >
                  {transaction.category.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-gray-500">
                  {transaction.date.toLocaleDateString()}
                </p>
              </div>
            </div>
            <span className="font-medium">${transaction.amount.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
