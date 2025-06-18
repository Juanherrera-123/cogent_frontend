import React, { useState } from "react";
import logoTexto from "../logo_texto.png";
type Usuario = { usuario: string; password: string; rol: string; empresa?: string };

type Props = {
  usuarios: Usuario[];
  onLogin: (rol: "psicologa" | "dueno", empresa?: string) => void;
  onCancel?: () => void;
};

export default function Login({ usuarios, onLogin, onCancel }: Props) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = usuarios.find(
      (u) => u.usuario === usuario.toLowerCase() && u.password === password
    );
    if (user) {
      onLogin(user.rol as "psicologa" | "dueno", user.empresa);
    } else {
      setError("Usuario o clave incorrectos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl flex flex-col gap-4 min-w-[300px]">
        <img src={logoTexto} alt="COGENT" className="w-48 mx-auto" />
        <h2 className="text-2xl font-bold text-primary-main mb-2 text-center">Acceso a resultados</h2>
        <input
          className="input"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input
          className="input"
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="text-red-600 text-sm">{error}</div>}

        <button className="btn-primary" type="submit">

          Ingresar
        </button>
        {onCancel && (
          <button
            type="button"
            className="text-gray-500 text-sm hover:underline"
            onClick={onCancel}
          >
            Volver al inicio
          </button>
        )}
        <div className="text-xs mt-2 text-gray-400">
          {usuarios.map((u) => (
            <div key={u.usuario}>
              <b>{u.rol === "psicologa" ? "Psicóloga" : u.empresa}</b>: {u.usuario}
              {" / "}
              {u.password}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
