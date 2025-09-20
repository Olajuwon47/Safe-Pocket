// types/index.ts
// ...existing code...
// src/types.ts

// 💡 Progress / goals
export interface Goal {
  id: string;
  title: string;
  target: number;
  progress: number;
}

// types.ts
export interface Transaction {
  id: string
  type: "deposit" | "withdrawal"
  amount: number
  status: string
  description: string
  date: string
}


// 💡 For charts
export interface BreakdownData {
  daily: { date: string; amount: number }[];
  weekly: { week: string; amount: number }[];
  monthly: { month: string; amount: number }[];
}



// 💡 Main user type
export interface User {
  id: string;
  name: string;
  email: string;
  walletBalance: number;
  savings: number;
  breakdown: BreakdownData;
  goals: Goal[];
  transactions: Transaction[];
}
