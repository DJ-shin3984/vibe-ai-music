"use client";

/**
 * 인증 페이지 — Google 로그인.
 * Supabase Auth + AuthContext 연동.
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase/client";

export default function AuthPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (user) {
      router.replace("/workspace");
    }
  }, [user, isLoading, router]);

  async function handleGoogleSignIn() {
    setErrorMessage(null);
    setIsSigningIn(true);

    try {
      const supabase = createClient();
      const origin =
        typeof window !== "undefined" ? window.location.origin : "";
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${origin}/auth/callback`,
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setIsSigningIn(false);
        return;
      }
      // 성공 시 Supabase가 OAuth 페이지로 리다이렉트하므로 여기서는 더 할 일 없음
    } catch (e) {
      setErrorMessage("로그인 중 오류가 발생했습니다.");
      setIsSigningIn(false);
    }
  }

  if (isLoading || user) {
    return (
      <main className="flex min-h-0 flex-1 items-center justify-center bg-[#171717] p-4 sm:p-6">
        <div className="text-sm text-white/60">
          {isLoading ? "확인 중…" : "이동 중…"}
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-0 flex-1 items-center justify-center bg-[#171717] p-4 sm:p-6">
      <div
        className="w-full max-w-[380px] rounded-2xl p-6 text-center sm:p-8 md:p-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <h1 className="font-handwriting mb-1 text-lg font-semibold text-white/95 sm:text-xl">
          Vibe AI Music
        </h1>
        <p className="mb-6 text-sm text-white/60 sm:mb-8">
          나만의 음악 시작하기
        </p>

        {errorMessage && (
          <p className="mb-4 text-sm text-red-400" role="alert">
            {errorMessage}
          </p>
        )}

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isSigningIn}
          className="flex min-h-[48px] w-full items-center justify-center gap-3 rounded-xl border border-white/[0.18] px-4 py-3.5 text-[15px] font-medium text-white/95 transition-all duration-200 hover:border-white/[0.28] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717] disabled:opacity-60 sm:min-h-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.06) 100%)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
          }}
          aria-label="Google로 로그인"
        >
          <GoogleIcon className="h-5 w-5 shrink-0" />
          {isSigningIn ? "연결 중…" : "Google로 계속하기"}
        </button>
      </div>
    </main>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}
