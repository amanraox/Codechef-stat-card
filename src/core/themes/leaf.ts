import type { ThemePalette } from "../types";
import { registerTheme } from "./_theme";

// Leaf — earthy green light theme
const leaf: ThemePalette = {
  name: "leaf",
  bg: "#f5faf5",
  border: "#c8e6c9",
  title: "#1b5e20",
  text: "#388e3c",
  subtext: "#81c784",
  accent: "#2e7d32",
  star: "#ff8f00",
  gridEmpty: "#e8f5e9",
  gridFill: "#2e7d32",
  chartLine: "#2e7d32",
  chartDot: "#1b5e20",
};

registerTheme(leaf);
export default leaf;
