import type { ThemePalette } from "../types";
import { registerTheme } from "./_theme";

const light: ThemePalette = {
  name: "light",
  bg: "#ffffff",
  border: "#e4e2e2",
  title: "#2f363d",
  text: "#586069",
  subtext: "#8b949e",
  accent: "#5b4638",
  star: "#f5a623",
  gridEmpty: "#ebedf0",
  gridFill: "#5b4638",
  chartLine: "#5b4638",
  chartDot: "#5b4638",
};

registerTheme(light);
export default light;
