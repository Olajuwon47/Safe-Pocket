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
/*export interface Transaction {
  id: string
  type: "deposit" | "withdrawal"
  amount: number
  status: string
  description: string
  date: string
}*/

// types.ts
export interface Transaction {
  id: string
  type: "deposit" | "withdrawal"
  amount: number
  status: "successful" | "pending" | "failed"
  description: string
  date: string
}

/*export interface Analytics{
   savings: { num: number }[];
   transactions: { num: number }[];
   walletBalance: { num: number }[];
   goals: { title: string; target: number; progress: number }[];
   breakdown: { daily: { date: string; amount: number }[]; weekly: { week: string; amount: number }[]; monthly: { month: string; amount: number }[] }[];
}*/


// 💡 For charts
export interface BreakdownData {
  daily: { date: string; amount: number }[];
  weekly: { week: string; amount: number }[];
  monthly: { month: string; amount: number }[];
}



// 💡 Main user type
export interface User {
  avatar: string;
  id: string;
  name: string;
  email: string;
  walletBalance: number;
  savings: number;
  breakdown: BreakdownData;
  goals: Goal[];
  transactions: Transaction[];
  //analytics:Analytics[];
}
