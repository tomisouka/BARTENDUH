export const FERMENTED = [
  { name: "Beer 🍺", abv: "4–12%", process: "Mash grains → boil with hops → ferment → age → bottle", styles: ["Lager (cold-fermented, crisp) — Pilsner, Helles, Bock", "Ale (warm-fermented, fruity) — IPA, Stout, Wheat, Sour"] },
  { name: "Wine 🍷", abv: "9–16%", process: "Crush grapes → ferment → age → bottle", styles: ["Reds: Cabernet, Pinot Noir, Syrah", "Whites: Chardonnay, Sauvignon Blanc", "Fortified (15-22%): Port, Sherry"] },
  { name: "Sake 🍶", abv: "15–20%", process: "Polish rice → steam → add koji mold → ferment (starch converts and ferments simultaneously)", styles: ["Junmai — 70% rice remaining", "Ginjo — 60% remaining, refined", "Daiginjo — 50% remaining, premium"] },
  { name: "Cider & Mead 🍎", abv: "Cider 4–8% · Mead 8–20%", process: "Press cider apples → ferment → carbonate (optional)", styles: ["Hard Cider — bittersweet apple varieties", "Melomel — fruit mead", "Metheglin — spiced mead", "Braggot — mead + beer hybrid"] },
];

export const SPIRITS = [
  {
    name: "Whiskey", emoji: "🥃", abv: "40–50%",
    process: "Mash grains → ferment → distill → age in barrels (months to decades)",
    color: "#C9A84C",
    types: [
      { name: "Bourbon",    detail: "51%+ corn, new charred oak — vanilla, caramel" },
      { name: "Scotch",     detail: "Malted barley, 3+ years — Islay = smoky, Speyside = fruity" },
      { name: "Irish",      detail: "Triple-distilled, smooth — honey, vanilla" },
      { name: "Rye",        detail: "51%+ rye grain — spicy, peppery, dry" },
      { name: "Japanese",   detail: "Scotch-like, refined — Mizunara oak notes" },
      { name: "Tennessee",  detail: "Like bourbon but filtered through maple charcoal" },
    ]
  },
  {
    name: "Rum", emoji: "🏴‍☠️", abv: "40%",
    process: "Ferment molasses (or cane juice) → distill → age optional → bottle",
    color: "#A0522D",
    types: [
      { name: "White/Silver",detail: "Unaged, light — for cocktails" },
      { name: "Gold/Amber",  detail: "1–3 years oak — caramel, vanilla" },
      { name: "Dark",        detail: "5+ years — rich molasses and toffee" },
      { name: "Spiced",      detail: "Infused with cinnamon, vanilla, nutmeg" },
      { name: "Agricole",    detail: "Fresh cane juice — grassy, funky, French Caribbean" },
      { name: "Overproof",   detail: "50–75% ABV — handle with care" },
    ]
  },
  {
    name: "Tequila & Mezcal", emoji: "🌵", abv: "Tequila 40% · Mezcal 40–55%",
    process: "Harvest agave (7–10yr plant) → cook hearts → crush → ferment → distill",
    color: "#6B8E3E",
    types: [
      { name: "Blanco",      detail: "Unaged, pure agave flavor — for cocktails" },
      { name: "Reposado",    detail: "2–12 months — pale gold, smooth" },
      { name: "Añejo",       detail: "1–3 years — amber, butterscotch, complex" },
      { name: "Extra Añejo", detail: "3+ years — ultra-smooth, whiskey-like" },
      { name: "Mezcal",      detail: "Any agave, pit-roasted — smoky, earthy, complex" },
    ],
    note: "⚠️ 100% agave only. 'Mixto' (51% agave) = avoid."
  },
  {
    name: "Gin", emoji: "🌲", abv: "40–47%",
    process: "Distill neutral grain spirit with juniper berries + botanicals",
    color: "#4A90A4",
    types: [
      { name: "London Dry",  detail: "Juniper-forward, no added sugar — Tanqueray, Beefeater" },
      { name: "Plymouth",    detail: "Earthier, slightly sweeter — one distillery only" },
      { name: "Old Tom",     detail: "Slightly sweetened — 18th century style" },
      { name: "Genever",     detail: "Dutch original — malty, whiskey-like" },
    ]
  },
  {
    name: "Vodka", emoji: "⚪", abv: "40%",
    process: "Ferment base → distill 3+ times → charcoal filter → dilute with water",
    color: "#8B7BA8",
    types: [
      { name: "Grain (wheat/rye/corn)", detail: "Clean and crisp — most common" },
      { name: "Potato",                 detail: "Creamy, rich texture" },
      { name: "Grape",                  detail: "Slightly fruity, silky" },
    ]
  },
  {
    name: "Brandy & Cognac", emoji: "🍇", abv: "35–60%",
    process: "Ferment fruit (grapes, apples, pears) → distill → age in oak",
    color: "#8B1A35",
    types: [
      { name: "Cognac",   detail: "France — VS (2yr) → VSOP (4yr) → XO (10yr)" },
      { name: "Armagnac", detail: "More rustic, earthy — prune, spice" },
      { name: "Calvados", detail: "Apple brandy, France — baked apple, caramel" },
      { name: "Pisco",    detail: "Unaged grape brandy — Peru/Chile" },
      { name: "Grappa",   detail: "Italian, from grape pomace — strong, aromatic" },
    ]
  },
  {
    name: "Absinthe", emoji: "🌿", abv: "45–74%",
    process: "Neutral spirit + wormwood + anise + fennel + herbs → distilled",
    color: "#4A7A4A",
    types: [
      { name: "Traditional", detail: "Dilute with cold water — turns cloudy (louching). Pour over sugar cube optionally. Tastes of licorice, herbal bitterness." },
    ]
  },
  {
    name: "Liqueurs", emoji: "🍫", abv: "15–55%",
    process: "Base spirit + sugar + flavoring = sweet, flavored alcohol",
    color: "#D4712B",
    types: [
      { name: "Nut",    detail: "Amaretto (almond), Frangelico (hazelnut)" },
      { name: "Coffee", detail: "Kahlúa (sweet), Tia Maria (less sweet)" },
      { name: "Citrus", detail: "Cointreau, Grand Marnier, Limoncello" },
      { name: "Cream",  detail: "Baileys (whiskey + cream), RumChata" },
      { name: "Herbal", detail: "Chartreuse (130 herbs), Fernet-Branca (bitter)" },
    ]
  },
  {
    name: "Vermouth", emoji: "🍸", abv: "15–18%",
    process: "Fortified wine + neutral spirit + botanicals (especially wormwood) — wine-based, not distilled",
    color: "#8B7BA8",
    note: "⚠️ Refrigerate after opening. Treat like wine. Old vermouth = ruined cocktail. Use within 1–2 months.",
    types: [
      { name: "Dry (French)",    detail: "Crisp, herbal, bitter-dry — Martinis. e.g. Dolin Dry, Noilly Prat" },
      { name: "Sweet (Italian)", detail: "Sweet, vanilla, caramel — Manhattans, Negronis. e.g. Carpano Antica, Cocchi" },
      { name: "Blanc/Bianco",    detail: "Semi-sweet, floral, between dry and sweet. e.g. Dolin Blanc" },
    ]
  },
];

