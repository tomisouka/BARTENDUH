export const TOP_BRANDS = [
  { rank: 1,  brand: "Snow",            origin: "🇨🇳 China",       style: "Light Lager",  notes: "World's #1 by volume" },
  { rank: 2,  brand: "Corona Extra",    origin: "🇲🇽 Mexico",      style: "Pale Lager",   notes: "#1 brand value globally, serve with lime" },
  { rank: 3,  brand: "Budweiser",       origin: "🇺🇸 USA",         style: "Pale Lager",   notes: "King of Beers" },
  { rank: 4,  brand: "Heineken",        origin: "🇳🇱 Netherlands", style: "Pale Lager",   notes: "Green bottle, global premium" },
  { rank: 5,  brand: "Tsingtao",        origin: "🇨🇳 China",       style: "Pale Lager",   notes: "Most exported Chinese beer" },
  { rank: 6,  brand: "Bud Light",       origin: "🇺🇸 USA",         style: "Light Lager",  notes: "Low-calorie, formerly #1 in USA" },
  { rank: 7,  brand: "Modelo Especial", origin: "🇲🇽 Mexico",      style: "Pilsner",      notes: "Top-selling in USA 2023-2024" },
  { rank: 8,  brand: "Michelob Ultra",  origin: "🇺🇸 USA",         style: "Light Lager",  notes: "#1 USA seller 2025, health-focused" },
  { rank: 9,  brand: "Coors Light",     origin: "🇺🇸 USA",         style: "Light Lager",  notes: "Silver Bullet, refreshing" },
  { rank: 10, brand: "Guinness",        origin: "🇮🇪 Ireland",     style: "Dry Stout",    notes: "Most famous stout worldwide" },
  { rank: 11, brand: "Stella Artois",   origin: "🇧🇪 Belgium",     style: "Pilsner",      notes: "Premium European lager" },
  { rank: 12, brand: "Asahi",           origin: "🇯🇵 Japan",       style: "Pale Lager",   notes: "Super Dry, crisp finish" },
  { rank: 13, brand: "Carlsberg",       origin: "🇩🇰 Denmark",     style: "Pilsner",      notes: "Probably the best beer" },
  { rank: 14, brand: "Modelo Negra",    origin: "🇲🇽 Mexico",      style: "Dark Lager",   notes: "Munich-style, smooth" },
  { rank: 15, brand: "Miller Lite",     origin: "🇺🇸 USA",         style: "Light Lager",  notes: "Original light beer" },
];

export const STYLES = [
  {
    family: "ALES", color: "#D4820A",
    note: "Top-fermenting yeast · Warmer temps (60-75°F) · Complex, fruity, robust",
    styles: [
      { name: "IPA",           abv: "5-10%+", flavor: "Intensely hoppy, bitter, citrus/tropical", examples: "Dogfish Head 60 Min, Lagunitas, Stone IPA" },
      { name: "Pale Ale",      abv: "4.5-6.2%", flavor: "Hoppy but balanced, golden, approachable", examples: "Sierra Nevada, Founders, Bell's Two Hearted" },
      { name: "Stout",         abv: "4-12%", flavor: "Roasted barley, coffee, chocolate, dark", examples: "Guinness, Left Hand Milk Stout" },
      { name: "Porter",        abv: "4-6.5%", flavor: "Dark, chocolate/caramel, lighter than stout", examples: "Founders Porter, Sam Smith Chocolate Porter" },
      { name: "Wheat Beer",    abv: "4-5.5%", flavor: "Smooth, hazy, banana/clove, light", examples: "Blue Moon, Hoegaarden, Franziskaner" },
      { name: "Sour",          abv: "3-8%", flavor: "Tart, acidic, funky from wild yeast/bacteria", examples: "Dogfish Head, local sours" },
      { name: "Belgian Ale",   abv: "6-11%", flavor: "Complex, fruity, spicy, high ABV", examples: "Chimay, Duvel, Leffe" },
      { name: "Amber Ale",     abv: "4.5-6.2%", flavor: "Toasted malt, caramel, balanced hops", examples: "Fat Tire, Dos Equis Amber" },
    ]
  },
  {
    family: "LAGERS", color: "#C9A84C",
    note: "Bottom-fermenting yeast · Cooler temps (45-55°F) · Clean, crisp, smooth",
    styles: [
      { name: "Pale Lager",    abv: "4-5%",   flavor: "Light, crisp, clean, widely accessible", examples: "Budweiser, Corona, Heineken, Modelo" },
      { name: "Light Lager",   abv: "3-4.2%", flavor: "Very light, low cal, refreshing", examples: "Bud Light, Miller Lite, Coors Light, Michelob Ultra" },
      { name: "Pilsner",       abv: "4-5.5%", flavor: "Crisp, hoppy, golden, slight bitterness", examples: "Pilsner Urquell, Stella Artois, Modelo Especial" },
      { name: "Bock",          abv: "6-7.5%", flavor: "Malty, rich, dark amber, low hops", examples: "Shiner Bock, Paulaner" },
      { name: "Märzen/Oktoberfest", abv: "5-6%", flavor: "Toasty malt, amber, clean finish", examples: "Spaten, St. Arnold Oktoberfest" },
      { name: "Dark Lager",    abv: "4.5-5.5%", flavor: "Roasted malt, smooth, dark but not heavy", examples: "Negra Modelo, Shiner Bock" },
    ]
  },
];

