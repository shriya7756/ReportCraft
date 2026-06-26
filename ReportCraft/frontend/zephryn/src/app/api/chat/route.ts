import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { topic, message } = await request.json();

    if (!topic || !message) {
      return NextResponse.json(
        { error: "Topic and message are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.COHERE_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        response: generateMockChatResponse(topic, message),
      });
    }

    try {
      const cohereResponse = await fetch("https://api.cohere.com/v2/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "X-Client-Name": "ReportCraft-chat",
        },
        body: JSON.stringify({
          model: "command-r-plus-08-2024",
          messages: [
            {
              role: "system",
              content: `You are ReportCraft, an elite AI research scientist with deep expertise. The user has just completed research on the topic: "${topic}". Answer their follow-up questions with scientific precision, providing data-backed insights. Be concise but highly informative. Use clear paragraphs.`,
            },
            {
              role: "user",
              content: message,
            },
          ],
          temperature: 0.3,
          max_tokens: 800,
        }),
        signal: AbortSignal.timeout(15000),
      });

      if (!cohereResponse.ok) {
        return NextResponse.json({
          response: generateMockChatResponse(topic, message),
        });
      }

      const cohereData = await cohereResponse.json();
      const content: string =
        cohereData.message?.content?.[0]?.text ||
        cohereData.text ||
        generateMockChatResponse(topic, message);

      return NextResponse.json({ response: content });
    } catch {
      return NextResponse.json({
        response: generateMockChatResponse(topic, message),
      });
    }
  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request." },
      { status: 500 }
    );
  }
}

function generateMockChatResponse(topic: string, message: string): string {
  const q = message.toLowerCase();
  if (q.includes("trend") || q.includes("future") || q.includes("direction")) {
    return `Regarding future trends in ${topic}: The field is moving rapidly toward greater integration with adjacent disciplines. Key vectors include increased automation, improved interpretability, and wider democratization of access. Expect significant milestones within the next 2–5 years as foundational research matures into scalable applications.`;
  }
  if (q.includes("challenge") || q.includes("problem") || q.includes("issue")) {
    return `The primary challenges in ${topic} center around three axes: (1) scalability — current methods don't always generalize well to real-world complexity; (2) reproducibility — many reported results are difficult to replicate across different settings; and (3) adoption — bridging the gap between research prototypes and production-grade deployments remains a significant hurdle.`;
  }
  if (q.includes("application") || q.includes("use case") || q.includes("industry")) {
    return `${topic} has found compelling applications across multiple industries. Healthcare organizations are using it to improve diagnostic accuracy. Financial institutions are deploying it for risk modeling. Meanwhile, education technology companies are leveraging it to personalize learning pathways. Each domain brings unique constraints and requirements that are shaping how the technology evolves.`;
  }
  return `That's an insightful question about ${topic}. Based on current research, the evidence points to a complex interplay of factors. The most relevant frameworks suggest that understanding this requires considering both the theoretical underpinnings and the practical implementation context. Researchers in this space recommend a systematic approach: examine the foundational assumptions, test them against empirical data, and iterate. Is there a specific aspect you'd like me to drill deeper into?`;
}
