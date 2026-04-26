import { useEffect, useMemo, useState } from "react";
import { subscribeToQuotes } from "../services/quoteService";
import type { Quote } from "../types/quote";

const fallbackQuotes: Quote[] = [
  {
    id: "fallback-1",
    name: "Bjarne Stroustrup",
    quotes: "Don't fear failure; fear writing code that never evolves.",
  },
  {
    id: "fallback-2",
    name: "jerico jimenez",
    quotes: "never back down never what?",
  },
];

const pickRandomIndex = (length: number, currentIndex: number) => {
  if (length <= 1) return 0;

  let nextIndex = Math.floor(Math.random() * length);
  while (nextIndex === currentIndex) {
    nextIndex = Math.floor(Math.random() * length);
  }

  return nextIndex;
};

export function useRandomQuote(rotationMs = 9000) {
  const [quotes, setQuotes] = useState<Quote[]>(fallbackQuotes);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToQuotes(
      (items) => {
        if (items.length) {
          setQuotes(items);
          setActiveIndex(Math.floor(Math.random() * items.length));
        }
      },
      () => {
        setQuotes(fallbackQuotes);
      },
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (quotes.length <= 1) return;

    const interval = window.setInterval(() => {
      setVisible(false);

      window.setTimeout(() => {
        setActiveIndex((current) => pickRandomIndex(quotes.length, current));
        setVisible(true);
      }, 220);
    }, rotationMs);

    return () => window.clearInterval(interval);
  }, [quotes.length, rotationMs]);

  const quote = useMemo(() => quotes[activeIndex] ?? fallbackQuotes[0], [activeIndex, quotes]);

  return { quote, visible };
}
