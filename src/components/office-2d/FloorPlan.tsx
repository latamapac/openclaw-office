import { useMemo } from "react";
import { SpeechBubbleOverlay } from "@/components/overlays/SpeechBubble";
import type { VisualAgent } from "@/gateway/types";
import {
  SVG_WIDTH,
  SVG_HEIGHT,
  OFFICE,
  ZONES,
  ZONE_COLORS,
  ZONE_COLORS_DARK,
} from "@/lib/constants";
import { getFloor, getFloorZoneColors } from "@/lib/neocorp-floors";
import { calculateDeskSlots, calculateMeetingSeatsSvg } from "@/lib/position-allocator";
import { useOfficeStore } from "@/store/office-store";
import { AgentAvatar } from "./AgentAvatar";
import { ConnectionLine } from "./ConnectionLine";
import { DeskUnit } from "./DeskUnit";
import { CorridorFloor, PartitionWalls, DoorOpenings, EntranceDoor } from "./BuildingShell";
import { MeetingTable, Chair } from "./furniture";
import {
  DeskZoneDecor,
  HotDeskZoneDecor,
  MeetingZoneDecor,
  LoungeDecor,
  CorridorDecor,
} from "./ZoneDecor";
import { FloorDecor } from "./FloorDecor";
import { FloorSelector } from "./FloorSelector";
import { ZoneLabel } from "./ZoneLabel";

