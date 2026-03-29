import type { ThemePalette } from "../types";
import { registerTheme } from "./_theme";

// Ember — warm fire tones, deep charcoal with orange/red accents
const ember: ThemePalette = {
  name: "ember",
  bg: "#1a1210",
  border: "#2d1f1a",
  title: "#ffddc1",
  text: "#ff9966",
  subtext: "#6b4d3e",
  accent: "#ff6b35",
  star: "#ffc857",
  gridEmpty: "#241a15",
  gridFill: "#ff6b35",
  chartLine: "#ff9966",
  chartDot: "#ff6b35",
};

registerTheme(ember);
export default ember;
