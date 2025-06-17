import React, { useState, useEffect } from "react";
import Consentimiento from "./components/Consentimiento";
import FormSelector from "./components/FormSelector";
import FichaDatosGenerales from "./components/FichaDatosGenerales";
import BloquesDePreguntas from "./components/BloquesDePreguntas";
import DashboardResultados from "./components/DashboardResultados";
import Login from "./components/Login";
import {
  bloquesFormaA,
  bloquesFormaB,
  preguntasA,
  preguntasB,
  preguntasExtralaboral,
  preguntasEstres,
  bloqueExtralaboral,
  bloqueEstres
} from "./data/preguntas";
import { calcularEstres } from "./utils/calcularEstres";
import { calcularExtralaboral } from "./utils/calcularExtralaboral";
import { calcularFormaA } from "./utils/calcularFormaA";
import { calcularFormaB } from "./utils/calcularFormaB";

type RolUsuario = "ninguno" | "psicologa" | "dueno";

export default function App() {
  const [step, setStep] = useState<
    "inicio" |
    "consent" |
    "selector" |
    "ficha" |
    "bloques" |
    "extralaboral" |
    "estres" |
    "final" |
    "dashboard" |
    "login"
  >("inicio");

  const [formType, setFormType] = useState<"A" | "B" | null>(null);
  const [ficha, setFicha] = useState<any>(null);

  const empresasIniciales = ["Sonria", "Aeropuerto El Dorado"];

  // Para guardar todas las respuestas por sección
  const [respuestas, setRespuestas] = useState<any>({});
  // Para guardar los resultados de cada test
  const [resultadoEstres, setResultadoEstres] = useState<any>(null);
  const [resultadoExtralaboral, setResultadoExtralaboral] = useState<any>(null);
  const [resultadoFormaA, setResultadoFormaA] = useState<any>(null);
  const [resultadoFormaB, setResultadoFormaB] = useState<any>(null);

  // Manejo de login (muy básico)
  const [rol, setRol] = useState<RolUsuario>("ninguno");

  // Cuando finaliza la encuesta (luego del bloque de estrés)
  useEffect(() => {
    if (step === "final") {
      // Calcula resultados por formulario
      let resultadoForma = null;
      if (formType === "A" && respuestas.bloques) {
        resultadoForma = calcularFormaA(Object.values(respuestas.bloques));
        setResultadoFormaA(resultadoForma);
      } else if (formType === "B" && respuestas.bloques) {
        resultadoForma = calcularFormaB(Object.values(respuestas.bloques));
        setResultadoFormaB(resultadoForma);
      }

      // Guarda todo lo que quieras conservar
      const data = {
        ficha,
        respuestas,
        resultadoFormaA: formType === "A" ? resultadoForma : undefined,
        resultadoFormaB: formType === "B" ? resultadoForma : undefined,
        resultadoEstres,
        resultadoExtralaboral,
        tipo: formType,
        fecha: new Date().toISOString()
      };
      // Guarda un array con push (no sobreescribe)
      const prev = JSON.parse(localStorage.getItem("resultadosCogent") || "[]");
      localStorage.setItem("resultadosCogent", JSON.stringify([...prev, data]));
    }
  }, [step, ficha, respuestas, resultadoEstres, resultadoExtralaboral, formType]);

  // Vista Home
  if (step === "inicio") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-50">
        <h1 className="text-3xl font-bold mb-4 text-cogent-blue">COGENT - Evaluación Psicosocial</h1>
        <button
          className="bg-cogent-blue text-white font-bold px-6 py-3 rounded-xl shadow hover:bg-cogent-sky mb-2"
          onClick={() => setStep("consent")}
        >
          Iniciar nueva encuesta
        </button>
        <button
          className="bg-cogent-gray text-cogent-blue font-bold px-6 py-3 rounded-xl shadow hover:bg-cogent-blue/10"
          onClick={() => setStep("login")}
        >
          Ver resultados
        </button>
      </div>
    );
  }

  // Vista Login
  if (step === "login") {
    return (
      <Login
        onLogin={(nuevoRol) => {
          setRol(nuevoRol as RolUsuario);
          setStep("dashboard");
        }}
        onCancel={() => setStep("inicio")}
      />
    );
  }

  // Vista Dashboard
  if (step === "dashboard") {
    return (
      <DashboardResultados
        soloGenerales={rol === "dueno"}
        onBack={() => setStep("inicio")}
      />
    );
  }

  // Flujo de encuesta
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {step === "consent" && (
        <Consentimiento onAceptar={() => setStep("selector")} />
      )}
      {step === "selector" && (
        <FormSelector
          onSelect={(form) => {
            setFormType(form);
            setStep("ficha");
          }}
        />
      )}
      {step === "ficha" && (
        <FichaDatosGenerales
          empresasIniciales={empresasIniciales}
          onGuardar={(datos) => {
            setFicha(datos);
            setStep("bloques");
          }}
        />
      )}
      {step === "bloques" && (
        <BloquesDePreguntas
          bloques={formType === "A" ? bloquesFormaA : bloquesFormaB}
          preguntas={formType === "A" ? preguntasA : preguntasB}
          onFinish={(respuestasBloques) => {
            setRespuestas((prev: any) => ({ ...prev, bloques: respuestasBloques }));
            setStep("extralaboral");
          }}
        />
      )}
      {step === "extralaboral" && (
        <BloquesDePreguntas
          bloques={bloqueExtralaboral}
          preguntas={preguntasExtralaboral}
          onFinish={(respuestasExtra) => {
            const resultado = calcularExtralaboral(
              Object.values(respuestasExtra),
              formType as "A" | "B"
            );
            setResultadoExtralaboral(resultado);
            setRespuestas((prev: any) => ({
              ...prev,
              extralaboral: respuestasExtra,
              resultadoExtralaboral: resultado
            }));
            setStep("estres");
          }}
        />
      )}
      {step === "estres" && (
        <BloquesDePreguntas
          bloques={bloqueEstres}
          preguntas={preguntasEstres}
          onFinish={(respuestasEstres) => {
            const resultado = calcularEstres(
              Object.values(respuestasEstres),
              formType as "A" | "B"
            );
            setResultadoEstres(resultado);
            setRespuestas((prev: any) => ({
              ...prev,
              estres: respuestasEstres,
              resultadoEstres: resultado
            }));
            setStep("final");
          }}
        />
      )}
      {step === "final" && (
        <div className="p-8 bg-white rounded-xl shadow-md text-cogent-navy font-bold text-2xl">
          ¡Encuesta completada!<br />
          Gracias por tu participación.
        </div>
      )}
    </div>
  );
}
