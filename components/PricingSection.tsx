"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

const PLANS = [
  { id: "pro", name: "Pro", price: 5, credits: 100 },
  { id: "ultra", name: "Ultra", price: 50, credits: 1100 },
] as const;

/**
 * 랜딩 페이지 요금제 섹션.
 * credit-modal과 동일한 Pro / Ultra 카드 스타일을 사용하며, 다른 랜딩 섹션과 통일된 레이아웃으로 배치한다.
 */
export function PricingSection() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-b-2xl bg-black px-4 py-16 sm:py-20 md:py-24"
    >
      <h2
        id="pricing-title"
        className="mb-10 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl md:mb-14 md:text-4xl"
      >
        요금제
      </h2>

      <div
        className="grid w-full max-w-md grid-cols-1 gap-4 sm:grid-cols-2"
        role="list"
      >
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            role="listitem"
            className={cn(
              "relative overflow-hidden rounded-xl",
              "min-h-[120px] flex flex-col justify-center px-4 py-5",
              "border border-white/10 transition-[border-color] hover:border-white/20 focus-within:ring-2 focus-within:ring-[#FECD00]/50 focus-within:ring-offset-2 focus-within:ring-offset-black"
            )}
            style={{
              background: "#2D2D2D",
              boxShadow:
                "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <div className="absolute inset-0 pointer-events-none opacity-30">
              <BackgroundGradientAnimation
                firstColor="157, 102, 223"
                secondColor="120, 80, 200"
                thirdColor="80, 60, 180"
                fourthColor="45, 0, 247"
                fifthColor="157, 102, 223"
                pointerColor="120, 80, 200"
                size="80%"
                blendingValue="soft-light"
                interactive={false}
                gradientBackgroundStart="#616161"
                gradientBackgroundEnd="#7d7d7d"
                containerClassName="!h-full !w-full !absolute !inset-0"
              />
            </div>
            <div className="relative z-10 text-center">
              <p className="text-sm font-medium text-white uppercase tracking-wider">
                {plan.name}
              </p>
              <p className="mt-1 text-2xl font-bold text-white">
                ${plan.price}
              </p>
              <p className="mt-0.5 text-sm text-[#a79c4f]">
                {plan.credits.toLocaleString()} credits
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 mt-8">
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
