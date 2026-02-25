import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "이용약관 | Vibe AI Music",
  description: "Vibe AI Music 이용약관",
};

const contentClassName = "mx-auto w-full max-w-3xl px-4 sm:px-6 py-8 sm:py-12";
const h1ClassName = "text-2xl sm:text-3xl font-semibold text-white";
const h2ClassName = "mt-8 text-xl font-semibold text-white";
const pClassName = "mt-3 text-sm sm:text-base text-white/80 leading-relaxed";
const linkClassName =
  "text-white/80 underline underline-offset-2 hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#181818] rounded";

export default function TermsPage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col bg-[#181818]">
      <div className={contentClassName}>
        <h1 id="terms-title" className={h1ClassName}>
          이용약관
        </h1>
        <p className="mt-2 text-sm text-white/60">
          시행일: 2025년 1월 1일
        </p>

        <section aria-labelledby="section-1">
          <h2 id="section-1" className={h2ClassName}>
            1. 목적
          </h2>
          <p className={pClassName}>
            본 약관은 Vibe AI Music(이하 &quot;서비스&quot;)의 이용 조건 및 절차, 이용자와
            운영자 간의 권리·의무를 정함을 목적으로 합니다.
          </p>
        </section>

        <section aria-labelledby="section-2">
          <h2 id="section-2" className={h2ClassName}>
            2. 서비스의 내용
          </h2>
          <p className={pClassName}>
            서비스는 AI를 활용한 음악 제작·영감 지원 등 이용자에게 제공되는
            온라인 서비스를 포함합니다. 서비스 내용은 운영 정책에 따라 추가·변경될
            수 있습니다.
          </p>
        </section>

        <section aria-labelledby="section-3">
          <h2 id="section-3" className={h2ClassName}>
            3. 이용 계약
          </h2>
          <p className={pClassName}>
            이용 계약은 이용자가 약관에 동의하고 로그인 절차를 완료한 시점에
            성립됩니다. 이용자는 본인에 해당하는 계정만 사용하여야 합니다.
          </p>
        </section>

        <section aria-labelledby="section-4">
          <h2 id="section-4" className={h2ClassName}>
            4. 이용 제한
          </h2>
          <p className={pClassName}>
            서비스는 법령 또는 약관 위반, 다른 이용자 또는 제3자에 대한
            권리 침해 등이 확인되는 경우 사전 안내 없이 서비스 이용을 제한하거나
            계정을 정지할 수 있습니다.
          </p>
        </section>

        <section aria-labelledby="section-5">
          <h2 id="section-5" className={h2ClassName}>
            5. 약관의 변경
          </h2>
          <p className={pClassName}>
            약관이 변경되는 경우 서비스 내 공지 또는 이메일 등으로 안내하며,
            변경된 약관 시행일 이후 계속 이용하는 경우 변경에 동의한 것으로
            봅니다.
          </p>
        </section>

        <section aria-labelledby="section-6">
          <h2 id="section-6" className={h2ClassName}>
            6. 문의
          </h2>
          <p className={pClassName}>
            이용약관과 관련한 문의는 서비스 내 안내된 채널을 통해 연락
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
          <Link href="/privacy" className={linkClassName}>
            개인정보처리방침
          </Link>
        </nav>
      </div>
    </main>
  );
}
