# Behind the Bar — Bartending Notes

> **Context doc for Claude.** Read this at the start of every session to get up to speed fast.

---

## What This Is

A personal bartending study app built in React 19 + Vite + pnpm. Jodye's reference companion for working at **Baker Bar** — house menu, spirit knowledge, coffee science.

**Local path:** `~/rabbit/root/projects/onit/bartending/`  
**Dev server:** `pnpm dev`  
**Zip to share:** `zip -r bartending.zip . -x "node_modules/*"`

---

## App Structure

Three-level navigation (no React Router, all `useState`):
1. **Group list** — Baker Bar / Deep Dives / Coffee / Learn / Tools
2. **Section cards** — within a group
3. **Section page** — the actual content

`App.jsx` defines `GROUPS` → each group has `sections[]` → each section has a `page` component.

---

## Pages & Data (src/pages/ ↔ src/data/)

| Page | Data file | Notes |
|------|-----------|-------|
| `BakerPage` | `baker.js` | Full Baker menu — BEER, WINE, MOCKTAILS_MENU, LIQUOR, COCKTAILS_MENU, SPECIALTY_MENU, SHOTS_MENU, SUMMARY, RECIPES (133 recipes) |
| `QuizPage` | `spirits.js` | Brand→Liquor (type-in) / Liquor→Brand (multi-choice), 3 categories, 112 brands |
| `SpecialtyPage` | `specialty.js` | Baker house cocktails, 4 categories |
| `MocktailsPage` | `mocktails.js` | MOCKTAILS + MOCKTAIL_TIPS |
| `LiquorTreePage` | `spirittree.js` | Interactive SVG, drag/zoom/pan, search, breadcrumbs, legend |
| `FermentationPage` | `fermentation.js` | 17 exports, all wired |
| `BrandsPage` | `brandInfo.js` / `brands.js` | Ownership — indie vs craft-gone-corp vs macro |
| `WhiskeyPage` | `whiskey.js` | Bourbon vs whiskey, family tree visual, bartender cheat sheet |
| `TechniquesPage` | `techniques.js` | 10 exports — FUNDAMENTALS, CORE_SPIRITS, MODIFIERS, GLASSWARE, BAR_TERMS, RATIOS, GOLDEN_RULES, PRO_TIPS, TROUBLESHOOTING, HOME_BAR |
| `ClassicsPage` | `classics.js` | 6 categories, 24+ cocktails |
| `SpiritsPage` | `spirits.js` | SPIRITS, FERMENTED, GRAINS, STORAGE |
| `BeerPage` | `beer.js` | TOP_BRANDS, STYLES, REGIONS, QUICK_REFS |
| `WinePage` | `wine.js` | TOP_BRANDS, REDS, WHITES, SPARKLING, FORTIFIED, PAIRINGS, SERVING, TERMS |
| `CoffeeTreePage` | — | Interactive origin tree |
| `BrewMethodsPage` | — | Espresso/pour over/French press etc. |
| `EspressoDrinksPage` | — | Ristretto → latte ratios |
| `CoffeeBeansPage` | — | Varietals — Geisha, Bourbon, SL28, Typica |
| `CoffeeBrandsPage` | — | Blue Bottle, Lavazza, etc. |
| `CoffeeQuizPage` | `quiz.js` | 20-question coffee quiz |
| `ImageManagerPage` | `images.js` | Bottle image sourcing tool |
| `TicketsPage` | `tickets.js` | Dev todo tracker |

---

## Session History

### Session 1 — Foundation & Baker Menu
- Core app shell, `App.jsx` with group/section navigation
- `BakerPage` — full Baker bar menu (beer, wine, mocktails, liquor, cocktails, specialty, shots)
- Recipe modal with TheCocktailDB images
- Beer style sorting (By Format / By Style toggle)
- Mobile responsiveness

