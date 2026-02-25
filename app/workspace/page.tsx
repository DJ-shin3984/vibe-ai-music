"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, Minus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";
import LoadingLines from "@/components/ui/loading-lines";
import { MusicList, type MusicItem } from "@/components/MusicList";
import {
  NeumorphismPlayer,
  type NeumorphismPlayerTrack,
} from "@/components/ui/neumorphism-player";

/**
 * 로그인한 사용자 전용 워크스페이스 페이지.
 * 미로그인 시 /auth로 리다이렉트.
 * 생성된 음원은 musics 스토리지·musics 테이블에 저장되고, 중앙 MusicList로 재생·선택.
 */
export default function WorkspacePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [musicList, setMusicList] = useState<MusicItem[]>([]);
  const [selectedMusicId, setSelectedMusicId] = useState<string | null>(null);
  const searchQuery = searchParams.get("q")?.trim() ?? "";
  const filteredMusicList = useMemo(() => {
    if (!searchQuery) return musicList;
    const lower = searchQuery.toLowerCase();
    return musicList.filter((m) =>
      m.title.toLowerCase().includes(lower)
    );
  }, [musicList, searchQuery]);
  const [playingMusicId, setPlayingMusicId] = useState<string | null>(null);
  const [currentPlaybackUrl, setCurrentPlaybackUrl] = useState<string | null>(null);
  const [promptValue, setPromptValue] = useState("");
  const [lyricsPromptValue, setLyricsPromptValue] = useState("");
  const [progressCurrentSec, setProgressCurrentSec] = useState(0);
  const [progressDurationSec, setProgressDurationSec] = useState(0);
  const [isPromptFormOpen, setIsPromptFormOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/auth");
    }
  }, [user, isLoading, router]);

  const fetchMusics = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch("/api/musics");
      if (res.ok) {
        const data = await res.json();
        setMusicList(Array.isArray(data) ? data : []);
      }
    } catch {
      setMusicList([]);
    }
  }, [user]);

  useEffect(() => {
    fetchMusics();
  }, [fetchMusics]);

  const handleSelectMusic = useCallback(
    (id: string, playbackUrl: string | null) => {
      setSelectedMusicId(id);
      if (!playbackUrl) return;
      setCurrentPlaybackUrl(playbackUrl);
      setPlayingMusicId(id);
    },
    []
  );

  useEffect(() => {
    setProgressCurrentSec(0);
    setProgressDurationSec(0);
  }, [selectedMusicId, currentPlaybackUrl]);

  useEffect(() => {
    if (!currentPlaybackUrl || !selectedMusicId || !audioRef.current) return;
    const el = audioRef.current;
    const onCanPlay = () => el.play().catch(() => {});
    el.addEventListener("canplay", onCanPlay);
    if (el.readyState >= 2) el.play().catch(() => {});
    return () => el.removeEventListener("canplay", onCanPlay);
  }, [currentPlaybackUrl, selectedMusicId]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onEnded = () => setPlayingMusicId(null);
    const onPause = () => setPlayingMusicId(null);
    el.addEventListener("ended", onEnded);
    el.addEventListener("pause", onPause);
    return () => {
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("pause", onPause);
    };
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onTimeUpdate = () => setProgressCurrentSec(el.currentTime);
    const onDurationChange = () =>
      setProgressDurationSec(Number.isFinite(el.duration) ? el.duration : 0);
    const onLoadedMetadata = () =>
      setProgressDurationSec(Number.isFinite(el.duration) ? el.duration : 0);
    el.addEventListener("timeupdate", onTimeUpdate);
    el.addEventListener("durationchange", onDurationChange);
    el.addEventListener("loadedmetadata", onLoadedMetadata);
    return () => {
      el.removeEventListener("timeupdate", onTimeUpdate);
      el.removeEventListener("durationchange", onDurationChange);
      el.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [currentPlaybackUrl]);

  const handlePlayPause = useCallback(() => {
    if (!selectedMusicId && musicList.length > 0) {
      const first = musicList[0];
      handleSelectMusic(first.id, first.playbackUrl);
      return;
    }
    const el = audioRef.current;
    if (!el) return;
    if (playingMusicId && selectedMusicId === playingMusicId) {
      el.pause();
    } else {
      el.play().catch(() => {});
    }
  }, [playingMusicId, selectedMusicId, musicList, handleSelectMusic]);

  const handlePrevious = useCallback(() => {
    if (musicList.length === 0 || !selectedMusicId) return;
    const idx = musicList.findIndex((m) => m.id === selectedMusicId);
    const prevIdx = idx <= 0 ? musicList.length - 1 : idx - 1;
    const prev = musicList[prevIdx];
    handleSelectMusic(prev.id, prev.playbackUrl);
  }, [musicList, selectedMusicId]);

  const handleNext = useCallback(() => {
    if (musicList.length === 0 || !selectedMusicId) return;
    const idx = musicList.findIndex((m) => m.id === selectedMusicId);
    const nextIdx = idx < 0 || idx >= musicList.length - 1 ? 0 : idx + 1;
    const next = musicList[nextIdx];
    handleSelectMusic(next.id, next.playbackUrl);
  }, [musicList, selectedMusicId]);

  const handleProgressBarSeek = useCallback(
    (progressPercent: number) => {
      const el = audioRef.current;
      if (!el || !Number.isFinite(progressDurationSec) || progressDurationSec <= 0)
        return;
      const percent = Math.max(0, Math.min(1, progressPercent));
      const seekSec = percent * progressDurationSec;
      el.currentTime = seekSec;
      setProgressCurrentSec(seekSec);
    },
    [progressDurationSec]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = await Swal.fire({
      title: "제목 입력",
      html: "<p class=\"swal2-label\">이 곡의 제목을 입력하세요. musics 목록에 표시됩니다.</p>",
      input: "text",
      inputLabel: "제목",
      inputPlaceholder: "제목을 입력하세요",
      inputAttributes: { "aria-label": "곡 제목" },
      showCancelButton: true,
      confirmButtonText: "음악 생성",
      cancelButtonText: "취소",
      inputValidator: (value) => {
        const t = value?.trim();
        if (!t) return "제목을 입력해 주세요.";
        if (t.length > 500) return "제목은 500자 이내로 입력해 주세요.";
        return null;
      },
    });

    if (!result.isConfirmed || result.value == null) return;

    const titleTrimmed = String(result.value).trim();
    setIsGenerating(true);
    try {
      const res = await fetch("/api/generate-music", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptValue.trim(),
          lyrics_prompt: lyricsPromptValue.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? `요청 실패 (${res.status})`);
        return;
      }
      if (!data.url) {
        setError("음원 URL을 받지 못했습니다.");
        return;
      }
      const saveRes = await fetch("/api/save-music", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: data.url, title: titleTrimmed }),
      });
      if (saveRes.ok) {
        await fetchMusics();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "네트워크 오류");
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading || !user) {
    return (
      <main
        className="flex min-h-0 flex-1 items-center justify-center p-4 sm:p-6 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/AI_thought.png')" }}
      >
        <div className="absolute inset-0 bg-black/40" aria-hidden />
        <div className="relative text-sm text-white/90">{(isLoading ? "확인 중…" : "이동 중…")}</div>
      </main>
    );
  }

  return (
    <main
      className="flex min-h-0 flex-1 flex-col bg-cover bg-center bg-no-repeat bg-fixed min-h-screen"
      style={{ backgroundImage: "url('/AI_thought.png')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 pointer-events-none" aria-hidden />
      <div
        className={`relative flex-1 min-h-0 overflow-auto p-4 sm:p-6 md:p-8 ${
          isPromptFormOpen
            ? "pb-[420px] sm:pb-80 md:pb-72"
            : "pb-8"
        }`}
      >
        <div className="mx-auto w-full max-w-3xl min-h-0">
          <div className="glass-card rounded-3xl p-6 sm:p-8 md:p-10 mb-6">
            <h1 className="mb-2 text-2xl font-semibold text-white sm:text-3xl">
              워크스페이스
            </h1>
            <p className="mb-6 text-white/80">
              음악적 영감이 오는 공간입니다. 프롬프트에 스타일·분위기·장면을, 가사
              프롬프트에 [verse]/[chorus] 등 구조 태그를 넣어 음악을 만들어 보세요.
            </p>

            {isGenerating && (
              <section
                className="mb-6 rounded-xl glass-input p-4 pointer-events-none"
                aria-live="polite"
                aria-busy
                aria-label="Creating..."
              >
                <LoadingLines text="Creating..." aria-label="Creating..." />
              </section>
            )}

            {error && (
              <div
                className="mb-4 rounded-xl border border-red-400/50 bg-red-500/20 px-4 py-3 text-sm text-red-100 backdrop-blur-sm"
                role="alert"
              >
                {error}
              </div>
            )}

            <div className="flex min-h-0 flex-col items-center justify-center w-full max-w-sm mx-auto">
              <audio
                  ref={audioRef}
                  src={currentPlaybackUrl ?? undefined}
                  preload="metadata"
                  onPlay={() =>
                    selectedMusicId && setPlayingMusicId(selectedMusicId)
                  }
                  className="sr-only"
                  aria-label="음악 재생"
                >
                  브라우저가 오디오 재생을 지원하지 않습니다.
                </audio>
                <NeumorphismPlayer
                  track={
                    selectedMusicId
                      ? (() => {
                          const item = musicList.find((m) => m.id === selectedMusicId);
                          if (!item) return null;
                          const t: NeumorphismPlayerTrack = {
                            title: item.title,
                            subtitle: "내 음악",
                          };
                          return t;
                        })()
                      : null
                  }
                  progress={{
                    currentSec: progressCurrentSec,
                    durationSec: progressDurationSec,
                  }}
                  isPlaying={!!playingMusicId && selectedMusicId === playingMusicId}
                  onPlayPause={handlePlayPause}
                  onPrevious={musicList.length > 1 ? handlePrevious : undefined}
                  onNext={musicList.length > 1 ? handleNext : undefined}
                  onProgressBarSeek={handleProgressBarSeek}
                  playlistSlot={
                    <MusicList
                      items={filteredMusicList}
                      selectedId={selectedMusicId}
                      playingId={playingMusicId}
                      onSelect={handleSelectMusic}
                      className="w-full min-h-0 flex-1 border-0 bg-transparent shadow-none rounded-none"
                      headerAction={
                        <button
                          type="button"
                          onClick={() => setIsPromptFormOpen((prev) => !prev)}
                          className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-white/70 hover:text-white/90 rounded-full bg-transparent border-0 shadow-none focus-visible:ring-2 focus-visible:ring-[#9b87f5] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                          aria-label={isPromptFormOpen ? "프롬프트 입력 접기" : "프롬프트 입력 펼치기"}
                        >
                          {isPromptFormOpen ? (
                            <Minus className="w-4 h-4 sm:w-4 sm:h-4" aria-hidden />
                          ) : (
                            <Plus className="w-4 h-4 sm:w-4 sm:h-4" aria-hidden />
                          )}
                        </button>
                      }
                    />
                  }
                />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isPromptFormOpen && (
          <motion.div
            key="prompt-form"
            className="glass-form-bar fixed bottom-0 left-0 right-0 z-40 px-4 pt-3 pb-5 sm:pb-6"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "tween",
              duration: 0.35,
              ease: [0.32, 0.72, 0, 1],
            }}
          >
            <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-3xl space-y-4"
            aria-label="음악 생성 입력"
          >
            <div>
              <label
                htmlFor="workspace-prompt"
                className="mb-1.5 block text-sm font-medium text-white/95"
              >
                Prompt <span className="text-white/60">(스타일·분위기·장면, 10–300자)</span>
              </label>
              <textarea
                id="workspace-prompt"
                value={promptValue}
                onChange={(e) => setPromptValue(e.target.value)}
                placeholder="Indie folk, melancholic, introspective, longing, solitary walk, coffee shop"
                rows={2}
                disabled={isGenerating}
                className="glass-input w-full rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 min-h-[60px] resize-y disabled:cursor-not-allowed disabled:opacity-60"
                aria-describedby="workspace-prompt-hint"
              />
              <p id="workspace-prompt-hint" className="sr-only">
                음악 스타일, 분위기, 장면을 10–300자로 입력하세요.
              </p>
            </div>
            <div>
              <label
                htmlFor="workspace-lyrics"
                className="mb-1.5 block text-sm font-medium text-white/95"
              >
                Lyrics Prompt <span className="text-white/60">(가사, [Intro]/[verse]/[chorus] 등, 10–3000자)</span>
              </label>
              <textarea
                id="workspace-lyrics"
                value={lyricsPromptValue}
                onChange={(e) => setLyricsPromptValue(e.target.value)}
                placeholder="[verse]가사 입력... [chorus]후렴..."
                rows={4}
                disabled={isGenerating}
                className="glass-input w-full rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 min-h-[80px] resize-y disabled:cursor-not-allowed disabled:opacity-60"
                aria-describedby="workspace-lyrics-hint"
              />
              <p id="workspace-lyrics-hint" className="sr-only">
                가사를 입력하세요. [Intro], [verse], [chorus], [bridge], [outro] 태그로 구간을 나눌 수 있습니다. 10–3000자.
              </p>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isGenerating}
                className="glass-cta-button rounded-full px-6 py-3 text-sm font-semibold text-white uppercase tracking-wide hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-60 transition-opacity"
                aria-busy={isGenerating}
                aria-label="음악 생성 요청"
              >
                {isGenerating ? "생성 중…" : "음악 생성"}
              </button>
            </div>
          </form>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
