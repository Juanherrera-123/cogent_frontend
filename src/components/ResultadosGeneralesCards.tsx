import React from "react";

export interface ResultadosGeneralesItem {
  key: string;
  label: string;
  level: "PRIMARIO" | "SECUNDARIO" | "TERCIARIO";
}

interface Props {
  items: ResultadosGeneralesItem[];
  onSelect?: (item: ResultadosGeneralesItem) => void;
  compact?: boolean;
}

const LEVEL_STYLES: Record<
  ResultadosGeneralesItem["level"],
  { bg: string; accent: string; text: string }
> = {
  PRIMARIO: { bg: "#86EFAC", accent: "#16A34A", text: "#0F172A" },
  SECUNDARIO: { bg: "#FDE68A", accent: "#F59E0B", text: "#0F172A" },
  TERCIARIO: { bg: "#FCA5A5", accent: "#DC2626", text: "#FFFFFF" },
};

export default function ResultadosGeneralesCards({
  items,
  onSelect,
  compact = false,
}: Props) {
  const handleSelect = (item: ResultadosGeneralesItem) => {
    onSelect?.(item);
  };
  const cols = Math.min(items.length, 4);
  return (
    <div
      className="grid gap-4 sm:grid-cols-2"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}
    >
      {items.map((item) => {
        const styles = LEVEL_STYLES[item.level];
        const padding = compact ? "p-3" : "p-4";
        const labelSize = compact ? "text-xs" : "text-sm";
        const levelSize = compact ? "text-sm" : "text-lg";
        return (
          <button
            key={item.key}
            type="button"
            aria-label={`${item.label} – ${item.level}`}
            onClick={() => handleSelect(item)}
            className={`rounded-2xl shadow-sm ${padding} min-h-[72px] flex flex-col items-center justify-center text-center border transition hover:shadow-md hover:-translate-y-0.5 cursor-pointer`}
            style={{
              backgroundColor: styles.bg,
              borderColor: `${styles.accent}4D`,
              color: styles.text,
            }}
            title={item.level}
          >
            <span className={`font-semibold uppercase ${labelSize} mb-1`}>
              {item.label}
            </span>
            <span className={`${levelSize} font-bold truncate`}>{item.level}</span>
          </button>
        );
      })}
    </div>
  );
}

