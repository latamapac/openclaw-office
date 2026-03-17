/**
 * NeoCorp Campus Floor Definitions
 * 8-floor virtual office campus for the OpenClaw synthetic workforce.
 * Each floor has 3-5 zones mapped into the SVG viewBox (~1600x940).
 * Every floor uses VISUALLY DISTINCT zone layouts — different shapes and sizes.
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

// ── Floor 0: The Commons — Wide open layout ─────────────────────
const FLOOR_0: FloorConfig = {
  id: 0,
  name: "The Commons",
  shortName: "G",
  theme: { accent: "#06b6d4", bg: "#0b1a28" },
  zones: {
    cafe: {
      x: OX, y: OY,
      width: 500, height: 300,
      label: "Cafe",
      type: "lounge",
    },
    auditorium: {
      x: OX + 500 + GAP, y: OY,
      width: 400, height: 350,
      label: "Auditorium",
      type: "meeting",
    },
    gym: {
      x: OX + 500 + GAP + 400 + GAP, y: OY,
      width: OW - 500 - 400 - GAP * 2, height: 280,
      label: "Gym",
      type: "common",
    },
    meditation: {
      x: OX, y: OY + 300 + GAP,
      width: 300, height: OH - 300 - GAP,
      label: "Meditation",
      type: "lounge",
    },
    lobby: {
      x: OX + 300 + GAP, y: OY + 350 + GAP,
      width: OW - 300 - GAP, height: OH - 350 - GAP,
      label: "Lobby",
      type: "common",
    },
  },
};

// ── Floor 1: Apex — Executive layout ────────────────────────────
const FLOOR_1: FloorConfig = {
  id: 1,
  name: "Apex",
  shortName: "1",
  theme: { accent: "#D7FF3B", bg: "#0c1524" },
  zones: {
    ceoOffice: {
      x: OX, y: OY,
      width: 250, height: 200,
      label: "CEO Office",
      type: "executive",
    },
    boardRoom: {
      x: OX + 250 + GAP, y: OY,
      width: 400, height: 300,
      label: "Board Room",
      type: "meeting",
    },
    auditorOffice: {
      x: OX + 250 + GAP + 400 + GAP, y: OY,
      width: OW - 250 - 400 - GAP * 2, height: 180,
      label: "Auditor Office",
      type: "executive",
    },
    warRoom: {
      x: OX, y: OY + 300 + GAP,
      width: 300, height: OH - 300 - GAP,
      label: "War Room",
      type: "meeting",
    },
    executiveLounge: {
      x: OX + 300 + GAP, y: OY + 300 + GAP,
      width: OW - 300 - GAP, height: OH - 300 - GAP,
      label: "Executive Lounge",
      type: "lounge",
    },
  },
};

// ── Floor 2: Directional Core — 4 equal offices in a grid ──────
const Q_W = Math.floor((OW - GAP) / 2);
const Q_H = Math.floor((OH - GAP) / 2);
const FLOOR_2: FloorConfig = {
  id: 2,
  name: "Directional Core",
  shortName: "2",
  theme: { accent: "#8b5cf6", bg: "#0e1a2e" },
  zones: {
    strategyRoom: {
      x: OX, y: OY,
      width: Q_W, height: Q_H,
      label: "Strategy Room",
      type: "meeting",
    },
    managementHub: {
      x: OX + Q_W + GAP, y: OY,
      width: Q_W, height: Q_H,
      label: "Management Hub",
      type: "workspace",
    },
    commandCenter: {
      x: OX, y: OY + Q_H + GAP,
      width: Q_W, height: Q_H,
      label: "Command Center",
      type: "lab",
    },
    intelLab: {
      x: OX + Q_W + GAP, y: OY + Q_H + GAP,
      width: Q_W, height: Q_H,
      label: "Intel Lab",
      type: "lab",
    },
  },
};

// ── Floor 3: Build Core — Open plan + specialized rooms ─────────
const FLOOR_3: FloorConfig = {
  id: 3,
  name: "Build Core",
  shortName: "3",
  theme: { accent: "#f97316", bg: "#0a1220" },
  zones: {
    engineeringFloor: {
      x: OX + 250 + GAP, y: OY,
      width: 500, height: 300,
      label: "Engineering Floor",
      type: "workspace",
    },
    productLab: {
      x: OX, y: OY,
      width: 250, height: 440,
      label: "Product Lab",
      type: "lab",
    },
    serverRoom: {
      x: OX + 250 + GAP + 500 + GAP, y: OY,
      width: OW - 250 - 500 - GAP * 2, height: 350,
      label: "Server Room",
      type: "lab",
    },
    securityBunker: {
      x: OX + 250 + GAP + 500 + GAP, y: OY + 350 + GAP,
      width: OW - 250 - 500 - GAP * 2, height: OH - 350 - GAP,
      label: "Security Bunker",
      type: "lab",
    },
    buildLounge: {
      x: OX + 250 + GAP, y: OY + 300 + GAP,
      width: 500, height: OH - 300 - GAP,
      label: "Build Lounge",
      type: "lounge",
    },
  },
};

// ── Floor 4: Market-Facing — Creative layout ────────────────────
const FLOOR_4: FloorConfig = {
  id: 4,
  name: "Market-Facing",
  shortName: "4",
  theme: { accent: "#ec4899", bg: "#14102a" },
  zones: {
    designStudio: {
      x: OX, y: OY,
      width: 350, height: 250,
      label: "Design Studio",
      type: "workspace",
    },
    contentStudio: {
      x: OX + 350 + GAP, y: OY,
      width: 300, height: 250,
      label: "Content Studio",
      type: "workspace",
    },
    showcase: {
      x: OX + 350 + GAP + 300 + GAP, y: OY,
      width: OW - 350 - 300 - GAP * 2, height: 400,
      label: "Showcase",
      type: "common",
    },
    growthLab: {
      x: OX, y: OY + 250 + GAP,
      width: 250, height: OH - 250 - GAP,
      label: "Growth Lab",
      type: "lab",
    },
    salesFloor: {
      x: OX + 250 + GAP, y: OY + 250 + GAP,
      width: 400, height: OH - 250 - GAP,
      label: "Sales Floor",
      type: "workspace",
    },
  },
};

// ── Floor 5: Operational — Structured grid ──────────────────────
const FLOOR_5: FloorConfig = {
  id: 5,
  name: "Operational",
  shortName: "5",
  theme: { accent: "#14b8a6", bg: "#0c1524" },
  zones: {
    opsHub: {
      x: OX, y: OY,
      width: 450, height: 250,
      label: "Ops Hub",
      type: "workspace",
    },
    financeFloor: {
      x: OX + 450 + GAP, y: OY,
      width: OW - 450 - GAP, height: 200,
      label: "Finance Floor",
      type: "workspace",
    },
    legalSuite: {
      x: OX, y: OY + 250 + GAP,
      width: 350, height: OH - 250 - GAP,
      label: "Legal Suite",
      type: "meeting",
    },
    arWorkspace: {
      x: OX + 350 + GAP, y: OY + 250 + GAP,
      width: OW - 350 - GAP, height: OH - 250 - GAP,
      label: "AR Workspace",
      type: "lab",
    },
  },
};

// ── Floor 6: R&D + Meta — Lab layout with one dominant room ─────
const FLOOR_6: FloorConfig = {
  id: 6,
  name: "R&D + Meta",
  shortName: "6",
  theme: { accent: "#3b82f6", bg: "#0e1a2e" },
  zones: {
    rdLab: {
      x: OX, y: OY,
      width: 700, height: 500,
      label: "R&D Lab",
      type: "lab",
    },
    benchmarkRoom: {
      x: OX + 700 + GAP, y: OY,
      width: OW - 700 - GAP, height: 350,
      label: "Benchmark Room",
      type: "lab",
    },
    experimentLab: {
      x: OX + 700 + GAP, y: OY + 350 + GAP,
      width: OW - 700 - GAP, height: OH - 350 - GAP,
      label: "Experiment Lab",
      type: "lab",
    },
    metaLounge: {
      x: OX, y: OY + 500 + GAP,
      width: 700, height: OH - 500 - GAP,
      label: "Meta Lounge",
      type: "lounge",
    },
  },
};

// ── Floor 7: Rooftop — Open air ─────────────────────────────────
const FLOOR_7: FloorConfig = {
  id: 7,
  name: "Rooftop",
  shortName: "R",
  theme: { accent: "#22c55e", bg: "#0a1a14" },
  zones: {
    terrace: {
      x: OX, y: OY,
      width: 500, height: 400,
      label: "Terrace",
      type: "lounge",
    },
    garden: {
      x: OX + 500 + GAP, y: OY,
      width: 400, height: 300,
      label: "Garden",
      type: "common",
    },
    bbq: {
      x: OX + 500 + GAP + 400 + GAP, y: OY,
      width: OW - 500 - 400 - GAP * 2, height: 250,
      label: "BBQ",
      type: "common",
    },
    zenCorner: {
      x: OX + 500 + GAP, y: OY + 400 + GAP,
      width: OW - 500 - GAP, height: OH - 400 - GAP,
      label: "Zen Corner",
      type: "lounge",
    },
    skyBar: {
      x: OX, y: OY + 400 + GAP,
      width: 500, height: OH - 400 - GAP,
      label: "Sky Bar",
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
