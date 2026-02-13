import React from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageModalProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  projectTitle: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  projectTitle,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-300 transition-colors z-10 p-2 rounded-full bg-black bg-opacity-30 sm:bg-transparent"
        aria-label="Close modal"
      >
        <X size={24} className="sm:w-8 sm:h-8" />
      </button>

      {/* Previous Button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-2 sm:left-4 text-white hover:text-gray-300 transition-colors z-10 p-2 rounded-full bg-black bg-opacity-30 sm:bg-transparent"
          aria-label="Previous image"
        >
          <ChevronLeft size={32} className="sm:w-12 sm:h-12" />
        </button>
      )}

      {/* Image Container */}
      <div
        className="max-w-full max-h-full flex flex-col items-center justify-center px-12 sm:px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt={`${projectTitle} screenshot ${currentIndex + 1}`}
          className="max-w-full max-h-[calc(100vh-120px)] sm:max-h-[85vh] object-contain rounded-lg shadow-2xl"
        />

        {/* Image Counter */}
        <div className="mt-3 sm:mt-4 px-3 py-1 sm:px-4 sm:py-2 bg-black bg-opacity-50 rounded-full">
          <div className="text-white text-sm sm:text-lg font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>

      {/* Next Button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-2 sm:right-4 text-white hover:text-gray-300 transition-colors z-10 p-2 rounded-full bg-black bg-opacity-30 sm:bg-transparent"
          aria-label="Next image"
        >
          <ChevronRight size={32} className="sm:w-12 sm:h-12" />
        </button>
      )}

      {/* Mobile swipe hint */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 sm:hidden">
        <div className="px-3 py-1 bg-black bg-opacity-50 rounded-full">
          <p className="text-white text-xs">Swipe or tap buttons to navigate</p>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
