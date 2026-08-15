"use client";

import { useRef, useState } from "react";

// Player de áudio simples para a narração gravada da história.
// Fica embaixo da capa, na página inicial do livro.
export default function AudioNarration({ src, label = "Ouvir com a minha voz" }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 a 1

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
  }

  function handleTimeUpdate() {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setProgress(audio.currentTime / audio.duration);
  }

  return (
    <div className="flex w-full max-w-xs items-center gap-3 rounded-full bg-white/70 px-4 py-2 shadow-md shadow-rose/10 ring-1 ring-blush dark:bg-nightCard/70 dark:ring-nightBlush dark:shadow-black/20">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setProgress(0);
        }}
        onTimeUpdate={handleTimeUpdate}
      />

      <button
        onClick={toggle}
        aria-label={playing ? "Pausar narração" : "Tocar narração"}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose text-white shadow-sm shadow-rose/40 transition hover:scale-105 active:scale-95"
      >
        {playing ? (
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M7 5v14l12-7z" />
          </svg>
        )}
      </button>

      <div className="flex flex-1 flex-col gap-1 text-left">
        <span className="text-xs font-semibold text-mauve dark:text-blush">{label}</span>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-blush">
          <div
            className="h-full rounded-full bg-rose transition-[width]"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
