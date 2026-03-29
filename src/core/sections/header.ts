import type { CodeChefUser, ThemePalette } from "../types";
import { Item } from "../item";
import { text, rect, group, path } from "../elements";

// 5-point star path centered at (0,0), radius ~10
const STAR_PATH =
  "M0,-10 L2.94,-4.05 9.51,-3.09 4.76,1.55 5.88,8.09 0,5 L-5.88,8.09 -4.76,1.55 -9.51,-3.09 -2.94,-4.05Z";

function starShape(cx: number, cy: number, size: number, fill: string): Item {
  const scale = size / 20; // base path fits in 20x20
  return path(STAR_PATH, { fill, stroke: "none" }).tap((item) => {
    item.attrs["transform"] = `translate(${cx},${cy}) scale(${scale})`;
  });
}

export function renderHeader(
  user: CodeChefUser,
  theme: ThemePalette,
  x: number,
  y: number
): { item: Item; height: number } {
  const children: Item[] = [];
  const tierColor = user.starColor || theme.title;

  // Username / display name — colored by rating tier
  const displayName = user.name || user.username;
  children.push(
    text(displayName, x, y + 24, {
      size: 20,
      fill: tierColor,
      weight: "bold",
    })
  );

  // Stars — SVG path shapes on a pill badge
  if (user.stars) {
    const starSize = 14;
    const starGap = 17;
    const badgeX = x;
    const badgeY = y + 34;
    const badgeW = user.stars * starGap + 10;
    const badgeH = 22;

    // Background pill
    children.push(
      rect(badgeX, badgeY, badgeW, badgeH, {
        fill: tierColor,
        rx: 4,
      })
    );

    // Individual star shapes
    for (let i = 0; i < user.stars; i++) {
      const cx = badgeX + 13 + i * starGap;
      const cy = badgeY + badgeH / 2;
      children.push(starShape(cx, cy, starSize, "#ffffff"));
    }
  }

  // Username subtitle if we showed name
  if (user.name) {
    children.push(
      text(`@${user.username}`, x, y + (user.stars ? 74 : 48), {
        size: 13,
        fill: theme.subtext,
      })
    );
  }

  const height = user.name ? (user.stars ? 84 : 58) : (user.stars ? 66 : 34);
  return { item: group(children), height };
}
