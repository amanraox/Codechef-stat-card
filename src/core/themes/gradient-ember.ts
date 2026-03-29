import type { ThemePalette } from "../types";
import { registerTheme } from "./_theme";

// Ember gradient — smoldering red-to-amber on black
const gradientEmber: ThemePalette = {
  name: "gradient-ember",
  bg: "linear-gradient(135deg, #0f0a07 0%, #2d0a0a 35%, #4a1a08 65%, #1a0a00 100%)",
  border: "rgba(255,107,53,0.2)",
  title: "#ffddc1",
  text: "#ff9966",
  subtext: "rgba(255,153,102,0.45)",
  accent: "#ff4500",
  star: "#ffc857",
  gridEmpty: "rgba(255,107,53,0.08)",
  gridFill: "#ff4500",
  chartLine: "#ff9966",
  chartDot: "#ff4500",
};

registerTheme(gradientEmber);
export default gradientEmber;
