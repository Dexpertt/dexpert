import "server-only";
import { GREETING_VAR, PROMPT_VAR } from "@/content/voice-agents";

/**
 * Server-side helpers for the live ElevenLabs voice agent demo.
 *
 * Only ELEVENLABS_API_KEY is required. On first use the server finds (or creates)
 * the demo agents (English + multilingual) in the ElevenLabs account, enables per-call overrides, and then issues
 * short-lived conversation tokens. Each call passes its own prompt, greeting, language and voice.
 */

const API = (process.env.ELEVENLABS_API_BASE || "https://api.elevenlabs.io").replace(/\/$/, "");

/**
 * ElevenLabs requires English agents to use an English model and non-English agents a multilingual
 * one, so the demo keeps two agents: one for English calls and one for every other language.
 */
export type AgentKind = "en" | "multi";
const AGENTS: Record<AgentKind, { name: string; language: string; model: string; envId: string }> = {
  en: {
    name: "D Expert Website Demo Agent (English)",
    language: "en",
    model: process.env.ELEVENLABS_TTS_MODEL_EN || "eleven_flash_v2",
    envId: "ELEVENLABS_AGENT_ID",
  },
  multi: {
    name: "D Expert Website Demo Agent (Multilingual)",
    language: "hi",
    model: process.env.ELEVENLABS_TTS_MODEL || "eleven_flash_v2_5",
    envId: "ELEVENLABS_AGENT_ID_MULTILINGUAL",
  },
};

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
  return Boolean(process.env.ELEVENLABS_API_KEY?.trim());
}

export function resolveVoiceId(key: string): string | null {
  if (!(key in DEFAULT_VOICES)) return null;
  return process.env[`ELEVENLABS_VOICE_${key.toUpperCase()}`] || DEFAULT_VOICES[key];
}

export class ElevenLabsError extends Error {
  constructor(
    message: string,
    public status: number,
    public detail: string,
  ) {
    super(message);
  }
}

async function el<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY?.trim() ?? "", "Content-Type": "application/json", ...init?.headers },
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new ElevenLabsError(`ElevenLabs ${init?.method ?? "GET"} ${path.split("?")[0]} failed (${res.status})`, res.status, body.slice(0, 600));
  }
  return (await res.json()) as T;
}

const overrides = {
  conversation_config_override: {
    agent: { first_message: true, language: true, prompt: { prompt: true } },
    tts: { voice_id: true },
  },
};

const agentPromises: Partial<Record<AgentKind, Promise<string>>> = {};

/**
 * The per-call prompt and greeting are sent as dynamic variables, which every agent accepts without
 * extra settings. Only the language and voice use overrides.
 */
const agentConfig = (cfg: (typeof AGENTS)[AgentKind]) => ({
  agent: {
    first_message: `{{${GREETING_VAR}}}`,
    language: cfg.language,
    prompt: { prompt: `{{${PROMPT_VAR}}}` },
    dynamic_variables: {
      dynamic_variable_placeholders: {
        [GREETING_VAR]: "Hi, thanks for calling. How can I help you today?",
        [PROMPT_VAR]: "You are a friendly, professional receptionist on a phone call. Keep replies short and natural.",
      },
    },
  },
  tts: { voice_id: DEFAULT_VOICES.sarah, model_id: cfg.model },
});

