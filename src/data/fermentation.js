// ─────────────────────────────────────────────────────────────────────────────
// FERMENTATION.JS
// All fermentation science, grain processing, yeast, and related deep-dives
// from alcohol.md — previously unported to React data
// ─────────────────────────────────────────────────────────────────────────────

// ── Yeast Types ───────────────────────────────────────────────────────────────
export const YEAST_TYPES = [
  {
    name: "Ale Yeast",
    scientific: "Saccharomyces cerevisiae",
    emoji: "🦠",
    temp: "60–75°F (warm)",
    location: "Top-fermenting (floats on surface)",
    flavor: "Fruity esters (banana, apple, pear), spicy phenols",
    usedIn: "Ales, wine, whiskey, sake",
    personality: "Fast, aggressive, flavorful",
    color: "#D4820A",
  },
  {
    name: "Lager Yeast",
    scientific: "Saccharomyces pastorianus",
    emoji: "🦠",
    temp: "45–55°F (cold)",
    location: "Bottom-fermenting (sinks to bottom)",
    flavor: "Clean, crisp, subtle — minimal esters",
    usedIn: "Lagers, pilsners",
    personality: "Slow, patient, neutral",
    color: "#4A90A4",
  },
  {
    name: "Brettanomyces (Brett)",
    scientific: "Wild yeast",
    emoji: "🦠",
    temp: "Varies",
    location: "Wild — airborne or added",
    flavor: "Funky, earthy, farmhouse, leather, barnyard, tropical fruit",
    usedIn: "Sour beers, farmhouse ales",
    personality: "Unpredictable, complex, slow",
    color: "#6B8E3E",
  },
  {
    name: "Koji Mold",
    scientific: "Aspergillus oryzae",
    emoji: "🍄",
    temp: "Varies",
    location: "Added to rice/grain",
    flavor: "Converts starch → sugar while yeast ferments simultaneously",
    usedIn: "Sake, shochu — parallel fermentation",
    personality: "Unique — not yeast but critical for rice spirits",
    color: "#8B7BA8",
  },
];

// ── Wild Yeast & Bacteria ─────────────────────────────────────────────────────
export const WILD_ORGANISMS = [
  { name: "Brettanomyces",  flavor: "Funky, earthy, leather, barnyard, tropical fruit",    usedIn: "Sour beers, farmhouse ales" },
  { name: "Lactobacillus",  flavor: "Clean sour/tart acidity (same bacteria as yogurt)",   usedIn: "Berliner Weisse, Gose, some sours" },
  { name: "Pediococcus",    flavor: "More sourness, butter notes — works very slowly",      usedIn: "Lambics, Flanders red ales" },
];

// ── Fermentation Phases ───────────────────────────────────────────────────────
export const FERMENTATION_PHASES = [
  {
    phase: "Phase 1: Lag",
    timeframe: "0–24 hours",
    yeastState: "Waking up, multiplying, preparing",
    visible: "Nothing — calm liquid",
    happening: [
      "Yeast absorbs oxygen",
      "Builds cell walls",
      "Population multiplies",
      "Acclimates to temperature",
    ],
    critical: "Right temp, healthy yeast, good oxygen levels",
  },
  {
    phase: "Phase 2: Exponential Growth",
    timeframe: "1–4 days",
    yeastState: "Working overtime, making alcohol",
    visible: "Heavy bubbling, thick foam (krausen) on top, airlock going crazy, temperature rising",
    happening: [
      "Alcohol (ethanol) production peaks",
      "CO₂ bubbles form",
      "Flavor compounds created (esters, phenols)",
      "Heat generated",
    ],
    critical: "Temperature control here makes or breaks the flavor",
  },
  {
    phase: "Phase 3: Stationary",
    timeframe: "3–7 days",
    yeastState: "Running out of sugar, cleaning up",
    visible: "Bubbling slows, foam collapses, liquid starts clearing",
    happening: [
      "Final sugar → alcohol conversion",
      "Yeast reabsorbs off-flavors",
      "Yeast begins settling to bottom",
    ],
    critical: "Don't rush — yeast is cleaning up its mess",
  },
  {
    phase: "Phase 4: Conditioning",
    timeframe: "Days to years depending on drink",
    yeastState: "Dormant, job done",
    visible: "Clear liquid, sediment layer, no activity",
    happening: [
      "Beer: 1–4 weeks (carbonation, smoothing)",
      "Spirits: Done (ready to distill)",
      "Wine: Months to years (complexity develops)",
    ],
    critical: "Patience — flavors integrate and mellow",
  },
];

