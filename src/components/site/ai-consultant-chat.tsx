"use client";

import * as React from "react";
import { motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowUp, BrainCircuit, Loader2, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const envModels = (process.env.NEXT_PUBLIC_AI_MODELS || "")
  .split(",")
  .map((m) => m.trim())
  .filter(Boolean);

const modelLabel: Record<string, string> = {
  "gpt-5.4-mini": "GPT-5.4 Mini · rápido",
  "gpt-5.4": "GPT-5.4 · premium",
  "o4-mini": "o4-mini · raciocínio",
  "claude-sonnet-4-6": "Claude Sonnet 4.6",
  "claude-opus-4-7": "Claude Opus 4.7",
  "claude-haiku-4-5": "Claude Haiku 4.5",
  "llama3.1": "Llama 3.1 · open",
};

const availableModels = envModels.length > 0 ? envModels : ["gpt-5.4-mini"];
const defaultModel = availableModels[0];

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type Props = {
  variant?: "section" | "compact";
  initialMessage?: string;
  className?: string;
};

const defaultGreeting =
  "Olá. Sou o Consultor SAGANSKI AI. Posso ajudar a desenhar um sistema sob medida para a sua operação. Para começar, me conta: qual é o setor da empresa e qual processo manual mais consome o tempo do time hoje?";

const suggestionChips = [
  "Tenho operação comercial em planilhas",
  "Quero automatizar leitura de contratos",
  "Preciso de painel executivo em tempo real",
  "Atendimento no WhatsApp está descontrolado",
  "Quero IA aplicada ao financeiro",
];

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function AIConsultantChat({
  variant = "section",
  initialMessage = defaultGreeting,
  className,
}: Props) {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    { id: uid(), role: "assistant", content: initialMessage },
  ]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [mode, setMode] = React.useState<"ai" | "fallback" | "unknown">("unknown");
  const [model, setModel] = React.useState<string>(defaultModel);
  const [activeModel, setActiveModel] = React.useState<string | null>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function send(text?: string) {
    const value = (text ?? input).trim();
    if (!value || loading) return;
    setInput("");
    const userMsg: ChatMessage = { id: uid(), role: "user", content: value };
    const assistantMsg: ChatMessage = { id: uid(), role: "assistant", content: "" };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setLoading(true);

    try {
      const payload = [...messages, userMsg].map(({ role, content }) => ({
        role,
        content,
      }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload, model }),
      });

      const headerMode = res.headers.get("x-saganski-mode");
      if (headerMode === "ai" || headerMode === "fallback") setMode(headerMode);
      setActiveModel(res.headers.get("x-saganski-model"));

      if (!res.ok || !res.body) {
        throw new Error(`Resposta inválida (${res.status})`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { value: chunk, done } = await reader.read();
        if (done) break;
        const text = decoder.decode(chunk, { stream: true });
        if (!text) continue;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id ? { ...m, content: m.content + text } : m
          )
        );
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsg.id
            ? {
                ...m,
                content:
                  "Não consegui responder agora. Tente novamente em instantes ou use o formulário de contato.",
              }
            : m
        )
      );
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    void send();
  }

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border border-white/10 bg-[#040711]/85 backdrop-blur-xl shadow-[0_30px_80px_-15px_rgba(0,0,0,0.6)]",
        variant === "section" ? "min-h-[640px]" : "h-full",
        className
      )}
    >
      <header className="flex items-center justify-between gap-3 border-b border-white/10 p-4">
        <div className="flex items-center gap-3">
          <span className="relative inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-electric via-brand-cyan to-brand-violet text-white">
            <BrainCircuit className="size-4" />
            <span className="absolute inset-0 rounded-xl ring-1 ring-white/20" />
          </span>
          <div className="min-w-0">
            <p className="font-display text-sm font-semibold tracking-tight text-foreground">
              Consultor SAGANSKI
            </p>
            <p className="truncate text-[11px] text-foreground/60">
              {mode === "fallback"
                ? "Modo offline — fallback consultivo"
                : activeModel
                  ? `Foundry · ${modelLabel[activeModel] || activeModel}`
                  : "Pergunte sobre seu processo, sistemas ou IA aplicada"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {availableModels.length > 1 ? (
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger
                className="h-8 w-auto min-w-[150px] gap-1 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em]"
                aria-label="Selecionar modelo de IA"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableModels.map((m) => (
                  <SelectItem key={m} value={m}>
                    {modelLabel[m] || m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : null}
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em]",
              mode === "ai"
                ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                : mode === "fallback"
                  ? "border border-amber-300/30 bg-amber-300/10 text-amber-200"
                  : "border border-white/10 bg-white/5 text-foreground/60"
            )}
          >
            <span className="size-1.5 rounded-full bg-current" />
            {mode === "ai" ? "AI Live" : mode === "fallback" ? "Offline" : "Pronto"}
          </span>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-5">
        <div className="space-y-3">
          {messages.map((m) => (
            <Bubble key={m.id} message={m} />
          ))}
          {loading ? (
            <div className="flex items-center gap-2 text-xs text-foreground/55">
              <Loader2 className="size-3.5 animate-spin" />
              gerando resposta…
            </div>
          ) : null}
        </div>
      </div>

      {messages.length <= 2 ? (
        <div className="border-t border-white/10 px-4 pt-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-foreground/55">
            Sugestões para começar
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5 pb-3">
            {suggestionChips.map((s) => (
              <button
                key={s}
                type="button"
                disabled={loading}
                onClick={() => void send(s)}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[12px] text-foreground/80 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <form
        onSubmit={onSubmit}
        className="flex items-end gap-2 border-t border-white/10 p-3"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void send();
            }
          }}
          rows={1}
          placeholder="Descreva seu processo, dor ou objetivo…"
          className="min-h-[44px] max-h-40 flex-1 resize-none rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-brand-cyan/50 focus:ring-2 focus:ring-brand-cyan/20"
        />
        <Button type="submit" size="icon" disabled={!input.trim() || loading}>
          <ArrowUp className="size-4" />
          <span className="sr-only">Enviar</span>
        </Button>
      </form>
    </div>
  );
}

function Bubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "flex gap-2.5",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <span
        className={cn(
          "mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-lg border",
          isUser
            ? "border-white/10 bg-white/[0.04] text-foreground/80"
            : "border-brand-cyan/30 bg-gradient-to-br from-brand-electric/15 via-brand-cyan/15 to-brand-violet/15 text-brand-cyan"
        )}
      >
        {isUser ? <User className="size-3.5" /> : <Sparkles className="size-3.5" />}
      </span>
      <div
        className={cn(
          "max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "whitespace-pre-wrap bg-brand-cyan/15 text-foreground"
            : "border border-white/10 bg-white/[0.03] text-foreground/90"
        )}
      >
        {message.content ? (
          isUser ? (
            message.content
          ) : (
            <MarkdownContent value={message.content} />
          )
        ) : (
          <Cursor />
        )}
      </div>
    </motion.div>
  );
}

