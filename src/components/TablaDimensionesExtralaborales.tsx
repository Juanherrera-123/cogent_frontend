import React from "react";
import { cn } from "@/lib/utils";

export type TablaDimensionesExtralaboralesProps = {
  className?: string; // márgenes externos opcionales
  title?: string; // por defecto: "Dimensiones extralaborales: definición e indicadores"
  showFooterNote?: boolean; // por defecto: true
  exportMode?: boolean; // por defecto: false (si true, desactiva efectos/animaciones)
};

const datos = [
  {
    dimension: "Tiempo fuera del trabajo",
    definicion:
      "Tiempo que el individuo dedica a actividades diferentes a las laborales, descansar, compartir con familia y amigos, atender responsabilidades personales o domésticas, recreación y ocio.",
    indicadores: [
      "La cantidad de tiempo destinado al descanso y recreación es limitada o insuficiente.",
      "La cantidad de tiempo fuera del trabajo para compartir con la familia o amigos, o para atender asuntos personales o domésticos es limitada o insuficiente.",
    ],
  },
  {
    dimension: "Relaciones familiares",
    definicion:
      "Propiedades que caracterizan las interacciones del individuo con su núcleo familiar.",
    indicadores: [
      "La relación con familiares es conflictiva.",
      "La ayuda (apoyo social) que el trabajador recibe de sus familiares es inexistente o pobre.",
    ],
  },
  {
    dimension: "Comunicación y relaciones interpersonales",
    definicion:
      "Cualidades que caracterizan la comunicación e interacciones del individuo con sus allegados y amigos.",
    indicadores: [
      "La comunicación con los integrantes del entorno social es escasa o deficiente.",
      "La relación con amigos o allegados es conflictiva.",
      "La ayuda (apoyo social) que el trabajador recibe de sus amigos o allegados es inexistente o pobre.",
    ],
  },
  {
    dimension: "Situación económica del grupo familiar",
    definicion:
      "Trata de la disponibilidad de medios económicos para que el trabajador y su grupo familiar atiendan sus gastos básicos.",
    indicadores: [
      "Los ingresos familiares son insuficientes para costear las necesidades básicas.",
      "Existen deudas económicas difíciles de solventar.",
    ],
  },
  {
    dimension: "Características de la vivienda y de su entorno",
    definicion:
      "Se refiere a las condiciones de infraestructura, ubicación y entorno de las instalaciones físicas del lugar habitual de residencia del trabajador y de su grupo familiar.",
    indicadores: [
      "Las condiciones de la vivienda del trabajador son precarias.",
      "Las condiciones de la vivienda o su entorno desfavorecen el descanso y la comodidad del individuo y su grupo familiar.",
      "La ubicación de la vivienda dificulta el acceso a vías transitables, a medios de transporte o servicios de salud.",
    ],
  },
  {
    dimension: "Influencia del entorno extralaboral en el trabajo",
    definicion:
      "Corresponde al influjo de las exigencias de los roles familiares y personales en el bienestar y en la actividad laboral del trabajador.",
    indicadores: [
      "Las situaciones de la vida familiar o personal del trabajador afectan su bienestar, rendimiento o sus relaciones con otras personas en el trabajo.",
    ],
  },
  {
    dimension: "Desplazamiento vivienda – trabajo – vivienda",
    definicion:
      "Son las condiciones en que se realiza el traslado del trabajador desde su sitio de vivienda hasta su lugar de trabajo y viceversa. Comprende facilidad, comodidad del transporte y la duración del recorrido.",
    indicadores: [
      "El transporte para acudir al trabajo es difícil o incómodo.",
      "La duración del desplazamiento entre la vivienda y el trabajo es prolongada.",
    ],
  },
];

export default function TablaDimensionesExtralaborales({
  className,
  title = "Dimensiones extralaborales: definición e indicadores",
  showFooterNote = true,
  exportMode = false,
}: TablaDimensionesExtralaboralesProps) {
  const containerClass = cn(
    "rounded-2xl border border-slate-200 bg-white shadow-sm p-4 md:p-6 print:bg-white print:shadow-none print:border-0 print:p-0 print:m-0",
    className,
  );

  const rowBase =
    "block md:table-row border-b border-slate-100 odd:bg-white even:bg-slate-50/70";
  const rowInteractive = !exportMode ? "md:hover:bg-slate-50 transition-colors" : "";

  return (
    <div className={containerClass}>
      {title && (
        <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-3">
          {title}
        </h3>
      )}
      <table className="w-full text-left border-collapse">
        <caption className="sr-only">
          Dimensiones extralaborales: definición e indicadores
        </caption>
        <thead className="hidden md:table-header-group">
          <tr className="bg-gradient-to-r from-sky-700 to-cyan-500 text-white font-semibold">
            <th scope="col" className="p-4 align-top md:w-[24%]">
              DIMENSIÓN
            </th>
            <th scope="col" className="p-4 align-top md:w-[38%]">
              DEFINICIÓN
            </th>
            <th scope="col" className="p-4 align-top">
              INDICADORES DE RIESGO
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group text-slate-700">
          {datos.map((row, idx) => (
            <tr key={idx} className={cn(rowBase, rowInteractive)}>
              <th
                scope="row"
                className="block md:table-cell font-semibold text-slate-800 p-4 align-top md:w-[24%]"
              >
                <span className="md:hidden text-xs font-bold uppercase tracking-wide text-slate-500 mb-1 block">
                  Dimensión
                </span>
                {row.dimension}
              </th>
              <td className="block md:table-cell p-4 align-top md:w-[38%]">
                <span className="md:hidden text-xs font-bold uppercase tracking-wide text-slate-500 mb-1 block">
                  Definición
                </span>
                {row.definicion}
              </td>
              <td className="block md:table-cell p-4 align-top">
                <span className="md:hidden text-xs font-bold uppercase tracking-wide text-slate-500 mb-1 block">
                  Indicadores de riesgo
                </span>
                <ul role="list" className="list-disc pl-5 space-y-1">
                  {row.indicadores.map((ind, i) => (
                    <li key={i}>{ind}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showFooterNote && (
        <p className="mt-4 text-xs text-slate-500">
          (Fuente: Batería de instrumentos para la evaluación de factores de riesgo psicosocial).
        </p>
      )}
    </div>
  );
}

