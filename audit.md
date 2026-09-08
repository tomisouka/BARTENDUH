# Bartending App — Data Audit
*Last updated: 2026-03-06 (Session 2)*

---

## Project Structure

### Source Files (truth/origin)
| File | Description |
|------|-------------|
| `alcohol.md` | Full spirits + fermentation encyclopedia |
| `alcohol-encyclopedia.html` | HTML render of alcohol.md |
| `barguide.md` | Techniques, tools, terms, reference cards |
| `bartenders-guide.html` | HTML render of barguide.md |
| `beer.md` | Comprehensive beer guide — brands, styles, substyles, pairing, glassware |
| `beer-guide.html` | HTML render of beer.md |
| `cocktails.md` | Classic cocktail recipes with full variations |
| `contest.md` | **Duplicate of cocktails.md** — can be deleted |
| `old.md` | **Older shorter version of barguide.md** — can be deleted |
| `cocktail_recipes.md` | Baker bar specialty menu recipes (house-specific) |
| `baker.html` | Baker bar beer/wine/liquor menu |
| `baker-cocktails.html` | Baker bar specialty cocktail menu |
| `baker.md` | **Empty file** — nothing here |
| `mocktails.md` | Mocktail recipes + tips |
| `wine.html` | Comprehensive wine guide with regions |

### Data Files (`src/data/`)
| File | Exports |
|------|---------|
| `techniques.js` | `FUNDAMENTALS`, `CORE_SPIRITS`, `MODIFIERS`, `GLASSWARE`, `BAR_TERMS`, `RATIOS`, `GOLDEN_RULES`, `PRO_TIPS`, `TROUBLESHOOTING`, `HOME_BAR` |
| `classics.js` | `CLASSICS` (6 categories, 24+ cocktails) |
| `specialty.js` | `SPECIALTY` (Baker house cocktails — 4 categories) |
| `mocktails.js` | `MOCKTAILS`, `MOCKTAIL_TIPS` |
| `spirits.js` | `FERMENTED`, `SPIRITS`, `GRAINS`, `STORAGE` |
| `fermentation.js` | `YEAST_TYPES`, `WILD_ORGANISMS`, `FERMENTATION_PHASES`, `FERMENTATION_TEMPS`, `ATTENUATION`, `FERMENTATION_VESSELS`, `SPECIAL_TECHNIQUES`, `FLAVOR_BYPRODUCTS`, `YEAST_TOLERANCE`, `SUGAR_SOURCES`, `FERMENTATION_MONITORING`, `GRAIN_PROCESSING`, `SPECIAL_GRAIN_TECHNIQUES`, `GRAIN_TO_GLASS`, `REGIONAL_SPIRITS`, `VERMOUTH`, `FERMENTED_VS_DISTILLED` |
| `beer.js` | `TOP_BRANDS`, `STYLES`, `REGIONS`, `QUICK_REFS` |
| `wine.js` | `TOP_BRANDS`, `REDS`, `WHITES`, `SPARKLING`, `FORTIFIED`, `PAIRINGS`, `SERVING`, `TERMS` |
| `baker.js` | `BEER`, `WINE`, `MOCKTAILS_MENU`, `LIQUOR`, `COCKTAILS_MENU`, `SPECIALTY_MENU`, `SHOTS_MENU`, `SUMMARY`, `RECIPES` |

### Pages (`src/pages/`)
| Page | Imports From |
|------|-------------|
| `TechniquesPage.jsx` | `techniques.js` — all 10 exports |
| `ClassicsPage.jsx` | `classics.js` |
| `SpecialtyPage.jsx` | `specialty.js` |
| `MocktailsPage.jsx` | `mocktails.js` — both exports |
| `SpiritsPage.jsx` | `spirits.js` — `SPIRITS`, `FERMENTED`, `GRAINS`, `STORAGE` |
| `BeerPage.jsx` | `beer.js` — all 4 exports |
| `WinePage.jsx` | `wine.js` — all 8 exports |
| `BakerPage.jsx` | `baker.js` — all 9 exports |
| `PlaceholderPage.jsx` | nothing |

