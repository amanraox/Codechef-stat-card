import type { ThemePalette } from "../types";
import { registerTheme } from "./_theme";

// Ocean gradient — deep teal to indigo
const gradientOcean: ThemePalette = {
  name: "gradient-ocean",
  bg: "linear-gradient(135deg, #0f2027 0%, #203a43 40%, #2c5364 100%)",
  border: "rgba(255,255,255,0.12)",
  title: "#e0f7fa",
  text: "#80deea",
  subtext: "rgba(255,255,255,0.5)",
  accent: "#00e5ff",
  star: "#ffd54f",
  gridEmpty: "rgba(255,255,255,0.08)",
  gridFill: "#00e5ff",
  chartLine: "#00e5ff",
  chartDot: "#80deea",
};

registerTheme(gradientOcean);
export default gradientOcean;
