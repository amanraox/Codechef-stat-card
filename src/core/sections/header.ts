import type { CodeChefUser, ThemePalette } from "../types";
import { Item } from "../item";
import { text, rect, group, path } from "../elements";

const STAR_PATH =
  "M0,-10 L2.94,-4.05 9.51,-3.09 4.76,1.55 5.88,8.09 0,5 L-5.88,8.09 -4.76,1.55 -9.51,-3.09 -2.94,-4.05Z";

function starShape(cx: number, cy: number, size: number, fill: string): Item {
  const scale = size / 20;
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
  let curY = y;

  // Display name
  const displayName = user.name || user.username;
  children.push(
    text(displayName, x, curY + 20, {
      size: 20,
      fill: tierColor,
      weight: "bold",
    })
  );
  curY += 28;

  // Stars badge + division
  if (user.stars) {
    const starSize = 13;
    const starGap = 16;
    const badgeX = x;
    const badgeY = curY;
    const badgeW = user.stars * starGap + 10;
    const badgeH = 21;

    children.push(rect(badgeX, badgeY, badgeW, badgeH, { fill: tierColor, rx: 4 }));
    for (let i = 0; i < user.stars; i++) {
      children.push(starShape(badgeX + 12 + i * starGap, badgeY + badgeH / 2, starSize, "#ffffff"));
    }

    if (user.division) {
      children.push(
        text(user.division, badgeX + badgeW + 8, badgeY + 15, {
          size: 12,
          fill: theme.subtext,
        })
      );
    }
    curY += 28;
  }

  // @username + country on same line
  const metaParts: string[] = [];
  if (user.name) metaParts.push(`@${user.username}`);
  if (user.country) metaParts.push(user.country);

  if (metaParts.length > 0) {
    children.push(
      text(metaParts.join("  ·  "), x, curY + 13, {
        size: 12,
        fill: theme.subtext,
      })
    );
    curY += 18;
  }

  const height = curY - y + 4;
  return { item: group(children), height };
}
