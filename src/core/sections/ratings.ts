import type { CodeChefUser, ThemePalette, CardConfig } from "../types";
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
  hide: Set<string>,
  cardWidth?: number
): { item: Item; height: number } {
  const children: Item[] = [];

  const allRows: StatRow[] = [];

  if (user.currentRating !== null) {
    allRows.push({ label: "Current Rating", value: String(user.currentRating), hideKey: "currentRating", accent: true });
  }
  if (user.highestRating !== null) {
    allRows.push({ label: "Highest Rating", value: String(user.highestRating), hideKey: "highestRating" });
  }
  if (user.globalRank !== null) {
    allRows.push({ label: "Global Rank", value: `#${user.globalRank}`, hideKey: "globalRank" });
  }
  if (user.countryRank !== null) {
    allRows.push({ label: "Country Rank", value: `#${user.countryRank}`, hideKey: "countryRank" });
  }
  if (user.problemsSolved !== null) {
    allRows.push({ label: "Problems Solved", value: String(user.problemsSolved), hideKey: "problemsSolved" });
  }
  if (user.contestsParticipated !== null) {
    allRows.push({ label: "Contests", value: String(user.contestsParticipated), hideKey: "contests" });
  }

  const visible = allRows.filter((r) => !hide.has(r.hideKey));
  if (visible.length === 0) return { item: group([]), height: 0 };

  // 2-column grid layout
  const colWidth = ((cardWidth || 500) - x * 2) / 2;
  const ROW_H = 38;

  for (let i = 0; i < visible.length; i++) {
    const row = visible[i];
    const col = i % 2;
    const rowIdx = Math.floor(i / 2);
    const cx = x + col * colWidth;
    const cy = y + rowIdx * ROW_H;

    // Value (big)
    children.push(
      text(row.value, cx, cy + 16, {
        size: 16,
        fill: row.accent ? theme.accent : theme.text,
        weight: "bold",
      })
    );
    // Label (small below)
    children.push(
      text(row.label, cx, cy + 30, {
        size: 10,
        fill: theme.subtext,
      })
    );
  }

  const totalRows = Math.ceil(visible.length / 2);
  return { item: group(children), height: totalRows * ROW_H };
}
