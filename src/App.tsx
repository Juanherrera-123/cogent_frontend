import React, { useState, useEffect } from "react";
import Consentimiento from "./components/Consentimiento";
import FormSelector from "./components/FormSelector";
import FichaDatosGenerales from "./components/FichaDatosGenerales";
import BloquesDePreguntas from "./components/BloquesDePreguntas";
import DashboardResultados from "./components/DashboardResultados";
import Login from "./components/Login";
import credencialesBase from "./config/credentials.json";
import logoTexto from "./logo_texto.png";
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
import { calcularGlobalAExtrala, calcularGlobalBExtrala } from "./utils/calcularGlobalA";

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

  const [empresasIniciales, setEmpresasIniciales] = useState<string[]>(() => {
    const guardadas = JSON.parse(localStorage.getItem("empresasCogent") || "[]");
    return guardadas.length ? guardadas : ["Sonria", "Aeropuerto El Dorado"];
  });
  const [credenciales, setCredenciales] = useState<any[]>(() => {
    const extras = JSON.parse(localStorage.getItem("credencialesCogent") || "[]");
    return [...credencialesBase, ...extras];
  });

  // Para guardar todas las respuestas por sección
  const [respuestas, setRespuestas] = useState<any>({});
  // Para guardar los resultados de cada test
  const [resultadoEstres, setResultadoEstres] = useState<any>(null);
  const [resultadoExtralaboral, setResultadoExtralaboral] = useState<any>(null);
  const [resultadoFormaA, setResultadoFormaA] = useState<any>(null);
  const [resultadoFormaB, setResultadoFormaB] = useState<any>(null);
  const [resultadoGlobalAExtra, setResultadoGlobalAExtra] = useState<any>(null);
  const [resultadoGlobalBExtra, setResultadoGlobalBExtra] = useState<any>(null);

  // Manejo de login (muy básico)
  const [rol, setRol] = useState<RolUsuario>("ninguno");

  const agregarEmpresa = (
    nombre: string,
    usuario: string,
    password: string
  ) => {
    const nuevasEmpresas = [...empresasIniciales, nombre];
    setEmpresasIniciales(nuevasEmpresas);
    localStorage.setItem("empresasCogent", JSON.stringify(nuevasEmpresas));

    const extras = JSON.parse(localStorage.getItem("credencialesCogent") || "[]");
    extras.push({ usuario, password, rol: "dueno", empresa: nombre });
    localStorage.setItem("credencialesCogent", JSON.stringify(extras));
    setCredenciales([...credencialesBase, ...extras]);
  };

  // Cuando finaliza la encuesta (luego del bloque de estrés)
  useEffect(() => {
    if (step === "final") {
      // Calcula resultados por formulario
      let resultadoForma = null;
      let resultadoGlobal = null;
      if (formType === "A" && respuestas.bloques) {
        const arr = Array.from({ length: preguntasA.length }, (_, i) =>
          respuestas.bloques[i] ?? ""
        );
        resultadoForma = calcularFormaA(arr);
        setResultadoFormaA(resultadoForma);
        if (resultadoExtralaboral) {
          resultadoGlobal = calcularGlobalAExtrala(
            resultadoForma.total.suma,
            resultadoExtralaboral.puntajeBrutoTotal
          );
          setResultadoGlobalAExtra(resultadoGlobal);
        }
      } else if (formType === "B" && respuestas.bloques) {
        const arr = Array.from({ length: preguntasB.length }, (_, i) =>
          respuestas.bloques[i] ?? ""
        );
        resultadoForma = calcularFormaB(arr);
        setResultadoFormaB(resultadoForma);
        if (resultadoExtralaboral) {
          resultadoGlobal = calcularGlobalBExtrala(
            resultadoForma.total.suma,
            resultadoExtralaboral.puntajeBrutoTotal
          );
          setResultadoGlobalBExtra(resultadoGlobal);
        }
      }

      // Guarda todo lo que quieras conservar
      const data = {
        ficha,
        respuestas,
        resultadoFormaA: formType === "A" ? resultadoForma : undefined,
        resultadoFormaB: formType === "B" ? resultadoForma : undefined,
        resultadoGlobalAExtralaboral: formType === "A" ? resultadoGlobal : undefined,
        resultadoGlobalBExtralaboral: formType === "B" ? resultadoGlobal : undefined,
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
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-[var(--background-main)]">
        <img src={logoTexto} alt="COGENT" className="w-60 mb-2" />
        <button
          className="bg-primary-main text-white font-bold px-6 py-3 rounded-xl shadow hover:bg-primary-light mb-2"
          onClick={() => setStep("consent")}
        >
          Iniciar nueva encuesta
        </button>
        <button

          className="bg-cogent-gray text-primary-main font-bold px-6 py-3 rounded-xl shadow hover:bg-primary-main/10"

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
        usuarios={credenciales}
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
        empresas={empresasIniciales}
        credenciales={credenciales.filter((c) => c.rol === "dueno")}
        onAgregarEmpresa={agregarEmpresa}
        onBack={() => setStep("inicio")}
      />
    );
  }

  // Flujo de encuesta
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background-main)]">
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
            const ordered = Array.from(
              { length: formType === "A" ? preguntasA.length : preguntasB.length },
              (_, i) => respuestasBloques[i] ?? ""
            );
            setRespuestas((prev: any) => ({ ...prev, bloques: ordered }));
            setStep("extralaboral");
          }}
        />
      )}
      {step === "extralaboral" && (
        <BloquesDePreguntas
          bloques={bloqueExtralaboral}
          preguntas={preguntasExtralaboral}
          onFinish={(respuestasExtra) => {
            const ordered = Array.from(
              { length: preguntasExtralaboral.length },
              (_, i) => respuestasExtra[i] ?? ""
            );
            const resultado = calcularExtralaboral(
              ordered,
              formType as "A" | "B"
            );
            setResultadoExtralaboral(resultado);
            setRespuestas((prev: any) => ({
              ...prev,
              extralaboral: ordered,
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
            const ordered = Array.from(
              { length: preguntasEstres.length },
              (_, i) => respuestasEstres[i] ?? ""
            );
            const resultado = calcularEstres(
              ordered,
              formType as "A" | "B"
            );
            setResultadoEstres(resultado);
            setRespuestas((prev: any) => ({
              ...prev,
              estres: ordered,
              resultadoEstres: resultado
            }));
            setStep("final");
          }}
        />
      )}
      {step === "final" && (

        <div className="p-8 bg-white rounded-xl shadow-md text-text-main font-bold text-2xl flex flex-col items-center gap-4">

          <div>
            ¡Encuesta completada!<br />
            Gracias por tu participación.
          </div>
          <button
            className="bg-primary-main text-white px-6 py-2 rounded-lg shadow hover:bg-primary-light text-base"
            onClick={() => setStep("inicio")}
          >
            Volver al inicio
          </button>
        </div>
      )}
    </div>
  );
}
