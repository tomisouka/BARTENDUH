/**
 * tickets.js
 * Dev todo tickets for Behind the Bar.
 * Each ticket has a unique id, status, priority, category, title, and optional notes.
 *
 * status:   "open" | "in-progress" | "done"
 * priority: "high" | "medium" | "low"
 * category: "bug" | "feature" | "data" | "ui" | "refactor"
 */

export const TICKETS = [
  {
    id: "T-001",
    status: "done",
    priority: "high",
    category: "data",
    title: "Well Scotch → Clan McGregor",
    notes: "Updated gunthers.js, quiz.js, and tree.js.",
  },
  {
    id: "T-002",
    status: "done",
    priority: "medium",
    category: "refactor",
    title: "Split whiskey bucket into proper sub-categories",
    notes: "bourbon, tennessee, rye, irish, canadian, flavored now separate keys in LIQUOR.",
  },
  {
    id: "T-003",
    status: "done",
    priority: "medium",
    category: "refactor",
    title: "Move Hennessy out of scotch → cognac section",
    notes: "Created LIQUOR.cognac. Hennessy + Hennessy VSOP moved out of scotch and cordials.",
  },
  {
    id: "T-004",
    status: "done",
    priority: "medium",
    category: "refactor",
    title: "Externalize WINE_TYPES from GunthersPage",
    notes: "Moved to wine.js and imported.",
  },
  {
    id: "T-005",
    status: "done",
    priority: "high",
    category: "refactor",
    title: "Fix ImageManagerPage CATEGORIES — was hardcoded duplicate of gunthers.js",
    notes: "Now derives from LIQUOR dynamically. Added Cognac category. Stays in sync automatically.",
  },
  {
    id: "T-006",
    status: "done",
    priority: "high",
    category: "feature",
    title: "Expand Liquor Family Tree to full Gunthers menu",
    notes: "Beer split into Lager/Ale/Cider/Seltzer. Wine split into Red/White/Rosé/Sparkling. Added Mocktails node. Added Cocktails branch (Classics, Specialty, Shots).",
  },
  {
    id: "T-007",
    status: "done",
    priority: "low",
    category: "refactor",
    title: "Externalize LEGEND_SECTIONS from LiquorTreePage → tree.js",
    notes: "Exported from tree.js, imported in LiquorTreePage.",
  },
  {
    id: "T-008",
    status: "open",
    priority: "medium",
    category: "bug",
    title: "Beer & wine images — Wikipedia/Wikimedia CORS blocks browser fetches",
    notes: "Verified direct Wikimedia URLs work for major brands. Smaller brands (St. Arnold, Karbach, Real Ale) need manual sourcing.",
  },
  {
    id: "T-009",
    status: "open",
    priority: "low",
    category: "ui",
    title: "Mobile image resizing in GunthersPage modal",
    notes: "Image card doesn't scale well on small screens inside the recipe modal.",
  },
  {
    id: "T-010",
    status: "open",
    priority: "high",
    category: "feature",
    title: "Spaced repetition mode for quiz",
    notes: "Cards you miss come back more often. Track per-brand accuracy.",
  },
  {
    id: "T-011",
    status: "open",
    priority: "medium",
    category: "feature",
    title: "Quiz score history",
    notes: "Track accuracy across sessions with localStorage.",
  },
  {
    id: "T-012",
    status: "open",
    priority: "medium",
    category: "feature",
    title: "Flashcard mode for quiz",
    notes: "Flip-card UI for self-quizzing without multiple choice.",
  },
  {
    id: "T-013",
    status: "open",
    priority: "low",
    category: "feature",
    title: "Tequila vs Mezcal deep dive page",
    notes: "Similar treatment to WhiskeyPage.",
  },
  {
    id: "T-014",
    status: "open",
    priority: "low",
    category: "feature",
    title: "Gin botanicals deep dive",
    notes: "What makes each gin unique — botanical bill breakdowns.",
  },
  {
    id: "T-015",
    status: "open",
    priority: "low",
    category: "feature",
    title: "Wine regions page",
    notes: "Map-based or visual breakdown of Old World vs New World.",
  },
  {
    id: "T-016",
    status: "open",
    priority: "low",
    category: "feature",
    title: "Cocktail ratios reference page",
    notes: "Core templates — sour, highball, spirit-forward, etc.",
  },
  {
    id: "T-017",
    status: "open",
    priority: "low",
    category: "feature",
    title: "Dark / light mode toggle",
    notes: "",
  },
  {
    id: "T-018",
    status: "open",
    priority: "medium",
    category: "feature",
    title: "PWA / offline support",
    notes: "Works without internet behind the bar.",
  },
  {
    id: "T-019",
    status: "open",
    priority: "low",
    category: "feature",
    title: "Tree mini-map overlay",
    notes: "Shows where you are when zoomed deep into the liquor family tree.",
  },
  {
    id: "T-020",
    status: "open",
    priority: "low",
    category: "feature",
    title: "Export tree as image / PDF",
    notes: "",
  },
  {
    id: "T-021",
    status: "open",
    priority: "high",
    category: "data",
    title: "Audit and fill missing beer images",
    notes: "Go through All Brands page (Deep Dives) — Beer section. Find every card showing 'No image' and source a working direct URL. Add to BEER_LOCAL or BEER_WIKI in images.js. Priority brands: St. Arnold (Art Car IPA, Oktoberfest, Spring Bock, Strawberry Cider, Pumpkinator), Karbach (Hopadillo, Love St, Yuletide Confessions), Real Ale (Fresh Kicks, Ghost in the Machine), Shiner (Bock, Cheer, Lt Blonde, Oktoberfest), Lone Star, Sunny Little Thing, Stone IPA.",
  },
  {
    id: "T-022",
    status: "open",
    priority: "high",
    category: "data",
    title: "Audit and fill missing wine images",
    notes: "Go through All Brands page — Wine section. Find every 'No image' card. Source direct image URLs (avoid Wikipedia CORS issues — use Vivino, winery sites, or wine retailer product images). Wines to check: Apothic Crush, Storypoint Cabernet, Prophecy Rosé, Chateau Ste Michelle Riesling, Seven Daughters Moscato, House Champagne, La Marca Prosecco, Mumm Napa.",
  },
  {
    id: "T-023",
    status: "open",
    priority: "medium",
    category: "data",
    title: "Confirm and approve existing beer/wine images",
    notes: "For brands that DO load an image on All Brands page — verify the image actually matches the product (Wikipedia fetch can sometimes return wrong article images). Go through each beer and wine card and mark confirmed or flag for replacement. Especially check: Blue Moon, Guinness, Heineken, Modelo, Corona, Angry Orchard, White Claw, Barefoot wines.",
  },
  {
    id: "T-024",
    status: "open",
    priority: "medium",
    category: "data",
    title: "Audit missing liquor bottle images",
    notes: "Some spirits in LIQUOR_IMAGES may be null or broken. Go through All Brands page — Spirits section — and identify any 'No image' cards. Source bottle images for: Aspen vodka, Nikola (well vodka), Royal Crown (well bourbon), Calypso (well rum), Torada (well tequila), Mr. Boston (well gin), Carbliss, Nutrl.",
  },

];

export const CATEGORIES = ["bug", "feature", "data", "ui", "refactor"];
export const STATUSES   = ["open", "in-progress", "done"];
export const PRIORITIES = ["high", "medium", "low"];

export const STATUS_LABEL = {
  "open":        "Open",
  "in-progress": "In Progress",
  "done":        "Done",
};

export const STATUS_COLOR = {
  "open":        "#4A90A4",
  "in-progress": "#D4820A",
  "done":        "#6B8E3E",
};

export const PRIORITY_COLOR = {
  "high":   "#e05a5a",
  "medium": "#C9A84C",
  "low":    "#5a5470",
};

export const CATEGORY_COLOR = {
  "bug":      "#e05a5a",
  "feature":  "#C9A84C",
  "data":     "#4A90A4",
  "ui":       "#8B7BA8",
  "refactor": "#D4820A",
};