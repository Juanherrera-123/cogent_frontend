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

export default function Metodologia() {
  const fromPublic = (name: string) => `${import.meta.env.BASE_URL}${name}`;
  return (
    <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed space-y-4">
      <p>
        Se llevó a cabo la aplicación de la Batería para la evaluación de factores de
        riesgo psicosocial, elaborada por Ministerio de la Protección Social y la
        Pontificia Universidad Javeriana (2010).
      </p>
      <p className="italic text-center">
        Tabla 3. Ficha técnica batería para la evaluación de factores de riesgo psicosocial.
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold align-top">
                Nombre
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Batería para la evaluación de factores de riesgo psicosocial
                (intralaboral y extralaboral).
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold align-top">
                Fecha
              </td>
              <td className="border border-gray-300 px-4 py-2">Julio de 2010.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold align-top">
                Autores
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Ministerio de la Protección Social. Pontificia Universidad Javeriana,
                Subcentro de Seguridad Social y Riesgos Profesionales.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold align-top">
                Instrumentos
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Ficha de datos generales</li>
                  <li>Cuestionario de factores de riesgo psicosocial intralaboral (forma A).</li>
                  <li>Cuestionario de factores de riesgo psicosocial intralaboral (forma B).</li>
                  <li>Cuestionario de factores de riesgo psicosocial extralaboral.</li>
                  <li>Guía para el análisis psicosocial de puestos de trabajo.</li>
                  <li>
                    Guía de entrevistas semiestructuradas para la evaluación de factores
                    de riesgo psicosocial intralaboral.
                  </li>
                  <li>
                    Guía de grupos focales para la evaluación de factores de riesgo
                    psicosocial intralaboral.
                  </li>
                  <li>
                    Cuestionario para la evaluación del estrés (Villalobos 1996, 2005 y
                    2010).
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold align-top">
                Población
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Trabajadores afiliados al Sistema General de Riesgos Profesionales en
                Colombia.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold align-top">
                Objetivo
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Identificar y evaluar los factores de riesgo psicosocial intra y
                extralaboral en población laboralmente activa.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="italic text-sm">
        Fuente: Batería de instrumentos para la evaluación de factores de riesgo
        psicosocial (Ministerio de Protección Social, 2010).
      </p>
      <p>
        Los instrumentos diseñados para responder al alcance de la bateria
        comprenden:
      </p>
      <p>
        Tres cuestionarios para la evaluación de factores de riesgo psicosocial, que
        aportan datos cuantitativos con una interpretación cualitativa. Dos de los
        cuestionarios evalúan factores de riesgo psicosocial Intralaboral (formas A y B)
        que se diferencian por la población objetivo de los mismos; y un cuestionario
        para evaluar factores de riesgo psicosocial extralaboral; Tres instrumentos
        cualitativos con interpretación Cuali-Cuantitativa: guía para el Análisis
        psicosocial de puestos de trabajo; guía para entrevistas semiestructuradas; y
        guía para grupos focales.
      </p>
      <p>
        Trascendiendo el alcance definido para la batería, los autores de la misma
        aportan dos elementos adicionales con el fin de dar un valor agregado a los
        usuarios de la misma. Tales elementos son:
      </p>
      <ol className="list-[lower-alpha] pl-5 space-y-1">
        <li>
          <p>
            Cuestionario para la evaluación del estrés. Construido por Villalobos
            para el Ministerio de Trabajo y Seguridad Social (1996) y
            posteriormente adaptado y validado en población trabajadora de
            Colombia (Villalobos, 2005 y 2010).
          </p>
          <p>
            Este cuestionario se utilizó para determinar la validez concurrente de
            los nuevos cuestionarios de factores psicosociales y los indicadores
            psicométricos se mantuvieron altos y estables.
          </p>
        </li>
        <li>
          Aplicativo básico para captura de datos, el cual se desarrolló dado que
          los cuestionarios de factores de riesgo psicosocial y de estrés permiten
          obtener información cuantitativa y que la misma implica un procesamiento
          de los datos para obtener el resultado final por dependencias.
        </li>
      </ol>
      <div className="flex justify-center">
        <ZoomableImage src={fromPublic("FIGURA 1.png")} alt="FIGURA 1" />
      </div>
      <div className="flex justify-center">
        <ZoomableImage src={fromPublic("FIGURA 2.png")} alt="FIGURA 2" />
      </div>
    </div>
  );
}

