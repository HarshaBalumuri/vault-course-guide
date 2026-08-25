import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  buildKnowledgeContext,
  classifyIntent,
  needsEscalation,
  ESCALATION_MESSAGE,
  UNKNOWN_MESSAGE,
  INTENT_ROUTES,
  SITE_ROUTES,
  type Intent,
} from "./vaultofcourse-kb";

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

function systemPrompt(knowledge: string, intent: Intent, escalate: boolean) {
  return `You are the official VaultOfCourse website support assistant.

Your responsibilities:
- Answer common student queries.
- Provide accurate information from the knowledge base only.
- Guide users to the relevant website page.
- Help users navigate the website.
- Redirect unresolved or account-specific issues to WhatsApp support.

Hard rules:
- Never invent course details, durations, syllabus items or fees.
- Never invent or quote fee amounts. Point to the relevant page instead.
- Never promise refunds. Never claim access to student accounts or records.
- Never provide false information and never claim an issue is resolved.
- Only answer using the knowledge base below.
- If the information is unavailable, reply exactly: "${UNKNOWN_MESSAGE}"
- Keep replies short (2-4 sentences), warm and professional. Use plain text, no markdown headings.
- Use the conversation history to resolve references like "its", "that one", "the same course".
- When a website page answers the question, mention the page path (e.g. ${SITE_ROUTES.courses}).

Detected intent for the latest message: ${intent}.
${
  escalate
    ? `This message MUST be escalated. Reply with exactly: "${ESCALATION_MESSAGE}"`
    : "If the request is account-specific, involves payments, refunds, document corrections, missing documents or technical access problems, escalate instead of answering."
}

KNOWLEDGE BASE
${knowledge}`;
}

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
