'use client'

import Logo from './Logo'
import Subscribe from './Subscribe'
import { Testimonal } from './Testimonal'
import { HowItWorks } from './HowItWorks'
import { Features } from './Features'

export default function Home() {
  return (
    <div className="bg-white relative">
      {/* Hero Section */}
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            Save Smart. Live Better.
          </h1>
          <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl">
            Take control of your money with smarter savings, 
            smarter investments, and a path to true financial freedom.  
            Build wealth gradually through <span className="font-semibold ">micro-savings, goal-based budgeting, and stock investing</span> all in one secure app.
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
          <p className="mt-4 text-lg text-gray-600 leading-8">
            Start with <span className="font-semibold ">micro-savings</span> 
            to build discipline, then expand into <span className="font-semibold">custom savings goals</span>—like 
            travel, education, or buying your first home.  
            Track your <span className="font-semibold">progress in real time</span>, enjoy the power of 
            <span className="font-semibold"> compounding returns</span>, and unlock access to 
            <span className="font-semibold"> diverse investment opportunities</span>.  
            From budgeting smarter to investing wiser, our platform is designed to help you 
            achieve <span className="font-semibold ">financial stability, growth, and long-term security</span>.
          </p>
          <div className="mt-8 flex justify-center gap-6">
            <a
              href="/goals"
              className="rounded-lg bg-lime-500 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-lime-600 transition"
            >
              Start a Goal
            </a>
            <a
              href="/stocks"
              className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-gray-700 transition"
            >
              Explore Stocks
            </a>
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <Subscribe />

      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials */}
      <Testimonal />
    </div>
  )
}
