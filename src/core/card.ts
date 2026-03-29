import type { CodeChefUser, CardConfig, ThemePalette } from "./types";
import { CARD_FONTS, DEFAULT_FONT } from "./types";
import { Item } from "./item";
import { rect, setCardFont, getCardFont } from "./elements";
import { renderHeader, renderRatings } from "./sections";
import { renderHeatmap, renderContestChart } from "./extensions";

const PADDING = 20;

const GOOGLE_FONT_NAMES: Record<string, string> = {
  roboto: "Roboto:wght@400;700",
  "roboto mono": "Roboto+Mono:wght@400;600",
  "fira code": "Fira+Code:wght@400;600",
  "jetbrains mono": "JetBrains+Mono:wght@400;700",
  "source code pro": "Source+Code+Pro:wght@400;600",
  inter: "Inter:wght@400;600;700",
  poppins: "Poppins:wght@400;600;700",
  "space grotesk": "Space+Grotesk:wght@400;600;700",
  ubuntu: "Ubuntu:wght@400;700",
  "ubuntu mono": "Ubuntu+Mono:wght@400;700",
};

/** Parse a CSS linear-gradient into SVG <linearGradient> stops */
function parseGradient(css: string): {
  angle: number;
  stops: { offset: string; color: string }[];
} | null {
  const m = css.match(/linear-gradient\(\s*(\d+)deg\s*,\s*(.+)\)/);
  if (!m) return null;

  const angle = parseInt(m[1], 10);
  const stopsRaw = m[2].split(/,(?![^(]*\))/);
  const stops: { offset: string; color: string }[] = [];

  for (const s of stopsRaw) {
    const parts = s.trim().match(/^(.+?)\s+(\d+)%$/);
    if (parts) {
      stops.push({ color: parts[1].trim(), offset: `${parts[2]}%` });
    } else {
      stops.push({ color: s.trim(), offset: stops.length === 0 ? "0%" : "100%" });
    }
  }

  return { angle, stops };
}

/** Convert angle (degrees) to SVG linearGradient x1/y1/x2/y2 */
function angleToCoords(deg: number): { x1: string; y1: string; x2: string; y2: string } {
  const rad = ((deg - 90) * Math.PI) / 180;
  const x2 = Math.round((Math.cos(rad) + 1) / 2 * 100);
  const y2 = Math.round((Math.sin(rad) + 1) / 2 * 100);
  const x1 = 100 - x2;
  const y1 = 100 - y2;
  return {
    x1: `${x1}%`, y1: `${y1}%`,
    x2: `${x2}%`, y2: `${y2}%`,
  };
}

function isGradient(bg: string): boolean {
  return bg.startsWith("linear-gradient");
}

function buildBackground(
  theme: ThemePalette,
  bgImage: string | null,
  w: number,
  h: number
): { defs: Item[]; bgItems: Item[] } {
  const defs: Item[] = [];
  const bgItems: Item[] = [];
  const rx = 8;

  if (bgImage) {
    // Clip path for rounded corners
    defs.push(
      new Item("clipPath", { id: "bgClip" }, [
        new Item("rect", { x: 0, y: 0, width: w, height: h, rx }),
      ])
    );
    // Background image
    bgItems.push(
      new Item("image", {
        href: bgImage,
        x: 0, y: 0, width: w, height: h,
        preserveAspectRatio: "xMidYMid slice",
        "clip-path": "url(#bgClip)",
      })
    );
    // Semi-transparent overlay for text readability
    bgItems.push(
      rect(0.5, 0.5, w - 1, h - 1, {
        fill: "rgba(0,0,0,0.55)",
        rx,
        stroke: theme.border,
      })
    );
  } else if (isGradient(theme.bg)) {
    const grad = parseGradient(theme.bg);
    if (grad) {
      const coords = angleToCoords(grad.angle);
      defs.push(
        new Item("linearGradient", {
          id: "bgGrad",
          x1: coords.x1, y1: coords.y1,
          x2: coords.x2, y2: coords.y2,
        }, grad.stops.map((s) =>
          new Item("stop", { offset: s.offset, "stop-color": s.color })
        ))
      );
    }
    bgItems.push(
      rect(0.5, 0.5, w - 1, h - 1, {
        fill: grad ? "url(#bgGrad)" : theme.bg,
        rx,
        stroke: theme.border,
      })
    );
  } else {
    // Solid color
    bgItems.push(
      rect(0.5, 0.5, w - 1, h - 1, {
        fill: theme.bg,
        rx,
        stroke: theme.border,
      })
    );
  }

  return { defs, bgItems };
}

