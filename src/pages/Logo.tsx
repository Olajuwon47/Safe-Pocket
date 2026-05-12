const logos = [
  { label: "Savings" },
  { label: "Stocks" },
  { label: "Wallet" },
  { label: "Goals" },
  { label: "Bank" },
]

export default function Logo() {
  return (
    <div className="bg-gradient-to-r from-green-500 to-lime-700 py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-xl font-bold tracking-wide text-white sm:text-2xl">
          Empowering Smart Savers & Future Investors
        </h2>

        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {logos.map((logo) => (
            <div
              key={logo.label}
              className="flex items-center justify-center rounded-2xl bg-white/15 px-4 py-6 text-center text-sm font-medium text-white backdrop-blur"
            >
              {logo.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