export const GRAINS = [
  { name: "Barley 🌾", usedIn: "Beer · Scotch · Irish Whiskey", flavor: "Nutty, bready, slightly sweet", starch: "60–65%", note: "Contains enzymes that convert its own starches to sugar — most efficient brewing grain" },
  { name: "Corn 🌽",   usedIn: "Bourbon · Tennessee Whiskey · Many Vodkas", flavor: "Sweet, mild, vanilla notes", starch: "70–75%", note: "Highest starch content of any grain — cheap, abundant, produces smooth spirits" },
  { name: "Rye 🌾",    usedIn: "Rye Whiskey · Some Bourbons · Some Vodkas", flavor: "Spicy, peppery, dry, bold", starch: "55–60%", note: "Adds complexity and bite. Creates thick, sticky mash — difficult to work with" },
  { name: "Wheat 🌾",  usedIn: "Wheat Beer · Wheated Bourbon · Some Vodkas", flavor: "Soft, smooth, slightly sweet, light", starch: "60–65%", note: "Creates gentle, approachable spirits — character of Maker's Mark bourbon" },
];

export const STORAGE = {
  unopened: [
    { type: "Vodka / Gin",     shelf: "Indefinitely", storage: "Cool, dark, upright",      notes: "Freezer OK" },
    { type: "Whiskey",         shelf: "Indefinitely", storage: "Cool, dark, upright",      notes: "NO freezer — dulls flavor" },
    { type: "Rum / Tequila",   shelf: "Indefinitely", storage: "Cool, dark, upright",      notes: "Blancos fade faster" },
    { type: "Red Wine",        shelf: "1–3 years",    storage: "Horizontal, cool, dark",   notes: "Varies widely by type" },
    { type: "White Wine",      shelf: "1–2 years",    storage: "Horizontal, cool, dark",   notes: "Age-worthy whites last longer" },
    { type: "Beer (IPA)",      shelf: "2–3 months",   storage: "Upright, cold, dark",      notes: "Hops fade fast — drink fresh" },
    { type: "Beer (Stout)",    shelf: "1 year",        storage: "Upright, cool, dark",      notes: "Barleywines improve with age" },
    { type: "Vermouth",        shelf: "3–4 years",    storage: "Upright, cool",            notes: "Refrigerate after opening" },
  ],
  opened: [
    { type: "Spirits (40%+ ABV)", use: "1–2 years",   storage: "Tight seal, upright, cool/dark. Transfer to smaller bottle when low." },
    { type: "Red Wine",           use: "3–5 days",     storage: "Recork, cool/dark place. Heavier reds last longer." },
    { type: "White / Rosé",       use: "3–5 days",     storage: "Refrigerate immediately. Higher acid = longer life." },
    { type: "Sparkling",          use: "1–3 days",     storage: "Champagne stopper, refrigerate, upright." },
    { type: "Vermouth",           use: "1–3 months",   storage: "Refrigerate! Dry = 1 month. Sweet = 2–3 months." },
    { type: "Beer",               use: "Same day",     storage: "Drink it or pour it out. CO₂ escapes, oxidation sets in." },
    { type: "Sake",               use: "1–2 weeks",    storage: "Refrigerate immediately. Delicate flavors fade fast." },
    { type: "Cream Liqueurs",     use: "6 months",     storage: "Refrigerate. Check for curdling or separation." },
  ],
  rules: [
    { rule: "High proof = low risk",  detail: "Spirits last almost forever. Bacteria cannot survive at 40%+ ABV." },
    { rule: "Wine needs care",        detail: "Cool, dark, horizontal when unopened. Refrigerate immediately once opened." },
    { rule: "Vermouth is wine",       detail: "Refrigerate after opening. Old vermouth ruins cocktails." },
    { rule: "Beer is perishable",     detail: "Drink fresh, especially IPAs. Hops fade, carbonation escapes, oxidation sets in." },
    { rule: "Air is the enemy",       detail: "Transfer to smaller bottles when low. Less air = slower degradation." },
    { rule: "Heat kills flavor",      detail: "Never store above 75°F for extended periods." },
    { rule: "When in doubt, smell it",detail: "Vinegar, cardboard, or mustiness? Pour it out." },
  ]
};