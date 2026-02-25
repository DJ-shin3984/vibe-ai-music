import type { Metadata } from "next";
import { Suspense } from "react";
import { Syne, Dancing_Script } from "next/font/google";
import { HeaderRouter } from "@/components/HeaderRouter";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

/** useSearchParams를 쓰는 HeaderRouter(WorkspaceBar)용 Suspense fallback */
function HeaderFallback() {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-white/[0.08] backdrop-blur-xl h-14 sm:h-16"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
      }}
      aria-hidden
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6" />
    </header>
  );
}

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
          <Suspense fallback={<HeaderFallback />}>
            <HeaderRouter />
          </Suspense>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
