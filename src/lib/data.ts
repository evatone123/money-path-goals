// Types
export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  category: string;
  description: string;
  type: 'expense' | 'income';
}

export interface BudgetGoal {
  id: string;
  category: string;
  amount: number;
  spent: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface IncomeSource {
  id: string;
  name: string;
  amount: number;
  frequency: 'one-time' | 'weekly' | 'bi-weekly' | 'monthly' | 'annually';
  date: Date;
}

// Mock Data
export const categories: Category[] = [
  { id: "1", name: "Food", color: "#FF9800", icon: "utensils" },
  { id: "2", name: "Transport", color: "#2196F3", icon: "car" },
  { id: "3", name: "Entertainment", color: "#E91E63", icon: "film" },
  { id: "4", name: "Utilities", color: "#4CAF50", icon: "bolt" },
  { id: "5", name: "Shopping", color: "#9C27B0", icon: "shopping-bag" },
  { id: "6", name: "Health", color: "#F44336", icon: "heart" },
  { id: "7", name: "Other", color: "#607D8B", icon: "ellipsis-h" }
];

export const incomeSources: IncomeSource[] = [
  {
    id: "1",
    name: "Salary",
    amount: 4500,
    frequency: "monthly",
    date: new Date(2023, 4, 1)
  },
  {
    id: "2",
    name: "Freelance",
    amount: 800,
    frequency: "monthly",
    date: new Date(2023, 4, 15)
  },
  {
    id: "3",
    name: "Dividends",
    amount: 200,
    frequency: "quarterly",
    date: new Date(2023, 3, 10)
  }
];

export const transactions: Transaction[] = [
  {
    id: "1",
    date: new Date(2023, 4, 1),
    amount: 45.5,
    category: "Food",
    description: "Grocery shopping",
    type: "expense"
  },
  {
    id: "2",
    date: new Date(2023, 4, 2),
    amount: 30.0,
    category: "Transport",
    description: "Gas",
    type: "expense"
  },
  {
    id: "3",
    date: new Date(2023, 4, 3),
    amount: 20.0,
    category: "Entertainment",
    description: "Movie tickets",
    type: "expense"
  },
  {
    id: "4",
    date: new Date(2023, 4, 4),
    amount: 100.0,
    category: "Utilities",
    description: "Electricity bill",
    type: "expense"
  },
  {
    id: "5",
    date: new Date(2023, 4, 5),
    amount: 75.0,
    category: "Shopping",
    description: "New clothes",
    type: "expense"
  },
  {
    id: "6",
    date: new Date(2023, 4, 6),
    amount: 55.0,
    category: "Health",
    description: "Pharmacy",
    type: "expense"
  },
  {
    id: "7",
    date: new Date(2023, 4, 7),
    amount: 15.0,
    category: "Food",
    description: "Coffee shop",
    type: "expense"
  },
  {
    id: "8",
    date: new Date(2023, 4, 8),
    amount: 40.0,
    category: "Other",
    description: "Gift",
    type: "expense"
  },
  {
    id: "9",
    date: new Date(2023, 4, 1),
    amount: 4500.0,
    category: "Income",
    description: "Monthly salary",
    type: "income"
  },
  {
    id: "10",
    date: new Date(2023, 4, 15),
    amount: 800.0,
    category: "Income",
    description: "Freelance project",
    type: "income"
  }
];

export const budgetGoals: BudgetGoal[] = [
  { id: "1", category: "Food", amount: 500, spent: 350 },
  { id: "2", category: "Transport", amount: 200, spent: 170 },
  { id: "3", category: "Entertainment", amount: 150, spent: 50 },
  { id: "4", category: "Utilities", amount: 300, spent: 295 },
  { id: "5", category: "Shopping", amount: 200, spent: 210 },
];

export const monthlySpending = [
  { month: "Jan", amount: 1200 },
  { month: "Feb", amount: 1400 },
  { month: "Mar", amount: 1100 },
  { month: "Apr", amount: 1300 },
  { month: "May", amount: 1600 },
  { month: "Jun", amount: 1200 },
];

export const categorySpending = categories.map(category => {
  const spent = transactions
    .filter(t => t.category === category.name && t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  return {
    name: category.name,
    value: spent,
    color: category.color
  };
});

export const getTotalSpent = (): number => {
  return transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
};

export const getTotalIncome = (): number => {
  return transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
};

export const getTotalBudget = (): number => {
  return budgetGoals.reduce((sum, goal) => sum + goal.amount, 0);
};

export const getRecentTransactions = (limit: number = 5, type?: 'expense' | 'income'): Transaction[] => {
  return [...transactions]
    .filter(t => type ? t.type === type : true)
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, limit);
};

export const getRecentIncome = (limit: number = 5): Transaction[] => {
  return getRecentTransactions(limit, 'income');
};

export const getCategoryColor = (categoryName: string): string => {
  const category = categories.find(c => c.name === categoryName);
  return category ? category.color : "#607D8B"; // default to "Other" color
};

export const getMonthlyNetFlow = () => {
  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalSpent();
  return totalIncome - totalExpenses;
};
