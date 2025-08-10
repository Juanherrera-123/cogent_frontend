export type Nivel = "Muy bajo" | "Bajo" | "Medio" | "Alto" | "Muy alto" | string;
export interface Indicador { transformado?: number; nivel?: Nivel; }
export interface MapaIndicadores { [nombre: string]: Indicador; }
type Texto = string;

const esAlto = (n?: Nivel) => n === "Alto" || n === "Muy alto";

/**
 * Reglas por dimensión y dominio. Devuelve viñetas accionables (3–10).
 */
export function recomendacionesPorResultados(
  dimensiones: MapaIndicadores,
  dominios?: MapaIndicadores
): Texto[] {
  const out: Texto[] = [];

  // Demandas
  if (esAlto(dimensiones["Demandas de carga mental"]?.nivel)) {
    out.push("Rotación de tareas y micro-pausas cognitivas; revisar tiempos estándar y cargas pico.");
  }
  if (esAlto(dimensiones["Demandas cuantitativas"]?.nivel)) {
    out.push("Ajustar metas y capacidad; balancear asignación de casos y priorización semanal.");
  }
  if (esAlto(dimensiones["Demandas de la jornada de trabajo"]?.nivel)) {
    out.push("Revisar turnos/horas extra; asegurar pausas reglamentarias y coberturas en picos.");
  }
  if (esAlto(dimensiones["Demandas emocionales"]?.nivel)) {
    out.push("Formación en manejo de clientes difíciles y contención emocional; debriefing periódico.");
  }
  if (esAlto(dimensiones["Demandas ambientales y de esfuerzo físico"]?.nivel)) {
    out.push("Adecuaciones ergonómicas y checklist de puesto; mantenimiento preventivo.");
  }

  // Control / Claridad / Capacitación / Cambio
  if (esAlto(dimensiones["Control y autonomía sobre el trabajo"]?.nivel)) {
    out.push("Incrementar autonomía en secuencia de tareas y decisiones de bajo riesgo; guías claras.");
  }
  if (esAlto(dimensiones["Claridad de rol"]?.nivel)) {
    out.push("Actualizar descripciones de cargo y criterios de desempeño; playbooks y canales de consulta.");
  }
  if (esAlto(dimensiones["Capacitación"]?.nivel)) {
    out.push("Plan de cierre de brechas (on-the-job + micro-learning) con metas trimestrales.");
  }
  if (esAlto(dimensiones["Participación y manejo del cambio"]?.nivel)) {
    out.push("Comités de cambio con representantes y feedback quincenal.");
  }
  if (esAlto(dimensiones["Oportunidades para el uso y desarrollo de habilidades y conocimientos"]?.nivel)) {
    out.push("Itinerarios de carrera y proyectos retadores que exploten habilidades clave.");
  }

  // Relaciones / Liderazgo / Recompensas
  if (esAlto(dimensiones["Relación con los colaboradores"]?.nivel) ||
      esAlto(dimensiones["Relaciones sociales en el trabajo"]?.nivel)) {
    out.push("Círculos de feedback y acuerdos de convivencia; habilidades conversacionales.");
  }
  if (esAlto(dominios?.["Liderazgo y relaciones sociales en el trabajo"]?.nivel)) {
    out.push("Programa de liderazgo: feedback efectivo, reconocimiento y coaching 1:1.");
  }
  if (esAlto(dimensiones["Reconocimiento y compensación"]?.nivel) ||
      esAlto(dominios?.["Recompensas"]?.nivel)) {
    out.push("Revisar esquema de reconocimiento e incentivos; hacerlos visibles y predecibles.");
  }

  // Extralaboral
  if (esAlto(dimensiones["Tiempo fuera del trabajo"]?.nivel)) {
    out.push("Política de desconexión laboral y ventanas de no contacto; formación a jefes.");
  }
  if (esAlto(dimensiones["Relaciones familiares"]?.nivel)) {
    out.push("Ruta de apoyo psicosocial/orientación familiar; campañas de bienestar.");
  }
  if (esAlto(dimensiones["Desplazamiento vivienda – trabajo – vivienda"]?.nivel)) {
    out.push("Flexibilidad horaria y teletrabajo parcial; revisar rutas/auxilios de transporte.");
  }

  // Mínimo 3, máximo 10 recomendaciones
  const MIN = 3, MAX = 10;
  if (out.length < MIN) out.push("Monitoreo trimestral de indicadores y quick wins priorizados.");
  return out.slice(0, MAX);
}

/**
 * Conclusión corta a partir de niveles globales y hallazgos clave.
 */
export function conclusionesSinteticas(opts: {
  globalA?: { puntaje: number; nivel: Nivel };
  globalB?: { puntaje: number; nivel: Nivel };
  globalExtra?: { puntaje: number; nivel: Nivel };
  hallazgosClave?: string[];
}): string {
  const { globalA, globalB, globalExtra, hallazgosClave = [] } = opts;
  const partes: string[] = [];
  if (globalA) partes.push(`Intralaboral (Forma A): ${globalA.nivel} (${globalA.puntaje}%)`);
  if (globalB) partes.push(`Intralaboral (Forma B): ${globalB.nivel} (${globalB.puntaje}%)`);
  if (globalExtra) partes.push(`Extralaboral: ${globalExtra.nivel} (${globalExtra.puntaje}%)`);

  const header = partes.length ? `Clasificación global — ${partes.join(" · ")}.` : "";
  const foco = hallazgosClave.length ? ` Foco: ${hallazgosClave.slice(0,3).join("; ")}.` : "";
  return `${header}${foco} Priorizar dimensiones en nivel alto/muy alto y mantener monitoreo trimestral.`;
}
