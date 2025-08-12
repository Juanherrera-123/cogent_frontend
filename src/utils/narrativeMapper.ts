import { ReportPayload } from "@/types/report";
import { NarrativaContext } from "@/types/narrativa";
import { fmt } from "@/utils/formatters";

type Dist = Record<string, number>;

function topLabel(dist?: Dist): { label: string; percent: string } {
  if (!dist) return { label: "", percent: "0%" };
  const total = Object.values(dist).reduce((a, b) => a + b, 0) || 1;
  const [label, count] = Object.entries(dist).sort((a,b)=>b[1]-a[1])[0] ?? ["", 0];
  return { label, percent: fmt.percent((count/total)*100) };
}

function percentOf(dist?: Dist, key?: string): string {
  if (!dist || !key) return "0%";
  const total = Object.values(dist).reduce((a,b)=>a+b,0) || 1;
  const count = dist[key] ?? 0;
  return fmt.percent((count/total)*100);
}

export function buildNarrativaContext(payload: ReportPayload): NarrativaContext {
  const empresaNombre = payload.empresa?.nombre || "la empresa";

  // Género
  const genero = payload.sociodemo.genero ?? {};
  const percFemenino = percentOf(genero, "Femenino");
  const percMasculino = percentOf(genero, "Masculino");

  // Estado civil (top) → plural básico
  const ecTop = topLabel(payload.sociodemo.estadoCivil);
  const estadoCivilTop = ecTop.label.endsWith("o") || ecTop.label.endsWith("a")
    ? ecTop.label + "s"
    : ecTop.label;

  // Escolaridad → etiqueta general (simplificada)
  const estudios = payload.sociodemo.escolaridad ?? {};
  const estudiosTop = topLabel(estudios);
  const nivelEstudiosLabel =
    ["Posgrado","Universitario","Técnico","Tecnólogo"].includes(estudiosTop.label)
      ? "por encima de la media"
      : ["Bachiller","Primaria"].includes(estudiosTop.label)
        ? "en la media"
        : "por encima de la media"; // fallback
  const percEstudios = estudiosTop.percent;

  // Estrato 2–3
  const estrato = payload.sociodemo.estrato ?? {};
  const estrato23 = (estrato["2"] ?? 0) + (estrato["3"] ?? 0);
  const estratoTotal = Object.values(estrato).reduce((a,b)=>a+b,0) || 1;
  const percEstratoRango = fmt.percent((estrato23/estratoTotal)*100);
  const estratoRango = "2–3";

  // Vivienda (top)
  const vivTop = topLabel(payload.sociodemo.vivienda);
  const viviendaTipoTop = vivTop.label || "arrendada";
  const percVivienda = vivTop.percent;

  // Personas a cargo
  const pac = payload.sociodemo["personasACargo"] as Dist | undefined;
  const pacTotal = pac ? Object.values(pac).reduce((a,b)=>a+b,0) : 0;
  const pacYes = pac ? (pac["Sí"] ?? pac["Si"] ?? 0) : 0;
  const percPersonasACargo = fmt.percent(pacTotal ? (pacYes/pacTotal)*100 : 0);

  // Antigüedad
  const antig = payload.sociodemo.antiguedad ?? {};
  const percAntigMas1 = percentOf(antig, "Más de 1 año");
  const antiguedadLabel = "más de (1) año en la empresa";
  const percAntiguedad = percAntigMas1;

  // Contrato (top)
  const contTop = topLabel(payload.sociodemo.tipoContrato);
  const contratoTipoTop = contTop.label || "temporal de un año o más";
  const percContratoTipoTop = contTop.percent;

  // Salario (top)
  const salTop = topLabel(payload.sociodemo.salario);
  const salarioTipoTop = salTop.label || "fijo";
  const percSalarioTipoTop = salTop.percent;

  // Jornada (top)
  const horas = payload.sociodemo.horasDiarias ?? {};
  const jorTop = topLabel(horas);
  const jornadaLabel = jorTop.label || "muy extensos";
  const percJornada = jorTop.percent;

  return {
    empresaNombre,
    percFemenino,
    percMasculino,

    estadoCivilTop,
    percEstadoCivilTop: ecTop.percent,

    percEstudios,
    nivelEstudiosLabel,

    estratoRango,
    percEstratoRango,

    percVivienda,
    viviendaTipoTop,

    percPersonasACargo,

    percAntiguedad,
    antiguedadLabel,

    contratoTipoTop,
    percContratoTipoTop,

    salarioTipoTop,
    percSalarioTipoTop,

    jornadaLabel,
    percJornada
  };
}
