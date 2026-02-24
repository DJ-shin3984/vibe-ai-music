"use client";

import React from "react";
import Link from "next/link";
import { SparklesCore } from "@/components/ui/sparkles";

type HeroProps = {
  title?: string;
  subtitle?: string;
  /** CTA 버튼 라벨. ctaHref와 함께 주면 히어로 하단에 링크 버튼을 렌더링한다. */
  ctaLabel?: string;
  /** CTA 링크 href (예: /auth) */
  ctaHref?: string;
};

/**
 * 랜딩 페이지 상단 히어로.
 * Sparkles 파티클 배경 위에 타이틀·서브타이틀을 노출한다.
 */
export function Hero({
  title = "Vibe AI Music",
  subtitle,
  ctaLabel,
  ctaHref,
}: HeroProps) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-b-2xl bg-black px-4 py-16 sm:py-20 md:min-h-[40rem] md:py-24 lg:py-32"
    >
      <div className="relative z-20 w-full max-w-[40rem] py-10 sm:py-14 md:py-16">
        <HeroGradientLines />
        <div className="relative min-h-[18rem] w-full sm:min-h-[22rem] md:min-h-[24rem]">
          <SparklesCore
            id="hero-sparkles"
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="absolute inset-0 h-full w-full"
            particleColor="#FFFFFF"
          />
          <div
            aria-hidden
            className="absolute inset-0 h-full w-full bg-black [mask-image:radial-gradient(220px_140px_at_top,transparent_20%,white)] sm:[mask-image:radial-gradient(280px_180px_at_top,transparent_20%,white)] md:[mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"
          />
          <h1
            id="hero-title"
            className="font-handwriting absolute inset-0 z-30 flex items-center justify-center px-2 text-center text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-7xl lg:text-8xl"
          >
            {title}
          </h1>
        </div>
      </div>

      {subtitle && (
        <p className="relative z-20 max-w-2xl px-2 text-center text-neutral-300 sm:text-base md:text-lg">
          {subtitle}
        </p>
      )}

      {ctaLabel && ctaHref && (
        <div className="relative z-20 mt-8">
          <Link
            href={ctaHref}
            className="inline-flex min-h-[48px] min-w-[120px] items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-center text-sm font-medium text-white outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:min-h-0 sm:min-w-0"
            aria-label={ctaLabel}
          >
            {ctaLabel}
          </Link>
        </div>
      )}
    </section>
  );
}

/** 히어로 스파클 영역 상단의 그라데이션 장식 라인. */
function HeroGradientLines() {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-x-4 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent sm:inset-x-10 md:inset-x-20"
      />
      <div
        aria-hidden
        className="absolute inset-x-4 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm sm:inset-x-10 md:inset-x-20"
      />
      <div
        aria-hidden
        className="absolute inset-x-12 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent sm:inset-x-32 md:inset-x-60"
      />
      <div
        aria-hidden
        className="absolute inset-x-12 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm sm:inset-x-32 md:inset-x-60"
      />
    </>
  );
}
