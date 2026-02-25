"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/**
 * Workspace 전용 상단 바. Liquid Glass 스타일.
 * 왼쪽 로고, 중앙 검색창(기능 없음), 우측 프로필(아바타 + 클릭 시 로그아웃 메뉴).
 */
export function WorkspaceBar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(() =>
    searchParams.get("q") ?? ""
  );
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchValue(searchParams.get("q") ?? "");
  }, [searchParams]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [menuOpen]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

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
      className="sticky top-0 z-50 w-full border-b border-white/[0.08] backdrop-blur-xl"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
      }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          className="font-handwriting shrink-0 text-lg font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717] sm:text-xl"
          aria-label="Vibe AI Music 홈으로 이동"
        >
          Vibe AI Music
        </Link>

        <div className="flex min-w-0 flex-1 justify-center px-4">
          <label htmlFor="workspace-search" className="sr-only">
            플레이리스트 제목 검색
          </label>
          <input
            id="workspace-search"
            type="search"
            placeholder="플레이리스트 제목 검색"
            aria-label="플레이리스트 제목 검색"
            value={searchValue}
            onChange={(e) => {
              const v = e.target.value;
              setSearchValue(v);
              const params = new URLSearchParams(searchParams.toString());
              const trimmed = v.trim();
              if (trimmed) params.set("q", trimmed);
              else params.delete("q");
              const query = params.toString();
              router.replace(pathname + (query ? `?${query}` : ""), {
                scroll: false,
              });
            }}
            className="w-full max-w-md rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none backdrop-blur-sm transition-colors focus:border-white/20 focus:ring-2 focus:ring-white/20"
            style={{
              boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
            }}
          />
        </div>

        <div className="relative shrink-0" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/[0.18] outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717] sm:h-10 sm:w-10"
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
                signOut();
              }}
              className="w-full px-4 py-2.5 text-left text-sm font-medium text-white/90 outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-inset"
              aria-label="로그아웃"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
