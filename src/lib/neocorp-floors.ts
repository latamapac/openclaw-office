/**
 * NeoCorp Campus Floor Definitions
 * 8-floor virtual office campus for the OpenClaw synthetic workforce.
 * Each floor has 3-5 zones mapped into the SVG viewBox (~1600x940).
 */

import { OFFICE } from "./constants";

export type ZoneType = "workspace" | "meeting" | "lounge" | "executive" | "lab" | "common";

export interface ZoneConfig {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  type: ZoneType;
}

export interface FloorConfig {
  id: number;
  name: string;
  shortName: string;
  zones: Record<string, ZoneConfig>;
  theme: { accent: string; bg: string };
}

// Shared layout helpers — zones fit inside the OFFICE bounding box
const OX = OFFICE.x;
const OY = OFFICE.y;
const OW = OFFICE.width;
const OH = OFFICE.height;
const GAP = 12; // gap between zones
const HALF_W = Math.floor((OW - GAP) / 2);
const HALF_H = Math.floor((OH - GAP) / 2);
const RIGHT_X = OX + HALF_W + GAP;
const BOTTOM_Y = OY + HALF_H + GAP;
const THIRD_W = Math.floor((OW - GAP * 2) / 3);
const THIRD_X_1 = OX;
const THIRD_X_2 = OX + THIRD_W + GAP;
const THIRD_X_3 = OX + THIRD_W * 2 + GAP * 2;

// ── Floor 0: The Commons ────────────────────────────────────────
const FLOOR_0: FloorConfig = {
  id: 0,
  name: "The Commons",
  shortName: "G",
  theme: { accent: "#06b6d4", bg: "#0b1a28" },
  zones: {
    lobby: {
      x: OX, y: OY,
      width: HALF_W, height: HALF_H,
      label: "Lobby",
      type: "common",
    },
    cafe: {
      x: RIGHT_X, y: OY,
      width: HALF_W, height: HALF_H,
      label: "Cafe",
      type: "lounge",
    },
    auditorium: {
      x: OX, y: BOTTOM_Y,
      width: HALF_W, height: HALF_H,
      label: "Auditorium",
      type: "meeting",
    },
    gym: {
      x: RIGHT_X, y: BOTTOM_Y,
      width: HALF_W, height: HALF_H,
      label: "Gym",
      type: "common",
    },
  },
};

// ── Floor 1: Apex ───────────────────────────────────────────────
const FLOOR_1: FloorConfig = {
  id: 1,
  name: "Apex",
  shortName: "1",
  theme: { accent: "#D7FF3B", bg: "#0c1524" },
  zones: {
    ceoOffice: {
      x: OX, y: OY,
      width: HALF_W, height: HALF_H,
      label: "CEO Office",
      type: "executive",
    },
    boardRoom: {
      x: RIGHT_X, y: OY,
      width: HALF_W, height: HALF_H,
      label: "Board Room",
      type: "meeting",
    },
    auditorOffice: {
      x: OX, y: BOTTOM_Y,
      width: HALF_W, height: HALF_H,
      label: "Auditor Office",
      type: "executive",
    },
    warRoom: {
      x: RIGHT_X, y: BOTTOM_Y,
      width: HALF_W, height: HALF_H,
      label: "War Room",
      type: "meeting",
    },
  },
};

// ── Floor 2: Directional Core ───────────────────────────────────
const FLOOR_2: FloorConfig = {
  id: 2,
  name: "Directional Core",
  shortName: "2",
  theme: { accent: "#8b5cf6", bg: "#0e1a2e" },
  zones: {
    strategyRoom: {
      x: OX, y: OY,
      width: HALF_W, height: HALF_H,
      label: "Strategy Room",
      type: "meeting",
    },
    managementHub: {
      x: RIGHT_X, y: OY,
      width: HALF_W, height: HALF_H,
      label: "Management Hub",
      type: "workspace",
    },
    commandCenter: {
      x: OX, y: BOTTOM_Y,
      width: HALF_W, height: HALF_H,
      label: "Command Center",
      type: "lab",
    },
    intelLab: {
      x: RIGHT_X, y: BOTTOM_Y,
      width: HALF_W, height: HALF_H,
      label: "Intel Lab",
      type: "lab",
    },
  },
};

// ── Floor 3: Build Core ─────────────────────────────────────────
const FLOOR_3: FloorConfig = {
  id: 3,
  name: "Build Core",
  shortName: "3",
  theme: { accent: "#f97316", bg: "#0a1220" },
  zones: {
    productLab: {
      x: OX, y: OY,
      width: HALF_W, height: HALF_H,
      label: "Product Lab",
      type: "lab",
    },
    engineeringFloor: {
      x: RIGHT_X, y: OY,
      width: HALF_W, height: HALF_H,
      label: "Engineering Floor",
      type: "workspace",
    },
    serverRoom: {
      x: OX, y: BOTTOM_Y,
      width: HALF_W, height: HALF_H,
      label: "Server Room",
      type: "lab",
    },
    securityBunker: {
      x: RIGHT_X, y: BOTTOM_Y,
      width: HALF_W, height: HALF_H,
      label: "Security Bunker",
      type: "lab",
    },
  },
};

