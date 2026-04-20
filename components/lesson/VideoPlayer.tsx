"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/assetPath";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

type Props = {
  src: string;
  onProgress?: (currentTime: number, duration: number) => void;
  onComplete?: () => void;
  className?: string;
};

function formatTime(s: number): string {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function VideoPlayer({ src, onProgress, onComplete, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(false);

  const url = src ? withBasePath(src.startsWith("http") ? src : src) : "";

  const togglePlay = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) void el.play();
    else el.pause();
  }, []);

  const onTime = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCurrent(el.currentTime);
    setDuration(el.duration || 0);
    onProgress?.(el.currentTime, el.duration || 0);
    const d = el.duration;
    if (d > 0 && !completed && el.currentTime / d >= 0.9) {
      setCompleted(true);
      onComplete?.();
    }
  }, [completed, onComplete, onProgress]);

  useEffect(() => {
    setCompleted(false);
    setError(false);
  }, [url]);

  if (!src) {
    return (
      <div
        className={cn(
          "flex aspect-video items-center justify-center rounded-lg border border-dashed border-ux-border bg-ux-surface text-sm text-ux-text-muted",
          className
        )}
        role="status"
      >
        Video wird bald verfügbar sein.
      </div>
    );
  }

  return (
    <div className={cn("rounded-lg border border-ux-border bg-black", className)}>
      <video
        ref={ref}
        className="aspect-video w-full bg-black"
        src={url}
        playsInline
        preload="metadata"
        onTimeUpdate={onTime}
        onLoadedMetadata={onTime}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setError(true)}
      />
      {error ? (
        <p className="p-3 text-center text-sm text-ux-warning">
          Video konnte nicht geladen werden (URL oder Netzwerk).
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-3 border-t border-ux-border bg-ux-surface px-3 py-2">
        <Button type="button" variant="ghost" size="sm" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
          {playing ? "Pause" : "Play"}
        </Button>
        <span className="font-ux-mono text-xs text-ux-text-muted" aria-live="polite">
          {formatTime(current)} / {formatTime(duration)}
        </span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={current}
          aria-label="Position im Video"
          className="h-1 flex-1 min-w-[120px] accent-ux-accent-gold"
          onChange={(e) => {
            const el = ref.current;
            if (!el) return;
            el.currentTime = Number(e.target.value);
            setCurrent(el.currentTime);
          }}
        />
        <label className="flex items-center gap-1 text-xs text-ux-text-muted">
          <span className="hidden sm:inline">Vol</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            aria-label="Lautstärke"
            className="w-20 accent-ux-accent-gold"
            onChange={(e) => {
              const v = Number(e.target.value);
              setVolume(v);
              if (ref.current) ref.current.volume = v;
            }}
          />
        </label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="ml-auto"
          onClick={() => {
            const el = ref.current;
            if (!el) return;
            if (!document.fullscreenElement) void el.requestFullscreen();
            else void document.exitFullscreen();
          }}
          aria-label="Vollbild"
        >
          Vollbild
        </Button>
      </div>
    </div>
  );
}
