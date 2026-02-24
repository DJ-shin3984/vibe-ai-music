import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main className="flex min-h-0 flex-1 flex-col w-full bg-black">
      <Hero
        title="Vibe AI Music"
        subtitle="AI와 함께 만드는 당신만의 음악"
        ctaLabel="시작하기"
        ctaHref="/auth"
      />
    </main>
  );
}