
import { useState } from "react";
import Layout from "@/components/Layout";
import { incomeSources, getRecentIncome } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import AddIncomeForm from "@/components/Income/AddIncomeForm";

const Income = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const recentIncome = getRecentIncome();
  
  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Income</h2>
          <p className="text-gray-500">Manage your income sources</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="gradient-purple"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          {showAddForm ? "Cancel" : "Add Income"}
        </Button>
      </div>
      
      {showAddForm && (
        <div className="mb-6">
          <AddIncomeForm onSuccess={() => setShowAddForm(false)} />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {incomeSources.map(source => (
          <div className="budget-card" key={source.id}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-lg">{source.name}</h3>
              <span className="bg-budget-green/10 text-budget-green text-xs px-2 py-1 rounded-full">
                {source.frequency}
              </span>
            </div>
            <p className="text-2xl font-bold">${source.amount.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-1">
              Last received: {source.date.toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
      
      <div className="budget-card">
        <h3 className="font-medium text-lg mb-4">Recent Income Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentIncome.map(income => (
                <tr key={income.id} className="border-b">
                  <td className="py-3 px-4">{income.date.toLocaleDateString()}</td>
                  <td className="py-3 px-4">{income.description}</td>
                  <td className="py-3 px-4 text-right font-medium text-budget-green">
                    +${income.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Income;
