import React from "react";
import { FileText } from "lucide-react";

interface ResumeButtonProps {
  onClick: () => void;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

const ResumeButton: React.FC<ResumeButtonProps> = ({
  onClick,
  variant = "primary",
  size = "md",
  showIcon = true,
  className = "",
}) => {
  const baseStyles =
    "font-medium rounded-lg transition-colors flex items-center justify-center gap-2 focus:outline-none";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
  };

  const sizeStyles = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 sm:px-6 sm:py-2 text-sm sm:text-base",
    lg: "px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base",
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 16,
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      aria-label="View Resume"
    >
      {showIcon && <FileText size={iconSizes[size]} />}
      <span>View Resume</span>
    </button>
  );
};

export default ResumeButton;
