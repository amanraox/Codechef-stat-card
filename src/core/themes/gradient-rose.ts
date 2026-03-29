import type { ThemePalette } from "../types";
import { registerTheme } from "./_theme";

const gradientRose: ThemePalette = {
  name: "gradient-rose",
  bg: "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 40%, #f48fb1 100%)",
  border: "rgba(173,20,87,0.15)",
  title: "#880e4f",
  text: "#ad1457",
  subtext: "rgba(136,14,79,0.5)",
  accent: "#e91e63",
  star: "#ff6f00",
  gridEmpty: "rgba(173,20,87,0.1)",
  gridFill: "#e91e63",
  chartLine: "#ad1457",
  chartDot: "#e91e63",
};

registerTheme(gradientRose);
export default gradientRose;
