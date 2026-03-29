import type { ThemePalette } from "../types";
import { registerTheme } from "./_theme";

// Cyberpunk — electric cyan and hot pink on dark
const cyberpunk: ThemePalette = {
  name: "cyberpunk",
  bg: "#0a0e17",
  border: "#1a1f33",
  title: "#00ffd5",
  text: "#00d4ff",
  subtext: "#4a5688",
  accent: "#ff2e97",
  star: "#ffe44d",
  gridEmpty: "#111827",
  gridFill: "#00ffd5",
  chartLine: "#ff2e97",
  chartDot: "#00ffd5",
};

registerTheme(cyberpunk);
export default cyberpunk;
