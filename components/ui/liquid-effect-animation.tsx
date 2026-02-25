"use client";

import { useEffect, useId, useRef } from "react";

type LiquidEffectAnimationProps = {
  /** true면 부모 컨테이너 안에서 absolute로 채움 (섹션 배경용). false면 뷰포트 고정. */
  contained?: boolean;
};

/**
 * Three.js 기반 리퀴드 배경 애니메이션.
 * contained=true일 때 섹션 배경으로 사용 가능.
 */
export function LiquidEffectAnimation({ contained = false }: LiquidEffectAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const id = useId().replace(/:/g, "");
  const canvasId = `liquid-canvas-${id}`;

  useEffect(() => {
    if (!canvasRef.current) return;

    const script = document.createElement("script");
    script.type = "module";
    script.textContent = `
      import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js';
      
      const canvas = document.getElementById('${canvasId}');
      if (canvas) {
        const app = LiquidBackground(canvas);
        app.loadImage('https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=800');
        app.liquidPlane.material.metalness = 0.75;
        app.liquidPlane.material.roughness = 0.25;
        app.liquidPlane.uniforms.displacementScale.value = 5;
        app.setRain(false);
        window.__liquidApp_${id} = app;
      }
    `;
    document.body.appendChild(script);

    return () => {
      const app = (window as Window & Record<string, unknown>)[`__liquidApp_${id}`];
      if (app && typeof (app as { dispose?: () => void }).dispose === "function") {
        (app as { dispose: () => void }).dispose();
      }
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, [canvasId, id]);

  return (
    <div
      className={contained ? "absolute inset-0 h-full w-full touch-none overflow-hidden" : "fixed inset-0 m-0 h-full w-full touch-none overflow-hidden"}
      style={{ fontFamily: '"Montserrat", serif' }}
    >
      <canvas
        ref={canvasRef}
        id={canvasId}
        className="h-full w-full"
        aria-hidden
      />
    </div>
  );
}
