import { memo } from "react";

interface WaterCoolerProps {
  x: number;
  y: number;
  isDark?: boolean;
}

/** Water cooler with animated bubble particles */
export const WaterCooler = memo(function WaterCooler({ x, y, isDark = false }: WaterCoolerProps) {
  const body = isDark ? "#475569" : "#d1d5db";
  const tank = isDark ? "#1e3a5f" : "#bfdbfe";
  const water = isDark ? "#1d4ed8" : "#60a5fa";
  const bubbleColor = isDark ? "#93c5fd" : "#dbeafe";

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Stand/body */}
      <rect x={-8} y={-2} width={16} height={24} rx={2} fill={body} />
      {/* Water tank (inverted bottle) */}
      <rect x={-6} y={-18} width={12} height={16} rx={3} fill={tank} opacity={0.8} />
      {/* Water level */}
      <rect x={-5} y={-10} width={10} height={8} rx={2} fill={water} opacity={0.4} />
      {/* Bottle neck */}
      <rect x={-3} y={-20} width={6} height={4} rx={1.5} fill={tank} opacity={0.6} />
      {/* Spigots */}
      <circle cx={-4} cy={4} r={1.5} fill="#ef4444" opacity={0.6} />
      <circle cx={4} cy={4} r={1.5} fill="#3b82f6" opacity={0.6} />
      {/* Drip tray */}
      <rect x={-7} y={8} width={14} height={2} rx={0.5} fill={isDark ? "#334155" : "#9ca3af"} />
      {/* Bubbles rising inside tank */}
      <circle
        cx={-2}
        cy={-6}
        r={1}
        fill={bubbleColor}
        opacity={0.5}
        style={{ animation: "bubble-rise 2.5s ease-out infinite" }}
      />
      <circle
        cx={1}
        cy={-4}
        r={0.8}
        fill={bubbleColor}
        opacity={0.4}
        style={{ animation: "bubble-rise 3.0s ease-out infinite 0.8s" }}
      />
      <circle
        cx={3}
        cy={-8}
        r={0.6}
        fill={bubbleColor}
        opacity={0.3}
        style={{ animation: "bubble-rise 3.5s ease-out infinite 1.5s" }}
      />
    </g>
  );
});
