import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SiteFrame from "@/components/SiteFrame";

export const metadata: Metadata = {
  title: "Sahar Nikzad — Storyteller, Founder, Student",
  description:
    "Personal portfolio of Sahar Nikzad — IB student, founder of AlphaSeekers, storyteller, animator, and advocate for girls' education.",
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
      <body className="min-h-screen flex flex-col bg-white text-blue-950">
        <Navigation />
        <main className="flex-1 pt-16">
          <SiteFrame>{children}</SiteFrame>
        </main>
        <Footer />
      </body>
    </html>
  );
}
