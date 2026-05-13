import type { Timestamp } from "firebase/firestore";

export type ChatSenderType = "visitor" | "owner";

export type ChatMessage = {
  id: string;
  text: string;
  senderType: ChatSenderType;
  senderName: string;
  senderPhotoURL?: string | null;
  senderUid?: string | null;
  senderClientId?: string | null;
  senderAuthProvider?: "anonymous" | "google";
  createdAt: Date;
};

export type ChatMessageDocument = {
  text: string;
  senderType: ChatSenderType;
  senderName: string;
  senderPhotoURL?: string | null;
  senderUid?: string | null;
  senderClientId?: string | null;
  senderAuthProvider?: "anonymous" | "google";
  createdAt?: Timestamp;
};

export type ChatVisitor = {
  uid?: string;
  name: string;
  email?: string;
  photoURL?: string | null;
  authProvider: "anonymous" | "google";
  clientId?: string;
};

export type CreateChatMessageInput = ChatVisitor & {
  text: string;
};
