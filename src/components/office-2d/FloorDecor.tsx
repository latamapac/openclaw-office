/**
 * Per-floor decoration components for the NeoCorp campus.
 * Each floor gets thematic SVG furniture placed INSIDE zone bounds.
 */

import type { FloorConfig, ZoneConfig } from "@/lib/neocorp-floors";
import {
  Plant,
  CoffeeCup,
  Monitor,
  ServerRack,
  Whiteboard,
  CoffeeMachine,
  Bookshelf,
  Sofa,
  WaterCooler,
} from "./furniture";

interface FloorDecorProps {
  floor: FloorConfig;
  isDark: boolean;
}

export function FloorDecor({ floor, isDark }: FloorDecorProps) {
  switch (floor.id) {
    case 0:
      return <CommonsDecor floor={floor} isDark={isDark} />;
    case 1:
      return <ApexDecor floor={floor} isDark={isDark} />;
    case 2:
      return <DirectionalDecor floor={floor} isDark={isDark} />;
    case 3:
      return <BuildCoreDecor floor={floor} isDark={isDark} />;
    case 4:
      return <MarketDecor floor={floor} isDark={isDark} />;
    case 5:
      return <OperationalDecor floor={floor} isDark={isDark} />;
    case 6:
      return <RDDecor floor={floor} isDark={isDark} />;
    case 7:
      return <RooftopDecor floor={floor} isDark={isDark} />;
    default:
      return null;
  }
}

// ── Helper: draw a simple table ──────────────────────────────────
function SimpleTable({
  x,
  y,
  w,
  h,
  isDark,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  isDark: boolean;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={4}
      fill={isDark ? "#334155" : "#94a3b8"}
      stroke={isDark ? "#475569" : "#64748b"}
      strokeWidth={0.8}
    />
  );
}

// ── Helper: draw a screen/display ────────────────────────────────
function Display({
  x,
  y,
  w,
  h,
  glowColor,
  isDark,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  glowColor: string;
  isDark: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={2}
        fill={isDark ? "#0f172a" : "#111827"}
        stroke={isDark ? "#1e293b" : "#374151"}
        strokeWidth={1}
      />
      <rect x={x + 2} y={y + 2} width={w - 4} height={h - 4} rx={1} fill={glowColor} opacity={0.12} />
    </g>
  );
}

// ── Helper: draw chair seating ───────────────────────────────────
function SeatCircle({ x, y, isDark }: { x: number; y: number; isDark: boolean }) {
  return (
    <circle
      cx={x}
      cy={y}
      r={8}
      fill={isDark ? "#1e293b" : "#d1d5db"}
      stroke={isDark ? "#334155" : "#9ca3af"}
      strokeWidth={0.8}
    />
  );
}

// ── Helper: equipment rack ───────────────────────────────────────
function EquipmentRack({ x, y, isDark }: { x: number; y: number; isDark: boolean }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={20}
        height={30}
        rx={2}
        fill={isDark ? "#1e293b" : "#475569"}
        stroke={isDark ? "#334155" : "#374151"}
        strokeWidth={0.6}
      />
      {/* LED indicators */}
      <circle cx={x + 6} cy={y + 8} r={1.5} fill="#22c55e" opacity={0.8} />
      <circle cx={x + 14} cy={y + 8} r={1.5} fill="#3b82f6" opacity={0.8} />
      <circle cx={x + 6} cy={y + 16} r={1.5} fill="#22c55e" opacity={0.6} />
      <circle cx={x + 14} cy={y + 16} r={1.5} fill="#f97316" opacity={0.7} />
    </g>
  );
}

// ── Helper: plant with sway animation ────────────────────────────
function SwayPlant({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <g style={{ animation: `plant-sway ${6 + delay}s ease-in-out infinite ${delay}s` }}>
      <Plant x={x} y={y} />
    </g>
  );
}

// ── Helper: board room table with seats ──────────────────────────
function BoardRoomTable({ zone, isDark }: { zone: ZoneConfig; isDark: boolean }) {
  const cx = zone.x + zone.width / 2;
  const cy = zone.y + zone.height / 2;
  const rx = Math.min(zone.width, zone.height) * 0.2;

  return (
    <g>
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={rx * 0.65}
        fill={isDark ? "#1e293b" : "#475569"}
        stroke={isDark ? "#334155" : "#374151"}
        strokeWidth={1.5}
      />
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (2 * Math.PI * i) / 8 - Math.PI / 2;
        return (
          <SeatCircle
            key={`board-${i}`}
            x={cx + Math.cos(angle) * (rx + 20)}
            y={cy + Math.sin(angle) * (rx * 0.65 + 20)}
            isDark={isDark}
          />
        );
      })}
    </g>
  );
}

