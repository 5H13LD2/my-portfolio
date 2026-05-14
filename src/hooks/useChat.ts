import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import {
  removeChatReaction,
  sendChatMessage,
  signInChatUserWithGoogle,
  signOutChatUser,
  subscribeToChatMessages,
  subscribeToChatReactions,
  subscribeToChatUser,
  upsertChatReaction,
} from "../services/chatService";
import type { ChatMessage, ChatReaction, ChatReactionEmoji, ChatReplyTarget } from "../types/chat";

type ChatFormState = {
  text: string;
};

type ChatMode = "anonymous" | "google" | null;
type ReactionsByMessage = Record<string, ChatReaction[]>;

const CHAT_MODE_STORAGE_KEY = "portfolio-chat-mode";
const CHAT_ANONYMOUS_CLIENT_ID_STORAGE_KEY = "portfolio-chat-anonymous-client-id";

const getAnonymousClientId = () => {
  const storedClientId = localStorage.getItem(CHAT_ANONYMOUS_CLIENT_ID_STORAGE_KEY);

  if (storedClientId) {
    return storedClientId;
  }

  const nextClientId = crypto.randomUUID();
  localStorage.setItem(CHAT_ANONYMOUS_CLIENT_ID_STORAGE_KEY, nextClientId);
  return nextClientId;
};

const getChatErrorMessage = (error: unknown, action: "load" | "send") => {
  const message = error instanceof Error ? error.message : "";

  if (message.toLowerCase().includes("permission")) {
    return action === "load"
      ? "Firebase rules blocked loading global chat. Please check the chatRooms read rule."
      : "Firebase rules blocked sending this message. Please check the chatRooms create rule.";
  }

  return message || "Unable to send your message.";
};

export function useChat() {
  const [anonymousClientId] = useState(getAnonymousClientId);
  const [mode, setMode] = useState<ChatMode>(() => {
    const storedMode = localStorage.getItem(CHAT_MODE_STORAGE_KEY);

    return storedMode === "anonymous" || storedMode === "google" ? storedMode : null;
  });
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [reactionsByMessage, setReactionsByMessage] = useState<ReactionsByMessage>({});
  const [form, setForm] = useState<ChatFormState>({ text: "" });
  const [replyTarget, setReplyTarget] = useState<ChatReplyTarget | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToChatUser((currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (messages.length === 0) {
      setReactionsByMessage({});
      return;
    }

    const messageIds = messages.map((message) => message.id);
    const unsubscribes = messageIds.map((messageId) =>
      subscribeToChatReactions(
        messageId,
        (reactions) => {
          setReactionsByMessage((current) => ({
            ...current,
            [messageId]: reactions,
          }));
        },
        (reactionError) => {
          setError(getChatErrorMessage(reactionError, "load"));
        },
      ),
    );

    setReactionsByMessage((current) =>
      Object.fromEntries(Object.entries(current).filter(([messageId]) => messageIds.includes(messageId))),
    );

    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, [messages]);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToChatMessages(
      (items) => {
        setMessages(items);
        setLoading(false);
      },
      (chatError) => {
        setError(getChatErrorMessage(chatError, "load"));
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  const updateField = (field: keyof ChatFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError(null);
  };

  const signIn = async () => {
    setError(null);
    if (!user) {
      await signInChatUserWithGoogle();
    }
    localStorage.setItem(CHAT_MODE_STORAGE_KEY, "google");
    setMode("google");
  };

  const signOut = async () => {
    setError(null);
    if (mode === "google") {
      await signOutChatUser();
    }
    localStorage.removeItem(CHAT_MODE_STORAGE_KEY);
    setMode(null);
    setForm({ text: "" });
  };

  const continueAnonymously = async () => {
    setError(null);
    if (user) {
      await signOutChatUser();
    }
    localStorage.setItem(CHAT_MODE_STORAGE_KEY, "anonymous");
    setMode("anonymous");
  };

  const submitMessage = async () => {
    if (!mode) {
      setError("Please choose how you want to chat.");
      return;
    }

    if (mode === "google" && !user) {
      setError("Please sign in with Google before sending.");
      return;
    }

    if (!form.text.trim()) {
      setError("Please write a message.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      if (mode === "anonymous" && user) {
        await signOutChatUser();
      }

      await sendChatMessage({
        uid: mode === "google" ? user?.uid : undefined,
        name: mode === "google" ? user?.displayName || "Google user" : "Anonymous visitor",
        email: mode === "google" ? user?.email || "" : "",
        photoURL: mode === "google" ? user?.photoURL : null,
        authProvider: mode,
        clientId: mode === "anonymous" ? anonymousClientId : undefined,
        text: form.text,
        replyTo: replyTarget,
      });

      setForm({ text: "" });
      setReplyTarget(null);
    } catch (submitError) {
      setError(getChatErrorMessage(submitError, "send"));
    } finally {
      setSubmitting(false);
    }
  };

  const getReactorId = () => {
    if (mode === "google") {
      return user?.uid;
    }

    if (mode === "anonymous") {
      return anonymousClientId;
    }

    return undefined;
  };

  const toggleReaction = async (messageId: string, emoji: ChatReactionEmoji) => {
    if (!mode) {
      setError("Please choose how you want to chat before reacting.");
      return;
    }

    if (mode === "google" && !user) {
      setError("Please sign in with Google before reacting.");
      return;
    }

    setError(null);

    try {
      if (mode === "anonymous" && user) {
        await signOutChatUser();
      }

      const reactorId = getReactorId();

      if (!reactorId) {
        setError("Unable to identify your reaction.");
        return;
      }

      const currentReaction = reactionsByMessage[messageId]?.find((reaction) => reaction.id === reactorId);

      if (currentReaction?.emoji === emoji) {
        await removeChatReaction(messageId, reactorId);
        return;
      }

      await upsertChatReaction({
        messageId,
        emoji,
        reactorId,
        uid: mode === "google" ? user?.uid : undefined,
        name: mode === "google" ? user?.displayName || "Google user" : "Anonymous visitor",
        email: mode === "google" ? user?.email || "" : "",
        photoURL: mode === "google" ? user?.photoURL : null,
        authProvider: mode,
        clientId: mode === "anonymous" ? anonymousClientId : undefined,
      });
    } catch (reactionError) {
      setError(getChatErrorMessage(reactionError, "send"));
    }
  };

  const startReply = (message: ChatMessage) => {
    setReplyTarget({
      messageId: message.id,
      senderName: message.senderName,
      text: message.text.slice(0, 140),
    });
    setError(null);
  };

  const cancelReply = () => {
    setReplyTarget(null);
  };

  return {
    authLoading,
    error,
    form,
    loading,
    mode,
    messages,
    reactionsByMessage,
    replyTarget,
    submitting,
    user,
    anonymousClientId,
    continueAnonymously,
    signIn,
    signOut,
    startReply,
    cancelReply,
    submitMessage,
    toggleReaction,
    updateField,
  };
}
