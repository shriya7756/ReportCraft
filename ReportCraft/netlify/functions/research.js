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

  const apiKey = process.env.COHERE_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Cohere API key not configured. Please add COHERE_API_KEY to your Netlify environment variables." }),
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

    const response = await fetch('https://api.cohere.ai/v1/chat', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        message: userPrompt,
        model: "command-r-plus",
        preamble: systemPrompt,
        temperature: 0.2
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Cohere API error: ${response.status} — ${errText}`);
    }

    const data = await response.json();
    const content = data.text || "";
    
    // Extract sources from Cohere's documents
    const documents = data.documents || [];
    const citations = documents.map(doc => ({
      url: doc.url,
      title: doc.title || doc.url
    }));

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
