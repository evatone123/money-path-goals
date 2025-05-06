import { Budget } from "@/types";

export type ExpenseCategory =
  | "Food"
  | "Travel"
  | "Entertainment"
  | "Shopping"
  | "Utilities"
  | "Rent"
  | "Salary"
  | "Other";

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

export const categorySpending = [
  { name: "Food", value: 300, color: "#FF6384" },
  { name: "Travel", value: 150, color: "#36A2EB" },
  { name: "Entertainment", value: 200, color: "#FFCE56" },
  { name: "Shopping", value: 400, color: "#4BC0C0" },
  { name: "Utilities", value: 250, color: "#9966FF" },
];

export type IncomeFrequency = "one-time" | "weekly" | "bi-weekly" | "monthly" | "quarterly" | "annually";

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
];
