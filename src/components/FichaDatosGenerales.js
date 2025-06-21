import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
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
export default function FichaDatosGenerales({ empresasIniciales, onGuardar }) {
    const empresas = empresasIniciales;
    const [empresa, setEmpresa] = useState("");
    const [datos, setDatos] = useState({
        fecha: "",
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
    const [error, setError] = useState("");
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const checked = e.target.checked;
        if (type === "checkbox") {
            setDatos({
                ...datos,
                [name]: checked,
                ...(name === "menosAnioEmpresa" && checked ? { aniosEmpresa: "" } : {}),
                ...(name === "menosAnioCargo" && checked ? { aniosCargo: "" } : {}),
            });
        }
        else {
            setDatos({ ...datos, [name]: value });
        }
        if (name === "empresa")
            setEmpresa(value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validación simple: campos obligatorios principales
        if (!empresa || !datos.fecha || !datos.nombre || !datos.cedula || !datos.sexo || !datos.nacimiento ||
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
    return (_jsxs("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F4F8FA] to-[#FFFFFF] relative overflow-hidden px-2", children: [_jsxs("svg", { className: "absolute left-0 top-0 opacity-10 w-[320px] h-[320px] -z-10", viewBox: "0 0 320 320", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("circle", { cx: "160", cy: "160", r: "140", fill: "url(#grad1)" }), _jsx("defs", { children: _jsxs("linearGradient", { id: "grad1", x1: "60", y1: "30", x2: "260", y2: "260", gradientUnits: "userSpaceOnUse", children: [_jsx("stop", { stopColor: "#2EC4FF" }), _jsx("stop", { offset: "1", stopColor: "#005DFF" })] }) })] }), _jsxs("form", { className: "bg-white rounded-3xl shadow-xl p-8 md:p-12 w-full max-w-2xl mx-auto animate-fadeIn flex flex-col gap-4", onSubmit: handleSubmit, children: [_jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#132045] text-center mb-2 font-montserrat", children: "Ficha de Datos Generales" }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1 font-semibold text-text-main", children: "Empresa*" }), _jsxs("select", { className: "input mb-2", value: empresa, name: "empresa", onChange: (e) => {
                                    setEmpresa(e.target.value);
                                    setDatos({ ...datos, empresa: e.target.value });
                                }, children: [_jsx("option", { value: "", children: "Seleccione una empresa" }), empresas.map((em, i) => (_jsx("option", { value: em, children: em }, i)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1 font-semibold text-text-main", children: "Fecha*" }), _jsx("input", { type: "date", name: "fecha", className: "input mb-2", value: datos.fecha, onChange: handleChange })] }), _jsxs("div", { className: "flex gap-4", children: [_jsx("input", { type: "text", name: "nombre", placeholder: "Nombre completo*", className: "input flex-1", value: datos.nombre, onChange: handleChange }), _jsx("input", { type: "text", name: "cedula", placeholder: "C\u00E9dula/Documento*", className: "input flex-1", value: datos.cedula, onChange: handleChange })] }), _jsxs("div", { className: "flex gap-4", children: [_jsxs("select", { name: "sexo", className: "input flex-1", value: datos.sexo, onChange: handleChange, children: [_jsx("option", { value: "", children: "Sexo biol\u00F3gico*" }), _jsx("option", { value: "Masculino", children: "Masculino" }), _jsx("option", { value: "Femenino", children: "Femenino" })] }), _jsx("input", { type: "number", name: "nacimiento", placeholder: "A\u00F1o de nacimiento*", className: "input flex-1", value: datos.nacimiento, onChange: handleChange, min: 1900, max: 2100 })] }), _jsxs("div", { className: "flex gap-4", children: [_jsxs("select", { name: "estadoCivil", className: "input flex-1", value: datos.estadoCivil, onChange: handleChange, children: [_jsx("option", { value: "", children: "Estado civil*" }), estadosCiviles.map((ec, i) => (_jsx("option", { value: ec, children: ec }, i)))] }), _jsxs("select", { name: "estudios", className: "input flex-1", value: datos.estudios, onChange: handleChange, children: [_jsx("option", { value: "", children: "Nivel de estudios*" }), nivelesEstudio.map((ne, i) => (_jsx("option", { value: ne, children: ne }, i)))] })] }), _jsx("input", { type: "text", name: "ocupacion", placeholder: "Ocupaci\u00F3n o profesi\u00F3n*", className: "input", value: datos.ocupacion, onChange: handleChange }), _jsxs("div", { className: "flex gap-4", children: [_jsx("input", { type: "text", name: "residenciaCiudad", placeholder: "Ciudad/Municipio residencia*", className: "input flex-1", value: datos.residenciaCiudad, onChange: handleChange }), _jsx("input", { type: "text", name: "residenciaDepto", placeholder: "Departamento residencia*", className: "input flex-1", value: datos.residenciaDepto, onChange: handleChange })] }), _jsxs("div", { className: "flex gap-4", children: [_jsxs("select", { name: "estrato", className: "input flex-1", value: datos.estrato, onChange: handleChange, children: [_jsx("option", { value: "", children: "Estrato*" }), estratos.map((e, i) => (_jsx("option", { value: e, children: e }, i)))] }), _jsxs("select", { name: "vivienda", className: "input flex-1", value: datos.vivienda, onChange: handleChange, children: [_jsx("option", { value: "", children: "Tipo de vivienda*" }), tipoVivienda.map((tv, i) => (_jsx("option", { value: tv, children: tv }, i)))] })] }), _jsx("input", { type: "number", name: "dependientes", placeholder: "N\u00BA de personas que dependen de usted*", className: "input", value: datos.dependientes, onChange: handleChange, min: 0, max: 99 }), _jsxs("div", { className: "flex gap-4", children: [_jsx("input", { type: "text", name: "trabajoCiudad", placeholder: "Ciudad/Municipio trabajo*", className: "input flex-1", value: datos.trabajoCiudad, onChange: handleChange }), _jsx("input", { type: "text", name: "trabajoDepto", placeholder: "Departamento trabajo*", className: "input flex-1", value: datos.trabajoDepto, onChange: handleChange })] }), _jsxs("div", { className: "flex gap-4 items-center", children: [_jsx("input", { type: "checkbox", name: "menosAnioEmpresa", checked: datos.menosAnioEmpresa, onChange: handleChange }), _jsx("label", { className: "text-sm", children: "\u00BFMenos de un a\u00F1o en la empresa?" }), !datos.menosAnioEmpresa && (_jsx("input", { type: "number", name: "aniosEmpresa", placeholder: "\u00BFCu\u00E1ntos a\u00F1os en la empresa?*", className: "input flex-1", value: datos.aniosEmpresa, onChange: handleChange, min: 1, max: 99 }))] }), _jsxs("div", { className: "flex gap-4", children: [_jsx("input", { type: "text", name: "cargo", placeholder: "Nombre del cargo*", className: "input flex-1", value: datos.cargo, onChange: handleChange }), _jsxs("select", { name: "tipoCargo", className: "input flex-1", value: datos.tipoCargo, onChange: handleChange, children: [_jsx("option", { value: "", children: "Tipo de cargo*" }), tipoCargo.map((tc, i) => (_jsx("option", { value: tc, children: tc }, i)))] })] }), _jsxs("div", { className: "flex gap-4 items-center", children: [_jsx("input", { type: "checkbox", name: "menosAnioCargo", checked: datos.menosAnioCargo, onChange: handleChange }), _jsx("label", { className: "text-sm", children: "\u00BFMenos de un a\u00F1o en el cargo?" }), !datos.menosAnioCargo && (_jsx("input", { type: "number", name: "aniosCargo", placeholder: "\u00BFCu\u00E1ntos a\u00F1os en el cargo?*", className: "input flex-1", value: datos.aniosCargo, onChange: handleChange, min: 1, max: 99 }))] }), _jsx("input", { type: "text", name: "area", placeholder: "Nombre del \u00E1rea/departamento/secci\u00F3n*", className: "input", value: datos.area, onChange: handleChange }), _jsxs("div", { className: "flex gap-4", children: [_jsxs("select", { name: "tipoContrato", className: "input flex-1", value: datos.tipoContrato, onChange: handleChange, children: [_jsx("option", { value: "", children: "Tipo de contrato*" }), tipoContrato.map((tc, i) => (_jsx("option", { value: tc, children: tc }, i)))] }), _jsx("input", { type: "number", name: "horasDiarias", placeholder: "Horas diarias establecidas*", className: "input flex-1", value: datos.horasDiarias, onChange: handleChange, min: 1, max: 24 })] }), _jsxs("select", { name: "tipoSalario", className: "input", value: datos.tipoSalario, onChange: handleChange, children: [_jsx("option", { value: "", children: "Tipo de salario*" }), tipoSalario.map((ts, i) => (_jsx("option", { value: ts, children: ts }, i)))] }), error && (_jsx("div", { className: "text-red-600 font-bold text-center mt-2", children: error })), _jsx("button", { type: "submit", className: "w-full py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-[#2EC4FF] to-[#005DFF] shadow-lg mt-4 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2EC4FF]", children: "Continuar" })] })] }));
}
