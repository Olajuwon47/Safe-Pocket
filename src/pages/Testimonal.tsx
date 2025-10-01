import {} from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "../index.css";

const testimonials = [
  {
    name: "Chinedu Okafor",
    title: "Small Business Owner",
    image:
      "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "This app helped me save consistently for my shop expansion. I didn’t realize small daily savings could add up so fast.",
  },
  {
    name: "Fatima Bello",
    title: "University Student",
    image:
      "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "I was always struggling to save for school fees. Now I set my savings goals and watch my balance grow every week.",
  },
  {
    name: "David Johnson",
    title: "Freelance Developer",
    image:
      "https://randomuser.me/api/portraits/men/77.jpg",
    quote:
      "The automated micro-savings feature is a game changer. I hardly notice the deductions, but my emergency fund keeps growing.",
  },
  {
    name: "Aisha Mohammed",
    title: "NGO Worker",
    image:
      "https://randomuser.me/api/portraits/women/65.jpg",
    quote:
      "Before this, saving felt overwhelming. Now I’ve already reached my first travel savings goal ahead of schedule.",
  },
  {
    name: "Emeka Uchenna",
    title: "Corporate Analyst",
    image:
      "https://randomuser.me/api/portraits/men/12.jpg",
    quote:
      "I don’t just save here, I also invest in stocks. It’s simple, transparent, and I finally feel in control of my finances.",
  },
];

export function Testimonal() {
  return (
    <div className="mb-14 px-4 max-sm:px-2 max-md:px-4 max-sm:mb-8 max-md:mb-10">
      {/* Heading */}
      <h1 className="font-bold text-center text-2xl max-sm:text-lg max-md:text-xl mb-2 max-sm:mb-1 max-md:mb-2">
        What Our Users Say
      </h1>
      <p className="text-center text-gray-600 text-sm mb-6 max-sm:text-xs max-md:text-sm max-sm:mb-4 max-md:mb-5 px-3">
        Thousands of people are saving smarter and investing with confidence. 
        Here’s what a few of them had to say.
      </p>

      {/* Carousel */}
      <Carousel className="w-full max-w-6xl mx-auto max-sm:max-w-sm max-md:max-w-2xl">
        <CarouselContent className="-ml-2 gap-4 md:-ml-4 max-sm:-ml-1 max-sm:gap-2 max-md:-ml-2 max-md:gap-3">
          {testimonials.map((t, i) => {
            const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

            return (
              <CarouselItem
                key={i}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 max-sm:pl-1 max-sm:basis-full max-md:pl-2 max-md:basis-1/2"
              >
                <motion.div
                  ref={ref}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-5 max-sm:p-4 max-md:p-4"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={t.image}
                      alt={`${t.name}'s Avatar`}
                      className="w-12 h-12 rounded-full object-cover max-sm:w-10 max-sm:h-10"
                    />
                    <div className="flex-1">
                      <h2 className="text-gray-900 font-semibold text-sm max-sm:text-xs">
                        {t.name}
                      </h2>
                      <p className="text-gray-500 text-xs">{t.title}</p>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, j) => (
                          <span
                            key={j}
                            className="text-yellow-400 text-lg max-sm:text-sm"
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm italic leading-relaxed max-sm:text-xs">
                    "{t.quote}"
                  </p>
                </motion.div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="max-sm:hidden max-md:left-2" />
        <CarouselNext className="max-sm:hidden max-md:right-2" />
      </Carousel>
    
    </div>
  );
}
