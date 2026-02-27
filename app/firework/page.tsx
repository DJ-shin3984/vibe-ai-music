import type { Metadata } from "next";
import { FireworkCanvas } from "./FireworkCanvas";

export const metadata: Metadata = {
  title: "불꽃놀이 | Vibe AI Music",
  description: "터치하거나 클릭한 곳에서 불꽃이 발사됩니다.",
};

/**
 * 불꽃놀이 페이지. 캔버스는 fixed로 100dvh 전체를 사용.
 */
export default function FireworkPage() {
  return (
    <main className="w-full flex-1" aria-label="불꽃놀이">
      <FireworkCanvas />
    </main>
  );
}
