import React, { useState } from "react";
import { CredencialEmpresa } from "@/types";


export default function AdminEmpresas({ empresas, credenciales, onAgregar }:{ empresas: string[]; credenciales: CredencialEmpresa[]; onAgregar: (nombre: string, usuario: string, password: string) => void; }) {

  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editUsuario, setEditUsuario] = useState("");
  const [editPassword, setEditPassword] = useState("");

  const handleAgregar = () => {
    if (!nombre.trim() || !usuario.trim() || !password.trim()) return;
    onAgregar(nombre.trim(), usuario.trim(), password.trim());
    setNombre("");
    setUsuario("");
    setPassword("");
  };

  const startEditar = (idx: number) => {
    setEditingIdx(idx);
    setEditUsuario(credenciales[idx].usuario);
    setEditPassword(credenciales[idx].password);
  };

  const cancelarEditar = () => {
    setEditingIdx(null);
  };

  const guardarEditar = (empresa: string) => {
    if (editingIdx === null) return;
    onEditar(empresa, editUsuario.trim(), editPassword.trim());
    setEditingIdx(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm border mt-2 rounded-lg overflow-hidden font-montserrat text-[#172349]">
          <thead className="bg-gradient-to-r from-[#2EC4FF] to-[#005DFF] text-white font-semibold">
            <tr>
              <th>#</th>
              <th>Empresa</th>
              <th>Usuario</th>
              <th>Contraseña</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {credenciales.map((c, idx) => (
              <tr key={idx} className="border-b">
                <td className="px-2 py-1">{idx + 1}</td>
                <td className="px-2 py-1">{c.empresa}</td>
                <td className="px-2 py-1">
                  {editingIdx === idx ? (
                    <input
                      className="input w-24 sm:w-auto"
                      value={editUsuario}
                      onChange={(e) => setEditUsuario(e.target.value)}
                    />
                  ) : (
                    c.usuario
                  )}
                </td>
                <td className="px-2 py-1">
                  {editingIdx === idx ? (
                    <input
                      className="input w-24 sm:w-auto"
                      value={editPassword}
                      onChange={(e) => setEditPassword(e.target.value)}
                    />
                  ) : (
                    c.password
                  )}
                </td>
                <td className="px-2 py-1 text-right">
                  {editingIdx === idx ? (
                    <>
                      <button
                        className="text-primary-main mr-2"
                        onClick={() => guardarEditar(c.empresa)}
                      >
                        Guardar
                      </button>
                      <button className="text-red-600" onClick={cancelarEditar}>
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <button
                      className="text-primary-main"
                      onClick={() => startEditar(idx)}
                    >
                      Editar
                    </button>
                  )}
                </td>
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
