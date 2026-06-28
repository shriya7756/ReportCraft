# IReportCraft - AI-Powered Research Intelligence Platform

IReportCraft is a next-generation AI-powered research intelligence platform that transforms how individuals and organizations discover, analyze, and synthesize information.

## Features

- **AI-Powered Research**: Generate comprehensive reports on any topic in minutes
- **Multi-Source Intelligence**: Aggregates data from academic journals, news, and the web
- **Professional Reports**: Publication-ready reports with proper citations and formatting
- **Real-time Analysis**: Instant insights with verified sources
- **Dark Mode**: Beautiful dark theme support
- **Responsive Design**: Works seamlessly on all devices

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) with App Router
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Radix UI primitives
- **Theme**: next-themes for dark mode

## Getting Started

First, install dependencies:

```bash
npm install --legacy-peer-deps
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── dashboard/         # User dashboard
│   ├── research/          # Research interface
│   ├── report/[slug]/     # Report display
│   ├── settings/          # User settings
│   ├── globals.css        # Global styles & design system
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── sections/         # Page sections (Hero, Features, etc.)
│   ├── navigation.tsx    # Glassmorphism navbar
│   ├── footer.tsx        # Site footer
│   └── theme-provider.tsx # Theme context
├── lib/                  # Utility functions
│   └── utils.ts         # cn() helper
```

## Design System

- **Primary Color**: Deep Indigo (#4F46E5)
- **Accent Color**: Purple (#7C3AED)
- **Success Color**: Emerald (#10B981)
- **Typography**: Inter (UI), JetBrains Mono (code)
- **Border Radius**: 12px (cards), 8px (buttons)

## Build for Production

```bash
npm run build
```

## Deploy

Deploy easily on Vercel or any platform supporting Next.js:

```bash
vercel --prod
```

## License

Copyright (c) 2024 IReportCraft. All rights reserved.

