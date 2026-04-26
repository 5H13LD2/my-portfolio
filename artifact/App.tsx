import { useEffect, useRef, useState } from "react";
import { Linkedin, Github, Mail, ChevronDown, ChevronRight, Star } from "lucide-react";
import ResumeButton from "./components/ResumeButton";
import PDFModal from "./components/PDFModal";
import CertificatesSection from "./components/CertificatesSection";
import { certificates } from "./data/certificates";

const SECTIONS = ["home", "featured", "allprojects", "about", "feedback", "contact"] as const;
type SectionId = typeof SECTIONS[number];

const NAV_SECTION_MAP: Record<SectionId, number> = {
  home: 0, featured: 1, allprojects: 1, about: 2, feedback: 3, contact: 4,
};

const NAV_LABELS = ["Home", "Projects", "About", "Feedback", "Contact"];

const projects = [
  {
    id: 1,
    title: "AWS-Airflow-Snowflake ETL Pipeline",
    description: "Automated end-to-end data pipeline managing 200k+ record datasets. Full orchestration with Apache Airflow on AWS, loading into Snowflake with monitoring and alerting.",
    tags: ["Python", "Airflow", "Snowflake", "AWS"],
    featured: true,
    repoUrl: "https://github.com/5H13LD2",
    liveUrl: "",
    airflowUrl: "",
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "Personal portfolio built with React, TypeScript, and Tailwind CSS. Features project showcases, certifications display, PDF resume viewer, and responsive design.",
    tags: ["React", "TypeScript", "Tailwind", "Vite"],
    featured: true,
    repoUrl: "https://github.com/5H13LD2",
    liveUrl: "https://jimenezjerico.vercel.app/",
    airflowUrl: "",
  },
  {
    id: 3,
    title: "Cloud-Native Analytics Dashboard",
    description: "Real-time analytics dashboard on AWS infrastructure with data visualization, automated refresh pipelines, and reporting modules.",
    tags: ["AWS", "React", "Node.js", "PostgreSQL"],
    featured: false,
    repoUrl: "https://github.com/5H13LD2",
    liveUrl: "",
    airflowUrl: "",
  },
  {
    id: 4,
    title: "Full Stack Web System",
    description: "Production-grade system with JWT auth, role-based access control, RESTful API backend, and responsive frontend built for real-world deployment.",
    tags: ["Node.js", "PostgreSQL", "React", "Docker"],
    featured: false,
    repoUrl: "https://github.com/5H13LD2",
    liveUrl: "",
    airflowUrl: "",
  },
];

const STACK = ["Python", "Apache Airflow", "Snowflake", "AWS", "React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "Git", "Tailwind CSS", "Oracle Cloud"];

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <div className={`rounded-xl p-5 border transition-all duration-200 hover:-translate-y-0.5 ${
      project.featured
        ? "bg-[#0d1420] border-[#1a2a40]"
        : "bg-[#111111] border-[#1e1e1e]"
    }`}>
      {project.featured && (
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#1a2a40] text-[#4d7cc7] text-[10px] font-medium mb-3">
          <Star size={10} fill="currentColor" /> Featured
        </div>
      )}
      <h3 className="text-sm font-medium text-[#e0e0e0] mb-2">{project.title}</h3>
      <p className="text-xs text-[#666] leading-relaxed mb-3">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.tags.map((t) => (
          <span key={t} className="px-2 py-0.5 rounded bg-[#0d1828] border border-[#1a2a40] text-[#4d7cc7] text-[11px]">{t}</span>
        ))}
      </div>
      <div className="flex gap-2">
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
            className="px-3 py-1 rounded-md border border-[#2a2a2a] text-[#888] text-[11px] hover:border-[#444] hover:text-[#e5e5e5] transition-colors">
            View Code →
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="px-3 py-1 rounded-md border border-[#2a2a2a] text-[#888] text-[11px] hover:border-[#444] hover:text-[#e5e5e5] transition-colors">
            Live →
          </a>
        )}
        {project.airflowUrl && (
          <a href={project.airflowUrl} target="_blank" rel="noopener noreferrer"
            className="px-3 py-1 rounded-md border border-[#1a2a40] text-[#4d7cc7] text-[11px] hover:bg-[#1a2a40] transition-colors">
            Airflow UI →
          </a>
        )}
      </div>
    </div>
  );
}

