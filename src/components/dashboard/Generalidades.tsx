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
        <ZoomableImage src="/MAPA1.png" alt="MAPA 1" />
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
        <ZoomableImage src="/MAPA2.png" alt="MAPA 2" />
        <ZoomableImage src="/MAPA3.png" alt="MAPA 3" />
        <ZoomableImage src="/MAPA4.png" alt="MAPA 4" />
        <ZoomableImage src="/MAPA5.png" alt="MAPA 5" />
        <ZoomableImage src="/MAPA6.png" alt="MAPA 6" />
      </div>
      <h3 className="font-semibold">Condiciones Extralaborales</h3>
      <p>{`Estas condiciones se refieren a los aspectos externos al ámbito laboral y que también ejercen
influencia en el bienestar del trabajador. Esto engloba el entorno familiar, social y económico, así
como factores como las condiciones del lugar de residencia y la vivienda en sí.`}</p>
      <p>{`Dentro de la batería de instrumentos, se consideran 7 dimensiones relacionadas con estos aspectos
externos, las cuales se detallan a continuación:`}</p>
    </div>
  );
}
