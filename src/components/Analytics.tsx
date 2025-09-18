import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";
import type { User, Goal } from "../types";

type AnalyticsProps = {
  userData: User;
};

const Analytics = ({ userData }: AnalyticsProps) => {
  // Calculate analytics data from the JSON
  const monthlySavings = userData.savings;
  const monthlyExpenses = 2840; // This would ideally come from your data
  const avgDailySpending = 94.67; // This would ideally come from your data
  
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
          <p className="text-muted-foreground">Insights into your spending patterns and savings progress</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Monthly Savings
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">${monthlySavings}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-success font-medium">+15%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Monthly Expenses
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">${monthlyExpenses}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-destructive font-medium">+5%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg. Daily Spending
              </CardTitle>
              <DollarSign className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">${avgDailySpending}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-warning font-medium">-2%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Goals on Track
              </CardTitle>
              <Target className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {userData.goals.filter((goal: Goal) => (goal.progress / goal.target) >= 0.5).length}/{userData.goals.length}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary font-medium">
                  {Math.round((userData.goals.filter((goal: Goal) => (goal.progress / goal.target) >= 0.5).length / userData.goals.length) * 100)}%
                </span> completion rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Rest of the component remains the same */}
      </main>
    </div>
  );
};

export default Analytics;