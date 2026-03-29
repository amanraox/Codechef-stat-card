import type { ThemePalette } from "../types";
import { registerTheme } from "./_theme";

const gradientMint: ThemePalette = {
  name: "gradient-mint",
  bg: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 35%, #a5d6a7 70%, #e0f2f1 100%)",
  border: "rgba(27,94,32,0.15)",
  title: "#1b5e20",
  text: "#2e7d32",
  subtext: "rgba(27,94,32,0.5)",
  accent: "#00c853",
  star: "#ff8f00",
  gridEmpty: "rgba(27,94,32,0.1)",
  gridFill: "#00c853",
  chartLine: "#2e7d32",
  chartDot: "#00c853",
};

registerTheme(gradientMint);
export default gradientMint;
