"use client";

import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";

const ACCENT = "#FECD00";

const TRACKS = [
  { src: "/music/3517b6e7-ba1a-441c-8ed9-e59d973ebee6.mp3", label: "샘플 1" },
  { src: "/music/56caaf3c-8756-4acc-b08f-83d56cb8af54.mp3", label: "샘플 2" },
  { src: "/music/6ff81cbc-3bfd-474b-9dcc-973455e77893.mp3", label: "샘플 3" },
] as const;

/**
 * 랜딩 페이지 음악 쇼케이스 섹션.
 * Hero 디자인을 계승하고, accent #FECD00로 3개 샘플 트랙을 중앙 배치한다.
 */
export function LandingMusicSection() {
  return (
    <section
      aria-labelledby="music-showcase-title"
      className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-b-2xl bg-black px-4 py-16 sm:py-20 md:py-24 lg:py-32"
    >
      <div className="relative z-20 w-full max-w-[40rem] py-10 sm:py-14 md:py-16">
        <MusicSectionGradientLines />
        <div className="relative min-h-[14rem] w-full sm:min-h-[16rem]">
          <SparklesCore
            id="music-showcase-sparkles"
            background="transparent"
            minSize={0.3}
            maxSize={0.9}
            particleDensity={800}
            className="absolute inset-0 h-full w-full"
            particleColor={ACCENT}
          />
          <div
            aria-hidden
            className="absolute inset-0 h-full w-full bg-black [mask-image:radial-gradient(220px_120px_at_50%_30%,transparent_30%,white)] sm:[mask-image:radial-gradient(280px_160px_at_50%_30%,transparent_30%,white)]"
          />
          <h2
            id="music-showcase-title"
            className="absolute inset-x-0 top-0 z-30 px-2 pt-4 text-center text-2xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            당신의 취향에 맞는
            <br />
            완벽한 음악을 만들어보세요
          </h2>
        </div>
      </div>

      <div className="relative z-20 mt-8 w-full max-w-3xl">
        <div
          className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
          role="list"
        >
          {TRACKS.map((track, index) => (
            <div
              key={track.src}
              role="listitem"
              className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] px-4 py-5 backdrop-blur-sm transition-colors hover:border-[#FECD00]/40 focus-within:ring-2 focus-within:ring-[#FECD00]/50 focus-within:ring-offset-2 focus-within:ring-offset-black"
              style={{
                boxShadow: "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <p className="mb-3 text-center text-sm font-medium text-white/90">
                {track.label}
              </p>
              <audio
                src={track.src}
                controls
                className="h-10 w-full accent-[#FECD00] [&::-webkit-media-controls-panel]:bg-white/5"
                aria-label={`${track.label} 재생`}
                preload="metadata"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 섹션 상단 그라데이션 라인. accent #FECD00 사용. */
function MusicSectionGradientLines() {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-x-4 top-0 h-px w-3/4 sm:inset-x-10 md:inset-x-20"
        style={{
          background: "linear-gradient(90deg, transparent, #FECD00, transparent)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-4 top-0 h-[2px] w-3/4 blur-sm sm:inset-x-10 md:inset-x-20"
        style={{
          background: "linear-gradient(90deg, transparent, #FECD00, transparent)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-12 top-0 h-px w-1/4 sm:inset-x-32 md:inset-x-60"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(254,205,0,0.7), transparent)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-12 top-0 h-[5px] w-1/4 blur-sm sm:inset-x-32 md:inset-x-60"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(254,205,0,0.6), transparent)",
        }}
      />
    </>
  );
}
