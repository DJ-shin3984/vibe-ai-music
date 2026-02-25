"use client";

import React from "react";

const LOADING_LINES_KEYFRAMES = `
  @keyframes loadingLinesTransform {
    0% { transform: translate(-55%); }
    100% { transform: translate(55%); }
  }
  @keyframes loadingLinesOpacity {
    0%, 100% { opacity: 0; }
    15% { opacity: 1; }
    65% { opacity: 0; }
  }
  @keyframes loadingLinesLetter {
    0% { opacity: 0; }
    5% { opacity: 1; text-shadow: 0 0 4px #fff; transform: scale(1.1) translateY(-2px); }
    20% { opacity: 0.2; }
    100% { opacity: 0; }
  }
`;

export interface LoadingLinesProps {
  /** 텍스트 (기본: "Creating...") */
  text?: string;
  /** 시맨틱 라벨 (스크린 리더용) */
  "aria-label"?: string;
  className?: string;
}

/**
 * 로딩 상태용 애니메이션 텍스트. 워크스페이스 음악 생성(Creating...) 등에 사용.
 */
const LoadingLines: React.FC<LoadingLinesProps> = ({
  text = "Creating...",
  "aria-label": ariaLabel = "Creating...",
  className,
}) => {
  const letters = text.split("");

  return (
    <div
      className={`relative flex items-center justify-center h-[60px] w-auto m-4 text-[0.9em] font-semibold select-none text-white scale-100 ${className ?? ""}`}
      role="status"
      aria-label={ariaLabel}
      aria-busy
    >
      <style dangerouslySetInnerHTML={{ __html: LOADING_LINES_KEYFRAMES }} />
      {letters.map((letter, idx) => (
        <span
          key={idx}
          className="relative inline-block opacity-0 z-[2] text-black dark:text-white"
          style={{
            animation: "loadingLinesLetter 4s linear infinite",
            animationDelay: `${0.1 + idx * 0.105}s`,
          }}
        >
          {letter}
        </span>
      ))}
      <div
        className="absolute top-0 left-0 w-full h-full z-[1] bg-transparent [mask:repeating-linear-gradient(90deg,transparent_0,transparent_6px,black_7px,black_8px)]"
        aria-hidden
      >
        <div
          className="absolute top-0 left-0 w-full h-full
            [background-image:radial-gradient(circle_at_50%_50%,#ff0_0%,transparent_50%),radial-gradient(circle_at_45%_45%,#f00_0%,transparent_45%),radial-gradient(circle_at_55%_55%,#0ff_0%,transparent_45%),radial-gradient(circle_at_45%_55%,#0f0_0%,transparent_45%),radial-gradient(circle_at_55%_45%,#00f_0%,transparent_45%)]
            [mask:radial-gradient(circle_at_50%_50%,transparent_0%,transparent_10%,black_25%)]"
          style={{
            animation:
              "loadingLinesTransform 2s infinite alternate cubic-bezier(0.6,0.8,0.5,1), loadingLinesOpacity 4s infinite",
          }}
        />
      </div>
    </div>
  );
};

export default LoadingLines;