// ── Floor 0: The Commons ─────────────────────────────────────────
function CommonsDecor({ floor, isDark }: FloorDecorProps) {
  const { cafe, auditorium, gym, meditation, lobby } = floor.zones;
  return (
    <g>
      {/* Cafe: coffee machines, tables, cups */}
      <CoffeeMachine x={cafe.x + 30} y={cafe.y + 60} isDark={isDark} />
      <CoffeeMachine x={cafe.x + 30} y={cafe.y + 130} isDark={isDark} />
      <SimpleTable x={cafe.x + 100} y={cafe.y + 80} w={80} h={40} isDark={isDark} />
      <SimpleTable x={cafe.x + 250} y={cafe.y + 80} w={80} h={40} isDark={isDark} />
      <SimpleTable x={cafe.x + 100} y={cafe.y + 180} w={80} h={40} isDark={isDark} />
      <SimpleTable x={cafe.x + 250} y={cafe.y + 180} w={80} h={40} isDark={isDark} />
      <CoffeeCup x={cafe.x + 130} y={cafe.y + 90} />
      <CoffeeCup x={cafe.x + 280} y={cafe.y + 90} />
      <CoffeeCup x={cafe.x + 130} y={cafe.y + 190} />
      <SwayPlant x={cafe.x + cafe.width - 30} y={cafe.y + 30} delay={0.5} />
      <SwayPlant x={cafe.x + 30} y={cafe.y + cafe.height - 40} delay={1} />

      {/* Auditorium: rows of seats + whiteboard */}
      <Whiteboard x={auditorium.x + auditorium.width / 2} y={auditorium.y + 22} isDark={isDark} />
      {[0, 1, 2, 3, 4].map((row) => (
        <g key={`aud-row-${row}`}>
          {[0, 1, 2, 3, 4, 5].map((col) => (
            <SeatCircle
              key={`aud-${row}-${col}`}
              x={auditorium.x + 60 + col * 55}
              y={auditorium.y + 60 + row * 55}
              isDark={isDark}
            />
          ))}
        </g>
      ))}

      {/* Gym: equipment racks, water cooler */}
      <EquipmentRack x={gym.x + 40} y={gym.y + 50} isDark={isDark} />
      <EquipmentRack x={gym.x + 80} y={gym.y + 50} isDark={isDark} />
      <EquipmentRack x={gym.x + 120} y={gym.y + 50} isDark={isDark} />
      <EquipmentRack x={gym.x + 40} y={gym.y + 120} isDark={isDark} />
      <EquipmentRack x={gym.x + 80} y={gym.y + 120} isDark={isDark} />
      <WaterCooler x={gym.x + gym.width - 40} y={gym.y + 50} isDark={isDark} />
      <SwayPlant x={gym.x + 30} y={gym.y + gym.height - 40} delay={1.5} />

      {/* Meditation: mats (circles), plants */}
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <circle
            key={`med-${row}-${col}`}
            cx={meditation.x + 60 + col * 80}
            cy={meditation.y + 60 + row * 80}
            r={25}
            fill={isDark ? "#1a2a40" : "#d1d5db"}
            stroke={isDark ? "#334155" : "#9ca3af"}
            strokeWidth={0.8}
            opacity={0.5}
          />
        )),
      )}
      <SwayPlant x={meditation.x + 30} y={meditation.y + 30} delay={0} />
      <SwayPlant x={meditation.x + meditation.width - 30} y={meditation.y + meditation.height - 40} delay={2} />

      {/* Lobby: reception desk, plants */}
      <SimpleTable x={lobby.x + lobby.width / 2 - 80} y={lobby.y + lobby.height / 2 - 12} w={160} h={24} isDark={isDark} />
      <Monitor x={lobby.x + lobby.width / 2} y={lobby.y + lobby.height / 2 - 16} isDark={isDark} />
      <SwayPlant x={lobby.x + 30} y={lobby.y + 30} delay={0} />
      <SwayPlant x={lobby.x + lobby.width - 30} y={lobby.y + 30} delay={1} />
      <Bookshelf x={lobby.x + lobby.width - 60} y={lobby.y + lobby.height - 60} isDark={isDark} />
    </g>
  );
}