export const REGIONS = [
  { flag: "🇺🇸", region: "American", highlights: ["Bud Light, Miller Lite, Coors Light (light lagers dominate)", "Craft beer boom — IPAs are king", "West Coast = hoppy bitter IPAs", "East Coast = hazy juicy IPAs", "Karbach Love Street (TX Kölsch-style)"] },
  { flag: "🇲🇽", region: "Mexican",  highlights: ["Corona, Modelo, Pacifico, Dos Equis, Tecate", "Light lagers served with lime", "Beach/casual drinking culture", "Negra Modelo for darker option"] },
  { flag: "🇩🇪", region: "German",   highlights: ["Purity Law (Reinheitsgebot): only water, malt, hops, yeast", "Pilsners, Hefeweizens, Bocks, Dunkel", "Beck's, Warsteiner, Paulaner, Spaten, Erdinger"] },
  { flag: "🇧🇪", region: "Belgian",  highlights: ["Complex, high-ABV ales", "Trappist monasteries produce legendary beers", "Chimay, Duvel, Hoegaarden, Leffe, Stella Artois"] },
  { flag: "🇬🇧", region: "British/Irish", highlights: ["Cask ales, pub culture, less carbonation", "Guinness, Boddington's, Newcastle, Smithwick's", "Warmer serving temps than American style"] },
  { flag: "🇯🇵", region: "Japanese", highlights: ["Asahi Super Dry, Kirin, Sapporo, Suntory", "Clean, crisp, minimal flavors", "Ultra-dry finish style"] },
];

export const QUICK_REFS = {
  strength: [
    { level: "🟢 Session/Light", abv: "3-4.5%", examples: "Light lagers, Session IPA" },
    { level: "🟡 Standard",      abv: "4.5-6%",  examples: "Most lagers, Pale ales, Pilsners" },
    { level: "🟠 Strong",        abv: "6-8%",    examples: "IPA, Belgian Dubbel, Bock" },
    { level: "🔴 Very Strong",   abv: "8-12%+",  examples: "Imperial IPA/Stout, Belgian Quad" },
  ],
  flavors: [
    { like: "Sweet & Malty",     try: "Bock, Brown Ale, Milk Stout, Amber Lager" },
    { like: "Bitter & Hoppy",    try: "IPA, Pale Ale, Pilsner" },
    { like: "Roasted & Coffee",  try: "Stout, Porter" },
    { like: "Fruity & Spicy",    try: "Belgian Ale, Hefeweizen, Saison" },
    { like: "Clean & Crisp",     try: "Pilsner, Pale Lager, Kölsch" },
    { like: "Dark & Smooth",     try: "Porter, Dark Lager, Oatmeal Stout" },
  ],
  pairings: [
    { food: "Pizza",           beer: "Pale Lager, Pilsner, Pale Ale" },
    { food: "Burgers",         beer: "Pale Ale, IPA, Amber Lager" },
    { food: "BBQ / Smoked",    beer: "Porter, Stout, Brown Ale, Bock" },
    { food: "Spicy Food",      beer: "IPA, Pilsner, Wheat Ale" },
    { food: "Seafood",         beer: "Pilsner, Wheat Ale, Blonde Ale" },
    { food: "Chocolate",       beer: "Stout, Porter, Belgian Quad" },
    { food: "Oysters",         beer: "Dry Stout (classic!)" },
  ],
  temps: [
    { style: "Light Lagers",       temp: "35-40°F", why: "Maximize refreshment" },
    { style: "Pilsners",           temp: "38-45°F", why: "Enhance crispness" },
    { style: "Pale Ales, IPAs",    temp: "45-50°F", why: "Release hop aromas" },
    { style: "Stouts, Porters",    temp: "50-55°F", why: "Reveal complex flavors" },
    { style: "Belgian Ales",       temp: "50-55°F", why: "Open up spicy/fruity notes" },
    { style: "Strong Ales (8%+)",  temp: "55-60°F", why: "Allow warmth and complexity" },
  ],
  terms: [
    { term: "ABV",        def: "Alcohol By Volume — % alcohol content" },
    { term: "IBU",        def: "International Bitterness Units — hop bitterness scale" },
    { term: "Session",    def: "Lower ABV beer (under 5%) for extended drinking" },
    { term: "Hazy",       def: "Unfiltered, cloudy — smooth mouthfeel" },
    { term: "Dry-Hopped", def: "Hops added during/after fermentation for aroma" },
    { term: "Nitro",      def: "Nitrogenated — creamy, smooth, small bubbles" },
    { term: "Draft",      def: "Beer served from a keg/tap" },
    { term: "Growler",    def: "64 oz refillable bottle" },
  ]
};