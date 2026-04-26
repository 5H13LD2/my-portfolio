import { Sparkles } from "lucide-react";
import { useRandomQuote } from "../hooks/useRandomQuote";

export default function SiteFooter() {
  const { quote, visible } = useRandomQuote();

  return (
    <footer className="relative z-10 border-t border-[#1e1e1e]">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-10 py-8">
        <div className={`text-center transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}>
          <p className="text-sm italic text-[#8f8f8f]">"{quote.quotes}"</p>
          <p className="mt-1 text-xs text-[#555]">- {quote.name}</p>
        </div>

        <div className="mt-7 pt-6 border-t border-[#1e1e1e] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <span className="text-[11px] text-[#555]">© 2026 Jerico Jimenez. All rights reserved.</span>
          <span className="inline-flex items-center gap-2 text-[11px] text-[#555]">
            <Sparkles size={12} />
            Built with React &amp; Tailwind CSS
          </span>
        </div>
      </div>
    </footer>
  );
}
