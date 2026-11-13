import { NextResponse } from "next/server";
import { askAssistant, type AiMessage } from "@/lib/ai";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const rawMessages = Array.isArray(body?.messages) ? body.messages : [];
  const messages: AiMessage[] = rawMessages
    .filter((m: unknown) => m && typeof (m as AiMessage).content === "string")
    .slice(-12)
    .map((m: AiMessage) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content).slice(0, 4000),
    }));
  if (messages.length === 0)
    return NextResponse.json({ error: "Savol yozing" }, { status: 400 });

  const context = {
    problem: typeof body?.context?.problem === "string" ? body.context.problem : undefined,
    region: typeof body?.context?.region === "string" ? body.context.region : undefined,
  };

  const reply = await askAssistant(messages, context);
  return NextResponse.json(reply);
}
