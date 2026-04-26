import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

export default function Projects() {
  const featuredCount = projects.filter((project) => project.featured).length;

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
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
}
