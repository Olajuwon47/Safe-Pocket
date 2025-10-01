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
    <div className="min-h-screen bg-gradient-to-b from-lime-50 via-white to-lime-100 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full">
        {!isSubscribed ? (
          // Subscription Form
          <div className="bg-white py-12 px-8 rounded-2xl shadow-xl border border-gray-100 text-center">
            <div className="flex justify-center mb-6">
              <BanknotesIcon className="h-16 w-16 text-lime-700" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              Start Your Wealth Journey 🚀
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Subscribe to get <span className="text-lime-700 font-medium">saving tips, 
              early access to stocks,</span> and updates on new <span className="font-medium">financial goals</span>.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="flex-1 px-5 py-3 rounded-lg border border-gray-300 bg-gray-50 placeholder-gray-400 focus:ring-2 focus:ring-lime-600 focus:border-lime-600 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your email address"
              />
              
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 rounded-lg bg-lime-700 text-white font-semibold hover:bg-lime-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Subscribing..." : "Join Now"}
              </button>
            </form>

            {error && (
              <p className="text-red-600 mt-3 text-sm">{error}</p>
            )}

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <ChartBarIcon className="h-10 w-10 text-blue-600 mb-2" />
                <p className="text-gray-700 text-sm">Exclusive savings insights</p>
              </div>
              <div className="flex flex-col items-center">
                <CheckCircleIcon className="h-10 w-10 text-lime-600 mb-2" />
                <p className="text-gray-700 text-sm">Early access to stocks</p>
              </div>
              <div className="flex flex-col items-center">
                <BanknotesIcon className="h-10 w-10 text-yellow-600 mb-2" />
                <p className="text-gray-700 text-sm">Smart saving challenges</p>
              </div>
            </div>

            <p className="mt-6 text-xs text-gray-400">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        ) : (
          // Thank You Page
          <div className="bg-white py-16 px-10 rounded-2xl shadow-xl border border-gray-100 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircleIcon className="h-20 w-20 text-green-500" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              You’re In! 🎉
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Welcome aboard the <span className="font-medium text-lime-700">Micro-Savings journey</span>.  
              You’ll get early access to our newest investment features, plus tips to grow your money.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button
                onClick={handleUnsubscribe}
                className="px-6 py-2 rounded-lg border border-red-600 text-red-600 hover:bg-red-50 transition"
              >
                Unsubscribe
              </button>
              <a
                href="/"
                className="px-6 py-2 rounded-lg bg-lime-700 text-white hover:bg-lime-800 transition"
              >
                Back to Home
              </a>
            </div>

            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What’s Next?
              </h3>
              <ul className="text-sm text-gray-600 space-y-2 text-left max-w-md mx-auto">
                <li>✅ Receive weekly savings & investment hacks</li>
                <li>✅ Early bird invites to stock & goal features</li>
                <li>✅ Be part of our smart money community</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
