"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/ui/chart"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../components/ui/toggle-group"

interface BreakdownData {
  daily: { date: string; amount: number }[]
  weekly: { week: string; amount: number }[]
  monthly: { month: string; amount: number }[]
}

interface ChartAreaInteractiveProps {
  breakdown: BreakdownData
}

const chartConfig = {
  amount: {
    label: "Amount",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive({ breakdown }: ChartAreaInteractiveProps) {
  const [timeRange, setTimeRange] = React.useState<"daily" | "weekly" | "monthly">("monthly")

  const chartData = breakdown[timeRange].map((item) => {
    let dateLabel = ""
    if (timeRange === "daily" && "date" in item) dateLabel = item.date
    else if (timeRange === "weekly" && "week" in item) dateLabel = item.week
    else if (timeRange === "monthly" && "month" in item) dateLabel = item.month
    return { ...item, date: dateLabel }
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Transaction Breakdown</CardTitle>
        <CardDescription>
          Showing transactions for the selected period
        </CardDescription>
        <CardAction className="bg-lime-200">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(value: "daily" | "weekly" | "monthly") => {
              if (value) setTimeRange(value)
            }}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="daily">Daily</ToggleGroupItem>
            <ToggleGroupItem value="weekly">Weekly</ToggleGroupItem>
            <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
          </ToggleGroup>
        </CardAction>
      </CardHeader>
      <ChartContainer
  config={chartConfig}
  className="aspect-auto h-[250px] w-full bg-lime-100 rounded-xl"
>
  <AreaChart data={chartData}>
    <defs>
      <linearGradient id="fillAmount" x1="0" y1="0" x2="0" y2="1">
        <stop
          offset="5%"
          stopColor="var(--color-amount)"
          stopOpacity={0.8}
        />
        <stop
          offset="95%"
          stopColor="var(--color-amount)"
          stopOpacity={0.1}
        />
      </linearGradient>
    </defs>
    <CartesianGrid vertical={false} />
    <XAxis
      dataKey="date"
      tickLine={false}
      axisLine={false}
      tickMargin={8}
      minTickGap={32}
      tickFormatter={(value) => {
        if (timeRange === "daily") {
          const date = new Date(value)
          return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        }
        return value
      }}
    />
    <ChartTooltip
      cursor={false}
      content={
        <ChartTooltipContent
          labelFormatter={(value) => {
            if (timeRange === "daily") {
              return new Date(value).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            }
            return value
          }}
          indicator="dot"
        />
      }
    />
    <Area
      dataKey="amount"
      type="natural"
      fill="url(#fillAmount)"
      stroke="var(--color-amount)"
      stackId="a"
    />
  </AreaChart>
</ChartContainer>

    </Card>
  )
}
