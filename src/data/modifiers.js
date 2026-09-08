/**
 * modifiers.js
 * Everything behind the bar that isn't a base spirit.
 * Mixers, modifiers, bitters, syrups, garnishes, tools context.
 */

export const MODIFIERS = [
  // ── Citrus & Fresh ────────────────────────────────────────────────────────
  {
    category: "Citrus & Fresh",
    color: "#c8c060",
    emoji: "🍋",
    items: [
      { name: "Lemon Juice",        role: "Sour",      abv: "0%",  desc: "The most versatile citrus. Bright, clean acid. Used in sours, fizzes, and anything that needs lift. Fresh only — never bottled.", pairs: ["Whiskey", "Gin", "Vodka"], substitutes: ["Lime juice (sharper)", "Citric acid solution"] },
      { name: "Lime Juice",         role: "Sour",      abv: "0%",  desc: "Sharper and more tropical than lemon. Essential for margaritas, daiquiris, mojitos, and Moscow mules.", pairs: ["Tequila", "Rum", "Vodka"], substitutes: ["Lemon juice (softer)"] },
      { name: "Grapefruit Juice",   role: "Sour + Bitter", abv: "0%", desc: "Tart, slightly bitter, tropical. The base of the Paloma. Pink grapefruit is sweeter than white.", pairs: ["Tequila", "Gin", "Vodka"], substitutes: [] },
      { name: "Orange Juice",       role: "Sweet + Sour", abv: "0%", desc: "Sweet, gentle acid. Used in Tequila Sunrise, screwdrivers, and sangria. Fresh is far better than carton.", pairs: ["Tequila", "Vodka", "Champagne"], substitutes: [] },
      { name: "Pineapple Juice",    role: "Sweet + Tart", abv: "0%", desc: "Sweet, tropical, slightly tart. Great in tiki drinks and tropical cocktails. Also adds foam when shaken.", pairs: ["Rum", "Tequila", "Vodka"], substitutes: [] },
      { name: "Cranberry Juice",    role: "Sweet + Tart", abv: "0%", desc: "Tart, berry, deep red. Not just for color — it adds real flavor. Use 100% juice, not cranberry cocktail.", pairs: ["Vodka", "Gin", "Rum"], substitutes: [] },
    ],
  },
  // ── Carbonated Mixers ─────────────────────────────────────────────────────
  {
    category: "Carbonated Mixers",
    color: "#4a90a4",
    emoji: "🫧",
    items: [
      { name: "Club Soda",          role: "Dilution + Fizz", abv: "0%", desc: "Pure carbonated water. Zero flavor — just bubbles and dilution. The right call when you don't want to compete with the spirit.", pairs: ["Gin", "Vodka", "Whiskey"], substitutes: ["Sparkling water"] },
      { name: "Tonic Water",        role: "Bitter + Fizz",   abv: "0%", desc: "Carbonated water + quinine (bitter) + sugar. The G&T backbone. Premium tonic is worth it — it makes up half the drink.", pairs: ["Gin", "Vodka", "Aperol"], substitutes: [], brands: [{ tier: "Best", name: "Fever-Tree Indian Tonic", note: "The gold standard. Natural quinine, no artificial sweeteners. What most good bars stock." }, { tier: "Also Great", name: "Fever-Tree Mediterranean Tonic", note: "Lighter and floral. Better with delicate contemporary gins." }, { tier: "Good", name: "Q Tonic", note: "Very dry and bitter. Less sweet than Fever-Tree. Great for London Dry gins." }, { tier: "Avoid", name: "Schweppes / generic", note: "Heavy HFCS sweetness masks the gin. Use only if nothing else is available." }] },
      { name: "Ginger Beer",        role: "Spicy + Fizz",    abv: "0%", desc: "NOT ginger ale. Real ginger beer is spicy, bold, and complex. The kick in a Moscow Mule and Dark & Stormy.", pairs: ["Vodka", "Rum", "Bourbon", "Tequila"], substitutes: ["Ginger ale (much milder)"], brands: [{ tier: "Best", name: "Fever-Tree Ginger Beer", note: "Three types of ginger, no artificial flavors. Clean and very spicy." }, { tier: "Best", name: "Bundaberg Ginger Beer", note: "Australian. Brewed with real ginger. Rich, full-flavored, slightly sweet." }, { tier: "Good", name: "Reed's Extra Ginger Brew", note: "Very spicy. Strong ginger flavor for those who want heat." }, { tier: "Avoid", name: "Cock & Bull / most copper mug brands", note: "Too sweet, not enough real ginger." }] },
      { name: "Ginger Ale",         role: "Mild Spice + Fizz", abv: "0%", desc: "Milder, sweeter than ginger beer. Good for lighter highballs and with whiskey (Whiskey Ginger).", pairs: ["Whiskey", "Bourbon"], substitutes: ["Ginger beer (bolder)"] },
      { name: "Cola",               role: "Sweet + Caramel",  abv: "0%", desc: "Rum & Coke, Jack & Coke, Whiskey Coke. The cola adds caramel, vanilla, and sweetness.", pairs: ["Rum", "Whiskey", "Bourbon"], substitutes: [], brands: [{ tier: "Best", name: "Mexican Coke (glass bottle)", note: "Cane sugar instead of HFCS. Cleaner, less cloying. Noticeably better in cocktails." }, { tier: "Good", name: "Coca-Cola", note: "The standard. HFCS in the US. Consistent and widely available." }, { tier: "Craft", name: "Boylan Cane Cola", note: "Cane sugar, real vanilla. Excellent with bourbon." }, { tier: "Good", name: "Pepsi", note: "Slightly sweeter and less acidic than Coke. Some people prefer it with bourbon — Pepsi & Jack is a real thing." }] },
      { name: "Lemon-Lime Soda",    role: "Sweet + Citrus",   abv: "0%", desc: "Sprite/7UP. Sweet, citrusy carbonation. Used in Tequila Sunrise variants and tropical drinks.", pairs: ["Vodka", "Tequila"], substitutes: [] },
      { name: "Grapefruit Soda",    role: "Bitter + Fizz",    abv: "0%", desc: "Jarritos or Squirt. The Paloma's best friend. Tart, grapefruit, slightly sweet fizz.", pairs: ["Tequila"], substitutes: ["Fresh grapefruit juice + club soda"] },
      { name: "Prosecco / Champagne", role: "Dry + Fizz",    abv: "11-12%", desc: "Adds alcohol, acid, bubbles, and yeasty complexity. Used in Aperol Spritz, French 75, and Bellinis.", pairs: ["Aperol", "Gin", "Vodka", "Peach purée"], substitutes: ["Cava", "Sparkling wine"] },
    ],
  },
  // ── Syrups & Sweeteners ───────────────────────────────────────────────────
  {
    category: "Syrups & Sweeteners",
    color: "#e8c840",
    emoji: "🍯",
    items: [
      { name: "Simple Syrup",       role: "Sweet",     abv: "0%",  desc: "1:1 sugar dissolved in hot water. The most versatile sweetener. Makes exactly 2 batches per week at a busy bar. Make your own — it takes 5 minutes.", pairs: ["Everything"], substitutes: ["Agave nectar (richer)", "Honey syrup"] },
      { name: "Rich Simple Syrup",  role: "Sweet + Body", abv: "0%", desc: "2:1 sugar:water. Thicker, sweeter, longer shelf life. Adds more body and mouthfeel. Use half as much.", pairs: ["Whiskey", "Rum", "Old Fashioneds"], substitutes: ["Simple syrup (use double)"] },
      { name: "Agave Nectar",       role: "Sweet + Floral", abv: "0%", desc: "The sweetener in Tommy's Margarita. Slightly vegetal and floral — complements tequila perfectly. Dissolve in warm water before using.", pairs: ["Tequila", "Mezcal"], substitutes: ["Simple syrup"] },
      { name: "Honey Syrup",        role: "Sweet + Rich",  abv: "0%", desc: "3:1 honey:water (honey doesn't pour cold). Adds rich floral complexity. Essential for Bees Knees and Gold Rush.", pairs: ["Gin", "Whiskey", "Bourbon"], substitutes: ["Simple syrup (less complex)"] },
      { name: "Grenadine",          role: "Sweet + Tart + Color", abv: "0%", desc: "Pomegranate syrup. Real grenadine is tart and complex — not just red sugar water. The difference is enormous in a Tequila Sunrise.", pairs: ["Tequila", "Gin", "Vodka"], substitutes: [], brands: [{ tier: "Best", name: "Liber & Co Real Grenadine", note: "Real pomegranate juice, no artificial anything. Tart, complex, deep red. What grenadine should taste like." }, { tier: "Best", name: "Sonoma Syrup Co. Grenadine", note: "Pomegranate and hibiscus. Rich and fruity." }, { tier: "Make Your Own", name: "Homemade (POM + sugar + lemon)", note: "1 cup POM juice + 1 cup sugar + 1 oz lemon juice. Simmered 5 min. Keeps 2 weeks refrigerated." }, { tier: "Avoid", name: "Rose's Grenadine", note: "High fructose corn syrup and red dye. No real pomegranate. Tastes artificial." }] },
      { name: "Orgeat",             role: "Sweet + Nutty + Floral", abv: "0%", desc: "Almond syrup with orange flower water. Essential for the Mai Tai. Thick, nutty, floral. The quality gap between real orgeat and cheap almond syrup is enormous.", pairs: ["Rum", "Whiskey", "Gin"], substitutes: ["Falernum (similar, spiced)"], brands: [{ tier: "Best", name: "Liber & Co Toasted Orgeat", note: "Toasted almonds give a deeper, richer flavor. Worth every penny." }, { tier: "Best", name: "Small Hand Foods Orgeat", note: "Bartender cult favorite. Made from Valencia almonds. Incredibly complex." }, { tier: "Good", name: "Monin Orgeat", note: "Consistent and widely available. Good for service, not for showcasing." }, { tier: "Avoid", name: "Torani Almond Syrup", note: "Not orgeat. Just sweet almond flavor. Missing the floral complexity entirely." }] },
      { name: "Falernum",           role: "Sweet + Spice + Citrus", abv: "0-11%", desc: "Spiced Caribbean syrup — almond, lime, ginger, clove, allspice. Used in tiki drinks. Adds enormous complexity.", pairs: ["Rum", "Gin"], substitutes: ["Orgeat + lime + spice"] },
      { name: "Elderflower Syrup",  role: "Sweet + Floral",  abv: "0%", desc: "Delicate white flower flavor. Monin or homemade. Adds a soft, spring-like quality. Also St. Germain (liqueur version).", pairs: ["Gin", "Vodka", "Sparkling wine"], substitutes: ["St. Germain (adds ABV)"] },
      { name: "Lavender Syrup",     role: "Sweet + Floral",  abv: "0%", desc: "Infused simple syrup. Strong — use less than you think. Pairs beautifully with lemon and gin.", pairs: ["Gin", "Vodka", "Lemon"], substitutes: [] },
      { name: "Cinnamon Syrup",     role: "Sweet + Spice",   abv: "0%", desc: "Simmer cinnamon sticks in simple syrup. Warm, spiced sweetness. Essential for Hot Toddys and fall cocktails.", pairs: ["Bourbon", "Rum", "Apple spirits"], substitutes: [] },
    ],
  },
  // ── Bitters ───────────────────────────────────────────────────────────────
  {
    category: "Bitters",
    color: "#a06030",
    emoji: "💧",
    items: [
      { name: "Angostura Bitters",  role: "Aromatic + Spice", abv: "44.7%", desc: "The most important bottle behind any bar. Clove, cinnamon, gentian root, herbs. A few dashes transforms a drink. Old Fashioned, Manhattan, Champagne cocktail.", pairs: ["Whiskey", "Rum", "Brandy", "Champagne"], substitutes: [], brands: [{ tier: "The One", name: "Angostura", note: "There is no substitute. Every bar on earth stocks it." }] },
      { name: "Orange Bitters",     role: "Citrus + Bitter",  abv: "28%",   desc: "Bright orange peel bitterness. Essential in the Martini. Adds citrus complexity without juice.", pairs: ["Gin", "Vodka", "Whiskey"], substitutes: [], brands: [{ tier: "Best", name: "Regans' Orange Bitters No. 6", note: "Drier, more bitter. Bartender standard." }, { tier: "Good", name: "Angostura Orange", note: "Sweeter and more approachable. Widely available." }, { tier: "Also Good", name: "Fee Brothers West Indian Orange", note: "Brighter, more citrus-forward." }] },
      { name: "Peychaud's Bitters", role: "Floral + Anise",   abv: "35%",   desc: "Lighter, more floral than Angostura. Anise, cherry, floral. The Sazerac wouldn't be a Sazerac without it.", pairs: ["Rye Whiskey", "Cognac"], substitutes: [], brands: [{ tier: "The One", name: "Peychaud's", note: "Only one real option. Non-negotiable for a Sazerac." }] },
      { name: "Mole Bitters",       role: "Chocolate + Spice", abv: "35%",  desc: "Chocolate, cinnamon, ancho chile. Transforms an Old Fashioned into something extraordinary.", pairs: ["Tequila", "Mezcal", "Bourbon"], substitutes: [], brands: [{ tier: "Best", name: "Bittermens Xocolatl Mole Bitters", note: "The original. Chocolate and spice in perfect balance." }, { tier: "Good", name: "Fee Brothers Aztec Chocolate Bitters", note: "Sweeter, more chocolate-forward. Easier to find." }] },
      { name: "Celery Bitters",     role: "Vegetal + Savory", abv: "35%",   desc: "The secret weapon in a Bloody Mary. Adds savory, herbal depth you can't identify but absolutely miss.", pairs: ["Vodka", "Gin (savory cocktails)"], substitutes: [] },
    ],
  },
  // ── Vermouth & Fortified ──────────────────────────────────────────────────
  {
    category: "Vermouth & Fortified",
    color: "#8B7BA8",
    emoji: "🫙",
    items: [
      { name: "Dry Vermouth",       role: "Dry + Herbal + Floral", abv: "18%", desc: "White wine fortified with alcohol and botanicals. Crisp, herbal, slightly bitter. The Martini's soul. Refrigerate after opening — goes bad in 2-3 weeks.", pairs: ["Gin", "Vodka"], substitutes: [], brands: [{ tier: "Best", name: "Dolin Dry", note: "Light, delicate, floral. The modern bartender's choice. Doesn't overpower the gin." }, { tier: "Best", name: "Noilly Prat Original Dry", note: "Fuller, nuttier, more complex. The classic French style. Great in a Dirty Martini." }, { tier: "Good", name: "Martini & Rossi Extra Dry", note: "Widely available and consistent. A solid well option." }] },
      { name: "Sweet Vermouth",     role: "Sweet + Herbal + Rich", abv: "16%", desc: "Red vermouth — wine with sweet botanicals, caramel, vanilla, herbs. Manhattan, Negroni, Boulevardier. Refrigerate after opening.", pairs: ["Whiskey", "Gin", "Campari"], substitutes: [], brands: [{ tier: "Best", name: "Carpano Antica Formula", note: "The gold standard. Rich vanilla, dried fruit, complex. Worth the price for Manhattans and Negronis." }, { tier: "Great", name: "Cocchi Storico Vermouth di Torino", note: "Slightly bitter, orange notes. More complex than most. Excellent in a Negroni." }, { tier: "Good", name: "Dolin Rouge", note: "Lighter, less sweet. More versatile across cocktails." }, { tier: "Budget", name: "Martini & Rossi Rosso", note: "Fine for service. Consistent. Not a sipping vermouth." }] },
      { name: "Bianco Vermouth",    role: "Sweet + Floral",        abv: "15%", desc: "White but slightly sweet — between dry and sweet. Lillet Blanc is in this family. Underused and underrated.", pairs: ["Gin", "Vodka", "Aperol"], substitutes: ["Lillet Blanc"] },
      { name: "Lillet Blanc",       role: "Floral + Citrus + Off-dry", abv: "17%", desc: "French aperitif wine. Honey, citrus, white flowers. The 007 Vesper uses it. Served over ice with an orange slice.", pairs: ["Gin", "Vodka"], substitutes: ["Bianco vermouth"] },
      { name: "Campari",            role: "Bitter + Citrus + Herbal", abv: "25%", desc: "The most important bitter liqueur in cocktails. Secret recipe of herbs and citrus peel. Negroni, Boulevardier, Spritz. Unmistakable red color.", pairs: ["Gin", "Bourbon", "Sweet vermouth"], substitutes: ["Aperol (lighter)"] },
      { name: "Aperol",             role: "Bitter + Orange + Sweet",  abv: "11%", desc: "Lighter, sweeter, lower ABV than Campari. Orange, rhubarb, gentian. The Aperol Spritz phenomenon. Gateway to amaro culture.", pairs: ["Prosecco", "Club soda", "Gin"], substitutes: ["Campari (stronger)"] },
      { name: "Amaro",              role: "Bitter + Herbal + Sweet",  abv: "16-40%", desc: "Italian herbal liqueur family. Ranges from light (Aperol) to intensely bitter (Fernet). Used as digestif or in stirred cocktails. Montenegro, Averna, Amaro Nonino.", pairs: ["Bourbon", "Rye", "Aged rum"], substitutes: [] },
    ],
  },
  // ── Cream & Dairy ─────────────────────────────────────────────────────────
  {
    category: "Cream & Dairy",
    color: "#c8b898",
    emoji: "🥛",
    items: [
      { name: "Heavy Cream",        role: "Rich + Texture",   abv: "0%", desc: "Floated on top or shaken in. Adds richness and mouthfeel. White Russian, Brandy Alexander, Irish Coffee float.", pairs: ["Vodka", "Brandy", "Irish Whiskey", "Coffee liqueur"], substitutes: ["Half and half (lighter)"] },
      { name: "Egg White",          role: "Foam + Silky Texture", abv: "0%", desc: "Dry shake first (no ice), then shake again with ice. Creates a thick, silky foam that catches the garnish and changes mouthfeel entirely. Whiskey Sour, Pisco Sour, Gin Fizz.", pairs: ["Whiskey", "Gin", "Pisco"], substitutes: ["Aquafaba (chickpea water, vegan)"] },
      { name: "Whole Egg",          role: "Rich + Foam",      abv: "0%", desc: "Flips and eggnogs. The yolk adds richness and fat; the white adds foam. Flip cocktails are silky and rich.", pairs: ["Aged spirits", "Porto", "Brandy"], substitutes: [] },
      { name: "Coconut Cream",      role: "Sweet + Tropical + Rich", abv: "0%", desc: "Coco López or Coco Real. Thick, sweet, coconut flavor. The Piña Colada's signature texture. Different from coconut milk — much thicker.", pairs: ["Rum", "Vodka"], substitutes: ["Coconut milk (thinner, less sweet)"] },
      { name: "Butter (Fat-washed)", role: "Rich + Savory",    abv: "0%", desc: "Brown butter added to spirit, frozen, fat skimmed off. Leaves buttery flavor with no texture. Technique for butter-washed bourbon.", pairs: ["Bourbon", "Rum"], substitutes: [] },
    ],
  },
  // ── Garnishes ─────────────────────────────────────────────────────────────
  {
    category: "Garnishes",
    color: "#6B8E3E",
    emoji: "🌿",
    items: [
      { name: "Citrus Twist / Peel", role: "Aroma + Oil",    abv: "0%", desc: "Express the peel over the drink to release the oils, then run it around the rim. You're spraying citrus oil on the surface — it dramatically changes the aroma. Don't skip this.", pairs: ["Martini", "Negroni", "Old Fashioned", "Manhattan"], substitutes: [] },
      { name: "Citrus Wedge",        role: "Juice + Visual",  abv: "0%", desc: "Squeeze and drop in, or hang on the rim. Practical — lets the drinker add more acid if they want.", pairs: ["G&T", "Highballs", "Moscow Mule"], substitutes: [] },
      { name: "Citrus Wheel",        role: "Visual",          abv: "0%", desc: "Thin round slice. Decorative and signals the flavor. Flag on the rim.", pairs: ["Sours", "Collins", "Spritz"], substitutes: [] },
      { name: "Mint Sprig",          role: "Aroma",           abv: "0%", desc: "Slap the sprig against your palm to release the oils before placing it in the drink. The nose hits the mint before the glass hits the lips — that's the point.", pairs: ["Mojito", "Mint Julep", "Dark & Stormy"], substitutes: [] },
      { name: "Luxardo Cherry",      role: "Sweet + Visual",  abv: "0%", desc: "The real deal — Maraschino cherries from Luxardo. Deep, complex, not artificially sweet. Worth the price. Not the neon red ones.", pairs: ["Manhattan", "Old Fashioned", "Sours"], substitutes: [], brands: [{ tier: "The One", name: "Luxardo Maraschino Cherries", note: "The jar with the wicker. Sour cherries in Marasca syrup. Dark, complex, not sweet. Every serious bar stocks these." }, { tier: "Great", name: "Fabbri Amarena Cherries", note: "Italian, slightly more bitter. Excellent in stirred cocktails." }, { tier: "Good", name: "Traverse City Whiskey Co. Cocktail Cherries", note: "American, whiskey-soaked. Excellent in bourbon cocktails." }, { tier: "Avoid", name: "Maraschino cherries (neon red)", note: "Artificially dyed, corn syrup-soaked. No flavor. Never use these in a real cocktail." }] },
      { name: "Cocktail Olive",      role: "Savory + Salty",  abv: "0%", desc: "Queen olives, 1 or 3 (never 2 — superstition). Adds savory, briny character to the Dirty Martini. The brine itself is an ingredient.", pairs: ["Martini"], substitutes: [] },
      { name: "Cucumber Slice",      role: "Fresh + Cool",    abv: "0%", desc: "Signature of Hendrick's G&T. Adds cool, vegetal freshness that complements floral gins.", pairs: ["Gin & Tonic", "Pimm's Cup"], substitutes: [] },
      { name: "Dehydrated Citrus",   role: "Visual + Aroma",  abv: "0%", desc: "Dried wheel of orange/lemon/grapefruit. Long shelf life, dramatic presentation, still carries some flavor and aroma.", pairs: ["Whiskey sours", "Amaretto sours", "Spritzes"], substitutes: [] },
      { name: "Salt Rim",            role: "Savory + Contrast", abv: "0%", desc: "Half-rim only — not everyone wants it on every sip. Margarita classic. The salt hits your tongue first, amplifies the lime, and tempers the tequila heat.", pairs: ["Margarita", "Paloma", "Mezcal drinks"], substitutes: [] },
      { name: "Sugar Rim",           role: "Sweet + Visual",  abv: "0%", desc: "Moisten rim, press into sugar. Lemon Drop, Sidecar, some tropical drinks. Adds sweetness on first sip.", pairs: ["Lemon Drop", "Sidecar", "Cosmopolitan"], substitutes: [] },
      { name: "Grated Nutmeg",       role: "Aroma + Spice",   abv: "0%", desc: "Always grate fresh — pre-ground nutmeg is flavorless. A small microplane over the foam of a Brandy Alexander or Eggnog changes the whole experience.", pairs: ["Brandy Alexander", "Eggnog", "Flips"], substitutes: [] },
      { name: "Coffee Beans (3)",    role: "Aroma + Visual",  abv: "0%", desc: "The classic Espresso Martini garnish. Set them on the foam. The triple represents health, happiness, and wealth (Sambuca tradition).", pairs: ["Espresso Martini", "Coffee cocktails"], substitutes: [] },
    ],
  },
  // ── Fruit & Purées ────────────────────────────────────────────────────────
  {
    category: "Fruit & Purées",
    color: "#D4712B",
    emoji: "🍓",
    items: [
      { name: "Muddled Mint",        role: "Herb + Aroma",    abv: "0%", desc: "Gentle muddle only — you want the oils, not the chlorophyll (which makes it bitter). 8-10 leaves, light press.", pairs: ["Mojito", "Mint Julep", "Smashes"], substitutes: [] },
      { name: "Muddled Cucumber",    role: "Fresh + Vegetal", abv: "0%", desc: "3-4 chunks muddled in the shaker. Releases juice and fresh cucumber flavor. Gin and tequila cocktails.", pairs: ["Gin", "Tequila", "Vodka"], substitutes: [] },
      { name: "Muddled Jalapeño",    role: "Heat + Green",    abv: "0%", desc: "1-3 slices depending on heat level. Remove seeds for less heat. Adds real spice, not just flavor — be careful and taste as you go.", pairs: ["Tequila", "Mezcal", "Vodka"], substitutes: ["Hot sauce (much harsher)"] },
      { name: "Muddled Berries",     role: "Sweet + Tart + Color", abv: "0%", desc: "Strawberries, raspberries, blackberries. Fine strain after shaking — seeds are unpleasant. Adds fresh fruit flavor and beautiful color.", pairs: ["Vodka", "Gin", "Rum"], substitutes: ["Fruit purée"] },
      { name: "Peach Purée",         role: "Sweet + Fruit",   abv: "0%", desc: "Bellini base. Fresh white peaches in season — canned works in winter. Thick purée that billows up when Prosecco is added.", pairs: ["Prosecco", "Champagne", "Bourbon"], substitutes: [] },
      { name: "Passion Fruit Purée", role: "Tropical + Tart", abv: "0%", desc: "Intense, tropical. Pornstar Martini, tropical cocktails. Frozen purée works well.", pairs: ["Vodka", "Rum", "Tequila"], substitutes: [] },
      { name: "Tomato Juice",        role: "Savory + Umami",  abv: "0%", desc: "Bloody Mary base. Use good tomato juice (Clamato for a Caesar). Season it — black pepper, Worcestershire, Tabasco, horseradish.", pairs: ["Vodka", "Gin (Red Snapper)"], substitutes: ["Clamato (adds clam broth — the Caesar)"] },
    ],
  },
  // ── Misc Enhancers ────────────────────────────────────────────────────────
  {
    category: "Misc Enhancers",
    color: "#887060",
    emoji: "🧂",
    items: [
      { name: "Saline Solution",     role: "Savory + Enhancer", abv: "0%", desc: "20% salt in water. 1-2 drops in nearly any cocktail rounds it out and suppresses bitterness. The single most underused technique behind the bar.", pairs: ["Everything"], substitutes: ["Pinch of salt dissolved"] },
      { name: "Absinthe Rinse",      role: "Anise + Aroma",     abv: "45-74%", desc: "Pour a small amount in a chilled glass, swirl to coat, discard the excess. Leaves anise aroma. Essential for the Sazerac. A little goes a very long way.", pairs: ["Rye Whiskey", "Cognac"], substitutes: ["Herbsaint", "Pernod"] },
      { name: "Espresso",            role: "Bitter + Rich + Caffeine", abv: "0%", desc: "Freshly pulled and cooled to room temp. The Espresso Martini needs real espresso — not cold brew, not instant. The crema contributes to the foam.", pairs: ["Vodka", "Coffee liqueur"], substitutes: ["Strong cold brew (less foam)"] },
      { name: "Cold Brew Coffee",    role: "Bitter + Smooth",   abv: "0%", desc: "Less acidic than espresso. Good for coffee highballs and less foam-critical drinks. Batched, consistent.", pairs: ["Whiskey", "Rum", "Irish Cream"], substitutes: ["Espresso (stronger, more acidic)"] },
      { name: "Hot Sauce",           role: "Heat + Vinegar",    abv: "0%", desc: "Tabasco or Cholula in a Bloody Mary. Adds heat and vinegar tang. Distinct from muddled jalapeño — use both in a Bloody Mary.", pairs: ["Vodka (Bloody Mary)", "Mezcal"], substitutes: [] },
      { name: "Worcestershire Sauce", role: "Umami + Savory",   abv: "0%", desc: "Bloody Mary essential. Adds deep umami and complexity. A few dashes changes the whole character.", pairs: ["Vodka (Bloody Mary)"], substitutes: [] },
    ],
  },
];

