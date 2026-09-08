/**
 * deepdives.js
 * Extended learning data beyond Gunthers's menu.
 * Covers Tequila vs Mezcal, Gin botanicals, Flavor profiles, Wine regions.
 */

// ── Tequila vs Mezcal ─────────────────────────────────────────────────────────
export const TEQUILA_VS_MEZCAL = {
  intro: "Both come from agave. That's where the similarities end. Tequila is a specific, controlled product. Mezcal is an ancient tradition. Understanding the difference makes you a better bartender and a more interesting person at a party.",
  comparison: [
    { label: "Plant",       tequila: "Blue Weber agave only",                   mezcal: "50+ agave varieties (espadín, tobalá, tepeztate...)" },
    { label: "Region",      tequila: "Jalisco + 4 other states",                mezcal: "9 states — mostly Oaxaca" },
    { label: "Cooking",     tequila: "Steamed in industrial ovens (autoclaves)", mezcal: "Roasted in underground earthen pits — this creates the smoke" },
    { label: "Crushing",    tequila: "Mechanical shredder",                     mezcal: "Stone tahona wheel (traditional) or mills" },
    { label: "Fermentation",tequila: "Commercial yeast, controlled",            mezcal: "Wild fermentation, open-air, unpredictable — takes weeks" },
    { label: "Distillation",tequila: "Column or pot still, 2× minimum",        mezcal: "Clay or copper pot still, 2–3× — small batches" },
    { label: "Smoke",       tequila: "None",                                    mezcal: "Yes — from pit roasting (varies by producer)" },
    { label: "ABV",         tequila: "38–55%",                                  mezcal: "40–55% — often higher proof" },
    { label: "Scale",       tequila: "Industrial to craft",                     mezcal: "Artisanal to ancestral — most very small batch" },
  ],
  agave_types: [
    { name: "Espadín",    pct: "~90% of mezcal", flavor: "Most common. Herbaceous, light smoke, versatile.", time: "7–10 years" },
    { name: "Tobalá",     pct: "Rare",           flavor: "Wild agave. Floral, complex, mineral. Never cultivated.", time: "12–15 years" },
    { name: "Tepeztate",  pct: "Very rare",       flavor: "Wild. Intensely vegetal, funky, takes decades to mature.", time: "25–35 years" },
    { name: "Madrecuixe", pct: "Very rare",       flavor: "Wild. Green, grassy, almost savory.", time: "12–20 years" },
    { name: "Arroqueño",  pct: "Rare",            flavor: "Rich, fruity, smoky. Oaxacan specialty.", time: "15–25 years" },
  ],
  tequila_ages: [
    { name: "Blanco / Silver", aging: "0–60 days",   color: "#e8e8d0", flavor: "Pure agave — vegetal, peppery, citrus. Best in cocktails." },
    { name: "Joven / Gold",    aging: "Blanco + coloring", color: "#d4b840", flavor: "Often blanco with caramel added. Mixto category. Avoid for sipping." },
    { name: "Reposado",        aging: "2–12 months", color: "#c8a030", flavor: "Oak adds vanilla and caramel. Still agave-forward. Best all-rounder." },
    { name: "Añejo",           aging: "1–3 years",   color: "#a07820", flavor: "Rich, complex. Oak dominates. Sip neat or on rocks." },
    { name: "Extra Añejo",     aging: "3+ years",    color: "#805818", flavor: "Whiskey-adjacent. Expensive, contemplative. Neat only." },
  ],
  bartender_tips: [
    "Always ask — 'Do you like smoky?' before recommending mezcal. It's polarizing.",
    "Mezcal margaritas: use espadín. It's smoky but won't overwhelm the lime.",
    "A worm (gusano) in the bottle is marketing, not tradition. Real mezcal doesn't need it.",
    "100% agave on the label = no added sugars. 'Mixto' = up to 49% other sugars. Always go 100%.",
    "Mezcal is almost always sipped neat with orange slices and sal de gusano (worm salt).",
    "Tequila Blanco in a Margarita. Reposado in an Old Fashioned riff. Añejo neat.",
  ],
};

