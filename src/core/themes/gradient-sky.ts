import type { ThemePalette } from "../types";
import { registerTheme } from "./_theme";

const gradientSky: ThemePalette = {
  name: "gradient-sky",
  bg: "linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 30%, #80deea 70%, #a7ffeb 100%)",
  border: "rgba(0,105,135,0.15)",
  title: "#004d5a",
  text: "#00695c",
  subtext: "rgba(0,77,90,0.55)",
  accent: "#00838f",
  star: "#ff8f00",
  gridEmpty: "rgba(0,105,135,0.1)",
  gridFill: "#00838f",
  chartLine: "#00695c",
  chartDot: "#00838f",
};

registerTheme(gradientSky);
export default gradientSky;
