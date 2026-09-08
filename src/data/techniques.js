export const FUNDAMENTALS = [
  { name: "SHAKE",  detail: "Citrus, juice, cream, egg whites, syrups", notes: "Fill shaker ¾ with ice, seal, shake hard 10-15 seconds. Sound changes from 'crunchy' to 'wet' when ready.", examples: "Margarita, Daiquiri, Whiskey Sour, Cosmo" },
  { name: "STIR",   detail: "Spirit-only — no juice, cream, or citrus", notes: "Add ice to mixing glass, pour spirits, stir 30-40 seconds until glass exterior is frosty.", examples: "Martini, Manhattan, Negroni, Old Fashioned" },
  { name: "BUILD",  detail: "Simple highballs", notes: "Ice in glass → spirit → mixer → quick stir.", examples: "G&T, Rum & Coke, Moscow Mule" },
  { name: "MUDDLE", detail: "Extract oils/flavor from herbs or fruit", notes: "Herbs: gentle pressure, twist, release oils — don't shred. Fruit: more aggressive to break down.", examples: "Mojito, Mint Julep, Old Fashioned sugar method" },
  { name: "BLEND",  detail: "Frozen drinks", notes: "Spirits + mixers + ice, blend until smooth. Use crushed ice if available.", examples: "Frozen Margarita, Piña Colada" },
];

export const CORE_SPIRITS = [
  { name: "Vodka",          detail: "Martinis, Cosmos, Moscow Mules, White Russians" },
  { name: "Gin",            detail: "Martinis, Negronis, G&Ts, Tom Collins" },
  { name: "White Rum",      detail: "Mojitos, Daiquiris, Piña Coladas" },
  { name: "Tequila Blanco", detail: "Margaritas, Palomas — 100% agave only" },
  { name: "Whiskey",        detail: "Old Fashioneds, Manhattans, Whiskey Sours" },
  { name: "Brandy/Cognac",  detail: "Sidecars, Brandy Alexanders" },
];

export const MODIFIERS = [
  { name: "Dry Vermouth",   detail: "Martinis — refrigerate after opening, use within 1-2 months" },
  { name: "Sweet Vermouth", detail: "Manhattans, Negronis — refrigerate" },
  { name: "Orange Liqueur", detail: "Margaritas, Sidecars — Cointreau > Triple Sec" },
  { name: "Coffee Liqueur", detail: "White Russians, Espresso Martinis — Kahlúa standard" },
  { name: "Campari",        detail: "Negronis — bitter, acquired taste" },
  { name: "Aperol",         detail: "Aperol Spritzes — lighter & sweeter than Campari" },
];

export const GLASSWARE = [
  { glass: "Rocks / Old Fashioned", size: "6-10 oz",  use: "Old Fashioneds, Negronis, whiskey rocks" },
  { glass: "Coupe",                 size: "5-7 oz",   use: "Daiquiris, Sidecars, shaken cocktails up" },
  { glass: "Martini (V-shape)",     size: "4-6 oz",   use: "Martinis, Cosmos, Lemon Drops" },
  { glass: "Highball",              size: "8-12 oz",  use: "G&T, Rum & Coke, Moscow Mule" },
  { glass: "Collins",               size: "10-14 oz", use: "Tom Collins, Mojitos — taller/narrower" },
  { glass: "Nick & Nora",           size: "5-6 oz",   use: "Spirit-forward stirred drinks" },
  { glass: "Hurricane",             size: "15-20 oz", use: "Tiki drinks, Piña Coladas" },
  { glass: "Wine Glass",            size: "8-16 oz",  use: "Spritzes, Sangria, wine-based cocktails" },
];

