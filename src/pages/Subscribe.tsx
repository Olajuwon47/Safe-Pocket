'use client'
import { useState } from 'react'
import { CheckCircleIcon, BanknotesIcon, ChartBarIcon } from '@heroicons/react/24/outline'

export default function Subscribe() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter a valid email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubscribed(true);
      setEmail('');
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsubscribe = () => {
    setIsSubscribed(false);
    setEmail('');
    setError('');
  };

  return (
    <div className="bg-gradient-to-b from-lime-100 via-white to-lime-200 flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        {!isSubscribed ? (
          // Compact Subscription Form
          <div className="bg-white py-8 px-6 rounded-2xl shadow-xl border border-gray-100 text-center">
            <div className="flex justify-center mb-4">
              <BanknotesIcon className="h-12 w-12 text-lime-700" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Start Your Wealth Journey 🚀
            </h1>
            <p className="text-gray-600 mb-6 text-sm">
              Get <span className="text-lime-700 font-medium">saving tips, 
              early stock access,</span> and <span className="font-medium">financial goal</span> updates.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 placeholder-gray-400 focus:ring-2 focus:ring-lime-600 focus:border-lime-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                placeholder="Enter your email address"
              />
              
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 rounded-lg bg-lime-500 text-white font-semibold hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isLoading ? "Subscribing..." : "Join Now"}
              </button>
            </form>

            {error && (
              <p className="text-lime-600 mb-3 text-xs">{error}</p>
            )}

            <div className="grid grid-cols-3 gap-4 mb-3">
              <div className="flex flex-col items-center">
                <ChartBarIcon className="h-8 w-8 text-lime-600 mb-1" />
                <p className="text-gray-700 text-xs">Savings insights</p>
              </div>
              <div className="flex flex-col items-center">
                <CheckCircleIcon className="h-8 w-8 text-lime-600 mb-1" />
                <p className="text-gray-700 text-xs">Early stock access</p>
              </div>
              <div className="flex flex-col items-center">
                <BanknotesIcon className="h-8 w-8 text-lime-600 mb-1" />
                <p className="text-gray-700 text-xs">Saving challenges</p>
              </div>
            </div>

            <p className="text-xs text-gray-400">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        ) : (
          // Compact Thank You Page
          <div className="bg-white py-10 px-6 rounded-2xl shadow-xl border border-gray-100 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircleIcon className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              You're In! 🎉
            </h1>
            <p className="text-gray-600 text-sm mb-6">
              Welcome to <span className="font-medium text-lime-700">Micro-Savings</span>.  
              Get investment features & money growth tips.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <button
                onClick={handleUnsubscribe}
                className="px-5 py-2 rounded-md border border-lime-600 text-black hover:bg-black transition text-sm"
              >
                Unsubscribe
              </button>
              <a
                href="/Home"
                className="px-5 py-2 rounded-lg bg-lime-200 text-white hover:bg-black transition text-sm"
              >
                Back to Home
              </a>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                What's Next?
              </h3>
              <ul className="text-xs text-gray-600 space-y-1 text-left max-w-md mx-auto">
                <li>✅ Weekly savings & investment hacks</li>
                <li>✅ Early bird stock & goal features</li>
                <li>✅ Join our money community</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}