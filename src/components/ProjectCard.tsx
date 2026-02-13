import React, { useState } from "react";
import { ExternalLink, Code2, ZoomIn } from "lucide-react";
import type { Project } from "../types/project";
import ImageModal from "./ImageModal";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [showScreenshots, setShowScreenshots] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % project.images.length);
    }
  };

  const handlePrevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + project.images.length) %
          project.images.length,
      );
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
        <div className="p-4 sm:p-6 space-y-4">
          {/* Project Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="space-y-2">
            <span className="text-sm font-semibold text-gray-700">Stack:</span>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 sm:px-3 sm:py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 pt-2">
            <button
              onClick={() => setShowScreenshots(!showScreenshots)}
              className="px-4 py-2 sm:px-6 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base w-full sm:w-auto"
            >
              {showScreenshots ? "Hide Screenshots" : "View Screenshots"}
            </button>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 sm:px-6 sm:py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}

              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 sm:px-6 sm:py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
                >
                  <Code2 size={16} />
                  View Code
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Screenshots Section */}
        {showScreenshots && (
          <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50">
            <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
              Screenshots
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => handleImageClick(index)}
                >
                  <img
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="w-full h-auto object-contain bg-gray-100"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn
                        size={32}
                        className="text-white sm:w-12 sm:h-12"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImageIndex !== null && (
        <ImageModal
          images={project.images}
          currentIndex={selectedImageIndex}
          onClose={handleCloseModal}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
          projectTitle={project.title}
        />
      )}
    </>
  );
};

export default ProjectCard;