export const BAR_TERMS = [
  { term: "Neat",              def: "Room temp, no ice, nothing else" },
  { term: "On the Rocks",      def: "Served over ice" },
  { term: "Up / Straight Up",  def: "Chilled, strained, no ice in glass" },
  { term: "Dirty",             def: "Made with olive brine (Martinis)" },
  { term: "Dry",               def: "Less vermouth" },
  { term: "Wet",               def: "More vermouth" },
  { term: "Float",             def: "Ingredient poured gently on top" },
  { term: "Dash",              def: "~1/8 tsp from bitters bottle" },
  { term: "Expressed",         def: "Citrus oils sprayed over drink surface" },
  { term: "Twist",             def: "Citrus peel twisted to release oils" },
  { term: "In the Weeds",      def: "Overwhelmed, too busy to catch up" },
  { term: "86'd",              def: "Item no longer available / out of stock" },
  { term: "Well / Rail",       def: "Cheapest house spirits in speed rail" },
  { term: "Call",              def: "Mid-tier spirits requested by name" },
  { term: "Top Shelf",         def: "Highest quality, most expensive spirits" },
  { term: "Last Call",         def: "Final drink orders before closing" },
  { term: "Mise en Place",     def: "Everything in its place — organized setup" },
  { term: "Dry Shake",         def: "Shaking without ice, for egg whites" },
  { term: "Autograt",          def: "Automatic gratuity added to check" },
  { term: "Behind the Stick",  def: "Working behind the bar" },
  { term: "Chaser / Back",     def: "Milder drink after a shot" },
  { term: "Bruised",           def: "Over-shaken, cloudy — bad for Martinis" },
  { term: "Free Pour",         def: "Pouring without measuring, by count or feel" },
  { term: "Highball",          def: "Tall drink with spirit and mixer" },
];

export const RATIOS = [
  { name: "Classic Sour",         detail: "2 : 0.75 : 0.75  (spirit : citrus : sweet)" },
  { name: "Daiquiri / Margarita", detail: "2 : 1 : 0.75  (spirit : citrus : sweet)" },
  { name: "Negroni",              detail: "1 : 1 : 1  (equal parts)" },
  { name: "Martini",              detail: "5:1 to 2:1  (gin : vermouth — adjust to taste)" },
];

export const GOLDEN_RULES = [
  { rule: "Fresh citrus juice, always",       detail: "No bottled juice. Ever." },
  { rule: "Measure your ingredients",         detail: "Use a jigger until you're a pro." },
  { rule: "Chill your glassware",             detail: "Freezer or ice water while mixing." },
  { rule: "Stir stirred, shake shaken",       detail: "Spirit-only = stir; juice/citrus/cream = shake." },
  { rule: "Taste as you go",                  detail: "Adjust sweetness, tartness, strength." },
  { rule: "Simple garnishes",                 detail: "Must add aroma, flavor, or visual appeal — not just decoration." },
  { rule: "Learn the classics first",         detail: "Master the rules, then adapt to taste." },
];

export const PRO_TIPS = [
  { name: "Ice Matters",    detail: "Standard cubes — most drinks. Large cubes (2\") — rocks drinks, slower melt. Crushed ice — Juleps, Tiki drinks. Always use fresh ice, never reuse." },
  { name: "Citrus Rules",   detail: "Fresh juice lasts ~4 hours before oxidizing. Lemon for whiskey drinks, lime for rum & tequila." },
  { name: "Vermouth",       detail: "It's wine. Refrigerate after opening. Use within 1–2 months. Old vermouth = ruined drink." },
  { name: "Garnishes",      detail: "Twist — express oils over drink, rub rim, drop or discard. Rim — use citrus wedge + salt/sugar, rim half only so the guest has the choice." },
];

export const TROUBLESHOOTING = [
  { problem: "Too strong",      cause: "Under-diluted",           fix: "Shake/stir longer, more ice" },
  { problem: "Too weak",        cause: "Over-diluted",            fix: "Shake/stir less, use larger ice" },
  { problem: "Too sweet",       cause: "Too much syrup",          fix: "Add more citrus or bitters" },
  { problem: "Too sour",        cause: "Too much citrus",         fix: "Add more simple syrup" },
  { problem: "Flat / watery",   cause: "Old ice or poor technique",fix: "Fresh ice, shake harder" },
  { problem: "Cloudy (stirred)",cause: "Shaken instead of stirred",fix: "Stir spirit-only drinks" },
];

export const HOME_BAR = [
  {
    level: "Level 1 — The Basics", cost: "$100–150",
    items: ["Vodka (Tito's, Smirnoff)", "Gin (Beefeater, Tanqueray)", "White Rum (Bacardi, Havana Club)", "Simple syrup (make it yourself)", "Fresh lemons & limes", "Basic shaker + jigger"],
  },
  {
    level: "Level 2 — Expanding", cost: "$150–250 more",
    items: ["Tequila (Espolòn, Olmeca Altos)", "Bourbon (Buffalo Trace, Wild Turkey)", "Dry Vermouth (Dolin)", "Sweet Vermouth (Carpano Antica)", "Cointreau", "Angostura Bitters", "Bar spoon + strainer"],
  },
  {
    level: "Level 3 — Complete", cost: "$200–300 more",
    items: ["Premium spirits (upgrade favorites)", "Campari", "Kahlúa", "Orange bitters", "Muddler", "Proper glassware set"],
  },
];