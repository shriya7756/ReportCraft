import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "IReportCraft - AI-Powered Research Intelligence Platform",
  description: "Generate comprehensive research reports with AI. Transform your research workflow with intelligent automation and professional-grade insights.",
  keywords: ["research", "AI", "intelligence", "reports", "platform"],
  authors: [{ name: "IReportCraft" }],
  openGraph: {
    title: "IReportCraft - AI-Powered Research Intelligence",
    description: "Transform your research workflow with intelligent automation",
    type: "website",
    siteName: "IReportCraft",
  },
  twitter: {
    card: "summary_large_image",
    title: "IReportCraft",
    description: "AI-Powered Research Intelligence Platform",
  },
  robots: {
    index: true,
    follow: true,
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
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "var(--background)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "16px",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
