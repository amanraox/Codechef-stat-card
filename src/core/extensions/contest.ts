import type { ContestEntry, ThemePalette } from "../types";
import { Item } from "../item";
import { text, group, circle, path, line, rect } from "../elements";

const CHART_HEIGHT = 100;
const PADDING_TOP = 30;
const LABEL_WIDTH = 40;

function isGradientOrRgba(color: string): boolean {
  return color.startsWith("linear-gradient") || color.startsWith("rgba");
}

export function renderContestChart(
  contests: ContestEntry[],
  theme: ThemePalette,
  x: number,
  y: number,
  width: number
): { item: Item; height: number } {
  if (contests.length < 2) {
    return { item: group([]), height: 0 };
  }

  const children: Item[] = [];
  const chartX = x + LABEL_WIDTH;
  const chartWidth = width - LABEL_WIDTH;
  const chartY = y + PADDING_TOP;

  // Title
  children.push(
    text("Rating History", x, y + 14, {
      size: 13,
      fill: theme.text,
      weight: "600",
    })
  );

  const last20 = contests.slice(-20);
  const ratings = last20.map((c) => c.rating);
  const minR = Math.min(...ratings);
  const maxR = Math.max(...ratings);
  const range = maxR - minR || 1;

  const paddedMin = minR - range * 0.1;
  const paddedMax = maxR + range * 0.1;
  const paddedRange = paddedMax - paddedMin;

  // Chart area — transparent bg with subtle rounded border
  // Use a translucent fill so it blends with any background (solid, gradient, or image)
  const chartBgFill = isGradientOrRgba(theme.bg)
    ? "rgba(255,255,255,0.05)"
    : theme.bg;
  const chartBorderColor = isGradientOrRgba(theme.border)
    ? "rgba(255,255,255,0.12)"
    : theme.border;

  children.push(
    rect(chartX, chartY, chartWidth, CHART_HEIGHT, {
      fill: chartBgFill,
      rx: 4,
      stroke: chartBorderColor,
    })
  );

  // Grid lines + labels
  const gridLineColor = isGradientOrRgba(theme.border)
    ? "rgba(255,255,255,0.08)"
    : theme.border;

  const gridLines = 3;
  for (let i = 0; i <= gridLines; i++) {
    const gy = chartY + (CHART_HEIGHT * i) / gridLines;
    children.push(
      line(chartX, gy, chartX + chartWidth, gy, {
        stroke: gridLineColor,
        width: 0.5,
      })
    );
    const ratingLabel = Math.round(paddedMax - (paddedRange * i) / gridLines);
    children.push(
      text(String(ratingLabel), chartX - 6, gy + 4, {
        size: 9,
        fill: theme.subtext,
        anchor: "end",
      })
    );
  }

  // Plot points
  const points: { px: number; py: number }[] = [];
  for (let i = 0; i < last20.length; i++) {
    const px = chartX + (i / (last20.length - 1)) * chartWidth;
    const py =
      chartY +
      CHART_HEIGHT -
      ((last20[i].rating - paddedMin) / paddedRange) * CHART_HEIGHT;
    points.push({ px, py });
  }

  // Gradient fill under the line
  if (points.length > 1) {
    const gradId = "chartGrad";
    const defs = new Item("defs", {}, [
      new Item("linearGradient", { id: gradId, x1: 0, y1: 0, x2: 0, y2: 1 }, [
        new Item("stop", { offset: "0%", "stop-color": theme.chartLine, "stop-opacity": 0.25 }),
        new Item("stop", { offset: "100%", "stop-color": theme.chartLine, "stop-opacity": 0.02 }),
      ]),
    ]);
    children.push(defs);

    // Area fill
    const areaD =
      `M${points[0].px.toFixed(1)},${(chartY + CHART_HEIGHT).toFixed(1)} ` +
      points.map((p) => `L${p.px.toFixed(1)},${p.py.toFixed(1)}`).join(" ") +
      ` L${points[points.length - 1].px.toFixed(1)},${(chartY + CHART_HEIGHT).toFixed(1)} Z`;
    children.push(path(areaD, { fill: `url(#${gradId})` }));

    // Line
    const d = points
      .map((p, i) => `${i === 0 ? "M" : "L"}${p.px.toFixed(1)},${p.py.toFixed(1)}`)
      .join(" ");
    children.push(path(d, { stroke: theme.chartLine, strokeWidth: 2 }));
  }

  // Dots
  for (const p of points) {
    children.push(circle(p.px, p.py, 3, { fill: theme.chartDot }));
  }

  const height = PADDING_TOP + CHART_HEIGHT + 10;
  return { item: group(children), height };
}
