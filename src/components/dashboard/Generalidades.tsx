import { useState } from "react";

function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <img
        src={src}
        alt={alt}
        className="w-48 md:w-64 cursor-pointer mx-auto"
        onClick={() => setOpen(true)}
      />
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setOpen(false)}
        >
          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[90vw]"
          />
        </div>
      )}
    </>
  );
}

export default function Generalidades() {
  const fromPublic = (name: string) => `${import.meta.env.BASE_URL}${name}`;
  return (
    <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed space-y-4">
      <h3 className="font-semibold">Factores Psicosociales:</h3>
      <p>{`De acuerdo con la Resolución 2646 de 2008, los “factores psicosociales comprenden los aspectos intralaborales,
extralaborales o externos a la organización y las condiciones individuales o características intrínsecas al trabajador,
los cuales, en una interrelación dinámica, mediante percepciones y experiencias, influyen en la salud y el
desempeño de las personas” A esta definición,
es importante agregar lo expresado por Villalobos (2007), quien enfatiza que las condiciones de intensidad y
duración de la exposición a estos factores también influyen significativamente. Además, estos aspectos pueden
generar efectos emocionales, cognitivos, sociales, laborales y fisiológicos.
El modelo de análisis de factores psicosociales presentado en la Batería de Instrumentos para la Evaluación de
Factores de Riesgo Psicosocial (Ministerio de Protección Social, 2010) clasifica estos factores en tres categorías de
condiciones: intralaborales, extralaborales e individuales.`}</p>
      <div className="flex justify-center">
        <ZoomableImage src={fromPublic("MAPA 1.png")} alt="MAPA 1" />
      </div>
      <p>{`Estas se refieren a las características del trabajo y su organización que impactan en la salud y
bienestar de los individuos (Ministerio de la Protección Social, 2010). Este concepto surge a
partir de la revisión de modelos como el de Karasek y Theorell (1990) conocido como el
"modelo de demanda-control-apoyo social", el modelo de Siegrist (1996 y 2008) llamado
"modelo de desequilibrio esfuerzo-recompensa" y el modelo de Villalobos (2005) denominado
"modelo dinámico de los factores de riesgo psicosocial".
Las condiciones intralaborales, categorizadas en la batería y evaluadas a través de
cuestionarios, están agrupadas en cuatro dominios, cada uno con diversa tipología:`}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <ZoomableImage src={fromPublic("MAPA 2.png")} alt="MAPA 2" />
        <ZoomableImage src={fromPublic("MAPA 3.jpeg")} alt="MAPA 3" />
        <ZoomableImage src={fromPublic("MAPA 4.jpeg")} alt="MAPA 4" />
        <ZoomableImage src={fromPublic("MAPA 5.jpeg")} alt="MAPA 5" />
        <ZoomableImage src={fromPublic("MAPA 6.jpeg")} alt="MAPA 6" />
      </div>
      <h3 className="font-semibold">Condiciones Extralaborales</h3>
      <p>{`Estas condiciones se refieren a los aspectos externos al ámbito laboral y que también ejercen
influencia en el bienestar del trabajador. Esto engloba el entorno familiar, social y económico, así
como factores como las condiciones del lugar de residencia y la vivienda en sí.`}</p>
        <p>{`Dentro de la batería de instrumentos, se consideran 7 dimensiones relacionadas con estos aspectos
externos, las cuales se detallan a continuación:`}</p>
        <p className="text-green-600 font-semibold text-center">
          TABLE 1. Description of extra-laboral conditions by dimension
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Dimension</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Definition</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-semibold align-top">
                  Tiempo fuera del trabajo
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Se refiere al tiempo que el individuo dedica a actividades diferentes a las
                  laborales como descansar, compartir con familia y amigos, atender
                  responsabilidades personales o domésticas, realizar actividades de recreación
                  y ocio.
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-semibold align-top">
                  Relaciones Familiares
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Caracteriza las interacciones del individuo con su núcleo familiar
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-semibold align-top">
                  Comunicación y Relaciones Interpersonales
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Cualidades que caracterizan la comunicación e interacciones del individuo
                  con sus allegados y amigos.
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-semibold align-top">
                  Situación Económica del grupo familiar
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Trata de la disponibilidad de medios económicos para que el trabajador y su
                  grupo familiar atiendan sus gastos básicos
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-semibold align-top">
                  Características de la vivienda y su entorno
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Se refiere a las condiciones de infraestructura, ubicación y entorno de las
                  instalaciones físicas del lugar habitual de residencia del trabajador y su
                  grupo familiar.
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-semibold align-top">
                  Influencia del entorno extralaboral en el trabajo
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Corresponde al influjo de las exigencias de los roles familiares y
                  personales en el bienestar y la actividad laboral del trabajador.
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-semibold align-top">
                  Desplazamiento vivienda-trabajo-vivienda
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Son Condiciones en que se realiza el traslado del trabajador desde su sitio
                  de vivienda hasta su lugar de trabajo y viceversa. Comprende la facilidad, la
                  comodidad del transporte y la duración del recorrido.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="italic text-sm mt-2">
          Source: Batería de riesgo psicosocial (Ministerio de la protección social, 2010)
        </p>
        <h3 className="font-semibold">Condiciones Individuales</h3>
        <p>{`Villalobos (2007) propone que estas condiciones son inherentes a la individualidad de cada persona, por lo tanto, son específicas y abarcan aspectos como la autoestima, características de la personalidad y factores cognitivos/emocionales moderadores (como motivación, habilidades, nivel educativo, locus de control, experiencia y resistencia al estrés). También, se incluyen moderadores demográficos como género, edad, ocupación y estado de salud.`}</p>
        <p>{`Dentro de la Batería de instrumentos para la evaluación de factores de riesgo psicosocial, estas condiciones se agrupan en dos constructos principales:`}</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <span className="font-semibold">Información sociodemográfica:</span>{' '}
            Incluye aspectos como género, edad, estado civil, nivel de educación,
            ocupación, lugar de residencia, estrato socioeconómico de la vivienda,
            tipo de vivienda y número de dependientes.
          </li>
          <li>
            <span className="font-semibold">Información ocupacional:</span>{' '}
            Contempla detalles sobre el lugar actual de trabajo, tiempo de servicio
            en la empresa, denominación del puesto, categoría del puesto, duración
            en el puesto actual, departamento o área de trabajo, tipo de contrato,
            horas laborales diarias y modalidad de remuneración.
          </li>
        </ul>
        <h3 className="font-semibold">Estrés</h3>
        <p>{`El estrés ha sido definido como la respuesta adaptativa del individuo para enfrentar tensiones (estrés). No obstante, cuando los estímulos generan más tensión y las demandas externas superan la capacidad de afrontamiento de la persona, se da un nivel de estrés que impacta negativamente en el individuo (distrés) (Rodríguez, 2011). En ocasiones, el distrés conlleva a problemas psicosociales (emocionales, cognitivos, fisiológicos y sociales) que, a largo plazo, pueden dar lugar a patologías significativas.`}</p>
        <p>{`Según Rodríguez (2011), el estrés en el entorno laboral surge debido a múltiples estresores o factores de riesgo psicosocial, que pueden llevar a la falta de motivación en el trabajo. Además, dependiendo del nivel de exposición y frecuencia de estos estresores, pueden desencadenarse enfermedades como ansiedad, depresión, infartos, hipertensión, entre otras patologías.`}</p>
        <p>{`La tabla de enfermedades emitida por el Ministerio de Trabajo en 2014 incluye enfermedades psicosociales vinculadas a factores de riesgo ocupacional. Estas enfermedades abarcan trastornos afectivos (como depresión y ansiedad), trastornos adaptativos, enfermedades cardiovasculares y trastornos gástricos.`}</p>
        <p>{`La batería de instrumentos para evaluar el riesgo psicosocial, a través de su cuestionario de evaluación de estrés, identifica síntomas agrupados en las siguientes categorías:`}</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Síntomas fisiológicos</li>
          <li>Síntomas de comportamiento social</li>
          <li>Síntomas intelectuales y laborales</li>
          <li>Síntomas psicoemocionales</li>
        </ul>
        <p>{`La interpretación de los niveles de estrés puede ser catalogadas como:`}</p>
        <p>{`Muy bajo: Ausencia de síntomas de estrés u ocurrencia muy rara que no amerita desarrollar actividades de intervención específicas, salvo acciones o programa de promoción en salud`}</p>
        <p>{`Bajo: Es indicativo de baja frecuencia de síntomas de estrés y por tanto escasa afectación del estado general de salud, se hace pertinente desarrollar acciones o programas de intervención, afín de mantener la baja frecuencia de síntomas.`}</p>
        <p>{`Medio: La presentación de síntomas es indicativa de una respuesta de estrés moderada. Los síntomas más frecuentes y críticos ameritan observación y acciones sistemáticas de intervención para prevenir efectos perjudiciales en la salud además se sugiere identificar los factores de riesgo psicosocial intra y extra laboral que pudieran tener alguna relación con los efectos identificados.`}</p>
        <p>{`Alto: La cantidad de síntomas y su frecuencia de presentación es indicativa de una respuesta de estrés alto. Los síntomas más críticos frecuentes requieren intervención en el marco de un sistema de vigilancia epidemiológico, además es muy importante identificar los factores de riesgo psicosocial intra y extralaboral que pudieran tener alguna relación con los efectos identificados.`}</p>
        <p>{`Muy Alto: La cantidad de síntomas y su frecuencia de presentación es indicativa de una respuesta de estrés severa y perjudicial para la salud, de los síntomas más críticos y frecuentes requiere intervención inmediata en el marco de un sistema de vigilancia epidemiológico; asimismo, es imperativo identificar los factores de riesgo psicosocial intra y extralaboral que pudieran tener relación con los efectos identificados.`}</p>
      </div>
    );
  }
