import React, { useState } from "react";

type Props = {
  empresasIniciales: string[];
  onGuardar: (datos: any) => void;
};

const estadosCiviles = [
  "Soltero (a)", "Casado (a)", "Unión libre", "Separado (a)",
  "Divorciado (a)", "Viudo (a)", "Sacerdote/monje"
];
const nivelesEstudio = [
  "Ninguno", "Primaria incompleta", "Primaria completa", "Bachillerato incompleto",
  "Bachillerato completo", "Técnico/Tecnológico incompleto", "Técnico/Tecnológico completo",
  "Profesional incompleto", "Profesional completo", "Carrera militar/policía",
  "Post-grado incompleto", "Post-grado completo"
];
const estratos = ["1", "2", "3", "4", "5", "6", "Finca", "No sé"];
const tipoVivienda = ["Propia", "En arriendo", "Familiar"];
const tipoCargo = [
  "Jefatura - tiene personal a cargo",
  "Profesional - analista - técnico - tecnólogo",
  "Auxiliar - asistente administrativo/técnico",
  "Operario - Operador - Ayudante - Servicios generales"
];
const tipoContrato = [
  "Temporal de menos de 1 año", "Temporal de 1 año o más",
  "Término indefinido", "Cooperado/cooperativa",
  "Prestación de servicios", "No sé"
];
const tipoSalario = [
  "Fijo (diario/semanal/quincenal/mensual)",
  "Una parte fija y otra variable",
  "Todo variable (a destajo/por producción/por comisión)"
];

