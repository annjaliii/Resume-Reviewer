import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

const GoogleIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
    <path
      fill="#4285F4"
      d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.43 3.58v2.98h3.93c2.3-2.12 3.52-5.24 3.52-8.8z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.93-2.98c-1.09.73-2.5 1.16-4 1.16-3.08 0-5.68-2.08-6.61-4.87H1.34v3.06C3.31 21.3 7.34 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.39 14.4c-.24-.73-.38-1.5-.38-2.4s.14-1.67.38-2.4V6.54H1.34C.49 8.23 0 10.06 0 12s.49 3.77 1.34 5.46l4.05-3.06z"
    />
    <path
      fill="#EA4335"
      d="M12 4.77c1.76 0 3.34.61 4.58 1.79l3.48-3.48C17.94 1.19 15.24 0 12 0 7.34 0 3.31 2.7 1.34 6.54l4.05 3.06C6.32 6.85 8.92 4.77 12 4.77z"
    />
  </svg>
);

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};

    if (!formData.fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!formData.password) {
      nextErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.confirmPassword !== formData.password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);
    // UI only — no backend call wired up yet.
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white px-4 py-8 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/60 sm:p-8"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
          className="flex justify-center"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 shadow-sm shadow-red-200">
            <FileText className="h-4.5 w-4.5 text-white" strokeWidth={2.25} />
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="mt-4 text-center"
        >
          <h1 className="text-xl font-bold tracking-tight text-black">
            Create Your Account
          </h1>
          <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
            Join AI Resume Reviewer and start improving your resume with
            AI-powered analysis.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
          onSubmit={handleSubmit}
          noValidate
          className="mt-6 space-y-4"
        >
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="mb-1 block text-sm font-medium text-black"
            >
              Full Name
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange("fullName")}
                placeholder="Jane Doe"
                className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-4 text-sm text-black placeholder:text-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 ${
                  errors.fullName
                    ? "border-red-400 focus:ring-red-200"
                    : "border-gray-200 focus:border-red-400 focus:ring-red-100"
                }`}
              />
            </div>
            {errors.fullName && (
              <p className="mt-1 text-xs font-medium text-red-600">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-black"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
                placeholder="you@example.com"
                className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-4 text-sm text-black placeholder:text-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-400 focus:ring-red-200"
                    : "border-gray-200 focus:border-red-400 focus:ring-red-100"
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs font-medium text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-black"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange("password")}
                placeholder="••••••••"
                className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-11 text-sm text-black placeholder:text-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-400 focus:ring-red-200"
                    : "border-gray-200 focus:border-red-400 focus:ring-red-100"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 hover:text-black"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs font-medium text-red-600">
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-sm font-medium text-black"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange("confirmPassword")}
                placeholder="••••••••"
                className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-11 text-sm text-black placeholder:text-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 ${
                  errors.confirmPassword
                    ? "border-red-400 focus:ring-red-200"
                    : "border-gray-200 focus:border-red-400 focus:ring-red-100"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 hover:text-black"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs font-medium text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-red-600 py-3 text-sm font-semibold text-white shadow-sm shadow-red-200 transition-all duration-200 hover:bg-red-700 hover:shadow-md hover:shadow-red-200"
          >
            Create Account
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </motion.button>
        </motion.form>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          className="mt-5 flex items-center gap-3"
        >
          <span className="h-px flex-1 bg-gray-200" />
          <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Or
          </span>
          <span className="h-px flex-1 bg-gray-200" />
        </motion.div>

        {/* Google button */}
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="mt-4 flex w-full items-center justify-center gap-3 rounded-full border border-gray-200 bg-white py-3 text-sm font-semibold text-black transition-all duration-200 hover:border-gray-300 hover:bg-gray-50"
        >
          <GoogleIcon />
          Continue with Google
        </motion.button>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
          className="mt-5 text-center text-sm text-gray-500"
        >
          Already have an account?{" "}
          <a
            href="#"
            className="font-semibold text-red-600 transition-colors duration-200 hover:text-red-700"
          >
            Login
          </a>
        </motion.p>
      </motion.div>
    </main>
  );
};

export default Register;