---

## 🔴 Critical Issues

~~### `fermentation.js` is completely orphaned~~
✅ **Resolved** —  created and wired in Session 2. All 17 exports imported across 7 tabs.

---

## 🟠 Data Gaps — Missing from Data Files

### `techniques.js` — source: `barguide.md`

**Missing exports to add:**

#### `TOOLS`
Bar tools not stored anywhere as data:
- Shaker → Boston (pro) or Cobbler (beginner-friendly)
- Jigger → 1 oz / 2 oz or 0.75 oz / 1.5 oz
- Bar Spoon → Long-handled for stirring
- Strainer → Hawthorne (shakers) or Julep (mixing glass)
- Muddler → For crushing herbs/fruit
- Citrus Juicer → Essential for fresh juice
- Peeler → For citrus twists

#### `MIXERS`
Mixers not stored anywhere as data:
- Fresh Citrus → Lemons, limes, oranges (NEVER bottled juice)
- Simple Syrup → 1:1 sugar:water, dissolved and cooled
- Club Soda → Unflavored carbonated water
- Tonic Water → Bitter, sweetened (Fever-Tree recommended)
- Ginger Beer → NOT ginger ale (spicy, strong)
- Bitters → Angostura (aromatic), Orange (citrusy)

#### `DILUTION_GUIDE`
| Method | Dilution | Result |
|--------|----------|--------|
| Shake (10-15s) | High | Cold, aerated, slightly watered |
| Stir (30-40s) | Medium | Cold, silky, minimal water |
| Build | Low | Simple, quick, less integrated |
| Blend | Very High | Smooth, frozen, heavily diluted |

#### `SERVING_TEMPS`
| Drink Type | Serving Temp | Method |
|------------|-------------|--------|
| Shaken cocktails | Ice cold | Shake until frost forms |
| Stirred cocktails | Chilled | Stir until glass frosts |
| Highballs | Cold | Build over fresh ice |
| Neat spirits | Room temp | No ice, room temp glass |
| Frozen drinks | Frozen | Blend until slushy |

#### `SHAKE_OR_STIR` (decision tree)
Contains juice/citrus/cream/egg white/dairy → **SHAKE**
Spirits only → **STIR**

#### `BAR_TERMS` — incomplete (24 terms, ~35 in source)
Missing terms from `barguide.md`:
- `With a Back` → Chaser on the side
- `Splash` → ~1/4-1/2 oz imprecise pour
- `#-Deep` → Number of rows of customers waiting (e.g. "3-deep")
- `Service Bar` → Bar area for servers only, not customers
- `Speed Rail / Speed Rack` → Stainless shelf for most-used bottles
- `Box / Boxing` → Quick pour between tins to mix without shaking
- `Short / Rocks Drink` → Drink in short glass with ice
- `Aperitif` → Low-ABV drink before meal, stimulates appetite
- `Digestif` → After-dinner drink, aids digestion
- `Pony` → 1 oz shot (vs standard 1.5 oz)
- `Finger` → Old measurement (~width of finger, inconsistent)
- `Rim` → Salt or sugar applied to glass rim
- `Frost / Frosted` → Chilling glass in freezer for frosty exterior
- `Burn the Ice` → Melting ice (end of night or after glass breaks)
- `Flame / Flaming` → Setting drink on fire for flavor or show

---

### `beer.js` — source: `beer.md`

**Missing exports to add:**

#### Sub-styles (beer.js has flat style list; beer.md has nested sub-styles with brand lists)
Each parent style needs sub-styles added:

| Parent | Sub-styles to add |
|--------|-------------------|
| IPA | West Coast IPA, Hazy/NEIPA, Session IPA, Double/Imperial IPA, Black IPA |
| Stout | Dry Stout, Milk/Sweet Stout, Oatmeal Stout, Imperial/Russian Imperial, Coffee/Chocolate Stout |
| Wheat Beer | American Wheat, Hefeweizen (German), Witbier/Belgian White |
| Belgian Ale | Dubbel, Tripel, Quad (Quadrupel), Saison |
| Pilsner | Czech/Bohemian Pilsner, German Pilsner |
| Bock | Traditional Bock, Maibock/Helles Bock, Doppelbock, Eisbock |
| (new) | Blonde/Golden Ale, Brown Ale, Amber Lager/Vienna Lager |

