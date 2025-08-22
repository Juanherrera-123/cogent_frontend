interface Row {
  dimension: string;
  acciones: string[];
}

interface TablaInformativaProps {
  headers: [string, string];
  rows: Row[];
  exportMode?: boolean;
}

export default function TablaInformativa({ headers, rows, exportMode = false }: TablaInformativaProps) {
  const containerClasses = `rounded-2xl bg-white ${exportMode ? "shadow-none" : "shadow-sm"} p-4 md:p-6 font-montserrat text-[#172349]`;

  return (
    <div className={containerClasses}>
      <table className="w-full text-left border-collapse">
        <thead className="bg-primary-main text-white font-semibold">
          <tr>
            <th scope="col" className="py-2 px-3">{headers[0]}</th>
            <th scope="col" className="py-2 px-3">{headers[1]}</th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {rows.map((row, idx) => (
            <tr
              key={row.dimension}
              className={`block md:table-row border-b border-slate-100 ${idx % 2 === 1 ? "bg-slate-50" : ""} ${!exportMode ? "hover:bg-slate-50" : ""}`}
            >
              <th
                scope="row"
                className="block md:table-cell font-semibold px-3 py-3 align-top md:w-1/3"
              >
                {row.dimension}
              </th>
              <td className="block md:table-cell px-3 py-3">
                <ul role="list" className="list-disc pl-5 space-y-1">
                  {row.acciones.map((accion, i) => (
                    <li key={i}>{accion}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

