"use client";

import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";

type HeroProps = {
  title?: string;
  subtitle?: string;
};

/**
 * 랜딩 페이지 상단 히어로.
 * Sparkles 파티클 배경 위에 타이틀·서브타이틀을 노출한다.
 */
export function Hero({ title = "Vibe AI Music", subtitle }: HeroProps) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-b-2xl bg-black px-4 py-24 md:min-h-[40rem] md:py-32"
    >
      <h1
        id="hero-title"
        className="font-syne relative z-20 text-center text-3xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl"
      >
        {title}
      </h1>

      <div className="relative z-20 w-full max-w-[40rem] py-16">
        <HeroGradientLines />
        <div className="relative h-40 w-full">
          <SparklesCore
            id="hero-sparkles"
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="h-full w-full"
            particleColor="#FFFFFF"
          />
          <div
            aria-hidden
            className="absolute inset-0 h-full w-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"
          />
        </div>
      </div>

      {subtitle && (
        <p className="relative z-20 max-w-2xl text-center text-neutral-300 md:text-lg">
          {subtitle}
        </p>
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
        className="absolute inset-x-20 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm"
      />
      <div
        aria-hidden
        className="absolute inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm"
      />
    </>
  );
}
