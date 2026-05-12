const features = [
  {
    title: "Set Savings Goals",
    description:
      "Plan for your dream vacation, education, or emergency fund with goal-based savings.",
    icon: "target",
  },
  {
    title: "Automated Micro-Savings",
    description:
      "Save small amounts daily, weekly, or from every transaction without lifting a finger.",
    icon: "piggy",
  },
  {
    title: "Smart Reminders",
    description:
      "Stay consistent with gentle nudges and notifications to keep you on track.",
    icon: "bell",
  },
  {
    title: "Savings Dashboard",
    description:
      "View your wallet balance, track progress, and see exactly how your savings grow.",
    icon: "chart",
  },
  {
    title: "Community Savings",
    description:
      "Join group savings plans (Ajo/Esusu) and achieve financial milestones together.",
    icon: "users",
  },
  {
    title: "Secure & Protected",
    description:
      "Your funds and data are safeguarded with bank-level security and encryption.",
    icon: "shield",
  },
]

function FeatureIcon({ name }: { name: string }) {
  const common = "h-6 w-6"
  switch (name) {
    case "target":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    case "piggy":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 11a5 5 0 1 1 10 0v3a5 5 0 1 1-10 0v-3Z" />
          <path d="M9 8V6" />
          <path d="M15 8V6" />
        </svg>
      )
    case "bell":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 17H9a3 3 0 0 1-3-3v-3a6 6 0 1 1 12 0v3a3 3 0 0 1-3 3Z" />
          <path d="M10 17a2 2 0 0 0 4 0" />
        </svg>
      )
    case "chart":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19h16" />
          <path d="M7 15v-4" />
          <path d="M12 15V7" />
          <path d="M17 15v-6" />
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
    default:
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="4" width="16" height="16" rx="4" />
        </svg>
      )
  }
}

export function Features() {
  return (
    <div className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 text-center lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          What You Can Do
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Build smarter saving habits and stay in control of your money.
        </p>

        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center rounded-2xl bg-gray-50 p-8 text-center shadow-sm transition hover:shadow-md"
            >
              <div className="mb-6 rounded-full bg-lime-100 p-4 text-lime-700">
                <FeatureIcon name={feature.icon} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-3 text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
