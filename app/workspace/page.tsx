import { Suspense } from "react";
import WorkspacePageClient from "./WorkspacePageClient";
import LoadingLines from "@/components/ui/loading-lines";

/**
 * 로그인한 사용자 전용 워크스페이스 페이지.
 * useSearchParams 사용 컴포넌트를 Suspense로 감싸 프리렌더 오류를 방지한다.
 */
export default function WorkspacePage() {
  return (
    <Suspense
      fallback={
        <main
          className="flex min-h-0 flex-1 items-center justify-center p-4 sm:p-6 bg-cover bg-center bg-no-repeat bg-fixed min-h-screen"
          style={{ backgroundImage: "url('/AI_thought.png')" }}
        >
          <div className="absolute inset-0 bg-black/40" aria-hidden />
          <div className="relative flex flex-col items-center gap-4">
            <LoadingLines text="로딩 중…" aria-label="로딩 중" />
          </div>
        </main>
      }
    >
      <WorkspacePageClient />
    </Suspense>
  );
}
