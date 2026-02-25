import Link from "next/link";

/**
 * 404 페이지. 존재하지 않는 경로 접근 시 표시.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-1 flex-col items-center justify-center bg-black px-4">
      <h1 className="text-2xl font-semibold text-white">페이지를 찾을 수 없습니다</h1>
      <p className="mt-2 text-white/60">요청한 경로가 존재하지 않습니다.</p>
      <Link
        href="/"
        className="mt-6 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        홈으로
      </Link>
    </main>
  );
}
