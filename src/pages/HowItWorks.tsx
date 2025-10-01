import { CheckCircle } from "lucide-react"; // for nice icons

export function HowItWorks() {
  const steps = [
    {
      title: "1. Create an Account",
      description:
        "Sign up in minutes and set up your secure savings profile.",
    },
    {
      title: "2. Save Automatically",
      description:
        "Connect your bank or card and start saving small amounts effortlessly.",
    },
    {
      title: "3. Track Your Growth",
      description:
        "Use your personalized dashboard to see your money grow daily.",
    },
    {
      title: "4. Withdraw Anytime",
      description:
        "Enjoy full control — access your funds whenever you need them.",
    },
  ];

  return (
    <div className="bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          How It Works
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Saving money shouldn’t be complicated. We’ve simplified it into four
          easy steps.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <CheckCircle className="h-10 w-10 text-lime-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
