export const fmt = {
  percent(n: number | null | undefined, decimals = 2): string {
    if (n === null || n === undefined || Number.isNaN(n)) return "0%";
    return `${n.toFixed(decimals)}%`;
  },
  range(a?: number, b?: number): string {
    if (a == null && b == null) return "";
    if (a != null && b != null) return `${a}–${b}`; // en-dash
    return String(a ?? b);
  },
  ucfirst(s?: string): string {
    if (!s) return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  },
  safe(s?: string): string {
    return (s ?? "").trim();
  }
};
