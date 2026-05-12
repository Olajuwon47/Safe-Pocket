"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
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

const palette = [
  "rgb(132 204 22)",
  "rgb(34 197 94)",
  "rgb(14 165 233)",
  "rgb(234 179 8)",
  "rgb(244 63 94)",
]

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
    { name: "Spending", value: totalSpending, color: palette[0] },
    { name: "Savings", value: savings, color: palette[1] },
    { name: "Goals", value: totalGoals, color: palette[2] },
    { name: "Breakdown", value: totalBreakdown, color: palette[3] },
    { name: "Transactions", value: transactions.length, color: palette[4] },
  ]

  const total = chartData.reduce((acc, item) => acc + item.value, 0)

  let runningTotal = 0
  const segments = chartData
    .filter((item) => item.value > 0)
    .map((item) => {
      const start = runningTotal
      runningTotal += item.value
      const percentage = total === 0 ? 0 : item.value / total
      return { ...item, start, percentage }
    })

  const describeArc = (startAngle: number, endAngle: number) => {
    const toPoint = (angle: number) => {
      const radians = (angle * Math.PI) / 180
      const x = 50 + 45 * Math.cos(radians)
      const y = 50 + 45 * Math.sin(radians)
      return `${x} ${y}`
    }

    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0
    return [
      `M ${toPoint(startAngle)}`,
      `A 45 45 0 ${largeArcFlag} 1 ${toPoint(endAngle)}`,
      "L 50 50 Z",
    ].join(" ")
  }

  return (
    <Card className="mt-6 flex flex-col bg-lime-100">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-center">Spending Breakdown</CardTitle>
        <CardDescription />
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="mx-auto flex max-h-[300px] w-full flex-col gap-4">
          <div className="mx-auto aspect-square w-full max-w-[280px] rounded-full bg-white p-3 shadow-inner">
            <svg viewBox="0 0 100 100" className="h-full w-full" aria-label="Spending breakdown chart">
              {segments.length === 0 ? (
                <circle cx="50" cy="50" r="45" fill="rgb(226 232 240)" />
              ) : (
                segments.map((segment) => {
                  const startAngle = (segment.start / total) * 360 - 90
                  const endAngle = startAngle + segment.percentage * 360
                  return <path key={segment.name} d={describeArc(startAngle, endAngle)} fill={segment.color} />
                })
              )}
              <circle cx="50" cy="50" r="24" fill="rgb(247 254 231)" />
            </svg>
          </div>

          <div className="grid gap-2 text-black sm:grid-cols-2">
            {chartData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 rounded-lg bg-white/70 px-3 py-2">
                <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: item.color }} />
                <span className="text-sm font-medium">{item.name}</span>
                <span className="ml-auto text-sm tabular-nums">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
