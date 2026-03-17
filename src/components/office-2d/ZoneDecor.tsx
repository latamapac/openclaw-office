import { OFFICE, ZONES } from "@/lib/constants";
import {
  Sofa,
  Plant,
  CoffeeCup,
  Monitor,
  ServerRack,
  Whiteboard,
  CoffeeMachine,
  Bookshelf,
  ArcadeCabinet,
  WaterCooler,
} from "./furniture";

/** Extra decor for the Desk zone: whiteboard, plants in corners */
export function DeskZoneDecor({ isDark }: { isDark: boolean }) {
  const dz = ZONES.desk;

  return (
    <g>
      {/* Whiteboard on the top wall */}
      <Whiteboard x={dz.x + dz.width / 2} y={dz.y + 22} isDark={isDark} />
      {/* Corner plants */}
      <g style={{ animation: "plant-sway 6s ease-in-out infinite" }}>
        <Plant x={dz.x + 30} y={dz.y + 30} />
      </g>
      <g style={{ animation: "plant-sway 7s ease-in-out infinite 1s" }}>
        <Plant x={dz.x + dz.width - 30} y={dz.y + 30} />
      </g>
      <g style={{ animation: "plant-sway 8s ease-in-out infinite 2s" }}>
        <Plant x={dz.x + 30} y={dz.y + dz.height - 40} />
      </g>
    </g>
  );
}

/** Extra decor for the Hot Desk zone: standing desk with monitor, whiteboard, plants */
export function HotDeskZoneDecor({ isDark }: { isDark: boolean }) {
  const hz = ZONES.hotDesk;

  const standingDeskColor = isDark ? "#334155" : "#dfe5ed";
  const standingDeskSide = isDark ? "#283548" : "#c8d0dc";

  return (
    <g>
      {/* Standing desk area — narrow tall desk at the wall */}
      <rect
        x={hz.x + hz.width - 80}
        y={hz.y + 50}
        width={50}
        height={25}
        rx={4}
        fill={standingDeskColor}
        stroke={standingDeskSide}
        strokeWidth={0.8}
      />
      <Monitor x={hz.x + hz.width - 55} y={hz.y + 48} isDark={isDark} />
      {/* Corner plants */}
      <g style={{ animation: "plant-sway 7s ease-in-out infinite 0.5s" }}>
        <Plant x={hz.x + 30} y={hz.y + hz.height - 40} />
      </g>
      <g style={{ animation: "plant-sway 6.5s ease-in-out infinite 1.5s" }}>
        <Plant x={hz.x + hz.width - 30} y={hz.y + hz.height - 40} />
      </g>
      {/* Whiteboard on top wall */}
      <Whiteboard x={hz.x + 40} y={hz.y + 22} isDark={isDark} />
    </g>
  );
}

/** Extra decor for the Meeting zone: whiteboard, presentation screen, plants */
export function MeetingZoneDecor({ isDark }: { isDark: boolean }) {
  const mz = ZONES.meeting;
  const tvFrame = isDark ? "#1e293b" : "#374151";
  const tvScreen = isDark ? "#0f172a" : "#111827";
  const tvGlow = isDark ? "#3b82f6" : "#60a5fa";

  return (
    <g>
      {/* Whiteboard on the right wall */}
      <Whiteboard
        x={mz.x + mz.width - 40}
        y={mz.y + mz.height / 2 - 40}
        isDark={isDark}
        rotation={90}
      />
      {/* Presentation TV/screen on the top wall */}
      <g transform={`translate(${mz.x + mz.width / 2}, ${mz.y + 20})`}>
        <rect x={-28} y={-10} width={56} height={20} rx={2} fill={tvFrame} />
        <rect
          x={-25}
          y={-8}
          width={50}
          height={16}
          rx={1}
          fill={tvScreen}
          style={{ animation: "screen-flicker 4s ease-in-out infinite" }}
        />
        <rect x={-25} y={-8} width={50} height={16} rx={1} fill={tvGlow} opacity={0.1} />
        {/* Mount */}
        <rect x={-2} y={-14} width={4} height={4} fill={tvFrame} opacity={0.6} />
      </g>
      {/* Corner plants */}
      <g style={{ animation: "plant-sway 7.5s ease-in-out infinite 0.3s" }}>
        <Plant x={mz.x + 30} y={mz.y + 30} />
      </g>
      <g style={{ animation: "plant-sway 6s ease-in-out infinite 1.2s" }}>
        <Plant x={mz.x + mz.width - 30} y={mz.y + mz.height - 40} />
      </g>
    </g>
  );
}

