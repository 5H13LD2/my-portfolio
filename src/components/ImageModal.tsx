import React from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageModalProps {
    images: string[]
    currentIndex: number
    onClose: () => void
    onNext: () => void
    onPrev: () => void
    projectTitle: string
}

const ImageModal: React.FC<ImageModalProps> = ({
    images,
    currentIndex,
    onClose,
    onNext,
    onPrev,
    projectTitle
}) => {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
                aria-label="Close modal"
            >
                <X size={32} />
            </button>

            {/* Previous Button */}
            {images.length > 1 && (
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onPrev()
                    }}
                    className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10"
                    aria-label="Previous image"
                >
                    <ChevronLeft size={48} />
                </button>
            )}

            {/* Image Container */}
            <div
                className="max-w-7xl max-h-[90vh] flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={images[currentIndex]}
                    alt={`${projectTitle} screenshot ${currentIndex + 1}`}
                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                />

                {/* Image Counter */}
                <div className="mt-4 text-white text-lg font-medium">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>

            {/* Next Button */}
            {images.length > 1 && (
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onNext()
                    }}
                    className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10"
                    aria-label="Next image"
                >
                    <ChevronRight size={48} />
                </button>
            )}
        </div>
    )
}

export default ImageModal