#### `TOP_BRANDS` — only 15, beer.md has 20
Missing: Brahma 🇧🇷, Skol 🇧🇷, Harbin 🇨🇳, Kirin 🇯🇵, Amstel 🇳🇱, Busch 🇺🇸

#### New exports needed:
- `COLOR_GUIDE` — color range → style mapping (Very Pale, Gold to Amber, Copper to Brown, Dark to Black)
- `IBU_SCALE` — IBU range → bitterness level → style examples (5-15 / 15-30 / 30-50 / 50-70 / 70-100+)
- `CRAFT_VS_MACRO` — characteristics and tradeoffs of craft vs macro
- `BEER_GLASSWARE` — Pint, Pilsner glass, Tulip/Goblet, Snifter, Weizen glass
- `BEER_TASTING` — Look / Smell / Taste / Evaluate steps
- `BEER_STORING` — upright, avoid sunlight/skunking, consistent temp, refrigerate after purchase

---

### `wine.js` — source: `wine.html`

**Missing exports to add:**

#### `WINE_REGIONS`
Full regional breakdown not stored anywhere:
- 🇫🇷 France — Bordeaux (Cab/Merlot), Burgundy (Pinot/Chardonnay), Champagne, Rhône (Syrah/Grenache), Alsace (Riesling), Loire (Sancerre/Chenin Blanc), Provence (Rosé)
- 🇮🇹 Italy — Tuscany (Chianti/Brunello), Piedmont (Barolo/Barbaresco), Veneto (Pinot Grigio/Amarone/Prosecco), Sicily (Nero d'Avola/Marsala)
- 🇪🇸 Spain — Rioja (Tempranillo), Ribera del Duero, Priorat, Rías Baixas (Albariño), Jerez (Sherry)
- 🇩🇪 Germany — Mosel (Riesling), Rheingau, Pfalz, Baden
- 🇺🇸 USA — Napa Valley (Cab), Sonoma (Pinot/Chardonnay/Zin), Willamette OR (Pinot), Washington State, Finger Lakes NY
- 🇦🇺 Australia — Barossa Valley (Shiraz), McLaren Vale
- 🇳🇿 New Zealand, 🇨🇱 Chile, 🇦🇷 Argentina

#### `OLD_VS_NEW_WORLD`
- Old World (Europe) = restrained, earthy, mineral, labeled by region
- New World (USA/AUS/Chile/Argentina) = riper, fruitier, labeled by grape

#### `WINE_HOW_TO_CHOOSE`
Decision tree: mood/preference/food → wine style recommendation

---

### `classics.js` — source: `cocktails.md` / `contest.md`

**Missing variations per cocktail** (stored as flat arrays, these are richer):

| Cocktail | Missing Variations |
|----------|-------------------|
| Manhattan | Black Manhattan (Averna instead of sweet vermouth) |
| Negroni | White Negroni (Lillet Blanc + Suze) |
| Whiskey Sour | Boston Sour (egg white), Amaretto Sour |
| Daiquiri | Hemingway Daiquiri (grapefruit + maraschino, no simple) |
| Lemon Drop | Berry Lemon Drop (muddle raspberries/strawberries), Lavender |
| Long Island Iced Tea | Texas Tea (add bourbon), Blue Long Island (blue curaçao), Long Beach (cranberry) |
| Tequila Sunrise | Tequila Sunset (grapefruit/crème de cassis), Vodka Sunrise, Spicy Sunrise |
| Sangria | Rosé Sangria |
| Piña Colada | Amaretto Colada |
| White Russian | Mudslide (add Irish cream, blend) |
| Moscow Mule | Mexican Mule (tequila) |
| Tom Collins | Vodka Collins, Whiskey Collins |

**Missing exports to add:**

#### `SPIRIT_INDEX`
Cocktails grouped by base spirit — not stored anywhere as data:
- Vodka: Martini (vodka), Cosmo, Lemon Drop, White Russian, Moscow Mule, Long Island, Espresso Martini, Bloody Mary
- Gin: Martini (classic), G&T, Negroni, Tom Collins, Aviation, Gimlet, Last Word
- Rum: Mojito, Daiquiri, Piña Colada, Mai Tai, Dark & Stormy, Cuba Libre
- Tequila: Margarita, Paloma, Tequila Sunrise, Mexican Mule
- Whiskey: Old Fashioned, Manhattan, Whiskey Sour, Boulevardier, Sazerac, Mint Julep, Irish Coffee
- Brandy: Brandy Alexander, Sidecar
- Aperitifs: Aperol Spritz, Campari Spritz, Negroni
- Wine-Based: Sangria

#### `ADJUST_TO_TASTE`
Correction guide not stored anywhere:
- Too sweet → add more citrus or bitters
- Too sour → add more simple syrup
- Too strong → add more mixer or dilute
- Too weak → add more base spirit
- Too bitter → add simple syrup or reduce Campari/bitters

---

### `specialty.js` — source: `cocktail_recipes.md`

**Incomplete recipe:**
- `Grand Cadillac Margarita` — 1.25 oz Espolòn Blanco + 0.75 oz Grand Marnier — **rest of recipe was cut off in original source image**. Needs to be completed or flagged.

---

## 🟡 Cleanup Tasks

| File | Action |
|------|--------|
| `contest.md` | **Delete** — exact duplicate of `cocktails.md` |
| `old.md` | **Delete** — shorter older version of `barguide.md`, fully superseded |
| `baker.md` | **Delete or fill** — currently 0 bytes, empty placeholder |

---

## ✅ Fully Migrated (no gaps)

| Area | Status |
|------|--------|
| All 24 classic cocktail recipes | ✅ Complete |
| Sweet & Easy category (5 cocktails) | ✅ Complete |
| Bitter & Complex category | ✅ Complete |
| Fermentation science (17 exports) | ✅ Complete — FermentationPage.jsx wired |
| Grain processing + special techniques | ✅ In `fermentation.js` |
| Regional spirits (Soju, Baijiu, Shochu, Aquavit, Cachaça) | ✅ In `fermentation.js` |
| Vermouth (standalone) | ✅ In `fermentation.js` + `spirits.js` |
| Golden Rules | ✅ In `techniques.js` |
| Pro Tips | ✅ In `techniques.js` |
| Troubleshooting | ✅ In `techniques.js` |
| Home Bar (3 levels) | ✅ In `techniques.js` |
| Mocktail tips + stock list + NA spirits | ✅ In `mocktails.js` |
| Grain `note` field | ✅ Now in ClickCards on SpiritsPage |
| Baker bar full menu | ✅ Complete in `baker.js` + `BakerPage.jsx` |
| Wine — all types, pairings, serving, terms | ✅ Complete |
| Beer — top brands, styles, regions, quick refs | ✅ Partial (sub-styles and extras missing — see above) |
| Storage rules (opened + unopened) | ✅ In `spirits.js` |

---

## Priority Order for Next Session

1. **Wire `fermentation.js`** — create page or integrate into SpiritsPage (highest impact, data already done)
2. **Add `WINE_REGIONS`** to `wine.js` + WinePage — large missing section
3. **Add beer sub-styles** to `beer.js` + BeerPage — significantly richer data
4. **Add `TOOLS` + `MIXERS`** to `techniques.js` — simple, high utility
5. **Add `BAR_TERMS` missing entries** — 11 terms to add
6. **Add `DILUTION_GUIDE` + `SERVING_TEMPS`** to `techniques.js`
7. **Add `SPIRIT_INDEX` + `ADJUST_TO_TASTE`** to `classics.js`
8. **Add cocktail variations** to `classics.js`
9. **Add `COLOR_GUIDE` + `IBU_SCALE` + `CRAFT_VS_MACRO`** to `beer.js`
10. **Clean up** — delete `contest.md`, `old.md`, `baker.md`
