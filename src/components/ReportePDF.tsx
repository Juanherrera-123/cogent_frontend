import React, { forwardRef } from "react";

type Props = {
  empresa: { nombre: string; nit?: string; logoUrl?: string };
  fechaInformeISO: string;
  global: {
    formaA?: { puntaje: number; nivel: string };
    formaB?: { puntaje: number; nivel: string };
    extralaboral?: { puntaje: number; nivel: string };
    estres?: { puntaje: number; nivel: string };
  };
  tablas: {
    sociodemo?: React.ReactNode;
    intralaboral?: React.ReactNode;
    extralaboral?: React.ReactNode;
  };
  graficos: {
    formaA?: React.ReactNode;
    formaB?: React.ReactNode;
    extralaboral?: React.ReactNode;
  };
  recomendaciones: string[];
  conclusiones: string;
};

const ReportePDF = forwardRef<HTMLDivElement, Props>(
  (
    {
      empresa,
      fechaInformeISO,
      global,
      tablas,
      graficos,
      recomendaciones,
      conclusiones,
    },
    ref
  ) => {
    const fecha = new Date(fechaInformeISO).toLocaleDateString();

    return (
      <div ref={ref} className="w-[794pt] bg-white text-black text-sm leading-6">
        {/* Portada */}
        <section className="min-h-[1123pt] p-16 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Informe de Evaluación de Riesgo Psicosocial
            </h1>
            <p className="mt-3 text-lg">{empresa?.nombre}</p>
            {empresa?.nit && <p className="text-gray-600">NIT: {empresa.nit}</p>}
            <p className="mt-2 text-gray-600">Fecha de emisión: {fecha}</p>
          </div>
          {empresa?.logoUrl && (
            <div className="flex justify-end">
              <img src={empresa.logoUrl} alt="Logo" className="h-14 object-contain" />
            </div>
          )}
        </section>

        <div className="page-break"></div>

        {/* Resumen Global */}
        <section className="p-10">
          <h2 className="text-2xl font-semibold">Resumen Global</h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {global.formaA && (
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold">Intralaboral — Forma A</h3>
                <p>
                  Clasificación: <b>{global.formaA.nivel}</b> ({global.formaA.puntaje}% )
                </p>
              </div>
            )}
            {global.formaB && (
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold">Intralaboral — Forma B</h3>
                <p>
                  Clasificación: <b>{global.formaB.nivel}</b> ({global.formaB.puntaje}% )
                </p>
              </div>
            )}
            {global.extralaboral && (
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold">Extralaboral</h3>
                <p>
                  Clasificación: <b>{global.extralaboral.nivel}</b> ({global.extralaboral.puntaje}% )
                </p>
              </div>
            )}
            {global.estres && (
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold">Estrés</h3>
                <p>
                  Clasificación: <b>{global.estres.nivel}</b> ({global.estres.puntaje}% )
                </p>
              </div>
            )}
          </div>
        </section>

        <div className="page-break"></div>

        {/* Intralaboral */}
        <section className="p-10">
          <h2 className="text-2xl font-semibold">Resultados Intralaborales</h2>
          <div className="mt-6 space-y-6">
            {graficos.formaA}
            {graficos.formaB}
            {tablas.intralaboral}
          </div>
        </section>

        <div className="page-break"></div>

        {/* Extralaboral */}
        <section className="p-10">
          <h2 className="text-2xl font-semibold">Resultados Extralaborales</h2>
          <div className="mt-6 space-y-6">
            {graficos.extralaboral}
            {tablas.extralaboral}
          </div>
        </section>

        <div className="page-break"></div>

        {/* Sociodemografía */}
        <section className="p-10">
          <h2 className="text-2xl font-semibold">Sociodemografía de la Muestra</h2>
          <div className="mt-6">{tablas.sociodemo}</div>
        </section>

        <div className="page-break"></div>

        {/* Recomendaciones */}
        <section className="p-10">
          <h2 className="text-2xl font-semibold">Recomendaciones</h2>
          <ul className="mt-4 list-disc pl-6 space-y-1">
            {recomendaciones.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </section>

        <div className="page-break"></div>

        {/* Conclusiones */}
        <section className="p-10">
          <h2 className="text-2xl font-semibold">Conclusiones</h2>
          <p className="mt-3">{conclusiones}</p>
        </section>
      </div>
    );
  }
);

export default ReportePDF;

