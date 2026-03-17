import type { AgentVisualStatus } from "@/gateway/types";
import i18n from "@/i18n";

export const SVG_WIDTH = 1600;
export const SVG_HEIGHT = 940;

// Unified office floor plan: one building shell with internal partitions
export const OFFICE = {
  x: 50,
  y: 40,
  width: SVG_WIDTH - 100,
  height: SVG_HEIGHT - 80,
  wallThickness: 6,
  cornerRadius: 18,
  corridorWidth: 36,
} as const;

const halfW = (OFFICE.width - OFFICE.corridorWidth) / 2;
const halfH = (OFFICE.height - OFFICE.corridorWidth) / 2;
const rightX = OFFICE.x + halfW + OFFICE.corridorWidth;
const bottomY = OFFICE.y + halfH + OFFICE.corridorWidth;

export const ZONES = {
  desk: { x: OFFICE.x, y: OFFICE.y, width: halfW, height: halfH, label: "固定工位区" },
  meeting: { x: rightX, y: OFFICE.y, width: halfW, height: halfH, label: "会议区" },
  hotDesk: { x: OFFICE.x, y: bottomY, width: halfW, height: halfH, label: "热工位区" },
  lounge: { x: rightX, y: bottomY, width: halfW, height: halfH, label: "休息区" },
} as const;

// Corridor entrance point: bottom center of the building (main entrance door)
export const CORRIDOR_ENTRANCE = {
  x: ZONES.lounge.x + ZONES.lounge.width / 2,
  y: OFFICE.y + OFFICE.height - 30,
} as const;

// Corridor center crossing point
export const CORRIDOR_CENTER = {
  x: OFFICE.x + OFFICE.width / 2,
  y: OFFICE.y + OFFICE.height / 2,
} as const;

export const ZONE_COLORS = {
  desk: "#e8edf5",
  meeting: "#e0eaf5",
  hotDesk: "#e5e8f0",
  lounge: "#e8e5f0",
  corridor: "#dde1e8",
  wall: "#7a8a9e",
} as const;

export const ZONE_COLORS_DARK = {
  desk: "#0c1524",      // deep navy — Build Core
  meeting: "#0e1a2e",   // slightly warmer — Command Center
  hotDesk: "#0a1220",   // darkest — Hot Desk / R&D
  lounge: "#14102a",    // purple tint — Lounge / Common
  corridor: "#080c18",  // near-black corridor
  wall: "#1a2a40",      // subtle wall color
} as const;

export const STATUS_COLORS: Record<AgentVisualStatus, string> = {
  idle: "#D7FF3B",       // NeoCorp lime
  thinking: "#3b82f6",   // blue
  tool_calling: "#f97316", // orange
  speaking: "#a855f7",   // purple
  spawning: "#06b6d4",   // cyan
  error: "#ef4444",      // red
  offline: "#6b7280",
};

export const STATUS_LABELS: Record<AgentVisualStatus, string> = {
  idle: "空闲",
  thinking: "思考中",
  tool_calling: "工具调用",
  speaking: "回复中",
  spawning: "创建中",
  error: "错误",
  offline: "离线",
};

export function getZoneLabel(zone: keyof typeof ZONES): string {
  return i18n.t(`common:zones.${zone}`);
}

export function getStatusLabel(status: AgentVisualStatus): string {
  return i18n.t(`common:agent.statusLabels.${status}`);
}

export const DESK_GRID_COLS = 4;
export const DESK_GRID_ROWS = 3;
export const DESK_MAX_AGENTS = DESK_GRID_COLS * DESK_GRID_ROWS;

export const HOT_DESK_GRID_COLS = 4;
export const HOT_DESK_GRID_ROWS = 3;

export const MIN_DESK_WIDTH = 100;
export const DEFAULT_MAX_SUB_AGENTS = 8;

// 家具尺寸常量 (flat isometric 2D)
export const FURNITURE = {
  desk: { width: 100, height: 60 },
  chair: { size: 30 },
  meetingTable: { minRadius: 60, maxRadius: 100 },
  sofa: { width: 110, height: 50 },
  plant: { width: 28, height: 36 },
  coffeeCup: { size: 14 },
} as const;

// 工位单元（Desk + Chair + AgentAvatar）
export const DESK_UNIT = {
  width: 140,
  height: 110,
  avatarRadius: 14,
  avatarOffsetY: -6,
} as const;

// Agent 头像
export const AVATAR = {
  radius: 14,
  selectedRadius: 17,
  strokeWidth: 2,
  nameLabelMaxChars: 12,
} as const;

// 3D 场景常量
// SVG viewBox maps to 3D building 16×12 world units
export const SCALE_X_2D_TO_3D = 16 / SVG_WIDTH;
export const SCALE_Z_2D_TO_3D = 12 / SVG_HEIGHT;
export const SCALE_2D_TO_3D = 0.01; // legacy — kept for tests
export const DESK_HEIGHT = 0.42;
export const CHARACTER_Y = 0;
export const MEETING_TABLE_RADIUS = 1.2;
export const MEETING_SEAT_RADIUS = 1.7;
