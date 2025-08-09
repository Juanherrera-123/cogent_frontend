import React, { useState } from "react";
import { cn } from "@/lib/utils";

type DatosConsentimiento = {
  fecha: string;
  nombre: string;
  cedula: string;
  ciudad: string;
  cargo: string;
  ccFirma: string;
};

export default function Consentimiento({ onAceptar }: { onAceptar: () => void }) {
  const [datos, setDatos] = useState<DatosConsentimiento>({
    fecha: "",
    nombre: "",
    cedula: "",
    ciudad: "",
    cargo: "",
    ccFirma: "",
  });
  const [errores, setErrores] = useState<Record<string, boolean>>({});
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
    setErrores((prev) => ({ ...prev, [name]: false }));
  };

  const handleAceptar = () => {
    const faltantes: Record<string, boolean> = {};
    const campos: Array<keyof DatosConsentimiento> = [
      "fecha",
      "nombre",
      "cedula",
      "ciudad",
      "cargo",
      "ccFirma",
    ];
    campos.forEach((campo) => {
      if (!datos[campo]) faltantes[campo] = true;
    });
    if (Object.keys(faltantes).length > 0) {
      setErrores(faltantes);
      setError("Por favor complete todos los campos obligatorios.");
      return;
    }
    setErrores({});
    setError("");
    onAceptar();
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-2">
      <div className="background-shapes">
        <div className="shape rhombus rhombus-1"></div>
        <div className="shape rhombus rhombus-2"></div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 w-full max-w-xl mx-auto animate-fadeIn flex flex-col items-center">
        <div className="flex items-center justify-center gap-6 mb-6">
          <img src="/Logo_Javeriana.png" alt="Logo Javeriana" className="h-12 w-auto object-contain" />
          <img src="/Logo_Psykhe.png" alt="Logo Psykhe" className="h-12 w-auto object-contain" />
          <img src="/logo_texto.png" alt="Logo Cogent" className="h-12 w-auto object-contain" />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-[#132045] text-center font-montserrat mb-1">
          Consentimiento Informado
        </h2>
        <div className="text-base font-semibold text-[#132045] text-center font-montserrat">
          Aplicación Batería de Riesgos Psicosociales
        </div>
        <div className="text-base font-semibold text-[#2EC4FF] mb-6 text-center font-montserrat">
          Resolución 2764 de 2022
        </div>

        <div className="text-[#313B4A] text-justify font-montserrat text-base md:text-lg leading-relaxed mb-8 space-y-4">
          <p>
            Fecha:
            <input
              type="date"
              name="fecha"
              value={datos.fecha}
              onChange={handleChange}
              className={cn(
                "border border-gray-300 bg-white rounded-xl px-4 py-2 w-40 ml-2 focus:outline-none",
                errores["fecha"] && "border-red-500"
              )}
            />
          </p>
          <p>
            Yo,
            <input
              type="text"
              name="nombre"
              value={datos.nombre}
              onChange={handleChange}
              className={cn(
                "border border-gray-300 bg-white rounded-xl px-2 py-1 w-56 mx-2 focus:outline-none",
                errores["nombre"] && "border-red-500"
              )}
            />
            identificado con cédula CC.
            <input
              type="text"
              name="cedula"
              value={datos.cedula}
              onChange={handleChange}
              className={cn(
                "border border-gray-300 bg-white rounded-xl px-2 py-1 w-40 mx-2 focus:outline-none",
                errores["cedula"] && "border-red-500"
              )}
            />
            de
            <input
              type="text"
              name="ciudad"
              value={datos.ciudad}
              onChange={handleChange}
              className={cn(
                "border border-gray-300 bg-white rounded-xl px-2 py-1 w-40 mx-2 focus:outline-none",
                errores["ciudad"] && "border-red-500"
              )}
            />
            , habiendo sido claramente informado(a) sobre los objetivos y procedimientos, acepto de manera voluntaria,
            participar en la aplicación de la Batería de Riesgo Psicosocial elaborada por el Ministerio de la Protección
            Social y la Universidad Javeriana, entendiendo que los fines de la evaluación son netamente ocupacionales, y
            que la información recolectada será analizada de manera confidencial para orientar acciones de mejoría para
            el personal de la Empresa.
          </p>
          <p>Los datos consignados en la evaluación no serán usados para afectar las condiciones contractuales.</p>
          <p>
            Los resultados individuales de la presente evaluación no serán revelados sin autorización por escrito del
            colaborador, la empresa recibirá un informe consolidado con los resultados generales para la Empresa.
          </p>
          <p>Los datos consignados en la evaluación no serán usados para afectar las condiciones contractuales.</p>
          <p>
            Dado el carácter confidencial de esta evaluación, esta información será incluida en la historia clínica de
            cada colaborador.
          </p>
          <p>
            La información de estadística generales y resultados de la evaluación será presentada al interior de la
            Empresa, garantizando la confidencialidad de los datos personales.
          </p>
            <p>
            Hago constar que el presente documento ha sido leído y entendido por mí en su integridad, de manera libre y
            espontánea.
          </p>
        </div>
          <div className="space-y-2 pt-4">
            <p>
              Cargo:
              <input
                type="text"
                name="cargo"
                value={datos.cargo}
                onChange={handleChange}
                className={cn(
                  "border border-gray-300 bg-white rounded-xl px-2 py-1 w-60 ml-2 focus:outline-none",
                  errores["cargo"] && "border-red-500"
                )}
              />
            </p>
            <p>
              C.C :
              <input
                type="text"
                name="ccFirma"
                value={datos.ccFirma}
                onChange={handleChange}
                className={cn(
                  "border border-gray-300 bg-white rounded-xl px-2 py-1 w-60 ml-2 focus:outline-none",
                  errores["ccFirma"] && "border-red-500"
                )}
              />
            </p>
          </div>
        <div className="text-xs text-center text-[#313B4A] font-montserrat mb-8 space-y-1">
          <p>Versión: 01</p>
          <p>Fecha: febrero 2023</p>
          <p>Copia controlada</p>
          <p>
            Este material es para uso exclusivo de Psykhe Consultores SST SAS. Prohibida su reproducción. Todos los
            derechos reservados®
          </p>
        </div>

        {error && (
          <div className="text-red-600 font-bold text-center mb-4">{error}</div>
        )}
        <button
          onClick={handleAceptar}
          className="w-full md:w-3/4 py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-[#2EC4FF] to-[#005DFF] shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2EC4FF]"
        >
          Acepto y deseo continuar
        </button>
      </div>
    </div>
  );
}
