"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { PromptInputBox } from "@/components/ui/ai-prompt-box";

/**
 * 로그인한 사용자 전용 워크스페이스 페이지.
 * 미로그인 시 /auth로 리다이렉트.
 * 하단에 고정된 AI 프롬프트 입력창이 있다.
 */
export default function WorkspacePage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/auth");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <main className="flex min-h-0 flex-1 items-center justify-center bg-[#171717] p-4 sm:p-6">
        <div className="text-sm text-white/60">
          {isLoading ? "확인 중…" : "이동 중…"}
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-0 flex-1 flex-col bg-[#171717]">
      <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8 pb-28">
        <div className="mx-auto w-full max-w-3xl">
          <h1 className="mb-2 text-2xl font-semibold text-white/95 sm:text-3xl">
            워크스페이스
          </h1>
          <p className="text-white/60">
            음악적 영감이 오는 공간입니다. 여기에 나만의 콘텐츠를 채워 보세요.
          </p>
        </div>
      </div>

      <div
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.08] bg-[#171717]/95 px-4 pt-3 pb-5 sm:pb-6 backdrop-blur-md"
        style={{
          boxShadow: "0 -4px 24px rgba(0,0,0,0.2)",
        }}
      >
        <div className="mx-auto max-w-3xl">
          <PromptInputBox
            placeholder="메시지를 입력하세요..."
            onSend={(message, files) => {
              // TODO: API 연동
              console.log("Send:", message, files);
            }}
          />
        </div>
      </div>
    </main>
  );
}
