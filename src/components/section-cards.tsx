"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "./ui/card"
//import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

function TrendUpIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mr-1 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 16l6-6 4 4 6-8" />
      <path d="M14 6h6v6" />
    </svg>
  )
}

function TrendDownIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mr-1 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 8l6 6 4-4 6 8" />
      <path d="M14 18h6v-6" />
    </svg>
  )
}

interface SectionCardsProps {
  walletBalance: number
  savings: number
  onDeposit: () => void
  onWithdraw: () => void
}

export function SectionCards({
  walletBalance,
  savings,
  //onDeposit,
  //onWithdraw,
}: SectionCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardDescription className=" # ">Wallet Balance</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">
            ${walletBalance.toFixed(2)}
          </CardTitle>
          <Badge variant="outline" className="mt-2">
            <TrendUpIcon /> Active
          </Badge>
        </CardHeader>
       {/* <CardFooter className="flex justify-between w-full">
          <Button size="sm" onClick={onDeposit} className="bg-gradient-to-r from-lime-500 via-teal-800 to-black ">
            Deposit
          </Button>
          <Button size="sm" onClick={onWithdraw} className="bg-gradient-to-r from-lime-500 via-teal-800 to-black ">
            Withdraw
          </Button>
        </CardFooter>*/}
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>Total Savings</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">
            ${savings.toFixed(2)}
          </CardTitle>
          <Badge variant="outline" className="mt-2">
            <TrendDownIcon /> Secured
          </Badge>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          Keep saving consistently to reach your goals.
        </CardFooter>
      </Card>
    </div>
  )
}
