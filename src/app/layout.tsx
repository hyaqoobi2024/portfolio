import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import SparkCursor from "@/components/SparkCursor";

export const metadata: Metadata = {
  title: "Sahar Nikzad — Visionary, Scholar, Founder",
  description:
    "Personal portfolio of Sahar Nikzad — WLOT Scholar at GNS IB School Canada, founder of Alpha Seekers Network, aspiring neuroscientist and AI researcher.",
  keywords: [
    "Sahar Nikzad",
    "WLOT Scholarship",
    "GNS IB School",
    "Alpha Seekers Network",
    "Neuroscience",
    "AI",
    "Afghanistan",
    "MIT",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <SparkCursor />
        <AnimatedBackground />
        <Navigation />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
