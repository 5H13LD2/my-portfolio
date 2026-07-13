import { onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { auth, db, googleProvider } from "./firebase";
import type { CreateFeedbackInput, Feedback, FeedbackDocument } from "../types/feedback";

const FEEDBACK_COLLECTION = "feedback";

const mapFeedbackDocument = (doc: QueryDocumentSnapshot<DocumentData>): Feedback => {
  const data = doc.data() as Partial<FeedbackDocument>;

  return {
    id: doc.id,
    name: data.name ?? "Anonymous",
    email: data.email ?? "",
    userType: data.userType?.trim() || "Others",
    message: data.message ?? "",
    star: data.star ?? 5,
    date: data.date?.toDate() ?? new Date(),
    photoURL: data.photoURL ?? null,
    uid: data.uid,
  };
};

export const subscribeToFeedback = (
  onFeedback: (feedback: Feedback[]) => void,
  onError: (error: Error) => void,
) => {
  const feedbackQuery = query(collection(db, FEEDBACK_COLLECTION), orderBy("date", "desc"));

  return onSnapshot(
    feedbackQuery,
    (snapshot) => {
      onFeedback(snapshot.docs.map(mapFeedbackDocument));
    },
    onError,
  );
};

export const createFeedback = async (input: CreateFeedbackInput) => {
  await addDoc(collection(db, FEEDBACK_COLLECTION), {
    name: input.name.trim(),
    email: input.email.trim(),
    userType: input.userType.trim() || "Others",
    message: input.message.trim(),
    star: input.star,
    date: serverTimestamp(),
    photoURL: input.photoURL ?? null,
    uid: input.uid ?? null,
  });
};

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export const signOutFeedbackUser = () => signOut(auth);

export const subscribeToFeedbackUser = (onUser: (user: User | null) => void) => {
  return onAuthStateChanged(auth, onUser);
};
