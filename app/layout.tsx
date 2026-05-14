import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://flowsync.ai";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FlowSync AI — Automate Your Entire Business With AI",
    template: "%s · FlowSync AI",
  },
  description:
    "FlowSync AI is the all-in-one workflow automation platform trusted by 10,000+ teams. Automate repetitive work, surface predictive insights and ship faster with AI.",
  keywords: [
    "AI workflow automation",
    "SaaS landing page",
    "FlowSync AI",
    "AI productivity",
    "business automation",
    "predictive analytics",
  ],
  authors: [{ name: "FlowSync AI" }],
  creator: "FlowSync AI",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "FlowSync AI",
    title: "FlowSync AI — Automate Your Entire Business With AI",
    description:
      "The all-in-one AI workflow automation platform trusted by 10,000+ teams worldwide.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "FlowSync AI dashboard preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowSync AI — Automate Your Entire Business With AI",
    description:
      "The all-in-one AI workflow automation platform trusted by 10,000+ teams worldwide.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {/* Skip link for keyboard users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-white focus:text-black"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
