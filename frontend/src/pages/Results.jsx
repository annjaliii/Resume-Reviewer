import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart3,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Sparkles,
  Download,
  RotateCcw,
  FileText,
} from "lucide-react";
import { generatePDFReport } from "../utils/pdfReport";

const TOTAL_SKILLS = 10;
const RADIUS = 70;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

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

const getStatus = (score) => {
  if (score >= 80) {
    return { label: "Excellent", bg: "bg-green-50", text: "text-green-600" };
  }
  if (score >= 60) {
    return { label: "Good", bg: "bg-yellow-50", text: "text-yellow-600" };
  }
  return {
    label: "Needs Improvement",
    bg: "bg-red-50",
    text: "text-red-600",
  };
};

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const analysis = location.state?.analysis;
  const filename = location.state?.filename;

  useEffect(() => {
    if (!analysis) {
      navigate("/");
    }
  }, [analysis, navigate]);

  const handleReviewAnother = () => {
    navigate("/");
    setTimeout(() => {
      document
        .getElementById("upload-resume")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  if (!analysis) {
    return null;
  }

  const SCORE = analysis.ats_score ?? 0;
  const MISSING_SKILLS = analysis.missing_skills ?? [];
  const AI_SUGGESTIONS = analysis.suggestions ?? [];
  const matchedSkills = TOTAL_SKILLS - MISSING_SKILLS.length;
  const status = getStatus(SCORE);

  const SUMMARY_CARDS = [
    { icon: BarChart3, label: "Resume Score", value: `${SCORE}%` },
    { icon: CheckCircle2, label: "Matched Skills", value: `${matchedSkills}` },
    {
      icon: XCircle,
      label: "Missing Skills",
      value: `${MISSING_SKILLS.length}`,
    },
    {
      icon: ShieldCheck,
      label: "ATS Friendly",
      value: SCORE >= 80 ? "Yes" : "No",
    },
  ];

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-1.5 text-sm font-medium text-red-600"
        >
          <Sparkles className="h-4 w-4" strokeWidth={2.25} />
          Analysis Complete
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mt-6 text-4xl font-bold tracking-tight text-black sm:text-5xl"
        >
          Resume Analysis Report
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg"
        >
          Your resume has been analyzed successfully. Review your ATS score,
          strengths, weaknesses and AI recommendations below.
        </motion.p>

        {filename && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: "easeOut" }}
            className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-gray-100 bg-gray-50 px-4 py-1.5 text-sm text-gray-500"
          >
            <FileText className="h-4 w-4 text-red-600" />
            <span className="font-medium text-black">Analyzed File:</span>
            {filename}
          </motion.div>
        )}
      </section>

      {/* ATS Score Card */}
      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-10 shadow-sm shadow-gray-100/80 sm:p-14"
        >
          <div className="relative flex h-48 w-48 items-center justify-center">
            <svg
              viewBox="0 0 160 160"
              className="h-full w-full -rotate-90 transform"
            >
              <circle
                cx="80"
                cy="80"
                r={RADIUS}
                fill="none"
                stroke="#F3F4F6"
                strokeWidth="12"
              />
              <motion.circle
                cx="80"
                cy="80"
                r={RADIUS}
                fill="none"
                stroke="#DC2626"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                initial={{ strokeDashoffset: CIRCUMFERENCE }}
                whileInView={{
                  strokeDashoffset:
                    CIRCUMFERENCE - (SCORE / 100) * CIRCUMFERENCE,
                }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
              />
            </svg>

            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-bold text-black">{SCORE}</span>
              <span className="text-sm font-medium text-gray-400">/ 100</span>
            </div>
          </div>

          <span
            className={`mt-6 inline-flex items-center gap-2 rounded-full ${status.bg} px-4 py-1.5 text-sm font-semibold ${status.text}`}
          >
            <CheckCircle2 className="h-4 w-4" />
            {status.label}
          </span>
        </motion.div>
      </section>

      {/* Summary Cards */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SUMMARY_CARDS.map(({ icon: Icon, label, value }) => (
            <motion.div
              key={label}
              variants={item}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="group flex h-full flex-col items-center rounded-2xl border border-gray-100 bg-white p-7 text-center shadow-sm shadow-gray-100/80 transition-shadow duration-300 hover:shadow-xl hover:shadow-gray-200/60"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 transition-colors duration-300 group-hover:bg-red-600">
                <Icon
                  className="h-6 w-6 text-red-600 transition-colors duration-300 group-hover:text-white"
                  strokeWidth={1.75}
                />
              </div>
              <span className="mt-5 text-2xl font-bold text-black">
                {value}
              </span>
              <span className="mt-1 text-sm text-gray-500">{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Missing Skills */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm shadow-gray-100/80"
        >
          <h3 className="text-lg font-semibold text-black">Missing Skills</h3>
          {MISSING_SKILLS.length > 0 ? (
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="mt-5 flex flex-wrap gap-3"
            >
              {MISSING_SKILLS.map((skill) => (
                <motion.span
                  key={skill}
                  variants={item}
                  whileHover={{ y: -2 }}
                  className="rounded-full border border-red-100 bg-red-50 px-4 py-1.5 text-sm font-medium text-red-600 transition-colors duration-200 hover:bg-red-100"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          ) : (
            <p className="mt-5 text-sm leading-relaxed text-gray-500">
              No missing skills detected.
            </p>
          )}
        </motion.div>
      </section>

      {/* AI Suggestions */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm shadow-gray-100/80 sm:p-10"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600">
              <Sparkles className="h-5 w-5 text-white" strokeWidth={2} />
            </div>
            <h3 className="text-lg font-semibold text-black">
              AI Recommendations
            </h3>
          </div>

          {AI_SUGGESTIONS.length > 0 ? (
            <ul className="mt-6 space-y-4">
              {AI_SUGGESTIONS.map((suggestion, index) => (
                <li
                  key={suggestion}
                  className="flex items-start gap-3 rounded-xl bg-gray-50 p-4 text-sm leading-relaxed text-gray-700"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  {suggestion}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 rounded-xl bg-gray-50 p-4 text-sm leading-relaxed text-gray-700">
              No suggestions. Your resume looks good.
            </p>
          )}
        </motion.div>
      </section>

      {/* Download Report */}
      <section className="mx-auto max-w-3xl px-4 pb-24 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.button
            type="button"
            onClick={() => generatePDFReport(analysis, filename)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm shadow-red-200 transition-shadow duration-200 hover:bg-red-700 hover:shadow-md hover:shadow-red-200 sm:w-auto"
          >
            <Download className="h-4 w-4" />
            Download PDF Report
          </motion.button>

          <motion.button
            type="button"
            onClick={handleReviewAnother}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 sm:w-auto"
          >
            <RotateCcw className="h-4 w-4" />
            Review Another Resume
          </motion.button>
        </motion.div>
      </section>
    </main>
  );
};

export default Results;