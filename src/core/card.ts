import type { CodeChefUser, CardConfig, ThemePalette } from "./types";
import { CARD_FONTS, DEFAULT_FONT } from "./types";
import { Item } from "./item";
import { rect, text, setCardFont, getCardFont } from "./elements";
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

  // CodeChef icon + text — top-right, as a fixed block from right edge
  // Icon: 24x24 path scaled to 1.5x = 36px rendered
  const ccRight = w - PADDING;
  const ccScale = 1.5;
  const ccRenderedW = Math.round(24 * ccScale); // 36px
  const ccGap = 4;
  const ccTextW = 62;
  const ccBlockStart = ccRight - ccTextW - ccGap - ccRenderedW;
  const ccIconY = PADDING;
  children.push(
    new Item("g", { transform: `translate(${ccBlockStart},${ccIconY}) scale(${ccScale})` }, [
      new Item("path", {
        d: "M11.007 0c-.787.031-1.515.37-2.222.685a12.27 12.27 0 01-1.864.703c-.635.176-1.3.354-1.814.788-.222.18-.356.439-.529.662-.309.486-.448 1.067-.457 1.638.036.61.216 1.2.376 1.786.368 1.262.807 2.503 1.197 3.759.366 1.161.703 2.344 1.294 3.416.197.394.35.808.535 1.206.027.067.052.158.142.149.136-.012.243-.115.368-.164.828-.414 1.74-.642 2.655-.749.708-.074 1.43-.078 2.131.054.72.163 1.417.426 2.092.724.36.172.719.348 1.088.498.048.04.135.058.16-.016.219-.327.469-.635.667-.976.495-1.061.522-2.279 1.038-3.331.358-.721.892-1.337 1.266-2.048.175-.266.431-.467.588-.747.437-.669.78-1.398 1.05-2.15.102-.293.172-.612.09-.919-.06-.299-.202-.57-.318-.848a2.481 2.481 0 00-.278-.66c-.407-.676-1.07-1.149-1.743-1.536-1.045-.59-2.196-.969-3.351-1.28A20.733 20.733 0 0011.426.01a5.005 5.005 0 00-.42-.01zm.577 17.61c-.553.051-1.044.335-1.542.559-.304.156-.662.312-1.005.187-.377-.12-.707-.35-1.059-.52-.075-.013-.061.077-.047.122.081.53.129 1.102.454 1.55.338.437.902.618 1.433.667.797.072 1.642-.118 2.271-.629.309-.262.571-.631.585-1.049-.006-.324-.244-.596-.524-.734a1.085 1.085 0 00-.566-.153zm2.58.008c-.396.052-.815.262-.972.65-.129.358.034.748.272 1.02.426.509 1.07.793 1.718.884.577.078 1.186.014 1.714-.24.438-.225.767-.655.85-1.142.064-.291.081-.59.124-.884-.066-.078-.148.038-.218.052-.337.142-.647.367-1.01.435-.363.024-.687-.172-1.015-.293-.43-.178-.851-.403-1.315-.478a1.21 1.21 0 00-.147-.004z",
        fill: theme.subtext,
      }),
    ])
  );
  children.push(
    text("CodeChef", ccBlockStart + ccRenderedW + ccGap, PADDING + 20, {
      size: 13,
      fill: theme.subtext,
      weight: "600",
    })
  );

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
