/**
 * images.js
 * - Cocktails: fetched from TheCocktailDB
 * - Beer/Wine: fetched from Wikipedia REST API (thumbnail from article)
 *   All results cached in memory per session.
 */

// ─── Shared cache ─────────────────────────────────────────────────────────────
const cache = {};

// ─── Cocktail fetcher ─────────────────────────────────────────────────────────
const COCKTAIL_ALIASES = {
  "Kamikazi":                          "Kamikaze",
  "L.I. Iced Tea":                     "Long Island Iced Tea",
  "Raspberry L.I. Tea":                "Raspberry Long Island Iced Tea",
  "Cubra Libra":                       "Cuba Libre",
  "Kahlua & Cream":                    "Kahlua and Cream",
  "Bacardi Superior Mojito":           "Mojito",
  "Altos Strawberry Rita":             "Strawberry Margarita",
  "Cold Brew Espresso Martini":        "Espresso Martini",
  "Fresh Melon Paloma":                "Paloma",
  "Raspberry Cosmo":                   "Cosmopolitan",
  "Spicy Paloma":                      "Paloma",
  "Fords Strawberry Gimlet":           "Gimlet",
  "Grand Cadillac Margarita":          "Margarita",
  "Perfect Patrón Rita":               "Margarita",
  "The OG Rita":                       "Margarita",
  "Prickly Pear Margarita":            "Margarita",
  "Firebox Margarita":                 "Margarita",
  "JD Apple Margarita":                "Margarita",
  "Sparkling Peach Rita":              "Margarita",
  "Tropical Heat Rita":                "Margarita",
  "Red Flag Rita":                     "Margarita",
  "Skinny Red Bull Watermelon Marg":   "Margarita",
  "Espolòn Watermelon Rita":           "Margarita",
  "The People's Margarita":            "Margarita",
  "Casamigos Passion Fruit Mint Rita": "Margarita",
  "Raspberry Piña Colada":             "Pina Colada",
  "Southside Martini":                 "Gimlet",
  "TX Old Fashioned":                  "Old Fashioned",
  "Hibiscus Mule":                     "Moscow Mule",
  "Swedish Mule":                      "Moscow Mule",
  "Jameson Sangria":                   "Sangria",
  "SoCo Hurricane":                    "Hurricane",
  "Premium LIT":                       "Long Island Iced Tea",
  "Whiskey LIT":                       "Long Island Iced Tea",
  "Virgin Mojito":                     "Mojito",
  "No-Jito":                           "Mojito",
  "Virgin Mary":                       "Bloody Mary",
  "Michelada/Virgin Mary":             "Bloody Mary",
  "0.0 Michelada":                     "Michelada",
};

