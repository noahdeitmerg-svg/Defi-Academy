"use client";

import type { ComponentProps } from "react";
import { VideoSection } from "./VideoSection";

export type VideoPlayerProps = ComponentProps<typeof VideoSection>;

/** Video-Tab: echter Player (videoSlot) oder Platzhalter + Transkript. */
export function VideoPlayer(props: VideoPlayerProps) {
  return <VideoSection {...props} />;
}
