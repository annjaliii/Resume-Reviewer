import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "Helped me improve my ATS score from 58 to 91. I received interview calls within a week.",
    name: "Sarah Johnson",
    role: "Software Engineer",
  },
  {
    quote:
      "The AI suggestions made my resume much more professional and readable.",
    name: "Michael Chen",
    role: "Data Analyst",
  },
  {
    quote:
      "Simple, fast and accurate. Every student should use this before applying.",
    name: "Priya Sharma",
    role: "MCA Student",
  },
];

const getInitials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const Testimonials = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
          Loved by Job Seekers
        </h2>
        <p className="mt-4 text-base leading-relaxed text-gray-500 sm:text-lg">
          Thousands of professionals have improved their resumes using our
          AI-powered resume reviewer.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      >
        {TESTIMONIALS.map(({ quote, name, role }) => (
          <motion.div
            key={name}
            variants={item}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-sm shadow-gray-100/80 transition-shadow duration-300 hover:shadow-2xl hover:shadow-gray-200/60"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-red-600 text-red-600"
                  />
                ))}
              </div>
              <Quote className="h-6 w-6 text-red-100" strokeWidth={1.5} />
            </div>

            <p className="mt-5 flex-1 text-sm leading-relaxed text-gray-600">
              "{quote}"
            </p>

            <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-sm font-semibold text-red-600 transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white">
                {getInitials(name)}
              </div>
              <div>
                <p className="text-sm font-semibold text-black">{name}</p>
                <p className="text-xs text-gray-500">{role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Testimonials;
