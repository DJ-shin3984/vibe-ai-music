import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const SIGNED_URL_EXPIRY_SEC = 3600;

/**
 * GET /api/musics — 현재 사용자의 음악 목록을 재생용 signed URL과 함께 반환.
 */
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: rows, error } = await supabase
    .from("musics")
    .select("id, title, file_path_or_url, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 502 }
    );
  }

  const list = await Promise.all(
    (rows ?? []).map(async (row) => {
      const { data: signed } = await supabase.storage
        .from("musics")
        .createSignedUrl(row.file_path_or_url, SIGNED_URL_EXPIRY_SEC);
      return {
        id: row.id,
        title: row.title ?? "제목 없음",
        created_at: row.created_at,
        playbackUrl: signed?.signedUrl ?? null,
      };
    })
  );

  return NextResponse.json(list);
}