function ScrollHint({ label = "scroll down" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 mt-8 opacity-30">
      <span className="text-[11px] text-[#666]">{label}</span>
      <div className="w-4 h-4 border-r border-b border-[#666] rotate-45 animate-bounce" />
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({ name: "", email: "", message: "" });
  const [feedbackSent, setFeedbackSent] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToSection = (id: SectionId) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-5");
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      { root: container, threshold: 0.4 }
    );

    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));

    const handleScroll = () => setScrolled(container.scrollTop > 10);
    container.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const activeDot = SECTIONS.indexOf(activeSection);
  const activeNav = NAV_SECTION_MAP[activeSection] ?? 0;

  const handleFeedbackSubmit = () => {
    if (feedbackForm.name && feedbackForm.email && feedbackForm.message) {
      setFeedbackSent(true);
    }
  };

  return (
    <div className="bg-[#0a0a0a] text-[#e5e5e5] min-h-screen font-sans">
      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-10 border-b border-[#1e1e1e] bg-[#0a0a0a]/95 backdrop-blur-md z-50 transition-shadow ${scrolled ? "shadow-[0_1px_20px_rgba(0,0,0,0.5)]" : ""}`}>
        <button onClick={() => scrollToSection("home")} className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-[11px] font-semibold text-white">JJ</div>
          <span className="text-sm font-medium">Jerico Jimenez</span>
        </button>
        <div className="flex gap-0.5">
          {NAV_LABELS.map((label, i) => {
            const targets: SectionId[] = [["home"], ["featured"], ["about"], ["feedback"], ["contact"]][i] as SectionId[];
            return (
              <button key={label} onClick={() => scrollToSection(targets[0])}
                className={`px-3.5 py-1.5 rounded-md text-[13px] transition-all ${activeNav === i ? "bg-blue-600 text-white" : "text-[#666] hover:text-[#e5e5e5] hover:bg-[#1a1a1a]"}`}>
                {label}
              </button>
            );
          })}
        </div>
        <ResumeButton onClick={() => setIsPDFModalOpen(true)} variant="secondary" size="sm" />
      </nav>

      {/* SCROLL DOTS */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-40">
        {SECTIONS.map((id, i) => (
          <button key={id} onClick={() => scrollToSection(id)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${activeDot === i ? "bg-blue-500 scale-125" : "bg-[#2a2a2a] hover:bg-[#444]"}`}
            title={id} />
        ))}
      </div>

      {/* SCROLL CONTAINER */}
      <div ref={containerRef} className="h-screen overflow-y-scroll" style={{ scrollSnapType: "y mandatory", marginTop: "56px", height: "calc(100vh - 56px)" }}>

        {/* HOME */}
        <div id="home" ref={(el) => { sectionRefs.current["home"] = el; }}
          className="opacity-0 translate-y-5 transition-all duration-500 min-h-[calc(100vh-56px)] flex flex-col justify-center"
          style={{ scrollSnapAlign: "start" }}>
          <div className="max-w-[900px] mx-auto px-10 py-16 w-full">
            <div className="grid grid-cols-[1fr_190px] gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#1a3a1a] bg-[#0d1f0d] text-[#4ade80] text-xs mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
                  Available for work
                </div>
                <h1 className="text-[46px] font-medium leading-[1.08] text-[#f5f5f5] mb-3 tracking-tight">Jerico Jimenez</h1>
                <div className="flex items-center gap-2.5 mb-4 flex-wrap">
                  <span className="text-[15px] font-medium">Data Engineer</span>
                  <span className="text-[#2a2a2a]">•</span>
                  <span className="text-[13px] text-[#666]">📍 Philippines</span>
                </div>
                <p className="text-sm text-[#666] leading-[1.75] mb-6 max-w-[460px]">
                  A passionate data engineer from the Philippines 🇵🇭. Building automated end-to-end pipelines, managing 200k+ record datasets, and architecting cloud-native solutions using the AWS-Airflow-Snowflake stack.
                </p>
                <div className="flex gap-2.5 mb-6">
                  <button onClick={() => scrollToSection("contact")}
                    className="px-4 py-2 border border-[#3a3a3a] rounded-lg text-sm hover:bg-[#e5e5e5] hover:text-[#0a0a0a] hover:border-[#e5e5e5] transition-all">
                    Hire Me →
                  </button>
                  <button onClick={() => scrollToSection("featured")}
                    className="px-4 py-2 border border-[#2a2a2a] rounded-lg text-sm text-[#666] hover:border-[#555] hover:text-[#e5e5e5] transition-all">
                    View Work
                  </button>
                </div>
                <div className="flex gap-2.5">
                  <a href="https://www.linkedin.com/in/jerico-jimenez-a504852a4/" target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-[#2a2a2a] bg-[#111] flex items-center justify-center text-[#666] hover:text-[#e5e5e5] hover:border-[#555] transition-all">
                    <Linkedin size={13} />
                  </a>
                  <a href="https://github.com/5H13LD2" target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-[#2a2a2a] bg-[#111] flex items-center justify-center text-[#666] hover:text-[#e5e5e5] hover:border-[#555] transition-all">
                    <Github size={13} />
                  </a>
                  <a href="mailto:jimenezjerico227@gmail.com"
                    className="w-8 h-8 rounded-full border border-[#2a2a2a] bg-[#111] flex items-center justify-center text-[#666] hover:text-[#e5e5e5] hover:border-[#555] transition-all">
                    <Mail size={13} />
                  </a>
                </div>
              </div>
              <div className="w-[180px] h-[180px] rounded-[14px] bg-[#111] border border-[#1e1e1e] flex items-center justify-center flex-shrink-0">
                <img src="/profile.jpg" alt="Jerico Jimenez" className="w-full h-full rounded-[14px] object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement!.innerHTML = '<div class="flex flex-col items-center gap-2"><div class="w-14 h-14 rounded-full bg-[#1e2a3a] flex items-center justify-center text-[18px] font-medium text-[#5b8def]">JJ</div><span class="text-[11px] text-[#333]">profile.jpg</span></div>';
                  }} />
              </div>
            </div>
            <div className="mt-8 pt-7 border-t border-[#1e1e1e]">
              <p className="text-[11px] font-medium text-[#444] uppercase tracking-widest mb-3">Tech stack</p>
              <div className="flex flex-wrap gap-2">
                {STACK.map((s) => (
                  <span key={s} className="px-3 py-1 rounded-md border border-[#1e1e1e] bg-[#111] text-[#999] text-xs">{s}</span>
                ))}
              </div>
            </div>
            <ScrollHint />
          </div>
        </div>

        {/* FEATURED PROJECTS */}
        <div id="featured" ref={(el) => { sectionRefs.current["featured"] = el; }}
          className="opacity-0 translate-y-5 transition-all duration-500 min-h-[calc(100vh-56px)] flex flex-col justify-center"
          style={{ scrollSnapAlign: "start" }}>
          <div className="max-w-[900px] mx-auto px-10 py-16 w-full">
            <div className="flex items-start justify-between mb-7">
              <div>
                <h2 className="text-[28px] font-medium text-[#f0f0f0]">Featured Projects</h2>
                <p className="text-[13px] text-[#666] mt-1">A selection of my best work</p>
              </div>
              <button onClick={() => scrollToSection("allprojects")}
                className="flex items-center gap-1.5 px-4 py-1.5 border border-[#2a2a2a] rounded-lg text-xs text-[#666] hover:border-[#444] hover:text-[#e5e5e5] transition-all">
                View all <ChevronRight size={12} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3.5">
              {projects.filter((p) => p.featured).map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
            <div className="mt-5 px-5 py-4 border border-dashed border-[#1e2a3a] rounded-xl flex items-center justify-between bg-[rgba(13,20,32,0.4)]">
              <div className="text-sm text-[#666]">
                <span className="text-[#e5e5e5] font-medium">{projects.filter((p) => !p.featured).length} more projects</span> — Cloud Dashboard, Full Stack Web System &amp; more
              </div>
              <button onClick={() => scrollToSection("allprojects")}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-xs text-white font-medium transition-colors">
                See all projects <ChevronRight size={12} />
              </button>
            </div>
            <ScrollHint label="keep scrolling" />
          </div>
        </div>

        {/* ALL PROJECTS */}
        <div id="allprojects" ref={(el) => { sectionRefs.current["allprojects"] = el; }}
          className="opacity-0 translate-y-5 transition-all duration-500 min-h-[calc(100vh-56px)] flex flex-col justify-center"
          style={{ scrollSnapAlign: "start" }}>
          <div className="max-w-[900px] mx-auto px-10 py-16 w-full">
            <div className="flex items-start justify-between mb-7">
              <div>
                <h2 className="text-[28px] font-medium text-[#f0f0f0]">All Projects</h2>
                <p className="text-[13px] text-[#666] mt-1">Everything I've built and shipped</p>
              </div>
              <button onClick={() => scrollToSection("featured")}
                className="flex items-center gap-1.5 px-4 py-1.5 border border-[#2a2a2a] rounded-lg text-xs text-[#666] hover:border-[#444] hover:text-[#e5e5e5] transition-all">
                <ChevronRight size={12} className="rotate-180" /> Featured only
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3.5">
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
            <ScrollHint label="keep scrolling" />
          </div>
        </div>

        {/* ABOUT */}
        <div id="about" ref={(el) => { sectionRefs.current["about"] = el; }}
          className="opacity-0 translate-y-5 transition-all duration-500 min-h-[calc(100vh-56px)] flex flex-col justify-center"
          style={{ scrollSnapAlign: "start" }}>
          <div className="max-w-[900px] mx-auto px-10 py-16 w-full">
            <h2 className="text-[28px] font-medium text-[#f0f0f0] mb-1">About</h2>
            <p className="text-[13px] text-[#666] mb-7">Background, skills, and certifications.</p>
            <div className="grid grid-cols-[1fr_250px] gap-9 items-start">
              <div>
                <p className="text-sm text-[#888] leading-[1.8] mb-3">
                  I'm <span className="text-[#e5e5e5]">Jerico Jimenez</span>, a Data Engineer based in the Philippines with a strong foundation in Full Stack Development.
                </p>
                <p className="text-sm text-[#888] leading-[1.8] mb-3">
                  With almost <span className="text-[#e5e5e5]">1 year of professional experience</span>, I've managed <span className="text-[#e5e5e5]">200k+ record datasets</span> using the <span className="text-[#e5e5e5]">AWS-Airflow-Snowflake stack</span>, bridging backend engineering with high-performance data analytics.
                </p>
                <CertificatesSection />
              </div>
              <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-4">
                {[
                  ["Full name", "Jerico Jimenez"],
                  ["Role", "Data Engineer"],
                  ["Location", "Philippines"],
                  ["Experience", "~1 year"],
                ].map(([label, value]) => (
                  <div key={label} className="py-2.5 border-b border-[#1e1e1e] flex flex-col gap-0.5">
                    <span className="text-[10px] text-[#444] uppercase tracking-wider">{label}</span>
                    <span className="text-[13px] text-[#bbb]">{value}</span>
                  </div>
                ))}
                <div className="py-2.5 border-b border-[#1e1e1e] flex flex-col gap-0.5">
                  <span className="text-[10px] text-[#444] uppercase tracking-wider">Status</span>
                  <span className="text-[13px] text-[#4ade80]">Open to work</span>
                </div>
                <div className="py-2.5 border-b border-[#1e1e1e] flex flex-col gap-0.5">
                  <span className="text-[10px] text-[#444] uppercase tracking-wider">GitHub</span>
                  <a href="https://github.com/5H13LD2" target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#4d7cc7] hover:underline">github.com/5H13LD2</a>
                </div>
                <div className="py-2.5 border-b border-[#1e1e1e] flex flex-col gap-0.5">
                  <span className="text-[10px] text-[#444] uppercase tracking-wider">LinkedIn</span>
                  <a href="https://www.linkedin.com/in/jerico-jimenez-a504852a4/" target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#4d7cc7] hover:underline">View profile →</a>
                </div>
                <div className="py-2.5 flex flex-col gap-0.5">
                  <span className="text-[10px] text-[#444] uppercase tracking-wider">Email</span>
                  <a href="mailto:jimenezjerico227@gmail.com" className="text-[13px] text-[#4d7cc7] hover:underline">jimenezjerico227@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FEEDBACK */}
        <div id="feedback" ref={(el) => { sectionRefs.current["feedback"] = el; }}
          className="opacity-0 translate-y-5 transition-all duration-500 min-h-[calc(100vh-56px)] flex flex-col justify-center"
          style={{ scrollSnapAlign: "start" }}>
          <div className="max-w-[900px] mx-auto px-10 py-16 w-full">
            <h2 className="text-[28px] font-medium text-[#f0f0f0] mb-1">Feedback</h2>
            <p className="text-[13px] text-[#666] mb-7">Have a thought, suggestion, or just want to say hi?</p>
            {feedbackSent ? (
              <div className="max-w-[460px] p-6 bg-[#0d2010] border border-[#1a3a20] rounded-xl text-center">
                <p className="text-[#4ade80] font-medium mb-1">Message sent!</p>
                <p className="text-sm text-[#666]">Thanks for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <div className="max-w-[460px] space-y-4">
                <div>
                  <label className="block text-xs text-[#888] mb-1.5">Your name</label>
                  <input value={feedbackForm.name} onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                    className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-[#e5e5e5] focus:outline-none focus:border-[#444] transition-colors"
                    placeholder="e.g. Juan dela Cruz" />
                </div>
                <div>
                  <label className="block text-xs text-[#888] mb-1.5">Email address</label>
                  <input value={feedbackForm.email} onChange={(e) => setFeedbackForm({ ...feedbackForm, email: e.target.value })}
                    className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-[#e5e5e5] focus:outline-none focus:border-[#444] transition-colors"
                    placeholder="you@example.com" type="email" />
                </div>
                <div>
                  <label className="block text-xs text-[#888] mb-1.5">Message</label>
                  <textarea value={feedbackForm.message} onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                    className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-[#e5e5e5] focus:outline-none focus:border-[#444] transition-colors resize-y min-h-[100px]"
                    placeholder="Your message..." />
                </div>
                <button onClick={handleFeedbackSubmit}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm text-white font-medium transition-colors">
                  Send feedback
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CONTACT */}
        <div id="contact" ref={(el) => { sectionRefs.current["contact"] = el; }}
          className="opacity-0 translate-y-5 transition-all duration-500 min-h-[calc(100vh-56px)] flex flex-col justify-center"
          style={{ scrollSnapAlign: "start" }}>
          <div className="max-w-[900px] mx-auto px-10 py-16 w-full">
            <h2 className="text-[28px] font-medium text-[#f0f0f0] mb-1">Contact</h2>
            <p className="text-[13px] text-[#666] mb-6">Let's work together or just have a chat.</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "💼", label: "LinkedIn", value: "jerico-jimenez-a504852a4", href: "https://www.linkedin.com/in/jerico-jimenez-a504852a4/" },
                { icon: "💻", label: "GitHub", value: "github.com/5H13LD2", href: "https://github.com/5H13LD2" },
                { icon: "✉️", label: "Email", value: "jimenezjerico227@gmail.com", href: "mailto:jimenezjerico227@gmail.com" },
                { icon: "📍", label: "Location", value: "Philippines", href: null },
              ].map((item) => (
                item.href ? (
                  <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                    className="bg-[#111] border border-[#1e1e1e] rounded-xl p-4 block hover:border-[#2a2a2a] hover:-translate-y-0.5 transition-all">
                    <div className="text-lg mb-2">{item.icon}</div>
                    <div className="text-[11px] text-[#444] mb-1">{item.label}</div>
                    <div className="text-[13px] text-[#ccc]">{item.value}</div>
                  </a>
                ) : (
                  <div key={item.label} className="bg-[#111] border border-[#1e1e1e] rounded-xl p-4">
                    <div className="text-lg mb-2">{item.icon}</div>
                    <div className="text-[11px] text-[#444] mb-1">{item.label}</div>
                    <div className="text-[13px] text-[#ccc]">{item.value}</div>
                  </div>
                )
              ))}
            </div>
            <div className="mt-10 pt-5 border-t border-[#1e1e1e] flex items-center justify-between">
              <span className="text-[11px] text-[#444]">© 2026 Jerico Jimenez — All rights reserved.</span>
              <span className="text-[11px] text-[#444]">Built with React &amp; Tailwind CSS</span>
            </div>
          </div>
        </div>

      </div>

      {/* CHAT FAB */}
      <button className="fixed bottom-5 right-5 w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-700 border-none flex items-center justify-center shadow-[0_4px_20px_rgba(37,99,235,0.35)] z-50 transition-colors"
        title="Chat">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      </button>

      <PDFModal isOpen={isPDFModalOpen} onClose={() => setIsPDFModalOpen(false)}
        pdfUrl="/other/Jimenez_Jerico_Resume.pdf" fileName="Jimenez_Jerico_Resume.pdf" />
    </div>
  );
}
