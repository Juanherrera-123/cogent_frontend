import { useState, useEffect } from "react";
import RhomboidBackground from "./components/RhomboidBackground";
import HomePage from "./components/HomePage";
import PoliticaPrivacidad from "./components/PoliticaPrivacidad";
import TerminosCondiciones from "./components/TerminosCondiciones";
import Login from "./components/Login";
import DashboardResultados from "./components/DashboardResultados";
import Consentimiento from "./components/Consentimiento";
import SelectorScreen from "./components/SelectorScreen";
import FichaScreen from "./components/FichaScreen";
import BloquesScreen from "./components/BloquesScreen";
import ExtralaboralScreen from "./components/ExtralaboralScreen";
import EstresScreen from "./components/EstresScreen";
import FinalScreen from "./components/FinalScreen";
import useCredenciales from "./hooks/useCredenciales";
import useSurveySteps from "./hooks/useSurveySteps";
import { guardarResultados } from "./services/resultService";

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

  const [rol, setRol] = useState<RolUsuario>("ninguno");
  const [empresaActual, setEmpresaActual] = useState<string | null>(null);

  useEffect(() => {
    if (step === "final") {
      guardarResultados({
        ficha,
        respuestas,
        resultadoEstres,
        resultadoExtralaboral,
        formType,
      });
    }
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
