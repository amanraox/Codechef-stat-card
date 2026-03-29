import type { ThemePalette } from "../types";
import { registerTheme } from "./_theme";

const gradientPeach: ThemePalette = {
  name: "gradient-peach",
  bg: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ff9a9e 100%)",
  border: "rgba(180,100,80,0.2)",
  title: "#5b2c1a",
  text: "#7c3a2a",
  subtext: "rgba(120,60,40,0.6)",
  accent: "#d4451a",
  star: "#e8850c",
  gridEmpty: "rgba(180,100,80,0.12)",
  gridFill: "#d4451a",
  chartLine: "#d4451a",
  chartDot: "#7c3a2a",
};

registerTheme(gradientPeach);
export default gradientPeach;
