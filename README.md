<div align="center">

# CodeChef Stat Card

**show off your CodeChef stats in your GitHub README — because why not**

![CodeChef Stats](https://codechef-stat-card.vercel.app/api/tourist?theme=dark&ext=contest)

[Use it now](https://codechef-stat-card.vercel.app) · [Report Bug](https://github.com/amanraox/Codechef-stat-card/issues) · [Request Feature](https://github.com/amanraox/Codechef-stat-card/issues)

</div>

---

## Usage

Paste this in your README, swap `username` with your CodeChef handle. Done.

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

28 themes. Pick one with `?theme=name`.

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

| `gradient-neon` | `gradient-cosmic` | `gradient-ember` | `gradient-midnight` |
|:---:|:---:|:---:|:---:|
| ![](https://codechef-stat-card.vercel.app/api/tourist?theme=gradient-neon) | ![](https://codechef-stat-card.vercel.app/api/tourist?theme=gradient-cosmic) | ![](https://codechef-stat-card.vercel.app/api/tourist?theme=gradient-ember) | ![](https://codechef-stat-card.vercel.app/api/tourist?theme=gradient-midnight) |

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

## All Options

| Parameter | Description | Default |
|---|---|---|
| `theme` | Card theme (see above) | `light` |
| `ext` | `heatmap` or `contest` | none |
| `font` | Font family | `roboto mono` |
| `hide` | Comma-separated fields to hide | none |
| `width` | Card width 300-800px | `500` |
| `bg_image` | Background image URL (https) | none |
| `bg` | Background color (hex, no #) | theme |
| `title` | Title color | theme |
| `text` | Text color | theme |
| `accent` | Accent color | theme |
| `chartLine` | Chart line color | theme |
| `gridFill` | Heatmap fill color | theme |

### Hide stuff

```md
![CodeChef Stats](https://codechef-stat-card.vercel.app/api/tourist?hide=globalRank,countryRank)
```

Available: `currentRating`, `highestRating`, `globalRank`, `countryRank`, `problemsSolved`, `contests`

### Fonts

`roboto` · `roboto mono` · `fira code` · `jetbrains mono` · `source code pro` · `inter` · `poppins` · `space grotesk` · `ubuntu` · `ubuntu mono`

### Custom colors

Override any color with hex (no `#`):

```md
![CodeChef Stats](https://codechef-stat-card.vercel.app/api/tourist?bg=0d1117&title=58a6ff&accent=f78166)
```

### Background image

```md
![CodeChef Stats](https://codechef-stat-card.vercel.app/api/tourist?bg_image=https://example.com/bg.jpg)
```

---

## Contributing

PRs welcome. Add themes, extensions, fix bugs, improve scraping — go wild.

## License

MIT

---

<div align="center">

built with love by [@amanraox](https://amanraox.dev)

</div>
