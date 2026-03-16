import type { ConnectionMode } from "@/lib/connection-preferences";

const RUNTIME_CONNECTION_API_PATH = "/__openclaw/connection";

interface RuntimeConnectionRequest {
  mode: ConnectionMode;
  gatewayUrl?: string;
}

export async function updateRuntimeConnectionTarget(payload: RuntimeConnectionRequest) {
  // In mock mode, skip the runtime connection API call
  if (import.meta.env.VITE_MOCK === "true") {
    return;
  }

  const response = await fetch(RUNTIME_CONNECTION_API_PATH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `Runtime connection update failed: ${response.status}`);
  }
}
