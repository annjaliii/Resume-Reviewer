import { motion } from "framer-motion";
import { UploadCloud, Cpu, BarChart3 } from "lucide-react";

const STEPS = [
  {
    icon: UploadCloud,
    title: "Upload Resume",
    description: "Add your resume as a PDF in seconds — no sign-up needed.",
  },
  {
    icon: Cpu,
    title: "AI Analysis",
    description: "Our AI scans your resume against real ATS parsing rules.",
  },
  {
    icon: BarChart3,
    title: "Get ATS Score & Suggestions",
    description: "Receive your score plus clear, actionable improvements.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 },
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

const HowItWorks = () => {
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
          How it <span className="text-red-600">works</span>
        </h2>
        <p className="mt-4 text-base text-gray-600 sm:text-lg">
          Three simple steps between your resume and your next interview.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6"
      >
        {/* Connecting line — desktop (horizontal) */}
        <div className="pointer-events-none absolute left-0 right-0 top-8 hidden sm:block">
          <div className="mx-auto h-px w-[calc(100%-8rem)] max-w-4xl bg-gray-200">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="h-full origin-left bg-red-600"
            />
          </div>
        </div>

        {STEPS.map(({ icon: Icon, title, description }, index) => (
          <motion.div
            key={title}
            variants={item}
            className="relative flex flex-col items-center text-center sm:px-4"
          >
            {/* Connecting line — mobile (vertical) */}
            {index !== STEPS.length - 1 && (
              <div className="absolute left-1/2 top-16 h-10 w-px -translate-x-1/2 bg-gray-200 sm:hidden">
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  className="h-full w-full origin-top bg-red-600"
                />
              </div>
            )}

            {/* Step icon */}
            <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-100 bg-white shadow-sm shadow-gray-100">
              <Icon className="h-7 w-7 text-red-600" strokeWidth={1.75} />
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white shadow-sm">
                {index + 1}
              </span>
            </div>

            <h3 className="mt-6 text-lg font-semibold text-black">{title}</h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-600">
              {description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HowItWorks;
