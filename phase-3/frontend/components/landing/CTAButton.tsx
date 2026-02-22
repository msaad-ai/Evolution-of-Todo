import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface CTAButtonProps {
  text: string;
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  ariaLabel?: string;
}

export default function CTAButton({
  text,
  href,
  variant = "primary",
  size = "md",
  fullWidth = false,
  ariaLabel,
}: CTAButtonProps) {
  const baseClasses =
    "font-semibold rounded-xl transition-all focus:outline-none active:scale-95";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    secondary:
      "bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700",
    outline:
      "bg-transparent text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:ring-4 focus:ring-blue-300 border-2 border-blue-600 dark:border-blue-400",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <Link
      href={href}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass}`}
      aria-label={ariaLabel || text}
    >
      {text}
    </Link>
  );
}
