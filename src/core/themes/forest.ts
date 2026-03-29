import type { ThemePalette } from "../types";
import { registerTheme } from "./_theme";

// Dracula — rich dark purple with vibrant accents
const dracula: ThemePalette = {
  name: "dracula",
  bg: "#282a36",
  border: "#44475a",
  title: "#f8f8f2",
  text: "#bd93f9",
  subtext: "#6272a4",
  accent: "#ff79c6",
  star: "#f1fa8c",
  gridEmpty: "#44475a",
  gridFill: "#ff79c6",
  chartLine: "#bd93f9",
  chartDot: "#ff79c6",
};

registerTheme(dracula);
export default dracula;