export function FloorPlan() {
  const agents = useOfficeStore((s) => s.agents);
  const links = useOfficeStore((s) => s.links);
  const theme = useOfficeStore((s) => s.theme);
  const currentFloor = useOfficeStore((s) => s.currentFloor);

  const agentList = Array.from(agents.values());
  const isDark = theme === "dark";
  const colors = isDark ? ZONE_COLORS_DARK : ZONE_COLORS;

  // Get current floor config
  const floor = useMemo(() => getFloor(currentFloor), [currentFloor]);
  const floorZoneColors = useMemo(() => getFloorZoneColors(currentFloor), [currentFloor]);

  // Floor 1 (Apex) uses the classic 4-zone layout for backward compatibility
  const isClassicLayout = currentFloor === 1;

  const deskAgents = useMemo(
    () => agentList.filter((a) => a.zone === "desk" && !a.isSubAgent && !a.movement && a.confirmed),
    [agentList],
  );
  const hotDeskAgents = useMemo(
    () => agentList.filter((a) => a.zone === "hotDesk" && !a.movement),
    [agentList],
  );
  const loungeAgents = useMemo(
    () => agentList.filter((a) => a.zone === "lounge" && !a.movement),
    [agentList],
  );
  const meetingAgents = useMemo(
    () => agentList.filter((a) => a.zone === "meeting" && !a.movement),
    [agentList],
  );
  const walkingAgents = useMemo(
    () => agentList.filter((a) => a.movement !== null),
    [agentList],
  );
  const corridorAgents = useMemo(
    () => agentList.filter((a) => a.zone === "corridor" && !a.movement),
    [agentList],
  );

  const maxSubAgents = useOfficeStore((s) => s.maxSubAgents);

  const deskSlots = useMemo(
    () => calculateDeskSlots(ZONES.desk, deskAgents.length, Math.max(deskAgents.length, 4)),
    [deskAgents.length],
  );

  const hotDeskSlots = useMemo(
    () =>
      calculateDeskSlots(
        ZONES.hotDesk,
        hotDeskAgents.length,
        Math.max(hotDeskAgents.length, maxSubAgents),
      ),
    [hotDeskAgents.length, maxSubAgents],
  );

  const meetingCenter = {
    x: ZONES.meeting.x + ZONES.meeting.width / 2,
    y: ZONES.meeting.y + ZONES.meeting.height / 2,
  };

  const meetingTableRadius = Math.min(
    60 + meetingAgents.length * 8,
    Math.min(ZONES.meeting.width, ZONES.meeting.height) / 2 - 40,
  );

  const meetingSeats = useMemo(
    () => calculateMeetingSeatsSvg(meetingAgents.length, meetingCenter, meetingTableRadius + 36),
    [meetingAgents.length, meetingCenter.x, meetingCenter.y, meetingTableRadius],
  );

  return (
    <div className="relative h-full w-full bg-gray-100 dark:bg-gray-950">
      <svg
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="building-shadow" x="-3%" y="-3%" width="106%" height="106%">
            <feDropShadow dx="0" dy="3" stdDeviation="6" floodOpacity={isDark ? 0.5 : 0.12} />
          </filter>
          {/* Subtle grid pattern for corridor floor */}
          <pattern id="corridor-tiles" width="28" height="28" patternUnits="userSpaceOnUse">
            <rect width="28" height="28" fill={colors.corridor} />
            <rect
              x="0.5"
              y="0.5"
              width="27"
              height="27"
              fill="none"
              stroke={isDark ? "#1f2937" : "#d5dbe3"}
              strokeWidth="0.3"
              rx="1"
            />
          </pattern>
          {/* Subtle carpet texture for lounge */}
          <pattern id="lounge-carpet" width="6" height="6" patternUnits="userSpaceOnUse">
            <rect width="6" height="6" fill={colors.lounge} />
            <circle cx="3" cy="3" r="0.5" fill={isDark ? "#2d2540" : "#e5e0ed"} opacity="0.4" />
          </pattern>
        </defs>

        {/* ── Layer 0: Building shell (outer wall) ── */}
        <rect
          x={OFFICE.x}
          y={OFFICE.y}
          width={OFFICE.width}
          height={OFFICE.height}
          rx={OFFICE.cornerRadius}
          fill={isDark ? floor.theme.bg : colors.corridor}
          stroke={isDark ? "#1a2a40" : colors.wall}
          strokeWidth={OFFICE.wallThickness}
          filter="url(#building-shadow)"
        />

        {isClassicLayout ? (
          /* ── Classic 4-zone layout (Floor 1: Apex) ── */
          <>
            {/* Layer 1: Corridor floor tiles */}
            <CorridorFloor isDark={isDark} />

            {/* Layer 2: Zone floor fills */}
            {Object.entries(ZONES).map(([key, zone]) => (
              <rect
                key={`floor-${key}`}
                x={zone.x}
                y={zone.y}
                width={zone.width}
                height={zone.height}
                fill={
                  key === "lounge" ? "url(#lounge-carpet)" : colors[key as keyof typeof ZONE_COLORS]
                }
              />
            ))}

            {/* Layer 3: Internal partition walls */}
            <PartitionWalls isDark={isDark} />

            {/* Layer 4: Door openings */}
            <DoorOpenings isDark={isDark} />

            {/* Zone labels */}
            {Object.entries(ZONES).map(([key, zone]) => (
              <ZoneLabel key={`label-${key}`} zone={zone} zoneKey={key as keyof typeof ZONES} />
            ))}

            {/* Layer 5: Furniture — Desk zone */}
            <DeskZoneFurniture deskSlots={deskSlots} deskAgents={deskAgents} />
            <DeskZoneDecor isDark={isDark} />

            {/* Layer 5: Furniture — Meeting zone */}
            <MeetingTable
              x={meetingCenter.x}
              y={meetingCenter.y}
              radius={meetingTableRadius}
              isDark={isDark}
            />
            <MeetingChairs
              seats={meetingSeats}
              meetingAgentCount={meetingAgents.length}
              isDark={isDark}
            />
            <MeetingZoneDecor isDark={isDark} />

            {/* Layer 5: Furniture — Hot desk zone */}
            <HotDeskZoneFurniture slots={hotDeskSlots} agents={hotDeskAgents} />
            <HotDeskZoneDecor isDark={isDark} />

            {/* Layer 5: Furniture — Lounge zone */}
            <LoungeDecor isDark={isDark} />

            {/* Layer 5: Corridor / Reception decor */}
            <CorridorDecor isDark={isDark} />

            {/* Layer 5a: Lounge idle agents */}
            {loungeAgents.map((agent) => (
              <AgentAvatar key={`lounge-${agent.id}`} agent={agent} />
            ))}

            {/* Layer 5b: Main entrance door */}
            <EntranceDoor isDark={isDark} />
          </>
        ) : (
          /* ── Multi-zone floor layout (all non-Apex floors) ── */
          <>
            {/* Zone floor fills */}
            {Object.entries(floor.zones).map(([key, zone]) => (
              <rect
                key={`fzone-${key}`}
                x={zone.x}
                y={zone.y}
                width={zone.width}
                height={zone.height}
                rx={4}
                fill={floorZoneColors[key] ?? (isDark ? "#0c1524" : "#e8edf5")}
              />
            ))}

            {/* Zone partition lines */}
            {Object.entries(floor.zones).map(([key, zone]) => (
              <rect
                key={`fzone-border-${key}`}
                x={zone.x}
                y={zone.y}
                width={zone.width}
                height={zone.height}
                rx={4}
                fill="none"
                stroke={isDark ? "#1a2a40" : "#c8d0dc"}
                strokeWidth={1.5}
              />
            ))}

            {/* Zone labels */}
            {Object.entries(floor.zones).map(([key, zone]) => (
              <text
                key={`flabel-${key}`}
                x={zone.x + 14}
                y={zone.y + 22}
                fill={floor.theme.accent}
                fontSize={8}
                fontWeight={400}
                fontFamily="'Press Start 2P', monospace"
                letterSpacing="0.05em"
                opacity={0.7}
              >
                {zone.label}
              </text>
            ))}

            {/* Floor-specific decorations */}
            <FloorDecor floor={floor} isDark={isDark} />

            {/* Agents still render at their assigned positions regardless of floor */}
            {deskAgents.map((agent) => (
              <AgentAvatar key={`desk-${agent.id}`} agent={agent} />
            ))}
            {hotDeskAgents.map((agent) => (
              <AgentAvatar key={`hotdesk-${agent.id}`} agent={agent} />
            ))}
            {loungeAgents.map((agent) => (
              <AgentAvatar key={`lounge-${agent.id}`} agent={agent} />
            ))}
          </>
        )}

        {/* ── Layer 6: Collaboration lines (all floors) ── */}
        {links.map((link) => {
          const source = agents.get(link.sourceId);
          const target = agents.get(link.targetId);
          if (!source || !target) return null;
          return (
            <ConnectionLine
              key={`${link.sourceId}-${link.targetId}`}
              x1={source.position.x}
              y1={source.position.y}
              x2={target.position.x}
              y2={target.position.y}
              strength={link.strength}
            />
          );
        })}

        {/* ── Layer 7: Meeting agents (seated) — all floors ── */}
        {meetingAgents.map((agent, i) => {
          const seat = meetingSeats[i];
          if (!seat) return null;
          return <AgentAvatar key={agent.id} agent={{ ...agent, position: seat }} />;
        })}

        {/* ── Layer 7b: Unconfirmed agents at entrance ── */}
        {corridorAgents.map((agent) => (
          <AgentAvatar key={`corridor-${agent.id}`} agent={agent} />
        ))}

        {/* ── Layer 8: Walking agents ── */}
        {walkingAgents.map((agent) => (
          <AgentAvatar key={`walk-${agent.id}`} agent={agent} />
        ))}

        {/* ── Floor indicator label ── */}
        <text
          x={OFFICE.x + 14}
          y={OFFICE.y + OFFICE.height + 20}
          fill={floor.theme.accent}
          fontSize={8}
          fontWeight={400}
          fontFamily="'Press Start 2P', monospace"
          letterSpacing="0.08em"
          opacity={0.6}
        >
          {currentFloor === 0
            ? "GROUND"
            : currentFloor === 7
              ? "ROOFTOP"
              : `FLOOR ${currentFloor}`}{" "}
          — {floor.name.toUpperCase()}
        </text>
      </svg>

      {/* Floor selector overlay */}
      <FloorSelector />

      {agentList
        .filter((agent) => agent.speechBubble)
        .map((agent) => (
          <SpeechBubbleOverlay key={`bubble-${agent.id}`} agent={agent} />
        ))}
    </div>
  );
}