/** Upgraded lounge decor: sofas, coffee machine, bookshelf, arcade, water cooler, TV */
export function LoungeDecor({ isDark }: { isDark: boolean }) {
  const lz = ZONES.lounge;
  const cx = lz.x + lz.width / 2;

  const wallColor = isDark ? "#334155" : "#5a6878";
  const deskColor = isDark ? "#475569" : "#8494a7";
  const deskTop = isDark ? "#64748b" : "#a5b4c8";
  const logoTextColor = isDark ? "#94a3b8" : "#ffffff";
  const logoBg = isDark ? "#1e293b" : "#3b4f6b";
  const tvFrame = isDark ? "#1e293b" : "#374151";
  const tvScreen = isDark ? "#0f172a" : "#111827";
  const tvGlow = isDark ? "#a855f7" : "#8b5cf6";

  // Logo backdrop wall — centered horizontally, at ~55% from top
  const bgWallW = 200;
  const bgWallH = 36;
  const bgWallY = lz.y + lz.height * 0.52;

  // Reception desk — arc in front of logo wall
  const deskW = 160;
  const deskH = 24;
  const deskY = bgWallY + bgWallH + 14;

  return (
    <g>
      {/* ── Upper lounge area: sofas & coffee ── */}
      <Sofa x={lz.x + 100} y={lz.y + 60} rotation={0} isDark={isDark} />
      <Sofa x={lz.x + 280} y={lz.y + 60} rotation={0} isDark={isDark} />
      <Sofa x={lz.x + 100} y={lz.y + 140} rotation={180} isDark={isDark} />
      {/* Additional sofa — L-shaped corner seating */}
      <Sofa x={lz.x + 280} y={lz.y + 140} rotation={180} isDark={isDark} />
      <CoffeeCup x={lz.x + 190} y={lz.y + 100} />
      <CoffeeCup x={lz.x + 100} y={lz.y + 100} />
      <CoffeeCup x={lz.x + 280} y={lz.y + 100} />
      <Sofa x={lz.x + 440} y={lz.y + 100} rotation={90} isDark={isDark} />
      {/* Additional sofa near the right wall */}
      <Sofa x={lz.x + 440} y={lz.y + 200} rotation={90} isDark={isDark} />

      {/* ── Coffee machine — against the left wall ── */}
      <CoffeeMachine x={lz.x + 30} y={lz.y + 100} isDark={isDark} />

      {/* ── Bookshelf — on the top wall, right side ── */}
      <Bookshelf x={lz.x + lz.width - 60} y={lz.y + 22} isDark={isDark} />

      {/* ── Arcade cabinet — in the corner for fun ── */}
      <ArcadeCabinet x={lz.x + lz.width - 30} y={lz.y + 80} isDark={isDark} />

      {/* ── Water cooler — near the coffee machine ── */}
      <WaterCooler x={lz.x + 30} y={lz.y + 170} isDark={isDark} />

      {/* ── Lounge TV — mounted on the top wall above sofas ── */}
      <g transform={`translate(${lz.x + 190}, ${lz.y + 22})`}>
        <rect x={-22} y={-8} width={44} height={16} rx={2} fill={tvFrame} />
        <rect
          x={-20}
          y={-6}
          width={40}
          height={12}
          rx={1}
          fill={tvScreen}
          style={{ animation: "screen-flicker 3.5s ease-in-out infinite 0.5s" }}
        />
        <rect x={-20} y={-6} width={40} height={12} rx={1} fill={tvGlow} opacity={0.12} />
        <rect x={-1} y={-12} width={2} height={4} fill={tvFrame} opacity={0.5} />
      </g>

      {/* ── Logo backdrop wall ── */}
      <rect
        x={cx - bgWallW / 2}
        y={bgWallY}
        width={bgWallW}
        height={bgWallH}
        rx={4}
        fill={logoBg}
      />
      {/* Wall top accent strip */}
      <rect
        x={cx - bgWallW / 2}
        y={bgWallY}
        width={bgWallW}
        height={3}
        rx={1.5}
        fill={isDark ? "#64748b" : "#7a9bc0"}
      />
      {/* "OpenClaw" logo text */}
      <text
        x={cx}
        y={bgWallY + bgWallH / 2 + 5}
        textAnchor="middle"
        fill={logoTextColor}
        fontSize={14}
        fontWeight={700}
        fontFamily="system-ui, sans-serif"
        letterSpacing="0.12em"
      >
        OpenClaw
      </text>

      {/* ── Reception desk (rounded front) ── */}
      <rect
        x={cx - deskW / 2}
        y={deskY}
        width={deskW}
        height={deskH}
        rx={12}
        fill={deskColor}
        stroke={wallColor}
        strokeWidth={1}
      />
      {/* Desk surface highlight */}
      <rect
        x={cx - deskW / 2 + 4}
        y={deskY + 3}
        width={deskW - 8}
        height={deskH - 6}
        rx={9}
        fill={deskTop}
        opacity={0.5}
      />
      {/* Reception monitor */}
      <Monitor x={cx} y={deskY - 6} isDark={isDark} />

      {/* Decorative plants flanking reception */}
      <g style={{ animation: "plant-sway 7s ease-in-out infinite" }}>
        <Plant x={cx - bgWallW / 2 - 30} y={bgWallY + bgWallH / 2} />
      </g>
      <g style={{ animation: "plant-sway 6.5s ease-in-out infinite 1s" }}>
        <Plant x={cx + bgWallW / 2 + 30} y={bgWallY + bgWallH / 2} />
      </g>

      {/* Side plants near entrance */}
      <g style={{ animation: "plant-sway 8s ease-in-out infinite 0.5s" }}>
        <Plant x={lz.x + 40} y={lz.y + lz.height - 50} />
      </g>
      <g style={{ animation: "plant-sway 7.5s ease-in-out infinite 1.5s" }}>
        <Plant x={lz.x + lz.width - 40} y={lz.y + lz.height - 50} />
      </g>
    </g>
  );
}

