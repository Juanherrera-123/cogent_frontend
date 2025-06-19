import React, { useState } from "react";
  const [editIndex, setEditIndex] = useState<number | null>(null);

                  {editIndex === idx ? (
                  {editIndex === idx ? (
                  {editIndex === idx ? (
                  {editIndex === idx ? (
                            setEditIndex(null);
                        onClick={() => setEditIndex(null)}
                          setEditIndex(idx);
  empresas: string[];
  credenciales: { usuario: string; password: string; empresa: string }[];
  onAgregar: (nombre: string, usuario: string, password: string) => void;
  onEliminar: (usuario: string) => void;
  onEditar: (
    originalUsuario: string,
    nombre: string,
    usuario: string,
    password: string
  ) => void;
}) {
  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editNombre, setEditNombre] = useState("");
  const [editUsuario, setEditUsuario] = useState("");
  const [editPassword, setEditPassword] = useState("");

  const handleAgregar = () => {
    if (!nombre.trim() || !usuario.trim() || !password.trim()) return;
    onAgregar(nombre.trim(), usuario.trim(), password.trim());
    setNombre("");
    setUsuario("");
    setPassword("");
  };

  const startEdit = (idx: number) => {
    setEditIndex(idx);
    setEditUsuario(credenciales[idx].usuario);
    setEditPassword("");
  };

  const handleGuardarEdicion = () => {
    if (editIndex === null) return;
    if (!editUsuario.trim() || !editPassword.trim()) return;
    onEditar(editIndex, editUsuario.trim(), editPassword.trim());
    setEditIndex(null);
    setEditUsuario("");
    setEditPassword("");
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
              <th className="w-32">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {credenciales.map((c, idx) => (
              <tr key={idx} className="border-b">
                <td className="px-2 py-1">{idx + 1}</td>
                <td className="px-2 py-1">
                  {editIdx === idx ? (
                    <input
                      className="input"
                      value={editNombre}
                      onChange={(e) => setEditNombre(e.target.value)}
                    />
                  ) : (
                    c.empresa
                  )}
                </td>
                <td className="px-2 py-1">
                  {editIdx === idx ? (
                    <input
                      className="input"
                      value={editUsuario}
                      onChange={(e) => setEditUsuario(e.target.value)}
                    />
                  ) : (
                    c.usuario
                  )}
                </td>
                <td className="px-2 py-1">
                  {editIdx === idx ? (
                    <input
                      className="input"
                      type="text"
                      value={editPassword}
                      onChange={(e) => setEditPassword(e.target.value)}
                    />
                  ) : (
                    c.password
                  )}
                </td>
                <td className="px-2 py-1">
                  {editIdx === idx ? (
                    <div className="flex gap-1">
                      <button
                        type="button"
                        className="px-2 py-0.5 text-xs bg-green-500 text-white rounded"
                        onClick={() => {
                          onEditar(c.usuario, editNombre, editUsuario, editPassword);
                          setEditIdx(null);
                        }}
                      >
                        Guardar
                      </button>
                      <button
                        type="button"
                        className="px-2 py-0.5 text-xs bg-gray-300 rounded"
                        onClick={() => setEditIdx(null)}
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-1">
                      <button
                        type="button"
                        className="px-2 py-0.5 text-xs bg-yellow-400 rounded"
                        onClick={() => {
                          setEditIdx(idx);
                          setEditNombre(c.empresa);
                          setEditUsuario(c.usuario);
                          setEditPassword(c.password);
                        }}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="px-2 py-0.5 text-xs bg-red-600 text-white rounded"
                        onClick={() => onEliminar(c.usuario)}
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editIndex === null ? (
        <div className="flex flex-wrap gap-2 items-center">
          <input
            className="input flex-1"
            placeholder="Nombre empresa"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            className="input flex-1"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <input
            className="input flex-1"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="bg-primary-main text-white px-4 py-1 rounded-lg shadow"
            onClick={handleAgregar}
          >
            Agregar
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="font-semibold">{credenciales[editIndex].empresa}</span>
          <input
            className="input flex-1"
            placeholder="Usuario"
            value={editUsuario}
            onChange={(e) => setEditUsuario(e.target.value)}
          />
          <input
            className="input flex-1"
            type="password"
            placeholder="Contraseña"
            value={editPassword}
            onChange={(e) => setEditPassword(e.target.value)}
          />
          <button
            type="button"
            className="bg-primary-main text-white px-4 py-1 rounded-lg shadow"
            onClick={handleGuardarEdicion}
          >
            Guardar
          </button>
          <button
            type="button"
            className="px-4 py-1 rounded-lg border"
            onClick={() => setEditIndex(null)}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}
