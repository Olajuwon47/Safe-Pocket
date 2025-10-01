'use client'

import { useState } from 'react'

const faqs = [
  {
    question: 'What is Micro-Savings and how does it work?',
    answer:
      'Micro-Savings lets you save small amounts of money consistently. You can set savings goals or automate daily, weekly, or monthly contributions. Over time, these small deposits grow into significant savings without stressing your budget.',
  },
  {
    question: 'Can I withdraw my savings anytime?',
    answer:
      'Yes, you can withdraw your savings at any time. However, we encourage you to stay committed to your goals. For fixed-term savings plans, early withdrawals may affect your interest or growth potential.',
  },
  {
    question: 'Do you offer investment opportunities?',
    answer:
      'Absolutely! You can invest in stocks and curated savings goals. Our platform allows you to diversify your funds—whether you want to grow wealth in the stock market or secure funds for a specific target like education, travel, or emergencies.',
  },
  {
    question: 'Is my money safe?',
    answer:
      'Yes, your funds are secure. We use bank-level encryption, partner with trusted financial institutions, and follow strict compliance guidelines to protect your savings and investments.',
  },
  {
    question: 'How do I set a savings goal?',
    answer:
      'It’s simple! Head to the “Goals” section, choose your target amount and timeline, and we’ll help you track progress. You can automate contributions so you never miss a step toward your goal.',
  },
  {
    question: 'Can I start with any amount?',
    answer:
      'Yes! With Micro-Savings, you can start with as little as ₦100. Our goal is to make saving and investing easy, no matter your income level.',
  },
  {
    question: 'Do I earn interest on my savings?',
    answer:
      'Yes, depending on the savings plan you choose. Flexible savings earn modest interest, while fixed-term and investment-based savings can yield higher returns over time.',
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="pt-20 px-4 max-sm:px-3 max-md:px-6 max-w-4xl mx-auto">
      <h1 className="font-bold text-center text-2xl max-sm:text-lg mb-8">
        Get Answers to Frequently Asked Questions
      </h1>

      <div className="space-y-4">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border border-lime-400 bg-white px-4 py-2 shadow-sm transition-all duration-300 max-sm:text-sm max-md:text-base"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center text-left px-2 py-3 font-medium text-lime-800 focus:outline-none"
            >
              <span>{item.question}</span>
              <span
                className={`transform transition-transform ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}
              >
                ▼
              </span>
            </button>
            {openIndex === index && (
              <div className="px-3 py-2 bg-lime-50 text-gray-700 text-sm rounded-md max-sm:text-xs">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 🌐 Submit Your Question Form */}
      <div className="mt-16 bg-lime-50 mb-10 p-6 rounded-lg shadow-sm max-sm:p-4 max-md:px-6">
        <h2 className="text-xl font-bold text-lime-900 mb-4 max-sm:text-lg">
          Didn’t find your question? Ask us directly!
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            const form = e.target as HTMLFormElement
            const name = (form.elements.namedItem('name') as HTMLInputElement).value
            const email = (form.elements.namedItem('email') as HTMLInputElement).value
            const question = (form.elements.namedItem('question') as HTMLTextAreaElement).value

            if (!name || !email || !question) {
              alert('Please fill in all fields ✍️')
              return
            }

            // Simulate form submission
            alert('Thanks for your question! Our team will get back to you shortly.')
            form.reset()
          }}
          className="grid grid-cols-1 gap-5"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-lime-800 max-sm:text-xs">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="mt-1 block w-full rounded-md border border-lime-200 px-3.5 py-2 shadow-sm focus:ring-2 focus:ring-lime-400 max-sm:py-1.5 max-sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-lime-800 max-sm:text-xs">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1 block w-full rounded-md border border-lime-200 px-3.5 py-2 shadow-sm focus:ring-2 focus:ring-lime-400 max-sm:py-1.5 max-sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="question" className="block text-sm font-semibold text-lime-800 max-sm:text-xs">
              Message
            </label>
            <textarea
              name="question"
              id="question"
              rows={4}
              required
              className="mt-1 block w-full rounded-md border border-lime-200 px-3.5 py-2 shadow-sm focus:ring-2 focus:ring-lime-400 max-sm:py-1.5 max-sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-md bg-lime-300 px-4 py-2 text-white font-semibold shadow hover:bg-lime-800 transition max-sm:text-sm"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  )
}
