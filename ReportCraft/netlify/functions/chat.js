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
      statusCode: 500,
      headers: CORS,
      body: JSON.stringify({ error: "COHERE_API_KEY environment variable is missing. Please add it to your Netlify dashboard." }),
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

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
        model: "command-r7b-12-2024",
        messages: [
          {
            role: "system",
            content: `You are ReportCraft, an elite AI research scientist. 
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
        max_tokens: 300,
      }),
    });

    clearTimeout(timeout);

    if (!cohereRes.ok) {
      const errText = await cohereRes.text().catch(() => "");
      return {
        statusCode: 500,
        headers: CORS,
        body: JSON.stringify({ error: `Cohere API error: ${cohereRes.status} ${errText}` }),
      };
    }

    const data = await cohereRes.json();
    const content = data.message?.content?.[0]?.text || data.text || "";

    if (!content) {
      return {
        statusCode: 500,
        headers: CORS,
        body: JSON.stringify({ error: "Cohere returned an empty response." }),
      };
    }

    return {
      statusCode: 200,
      headers: CORS,
      body: JSON.stringify({ response: content }),
    };
  } catch (err) {
    clearTimeout(timeout);
    console.error("Chat function error:", err);
    return {
      statusCode: 500,
      headers: CORS,
      body: JSON.stringify({ error: `Server timeout or network error: ${err.message}` }),
    };
  }
};

async function fetchWikiContext(query) {
  try {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=2&prop=extracts&exintro=true&explaintext=true&format=json`;
    const res = await fetch(searchUrl);
    const data = await res.json();
    
    if (!data.query || !data.query.pages) {
      return { context: "No direct information found." };
    }

    let context = "";
    for (const [pageId, page] of Object.entries(data.query.pages)) {
      if (!page.extract) continue;
      context += `[Article: ${page.title}]\n${page.extract}\n\n`;
    }
    return { context };
  } catch (err) {
    return { context: "" };
  }
}