export async function getDrinkImage(name) {
  const key = `cocktail:${name}`;
  if (key in cache) return cache[key];
  const searchName = COCKTAIL_ALIASES[name] || name;
  try {
    const res  = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchName)}`);
    const data = await res.json();
    const url  = data.drinks?.[0]?.strDrinkThumb ?? null;
    cache[key] = url;
    return url;
  } catch {
    cache[key] = null;
    return null;
  }
}

// ─── Wikipedia image fetcher ──────────────────────────────────────────────────
// Maps our beer/wine name → Wikipedia article title
const BEER_WIKI = {
  // Domestic
  "Bud Lt":                    "Bud Light",
  "Bud Light":                 "Bud Light",
  "Budweiser":                 "Budweiser",
  "Coors Lt":                  "Coors Light",
  "Coors Light":               "Coors Light",
  "Lone Star":                 "Lone Star Beer",
  "Michelob Ultra":            "Michelob Ultra",
  "Miller Lite":               "Miller Lite",
  "PBR":                       "Pabst Blue Ribbon",
  "Sam Adam's Boston Lager":   "Samuel Adams (beer)",
  "Shiner Bock":               "Shiner Bock",
  "Shiner Lt Blonde":          "Shiner Bock",
  "Shiner Cheer":              "Shiner Bock",
  "Shiner Oktoberfest":        "Shiner Bock",
  "Stone IPA":                 "Stone IPA",
  "Yuengling":                 "Yuengling",
  "Yuengling Lager":           "Yuengling",
  "Yuengling Flight":          "Yuengling",
  // Import & craft
  "Angry Orchard":             "Angry Orchard",
  "Angry Orchard Mango Peach": "Angry Orchard",
  "Austin Eastcider Original":     "Austin Eastciders",
  "Austin Eastcider Blood Orange": "Austin Eastciders",
  "Blue Moon":                 "Blue Moon (beer)",
  "Boddington's":              "Boddingtons",
  "Corona":                    "Corona (beer)",
  "Corona Premier":            "Corona (beer)",
  "Dogfish Head 60 Minute":    "Dogfish Head Brewery",
  "Dogfish Head 90 Minute":    "Dogfish Head Brewery",
  "Dos Equis":                 "Dos Equis",
  "Ghost in the Machine":      "Real Ale Brewing Company",
  "Guinness":                  "Guinness",
  "Harp":                      "Harp Lager",
  "Heineken":                  "Heineken",
  "Heineken Silver":           "Heineken",
  "Hopadillo":                 "Karbach Brewing Company",
  "Karbach Yuletide Confessions": "Karbach Brewing Company",
  "Lagunitas IPA":             "Lagunitas Brewing Company",
  "Love St":                   "Karbach Brewing Company",
  "Modelo Especial":           "Modelo Especial",
  "Newcastle":                 "Newcastle Brown Ale",
  "Pacifico":                  "Pacifico (beer)",
  "Pumpkinator":               "Saint Arnold Brewing Company",
  "Real Ale Fresh Kicks":      "Real Ale Brewing Company",
  "Sam Smith Chocolate Porter":"Samuel Smith's",
  "Sierra Nevada Hazy Little Thing": "Sierra Nevada Brewing Co.",
  "Smithwick's":               "Smithwick's",
  "St. Arn Art Car IPA":       "Saint Arnold Brewing Company",
  "St. Arnold Oktoberfest":    "Saint Arnold Brewing Company",
  "St. Arnold Spring Bock":    "Saint Arnold Brewing Company",
  "St. Arnold Strawberry Cider": "Saint Arnold Brewing Company",
  "Stella Artois":             "Stella Artois",
  "Strongbow":                 "Strongbow (cider)",
  "Sunny Little Thing":        "Boulevard Brewing",
  "Twisted Tea":               "Twisted Tea",
  // Seltzer / RTD
  "Carbliss Assorted":         null,
  "High Noon Assorted":        "High Noon (drink)",
  "JD Down Home Punch":        "Jack Daniel's",
  "Nutrl Assorted":            null,
  "Truly Pineapple":           "Truly Hard Seltzer",
  "Truly Strawberry":          "Truly Hard Seltzer",
  "Truly Wild Berry":          "Truly Hard Seltzer",
  "White Claw Black Cherry":   "White Claw Hard Seltzer",
};

const WINE_WIKI = {
  "Alamos Malbec":                 "Malbec",
  "Apothic Crush":                 "Apothic (wine)",
  "Barefoot Cabernet":             "Barefoot Cellars",
  "Barefoot Chardonnay":           "Barefoot Cellars",
  "Barefoot Merlot":               "Barefoot Cellars",
  "Barefoot Pinot Grigio":         "Barefoot Cellars",
  "Barefoot White Zinfandel":      "Barefoot Cellars",
  "Chateau Ste Michelle Reisling": "Château Ste. Michelle",
  "Cupcake Moscato Split":         "Cupcake Vineyards",
  "Ecco Domani Pinot Grigio":      "Pinot grigio/Pinot gris",
  "House Champagne":               "Champagne",
  "Kendall Jackson Chardonnay":    "Kendall-Jackson Winery",
  "La Marca Prosecco Split":       "Prosecco",
  "Mumm Napa Split":               "G.H. Mumm",
  "Oyster Bay Pinot Noir":         "Pinot noir",
  "Prophecy Rose":                 "Rosé",
  "Seven Daughters Moscato":       "Moscato d'Asti",
  "Starborough Sauvignon Blanc":   "Sauvignon blanc",
  "Story Point Cabernet":          "Cabernet Sauvignon",
  "Storypoint Cabernet":           "Cabernet Sauvignon",
};

async function fetchWikiImage(articleTitle) {
  if (!articleTitle) return null;
  const key = `wiki:${articleTitle}`;
  if (key in cache) return cache[key];
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(articleTitle)}&prop=pageimages&pithumbsize=800&piprop=thumbnail&format=json&origin=*`;
    const res  = await fetch(url);
    const data = await res.json();
    const pages = Object.values(data.query?.pages || {});
    const thumb = pages[0]?.thumbnail?.source ?? null;
    cache[key] = thumb;
    return thumb;
  } catch {
    cache[key] = null;
    return null;
  }
}

const BEER_LOCAL = {
  "Dogfish Head 60 Minute": "/beers/dogfish-60.jpg",
};

