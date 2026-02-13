import React from "react"
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2d3b80",
};

export const metadata: Metadata = {
  title: "MekonBot | The Governance Layer for Humanoid Robotics",
  description: "MekonBot is the independent certification authority and policy enforcement infrastructure for humanoid robotics. We verify skills before they execute, ensuring safety and compliance in the physical world.",
  keywords: ["humanoid robotics", "robot governance", "AI safety", "industrial automation", "robot certification", "policy enforcement"],
  authors: [{ name: "MekonBot Team" }],
  openGraph: {
    title: "MekonBot | The Governance Layer for Humanoid Robotics",
    description: "Standardizing trust for the next generation of industrial automation. Independent certification authority and policy enforcement infrastructure.",
    url: "https://mekonbot.com",
    siteName: "MekonBot",
    images: [
      {
        url: "/og-image.png", // Assuming an OG image exists or will exist
        width: 1200,
        height: 630,
        alt: "MekonBot - Governance for Humanoid Robotics",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MekonBot | The Governance Layer for Humanoid Robotics",
    description: "Standardizing trust for the next generation of industrial automation. Independent certification authority and policy enforcement infrastructure.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://mekonbot.com",
  },
  icons: {
    icon: "/logo-i.png",
    shortcut: "/logo-i.png",
    apple: "/logo-i.png",
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
        className={`${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
