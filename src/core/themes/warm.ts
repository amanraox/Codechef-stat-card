import type { ThemePalette } from "../types";
import { registerTheme } from "./_theme";

const warm: ThemePalette = {
  name: "warm",
  bg: "#fdf6e3",
  border: "#eee8d5",
  title: "#657b83",
  text: "#586e75",
  subtext: "#93a1a1",
  accent: "#cb4b16",
  star: "#b58900",
  gridEmpty: "#eee8d5",
  gridFill: "#cb4b16",
  chartLine: "#cb4b16",
  chartDot: "#dc322f",
};

registerTheme(warm);
export default warm;
