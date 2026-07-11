import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileQuestion, Home, Search } from "lucide-react";

const NotFound = () => {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white px-4 py-16 sm:px-6">
      <div className="mx-auto flex max-w-lg flex-col items-center text-center">
        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative flex h-40 w-40 items-center justify-center"
        >
          <div className="absolute h-32 w-32 rounded-full bg-red-50 blur-2xl" />

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 flex h-24 w-24 items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-lg shadow-gray-200/60"
          >
            <FileQuestion className="h-11 w-11 text-red-600" strokeWidth={1.5} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10, y: 10 }}
            animate={{ opacity: 1, x: 0, y: [10, 2, 10] }}
            transition={{
              opacity: { duration: 0.5, delay: 0.4 },
              x: { duration: 0.5, delay: 0.4 },
              y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
            }}
            className="absolute -left-2 bottom-2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-gray-100 bg-white shadow-md shadow-gray-200/60"
          >
            <Search className="h-4 w-4 text-red-600" />
          </motion.div>
        </motion.div>

        {/* 404 */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="mt-6 text-7xl font-bold tracking-tight text-black sm:text-8xl"
        >
          4<span className="text-red-600">0</span>4
        </motion.h1>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          className="mt-3 text-2xl font-semibold tracking-tight text-black sm:text-3xl"
        >
          Oops! Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
          className="mt-3 max-w-sm text-sm leading-relaxed text-gray-500 sm:text-base"
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
        >
          <Link to="/">
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-red-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm shadow-red-200 transition-shadow duration-200 hover:bg-red-700 hover:shadow-md hover:shadow-red-200"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </main>
  );
};

export default NotFound;