// ── Floor 1: Apex ────────────────────────────────────────────────
function ApexDecor({ floor, isDark }: FloorDecorProps) {
  const { ceoOffice, boardRoom, auditorOffice, warRoom, executiveLounge } = floor.zones;
  return (
    <g>
      {/* CEO Office: executive desk, bookshelf, plant, sofa */}
      <SimpleTable x={ceoOffice.x + ceoOffice.width / 2 - 50} y={ceoOffice.y + ceoOffice.height * 0.4} w={100} h={28} isDark={isDark} />
      <Monitor x={ceoOffice.x + ceoOffice.width / 2} y={ceoOffice.y + ceoOffice.height * 0.37} isDark={isDark} />
      <Bookshelf x={ceoOffice.x + 30} y={ceoOffice.y + 22} isDark={isDark} />
      <SwayPlant x={ceoOffice.x + ceoOffice.width - 30} y={ceoOffice.y + 30} delay={0} />
      <SwayPlant x={ceoOffice.x + 30} y={ceoOffice.y + ceoOffice.height - 40} delay={1} />

      {/* Board Room: large table, chairs around it */}
      <BoardRoomTable zone={boardRoom} isDark={isDark} />
      <Whiteboard x={boardRoom.x + boardRoom.width - 40} y={boardRoom.y + boardRoom.height / 2 - 30} isDark={isDark} rotation={90} />

      {/* Auditor Office: desk, dual monitors, filing */}
      <SimpleTable x={auditorOffice.x + auditorOffice.width / 2 - 40} y={auditorOffice.y + auditorOffice.height * 0.4} w={80} h={24} isDark={isDark} />
      <Monitor x={auditorOffice.x + auditorOffice.width / 2 - 15} y={auditorOffice.y + auditorOffice.height * 0.37} isDark={isDark} />
      <Monitor x={auditorOffice.x + auditorOffice.width / 2 + 15} y={auditorOffice.y + auditorOffice.height * 0.37} isDark={isDark} />
      <Bookshelf x={auditorOffice.x + auditorOffice.width - 60} y={auditorOffice.y + 22} isDark={isDark} />
      <SwayPlant x={auditorOffice.x + 30} y={auditorOffice.y + 30} delay={0.5} />

      {/* War Room: displays, command table, seats */}
      <Display x={warRoom.x + 40} y={warRoom.y + 20} w={warRoom.width - 80} h={30} glowColor="#ef4444" isDark={isDark} />
      <SimpleTable x={warRoom.x + warRoom.width / 2 - 70} y={warRoom.y + warRoom.height * 0.4} w={140} h={30} isDark={isDark} />
      {[0, 1, 2, 3].map((i) => (
        <SeatCircle key={`war-${i}`} x={warRoom.x + 60 + i * 60} y={warRoom.y + warRoom.height * 0.4 + 50} isDark={isDark} />
      ))}
      <SwayPlant x={warRoom.x + 30} y={warRoom.y + warRoom.height - 40} delay={1.5} />

      {/* Executive Lounge: sofas, coffee, bookshelf */}
      <Sofa x={executiveLounge.x + 80} y={executiveLounge.y + 60} rotation={0} isDark={isDark} />
      <Sofa x={executiveLounge.x + 280} y={executiveLounge.y + 60} rotation={0} isDark={isDark} />
      <Sofa x={executiveLounge.x + 80} y={executiveLounge.y + 160} rotation={180} isDark={isDark} />
      <Sofa x={executiveLounge.x + 280} y={executiveLounge.y + 160} rotation={180} isDark={isDark} />
      <CoffeeCup x={executiveLounge.x + 180} y={executiveLounge.y + 110} />
      <CoffeeCup x={executiveLounge.x + 380} y={executiveLounge.y + 110} />
      <CoffeeMachine x={executiveLounge.x + 30} y={executiveLounge.y + 80} isDark={isDark} />
      <Bookshelf x={executiveLounge.x + executiveLounge.width - 60} y={executiveLounge.y + 22} isDark={isDark} />
      <SwayPlant x={executiveLounge.x + executiveLounge.width - 30} y={executiveLounge.y + executiveLounge.height - 40} delay={2} />
    </g>
  );
}

