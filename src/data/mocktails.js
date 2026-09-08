export const MOCKTAILS = [
  {
    category: "Classic Mocktails", color: "#6B8E3E",
    recipes: [
      { name: "Shirley Temple",          method: "BUILD",          ingredients: ["6 oz ginger ale", "0.5 oz grenadine"], steps: ["Fill glass with ice", "Add ginger ale", "Pour grenadine down side for layered effect — do not stir"], garnish: "2-3 Maraschino cherries", glass: "Highball", notes: "Roy Rogers variation: use cola instead of ginger ale." },
      { name: "Virgin Mojito",           method: "MUDDLE + BUILD", ingredients: ["10-12 fresh mint leaves", "1 oz fresh lime juice", "0.75 oz simple syrup", "4-5 oz club soda"], steps: ["Gently muddle mint + simple in glass", "Add lime juice and ice", "Top with club soda, stir gently"], garnish: "Mint sprig + lime wedge", glass: "Highball" },
      { name: "Virgin Piña Colada",      method: "BLEND",          ingredients: ["2 oz pineapple juice", "1.5 oz cream of coconut (Coco López)", "1 oz heavy cream"], steps: ["Blend all with 1-1.5 cups ice until smooth"], garnish: "Pineapple wedge + cherry", glass: "Hurricane" },
      { name: "Lemonade Sparkler",       method: "SHAKE + BUILD",  ingredients: ["2 oz fresh lemon juice", "1 oz simple syrup", "4 oz club soda or sparkling water"], steps: ["Shake lemon juice and simple syrup with ice", "Strain into glass filled with ice", "Top with club soda"], garnish: "Lemon wheel", glass: "Highball", variations: ["Strawberry — muddle fresh strawberries", "Lavender — use lavender simple syrup", "Blueberry — muddle blueberries"] },
    ]
  },
  {
    category: "Fruity & Refreshing", color: "#4A90A4",
    recipes: [
      { name: "Strawberry Basil Smash",  method: "MUDDLE + SHAKE", ingredients: ["4-5 fresh strawberries", "4-5 basil leaves", "1 oz lemon juice", "0.75 oz simple syrup", "2-3 oz club soda"], steps: ["Muddle strawberries and basil in shaker", "Add lemon, simple, ice — shake hard 10s", "Strain over fresh ice, top with club soda"], garnish: "Strawberry + basil leaf", glass: "Rocks or highball" },
      { name: "Watermelon Mint Cooler",  method: "MUDDLE + BUILD", ingredients: ["4 oz fresh watermelon juice", "0.5 oz lime juice", "0.5 oz agave syrup", "6-8 mint leaves", "2 oz sparkling water"], steps: ["Muddle mint in glass", "Add watermelon juice, lime, agave, ice", "Top with sparkling water, stir gently"], garnish: "Watermelon wedge + mint sprig", glass: "Highball" },
      { name: "Tropical Sunrise",        method: "BUILD",          ingredients: ["3 oz orange juice", "2 oz pineapple juice", "0.5 oz grenadine", "Splash coconut water"], steps: ["Add OJ, pineapple, coconut water over ice", "Slowly pour grenadine down side — do NOT stir for sunrise effect"], garnish: "Orange slice + cherry", glass: "Highball" },
      { name: "Peach Iced Tea",          method: "SHAKE",          ingredients: ["4 oz brewed black tea (chilled)", "2 oz peach nectar or fresh peach puree", "0.5 oz fresh lemon juice", "0.5 oz honey or simple syrup"], steps: ["Shake all ingredients with ice", "Strain into glass over fresh ice"], garnish: "Peach slice + lemon wheel", glass: "Highball or mason jar" },
    ]
  },
  {
    category: "Sophisticated", color: "#8B7BA8",
    recipes: [
      { name: "Citrus Rosemary Spritz",    method: "BUILD",          ingredients: ["2 oz fresh grapefruit juice", "0.5 oz lemon juice", "0.5 oz rosemary simple syrup", "3 oz club soda"], steps: ["Fill wine glass with ice", "Add juices and rosemary syrup", "Top with club soda, stir gently"], garnish: "Rosemary sprig + grapefruit slice", glass: "Wine glass" },
      { name: "Blueberry Thyme Lemonade", method: "MUDDLE + SHAKE", ingredients: ["6-8 fresh blueberries", "2-3 fresh thyme sprigs", "1.5 oz fresh lemon juice", "1 oz simple syrup", "3 oz sparkling water"], steps: ["Muddle blueberries and thyme in shaker", "Add lemon juice, simple syrup, and ice", "Shake hard 10s, double strain over ice", "Top with sparkling water"], garnish: "Blueberries + thyme sprig", glass: "Coupe or rocks" },
      { name: "Cucumber Elderflower Fizz", method: "MUDDLE + BUILD", ingredients: ["3-4 cucumber slices", "1 oz elderflower syrup", "0.5 oz lime juice", "4 oz sparkling water"], steps: ["Muddle cucumber in glass", "Add elderflower syrup, lime, ice", "Top with sparkling water"], garnish: "Cucumber ribbon + edible flowers", glass: "Highball or wine glass" },
      { name: "Virgin Espresso Martini",   method: "SHAKE HARD",     ingredients: ["2 oz fresh espresso (cooled)", "1 oz coffee syrup", "0.5 oz heavy cream (optional)"], steps: ["Cool espresso to room temp", "Shake hard 15-20s to build foam", "Strain into chilled glass"], garnish: "3 coffee beans on foam", glass: "Martini", variations: ["Mocha — add 0.5 oz chocolate syrup", "Cold brew — swap espresso for cold brew"] },
    ]
  },
  {
    category: "Party Punches", color: "#C9A84C",
    recipes: [
      { name: "Berry Lemonade Punch",    method: "BUILD (serves 8-10)", ingredients: ["4 cups lemonade", "2 cups mixed berry juice", "1 cup sliced strawberries", "1 cup blueberries", "1 cup raspberries", "2 cups ginger ale or club soda"], steps: ["Combine lemonade and berry juice in punch bowl", "Add sliced fruit", "Refrigerate 1-2 hours", "Add ginger ale and ice just before serving"], garnish: "Mint sprigs + berry skewers", glass: "Punch bowl" },
      { name: "Christmas Morning Punch", method: "BUILD (serves 8-10)", ingredients: ["3 cups pomegranate juice", "2 cups orange juice", "1 cup pineapple juice", "2 cups ginger ale", "Pomegranate seeds", "Orange slices"], steps: ["Combine all juices in punch bowl", "Add ice or freeze juice into cubes to prevent dilution", "Add ginger ale just before serving", "Stir gently"], garnish: "Pomegranate seeds + orange slices", glass: "Punch bowl" },
      { name: "Tropical Fruit Punch",    method: "BUILD (serves 6-8)",  ingredients: ["2 cups pineapple juice", "1 cup orange juice", "1 cup mango juice", "1 cup coconut water", "1 cup club soda", "Fresh pineapple chunks"], steps: ["Combine all juices and coconut water", "Refrigerate until chilled", "Add club soda just before serving", "Serve over ice"], garnish: "Pineapple chunks + cherries", glass: "Punch bowl or pitcher" },
    ]
  },
];