function Cursor() {
  return (
    <motion.span
      key="cursor"
      className="inline-block h-3 w-2 align-middle bg-brand-cyan/80"
      animate={{ opacity: [0.2, 1, 0.2] }}
      transition={{ duration: 1.1, repeat: Infinity }}
    />
  );
}

function MarkdownContent({ value }: { value: string }) {
  return (
    <div className="markdown-body text-sm leading-relaxed text-foreground/90">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h3 className="mt-4 mb-2 font-display text-base font-semibold tracking-tight text-foreground first:mt-0">
              {children}
            </h3>
          ),
          h2: ({ children }) => (
            <h4 className="mt-4 mb-1.5 font-display text-[13px] font-semibold uppercase tracking-[0.18em] text-brand-cyan/90 first:mt-0">
              {children}
            </h4>
          ),
          h3: ({ children }) => (
            <h5 className="mt-3 mb-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-foreground/85 first:mt-0">
              {children}
            </h5>
          ),
          p: ({ children }) => (
            <p className="my-2 first:mt-0 last:mb-0">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="my-2 ml-1 space-y-1.5 first:mt-0 last:mb-0">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-2 ml-4 list-decimal space-y-1.5 first:mt-0 last:mb-0">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="relative pl-4 marker:text-brand-cyan before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-brand-cyan/70 [li>&]:before:hidden">
              {children}
            </li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="text-foreground/80 italic">{children}</em>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-brand-cyan underline-offset-2 hover:underline"
            >
              {children}
            </a>
          ),
          code: ({ children, className }) => {
            const isBlock = (className ?? "").includes("language-");
            if (isBlock) {
              return (
                <code className="block rounded-lg border border-white/10 bg-black/40 p-3 font-mono text-[12px] text-foreground/90 overflow-x-auto">
                  {children}
                </code>
              );
            }
            return (
              <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[12px] text-brand-cyan">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="my-2 overflow-hidden rounded-xl border border-white/10 bg-black/40">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-2 border-l-2 border-brand-cyan/40 pl-3 text-foreground/75 italic">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="my-3 overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-[12px]">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-white/[0.04] text-[10px] uppercase tracking-[0.18em] text-foreground/60">
              {children}
            </thead>
          ),
          tr: ({ children }) => (
            <tr className="border-b border-white/5 last:border-0">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 font-semibold">{children}</th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 align-top text-foreground/85">{children}</td>
          ),
          hr: () => <hr className="my-4 border-white/10" />,
        }}
      >
        {value}
      </ReactMarkdown>
    </div>
  );
}
