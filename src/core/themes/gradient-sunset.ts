import type { ThemePalette } from "../types";
import { registerTheme } from "./_theme";

// Sunset gradient — warm orange-to-purple
const gradientSunset: ThemePalette = {
  name: "gradient-sunset",
  bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #fda085 100%)",
  border: "rgba(255,255,255,0.25)",
  title: "#ffffff",
  text: "#fff0f0",
  subtext: "rgba(255,255,255,0.7)",
  accent: "#ffffff",
  star: "#ffd700",
  gridEmpty: "rgba(255,255,255,0.15)",
  gridFill: "#ffffff",
  chartLine: "#ffffff",
  chartDot: "#ffd700",
};

registerTheme(gradientSunset);
export default gradientSunset;