// ── Temperature Effects ───────────────────────────────────────────────────────
export const FERMENTATION_TEMPS = [
  {
    zone: "Too Cold",
    indicator: "❄️",
    range: "Below 50°F for ales / below 40°F for lagers",
    result: "Yeast goes dormant, stuck fermentation, incomplete conversion, clean but weak",
    color: "#4A90A4",
  },
  {
    zone: "Ales — Ideal",
    indicator: "✅",
    range: "60–72°F",
    result: "60–65°F = cleaner, crisper · 68–72°F = fruitier, more esters",
    color: "#6B8E3E",
  },
  {
    zone: "Lagers — Ideal",
    indicator: "✅",
    range: "45–55°F",
    result: "Slow fermentation (2–3× longer than ales). Crisp, clean finish, minimal off-flavors",
    color: "#6B8E3E",
  },
  {
    zone: "Whiskey — Ideal",
    indicator: "✅",
    range: "70–85°F",
    result: "Warmer = faster, more flavor compounds. Cooler = cleaner, slower",
    color: "#C9A84C",
  },
  {
    zone: "Too Warm",
    indicator: "🔥",
    range: "Above 80°F for ales / above 60°F for lagers",
    result: "Fusel alcohols (hot/solvent taste), excessive esters (nail polish), stressed yeast, fast but flawed",
    color: "#8B1A35",
  },
];

// ── Attenuation (Dry vs Sweet) ────────────────────────────────────────────────
export const ATTENUATION = [
  {
    type: "High Attenuation",
    range: "75–85%",
    result: "Dry finish, higher ABV, light body",
    examples: "Brut champagne, saison, IPA",
    controlledBy: "Yeast strain, higher temps, simple sugars, good nutrients",
  },
  {
    type: "Low Attenuation",
    range: "65–75%",
    result: "Sweet finish, fuller body, lower ABV from same starting sugar",
    examples: "Sweet wine, milk stout, Scottish ale",
    controlledBy: "Yeast strain, lower temps, complex sugars, limited nutrients",
  },
];

// ── Fermentation Vessels ──────────────────────────────────────────────────────
export const FERMENTATION_VESSELS = [
  {
    type: "Open Fermentation",
    setup: "Open to air (cloth cover only)",
    benefits: ["Heat escapes easily", "Easy to skim yeast", "Traditional character and flavors"],
    risks: ["Wild yeast contamination", "Oxidation risk", "Insects/debris"],
    usedFor: "Traditional British ales, some Belgians, some wine",
  },
  {
    type: "Closed Fermentation",
    setup: "Sealed vessel + airlock (CO₂ out, air blocked)",
    benefits: ["No contamination", "No oxidation", "Full temperature control", "Can capture CO₂"],
    risks: ["Heat harder to dissipate"],
    usedFor: "Most modern beer, all spirits, most wine",
  },
];

// ── Special Fermentation Techniques ──────────────────────────────────────────
export const SPECIAL_TECHNIQUES = [
  {
    name: "Spontaneous Fermentation",
    summary: "No yeast added — wild yeast from the air does the work",
    steps: [
      "Expose wort to open air overnight (coolship)",
      "Wild yeast and bacteria colonize naturally",
      "Fermentation takes 1–3 years",
      "Results are unpredictable and complex",
    ],
    usedIn: "Belgian lambics, some natural wines",
    flavor: "Funky, sour, barnyard, deeply complex",
  },
  {
    name: "Mixed Fermentation",
    summary: "Multiple organisms working together or in sequence",
    steps: [
      "Primary: standard ale yeast",
      "Add Brettanomyces for funk",
      "Add Lactobacillus for sourness",
      "Age for months to years",
    ],
    usedIn: "Sour beers, farmhouse ales",
    flavor: "Layered: tart, funky, complex",
  },
  {
    name: "Stuck Fermentation",
    summary: "Yeast quits early — fermentation stops before completion",
    steps: [
      "Diagnose: too cold, no nutrients, too much alcohol, too little yeast",
      "Warm it up to yeast's ideal range",
      "Add yeast nutrients",
      "Pitch fresh yeast",
      "Gently rouse settled yeast",
    ],
    usedIn: "A problem to fix, not a style",
    flavor: "Sweet (unfermented sugar remains), incomplete",
  },
  {
    name: "Champagne Method (Méthode Champenoise)",
    summary: "Secondary fermentation inside the sealed bottle creates bubbles",
    steps: [
      "Make still base wine",
      "Add precise sugar + yeast to each bottle",
      "Cork and age (months to years — 15 months minimum)",
      "Riddling: tilt/rotate bottles to collect sediment in neck",
      "Disgorgement: freeze neck, pop out sediment plug",
      "Top off with dosage + final cork",
    ],
    usedIn: "Champagne, Cava, traditional method sparkling wine",
    flavor: "Fine persistent bubbles, toasty, complex",
  },
];

