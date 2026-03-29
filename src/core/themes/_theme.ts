import type { ThemePalette } from "../types";

const themes = new Map<string, ThemePalette>();

export function registerTheme(theme: ThemePalette) {
  themes.set(theme.name, theme);
}

export function resolveTheme(
  name: string,
  overrides: Partial<ThemePalette> = {}
): ThemePalette {
  const base = themes.get(name) || themes.get("light")!;
  return { ...base, ...overrides, name: base.name };
}

export function getThemeNames(): string[] {
  return Array.from(themes.keys());
}
