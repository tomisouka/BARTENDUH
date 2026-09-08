export const TOP_BRANDS = [
  { rank: 1,  brand: "Barefoot",         origin: "🇺🇸 USA",        style: "Multiple",          notes: "World's #1 wine brand by volume — approachable & affordable" },
  { rank: 2,  brand: "Yellow Tail",      origin: "🇦🇺 Australia",  style: "Multiple",          notes: "Fun, easy-drinking — iconic for wine newcomers" },
  { rank: 3,  brand: "Beringer",         origin: "🇺🇸 California", style: "Multiple",          notes: "California's oldest continuously operating winery" },
  { rank: 4,  brand: "Concha y Toro",    origin: "🇨🇱 Chile",      style: "Red / White",       notes: "Latin America's most iconic — Casillero del Diablo" },
  { rank: 5,  brand: "Moët & Chandon",   origin: "🇫🇷 France",     style: "Champagne",         notes: "World's best-known Champagne brand" },
  { rank: 6,  brand: "Santa Margherita", origin: "🇮🇹 Italy",      style: "Pinot Grigio",      notes: "Popularized Pinot Grigio worldwide" },
  { rank: 7,  brand: "Penfolds",         origin: "🇦🇺 Australia",  style: "Red",               notes: "Grange — Australia's most celebrated wine" },
  { rank: 8,  brand: "Kim Crawford",     origin: "🇳🇿 New Zealand",style: "Sauvignon Blanc",   notes: "Benchmark NZ Sauvignon Blanc globally" },
  { rank: 9,  brand: "Caymus",           origin: "🇺🇸 Napa Valley",style: "Cabernet Sauvignon",notes: "Cult-status Napa Cab, consistently rated 90+" },
  { rank: 10, brand: "La Marca",         origin: "🇮🇹 Italy",      style: "Prosecco",          notes: "#1 Prosecco brand in USA" },
  { rank: 11, brand: "Josh Cellars",     origin: "🇺🇸 California", style: "Multiple",          notes: "Fastest-growing wine brand in USA history" },
  { rank: 12, brand: "Kendall-Jackson",  origin: "🇺🇸 California", style: "Chardonnay",        notes: "America's best-selling Chardonnay for decades" },
  { rank: 13, brand: "Château Margaux",  origin: "🇫🇷 Bordeaux",   style: "Red Bordeaux",      notes: "Premier Grand Cru Classé — one of the First Growths" },
];

export const REDS = [
  { name: "Cabernet Sauvignon", abv: "13–15%", tannins: "High",   body: "Full",        flavor: "Dark fruit (blackcurrant, plum), cedar, tobacco. Ages beautifully for decades.", examples: "Caymus, Opus One, Château Margaux, Stag's Leap" },
  { name: "Pinot Noir",         abv: "12–14%", tannins: "Low",    body: "Light-Medium",flavor: "Red fruit (cherry, strawberry), earthy, silky. Delicate and food-friendly.", examples: "Meiomi, Oyster Bay, La Crema, Burgundy" },
  { name: "Merlot",             abv: "12–15%", tannins: "Medium", body: "Medium-Full", flavor: "Plum, black cherry, chocolate. Soft and approachable — great intro red.", examples: "Duckhorn, Stags' Leap, Barefoot Merlot" },
  { name: "Syrah / Shiraz",     abv: "13–15%", tannins: "High",   body: "Full",        flavor: "Bold, dark fruit, pepper, smoke. Syrah (France) = earthy; Shiraz (Australia) = jammy.", examples: "Penfolds, Molly Dooker" },
  { name: "Malbec",             abv: "13–15%", tannins: "Medium", body: "Full",        flavor: "Dark plum, blackberry, violet, chocolate. Argentina's signature grape.", examples: "Alamos, Catena, Concha y Toro" },
  { name: "Zinfandel",          abv: "13–16%", tannins: "Medium", body: "Medium-Full", flavor: "Jammy berry, spice, sometimes pepper. Bold and fruity American classic.", examples: "Seghesio, Ridge, Ravenswood" },
];

export const WHITES = [
  { name: "Chardonnay",     abv: "12–15%", flavor: "Unoaked = crisp, citrus, apple. Oaked = butter, vanilla, cream. Most popular white worldwide.", examples: "Kendall-Jackson, Rombauer, Sonoma-Cutrer" },
  { name: "Sauvignon Blanc",abv: "12–14%", flavor: "Crisp, citrus (grapefruit, lime), grass, herbal. High acid, refreshing, no oak.", examples: "Kim Crawford, Starborough, Oyster Bay" },
  { name: "Pinot Grigio",   abv: "11–13%", flavor: "Light, crisp, green apple, lemon, neutral. Easy and food-friendly.", examples: "Santa Margherita, Ecco Domani, Barefoot" },
  { name: "Riesling",       abv: "8–13%",  flavor: "Off-dry to sweet, peach, apricot, honey, petrol note when aged. German classic.", examples: "Chateau Ste Michelle, Dr. Loosen" },
  { name: "Moscato",        abv: "5–7%",   flavor: "Sweet, low alcohol, peach, orange blossom, fizzy. Perfect dessert wine or aperitif.", examples: "Barefoot Moscato, Seven Daughters" },
];

