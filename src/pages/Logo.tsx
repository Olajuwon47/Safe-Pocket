// src/Pages/Logo.tsx

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

// Finance-related logos (fixed piggy bank URL)
const logos = [
  {
    src: "https://cdn-icons-png.flaticon.com/512/3135/3135706.png",
    alt: "Savings",
  },
  {
    src: "https://img.icons8.com/ios-filled/100/ffffff/stocks.png",
    alt: "Stocks",
  },
  {
    src: "https://img.icons8.com/ios-filled/100/ffffff/wallet.png",
    alt: "Wallet",
  },
  {
    src: "https://img.icons8.com/ios-filled/100/ffffff/goal.png",
    alt: "Goals",
  },
  {
    src: "https://img.icons8.com/ios-filled/100/ffffff/bank.png",
    alt: "Bank",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const beatFade: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1.1,
    transition: {
      duration: 1.8,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

export default function Logo() {
  return (
    <div className="bg-gradient-to-r from-green-500 to-lime-700 py-12 sm:py-20 max-sm:py-8 max-md:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-xl font-bold text-white tracking-wide 
                     max-sm:text-base max-md:text-lg"
        >
          Empowering Smart Savers & Future Investors 🚀
        </motion.h2>

        {/* Logos Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mx-auto mt-8 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 
                     sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5
                     max-sm:mt-6 max-sm:max-w-sm max-sm:grid-cols-2 max-sm:gap-x-4 max-sm:gap-y-6
                     max-md:mt-7 max-md:max-w-md max-md:grid-cols-3 max-md:gap-x-6 max-md:gap-y-8"
        >
          {logos.map((logo, i) => (
            <motion.img
              key={i}
              variants={beatFade}
              src={logo.src}
              alt={logo.alt}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 
                         max-sm:col-span-1 max-sm:max-h-8 
                         max-md:col-span-1 max-md:max-h-10"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
