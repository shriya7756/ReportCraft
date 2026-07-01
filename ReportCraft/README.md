# ReportCraft — AI-Powered Research Platform

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.11-blue?logo=python&logoColor=white" alt="Python 3.11"/>
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" alt="Next.js"/>
  <img src="https://img.shields.io/badge/Deployed%20on-Netlify-00C7B7?logo=netlify&logoColor=white" alt="Netlify"/>
  <img src="https://img.shields.io/badge/AI-Cohere%20%7C%20LiteLLM-6B4FBB?logo=openai&logoColor=white" alt="AI"/>
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License"/>
</p>

> Transform any topic into a comprehensive, well-cited research report powered by advanced AI.

ReportCraft is an LLM-powered research platform that generates structured, Wikipedia-style articles from internet research. It combines a multi-perspective research engine with a modern web interface and serverless API to deliver fast, grounded reports on any subject.

## ✨ Key Features

| Feature | Description |
|---|---|
| 🔍 **Intelligent Research** | Automatically discovers diverse perspectives and conducts multi-angle research |
| 🧠 **Multi-Perspective Analysis** | Simulates expert conversations to uncover deeper insights |
| 📄 **Structured Reports** | Well-organized reports with Abstract, Methodology, Analysis, and Conclusion sections |
| 🔗 **Verifiable Citations** | Every claim backed by traceable Wikipedia and web sources |
| 💬 **AI Chat** | Follow-up question assistant grounded in the same research context |
| ⚡ **Serverless API** | Netlify Functions with sub-10-second response times |

---

## 🚀 Installation

### Option A — Python Package (PyPI)

```bash
pip install knowledge-reportcraft
```

### Option B — From Source

1. **Clone the repository**
   ```bash
   git clone https://github.com/shriya7756/ReportCraft.git
   cd ReportCraft
   ```

2. **Create and activate a virtual environment**
   ```bash
   conda create -n reportcraft python=3.11
   conda activate reportcraft
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

---

## ⚡ Quick Start

### Python Engine

```python
import os
from knowledge_reportcraft import (
    ReportCraftWikiRunnerArguments,
    ReportCraftWikiRunner,
    ReportCraftWikiLMConfigs,
)
from knowledge_reportcraft.lm import LitellmModel
from knowledge_reportcraft.rm import YouRM

# 1. Configure language models
lm_configs = ReportCraftWikiLMConfigs()
openai_kwargs = {
    "api_key": os.getenv("OPENAI_API_KEY"),
    "temperature": 1.0,
    "top_p": 0.9,
}
gpt_4 = LitellmModel(model="gpt-4o", max_tokens=3000, **openai_kwargs)
lm_configs.set_article_gen_lm(gpt_4)

# 2. Configure search retrieval
engine_args = ReportCraftWikiRunnerArguments(output_dir="./output")
rm = YouRM(ydc_api_key=os.getenv("YDC_API_KEY"), k=engine_args.search_top_k)

# 3. Run the research pipeline
runner = ReportCraftWikiRunner(engine_args, lm_configs, rm)
runner.run(
    topic="Quantum Computing",
    do_research=True,
    do_generate_article=True,
)
```

The generated report will be saved to `./output/` in both Markdown and HTML formats.
