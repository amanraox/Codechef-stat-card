import type { ThemePalette } from "../types";
import { registerTheme } from "./_theme";

// Aurora — northern lights inspired, teal-green glow on dark
const aurora: ThemePalette = {
  name: "aurora",
  bg: "#0f1923",
  border: "#1a2d3d",
  title: "#a3f7bf",
  text: "#7fdbca",
  subtext: "#4b6a7a",
  accent: "#c792ea",
  star: "#ffd580",
  gridEmpty: "#152232",
  gridFill: "#a3f7bf",
  chartLine: "#7fdbca",
  chartDot: "#c792ea",
};

registerTheme(aurora);
export default aurora;
