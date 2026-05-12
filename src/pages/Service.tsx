import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

type ServiceIconKind = "piggy" | "trend" | "target" | "users" | "book" | "card"

function ServiceIcon({ kind }: { kind: ServiceIconKind }) {
  const common = "h-12 w-12"
  switch (kind) {
    case "piggy":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 11a5 5 0 1 1 10 0v3a5 5 0 1 1-10 0v-3Z" />
          <path d="M9 8V6" />
          <path d="M15 8V6" />
        </svg>
      )
    case "trend":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 16l6-6 4 4 6-8" />
          <path d="M14 6h6v6" />
        </svg>
      )
    case "target":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    case "users":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 20a4 4 0 0 0-8 0" />
          <circle cx="13" cy="10" r="3" />
          <circle cx="7" cy="11" r="2.5" />
          <circle cx="18" cy="11" r="2.5" />
        </svg>
      )
    case "book":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Z" />
          <path d="M8 4v16" />
        </svg>
      )
    case "card":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 10h18" />
        </svg>
      )
  }
}

const services: { title: string; description: string; icon: ServiceIconKind; color: string }[] = [
  {
    title: "Automated Savings",
    description: "Save money effortlessly with automated direct debits, round-ups, and goal tracking.",
    icon: "piggy",
    color: "text-pink-500",
  },
  {
    title: "Investments",
    description: "Diversify your wealth with mutual funds, crypto, or fractional stocks, all in-app.",
    icon: "trend",
    color: "text-green-500",
  },
  {
    title: "Savings Goals",
    description: "Plan ahead, whether it is a vacation, education, or rainy-day fund.",
    icon: "target",
    color: "text-blue-500",
  },
  {
    title: "Community Savings",
    description: "Team up with friends, family, or colleagues to achieve shared financial goals faster.",
    icon: "users",
    color: "text-purple-500",
  },
  {
    title: "Learning Hub",
    description: "Boost your financial literacy with articles, videos, and gamified quizzes that reward learning.",
    icon: "book",
    color: "text-orange-500",
  },
  {
    title: "Seamless Payments",
    description: "Deposit and withdraw with ease via bank transfers, cards, or payment gateways.",
    icon: "card",
    color: "text-indigo-500",
  },
]

export default function Service() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 px-6 py-16">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="mt-8 text-4xl font-bold text-gray-900">Our Services</h2>
        <p className="mb-12 text-gray-600">
          Explore the tools that make saving, investing, and learning easier for everyone.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="rounded-2xl shadow-md transition hover:shadow-xl">
              <CardHeader className="flex flex-col items-center">
                <div className={service.color}>
                  <ServiceIcon kind={service.icon} />
                </div>
                <CardTitle className="mt-4 text-xl font-semibold">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