// ── Gin botanicals ────────────────────────────────────────────────────────────
export const GIN_GUIDE = {
  intro: "Gin is just neutral spirit redistilled with botanicals — juniper must dominate by law, but beyond that it's entirely up to the distiller. Understanding botanicals lets you recommend the right gin for any cocktail.",
  the_rule: "Juniper must be the primary detectable flavor. That's the only legal requirement for gin.",
  styles: [
    {
      name: "London Dry",
      color: "#4a90a4",
      desc: "The classic. Dry, juniper-forward, no artificial flavors added after distillation. The benchmark for cocktails.",
      flavor: "Juniper · Pine · Citrus peel · Coriander",
      cocktails: ["Martini", "Negroni", "Tom Collins", "G&T"],
      examples: ["Tanqueray", "Beefeater", "Fords", "Gordons"],
      rules: ["Must be redistilled with botanicals", "No artificial flavors after distillation", "No added color", "Max 0.1g/L sugar"],
    },
    {
      name: "New Western / Contemporary",
      color: "#7abf8a",
      desc: "Juniper present but dialed back. Other botanicals take center stage — cucumber, rose, citrus, tea. More approachable.",
      flavor: "Floral · Citrus · Cucumber · Subtle juniper",
      cocktails: ["Gin & Tonic", "Cucumber Collins", "Gin Spritz"],
      examples: ["Hendrick's", "Bombay Sapphire", "Monkey 47"],
      rules: ["Juniper must still be detectable", "Much more flexibility in botanical profile"],
    },
    {
      name: "Old Tom",
      color: "#c9a84c",
      desc: "Sweeter than London Dry, less sweet than genever. The 18th-century style that was popular before Prohibition. Great in Toms Collins.",
      flavor: "Juniper · Lightly sweet · Malt · Spice",
      cocktails: ["Tom Collins (traditional)", "Martinez", "Ramos Gin Fizz"],
      examples: ["Hayman's Old Tom", "Ransom Old Tom"],
      rules: ["Slightly sweetened — 2-4g/L sugar", "Can be barrel-aged"],
    },
    {
      name: "Genever",
      color: "#b86020",
      desc: "The Dutch ancestor of gin. Malty, whiskey-adjacent. Made from malt wine. Very different from modern gin — almost a category of its own.",
      flavor: "Malt · Grain · Subtle juniper · Rich",
      cocktails: ["Dutch Negroni", "Genever Old Fashioned"],
      examples: ["Bols Genever", "Notaris"],
      rules: ["Must contain malt wine", "Made in Netherlands/Belgium"],
    },
    {
      name: "Sloe Gin",
      color: "#8B1A35",
      desc: "A gin-based liqueur, not technically a gin. Sloe berries (a wild plum) macerated in gin. Sweet, fruity, low ABV.",
      flavor: "Plum · Almond · Berry · Sweet",
      cocktails: ["Sloe Gin Fizz", "Sloe Gin Collins"],
      examples: ["Plymouth Sloe Gin", "Sipsmith Sloe Gin"],
      rules: ["Min 25% ABV", "Made from sloe berries + gin"],
    },
  ],
  botanicals: [
    { name: "Juniper",        role: "Required by law",   flavor: "Pine · Resinous · The backbone of gin",                   found_in: "All gins" },
    { name: "Coriander Seed", role: "Most common #2",    flavor: "Citrus · Floral · Spice — pairs perfectly with juniper",  found_in: "Almost all gins" },
    { name: "Angelica Root",  role: "Foundation",        flavor: "Earthy · Dry · Herbal — acts as a fixative, binds other flavors", found_in: "Most London Drys" },
    { name: "Citrus Peel",    role: "Brightness",        flavor: "Lemon · Orange · Bergamot — lifts the whole blend",       found_in: "Most gins" },
    { name: "Orris Root",     role: "Fixative",          flavor: "Floral · Violet · Earthy — holds the blend together",     found_in: "Many gins" },
    { name: "Cardamom",       role: "Spice",             flavor: "Warm · Sweet · Eucalyptus-adjacent",                      found_in: "Many gins" },
    { name: "Cucumber",       role: "Freshness",         flavor: "Cool · Green · Clean — signature of Hendrick's",          found_in: "Contemporary gins" },
    { name: "Rose Petals",    role: "Floral",            flavor: "Delicate floral note — easily overpowered",               found_in: "Hendrick's, some craft gins" },
    { name: "Cassia Bark",    role: "Spice",             flavor: "Cinnamon-adjacent · Warm · Dry",                         found_in: "Tanqueray, others" },
    { name: "Liquorice Root", role: "Sweetness / depth", flavor: "Anise · Earthy — adds sweetness without sugar",          found_in: "Many London Drys" },
    { name: "Black Pepper",   role: "Heat",              flavor: "Spicy · Sharp — adds kick to the finish",                 found_in: "Some contemporary gins" },
    { name: "Grains of Paradise", role: "Exotic spice",  flavor: "Peppery · Gingery · West African origin",                 found_in: "Hendrick's, craft gins" },
  ],
  pairing_guide: [
    { gin_type: "London Dry",        tonic: "Classic tonic (Fever-Tree Original)", garnish: "Lime or lemon wedge",     reason: "Clean, classic. Don't compete with the gin." },
    { gin_type: "Floral / Contemporary", tonic: "Elderflower or light tonic",    garnish: "Cucumber slice or rose",   reason: "Complement the floral notes." },
    { gin_type: "Citrus-forward",    tonic: "Mediterranean tonic",               garnish: "Grapefruit or orange peel", reason: "Match the citrus character." },
    { gin_type: "Spiced / Earthy",   tonic: "Aromatic tonic",                    garnish: "Rosemary or cardamom pod", reason: "Amp up the spice profile." },
  ],
};

