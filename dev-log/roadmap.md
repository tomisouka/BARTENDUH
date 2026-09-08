# Behind the Bar — Roadmap

> Updated at the end of each session. Captures what was built, what's next, and the bigger vision.

---

## 🗓 Session Log

### Session 1 — Foundation & Baker Menu
- Set up the core app with dashboard navigation (`App.jsx`)
- Built `BakerPage` — full Baker bar menu (beer, wine, mocktails, liquor, cocktails, specialty, shots)
- Recipe modal system with images via TheCocktailDB
- Beer style sorting (By Format / By Style toggle)
- Mobile responsiveness across all pages

### Session 2 — Study Tools & Knowledge Pages
- Built `SpiritsPage`, `TechniquesPage`, `ClassicsPage`, `SpecialtyPage`, `MocktailsPage`, `BeerPage`, `WinePage`, `FermentationPage`, `BrandsPage`
- Added `QuizPage` — interactive spirit identifier quiz with two modes:
  - **Brand → Liquor** (type-in)
  - **Liquor → Brand** (multiple choice)
  - Three categories: Spirits, Liqueurs, All 112 brands
- Built `WhiskeyPage` — bourbon vs whiskey breakdown with expandable cards, comparison table, family tree visual, and bartender cheat sheet
- Built `LiquorTreePage` — interactive zoomable/pannable SVG family tree:
  - Drag to pan, scroll to zoom, pinch on mobile
  - Clickable nodes with detail panel
  - Breadcrumb path trail (Alcohol → Distilled → Grain → Whiskey → Bourbon)
  - Collapsible legend with 3 tabs (Spirit Family, Whiskey Sub-Types, Node Types)
  - Search bar — finds spirits and Baker's brands, flies to node on click, highlights matches on canvas

---

## 🚧 In Progress

- **Liquor Family Tree — full brand expansion** — add all beers, wines, mocktails, specialty cocktails as leaf nodes so the entire Baker menu is browsable from the tree

---

## 📋 Backlog

### Study & Learning
- [ ] Spaced repetition mode for the quiz — cards you miss come back more often
- [ ] Timer / speed round mode for the quiz
- [ ] Score history — track accuracy over multiple sessions (localStorage)
- [ ] Flashcard mode — flip card UI for self-quizzing

### Knowledge Pages
- [ ] **Tequila vs Mezcal** page — similar to WhiskeyPage treatment
- [ ] **Rum vs Cachaça** page
- [ ] **Gin botanicals** deep dive — what makes each gin unique
- [ ] **Wine regions** page — map-based or visual breakdown
- [ ] **Beer styles** reference — IBU, ABV, flavor profiles per style
- [ ] **Cocktail ratios** page — the core templates (sour, highball, spirit-forward, etc.)

### Baker Menu Enhancements
- [ ] Beer & wine images — resolve CORS issue or manually source URLs for remaining brands
- [ ] Mobile image resizing in BakerPage modal
- [ ] Seasonal menu tagging — flag limited-time items

### Tree & Visualization
- [ ] Expand family tree to all Baker brands — beers by style, wines by type, mocktails, specialty cocktails
- [ ] Mini-map overlay for the tree — shows where you are when zoomed in deep
- [ ] Filter tree by category — toggle to show/hide branches
- [ ] Export tree as image / PDF

### App & UX
- [ ] Dark/light mode toggle
- [ ] Offline support / PWA — works without internet behind the bar
- [ ] Quick-access favorites — pin pages you use most to the dashboard
- [ ] Session notes — scratch pad per section for personal study notes

---

## 🔭 Long-Term Vision

The goal is a **complete bartender's companion** — something you can pull up mid-shift to look up a recipe, identify a brand, brush up on a technique, or learn something new between orders. Everything Baker-specific, always up to date, always in your pocket.

**Pillars:**
1. **The Menu** — BakerPage as the living, searchable source of truth for everything on tap
2. **The Knowledge Base** — spirit pages, technique guides, wine/beer references
3. **The Study Tools** — quiz modes, flashcards, spaced repetition
4. **The Visualizer** — family tree, cocktail maps, flavor wheels

---

## 📌 How to Use This File

At the end of each session, update:
1. Add a new entry to **Session Log** summarizing what was built
2. Move completed items from Backlog → done (or note them in the log)
3. Update **In Progress** with whatever carries over
4. Add any new ideas that came up to **Backlog**
