import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Logo = ({ variant = "default", clickable = true, size = "medium" }) => {
  const navigate = useNavigate();

  const sizeMap = {
    small: { container: "w-8 h-8", text: "text-sm", icon: "w-4 h-4" },
    medium: { container: "w-10 h-10", text: "text-base", icon: "w-6 h-6" },
    large: { container: "w-16 h-16", text: "text-2xl", icon: "w-8 h-8" },
    xlarge: { container: "w-20 h-20", text: "text-3xl", icon: "w-10 h-10" },
  };

  const { container, text, icon } = sizeMap[size];

  const handleClick = () => {
    if (clickable) {
      navigate("/");
    }
  };

  // Graduation Cap SVG Icon
  const GraduationCapIcon = () => (
    <svg
      className={`${icon} text-white`}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2L2 7v2h20V7L12 2m0 4L5.33 8.5L12 11.5l6.67-3-6.67-2.5M2 11v2h.5v4.5c0 1.1.9 2 2 2h17c1.1 0 2-.9 2-2V13H22v-2H2m2 2h16v4.5H4V13z" />
    </svg>
  );

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        onClick={handleClick}
        className={`${container} bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center shadow-lg ${
          clickable ? "cursor-pointer hover:shadow-xl transition-shadow" : ""
        }`}
      >
        <GraduationCapIcon />
      </motion.div>
    );
  }

  if (variant === "full") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={handleClick}
        className={`flex items-center space-x-2 sm:space-x-3 ${
          clickable ? "cursor-pointer" : ""
        }`}
      >
        <div
          className={`${container} bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center shadow-lg`}
        >
          <GraduationCapIcon />
        </div>
        <div className="hidden sm:block">
          <h1 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight">
            Smart Student Hub
          </h1>
          <p className="text-xs text-slate-500">Student Portal</p>
        </div>
      </motion.div>
    );
  }

  // Default variant - simple with text
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      onClick={handleClick}
      className={`flex items-center space-x-2 ${
        clickable ? "cursor-pointer" : ""
      }`}
    >
      <div
        className={`${container} bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center shadow-lg`}
      >
        <GraduationCapIcon />
      </div>
      <h1 className={`${text} font-bold text-slate-800 tracking-tight`}>
        Smart Student Hub
      </h1>
    </motion.div>
  );
};

export default Logo;
