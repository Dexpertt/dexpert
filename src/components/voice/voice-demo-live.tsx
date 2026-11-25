"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ConversationProvider, useConversation } from "@elevenlabs/react";
import {
  CheckCircle2,
  Languages,
  Loader2,
  MessageCircle,
  Mic,
  MicOff,
  Pause,
  Phone,
  PhoneOff,
  Play,
  RotateCcw,
  ShieldCheck,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  MAX_CALL_SECONDS,
  buildFirstMessage,
  buildPrompt,
  demoIndustries,
  demoLanguages,
  demoVoices,
  type DemoIndustry,
  type DemoLanguage,
  type DemoVoice,
  type Gender,
} from "@/content/voice-agents";
import { VoiceOrb } from "@/components/three/scenes";
import { Waveform } from "./waveform";
import { Icon } from "@/components/shared/icon";
import { BookButton } from "@/components/shared/cta-buttons";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Line = { role: "agent" | "user"; text: string; id: number };
type Phase = "idle" | "connecting" | "live" | "ended";

const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

const errorText: Record<string, string> = {
  mic: "We couldn't use your microphone. Please allow microphone access in your browser (look for the mic icon in the address bar) and press Call again.",
  not_configured: "Live calling is being switched on right now. Please check back shortly, or message us on WhatsApp and we'll call you with a live demo.",
  rate_limited: "You've made several demo calls in the last hour. Please try again a little later, or book a call and we'll set up a demo for your business.",
  generic: "The call couldn't connect. Please check your internet connection and try again.",
};

export function VoiceDemoLive() {
  return (
    <ConversationProvider>
      <DemoCenter />
    </ConversationProvider>
  );
}

