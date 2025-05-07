
import { useState } from "react";
import Layout from "@/components/Layout";
import { budgetGoals, getCategoryColor, categories, formatCurrency } from "@/lib/data";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import AddBudgetGoalForm from "@/components/Budgets/AddBudgetGoalForm";
import { useToast } from "@/hooks/use-toast";

const Budgets = () => {
  const [goals, setGoals] = useState(budgetGoals);
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddGoal = (newGoal) => {
    setGoals([...goals, newGoal]);
    setIsGoalDialogOpen(false);
    
    toast({
      title: "Budget goal added",
      description: `${newGoal.category} budget goal has been created successfully`,
    });
  };

  const handleCancelAddGoal = () => {
    setIsGoalDialogOpen(false);
  };

  return (
    <Layout>
      <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold">Budget Goals</h2>
          <p className="text-gray-500">Track your spending against budget goals</p>
        </div>
        <Button className="gradient-purple" onClick={() => setIsGoalDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Goal
        </Button>
      </div>
      
      {/* Budget Goals Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map(goal => {
          const percentSpent = Math.min((goal.spent / goal.amount) * 100, 100);
          const isOverBudget = goal.spent > goal.amount;
          const remaining = goal.amount - goal.spent;
          const currencyCode = goal.currencyCode || "USD";
          
          return (
            <div key={goal.id} className="budget-card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div 
                    className="h-4 w-4 rounded-full mr-2" 
                    style={{ backgroundColor: getCategoryColor(goal.category) }}
                  ></div>
                  <h3 className="font-medium">{goal.category}</h3>
                </div>
                <span className={`text-sm font-medium ${isOverBudget ? "text-budget-red" : "text-gray-500"}`}>
                  {percentSpent.toFixed(0)}%
                </span>
              </div>
              
              <div className="mb-2">
                <Progress 
                  value={percentSpent} 
                  className={`${isOverBudget ? "bg-gray-100" : ""}`}
                />
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="font-medium">
                  Spent: <span className={isOverBudget ? "text-budget-red" : ""}>
                    {formatCurrency(goal.spent, currencyCode)}
                  </span>
                </span>
                <span className="font-medium">
                  Budget: {formatCurrency(goal.amount, currencyCode)}
                </span>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Remaining:</span>
                  <span className={`font-bold ${isOverBudget ? "text-budget-red" : "text-budget-green"}`}>
                    {isOverBudget 
                      ? `-${formatCurrency(Math.abs(remaining), currencyCode)}` 
                      : formatCurrency(remaining, currencyCode)
                    }
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Budget Goal Dialog */}
      <Dialog open={isGoalDialogOpen} onOpenChange={setIsGoalDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Budget Goal</DialogTitle>
            <DialogDescription>
              Create a new budget goal to track your spending.
            </DialogDescription>
          </DialogHeader>
          <AddBudgetGoalForm onSubmit={handleAddGoal} onCancel={handleCancelAddGoal} />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Budgets;
