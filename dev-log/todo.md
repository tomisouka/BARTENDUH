# Behind the Bar — TODO

## Pending
- [ ] **Liquor Family Tree — expand to all brands** — Currently the interactive tree (`LiquorTreePage`) covers spirits and liqueurs. Expand it to include the full Baker menu: all beers (by style/format), all wines (by type — red, white, rosé, sparkling), mocktails, and specialty cocktails as leaf nodes under their parent categories. Each leaf should show the brand/drink name, and clicking it should open the same detail panel with description + Baker's menu context.
- [ ] **Beer/Wine images** — Wikipedia API approach doesn't work (CORS/permissions in browser). Need alternative: manually source direct URLs or find a working free image API. Verified Wikimedia direct URLs work for major brands (Guinness, Heineken, Corona, Modelo, Stella, Blue Moon, Dos Equis, Pacifico, Newcastle, Harp, Shiner, Yuengling, PBR, Coors, Miller, Bud) — smaller/local brands (St. Arnold, Karbach, Real Ale) need manual sourcing.
- [ ] **Mobile image resizing on BakerPage** — image card doesn't scale well on small screens inside the modal, needs a proper responsive treatment.

## Notes
- **"Craft" beer section** — "Import & Craft Draft" label is intentionally a mix. Not truly independent craft: Karbach (AB InBev), Blue Moon (Coors), Lagunitas (Heineken majority), Sunny Little Thing (Boulevard/Duvel), Angry Orchard & Twisted Tea (Boston Beer), Guinness/Harp (Diageo), Heineken, Stella/Modelo/Pacifico/Dos Equis (AB InBev). True independents on draft: Dogfish Head, Real Ale (Ghost in the Machine, Fresh Kicks), St. Arnold, Sierra Nevada, Shiner. Section name "Import & Craft" is accurate as-is.

## Completed
- [x] Mobile responsiveness fixes (padding, font scaling, tap targets)
- [x] Beer section labels — "Import & Craft Draft" / "Import & Craft Bottle"
- [x] Recipe modal — image card right on desktop, stacked below on mobile
- [x] Mobile modal layout — clean stack, swipe removed
- [x] Beer style sorting — By Format / By Style toggle
- [x] Light Lager vs Dark Lager split in By Style view
- [x] TheCocktailDB image integration for cocktails
- [x] Beer & wine image scaffolding in images.js
