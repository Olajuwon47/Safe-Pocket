import { useInView } from "react-intersection-observer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "../index.css";

const testimonials = [
  {
    name: "Chinedu Okafor",
    title: "Small Business Owner",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "This app helped me save consistently for my shop expansion. I didn't realize small daily savings could add up so fast.",
  },
  {
    name: "Fatima Bello",
    title: "University Student",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "I was always struggling to save for school fees. Now I set my savings goals and watch my balance grow every week.",
  },
  {
    name: "David Johnson",
    title: "Freelance Developer",
    image: "https://randomuser.me/api/portraits/men/77.jpg",
    quote:
      "The automated micro-savings feature is a game changer. I hardly notice the deductions, but my emergency fund keeps growing.",
  },
  {
    name: "Aisha Mohammed",
    title: "NGO Worker",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    quote:
      "Before this, saving felt overwhelming. Now I've already reached my first travel savings goal ahead of schedule.",
  },
  {
    name: "Emeka Uchenna",
    title: "Corporate Analyst",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    quote:
      "I don't just save here, I also invest in stocks. It's simple, transparent, and I finally feel in control of my finances.",
  },
  {
    name: "Grace Okafor",
    title: "Medical Student",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    quote:
      "As a student with limited income, this app taught me financial discipline. I've saved ₦50,000 in just 3 months!",
  },
  {
    name: "Mohammed Ibrahim",
    title: "Taxi Driver",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    quote:
      "The daily auto-save from my earnings has helped me build an emergency fund for my family. No more borrowing for emergencies.",
  },
  {
    name: "Chiamaka Nwosu",
    title: "Fashion Designer",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    quote:
      "I used to spend all my profits. Now I automatically save 10% for new equipment and materials. Business has never been better!",
  },
  {
    name: "James Adekunle",
    title: "Teacher",
    image: "https://randomuser.me/api/portraits/men/28.jpg",
    quote:
      "The goal-setting feature helped me save for my wedding. We had our dream ceremony without going into debt.",
  },
  {
    name: "Bisi Adeyemi",
    title: "Market Trader",
    image: "https://randomuser.me/api/portraits/women/51.jpg",
    quote:
      "Small daily savings from my market sales have become a substantial amount. I can now invest in more goods to sell.",
  },
  {
    name: "Tunde Lawal",
    title: "Graphics Designer",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
    quote:
      "The round-up feature is genius! Saving spare change from transactions helped me buy a new laptop for my design work.",
  },
  {
    name: "Ngozi Eze",
    title: "Nurse",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    quote:
      "Working night shifts made it hard to track savings. This app does it automatically. I've saved ₦200,000 for my master's degree.",
  },
  {
    name: "Samuel Chukwu",
    title: "Content Creator",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    quote:
      "The investment feature allowed me to start with small amounts. My ₦5,000 investment has grown by 23% in 6 months.",
  },
  {
    name: "Aminat Yusuf",
    title: "Beautician",
    image: "https://randomuser.me/api/portraits/women/39.jpg",
    quote:
      "I save automatically from every client payment. Now I have enough to open my own beauty salon next month!",
  },
  {
    name: "Peter Okoro",
    title: "Delivery Rider",
    image: "https://randomuser.me/api/portraits/men/53.jpg",
    quote:
      "This app helped me break the paycheck-to-paycheck cycle. I now have 3 months of expenses saved up for the first time.",
  },
  {
    name: "Funke Adebayo",
    title: "Civil Servant",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
    quote:
      "The savings challenges made putting money aside fun. I completed 4 challenges and saved ₦120,000 for my children's school fees.",
  },
  {
    name: "Ibrahim Sani",
    title: "Barber",
    image: "https://randomuser.me/api/portraits/men/49.jpg",
    quote:
      "I save a small amount from every haircut. In one year, I've saved enough to renovate my barbershop and attract more customers.",
  },
  {
    name: "Sarah Thompson",
    title: "Freelance Writer",
    image: "https://randomuser.me/api/portraits/women/31.jpg",
    quote:
      "As a freelancer with irregular income, the flexible savings plan works perfectly. I save more during good months without pressure.",
  },
  {
    name: "Musa Abdullahi",
    title: "Farm Manager",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    quote:
      "The agricultural investment options helped me diversify. I'm earning returns while supporting local farmers in my community.",
  },
  {
    name: "Jennifer Obi",
    title: "HR Manager",
    image: "https://randomuser.me/api/portraits/women/42.jpg",
    quote:
      "I recommended this app to my entire team. We now have a savings challenge at work. Financial wellness improves productivity!",
  },
  {
    name: "Collins Nwachukwu",
    title: "Tech Support",
    image: "https://randomuser.me/api/portraits/men/38.jpg",
    quote:
      "The stock investment feature with small amounts got me into investing. Started with ₦2,000 and now have a diversified portfolio.",
  },
  {
    name: "Patience Okon",
    title: "Tailor",
    image: "https://randomuser.me/api/portraits/women/53.jpg",
    quote:
      "Saving small amounts daily helped me buy a new industrial sewing machine. My business capacity has doubled!",
  },
  {
    name: "Victor Martins",
    title: "Photographer",
    image: "https://randomuser.me/api/portraits/men/27.jpg",
    quote:
      "The app's visualization of my progress kept me motivated. Saved ₦300,000 for professional camera equipment in 8 months.",
  },
  {
    name: "Blessing Adewole",
    title: "Baker",
    image: "https://randomuser.me/api/portraits/women/36.jpg",
    quote:
      "Micro-saving from my daily sales helped me expand my bakery. I now supply to 3 restaurants in my area.",
  },
  {
    name: "Franklin Ojo",
    title: "Ride-share Driver",
    image: "https://randomuser.me/api/portraits/men/56.jpg",
    quote:
      "Automatic savings from each trip helped me maintain my car better and save for my driver's license upgrade.",
  }
];

