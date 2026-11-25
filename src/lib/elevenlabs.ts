import "server-only";

/**
 * Server-side helpers for the live ElevenLabs voice agent demo.
 *
 * Only ELEVENLABS_API_KEY is required. On first use the server finds (or creates) one agent named
 * AGENT_NAME in the ElevenLabs account, enables per-call overrides on it, and then issues
 * short-lived conversation tokens. Each call passes its own prompt, greeting, language and voice.
 */

const API = (process.env.ELEVENLABS_API_BASE || "https://api.elevenlabs.io").replace(/\/$/, "");
const AGENT_NAME = "D Expert Website Demo Agent";
const TTS_MODEL = process.env.ELEVENLABS_TTS_MODEL || "eleven_flash_v2_5";

/** Default ElevenLabs voices (available in every account). Override any of them with ELEVENLABS_VOICE_<KEY>. */
const DEFAULT_VOICES: Record<string, string> = {
  sarah: "EXAVITQu4vr4xnSDxMaL",
  jessica: "cgSgspJ2msm6clMCkdW9",
  alice: "Xb7hH8MSUJpSbSDYk0k2",
  chris: "iP95p4xoKVk53GoZ742B",
  eric: "cjVigY5qzO86Huf0OWal",
  george: "JBFqnCBsd6RMkjVDRZzb",
};

export function isVoiceDemoConfigured() {
  return Boolean(process.env.ELEVENLABS_API_KEY);
}

export function resolveVoiceId(key: string): string | null {
  if (!(key in DEFAULT_VOICES)) return null;
  return process.env[`ELEVENLABS_VOICE_${key.toUpperCase()}`] || DEFAULT_VOICES[key];
}

async function el<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY ?? "", "Content-Type": "application/json", ...init?.headers },
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`ElevenLabs ${init?.method ?? "GET"} ${path.split("?")[0]} failed (${res.status}): ${body.slice(0, 400)}`);
  }
  return (await res.json()) as T;
}

const overrides = {
  conversation_config_override: {
    agent: { first_message: true, language: true, prompt: { prompt: true } },
    tts: { voice_id: true },
  },
};

let agentPromise: Promise<string> | null = null;

async function findOrCreateAgent(): Promise<string> {
  let agentId = process.env.ELEVENLABS_AGENT_ID;
  if (!agentId) {
    const list = await el<{ agents: { agent_id: string; name: string }[] }>(
      `/v1/convai/agents?search=${encodeURIComponent(AGENT_NAME)}&page_size=30`,
    );
    agentId = list.agents.find((a) => a.name === AGENT_NAME)?.agent_id;
  }
  if (!agentId) {
    const created = await el<{ agent_id: string }>("/v1/convai/agents/create", {
      method: "POST",
      body: JSON.stringify({
        name: AGENT_NAME,
        tags: ["website-demo"],
        conversation_config: {
          agent: {
            first_message: "Hi, thanks for calling. How can I help you today?",
            language: "en",
            prompt: { prompt: "You are a friendly, professional receptionist on a phone call. Keep replies short and natural." },
          },
          tts: { voice_id: DEFAULT_VOICES.sarah, model_id: TTS_MODEL },
          conversation: { max_duration_seconds: 330 },
        },
        platform_settings: { overrides },
      }),
    });
    agentId = created.agent_id;
  }
  // Always make sure overrides are on and the voice model is multilingual (also repairs an agent edited by hand).
  await el(`/v1/convai/agents/${agentId}`, {
    method: "PATCH",
    body: JSON.stringify({ conversation_config: { tts: { model_id: TTS_MODEL } }, platform_settings: { overrides } }),
  });
  return agentId;
}

export function getDemoAgentId() {
  if (!agentPromise) {
    agentPromise = findOrCreateAgent().catch((e) => {
      agentPromise = null;
      throw e;
    });
  }
  return agentPromise;
}

export async function getConversationToken(agentId: string) {
  const r = await el<{ token: string }>(`/v1/convai/conversation/token?agent_id=${encodeURIComponent(agentId)}`);
  return r.token;
}

export async function getSignedUrl(agentId: string) {
  const r = await el<{ signed_url: string }>(`/v1/convai/conversation/get-signed-url?agent_id=${encodeURIComponent(agentId)}`);
  return r.signed_url;
}

const previewCache = new Map<string, string | null>();

export async function getVoicePreviewUrl(voiceId: string) {
  if (previewCache.has(voiceId)) return previewCache.get(voiceId) ?? null;
  const r = await el<{ preview_url?: string | null }>(`/v1/voices/${encodeURIComponent(voiceId)}`);
  const url = r.preview_url ?? null;
  previewCache.set(voiceId, url);
  return url;
}
