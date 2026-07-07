import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl bg-black px-6 py-16 text-center shadow-xl shadow-gray-200 sm:px-12 sm:py-20"
      >
        {/* Accent glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-red-600/30 blur-3xl" />

        <div className="relative">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Improve Your Resume?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-300 sm:text-lg">
            Get your free ATS score and AI-powered feedback in under a minute.
          </p>

          <button
            type="button"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-red-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm shadow-red-900/40 transition-all duration-200 hover:bg-red-700 hover:shadow-md hover:shadow-red-900/40 active:scale-[0.98]"
          >
            Review Resume
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
