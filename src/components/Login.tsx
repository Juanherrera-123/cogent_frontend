import React, { useState } from "react";

// Puedes agregar aquí las claves/empresas permitidas
const usuarios = [
  { usuario: "psicologa", password: "cogent2024", rol: "psicologa" },
  { usuario: "sonria", password: "sonria123", rol: "dueno", empresa: "Sonria" },
  { usuario: "aeropuerto", password: "eldorado123", rol: "dueno", empresa: "Aeropuerto El Dorado" },
  // Agrega aquí más empresas si quieres
];

type Props = {
  onLogin: (rol: "psicologa" | "dueno", empresa?: string) => void;
  onCancel?: () => void;
};

export default function Login({ onLogin, onCancel }: Props) {
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
        <h2 className="text-2xl font-bold text-cogent-blue mb-2">Acceso a resultados</h2>
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
        <button className="bg-cogent-blue text-white px-4 py-2 rounded-lg font-bold shadow" type="submit">
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
          <b>Psicóloga</b>: psicologa / cogent2024<br />
          <b>Sonria</b>: sonria / sonria123<br />
          <b>Aeropuerto</b>: aeropuerto / eldorado123
        </div>
      </form>
    </div>
  );
}