export async function getBeerImage(rawName) {
  const name = rawName.replace(/^D /, "").trim();
  if (BEER_LOCAL[name]) return BEER_LOCAL[name];
  const article = BEER_WIKI[name];
  if (article === null) return null;
  return fetchWikiImage(article ?? null);
}

export async function getWineImage(rawName) {
  const name = rawName.replace(/^[GB] /, "").trim();
  const article = WINE_WIKI[name];
  if (article === null) return null;
  return fetchWikiImage(article ?? null);
}

// ─── Liquor bottle images (manually sourced) ──────────────────────────────────
// Add URLs as you source them via the Image Manager page.
// Keys must match brand names exactly as in gunthers.js LIQUOR data.
export const LIQUOR_IMAGES = {
  "Absolut": "https://static.specsonline.com/wp-content/uploads/2025/08/083522900060.jpg",
  "Absolut Citron": "https://static.specsonline.com/wp-content/uploads/2023/11/083522900160-300x300.jpg",
  "Absolut Vanil": "",
  "Aspen": "https://static.specsonline.com/wp-content/uploads/2024/10/085004943100.jpg",
  "Deep Eddy Lemon": "https://static.specsonline.com/wp-content/uploads/2021/07/085606500240-300x300.jpg",
  "Deep Eddy Lime": "https://static.specsonline.com/wp-content/uploads/2021/07/085606500230-300x300.jpg",
  "Deep Eddy Peach": "https://static.specsonline.com/wp-content/uploads/2021/07/085606500230-300x300.jpg",
  "Deep Eddy Ruby Red": "https://static.specsonline.com/wp-content/uploads/2021/08/085606500211-300x300.jpg",
  "Deep Eddy Sweet Tea": "https://static.specsonline.com/wp-content/uploads/2021/07/005606500206-300x300.jpg",
  "Grey Goose": "https://static.specsonline.com/wp-content/uploads/2023/04/008048028005-300x300.jpg",
  "Ketel One": "https://static.specsonline.com/wp-content/uploads/2021/07/008515680368.jpg",
  "Skyy": "https://static.specsonline.com/wp-content/uploads/2015/08/072105901750-1-300x300.jpg",
  "Skyy Raspberry": "https://static.specsonline.com/wp-content/uploads/2022/01/072105963750-300x300.jpg",
  "Skyy Watermelon": "",
  "Stoli": "https://static.specsonline.com/wp-content/uploads/2023/11/081175102004-300x300.jpg",
  "Svedka Mango Pineapple": "https://static.specsonline.com/wp-content/uploads/2021/08/061776815117.jpg",
  "Three Olives": "https://static.specsonline.com/wp-content/uploads/2024/07/081153801182-300x300.jpg",
  "Tito's": "https://static.specsonline.com/wp-content/uploads/2023/05/061994700003-300x300.jpg",
  "Nikola": "https://static.specsonline.com/wp-content/uploads/2018/11/008800401042-300x300.jpg",
  "Western Son Blueberry": "https://static.specsonline.com/wp-content/uploads/2020/10/085968500503.jpg",
  "Western Son Cucumber": "https://static.specsonline.com/wp-content/uploads/2020/10/085968500536.jpg",
  "Western Son Peach": "https://static.specsonline.com/wp-content/uploads/2020/10/085968500501.jpg",
  "Western Son Prickly Pear": "https://static.specsonline.com/wp-content/uploads/2020/10/085968500502.jpg",
  "Western Son Watermelon": "https://static.specsonline.com/wp-content/uploads/2020/10/085968500583.jpg",
  "Wheatley": "https://static.specsonline.com/wp-content/uploads/2021/11/008800402783.jpg",
  "Beefeater": "https://static.specsonline.com/wp-content/uploads/2023/11/008954033347-300x300.jpg",
  "Bombay Sapphire": "https://static.specsonline.com/wp-content/uploads/2023/11/008144011301-300x300.jpg",
  "Fords": "https://static.specsonline.com/wp-content/uploads/2018/11/073995897400-300x300.jpg",
  "Hendrick's": "https://static.specsonline.com/wp-content/uploads/2023/03/008366499043-300x300.jpg",
  "Tanqueray": "https://static.specsonline.com/wp-content/uploads/2021/08/008811011050.jpg",
  "Mr. Boston": "https://static.specsonline.com/wp-content/uploads/2021/08/008900051243-300x300.jpg",
  "Bacardi": "https://static.specsonline.com/wp-content/uploads/2023/04/008048001520-300x300.jpg",
  "Bacardi Lime": "https://static.specsonline.com/wp-content/uploads/2023/04/008048098428-300x300.jpg",
  "Bacardi Raspberry": "https://static.specsonline.com/wp-content/uploads/2023/11/008048000674-300x300.jpg",
  "Captain Morgan": "https://static.specsonline.com/wp-content/uploads/2025/02/008700000271.jpg",
  "Cruzan Strawberry": "https://static.specsonline.com/wp-content/uploads/2024/03/008068600724-300x300.jpg",
  "Malibu": "https://static.specsonline.com/wp-content/uploads/2023/11/008676751302-300x300.jpg",
  "Myers Dark": "https://static.specsonline.com/wp-content/uploads/2021/11/008800403654-300x300.jpg",
  "Parrot Bay Coconut Rum": "https://static.specsonline.com/wp-content/uploads/2024/02/008200000228-1-300x300.jpg",
  "Calypso": "https://static.specsonline.com/wp-content/uploads/2021/11/008567656401-300x300.jpg",
  "1800 Reposado": "https://static.specsonline.com/wp-content/uploads/2024/03/081153801021-300x300.jpg",
  "Altos Plata": "https://static.specsonline.com/wp-content/uploads/2025/08/008043210825.jpg",
  "Camarena Silver": "https://static.specsonline.com/wp-content/uploads/2022/05/008500000881-300x300.jpg",
  "Cantera Negra Coffee": "",
  "Casamigos Blanco": "https://static.specsonline.com/wp-content/uploads/2023/11/008308945016-300x300.jpg",
  "Casamigos Reposado": "https://static.specsonline.com/wp-content/uploads/2023/11/085672400621-300x300.jpg",
  "DJ 1942": "https://static.specsonline.com/wp-content/uploads/reload/067454500032-300x300.jpg",
  "Don Julio Silver": "https://static.specsonline.com/wp-content/uploads/reload/067454500062-300x300.jpg",
  "Espolon Silver": "",
  "Flecha Azul Blanco": "https://static.specsonline.com/wp-content/uploads/2024/11/085001352400-300x300.jpg",
  "Ghost Tequila": "https://static.specsonline.com/wp-content/uploads/2025/05/085005634104.jpg",
  "Hornitos Plata": "https://static.specsonline.com/wp-content/uploads/2022/10/008068683534-1-300x300.jpg",
  "Jose Cuervo": "https://static.specsonline.com/wp-content/uploads/2024/03/008200000729-300x300.jpg",
  "Patron Silver": "https://static.specsonline.com/wp-content/uploads/2023/11/072173300094-300x300.jpg",
  "Teramana": "https://static.specsonline.com/wp-content/uploads/2026/02/085001564002.jpg",
  "Torada": "https://static.specsonline.com/wp-content/uploads/2023/06/008800403442-1-300x300.jpg",
  "Angel's Envy": "https://static.specsonline.com/wp-content/uploads/2023/04/085004700300-300x300.jpg",
  "Buffalo Trace": "https://static.specsonline.com/wp-content/uploads/2024/11/008024400923-300x300.jpg",
  "Bulleit Rye": "https://static.specsonline.com/wp-content/uploads/2021/11/008200076607-300x300.jpg",
  "Canadian Club": "https://static.specsonline.com/wp-content/uploads/2020/10/007800014645-300x300.jpg",
  "Crown Chocolate": "https://static.specsonline.com/wp-content/uploads/2025/11/008200081105.jpg",
  "Crown Peach": "https://static.specsonline.com/wp-content/uploads/2021/07/008200078291.jpg",
  "Crown Royal": "https://static.specsonline.com/wp-content/uploads/2023/11/008700070060-300x300.jpg",
  "Eagle Rare": "",
  "Gentleman's Jack": "https://static.specsonline.com/wp-content/uploads/2025/05/008218408400.jpg",
  "Howler Head": "https://static.specsonline.com/wp-content/uploads/2025/10/085000334765.jpg",
  "Jack Apple": "https://static.specsonline.com/wp-content/uploads/2025/05/008218400437.jpg",
  "Jack Daniels": "https://static.specsonline.com/wp-content/uploads/2025/05/008218409042.jpg",
  "Jack Honey": "https://static.specsonline.com/wp-content/uploads/2025/05/008218400035.jpg",
  "Jameson": "https://static.specsonline.com/wp-content/uploads/2023/11/008700000236-1-300x300.jpg",
  "Jameson Black Barrel": "https://static.specsonline.com/wp-content/uploads/2025/04/008043210726.jpg",
  "Jameson Orange": "https://static.specsonline.com/wp-content/uploads/2022/02/008043211733-300x300.jpg",
  "Jim Beam": "https://static.specsonline.com/wp-content/uploads/2025/02/008068600190.jpg",
  "Knob Creek Rye": "https://static.specsonline.com/wp-content/uploads/2023/10/008068600442-300x300.jpg",
  "Kurvball": "https://static.specsonline.com/wp-content/uploads/2022/10/085188400536.jpg",
  "Maker's Mark": "https://static.specsonline.com/wp-content/uploads/2022/10/008524613941-1-300x300.jpg",
  "Paddy's": "https://static.specsonline.com/wp-content/uploads/2023/11/088004027131-300x300.jpg",
  "Rich and Rare": "https://static.specsonline.com/wp-content/uploads/2021/11/008800400900-300x300.jpg",
  "Skrewball": "https://static.specsonline.com/wp-content/uploads/2024/05/086026500240-300x300.jpg",
  "Southern Comfort": "https://static.specsonline.com/wp-content/uploads/2021/11/008800402670-300x300.jpg",
  "TX Whiskey": "https://static.specsonline.com/wp-content/uploads/2021/11/085837900302.jpg",
  "Royal Crown": "https://static.specsonline.com/wp-content/uploads/2023/11/008700070060-300x300.jpg",
  "Wild Turkey": "https://static.specsonline.com/wp-content/uploads/2022/04/072105989175-300x300.jpg",
  "Woodford Reserve": "https://static.specsonline.com/wp-content/uploads/2025/11/008112801316.jpg",
  "Chivas": "https://static.specsonline.com/wp-content/uploads/2023/11/008700040035-300x300.jpg",
  "Dewars": "https://static.specsonline.com/wp-content/uploads/2023/11/008048023000-300x300.jpg",
  "Glenlivet 12": "https://static.specsonline.com/wp-content/uploads/2023/11/008700000709-1-300x300.jpg",
  "Hennessy": "https://static.specsonline.com/wp-content/uploads/2023/11/008811015055-1-300x300.jpg",
  "JW Black": "https://static.specsonline.com/wp-content/uploads/2021/08/008811001130.jpg",
  "JW Red": "https://static.specsonline.com/wp-content/uploads/2021/11/008807616316.jpg",
  "Loch Lomond 12yr": "",
  "Monkey Shoulder": "https://static.specsonline.com/wp-content/uploads/2023/03/008366487254-300x300.jpg",
  "The Macallan 12": "https://static.specsonline.com/wp-content/uploads/2024/09/081206602159-300x300.jpg",
  "Well Scotch": "https://static.specsonline.com/wp-content/uploads/2023/11/008048023000-300x300.jpg",
  "Amaretto": "https://static.specsonline.com/wp-content/uploads/2023/11/005003701451-300x300.jpg",
  "Aperol": "https://static.specsonline.com/wp-content/uploads/2022/01/072105900131-300x300.jpg",
  "Campari": "https://static.specsonline.com/wp-content/uploads/2023/11/002105904100-300x300.jpg",
  "Fireball Blazing Apple": "",
  "Fireball": "https://static.specsonline.com/wp-content/uploads/2021/11/008800414470-300x300.jpg",
  "Frangelico": "https://static.specsonline.com/wp-content/uploads/2023/07/072105998750-300x300.jpg",
  "Goldschlager": "https://static.specsonline.com/wp-content/uploads/2021/11/008676750012-300x300.jpg",
  "Grand Marnier": "https://static.specsonline.com/wp-content/uploads/2022/01/064918890047-300x300.jpg",
  "Hennessy VSOP": "https://static.specsonline.com/wp-content/uploads/2025/11/008811015103.jpg",
  "House Irish Cream": "https://static.specsonline.com/wp-content/uploads/2021/11/008676721006-300x300.jpg",
  "Jager Cold Brew": "https://static.specsonline.com/wp-content/uploads/2023/11/008308900013-300x300.jpg",
  "Jagermeister": "https://static.specsonline.com/wp-content/uploads/2023/07/008308952400-300x300.jpg",
  "Kamora Coffee Liqueur": "https://static.specsonline.com/wp-content/uploads/2023/07/008711600884-300x300.jpg",
  "Peach Schnapps": "https://static.specsonline.com/wp-content/uploads/2025/06/008068636520.jpg",
  "Rumpleminze": "",
  "St. Germain": "https://static.specsonline.com/wp-content/uploads/2023/04/008048000469.jpg",
  "Tuaca": "https://static.specsonline.com/wp-content/uploads/2023/11/008800402603-300x300.jpg",
  "Watermelon Schnapps": "https://static.specsonline.com/wp-content/uploads/2021/07/008068639620-300x300.jpg",
};

export const getLiquorImage = (name) => LIQUOR_IMAGES[name] || null;