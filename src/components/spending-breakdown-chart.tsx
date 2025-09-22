"use client"

import * as React from "react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart"

import type { Transaction } from "../types"

interface SpendingBreakdownChartProps {
  transactions: Transaction[]
  savings: number
}

const chartConfig = {
  spending: {
    label: "Spending",
    color: "#ff8080",
  },
  savings: {
    label: "Savings",
    color: "#80ed99",
  },
} satisfies ChartConfig

export function SpendingBreakdownChart({
  transactions,
  savings,
}: SpendingBreakdownChartProps) {
  const totalSpending = React.useMemo(() => {
    return transactions
      .filter((t) => t.type === "withdrawal")
      .reduce((acc, t) => acc + t.amount, 0)
  }, [transactions])

  const chartData = [
    { name: "Spending", value: totalSpending, fill: "var(--color-spending)" },
    { name: "Savings", value: savings, fill: "var(--color-savings)" },
  ]

  return (
    <Card className="#">
      <CardHeader>
        <CardTitle>Spending vs. Savings</CardTitle>
        <CardDescription>
          A breakdown of your spending habits compared to your savings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
