# ReportCraft — AI-Powered Research Platform

Transform any topic into comprehensive, well-cited research reports powered by advanced AI.

## Overview

ReportCraft is an LLM-powered system that generates comprehensive, Wikipedia-style articles from scratch based on internet research. The platform uses a multi-perspective research methodology to automatically:

1. **Research Phase**: Conduct internet-based research to collect references from diverse perspectives
2. **Writing Phase**: Use the collected information to generate full-length articles with proper citations

### Key Features

- **Intelligent Research**: Automatically discovers diverse perspectives and conducts multi-angle research
- **Multi-Perspective Analysis**: Simulates expert conversations to uncover deeper insights
- **Structured Reports**: Well-organized, article-style reports with hierarchical outlines
- **Verifiable Citations**: Every claim backed by traceable sources with inline citations
- **Web-Scale Sources**: Integrates with multiple search engines and retrieval systems

## Installation

### Python Package

```bash
pip install knowledge-reportcraft
```

### From Source

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd ReportCraft
   ```

2. Install required packages
   ```bash
   conda create -n reportcraft python=3.11
   conda activate reportcraft
   pip install -r requirements.txt
   ```

## Quick Start

### Using the ReportCraft Engine

```python
from knowledge_reportcraft import ReportCraftWikiRunnerArguments, ReportCraftWikiRunner, ReportCraftWikiLMConfigs
from knowledge_reportcraft.lm import LitellmModel
from knowledge_reportcraft.rm import YouRM

# Configure language models
lm_configs = ReportCraftWikiLMConfigs()
openai_kwargs = {
    'api_key': os.getenv("OPENAI_API_KEY"),
    'temperature': 1.0,
    'top_p': 0.9,
}

gpt_4 = LitellmModel(model='gpt-4o', max_tokens=3000, **openai_kwargs)
lm_configs.set_article_gen_lm(gpt_4)

# Configure search
engine_args = ReportCraftWikiRunnerArguments(output_dir='./output')
rm = YouRM(ydc_api_key=os.getenv('YDC_API_KEY'), k=engine_args.search_top_k)

# Run research
runner = ReportCraftWikiRunner(engine_args, lm_configs, rm)
runner.run(topic="Your Research Topic", do_research=True, do_generate_article=True)
```

## Frontend

### Next.js Application

The primary web interface is built with Next.js, React, and Tailwind CSS.

```bash
cd frontend/reportcraft
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the application.

### Streamlit Demo

A lightweight demo interface is also available via Streamlit:

```bash
cd frontend/demo_light
pip install -r requirements.txt
streamlit run reportcraft.py
```

## API & Integrations

- **Language Models**: All models supported by LiteLLM
- **Search Engines**: YouRM, BingSearch, SerperRM, BraveRM, GoogleSearch, and more
- **Embedding Models**: All embedding models supported by LiteLLM
- **Document Grounding**: VectorRM for user-provided document collections

## Project Structure

```
ReportCraft/
├── frontend/
│   ├── reportcraft/         # Next.js web application
│   └── demo_light/          # Streamlit demo interface
├── knowledge_reportcraft/         # Core research engine
│   ├── reportcraft_wiki/          # Wiki-style report generation
│   └── collaborative_reportcraft/ # Collaborative research features
├── examples/                # Example scripts
└── requirements.txt
```

## Configuration

Create a `secrets.toml` file with your API keys:

```toml
OPENAI_API_KEY = "your_openai_api_key"
OPENAI_API_TYPE = "openai"
YDC_API_KEY = "your_you_api_key"  # for You.com search
BING_SEARCH_API_KEY = "your_bing_key"  # for Bing search
```


