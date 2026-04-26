import type { Timestamp } from "firebase/firestore";

export type Feedback = {
  id: string;
  name: string;
  email: string;
  message: string;
  star: number;
  date: Date;
  photoURL?: string | null;
  uid?: string;
};

export type FeedbackDocument = {
  name: string;
  email: string;
  message: string;
  star: number;
  date: Timestamp;
  photoURL?: string | null;
  uid?: string;
};

export type CreateFeedbackInput = {
  name: string;
  email: string;
  message: string;
  star: number;
  photoURL?: string | null;
  uid?: string;
};
