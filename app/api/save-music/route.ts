import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * POST /api/save-music — fal.ai 생성 음원 URL을 받아 storage에 업로드 후 musics 테이블에 기록.
 * 인증된 사용자만 호출 가능. .env.local FAL_API_KEY 사용처 아님.
 */
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { url: string; title?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const url =
    typeof body.url === "string" && body.url.trim() ? body.url.trim() : null;
  const title =
    typeof body.title === "string" && body.title.trim()
      ? body.title.trim().slice(0, 500)
      : "새 음악";

  if (!url) {
    return NextResponse.json(
      { error: "url is required" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch audio: ${res.status}` },
        { status: 502 }
      );
    }
    const arrayBuffer = await res.arrayBuffer();
    const path = `${user.id}/${crypto.randomUUID()}.mp3`;

    const { error: uploadError } = await supabase.storage
      .from("musics")
      .upload(path, arrayBuffer, {
        contentType: "audio/mpeg",
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: uploadError.message },
        { status: 502 }
      );
    }

    const { data: row, error: insertError } = await supabase
      .from("musics")
      .insert({
        user_id: user.id,
        title,
        file_path_or_url: path,
      })
      .select("id, title, file_path_or_url, created_at")
      .single();

    if (insertError) {
      return NextResponse.json(
        { error: insertError.message },
        { status: 502 }
      );
    }

    return NextResponse.json(row);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Save music failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
