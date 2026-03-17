import { memo } from "react";

interface WhiteboardProps {
  x: number;
  y: number;
  isDark?: boolean;
  rotation?: number;
}

/** Wall-mounted whiteboard with faint diagram scribbles */
export const Whiteboard = memo(function Whiteboard({
  x,
  y,
  isDark = false,
  rotation = 0,
}: WhiteboardProps) {
  const frame = isDark ? "#475569" : "#9ca3af";
  const surface = isDark ? "#1e293b" : "#f8fafc";
  const scribble1 = isDark ? "#60a5fa" : "#3b82f6";
  const scribble2 = isDark ? "#f472b6" : "#ec4899";
  const scribble3 = isDark ? "#4ade80" : "#22c55e";

  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotation})`}>
      {/* Board frame */}
      <rect x={-30} y={-18} width={60} height={36} rx={2} fill={frame} />
      {/* White surface */}
      <rect x={-27} y={-15} width={54} height={30} rx={1} fill={surface} />
      {/* Scribble: box diagram */}
      <rect
        x={-20}
        y={-10}
        width={14}
        height={8}
        fill="none"
        stroke={scribble1}
        strokeWidth={0.8}
        opacity={0.4}
      />
      {/* Scribble: connecting line */}
      <line x1={-6} y1={-6} x2={2} y2={-6} stroke={scribble1} strokeWidth={0.8} opacity={0.3} />
      {/* Scribble: another box */}
      <rect
        x={2}
        y={-10}
        width={14}
        height={8}
        fill="none"
        stroke={scribble2}
        strokeWidth={0.8}
        opacity={0.4}
      />
      {/* Scribble: wavy line (graph) */}
      <path
        d="M -22 6 Q -15 0 -8 6 Q -1 12 6 6 Q 13 0 20 6"
        fill="none"
        stroke={scribble3}
        strokeWidth={0.7}
        opacity={0.35}
      />
      {/* Scribble: bullet points */}
      <circle cx={-20} cy={2} r={1} fill={scribble1} opacity={0.3} />
      <line x1={-17} y1={2} x2={-8} y2={2} stroke={scribble1} strokeWidth={0.6} opacity={0.25} />
      {/* Tray at bottom */}
      <rect x={-14} y={15} width={28} height={3} rx={1} fill={frame} opacity={0.7} />
    </g>
  );
});
