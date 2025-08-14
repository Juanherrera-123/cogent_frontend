import React, { useEffect, useState } from "react";

type Stage = "primario" | "secundario" | "terciario";

interface Props {
  stage: Stage;
}

const stageAngles: Record<Stage, number> = {
  primario: 60,
  secundario: 180,
  terciario: 300,
};

const stageLabels: Record<Stage, string> = {
  primario: "Primario",
  secundario: "Secundario",
  terciario: "Terciario",
};

const stageColors: Record<Stage, string> = {
  primario: "#16a34a",
  secundario: "#facc15",
  terciario: "#dc2626",
};

export default function SemaphoreDial({ stage }: Props) {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setAngle(stageAngles[stage]);
    }, 100);
    return () => clearTimeout(id);
  }, [stage]);
  const labelRadius = 60;
  const rad = ((stageAngles[stage] - 90) * Math.PI) / 180;
  const labelStyle = {
    color: stageColors[stage],
    left: `${50 + labelRadius * Math.cos(rad)}%`,
    top: `${50 + labelRadius * Math.sin(rad)}%`,
    transform: "translate(-50%, -50%)",
  } as React.CSSProperties;

  return (
    <div className="m-4 w-56 sm:w-64">
      <div className="relative w-full aspect-square overflow-visible">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(#16a34a 0deg 120deg, #facc15 120deg 240deg, #dc2626 240deg 360deg)",
          }}
        />
        <div
          className="absolute inset-[12%] rounded-full"
          style={{ backgroundColor: stageColors[stage] }}
        />
        <div
          className="absolute left-1/2 top-1/2 w-0 h-0"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <div
            className="origin-bottom w-0.5 bg-black transition-transform duration-700"
            style={{
              height: "42%",
              transform: `translateX(-50%) rotate(${angle}deg)`,
            }}
          />
        </div>
        <div
          className="absolute text-sm font-semibold whitespace-nowrap"
          style={labelStyle}
        >
          {stageLabels[stage]}
        </div>
      </div>
    </div>
  );
}

