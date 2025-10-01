import { PiggyBank, Target, Bell, BarChart3, ShieldCheck, Users } from "lucide-react";

export function Features() {
  const features = [
    {
      title: "Set Savings Goals",
      description:
        "Plan for your dream vacation, education, or emergency fund with goal-based savings.",
      icon: Target,
      color: "text-lime-500",
    },
    {
      title: "Automated Micro-Savings",
      description:
        "Save small amounts daily, weekly, or from every transaction without lifting a finger.",
      icon: PiggyBank,
      color: "text-pink-500",
    },
    {
      title: "Smart Reminders",
      description:
        "Stay consistent with gentle nudges and notifications to keep you on track.",
      icon: Bell,
      color: "text-orange-500",
    },
    {
      title: "Savings Dashboard",
      description:
        "View your wallet balance, track progress, and see exactly how your savings grow.",
      icon: BarChart3,
      color: "text-blue-500",
    },
    {
      title: "Community Savings",
      description:
        "Join group savings plans (Ajo/Esusu) and achieve financial milestones together.",
      icon: Users,
      color: "text-purple-500",
    },
    {
      title: "Secure & Protected",
      description:
        "Your funds and data are safeguarded with bank-level security and encryption.",
      icon: ShieldCheck,
      color: "text-green-600",
    },
  ];

  return (
    <div className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          What You Can Do
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Build smarter saving habits and stay in control of your money.
        </p>

        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <feature.icon className={`h-12 w-12 ${feature.color} mb-6`} />
              <h3 className="text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
