import { memo } from "react";

interface BookshelfProps {
  x: number;
  y: number;
  isDark?: boolean;
  rotation?: number;
}

/** Bookshelf with colored book spines */
export const Bookshelf = memo(function Bookshelf({
  x,
  y,
  isDark = false,
  rotation = 0,
}: BookshelfProps) {
  const frame = isDark ? "#334155" : "#78716c";
  const shelf = isDark ? "#475569" : "#a8a29e";

  // Book spine colors — muted palette
  const books = isDark
    ? ["#7c3aed", "#2563eb", "#059669", "#dc2626", "#d97706", "#6366f1", "#0891b2", "#be185d"]
    : ["#8b5cf6", "#3b82f6", "#10b981", "#ef4444", "#f59e0b", "#818cf8", "#06b6d4", "#ec4899"];

  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotation})`}>
      {/* Shelf frame */}
      <rect x={-24} y={-16} width={48} height={32} rx={2} fill={frame} />
      {/* Shelf dividers */}
      <rect x={-22} y={-1} width={44} height={1.5} fill={shelf} />
      {/* Top row books */}
      {books.slice(0, 4).map((color, i) => {
        const bx = -20 + i * 10;
        const bw = 6 + (i % 2) * 2;
        const bh = 12 - (i % 3);
        return (
          <rect
            key={`top-${i}`}
            x={bx}
            y={-14 + (12 - bh)}
            width={bw}
            height={bh}
            rx={0.5}
            fill={color}
            opacity={0.75}
          />
        );
      })}
      {/* Bottom row books */}
      {books.slice(4, 8).map((color, i) => {
        const bx = -20 + i * 10;
        const bw = 7 - (i % 2) * 2;
        const bh = 11 - (i % 3);
        return (
          <rect
            key={`bot-${i}`}
            x={bx}
            y={2 + (12 - bh)}
            width={bw}
            height={bh}
            rx={0.5}
            fill={color}
            opacity={0.75}
          />
        );
      })}
    </g>
  );
});
