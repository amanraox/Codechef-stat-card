import type { CardConfig } from "./types";
import { fetchProfileHTML } from "./scraper";
import { parseProfile } from "./parser";
import { resolveTheme } from "./themes";
import { buildCard, buildErrorCard } from "./card";
import { getCache, setCache } from "../lib/cache";

export async function generateCard(config: CardConfig): Promise<string> {
  const cacheKey = buildCacheKey(config);
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const { html, status } = await fetchProfileHTML(config.username);

  if (status === 404 || (!html && status !== 200)) {
    return buildErrorCard(`User "${config.username}" not found`, config.width);
  }

  if (!html) {
    return buildErrorCard("Failed to fetch profile from CodeChef", config.width);
  }

  const user = parseProfile(html, config.username);

  if (user.currentRating === null && user.name === null) {
    return buildErrorCard(`User "${config.username}" not found or profile is empty`, config.width);
  }

  const theme = resolveTheme(config.theme, config.colorOverrides);
  const svg = buildCard(user, config, theme);

  setCache(cacheKey, svg);
  return svg;
}

function buildCacheKey(config: CardConfig): string {
  return `${config.username}:${config.theme}:${config.extension || "none"}:${Array.from(config.hide).sort().join(",")}:${config.width}:${config.font}:${config.bgImage || ""}`;
}
