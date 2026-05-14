import type { Timestamp } from "firebase/firestore";

export type ChatSenderType = "visitor" | "owner";

export type ChatReplyTarget = {
  messageId: string;
  senderName: string;
  text: string;
};

export type ChatMessage = {
  id: string;
  text: string;
  senderType: ChatSenderType;
  senderName: string;
  senderPhotoURL?: string | null;
  senderUid?: string | null;
  senderClientId?: string | null;
  senderAuthProvider?: "anonymous" | "google";
  replyTo?: ChatReplyTarget | null;
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
  replyTo?: ChatReplyTarget | null;
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
  replyTo?: ChatReplyTarget | null;
};

export type ChatReactionEmoji = "👍" | "❤️" | "😂" | "😮" | "😢";

export type ChatReaction = {
  id: string;
  emoji: ChatReactionEmoji;
  reactorName: string;
  reactorAuthProvider: "anonymous" | "google";
  reactorUid?: string | null;
  reactorClientId?: string | null;
  createdAt: Date;
};

export type ChatReactionDocument = {
  emoji: ChatReactionEmoji;
  reactorName: string;
  reactorAuthProvider: "anonymous" | "google";
  reactorUid?: string | null;
  reactorClientId?: string | null;
  createdAt?: Timestamp;
};

export type UpsertChatReactionInput = ChatVisitor & {
  messageId: string;
  emoji: ChatReactionEmoji;
  reactorId: string;
};