export const SPARKLING = [
  { name: "Champagne",  origin: "🇫🇷 France",   abv: "12%", flavor: "Toasty, bready, citrus, fine bubbles. Must come from Champagne region.", serve: "35-45°F", examples: "Moët & Chandon, Veuve Clicquot, Dom Pérignon" },
  { name: "Prosecco",   origin: "🇮🇹 Italy",    abv: "11%", flavor: "Light, fruity, floral, pear, apple. Larger bubbles, lower pressure.", serve: "38-45°F", examples: "La Marca, Mionetto, Ruffino" },
  { name: "Cava",       origin: "🇪🇸 Spain",    abv: "11.5%", flavor: "Crisp, citrus, almond. Made same method as Champagne, fraction of price.", serve: "38-45°F", examples: "Freixenet, Codorníu" },
  { name: "Rosé Wine",  origin: "🌍 Various",   abv: "11-13%", flavor: "Salmon to deep pink. Strawberry, watermelon, citrus. Dry to slightly sweet.", serve: "45-55°F", examples: "Prophecy Rosé, Miraval, Whispering Angel" },
];

export const FORTIFIED = [
  { name: "Port",   origin: "🇵🇹 Portugal", abv: "19-22%", flavor: "Sweet, rich, dark fruit, chocolate, nuts. Ruby = young/fruity, Tawny = nutty/caramel.", serve: "60-65°F" },
  { name: "Sherry", origin: "🇪🇸 Spain",    abv: "15-22%", flavor: "Ranges from bone dry to syrupy sweet. Fino = dry/nutty, PX = thick/sweet/raisin.", serve: "45-65°F depending on style" },
];

export const PAIRINGS = [
  { wine: "Cabernet Sauvignon", food: "Steak, lamb, aged cheeses, dark chocolate" },
  { wine: "Pinot Noir",         food: "Salmon, duck, mushrooms, brie" },
  { wine: "Chardonnay (oaked)", food: "Lobster, chicken, cream sauces, brie" },
  { wine: "Sauvignon Blanc",    food: "Oysters, goat cheese, salads, light fish" },
  { wine: "Riesling (off-dry)", food: "Spicy cuisine, Thai, Indian, pork" },
  { wine: "Champagne",          food: "Caviar, oysters, fried chicken, charcuterie" },
  { wine: "Rosé",               food: "Charcuterie, grilled fish, light pasta, pizza" },
  { wine: "Port",               food: "Stilton cheese, chocolate cake, walnuts" },
];

export const SERVING = [
  { type: "Sparkling / Champagne", temp: "38-45°F", glass: "Flute or coupe" },
  { type: "Light White (Pinot Grigio, Riesling)", temp: "45-50°F", glass: "White wine glass (narrower)" },
  { type: "Full White (Chardonnay)", temp: "50-55°F", glass: "Larger white wine glass" },
  { type: "Rosé",                  temp: "45-55°F", glass: "White wine glass" },
  { type: "Light Red (Pinot Noir)", temp: "55-60°F", glass: "Burgundy glass (wide bowl)" },
  { type: "Full Red (Cab, Merlot)", temp: "60-65°F", glass: "Bordeaux glass (tall, straight)" },
  { type: "Port / Fortified",       temp: "60-65°F", glass: "Port glass (small)" },
];

export const TERMS = [
  { term: "Tannins",   def: "Drying sensation from grape skins — gives structure to red wines" },
  { term: "Acidity",   def: "Tartness/brightness — makes wine refreshing and food-friendly" },
  { term: "Body",      def: "Weight of wine in mouth — light (skim milk) to full (whole milk)" },
  { term: "Dry",       def: "Little to no residual sugar — not sweet" },
  { term: "Off-Dry",   def: "Slightly sweet, noticeable but not cloying" },
  { term: "Terroir",   def: "How geography, climate, and soil affect wine's flavor" },
  { term: "Vintage",   def: "Year the grapes were harvested" },
  { term: "Oaked",     def: "Aged in oak barrels — adds vanilla, butter, toast notes" },
  { term: "Unoaked",   def: "Stainless steel fermented — preserves fresh fruit flavors" },
  { term: "Varietal",  def: "Wine named after the grape variety (e.g. Merlot, Chardonnay)" },
  { term: "Blend",     def: "Wine made from multiple grape varieties" },
  { term: "Old World", def: "Europe (France, Italy, Spain) — earthy, terroir-driven" },
  { term: "New World", def: "USA, Australia, Chile, NZ — fruit-forward, approachable" },
  { term: "Corked",    def: "Fault from contaminated cork — musty, damp cardboard smell" },
];
export const WINE_TYPES = [
  { keywords: ["cabernet","malbec","merlot","pinot noir","red","apothic","storypoint","story point"], type: "red",      color: "#c84060", label: "Red"      },
  { keywords: ["chardonnay","pinot grigio","sauvignon blanc","riesling","reisling","moscato","white","ecco domani","kendall jackson","seven daughters","starborough","chateau ste","alamos"],
    type: "white",    color: "#c8b040", label: "White"    },
  { keywords: ["rosé","rose","white zinfandel","prophecy rose"],                                      type: "rosé",     color: "#e07890", label: "Rosé"     },
  { keywords: ["champagne","prosecco","sparkling","mumm","la marca","split","cava"],                   type: "sparkling",color: "#a0d0e0", label: "Sparkling" },
];