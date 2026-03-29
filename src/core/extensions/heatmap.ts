import type { SubmissionDay, ThemePalette } from "../types";
import { Item } from "../item";
import { rect, text, group } from "../elements";

const CELL_SIZE = 11;
const CELL_GAP = 2;
const WEEKS = 26;
const DAYS = 7;

export function renderHeatmap(
  submissions: SubmissionDay[],
  theme: ThemePalette,
  x: number,
  y: number,
  width: number
): { item: Item; height: number } {
  if (submissions.length === 0) {
    return { item: group([]), height: 0 };
  }

  const children: Item[] = [];

  // Title
  children.push(
    text("Submission Activity", x, y + 14, {
      size: 13,
      fill: theme.text,
      weight: "600",
    })
  );

  const gridY = y + 28;

  // Build date→value map
  const valueMap = new Map<string, number>();
  for (const s of submissions) {
    valueMap.set(s.date, s.value);
  }

  // Find max value for color scaling
  const maxVal = Math.max(1, ...submissions.map((s) => s.value));

  // Generate grid starting from ~26 weeks ago
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - WEEKS * 7 + (7 - startDate.getDay()));

  // Center the grid
  const gridWidth = WEEKS * (CELL_SIZE + CELL_GAP);
  const gridX = x + Math.max(0, (width - 40 - gridWidth) / 2);

  // Parse colors once
  const emptyColor = parseColor(theme.gridEmpty);
  const fillColor = parseColor(theme.gridFill);

  for (let week = 0; week < WEEKS; week++) {
    for (let day = 0; day < DAYS; day++) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + week * 7 + day);
      if (d > today) continue;

      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      const val = valueMap.get(key) || 0;

      let fill: string;
      if (val === 0) {
        fill = theme.gridEmpty;
      } else {
        const t = val / maxVal;
        fill = interpolateRgba(emptyColor, fillColor, t);
      }

      children.push(
        rect(
          gridX + week * (CELL_SIZE + CELL_GAP),
          gridY + day * (CELL_SIZE + CELL_GAP),
          CELL_SIZE,
          CELL_SIZE,
          { fill, rx: 2 }
        )
      );
    }
  }

  const height = 28 + DAYS * (CELL_SIZE + CELL_GAP) + 8;
  return { item: group(children), height };
}

interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

function parseColor(color: string): RGBA {
  // rgba(r,g,b,a)
  const rgbaMatch = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/);
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1], 10),
      g: parseInt(rgbaMatch[2], 10),
      b: parseInt(rgbaMatch[3], 10),
      a: rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : 1,
    };
  }

  // hex
  const hex = color.replace("#", "");
  const full = hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex;
  return {
    r: parseInt(full.slice(0, 2), 16) || 0,
    g: parseInt(full.slice(2, 4), 16) || 0,
    b: parseInt(full.slice(4, 6), 16) || 0,
    a: 1,
  };
}

function interpolateRgba(from: RGBA, to: RGBA, t: number): string {
  const r = Math.round(from.r + (to.r - from.r) * t);
  const g = Math.round(from.g + (to.g - from.g) * t);
  const b = Math.round(from.b + (to.b - from.b) * t);
  const a = from.a + (to.a - from.a) * t;
  if (a < 1) {
    return `rgba(${r},${g},${b},${a.toFixed(2)})`;
  }
  return `rgb(${r},${g},${b})`;
}
