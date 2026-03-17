import { memo } from "react";

interface ServerRackProps {
  x: number;
  y: number;
  isDark?: boolean;
}

/** Server rack with blinking LED indicators */
export const ServerRack = memo(function ServerRack({ x, y, isDark = false }: ServerRackProps) {
  const body = isDark ? "#1e293b" : "#374151";
  const panel = isDark ? "#0f172a" : "#1f2937";
  const ventColor = isDark ? "#334155" : "#4b5563";

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Rack body */}
      <rect x={-14} y={-20} width={28} height={40} rx={2} fill={body} />
      {/* Server panels */}
      <rect x={-11} y={-17} width={22} height={8} rx={1} fill={panel} />
      <rect x={-11} y={-7} width={22} height={8} rx={1} fill={panel} />
      <rect x={-11} y={3} width={22} height={8} rx={1} fill={panel} />
      {/* Vent lines */}
      {[13, 14, 15, 16, 17].map((yy) => (
        <line key={yy} x1={-9} y1={yy} x2={9} y2={yy} stroke={ventColor} strokeWidth={0.5} opacity={0.5} />
      ))}
      {/* LED indicators — blink at different rates */}
      <circle
        cx={-7}
        cy={-13}
        r={1.5}
        fill="#22c55e"
        style={{ animation: "led-blink 1.2s ease-in-out infinite" }}
      />
      <circle
        cx={-3}
        cy={-13}
        r={1.5}
        fill="#22c55e"
        style={{ animation: "led-blink 1.8s ease-in-out infinite 0.3s" }}
      />
      <circle
        cx={1}
        cy={-13}
        r={1.5}
        fill="#f59e0b"
        style={{ animation: "led-blink 2.4s ease-in-out infinite 0.6s" }}
      />
      <circle
        cx={-7}
        cy={-3}
        r={1.5}
        fill="#22c55e"
        style={{ animation: "led-blink 1.5s ease-in-out infinite 0.2s" }}
      />
      <circle
        cx={-3}
        cy={-3}
        r={1.5}
        fill="#22c55e"
        style={{ animation: "led-blink 2.0s ease-in-out infinite 0.8s" }}
      />
      <circle
        cx={-7}
        cy={7}
        r={1.5}
        fill="#3b82f6"
        style={{ animation: "led-blink 1.6s ease-in-out infinite 0.4s" }}
      />
      <circle
        cx={-3}
        cy={7}
        r={1.5}
        fill="#22c55e"
        style={{ animation: "led-blink 2.2s ease-in-out infinite 1.0s" }}
      />
    </g>
  );
});
