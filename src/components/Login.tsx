import React, { useState } from "react";
// Use the logo from the public folder so Vite serves it correctly
import LogoCogent from "/logo_forma.png";
type Usuario = { usuario: string; password: string; rol: string; empresa?: string };

type Props = {
  usuarios: Usuario[];
  onLogin: (rol: "psicologa" | "dueno", empresa?: string) => void;
  onCancel?: () => void;
};

export default function Login({ usuarios, onLogin, onCancel }: Props) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F4F8FA] to-white px-2 relative">
      {/* Decorative background */}
      <svg className="absolute left-0 top-0 opacity-10 w-[320px] h-[320px] -z-10" viewBox="0 0 320 320">
        <circle cx="160" cy="160" r="140" fill="url(#grad1)" />
        <defs>
          <linearGradient id="grad1" x1="60" y1="30" x2="260" y2="260" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2EC4FF" />
            <stop offset="1" stopColor="#005DFF" />
          </linearGradient>
        </defs>
      </svg>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-xl p-8 md:p-12 w-full max-w-md mx-auto animate-fadeIn flex flex-col items-center"
        autoComplete="off"
      >
        <img src={LogoCogent} alt="COGENT" className="w-16 mb-6" />

        <h2 className="text-2xl md:text-3xl font-bold text-[#132045] text-center mb-8 font-montserrat">
          Acceso a resultados
        </h2>

        <input
          type="text"
          className="w-full mb-5 py-3 px-4 rounded-xl border border-gray-200 bg-[#F8FAFC] text-base font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2EC4FF] transition"
          placeholder="Usuario"
          value={usuario}
          onChange={e => setUsuario(e.target.value)}
          required
        />

        <div className="w-full relative mb-6">
          <input
            type={showPassword ? 'text' : 'password'}
            className="w-full py-3 px-4 rounded-xl border border-gray-200 bg-[#F8FAFC] text-base font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2EC4FF] transition"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            tabIndex={-1}
            className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-[#2EC4FF] transition"
            onClick={() => setShowPassword(s => !s)}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPassword ? (
              <svg width={22} height={22} fill="none" viewBox="0 0 24 24"><path stroke="#2EC4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.02 10.02 0 0 1 12 20C6 20 2 12 2 12c.6-1.1 1.35-2.21 2.23-3.26m3.1-2.6A9.97 9.97 0 0 1 12 4c6 0 10 8 10 8-.3.55-.62 1.1-.97 1.65m-7.7 2.07a3 3 0 1 1-4.24-4.24m9.9 9.9L4.1 4.1" /></svg>
            ) : (
              <svg width={22} height={22} fill="none" viewBox="0 0 24 24"><path stroke="#2EC4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12Zm11-3a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" /></svg>
            )}
          </button>
        </div>

        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}

        <button
          type="submit"
          className="w-full py-3 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-[#2EC4FF] to-[#005DFF] shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2EC4FF] mb-4"
        >
          Iniciar sesión
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="mt-1 text-[#6C7A89] hover:text-[#005DFF] font-medium text-base underline underline-offset-2 transition"
          >
            Volver al inicio
          </button>
        )}

        <div className="text-xs mt-2 text-[var(--gray-medium)]">
          {usuarios.map((u) => (
            <div key={u.usuario}>
              <b>{u.rol === 'psicologa' ? 'Psicóloga' : u.empresa}</b>: {u.usuario} / {u.password}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
