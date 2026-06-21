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

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Gemini API key not configured." }),
    };
  }

  try {
    const systemPrompt = `You are Zephryn, an elite AI research scientist with deep expertise. The user has just completed research on the topic: "${topic}". Answer their follow-up questions with scientific precision, citing sources and providing data-backed insights. Be concise but highly informative.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          { role: "user", parts: [{ text: message }] }
        ],
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        tools: [
          { googleSearch: {} }
        ],
        generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1000
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const candidate = data.candidates?.[0];
    const content = candidate?.content?.parts?.[0]?.text || "Unable to generate response.";

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
