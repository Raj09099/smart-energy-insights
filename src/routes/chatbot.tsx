import { createFileRoute } from "@tanstack/react-router";
import { Bot, SendHorizonal, Sparkles, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { askAssistant } from "@/lib/api";

export const Route = createFileRoute("/chatbot")({
  head: () => ({
    meta: [
      { title: "AI Energy Assistant — VoltSense AI" },
      {
        name: "description",
        content:
          "Chat with the VoltSense AI assistant about faults, consumption spikes, voltage fluctuation and energy saving tips.",
      },
      { property: "og:title", content: "AI Energy Assistant — VoltSense AI" },
      {
        property: "og:description",
        content: "Ask questions about your electrical system in plain language.",
      },
    ],
  }),
  component: ChatbotPage,
});

interface Message {
  id: number;
  role: "user" | "ai";
  text: string;
}

const suggestions = [
  "Why is my power consumption high?",
  "Detect electrical fault",
  "Give energy saving tips",
  "Explain voltage fluctuation",
];

function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "ai",
      text: "Hello! I'm the VoltSense energy assistant. I can explain faults, analyse consumption patterns and suggest savings. What would you like to look at?",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typing]);

  const send = async (text: string) => {
    const value = text.trim();
    if (!value || typing) return;
    setInput("");
    setMessages((m) => [...m, { id: Date.now(), role: "user", text: value }]);
    setTyping(true);
    // POST /api/chat on the Flask backend (canned replies until connected)
    const reply = await askAssistant(value);
    await new Promise((r) => setTimeout(r, 900));
    setTyping(false);
    setMessages((m) => [...m, { id: Date.now() + 1, role: "ai", text: reply }]);
  };

  return (
    <SiteShell>
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            AI Chatbot
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Energy Assistant
          </h1>
        </div>

        <div className="glass flex h-[calc(100vh-19rem)] min-h-[460px] flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border/60 px-5 py-4">
            <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-brand-gradient">
              <Bot className="h-5 w-5 text-primary-foreground" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-secondary" />
            </span>
            <div>
              <p className="text-sm font-semibold">VoltSense Assistant</p>
              <p className="text-xs text-secondary">Online · grounded in your telemetry</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-6">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex items-end gap-2.5 ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.role === "ai" && (
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border bg-muted/50 text-accent">
                    <Bot className="h-4 w-4" />
                  </span>
                )}
                <div
                  className={`max-w-[78%] animate-fade-in-up whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-brand-gradient text-primary-foreground"
                      : "border border-border bg-muted/50 text-foreground"
                  }`}
                >
                  {m.text}
                </div>
                {m.role === "user" && (
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border bg-muted/50 text-secondary">
                    <User className="h-4 w-4" />
                  </span>
                )}
              </div>
            ))}

            {typing && (
              <div className="flex items-end gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-muted/50 text-accent">
                  <Bot className="h-4 w-4" />
                </span>
                <div className="flex items-center gap-1.5 rounded-2xl border border-border bg-muted/50 px-4 py-4">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-2 w-2 animate-blink rounded-full bg-accent"
                      style={{ animationDelay: `${i * 0.18}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 border-t border-border/60 px-4 pt-4 sm:px-6">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3.5 py-1.5 text-xs text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
              >
                <Sparkles className="h-3 w-3" />
                {s}
              </button>
            ))}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 px-4 py-4 sm:px-6"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about faults, usage or savings…"
              aria-label="Message"
              className="flex-1 rounded-xl border border-input bg-muted/40 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent/70 focus:ring-2 focus:ring-ring/40"
            />
            <button
              type="submit"
              disabled={typing}
              aria-label="Send message"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-gradient text-primary-foreground transition-transform hover:scale-105 disabled:opacity-60"
            >
              <SendHorizonal className="h-4.5 w-4.5" />
            </button>
          </form>
        </div>
      </section>
    </SiteShell>
  );
}
