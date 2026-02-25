import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침 | Vibe AI Music",
  description: "Vibe AI Music 개인정보처리방침",
};

const contentClassName = "mx-auto w-full max-w-3xl px-4 sm:px-6 py-8 sm:py-12";
const h1ClassName = "text-2xl sm:text-3xl font-semibold text-white";
const h2ClassName = "mt-8 text-xl font-semibold text-white";
const pClassName = "mt-3 text-sm sm:text-base text-white/80 leading-relaxed";
const linkClassName =
  "text-white/80 underline underline-offset-2 hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#181818] rounded";

export default function PrivacyPage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col bg-[#181818]">
      <div className={contentClassName}>
        <h1 id="privacy-title" className={h1ClassName}>
          개인정보처리방침
        </h1>
        <p className="mt-2 text-sm text-white/60">
          시행일: 2025년 1월 1일
        </p>

        <section aria-labelledby="section-1">
          <h2 id="section-1" className={h2ClassName}>
            1. 수집하는 개인정보
          </h2>
          <p className={pClassName}>
            Vibe AI Music(이하 &quot;서비스&quot;)는 Google 로그인을 통해 이메일, 프로필
            이름, 프로필 이미지 등 서비스 이용에 필요한 최소한의 정보를 수집합니다.
          </p>
        </section>

        <section aria-labelledby="section-2">
          <h2 id="section-2" className={h2ClassName}>
            2. 개인정보의 이용 목적
          </h2>
          <p className={pClassName}>
            수집된 정보는 회원 식별, 워크스페이스 제공, 서비스 개선 및 고지 사항
            전달에만 사용됩니다.
          </p>
        </section>

        <section aria-labelledby="section-3">
          <h2 id="section-3" className={h2ClassName}>
            3. 개인정보의 보관 및 파기
          </h2>
          <p className={pClassName}>
            이용자가 계정 삭제 또는 탈퇴를 요청한 경우 관련 개인정보는 지체 없이
            파기합니다. 법령에 따라 보존이 필요한 경우 해당 기간 동안만 보관합니다.
          </p>
        </section>

        <section aria-labelledby="section-4">
          <h2 id="section-4" className={h2ClassName}>
            4. 제3자 제공
          </h2>
          <p className={pClassName}>
            서비스는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.
            단, 법령에 따른 요청이 있는 경우 예외로 합니다.
          </p>
        </section>

        <section aria-labelledby="section-5">
          <h2 id="section-5" className={h2ClassName}>
            5. 문의
          </h2>
          <p className={pClassName}>
            개인정보 처리와 관련한 문의는 서비스 내 안내된 채널을 통해 연락
            주시기 바랍니다.
          </p>
        </section>

        <nav
          className="mt-10 flex flex-wrap items-center gap-4 border-t border-white/[0.08] pt-8"
          aria-label="관련 페이지"
        >
          <Link href="/" className={linkClassName}>
            홈으로
          </Link>
          <Link href="/terms" className={linkClassName}>
            이용약관
          </Link>
        </nav>
      </div>
    </main>
  );
}
