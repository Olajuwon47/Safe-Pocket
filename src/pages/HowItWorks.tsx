const steps = [
  {
    title: "1. Create an Account",
    description: "Sign up in minutes and set up your secure savings profile.",
  },
  {
    title: "2. Save Automatically",
    description: "Connect your bank or card and start saving small amounts effortlessly.",
  },
  {
    title: "3. Track Your Growth",
    description: "Use your personalized dashboard to see your money grow daily.",
  },
  {
    title: "4. Withdraw Anytime",
    description: "Enjoy full control and access your funds whenever you need them.",
  },
]

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10 text-lime-500" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
    </svg>
  )
}

export function HowItWorks() {
  return (
    <div className="bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          How It Works
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Saving money shouldn&apos;t be complicated. We&apos;ve simplified it into four easy steps.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-sm transition hover:shadow-md"
            >
              <CheckIcon />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
