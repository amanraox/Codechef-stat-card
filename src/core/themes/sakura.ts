import type { ThemePalette } from "../types";
import { registerTheme } from "./_theme";

// Sakura — soft pink light theme
const sakura: ThemePalette = {
  name: "sakura",
  bg: "#fef6f9",
  border: "#f5d5df",
  title: "#6b2148",
  text: "#9b3e6f",
  subtext: "#c48ba5",
  accent: "#d63384",
  star: "#f59e0b",
  gridEmpty: "#fce8f0",
  gridFill: "#d63384",
  chartLine: "#d63384",
  chartDot: "#9b3e6f",
};

registerTheme(sakura);
export default sakura;