// ── Floor 2: Directional Core ────────────────────────────────────
function DirectionalDecor({ floor, isDark }: FloorDecorProps) {
  const { strategyRoom, managementHub, commandCenter, intelLab } = floor.zones;
  return (
    <g>
      {/* Strategy Room: whiteboard, conference table, seats */}
      <Whiteboard x={strategyRoom.x + strategyRoom.width / 2} y={strategyRoom.y + 22} isDark={isDark} />
      <SimpleTable x={strategyRoom.x + 60} y={strategyRoom.y + strategyRoom.height * 0.45} w={strategyRoom.width - 120} h={30} isDark={isDark} />
      {[0, 1, 2, 3].map((i) => (
        <SeatCircle key={`strat-${i}`} x={strategyRoom.x + 100 + i * 80} y={strategyRoom.y + strategyRoom.height * 0.45 + 50} isDark={isDark} />
      ))}
      <SwayPlant x={strategyRoom.x + 30} y={strategyRoom.y + 30} delay={0} />
      <SwayPlant x={strategyRoom.x + strategyRoom.width - 30} y={strategyRoom.y + strategyRoom.height - 40} delay={1} />

      {/* Management Hub: desks with monitors */}
      {[0, 1, 2].map((i) => (
        <g key={`mgmt-desk-${i}`}>
          <SimpleTable x={managementHub.x + 50 + i * 150} y={managementHub.y + 80} w={100} h={24} isDark={isDark} />
          <Monitor x={managementHub.x + 100 + i * 150} y={managementHub.y + 76} isDark={isDark} />
        </g>
      ))}
      <Whiteboard x={managementHub.x + managementHub.width / 2} y={managementHub.y + 22} isDark={isDark} />
      <SwayPlant x={managementHub.x + managementHub.width - 30} y={managementHub.y + managementHub.height - 40} delay={1} />
      <Bookshelf x={managementHub.x + 30} y={managementHub.y + managementHub.height - 60} isDark={isDark} />

      {/* Command Center: large display wall, console */}
      <Display x={commandCenter.x + 30} y={commandCenter.y + 20} w={commandCenter.width - 60} h={40} glowColor="#3b82f6" isDark={isDark} />
      <SimpleTable x={commandCenter.x + commandCenter.width / 2 - 80} y={commandCenter.y + 100} w={160} h={24} isDark={isDark} />
      {[0, 1, 2].map((i) => (
        <Monitor key={`cmd-mon-${i}`} x={commandCenter.x + commandCenter.width / 2 - 40 + i * 40} y={commandCenter.y + 96} isDark={isDark} />
      ))}
      <SwayPlant x={commandCenter.x + 30} y={commandCenter.y + commandCenter.height - 40} delay={0.5} />

      {/* Intel Lab: server racks, screens */}
      <ServerRack x={intelLab.x + 40} y={intelLab.y + 40} isDark={isDark} />
      <ServerRack x={intelLab.x + 80} y={intelLab.y + 40} isDark={isDark} />
      <Display x={intelLab.x + 140} y={intelLab.y + 30} w={120} h={30} glowColor="#8b5cf6" isDark={isDark} />
      <SimpleTable x={intelLab.x + 60} y={intelLab.y + intelLab.height * 0.55} w={intelLab.width - 120} h={24} isDark={isDark} />
      <Monitor x={intelLab.x + intelLab.width / 2} y={intelLab.y + intelLab.height * 0.52} isDark={isDark} />
      <SwayPlant x={intelLab.x + intelLab.width - 30} y={intelLab.y + intelLab.height - 40} delay={1.5} />
    </g>
  );
}

// ── Floor 3: Build Core ──────────────────────────────────────────
function BuildCoreDecor({ floor, isDark }: FloorDecorProps) {
  const { engineeringFloor, productLab, serverRoom, securityBunker, buildLounge } = floor.zones;
  return (
    <g>
      {/* Engineering Floor: workstation grid */}
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <g key={`eng-${row}-${col}`}>
            <SimpleTable
              x={engineeringFloor.x + 40 + col * 150}
              y={engineeringFloor.y + 50 + row * 80}
              w={90}
              h={22}
              isDark={isDark}
            />
            <Monitor
              x={engineeringFloor.x + 85 + col * 150}
              y={engineeringFloor.y + 46 + row * 80}
              isDark={isDark}
            />
          </g>
        )),
      )}
      <Whiteboard x={engineeringFloor.x + engineeringFloor.width / 2} y={engineeringFloor.y + 22} isDark={isDark} />

      {/* Product Lab: design tables, whiteboard */}
      <Whiteboard x={productLab.x + productLab.width / 2} y={productLab.y + 22} isDark={isDark} />
      {[0, 1].map((i) => (
        <g key={`prod-desk-${i}`}>
          <SimpleTable x={productLab.x + 30} y={productLab.y + 80 + i * 120} w={productLab.width - 60} h={24} isDark={isDark} />
          <Monitor x={productLab.x + productLab.width / 2} y={productLab.y + 76 + i * 120} isDark={isDark} />
        </g>
      ))}
      <SwayPlant x={productLab.x + 30} y={productLab.y + productLab.height - 40} delay={0} />

      {/* Server Room: rows of racks */}
      {[0, 1, 2, 3].map((i) => (
        <ServerRack key={`srv-${i}`} x={serverRoom.x + 30 + i * 50} y={serverRoom.y + 50} isDark={isDark} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <ServerRack key={`srv2-${i}`} x={serverRoom.x + 30 + i * 50} y={serverRoom.y + 120} isDark={isDark} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <ServerRack key={`srv3-${i}`} x={serverRoom.x + 30 + i * 50} y={serverRoom.y + 190} isDark={isDark} />
      ))}
      <WaterCooler x={serverRoom.x + serverRoom.width - 40} y={serverRoom.y + 60} isDark={isDark} />

      {/* Security Bunker: monitors wall, command desk */}
      <Display x={securityBunker.x + 20} y={securityBunker.y + 20} w={securityBunker.width - 40} h={35} glowColor="#ef4444" isDark={isDark} />
      <SimpleTable x={securityBunker.x + securityBunker.width / 2 - 60} y={securityBunker.y + 100} w={120} h={24} isDark={isDark} />
      {[0, 1, 2].map((i) => (
        <Monitor key={`sec-mon-${i}`} x={securityBunker.x + securityBunker.width / 2 - 30 + i * 30} y={securityBunker.y + 96} isDark={isDark} />
      ))}

      {/* Build Lounge: sofas, coffee, plants */}
      <Sofa x={buildLounge.x + 80} y={buildLounge.y + 60} rotation={0} isDark={isDark} />
      <Sofa x={buildLounge.x + 250} y={buildLounge.y + 60} rotation={0} isDark={isDark} />
      <CoffeeMachine x={buildLounge.x + 30} y={buildLounge.y + 80} isDark={isDark} />
      <CoffeeCup x={buildLounge.x + 165} y={buildLounge.y + 80} />
      <SwayPlant x={buildLounge.x + buildLounge.width - 30} y={buildLounge.y + 30} delay={0} />
      <SwayPlant x={buildLounge.x + 30} y={buildLounge.y + buildLounge.height - 40} delay={1.5} />
    </g>
  );
}

