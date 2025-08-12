import { useState, useEffect } from "react";
import RhomboidBackground from "./components/RhomboidBackground";
import HomePage from "./components/HomePage";
import PoliticaPrivacidad from "./components/PoliticaPrivacidad";
import TerminosCondiciones from "./components/TerminosCondiciones";
import RhomboidBackground from "./components/RhomboidBackground";
import { handleError } from "./utils/handleError";
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
  const {
    credenciales,
    empresasIniciales,
    agregarEmpresa,
    eliminarEmpresa,
    editarEmpresa,
  } = useCredenciales();

  const {
    step,
    setStep,
    formType,
    seleccionarFormulario,
    guardarFicha,
    completarBloques,
    completarExtralaboral,
    completarEstres,
    ficha,
    respuestas,
    resultadoEstres,
    resultadoExtralaboral,
  } = useSurveySteps();

  useEffect(() => {
    const cargarCreds = async () => {
      try {
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
      } catch (err) {
        handleError(
          err,
          "Error al cargar credenciales",
          "No se pudieron cargar las credenciales"
        );
      }
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
      handleError(
        err,
        "Error al agregar empresa",
        "No se pudo agregar la empresa"
      );
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
      handleError(
        err,
        "Error al eliminar empresa",
        "No se pudo eliminar la empresa"
      );
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
      handleError(
        err,
        "Error al editar empresa",
        "No se pudo editar la empresa"
      );
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
          handleError(
            err,
            "Error al guardar resultados",
            "No se pudieron guardar los resultados"
          );
        }
      }
    };
    guardar();
  }, [step, ficha, respuestas, resultadoEstres, resultadoExtralaboral, formType]);

  const renderContent = () => {
    switch (step) {
      case "inicio":
        return (
          <HomePage
            onStartSurvey={() => setStep("consent")}
            onViewResults={() => setStep("login")}
            onPrivacy={() => setStep("privacy")}
            onTerms={() => setStep("terms")}
          />
        );
      case "privacy":
        return <PoliticaPrivacidad onBack={() => setStep("inicio")} />;
      case "terms":
        return <TerminosCondiciones onBack={() => setStep("inicio")} />;
      case "login":
        return (
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
      case "dashboard":
        return (
          <DashboardResultados
            rol={rol as "psicologa" | "dueno"}
            empresaNombre={empresaActual || undefined}
            empresaFiltro={
              rol === "dueno" ? empresaActual || undefined : undefined
            }
            soloGenerales={rol === "dueno"}
            credenciales={credenciales.filter((c) => c.rol === "dueno")}
            onAgregarEmpresa={agregarEmpresa}
            onEliminarEmpresa={eliminarEmpresa}
            onEditarEmpresa={editarEmpresa}
            onBack={() => setStep("inicio")}
          />
        );
      case "consent":
        return <Consentimiento onAceptar={() => setStep("selector")} />;
      case "selector":
        return <SelectorScreen onSelect={seleccionarFormulario} />;
      case "ficha":
        return (
          <FichaScreen
            empresasIniciales={empresasIniciales}
            onGuardar={guardarFicha}
          />
        );
      case "bloques":
        return (
          <BloquesScreen
            formType={formType as "A" | "B"}
            onFinish={completarBloques}
          />
        );
      case "extralaboral":
        return <ExtralaboralScreen onFinish={completarExtralaboral} />;
      case "estres":
        return <EstresScreen onFinish={completarEstres} />;
      case "final":
        return <FinalScreen onRestart={() => setStep("inicio")} />;
      default:
        return null;
    }
  };

  return (
    <>
      <RhomboidBackground />
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background-main)]">
        {renderContent()}
      </div>
    </>
  );
}
