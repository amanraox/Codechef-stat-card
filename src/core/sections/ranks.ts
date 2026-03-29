import type { CodeChefUser, ThemePalette } from "../types";
import { Item } from "../item";
import { text, group } from "../elements";

const COUNTRY_FLAGS: Record<string, string> = {
  in: "\u{1F1EE}\u{1F1F3}", af: "\u{1F1E6}\u{1F1EB}", al: "\u{1F1E6}\u{1F1F1}",
  dz: "\u{1F1E9}\u{1F1FF}", ar: "\u{1F1E6}\u{1F1F7}", au: "\u{1F1E6}\u{1F1FA}",
  at: "\u{1F1E6}\u{1F1F9}", bd: "\u{1F1E7}\u{1F1E9}", by: "\u{1F1E7}\u{1F1FE}",
  be: "\u{1F1E7}\u{1F1EA}", br: "\u{1F1E7}\u{1F1F7}", bg: "\u{1F1E7}\u{1F1EC}",
  ca: "\u{1F1E8}\u{1F1E6}", cl: "\u{1F1E8}\u{1F1F1}", cn: "\u{1F1E8}\u{1F1F3}",
  co: "\u{1F1E8}\u{1F1F4}", hr: "\u{1F1ED}\u{1F1F7}", cz: "\u{1F1E8}\u{1F1FF}",
  dk: "\u{1F1E9}\u{1F1F0}", eg: "\u{1F1EA}\u{1F1EC}", fi: "\u{1F1EB}\u{1F1EE}",
  fr: "\u{1F1EB}\u{1F1F7}", de: "\u{1F1E9}\u{1F1EA}", gr: "\u{1F1EC}\u{1F1F7}",
  hu: "\u{1F1ED}\u{1F1FA}", id: "\u{1F1EE}\u{1F1E9}", ir: "\u{1F1EE}\u{1F1F7}",
  iq: "\u{1F1EE}\u{1F1F6}", ie: "\u{1F1EE}\u{1F1EA}", il: "\u{1F1EE}\u{1F1F1}",
  it: "\u{1F1EE}\u{1F1F9}", jp: "\u{1F1EF}\u{1F1F5}", ke: "\u{1F1F0}\u{1F1EA}",
  kr: "\u{1F1F0}\u{1F1F7}", my: "\u{1F1F2}\u{1F1FE}", mx: "\u{1F1F2}\u{1F1FD}",
  nl: "\u{1F1F3}\u{1F1F1}", nz: "\u{1F1F3}\u{1F1FF}", ng: "\u{1F1F3}\u{1F1EC}",
  no: "\u{1F1F3}\u{1F1F4}", pk: "\u{1F1F5}\u{1F1F0}", pe: "\u{1F1F5}\u{1F1EA}",
  ph: "\u{1F1F5}\u{1F1ED}", pl: "\u{1F1F5}\u{1F1F1}", pt: "\u{1F1F5}\u{1F1F9}",
  ro: "\u{1F1F7}\u{1F1F4}", ru: "\u{1F1F7}\u{1F1FA}", sa: "\u{1F1F8}\u{1F1E6}",
  sg: "\u{1F1F8}\u{1F1EC}", za: "\u{1F1FF}\u{1F1E6}", es: "\u{1F1EA}\u{1F1F8}",
  se: "\u{1F1F8}\u{1F1EA}", ch: "\u{1F1E8}\u{1F1ED}", tw: "\u{1F1F9}\u{1F1FC}",
  th: "\u{1F1F9}\u{1F1ED}", tr: "\u{1F1F9}\u{1F1F7}", ua: "\u{1F1FA}\u{1F1E6}",
  ae: "\u{1F1E6}\u{1F1EA}", gb: "\u{1F1EC}\u{1F1E7}", us: "\u{1F1FA}\u{1F1F8}",
  vn: "\u{1F1FB}\u{1F1F3}", lk: "\u{1F1F1}\u{1F1F0}", np: "\u{1F1F3}\u{1F1F5}",
};

export function renderRanks(
  user: CodeChefUser,
  theme: ThemePalette,
  x: number,
  y: number,
  hide: Set<string>
): { item: Item; height: number } {
  const children: Item[] = [];
  let offsetY = 0;

  if (user.globalRank !== null && !hide.has("globalRank")) {
    children.push(
      text("Global Rank", x, y + offsetY + 14, {
        size: 12,
        fill: theme.subtext,
      })
    );
    children.push(
      text(`#${user.globalRank}`, x + 120, y + offsetY + 14, {
        size: 14,
        fill: theme.text,
        weight: "bold",
      })
    );
    offsetY += 24;
  }

  if (user.countryRank !== null && !hide.has("countryRank")) {
    const flag =
      user.countryCode && COUNTRY_FLAGS[user.countryCode]
        ? COUNTRY_FLAGS[user.countryCode] + " "
        : "";
    const label = user.country ? `${flag}Country Rank` : "Country Rank";

    children.push(
      text(label, x, y + offsetY + 14, {
        size: 12,
        fill: theme.subtext,
      })
    );
    children.push(
      text(`#${user.countryRank}`, x + 120, y + offsetY + 14, {
        size: 14,
        fill: theme.text,
        weight: "bold",
      })
    );
    offsetY += 24;
  }

  if (children.length === 0) return { item: group([]), height: 0 };
  return { item: group(children), height: offsetY };
}
