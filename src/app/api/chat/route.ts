import { NextRequest } from "next/server";
import { consultantSystemPrompt } from "@/lib/chat/system-prompt";
import { buildFallbackReply } from "@/lib/chat/fallback";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type IncomingMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

const FIRST_CHUNK_TIMEOUT_MS = 8000;

const allowedModels = (process.env.NEXT_PUBLIC_AI_MODELS || "")
  .split(",")
  .map((m) => m.trim())
  .filter(Boolean);

function streamFromString(text: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const tokens = text.split(/(\s+)/);
  let i = 0;
  return new ReadableStream({
    async pull(controller) {
      if (i >= tokens.length) {
        controller.close();
        return;
      }
      const chunk = tokens[i++];
      controller.enqueue(encoder.encode(chunk));
      await new Promise((r) => setTimeout(r, 14));
    },
  });
}

function fallbackResponse(messages: IncomingMessage[]) {
  const reply = buildFallbackReply(messages);
  return new Response(streamFromString(reply), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "x-saganski-mode": "fallback",
    },
  });
}

export async function POST(req: NextRequest) {
  let body: { messages?: IncomingMessage[]; model?: string } = {};
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  const sanitized = messages
    .filter(
      (m): m is IncomingMessage =>
        !!m &&
        typeof m.content === "string" &&
        ["user", "assistant", "system"].includes(m.role)
    )
    .slice(-30);

  const provider = (process.env.AI_PROVIDER || "openai").toLowerCase();
  const apiKey = process.env.OPENAI_API_KEY;
  const baseURL = process.env.OPENAI_BASE_URL;
  const defaultModel = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const requested = (body.model ?? "").trim();
  const safeModel =
    requested && (allowedModels.length === 0 || allowedModels.includes(requested))
      ? requested
      : defaultModel;

  if (provider === "openai" && apiKey) {
    try {
      const { createOpenAI } = await import("@ai-sdk/openai");
      const { streamText } = await import("ai");

      const openai = createOpenAI({
        apiKey,
        ...(baseURL ? { baseURL } : {}),
        compatibility: "compatible",
      });

      const result = streamText({
        model: openai(safeModel),
        system: consultantSystemPrompt,
        messages: sanitized.filter((m) => m.role !== "system"),
        temperature: 0.3,
        maxTokens: 1500,
        onError: (e) => {
          console.error("[chat] streamText error:", e);
        },
      });

      const reader = result.textStream.getReader();
      const firstChunk = await Promise.race([
        reader.read(),
        new Promise<{ value: undefined; done: true }>((resolve) =>
          setTimeout(
            () => resolve({ value: undefined, done: true }),
            FIRST_CHUNK_TIMEOUT_MS
          )
        ),
      ]);

      if (firstChunk.done || !firstChunk.value) {
        try {
          await reader.cancel();
        } catch {
          /* noop */
        }
        console.warn(
          `[chat] AI provider returned empty stream for model "${safeModel}" — using fallback.`
        );
        return fallbackResponse(sanitized);
      }

      const encoder = new TextEncoder();
      const stream = new ReadableStream<Uint8Array>({
        async start(controller) {
          controller.enqueue(encoder.encode(firstChunk.value!));
          try {
            while (true) {
              const { value, done } = await reader.read();
              if (done) break;
              if (value) controller.enqueue(encoder.encode(value));
            }
            controller.close();
          } catch (err) {
            console.error("[chat] streaming aborted:", err);
            controller.close();
          }
        },
        cancel() {
          reader.cancel().catch(() => undefined);
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "x-saganski-mode": "ai",
          "x-saganski-model": safeModel,
        },
      });
    } catch (error) {
      console.error("[chat] AI provider failed, using fallback:", error);
    }
  }

  return fallbackResponse(sanitized);
}
