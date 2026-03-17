import { memo } from "react";

interface ArcadeCabinetProps {
  x: number;
  y: number;
  isDark?: boolean;
}

/** Retro arcade cabinet with rainbow-cycling screen glow */
export const ArcadeCabinet = memo(function ArcadeCabinet({ x, y, isDark = false }: ArcadeCabinetProps) {
  const body = isDark ? "#1e293b" : "#1f2937";
  const side = isDark ? "#334155" : "#374151";
  const trim = isDark ? "#f59e0b" : "#eab308";

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Cabinet body */}
      <rect x={-12} y={-22} width={24} height={44} rx={2} fill={body} />
      {/* Side trim */}
      <rect x={-12} y={-22} width={2} height={44} fill={trim} opacity={0.4} />
      <rect x={10} y={-22} width={2} height={44} fill={trim} opacity={0.4} />
      {/* Marquee top */}
      <rect x={-10} y={-20} width={20} height={6} rx={1} fill={side} />
      <rect x={-8} y={-19} width={16} height={4} rx={0.5} fill={trim} opacity={0.6} />
      {/* Screen */}
      <rect
        x={-9}
        y={-12}
        width={18}
        height={14}
        rx={1}
        fill={isDark ? "#0f172a" : "#111827"}
        stroke={side}
        strokeWidth={0.5}
      />
      {/* Screen glow — rainbow animation */}
      <rect
        x={-8}
        y={-11}
        width={16}
        height={12}
        rx={1}
        opacity={0.4}
        style={{ animation: "rainbow-glow 4s linear infinite" }}
      />
      {/* Control panel */}
      <rect x={-9} y={4} width={18} height={8} rx={1} fill={side} />
      {/* Joystick */}
      <circle cx={-3} cy={8} r={2} fill={isDark ? "#64748b" : "#9ca3af"} />
      <rect x={-3.5} y={4} width={1} height={4} fill={isDark ? "#94a3b8" : "#d1d5db"} />
      {/* Buttons */}
      <circle cx={4} cy={6} r={1.5} fill="#ef4444" opacity={0.8} />
      <circle cx={7} cy={7} r={1.5} fill="#3b82f6" opacity={0.8} />
      {/* Coin slot */}
      <rect x={-3} y={14} width={6} height={2} rx={0.5} fill={isDark ? "#64748b" : "#9ca3af"} opacity={0.5} />
    </g>
  );
});