// ── Quick reference: what role does each thing play ──────────────────────────
export const MODIFIER_ROLES = [
  { role: "Sour",       color: "#c8c060", emoji: "🍋", desc: "Adds acid, brightness, cuts through sweetness and fat", examples: ["Lemon juice", "Lime juice", "Grapefruit juice"] },
  { role: "Sweet",      color: "#e8c840", emoji: "🍯", desc: "Rounds edges, adds body, balances acid", examples: ["Simple syrup", "Agave", "Grenadine", "Orgeat"] },
  { role: "Bitter",     color: "#4a90a4", emoji: "🌿", desc: "Adds complexity, length, and adult character", examples: ["Angostura", "Campari", "Aperol", "Dry vermouth"] },
  { role: "Fizz",       color: "#60c8c8", emoji: "🫧", desc: "Dilutes, adds texture, lightens the drink", examples: ["Club soda", "Tonic", "Ginger beer", "Prosecco"] },
  { role: "Rich",       color: "#c8b898", emoji: "🥛", desc: "Adds mouthfeel, weight, and indulgence", examples: ["Heavy cream", "Egg white", "Coconut cream"] },
  { role: "Aroma",      color: "#6B8E3E", emoji: "🌿", desc: "Hits your nose before the glass hits your lips", examples: ["Mint sprig", "Citrus peel oils", "Expressed twist", "Nutmeg"] },
  { role: "Savory",     color: "#887060", emoji: "🧂", desc: "Adds depth, umami, suppresses harsh bitterness", examples: ["Saline solution", "Olive brine", "Worcestershire"] },
  { role: "Spice",      color: "#D4712B", emoji: "🌶️", desc: "Adds heat and complexity", examples: ["Muddled jalapeño", "Hot sauce", "Ginger beer", "Cinnamon syrup"] },
];