### Session 2 — Study Tools & Knowledge Pages
- Built: SpiritsPage, TechniquesPage, ClassicsPage, SpecialtyPage, MocktailsPage, BeerPage, WinePage, FermentationPage (17 exports, all wired), BrandsPage
- `QuizPage` — Brand→Liquor (type-in) and Liquor→Brand (multiple choice), 3 categories, 112 brands
- `WhiskeyPage` — expandable cards, comparison table, family tree visual, bartender cheat sheet
- `LiquorTreePage` — interactive zoomable/pannable SVG, drag/scroll/pinch, clickable nodes with detail panel, breadcrumb trail, collapsible legend (3 tabs), search bar with node fly-to
- Coffee section: CoffeeTreePage, BrewMethodsPage, EspressoDrinksPage, CoffeeBeansPage, CoffeeBrandsPage, CoffeeQuizPage

---

## Open TODOs

### 🔴 Active / In Progress
- **Liquor Family Tree — full expansion** — add all beers (by style/format), wines (by type), mocktails, specialty cocktails as leaf nodes. Each leaf shows brand/drink name, clicking opens detail panel with Baker menu context.

### 🟠 Data Gaps (see audit.md for full detail)
- `techniques.js` — missing: TOOLS, MIXERS, DILUTION_GUIDE, SERVING_TEMPS, SHAKE_OR_STIR, 15 BAR_TERMS
- `beer.js` — missing: beer sub-styles (IPA variants, stout variants, etc.), 6 more TOP_BRANDS, COLOR_GUIDE, IBU_SCALE, CRAFT_VS_MACRO, BEER_GLASSWARE, BEER_TASTING, BEER_STORING
- `wine.js` — missing: WINE_REGIONS (full regional breakdown), OLD_VS_NEW_WORLD, WINE_HOW_TO_CHOOSE
- `classics.js` — missing: cocktail variations (Black Manhattan, White Negroni, Boston Sour, etc.), SPIRIT_INDEX, ADJUST_TO_TASTE
- `specialty.js` — Grand Cadillac Margarita recipe was cut off in source image, needs completion

### 🟡 Image Issues
- Beer/wine images: Wikipedia API has CORS issues in browser. Direct Wikimedia URLs work for major brands (Guinness, Heineken, Corona, Modelo, Stella, Blue Moon, Dos Equis, Pacifico, Newcastle, Harp, Shiner, Yuengling, PBR, Coors, Miller, Bud). Local/craft brands (St. Arnold, Karbach, Real Ale) need manual sourcing.
- Mobile image resizing in BakerPage modal — doesn't scale well on small screens

### 🟢 Backlog
- Spaced repetition quiz mode; timer/speed round; score history; flashcard mode
- Tequila vs Mezcal page; Rum vs Cachaça page; Gin botanicals page
- Wine regions page; Beer styles reference; Cocktail ratios page
- Dark/light mode toggle; Offline/PWA; Quick-access favorites; Session notes scratchpad

### 🗑️ Cleanup
- Delete `contest.md` — exact duplicate of cocktails.md
- Delete `old.md` — superseded by barguide.md
- Delete or fill `baker.md` — currently empty

---

## Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Full nav shell + GROUPS config |
| `src/theme.js` | Theme tokens (T.bg, T.gold, T.cream, T.muted, T.border, T.dim, T.amber) |
| `src/styles.js` | Shared style helpers |
| `src/data/baker.js` | Source of truth for Baker Bar menu |
| `audit.md` | Data gap analysis — what's missing from each data file |
| `dev-log/roadmap.md` | Session log + full backlog |
| `dev-log/todo.md` | Condensed pending/completed list |

---

## Notes & Quirks

- **No React Router** — navigation is pure `useState` (active section + active group)
- **Baker Bar counts** — ~93 beers, 28 wines, 112 liquor items, 35 cocktails, 57 specialty, 43 shots
- **"Import & Craft Draft" label** — intentional mixed label. True independents on draft: Dogfish Head, Real Ale, St. Arnold, Sierra Nevada, Shiner. The rest are macro-owned.
- **Coffee section** — standalone group added Session 2. Not yet integrated with Baker-specific coffee menu data.
- **`_delete/` folder** — legacy HTML files and zips; safe to ignore.