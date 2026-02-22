/**
 * Theme Variants Configuration
 *
 * Pre-configured color schemes for different brand aesthetics.
 * Copy the desired theme classes to your components.
 */

export const themeVariants = {
  // Default: Blue to Purple (Current)
  bluePurple: {
    gradient: {
      text: "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",
      bg: "bg-gradient-to-r from-blue-600 to-purple-600",
      bgLight: "bg-gradient-to-br from-blue-50 via-white to-purple-50",
      bgDark: "dark:from-gray-900 dark:via-gray-800 dark:to-gray-900",
      hover: "hover:from-blue-700 hover:to-purple-700",
    },
    primary: "blue-600",
    secondary: "purple-600",
    focus: "focus:ring-blue-300",
  },

  // Green to Teal (Nature/Health)
  greenTeal: {
    gradient: {
      text: "bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent",
      bg: "bg-gradient-to-r from-green-600 to-teal-600",
      bgLight: "bg-gradient-to-br from-green-50 via-white to-teal-50",
      bgDark: "dark:from-gray-900 dark:via-gray-800 dark:to-gray-900",
      hover: "hover:from-green-700 hover:to-teal-700",
    },
    primary: "green-600",
    secondary: "teal-600",
    focus: "focus:ring-green-300",
  },

  // Orange to Red (Energy/Action)
  orangeRed: {
    gradient: {
      text: "bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent",
      bg: "bg-gradient-to-r from-orange-600 to-red-600",
      bgLight: "bg-gradient-to-br from-orange-50 via-white to-red-50",
      bgDark: "dark:from-gray-900 dark:via-gray-800 dark:to-gray-900",
      hover: "hover:from-orange-700 hover:to-red-700",
    },
    primary: "orange-600",
    secondary: "red-600",
    focus: "focus:ring-orange-300",
  },

  // Pink to Purple (Creative/Playful)
  pinkPurple: {
    gradient: {
      text: "bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent",
      bg: "bg-gradient-to-r from-pink-600 to-purple-600",
      bgLight: "bg-gradient-to-br from-pink-50 via-white to-purple-50",
      bgDark: "dark:from-gray-900 dark:via-gray-800 dark:to-gray-900",
      hover: "hover:from-pink-700 hover:to-purple-700",
    },
    primary: "pink-600",
    secondary: "purple-600",
    focus: "focus:ring-pink-300",
  },

  // Cyan to Blue (Tech/Professional)
  cyanBlue: {
    gradient: {
      text: "bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent",
      bg: "bg-gradient-to-r from-cyan-600 to-blue-600",
      bgLight: "bg-gradient-to-br from-cyan-50 via-white to-blue-50",
      bgDark: "dark:from-gray-900 dark:via-gray-800 dark:to-gray-900",
      hover: "hover:from-cyan-700 hover:to-blue-700",
    },
    primary: "cyan-600",
    secondary: "blue-600",
    focus: "focus:ring-cyan-300",
  },

  // Indigo to Purple (Premium/Luxury)
  indigoPurple: {
    gradient: {
      text: "bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent",
      bg: "bg-gradient-to-r from-indigo-600 to-purple-600",
      bgLight: "bg-gradient-to-br from-indigo-50 via-white to-purple-50",
      bgDark: "dark:from-gray-900 dark:via-gray-800 dark:to-gray-900",
      hover: "hover:from-indigo-700 hover:to-purple-700",
    },
    primary: "indigo-600",
    secondary: "purple-600",
    focus: "focus:ring-indigo-300",
  },

  // Slate (Minimal/Professional)
  slate: {
    gradient: {
      text: "bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent",
      bg: "bg-gradient-to-r from-slate-700 to-slate-900",
      bgLight: "bg-gradient-to-br from-slate-50 via-white to-slate-100",
      bgDark: "dark:from-gray-900 dark:via-gray-800 dark:to-black",
      hover: "hover:from-slate-800 hover:to-black",
    },
    primary: "slate-700",
    secondary: "slate-900",
    focus: "focus:ring-slate-300",
  },

  // Emerald (Growth/Finance)
  emerald: {
    gradient: {
      text: "bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent",
      bg: "bg-gradient-to-r from-emerald-600 to-green-600",
      bgLight: "bg-gradient-to-br from-emerald-50 via-white to-green-50",
      bgDark: "dark:from-gray-900 dark:via-gray-800 dark:to-gray-900",
      hover: "hover:from-emerald-700 hover:to-green-700",
    },
    primary: "emerald-600",
    secondary: "green-600",
    focus: "focus:ring-emerald-300",
  },
};

/**
 * Usage Example:
 *
 * import { themeVariants } from './theme-variants';
 *
 * const theme = themeVariants.greenTeal;
 *
 * <h1 className={theme.gradient.text}>
 *   Your Brand Name
 * </h1>
 *
 * <button className={`${theme.gradient.bg} ${theme.gradient.hover}`}>
 *   Get Started
 * </button>
 */

/**
 * How to Apply a Theme:
 *
 * 1. Choose a theme from above
 * 2. Find all instances of gradient classes in your components
 * 3. Replace with the new theme's classes
 *
 * Example:
 *
 * OLD:
 * className="bg-gradient-to-r from-blue-600 to-purple-600"
 *
 * NEW (Green/Teal):
 * className="bg-gradient-to-r from-green-600 to-teal-600"
 *
 * Or use the theme object:
 * className={themeVariants.greenTeal.gradient.bg}
 */

export default themeVariants;
