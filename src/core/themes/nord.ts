import type { ThemePalette } from "../types";
import { registerTheme } from "./_theme";

const nord: ThemePalette = {
  name: "nord",
  bg: "#2e3440",
  border: "#4c566a",
  title: "#eceff4",
  text: "#d8dee9",
  subtext: "#a5b1c2",
  accent: "#88c0d0",
  star: "#ebcb8b",
  gridEmpty: "#3b4252",
  gridFill: "#88c0d0",
  chartLine: "#88c0d0",
  chartDot: "#81a1c1",
};

registerTheme(nord);
export default nord;
