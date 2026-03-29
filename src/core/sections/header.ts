import type { CodeChefUser, ThemePalette } from "../types";
import { Item } from "../item";
import { text, rect, circle, group, path } from "../elements";

const STAR_PATH =
  "M0,-10 L2.94,-4.05 9.51,-3.09 4.76,1.55 5.88,8.09 0,5 L-5.88,8.09 -4.76,1.55 -9.51,-3.09 -2.94,-4.05Z";

// CodeChef logo as a simple chef hat SVG path
const CHEF_HAT_PATH =
  "M12 2C9.5 2 7.5 3.5 7.5 5.5c0 .5.1 1 .3 1.4C6.1 7.6 5 9.2 5 11v1h14v-1c0-1.8-1.1-3.4-2.8-4.1.2-.4.3-.9.3-1.4C16.5 3.5 14.5 2 12 2zM5 13v1.5c0 .3.2.5.5.5h13c.3 0 .5-.2.5-.5V13H5z";

function starShape(cx: number, cy: number, size: number, fill: string): Item {
  const scale = size / 20;
  return path(STAR_PATH, { fill, stroke: "none" }).tap((item) => {
    item.attrs["transform"] = `translate(${cx},${cy}) scale(${scale})`;
  });
}

const AVATAR_SIZE = 64;
const AVATAR_MARGIN = 16;

export function renderHeader(
  user: CodeChefUser,
  theme: ThemePalette,
  x: number,
  y: number
): { item: Item; height: number } {
  const children: Item[] = [];
  const tierColor = user.starColor || theme.title;

  // --- Left: Avatar ---
  const avatarX = x;
  const avatarY = y;
  const avatarR = AVATAR_SIZE / 2;

  // Circular clip + border
  const clipId = "avatarClip";
  children.push(
    new Item("defs", {}, [
      new Item("clipPath", { id: clipId }, [
        new Item("circle", { cx: avatarX + avatarR, cy: avatarY + avatarR, r: avatarR - 1 }),
      ]),
    ])
  );

  // Avatar border ring
  children.push(
    circle(avatarX + avatarR, avatarY + avatarR, avatarR, { fill: tierColor }).tap((item) => {
      item.attrs["opacity"] = 0.2;
    })
  );
  children.push(
    circle(avatarX + avatarR, avatarY + avatarR, avatarR - 2, { fill: theme.bg.startsWith("linear") ? "rgba(0,0,0,0.3)" : theme.bg })
  );

  if (user.avatarUrl && !user.avatarUrl.includes("user_default")) {
    // Real avatar image
    children.push(
      new Item("image", {
        href: user.avatarUrl,
        x: avatarX,
        y: avatarY,
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        "clip-path": `url(#${clipId})`,
        preserveAspectRatio: "xMidYMid slice",
      })
    );
  } else {
    // CodeChef logo fallback
    children.push(
      new Item("g", { transform: `translate(${avatarX + 12},${avatarY + 16}) scale(1.7)` }, [
        path(CHEF_HAT_PATH, { fill: tierColor }),
      ])
    );
  }

  // --- Right: Name + stars + username ---
  const textX = avatarX + AVATAR_SIZE + AVATAR_MARGIN;
  let textY = y + 4;

  // Display name
  const displayName = user.name || user.username;
  children.push(
    text(displayName, textX, textY + 16, {
      size: 18,
      fill: tierColor,
      weight: "bold",
    })
  );
  textY += 24;

  // Stars badge
  if (user.stars) {
    const starSize = 12;
    const starGap = 15;
    const badgeX = textX;
    const badgeY = textY;
    const badgeW = user.stars * starGap + 10;
    const badgeH = 20;

    children.push(rect(badgeX, badgeY, badgeW, badgeH, { fill: tierColor, rx: 4 }));
    for (let i = 0; i < user.stars; i++) {
      children.push(starShape(badgeX + 11 + i * starGap, badgeY + badgeH / 2, starSize, "#ffffff"));
    }

    // Division label next to stars
    if (user.division) {
      children.push(
        text(user.division, badgeX + badgeW + 8, badgeY + 14, {
          size: 11,
          fill: theme.subtext,
        })
      );
    }
    textY += 26;
  }

  // Username subtitle
  if (user.name) {
    children.push(
      text(`@${user.username}`, textX, textY + 12, {
        size: 12,
        fill: theme.subtext,
      })
    );
    textY += 16;
  }

  // Country
  if (user.country) {
    children.push(
      text(user.country, textX, textY + 12, {
        size: 11,
        fill: theme.subtext,
      })
    );
  }

  const height = Math.max(AVATAR_SIZE + 4, textY - y + 16);
  return { item: group(children), height };
}
