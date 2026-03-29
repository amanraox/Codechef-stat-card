export interface ContestEntry {
  code: string;
  rating: number;
  rank: number;
  end_date: string;
  name: string;
  getyear: number;
  getmonth: number;
  getday: number;
}

export interface SubmissionDay {
  date: string;
  value: number;
}

export interface CodeChefUser {
  username: string;
  name: string | null;
  currentRating: number | null;
  highestRating: number | null;
  stars: number | null;
  starColor: string | null;
  globalRank: number | null;
  countryRank: number | null;
  country: string | null;
  countryCode: string | null;
  avatarUrl: string | null;
  contestHistory: ContestEntry[];
  submissionStats: SubmissionDay[];
}

/** CodeChef tier colors by star count */
export const TIER_COLORS: Record<number, string> = {
  1: "#666666", // grey
  2: "#1E7D22", // green
  3: "#3366CB", // blue
  4: "#684273", // purple
  5: "#FFBF00", // yellow
  6: "#FF7F00", // orange
  7: "#D0011B", // red
};

export function getTierColor(stars: number | null): string | null {
  if (stars === null) return null;
  return TIER_COLORS[stars] || null;
}

export interface ThemePalette {
  name: string;
  bg: string;
  border: string;
  title: string;
  text: string;
  subtext: string;
  accent: string;
  star: string;
  gridEmpty: string;
  gridFill: string;
  chartLine: string;
  chartDot: string;
}

export type Extension = "heatmap" | "contest";

/** Supported font families for the SVG card */
export const CARD_FONTS: Record<string, string> = {
  roboto:     "'Roboto', sans-serif",
  "roboto mono": "'Roboto Mono', monospace",
  "fira code": "'Fira Code', monospace",
  "jetbrains mono": "'JetBrains Mono', monospace",
  "source code pro": "'Source Code Pro', monospace",
  inter:      "'Inter', sans-serif",
  poppins:    "'Poppins', sans-serif",
  "space grotesk": "'Space Grotesk', sans-serif",
  ubuntu:     "'Ubuntu', sans-serif",
  "ubuntu mono": "'Ubuntu Mono', monospace",
};

export const DEFAULT_FONT = "roboto mono";

export interface CardConfig {
  username: string;
  theme: string;
  extension: Extension | null;
  hide: Set<string>;
  width: number;
  font: string;
  bgImage: string | null;
  colorOverrides: Partial<ThemePalette>;
}
