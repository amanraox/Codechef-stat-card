import type { ThemePalette } from "../types";
import { registerTheme } from "./_theme";

// Midnight Blue — deep sapphire to black with icy blue glow
const gradientMidnight: ThemePalette = {
  name: "gradient-midnight",
  bg: "linear-gradient(135deg, #020111 0%, #0a1628 30%, #162a50 60%, #0a0f1a 100%)",
  border: "rgba(56,189,248,0.15)",
  title: "#e0f2fe",
  text: "#38bdf8",
  subtext: "rgba(56,189,248,0.4)",
  accent: "#0ea5e9",
  star: "#fbbf24",
  gridEmpty: "rgba(56,189,248,0.06)",
  gridFill: "#0ea5e9",
  chartLine: "#38bdf8",
  chartDot: "#0ea5e9",
};

registerTheme(gradientMidnight);
export default gradientMidnight;