/* ═══ Sub-components ═══ */

function DeskZoneFurniture({
  deskSlots,
  deskAgents,
}: {
  deskSlots: Array<{ unitX: number; unitY: number }>;
  deskAgents: VisualAgent[];
}) {
  const agentBySlot = useMemo(() => {
    const map = new Map<number, VisualAgent>();
    for (const agent of deskAgents) {
      let hash = 0;
      for (let i = 0; i < agent.id.length; i++) {
        hash = ((hash << 5) - hash + agent.id.charCodeAt(i)) | 0;
      }
      const idx = Math.abs(hash) % deskSlots.length;
      let slot = idx;
      while (map.has(slot)) {
        slot = (slot + 1) % deskSlots.length;
      }
      map.set(slot, agent);
    }
    return map;
  }, [deskAgents, deskSlots.length]);

  return (
    <g>
      {deskSlots.map((slot, i) => (
        <DeskUnit
          key={`desk-${i}`}
          x={slot.unitX}
          y={slot.unitY}
          agent={agentBySlot.get(i) ?? null}
        />
      ))}
    </g>
  );
}

function HotDeskZoneFurniture({
  slots,
  agents,
}: {
  slots: Array<{ unitX: number; unitY: number }>;
  agents: VisualAgent[];
}) {
  return (
    <g>
      {slots.map((slot, i) => (
        <DeskUnit key={`hotdesk-${i}`} x={slot.unitX} y={slot.unitY} agent={agents[i] ?? null} />
      ))}
    </g>
  );
}

function MeetingChairs({
  seats,
  meetingAgentCount,
  isDark,
}: {
  seats: Array<{ x: number; y: number }>;
  meetingAgentCount: number;
  isDark: boolean;
}) {
  const meetingCenter = {
    x: ZONES.meeting.x + ZONES.meeting.width / 2,
    y: ZONES.meeting.y + ZONES.meeting.height / 2,
  };

  if (meetingAgentCount > 0) {
    return (
      <g>
        {seats.map((s, i) => (
          <Chair key={`mc-${i}`} x={s.x} y={s.y} isDark={isDark} />
        ))}
      </g>
    );
  }

  const emptyCount = 6;
  const emptyRadius = 100;
  return (
    <g>
      {Array.from({ length: emptyCount }, (_, i) => {
        const angle = (2 * Math.PI * i) / emptyCount - Math.PI / 2;
        return (
          <Chair
            key={`mc-empty-${i}`}
            x={Math.round(meetingCenter.x + Math.cos(angle) * emptyRadius)}
            y={Math.round(meetingCenter.y + Math.sin(angle) * emptyRadius)}
            isDark={isDark}
          />
        );
      })}
    </g>
  );
}
