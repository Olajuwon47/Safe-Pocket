import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";

const Analytics = () => {
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
              <div className="text-2xl font-bold text-foreground">$1,250</div>
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
              <div className="text-2xl font-bold text-foreground">$2,840</div>
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
              <div className="text-2xl font-bold text-foreground">$94.67</div>
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
              <div className="text-2xl font-bold text-foreground">3/5</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary font-medium">60%</span> completion rate
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { category: "Food & Dining", amount: 850, percentage: 30, color: "bg-primary" },
                  { category: "Transportation", amount: 420, percentage: 15, color: "bg-success" },
                  { category: "Entertainment", amount: 380, percentage: 13, color: "bg-warning" },
                  { category: "Shopping", amount: 650, percentage: 23, color: "bg-destructive" },
                  { category: "Utilities", amount: 540, percentage: 19, color: "bg-secondary" }
                ].map((item) => (
                  <div key={item.category} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{item.category}</span>
                      <span className="text-muted-foreground">${item.amount}</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className={`${item.color} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Savings Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { goal: "Emergency Fund", current: 7500, target: 10000, color: "bg-primary" },
                  { goal: "Vacation Fund", current: 2300, target: 5000, color: "bg-success" },
                  { goal: "New Laptop", current: 1650, target: 2000, color: "bg-warning" }
                ].map((goal) => {
                  const percentage = (goal.current / goal.target) * 100;
                  return (
                    <div key={goal.goal} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{goal.goal}</span>
                        <span className="text-muted-foreground">
                          ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-3">
                        <div 
                          className={`${goal.color} h-3 rounded-full transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground text-right">
                        {percentage.toFixed(1)}% complete
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-lg border border-border">
                <div className="text-2xl font-bold text-success mb-2">+$1,250</div>
                <div className="text-sm text-muted-foreground">Total Saved This Month</div>
              </div>
              <div className="text-center p-4 rounded-lg border border-border">
                <div className="text-2xl font-bold text-destructive mb-2">-$2,840</div>
                <div className="text-sm text-muted-foreground">Total Spent This Month</div>
              </div>
              <div className="text-center p-4 rounded-lg border border-border">
                <div className="text-2xl font-bold text-primary mb-2">$360</div>
                <div className="text-sm text-muted-foreground">Net Savings This Month</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Analytics;