import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Project } from "../types/project";

interface ProjectImageDetailCardProps {
  project: Project;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ProjectImageDetailCard({
  project,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: ProjectImageDetailCardProps) {
  const currentImage = project.images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-5" onClick={onClose}>
      <button
        onClick={onClose}
        className="absolute right-3 top-3 z-20 rounded-full border border-white/10 bg-black/40 p-2 text-white transition-colors hover:text-gray-300 sm:right-5 sm:top-5"
        aria-label="Close image details"
      >
        <X size={24} />
      </button>

      {project.images.length > 1 && (
        <button
          onClick={(event) => {
            event.stopPropagation();
            onPrev();
          }}
          className="absolute left-3 z-20 rounded-full border border-white/10 bg-black/40 p-2 text-white transition-colors hover:text-gray-300 sm:left-5"
          aria-label="Previous screenshot"
        >
          <ChevronLeft size={34} className="sm:h-11 sm:w-11" />
        </button>
      )}

      <article className="image-detail-modal project-image-detail-card w-full max-w-[1180px] max-h-[92vh] overflow-y-auto rounded-xl border border-white/10 bg-[#0d0d0d] shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="border-b border-white/10 px-5 py-4 sm:px-6">
          <p className="mb-1 text-[11px] uppercase tracking-[0.18em] text-[#7aadff]">
            Screenshot {currentIndex + 1} of {project.images.length}
          </p>
          <h2 className="pr-8 text-lg font-semibold leading-snug text-[#f5f5f5] sm:text-xl">{project.title}</h2>
        </div>

        <div className="bg-black px-3 py-4 sm:px-6 sm:py-6">
          <img
            src={currentImage}
            alt={`${project.title} screenshot ${currentIndex + 1}`}
            className="mx-auto max-h-[58vh] w-full rounded-lg object-contain shadow-2xl"
          />
        </div>

        <div className="px-5 py-5 sm:px-6 sm:py-6">
          <p className="mb-4 text-sm leading-[1.8] text-[#b8b8b8] sm:text-base">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span key={tech} className="rounded border border-[#1a2a40] bg-[#0d1828] px-2.5 py-1 text-xs text-[#7aadff]">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </article>

      {project.images.length > 1 && (
        <button
          onClick={(event) => {
            event.stopPropagation();
            onNext();
          }}
          className="absolute right-3 z-20 rounded-full border border-white/10 bg-black/40 p-2 text-white transition-colors hover:text-gray-300 sm:right-5"
          aria-label="Next screenshot"
        >
          <ChevronRight size={34} className="sm:h-11 sm:w-11" />
        </button>
      )}
    </div>
  );
}
