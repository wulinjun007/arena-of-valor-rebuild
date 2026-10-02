# Arena of Valor — Fan Rebuild

A static, fan-made rebuild of the official Arena of Valor website (arenaofvalor.com),
re-designed with a dark design system and shipped as pure HTML/CSS/JS. **Unofficial
design study — not affiliated with TiMi Studio Group, Level Infinite or Proxima Beta.**

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Hero banner, store CTAs, trailer modal, news banners, featured heroes carousel, download band |
| `heroes.html` | Full 68-hero roster with class filter (Tank/Warrior/Assassin/Mage/Marksman/Support) + detail modal |
| `news.html` | Official news archive with category tabs (patch notes / esports / events / media) |
| `esports.html` | AIC / AWC / Valor Series / Asian Games coverage |
| `game.html` | What is AoV (official intro text), game modes, hero classes, getting-started article list |

## Design system

Derived from a reverse-engineered **Tailwind v4 dark terminal system**
(design-system-extraction-2026-10 / site 03-zcode), re-accented to the AoV brand gold:

- Background `#161616`, surfaces `#1C1C1C` / `#2A2A2A` (oklch 0.205 / 0.269)
- Hairline borders `rgba(255,255,255,.08)`, **no shadows** — hierarchy by surface level
- Primary accent amber-500 `#F59E0B` (AoV gold), secondary sky-500 `#0EA5E9`
- Radius 8 / 10 / 16 / pill; type scale 60/700 · 36/600 · 24/600 · 16/400 · 13/500
- Section rhythm 88px; `prefers-reduced-motion` respected; focus-visible rings

## Assets

- Hero portraits/cards/featured art & news banners: official Arena of Valor CDN
  (`arenaofvalor.com/images/heroes`, `overseas-img.qq.com`), bundled locally.
- Hero names verified against official 504×430 hero cards; roles follow the official
  six-class taxonomy. See `CREDITS.md`.

## Stack

Pure static HTML/CSS/vanilla JS — zero runtime dependencies, no fonts fetched from
third parties (system font stack). Deployed on Netlify.

## Local preview

```bash
python3 -m http.server 8090
# open http://localhost:8090
```