// ── Flavor Byproducts ─────────────────────────────────────────────────────────
export const FLAVOR_BYPRODUCTS = [
  {
    name: "Esters",
    emoji: "🍌",
    type: "Fruity",
    flavors: ["Banana (isoamyl acetate)", "Apple (ethyl hexanoate)", "Pear", "Pineapple"],
    morFrom: "Warm temps, low oxygen, high sugar",
    commonIn: "Belgian ales, hefeweizens, English ales",
  },
  {
    name: "Phenols",
    emoji: "🌶️",
    type: "Spicy",
    flavors: ["Clove (4-vinyl guaiacol)", "Smoke", "Pepper", "Medicinal"],
    morFrom: "Certain yeast strains, warm temps",
    commonIn: "Hefeweizens, Belgian ales, farmhouse ales",
  },
  {
    name: "Fusel Alcohols",
    emoji: "🔥",
    type: "Hot / Harsh",
    flavors: ["Solvent", "Burning", "Rose (phenylethanol)"],
    morFrom: "High temps, stressed yeast, low oxygen",
    commonIn: "Any beer/spirit fermented too hot. Low levels = complexity; high levels = harsh finish",
  },
  {
    name: "Diacetyl",
    emoji: "🧈",
    type: "Butter",
    flavors: ["Butter", "Butterscotch", "Slick mouthfeel"],
    morFrom: "Yeast metabolism byproduct — cleaned up with proper conditioning",
    commonIn: "Good: British ales (low levels), Czech pilsners. Bad: most lagers and ales at high levels",
  },
  {
    name: "Sulfur Compounds",
    emoji: "💨",
    type: "Off-flavors",
    flavors: ["Rotten eggs (H₂S)", "Struck match", "Cooked corn", "Onion/garlic"],
    morFrom: "Certain yeast strains, stressed or dying yeast",
    commonIn: "Lagers (usually blows off during conditioning). A flaw if persistent",
  },
];

// ── Alcohol Tolerance by Yeast ────────────────────────────────────────────────
export const YEAST_TOLERANCE = [
  { yeast: "Standard ale yeast",   maxAbv: "8–12%",  note: "Gets 'drunk', slows and stops" },
  { yeast: "Wine yeast",           maxAbv: "12–16%", note: "Alcohol toxicity limits" },
  { yeast: "Champagne yeast",      maxAbv: "16–18%", note: "High tolerance, used to boost ABV" },
  { yeast: "Distiller's yeast",    maxAbv: "18–20%", note: "Bred specifically for spirits" },
  { yeast: "Turbo yeast",          maxAbv: "20–25%", note: "Lab-created, maximum efficiency" },
];

// ── Sugar Sources by Drink ────────────────────────────────────────────────────
export const SUGAR_SOURCES = [
  { drink: "Beer",    sugar: "Maltose, glucose",     origin: "Grain starches (mashing)" },
  { drink: "Wine",    sugar: "Glucose, fructose",    origin: "Grapes (natural)" },
  { drink: "Sake",    sugar: "Glucose",              origin: "Rice starch (koji mold)" },
  { drink: "Mead",    sugar: "Glucose, fructose",    origin: "Honey" },
  { drink: "Whiskey", sugar: "Maltose, glucose",     origin: "Grain mash" },
  { drink: "Rum",     sugar: "Sucrose",              origin: "Molasses or cane juice" },
  { drink: "Tequila", sugar: "Fructose, glucose",    origin: "Cooked agave" },
];

// ── Monitoring Fermentation ───────────────────────────────────────────────────
export const FERMENTATION_MONITORING = [
  {
    tool: "Specific Gravity (SG)",
    measures: "Liquid density vs. water",
    how: "Water = 1.000. Sugar = heavier (1.050). Alcohol = lighter (1.010). Gravity drops as sugar converts to alcohol.",
    abvCalc: "(OG − FG) × 131 = ABV%  →  Example: (1.050 − 1.010) × 131 = 5.2%",
    tools: "Hydrometer or refractometer",
  },
  {
    tool: "pH (Acidity)",
    measures: "Acidity of the fermenting liquid",
    how: "Beer wort: 5.2–5.6. Wine: 3.0–4.0. Whiskey mash: 5.0–5.5. Low pH blocks bacteria. Too high = poor enzyme activity.",
    abvCalc: null,
    tools: "pH meter or strips",
  },
];

