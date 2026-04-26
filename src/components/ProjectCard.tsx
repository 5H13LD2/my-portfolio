import React, { useState } from "react";
import { ChevronUp, Code2, ExternalLink, Image as ImageIcon, Star, Wind } from "lucide-react";
import type { Project } from "../types/project";

interface ProjectCardProps {
  project: Project;
  onImageSelect?: (project: Project, imageIndex: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onImageSelect }) => {
  const [screenshotsOpen, setScreenshotsOpen] = useState(false);

  const toggleScreenshots = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScreenshotsOpen((prev) => !prev);
  };

  return (
    <>
      <div
        className={`project-card rounded-xl overflow-hidden border transition-all duration-200 hover:-translate-y-0.5 ${
          project.featured
            ? "bg-[#0d1420] border-[#1a2a40] hover:border-[#2a3a5a]"
            : "bg-[#111111] border-[#1e1e1e] hover:border-[#2a2a2a]"
        }`}
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-lg font-medium text-[#e0e0e0] leading-snug">{project.title}</h3>
            {project.featured && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#1a2a40] text-[#4d7cc7] text-[11px] font-medium flex-shrink-0">
                <Star size={10} fill="currentColor" /> Featured
              </span>
            )}
          </div>

          <p className="text-sm text-[#777] leading-[1.75] mb-4">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech) => (
              <span key={tech} className="px-2.5 py-1 rounded bg-[#0d1828] border border-[#1a2a40] text-[#4d7cc7] text-xs">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md border border-[#2a2a2a] text-[#888] text-xs hover:border-[#444] hover:text-[#e5e5e5] transition-colors">
                <Code2 size={12} />
                View Code
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md border border-[#2a2a2a] text-[#888] text-xs hover:border-[#444] hover:text-[#e5e5e5] transition-colors">
                <ExternalLink size={12} />
                Live
              </a>
            )}
            {project.airflowUrl && (
              <a href={project.airflowUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md border border-[#1a2a40] text-[#4d7cc7] text-xs hover:bg-[#1a2a40] transition-colors">
                <Wind size={12} />
                Airflow UI
              </a>
            )}
            {project.images.length > 0 && (
              <button
                onClick={toggleScreenshots}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs border transition-colors ${
                  screenshotsOpen
                    ? "border-[#2a4a70] bg-[#1a2a40] text-[#7aadff]"
                    : "border-[#1a2a40] bg-[#0d1828] text-[#4d7cc7] hover:border-[#2a4a70] hover:bg-[#1a2a40] hover:text-[#7aadff]"
                }`}
              >
                {screenshotsOpen ? (
                  <>
                    <ChevronUp size={12} />
                    Hide Screenshots
                  </>
                ) : (
                  <>
                    <ImageIcon size={12} />
                    View Screenshots ({project.images.length})
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {screenshotsOpen && project.images.length > 0 && (
          <div className="border-t border-[#1e1e1e] bg-[#0a0a0a] px-5 py-4">
            <p className="text-[10px] text-[#444] uppercase tracking-wider mb-2">Screenshots - click to enlarge</p>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-[#222]">
              {project.images.map((image, index) => (
                <button
                  key={image}
                  onClick={() => onImageSelect?.(project, index)}
                  className="w-[112px] h-[72px] rounded-md overflow-hidden flex-shrink-0 cursor-pointer border-[1.5px] border-transparent hover:border-[#4d7cc7] transition-colors"
                  title={`Screenshot ${index + 1}`}
                >
                  <img src={image} alt={`${project.title} screenshot ${index + 1}`} className="w-full h-full object-cover block" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectCard;
