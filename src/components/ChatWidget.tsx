import { useEffect, useRef, useState, type FormEvent } from "react";
import { LogOut, Loader2, MessageSquare, Send, X } from "lucide-react";
import { useChat } from "../hooks/useChat";

const formatChatTime = (date: Date) =>
  new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const {
    authLoading,
    error,
    form,
    loading,
    mode,
    messages,
    submitting,
    user,
    anonymousClientId,
    continueAnonymously,
    signIn,
    signOut,
    submitMessage,
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

                  return (
                    <div key={message.id} className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[82%] rounded-lg px-3 py-2 ${
                          isOwnMessage
                            ? "bg-blue-600 text-white"
                            : "border border-[#242424] bg-[#171717] text-[#e5e5e5]"
                        }`}
                      >
                        {!isOwnMessage && (
                          <p className="mb-1 text-[11px] font-medium text-[#999]">{message.senderName}</p>
                        )}
                        <p className="whitespace-pre-wrap break-words text-sm leading-5">{message.text}</p>
                        <p className={`mt-1 text-[11px] ${isOwnMessage ? "text-blue-100" : "text-[#777]"}`}>
                          {formatChatTime(message.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-[#1e1e1e] bg-[#101010] p-3">
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
