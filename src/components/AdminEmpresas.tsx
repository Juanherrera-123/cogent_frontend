import React, { useState } from "react";

export default function AdminEmpresas({ empresas, credenciales, onAgregar }:{ empresas: string[]; credenciales: { usuario: string; empresa: string }[]; onAgregar: (nombre: string, usuario: string, password: string) => void; }) {
  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const handleAgregar = () => {
    if (!nombre.trim() || !usuario.trim() || !password.trim()) return;
    onAgregar(nombre.trim(), usuario.trim(), password.trim());
    setNombre("");
    setUsuario("");
    setPassword("");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto">
        <table className="w-full text-xs border mt-2 rounded-lg overflow-hidden font-montserrat text-[#172349]">
          <thead className="bg-gradient-to-r from-[#2EC4FF] to-[#005DFF] text-white font-semibold">
            <tr>
              <th>#</th>
              <th>Empresa</th>
              <th>Usuario</th>
            </tr>
          </thead>
          <tbody>
            {credenciales.map((c, idx) => (
              <tr key={idx} className="border-b">
                <td className="px-2 py-1">{idx + 1}</td>
                <td className="px-2 py-1">{c.empresa}</td>
                <td className="px-2 py-1">{c.usuario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <input className="input flex-1" placeholder="Nombre empresa" value={nombre} onChange={(e)=>setNombre(e.target.value)} />
        <input className="input flex-1" placeholder="Usuario" value={usuario} onChange={(e)=>setUsuario(e.target.value)} />
        <input className="input flex-1" type="password" placeholder="Contraseña" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button type="button" className="bg-primary-main text-white px-4 py-1 rounded-lg shadow" onClick={handleAgregar}>
          Agregar
        </button>
      </div>
    </div>
  );
}
