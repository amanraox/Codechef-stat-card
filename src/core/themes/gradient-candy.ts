import type { ThemePalette } from "../types";
import { registerTheme } from "./_theme";

// Candy — playful pastel pink-to-blue light gradient
const gradientCandy: ThemePalette = {
  name: "gradient-candy",
  bg: "linear-gradient(135deg, #fff1f5 0%, #fce4f0 25%, #e8d5f5 50%, #d5e4fc 75%, #f0f7ff 100%)",
  border: "rgba(140,80,180,0.15)",
  title: "#6b2190",
  text: "#9b3db5",
  subtext: "rgba(107,33,144,0.45)",
  accent: "#e040fb",
  star: "#ff9100",
  gridEmpty: "rgba(140,80,180,0.1)",
  gridFill: "#e040fb",
  chartLine: "#9b3db5",
  chartDot: "#e040fb",
};

registerTheme(gradientCandy);
export default gradientCandy;
