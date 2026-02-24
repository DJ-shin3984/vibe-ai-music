"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/**
 * 앱 전역 헤더. 로고(홈 링크)와 페이지별 네비게이션(로그인/로그아웃/홈으로)을 제공한다.
 */

export function AppHeader() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const isAuthPage = pathname === "/auth";

  return (
    <header
      className={
        isAuthPage
          ? "sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#171717]/95 backdrop-blur-sm"
          : "sticky top-0 z-50 w-full border-b border-white/[0.06] bg-black/80 backdrop-blur-sm"
      }
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          className="font-handwriting text-lg font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:text-xl"
          aria-label="Vibe AI Music 홈으로 이동"
        >
          Vibe AI Music
        </Link>
        <nav aria-label="페이지 이동" className="flex items-center gap-2">
          {isAuthPage ? (
            <Link
              href="/"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg px-3 text-sm font-medium text-white/80 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717] sm:min-h-0 sm:min-w-0"
              aria-label="홈으로 이동"
            >
              홈으로
            </Link>
          ) : user ? (
            <button
              type="button"
              onClick={() => signOut()}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg px-3 text-sm font-medium text-white/80 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:min-h-0 sm:min-w-0"
              aria-label="로그아웃"
            >
              로그아웃
            </button>
          ) : (
            <Link
              href="/auth"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg px-3 text-sm font-medium text-white/80 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:min-h-0 sm:min-w-0"
              aria-label="로그인 페이지로 이동"
            >
              로그인
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
