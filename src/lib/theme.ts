// Accent theme palette, ported verbatim from the Claude Design `DCLogic` block.
// The design exposed an `accent` enum (Coral/Grape/Forest/Ocean); here it is a
// content-editable setting (see `settings` collection) resolved to CSS variables
// applied on a page wrapper in BaseLayout.

export type AccentName = "Coral" | "Grape" | "Forest" | "Ocean";

export interface ThemeTokens {
  accent: string;
  accentInk: string;
  accentSoft: string;
  accentDeep: string;
}

export const themes: Record<AccentName, ThemeTokens> = {
  Coral: {
    accent: "#ff6a3d",
    accentInk: "#c63f1b",
    accentSoft: "#ffe1d3",
    accentDeep: "#7a2e17",
  },
  Grape: {
    accent: "#7c5cff",
    accentInk: "#5b3fd6",
    accentSoft: "#e9e2ff",
    accentDeep: "#38257a",
  },
  Forest: {
    accent: "#2fa36b",
    accentInk: "#1e7a4e",
    accentSoft: "#d7f0e2",
    accentDeep: "#154d32",
  },
  Ocean: {
    accent: "#2b8ae0",
    accentInk: "#1c6bb8",
    accentSoft: "#d8ebfa",
    accentDeep: "#124066",
  },
};

export function resolveTheme(name: AccentName = "Coral"): ThemeTokens {
  return themes[name] ?? themes.Coral;
}

/** Build the inline `style` string of CSS custom properties for a page wrapper. */
export function themeVars(name: AccentName = "Coral"): string {
  const t = resolveTheme(name);
  return `--accent:${t.accent};--accent-ink:${t.accentInk};--accent-soft:${t.accentSoft};--accent-deep:${t.accentDeep}`;
}
