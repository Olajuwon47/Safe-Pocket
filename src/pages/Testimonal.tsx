const testimonials = [
  {
    name: "Chinedu Okafor",
    title: "Small Business Owner",
    quote:
      "This app helped me save consistently for my shop expansion. Small daily savings really do add up.",
  },
  {
    name: "Fatima Bello",
    title: "University Student",
    quote:
      "I finally have a savings goal I can stick to, and I can actually see my balance grow.",
  },
  {
    name: "David Johnson",
    title: "Freelance Developer",
    quote:
      "The automated micro-savings feature is a game changer. My emergency fund keeps growing.",
  },
  {
    name: "Aisha Mohammed",
    title: "NGO Worker",
    quote:
      "Saving felt overwhelming before. Now I&apos;ve already reached my first travel goal ahead of schedule.",
  },
  {
    name: "Emeka Uchenna",
    title: "Corporate Analyst",
    quote:
      "I don&apos;t just save here, I also invest. It&apos;s simple, transparent, and easy to manage.",
  },
  {
    name: "Grace Okafor",
    title: "Medical Student",
    quote:
      "As a student with limited income, this app taught me financial discipline and consistency.",
  },
]

export function Testimonal() {
  return (
    <section className="bg-gradient-to-b from-lime-100 via-white to-lime-200 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          What Our Users Say
        </h2>
        <p className="mt-3 text-center text-sm text-gray-600">
          Thousands of people are saving smarter and investing with confidence.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lime-100 font-semibold text-lime-800">
                  {testimonial.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-xs text-gray-500">{testimonial.title}</p>
                </div>
              </div>
              <p className="text-sm italic leading-relaxed text-gray-700">
                &quot;{testimonial.quote}&quot;
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
