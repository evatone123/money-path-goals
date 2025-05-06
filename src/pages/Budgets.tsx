
import { useState } from "react";
import Layout from "@/components/Layout";
import { budgetGoals, getCategoryColor, categories as initialCategories, Category } from "@/lib/data";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlusCircle, Category as CategoryIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import AddBudgetGoalForm from "@/components/Budgets/AddBudgetGoalForm";
import AddCategoryForm from "@/components/Categories/AddCategoryForm";
import { useToast } from "@/hooks/use-toast";

const Budgets = () => {
  const [goals, setGoals] = useState(budgetGoals);
  const [categories, setCategories] = useState(initialCategories);
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddGoal = (newGoal) => {
    setGoals([...goals, newGoal]);
    setIsGoalDialogOpen(false);
  };

  const handleCancelAddGoal = () => {
    setIsGoalDialogOpen(false);
  };
  
  const handleAddCategory = (newCategory) => {
    // Check if category with same name already exists
    if (categories.some(cat => cat.name.toLowerCase() === newCategory.name.toLowerCase())) {
      toast({
        title: "Error",
        description: "A category with this name already exists.",
        variant: "destructive"
      });
      return;
    }
    
    setCategories([...categories, newCategory]);
    setIsCategoryDialogOpen(false);
  };
  
  const handleCancelAddCategory = () => {
    setIsCategoryDialogOpen(false);
  };

  return (
    <Layout>
      <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold">Budget Goals</h2>
          <p className="text-gray-500">Track your spending against budget goals</p>
        </div>
        <div className="flex gap-3">
          <Button className="gradient-purple" onClick={() => setIsCategoryDialogOpen(true)}>
            <CategoryIcon className="mr-2 h-4 w-4" />
            Add Category
          </Button>
          <Button className="gradient-purple" onClick={() => setIsGoalDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Goal
          </Button>
        </div>
      </div>
      
      {/* Categories Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Categories</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((category) => (
            <div key={category.name} className="budget-card flex items-center p-4">
              <div 
                className="h-6 w-6 rounded-full mr-3" 
                style={{ backgroundColor: category.color }}
              ></div>
              <span className="font-medium">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Budget Goals Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map(goal => {
          const percentSpent = Math.min((goal.spent / goal.amount) * 100, 100);
          const isOverBudget = goal.spent > goal.amount;
          const remaining = goal.amount - goal.spent;
          
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
                    ${goal.spent.toFixed(2)}
                  </span>
                </span>
                <span className="font-medium">
                  Budget: ${goal.amount.toFixed(2)}
                </span>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Remaining:</span>
                  <span className={`font-bold ${isOverBudget ? "text-budget-red" : "text-budget-green"}`}>
                    {isOverBudget ? `-$${Math.abs(remaining).toFixed(2)}` : `$${remaining.toFixed(2)}`}
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
      
      {/* Add Category Dialog */}
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>
              Create a new expense category with a custom color.
            </DialogDescription>
          </DialogHeader>
          <AddCategoryForm onSubmit={handleAddCategory} onCancel={handleCancelAddCategory} />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Budgets;
