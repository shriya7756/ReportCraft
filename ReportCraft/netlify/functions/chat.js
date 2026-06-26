exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { topic, message } = JSON.parse(event.body || "{}");

  if (!topic || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Topic and message are required" }),
    };
  }

  const apiKey = process.env.COHERE_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Cohere API key not configured." }),
    };
  }

  try {
    const systemPrompt = `You are Zephryn, an elite AI research scientist with deep expertise. The user has just completed research on the topic: "${topic}". Answer their follow-up questions with scientific precision, citing sources and providing data-backed insights. Be concise but highly informative.`;

    const response = await fetch('https://api.cohere.ai/v1/chat', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        message: message,
        model: "command-r-plus",
        preamble: systemPrompt,
        temperature: 0.3
      }),
    });

    if (!response.ok) {
      throw new Error(`Cohere API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.text || "Unable to generate response.";

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ response: content }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || "Chat synthesis failed." }),
    };
  }
};
