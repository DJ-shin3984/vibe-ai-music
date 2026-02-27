import type { Metadata } from "next";
import { FireworkCanvas } from "./FireworkCanvas";

export const metadata: Metadata = {
  title: "불꽃놀이 | Vibe AI Music",
  description: "터치하거나 클릭한 곳에서 불꽃이 발사됩니다.",
};

/**
 * 불꽃놀이 페이지. 전역 헤더 아래 영역을 꽉 채우며 반응형으로 표시됨.
 */
export default function FireworkPage() {
  return (
    <main
      className="flex min-h-0 flex-1 flex-col w-full overflow-hidden"
      aria-label="불꽃놀이"
    >
      <div className="flex min-h-0 flex-1 w-full">
        <FireworkCanvas />
      </div>
    </main>
  );
}
