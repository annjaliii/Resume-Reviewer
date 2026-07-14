import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { uploadResume } from "../../api/resumeApi";
import LoadingScreen from "../common/LoadingScreen";

const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const formatSize = (bytes) => `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

const UploadBox = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateAndSetFile = useCallback((selected) => {
    if (!selected) return;

    if (selected.type !== "application/pdf") {
      setError("Only PDF files are supported.");
      setFile(null);
      return;
    }

    if (selected.size > MAX_SIZE_BYTES) {
      setError(`File size must be under ${MAX_SIZE_MB}MB.`);
      setFile(null);
      return;
    }

    setError("");
    setFile(selected);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const dropped = e.dataTransfer.files?.[0];
      validateAndSetFile(dropped);
    },
    [validateAndSetFile],
  );

  const handleBrowseChange = (e) => {
    const selected = e.target.files?.[0];
    validateAndSetFile(selected);
  };

  const handleRemove = () => {
    setFile(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleAnalyze = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const result = await uploadResume(file);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      navigate("/results", {
        state: {
          analysis: result.analysis,
          filename: result.filename,
        },
      });
    } catch (err) {
      console.error(err);
      alert("Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <section
      id="upload-resume"
      className="mx-auto w-full max-w-2xl px-4 py-20 sm:px-6 lg:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-xl text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
          Upload Your Resume
        </h2>

        <p className="mt-4 text-base leading-relaxed text-gray-500 sm:text-lg">
          Upload your PDF and receive ATS score, AI feedback and resume
          improvement suggestions within seconds.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
        onDrop={handleDrop}
        className={`relative mt-12 overflow-hidden rounded-2xl border-2 border-dashed bg-white p-10 text-center shadow-sm transition-all duration-300 sm:p-14 ${
          isDragging
            ? "border-red-500 bg-red-50/50 shadow-lg shadow-red-100"
            : "border-gray-200 hover:border-red-300 hover:shadow-md hover:shadow-gray-100"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          onChange={handleBrowseChange}
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={
                  isDragging ? { y: -6, scale: 1.05 } : { y: 0, scale: 1 }
                }
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50"
              >
                <UploadCloud className="h-8 w-8 text-red-600" />
              </motion.div>

              <h3 className="mt-6 text-lg font-semibold text-black">
                {isDragging
                  ? "Drop your resume here"
                  : "Drag & drop your resume"}
              </h3>

              <p className="mt-1.5 text-sm text-gray-500">
                or choose a file from your computer
              </p>

              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700"
              >
                <FileText className="h-4 w-4" />
                Browse PDF
              </button>

              <p className="mt-5 text-xs font-medium text-gray-400">
                Supports PDF up to {MAX_SIZE_MB}MB
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="selected"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>

              <h3 className="mt-6 text-lg font-semibold text-black">
                Resume Ready
              </h3>

              <div className="mt-4 flex w-full max-w-sm items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-red-600" />

                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatSize(file.size)}
                    </p>
                  </div>
                </div>

                <button onClick={handleRemove}>
                  <X className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAnalyze}
                disabled={loading}
                className="mt-6 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
              >
                {loading ? "Analyzing..." : "Analyze Resume"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
          >
            <AlertCircle className="h-4 w-4" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default UploadBox;
