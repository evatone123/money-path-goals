
import Layout from "@/components/Layout";
import Summary from "@/components/Dashboard/Summary";
import SpendingChart from "@/components/Dashboard/SpendingChart";
import BudgetGoals from "@/components/Dashboard/BudgetGoals";
import RecentTransactions from "@/components/Dashboard/RecentTransactions";
import AddExpenseForm from "@/components/Expenses/AddExpenseForm";

const Index = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-gray-500">Welcome to your financial overview</p>
      </div>
      
      <Summary />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SpendingChart />
          <RecentTransactions />
        </div>
        
        <div className="space-y-6">
          <AddExpenseForm />
          <BudgetGoals />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
