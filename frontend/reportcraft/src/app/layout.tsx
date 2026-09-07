import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "react-hot-toast";

/*
 * SF Pro and SF Mono are Apple system fonts — no import needed.
 * Inter loads as the web fallback for non-Apple platforms.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reportcraft.app"),
  title: {
    default: "ReportCraft — AI Research Reports with Real Citations",
    template: "%s — ReportCraft",
  },
  description:
    "Enter any topic. Receive a structured research report powered by Cohere Command R+, grounded in live web sources with inline citations. No manual tab-juggling.",
  keywords: [
    "AI research tool",
    "research reports",
    "Cohere Command R+",
    "cited reports",
    "AI research assistant",
    "ReportCraft",
    "automated research",
    "web citations",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      { url: "/icons8-research-dotted-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons8-research-dotted-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons8-research-dotted-96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/icons8-research-dotted-72.png", sizes: "72x72", type: "image/png" },
    ],
  },
  openGraph: {
    title: "ReportCraft — AI Research Reports with Real Citations",
    description:
      "Enter a topic. Get a structured report grounded in live web sources in under a minute, powered by Cohere Command R+.",
    type: "website",
    siteName: "ReportCraft",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReportCraft — AI Research Reports with Real Citations",
    description:
      "Enter a topic. Get a structured report grounded in live web sources in under a minute, powered by Cohere Command R+.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
        style={{
          fontFamily:
            "'SF Pro Display', 'SF Pro Text', system-ui, -apple-system, BlinkMacSystemFont, var(--font-inter, Inter), sans-serif",
        }}
      >
        <AuthProvider>
          <ThemeProvider>
            <a href="#main-content" className="skip-to-content">
              Skip to content
            </a>
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
            <Toaster
              position="bottom-right"
              toastOptions={{
                className: "toast-custom",
                duration: 4000,
                style: {
                  background: "var(--card-bg)",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border)",
                  fontSize: "var(--type-footnote)",
                  borderRadius: "var(--rc-radius-lg)",
                },
              }}
            />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
