import { NextResponse } from "next/server";

// ── Types ──────────────────────────────────────────────────────────────────

interface WebSource {
  id: number;
  title: string;
  pub: string;
  type: string;
  url: string;
  snippet: string;
  keywords: string[];
}

// ── Main handler ───────────────────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    const { topic } = await request.json();

    if (!topic?.trim()) {
      return NextResponse.json({ error: "Topic is required." }, { status: 400 });
    }

    const cleanTopic = topic.trim();
    const apiKey = process.env.COHERE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "COHERE_API_KEY is not set. Add it to your .env.local file and restart the dev server. Get a free key at https://dashboard.cohere.com/api-keys",
        },
        { status: 503 }
      );
    }

    // 1. Fetch real context from the Live Web
    const { context, sources } = await fetchWebContext(cleanTopic);

    // 2. Call Cohere grounded on Web context
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);

    let cohereContent = "";
    try {
      const cohereRes = await fetch("https://api.cohere.com/v2/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "X-Client-Name": "ReportCraft",
        },
        body: JSON.stringify({
          model: "command-r-plus-08-2024",
          messages: [
            {
              role: "system",
              content: `You are a research scientist. Write a concise research report using ONLY the context below. Do not fabricate facts not present in the context.

Use these EXACT headers on their own lines (no markdown formatting like ## or **):
ABSTRACT:
METHODOLOGY:
ANALYSIS:
CONCLUSION:

Write 3–4 sentences per section. Be specific and factual. Reference the articles by name when relevant.

CONTEXT:
${context}`,
            },
            {
              role: "user",
              content: `Write a research report on: "${cleanTopic}"`,
            },
          ],
          temperature: 0.1,
          max_tokens: 600,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (cohereRes.ok) {
        const data = await cohereRes.json();
        cohereContent =
          data.message?.content?.[0]?.text || data.text || "";
      } else {
        const errText = await cohereRes.text().catch(() => "");
        console.error("Cohere error:", cohereRes.status, errText);
        clearTimeout(timeout);
        return NextResponse.json(
          { error: `Cohere API returned ${cohereRes.status}. Check your API key.` },
          { status: 502 }
        );
      }
    } catch (err) {
      clearTimeout(timeout);
      const isTimeout =
        err instanceof Error && err.name === "AbortError";
      return NextResponse.json(
        {
          error: isTimeout
            ? "Request timed out. Try a more specific topic."
            : `Network error reaching Cohere: ${err instanceof Error ? err.message : "unknown"}`,
        },
        { status: 504 }
      );
    }

    if (!cohereContent) {
      return NextResponse.json(
        { error: "Cohere returned an empty response." },
        { status: 502 }
      );
    }

    // Normalize inline markdown headers that Cohere sometimes adds
    const normalized = cohereContent
      .replace(/##\s*(ABSTRACT|METHODOLOGY|ANALYSIS|CONCLUSION)\s*:/gi, "\n$1:\n")
      .replace(/\*{1,2}(ABSTRACT|METHODOLOGY|ANALYSIS|CONCLUSION)\*{0,2}\s*:/gi, "\n$1:\n");

    const abstract =
      extractSection(normalized, "ABSTRACT") ||
      `Research on ${cleanTopic} complete. See full report for details.`;
    const methodology =
      extractSection(normalized, "METHODOLOGY") ||
      "Multi-source research methodology applied.";
    const analysis =
      extractSection(normalized, "ANALYSIS") ||
      "See full report for detailed analysis.";
    const conclusion =
      extractSection(normalized, "CONCLUSION") ||
      "Key findings synthesised. See full report.";

    return NextResponse.json({
      report: normalized,
      abstract,
      methodology,
      analysis,
      conclusion,
      sources: sources.length > 0 ? sources : buildFallbackSources(cleanTopic),
      topic: cleanTopic,
    });
  } catch (err) {
    console.error("Research route error:", err);
    return NextResponse.json(
      { error: "Unexpected server error. Please try again." },
      { status: 500 }
    );
  }
}

// ── Live Web Search ────────────────────────────────────────────────────────

async function fetchWebContext(
  topic: string
): Promise<{ context: string; sources: WebSource[] }> {
  try {
    const res = await fetch("https://html.duckduckgo.com/html/?q=" + encodeURIComponent(topic), {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      },
      signal: AbortSignal.timeout(8000),
    });

    const html = await res.text();
    
    let context = "";
    const sources: WebSource[] = [];
    
    const resultRegex = /<a class="result__url" href="([^"]+)".*?>(.*?)<\/a>.*?<a class="result__snippet[^>]*>(.*?)<\/a>/gs;
    let match;
    let id = 1;
    
    while ((match = resultRegex.exec(html)) !== null && id <= 4) {
      let rawUrl = match[1];
      if (rawUrl.startsWith('//duckduckgo.com/l/?uddg=')) {
        rawUrl = decodeURIComponent(rawUrl.split('uddg=')[1].split('&')[0]);
      }
      
      const title = match[2].replace(/<[^>]+>/g, '').trim();
      const snippet = match[3].replace(/<[^>]+>/g, '').trim();
      
      context += `[Source ${id}: ${title}]\n${snippet}\n\n`;
      
      sources.push({
        id: id,
        title: title,
        pub: new URL(rawUrl).hostname.replace('www.', ''),
        type: "Web Article",
        url: rawUrl,
        snippet: snippet.length > 140 ? snippet.substring(0, 140) + "…" : snippet,
        keywords: [topic],
      });
      id++;
    }

    if (sources.length === 0) {
      return {
        context: "No direct web information found. Generate a general factual overview based on common knowledge.",
        sources: [],
      };
    }

    return { context: context.substring(0, 3000), sources };
  } catch (err) {
    console.error("Web fetch error:", err);
    return {
      context: "Web search unavailable. Generate a factual overview based on general knowledge.",
      sources: [],
    };
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────

function extractSection(text: string, sectionName: string): string {
  const allSections = "ABSTRACT|METHODOLOGY|ANALYSIS|CONCLUSION";
  const regex = new RegExp(
    `${sectionName}\\s*:\\s*\\n?([\\s\\S]*?)(?=\\n\\s*(?:${allSections})\\s*:|$)`,
    "i"
  );
  const match = text.match(regex);
  return match ? match[1].trim() : "";
}

function buildFallbackSources(topic: string): WebSource[] {
  return [
    {
      id: 1,
      title: `General Research on ${topic}`,
      pub: "ReportCraft Engine",
      type: "AI Synthesis",
      url: `https://google.com/search?q=${encodeURIComponent(topic)}`,
      snippet: `Synthesized research based on general knowledge of ${topic}.`,
      keywords: [topic],
    },
  ];
}