export function buildCard(
  user: CodeChefUser,
  config: CardConfig,
  theme: ThemePalette
): string {
  const fontKey = config.font || DEFAULT_FONT;
  const fontFamily = CARD_FONTS[fontKey] || CARD_FONTS[DEFAULT_FONT];
  setCardFont(fontFamily);

  const w = config.width;
  const sections: { item: Item; height: number }[] = [];
  let y = PADDING;

  // Header
  const header = renderHeader(user, theme, PADDING, y);
  sections.push(header);
  y += header.height + 12;

  // Ratings
  const ratings = renderRatings(user, theme, PADDING, y, config.hide, w);
  if (ratings.height > 0) {
    sections.push(ratings);
    y += ratings.height + 8;
  }

  // Extensions
  if (config.extension === "heatmap" && user.submissionStats.length > 0) {
    y += 8;
    const heatmap = renderHeatmap(user.submissionStats, theme, PADDING, y, w);
    if (heatmap.height > 0) {
      sections.push(heatmap);
      y += heatmap.height + 8;
    }
  }

  if (config.extension === "contest" && user.contestHistory.length >= 2) {
    y += 8;
    const chart = renderContestChart(user.contestHistory, theme, PADDING, y, w - PADDING * 2);
    if (chart.height > 0) {
      sections.push(chart);
      y += chart.height + 8;
    }
  }

  y += PADDING;

  // Background
  const { defs, bgItems } = buildBackground(theme, config.bgImage, w, y);
  const children = [...bgItems, ...sections.map((s) => s.item)];

  // Google Fonts
  const googleFontName = GOOGLE_FONT_NAMES[fontKey] || GOOGLE_FONT_NAMES[DEFAULT_FONT];
  const fontImport = `@import url('https://fonts.googleapis.com/css2?family=${googleFontName}&display=swap');`;

  const svgChildren: (Item | string)[] = [
    new Item("style", {}, [
      `${fontImport}
text { dominant-baseline: auto; font-family: ${getCardFont()}; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
g { animation: fadeIn 0.6s ease-out both; }
g:nth-child(${3 + defs.length}) { animation-delay: 0.1s; }
g:nth-child(${4 + defs.length}) { animation-delay: 0.2s; }
g:nth-child(${5 + defs.length}) { animation-delay: 0.3s; }
g:nth-child(${6 + defs.length}) { animation-delay: 0.4s; }`
    ]),
  ];

  if (defs.length > 0) {
    svgChildren.push(new Item("defs", {}, defs));
  }

  svgChildren.push(...children);

  const svg = new Item(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      width: w,
      height: y,
      viewBox: `0 0 ${w} ${y}`,
    },
    svgChildren
  );

  return svg.stringify();
}

export function buildErrorCard(message: string, width: number = 500): string {
  const h = 120;
  const fontFamily = "'Roboto', sans-serif";
  const svg = new Item(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height: h,
      viewBox: `0 0 ${width} ${h}`,
    },
    [
      new Item("style", {}, [
        `@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');`
      ]),
      rect(0.5, 0.5, width - 1, h - 1, {
        fill: "#fffbeb",
        rx: 8,
        stroke: "#f59e0b",
      }),
      new Item(
        "text",
        {
          x: width / 2,
          y: 45,
          fill: "#92400e",
          "font-size": 16,
          "font-weight": "bold",
          "text-anchor": "middle",
          "font-family": fontFamily,
        },
        ["CodeChef Card"]
      ),
      new Item(
        "text",
        {
          x: width / 2,
          y: 75,
          fill: "#b45309",
          "font-size": 13,
          "text-anchor": "middle",
          "font-family": fontFamily,
        },
        [message]
      ),
    ]
  );

  return svg.stringify();
}