// ── Floor 4: Market-Facing ───────────────────────────────────────
function MarketDecor({ floor, isDark }: FloorDecorProps) {
  const { designStudio, contentStudio, showcase, growthLab, salesFloor } = floor.zones;
  return (
    <g>
      {/* Design Studio: drawing tablets with colored accents */}
      {[0, 1].map((i) => (
        <g key={`design-${i}`}>
          <SimpleTable x={designStudio.x + 40 + i * 150} y={designStudio.y + 80} w={120} h={26} isDark={isDark} />
          <Monitor x={designStudio.x + 100 + i * 150} y={designStudio.y + 76} isDark={isDark} />
          <rect
            x={designStudio.x + 45 + i * 150}
            y={designStudio.y + 112}
            width={40}
            height={4}
            rx={2}
            fill={i === 0 ? "#ec4899" : "#8b5cf6"}
            opacity={0.6}
          />
        </g>
      ))}
      <SwayPlant x={designStudio.x + 30} y={designStudio.y + 30} delay={0} />
      <Whiteboard x={designStudio.x + designStudio.width / 2} y={designStudio.y + 22} isDark={isDark} />

      {/* Content Studio: editing desk, monitors */}
      <SimpleTable x={contentStudio.x + contentStudio.width / 2 - 60} y={contentStudio.y + 80} w={120} h={26} isDark={isDark} />
      <Monitor x={contentStudio.x + contentStudio.width / 2 - 15} y={contentStudio.y + 76} isDark={isDark} />
      <Monitor x={contentStudio.x + contentStudio.width / 2 + 15} y={contentStudio.y + 76} isDark={isDark} />
      <Whiteboard x={contentStudio.x + contentStudio.width - 40} y={contentStudio.y + contentStudio.height / 2 - 30} isDark={isDark} rotation={90} />
      <SwayPlant x={contentStudio.x + 30} y={contentStudio.y + contentStudio.height - 40} delay={0.5} />

      {/* Showcase: display screens, sofa */}
      <Display x={showcase.x + 30} y={showcase.y + 30} w={showcase.width - 60} h={50} glowColor="#ec4899" isDark={isDark} />
      <Sofa x={showcase.x + showcase.width / 2 - 50} y={showcase.y + 150} rotation={0} isDark={isDark} />
      <Sofa x={showcase.x + showcase.width / 2 - 50} y={showcase.y + 250} rotation={180} isDark={isDark} />
      <SwayPlant x={showcase.x + 30} y={showcase.y + showcase.height - 40} delay={1} />
      <SwayPlant x={showcase.x + showcase.width - 30} y={showcase.y + showcase.height - 40} delay={2} />

      {/* Growth Lab: dashboards, monitors */}
      <Display x={growthLab.x + 30} y={growthLab.y + 20} w={growthLab.width - 60} h={35} glowColor="#22c55e" isDark={isDark} />
      <SimpleTable x={growthLab.x + 40} y={growthLab.y + 100} w={growthLab.width - 80} h={24} isDark={isDark} />
      {[0, 1].map((i) => (
        <Monitor key={`growth-mon-${i}`} x={growthLab.x + 80 + i * 80} y={growthLab.y + 96} isDark={isDark} />
      ))}
      <SwayPlant x={growthLab.x + 30} y={growthLab.y + growthLab.height - 40} delay={1.5} />

      {/* Sales Floor: phone desks grid */}
      {[0, 1, 2].map((row) =>
        [0, 1].map((col) => (
          <g key={`sales-${row}-${col}`}>
            <SimpleTable
              x={salesFloor.x + 40 + col * 180}
              y={salesFloor.y + 50 + row * 80}
              w={100}
              h={22}
              isDark={isDark}
            />
            <Monitor
              x={salesFloor.x + 90 + col * 180}
              y={salesFloor.y + 46 + row * 80}
              isDark={isDark}
            />
          </g>
        )),
      )}
      <SwayPlant x={salesFloor.x + salesFloor.width - 30} y={salesFloor.y + 30} delay={0} />
    </g>
  );
}

