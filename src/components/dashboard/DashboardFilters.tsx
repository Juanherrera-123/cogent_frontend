import React from "react";

type Props = {
  empresaSeleccionada: string;
  setEmpresaSeleccionada: (val: string) => void;
  empresasResultados: string[];
};

const DashboardFilters: React.FC<Props> = ({
  empresaSeleccionada,
  setEmpresaSeleccionada,
  empresasResultados,
}) => {
  return (
    <div className="flex gap-2 items-center mb-2">
      <label className="font-semibold mr-2">Filtrar por empresa:</label>
      <select
        value={empresaSeleccionada}
        onChange={(e) => setEmpresaSeleccionada(e.target.value)}
        className="rounded-xl border border-[#B2E2FF] p-2 text-[#265FF2] font-semibold"
      >
        <option value="todas">Todas</option>
        {empresasResultados.map((e, idx) => (
          <option key={idx} value={e}>
            {e}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.memo(DashboardFilters);
