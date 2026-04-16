"use client";

import type { ComponentProps } from "react";
import { VideoSection } from "./VideoSection";

export type VideoPlayerProps = ComponentProps<typeof VideoSection>;

/** Platzhalter-Video + Transkript (Voice Narration) — Vorbereitung für KI-Video. */
export function VideoPlayer(props: VideoPlayerProps) {
  return <VideoSection {...props} />;
}
