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
  title: "Zephryn — Ethereal Intelligence for Deep Synthesis",
  description:
    "Transcend traditional search. Zephryn orchestrates multi-agent reasoning ensembles to synthesize multi-perspective intelligence reports with high-fidelity precision.",
  keywords: [
    "autonomous research",
    "intelligence synthesis",
    "reasoning nexus",
    "multidimensional analysis",
    "zephryn",
  ],
  openGraph: {
    title: "Zephryn — Ethereal Intelligence for Deep Synthesis",
    description:
      "Orchestrating multi-agent reasoning ensembles for high-fidelity intelligence synthesis.",
    type: "website",
    siteName: "Zephryn",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zephryn — Ethereal Intelligence for Deep Synthesis",
    description:
      "Orchestrating multi-agent reasoning ensembles for high-fidelity intelligence synthesis.",
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
