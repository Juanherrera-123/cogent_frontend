import React, { forwardRef } from "react";
import type { ReportOptions } from "@/types/report";
import { strings } from "@/report/strings";
import { defaultTheme } from "@/report/theme";
import Metodologia from "./dashboard/Metodologia";

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
  options?: ReportOptions;
  narrativaSociodemo?: string;
  recomendacionesSociodemo?: string;
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
      options,
      narrativaSociodemo,
      recomendacionesSociodemo,
    },
    ref
  ) => {
    const fecha = new Date(fechaInformeISO).toLocaleDateString();

    const sections = options?.sections ?? {
      portada: true,
      resumenGlobal: true,
      intralaboral: true,
      extralaboral: true,
      sociodemografia: true,
      metodologia: true,
      normativa: true,
      recomendaciones: true,
      conclusiones: true,
    };
    const theme = {
      ...defaultTheme,
      ...(options?.theme ?? {}),
      logoUrl: options?.theme?.logoUrl ?? empresa.logoUrl ?? defaultTheme.logoUrl,
    };
    const Title = ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-2xl font-semibold" style={{ color: theme.primary }}>
        {children}
      </h2>
    );

    return (
      <div ref={ref} className="w-[794pt] bg-white text-black text-sm leading-6">
        {sections.portada && (
          <>
            <section className="min-h-[1123pt] p-16 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold" style={{ color: theme.primary }}>
                  {options?.tituloPortada || "Informe de Evaluación de Riesgo Psicosocial"}
                </h1>
                <p className="mt-3 text-lg">{empresa?.nombre}</p>
                {empresa?.nit && <p className="text-gray-600">NIT: {empresa.nit}</p>}
                <p className="mt-2 text-gray-600">Fecha de emisión: {fecha}</p>
              </div>
              {theme.logoUrl && (
                <div className="flex justify-end">
                  <img src={theme.logoUrl} alt="Logo" className="h-14 object-contain" />
                </div>
              )}
            </section>
            <div className="page-break"></div>
          </>
        )}

        {sections.resumenGlobal && (
          <>
            <section className="p-10">
              <Title>Resumen Global</Title>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {global.formaA && (
                  <div className="border rounded-lg p-4" style={{ borderColor: theme.accent }}>
                    <h3 className="font-semibold">Intralaboral — Forma A</h3>
                    <p>
                      Clasificación: <b>{global.formaA.nivel}</b> ({global.formaA.puntaje}% )
                    </p>
                  </div>
                )}
                {global.formaB && (
                  <div className="border rounded-lg p-4" style={{ borderColor: theme.accent }}>
                    <h3 className="font-semibold">Intralaboral — Forma B</h3>
                    <p>
                      Clasificación: <b>{global.formaB.nivel}</b> ({global.formaB.puntaje}% )
                    </p>
                  </div>
                )}
                {global.extralaboral && (
                  <div className="border rounded-lg p-4" style={{ borderColor: theme.accent }}>
                    <h3 className="font-semibold">Extralaboral</h3>
                    <p>
                      Clasificación: <b>{global.extralaboral.nivel}</b> ({global.extralaboral.puntaje}% )
                    </p>
                  </div>
                )}
                {global.estres && (
                  <div className="border rounded-lg p-4" style={{ borderColor: theme.accent }}>
                    <h3 className="font-semibold">Estrés</h3>
                    <p>
                      Clasificación: <b>{global.estres.nivel}</b> ({global.estres.puntaje}% )
                    </p>
                  </div>
                )}
              </div>
            </section>
            <div className="page-break"></div>
          </>
        )}

        {sections.intralaboral && (
          <>
            <section className="p-10">
              <Title>Resultados Intralaborales</Title>
              <div className="mt-6 space-y-6">
                {graficos.formaA}
                {graficos.formaB}
                {tablas.intralaboral}
              </div>
            </section>
            <div className="page-break"></div>
          </>
        )}

        {sections.extralaboral && (
          <>
            <section className="p-10">
              <Title>Resultados Extralaborales</Title>
              <div className="mt-6 space-y-6">
                {graficos.extralaboral}
                {tablas.extralaboral}
              </div>
            </section>
            <div className="page-break"></div>
          </>
        )}

        {sections.sociodemografia && (
          <>
            <section className="p-10">
              <Title>Sociodemografía de la Muestra</Title>
              {narrativaSociodemo && <p className="mt-4 text-justify">{narrativaSociodemo}</p>}
              {recomendacionesSociodemo && <p className="mt-4 text-justify">{recomendacionesSociodemo}</p>}
              <div className="mt-6">{tablas.sociodemo}</div>
            </section>
            <div className="page-break"></div>
          </>
        )}

        {sections.metodologia && (
          <>
            <section className="p-10">
              <Title>Metodología</Title>
              <div className="mt-3">
                <Metodologia />
              </div>
            </section>
            <div className="page-break"></div>
          </>
        )}

        {sections.normativa && (
          <>
            <section className="p-10">
              <Title>Normativa</Title>
              <p className="mt-3">{strings.normativa}</p>
            </section>
            <div className="page-break"></div>
          </>
        )}

        {sections.recomendaciones && (
          <>
            <section className="p-10">
              <Title>Recomendaciones</Title>
              <ul className="mt-4 list-disc pl-6 space-y-1">
                {recomendaciones.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </section>
            <div className="page-break"></div>
          </>
        )}

        {sections.conclusiones && (
          <section className="p-10">
            <Title>Conclusiones</Title>
            <p className="mt-3">{conclusiones}</p>
          </section>
        )}
      </div>
    );
  }
);

export default ReportePDF;
