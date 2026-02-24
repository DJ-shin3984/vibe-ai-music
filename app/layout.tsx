import type { Metadata } from "next";
import { Syne, Dancing_Script } from "next/font/google";
import { AppHeader } from "@/components/AppHeader";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-handwriting",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vibe AI Music",
  description: "AI와 함께 만드는 당신만의 음악",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="min-h-[100dvh] min-h-screen">
      <body
        className={`${syne.variable} ${dancingScript.variable} min-h-[100dvh] min-h-screen flex flex-col bg-black antialiased`}
      >
        <AuthProvider>
          <AppHeader />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
