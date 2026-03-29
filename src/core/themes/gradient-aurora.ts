import type { ThemePalette } from "../types";
import { registerTheme } from "./_theme";

// Aurora gradient — green to purple northern lights
const gradientAurora: ThemePalette = {
  name: "gradient-aurora",
  bg: "linear-gradient(135deg, #0d1b2a 0%, #1b4332 35%, #2d1b69 70%, #0d1b2a 100%)",
  border: "rgba(163,247,191,0.2)",
  title: "#a3f7bf",
  text: "#7fdbca",
  subtext: "rgba(163,247,191,0.55)",
  accent: "#c792ea",
  star: "#ffd580",
  gridEmpty: "rgba(255,255,255,0.06)",
  gridFill: "#a3f7bf",
  chartLine: "#c792ea",
  chartDot: "#a3f7bf",
};

registerTheme(gradientAurora);
export default gradientAurora;
