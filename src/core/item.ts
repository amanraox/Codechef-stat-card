export class Item {
  tag: string;
  attrs: Record<string, string | number>;
  children: (Item | string)[];

  constructor(
    tag: string,
    attrs: Record<string, string | number> = {},
    children: (Item | string)[] = []
  ) {
    this.tag = tag;
    this.attrs = attrs;
    this.children = children;
  }

  /** Mutate and return self — useful for setting extra attrs inline */
  tap(fn: (item: Item) => void): Item {
    fn(this);
    return this;
  }

  stringify(): string {
    const attrStr = Object.entries(this.attrs)
      .map(([k, v]) => `${k}="${escapeAttr(String(v))}"`)
      .join(" ");

    const open = attrStr ? `<${this.tag} ${attrStr}>` : `<${this.tag}>`;

    if (this.children.length === 0) {
      return attrStr ? `<${this.tag} ${attrStr}/>` : `<${this.tag}/>`;
    }

    const inner = this.children
      .map((c) => (typeof c === "string" ? escapeXml(c) : c.stringify()))
      .join("");

    return `${open}${inner}</${this.tag}>`;
  }
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
