import { motion } from "framer-motion";
import { BarChart3, Brain, Target } from "lucide-react";

const FEATURES = [
  {
    icon: BarChart3,
    title: "ATS Score Analysis",
    description:
      "Analyze your resume against ATS standards and improve your chances.",
  },
  {
    icon: Brain,
    title: "AI Resume Feedback",
    description: "Receive AI-powered suggestions to improve your resume.",
  },
  {
    icon: Target,
    title: "Missing Skills",
    description:
      "Identify missing skills based on your target job role.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const FeatureCards = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
          Everything you need to{" "}
          <span className="text-red-600">stand out</span>
        </h2>
        <p className="mt-4 text-base text-gray-600 sm:text-lg">
          Powerful AI analysis that turns your resume into an interview
          magnet.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <motion.div
            key={title}
            variants={item}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="group relative rounded-2xl border border-gray-100 bg-white p-8 shadow-sm shadow-gray-100 transition-shadow duration-300 hover:shadow-xl hover:shadow-gray-200/70"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 transition-colors duration-300 group-hover:bg-red-600">
              <Icon
                className="h-7 w-7 text-red-600 transition-colors duration-300 group-hover:text-white"
                strokeWidth={1.75}
              />
            </div>

            <h3 className="mt-6 text-lg font-semibold text-black">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {description}
            </p>

            {/* Subtle accent line on hover */}
            <span className="absolute inset-x-8 bottom-0 h-0.5 origin-left scale-x-0 rounded-full bg-red-600 transition-transform duration-300 group-hover:scale-x-100" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeatureCards;
