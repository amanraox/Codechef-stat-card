import type { CodeChefUser, ThemePalette } from "../types";
import { Item } from "../item";
import { text, group } from "../elements";

interface StatRow {
  label: string;
  value: string;
  hideKey: string;
  accent?: boolean;
}

export function renderRatings(
  user: CodeChefUser,
  theme: ThemePalette,
  x: number,
  y: number,
  hide: Set<string>
): { item: Item; height: number } {
  const children: Item[] = [];

  const rows: StatRow[] = [];

  if (user.currentRating !== null) {
    rows.push({ label: "Current Rating", value: String(user.currentRating), hideKey: "currentRating", accent: true });
  }
  if (user.highestRating !== null) {
    rows.push({ label: "Highest Rating", value: String(user.highestRating), hideKey: "highestRating" });
  }
  if (user.globalRank !== null) {
    rows.push({ label: "Global Rank", value: `#${user.globalRank}`, hideKey: "globalRank" });
  }
  if (user.countryRank !== null) {
    rows.push({ label: "Country Rank", value: `#${user.countryRank}`, hideKey: "countryRank" });
  }
  if (user.problemsSolved !== null) {
    rows.push({ label: "Problems Solved", value: String(user.problemsSolved), hideKey: "problemsSolved" });
  }
  if (user.contestsParticipated !== null) {
    rows.push({ label: "Contests", value: String(user.contestsParticipated), hideKey: "contests" });
  }

  let offsetY = 0;
  for (const row of rows) {
    if (hide.has(row.hideKey)) continue;

    children.push(
      text(row.label, x, y + offsetY + 14, {
        size: 12,
        fill: theme.subtext,
      })
    );
    children.push(
      text(row.value, x + 130, y + offsetY + 14, {
        size: 13,
        fill: row.accent ? theme.accent : theme.text,
        weight: "bold",
      })
    );
    offsetY += 22;
  }

  if (children.length === 0) return { item: group([]), height: 0 };
  return { item: group(children), height: offsetY };
}
