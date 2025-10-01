// src/pages/Service.tsx
import { PiggyBank, TrendingUp, Target, Users, BookOpen, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export default function Service() {
  const services = [
    {
      title: "Automated Savings",
      description:
        "Save money effortlessly with automated direct debits, round-ups, and goal tracking.",
      icon: PiggyBank,
      color: "text-pink-500",
    },
    {
      title: "Investments",
      description:
        "Diversify your wealth—buy mutual funds, crypto, or fractional stocks, all in-app.",
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      title: "Savings Goals",
      description:
        "Plan ahead—whether it’s a vacation, education, or rainy-day fund, we’ve got you covered.",
      icon: Target,
      color: "text-blue-500",
    },
    {
      title: "Community Savings",
      description:
        "Team up with friends, family, or colleagues to achieve shared financial goals faster.",
      icon: Users,
      color: "text-purple-500",
    },
    {
      title: "Learning Hub",
      description:
        "Boost your financial literacy with articles, videos, and gamified quizzes that reward learning.",
      icon: BookOpen,
      color: "text-orange-500",
    },
    {
      title: "Seamless Payments",
      description:
        "Deposit and withdraw with ease via bank transfers, cards, or payment gateways like Paystack & Flutterwave.",
      icon: CreditCard,
      color: "text-indigo-500",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
        <p className="text-gray-600 mb-12">
          Explore the powerful tools that make saving, investing, and learning easier for everyone.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card
              key={index}
              className="shadow-md hover:shadow-xl transition rounded-2xl"
            >
              <CardHeader className="flex flex-col items-center">
                <service.icon className={`w-12 h-12 ${service.color}`} />
                <CardTitle className="mt-4 text-xl font-semibold">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
