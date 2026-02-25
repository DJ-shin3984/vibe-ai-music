"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

const PLANS = [
  { id: "pro", name: "Pro", price: 5, credits: 100 },
  { id: "ultra", name: "Ultra", price: 50, credits: 1100 },
] as const;

type CreditModalProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * React Portal 기반 크레딧(결제) 모달.
 * Pro / Ultra 가격 카드만 표시. 카드 배경에 은은한 그라데이션 애니메이션.
 */
export function CreditModal({ open, onClose }: CreditModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (typeof document === "undefined" || !open) return null;

  return createPortal(
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="credit-modal-title"
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-white/[0.08] shadow-2xl overflow-hidden"
        style={{ background: "#1A1A1A" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative z-10 flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
          <h2
            id="credit-modal-title"
            className="text-lg font-semibold text-white"
          >
            Upgrade Plan
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label="모달 닫기"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-4 p-5">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative overflow-hidden rounded-xl",
                "min-h-[120px] flex flex-col justify-center px-4 py-5"
              )}
              style={{ background: "#2D2D2D" }}
            >
              {/* 은은한 그라데이션 배경 */}
              <div className="absolute inset-0 opacity-30 pointer-events-none">
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
      </div>
    </div>,
    document.body
  );
}
