// Named avatar colors for the site. Editors pick a friendly color name in the
// CMS (e.g. "Peach") rather than hand-matching two hex codes; each name resolves
// to a coordinated background + ink swatch here. Keep this list in sync with the
// `avatarColor` enum in content.config.ts (it is derived from `avatarColors`).

export const avatarColors = [
  "Peach",
  "Periwinkle",
  "Mint",
  "Coral",
  "Amber",
  "Lavender",
] as const;

/** The set of avatar colors designed for this site. */
export type AvatarColor = (typeof avatarColors)[number];

export interface AvatarSwatch {
  /** Soft background fill behind the initials/photo. */
  bg: string;
  /** Darker "ink" used for the initials and other foreground marks. */
  ink: string;
}

export const avatarPalette: Record<AvatarColor, AvatarSwatch> = {
  Peach: { bg: "#ffd7a8", ink: "#9a5b1a" },
  Periwinkle: { bg: "#c9d4ff", ink: "#3a4aa0" },
  Mint: { bg: "#bfe6cd", ink: "#1e7a4e" },
  Coral: { bg: "#ffcfc0", ink: "#b0432a" },
  Amber: { bg: "#ffe1a8", ink: "#9a6a10" },
  Lavender: { bg: "#d9c9ff", ink: "#5b3fd6" },
};

/** Resolve a named avatar color to its background + ink swatch (default Peach). */
export function resolveAvatarColor(name: AvatarColor = "Peach"): AvatarSwatch {
  return avatarPalette[name] ?? avatarPalette.Peach;
}
