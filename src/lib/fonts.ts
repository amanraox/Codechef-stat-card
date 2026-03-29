const FONT_CACHE = new Map<string, string>();

export async function fetchFontCSS(family: string): Promise<string> {
  if (FONT_CACHE.has(family)) return FONT_CACHE.get(family)!;

  try {
    const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}&display=swap`;
    const res = await fetch(url, {
      headers: {
        // Request woff2 format by pretending to be a modern browser
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
      },
    });
    if (!res.ok) return "";
    const css = await res.text();
    FONT_CACHE.set(family, css);
    return css;
  } catch {
    return "";
  }
}
