import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "vibe-ai-music",
  description: "Next.js + .cursor (rules, skills, agents) 보일러플레이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
