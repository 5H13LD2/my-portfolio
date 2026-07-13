import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowRight, BriefcaseBusiness, CalendarDays, ExternalLink, Github, Linkedin, Mail, MapPin, MessageSquare, Star } from "lucide-react";
import { experience } from "../data/experience";
import { projects } from "../data/projects";
import { team, type TeamMember } from "../data/team";
import { useFeedback } from "../hooks/useFeedback";
import type { Feedback } from "../types/feedback";
import type { Experience } from "../types/experience";
import type { Project } from "../types/project";
import UserAvatar from "../components/UserAvatar";

type HomeProps = {
  onNavigateToProjects: () => void;
  onNavigateToAbout: () => void;
  onNavigateToFeedback: () => void;
  onNavigateToContact: () => void;
};

const stats = [
  ["200k+", "records processed"],
  ["7", "portfolio projects"],
  ["6", "certifications"],
];

const fallbackFeedback: Feedback[] = [
  {
    id: "fallback-feedback-1",
    name: "Juan dela Cruz",
    email: "sample@gmail.com",
    organization: "LICA Group of Companies - Gulong.ph",
    userType: "Client",
    message: "Very accommodating and mabilis gumawa. Professional kausap from start to finish.",
    star: 5,
    date: new Date(),
  },
  {
    id: "fallback-feedback-2",
    name: "Client Partner",
    email: "client@example.com",
    organization: "Simplevia Technologies Inc.",
    userType: "Client",
    message: "Great work. My web app works smoothly and everything functions well.",
    star: 5,
    date: new Date(),
  },
  {
    id: "fallback-feedback-3",
    name: "Project Owner",
    email: "owner@example.com",
    organization: "New Era University",
    userType: "Project Owner",
    message: "Highly recommended. Clear communication, detailed output, and easy to work with.",
    star: 5,
    date: new Date(),
  },
];

const getFeaturedProjects = () => {
  const featured = projects.filter((project) => project.featured);
  const remaining = projects.filter((project) => !project.featured);
  return [...featured, ...remaining].slice(0, 3);
};

function SectionHeader({
  eyebrow,
  title,
  actionLabel,
  onAction,
}: {
  eyebrow: string;
  title: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <div className="flex items-end justify-between gap-5 mb-9">
      <div>
        <p className="text-[11px] font-semibold text-[#d8d8d8] uppercase tracking-[0.22em] mb-3">{eyebrow}</p>
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0f0f0]">{title}</h2>
      </div>
      <button onClick={onAction} className="hidden sm:inline-flex items-center gap-2 text-sm text-[#f1f1f1] hover:text-[#7aadff] transition-colors">
        {actionLabel}
        <ArrowRight size={15} className="-rotate-45" />
      </button>
    </div>
  );
}

function FeaturedProjectCard({ project }: { project: Project }) {
  const previewImage = project.images[0] ?? "/profile.jpg";

  return (
    <article className="group rounded-xl border border-[#232323] bg-[#0d0d0d] overflow-hidden transition-all hover:-translate-y-1 hover:border-[#3a3a3a]">
      <div className="aspect-[16/9] overflow-hidden bg-[#111]">
        <img src={previewImage} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-[#f0f0f0] mb-2">{project.title}</h3>
        <p className="text-sm text-[#999] leading-[1.7] line-clamp-2 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.slice(0, 4).map((tech) => (
            <span key={tech} className="rounded-full bg-[#2a2a2a] px-3 py-1 text-[11px] font-semibold text-[#f2f2f2]">
              {tech}
            </span>
          ))}
        </div>
        <button className="inline-flex items-center gap-2 text-sm font-semibold text-[#f5f5f5]">
          <ExternalLink size={14} />
          View on Projects
        </button>
      </div>
    </article>
  );
}

