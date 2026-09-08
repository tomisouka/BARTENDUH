export const CLASSICS = [
  {
    category: "Spirit-Forward", color: "#C9A84C",
    recipes: [
      { name: "Martini",      spirit: "Gin",           method: "STIR",         ingredients: ["2.5 oz gin", "0.5 oz dry vermouth"], steps: ["Add to mixing glass with ice", "Stir 30-40s until glass is frosty", "Strain into chilled glass"], garnish: "Lemon twist OR olives", glass: "Martini or coupe", variations: ["Dry → less vermouth (just a rinse)", "Dirty → +0.5 oz olive brine", "Vodka → swap gin for vodka"] },
      { name: "Manhattan",    spirit: "Rye Whiskey",   method: "STIR",         ingredients: ["2 oz rye whiskey", "1 oz sweet vermouth", "2-3 dashes Angostura bitters"], steps: ["Add all to mixing glass with ice", "Stir 30-40s", "Strain into chilled coupe"], garnish: "Luxardo cherry + optional orange twist", glass: "Coupe or Nick & Nora", variations: ["Perfect → half sweet, half dry vermouth", "Rob Roy → Scotch instead of rye"] },
      { name: "Negroni",      spirit: "Gin",           method: "STIR",         ingredients: ["1 oz gin", "1 oz Campari", "1 oz sweet vermouth"], steps: ["Add all to mixing glass with ice", "Stir 20-30s", "Strain over large ice cube in rocks glass"], garnish: "Orange peel expressed", glass: "Rocks glass", variations: ["Boulevardier → bourbon instead of gin", "Sbagliato → Prosecco instead of gin"] },
      { name: "Old Fashioned",spirit: "Bourbon / Rye", method: "BUILD",        ingredients: ["2 oz bourbon/rye", "0.25 oz simple syrup", "2-3 dashes Angostura bitters"], steps: ["Add whiskey, bitters, simple to glass", "Add fat ice cube", "Stir with bar spoon", "DO NOT muddle fruit"], garnish: "Orange peel expressed + Luxardo cherry", glass: "Rocks glass" },
      { name: "Sazerac",      spirit: "Rye Whiskey",   method: "STIR",         ingredients: ["2 oz rye", "0.25 oz simple syrup", "3 dashes Peychaud's bitters", "Absinthe rinse"], steps: ["Rinse chilled rocks glass with absinthe, dump excess", "Stir rye + simple + bitters with ice 30-40s", "Strain into glass (no ice)", "Express lemon peel over drink, discard"], garnish: "Lemon peel — expressed then discarded", glass: "Rocks glass, no ice" },
    ]
  },
  {
    category: "Sour & Bright", color: "#6B8E3E",
    recipes: [
      { name: "Whiskey Sour", spirit: "Bourbon / Rye", method: "SHAKE",        ingredients: ["2 oz bourbon/rye", "0.75 oz lemon juice", "0.75 oz simple syrup", "Optional: 0.5 oz egg white"], steps: ["If using egg white: dry shake first, then add ice and shake again", "Shake hard 10-15s", "Strain over ice in rocks glass"], garnish: "Cherry + orange slice", glass: "Rocks glass", variations: ["New York Sour → float red wine on top"] },
      { name: "Margarita",    spirit: "Tequila",       method: "SHAKE",        ingredients: ["2 oz tequila", "1 oz lime juice", "0.75 oz Cointreau"], steps: ["Optional: half-rim with salt", "Shake hard with ice", "Strain over fresh ice"], garnish: "Lime wedge", glass: "Rocks glass", variations: ["Tommy's → agave instead of Cointreau", "Frozen → blend with ice", "Spicy → add jalapeño or hot honey"] },
      { name: "Daiquiri",     spirit: "White Rum",     method: "SHAKE",        ingredients: ["2 oz white rum", "1 oz lime juice", "0.75 oz simple syrup"], steps: ["Shake hard 10-15s", "Strain into chilled coupe"], garnish: "None needed", glass: "Coupe" },
      { name: "Cosmopolitan", spirit: "Vodka",         method: "SHAKE",        ingredients: ["1.5 oz vodka", "1 oz cranberry juice", "0.5 oz lime juice", "0.5 oz Cointreau"], steps: ["Shake hard 10-15s", "Strain into chilled martini glass"], garnish: "Lime twist or orange peel", glass: "Martini glass" },
    ]
  },
  {
    category: "Light & Refreshing", color: "#4A90A4",
    recipes: [
      { name: "Mojito",       spirit: "White Rum",     method: "MUDDLE + BUILD",ingredients: ["2 oz white rum", "1 oz lime juice", "0.75 oz simple syrup", "8-10 mint leaves", "Club soda"], steps: ["Gently muddle mint + simple in glass", "Add rum + lime + ice", "Top with club soda, stir gently"], garnish: "Mint sprig + lime wedge", glass: "Collins or highball" },
      { name: "Gin & Tonic",  spirit: "Gin",           method: "BUILD",        ingredients: ["2 oz gin", "4-6 oz tonic water (Fever-Tree recommended)"], steps: ["Fill highball with ice", "Add gin", "Top with tonic, stir gently"], garnish: "Lime wedge squeezed", glass: "Highball" },
      { name: "Moscow Mule",  spirit: "Vodka",         method: "BUILD",        ingredients: ["2 oz vodka", "0.5 oz lime juice", "4-6 oz ginger beer"], steps: ["Fill copper mug with ice", "Add vodka + lime", "Top with ginger beer, stir gently"], garnish: "Lime wedge", glass: "Copper mug", variations: ["Dark & Stormy → dark rum", "Kentucky Mule → bourbon"] },
      { name: "Paloma",       spirit: "Tequila",       method: "BUILD",        ingredients: ["2 oz tequila", "0.5 oz lime juice", "Grapefruit soda"], steps: ["Optional salt rim", "Fill highball with ice", "Add tequila + lime", "Top with grapefruit soda"], garnish: "Grapefruit wedge", glass: "Highball" },
      { name: "Tom Collins",  spirit: "Gin",           method: "SHAKE + BUILD",ingredients: ["2 oz gin", "1 oz lemon juice", "0.5 oz simple syrup", "Club soda"], steps: ["Shake gin + lemon + simple with ice", "Strain into Collins glass over ice", "Top with club soda"], garnish: "Lemon wheel + cherry", glass: "Collins glass" },
      { name: "Aperol Spritz",spirit: "Low ABV",       method: "BUILD",        ingredients: ["3 oz Prosecco", "2 oz Aperol", "1 oz club soda"], steps: ["Fill wine glass with ice", "Add Aperol", "Top with Prosecco then club soda — 3:2:1 ratio", "Stir gently"], garnish: "Orange slice", glass: "Wine glass" },
    ]
  },
  {
    category: "Sweet & Easy", color: "#D4712B",
    recipes: [
      { name: "Tequila Sunrise", spirit: "Tequila",    method: "BUILD",        ingredients: ["2 oz blanco tequila", "4 oz fresh orange juice", "0.5 oz grenadine"], steps: ["Fill highball glass with ice", "Add tequila and orange juice, stir", "Slowly pour grenadine down the side — DO NOT STIR"], garnish: "Orange slice + cherry", glass: "Highball" },
      { name: "Lemon Drop",      spirit: "Vodka",      method: "SHAKE",        ingredients: ["2 oz vodka", "1 oz fresh lemon juice", "0.5 oz Cointreau", "0.5 oz simple syrup"], steps: ["Rim martini glass with sugar", "Shake all ingredients hard 10-15s", "Strain into sugar-rimmed glass"], garnish: "Lemon twist", glass: "Martini glass" },
      { name: "Long Island Iced Tea", spirit: "Multi", method: "SHAKE + BUILD", ingredients: ["0.5 oz ea. vodka, rum, gin, tequila, Cointreau", "1 oz fresh lemon juice", "0.5 oz simple syrup", "Splash cola"], steps: ["Shake all except cola hard 10-15s", "Strain into Collins glass over ice", "Top with small splash of cola, stir gently"], garnish: "Lemon wedge", glass: "Collins glass", variations: ["⚠️ ~22% ABV — sip responsibly"] },
      { name: "Sangria",         spirit: "Wine",       method: "BATCH + CHILL", ingredients: ["750 ml Spanish red wine", "2 oz brandy", "¼ cup fresh orange juice", "2 tbsp sugar", "Orange, apple, lemon sliced"], steps: ["Combine wine, brandy, OJ, and sugar in pitcher", "Add sliced fruit", "Refrigerate at least 2 hours (overnight best)", "Serve over ice"], garnish: "Fresh fruit slices", glass: "Wine glass", variations: ["White Sangria → white wine + peaches + mint"] },
      { name: "Mai Tai",         spirit: "Aged Rum",   method: "SHAKE",        ingredients: ["2 oz aged rum", "0.75 oz Cointreau", "0.75 oz fresh lime juice", "0.5 oz orgeat"], steps: ["Shake all ingredients hard 10-15s", "Strain over crushed ice"], garnish: "Mint sprig + lime wheel", glass: "Tiki mug or rocks glass" },
    ]
  },
  {
    category: "Bitter & Complex", color: "#8B1A35",
    recipes: [
      { name: "Sazerac", spirit: "Rye Whiskey", method: "STIR + RINSE", ingredients: ["2 oz rye whiskey", "0.25 oz simple syrup", "3 dashes Peychaud's bitters", "Absinthe rinse"], steps: ["Rinse chilled rocks glass with absinthe, discard excess", "Stir rye, syrup, and bitters with ice 30-40s", "Strain into glass (no ice)", "Express lemon peel over drink, discard peel"], garnish: "Lemon peel (expressed then discarded)", glass: "Rocks glass, no ice" },
    ]
  },
  {
    category: "Rich & Creamy", color: "#A0522D",
    recipes: [
      { name: "Espresso Martini", spirit: "Vodka",     method: "SHAKE HARD",   ingredients: ["2 oz vodka", "1 oz Kahlúa", "1 oz fresh espresso (cooled)", "0.25 oz simple syrup"], steps: ["Cool espresso to room temp first", "Shake ALL hard 15-20s — creates foam", "Strain into chilled martini glass"], garnish: "3 coffee beans on foam", glass: "Martini glass" },
      { name: "White Russian",    spirit: "Vodka",     method: "BUILD",        ingredients: ["2 oz vodka", "1 oz Kahlúa", "1 oz heavy cream"], steps: ["Add vodka + Kahlúa over ice, stir", "Float cream on top or stir in"], garnish: "None", glass: "Rocks glass", variations: ["Black Russian → no cream"] },
      { name: "Brandy Alexander", spirit: "Brandy",    method: "SHAKE",        ingredients: ["1.5 oz brandy", "1 oz dark crème de cacao", "1 oz heavy cream"], steps: ["Shake hard with ice", "Strain into chilled coupe"], garnish: "Grated nutmeg", glass: "Coupe" },
      { name: "Piña Colada",      spirit: "White Rum", method: "BLEND",        ingredients: ["2 oz white rum", "2 oz pineapple juice", "1.5 oz cream of coconut"], steps: ["Blend all with 1-1.5 cups ice until smooth"], garnish: "Pineapple wedge + cherry", glass: "Hurricane" },
    ]
  },
];
// ── Spirit index — cocktails grouped by base spirit ───────────────────────────
export const SPIRIT_INDEX = {
  "Vodka":   ["Martini (Vodka)", "Cosmopolitan", "Lemon Drop", "White Russian", "Espresso Martini", "Moscow Mule", "Long Island Iced Tea"],
  "Gin":     ["Martini", "Negroni", "Tom Collins", "Gin & Tonic", "Aperol Spritz"],
  "Rum":     ["Daiquiri", "Mojito", "Piña Colada", "Mai Tai"],
  "Tequila": ["Margarita", "Paloma", "Tequila Sunrise"],
  "Whiskey": ["Old Fashioned", "Manhattan", "Whiskey Sour", "Sazerac"],
  "Brandy":  ["Brandy Alexander"],
  "Wine":    ["Sangria", "Aperol Spritz"],
};

