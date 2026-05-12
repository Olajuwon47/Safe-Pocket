"use client"

import * as React from "react"
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group"

export interface BreakdownData {
  daily: { date: string; amount: number }[]
  weekly: { week: string; amount: number }[]
  monthly: { month: string; amount: number }[]
}

interface ChartAreaInteractiveProps {
  breakdown: BreakdownData
}

const RANGE_LABELS = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
} as const

function buildPath(points: { x: number; y: number }[]) {
  if (!points.length) return ""
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ")
}

export function ChartAreaInteractive({ breakdown }: ChartAreaInteractiveProps) {
  const [timeRange, setTimeRange] = React.useState<"daily" | "weekly" | "monthly">("monthly")

  const chartData = breakdown[timeRange].map((item) => {
    let dateLabel = ""
    if (timeRange === "daily" && "date" in item) dateLabel = item.date
    else if (timeRange === "weekly" && "week" in item) dateLabel = (item as any).week
    else if (timeRange === "monthly" && "month" in item) dateLabel = (item as any).month
    return { ...item, date: dateLabel }
  })

  const values = chartData.map((item) => item.amount)
  const min = Math.min(...values, 0)
  const max = Math.max(...values, 1)
  const points = chartData.map((item, index) => {
    const x = chartData.length > 1 ? (index / (chartData.length - 1)) * 100 : 50
    const normalized = max === min ? 0.5 : (item.amount - min) / (max - min)
    const y = 90 - normalized * 75
    return { x, y }
  })
  const linePath = buildPath(points)
  const areaPath = `${linePath} L 100 95 L 0 95 Z`

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Transaction Breakdown</CardTitle>
        <CardDescription>Showing transactions for the selected period</CardDescription>
        <CardAction className="bg-lime-200">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(value: "daily" | "weekly" | "monthly") => { if (value) setTimeRange(value) }}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="daily">{RANGE_LABELS.daily}</ToggleGroupItem>
            <ToggleGroupItem value="weekly">{RANGE_LABELS.weekly}</ToggleGroupItem>
            <ToggleGroupItem value="monthly">{RANGE_LABELS.monthly}</ToggleGroupItem>
          </ToggleGroup>
        </CardAction>
      </CardHeader>

      <div className="h-[250px] w-full rounded-xl bg-lime-100 px-4 py-4">
        <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" role="img" aria-label="Transaction breakdown chart">
          <defs>
            <linearGradient id="fillAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(132 204 22)" stopOpacity="0.65" />
              <stop offset="100%" stopColor="rgb(132 204 22)" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          {[0, 1, 2, 3].map((line) => (
            <line
              key={line}
              x1="0"
              x2="100"
              y1={20 + line * 20}
              y2={20 + line * 20}
              stroke="rgba(0,0,0,0.08)"
              strokeWidth="0.4"
            />
          ))}

          <path d={areaPath} fill="url(#fillAmount)" />
          <path
            d={linePath}
            fill="none"
            stroke="rgb(77 124 15)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map((point, index) => (
            <g key={index}>
              <circle cx={point.x} cy={point.y} r="1.5" fill="rgb(77 124 15)" />
            </g>
          ))}

          {chartData.map((item, index) => (
            <text
              key={item.date || index}
              x={points[index]?.x ?? 0}
              y="98"
              textAnchor="middle"
              fontSize="3"
              fill="rgba(0,0,0,0.55)"
            >
              {item.date}
            </text>
          ))}
        </svg>
      </div>
    </Card>
  )
}