// ── Floor 5: Operational ─────────────────────────────────────────
function OperationalDecor({ floor, isDark }: FloorDecorProps) {
  const { opsHub, financeFloor, legalSuite, arWorkspace } = floor.zones;
  return (
    <g>
      {/* Ops Hub: dashboards, status monitors */}
      <Display x={opsHub.x + 30} y={opsHub.y + 20} w={opsHub.width - 60} h={35} glowColor="#14b8a6" isDark={isDark} />
      {[0, 1, 2].map((i) => (
        <g key={`ops-desk-${i}`}>
          <SimpleTable x={opsHub.x + 40 + i * 130} y={opsHub.y + 100} w={100} h={22} isDark={isDark} />
          <Monitor x={opsHub.x + 90 + i * 130} y={opsHub.y + 96} isDark={isDark} />
        </g>
      ))}
      <SwayPlant x={opsHub.x + 30} y={opsHub.y + opsHub.height - 40} delay={0} />
      <WaterCooler x={opsHub.x + opsHub.width - 40} y={opsHub.y + 50} isDark={isDark} />

      {/* Finance Floor: filing cabinets, desks */}
      {[0, 1, 2].map((i) => (
        <rect
          key={`filing-${i}`}
          x={financeFloor.x + 30}
          y={financeFloor.y + 40 + i * 40}
          width={24}
          height={30}
          rx={2}
          fill={isDark ? "#1e293b" : "#94a3b8"}
          stroke={isDark ? "#334155" : "#64748b"}
          strokeWidth={0.6}
        />
      ))}
      {[0, 1].map((i) => (
        <g key={`fin-desk-${i}`}>
          <SimpleTable x={financeFloor.x + 100 + i * 180} y={financeFloor.y + 80} w={120} h={24} isDark={isDark} />
          <Monitor x={financeFloor.x + 160 + i * 180} y={financeFloor.y + 76} isDark={isDark} />
        </g>
      ))}
      <Bookshelf x={financeFloor.x + financeFloor.width - 60} y={financeFloor.y + 22} isDark={isDark} />

      {/* Legal Suite: bookshelves, conference table */}
      <Bookshelf x={legalSuite.x + 40} y={legalSuite.y + 22} isDark={isDark} />
      <Bookshelf x={legalSuite.x + 120} y={legalSuite.y + 22} isDark={isDark} />
      <Bookshelf x={legalSuite.x + 200} y={legalSuite.y + 22} isDark={isDark} />
      <SimpleTable x={legalSuite.x + legalSuite.width / 2 - 80} y={legalSuite.y + legalSuite.height * 0.4} w={160} h={28} isDark={isDark} />
      {[0, 1, 2, 3].map((i) => (
        <SeatCircle key={`legal-${i}`} x={legalSuite.x + legalSuite.width / 2 - 60 + i * 40} y={legalSuite.y + legalSuite.height * 0.4 + 50} isDark={isDark} />
      ))}
      <SwayPlant x={legalSuite.x + 30} y={legalSuite.y + legalSuite.height - 40} delay={0.5} />

      {/* AR Workspace: lab equipment, displays */}
      <Display x={arWorkspace.x + 30} y={arWorkspace.y + 20} w={arWorkspace.width - 60} h={30} glowColor="#a855f7" isDark={isDark} />
      <EquipmentRack x={arWorkspace.x + 40} y={arWorkspace.y + 80} isDark={isDark} />
      <EquipmentRack x={arWorkspace.x + 80} y={arWorkspace.y + 80} isDark={isDark} />
      <EquipmentRack x={arWorkspace.x + 120} y={arWorkspace.y + 80} isDark={isDark} />
      <SimpleTable x={arWorkspace.x + arWorkspace.width / 2 - 60} y={arWorkspace.y + 150} w={120} h={24} isDark={isDark} />
      <Monitor x={arWorkspace.x + arWorkspace.width / 2} y={arWorkspace.y + 146} isDark={isDark} />
      <SwayPlant x={arWorkspace.x + arWorkspace.width - 30} y={arWorkspace.y + arWorkspace.height - 40} delay={1} />
    </g>
  );
}