function DemoCenter() {
  const [industryId, setIndustryId] = useState(demoIndustries[0].id);
  const [voiceKey, setVoiceKey] = useState(demoVoices[0].key);
  const [langCode, setLangCode] = useState<DemoLanguage["code"]>("en");
  const [genderFilter, setGenderFilter] = useState<Gender | "all">("all");
  const [configured, setConfigured] = useState<boolean | null>(null);

  const industry = demoIndustries.find((i) => i.id === industryId) as DemoIndustry;
  const voice = demoVoices.find((v) => v.key === voiceKey) as DemoVoice;
  const language = demoLanguages.find((l) => l.code === langCode) as DemoLanguage;

  const [phase, setPhase] = useState<Phase>("idle");
  const [lines, setLines] = useState<Line[]>([]);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [speakerOn, setSpeakerOn] = useState(true);

  const phaseRef = useRef<Phase>("idle");
  const transportRef = useRef<"webrtc" | "websocket">("webrtc");
  const retriedRef = useRef(false);
  const startArgs = useRef<{ industry: DemoIndustry; voice: DemoVoice; language: DemoLanguage } | null>(null);
  const lineId = useRef(0);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const level = useRef(0);
  const [callArgs, setCallArgs] = useState<{ industry: DemoIndustry; voice: DemoVoice; language: DemoLanguage } | null>(null);

  const setP = (p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  };

  useEffect(() => {
    fetch("/api/voice-session")
      .then((r) => r.json())
      .then((d: { configured?: boolean }) => setConfigured(Boolean(d.configured)))
      .catch(() => setConfigured(false));
  }, []);

  const connectRef = useRef<(transport: "webrtc" | "websocket") => void>(() => {});

  const conversation = useConversation({
    onConnect: () => {
      setP("live");
      setError(null);
    },
    onDisconnect: () => {
      if (phaseRef.current === "live") setP("ended");
    },
    onMessage: ({ message, role }) => {
      const text = message?.trim();
      if (!text) return;
      setLines((l) => [...l, { role: role === "agent" ? "agent" : "user", text, id: ++lineId.current }]);
    },
    onError: (message) => {
      console.error("[voice demo]", message);
      // WebRTC can be blocked on some office/VPN networks: fall back to a WebSocket connection once.
      if (phaseRef.current === "connecting" && transportRef.current === "webrtc" && !retriedRef.current) {
        retriedRef.current = true;
        connectRef.current("websocket");
        return;
      }
      if (phaseRef.current === "connecting") {
        setError(errorText.generic);
        setP("idle");
      }
    },
  });
  const { status, isSpeaking, isMuted, setMuted, endSession, startSession, setVolume, getInputVolume, getOutputVolume } = conversation;

  const connect = useCallback(
    async (transport: "webrtc" | "websocket") => {
      const args = startArgs.current;
      if (!args) return;
      transportRef.current = transport;
      try {
        const res = await fetch("/api/voice-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ voice: args.voice.key, transport }),
        });
        const data = (await res.json().catch(() => ({}))) as { conversationToken?: string; signedUrl?: string; voiceId?: string; error?: string };
        if (phaseRef.current !== "connecting") return;
        if (!res.ok || !data.voiceId) {
          setError(errorText[data.error ?? ""] ?? errorText.generic);
          setP("idle");
          return;
        }
        const overrides = {
          agent: {
            prompt: { prompt: buildPrompt(args.industry, args.voice, args.language) },
            firstMessage: buildFirstMessage(args.industry, args.voice, args.language),
            language: args.language.code,
          },
          tts: { voiceId: data.voiceId },
        };
        if (data.conversationToken) {
          startSession({ conversationToken: data.conversationToken, connectionType: "webrtc", overrides });
        } else if (data.signedUrl) {
          startSession({ signedUrl: data.signedUrl, connectionType: "websocket", overrides });
        }
      } catch {
        if (phaseRef.current === "connecting") {
          setError(errorText.generic);
          setP("idle");
        }
      }
    },
    [startSession],
  );
  useEffect(() => {
    connectRef.current = connect;
  }, [connect]);

  const startCall = async () => {
    setError(null);
    if (configured === false) {
      setError(errorText.not_configured);
      return;
    }
    // Ask for the microphone first so the visitor sees the browser prompt right away.
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
      stream.getTracks().forEach((t) => t.stop());
    } catch {
      setError(errorText.mic);
      return;
    }
    startArgs.current = { industry, voice, language };
    setCallArgs(startArgs.current);
    retriedRef.current = false;
    setLines([]);
    setSeconds(0);
    setP("connecting");
    connect("webrtc");
  };

  const endCall = useCallback(() => {
    setP(phaseRef.current === "live" ? "ended" : "idle");
    try {
      endSession();
    } catch {}
  }, [endSession]);

  // Call timer and hard stop.
  useEffect(() => {
    if (phase !== "live") return;
    const i = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(i);
  }, [phase]);
  useEffect(() => {
    if (phase === "live" && seconds >= MAX_CALL_SECONDS) endCall();
  }, [seconds, phase, endCall]);

  // If the connection drops on its own, show the end screen.
  useEffect(() => {
    if (status === "disconnected" && phaseRef.current === "live") setP("ended");
  }, [status]);

  // Drive the orb and waveform from real audio levels.
  useEffect(() => {
    if (phase !== "live") {
      level.current = 0;
      return;
    }
    let raf = 0;
    const tick = () => {
      try {
        const v = isSpeaking ? getOutputVolume() : getInputVolume() * 0.7;
        level.current = Math.min(1, v * 1.8);
      } catch {
        level.current = 0;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, isSpeaking, getInputVolume, getOutputVolume, level]);

  useEffect(() => {
    const el = transcriptRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [lines, phase]);

  // Hang up if the visitor leaves the page.
  useEffect(
    () => () => {
      try {
        endSession();
      } catch {}
    },
    [endSession],
  );

  const inCall = phase === "connecting" || phase === "live";
  /** Changing a setting after a call resets the panel for the next call. */
  const pick = (fn: () => void) => {
    if (inCall) return;
    fn();
    if (phaseRef.current === "ended") {
      setP("idle");
      setLines([]);
      setSeconds(0);
      setCallArgs(null);
    }
  };
  const shownVoices = demoVoices.filter((v) => genderFilter === "all" || v.gender === genderFilter);
  const callIndustry = callArgs?.industry ?? industry;
  const callVoice = callArgs?.voice ?? voice;
  const callLanguage = callArgs?.language ?? language;
  const remaining = MAX_CALL_SECONDS - seconds;

  const statusLabel =
    phase === "idle"
      ? "Ready to call"
      : phase === "connecting"
        ? "Connecting…"
        : phase === "live"
          ? isSpeaking
            ? `${callVoice.name} is speaking`
            : "Listening…"
          : "Call ended";

  return (
    <div className="flex flex-col gap-10">
      {/* 1. Industry */}
      <fieldset disabled={inCall} className="flex flex-col gap-4">
        <legend className="mb-4 flex items-center gap-3 text-lg font-semibold text-foreground">
          <Step n={1} /> Choose your industry
        </legend>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {demoIndustries.map((d) => {
            const on = d.id === industryId;
            return (
              <button
                key={d.id}
                type="button"
                aria-pressed={on}
                onClick={() => pick(() => setIndustryId(d.id))}
                className={cn(
                  "glass flex flex-col items-start gap-3 rounded-2xl p-4 text-left transition-all disabled:opacity-60",
                  on ? "border-primary/60 shadow-[0_0_36px_-12px_rgba(0,245,255,0.6)]" : "hover:border-white/20",
                )}
              >
                <span className="flex size-10 items-center justify-center rounded-xl" style={{ background: `linear-gradient(135deg, ${d.colors[0]}30, ${d.colors[1]}30)`, color: d.colors[0] }}>
                  <Icon name={d.icon} className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">{d.label}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted">{d.summary}</span>
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {/* 2. Voice */}
        <fieldset disabled={inCall} className="flex flex-col gap-4">
          <legend className="mb-4 flex w-full flex-wrap items-center justify-between gap-3 text-lg font-semibold text-foreground">
            <span className="flex items-center gap-3">
              <Step n={2} /> Pick a voice
            </span>
          </legend>
          <div role="radiogroup" aria-label="Filter voices" className="flex gap-2">
            {(["all", "female", "male"] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() =>
                  pick(() => {
                    setGenderFilter(g);
                    if (g !== "all" && voice.gender !== g) setVoiceKey(demoVoices.find((v) => v.gender === g)!.key);
                  })
                }
                className={cn("rounded-full border px-4 py-1.5 text-sm capitalize transition-colors", genderFilter === g ? "border-primary/60 bg-primary/10 text-primary" : "border-white/10 text-muted hover:text-foreground")}
              >
                {g === "all" ? "All voices" : g}
              </button>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {shownVoices.map((v) => (
              <VoiceCard key={v.key} voice={v} selected={v.key === voiceKey} onSelect={() => pick(() => setVoiceKey(v.key))} canPreview={configured === true} />
            ))}
          </div>
        </fieldset>

        {/* 3. Language */}
        <fieldset disabled={inCall} className="flex flex-col gap-4">
          <legend className="mb-4 flex items-center gap-3 text-lg font-semibold text-foreground">
            <Step n={3} /> Choose the call language
          </legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
            {demoLanguages.map((l) => {
              const on = l.code === langCode;
              return (
                <button
                  key={l.code}
                  type="button"
                  aria-pressed={on}
                  onClick={() => pick(() => setLangCode(l.code))}
                  className={cn("glass flex items-center justify-between gap-2 rounded-xl px-4 py-3 text-left text-sm transition-all", on ? "border-accent/60 text-foreground shadow-[0_0_30px_-12px_rgba(0,255,157,0.6)]" : "text-muted hover:border-white/20 hover:text-foreground")}
                >
                  <span className="font-medium">{l.label}</span>
                  <span className="text-xs text-subtle">{l.native}</span>
                </button>
              );
            })}
          </div>
          <p className="flex items-start gap-2 text-xs leading-relaxed text-muted">
            <Languages className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
            The agent greets you and holds the whole conversation in the language you pick. Hindi calls use natural everyday Hindi with common English words, the way people really talk.
          </p>
        </fieldset>
      </div>

      {/* 4. Call */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="glass-strong border-gradient relative flex flex-col overflow-hidden rounded-[2rem] p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-foreground">{callIndustry.business}</p>
              <p className="text-xs text-muted">
                {callVoice.name} · {callIndustry.role} · {callLanguage.label}
              </p>
            </div>
            <div className="text-right">
              <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs", inCall ? "bg-accent/15 text-accent" : "bg-white/8 text-muted")} aria-live="polite">
                {inCall && <span className="size-1.5 animate-pulse rounded-full bg-accent" aria-hidden />}
                {statusLabel}
              </span>
              <p className="mt-1 font-mono text-xs tabular-nums text-subtle">{fmt(seconds)}</p>
            </div>
          </div>

          <div className="relative mx-auto my-2 aspect-square w-full max-w-[300px]">
            {phase === "connecting" && (
              <>
                <span className="absolute inset-[18%] animate-ping rounded-full border border-primary/40" aria-hidden />
                <span className="absolute inset-[10%] animate-pulse rounded-full border border-secondary/30" aria-hidden />
              </>
            )}
            <VoiceOrb level={level} className="absolute inset-0" />
          </div>

          <Waveform level={level} className="h-14 w-full" />

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setMuted(!isMuted)}
              disabled={phase !== "live"}
              aria-pressed={isMuted}
              aria-label={isMuted ? "Unmute your microphone" : "Mute your microphone"}
              className={cn("flex size-12 items-center justify-center rounded-full border transition-colors disabled:opacity-40", isMuted ? "border-warning/60 text-warning" : "border-white/15 text-muted hover:text-foreground")}
            >
              {isMuted ? <MicOff className="size-5" /> : <Mic className="size-5" />}
            </button>
            {inCall ? (
              <button type="button" onClick={endCall} aria-label="End call" className="flex size-16 items-center justify-center rounded-full bg-[#FF5C7A] text-white shadow-[0_0_30px_-4px_#FF5C7A] transition-transform hover:scale-105">
                {phase === "connecting" ? <Loader2 className="size-6 animate-spin" /> : <PhoneOff className="size-6" />}
              </button>
            ) : (
              <button type="button" onClick={startCall} aria-label={`Call ${industry.business}`} className="relative flex size-16 items-center justify-center rounded-full bg-accent text-background shadow-[0_0_30px_-4px_#00FF9D] transition-transform hover:scale-105">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent/40" aria-hidden />
                <Phone className="relative size-6" />
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                const on = !speakerOn;
                setSpeakerOn(on);
                try {
                  setVolume({ volume: on ? 1 : 0 });
                } catch {}
              }}
              disabled={phase !== "live"}
              aria-pressed={!speakerOn}
              aria-label={speakerOn ? "Mute the agent" : "Unmute the agent"}
              className={cn("flex size-12 items-center justify-center rounded-full border transition-colors disabled:opacity-40", !speakerOn ? "border-warning/60 text-warning" : "border-white/15 text-muted hover:text-foreground")}
            >
              {speakerOn ? <Volume2 className="size-5" /> : <VolumeX className="size-5" />}
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-subtle">
            {phase === "live" ? (remaining <= 30 ? `Demo call ends in ${remaining}s` : "Just talk normally. You can interrupt any time.") : phase === "connecting" ? "Connecting your call…" : phase === "ended" ? "Call again" : `Call ${industry.business}`}
          </p>
          {error && (
            <div className="mt-4 rounded-2xl border border-warning/40 bg-warning/10 p-4 text-center text-sm text-foreground">
              <p>{error}</p>
              {configured === false && (
                <a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi, I'd like a live AI voice agent demo call.")}`} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-primary hover:underline">
                  <MessageCircle className="size-4" aria-hidden /> Message us on WhatsApp
                </a>
              )}
            </div>
          )}
        </div>

        {/* Transcript */}
        <div className="glass flex min-h-[520px] flex-col rounded-[2rem]">
          <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
            <h2 className="font-semibold text-foreground">Live transcript</h2>
            <span className="text-xs text-subtle">{callIndustry.label}</span>
          </div>
          <div ref={transcriptRef} className="flex max-h-[460px] flex-1 flex-col gap-3 overflow-y-auto px-6 py-5" aria-live="polite">
            {lines.length === 0 && phase !== "connecting" && phase !== "live" && (
              <div className="m-auto max-w-sm text-center text-sm leading-relaxed text-muted">
                <p>
                  Press <span className="text-accent">Call</span> and allow your microphone. {voice.name} will {industry.direction === "outbound" ? "call you as a new lead of" : "answer as the " + industry.role + " at"} {industry.business}. Talk to {voice.gender === "female" ? "her" : "him"} exactly like a real customer would.
                </p>
                <p className="mt-5 text-xs font-medium uppercase tracking-wider text-subtle">Try asking</p>
                <ul className="mt-3 flex flex-wrap justify-center gap-2">
                  {industry.tryAsking.map((q) => (
                    <li key={q} className="rounded-full border border-primary/25 bg-primary/5 px-3 py-1.5 text-xs text-primary">
                      “{q}”
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-subtle">Use headphones or a quiet room for the best experience. Calls last up to {MAX_CALL_SECONDS / 60} minutes.</p>
              </div>
            )}
            {(phase === "connecting" || (phase === "live" && lines.length === 0)) && <p className="m-auto animate-pulse text-sm text-muted">{phase === "connecting" ? `Ringing ${callIndustry.business}…` : `${callVoice.name} is picking up…`}</p>}
            <AnimatePresence initial={false}>
              {lines.map((l) => (
                <motion.div key={l.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={cn("flex flex-col gap-1", l.role === "user" ? "items-end" : "items-start")}>
                  <span className="text-[10px] uppercase tracking-wider text-subtle">{l.role === "agent" ? `${callVoice.name} · ${callIndustry.business}` : "You"}</span>
                  <p dir="auto" className={cn("max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed", l.role === "agent" ? "rounded-tl-sm bg-primary/10 text-foreground" : "rounded-tr-sm bg-secondary/20 text-foreground")}>
                    {l.text}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>

            {phase === "ended" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-2xl border border-accent/25 bg-accent/5 p-5">
                <p className="text-sm font-semibold text-foreground">What happens automatically after a call like this</p>
                <ul className="mt-3 flex flex-col gap-2 text-sm text-foreground/90">
                  {callIndustry.outcomes.map((o) => (
                    <li key={o} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden /> {o}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <BookButton booking="aiDemo" size="sm">
                    Get this agent for my business
                  </BookButton>
                  <button type="button" onClick={startCall} className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                    <RotateCcw className="size-3.5" aria-hidden /> Call again
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <p className="flex items-start gap-3 rounded-2xl border border-accent/25 bg-accent/5 p-5 text-sm text-foreground">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
        <span>
          <strong className="font-semibold">Built to support your team, not replace it.</strong> The agent picks up missed, busy and after-hours calls, books straight into your calendar and hands anything urgent or sensitive to a person on your team. For your business we train it on your own services, prices and FAQs. Your voice is processed live to run the call and isn&apos;t used for anything else.
        </span>
      </p>
    </div>
  );
}

function Step({ n }: { n: number }) {
  return <span className="flex size-7 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">{n}</span>;
}

/** Shared so only one preview plays at a time. */
let previewAudio: HTMLAudioElement | null = null;

function VoiceCard({ voice, selected, onSelect, canPreview }: { voice: DemoVoice; selected: boolean; onSelect: () => void; canPreview: boolean }) {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(
    () => () => {
      audioRef.current?.pause();
    },
    [],
  );

  const preview = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (playing) {
      audioRef.current?.pause();
      setPlaying(false);
      return;
    }
    setLoading(true);
    try {
      if (!audioRef.current) {
        const r = await fetch(`/api/voice-session?preview=${voice.key}`);
        const { previewUrl } = (await r.json()) as { previewUrl?: string | null };
        if (!previewUrl) return;
        audioRef.current = new Audio(previewUrl);
        audioRef.current.onended = () => setPlaying(false);
        audioRef.current.onpause = () => setPlaying(false);
      }
      if (previewAudio && previewAudio !== audioRef.current) previewAudio.pause();
      previewAudio = audioRef.current;
      audioRef.current.currentTime = 0;
      await audioRef.current.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={cn(
        "glass flex cursor-pointer items-center gap-3 rounded-2xl p-4 transition-all",
        selected ? "border-primary/60 shadow-[0_0_36px_-12px_rgba(0,245,255,0.6)]" : "hover:border-white/20",
      )}
    >
      <span
        className={cn("flex size-11 shrink-0 items-center justify-center rounded-full text-base font-semibold", voice.gender === "female" ? "bg-[#FF7AD9]/15 text-[#FF7AD9]" : "bg-primary/15 text-primary")}
        aria-hidden
      >
        {voice.name[0]}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="font-semibold text-foreground">{voice.name}</span>
          <span className="rounded-full bg-white/8 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted">{voice.gender}</span>
        </span>
        <span className="mt-0.5 block text-xs leading-relaxed text-muted">
          {voice.style} · {voice.accent}
        </span>
      </span>
      {canPreview && (
        <button
          type="button"
          onClick={preview}
          aria-label={playing ? `Stop ${voice.name}'s sample` : `Hear ${voice.name}'s voice`}
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-muted transition-colors hover:border-primary/50 hover:text-primary"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : playing ? <Pause className="size-4" /> : <Play className="size-4" />}
        </button>
      )}
    </div>
  );
}
