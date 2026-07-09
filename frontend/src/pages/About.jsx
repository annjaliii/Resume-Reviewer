import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  Brain,
  ScanSearch,
  Zap,
  FileCheck2,
  ArrowRight,
} from "lucide-react";

const WHY_CHOOSE_US = [
  {
    icon: Brain,
    title: "AI Powered Analysis",
    description:
      "Advanced AI reviews your resume and identifies areas for improvement.",
  },
  {
    icon: ScanSearch,
    title: "ATS Friendly",
    description:
      "Optimize your resume to pass Applicant Tracking Systems successfully.",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description:
      "Receive actionable suggestions within seconds after uploading your resume.",
  },
  {
    icon: FileCheck2,
    title: "Professional Recommendations",
    description:
      "Improve formatting, readability, keywords, and overall resume quality.",
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

const About = () => {
  const navigate = useNavigate();

  const handleReviewResume = () => {
    navigate("/");
    // Wait for the Home page to mount, then scroll to the upload section
    setTimeout(() => {
      document
        .getElementById("upload-resume")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-1.5 text-sm font-medium text-red-600"
        >
          <Sparkles className="h-4 w-4" strokeWidth={2.25} />
          About Us
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mt-6 text-4xl font-bold tracking-tight text-black sm:text-5xl"
        >
          About <span className="text-red-600">AI Resume Reviewer</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg"
        >
          Resume Reviewer is an intelligent platform that helps students and
          professionals improve their resumes using AI-powered analysis. It
          provides ATS compatibility checks, resume feedback, and actionable
          suggestions to increase interview opportunities.
        </motion.p>
      </section>

      {/* Our Mission */}
      <section className="border-t border-gray-100 bg-gray-50/50">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:py-24"
        >
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Our Mission
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-600 sm:text-lg">
            Our mission is to simplify resume improvement by providing instant,
            AI-powered insights that help users build stronger resumes and stand
            out in today's competitive job market.
          </p>
        </motion.div>
      </section>

      {/* Why Choose AI Resume Reviewer */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Why Choose AI Resume Reviewer
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {WHY_CHOOSE_US.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={item}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-7 shadow-sm shadow-gray-100/80 transition-shadow duration-300 hover:shadow-2xl hover:shadow-gray-200/60"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 transition-colors duration-300 group-hover:bg-red-600">
                <Icon
                  className="h-6 w-6 text-red-600 transition-colors duration-300 group-hover:text-white"
                  strokeWidth={1.75}
                />
              </div>
              <h3 className="mt-6 text-base font-semibold tracking-tight text-black">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Call To Action */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl bg-black px-6 py-16 text-center shadow-xl shadow-gray-200 sm:px-12 sm:py-20"
        >
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-red-600/30 blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Improve Your Resume?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-300 sm:text-lg">
              Upload your resume and receive AI-powered feedback in seconds.
            </p>

            <button
              type="button"
              onClick={handleReviewResume}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-red-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm shadow-red-900/40 transition-all duration-200 hover:bg-red-700 hover:shadow-md hover:shadow-red-900/40 active:scale-[0.98]"
            >
              Review Resume
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default About;
