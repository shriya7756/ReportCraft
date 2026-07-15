import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ReportCraft — AI Research Reports with Real Citations",
  description:
    "Enter a topic. Get a structured research report powered by Cohere Command R+, backed by live web sources and inline citations. Free to try.",
  keywords: [
    "AI research tool",
    "research reports",
    "Cohere Command R+",
    "cited reports",
    "AI research assistant",
    "ReportCraft",
  ],
  openGraph: {
    title: "ReportCraft — AI Research Reports with Real Citations",
    description:
      "Enter a topic. Get a structured report backed by live web sources in minutes, powered by Cohere Command R+.",
    type: "website",
    siteName: "ReportCraft",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReportCraft — AI Research Reports with Real Citations",
    description:
      "Enter a topic. Get a structured report backed by live web sources in minutes, powered by Cohere Command R+.",
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
        className={`${inter.variable} ${jetbrainsMono.variable} ${outfit.variable} antialiased`}
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
                },
              }}
            />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
