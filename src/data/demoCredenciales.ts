import { CredencialEmpresa } from "@/types";

export const demoCredencialesConst: (CredencialEmpresa & { rol: string })[] = [
  { usuario: "psicologa", password: "cogent2024", rol: "psicologa" },
  { usuario: "sonria", password: "sonria123", rol: "dueno", empresa: "Sonria" },
  {
    usuario: "aeropuerto",
    password: "eldorado123",
    rol: "dueno",
    empresa: "Aeropuerto El Dorado",
  },
];
