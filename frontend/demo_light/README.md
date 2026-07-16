# ReportCraft — Streamlit Demo Interface

A lightweight demo interface for the ReportCraft research engine, built with Streamlit.

## Features

1. Create new research articles through the "Create New Article" page
2. Real-time progress display during article generation
3. Side-by-side article and reference display
4. Browse previously created articles through "My Articles"

## Setup

1. Install the `knowledge-reportcraft` package or set up the source code
2. Install additional packages:
   ```bash
   pip install -r requirements.txt
   ```
3. Set up API keys in `secrets.toml` and place under `.streamlit/`
4. Run the demo:
   ```bash
   streamlit run reportcraft.py
   ```

The interface creates a `DEMO_WORKING_DIR` directory to store outputs.

## Customization

You can customize the research engine by modifying `set_reportcraft_runner()` in `demo_util.py`. Adjust `ReportCraftWikiRunnerArguments`, `ReportCraftWikiLMConfigs`, or swap in a different retrieval model.
