import type { ThemePalette } from "../types";
import { registerTheme } from "./_theme";

const dark: ThemePalette = {
  name: "dark",
  bg: "#0d1117",
  border: "#30363d",
  title: "#f0f6fc",
  text: "#c9d1d9",
  subtext: "#8b949e",
  accent: "#d4a373",
  star: "#f5a623",
  gridEmpty: "#161b22",
  gridFill: "#d4a373",
  chartLine: "#d4a373",
  chartDot: "#d4a373",
};

registerTheme(dark);
export default dark;
