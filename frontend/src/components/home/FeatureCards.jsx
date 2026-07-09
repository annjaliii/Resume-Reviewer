import { motion } from "framer-motion";
import { BarChart3, Brain, Target } from "lucide-react";

const FEATURES = [
  {
    icon: BarChart3,
    title: "ATS Score Analysis",
    description:
      "Analyze your resume against ATS standards and improve your chances of getting shortlisted.",
  },
  {
    icon: Brain,
    title: "AI Resume Feedback",
    description:
      "Receive AI-powered suggestions to improve content, formatting and readability.",
  },
  {
    icon: Target,
    title: "Missing Skills",
    description:
      "Identify important missing skills based on your target job role.",
  },
];

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

const FeatureCards = () => {
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
          Discover Powerful AI Features
        </h2>
        <p className="mt-4 text-base leading-relaxed text-gray-500 sm:text-lg">
          Everything you need to optimize your resume and increase your
          interview chances.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      >
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <motion.div
            key={title}
            variants={item}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-sm shadow-gray-100/80 transition-shadow duration-300 hover:shadow-2xl hover:shadow-gray-200/60"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 transition-colors duration-300 group-hover:bg-red-600">
              <Icon
                className="h-6 w-6 text-red-600 transition-colors duration-300 group-hover:text-white"
                strokeWidth={1.75}
              />
            </div>

            <h3 className="mt-6 text-lg font-semibold tracking-tight text-black">
              {title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              {description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeatureCards;
