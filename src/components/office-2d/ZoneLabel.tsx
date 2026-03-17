import { useTranslation } from "react-i18next";
import { ZONES } from "@/lib/constants";
import { useOfficeStore } from "@/store/office-store";

interface ZoneLabelProps {
  zone: { x: number; y: number; width: number; height: number; label: string };
  zoneKey: keyof typeof ZONES;
}

export function ZoneLabel({ zone, zoneKey }: ZoneLabelProps) {
  const { t } = useTranslation("common");
  const theme = useOfficeStore((s) => s.theme);
  const isDark = theme === "dark";

  return (
    <text
      x={zone.x + 14}
      y={zone.y + 22}
      fill={isDark ? "#D7FF3B" : "#64748b"}
      fontSize={8}
      fontWeight={400}
      fontFamily="'Press Start 2P', monospace"
      letterSpacing="0.05em"
      opacity={0.7}
    >
      {t(`zones.${zoneKey}`)}
    </text>
  );
}
