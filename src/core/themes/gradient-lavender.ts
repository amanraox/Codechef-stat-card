import type { ThemePalette } from "../types";
import { registerTheme } from "./_theme";

const gradientLavender: ThemePalette = {
  name: "gradient-lavender",
  bg: "linear-gradient(135deg, #f3e7e9 0%, #e3eeff 40%, #d5c8f0 100%)",
  border: "rgba(100,60,140,0.15)",
  title: "#3b1f6e",
  text: "#5c3d99",
  subtext: "rgba(60,30,110,0.5)",
  accent: "#7c4dff",
  star: "#ff9100",
  gridEmpty: "rgba(100,60,140,0.1)",
  gridFill: "#7c4dff",
  chartLine: "#5c3d99",
  chartDot: "#7c4dff",
};

registerTheme(gradientLavender);
export default gradientLavender;
