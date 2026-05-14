import { onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { auth, db, googleProvider } from "./firebase";
import type {
  ChatMessage,
  ChatMessageDocument,
  ChatReaction,
  ChatReactionDocument,
  CreateChatMessageInput,
  UpsertChatReactionInput,
} from "../types/chat";

const CHAT_ROOMS_COLLECTION = "chatRooms";
const GLOBAL_CHAT_ROOM_ID = "main";
const CHAT_MESSAGES_COLLECTION = "messages";
const CHAT_REACTIONS_COLLECTION = "reactions";

const mapChatMessageDocument = (doc: QueryDocumentSnapshot<DocumentData>): ChatMessage => {
  const data = doc.data() as Partial<ChatMessageDocument>;

  return {
    id: doc.id,
    text: data.text ?? "",
    senderType: data.senderType ?? "visitor",
    senderName: data.senderName ?? "Guest",
    senderPhotoURL: data.senderPhotoURL ?? null,
    senderUid: data.senderUid ?? null,
    senderClientId: data.senderClientId ?? null,
    senderAuthProvider: data.senderAuthProvider,
    replyTo: data.replyTo ?? null,
    createdAt: data.createdAt?.toDate() ?? new Date(),
  };
};

const mapChatReactionDocument = (doc: QueryDocumentSnapshot<DocumentData>): ChatReaction => {
  const data = doc.data() as Partial<ChatReactionDocument>;

  return {
    id: doc.id,
    emoji: data.emoji ?? "👍",
    reactorName: data.reactorName ?? "Guest",
    reactorAuthProvider: data.reactorAuthProvider ?? "anonymous",
    reactorUid: data.reactorUid ?? null,
    reactorClientId: data.reactorClientId ?? null,
    createdAt: data.createdAt?.toDate() ?? new Date(),
  };
};

const getMessagesCollection = (threadId: string) =>
  collection(db, CHAT_ROOMS_COLLECTION, threadId, CHAT_MESSAGES_COLLECTION);

const getReactionsCollection = (messageId: string) =>
  collection(
    db,
    CHAT_ROOMS_COLLECTION,
    GLOBAL_CHAT_ROOM_ID,
    CHAT_MESSAGES_COLLECTION,
    messageId,
    CHAT_REACTIONS_COLLECTION,
  );

const getReactionDocument = (messageId: string, reactorId: string) =>
  doc(
    db,
    CHAT_ROOMS_COLLECTION,
    GLOBAL_CHAT_ROOM_ID,
    CHAT_MESSAGES_COLLECTION,
    messageId,
    CHAT_REACTIONS_COLLECTION,
    reactorId,
  );

export const subscribeToChatMessages = (
  onMessages: (messages: ChatMessage[]) => void,
  onError: (error: Error) => void,
) => {
  const messagesQuery = query(getMessagesCollection(GLOBAL_CHAT_ROOM_ID), orderBy("createdAt", "asc"));

  return onSnapshot(
    messagesQuery,
    (snapshot) => {
      onMessages(snapshot.docs.map(mapChatMessageDocument));
    },
    onError,
  );
};

export const sendChatMessage = async (input: CreateChatMessageInput) => {
  const name = input.name.trim();
  const text = input.text.trim();
  const messageData: Record<string, unknown> = {
    text,
    senderType: "visitor",
    senderName: name,
    senderAuthProvider: input.authProvider,
    createdAt: serverTimestamp(),
  };

  if (input.uid) {
    messageData.senderUid = input.uid;
  }

  if (input.clientId) {
    messageData.senderClientId = input.clientId;
  }

  if (input.photoURL) {
    messageData.senderPhotoURL = input.photoURL;
  }

  if (input.replyTo) {
    messageData.replyTo = {
      messageId: input.replyTo.messageId,
      senderName: input.replyTo.senderName,
      text: input.replyTo.text.slice(0, 140),
    };
  }

  await addDoc(getMessagesCollection(GLOBAL_CHAT_ROOM_ID), messageData);
};

export const subscribeToChatReactions = (
  messageId: string,
  onReactions: (reactions: ChatReaction[]) => void,
  onError: (error: Error) => void,
) => {
  const reactionsQuery = query(getReactionsCollection(messageId), orderBy("createdAt", "asc"));

  return onSnapshot(
    reactionsQuery,
    (snapshot) => {
      onReactions(snapshot.docs.map(mapChatReactionDocument));
    },
    onError,
  );
};

export const upsertChatReaction = async (input: UpsertChatReactionInput) => {
  const reactionData: Record<string, unknown> = {
    emoji: input.emoji,
    reactorName: input.name.trim(),
    reactorAuthProvider: input.authProvider,
    createdAt: serverTimestamp(),
  };

  if (input.uid) {
    reactionData.reactorUid = input.uid;
  }

  if (input.clientId) {
    reactionData.reactorClientId = input.clientId;
  }

  await setDoc(getReactionDocument(input.messageId, input.reactorId), reactionData);
};

export const removeChatReaction = async (messageId: string, reactorId: string) => {
  await deleteDoc(getReactionDocument(messageId, reactorId));
};

export const signInChatUserWithGoogle = () => signInWithPopup(auth, googleProvider);

export const signOutChatUser = () => signOut(auth);

export const subscribeToChatUser = (onUser: (user: User | null) => void) => {
  return onAuthStateChanged(auth, onUser);
};
