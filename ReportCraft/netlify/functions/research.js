const CORS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: CORS, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: CORS, body: JSON.stringify({ error: "Method Not Allowed" }) };
  }

  let topic = "";
  try {
    const body = JSON.parse(event.body || "{}");
    topic = (body.topic || "").trim();
  } catch {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: "Invalid request body" }) };
  }

  if (!topic) {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: "Topic is required" }) };
  }

  const apiKey = process.env.COHERE_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      headers: CORS,
      body: JSON.stringify({ error: "COHERE_API_KEY environment variable is missing. Please add it to your Netlify dashboard." }),
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

  try {
    // 1. Fetch factual context from Wikipedia (fast, capped)
    const { context, sources } = await fetchWikiContext(topic);

    // 2. Query Cohere with grounded context
    const cohereRes = await fetch("https://api.cohere.com/v2/chat", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "command-r7b-12-2024",
        messages: [
          {
            role: "system",
            content: `You are a research scientist. Write a brief research report using ONLY the context below.

Use these EXACT headers on their own lines:
ABSTRACT:
METHODOLOGY:
ANALYSIS:
CONCLUSION:

Write exactly 2 sentences per section. Be concise.

CONTEXT:
${context}`,
          },
          {
            role: "user",
            content: `Research report on: "${topic}"`,
          },
        ],
        temperature: 0.1,
        max_tokens: 300,
      }),
    });

    clearTimeout(timeout);

    if (!cohereRes.ok) {
      const errText = await cohereRes.text().catch(() => "");
      console.error("Cohere error:", cohereRes.status, errText);
      return {
        statusCode: 500,
        headers: CORS,
        body: JSON.stringify({ error: `Cohere API error: ${cohereRes.status} ${errText}` }),
      };
    }

    const data = await cohereRes.json();
    const content = data.message?.content?.[0]?.text || data.text || "";

    if (!content) {
      return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: "Cohere returned an empty response." }) };
    }

    const abstract    = extractSection(content, "ABSTRACT")    || content.split("\n\n")[0] || "";
    const methodology = extractSection(content, "METHODOLOGY") || content.split("\n\n")[1] || "";
    const analysis    = extractSection(content, "ANALYSIS")    || content.split("\n\n")[2] || "";
    const conclusion  = extractSection(content, "CONCLUSION")  || content.split("\n\n").slice(-1)[0] || "";

    return {
      statusCode: 200,
      headers: CORS,
      body: JSON.stringify({
        report: content,
        abstract:    abstract    || `Comprehensive analysis of ${topic}.`,
        methodology: methodology || "Multi-source research methodology applied.",
        analysis:    analysis    || "Deep analysis across key dimensions.",
        conclusion:  conclusion  || "Key findings synthesized.",
        sources: sources.length > 0 ? sources : buildSources(topic),
        topic,
      }),
    };
  } catch (err) {
    clearTimeout(timeout);
    console.error("Research function error:", err);
    return {
      statusCode: 500,
      headers: CORS,
      body: JSON.stringify({ error: `Server timeout or network error: ${err.message}. The research report generation took longer than the maximum allowed serverless execution time (10 seconds).` }),
    };
  }
};

// ── Wikipedia Integration ──────────────────────────────────────────────────

async function fetchWikiContext(topic) {
  try {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(topic)}&gsrlimit=2&prop=extracts&exintro=true&explaintext=true&exchars=800&format=json`;
    const res = await fetch(searchUrl);
    const data = await res.json();
    
    if (!data.query || !data.query.pages) {
      return { context: "No direct information found. Extrapolate based on general scientific principles.", sources: [] };
    }

    let context = "";
    let sources = [];
    let id = 1;

    for (const [pageId, page] of Object.entries(data.query.pages)) {
      if (!page.extract) continue;
      context += `[Article: ${page.title}]\n${page.extract}\n\n`;
      sources.push({
        id: id++,
        title: page.title,
        pub: "Wikipedia",
        type: "Encyclopedia Article",
        url: `https://en.wikipedia.org/?curid=${pageId}`,
        snippet: page.extract.substring(0, 100) + "...",
        keywords: [topic],
      });
    }

    return { context: context.substring(0, 1500), sources };
  } catch (err) {
    console.error("Wikipedia fetch error:", err);
    return { context: "Rely on standard baseline knowledge.", sources: [] };
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────

function extractSection(text, sectionName) {
  const regex = new RegExp(
    `${sectionName}[:\\s]*\\n([\\s\\S]*?)(?=\\n(?:ABSTRACT|METHODOLOGY|ANALYSIS|CONCLUSION)[:\\s]*\\n|$)`,
    "i"
  );
  const match = text.match(regex);
  return match ? match[1].trim() : "";
}

function buildSources(topic) {
  return [
    {
      id: 1,
      title: `State of the Field: ${topic}`,
      pub: "ReportCraft Research Engine",
      type: "AI Synthesis",
      url: "https://cohere.com",
      snippet: `Comprehensive AI-driven synthesis of current research on ${topic}.`,
      keywords: [topic],
    }
  ];
}
