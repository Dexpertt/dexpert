"use client";

import dynamic from "next/dynamic";

/**
 * The live demo uses the microphone, WebRTC and the ElevenLabs SDK, so it only renders in the browser.
 */
const VoiceDemoLive = dynamic(() => import("./voice-demo-live").then((m) => m.VoiceDemoLive), {
  ssr: false,
  loading: () => (
    <div className="glass flex min-h-[640px] items-center justify-center rounded-[2rem] text-sm text-muted" aria-busy>
      Loading the live voice demo…
    </div>
  ),
});

export function VoiceDemoCenter() {
  return <VoiceDemoLive />;
}
