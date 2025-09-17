// src/types.ts

// 💡 Progress / goals
export interface Goal {
  id: string
  title: string
  targetAmount: number
  currentAmount: number
  deadline: string
}

// 💡 For charts
export interface BreakdownData {
  daily: { date: string; amount: number }[]
  weekly: { week: string; amount: number }[]
  monthly: { month: string; amount: number }[]
}

// 💡 For transaction history
export interface Transaction {
  id: string
  type: "deposit" | "withdrawal" | "expense"
  amount: number
  date: string
  description?: string
}

// 💡 Main user type
export interface User {
  id: string
  name: string
  email: string
  walletBalance: number
  savings: number
  breakdown: BreakdownData
  goals: Goal[]
  transactions: Transaction[]
}
/*export interface User {
  id: number;
  name: string;
  email: string;
  walletBalance: number;
  goals: {
    title: string;
    target: number;
    progress: number;
  }[];
  transactions: {
    id: number;
    date: string;
    type: "deposit" | "withdrawal";
    amount: number;
    description: string;
  }[];
  breakdown: {
    daily: { date: string; amount: number }[];
    weekly: { week: string; amount: number }[];
    monthly: { month: string; amount: number }[];
  };
  savings: number;
}

export interface Transaction {
  id: number;
  date: string;
  type: "deposit" | "withdrawal";
  amount: number;
  description: string;
}

export type UserProfile = User;*/
