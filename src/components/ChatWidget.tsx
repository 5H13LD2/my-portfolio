import { useEffect, useRef, useState, type FormEvent } from "react";
import { LogOut, Loader2, MessageSquare, MoreHorizontal, Reply, Send, SmilePlus, X } from "lucide-react";
import { useChat } from "../hooks/useChat";
import type { ChatMessage, ChatReaction, ChatReactionEmoji } from "../types/chat";

const REACTION_EMOJIS: ChatReactionEmoji[] = ["👍", "❤️", "😂", "😮", "😢"];

const formatChatTime = (date: Date) =>
  new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);

const summarizeReactions = (reactions: ChatReaction[]) =>
  REACTION_EMOJIS.map((emoji) => ({
    emoji,
    count: reactions.filter((reaction) => reaction.emoji === emoji).length,
  })).filter((summary) => summary.count > 0);

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeReactionMessageId, setActiveReactionMessageId] = useState<string | null>(null);
  const [activeMenuMessageId, setActiveMenuMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const longPressTimeoutRef = useRef<number | null>(null);
  const {
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
    cancelReply,
    signIn,
    signOut,
    startReply,
    submitMessage,
    toggleReaction,
    updateField,
  } = useChat();

  useEffect(() => {
    if (!isOpen) return;

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isOpen, messages]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitMessage();
  };

  const handleReaction = async (messageId: string, emoji: ChatReactionEmoji) => {
    await toggleReaction(messageId, emoji);
    setActiveReactionMessageId(null);
  };

  const clearLongPress = () => {
    if (longPressTimeoutRef.current === null) return;

    window.clearTimeout(longPressTimeoutRef.current);
    longPressTimeoutRef.current = null;
  };

  const beginLongPress = (message: ChatMessage) => {
    clearLongPress();
    longPressTimeoutRef.current = window.setTimeout(() => {
      startReply(message);
      setActiveMenuMessageId(null);
      setActiveReactionMessageId(null);
    }, 560);
  };

  const handleReply = (message: ChatMessage) => {
    startReply(message);
    setActiveMenuMessageId(null);
    setActiveReactionMessageId(null);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen && (
        <section className="mb-3 flex h-[min(560px,calc(100vh-96px))] w-[calc(100vw-40px)] max-w-[360px] flex-col overflow-hidden rounded-lg border border-[#242424] bg-[#0d0d0d] shadow-[0_22px_70px_rgba(0,0,0,0.48)] animate-fade-in">
          <header className="flex items-center justify-between border-b border-[#1e1e1e] bg-[#101010] px-4 py-3">
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-[#f2f2f2]">Chat with Jerico</h2>
              <p className="text-xs text-[#888]">
                {mode === "google" && user ? user.email : mode === "anonymous" ? "Anonymous in public chat" : "Public chat room"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {mode && (
                <button
                  type="button"
                  onClick={signOut}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-[#2a2a2a] bg-[#111] text-[#ccc] transition-colors hover:border-[#555] hover:text-white"
                  aria-label="Sign out"
                  title="Sign out"
                >
                  <LogOut size={15} />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-[#2a2a2a] bg-[#111] text-[#ccc] transition-colors hover:border-[#555] hover:text-white"
                aria-label="Close chat"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            {authLoading ? (
              <div className="flex h-full items-center justify-center text-sm text-[#888]">
                <Loader2 size={16} className="mr-2 animate-spin" />
                Checking account
              </div>
            ) : !mode ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#0d1828] text-[#7aadff]">
                  <MessageSquare size={18} />
                </div>
                <p className="text-sm font-medium text-[#e5e5e5]">Choose how to chat</p>
                <p className="mt-1 max-w-[230px] text-xs leading-5 text-[#888]">
                  Everyone can see messages in this room. Continue anonymously or use Google.
                </p>
                <div className="mt-4 flex w-full max-w-[230px] flex-col gap-2">
                  <button
                    type="button"
                    onClick={continueAnonymously}
                    className="min-h-10 rounded-md border border-[#2a2a2a] bg-[#111] px-4 text-sm font-medium text-[#e5e5e5] transition-colors hover:border-[#555] hover:text-white"
                  >
                    Continue anonymously
                  </button>
                  <button
                    type="button"
                    onClick={signIn}
                    className="min-h-10 rounded-md bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    Continue with Google
                  </button>
                </div>
                {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
              </div>
            ) : mode === "google" && !user ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className="text-sm font-medium text-[#e5e5e5]">Google sign-in needed</p>
                <button
                  type="button"
                  onClick={signIn}
                  className="mt-4 min-h-10 rounded-md bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Continue with Google
                </button>
                {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
              </div>
            ) : loading ? (
              <div className="flex h-full items-center justify-center text-sm text-[#888]">
                <Loader2 size={16} className="mr-2 animate-spin" />
                Loading chat
              </div>
            ) : messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#0d1828] text-[#7aadff]">
                  <MessageSquare size={18} />
                </div>
                <p className="text-sm font-medium text-[#e5e5e5]">Start a conversation</p>
                <p className="mt-1 max-w-[220px] text-xs leading-5 text-[#888]">
                  Send a message here and everyone in the room will see it.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((message) => {
                  const isOwnMessage =
                    (message.senderAuthProvider === "google" && Boolean(user?.uid) && message.senderUid === user?.uid) ||
                    (message.senderAuthProvider === "anonymous" && message.senderClientId === anonymousClientId);
                  const reactions = reactionsByMessage[message.id] ?? [];
                  const ownReaction = reactions.find((reaction) =>
                    user?.uid ? reaction.id === user.uid : reaction.id === anonymousClientId,
                  );
                  const reactionSummary = summarizeReactions(reactions);
                  const isReactionPickerOpen = activeReactionMessageId === message.id;

                  return (
                    <div key={message.id} className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
                      <div className={`relative flex max-w-[88%] items-end gap-2 ${isOwnMessage ? "flex-row-reverse" : ""}`}>
                        <div className={`${isOwnMessage ? "items-end" : "items-start"} flex max-w-[calc(100%-2.25rem)] flex-col gap-1`}>
                          <div
                            onPointerDown={() => beginLongPress(message)}
                            onPointerUp={clearLongPress}
                            onPointerCancel={clearLongPress}
                            onPointerLeave={clearLongPress}
                            className={`rounded-lg px-3 py-2 ${
                              isOwnMessage
                                ? "bg-blue-600 text-white"
                                : "border border-[#242424] bg-[#171717] text-[#e5e5e5]"
                            }`}
                          >
                            {message.replyTo && (
                              <div
                                className={`mb-2 rounded-md border-l-2 px-2 py-1 ${
                                  isOwnMessage
                                    ? "border-blue-200 bg-blue-500/35 text-blue-50"
                                    : "border-[#555] bg-[#101010] text-[#cfcfcf]"
                                }`}
                              >
                                <p className="text-[11px] font-medium">{message.replyTo.senderName}</p>
                                <p className="line-clamp-2 text-[11px] leading-4 opacity-85">{message.replyTo.text}</p>
                              </div>
                            )}
                            {!isOwnMessage && (
                              <p className="mb-1 text-[11px] font-medium text-[#999]">{message.senderName}</p>
                            )}
                            <p className="whitespace-pre-wrap break-words text-sm leading-5">{message.text}</p>
                            <p className={`mt-1 text-[11px] ${isOwnMessage ? "text-blue-100" : "text-[#777]"}`}>
                              {formatChatTime(message.createdAt)}
                            </p>
                          </div>
                          <div className={`flex flex-wrap gap-1 ${isOwnMessage ? "justify-end" : "justify-start"}`}>
                            {reactionSummary.map((summary) => (
                              <button
                                key={summary.emoji}
                                type="button"
                                onClick={() => toggleReaction(message.id, summary.emoji)}
                                className={`min-h-7 rounded-full border px-2 text-xs transition-colors ${
                                  ownReaction?.emoji === summary.emoji
                                    ? "border-blue-500 bg-[#0d1828] text-[#dbeafe]"
                                    : "border-[#2a2a2a] bg-[#111] text-[#cfcfcf] hover:border-[#555]"
                                }`}
                                aria-label={`React with ${summary.emoji}`}
                                title={`React with ${summary.emoji}`}
                              >
                                <span>{summary.emoji}</span>
                                <span className="ml-1">{summary.count}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="relative mb-1 flex flex-shrink-0 flex-col gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              setActiveReactionMessageId((current) => (current === message.id ? null : message.id))
                            }
                            className={`flex h-7 w-7 items-center justify-center rounded-full border text-[#cfcfcf] transition-colors ${
                              isReactionPickerOpen
                                ? "border-blue-500 bg-[#0d1828] text-[#dbeafe]"
                                : "border-[#2a2a2a] bg-[#111] hover:border-[#555] hover:text-white"
                            }`}
                            aria-label="Open reactions"
                            aria-expanded={isReactionPickerOpen}
                            title="React"
                          >
                            <SmilePlus size={15} />
                          </button>

                          {isReactionPickerOpen && (
                            <div
                              className={`reaction-picker absolute bottom-8 z-10 flex flex-col gap-1 rounded-full border border-[#2a2a2a] bg-[#111]/95 p-1 shadow-[0_12px_35px_rgba(0,0,0,0.35)] backdrop-blur-md ${
                                isOwnMessage ? "right-0" : "left-0"
                              }`}
                            >
                              {REACTION_EMOJIS.map((emoji, index) => (
                                <button
                                  key={emoji}
                                  type="button"
                                  onClick={() => handleReaction(message.id, emoji)}
                                  className={`reaction-picker-button flex h-8 w-8 items-center justify-center rounded-full border text-base transition-colors hover:scale-110 ${
                                    ownReaction?.emoji === emoji
                                      ? "border-blue-500 bg-[#0d1828]"
                                      : "border-transparent bg-transparent hover:bg-[#1f1f1f]"
                                  }`}
                                  style={{ animationDelay: `${index * 0.035}s` }}
                                  aria-label={`React with ${emoji}`}
                                  title={`React with ${emoji}`}
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuMessageId((current) => (current === message.id ? null : message.id));
                              setActiveReactionMessageId(null);
                            }}
                            className={`flex h-7 w-7 items-center justify-center rounded-full border text-[#cfcfcf] transition-colors ${
                              activeMenuMessageId === message.id
                                ? "border-blue-500 bg-[#0d1828] text-[#dbeafe]"
                                : "border-[#2a2a2a] bg-[#111] hover:border-[#555] hover:text-white"
                            }`}
                            aria-label="Open message actions"
                            aria-expanded={activeMenuMessageId === message.id}
                            title="More"
                          >
                            <MoreHorizontal size={16} />
                          </button>

                          {activeMenuMessageId === message.id && (
                            <div
                              className={`absolute bottom-0 z-10 min-w-24 rounded-md border border-[#2a2a2a] bg-[#111]/95 p-1 shadow-[0_12px_35px_rgba(0,0,0,0.35)] backdrop-blur-md ${
                                isOwnMessage ? "right-8" : "left-8"
                              }`}
                            >
                              <button
                                type="button"
                                onClick={() => handleReply(message)}
                                className="flex min-h-8 w-full items-center gap-2 rounded px-2 text-left text-xs text-[#e5e5e5] transition-colors hover:bg-[#1f1f1f]"
                              >
                                <Reply size={14} />
                                Reply
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-[#1e1e1e] bg-[#101010] p-3">
            {replyTarget && (
              <div className="mb-2 flex items-start justify-between gap-2 rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-[#dbeafe]">Replying to {replyTarget.senderName}</p>
                  <p className="truncate text-xs text-[#888]">{replyTarget.text}</p>
                </div>
                <button
                  type="button"
                  onClick={cancelReply}
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-[#aaa] transition-colors hover:bg-[#171717] hover:text-white"
                  aria-label="Cancel reply"
                  title="Cancel reply"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            <div className="flex items-end gap-2">
              <textarea
                value={form.text}
                onChange={(event) => updateField("text", event.target.value)}
                className="max-h-28 min-h-11 flex-1 resize-none rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-sm text-[#f2f2f2] outline-none transition-colors placeholder:text-[#666] focus:border-blue-500"
                placeholder={mode ? "Type your message" : "Choose a chat mode first"}
                disabled={!mode || authLoading || (mode === "google" && !user)}
                rows={1}
              />
              <button
                type="submit"
                disabled={!mode || submitting || authLoading || (mode === "google" && !user)}
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Send message"
                title="Send"
              >
                {submitting ? <Loader2 size={17} className="animate-spin" /> : <Send size={17} />}
              </button>
            </div>

            {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-11 w-11 items-center justify-center rounded-full border-none bg-blue-600 text-white shadow-[0_4px_20px_rgba(37,99,235,0.35)] transition-colors hover:bg-blue-700"
        title="Chat"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={18} /> : <MessageSquare size={18} />}
      </button>
    </div>
  );
}
