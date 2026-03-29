import type { ThemePalette } from "../types";
import { registerTheme } from "./_theme";

// Ocean Light — cool blue-white with teal accents
const oceanLight: ThemePalette = {
  name: "ocean-light",
  bg: "#f0f9ff",
  border: "#bae6fd",
  title: "#0c4a6e",
  text: "#0369a1",
  subtext: "#7dd3fc",
  accent: "#0284c7",
  star: "#f59e0b",
  gridEmpty: "#e0f2fe",
  gridFill: "#0284c7",
  chartLine: "#0284c7",
  chartDot: "#0c4a6e",
};

registerTheme(oceanLight);
export default oceanLight;
