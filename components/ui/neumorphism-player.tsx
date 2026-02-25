"use client";

import React from "react";
import { SkipBack, Play, Pause, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_ARTWORK =
  "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop";

export type NeumorphismPlayerTrack = {
  title: string;
  subtitle?: string;
  imageUrl?: string | null;
};

type NeumorphismPlayerProps = {
  track: NeumorphismPlayerTrack | null;
  progress?: { currentSec: number; durationSec: number };
  isPlaying?: boolean;
  onPrevious?: () => void;
  onPlayPause?: () => void;
  onNext?: () => void;
  /** 진행 바 클릭 시 0~1 비율로 시킹. */
  onProgressBarSeek?: (progressPercent: number) => void;
  /** 플레이리스트를 앨범 아트 영역 내부에 렌더. 있으면 앨범 이미지 대신 표시. */
  playlistSlot?: React.ReactNode;
  className?: string;
};

function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * 네오모피즘 스타일 음악 플레이어.
 * 워크스페이스에서 선택된 트랙 재생·진행률·이전/다음 연동용.
 */
export function NeumorphismPlayer({
  track,
  progress = { currentSec: 0, durationSec: 0 },
  isPlaying = false,
  onPrevious,
  onPlayPause,
  onNext,
  onProgressBarSeek,
  playlistSlot,
  className,
}: NeumorphismPlayerProps) {
  const durationSec = progress.durationSec > 0 ? progress.durationSec : 0;
  const currentSec = Number.isFinite(progress.currentSec)
    ? Math.max(0, Math.min(progress.currentSec, durationSec || progress.currentSec))
    : 0;
  const progressPercent =
    durationSec > 0 ? (currentSec / durationSec) * 100 : 0;

  const title = track?.title ?? "곡을 선택하세요";
  const subtitle = track?.subtitle ?? "내 음악 목록에서 선택";
  const imageUrl = track?.imageUrl && track.imageUrl.trim() ? track.imageUrl : DEFAULT_ARTWORK;

  return (
    <div
      className={cn("neumorphic-bg flex items-center justify-center p-4", className)}
      role="region"
      aria-label="재생 컨트롤"
    >
      <div className="neumorphic-card w-full max-w-sm p-6 sm:p-8 space-y-6 sm:space-y-8">
        {/* 앨범 아트 또는 플레이리스트 영역 */}
        <div
          className={cn(
            "overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg bg-white/[0.04]",
            playlistSlot
              ? "flex min-h-0 min-w-0 flex-col max-h-[320px] sm:max-h-[380px] min-h-[200px]"
              : "aspect-square"
          )}
          aria-hidden={!playlistSlot}
        >
          {playlistSlot ?? (
            <img
              src={imageUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Song Info */}
        <div className="text-center min-w-0">
          <h2 className="text-lg sm:text-xl font-bold text-white/95 truncate">
            {title}
          </h2>
          <p className="text-sm text-white/50 mt-0.5 truncate">{subtitle}</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div
            className="neumorphic-inset h-2 w-full overflow-hidden cursor-pointer"
            role="progressbar"
            aria-valuenow={Math.round(progressPercent)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="재생 진행"
            onClick={(e) => {
              if (!onProgressBarSeek) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const percent = Math.max(0, Math.min(1, x / rect.width));
              onProgressBarSeek(percent);
            }}
          >
            <div
              className="h-2 rounded-lg bg-[#9b87f5] transition-[width] duration-150 pointer-events-none"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs font-medium text-white/50">
            <span>{formatTime(currentSec)}</span>
            <span>{durationSec > 0 ? formatTime(durationSec) : "0:00"}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={onPrevious}
            className="neumorphic-button w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-white/70 hover:text-white/90 disabled:opacity-40 disabled:pointer-events-none"
            aria-label="이전 곡"
            disabled={!onPrevious}
          >
            <SkipBack className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            type="button"
            onClick={onPlayPause}
            className="neumorphic-button w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-[#9b87f5] hover:text-[#b5a5f7] focus-visible:ring-2 focus-visible:ring-[#9b87f5]"
            aria-label={isPlaying ? "일시 정지" : "재생"}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 sm:w-8 sm:h-8" />
            ) : (
              <Play className="w-6 h-6 sm:w-8 sm:h-8 ml-0.5" />
            )}
          </button>
          <button
            type="button"
            onClick={onNext}
            className="neumorphic-button w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-white/70 hover:text-white/90 disabled:opacity-40 disabled:pointer-events-none"
            aria-label="다음 곡"
            disabled={!onNext}
          >
            <SkipForward className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