/** Corridor/reception decor: server rack, corridor plants, wall clock */
export function CorridorDecor({ isDark }: { isDark: boolean }) {
  const cw = OFFICE.corridorWidth;
  const midX = OFFICE.x + (OFFICE.width - cw) / 2;
  const midY = OFFICE.y + (OFFICE.height - cw) / 2;
  const clockFace = isDark ? "#1e293b" : "#f8fafc";
  const clockRim = isDark ? "#475569" : "#6b7280";
  const clockHand = isDark ? "#94a3b8" : "#374151";

  return (
    <g>
      {/* Server rack visible at the end of the vertical corridor (top) */}
      <ServerRack x={midX + cw / 2} y={OFFICE.y + 30} isDark={isDark} />
      {/* Plants along the horizontal corridor */}
      <g style={{ animation: "plant-sway 8s ease-in-out infinite 0.8s" }}>
        <Plant x={OFFICE.x + 40} y={midY + cw / 2} />
      </g>
      <g style={{ animation: "plant-sway 7s ease-in-out infinite 1.8s" }}>
        <Plant x={OFFICE.x + OFFICE.width - 40} y={midY + cw / 2} />
      </g>
      {/* Wall clock at the corridor junction */}
      <g
        transform={`translate(${midX + cw + 30}, ${midY - 8})`}
        style={{ animation: "clock-pulse 2s ease-in-out infinite" }}
      >
        <circle r={10} fill={clockFace} stroke={clockRim} strokeWidth={1.5} />
        {/* Hour hand */}
        <line x1={0} y1={0} x2={-3} y2={-5} stroke={clockHand} strokeWidth={1.2} strokeLinecap="round" />
        {/* Minute hand */}
        <line x1={0} y1={0} x2={5} y2={-2} stroke={clockHand} strokeWidth={0.8} strokeLinecap="round" />
        {/* Center dot */}
        <circle r={1.2} fill={clockHand} />
        {/* Hour marks */}
        {[0, 90, 180, 270].map((angle) => (
          <line
            key={angle}
            x1={0}
            y1={-8}
            x2={0}
            y2={-9.5}
            stroke={clockRim}
            strokeWidth={0.8}
            transform={`rotate(${angle})`}
          />
        ))}
      </g>
    </g>
  );
}