// ── Flavor profiles ───────────────────────────────────────────────────────────
export const FLAVOR_PROFILES = {
  intro: "Every cocktail is a balance of five dimensions. Understanding what each ingredient contributes lets you build drinks by feel, not just formula.",
  dimensions: [
    {
      name: "Sweet",
      color: "#e8c840",
      emoji: "🍯",
      desc: "Sugar rounds, softens, and makes drinks approachable. Too much = cloying and flat.",
      sources: ["Simple syrup", "Liqueurs", "Grenadine", "Juice (OJ, pineapple)", "Vermouth", "Aged spirits (vanilla/caramel from oak)"],
      too_much: "Cloying, flat, no complexity. Fix: add citrus or bitters.",
      too_little: "Harsh, sharp, abrasive. Fix: add a touch of simple or a sweeter liqueur.",
      spirits_that_read_sweet: ["Bourbon (vanilla/caramel)", "Rum (molasses)", "Cointreau", "Amaretto"],
    },
    {
      name: "Sour / Acid",
      color: "#6B8E3E",
      emoji: "🍋",
      desc: "Acid lifts, brightens, and cuts through richness. The most important balancing element. Fresh citrus only — bottled juice is flat and dead.",
      sources: ["Lemon juice", "Lime juice", "Grapefruit juice", "Verjuice", "Champagne / sparkling wine"],
      too_much: "Tart, puckering, aggressive. Fix: more sweetener.",
      too_little: "Flat, heavy, one-dimensional. Fix: squeeze more citrus or add a few drops of citric acid.",
      spirits_that_read_sour: ["Dry vermouth", "Aperol (light acid)", "Some citrus liqueurs"],
    },
    {
      name: "Bitter",
      color: "#4A90A4",
      emoji: "🌿",
      desc: "Bitterness adds complexity, length, and adult character. A drink without any bitter reads juvenile. Bitters are the salt of cocktails.",
      sources: ["Angostura bitters", "Orange bitters", "Campari", "Aperol", "Amaro", "Coffee liqueur", "Dark chocolate", "Tonic water"],
      too_much: "Harsh, medicinal, undrinkable. Fix: sweetener or dilution.",
      too_little: "Sweet and boring — no finish. Fix: 1-2 dashes Angostura changes everything.",
      spirits_that_read_bitter: ["Campari", "Aperol", "Jagermeister", "Fernet-Branca", "Dry gin (juniper)"],
    },
    {
      name: "Strong / Boozy",
      color: "#C9A84C",
      emoji: "🔥",
      desc: "Alcohol provides body, warmth, and the foundation everything else builds on. Too little = watery. Too much = hot and harsh.",
      sources: ["Base spirit (the 2 oz)", "High-proof spirits", "Overproof rum", "Cask-strength whiskey"],
      too_much: "Burns, harsh, overpowering. Fix: more citrus (cuts through ABV perception), more dilution.",
      too_little: "Watery, thin, no structure. Fix: stir/shake less (less dilution) or increase spirit.",
      spirits_that_read_boozy: ["Cask strength whiskey", "Overproof rum", "High-ABV tequila", "151 proof spirits"],
    },
    {
      name: "Savory / Umami",
      color: "#A0522D",
      emoji: "🧂",
      desc: "The underrated dimension. Salt, olive brine, and umami-rich ingredients add depth you can't identify but definitely notice when it's missing.",
      sources: ["Olive brine (Dirty Martini)", "Salt (Margarita rim)", "Saline solution (1-2 drops)", "Tomato juice (Bloody Mary)", "Miso-washed spirits"],
      too_much: "Tastes like you're drinking ocean water. Fix: dilution.",
      too_little: "Flat and one-dimensional. A single drop of saline solution often unlocks a cocktail.",
      spirits_that_read_savory: ["Mezcal (mineral, earthy)", "Peated Scotch", "Dry vermouth"],
    },
  ],
  balance_rules: [
    { rule: "Sweet and sour should be roughly equal",          detail: "The classic sour ratio (0.75:0.75) exists for a reason. Taste and adjust from there." },
    { rule: "Bitters are the salt of cocktails",               detail: "You should taste them without knowing what they are. 1-2 dashes in almost anything." },
    { rule: "Dilution is an ingredient",                       detail: "Stirring or shaking adds ~1-1.5 oz water. This is intentional — it softens alcohol and melds flavors." },
    { rule: "Temperature changes flavor",                      detail: "Cold suppresses sweetness and amplifies bitterness. Taste a spirit at room temp vs. over ice." },
    { rule: "Garnish is an ingredient",                        detail: "An expressed lemon peel adds citrus oil to the surface. It's not decoration — it changes the drink." },
    { rule: "Fresh citrus is non-negotiable",                  detail: "Bottled juice has no life, no aroma, no brightness. 15 minutes after squeezing it starts to die." },
  ],
  spirit_flavor_map: [
    { spirit: "Vodka",      sweet: 1, sour: 0, bitter: 0, boozy: 2, savory: 0, notes: "Neutral canvas — lets everything else speak." },
    { spirit: "Gin",        sweet: 1, sour: 0, bitter: 2, boozy: 2, savory: 1, notes: "Juniper brings bitterness and herbal complexity." },
    { spirit: "White Rum",  sweet: 2, sour: 0, bitter: 0, boozy: 2, savory: 0, notes: "Molasses sweetness, tropical character." },
    { spirit: "Tequila",    sweet: 1, sour: 1, bitter: 1, boozy: 2, savory: 1, notes: "Vegetal, peppery, mineral. Very complex for a clear spirit." },
    { spirit: "Bourbon",    sweet: 3, sour: 0, bitter: 1, boozy: 3, savory: 0, notes: "Vanilla/caramel from new oak. Rich and warming." },
    { spirit: "Rye",        sweet: 1, sour: 0, bitter: 2, boozy: 3, savory: 1, notes: "Spicy, peppery, drier than bourbon." },
    { spirit: "Scotch",     sweet: 1, sour: 0, bitter: 2, boozy: 3, savory: 2, notes: "Smoke, earth, mineral. Old oak. Complex." },
    { spirit: "Mezcal",     sweet: 1, sour: 1, bitter: 1, boozy: 3, savory: 3, notes: "Smoky, mineral, earthy. The most complex agave spirit." },
    { spirit: "Cognac",     sweet: 3, sour: 1, bitter: 1, boozy: 2, savory: 0, notes: "Dried fruit, honey, oak. Rich and complex." },
    { spirit: "Campari",    sweet: 2, sour: 1, bitter: 5, boozy: 1, savory: 1, notes: "Quintessential bitter. The measuring stick." },
  ],
};

