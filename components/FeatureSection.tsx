"use client";

import React from "react";
import Image from "next/image";

const FEATURES = [
  {
    src: "/image/3d-music-related-scene.jpg",
    alt: "3D 음악 장면",
    message: "MP3 다운로드는 그만하세요. 취향에 맞는 음악을 생성하세요.",
  },
  {
    src: "/image/3d-music-related-scene%20(1).jpg",
    alt: "3D 음악 콘셉트",
    message: "AI가 당신만의 플레이리스트를 만들어 드립니다.",
  },
  {
    src: "/image/digital-art-portrait-person-listening-music-headphones.jpg",
    alt: "헤드폰으로 음악을 듣는 사람",
    message: "나만의 음악에 집중하세요.",
  },
  {
    src: "/image/digital-art-portrait-person-listening-music-headphones%20(1).jpg",
    alt: "음악 감상 포트레이트",
    message: "어디서나 당신만의 사운드를 경험하세요.",
  },
  {
    src: "/image/futuristic-set-with-dj-charge-music-using-virtual-reality-glasses.jpg",
    alt: "VR으로 음악을 만드는 DJ",
    message: "새로운 방식으로 음악을 만나보세요.",
  },
  {
    src: "/image/view-music-player-with-vinyl.jpg",
    alt: "바이닐과 뮤직 플레이어",
    message: "클래식한 감성, 디지털로 완성하다.",
  },
] as const;

/**
 * 랜딩 페이지 기능 소개 섹션.
 * public/image 내 6개 이미지를 그리드 카드로 배치하고, 각각 메시지를 전달한다.
 */
export function FeatureSection() {
  return (
    <section
      id="feature"
      aria-labelledby="feature-title"
      className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-b-2xl bg-black px-4 py-16 sm:py-20 md:py-24"
    >
      <h2
        id="feature-title"
        className="mb-10 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl md:mb-14 md:text-4xl"
      >
        당신에게 필요한 모든 기능
      </h2>

      <div
        className="grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
      >
        {FEATURES.map((item) => (
          <article
            key={item.src}
            role="listitem"
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-[border-color,box-shadow] hover:border-white/20 focus-within:ring-2 focus-within:ring-[#FECD00]/50 focus-within:ring-offset-2 focus-within:ring-offset-black"
            style={{
              boxShadow:
                "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <p className="p-4 text-sm font-medium leading-relaxed text-white/90 sm:p-5 sm:text-base">
              {item.message}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