export const MOCKTAIL_TIPS = {
  balance: [
    { element: "Sweet",    sources: "Simple syrup, honey, agave" },
    { element: "Sour",     sources: "Fresh citrus juices, vinegar-based shrubs" },
    { element: "Bitter",   sources: "Tonic water, Angostura bitters*" },
    { element: "Aromatic", sources: "Fresh herbs, spices, fruit zest" },
  ],
  balanceNote: "* Most bitters contain trace alcohol (<0.5% ABV), similar to vanilla extract.",
  principles: [
    { tip: "Always use fresh citrus",     detail: "Never bottled juice. Fresh squeezed lasts ~4 hours." },
    { tip: "Fresh herbs add complexity",  detail: "Muddle gently — twist to release oils, don't shred." },
    { tip: "Add carbonation last",        detail: "Club soda, sparkling water, ginger beer — pour last, stir minimally." },
    { tip: "Use quality ice",             detail: "Large cubes melt slower. Crushed ice for tiki-style. Fresh only — never reuse." },
    { tip: "Presentation matters",        detail: "Nice glassware, garnish thoughtfully. A well-presented mocktail feels just as special." },
  ],
  stockList: {
    mixers:      ["Club soda / sparkling water", "Tonic water", "Ginger beer (non-alcoholic)", "Ginger ale", "Lemon-lime soda"],
    syrups:      ["Simple syrup (1:1 sugar:water)", "Grenadine", "Honey", "Agave nectar", "Flavored syrups (lavender, rosemary, vanilla)"],
    fresh:       ["Lemons, limes, oranges, grapefruit", "Mint, basil, rosemary, thyme", "Seasonal fruits"],
    specialty:   ["Coconut cream", "Fresh ginger", "Elderflower syrup", "Shrubs (fruit + vinegar syrups)"],
  },
  naSpirits: [
    { brand: "Seedlip",             detail: "Non-alcoholic distilled spirits — herbal and spiced varieties" },
    { brand: "Lyre's",              detail: "Non-alcoholic spirit alternatives across many categories" },
    { brand: "Ritual Zero Proof",   detail: "Whiskey, gin, tequila alternatives" },
    { brand: "Monday Zero Alcohol", detail: "Gin and whiskey options, <0.5% ABV" },
  ],
  quickIdeas: [
    { name: "Sparkling Berry",         recipe: "Muddle berries + sparkling water + garnish" },
    { name: "Citrus Spritz",           recipe: "Fresh citrus juice + simple syrup + club soda" },
    { name: "Ginger Lime Fizz",        recipe: "Ginger beer + lime juice + mint" },
    { name: "Cucumber Mint Refresher", recipe: "Muddled cucumber + mint + tonic water" },
    { name: "Tropical Cooler",         recipe: "Pineapple juice + coconut water + lime" },
  ],
};