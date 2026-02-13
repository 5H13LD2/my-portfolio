import React from "react";
import { Heart } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-8 lg:mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-center sm:text-left">
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} Jerico Jimenez. All rights
              reserved.
            </p>
          </div>

          {/* Built with love */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Built with</span>
            <Heart size={16} className="text-red-500 fill-current" />
            <span>using React & Tailwind CSS</span>
          </div>
        </div>

        {/* Additional info for mobile */}
        <div className="mt-4 pt-4 border-t border-gray-100 sm:hidden">
          <p className="text-xs text-gray-500 text-center">
            Full Stack Developer • Open to opportunities
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
