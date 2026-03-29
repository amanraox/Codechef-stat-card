import type { CodeChefUser, ThemePalette } from "../types";
import { Item } from "../item";
import { text, group } from "../elements";

export function renderRatings(
  user: CodeChefUser,
  theme: ThemePalette,
  x: number,
  y: number,
  hide: Set<string>
): { item: Item; height: number } {
  const children: Item[] = [];
  let offsetY = 0;

  if (user.currentRating !== null && !hide.has("currentRating")) {
    children.push(
      text("Current Rating", x, y + offsetY + 14, {
        size: 12,
        fill: theme.subtext,
      })
    );
    children.push(
      text(String(user.currentRating), x + 120, y + offsetY + 14, {
        size: 14,
        fill: theme.accent,
        weight: "bold",
      })
    );
    offsetY += 24;
  }

  if (user.highestRating !== null && !hide.has("highestRating")) {
    children.push(
      text("Highest Rating", x, y + offsetY + 14, {
        size: 12,
        fill: theme.subtext,
      })
    );
    children.push(
      text(String(user.highestRating), x + 120, y + offsetY + 14, {
        size: 14,
        fill: theme.text,
        weight: "bold",
      })
    );
    offsetY += 24;
  }

  if (children.length === 0) return { item: group([]), height: 0 };
  return { item: group(children), height: offsetY };
}