// ── Floor 6: R&D + Meta ──────────────────────────────────────────
function RDDecor({ floor, isDark }: FloorDecorProps) {
  const { rdLab, benchmarkRoom, experimentLab, metaLounge } = floor.zones;
  return (
    <g>
      {/* R&D Lab: large area with experiment stations, whiteboards */}
      <Whiteboard x={rdLab.x + rdLab.width / 2} y={rdLab.y + 22} isDark={isDark} />
      {[0, 1, 2].map((row) =>
        [0, 1].map((col) => (
          <g key={`rd-station-${row}-${col}`}>
            <SimpleTable
              x={rdLab.x + 40 + col * 300}
              y={rdLab.y + 70 + row * 130}
              w={200}
              h={24}
              isDark={isDark}
            />
            <Monitor x={rdLab.x + 140 + col * 300} y={rdLab.y + 66 + row * 130} isDark={isDark} />
            <EquipmentRack x={rdLab.x + 260 + col * 300} y={rdLab.y + 60 + row * 130} isDark={isDark} />
          </g>
        )),
      )}
      <SwayPlant x={rdLab.x + 30} y={rdLab.y + 30} delay={0} />
      <SwayPlant x={rdLab.x + rdLab.width - 30} y={rdLab.y + rdLab.height - 40} delay={1} />

      {/* Benchmark Room: server racks, big screen */}
      <Display x={benchmarkRoom.x + 20} y={benchmarkRoom.y + 20} w={benchmarkRoom.width - 40} h={40} glowColor="#3b82f6" isDark={isDark} />
      {[0, 1, 2].map((i) => (
        <ServerRack key={`bench-srv-${i}`} x={benchmarkRoom.x + 30 + i * 60} y={benchmarkRoom.y + 100} isDark={isDark} />
      ))}
      {[0, 1, 2].map((i) => (
        <ServerRack key={`bench-srv2-${i}`} x={benchmarkRoom.x + 30 + i * 60} y={benchmarkRoom.y + 170} isDark={isDark} />
      ))}
      <SimpleTable x={benchmarkRoom.x + 40} y={benchmarkRoom.y + benchmarkRoom.height - 80} w={benchmarkRoom.width - 80} h={24} isDark={isDark} />

      {/* Experiment Lab: workstations, equipment */}
      <Whiteboard x={experimentLab.x + experimentLab.width / 2} y={experimentLab.y + 22} isDark={isDark} />
      {[0, 1].map((i) => (
        <g key={`exp-station-${i}`}>
          <SimpleTable x={experimentLab.x + 30} y={experimentLab.y + 60 + i * 100} w={experimentLab.width - 60} h={24} isDark={isDark} />
          <EquipmentRack x={experimentLab.x + 40} y={experimentLab.y + 90 + i * 100} isDark={isDark} />
          <EquipmentRack x={experimentLab.x + 80} y={experimentLab.y + 90 + i * 100} isDark={isDark} />
        </g>
      ))}

      {/* Meta Lounge: sofas, coffee, bookshelf */}
      <Sofa x={metaLounge.x + 80} y={metaLounge.y + 60} rotation={0} isDark={isDark} />
      <Sofa x={metaLounge.x + 250} y={metaLounge.y + 60} rotation={0} isDark={isDark} />
      <Sofa x={metaLounge.x + 420} y={metaLounge.y + 60} rotation={0} isDark={isDark} />
      <CoffeeMachine x={metaLounge.x + 30} y={metaLounge.y + 60} isDark={isDark} />
      <CoffeeCup x={metaLounge.x + 165} y={metaLounge.y + 80} />
      <CoffeeCup x={metaLounge.x + 335} y={metaLounge.y + 80} />
      <Bookshelf x={metaLounge.x + metaLounge.width - 60} y={metaLounge.y + 22} isDark={isDark} />
      <SwayPlant x={metaLounge.x + 30} y={metaLounge.y + metaLounge.height - 40} delay={0} />
      <SwayPlant x={metaLounge.x + metaLounge.width - 30} y={metaLounge.y + metaLounge.height - 40} delay={2} />
    </g>
  );
}

