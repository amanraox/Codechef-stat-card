# Testing CodeChef Stat Card API

## Dev Server

```bash
npm install
npm run dev
# Runs on http://localhost:3000
```

## API Endpoint

The main API endpoint is `GET /api/[username]` which returns an SVG card.

Key query params:
- `theme` — card theme (e.g., `dark`, `light`, `dracula`, `tokyonight`)
- `ext` — extension (`heatmap` or `contest`)
- `bg`, `title`, `text`, `accent`, `chartLine`, `gridFill` — hex color overrides (no `#` prefix)
- `width` — card width 300-800px
- `font` — font family
- `hide` — comma-separated fields to hide
- `bg_image` — background image URL (must be https)

## Cache Behavior

- In-memory Map cache in `src/lib/cache.ts` with 1-hour TTL and max 200 entries
- Cache key built from: username, theme, extension, hide, width, font, bgImage, colorOverrides
- To test cache, make two requests with same params and verify identical responses
- To test cache isolation, make two requests with different color params and verify different responses

## Testing Patterns

### Verify SVG generation
```bash
curl -s -o /tmp/card.svg "http://localhost:3000/api/tourist?theme=dark"
# Check for valid SVG
grep -q '<svg' /tmp/card.svg && echo "Valid SVG"
```

### Verify color overrides work
```bash
curl -s "http://localhost:3000/api/tourist?theme=dark&bg=ff0000" | grep -o 'fill="#ff0000"'
```

### Verify cache key isolation
```bash
curl -s -o /tmp/a.svg "http://localhost:3000/api/tourist?theme=dark&bg=ff0000"
curl -s -o /tmp/b.svg "http://localhost:3000/api/tourist?theme=dark&bg=00ff00"
diff /tmp/a.svg /tmp/b.svg  # Should show differences
```

## Lint
```bash
npm run lint
```

## Build
```bash
npm run build
```

## Notes

- The scraper fetches real data from codechef.com, so API tests require network access
- CodeChef might rate-limit or block requests; the scraper uses a Chrome-like User-Agent
- Error cards are returned for invalid usernames or fetch failures (HTTP 400/500 with SVG body)
- No test suite exists in the repo; testing is done via manual API verification
