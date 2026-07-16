import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { topic, message, reportContext } = await request.json();

    if (!topic || !message) {
      return NextResponse.json(
        { error: "Topic and message are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.COHERE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "COHERE_API_KEY is not set. Add it to .env.local and restart the dev server.",
        },
        { status: 503 }
      );
    }

    // Build system prompt — grounded on the actual report if provided
    const contextBlock = reportContext
      ? `\n\nThe user's current report content:\n${reportContext.substring(0, 2000)}`
      : "";

    const systemPrompt = `You are ReportCraft, a research assistant. The user has completed a research report on the topic: "${topic}".${contextBlock}

Answer follow-up questions based on the report content and your knowledge about ${topic}. Be specific, factual, and concise. Give direct answers — not "insightful question" filler. If you don't know, say so.`;

    try {
      const cohereRes = await fetch("https://api.cohere.com/v2/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "X-Client-Name": "ReportCraft-chat",
        },
        body: JSON.stringify({
          model: "command-r-plus-08-2024",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message },
          ],
          temperature: 0.3,
          max_tokens: 600,
        }),
        signal: AbortSignal.timeout(15000),
      });

      if (!cohereRes.ok) {
        const errText = await cohereRes.text().catch(() => "");
        console.error("Cohere chat error:", cohereRes.status, errText);
        return NextResponse.json(
          { error: `Cohere returned ${cohereRes.status}. Check your API key.` },
          { status: 502 }
        );
      }

      const data = await cohereRes.json();
      const content: string =
        data.message?.content?.[0]?.text || data.text || "";

      if (!content) {
        return NextResponse.json(
          { error: "Cohere returned an empty response." },
          { status: 502 }
        );
      }

      return NextResponse.json({ response: content });
    } catch (err) {
      const isTimeout = err instanceof Error && err.name === "AbortError";
      return NextResponse.json(
        {
          error: isTimeout
            ? "Request timed out. Try again."
            : `Network error: ${err instanceof Error ? err.message : "unknown"}`,
        },
        { status: 504 }
      );
    }
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
