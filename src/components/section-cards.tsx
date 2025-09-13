import { IconTrendingUp } from "@tabler/icons-react"
//import { SiteHeader } from "../components/site-header"
import { Badge } from "../components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Button } from "./ui/button"

interface SectionCardsProps {
  walletBalance: number
  savings: number
  onDeposit: () => void
  onWithdraw: () => void
}

export function SectionCards({ walletBalance, savings, onDeposit, onWithdraw }: SectionCardsProps) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs max-sm:px-2 max-sm:gap-3 md:px-6 @xl/main:grid-cols-2">
      <Card className="@container/card">
        <CardHeader className="bg-lime-200">
          <CardDescription>Wallet Balance</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums max-sm:text-xl @[250px]/card:text-3xl">
            ${walletBalance.toLocaleString()}
          </CardTitle>
          <CardAction>
           {/* <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>*/}
            <Button onClick={onDeposit}>Deposit</Button>
            <Button onClick={onWithdraw} variant="outline">Withdraw</Button>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Your current account balance
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="bg-lime-200">
          <CardDescription >Savings</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ${savings.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Your current savings
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
