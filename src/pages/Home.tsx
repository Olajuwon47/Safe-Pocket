'use client'

import Logo from './Logo'
import Subscribe from './Subscribe'
import { Testimonal } from './Testimonal'
import { HowItWorks } from './HowItWorks'
import { Features } from './Features'

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-lime-50 via-white to-lime-100 relative">
      {/* Hero Section */}
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight  text-gray-900 sm:text-7xl">
            Save Smart. Live Better.
          </h1>
          <p className="mt-4 text-md text-gray-500 sm:text-xl">
            Take control of your money with smarter savings, smarter investments, and a path to true financial freedom.  
            Build wealth gradually through micro-savings, goal-based budgeting, and stock investing all in one secure app.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/login-form"
              className="rounded-md bg-lime-500 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-400 transition"
            >
              Get Started
            </a>
            <a
              href="/Features"
              className="rounded-md bg-lime-500 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-400 transition"
            >
              Learn More →
            </a>
          </div>
        </div>
      </div>

      {/* Brand Logos */}
      <Logo />

      {/* Features */}
      <Features />

      {/* Savings Goals & Stocks Teaser */}
      <section className="bg-gray-50 py-20 px-6 sm:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text font-bold text-gray-900 sm:text">
            More than just saving
          </h2>
          <p className="mt-4 text-md text-gray-600 leading-8">
            Start with micro-savings to build discipline, then expand into custom savings goals like travel, education, or buying your first home. Track your progress in real time, enjoy the power of compounding returns, and unlock access to 
            diverse investment opportunities.From budgeting smarter to investing wiser, our platform is designed to help you achieve financial stability, growth, and long-term security.
          </p>
          <div className="mt-8 flex justify-center gap-6">
            <a
              href="/goals"
              className="rounded-lg bg-lime-500 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-black transition"
            >
              Start a Goal
            </a>
            <a
              href="/stocks"
              className="rounded-lg bg-lime-500 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-black transition"
            >
              Explore Stocks
            </a>
          </div>
        </div>
      </section>
      <Subscribe />
      <HowItWorks />
      <Testimonal />
    </div>
  )
}
