import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { MessageCircle, X, Send, Bot, ArrowUpRight, RefreshCw } from "lucide-react";
import { sendSupportMessage, type ChatReply } from "@/lib/support-chat.functions";
import {
  QUICK_ACTIONS,
  WHATSAPP_URL,
  UNKNOWN_MESSAGE,
  type Intent,
} from "@/lib/vaultofcourse-kb";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  intent?: Intent;
  escalate?: boolean;
  link?: { label: string; path: string } | null;
};

const GREETING: ChatMessage = {
  id: "greeting",
  role: "assistant",
  content:
    "Hi! I'm the VaultOfCourse Support Assistant. I can help with courses, training programs, internships, workshops, certificates, offer letters and verification. What do you need help with?",
};

const uid = () => Math.random().toString(36).slice(2);

function WhatsAppButton({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp font-semibold text-whatsapp-foreground shadow-bubble transition-transform hover:scale-[1.02] active:scale-[0.99]",
        compact ? "px-3 py-2 text-xs" : "px-4 py-3 text-sm",
      )}
    >
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-current">
        <path d="M20.5 3.5A11 11 0 0 0 3.2 17.1L2 22l5-1.3A11 11 0 1 0 20.5 3.5Zm-8.4 17a9 9 0 0 1-4.6-1.3l-.3-.2-3 .8.8-2.9-.2-.3A9 9 0 1 1 12.1 20.5Zm5-6.6c-.3-.1-1.7-.8-1.9-.9s-.4-.1-.6.1l-.8 1c-.2.2-.3.2-.6.1a7.4 7.4 0 0 1-3.6-3.2c-.2-.3 0-.5.1-.6l.6-.7c.2-.2.2-.4.1-.6l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.6a1.2 1.2 0 0 0-.8.4 3.4 3.4 0 0 0-1.1 2.5 6 6 0 0 0 1.3 3.2 12 12 0 0 0 4.7 4.1c2 .8 2.6.7 3.1.7a2.9 2.9 0 0 0 2-1.4 2.4 2.4 0 0 0 .2-1.4c-.1-.2-.2-.3-.4-.4Z" />
      </svg>
      Chat on WhatsApp
    </a>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-bubble-bot px-4 py-3 shadow-bubble">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full bg-brand-muted animate-dot"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

export function SupportChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const send = useServerFn(sendSupportMessage);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  async function submit(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    setError(null);
    setInput("");

    const history = [...messages, { id: uid(), role: "user" as const, content }];
    setMessages(history);
    setLoading(true);

    try {
      const result: ChatReply = await send({
        data: {
          messages: history
            .filter((m) => m.id !== "greeting")
            .map(({ role, content }) => ({ role, content })),
        },
      });
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "assistant",
          content: result.reply,
          intent: result.intent,
          escalate: result.escalate,
          link: result.link,
        },
      ]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setMessages((prev) => [
        ...prev,
        { id: uid(), role: "assistant", content: UNKNOWN_MESSAGE, escalate: true },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const showQuickActions = messages.length === 1 && !loading;

  return (
    <>
      {/* Floating launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close support chat" : "Open support chat"}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand text-brand-foreground shadow-launcher transition-transform duration-200 hover:scale-105 active:scale-95 sm:h-16 sm:w-16"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="VaultOfCourse Support Assistant"
          className="animate-panel-in fixed inset-x-3 bottom-24 z-50 flex max-h-[78vh] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-widget sm:inset-x-auto sm:right-5 sm:w-[400px] md:w-[420px]"
        >
          {/* Header */}
          <div className="bg-gradient-brand px-4 py-4 text-brand-foreground">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-foreground/15">
                <Bot className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display truncate text-sm font-semibold">
                  VaultOfCourse Support Assistant
                </p>
                <p className="flex items-center gap-1.5 text-xs opacity-80">
                  <span className="h-1.5 w-1.5 rounded-full bg-whatsapp" />
                  Online · first-level support
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMessages([GREETING])}
                aria-label="Restart conversation"
                className="rounded-lg p-1.5 opacity-80 transition hover:bg-brand-foreground/15 hover:opacity-100"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-background px-4 py-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn("animate-bubble-in flex", m.role === "user" ? "justify-end" : "justify-start")}
              >
                <div className="max-w-[85%] space-y-2">
                  <div
                    className={cn(
                      "whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-bubble",
                      m.role === "user"
                        ? "rounded-br-sm bg-brand text-brand-foreground"
                        : "rounded-bl-sm bg-bubble-bot text-bubble-bot-foreground",
                    )}
                  >
                    {m.content}
                  </div>

                  {m.link && (
                    <Link
                      to={m.link.path as "/"}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-highlight hover:text-brand"
                    >
                      {m.link.label}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  )}

                  {m.escalate && <WhatsAppButton />}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <TypingDots />
              </div>
            )}

            {showQuickActions && (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK_ACTIONS.map((a) => (
                  <button
                    key={a.label}
                    type="button"
                    onClick={() => submit(a.message)}
                    className="rounded-full border border-border bg-brand-soft px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-highlight hover:bg-card"
                  >
                    <span className="mr-1">{a.emoji}</span>
                    {a.label}
                  </button>
                ))}
              </div>
            )}

            {error && (
              <p className="text-xs text-destructive" role="status">
                {error}
              </p>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(input);
            }}
            className="border-t border-border bg-card px-3 py-3"
          >
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about courses, certificates, internships…"
                aria-label="Message"
                className="min-w-0 flex-1 rounded-full border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-highlight"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground transition hover:opacity-90 disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-2">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-[11px] text-muted-foreground transition hover:text-brand"
              >
                Need a human? Contact WhatsApp support
              </a>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