// ── Grain Processing Steps ────────────────────────────────────────────────────
export const GRAIN_PROCESSING = [
  {
    step: "1. Malting",
    appliesTo: "Barley only",
    purpose: "Activate enzymes that convert starch → sugar",
    stages: [
      { name: "Steep",     detail: "Soak barley in water 2–3 days (40–45°F). Grain moisture rises from 12% → 45%." },
      { name: "Germinate", detail: "Spread on floor or drums 4–6 days. Rootlets sprout, enzymes activate. Called 'green malt'." },
      { name: "Kiln",      detail: "Dry in hot air to stop sprouting. Light (122–149°F) = pale malt. Medium (167–185°F) = amber. Heavy (392–428°F) = chocolate/black malt for stouts." },
    ],
    result: "Malted barley — the sugar-making powerhouse. Other grains skip this and rely on barley's enzymes.",
  },
  {
    step: "2. Milling",
    appliesTo: "All grains",
    purpose: "Expose starch inside the grain for water access",
    stages: [
      { name: "Beer (Crushing)",   detail: "Rollers crack the husk but keep it mostly intact. Husks act as natural filter during lautering." },
      { name: "Spirits (Grinding)", detail: "Hammermills pulverize grain into fine meal. No need to preserve husks — spirits are distilled, not filtered." },
    ],
    result: "Grist — mix of husk, grits, and flour ready for mashing.",
  },
  {
    step: "3. Mashing",
    appliesTo: "All grains",
    purpose: "Convert grain starch into fermentable sugar using heat + enzymes",
    stages: [
      { name: "Mix + Heat",  detail: "Combine crushed grain with hot water (145–158°F). Beer: 1.25–2 qt water per lb. Spirits: 2–4 qt per lb." },
      { name: "Hold",        detail: "60–90 min. Enzymes convert starch → sugar. 145–158°F = more fermentable (dry). 158–167°F = less fermentable (sweet, fuller body)." },
      { name: "Lautering",   detail: "Beer only: drain sugary liquid through grain bed (creates wort). Spirits skip this — whole mash goes to fermentation." },
    ],
    result: "Beer → wort (sweet liquid). Spirits → mash (grain + liquid, fermented whole).",
  },
  {
    step: "4. Cooking (Non-Malted Grains)",
    appliesTo: "Corn, rye, wheat — for spirits",
    purpose: "Soften grain and gelatinize starch so enzymes can access it",
    stages: [
      { name: "Heat grain",   detail: "Corn: 165°F for 30–60 min. Rye: 150°F for 30 min. Wheat: 140–158°F for 30 min." },
      { name: "Cool + Add malt", detail: "Cool to mashing temp (145–158°F), then add malted barley for its enzymes." },
      { name: "Mash",         detail: "Hold 60–90 min while barley enzymes convert all the grain starches to sugar." },
    ],
    result: "Bourbon example: 70% corn cooked first → cool → add 15% rye + 15% malt → mash → ferment whole.",
  },
];

// ── Special Grain Techniques ──────────────────────────────────────────────────
export const SPECIAL_GRAIN_TECHNIQUES = [
  {
    name: "Sour Mashing",
    usedIn: "Whiskey (especially bourbon)",
    how: "Save a portion of previous mash (like a sourdough starter) and add to new batch.",
    why: "Lowers pH to protect against bacteria, creates consistency batch-to-batch.",
    note: "'Sour mash' whiskey isn't sour-tasting — it's a production process.",
  },
  {
    name: "Cereal Cooking",
    usedIn: "Whiskey",
    how: "Cook adjunct grains (corn/rye) separately at high temp, then transfer to main mash with malted barley.",
    why: "Allows each grain to be processed at its optimal temperature.",
    note: "More control = better starch extraction.",
  },
  {
    name: "Turbid Mashing",
    usedIn: "Belgian beer (lambics, gueuze)",
    how: "Deliberately create cloudy, starchy wort by incomplete conversion.",
    why: "Unfermented starches remain as food for wild yeast and bacteria during spontaneous fermentation.",
    note: "Essential for authentic lambic production — starches feed the 1–3 year fermentation.",
  },
];

