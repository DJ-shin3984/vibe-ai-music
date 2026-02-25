"use client";

import Link from "next/link";
import { X, Youtube } from "lucide-react";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

/** Threads(메타) 스타일 @ 아이콘 */
function ThreadsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M16 8v4a4 4 0 0 1-8 0v0a4 4 0 0 1 4-4h4" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { href: "https://x.com", label: "X (Twitter)", icon: X },
  { href: "https://threads.net", label: "Threads", icon: ThreadsIcon },
  { href: "https://youtube.com", label: "YouTube", icon: Youtube },
] as const;

const NAV_LINKS = [
  { href: "#feature", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

/**
 * 랜딩 페이지 푸터. 왼쪽 소셜 로고·저작권, 오른쪽 텍스트 링크, 하단 오버사이즈 서비스명.
 */
export function Footer() {
  return (
    <footer
      className={`${bebasNeue.variable} w-full border-t border-white/[0.08] bg-black`}
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-flex-start sm:justify-between">
          <div className="flex flex-col gap-4">
            <nav aria-label="소셜 링크" className="flex flex-col gap-3">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/70 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="text-sm font-medium">{label}</span>
                </a>
              ))}
            </nav>
            <p className="text-sm text-white/50">©2026</p>
          </div>
          <nav aria-label="서비스 링크" className="flex flex-col gap-3">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="text-sm font-medium text-white/70 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="border-t border-white/[0.06] px-4 py-8 sm:px-6">
        <p
          className="font-display text-center text-5xl font-normal tracking-wide text-white sm:text-6xl md:text-7xl lg:text-8xl"
          aria-label="Vibe AI Music"
        >
          Vibe AI Music
        </p>
      </div>
    </footer>
  );
}
