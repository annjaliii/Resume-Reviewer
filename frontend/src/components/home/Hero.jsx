import { motion } from "framer-motion";
import {
  Sparkles,
  PlayCircle,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  FileSearch,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8 lg:py-28">
        {/* Left content */}
        <div className="text-center lg:text-left">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-1.5 text-sm font-medium text-red-600"
          >
            <Sparkles className="h-4 w-4" strokeWidth={2.25} />
            AI Powered Resume Analysis
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.1}
            className="mt-6 text-4xl font-bold leading-[1.15] tracking-tight text-black sm:text-5xl lg:text-6xl"
          >
            Land More Interviews with{" "}
            <span className="text-red-600">AI Resume Reviewer</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.2}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg lg:mx-0"
          >
            Upload your resume and receive ATS score, AI feedback, missing
            skills, and actionable suggestions in seconds.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.3}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <button
              type="button"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm shadow-red-200 transition-all duration-200 hover:bg-red-700 hover:shadow-md hover:shadow-red-200 sm:w-auto"
            >
              Review Resume
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 sm:w-auto"
            >
              <PlayCircle className="h-4 w-4" />
              Watch Demo
            </button>
          </motion.div>
        </div>

        {/* Right illustration — card composition, no images */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative mx-auto flex h-[420px] w-full max-w-md items-center justify-center sm:h-[460px]"
        >
          {/* Background glow */}
          <div className="absolute h-72 w-72 rounded-full bg-red-50 blur-3xl" />

          {/* Main score card */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-72 rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/60"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">
                Resume Score
              </span>
              <FileSearch className="h-5 w-5 text-red-600" />
            </div>

            <div className="mt-4 flex items-end gap-2">
              <span className="text-4xl font-bold text-black">92</span>
              <span className="mb-1 text-sm font-medium text-gray-400">
                / 100
              </span>
            </div>

            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "92%" }}
                transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                className="h-full rounded-full bg-red-600"
              />
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm font-medium text-green-600">
              <TrendingUp className="h-4 w-4" />
              ATS Friendly
            </div>
          </motion.div>

          {/* Floating skill match card */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
            transition={{
              opacity: { duration: 0.6, delay: 0.6 },
              x: { duration: 0.6, delay: 0.6 },
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
            }}
            className="absolute left-0 top-6 z-20 w-48 rounded-xl border border-gray-100 bg-white p-4 shadow-lg shadow-gray-200/60 sm:-left-4"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-red-600" />
              <span className="text-xs font-semibold text-black">
                Skills Matched
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-500">12 of 14 keywords</p>
          </motion.div>

          {/* Floating suggestion card */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: -20 }}
            animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
            transition={{
              opacity: { duration: 0.6, delay: 0.8 },
              x: { duration: 0.6, delay: 0.8 },
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
            }}
            className="absolute bottom-8 right-0 z-20 w-48 rounded-xl border border-gray-100 bg-white p-4 shadow-lg shadow-gray-200/60 sm:-right-4"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-red-600" />
              <span className="text-xs font-semibold text-black">
                3 Suggestions
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Improve summary section</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