// ── Grain to Glass: Process Comparison ───────────────────────────────────────
export const GRAIN_TO_GLASS = [
  {
    drink: "Beer",
    emoji: "🍺",
    process: "Malt grain → Mill (crack) → Mash with water (145–158°F) → Drain wort → Boil with hops → Ferment → Condition → Beer",
    keyDiff: "Drain and discard grain before fermentation. Hops boiled in.",
  },
  {
    drink: "Whiskey",
    emoji: "🥃",
    process: "Mix grains → Cook (if corn/rye) → Add malt → Mash → Ferment WHOLE mash → Distill → Age in barrels → Whiskey",
    keyDiff: "Ferment and distill everything together — grain stays in. No hops.",
  },
  {
    drink: "Vodka",
    emoji: "⚪",
    process: "Grain → Grind → Cook/Mash → Ferment → Distill MANY times → Filter (charcoal) → Dilute → Vodka",
    keyDiff: "Multiple distillations strip flavor. Goal is purity and neutrality.",
  },
];

// ── Regional Spirits ──────────────────────────────────────────────────────────
export const REGIONAL_SPIRITS = [
  {
    name: "Soju",
    emoji: "🇰🇷",
    region: "Korea",
    abv: "16–45%",
    base: "Rice, wheat, or sweet potato (modern)",
    flavor: "Clean, neutral, slightly sweet",
    use: "Shots, mixed drinks — most consumed spirit in the world by volume",
    color: "#4A90A4",
  },
  {
    name: "Baijiu",
    emoji: "🇨🇳",
    region: "China",
    abv: "40–60%",
    base: "Sorghum + mixed grains, fermented in underground pits",
    flavor: "Intensely strong, pungent, funky, aromatic — very acquired taste",
    use: "Toasts, celebrations, business dinners",
    color: "#C9A84C",
  },
  {
    name: "Shochu",
    emoji: "🇯🇵",
    region: "Japan",
    abv: "25–35%",
    base: "Barley, sweet potato, or rice + koji mold",
    flavor: "Similar to sake but distilled — cleaner and drier than soju",
    use: "On the rocks, mixed with hot or cold water, or as cocktail base",
    color: "#8B7BA8",
  },
  {
    name: "Aquavit",
    emoji: "🇳🇴",
    region: "Scandinavia",
    abv: "40%",
    base: "Grain or potato + caraway seeds (required by law) + dill, fennel",
    flavor: "Herbal, caraway-forward, clean",
    use: "Chilled shots at celebrations, especially Christmas and midsummer",
    color: "#6B8E3E",
  },
  {
    name: "Cachaça",
    emoji: "🇧🇷",
    region: "Brazil",
    abv: "38–48%",
    base: "Fresh sugarcane juice (not molasses — unlike rum)",
    flavor: "Funky, grassy, raw, vegetal",
    use: "Caipirinhas — Brazil's national cocktail",
    color: "#D4712B",
  },
];

// ── Vermouth ──────────────────────────────────────────────────────────────────
export const VERMOUTH = {
  what: "Fortified wine (wine + neutral spirit) flavored with botanicals, especially wormwood (artemisia)",
  abv: "15–18%",
  critical: "Refrigerate after opening. It's wine-based — treat it like wine. Old vermouth = ruined cocktail.",
  types: [
    { name: "Dry (French)",   color: "Pale yellow/white", taste: "Crisp, herbal, bitter-dry",         use: "Martinis",                       example: "Dolin Dry, Noilly Prat" },
    { name: "Sweet (Italian)", color: "Red/amber",         taste: "Sweet, vanilla, caramel, complex",  use: "Manhattans, Negronis, Boulevardiers", example: "Carpano Antica, Cocchi" },
    { name: "Blanc/Bianco",   color: "Pale white",        taste: "Semi-sweet, floral, between styles", use: "Low-ABV cocktails, neat with ice",  example: "Dolin Blanc" },
  ],
  storage: {
    opened: "Refrigerate immediately. Dry: 1 month. Sweet/Blanc: 2–3 months.",
    unopened: "3–4 years, cool and dark.",
    tip: "Buy the smallest bottle you'll use within a month. Don't use vermouth that's been open for 6 months — it will ruin the drink.",
  },
};

// ── Quick Reference: Fermented vs Distilled ───────────────────────────────────
export const FERMENTED_VS_DISTILLED = {
  fermented: {
    label: "Fermented",
    process: "Yeast eats sugar → alcohol. Stop here.",
    abv: "3–20%",
    examples: "Beer, wine, sake, cider, mead",
  },
  distilled: {
    label: "Distilled",
    process: "Heat fermented liquid → collect alcohol vapor → condense.",
    abv: "40%+",
    examples: "Vodka, whiskey, gin, rum, tequila",
  },
  proofNote: "Proof = ABV × 2  →  100 proof = 50% ABV · 80 proof = 40% ABV",
  agingNote: "Aging in oak adds color, vanilla/caramel flavor, and mellows harshness. Bourbon = new barrels. Scotch/rum = used bourbon barrels.",
};