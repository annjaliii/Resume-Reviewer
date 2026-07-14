import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
          className="flex justify-center"
        >
          <Loader2 className="h-16 w-16 text-red-600" />
        </motion.div>

        <h2 className="mt-6 text-2xl font-bold text-black">
          Analyzing Resume...
        </h2>

        <p className="mt-2 text-gray-500">
          Please wait while AI reviews your resume.
        </p>

        <div className="mt-8 w-72 overflow-hidden rounded-full bg-gray-200">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="h-2 bg-red-600"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;