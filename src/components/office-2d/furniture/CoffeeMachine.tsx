import { memo } from "react";

interface CoffeeMachineProps {
  x: number;
  y: number;
  isDark?: boolean;
}

/** Coffee machine with animated rising steam particles */
export const CoffeeMachine = memo(function CoffeeMachine({ x, y, isDark = false }: CoffeeMachineProps) {
  const body = isDark ? "#334155" : "#4b5563";
  const front = isDark ? "#475569" : "#6b7280";
  const accent = isDark ? "#64748b" : "#9ca3af";
  const cupColor = isDark ? "#1e293b" : "#f1f5f9";
  const steamColor = isDark ? "#94a3b8" : "#cbd5e1";

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Machine body */}
      <rect x={-14} y={-18} width={28} height={32} rx={3} fill={body} />
      {/* Front panel */}
      <rect x={-11} y={-14} width={22} height={18} rx={2} fill={front} />
      {/* Display screen */}
      <rect x={-8} y={-12} width={16} height={6} rx={1} fill={isDark ? "#0f172a" : "#1e293b"} />
      {/* Display text hint */}
      <rect x={-6} y={-10} width={12} height={2} rx={0.5} fill="#22c55e" opacity={0.5} />
      {/* Buttons */}
      <circle cx={-4} cy={-2} r={2} fill={accent} />
      <circle cx={4} cy={-2} r={2} fill={accent} />
      {/* Drip tray */}
      <rect x={-10} y={4} width={20} height={3} rx={1} fill={accent} opacity={0.6} />
      {/* Coffee cup underneath */}
      <rect x={-4} y={7} width={8} height={7} rx={1.5} fill={cupColor} stroke={accent} strokeWidth={0.5} />
      {/* Steam particles — animated rising */}
      <circle
        cx={-2}
        cy={2}
        r={1.5}
        fill={steamColor}
        style={{ animation: "steam-rise 2.0s ease-out infinite" }}
      />
      <circle
        cx={1}
        cy={3}
        r={1.2}
        fill={steamColor}
        style={{ animation: "steam-rise 2.4s ease-out infinite 0.5s" }}
      />
      <circle
        cx={3}
        cy={1}
        r={1}
        fill={steamColor}
        style={{ animation: "steam-rise 2.8s ease-out infinite 1.0s" }}
      />
    </g>
  );
});
