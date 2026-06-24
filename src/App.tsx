import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Analytics } from "@vercel/analytics/react";
import ChatWidget from "./components/ChatWidget";
import ResumeButton from "./components/ResumeButton";
import PDFModal from "./components/PDFModal";
import SiteFooter from "./components/SiteFooter";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Feedback from "./pages/Feedback";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import { getLenis, useLenis } from "./hooks/useLenis";

type PageId = "home" | "projects" | "about" | "feedback" | "contact";
type Theme = "dark" | "light";

const NAV_ITEMS: { label: string; page: PageId }[] = [
  { label: "Home", page: "home" },
  { label: "Projects", page: "projects" },
  { label: "About", page: "about" },
  { label: "Feedback", page: "feedback" },
  { label: "Contact", page: "contact" },
];

export default function App() {
  const getInitialTheme = (): Theme => {
    const storedTheme = localStorage.getItem("portfolio-theme");
    return storedTheme === "light" ? "light" : "dark";
  };

  const [activePage, setActivePage] = useState<PageId>("home");
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [showBrownout, setShowBrownout] = useState(() => getInitialTheme() === "dark");
  const [scrolled, setScrolled] = useState(false);
  const [transitionCue, setTransitionCue] = useState({ id: 0, label: "Home" });

  useLenis();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem("portfolio-theme", theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    if (!showBrownout) return;

    const timeout = window.setTimeout(() => setShowBrownout(false), 760);
    return () => window.clearTimeout(timeout);
  }, [showBrownout]);

  const toggleTheme = () => {
    setTheme((current) => {
      const nextTheme = current === "dark" ? "light" : "dark";
      if (nextTheme === "dark") {
        setShowBrownout(true);
      }
      return nextTheme;
    });
  };

  const navigateToPage = (page: PageId) => {
    const targetLabel = NAV_ITEMS.find((item) => item.page === page)?.label ?? "Home";
    setTransitionCue((current) => ({ id: current.id + 1, label: targetLabel }));
    setActivePage(page);
    setMobileMenuOpen(false);

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case "projects":
        return <Projects />;
      case "about":
        return <About />;
      case "feedback":
        return <Feedback />;
      case "contact":
        return <Contact />;
      case "home":
      default:
        return (
          <Home
            onNavigateToProjects={() => navigateToPage("projects")}
            onNavigateToAbout={() => navigateToPage("about")}
            onNavigateToFeedback={() => navigateToPage("feedback")}
            onNavigateToContact={() => navigateToPage("contact")}
          />
        );
    }
  };

  return (
    <div data-theme={theme} className={`theme-${theme} bg-[#0a0a0a] text-[#e5e5e5] min-h-screen font-sans relative transition-colors duration-300`}>
      {showBrownout && <div className="brownout-overlay" />}

      <div className="fixed top-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1180px] pointer-events-none z-0 flex justify-between">
        <div className="low-visible-line-v" />
        <div className="low-visible-line-v" />
      </div>

      <nav className={`site-header fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-4 sm:px-6 lg:px-10 border-b border-[#1e1e1e] bg-[#0a0a0a]/95 backdrop-blur-md z-50 transition-shadow ${scrolled ? "shadow-[0_1px_20px_rgba(0,0,0,0.5)]" : ""}`}>
        <button onClick={() => navigateToPage("home")} className="site-brand flex items-center gap-2 min-w-0">
          <div className="site-logo w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-[11px] font-semibold text-white flex-shrink-0">JJ</div>
          <span className="site-brand-name text-sm font-medium">Jerico Jimenez</span>
        </button>

        <div className="hidden md:flex gap-0.5 overflow-x-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.page}
              onClick={() => navigateToPage(item.page)}
              className={`nav-link px-2.5 sm:px-3.5 py-1.5 rounded-md text-[12px] sm:text-[13px] transition-all whitespace-nowrap ${activePage === item.page ? "nav-link-active bg-blue-600 text-white" : "text-[#666] hover:text-[#e5e5e5] hover:bg-[#1a1a1a]"}`}
            >
              <span className={activePage === item.page ? "nav-bounce-text" : ""}>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="theme-toggle w-9 h-9 rounded-md border border-[#2a2a2a] bg-[#111] flex items-center justify-center text-[#ccc] hover:border-[#555] hover:text-white transition-colors"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <ResumeButton onClick={() => setIsPDFModalOpen(true)} />
        </div>

        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="theme-toggle w-9 h-9 rounded-md border border-[#2a2a2a] bg-[#111] flex items-center justify-center text-[#ccc] hover:border-[#555] hover:text-white transition-colors"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <ResumeButton onClick={() => setIsPDFModalOpen(true)} showIcon className="px-2.5 [&>span]:hidden" />
          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="mobile-menu-button w-9 h-9 rounded-md border border-[#2a2a2a] bg-[#111] flex items-center justify-center text-[#ccc] hover:border-[#555] hover:text-white transition-colors"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="mobile-nav-panel fixed inset-x-3 top-[64px] z-40 md:hidden rounded-xl border border-[#1e1e1e] bg-[#0d0d0d]/98 backdrop-blur-md shadow-[0_18px_60px_rgba(0,0,0,0.45)] animate-fade-in">
          <div className="p-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.page}
                onClick={() => navigateToPage(item.page)}
                className={`mobile-nav-link w-full flex items-center justify-between rounded-lg px-4 py-3 text-sm transition-colors ${activePage === item.page ? "mobile-nav-link-active bg-blue-600 text-white" : "text-[#aaa] hover:bg-[#171717] hover:text-white"}`}
              >
                <span>{item.label}</span>
                {activePage === item.page && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="pt-14">
        {transitionCue.id > 0 && (
          <div key={transitionCue.id} className="page-transition-cue" aria-hidden="true">
            {transitionCue.label.split("").map((letter, index) => (
              <span key={`${letter}-${index}`} style={{ animationDelay: `${index * 0.035}s` }}>
                {letter === " " ? "\u00a0" : letter}
              </span>
            ))}
          </div>
        )}

        <div key={activePage} className="page-motion-shell">
          {renderPage()}
        </div>

        <SiteFooter />
      </div>

      <Analytics />
      <ChatWidget />

      <PDFModal
        isOpen={isPDFModalOpen}
        onClose={() => setIsPDFModalOpen(false)}
        pdfUrl="/other/Jimenez_Jerico_Resume.pdf"
        fileName="Jimenez_Jerico_Resume.pdf"
      />
    </div>
  );
}
