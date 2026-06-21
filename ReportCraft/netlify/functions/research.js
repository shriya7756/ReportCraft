exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { topic } = JSON.parse(event.body || "{}");

  if (!topic) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Topic is required" }),
    };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Gemini API key not configured. Please add GEMINI_API_KEY to your Netlify environment variables." }),
    };
  }

  try {
    const systemPrompt = `You are an elite research scientist and academic writer. Generate a comprehensive, deeply analytical research report. Structure your response in clearly separated sections using double newlines between each section. Follow this exact structure:

ABSTRACT: A concise but dense summary of the topic's current state, key findings, and significance (2-3 paragraphs).

METHODOLOGY: Describe the research landscape — what methods researchers use, what data sources exist, what experimental frameworks dominate this field.

ANALYSIS: Deep multi-faceted analysis of the topic. Cover the key developments, debates, breakthroughs, challenges, and future directions. Be specific with data, statistics, and citations where possible.

CONCLUSION: Synthesize the key takeaways, open problems, and what the scientific community should focus on next.

Write with authority, precision, and depth appropriate for a research scientist audience.`;

    const userPrompt = `Conduct a comprehensive research investigation on: "${topic}"\n\nSearch the web thoroughly for the most recent and relevant scientific literature, papers, datasets, and developments. Generate a full research report structured as: Abstract, Methodology, Analysis, and Conclusion.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          { role: "user", parts: [{ text: userPrompt }] }
        ],
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        tools: [
          { googleSearch: {} }
        ],
        generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 4000
        }
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API error: ${response.status} — ${errText}`);
    }

    const data = await response.json();
    const candidate = data.candidates?.[0];
    const content = candidate?.content?.parts?.[0]?.text || "";
    
    // Extract sources from Google Search grounding metadata
    const groundingChunks = candidate?.groundingMetadata?.groundingChunks || [];
    const citations = [];
    groundingChunks.forEach(chunk => {
      if (chunk.web && chunk.web.uri) {
        citations.push({
            url: chunk.web.uri,
            title: chunk.web.title || chunk.web.uri
        });
      }
    });

    // Parse sections from content
    const sections = content.split(/\n\n+/);
    const findSection = (keywords) => {
      const idx = sections.findIndex((s) =>
        keywords.some((kw) => s.toUpperCase().startsWith(kw))
      );
      if (idx === -1) return sections[Math.min(sections.length - 1, 0)] || "";
      // return the section text, stripping the keyword header
      const raw = sections[idx];
      const stripped = raw.replace(/^(ABSTRACT|METHODOLOGY|ANALYSIS|CONCLUSION|\*\*ABSTRACT\*\*|\*\*METHODOLOGY\*\*|\*\*ANALYSIS\*\*|\*\*CONCLUSION\*\*)[:\s]*/i, "").trim();
      return stripped || sections[idx + 1] || "";
    };

    const abstract = findSection(["ABSTRACT", "**ABSTRACT**"]);
    const methodology = findSection(["METHODOLOGY", "**METHODOLOGY**"]);
    const analysis = findSection(["ANALYSIS", "DEEP ANALYSIS", "**ANALYSIS**", "**DEEP ANALYSIS**"]);
    const conclusion = findSection(["CONCLUSION", "**CONCLUSION**"]);

    // Map citations to source cards
    const sources = citations.slice(0, 8).map((cite, i) => {
      let domain = "";
      try {
        domain = new URL(cite.url).hostname.replace("www.", "");
      } catch {
        domain = cite.url;
      }
      return {
        id: i + 1,
        title: cite.title,
        pub: domain,
        type: "Web Source",
        url: cite.url,
        snippet: `Referenced in research synthesis for "${topic}".`,
        keywords: [topic],
      };
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        report: content,
        abstract,
        methodology,
        analysis,
        conclusion,
        sources,
        topic,
      }),
    };
  } catch (err) {
    console.error("Research function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || "Research synthesis failed." }),
    };
  }
};
