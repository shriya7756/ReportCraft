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

  let topic = "", message = "";
  try {
    const body = JSON.parse(event.body || "{}");
    topic   = (body.topic   || "").trim();
    message = (body.message || "").trim();
  } catch {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: "Invalid request body" }) };
  }

  if (!topic || !message) {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: "Topic and message are required" }) };
  }

  const apiKey = process.env.COHERE_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 200,
      headers: CORS,
      body: JSON.stringify({ response: generateFallbackResponse(topic, message) }),
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const { context } = await fetchWikiContext(message + " " + topic);

    const cohereRes = await fetch("https://api.cohere.com/v2/chat", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "command-r-plus-08-2024",
        messages: [
          {
            role: "system",
            content: `You are Zephryn, an elite AI research scientist. 
The user has completed research on "${topic}". Answer follow-up questions with scientific precision. Be concise but highly informative.
Use the following factual context retrieved for their specific question to ground your answer:

FACTUAL CONTEXT:
${context}`,
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.2,
        max_tokens: 600,
      }),
    });

    clearTimeout(timeout);

    if (!cohereRes.ok) {
      return {
        statusCode: 200,
        headers: CORS,
        body: JSON.stringify({ response: generateFallbackResponse(topic, message) }),
      };
    }

    const data = await cohereRes.json();
    const content =
      data.message?.content?.[0]?.text ||
      data.text ||
      generateFallbackResponse(topic, message);

    return {
      statusCode: 200,
      headers: CORS,
      body: JSON.stringify({ response: content }),
    };
  } catch (err) {
    clearTimeout(timeout);
    console.error("Chat function error:", err);
    return {
      statusCode: 200,
      headers: CORS,
      body: JSON.stringify({ response: generateFallbackResponse(topic, message) }),
    };
  }
};

async function fetchWikiContext(query) {
  try {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&srlimit=2`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
    
    if (!searchData.query || !searchData.query.search || searchData.query.search.length === 0) {
      return { context: "No direct information found." };
    }

    const pageIds = searchData.query.search.map(s => s.pageid).join('|');
    const extractUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&pageids=${pageIds}&exintro=true&explaintext=true&format=json`;
    const extractRes = await fetch(extractUrl);
    const extractData = await extractRes.json();

    let context = "";
    for (const [pageId, page] of Object.entries(extractData.query.pages)) {
      context += `[Article: ${page.title}]\n${page.extract}\n\n`;
    }
    return { context };
  } catch (err) {
    return { context: "" };
  }
}

function generateFallbackResponse(topic, message) {
  const q = message.toLowerCase();
  if (q.includes("trend") || q.includes("future") || q.includes("direction")) {
    return `Regarding future trends in ${topic}: The field is rapidly converging with adjacent disciplines, driving a new generation of hybrid approaches. Researchers anticipate major milestones within 2–5 years as foundational models mature into scalable production systems. Key vectors include increased automation, improved interpretability, and wider democratization of access tools.`;
  }
  if (q.includes("challenge") || q.includes("problem") || q.includes("issue") || q.includes("limitation")) {
    return `The primary challenges in ${topic} center on three axes: (1) Scalability — current methods don't generalize well to real-world complexity at production scale; (2) Reproducibility — many published results are difficult to replicate across different experimental settings; (3) Adoption — bridging the gap between research prototypes and enterprise-grade deployments remains a significant bottleneck requiring both technical and organizational solutions.`;
  }
  if (q.includes("application") || q.includes("use case") || q.includes("industry") || q.includes("real world")) {
    return `${topic} has found compelling applications across multiple domains. Healthcare organizations are deploying it to improve diagnostic precision and drug discovery pipelines. Financial institutions leverage it for real-time risk modeling and fraud detection. Meanwhile, education technology companies use it to personalize learning pathways at scale. Each domain brings unique constraints — regulatory, computational, and ethical — that are actively shaping how the technology evolves.`;
  }
  return `That's an important question about ${topic}. Current research indicates a nuanced picture where multiple competing hypotheses have strong empirical support. The most rigorous studies suggest that context matters enormously — results that hold in one setting may not transfer directly to others. The emerging consensus recommends a systematic approach: establish clear baselines, test assumptions rigorously, and iterate based on measured outcomes rather than theoretical predictions. Would you like me to focus on a specific aspect of this?`;
}
