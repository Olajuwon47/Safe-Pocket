"use client"

import { useMemo } from "react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "../components/ui/chart"
import type { ChartConfig } from "../components/ui/chart"
import type { Transaction } from "../types"

interface SpendingBreakdownChartProps {
  transactions: Transaction[]
  savings: number
  goals?: { title: string; target: number; progress: number }[]
  breakdown?: {
    daily: { date: string; amount: number }[]
    weekly: { week: string; amount: number }[]
    monthly: { month: string; amount: number }[]
  }
}

const chartConfig = {
  spending: {
    label: "Spending",
    color: "var(--chart-1)",
  },
  savings: {
    label: "Savings",
    color: "var(--chart-2)",
  },
  goals: {
    label: "Goals",
    color: "var(--chart-3)",
  },
  breakdown: {
    label: "Breakdown",
    color: "var(--chart-4)",
  },
  transactions: {
    label: "Transactions",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function SpendingBreakdownChart({
  transactions,
  savings,
  goals,
  breakdown,
}: SpendingBreakdownChartProps) {
  const totalSpending = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "withdrawal")
        .reduce((acc, t) => acc + t.amount, 0),
    [transactions]
  )

  const totalGoals = useMemo(
    () => (goals ? goals.reduce((acc, g) => acc + g.progress, 0) : 0),
    [goals]
  )

  const totalBreakdown = useMemo(() => {
    if (!breakdown) return 0
    return (
      breakdown.daily.reduce((a, d) => a + d.amount, 0) +
      breakdown.weekly.reduce((a, w) => a + w.amount, 0) +
      breakdown.monthly.reduce((a, m) => a + m.amount, 0)
    )
  }, [breakdown])

  const chartData = [
    { name: "spending", visitors: totalSpending, fill: chartConfig.spending.color },
    { name: "savings", visitors: savings, fill: chartConfig.savings.color },
    { name: "goals", visitors: totalGoals, fill: chartConfig.goals.color },
    { name: "breakdown", visitors: totalBreakdown, fill: chartConfig.breakdown.color },
    { name: "transactions", visitors: transactions.length, fill: chartConfig.transactions.color },
  ]

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-center">Spending Breakdown</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie data={chartData} dataKey="visitors" nameKey="name" />
            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center text-black"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
