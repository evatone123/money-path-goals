
import { Progress } from "@/components/ui/progress";
import { budgetGoals, getCategoryColor } from "@/lib/data";

const BudgetGoals = () => {
  return (
    <div className="budget-card animate-fade-in">
      <h3 className="font-medium text-lg mb-4">Budget Goals</h3>
      <div className="space-y-4">
        {budgetGoals.map((goal) => {
          const percentSpent = Math.min((goal.spent / goal.amount) * 100, 100);
          const isOverBudget = goal.spent > goal.amount;
          
          return (
            <div key={goal.id} className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div 
                    className="h-3 w-3 rounded-full mr-2" 
                    style={{ backgroundColor: getCategoryColor(goal.category) }}
                  ></div>
                  <span className="text-sm font-medium">{goal.category}</span>
                </div>
                <div className="text-sm">
                  <span className={isOverBudget ? "text-budget-red" : ""}>
                    ${goal.spent.toFixed(2)}
                  </span>
                  <span className="text-gray-500"> / ${goal.amount.toFixed(2)}</span>
                </div>
              </div>
              <Progress 
                value={percentSpent} 
                className={isOverBudget ? "bg-gray-100" : ""}
                indicatorClassName={isOverBudget ? "bg-budget-red" : ""} 
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetGoals;
