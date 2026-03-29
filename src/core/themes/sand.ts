import type { ThemePalette } from "../types";
import { registerTheme } from "./_theme";

// Sand — warm beige light theme with terracotta accents
const sand: ThemePalette = {
  name: "sand",
  bg: "#fdf8f0",
  border: "#e8dcc8",
  title: "#5d4037",
  text: "#795548",
  subtext: "#bcaaa4",
  accent: "#bf360c",
  star: "#f57c00",
  gridEmpty: "#efebe0",
  gridFill: "#bf360c",
  chartLine: "#bf360c",
  chartDot: "#5d4037",
};

registerTheme(sand);
export default sand;
