import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600 shadow-sm shadow-red-200">
            <FileText className="h-5 w-5 text-white" strokeWidth={2.25} />
          </span>
          <span className="text-lg font-semibold tracking-tight text-black">
            AI Resume Reviewer
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-red-600"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            to="/get-started"
            className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-red-200 transition-all duration-200 hover:bg-red-700 hover:shadow-md hover:shadow-red-200"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-black transition-colors duration-200 hover:bg-gray-100 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-gray-100 bg-white md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4 sm:px-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50 hover:text-red-600"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/get-started"
                onClick={() => setIsOpen(false)}
                className="mt-2 rounded-full bg-red-600 px-5 py-2.5 text-center text-sm font-semibold text-white shadow-sm shadow-red-200 transition-colors duration-200 hover:bg-red-700"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
