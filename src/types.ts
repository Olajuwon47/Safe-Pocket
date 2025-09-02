export interface User {
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