function FeedbackPreviewCard({ item }: { item: Feedback }) {
  const formattedDate = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(item.date);

  return (
    <article className="w-[300px] sm:w-[340px] flex-shrink-0 rounded-xl border border-[#232323] bg-[#0d0d0d] p-6">
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="flex gap-0.5 text-[#facc15]" aria-label={`${item.star} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, index) => (
            <Star key={index} size={15} fill={index < item.star ? "currentColor" : "none"} className={index < item.star ? "text-[#facc15]" : "text-[#333]"} />
          ))}
        </div>
        <div className="inline-flex items-center gap-1 text-[11px] text-[#777] whitespace-nowrap">
          <CalendarDays size={12} />
          {formattedDate}
        </div>
      </div>
      <p className="text-sm text-[#b8b8b8] leading-[1.75] line-clamp-4 min-h-[98px] mb-5">{item.message}</p>
      <div className="border-t border-[#242424] pt-4 flex items-center gap-3">
        <UserAvatar name={item.name} photoURL={item.photoURL} />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#f0f0f0] truncate">{item.name}</p>
          <p className="text-xs text-[#777]">{item.userType}</p>
          <p className="text-xs text-[#777] truncate">{item.organization}</p>
          <p className="text-xs text-[#777] truncate">{item.email}</p>
        </div>
      </div>
    </article>
  );
}

function ExperiencePreviewCard({ item }: { item: Experience }) {
  return (
    <article className="rounded-xl border border-[#232323] bg-[#0d0d0d] p-5 transition-all hover:-translate-y-0.5 hover:border-[#3a3a3a]">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-semibold leading-tight text-[#f0f0f0]">{item.title}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-[#8f8f8f]">
            <BriefcaseBusiness size={13} className="shrink-0 text-[#777]" />
            <span className="truncate">{item.company}</span>
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2a2a2a] bg-[#111] px-2.5 py-1 text-[11px] text-[#aaa]">
          <CalendarDays size={12} />
          {item.period}
        </span>
      </div>

      <p className="text-sm leading-[1.7] text-[#999] line-clamp-3">{item.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {item.tech.slice(0, 4).map((tech) => (
          <span key={`${item.id}-${tech}`} className="rounded-full bg-[#2a2a2a] px-3 py-1 text-[11px] font-semibold text-[#f2f2f2]">
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="group flex flex-col items-center text-center">
      <div className="h-36 w-36 sm:h-40 sm:w-40 overflow-hidden rounded-full border border-[#2a2a2a] bg-[#111] transition-all duration-300 group-hover:border-[#4d7cc7]">
        <img src={member.image} alt={member.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>

      <h3 className="mt-6 text-base font-semibold uppercase tracking-wide text-[#f0f0f0]">{member.name}</h3>
      <p className="mt-1 text-sm font-semibold text-[#4d7cc7]">{member.role}</p>
      <a href={`mailto:${member.email}`} className="mt-3 text-sm text-[#888] transition-colors hover:text-[#e5e5e5]">
        {member.email}
      </a>

      <div className="mt-5 flex items-center justify-center gap-3">
        <a
          href={`mailto:${member.email}`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#242424] bg-[#0d0d0d] text-[#777] transition-all hover:border-[#555] hover:text-[#e5e5e5]"
          aria-label={`Email ${member.name}`}
        >
          <Mail size={15} />
        </a>
        {member.linkedinUrl ? (
          <a
            href={member.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#242424] bg-[#0d0d0d] text-[#777] transition-all hover:border-[#555] hover:text-[#e5e5e5]"
            aria-label={`${member.name} on LinkedIn`}
          >
            <Linkedin size={15} />
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default function Home({ onNavigateToProjects, onNavigateToAbout, onNavigateToFeedback, onNavigateToContact }: HomeProps) {
  const { feedback } = useFeedback();
  const feedbackScrollerRef = useRef<HTMLDivElement | null>(null);
  const dragState = useRef({ active: false, left: 0, startX: 0 });
  const [isDraggingFeedback, setIsDraggingFeedback] = useState(false);
  const featuredProjects = getFeaturedProjects();
  const previewFeedback = feedback.length ? feedback.slice(0, 6) : fallbackFeedback;
  const animatedFeedback = [...previewFeedback, ...previewFeedback, ...previewFeedback];

  useEffect(() => {
    let frameId = 0;
    let lastTime = 0;
    let initialized = false;

    const animateFeedback = (time: number) => {
      const scroller = feedbackScrollerRef.current;

      if (scroller && !dragState.current.active) {
        const segmentWidth = scroller.scrollWidth / 3;

        if (!initialized && segmentWidth > 0) {
          scroller.scrollLeft = segmentWidth;
          initialized = true;
        }

        if (lastTime) {
          const deltaSeconds = (time - lastTime) / 1000;
          scroller.scrollLeft -= 56 * deltaSeconds;
        }

        if (segmentWidth > 0 && scroller.scrollLeft <= 0) {
          scroller.scrollLeft += segmentWidth;
        }
      }

      lastTime = time;
      frameId = window.requestAnimationFrame(animateFeedback);
    };

    frameId = window.requestAnimationFrame(animateFeedback);

    return () => window.cancelAnimationFrame(frameId);
  }, [animatedFeedback.length]);

  const startFeedbackDrag = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = feedbackScrollerRef.current;
    if (!scroller) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
    setIsDraggingFeedback(true);
    dragState.current = {
      active: true,
      left: scroller.scrollLeft,
      startX: event.clientX,
    };
  };

  const moveFeedbackDrag = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = feedbackScrollerRef.current;
    if (!scroller || !dragState.current.active) return;

    event.preventDefault();
    const distance = event.clientX - dragState.current.startX;
    scroller.scrollLeft = dragState.current.left - distance;
  };

  const stopFeedbackDrag = () => {
    dragState.current.active = false;
    setIsDraggingFeedback(false);
  };

  return (
    <main className="relative z-10 min-h-[calc(100vh-56px)]">
      <section className="min-h-[calc(100vh-56px)] flex items-center">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20 w-full">
          <div className="grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2a2a2a] bg-[#111] text-[#d8d8d8] text-xs mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7aadff]" />
                Currently employed
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-medium leading-[1.02] text-[#f5f5f5] mb-5">
                Jerico Jimenez
              </h1>
              <div className="flex items-center gap-2.5 mb-6 flex-wrap">
                <span className="text-base font-medium">Data Analytics Engineer @ Lica Group of Companies</span>
                <span className="text-[#2a2a2a]">/</span>
                <span className="inline-flex items-center gap-1.5 text-sm text-[#777]">
                  <MapPin size={14} />
                  Philippines
                </span>
              </div>
              <p className="text-base sm:text-lg text-[#888] leading-[1.8] mb-8 max-w-[720px]">
                  I build dependable data pipelines, backend systems, and reporting workflows that turn messy operational data into clean, usable decisions.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <button onClick={onNavigateToContact} className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#3a3a3a] rounded-lg text-sm hover:bg-[#e5e5e5] hover:text-[#0a0a0a] hover:border-[#e5e5e5] transition-all">
                  Let's Connect <ArrowRight size={15} />
                </button>
                <button onClick={onNavigateToProjects} className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#2a2a2a] rounded-lg text-sm text-[#777] hover:border-[#555] hover:text-[#e5e5e5] transition-all">
                  View Work
                </button>
              </div>
              <div className="flex gap-2.5">
                <a href="https://www.linkedin.com/in/jerico-jimenez-a504852a4/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#2a2a2a] bg-[#111] flex items-center justify-center text-[#777] hover:text-[#e5e5e5] hover:border-[#555] transition-all" aria-label="LinkedIn">
                  <Linkedin size={15} />
                </a>
                <a href="https://github.com/5H13LD2" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#2a2a2a] bg-[#111] flex items-center justify-center text-[#777] hover:text-[#e5e5e5] hover:border-[#555] transition-all" aria-label="GitHub">
                  <Github size={15} />
                </a>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=jimenezjerico227@gmail.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#2a2a2a] bg-[#111] flex items-center justify-center text-[#777] hover:text-[#e5e5e5] hover:border-[#555] transition-all" aria-label="Email">
                  <Mail size={15} />
                </a>
              </div>
            </div>

            <div className="lg:justify-self-end">
              <div className="w-[260px] sm:w-[320px] aspect-square rounded-2xl bg-[#111] border border-[#1e1e1e] overflow-hidden">
                <img src="/profile.jpg" alt="Jerico Jimenez" className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3 w-full max-w-[320px]">
                {stats.map(([value, label]) => (
                  <div key={label} className="border border-[#1e1e1e] bg-[#101010] rounded-lg px-3 py-3">
                    <div className="text-lg font-medium text-[#e5e5e5]">{value}</div>
                    <div className="text-[11px] leading-tight text-[#555]">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#1e1e1e]">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20">
          <SectionHeader eyebrow="Portfolio" title="Featured Projects" actionLabel="View all" onAction={onNavigateToProjects} />
          <div className="grid md:grid-cols-3 gap-5">
            {featuredProjects.map((project) => (
              <button key={project.id} onClick={onNavigateToProjects} className="text-left">
                <FeaturedProjectCard project={project} />
              </button>
            ))}
          </div>
          <button onClick={onNavigateToProjects} className="sm:hidden mt-6 inline-flex items-center gap-2 text-sm text-[#f1f1f1]">
            View all projects <ArrowRight size={15} />
          </button>
        </div>
      </section>

      <section className="border-t border-[#1e1e1e]">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-10 py-14 sm:py-16">
          <div className="mb-8 flex items-end justify-between gap-5">
            <div className="max-w-[680px]">
              <p className="text-[11px] font-semibold text-[#4d7cc7] uppercase tracking-[0.22em] mb-3">Experience</p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0f0f0]">Professional Background</h2>
              <p className="mt-4 text-sm sm:text-base leading-[1.75] text-[#888]">
                A quick look at the roles where I built backend systems, production workflows, and data-focused engineering work.
              </p>
            </div>
            <button onClick={onNavigateToAbout} className="hidden sm:inline-flex items-center gap-2 text-sm text-[#f1f1f1] hover:text-[#7aadff] transition-colors">
              View experience
              <ArrowRight size={15} className="-rotate-45" />
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {experience.map((item) => (
              <ExperiencePreviewCard key={item.id} item={item} />
            ))}
          </div>
          <button onClick={onNavigateToAbout} className="sm:hidden mt-6 inline-flex items-center gap-2 text-sm text-[#f1f1f1]">
            View experience <ArrowRight size={15} />
          </button>
        </div>
      </section>

      <section className="border-t border-[#1e1e1e]">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20">
          <div className="mx-auto mb-12 max-w-[680px] text-center">
            <p className="text-[11px] font-semibold text-[#4d7cc7] uppercase tracking-[0.22em] mb-3">Meet The Team</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0f0f0]">Our Team</h2>
            <p className="mt-4 text-sm sm:text-base leading-[1.75] text-[#888]">
              A focused team bringing together data engineering, full-stack development, and product design.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#1e1e1e] overflow-hidden">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20">
          <SectionHeader eyebrow="Social Proof" title="What People Say" actionLabel="See all" onAction={onNavigateToFeedback} />
        </div>
        <div className="relative pb-16 sm:pb-20">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent" />
          <div
            ref={feedbackScrollerRef}
            className={`feedback-scroll flex gap-5 overflow-x-auto px-5 pb-3 select-none ${isDraggingFeedback ? "cursor-grabbing is-dragging" : "cursor-grab"}`}
            onPointerDown={startFeedbackDrag}
            onPointerMove={moveFeedbackDrag}
            onPointerUp={stopFeedbackDrag}
            onPointerCancel={stopFeedbackDrag}
            onLostPointerCapture={stopFeedbackDrag}
          >
            {animatedFeedback.map((item, index) => (
              <FeedbackPreviewCard key={`${item.id}-${index}`} item={item} />
            ))}
          </div>
          <div className="max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-10">
            <button onClick={onNavigateToFeedback} className="sm:hidden mt-6 inline-flex items-center gap-2 text-sm text-[#f1f1f1]">
              See all feedback <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      <section className="border-t border-[#1e1e1e]">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20">
          <div className="rounded-2xl border border-[#232323] bg-[#0d0d0d] p-7 sm:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-[11px] font-semibold text-[#4d7cc7] uppercase tracking-[0.22em] mb-3">Get in touch</p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0f0f0] mb-3">Have a project in mind?</h2>
              <p className="text-sm sm:text-base text-[#888] max-w-[640px] leading-[1.75]">
                I am not available for full-time opportunities right now, but I am happy to talk about focused projects, data cleanup, automation, or professional connections.
              </p>
            </div>
            <button onClick={onNavigateToContact} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#e5e5e5] px-5 py-3 text-sm font-semibold text-[#0a0a0a] transition-colors hover:bg-white">
              Contact me <MessageSquare size={16} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
