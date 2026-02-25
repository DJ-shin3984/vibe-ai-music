"use client";

import React from "react";
import Link from "next/link";
import { LiquidEffectAnimation } from "@/components/ui/liquid-effect-animation";

/**
 * 랜딩 페이지 CTA 섹션. full-bleed, 리퀴드 배경 위에 메시지와 시작 버튼을 노출한다.
 */
export function CTASection() {
  return (
    <section
      aria-labelledby="cta-title"
      className="relative flex w-full flex-col items-center justify-center overflow-hidden px-4 py-20 sm:py-24 md:min-h-[28rem] md:py-32"
    >
      <div className="absolute inset-0">
        <LiquidEffectAnimation contained />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-black/50"
      />
      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <h2
          id="cta-title"
          className="max-w-2xl text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl"
        >
          지금 바로 나만의 음악을 만들어보세요
        </h2>
        <Link
          href="/auth"
          className="inline-flex min-h-[48px] min-w-[120px] items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-center text-sm font-medium text-white outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:min-h-0 sm:min-w-0"
          aria-label="시작하기"
        >
          시작하기
        </Link>
      </div>
    </section>
  );
}
