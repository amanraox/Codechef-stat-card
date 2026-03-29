<div align="center">

# CodeChef Stat Card

**Dynamically generated CodeChef stats cards for your GitHub README**

![CodeChef Stats](https://codechef-stat-card.vercel.app/api/tourist?theme=dark&ext=contest)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/amanraox/Codechef-stat-card)

[Live Demo](https://codechef-stat-card.vercel.app) · [Report Bug](https://github.com/amanraox/Codechef-stat-card/issues) · [Request Feature](https://github.com/amanraox/Codechef-stat-card/issues)

</div>

---

## Usage

Copy-paste this into your README and replace `username` with your CodeChef handle:

```md
![CodeChef Stats](https://codechef-stat-card.vercel.app/api/username)
```

### Example

```md
![CodeChef Stats](https://codechef-stat-card.vercel.app/api/tourist)
```

![CodeChef Stats](https://codechef-stat-card.vercel.app/api/tourist)

---

## Themes

Use the `theme` parameter to change the look:

```md
![CodeChef Stats](https://codechef-stat-card.vercel.app/api/tourist?theme=dracula)
```

### Light Gradients

| `gradient-peach` | `gradient-sky` | `gradient-lavender` |
|:---:|:---:|:---:|
| ![](https://codechef-stat-card.vercel.app/api/tourist?theme=gradient-peach) | ![](https://codechef-stat-card.vercel.app/api/tourist?theme=gradient-sky) | ![](https://codechef-stat-card.vercel.app/api/tourist?theme=gradient-lavender) |

| `gradient-mint` | `gradient-rose` | `gradient-sunset` | `gradient-candy` |
|:---:|:---:|:---:|:---:|
| ![](https://codechef-stat-card.vercel.app/api/tourist?theme=gradient-mint) | ![](https://codechef-stat-card.vercel.app/api/tourist?theme=gradient-rose) | ![](https://codechef-stat-card.vercel.app/api/tourist?theme=gradient-sunset) | ![](https://codechef-stat-card.vercel.app/api/tourist?theme=gradient-candy) |

### Dark Gradients

| `gradient-ocean` | `gradient-aurora` | `gradient-royal` |
|:---:|:---:|:---:|
| ![](https://codechef-stat-card.vercel.app/api/tourist?theme=gradient-ocean) | ![](https://codechef-stat-card.vercel.app/api/tourist?theme=gradient-aurora) | ![](https://codechef-stat-card.vercel.app/api/tourist?theme=gradient-royal) |

| `gradient-neon` | `gradient-cosmic` | `gradient-ember` |
|:---:|:---:|:---:|
| ![](https://codechef-stat-card.vercel.app/api/tourist?theme=gradient-neon) | ![](https://codechef-stat-card.vercel.app/api/tourist?theme=gradient-cosmic) | ![](https://codechef-stat-card.vercel.app/api/tourist?theme=gradient-ember) |

### Light Solid

| `light` | `warm` | `paper` | `sakura` |
|:---:|:---:|:---:|:---:|
| ![](https://codechef-stat-card.vercel.app/api/tourist?theme=light) | ![](https://codechef-stat-card.vercel.app/api/tourist?theme=warm) | ![](https://codechef-stat-card.vercel.app/api/tourist?theme=paper) | ![](https://codechef-stat-card.vercel.app/api/tourist?theme=sakura) |

| `ocean-light` | `leaf` | `sand` |
|:---:|:---:|:---:|
| ![](https://codechef-stat-card.vercel.app/api/tourist?theme=ocean-light) | ![](https://codechef-stat-card.vercel.app/api/tourist?theme=leaf) | ![](https://codechef-stat-card.vercel.app/api/tourist?theme=sand) |

### Dark Solid

| `dark` | `nord` | `dracula` | `tokyonight` |
|:---:|:---:|:---:|:---:|
| ![](https://codechef-stat-card.vercel.app/api/tourist?theme=dark) | ![](https://codechef-stat-card.vercel.app/api/tourist?theme=nord) | ![](https://codechef-stat-card.vercel.app/api/tourist?theme=dracula) | ![](https://codechef-stat-card.vercel.app/api/tourist?theme=tokyonight) |

| `cyberpunk` | `aurora` | `ember` |
|:---:|:---:|:---:|
| ![](https://codechef-stat-card.vercel.app/api/tourist?theme=cyberpunk) | ![](https://codechef-stat-card.vercel.app/api/tourist?theme=aurora) | ![](https://codechef-stat-card.vercel.app/api/tourist?theme=ember) |

---

## Extensions

### Submission Heatmap

```md
![CodeChef Stats](https://codechef-stat-card.vercel.app/api/tourist?theme=dark&ext=heatmap)
```

![CodeChef Stats](https://codechef-stat-card.vercel.app/api/tourist?theme=dark&ext=heatmap)

### Rating History Chart

```md
![CodeChef Stats](https://codechef-stat-card.vercel.app/api/tourist?theme=tokyonight&ext=contest)
```

![CodeChef Stats](https://codechef-stat-card.vercel.app/api/tourist?theme=tokyonight&ext=contest)

---

## Options

| Parameter | Description | Default |
|---|---|---|
| `theme` | Card theme | `light` |
| `ext` | Extension: `heatmap` or `contest` | none |
| `font` | Font family (see below) | `roboto mono` |
| `hide` | Comma-separated fields to hide | none |
| `width` | Card width in pixels (300-800) | `500` |
| `bg_image` | HTTPS image URL for card background | none |
| `bg` | Background color override (hex) | theme default |
| `border` | Border color override | theme default |
| `title` | Title color override | theme default |
| `text` | Text color override | theme default |
| `subtext` | Subtext color override | theme default |
| `accent` | Accent color override | theme default |
| `gridFill` | Heatmap fill color override | theme default |
| `chartLine` | Chart line color override | theme default |

### Hide Fields

Hide specific stats with comma-separated values:

```md
![CodeChef Stats](https://codechef-stat-card.vercel.app/api/tourist?hide=globalRank,countryRank)
```

Available: `currentRating`, `highestRating`, `globalRank`, `countryRank`

### Fonts

```md
![CodeChef Stats](https://codechef-stat-card.vercel.app/api/tourist?font=fira%20code)
```

Available: `roboto`, `roboto mono`, `fira code`, `jetbrains mono`, `source code pro`, `inter`, `poppins`, `space grotesk`, `ubuntu`, `ubuntu mono`

### Custom Background Image

```md
![CodeChef Stats](https://codechef-stat-card.vercel.app/api/tourist?bg_image=https://example.com/bg.jpg&theme=dark)
```

A semi-transparent overlay is applied automatically for text readability.

### Custom Colors

Override any theme color with hex values (without `#`):

```md
![CodeChef Stats](https://codechef-stat-card.vercel.app/api/tourist?bg=0d1117&title=58a6ff&accent=f78166)
```

---

## Deploy Your Own

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/amanraox/Codechef-stat-card)

### Manual Setup

```bash
git clone https://github.com/amanraox/Codechef-stat-card.git
cd Codechef-stat-card
npm install
npm run dev
```

Visit `http://localhost:3000` for the landing page or `http://localhost:3000/api/tourist` for a raw SVG card.

---

## Tech Stack

- **Next.js 15** (App Router) on Vercel
- **TypeScript** throughout
- **Tailwind CSS v4** for landing page
- **cheerio** for HTML parsing
- String-based SVG generation (no React for cards)
- Vercel CDN caching + in-memory LRU cache

## How It Works

```
GET /api/{username}?theme=dark&ext=heatmap
  -> Parse query params
  -> Check cache
  -> Scrape codechef.com/users/{username}
  -> Parse HTML + extract embedded JS data
  -> Resolve theme + color overrides
  -> Build SVG card sections
  -> Apply extension (heatmap / contest chart)
  -> Return SVG with Cache-Control headers
```

---

## Contributing

Contributions are welcome! Feel free to open issues or submit PRs for:
- New themes
- New extensions
- Bug fixes
- Improved scraping selectors

## License

MIT

---

<div align="center">

Built with love by [@amanraox](https://amanraox.dev)

</div>
