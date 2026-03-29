import type { CardConfig, Extension, ThemePalette } from "./types";
import { CARD_FONTS, DEFAULT_FONT } from "./types";

const VALID_EXTENSIONS = new Set(["heatmap", "contest"]);

export function parseQuery(
  username: string,
  params: URLSearchParams
): CardConfig {
  const theme = params.get("theme") || "light";

  const extParam = params.get("ext");
  const extension: Extension | null =
    extParam && VALID_EXTENSIONS.has(extParam) ? (extParam as Extension) : null;

  const hideStr = params.get("hide") || "";
  const hide = new Set(
    hideStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  );

  const width = Math.min(Math.max(parseInt(params.get("width") || "500", 10) || 500, 300), 800);

  const fontParam = (params.get("font") || DEFAULT_FONT).toLowerCase();
  const font = fontParam in CARD_FONTS ? fontParam : DEFAULT_FONT;

  const colorOverrides: Partial<ThemePalette> = {};
  const colorKeys: (keyof ThemePalette)[] = [
    "bg", "border", "title", "text", "subtext", "accent",
    "star", "gridEmpty", "gridFill", "chartLine", "chartDot",
  ];
  for (const key of colorKeys) {
    const val = params.get(key);
    if (val && /^#?[0-9a-fA-F]{3,8}$/.test(val)) {
      colorOverrides[key] = val.startsWith("#") ? val : `#${val}`;
    }
  }

  // Background image URL — must be https
  const bgImageRaw = params.get("bg_image") || null;
  const bgImage =
    bgImageRaw && /^https:\/\/.+\.(jpg|jpeg|png|webp|gif)/i.test(bgImageRaw)
      ? bgImageRaw
      : null;

  return { username, theme, extension, hide, width, font, bgImage, colorOverrides };
}
