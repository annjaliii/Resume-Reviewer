import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const formatSize = (bytes) => `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

const UploadBox = () => {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

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
    [validateAndSetFile]
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

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
        onDrop={handleDrop}
        className={`relative overflow-hidden rounded-2xl border-2 border-dashed bg-white p-10 text-center shadow-sm transition-all duration-300 sm:p-14 ${
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
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={
                  isDragging ? { y: -6, scale: 1.05 } : { y: 0, scale: 1 }
                }
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50"
              >
                <UploadCloud className="h-8 w-8 text-red-600" strokeWidth={1.75} />
              </motion.div>

              <h3 className="mt-6 text-lg font-semibold text-black">
                {isDragging ? "Drop your resume here" : "Drag & drop your resume"}
              </h3>
              <p className="mt-1.5 text-sm text-gray-500">
                or choose a file from your computer
              </p>

              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-red-200 transition-all duration-200 hover:bg-red-700 hover:shadow-md hover:shadow-red-200 active:scale-[0.98]"
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
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50">
                <CheckCircle2 className="h-8 w-8 text-green-600" strokeWidth={1.75} />
              </div>

              <h3 className="mt-6 text-lg font-semibold text-black">
                Resume ready
              </h3>

              <div className="mt-4 flex w-full max-w-sm items-center justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <FileText className="h-5 w-5 shrink-0 text-red-600" />
                  <div className="min-w-0 text-left">
                    <p className="truncate text-sm font-medium text-black">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemove}
                  aria-label="Remove file"
                  className="shrink-0 rounded-full p-1.5 text-gray-400 transition-colors duration-200 hover:bg-gray-200 hover:text-black"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-red-200 transition-all duration-200 hover:bg-red-700 hover:shadow-md hover:shadow-red-200 active:scale-[0.98]"
              >
                 Review Resume
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default UploadBox;
