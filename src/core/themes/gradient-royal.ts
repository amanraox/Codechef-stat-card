import type { ThemePalette } from "../types";
import { registerTheme } from "./_theme";

// Royal gradient — deep navy to gold shimmer
const gradientRoyal: ThemePalette = {
  name: "gradient-royal",
  bg: "linear-gradient(135deg, #141e30 0%, #1a1a3e 50%, #243b55 100%)",
  border: "rgba(212,175,55,0.3)",
  title: "#e8d5b7",
  text: "#d4af37",
  subtext: "rgba(212,175,55,0.5)",
  accent: "#ffd700",
  star: "#ffd700",
  gridEmpty: "rgba(212,175,55,0.08)",
  gridFill: "#d4af37",
  chartLine: "#d4af37",
  chartDot: "#ffd700",
};

registerTheme(gradientRoyal);
export default gradientRoyal;
