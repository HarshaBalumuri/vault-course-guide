import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  buildKnowledgeContext,
  classifyIntent,
  needsEscalation,
  ESCALATION_MESSAGE,
  UNKNOWN_MESSAGE,
  INTENT_ROUTES,
  type Intent,
} from "./vaultofcourse-kb";
import { systemPrompt } from "./support-chat.server";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const inputSchema = z.object({
  messages: z.array(messageSchema).min(1).max(40),
});

export type ChatReply = {
  reply: string;
  intent: Intent;
  escalate: boolean;
  link: { label: string; path: string } | null;
};

export const sendSupportMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }): Promise<ChatReply> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    const latest = data.messages[data.messages.length - 1]!;
    const intent = classifyIntent(latest.content);
    const escalate = needsEscalation(latest.content, intent);
    const link = escalate ? null : (INTENT_ROUTES[intent] ?? null);

    if (escalate) {
      return { reply: ESCALATION_MESSAGE, intent, escalate: true, link: null };
    }

    if (!apiKey) {
      throw new Error("AI support is not configured. LOVABLE_API_KEY is missing.");
    }

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        temperature: 0.2,
        messages: [
          { role: "system", content: systemPrompt(buildKnowledgeContext(), intent, escalate) },
          ...data.messages,
        ],
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      if (res.status === 429) throw new Error("Too many requests right now. Please try again in a moment.");
      if (res.status === 402 || res.status === 403)
        throw new Error("AI support is temporarily unavailable. Please contact us on WhatsApp.");
      throw new Error(`AI request failed (${res.status}): ${body.slice(0, 300)}`);
    }

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const reply = json.choices?.[0]?.message?.content?.trim();

    return {
      reply: reply && reply.length > 0 ? reply : UNKNOWN_MESSAGE,
      intent,
      escalate: false,
      link,
    };
  });
