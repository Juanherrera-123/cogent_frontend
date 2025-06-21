import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export default function AdminEmpresas({ credenciales, onAgregar, onEliminar, onEditar }) {
    const [nombre, setNombre] = useState("");
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editNombre, setEditNombre] = useState("");
    const [editUsuario, setEditUsuario] = useState("");
    const [editPassword, setEditPassword] = useState("");
    const handleAgregar = () => {
        if (!nombre.trim() || !usuario.trim() || !password.trim())
            return;
        onAgregar(nombre.trim(), usuario.trim(), password.trim());
        setNombre("");
        setUsuario("");
        setPassword("");
    };
    const startEdit = (idx) => {
        setEditIndex(idx);
        setEditUsuario(credenciales[idx].usuario);
        setEditPassword("");
    };
    const handleGuardarEdicion = () => {
        if (editIndex === null)
            return;
        if (!editUsuario.trim() || !editPassword.trim())
            return;
        onEditar(credenciales[editIndex].usuario, credenciales[editIndex].empresa || "", editUsuario.trim(), editPassword.trim());
        setEditIndex(null);
        setEditUsuario("");
        setEditPassword("");
    };
    return (_jsxs("div", { className: "flex flex-col gap-4", children: [_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-xs sm:text-sm border mt-2 rounded-lg overflow-hidden font-montserrat text-[#172349]", children: [_jsx("thead", { className: "bg-gradient-to-r from-[#2EC4FF] to-[#005DFF] text-white font-semibold", children: _jsxs("tr", { children: [_jsx("th", { children: "#" }), _jsx("th", { children: "Empresa" }), _jsx("th", { children: "Usuario" }), _jsx("th", { children: "Contrase\u00F1a" }), _jsx("th", { className: "w-32", children: "Acciones" })] }) }), _jsx("tbody", { children: credenciales.map((c, idx) => (_jsxs("tr", { className: "border-b", children: [_jsx("td", { className: "px-2 py-1", children: idx + 1 }), _jsx("td", { className: "px-2 py-1", children: editIndex === idx ? (_jsx("input", { className: "input", value: editNombre, onChange: (e) => setEditNombre(e.target.value) })) : (c.empresa) }), _jsx("td", { className: "px-2 py-1", children: editIndex === idx ? (_jsx("input", { className: "input", value: editUsuario, onChange: (e) => setEditUsuario(e.target.value) })) : (c.usuario) }), _jsx("td", { className: "px-2 py-1", children: editIndex === idx ? (_jsx("input", { className: "input", type: "text", value: editPassword, onChange: (e) => setEditPassword(e.target.value) })) : (c.password) }), _jsx("td", { className: "px-2 py-1", children: editIndex === idx ? (_jsxs("div", { className: "flex gap-1", children: [_jsx("button", { type: "button", className: "px-2 py-0.5 text-xs bg-green-500 text-white rounded", onClick: () => {
                                                        onEditar(c.usuario, editNombre, editUsuario, editPassword);
                                                        setEditIndex(null);
                                                    }, children: "Guardar" }), _jsx("button", { type: "button", className: "px-2 py-0.5 text-xs bg-gray-300 rounded", onClick: () => setEditIndex(null), children: "Cancelar" })] })) : (_jsxs("div", { className: "flex gap-1", children: [_jsx("button", { type: "button", className: "px-2 py-0.5 text-xs bg-yellow-400 rounded", onClick: () => {
                                                        setEditIndex(idx);
                                                        setEditNombre(c.empresa || "");
                                                        setEditUsuario(c.usuario);
                                                        setEditPassword(c.password);
                                                    }, children: "Editar" }), _jsx("button", { type: "button", className: "px-2 py-0.5 text-xs bg-red-600 text-white rounded", onClick: () => onEliminar(c.usuario), children: "Eliminar" })] })) })] }, idx))) })] }) }), editIndex === null ? (_jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [_jsx("input", { className: "input flex-1", placeholder: "Nombre empresa", value: nombre, onChange: (e) => setNombre(e.target.value) }), _jsx("input", { className: "input flex-1", placeholder: "Usuario", value: usuario, onChange: (e) => setUsuario(e.target.value) }), _jsx("input", { className: "input flex-1", type: "password", placeholder: "Contrase\u00F1a", value: password, onChange: (e) => setPassword(e.target.value) }), _jsx("button", { type: "button", className: "bg-primary-main text-white px-4 py-1 rounded-lg shadow", onClick: handleAgregar, children: "Agregar" })] })) : (_jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [_jsx("span", { className: "font-semibold", children: credenciales[editIndex].empresa }), _jsx("input", { className: "input flex-1", placeholder: "Usuario", value: editUsuario, onChange: (e) => setEditUsuario(e.target.value) }), _jsx("input", { className: "input flex-1", type: "password", placeholder: "Contrase\u00F1a", value: editPassword, onChange: (e) => setEditPassword(e.target.value) }), _jsx("button", { type: "button", className: "bg-primary-main text-white px-4 py-1 rounded-lg shadow", onClick: handleGuardarEdicion, children: "Guardar" }), _jsx("button", { type: "button", className: "px-4 py-1 rounded-lg border", onClick: () => setEditIndex(null), children: "Cancelar" })] }))] }));
}
