import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import ProjectImageDetailCard from "../components/ProjectImageDetailCard";
import { projects } from "../data/projects";
import type { Project } from "../types/project";

function ProjectCardSkeleton() {
  return (
    <div className="project-skeleton rounded-xl border border-[#1e1e1e] bg-[#111111] overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="skeleton-line h-6 w-3/5 rounded" />
          <div className="skeleton-line h-6 w-20 rounded" />
        </div>
        <div className="space-y-2.5 mb-5">
          <div className="skeleton-line h-3.5 w-full rounded" />
          <div className="skeleton-line h-3.5 w-11/12 rounded" />
          <div className="skeleton-line h-3.5 w-4/5 rounded" />
        </div>
        <div className="flex flex-wrap gap-2 mb-5">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="skeleton-line h-7 w-20 rounded" />
          ))}
        </div>
        <div className="flex gap-2">
          <div className="skeleton-line h-8 w-28 rounded-md" />
          <div className="skeleton-line h-8 w-36 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<{ project: Project; imageIndex: number } | null>(null);
  const featuredCount = projects.filter((project) => project.featured).length;

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoading(false), 650);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  const handleNextImage = () => {
    setSelectedImage((current) => {
      if (!current) return current;
      return {
        project: current.project,
        imageIndex: (current.imageIndex + 1) % current.project.images.length,
      };
    });
  };

  const handlePrevImage = () => {
    setSelectedImage((current) => {
      if (!current) return current;
      return {
        project: current.project,
        imageIndex: (current.imageIndex - 1 + current.project.images.length) % current.project.images.length,
      };
    });
  };

  return (
    <main className="relative z-10 min-h-[calc(100vh-56px)]">
      <div className="max-w-[1220px] mx-auto px-5 sm:px-8 lg:px-10 py-16 w-full">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-10">
          <div>
            <p className="text-[11px] font-medium text-[#4d7cc7] uppercase tracking-[0.18em] mb-3">Portfolio</p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[#f0f0f0] mb-3">Projects</h1>
            <p className="text-base text-[#777] max-w-[680px]">
              Larger project cards with full descriptions, technology stacks, links, and screenshot galleries.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full max-w-[300px]">
            <div className="border border-[#1e1e1e] bg-[#111] rounded-xl p-4">
              <div className="text-2xl font-semibold text-[#e5e5e5]">{projects.length}</div>
              <div className="text-xs text-[#666]">Total projects</div>
            </div>
            <div className="border border-[#1e1e1e] bg-[#111] rounded-xl p-4">
              <div className="text-2xl font-semibold text-[#e5e5e5]">{featuredCount}</div>
              <div className="text-xs text-[#666]">Featured</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          {isLoading
            ? Array.from({ length: 4 }, (_, index) => <ProjectCardSkeleton key={index} />)
            : projects.map((project, index) => (
                <div key={project.id} className="project-card-enter" style={{ animationDelay: `${index * 0.07}s` }}>
                  <ProjectCard project={project} onImageSelect={(selectedProject, imageIndex) => setSelectedImage({ project: selectedProject, imageIndex })} />
                </div>
              ))}
        </div>
      </div>

      {selectedImage && (
        <ProjectImageDetailCard
          project={selectedImage.project}
          currentIndex={selectedImage.imageIndex}
          onClose={() => setSelectedImage(null)}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
        />
      )}
    </main>
  );
}
