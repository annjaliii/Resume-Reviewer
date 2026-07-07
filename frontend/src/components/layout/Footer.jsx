import { FileText } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6 lg:px-8">
        
       

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/annjaliii/Resume-Reviewer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 transition hover:text-red-600"
          >
            <FaGithub size={20} />
          </a>

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 transition hover:text-red-600"
          >
            <FaLinkedin size={20} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © {year} AI Resume Reviewer. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;