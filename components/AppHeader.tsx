"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Star } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { CreditModal } from "@/components/ui/credit-modal";

/**
 * 앱 전역 헤더. 로고(홈 링크)와 페이지별 네비게이션(로그인 / 프로필 메뉴: Upgrade, 로그아웃)을 제공한다.
 */

export function AppHeader() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const isAuthPage = pathname === "/auth";
  const [menuOpen, setMenuOpen] = useState(false);
  const [creditModalOpen, setCreditModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [menuOpen]);

  const handleMenuMouseEnter = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setMenuOpen(true);
  };

  const handleMenuMouseLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => setMenuOpen(false), 120);
  };

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const ringOffset = isAuthPage ? "focus-visible:ring-offset-[#171717]" : "focus-visible:ring-offset-black";
  const avatarUrl =
    user?.user_metadata?.avatar_url ?? user?.user_metadata?.picture ?? null;
  const displayName =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    user?.email ??
    "";
  const initial = displayName
    ? displayName.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase() ?? "?";

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
          className={`font-handwriting text-lg font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 sm:text-xl ${ringOffset}`}
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
            <div
              className="relative shrink-0"
              ref={menuRef}
              onMouseEnter={handleMenuMouseEnter}
              onMouseLeave={handleMenuMouseLeave}
            >
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                className={`flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/[0.18] outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 sm:h-10 sm:w-10 ${ringOffset}`}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                }}
                aria-label="사용자 메뉴"
                aria-expanded={menuOpen}
                aria-haspopup="menu"
              >
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatarUrl}
                    alt=""
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-medium text-white/90">
                    {initial}
                  </span>
                )}
              </button>
              <div
                role="menu"
                className="absolute right-0 top-full z-10 mt-2 min-w-[120px] rounded-xl border border-white/[0.12] py-1 transition-opacity duration-150"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                  ...(menuOpen
                    ? { opacity: 1, visibility: "visible" }
                    : { opacity: 0, visibility: "hidden", pointerEvents: "none" }),
                }}
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false);
                    setCreditModalOpen(true);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-medium text-white/90 outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-inset"
                  aria-label="크레딧 결제 모달 열기"
                >
                  <Star className="h-4 w-4 shrink-0" aria-hidden />
                  Upgrade
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false);
                    signOut();
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-medium text-white/90 outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-inset"
                  aria-label="로그아웃"
                >
                  로그아웃
                </button>
              </div>
            </div>
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

      {user && (
        <CreditModal open={creditModalOpen} onClose={() => setCreditModalOpen(false)} />
      )}
    </header>
  );
}
