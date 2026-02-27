"use client";

import { useRef, useEffect, useCallback } from "react";

/** 배경 별 한 개 */
interface Star {
  x: number;
  y: number;
  size: number;
}

/** 로켓 궤적(불꽃자국) */
interface Trail {
  x: number;
  y: number;
  life: number;
  size: number;
}

/** 폭발 파티클 — HSL 색상, 감쇠·중력 */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  hue: number;
}

/** 로켓 — 화면 하단에서 targetY까지 올라가다 폭발 */
interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  sparkTimer: number;
  exploded: boolean;
}

const STAR_COUNT = 160;
const MAX_ROCKETS = 15;
const MAX_PARTICLES = 1200;
const MAX_TRAILS = 400;

/**
 * 터치/클릭한 위치를 목표로 화면 하단에서 로켓 3발 발사 → 궤적·폭발·플래시·사운드.
 * touch_fireworks_webpage.html 동작 반영.
 */
export function FireworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rocketsRef = useRef<Rocket[]>([]);
  const trailsRef = useRef<Trail[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const starsRef = useRef<Star[]>([]);
  const flashAlphaRef = useRef(0);
  const rafRef = useRef<number>(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const startBufferRef = useRef<AudioBuffer | null>(null);
  const boomBufferRef = useRef<AudioBuffer | null>(null);

  const createStars = useCallback((w: number, h: number) => {
    const stars: Star[] = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.5,
      });
    }
    starsRef.current = stars;
  }, []);

  const distanceVolume = useCallback((y: number, canvasHeight: number) => {
    const dist = y / canvasHeight;
    return Math.max(0.2, 1 - dist);
  }, []);

  const playStart = useCallback(
    (y: number, canvasHeight: number) => {
      const vol = distanceVolume(y, canvasHeight);
      const ctx = audioCtxRef.current;
      if (ctx?.state === "suspended") ctx.resume();

      try {
        const a = new Audio("/music/start.mp3");
        a.volume = vol;
        a.play().catch(() => {});
      } catch {
        // ignore
      }

      const buf = startBufferRef.current;
      if (buf && ctx) {
        try {
          const src = ctx.createBufferSource();
          src.buffer = buf;
          const gain = ctx.createGain();
          gain.gain.value = vol;
          src.connect(gain).connect(ctx.destination);
          src.start(ctx.currentTime);
        } catch {
          // ignore
        }
      }
    },
    [distanceVolume]
  );

  const playBoom = useCallback(
    (y: number, canvasHeight: number) => {
      const vol = distanceVolume(y, canvasHeight);
      const delayTime = ((canvasHeight - y) / canvasHeight) * 0.45;
      const ctx = audioCtxRef.current;
      const buf = boomBufferRef.current;

      if (buf && ctx) {
        try {
          const src = ctx.createBufferSource();
          src.buffer = buf;
          const gain = ctx.createGain();
          gain.gain.value = vol;
          const delay = ctx.createDelay();
          delay.delayTime.value = 0.28;
          const feedback = ctx.createGain();
          feedback.gain.value = 0.35;
          delay.connect(feedback);
          feedback.connect(delay);
          src.connect(gain);
          gain.connect(ctx.destination);
          gain.connect(delay);
          delay.connect(ctx.destination);
          src.start(ctx.currentTime + delayTime);
        } catch {
          // ignore
        }
      } else {
        setTimeout(() => {
          try {
            const a = new Audio("/music/boom.mp3");
            a.volume = vol;
            a.play().catch(() => {});
          } catch {
            // ignore
          }
        }, delayTime * 1000);
      }
    },
    [distanceVolume]
  );

  const explode = useCallback(
    (x: number, y: number, canvasHeight: number) => {
      playBoom(y, canvasHeight);
      flashAlphaRef.current = 0.45;

      const hue = Math.random() * 360;
      const count = Math.floor(150 + Math.random() * 60);
      const particles = particlesRef.current;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 7 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 130 + Math.random() * 40,
          size: Math.random() * 2 + 1.5,
          hue,
        });
      }
      if (particles.length > MAX_PARTICLES) {
        particlesRef.current = particles.slice(-MAX_PARTICLES);
      }
    },
    [playBoom]
  );

  const addRockets = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const h = rect.height;

      if (rocketsRef.current.length >= MAX_ROCKETS) return;

      playStart(y, h);

      const vy = -11 - Math.random() * 3;
      for (const dx of [-12, 0, 12]) {
        rocketsRef.current.push({
          x: x + dx,
          y: h,
          targetY: y,
          vy,
          sparkTimer: 0,
          exploded: false,
        });
      }
    },
    [playStart]
  );

  const handlePointer = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      addRockets(e.clientX, e.clientY);
    },
    [addRockets]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const AudioContextClass =
      typeof window !== "undefined"
        ? (window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)
        : null;
    if (AudioContextClass) {
      audioCtxRef.current = new AudioContextClass();
      Promise.all([
        fetch("/music/start.mp3")
          .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error("start"))))
          .then((ab) => audioCtxRef.current?.decodeAudioData(ab) ?? null)
          .then((b) => {
            if (b) startBufferRef.current = b;
          })
          .catch(() => {}),
        fetch("/music/boom.mp3")
          .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error("boom"))))
          .then((ab) => audioCtxRef.current?.decodeAudioData(ab) ?? null)
          .then((b) => {
            if (b) boomBufferRef.current = b;
          })
          .catch(() => {}),
      ]).catch(() => {});
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w <= 0 || h <= 0) return;
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createStars(w, h);
    };

    const onResize = () => requestAnimationFrame(setSize);
    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);
    onResize();

    const tick = () => {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#fff";
      for (const s of starsRef.current) {
        ctx.fillRect(s.x, s.y, s.size, s.size);
      }

      ctx.globalCompositeOperation = "lighter";

      const rockets = rocketsRef.current;
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy;
        r.sparkTimer++;
        if (r.sparkTimer % 2 === 0) {
          const trails = trailsRef.current;
          trails.push({
            x: r.x + (Math.random() - 0.5) * 4,
            y: r.y,
            life: 28,
            size: Math.random() * 2 + 1,
          });
          if (trails.length > MAX_TRAILS) trailsRef.current = trails.slice(-MAX_TRAILS);
        }
        if (r.y <= r.targetY && !r.exploded) {
          r.exploded = true;
          explode(r.x, r.y, h);
        }
        ctx.fillStyle = "#fff";
        ctx.fillRect(r.x - 1, r.y - 12, 2, 12);
        if (r.exploded) rockets.splice(i, 1);
      }

      const trails = trailsRef.current;
      for (let i = trails.length - 1; i >= 0; i--) {
        const t = trails[i];
        t.y += 0.6;
        t.life--;
        if (t.life <= 0) {
          trails.splice(i, 1);
          continue;
        }
        ctx.fillStyle = `rgba(255,200,120,${t.life / 28})`;
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
        ctx.fill();
      }

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.vy += 0.045;
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue},100%,65%,${p.life / 170})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (flashAlphaRef.current > 0) {
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = `rgba(255,255,255,${flashAlphaRef.current})`;
        ctx.fillRect(0, 0, w, h);
        flashAlphaRef.current *= 0.9;
        if (flashAlphaRef.current < 0.02) flashAlphaRef.current = 0;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [createStars, explode]);

  const warmupAudio = useCallback(() => {
    const ctx = audioCtxRef.current;
    if (ctx?.state === "suspended") ctx.resume();
    if (ctx) {
      try {
        const buf = ctx.createBuffer(1, 1, 22050);
        const src = ctx.createBufferSource();
        src.buffer = buf;
        src.connect(ctx.destination);
        src.start(0);
      } catch {
        // ignore
      }
    }
  }, []);

  return (
    <div className="relative block h-full min-h-0 w-full touch-manipulation">
      <p
        id="firework-hint"
        className="pointer-events-none absolute left-0 right-0 top-[max(18px,env(safe-area-inset-top))] z-10 text-center text-sm text-white/80"
        aria-hidden
      >
        터치하면 현실 물리 불꽃놀이 🎆
      </p>
      <canvas
        ref={canvasRef}
        role="application"
        aria-label="화면을 터치하거나 클릭하면 해당 위치를 목표로 불꽃이 발사됩니다"
        className="block w-full h-full touch-none cursor-crosshair bg-black"
        onPointerDown={(e) => {
          warmupAudio();
          handlePointer(e);
        }}
      />
    </div>
  );
}
