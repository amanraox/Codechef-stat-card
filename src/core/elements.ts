import { Item } from "./item";

/** Module-level font family, set by the card assembler before rendering */
let _fontFamily = "'Roboto', sans-serif";

export function setCardFont(family: string) {
  _fontFamily = family;
}

export function getCardFont(): string {
  return _fontFamily;
}

export function text(
  content: string,
  x: number,
  y: number,
  opts: {
    size?: number;
    fill?: string;
    weight?: string;
    anchor?: string;
    fontFamily?: string;
  } = {}
): Item {
  return new Item(
    "text",
    {
      x,
      y,
      fill: opts.fill || "#000",
      "font-size": opts.size || 14,
      "font-weight": opts.weight || "normal",
      "font-family": opts.fontFamily || _fontFamily,
      ...(opts.anchor ? { "text-anchor": opts.anchor } : {}),
    },
    [content]
  );
}

export function rect(
  x: number,
  y: number,
  w: number,
  h: number,
  opts: { fill?: string; rx?: number; stroke?: string; strokeWidth?: number } = {}
): Item {
  return new Item("rect", {
    x,
    y,
    width: w,
    height: h,
    fill: opts.fill || "none",
    ...(opts.rx ? { rx: opts.rx } : {}),
    ...(opts.stroke ? { stroke: opts.stroke, "stroke-width": opts.strokeWidth || 1 } : {}),
  });
}

export function line(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  opts: { stroke?: string; width?: number } = {}
): Item {
  return new Item("line", {
    x1,
    y1,
    x2,
    y2,
    stroke: opts.stroke || "#ccc",
    "stroke-width": opts.width || 1,
  });
}

export function circle(
  cx: number,
  cy: number,
  r: number,
  opts: { fill?: string } = {}
): Item {
  return new Item("circle", {
    cx,
    cy,
    r,
    fill: opts.fill || "#000",
  });
}

export function group(
  children: Item[],
  opts: { transform?: string; opacity?: number } = {}
): Item {
  return new Item(
    "g",
    {
      ...(opts.transform ? { transform: opts.transform } : {}),
      ...(opts.opacity !== undefined ? { opacity: opts.opacity } : {}),
    },
    children
  );
}

export function path(d: string, opts: { fill?: string; stroke?: string; strokeWidth?: number } = {}): Item {
  return new Item("path", {
    d,
    fill: opts.fill || "none",
    ...(opts.stroke ? { stroke: opts.stroke } : {}),
    ...(opts.strokeWidth ? { "stroke-width": opts.strokeWidth } : {}),
  });
}
