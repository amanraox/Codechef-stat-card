import type { ThemePalette } from "../types";
import { registerTheme } from "./_theme";

// Neon gradient — electric pink to cyan
const gradientNeon: ThemePalette = {
  name: "gradient-neon",
  bg: "linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 40%, #0a1628 100%)",
  border: "rgba(255,46,151,0.3)",
  title: "#00ffd5",
  text: "#ff2e97",
  subtext: "rgba(0,255,213,0.5)",
  accent: "#ff2e97",
  star: "#ffe44d",
  gridEmpty: "rgba(255,46,151,0.08)",
  gridFill: "#00ffd5",
  chartLine: "#ff2e97",
  chartDot: "#00ffd5",
};

registerTheme(gradientNeon);
export default gradientNeon;