export default function FichaDatosGenerales({ empresasIniciales, onGuardar }: Props) {
  const empresas = empresasIniciales;
  const [empresa, setEmpresa] = useState("");

  const [datos, setDatos] = useState<any>({
    nombre: "",
    cedula: "",
    sexo: "",
    nacimiento: "",
    estadoCivil: "",
    estudios: "",
    ocupacion: "",
    residenciaCiudad: "",
    residenciaDepto: "",
    estrato: "",
    vivienda: "",
    dependientes: "",
    trabajoCiudad: "",
    trabajoDepto: "",
    aniosEmpresa: "",
    menosAnioEmpresa: false,
    cargo: "",
    tipoCargo: "",
    aniosCargo: "",
    menosAnioCargo: false,
    area: "",
    tipoContrato: "",
    horasDiarias: "",
    tipoSalario: ""
  });

  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setDatos({ ...datos, [name]: checked, ...(name === "menosAnioEmpresa" && checked ? { aniosEmpresa: "" } : {}), ...(name === "menosAnioCargo" && checked ? { aniosCargo: "" } : {}) });
    } else {
      setDatos({ ...datos, [name]: value });
    }
    if (name === "empresa") setEmpresa(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validación simple: campos obligatorios principales
    if (!empresa || !datos.nombre || !datos.cedula || !datos.sexo || !datos.nacimiento ||
        !datos.estadoCivil || !datos.estudios || !datos.ocupacion ||
        !datos.residenciaCiudad || !datos.residenciaDepto || !datos.estrato || !datos.vivienda ||
        !datos.trabajoCiudad || !datos.trabajoDepto || !datos.cargo || !datos.tipoCargo ||
        !datos.area || !datos.tipoContrato || !datos.horasDiarias || !datos.tipoSalario) {
      setError("Por favor complete todos los campos obligatorios.");
      return;
    }
    // Validar años en empresa/cargo si corresponde
    if (!datos.menosAnioEmpresa && !datos.aniosEmpresa) {
      setError("Indique los años en la empresa o marque la opción correspondiente.");
      return;
    }
    if (!datos.menosAnioCargo && !datos.aniosCargo) {
      setError("Indique los años en el cargo o marque la opción correspondiente.");
      return;
    }
    setError("");
    onGuardar({ ...datos, empresa });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F4F8FA] to-[#FFFFFF] relative overflow-hidden px-2">
      <svg
        className="absolute left-0 top-0 opacity-10 w-[320px] h-[320px] -z-10"
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="160" cy="160" r="140" fill="url(#grad1)" />
        <defs>
          <linearGradient id="grad1" x1="60" y1="30" x2="260" y2="260" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2EC4FF" />
            <stop offset="1" stopColor="#005DFF" />
          </linearGradient>
        </defs>
      </svg>

      <form

        className="bg-white rounded-3xl shadow-xl p-8 md:p-12 w-full max-w-2xl mx-auto animate-fadeIn flex flex-col gap-4"

        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-[#132045] text-center mb-2 font-montserrat">
          Ficha de Datos Generales
        </h2>
      {/* Empresa */}
      <div>
        <label className="block mb-1 font-semibold text-text-main">Empresa*</label>
        <select
          className="input mb-2"
          value={empresa}
          name="empresa"
          onChange={(e) => {
            setEmpresa(e.target.value);
            setDatos({ ...datos, empresa: e.target.value });
          }}
        >
          <option value="">Seleccione una empresa</option>
          {empresas.map((em, i) => (
            <option key={i} value={em}>{em}</option>
          ))}
        </select>
      </div>
      {/* Nombre y cédula */}
      <div className="flex gap-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo*"
          className="input flex-1"
          value={datos.nombre}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cedula"
          placeholder="Cédula/Documento*"
          className="input flex-1"
          value={datos.cedula}
          onChange={handleChange}
        />
      </div>
      {/* Sexo y año de nacimiento */}
      <div className="flex gap-4">
        <select
          name="sexo"
          className="input flex-1"
          value={datos.sexo}
          onChange={handleChange}
        >
          <option value="">Sexo biológico*</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>
        <input
          type="number"
          name="nacimiento"
          placeholder="Año de nacimiento*"
          className="input flex-1"
          value={datos.nacimiento}
          onChange={handleChange}
          min={1900}
          max={2100}
        />
      </div>
      {/* Estado civil y estudios */}
      <div className="flex gap-4">
        <select
          name="estadoCivil"
          className="input flex-1"
          value={datos.estadoCivil}
          onChange={handleChange}
        >
          <option value="">Estado civil*</option>
          {estadosCiviles.map((ec, i) => (
            <option key={i} value={ec}>{ec}</option>
          ))}
        </select>
        <select
          name="estudios"
          className="input flex-1"
          value={datos.estudios}
          onChange={handleChange}
        >
          <option value="">Nivel de estudios*</option>
          {nivelesEstudio.map((ne, i) => (
            <option key={i} value={ne}>{ne}</option>
          ))}
        </select>
      </div>
      {/* Ocupación */}
      <input
        type="text"
        name="ocupacion"
        placeholder="Ocupación o profesión*"
        className="input"
        value={datos.ocupacion}
        onChange={handleChange}
      />
      {/* Lugar de residencia */}
      <div className="flex gap-4">
        <input
          type="text"
          name="residenciaCiudad"
          placeholder="Ciudad/Municipio residencia*"
          className="input flex-1"
          value={datos.residenciaCiudad}
          onChange={handleChange}
        />
        <input
          type="text"
          name="residenciaDepto"
          placeholder="Departamento residencia*"
          className="input flex-1"
          value={datos.residenciaDepto}
          onChange={handleChange}
        />
      </div>
      {/* Estrato y tipo de vivienda */}
      <div className="flex gap-4">
        <select
          name="estrato"
          className="input flex-1"
          value={datos.estrato}
          onChange={handleChange}
        >
          <option value="">Estrato*</option>
          {estratos.map((e, i) => (
            <option key={i} value={e}>{e}</option>
          ))}
        </select>
        <select
          name="vivienda"
          className="input flex-1"
          value={datos.vivienda}
          onChange={handleChange}
        >
          <option value="">Tipo de vivienda*</option>
          {tipoVivienda.map((tv, i) => (
            <option key={i} value={tv}>{tv}</option>
          ))}
        </select>
      </div>
      {/* Nº dependientes */}
      <input
        type="number"
        name="dependientes"
        placeholder="Nº de personas que dependen de usted*"
        className="input"
        value={datos.dependientes}
        onChange={handleChange}
        min={0}
        max={99}
      />
      {/* Lugar de trabajo */}
      <div className="flex gap-4">
        <input
          type="text"
          name="trabajoCiudad"
          placeholder="Ciudad/Municipio trabajo*"
          className="input flex-1"
          value={datos.trabajoCiudad}
          onChange={handleChange}
        />
        <input
          type="text"
          name="trabajoDepto"
          placeholder="Departamento trabajo*"
          className="input flex-1"
          value={datos.trabajoDepto}
          onChange={handleChange}
        />
      </div>
      {/* Años en empresa */}
      <div className="flex gap-4 items-center">
        <input
          type="checkbox"
          name="menosAnioEmpresa"
          checked={datos.menosAnioEmpresa}
          onChange={handleChange}
        />
        <label className="text-sm">¿Menos de un año en la empresa?</label>
        {!datos.menosAnioEmpresa && (
          <input
            type="number"
            name="aniosEmpresa"
            placeholder="¿Cuántos años en la empresa?*"
            className="input flex-1"
            value={datos.aniosEmpresa}
            onChange={handleChange}
            min={1}
            max={99}
          />
        )}
      </div>
      {/* Cargo y tipo de cargo */}
      <div className="flex gap-4">
        <input
          type="text"
          name="cargo"
          placeholder="Nombre del cargo*"
          className="input flex-1"
          value={datos.cargo}
          onChange={handleChange}
        />
        <select
          name="tipoCargo"
          className="input flex-1"
          value={datos.tipoCargo}
          onChange={handleChange}
        >
          <option value="">Tipo de cargo*</option>
          {tipoCargo.map((tc, i) => (
            <option key={i} value={tc}>{tc}</option>
          ))}
        </select>
      </div>
      {/* Años en cargo */}
      <div className="flex gap-4 items-center">
        <input
          type="checkbox"
          name="menosAnioCargo"
          checked={datos.menosAnioCargo}
          onChange={handleChange}
        />
        <label className="text-sm">¿Menos de un año en el cargo?</label>
        {!datos.menosAnioCargo && (
          <input
            type="number"
            name="aniosCargo"
            placeholder="¿Cuántos años en el cargo?*"
            className="input flex-1"
            value={datos.aniosCargo}
            onChange={handleChange}
            min={1}
            max={99}
          />
        )}
      </div>
      {/* Área/Departamento */}
      <input
        type="text"
        name="area"
        placeholder="Nombre del área/departamento/sección*"
        className="input"
        value={datos.area}
        onChange={handleChange}
      />
      {/* Tipo de contrato y horas diarias */}
      <div className="flex gap-4">
        <select
          name="tipoContrato"
          className="input flex-1"
          value={datos.tipoContrato}
          onChange={handleChange}
        >
          <option value="">Tipo de contrato*</option>
          {tipoContrato.map((tc, i) => (
            <option key={i} value={tc}>{tc}</option>
          ))}
        </select>
        <input
          type="number"
          name="horasDiarias"
          placeholder="Horas diarias establecidas*"
          className="input flex-1"
          value={datos.horasDiarias}
          onChange={handleChange}
          min={1}
          max={24}
        />
      </div>
      {/* Tipo de salario */}
      <select
        name="tipoSalario"
        className="input"
        value={datos.tipoSalario}
        onChange={handleChange}
      >
        <option value="">Tipo de salario*</option>
        {tipoSalario.map((ts, i) => (
          <option key={i} value={ts}>{ts}</option>
        ))}
      </select>
      {/* Error y botón */}
      {error && (
        <div className="text-red-600 font-bold text-center mt-2">{error}</div>
      )}
      <button
        type="submit"
        className="w-full py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-[#2EC4FF] to-[#005DFF] shadow-lg mt-4 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2EC4FF]"
      >
        Continuar
      </button>
    </form>
    </div>
  );
}
