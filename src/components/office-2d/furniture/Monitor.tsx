import { memo } from "react";

interface MonitorProps {
  x: number;
  y: number;
  isDark?: boolean;
}

/** Desk monitor with animated screen glow */
export const Monitor = memo(function Monitor({ x, y, isDark = false }: MonitorProps) {
  const frame = isDark ? "#334155" : "#6b7280";
  const screen = isDark ? "#1a2744" : "#e0e7ff";
  const glow = isDark ? "#60a5fa" : "#93c5fd";

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Monitor frame */}
      <rect x={-12} y={-10} width={24} height={18} rx={2} fill={frame} />
      {/* Screen surface */}
      <rect
        x={-10}
        y={-8}
        width={20}
        height={14}
        rx={1}
        fill={screen}
        style={{ animation: "screen-flicker 3s ease-in-out infinite" }}
      />
      {/* Screen glow overlay */}
      <rect x={-10} y={-8} width={20} height={14} rx={1} fill={glow} opacity={0.15} />
      {/* Stand */}
      <rect x={-3} y={8} width={6} height={4} fill={frame} />
      {/* Base */}
      <rect x={-8} y={12} width={16} height={2} rx={1} fill={frame} opacity={0.7} />
    </g>
  );
});
