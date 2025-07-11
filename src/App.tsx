import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import Consentimiento from "./components/Consentimiento";
import FormSelector from "./components/FormSelector";
import FichaDatosGenerales from "./components/FichaDatosGenerales";
import BloquesDePreguntas from "./components/BloquesDePreguntas";
import DashboardResultados from "./components/DashboardResultados";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import PoliticaPrivacidad from "./components/PoliticaPrivacidad";
import TerminosCondiciones from "./components/TerminosCondiciones";
import RhomboidBackground from "./components/RhomboidBackground";
import {
  CredencialEmpresa,
  FichaDatosGenerales as FichaDatos,
  SurveyResponses,
  IntralaboralResultado,
  ExtralaboralResultado,
  EstresResultado,
  GlobalResultado,
} from "./types";
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
import removeUndefined from "./utils/removeUndefined";
import { demoCredencialesConst } from "./data/demoCredenciales";

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
    "login" |
    "privacy" |
    "terms"
  >("inicio");

  const [formType, setFormType] = useState<"A" | "B" | null>(null);
  const [ficha, setFicha] = useState<FichaDatos | null>(null);

  const demoCredenciales: (CredencialEmpresa & { rol: string })[] = JSON.parse(
    import.meta.env.VITE_DEMO_CREDENTIALS ||
      JSON.stringify(demoCredencialesConst)
  );

  const [credenciales, setCredenciales] = useState<
    (CredencialEmpresa & { rol: string; id?: string })[]
  >(demoCredenciales);
  const [empresasIniciales, setEmpresasIniciales] = useState<string[]>(() =>
    demoCredenciales
      .filter((c) => c.rol === "dueno" && c.empresa)
      .map((c) => c.empresa!)
  );

  useEffect(() => {
    const cargarCreds = async () => {
      const snap = await getDocs(collection(db, "credencialesCogent"));
      const extras = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as CredencialEmpresa & { rol: string }),
      }));
      setCredenciales((prev) => {
        const merged = [...prev];
        extras.forEach((c) => {
          if (!merged.some((m) => m.usuario === c.usuario)) {
            merged.push(c);
          }
        });
        return merged;
      });
    };
    cargarCreds();
  }, []);

  useEffect(() => {
    const empresas = Array.from(
      new Set(
        credenciales
          .filter((c) => c.rol === "dueno" && c.empresa)
          .map((c) => c.empresa as string)
      )
    );
    setEmpresasIniciales(empresas);
  }, [credenciales]);

  // Para guardar todas las respuestas por sección
  const [respuestas, setRespuestas] = useState<SurveyResponses>({});
  // Para guardar los resultados de cada test
  const [resultadoEstres, setResultadoEstres] = useState<EstresResultado | null>(null);
  const [resultadoExtralaboral, setResultadoExtralaboral] = useState<ExtralaboralResultado | null>(null);
  const [resultadoFormaA, setResultadoFormaA] = useState<IntralaboralResultado | null>(null);
  const [resultadoFormaB, setResultadoFormaB] = useState<IntralaboralResultado | null>(null);
  const [resultadoGlobalAExtra, setResultadoGlobalAExtra] = useState<GlobalResultado | null>(null);
  const [resultadoGlobalBExtra, setResultadoGlobalBExtra] = useState<GlobalResultado | null>(null);

  // Manejo de login (muy básico)
  const [rol, setRol] = useState<RolUsuario>("ninguno");
  const [empresaActual, setEmpresaActual] = useState<string | null>(null);

  const agregarEmpresa = async (
    nombre: string,
    usuario: string,
    password: string
  ): Promise<boolean> => {
    try {
      const docRef = await addDoc(collection(db, "credencialesCogent"), {
        usuario,
        password,
        rol: "dueno",
        empresa: nombre,
      });
      setCredenciales((prev) => [
        ...prev,
        { id: docRef.id, usuario, password, rol: "dueno", empresa: nombre },
      ]);
      return true;
    } catch (err) {
      console.error("Error al agregar empresa", err);
      alert("No se pudo agregar la empresa");
      return false;
    }
  };

  const eliminarEmpresa = async (usuario: string): Promise<boolean> => {
    const cred = credenciales.find((c) => c.usuario === usuario);
    if (!cred?.id) return false;
    try {
      await deleteDoc(doc(db, "credencialesCogent", cred.id));
      setCredenciales((prev) => prev.filter((c) => c.usuario !== usuario));
      return true;
    } catch (err) {
      console.error("Error al eliminar empresa", err);
      alert("No se pudo eliminar la empresa");
      return false;
    }
  };

  const editarEmpresa = async (
    originalUsuario: string,
    nombre: string,
    usuario: string,
    password: string
  ): Promise<boolean> => {
    const cred = credenciales.find((c) => c.usuario === originalUsuario);
    if (!cred?.id) return false;
    try {
      await updateDoc(doc(db, "credencialesCogent", cred.id), {
        usuario,
        password,
        empresa: nombre,
      });
      setCredenciales((prev) =>
        prev.map((c) =>
          c.usuario === originalUsuario
            ? { ...c, usuario, password, empresa: nombre }
            : c
        )
      );
      return true;
    } catch (err) {
      console.error("Error al editar empresa", err);
      alert("No se pudo editar la empresa");
      return false;
    }
  };

  // Cuando finaliza la encuesta (luego del bloque de estrés)
  useEffect(() => {
    const guardar = async () => {
      if (step === "final") {
        // Calcula resultados por formulario
        let resultadoForma = null;
        let resultadoGlobal = null;
      if (formType === "A" && respuestas.bloques) {
        const arr = Array.from({ length: preguntasA.length }, (_, i) =>
          respuestas.bloques?.[i] ?? ""
        );
        resultadoForma = calcularFormaA(arr);
        setResultadoFormaA(resultadoForma);
        if (resultadoExtralaboral) {
          resultadoGlobal = calcularGlobalAExtrala(
            resultadoForma?.total?.suma ?? 0,
            resultadoExtralaboral.puntajeBrutoTotal ?? 0
          );
          setResultadoGlobalAExtra(resultadoGlobal);
        }
      } else if (formType === "B" && respuestas.bloques) {
        const arr = Array.from({ length: preguntasB.length }, (_, i) =>
          respuestas.bloques?.[i] ?? ""
        );
        resultadoForma = calcularFormaB(arr);
        setResultadoFormaB(resultadoForma);
        if (resultadoExtralaboral) {
          resultadoGlobal = calcularGlobalBExtrala(
            resultadoForma?.total?.suma ?? 0,
            resultadoExtralaboral.puntajeBrutoTotal ?? 0
          );
          setResultadoGlobalBExtra(resultadoGlobal);
        }
      }

        // Guarda todo lo que quieras conservar
        const data: any = {
          ficha,
          respuestas,
          resultadoEstres,
          resultadoExtralaboral,
          tipo: formType,
          fecha: ficha?.fecha || new Date().toISOString(),
        };
        if (formType === "A") {
          data.resultadoFormaA = resultadoForma;
          data.resultadoGlobalAExtralaboral = resultadoGlobal;
        }
        if (formType === "B") {
          data.resultadoFormaB = resultadoForma;
          data.resultadoGlobalBExtralaboral = resultadoGlobal;
        }
        // Limpia datos y guarda en Firestore
        const cleanData = removeUndefined(data);
        try {
          await addDoc(collection(db, "resultadosCogent"), cleanData);
        } catch (err) {
          console.error("Error al guardar resultados", err);
          alert("No se pudieron guardar los resultados");
        }
      }
    };
    guardar();
  }, [step, ficha, respuestas, resultadoEstres, resultadoExtralaboral, formType]);

  let content: React.ReactNode;

  if (step === "inicio") {
    content = (
      <HomePage
        onStartSurvey={() => setStep("consent")}
        onViewResults={() => setStep("login")}
        onPrivacy={() => setStep("privacy")}
        onTerms={() => setStep("terms")}
      />
    );
  } else if (step === "privacy") {
    content = <PoliticaPrivacidad onBack={() => setStep("inicio")} />;
  } else if (step === "terms") {
    content = <TerminosCondiciones onBack={() => setStep("inicio")} />;
  } else if (step === "login") {
    content = (
      <Login
        usuarios={credenciales}
        onLogin={(nuevoRol, empresa) => {
          setRol(nuevoRol as RolUsuario);
          setEmpresaActual(empresa || null);
          setStep("dashboard");
        }}
        onCancel={() => setStep("inicio")}
      />
    );
  } else if (step === "dashboard") {
    content = (
      <DashboardResultados
        rol={rol as "psicologa" | "dueno"}
        empresaNombre={empresaActual || undefined}
        empresaFiltro={rol === "dueno" ? empresaActual || undefined : undefined}
        soloGenerales={rol === "dueno"}
        credenciales={credenciales.filter((c) => c.rol === "dueno")}
        onAgregarEmpresa={agregarEmpresa}
        onEliminarEmpresa={eliminarEmpresa}
        onEditarEmpresa={editarEmpresa}
        onBack={() => setStep("inicio")}
      />
    );
  } else {
    content = (
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
              setRespuestas((prev) => ({ ...prev, bloques: ordered }));
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
              setRespuestas((prev) => ({
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
              setRespuestas((prev) => ({
                ...prev,
                estres: ordered,
                resultadoEstres: resultado
              }));
              setStep("final");
            }}
          />
        )}
        {step === "final" && (
          <div className="p-8 bg-white rounded-xl shadow-md text-[var(--text-main)] font-bold text-2xl flex flex-col items-center gap-4">
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

  return (
    <>
      <RhomboidBackground />
      {content}
    </>
  );
}
