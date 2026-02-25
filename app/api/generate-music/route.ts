import { NextRequest, NextResponse } from "next/server";
import { fal } from "@fal-ai/client";

const MODEL = "fal-ai/minimax-music/v2";

const DEFAULT_PROMPT =
  "Indie folk, melancholic, introspective, longing, solitary walk, coffee shop";
const DEFAULT_LYRICS =
  "[verse]Streetlights flicker, the night breeze sighs\nShadows stretch as I walk alone\nAn old coat wraps my silent sorrow\nWandering, longing, where should I go[chorus]Pushing the wooden door, the aroma spreads\nIn a familiar corner, a stranger gazes";

/** prompt 10–300자 */
function clampPrompt(s: string): string {
  const t = s.trim();
  if (!t) return DEFAULT_PROMPT;
  if (t.length <= 300) return t;
  return t.slice(0, 300);
}

/** lyrics_prompt 10–3000자 */
function clampLyrics(s: string): string {
  const t = s.trim();
  if (!t) return DEFAULT_LYRICS;
  if (t.length <= 3000) return t;
  return t.slice(0, 3000);
}

/**
 * POST /api/generate-music — fal.ai Text To Music V2 (minimax-music/v2).
 * 스키마: prompt(10–300자), lyrics_prompt(10–3000자). 출력: audio.url (mp3).
 * 인증: FAL_API_KEY 또는 FAL_KEY.
 */
export async function POST(request: NextRequest) {
  const key = process.env.FAL_API_KEY ?? process.env.FAL_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "FAL_API_KEY 또는 FAL_KEY가 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  fal.config({ credentials: key });

  let body: { prompt?: string; lyrics_prompt?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const prompt = clampPrompt(
    typeof body.prompt === "string" ? body.prompt : ""
  );
  const lyrics_prompt = clampLyrics(
    typeof body.lyrics_prompt === "string" ? body.lyrics_prompt : ""
  );

  const input = { prompt, lyrics_prompt };

  console.log("[generate-music] fal.ai API 요청 전송", {
    model: MODEL,
    prompt: prompt.slice(0, 50) + (prompt.length > 50 ? "…" : ""),
  });

  try {
    const result = await fal.subscribe(MODEL, {
      input,
      logs: false,
      timeout: 30 * 60 * 1000, // 30분
      startTimeout: 90,
    });

    const audio =
      result.data &&
      typeof result.data === "object" &&
      "audio" in result.data &&
      result.data.audio &&
      typeof (result.data.audio as { url?: string }).url === "string"
        ? (result.data.audio as { url: string }).url
        : null;

    if (!audio) {
      console.log("[generate-music] fal.ai 응답: 오디오 URL 없음");
      return NextResponse.json(
        { error: "모델이 오디오 URL을 반환하지 않았습니다." },
        { status: 502 }
      );
    }

    console.log("[generate-music] fal.ai 응답 성공, audio.url 수신");
    return NextResponse.json({ url: audio });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "fal.ai 요청에 실패했습니다.";
    console.error("[generate-music] fal.ai 요청 실패:", message);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
