import React from "react";
import { useTheme } from "../ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
      aria-label="Toggle theme"
    >
      {isDarkMode ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-blue-500" />}
    </button>
  );
};

export default ThemeToggle;
