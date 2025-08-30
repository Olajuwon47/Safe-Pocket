import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"

interface Goal {
  title: string
  target: number
  progress: number
}

interface GoalsProgressProps {
  goals: Goal[]
}

export function GoalsProgress({ goals }: GoalsProgressProps) {
  return (
    <div className="px-4 lg:px-6">
      <h2 className="text-xl font-semibold mb-4">Goals</h2>
      <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
        {goals.map((goal) => (
          <Card key={goal.title}>
            <CardHeader>
              <CardTitle>{goal.title}</CardTitle>
              <CardDescription>
                Target: ${goal.target.toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-muted-foreground">
                  Progress
                </span>
                <span className="text-sm font-medium">
                  ${goal.progress.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{
                    width: `${(goal.progress / goal.target) * 100}%`,
                  }}
                ></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
