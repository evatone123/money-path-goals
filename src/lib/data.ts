
import { v4 as uuidv4 } from 'uuid';

// Types
export interface Budget {
  id: string;
  category: ExpenseCategory;
  limit: number;
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: ExpenseCategory;
  date: Date;
  type: 'expense' | 'income';
}

export interface Category {
  name: ExpenseCategory;
  color: string;
}

export interface BudgetGoal {
  id: string;
  category: ExpenseCategory;
  amount: number;
  spent: number;
}

export interface IncomeSource {
  id: string;
  name: string;
  amount: number;
  frequency: IncomeFrequency;
  date: Date;
}

export type ExpenseCategory =
  | "Food"
  | "Travel"
  | "Entertainment"
  | "Shopping"
  | "Utilities"
  | "Rent"
  | "Salary"
  | "Other";

export type IncomeFrequency = "one-time" | "weekly" | "bi-weekly" | "monthly" | "quarterly" | "annually";

// Data
export const expenseCategories: ExpenseCategory[] = [
  "Food",
  "Travel",
  "Entertainment",
  "Shopping",
  "Utilities",
  "Rent",
  "Other",
];

export const defaultBudgets: Budget[] = [
  {
    id: "1",
    category: "Food",
    limit: 300,
  },
  {
    id: "2",
    category: "Entertainment",
    limit: 200,
  },
  {
    id: "3",
    category: "Shopping",
    limit: 500,
  },
];

export const categories: Category[] = [
  { name: "Food", color: "#FF6384" },
  { name: "Travel", color: "#36A2EB" },
  { name: "Entertainment", color: "#FFCE56" },
  { name: "Shopping", color: "#4BC0C0" },
  { name: "Utilities", color: "#9966FF" },
  { name: "Rent", color: "#FF9F40" },
  { name: "Other", color: "#607D8B" },
];

export const categorySpending = [
  { name: "Food", value: 300, color: "#FF6384" },
  { name: "Travel", value: 150, color: "#36A2EB" },
  { name: "Entertainment", value: 200, color: "#FFCE56" },
  { name: "Shopping", value: 400, color: "#4BC0C0" },
  { name: "Utilities", value: 250, color: "#9966FF" },
];

export const budgetGoals: BudgetGoal[] = [
  {
    id: "goal-1",
    category: "Food",
    amount: 400,
    spent: 300
  },
  {
    id: "goal-2",
    category: "Entertainment",
    amount: 200,
    spent: 150
  },
  {
    id: "goal-3",
    category: "Shopping",
    amount: 500,
    spent: 550
  }
];

export const transactions: Transaction[] = [
  {
    id: "tx-1",
    amount: 45.5,
    description: "Grocery shopping",
    category: "Food",
    date: new Date(2024, 4, 1),
    type: "expense"
  },
  {
    id: "tx-2",
    amount: 80,
    description: "Restaurant dinner",
    category: "Food",
    date: new Date(2024, 4, 3),
    type: "expense"
  },
  {
    id: "tx-3",
    amount: 120,
    description: "Concert tickets",
    category: "Entertainment",
    date: new Date(2024, 4, 5),
    type: "expense"
  },
  {
    id: "tx-4",
    amount: 200,
    description: "New shoes",
    category: "Shopping",
    date: new Date(2024, 4, 10),
    type: "expense"
  },
  {
    id: "tx-5",
    amount: 150,
    description: "Electric bill",
    category: "Utilities",
    date: new Date(2024, 4, 15),
    type: "expense"
  }
];

export interface Income {
  id: string;
  amount: number;
  description: string;
  frequency: IncomeFrequency;
  date: string;
}

export const mockIncomes: Income[] = [
  {
    id: "income-1",
    amount: 5000,
    description: "Monthly Salary",
    frequency: "monthly",
    date: "2024-01-01",
  },
  {
    id: "income-2",
    amount: 1000,
    description: "Freelance Work",
    frequency: "one-time",
    date: "2024-01-15",
  },
  {
    id: "income-3",
    amount: 500,
    description: "Part-time job",
    frequency: "bi-weekly",
    date: "2024-01-20",
  },
];

export const incomeSources: IncomeSource[] = [
  {
    id: "src-1",
    name: "Full-time Job",
    amount: 5000,
    frequency: "monthly",
    date: new Date(2024, 4, 1)
  },
  {
    id: "src-2",
    name: "Freelance Work",
    amount: 1200,
    frequency: "monthly",
    date: new Date(2024, 4, 15)
  },
  {
    id: "src-3",
    name: "Investments",
    amount: 300,
    frequency: "monthly",
    date: new Date(2024, 4, 22)
  }
];

// Helper Functions
export const getCategoryColor = (categoryName: ExpenseCategory): string => {
  const category = categories.find(cat => cat.name === categoryName);
  return category ? category.color : "#607D8B"; // Default color if category not found
};

export const getTotalSpent = (): number => {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
};

export const getTotalBudget = (): number => {
  return defaultBudgets.reduce((sum, budget) => sum + budget.limit, 0);
};

export const getTotalIncome = (): number => {
  // For simplicity, we'll consider all monthly incomes
  return incomeSources.reduce((sum, source) => sum + source.amount, 0);
};

export const getMonthlyNetFlow = (): number => {
  return getTotalIncome() - getTotalSpent();
};

export const getRecentTransactions = (limit: number = 5): Transaction[] => {
  return [...transactions]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, limit);
};

export const getRecentIncome = (limit: number = 5): IncomeSource[] => {
  return [...incomeSources]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, limit);
};