// ── Adjust to taste guide ─────────────────────────────────────────────────────
export const ADJUST_TO_TASTE = [
  { problem: "Too sweet",  fix: "Add more citrus juice or a few extra dashes of bitters",    emoji: "🍋" },
  { problem: "Too sour",   fix: "Add more simple syrup or a small splash of juice",           emoji: "🍯" },
  { problem: "Too strong", fix: "Add more mixer, dilute with water, or serve over more ice",  emoji: "💧" },
  { problem: "Too weak",   fix: "More base spirit, less mixer, or shake/stir less (less dilution)", emoji: "🥃" },
  { problem: "Too bitter", fix: "Add simple syrup or reduce Campari/bitters",                 emoji: "🍬" },
  { problem: "Too boozy",  fix: "More acid (citrus) to cut through — it brightens and balances", emoji: "⚡" },
  { problem: "Too flat",   fix: "Add acid (citrus), bitters, or a small saline solution",     emoji: "✨" },
];

// ── Core cocktail ratios / formulas ───────────────────────────────────────────
export const COCKTAIL_RATIOS = [
  {
    name: "Sour",
    formula: "2 : 0.75 : 0.75",
    parts: ["Spirit", "Citrus", "Sweet"],
    method: "SHAKE",
    color: "#6B8E3E",
    desc: "The foundation of half the cocktail menu. Spirit + acid + sugar. Balance is everything — taste and adjust.",
    ratio_detail: "2 oz spirit · 0.75 oz citrus (fresh) · 0.75 oz sweetener",
    examples: ["Whiskey Sour", "Daiquiri", "Margarita", "Lemon Drop", "Cosmopolitan"],
    notes: "Egg white optional — dry shake first, then add ice for a silky foam cap. Fresh citrus only.",
    mnemonic: "Think: 2 parts booze, 1 part sour split into two.",
  },
  {
    name: "Spirit-Forward",
    formula: "2 : 1",
    parts: ["Spirit", "Modifier"],
    method: "STIR",
    color: "#C9A84C",
    desc: "Spirit does the talking. Modifier (vermouth, liqueur, bitters) adds complexity without diluting the character.",
    ratio_detail: "2 oz spirit · 1 oz modifier · 2-3 dashes bitters",
    examples: ["Manhattan", "Negroni", "Martini", "Old Fashioned", "Sazerac"],
    notes: "Always stir — never shake. Shaking aerates and dilutes too fast. Stir 30-40s until the outside of the mixing glass frosts.",
    mnemonic: "If there's no juice, stir it. If it's all spirit, stir it.",
  },
  {
    name: "Highball",
    formula: "2 : 4-6",
    parts: ["Spirit", "Mixer"],
    method: "BUILD",
    color: "#4A90A4",
    desc: "Spirit + carbonated mixer, built in the glass. Simple, fast, sessionable. The workhorse of a busy bar.",
    ratio_detail: "2 oz spirit · 4-6 oz carbonated mixer (tonic, ginger beer, soda, etc.)",
    examples: ["Gin & Tonic", "Moscow Mule", "Paloma", "Dark & Stormy", "Rum & Coke"],
    notes: "Don't shake — you'll kill the bubbles. Add ice, spirit, then mixer. One gentle stir. Serve immediately.",
    mnemonic: "Tall glass, ice, spirit, fizz. Done.",
  },
  {
    name: "Fizz",
    formula: "2 : 0.75 : 0.5 + soda",
    parts: ["Spirit", "Citrus", "Sweet", "Soda"],
    method: "SHAKE + BUILD",
    color: "#8B7BA8",
    desc: "A sour that gets topped with club soda. Shake everything except the soda, pour over ice, top and serve.",
    ratio_detail: "2 oz spirit · 0.75 oz citrus · 0.5 oz sweet · 2-3 oz club soda",
    examples: ["Tom Collins", "Gin Fizz", "Vodka Collins", "Sloe Gin Fizz"],
    notes: "Shake before adding soda. Never shake the soda — flat drink. Strain into fresh ice, then top.",
    mnemonic: "It's a sour in a tall glass with bubbles on top.",
  },
  {
    name: "Built",
    formula: "2 : 0.25 + garnish",
    parts: ["Spirit", "Modifier", "Garnish"],
    method: "BUILD",
    color: "#D4712B",
    desc: "Everything goes right in the glass. Simple builds often rely on the garnish — expressed citrus peel, bitters — to add aroma and complexity.",
    ratio_detail: "2 oz spirit · 0.25 oz modifier or sweetener · expressed garnish",
    examples: ["Old Fashioned", "Tequila Sunrise", "Negroni (on the rocks)"],
    notes: "Fat ice cube keeps dilution slow. Express your citrus peel — oils carry aroma. No shaking, minimal stirring.",
    mnemonic: "Glass → ice → spirit → tiny bit of sweet/bitter → stir → garnish.",
  },
  {
    name: "Flip / Creamy",
    formula: "1.5 : 1 : 1",
    parts: ["Spirit", "Liqueur", "Cream / Egg"],
    method: "SHAKE HARD",
    color: "#A0522D",
    desc: "Rich, indulgent drinks. The fat from cream or egg white creates texture. Shake extra hard to emulsify.",
    ratio_detail: "1.5 oz spirit · 1 oz liqueur · 1 oz cream or egg",
    examples: ["White Russian", "Brandy Alexander", "Espresso Martini", "Piña Colada"],
    notes: "Shake harder and longer than a standard cocktail — 15-20 seconds. Serve in a chilled glass. Espresso Martini needs vigorous shaking to build the foam.",
    mnemonic: "Equal parts liqueur and cream/egg. Spirit anchors it.",
  },
];