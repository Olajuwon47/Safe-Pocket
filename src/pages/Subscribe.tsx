import { useState } from "react"

function Icon({ kind }: { kind: "bank" | "chart" | "check" }) {
  const common = "h-8 w-8 text-lime-700"
  if (kind === "chart") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19h16" />
        <path d="M7 15v-4" />
        <path d="M12 15V7" />
        <path d="M17 15v-6" />
      </svg>
    )
  }
  if (kind === "check") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="4" width="14" height="16" rx="2" />
      <path d="M8 8h8" />
      <path d="M8 12h8" />
      <path d="M8 16h5" />
    </svg>
  )
}

export default function Subscribe() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.")
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setIsSubscribed(true)
      setEmail("")
    } catch {
      setError("Something went wrong. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center bg-gradient-to-b from-lime-100 via-white to-lime-200 px-4 py-8">
      <div className="w-full max-w-2xl">
        {!isSubscribed ? (
          <div className="rounded-2xl border border-gray-100 bg-white px-6 py-8 text-center shadow-xl">
            <div className="mb-4 flex justify-center">
              <Icon kind="bank" />
            </div>

            <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              Start Your Wealth Journey
            </h1>
            <p className="mb-6 text-sm text-gray-600">
              Get saving tips, early stock access, and financial goal updates.
            </p>

            <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                placeholder="Enter your email address"
                className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm placeholder-gray-400 focus:border-lime-600 focus:ring-2 focus:ring-lime-600 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-lg bg-lime-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? "Subscribing..." : "Join Now"}
              </button>
            </form>

            {error && <p className="mb-3 text-xs text-lime-600">{error}</p>}

            <div className="mb-3 grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center">
                <Icon kind="chart" />
                <p className="text-xs text-gray-700">Savings insights</p>
              </div>
              <div className="flex flex-col items-center">
                <Icon kind="check" />
                <p className="text-xs text-gray-700">Early stock access</p>
              </div>
              <div className="flex flex-col items-center">
                <Icon kind="bank" />
                <p className="text-xs text-gray-700">Saving challenges</p>
              </div>
            </div>

            <p className="text-xs text-gray-400">No spam. Unsubscribe anytime.</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-100 bg-white px-6 py-10 text-center shadow-xl">
            <div className="mb-4 flex justify-center">
              <Icon kind="check" />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              You&apos;re In!
            </h1>
            <p className="mb-6 text-sm text-gray-600">
              Welcome to Micro-Savings. Get investment features and money growth tips.
            </p>
            <button
              onClick={() => setIsSubscribed(false)}
              className="rounded-md border border-lime-600 px-5 py-2 text-sm text-black transition hover:bg-black hover:text-white"
            >
              Unsubscribe
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
