"use client";

import React from "react";
import { Music2, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export type MusicItem = {
  id: string;
  title: string;
  created_at: string;
  playbackUrl: string | null;
};

type MusicListProps = {
  items: MusicItem[];
  selectedId: string | null;
  playingId: string | null;
  onSelect: (id: string, playbackUrl: string | null) => void;
  className?: string;
  /** 헤더 "내 음악" 옆에 렌더할 액션 (예: 프롬프트 펼치기 버튼) */
  headerAction?: React.ReactNode;
};

/**
 * 저장된 음악 목록. 선택·재생 중 상태 표시, 최대 약 10개 높이 후 스크롤.
 */
export function MusicList({
  items,
  selectedId,
  playingId,
  onSelect,
  className,
  headerAction,
}: MusicListProps) {
  return (
    <section
      className={cn("flex min-h-0 min-w-0 flex-col rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm", className)}
      aria-label="저장된 음악 목록"
    >
      <div className="flex shrink-0 items-center gap-2 border-b border-white/[0.08] px-4 py-3">
        <Music2 className="h-4 w-4 text-[#9b87f5]" aria-hidden />
        <h2 className="text-sm font-medium text-white/90">내 음악</h2>
        {headerAction != null && (
          <span className="ml-auto flex items-center">{headerAction}</span>
        )}
      </div>
      <ul
        className="min-h-0 max-h-[320px] sm:max-h-[420px] flex-1 overflow-y-auto overflow-x-hidden py-2 overscroll-contain touch-pan-y"
        role="list"
        aria-label="음악 목록"
        style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
      >
        {items.length === 0 ? (
          <li className="px-4 py-8 text-center text-sm text-white/50">
            저장된 음악이 없습니다. 아래에서 생성해 보세요.
          </li>
        ) : (
          items.map((item) => {
            const isSelected = selectedId === item.id;
            const isPlaying = playingId === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onSelect(item.id, item.playbackUrl)}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-3 text-left transition",
                    "focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#9b87f5] focus-visible:ring-inset",
                    isSelected
                      ? "bg-[#9b87f5]/20 text-white/95"
                      : "text-white/80 hover:bg-white/[0.06] hover:text-white/90"
                  )}
                  aria-current={isSelected ? "true" : undefined}
                  aria-label={
                    isPlaying
                      ? `${item.title}, 재생 중`
                      : isSelected
                        ? `${item.title}, 선택됨`
                        : item.title
                  }
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                      isPlaying ? "bg-[#9b87f5] text-white" : "bg-white/10 text-white/70"
                    )}
                    aria-hidden
                  >
                    {isPlaying ? (
                      <Play className="h-4 w-4 fill-current" />
                    ) : (
                      <Music2 className="h-4 w-4" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm">
                    {item.title}
                  </span>
                  {isPlaying && (
                    <span className="shrink-0 text-xs text-[#9b87f5]">
                      재생 중
                    </span>
                  )}
                </button>
              </li>
            );
          })
        )}
      </ul>
    </section>
  );
}
