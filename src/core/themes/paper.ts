import type { ThemePalette } from "../types";
import { registerTheme } from "./_theme";

// Paper — clean off-white with ink-blue accents
const paper: ThemePalette = {
  name: "paper",
  bg: "#faf9f6",
  border: "#e8e4de",
  title: "#1a1a2e",
  text: "#16213e",
  subtext: "#8d8d8d",
  accent: "#0f3460",
  star: "#e94560",
  gridEmpty: "#eeebe5",
  gridFill: "#0f3460",
  chartLine: "#0f3460",
  chartDot: "#e94560",
};

registerTheme(paper);
export default paper;
