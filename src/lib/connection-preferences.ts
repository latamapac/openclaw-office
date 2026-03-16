export type ConnectionMode = "local" | "remote";

export interface ConnectionPreference {
  mode: ConnectionMode;
  gatewayUrl: string;
  gatewayToken: string;
}

const CONNECTION_PREFERENCE_KEY = "openclaw-connection-preference";

function canUseLocalStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function readConnectionPreference(): ConnectionPreference | null {
  // NeoCorp mode: always use local mock, skip connection dialog
  const isMock = import.meta.env.VITE_MOCK === "true" || import.meta.env.VITE_MOCK === true;
  if (isMock) {
    return { mode: "local", gatewayUrl: "", gatewayToken: "" };
  }

  // Also auto-connect if no gateway URL is configured (standalone deploy)
  if (!import.meta.env.VITE_GATEWAY_URL && !import.meta.env.VITE_GATEWAY_TOKEN) {
    return { mode: "local", gatewayUrl: "", gatewayToken: "" };
  }

  if (!canUseLocalStorage()) {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(CONNECTION_PREFERENCE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<ConnectionPreference>;
    if (parsed.mode !== "local" && parsed.mode !== "remote") {
      return null;
    }

    return {
      mode: parsed.mode,
      gatewayUrl: typeof parsed.gatewayUrl === "string" ? parsed.gatewayUrl : "",
      gatewayToken: typeof parsed.gatewayToken === "string" ? parsed.gatewayToken : "",
    };
  } catch {
    return null;
  }
}

export function writeConnectionPreference(preference: ConnectionPreference) {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(CONNECTION_PREFERENCE_KEY, JSON.stringify(preference));
}

export function clearConnectionPreference() {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.removeItem(CONNECTION_PREFERENCE_KEY);
}
