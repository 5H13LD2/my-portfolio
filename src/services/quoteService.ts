import { collection, onSnapshot, query, type DocumentData, type QueryDocumentSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import type { Quote } from "../types/quote";

const QUOTES_COLLECTION = "quotes";

const mapQuoteDocument = (doc: QueryDocumentSnapshot<DocumentData>): Quote => {
  const data = doc.data() as Partial<Quote>;

  return {
    id: doc.id,
    name: data.name ?? "Unknown",
    quotes: data.quotes ?? "",
  };
};

export const subscribeToQuotes = (
  onQuotes: (quotes: Quote[]) => void,
  onError: (error: Error) => void,
) => {
  return onSnapshot(
    query(collection(db, QUOTES_COLLECTION)),
    (snapshot) => {
      onQuotes(snapshot.docs.map(mapQuoteDocument).filter((quote) => quote.quotes.trim()));
    },
    onError,
  );
};