async function findOrCreateAgent(kind: AgentKind): Promise<string> {
  const cfg = AGENTS[kind];
  let agentId = process.env[cfg.envId];
  if (!agentId) {
    const list = await el<{ agents: { agent_id: string; name: string }[] }>(
      `/v1/convai/agents?search=${encodeURIComponent(cfg.name)}&page_size=30`,
    );
    agentId = list.agents.find((a) => a.name === cfg.name)?.agent_id;
  }
  if (!agentId) {
    const create = (conversation_config: object) =>
      el<{ agent_id: string }>("/v1/convai/agents/create", {
        method: "POST",
        body: JSON.stringify({ name: cfg.name, conversation_config, platform_settings: { overrides } }),
      });
    try {
      agentId = (await create({ ...agentConfig(cfg), conversation: { max_duration_seconds: 330 } })).agent_id;
    } catch (e) {
      // Retry with the bare minimum if the API rejected an optional field.
      if (!(e instanceof ElevenLabsError) || e.status !== 422) throw e;
      console.warn("[voice-session] create retry", e.detail);
      agentId = (await create(agentConfig(cfg))).agent_id;
    }
  }
  // Agents are versioned: write the settings to the main branch, which is what live calls use.
  // This also repairs an agent edited by hand.
  const info = await el<{ main_branch_id?: string | null }>(`/v1/convai/agents/${agentId}`);
  const branch = info.main_branch_id ? `?branch_id=${encodeURIComponent(info.main_branch_id)}` : "";
  const body = { conversation_config: agentConfig(cfg), platform_settings: { overrides }, version_description: "Website demo settings" };
  try {
    await el(`/v1/convai/agents/${agentId}${branch}`, { method: "PATCH", body: JSON.stringify(body) });
  } catch (e) {
    if (!(e instanceof ElevenLabsError) || e.status !== 422) throw e;
    console.warn("[voice-session] patch retry", e.detail);
    const { version_description: _ignored, ...rest } = body;
    void _ignored;
    await el(`/v1/convai/agents/${agentId}${branch}`, { method: "PATCH", body: JSON.stringify(rest) });
  }
  return agentId;
}

export function getDemoAgentId(kind: AgentKind) {
  if (!agentPromises[kind]) {
    agentPromises[kind] = findOrCreateAgent(kind).catch((e) => {
      delete agentPromises[kind];
      throw e;
    });
  }
  return agentPromises[kind]!;
}

/** Plain-language reason for a failure, shown on the page so the site owner can fix setup issues. */
export function explainError(e: unknown): string {
  if (e instanceof ElevenLabsError) {
    if (e.status === 401) {
      return /permission|missing_permissions/i.test(e.detail)
        ? `The ElevenLabs API key is missing a permission. Edit the key in ElevenLabs and allow ElevenLabs Agents (write) and Voices (read). Details: ${e.detail}`
        : "The ElevenLabs API key was rejected. Check that ELEVENLABS_API_KEY in Vercel is copied exactly, with no spaces.";
    }
    if (e.status === 402 || /quota|credit|limit/i.test(e.detail)) return `Your ElevenLabs plan has run out of credits or agent minutes. Details: ${e.detail}`;
    return `${e.message}: ${e.detail}`;
  }
  return e instanceof Error ? e.message : String(e);
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

type ConvSummary = { conversation_id: string; status?: string; call_duration_secs?: number; message_count?: number; start_time_unix_secs?: number; call_successful?: string };

/** Non-production diagnostics: the agents' override settings and the last few demo calls with how they ended. */
export async function getDiagnostics() {
  const out: Record<string, unknown> = {};
  for (const kind of ["en", "multi"] as AgentKind[]) {
    const id = await getDemoAgentId(kind);
    const agent = await el<{
      version_id?: string;
      branch_id?: string;
      main_branch_id?: string;
      platform_settings?: { overrides?: unknown };
      conversation_config?: { tts?: { model_id?: string }; agent?: { language?: string; first_message?: string } };
    }>(
      `/v1/convai/agents/${id}`,
    );
    const list = await el<{ conversations: ConvSummary[] }>(`/v1/convai/conversations?agent_id=${id}&page_size=3`);
    const calls = [];
    for (const c of list.conversations.slice(0, 3)) {
      const d = await el<{ status?: string; metadata?: Record<string, unknown>; transcript?: { role: string; message?: string | null }[] }>(
        `/v1/convai/conversations/${c.conversation_id}`,
      );
      const m = d.metadata ?? {};
      calls.push({
        id: c.conversation_id,
        status: d.status,
        started: c.start_time_unix_secs ? new Date(c.start_time_unix_secs * 1000).toISOString() : null,
        duration: c.call_duration_secs,
        termination_reason: m.termination_reason,
        error: m.error,
        transcript: (d.transcript ?? []).slice(0, 8).map((t) => `${t.role}: ${(t.message ?? "").slice(0, 140)}`),
      });
    }
    out[kind] = {
      agentId: id,
      version: agent.version_id,
      branch: agent.branch_id,
      mainBranch: agent.main_branch_id,
      firstMessage: agent.conversation_config?.agent?.first_message,
      model: agent.conversation_config?.tts?.model_id,
      language: agent.conversation_config?.agent?.language,
      overrides: agent.platform_settings?.overrides,
      calls,
    };
  }
  return out;
}
