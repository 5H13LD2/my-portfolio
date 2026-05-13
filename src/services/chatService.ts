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
import type { ChatMessage, ChatMessageDocument, CreateChatMessageInput } from "../types/chat";

const CHAT_ROOMS_COLLECTION = "chatRooms";
const GLOBAL_CHAT_ROOM_ID = "main";
const CHAT_MESSAGES_COLLECTION = "messages";

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
    createdAt: data.createdAt?.toDate() ?? new Date(),
  };
};

const getMessagesCollection = (threadId: string) =>
  collection(db, CHAT_ROOMS_COLLECTION, threadId, CHAT_MESSAGES_COLLECTION);

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

  await addDoc(getMessagesCollection(GLOBAL_CHAT_ROOM_ID), messageData);
};

export const signInChatUserWithGoogle = () => signInWithPopup(auth, googleProvider);

export const signOutChatUser = () => signOut(auth);

export const subscribeToChatUser = (onUser: (user: User | null) => void) => {
  return onAuthStateChanged(auth, onUser);
};
