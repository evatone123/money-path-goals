
import { useState } from "react";
import Layout from "@/components/Layout";
import { transactions, categories } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import AddExpenseForm from "@/components/Expenses/AddExpenseForm";
import { useIsMobile } from "@/hooks/use-mobile";

const Expenses = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const isMobile = useIsMobile();
  
  const expenses = transactions.filter(t => t.type === 'expense');
  
  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Expenses</h2>
          <p className="text-gray-500">Manage your expenses</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="gradient-purple"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          {showAddForm ? "Cancel" : "Add Expense"}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          {showAddForm && (
            <div className="mb-6">
              <AddExpenseForm onClose={() => setShowAddForm(false)} />
            </div>
          )}
          <div className="budget-card">
            <h3 className="font-medium text-lg mb-4">All Expenses</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4 text-left">Date</th>
                    <th className="py-2 px-4 text-left">Description</th>
                    <th className="py-2 px-4 text-left">Category</th>
                    <th className="py-2 px-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map(expense => (
                    <tr key={expense.id} className="border-b">
                      <td className="py-3 px-4">{expense.date.toLocaleDateString()}</td>
                      <td className="py-3 px-4">{expense.description}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div 
                            className="h-3 w-3 rounded-full mr-2" 
                            style={{ backgroundColor: 
                              categories.find(c => c.name === expense.category)?.color || "#607D8B" 
                            }}
                          />
                          {expense.category}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right font-medium">
                        ${expense.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {!isMobile && !showAddForm && (
          <div>
            <AddExpenseForm />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Expenses;
