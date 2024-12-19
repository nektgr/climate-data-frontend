import React from "react";
import { useTheme } from "../ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

/**
 * ThemeToggle Component
 * A button to toggle between dark and light modes.
 * Uses the `useTheme` hook to access the current theme and toggle function.
 */
const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme(); // Access theme state and toggle function

  return (
    <button
      onClick={toggleTheme} // Toggle theme on button click
      className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
      aria-label="Toggle theme" // Accessibility label for screen readers
    >
      {/* Render icon based on current theme */}
      {isDarkMode ? (
        <FaSun className="text-yellow-300" title="Switch to Light Mode" />
      ) : (
        <FaMoon className="text-blue-500" title="Switch to Dark Mode" />
      )}
    </button>
  );
};

export default ThemeToggle;
