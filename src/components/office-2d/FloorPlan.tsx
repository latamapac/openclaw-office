import { useMemo } from "react";
import { SpeechBubbleOverlay } from "@/components/overlays/SpeechBubble";
import {
  SVG_WIDTH,
  SVG_HEIGHT,
  OFFICE,
} from "@/lib/constants";
import { getFloor, getFloorZoneColors } from "@/lib/neocorp-floors";
import { useOfficeStore } from "@/store/office-store";
import { AgentAvatar } from "./AgentAvatar";
import { ConnectionLine } from "./ConnectionLine";
import { FloorDecor } from "./FloorDecor";
import { FloorSelector } from "./FloorSelector";

export function FloorPlan() {
  const agents = useOfficeStore((s) => s.agents);
  const links = useOfficeStore((s) => s.links);
  const theme = useOfficeStore((s) => s.theme);
  const currentFloor = useOfficeStore((s) => s.currentFloor);

  const allAgents = Array.from(agents.values());
  const isDark = theme === "dark";

  // Get current floor config
  const floor = useMemo(() => getFloor(currentFloor), [currentFloor]);
  const floorZoneColors = useMemo(() => getFloorZoneColors(currentFloor), [currentFloor]);

  // Filter agents to only show those on the current floor
  const floorAgents = useMemo(
    () => allAgents.filter((a) => a.floor === currentFloor),
    [allAgents, currentFloor],
  );

  // Categorize floor-filtered agents
  const stationaryAgents = useMemo(
    () => floorAgents.filter((a) => !a.movement && !a.isPlaceholder),
    [floorAgents],
  );
  const walkingAgents = useMemo(
    () => floorAgents.filter((a) => a.movement !== null),
    [floorAgents],
  );

  // Collaboration links — only show if both agents are on current floor
  const floorLinks = useMemo(
    () =>
      links.filter((link) => {
        const source = agents.get(link.sourceId);
        const target = agents.get(link.targetId);
        return source?.floor === currentFloor && target?.floor === currentFloor;
      }),
    [links, agents, currentFloor],
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
        </defs>

        {/* ── Layer 0: Building shell (outer wall) ── */}
        <rect
          x={OFFICE.x}
          y={OFFICE.y}
          width={OFFICE.width}
          height={OFFICE.height}
          rx={OFFICE.cornerRadius}
          fill={isDark ? floor.theme.bg : "#dde1e8"}
          stroke={isDark ? "#1a2a40" : "#7a8a9e"}
          strokeWidth={OFFICE.wallThickness}
          filter="url(#building-shadow)"
        />

        {/* ── Layer 1: Zone floor fills ── */}
        {Object.entries(floor.zones).map(([key, zone]) => (
          <rect
            key={`fzone-${key}`}
            x={zone.x}
            y={zone.y}
            width={zone.width}
            height={zone.height}
            rx={6}
            fill={floorZoneColors[key] ?? (isDark ? "#0c1524" : "#e8edf5")}
          />
        ))}

        {/* ── Layer 2: Zone borders with accent color ── */}
        {Object.entries(floor.zones).map(([key, zone]) => (
          <rect
            key={`fzone-border-${key}`}
            x={zone.x}
            y={zone.y}
            width={zone.width}
            height={zone.height}
            rx={6}
            fill="none"
            stroke={isDark ? floor.theme.accent : "#c8d0dc"}
            strokeWidth={1}
            strokeOpacity={isDark ? 0.25 : 0.8}
          />
        ))}

        {/* ── Layer 3: Zone labels ── */}
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

        {/* ── Layer 4: Floor-specific furniture decorations ── */}
        <FloorDecor floor={floor} isDark={isDark} />

        {/* ── Layer 5: Collaboration lines (current floor only) ── */}
        {floorLinks.map((link) => {
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

        {/* ── Layer 6: Stationary agents on this floor ── */}
        {stationaryAgents.map((agent) => (
          <AgentAvatar key={`agent-${agent.id}`} agent={agent} />
        ))}

        {/* ── Layer 7: Walking agents on this floor ── */}
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

      {/* Speech bubbles for agents on current floor only */}
      {floorAgents
        .filter((agent) => agent.speechBubble)
        .map((agent) => (
          <SpeechBubbleOverlay key={`bubble-${agent.id}`} agent={agent} />
        ))}
    </div>
  );
}
