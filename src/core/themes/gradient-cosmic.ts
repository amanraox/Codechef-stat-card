import type { ThemePalette } from "../types";
import { registerTheme } from "./_theme";

// Cosmic — deep violet-to-indigo with electric blue sparks
const gradientCosmic: ThemePalette = {
  name: "gradient-cosmic",
  bg: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
  border: "rgba(130,100,255,0.2)",
  title: "#e8ddff",
  text: "#a78bfa",
  subtext: "rgba(167,139,250,0.5)",
  accent: "#818cf8",
  star: "#fbbf24",
  gridEmpty: "rgba(130,100,255,0.08)",
  gridFill: "#818cf8",
  chartLine: "#a78bfa",
  chartDot: "#818cf8",
};

registerTheme(gradientCosmic);
export default gradientCosmic;