// ── Floor 4: Market-Facing ──────────────────────────────────────
const FLOOR_4: FloorConfig = {
  id: 4,
  name: "Market-Facing",
  shortName: "4",
  theme: { accent: "#ec4899", bg: "#14102a" },
  zones: {
    designStudio: {
      x: OX, y: OY,
      width: HALF_W, height: HALF_H,
      label: "Design Studio",
      type: "workspace",
    },
    contentStudio: {
      x: RIGHT_X, y: OY,
      width: HALF_W, height: HALF_H,
      label: "Content Studio",
      type: "workspace",
    },
    growthLab: {
      x: OX, y: BOTTOM_Y,
      width: HALF_W, height: HALF_H,
      label: "Growth Lab",
      type: "lab",
    },
    salesFloor: {
      x: RIGHT_X, y: BOTTOM_Y,
      width: HALF_W, height: HALF_H,
      label: "Sales Floor",
      type: "workspace",
    },
  },
};

// ── Floor 5: Operational ────────────────────────────────────────
const FLOOR_5: FloorConfig = {
  id: 5,
  name: "Operational",
  shortName: "5",
  theme: { accent: "#14b8a6", bg: "#0c1524" },
  zones: {
    opsHub: {
      x: OX, y: OY,
      width: HALF_W, height: HALF_H,
      label: "Ops Hub",
      type: "workspace",
    },
    financeFloor: {
      x: RIGHT_X, y: OY,
      width: HALF_W, height: HALF_H,
      label: "Finance Floor",
      type: "workspace",
    },
    legalSuite: {
      x: OX, y: BOTTOM_Y,
      width: HALF_W, height: HALF_H,
      label: "Legal Suite",
      type: "meeting",
    },
    arWorkspace: {
      x: RIGHT_X, y: BOTTOM_Y,
      width: HALF_W, height: HALF_H,
      label: "AR Workspace",
      type: "lab",
    },
  },
};

// ── Floor 6: R&D + Meta ─────────────────────────────────────────
const FLOOR_6: FloorConfig = {
  id: 6,
  name: "R&D + Meta",
  shortName: "6",
  theme: { accent: "#3b82f6", bg: "#0e1a2e" },
  zones: {
    rdLab: {
      x: THIRD_X_1, y: OY,
      width: THIRD_W, height: OH,
      label: "R&D Lab",
      type: "lab",
    },
    benchmarkRoom: {
      x: THIRD_X_2, y: OY,
      width: THIRD_W, height: OH,
      label: "Benchmark Room",
      type: "lab",
    },
    experimentLab: {
      x: THIRD_X_3, y: OY,
      width: THIRD_W, height: OH,
      label: "Experiment Lab",
      type: "lab",
    },
  },
};

// ── Floor 7: Rooftop ────────────────────────────────────────────
const FLOOR_7: FloorConfig = {
  id: 7,
  name: "Rooftop",
  shortName: "R",
  theme: { accent: "#22c55e", bg: "#0a1a14" },
  zones: {
    terrace: {
      x: OX, y: OY,
      width: HALF_W, height: HALF_H,
      label: "Terrace",
      type: "lounge",
    },
    garden: {
      x: RIGHT_X, y: OY,
      width: HALF_W, height: HALF_H,
      label: "Garden",
      type: "common",
    },
    bbq: {
      x: OX, y: BOTTOM_Y,
      width: HALF_W, height: HALF_H,
      label: "BBQ",
      type: "common",
    },
    zenCorner: {
      x: RIGHT_X, y: BOTTOM_Y,
      width: HALF_W, height: HALF_H,
      label: "Zen Corner",
      type: "lounge",
    },
  },
};

// ── Exports ─────────────────────────────────────────────────────

export const NEOCORP_FLOORS: Record<number, FloorConfig> = {
  0: FLOOR_0,
  1: FLOOR_1,
  2: FLOOR_2,
  3: FLOOR_3,
  4: FLOOR_4,
  5: FLOOR_5,
  6: FLOOR_6,
  7: FLOOR_7,
};

export const TOTAL_FLOORS = 8;
export const DEFAULT_FLOOR = 1;

export function getFloor(floorId: number): FloorConfig {
  return NEOCORP_FLOORS[floorId] ?? NEOCORP_FLOORS[DEFAULT_FLOOR];
}

export function getFloorZones(floorId: number): Record<string, ZoneConfig> {
  return getFloor(floorId).zones;
}

/**
 * Map a floor zone type to the closest legacy AgentZone for backward compatibility.
 * This keeps the existing agent placement logic working.
 */
export function zoneTypeToAgentZone(type: ZoneType): "desk" | "meeting" | "hotDesk" | "lounge" {
  switch (type) {
    case "workspace":
      return "desk";
    case "meeting":
      return "meeting";
    case "executive":
      return "desk";
    case "lab":
      return "hotDesk";
    case "lounge":
      return "lounge";
    case "common":
      return "lounge";
  }
}

/** Get zone colors for a floor (dark mode — always dark theme for NeoCorp) */
export function getFloorZoneColors(floorId: number): Record<string, string> {
  const floor = getFloor(floorId);
  const zoneEntries = Object.entries(floor.zones);
  const colors: Record<string, string> = {};
  for (const [key, zone] of zoneEntries) {
    switch (zone.type) {
      case "workspace":
        colors[key] = "#0c1524";
        break;
      case "meeting":
        colors[key] = "#0e1a2e";
        break;
      case "executive":
        colors[key] = "#14102a";
        break;
      case "lab":
        colors[key] = "#0a1220";
        break;
      case "lounge":
        colors[key] = "#14102a";
        break;
      case "common":
        colors[key] = "#101828";
        break;
    }
  }
  return colors;
}