// ── Floor 7: Rooftop ─────────────────────────────────────────────
function RooftopDecor({ floor, isDark }: FloorDecorProps) {
  const { terrace, garden, bbq, zenCorner, skyBar } = floor.zones;
  return (
    <g>
      {/* Terrace: outdoor furniture, sofas */}
      <Sofa x={terrace.x + 80} y={terrace.y + 80} rotation={0} isDark={isDark} />
      <Sofa x={terrace.x + 250} y={terrace.y + 80} rotation={0} isDark={isDark} />
      <Sofa x={terrace.x + 80} y={terrace.y + 180} rotation={180} isDark={isDark} />
      <Sofa x={terrace.x + 250} y={terrace.y + 180} rotation={180} isDark={isDark} />
      <Sofa x={terrace.x + 80} y={terrace.y + 280} rotation={0} isDark={isDark} />
      <CoffeeCup x={terrace.x + 165} y={terrace.y + 130} />
      <CoffeeCup x={terrace.x + 335} y={terrace.y + 130} />
      <SwayPlant x={terrace.x + 30} y={terrace.y + 30} delay={0} />
      <SwayPlant x={terrace.x + terrace.width - 30} y={terrace.y + 30} delay={1} />
      <SwayPlant x={terrace.x + 30} y={terrace.y + terrace.height - 40} delay={2} />

      {/* Garden: many plants! */}
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <SwayPlant
            key={`garden-${row}-${col}`}
            x={garden.x + 40 + col * 90}
            y={garden.y + 40 + row * 65}
            delay={row * 0.3 + col * 0.5}
          />
        )),
      )}

      {/* BBQ: grill, tables */}
      <rect
        x={bbq.x + bbq.width / 2 - 30}
        y={bbq.y + 50}
        width={60}
        height={40}
        rx={6}
        fill={isDark ? "#78350f" : "#92400e"}
        stroke={isDark ? "#a16207" : "#d97706"}
        strokeWidth={1.5}
      />
      {/* Grill grate lines */}
      {[0, 1, 2, 3].map((i) => (
        <line
          key={`grate-${i}`}
          x1={bbq.x + bbq.width / 2 - 25}
          y1={bbq.y + 60 + i * 8}
          x2={bbq.x + bbq.width / 2 + 25}
          y2={bbq.y + 60 + i * 8}
          stroke={isDark ? "#d97706" : "#f59e0b"}
          strokeWidth={1}
          opacity={0.5}
        />
      ))}
      <SimpleTable x={bbq.x + 30} y={bbq.y + 130} w={80} h={30} isDark={isDark} />
      <CoffeeCup x={bbq.x + 70} y={bbq.y + 138} />
      <SwayPlant x={bbq.x + bbq.width - 30} y={bbq.y + 30} delay={0} />

      {/* Zen Corner: meditation mats, telescope */}
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <circle
            key={`zen-mat-${row}-${col}`}
            cx={zenCorner.x + 60 + col * 100}
            cy={zenCorner.y + 60 + row * 80}
            r={25}
            fill={isDark ? "#1a2a40" : "#d1d5db"}
            stroke={isDark ? "#334155" : "#9ca3af"}
            strokeWidth={0.8}
            opacity={0.5}
          />
        )),
      )}
      {/* Telescope */}
      <g transform={`translate(${zenCorner.x + zenCorner.width - 50}, ${zenCorner.y + 50})`}>
        <rect x={-4} y={0} width={8} height={40} rx={2} fill={isDark ? "#475569" : "#6b7280"} />
        <circle cx={0} cy={0} r={10} fill={isDark ? "#1e293b" : "#374151"} stroke={isDark ? "#64748b" : "#94a3b8"} strokeWidth={1} />
        <circle cx={0} cy={0} r={3} fill={isDark ? "#3b82f6" : "#60a5fa"} opacity={0.6} />
      </g>
      <SwayPlant x={zenCorner.x + 30} y={zenCorner.y + 30} delay={0} />

      {/* Sky Bar: bar counter, sofas, drinks */}
      <SimpleTable x={skyBar.x + 40} y={skyBar.y + 50} w={200} h={30} isDark={isDark} />
      <CoffeeCup x={skyBar.x + 80} y={skyBar.y + 56} />
      <CoffeeCup x={skyBar.x + 140} y={skyBar.y + 56} />
      <CoffeeCup x={skyBar.x + 200} y={skyBar.y + 56} />
      <Sofa x={skyBar.x + 80} y={skyBar.y + 130} rotation={0} isDark={isDark} />
      <Sofa x={skyBar.x + 280} y={skyBar.y + 130} rotation={0} isDark={isDark} />
      <SwayPlant x={skyBar.x + 30} y={skyBar.y + 30} delay={1} />
      <SwayPlant x={skyBar.x + skyBar.width - 30} y={skyBar.y + skyBar.height - 40} delay={0} />
    </g>
  );
}
