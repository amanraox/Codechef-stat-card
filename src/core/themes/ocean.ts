import type { ThemePalette } from "../types";
import { registerTheme } from "./_theme";

// Tokyonight — deep blue-black with neon blue/purple accents
const tokyonight: ThemePalette = {
  name: "tokyonight",
  bg: "#1a1b26",
  border: "#292e42",
  title: "#c0caf5",
  text: "#7aa2f7",
  subtext: "#565f89",
  accent: "#bb9af7",
  star: "#e0af68",
  gridEmpty: "#292e42",
  gridFill: "#7aa2f7",
  chartLine: "#7aa2f7",
  chartDot: "#bb9af7",
};

registerTheme(tokyonight);
export default tokyonight;
