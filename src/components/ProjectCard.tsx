import React, { useState } from "react";
import { ExternalLink, Code2, ZoomIn } from "lucide-react";
import type { Project } from "../types/project";
import ImageModal from "./ImageModal";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  const previewImage = project.images[0];

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

          {/* Screenshot Preview */}
          {previewImage && (
            <div
              className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-100 mt-4 cursor-pointer"
              onClick={() => handleImageClick(0)}
            >
              <img
                src={previewImage}
                alt={`${project.title} preview screenshot`}
                className="w-full h-56 sm:h-64 object-cover"
              />
              {project.images.length > 1 && (
                <div className="absolute bottom-3 right-3 bg-black bg-opacity-60 text-white text-xs sm:text-sm px-2 py-1 rounded-full">
                  {project.images.length} screenshots
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity flex items-center justify-center opacity-0 hover:opacity-100">
                <div className="bg-white/90 text-gray-900 rounded-full px-3 py-2 text-xs sm:text-sm font-semibold">
                  View all screenshots
                </div>
              </div>
            </div>
          )}

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
              onClick={() => handleImageClick(0)}
              className="px-4 py-2 sm:px-6 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <ZoomIn size={16} />
              View Screenshots{project.images.length > 1 ? ` (${project.images.length})` : ""}
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

              {project.airflowUrl && (
                <a
                  href={project.airflowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 sm:px-6 sm:py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors font-medium flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
                >
                  <ExternalLink size={16} />
                  View Airflow UI
                </a>
              )}
            </div>
          </div>
        </div>

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