export function Testimonal() {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        // If at the end, go back to start
        api.scrollTo(0);
      }
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", updateCurrent);
    return () => {
      api.off("select", updateCurrent);
    };
  }, [api]);

  return (
    <div className="mt-8 bg-gradient-to-b from-lime-100 via-white to-lime-200 px-4 max-sm:px-3 max-md:px-4 max-sm:mb-8 max-md:mb-10">
      {/* Heading */}
      <h1 className="font-bold text-center text-2xl max-sm:text-xl max-md:text-2xl mb-2 max-sm:mb-1 max-md:mb-2">
        What Our Users Say
      </h1>
      <p className="text-center text-gray-600 text-sm mb-6 max-sm:text-xs max-md:text-sm max-sm:mb-4 max-md:mb-5 max-sm:px-2 max-md:px-4">
        Thousands of people are saving smarter and investing with confidence. 
        Here's what a few of them had to say.
      </p>

      {/* Carousel with Auto-scroll */}
      <div className="w-full max-w-6xl mx-auto max-sm:max-w-full max-md:max-w-4xl">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
            dragFree: false,
          }}
          className="w-full relative"
        >
          <CarouselContent className="max-sm:-ml-2 max-md:-ml-3">
            {testimonials.map((t, i) => {
              const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

              return (
                <CarouselItem
                  key={i}
                  className="pl-2 md:pl-4 max-sm:pl-2 max-md:pl-3 max-sm:basis-full max-md:basis-1/2 lg:basis-1/3"
                >
                  <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.2 }}
                    className="bg-white mb-1.5 rounded-md shadow-md hover:shadow-lg transition-shadow p-5 max-sm:p-4 max-md:p-4 max-sm:mx-1"
                  >
                    <div className="flex items-center gap-4 max-sm:gap-3 max-md:gap-4 mb-4 max-sm:mb-3">
                      <img
                        src={t.image}
                        alt={`${t.name}'s Avatar`}
                        className="w-12 h-12 rounded-full object-cover max-sm:w-10 max-sm:h-10 max-md:w-11 max-md:h-11"
                      />
                      <div className="flex-1">
                        <h2 className="text-gray-900 font-semibold text-sm max-sm:text-xs max-md:text-sm">
                          {t.name}
                        </h2>
                        <p className="text-gray-500 text-xs max-sm:text-[10px] max-md:text-xs">
                          {t.title}
                        </p>
                        <div className="flex mt-1 max-sm:mt-0.5">
                          {[...Array(5)].map((_, j) => (
                            <span
                              key={j}
                              className="text-yellow-400 text-lg max-sm:text-xs max-md:text-base"
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm italic leading-relaxed max-sm:text-xs max-md:text-sm max-sm:leading-snug">
                      "{t.quote}"
                    </p>
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          
          {/* Navigation Buttons - Hidden on mobile */}
          <div className="max-sm:hidden">
            <CarouselPrevious className="max-md:left-2 max-md:scale-90" />
            <CarouselNext className="max-md:right-2 max-md:scale-90" />
          </div>
        </Carousel>

        {/* Progress Indicators */}
        <div className="flex justify-center items-center gap-2 mt-6 max-sm:mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                current === index ? "bg-lime-600 w-6" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Auto-scroll indicator */}
      <div className="flex justify-center items-center mt-4 max-sm:mt-3">
        <div className="flex items-center gap-2 text-gray-500 text-xs">
          <div className="flex items-center gap-1">
          </div>
        </div>
      </div>
    </div>
  );
}