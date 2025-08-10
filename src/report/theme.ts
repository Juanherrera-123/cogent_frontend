export type ReportTheme = {
  primary: string;   // color títulos
  accent: string;    // color detalles/bordes
  logoUrl?: string;  // portada
};

export const defaultTheme: ReportTheme = {
  primary: "#0F172A",
  accent: "#475569",
  logoUrl: undefined,
};
