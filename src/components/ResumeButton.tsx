import React from "react";
import { FileText } from "lucide-react";

interface ResumeButtonProps {
  onClick: () => void;

  showIcon?: boolean;
  className?: string;
}

const ResumeButton: React.FC<ResumeButtonProps> = ({
  onClick,

  showIcon = true,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 border border-[#2a2a2a] rounded-md text-[13px] text-[#ccc] hover:border-[#555] hover:text-[#e5e5e5] transition-all ${className}`}
      aria-label="View Resume"
    >
      {showIcon && <FileText size={14} />}
      <span>Resume</span>
    </button>
  );
};

export default ResumeButton;
