import { useState } from "react";
import { NEOCORP_FLOORS, TOTAL_FLOORS } from "@/lib/neocorp-floors";
import { useOfficeStore } from "@/store/office-store";

const BUTTON_SIZE = 32;
const GAP = 4;

export function FloorSelector() {
  const currentFloor = useOfficeStore((s) => s.currentFloor);
  const setFloor = useOfficeStore((s) => s.setFloor);
  const [hoveredFloor, setHoveredFloor] = useState<number | null>(null);

  // Floors listed top-to-bottom: 7 (R) at top, 0 (G) at bottom
  const floors = Array.from({ length: TOTAL_FLOORS }, (_, i) => TOTAL_FLOORS - 1 - i);

  return (
    <div
      className="absolute right-3 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center"
      style={{ gap: GAP }}
    >
      {/* Header label */}
      <div
        className="mb-1 text-center"
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 6,
          color: "#64748b",
          letterSpacing: "0.08em",
        }}
      >
        FLOOR
      </div>

      {floors.map((floorId) => {
        const floor = NEOCORP_FLOORS[floorId];
        const isActive = floorId === currentFloor;
        const isHovered = floorId === hoveredFloor;

        return (
          <div key={floorId} className="relative">
            <button
              type="button"
              onClick={() => setFloor(floorId)}
              onMouseEnter={() => setHoveredFloor(floorId)}
              onMouseLeave={() => setHoveredFloor(null)}
              className="relative flex items-center justify-center transition-all duration-150"
              style={{
                width: BUTTON_SIZE,
                height: BUTTON_SIZE,
                backgroundColor: isActive ? "#1a2a40" : "#0c1524",
                border: `2px solid ${isActive ? "#D7FF3B" : isHovered ? "#475569" : "#1a2a40"}`,
                borderRadius: 6,
                cursor: "pointer",
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 10,
                color: isActive ? "#D7FF3B" : "#64748b",
                boxShadow: isActive
                  ? "0 0 8px rgba(215, 255, 59, 0.3), inset 0 0 4px rgba(215, 255, 59, 0.1)"
                  : "none",
              }}
              title={`${floor.name} (Floor ${floor.shortName})`}
            >
              {floor.shortName}
            </button>

            {/* Tooltip on hover — shown to the left */}
            {isHovered && (
              <div
                className="pointer-events-none absolute right-full top-1/2 mr-2 -translate-y-1/2 whitespace-nowrap rounded px-2 py-1"
                style={{
                  backgroundColor: "#1a2a40",
                  border: "1px solid #334155",
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 7,
                  color: floor.theme.accent,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                }}
              >
                {floor.name}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