// ── Wine regions ──────────────────────────────────────────────────────────────
export const WINE_REGIONS = {
  intro: "Where a wine comes from shapes everything about it. Old World (Europe) = earthy, restrained, mineral. New World (Americas, Australia, NZ) = riper, fruitier, bolder. Same grape, completely different wine.",
  old_vs_new: {
    old_world: {
      label: "Old World",
      regions: "France, Italy, Spain, Germany, Portugal",
      color: "#8B1A35",
      characteristics: ["Restrained, earthy, mineral", "Lower alcohol (11-13%)", "Higher acidity", "Labeled by region, not grape", "Food-first — designed to pair", "Terroir-driven (soil, climate, tradition)"],
      example: "A Burgundy Pinot Noir tastes of red cherry, earth, and forest floor — you taste the place.",
    },
    new_world: {
      label: "New World",
      regions: "USA, Australia, New Zealand, Chile, Argentina",
      color: "#C9A84C",
      characteristics: ["Riper, fruitier, bolder", "Higher alcohol (13-15%+)", "Lower acidity (riper grapes)", "Labeled by grape variety", "Drink-first — approachable alone", "Producer-driven (winemaker style)"],
      example: "A Napa Cabernet tastes of ripe blackberry, vanilla, and chocolate — you taste the fruit and the winemaker.",
    },
  },
  regions: [
    {
      country: "🇫🇷 France",
      color: "#8B1A35",
      regions: [
        { name: "Bordeaux",   grapes: "Cabernet Sauvignon, Merlot",   style: "Full-bodied reds, world's most famous. Left Bank = Cab-dominant. Right Bank = Merlot-dominant.", notable: "Château Margaux, Pétrus" },
        { name: "Burgundy",   grapes: "Pinot Noir, Chardonnay",       style: "Delicate, terroir-driven. The most expensive Pinot and Chardonnay in the world. Thin-skinned finesse.", notable: "Romanée-Conti, Montrachet" },
        { name: "Champagne",  grapes: "Chardonnay, Pinot Noir, Meunier", style: "The only true Champagne. Traditional method — secondary fermentation in bottle. Toasty, brioche, citrus.", notable: "Moët, Krug, Bollinger" },
        { name: "Rhône",      grapes: "Syrah (N), Grenache/Syrah/Mourvèdre (S)", style: "Northern Rhône = powerful single-varietal Syrah. Southern = rich Grenache-based blends.", notable: "Hermitage, Châteauneuf-du-Pape" },
        { name: "Loire",      grapes: "Sauvignon Blanc, Chenin Blanc, Cabernet Franc", style: "Crisp whites (Sancerre, Muscadet), versatile Chenin Blanc, and light reds.", notable: "Sancerre, Vouvray" },
        { name: "Alsace",     grapes: "Riesling, Gewürztraminer, Pinot Gris", style: "German-influenced, very aromatic. Dry Rieslings with incredible precision.", notable: "Trimbach, Hugel" },
      ],
    },
    {
      country: "🇮🇹 Italy",
      color: "#C9A84C",
      regions: [
        { name: "Tuscany",    grapes: "Sangiovese",                   style: "Chianti, Brunello, Super Tuscans. High acid, firm tannins, sour cherry. Built for food.", notable: "Sassicaia, Tignanello" },
        { name: "Piedmont",   grapes: "Nebbiolo, Barbera, Dolcetto",  style: "Barolo and Barbaresco — the 'Barolo Boys.' Tar and roses. High tannin, high acid. Age-worthy.", notable: "Barolo, Barbaresco" },
        { name: "Veneto",     grapes: "Garganega, Glera, Corvina",    style: "Light whites (Soave), sparkling Prosecco, rich Amarone (dried grape wine).", notable: "Prosecco, Amarone" },
        { name: "Sicily",     grapes: "Nero d'Avola, Nerello Mascalese", style: "Volcanic soils (Etna). Dark, structured reds. Marsala fortified wine.", notable: "Planeta, Passopisciaro" },
      ],
    },
    {
      country: "🇪🇸 Spain",
      color: "#D4820A",
      regions: [
        { name: "Rioja",           grapes: "Tempranillo",             style: "Spain's most famous red. Aged in American oak — vanilla, dill, strawberry. Crianza/Reserva/Gran Reserva tiers.", notable: "Marqués de Murrieta, Muga" },
        { name: "Ribera del Duero",grapes: "Tempranillo (Tinto Fino)", style: "Higher altitude than Rioja. More concentrated, darker fruit, more tannin.", notable: "Vega Sicilia, Pingus" },
        { name: "Rías Baixas",     grapes: "Albariño",                style: "Atlantic-influenced whites. Crisp, peach, citrus, saline finish. Spain's best white.", notable: "Pazo de Señorans" },
        { name: "Sherry (Jerez)",  grapes: "Palomino, Pedro Ximénez", style: "Fortified wine. Fino = dry, nutty. Oloroso = rich, dark. PX = dessert syrup.", notable: "Tío Pepe, González Byass" },
      ],
    },
    {
      country: "🇩🇪 Germany",
      color: "#4A90A4",
      regions: [
        { name: "Mosel",   grapes: "Riesling",  style: "Steep slate slopes. Lowest-alcohol, most delicate Rieslings in the world. Peach, apricot, petrol with age.", notable: "Dr. Loosen, Joh. Jos. Prüm" },
        { name: "Rheingau",grapes: "Riesling, Spätburgunder", style: "Fuller Rieslings than Mosel. Also great Pinot Noir (Spätburgunder).", notable: "Schloss Johannisberg" },
      ],
    },
    {
      country: "🇺🇸 USA",
      color: "#6B8E3E",
      regions: [
        { name: "Napa Valley",      grapes: "Cabernet Sauvignon",     style: "World-class Cab. Rich, opulent, dark fruit, vanilla/oak. Premium pricing.", notable: "Opus One, Screaming Eagle" },
        { name: "Sonoma",           grapes: "Pinot Noir, Chardonnay, Zinfandel", style: "More diverse than Napa. Cooler Pinot zones (Russian River). Bold Zinfandel.", notable: "Kistler, Ridge" },
        { name: "Willamette Valley",grapes: "Pinot Noir, Pinot Gris", style: "Oregon's jewel. Cool climate Burgundy-style Pinot. Earth, red cherry, subtle.", notable: "Domaine Drouhin Oregon" },
        { name: "Washington State", grapes: "Cabernet, Merlot, Riesling", style: "Underrated. High-altitude desert. Intense fruit, good acidity.", notable: "Chateau Ste. Michelle" },
      ],
    },
    {
      country: "🇦🇺 Australia",
      color: "#b86020",
      regions: [
        { name: "Barossa Valley", grapes: "Shiraz (Syrah)",           style: "The definitive New World Shiraz. Massive, jammy, chocolate, black pepper. Old vines.", notable: "Penfolds Grange, Henschke" },
        { name: "Margaret River", grapes: "Cabernet Sauvignon, Chardonnay", style: "Maritime climate. Elegant Cab and Chardonnay. More restrained than Barossa.", notable: "Cullen, Vasse Felix" },
      ],
    },
    {
      country: "🇳🇿 New Zealand",
      color: "#4a90a4",
      regions: [
        { name: "Marlborough", grapes: "Sauvignon Blanc, Pinot Noir", style: "Benchmark for SB worldwide. Intensely aromatic — passionfruit, grapefruit, cut grass. Also great Pinot.", notable: "Cloudy Bay, Greywacke" },
      ],
    },
    {
      country: "🇦🇷 Argentina",
      color: "#6a1840",
      regions: [
        { name: "Mendoza",    grapes: "Malbec, Cabernet, Torrontés",  style: "High-altitude Andes wines. Malbec = deep purple, velvety, plum, violet. Exceptional value.", notable: "Achaval Ferrer, Clos de los Siete" },
      ],
    },
  ],
  label_reading: [
    { tip: "Old World labels by place",   detail: "Chablis is a place in France (Chardonnay). Sancerre is a place (Sauvignon Blanc). You have to know the region." },
    { tip: "New World labels by grape",   detail: "California Cabernet Sauvignon. Australian Shiraz. Much easier to navigate by variety." },
    { tip: "ABV tells you ripeness",      detail: "12% = cool climate, high acid. 15% = warm climate, ripe fruit. Higher alcohol = riper grapes." },
    { tip: "Vintage matters more in Europe", detail: "French wines vary hugely by year. California is more consistent due to stable climate." },
    { tip: "Reserve ≠ quality in the US", detail: "'Reserve' has no legal definition in America. In Spain/Italy it means specific aging requirements." },
  ],
};
