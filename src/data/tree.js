// Spirit Family Tree
// Structure: root → children (recursive) — matches the diagram's expected shape

export const TREE = {
  id: "root",
  label: "ALCOHOL",
  sublabel: "All Distilled Spirits",
  color: "#C9A84C",
  info: "All alcoholic beverages begin with fermentation — yeast converting sugar into alcohol. Distilled spirits take this further, using heat to concentrate and purify the alcohol.",
  children: [
    {
      id: "fermented",
      label: "FERMENTED",
      sublabel: "Not distilled",
      color: "#6B8E3E",
      info: "Fermented only — beer, wine, cider. Typically 3–15% ABV. No distillation step.",
      children: [
        {
          id: "beer", label: "BEER", sublabel: "Grain + hops", color: "#D4820A",
          info: "Malted barley, hops, water, yeast. Ales vs lagers based on yeast type. 4–8% ABV typically.",
          children: [
            {
              id: "lager", label: "LAGER", sublabel: "Clean · cold-fermented", color: "#c87020",
              info: "Cold-fermented with bottom-fermenting yeast. Smooth, clean, crisp. Most popular beer style worldwide.",
              children: [
                { id: "light-lager", label: "LIGHT LAGER",  sublabel: "Crisp · low-cal",       color: "#d49030", info: "Low bitterness, light body, very approachable. The dominant American style.", brands: ["Bud Light", "Coors Light", "Miller Lite", "Lone Star", "Michelob Ultra", "Yuengling Flight", "Shiner Lt Blonde", "Love St", "PBR", "Dos Equis", "Heineken", "Heineken Silver", "Stella Artois", "Pacifico", "Corona", "Corona Premier", "Harp"] },
                { id: "dark-lager",  label: "DARK LAGER",   sublabel: "Malty · smooth",         color: "#b86020", info: "More malt character than light lager. Rich, smooth, slightly sweet without heavy bitterness.", brands: ["Budweiser", "Modelo Especial", "Yuengling Lager", "Sam Adams Boston Lager"] },
                { id: "bock",        label: "BOCK",         sublabel: "Strong · malty",         color: "#a05020", info: "Strong German lager style. Malty, slightly sweet, smooth. Traditionally brewed for special occasions.", brands: ["Shiner Bock", "St. Arnold Spring Bock"] },
                { id: "pilsner",     label: "PILSNER",      sublabel: "Hoppy · golden",         color: "#c8a030", info: "Czech/German origin. More hop-forward than standard lager. Crisp and floral. Template for most macro lagers.", brands: [] },
              ]
            },
            {
              id: "ale", label: "ALE", sublabel: "Complex · warm-fermented", color: "#b86020",
              info: "Warm-fermented with top-fermenting yeast. Faster, more diverse, more complex than lagers.",
              children: [
                { id: "ipa",       label: "IPA",         sublabel: "Hoppy · bitter",       color: "#d47820", info: "India Pale Ale. High hop content. West Coast = bitter/resinous. Hazy/NEIPA = juicy/soft. Most popular craft style.", brands: ["Dogfish Head 60 Minute", "Dogfish Head 90 Minute", "Ghost in the Machine", "Hopadillo", "Lagunitas IPA", "Real Ale Fresh Kicks", "Sierra Nevada Hazy Little Thing", "St. Arnold Art Car IPA", "Stone IPA"] },
                { id: "stout",     label: "STOUT",       sublabel: "Dark · roasty",        color: "#4a3020", info: "Brewed with roasted barley. Deep black color, coffee and chocolate notes. Dry (Irish) or sweet (milk stout).", brands: ["Guinness"] },
                { id: "porter",    label: "PORTER",      sublabel: "Dark · chocolate",     color: "#5a3828", info: "Dark ale with roasted malt. Lighter than stout. Chocolate, coffee, toffee notes.", brands: ["Sam Smith Chocolate Porter"] },
                { id: "wheat",     label: "WHEAT BEER",  sublabel: "Hazy · citrusy",       color: "#c8a840", info: "Made with large portion of wheat. Hazy, soft, often citrus or banana notes.", brands: ["Blue Moon", "Sunny Little Thing"] },
                { id: "amber-ale", label: "AMBER / RED", sublabel: "Malty · caramel",      color: "#a06030", info: "Malt-forward with caramel sweetness. Smooth, easy-drinking. British and Irish ales fall here.", brands: ["Boddington's", "Newcastle", "Smithwick's"] },
                { id: "seasonal",  label: "SEASONAL",    sublabel: "Limited · rotating",   color: "#8B6E3E", info: "Brewed for specific seasons — Oktoberfest, pumpkin ales, spring bocks, holiday releases.", brands: ["Karbach Yuletide Confessions", "Pumpkinator", "Shiner Cheer", "Shiner Oktoberfest", "St. Arnold Oktoberfest"] },
              ]
            },
            {
              id: "cider", label: "CIDER", sublabel: "Fermented apples", color: "#6B8E3E",
              info: "Fermented apple juice. Naturally gluten-free. Ranges from bone dry to very sweet.",
              children: [
                { id: "dry-cider",   label: "DRY CIDER",   sublabel: "Tart · crisp",        color: "#6B9E2E", info: "Minimal residual sugar. Tart, wine-like apple character. The most traditional cider style.", brands: ["Austin Eastcider Original", "Strongbow"] },
                { id: "fruit-cider", label: "FRUIT CIDER", sublabel: "Flavored · sweeter",  color: "#8B7E3E", info: "Apple cider base with added fruit flavors. More approachable and sweet.", brands: ["Angry Orchard", "Angry Orchard Mango Peach", "Austin Eastcider Blood Orange", "St. Arnold Strawberry Cider"] },
              ]
            },
            {
              id: "seltzer", label: "HARD SELTZER", sublabel: "Light · low-cal", color: "#4a90a4",
              info: "Fermented sugar base, carbonated, flavored. Very low calorie. Dominated the market in the 2010s.",
              children: [
                { id: "hard-seltzer-plain", label: "SELTZER",  sublabel: "Crisp · flavored",    color: "#4a98b4", info: "Clean fermented sugar base with natural flavors. Very light. White Claw, Truly, High Noon.", brands: ["White Claw Black Cherry", "Truly Pineapple", "Truly Strawberry", "Truly Wild Berry", "High Noon Assorted", "Carbliss Assorted", "Nutrl Assorted"] },
                { id: "hard-tea",           label: "HARD TEA", sublabel: "Tea-flavored · malt", color: "#7a7840", info: "Malt base with real tea flavor. Sweeter than seltzer. Twisted Tea is the category-defining brand.", brands: ["Twisted Tea"] },
                { id: "rtd",                label: "RTD",       sublabel: "Ready-to-drink",     color: "#7a6060", info: "Pre-mixed cocktails in a can. Liquor + mixer already combined.", brands: ["JD Down Home Punch"] },
              ]
            },
          ]
        },
        {
          id: "wine", label: "WINE", sublabel: "Fermented grapes", color: "#8B1A35",
          info: "Fermented grape juice. Red, white, rosé, sparkling. Region, grape variety, and winemaking style define character.",
          children: [
            {
              id: "red-wine", label: "RED WINE", sublabel: "Full-bodied · tannic", color: "#8B1A35",
              info: "Fermented with grape skins for color and tannins. Bold, structured, food-friendly. Served at room temp.",
              children: [
                { id: "cabernet",   label: "CABERNET",       sublabel: "Bold · tannic · dark fruit",  color: "#7a1828", info: "Cabernet Sauvignon. King of reds. Full body, high tannins, dark fruit (blackberry, plum). Needs food.", brands: ["Barefoot Cabernet", "Storypoint Cabernet"] },
                { id: "merlot",     label: "MERLOT",         sublabel: "Soft · plum · approachable",  color: "#8a2030", info: "Softer than Cab Sauv. Plum, chocolate, easy tannins. Great entry-point red wine.", brands: ["Barefoot Merlot"] },
                { id: "malbec",     label: "MALBEC",         sublabel: "Juicy · violet · Argentina",  color: "#6a1840", info: "Argentine specialty. Deep purple, juicy dark fruit, velvety texture. Very food-friendly.", brands: ["Alamos Malbec"] },
                { id: "pinot-noir", label: "PINOT NOIR",     sublabel: "Light · silky · cherry",      color: "#a02830", info: "Lightest red in body. Cherry, earth, silk texture. The most delicate and food-versatile red.", brands: ["Oyster Bay Pinot Noir"] },
                { id: "red-blend",  label: "RED BLEND",      sublabel: "Mixed grapes · approachable", color: "#902838", info: "Blended from multiple varietals for complexity and consistency. Often softer and approachable.", brands: ["Apothic Crush"] },
              ]
            },
            {
              id: "white-wine", label: "WHITE WINE", sublabel: "Crisp · aromatic", color: "#c8b040",
              info: "Fermented without skins. Light, fresh, aromatic. Served chilled. Best with seafood, poultry, light dishes.",
              children: [
                { id: "chardonnay",      label: "CHARDONNAY",      sublabel: "Rich · buttery · oaky",   color: "#d4b840", info: "World's most popular white. Oaked = buttery, vanilla. Unoaked = crisp, citrus.", brands: ["Barefoot Chardonnay", "Kendall Jackson Chardonnay"] },
                { id: "pinot-grigio",    label: "PINOT GRIGIO",    sublabel: "Light · crisp · dry",     color: "#c8c060", info: "Italian style — very dry, light, clean. Refreshing, easy-drinking. Great with seafood.", brands: ["Barefoot Pinot Grigio", "Ecco Domani Pinot Grigio"] },
                { id: "sauvignon-blanc", label: "SAUVIGNON BLANC", sublabel: "Grassy · citrus · dry",   color: "#b8b848", info: "Bright, high-acid, herbaceous. Green apple, lime, grass. New Zealand is the benchmark.", brands: ["Starborough Sauvignon Blanc"] },
                { id: "riesling",        label: "RIESLING",        sublabel: "Floral · off-dry",        color: "#d0c838", info: "German origin. Intensely aromatic. Can range dry to very sweet. High acid balances sweetness.", brands: ["Chateau Ste Michelle Riesling"] },
                { id: "moscato",         label: "MOSCATO",         sublabel: "Sweet · peachy · low ABV",color: "#c8a840", info: "Sweet, low-alcohol Italian white. Peach, apricot, honey. Very approachable crowd-pleaser.", brands: ["Seven Daughters Moscato", "Cupcake Moscato Split"] },
              ]
            },
            {
              id: "rose-wine", label: "ROSÉ", sublabel: "Pink · refreshing", color: "#e07890",
              info: "Brief skin contact gives pink color. Dry to off-dry. Fruit-forward and incredibly food-versatile.",
              children: [
                { id: "dry-rose",  label: "DRY ROSÉ",        sublabel: "Crisp · strawberry · dry", color: "#d06880", info: "Bone-dry style. Provence, France is the benchmark. Strawberry, peach, mineral finish.", brands: ["Prophecy Rosé"] },
                { id: "white-zin", label: "WHITE ZINFANDEL", sublabel: "Sweet · blush · easy",      color: "#e89098", info: "Off-dry to sweet blush wine. Pink color from Zinfandel grapes. Approachable popular pour.", brands: ["Barefoot White Zinfandel"] },
              ]
            },
            {
              id: "sparkling-wine", label: "SPARKLING", sublabel: "Bubbles · celebratory", color: "#a0d0e0",
              info: "Secondary fermentation creates CO2 bubbles. Ranges from brut (bone dry) to doux (very sweet).",
              children: [
                { id: "champagne", label: "CHAMPAGNE", sublabel: "France · prestige · brut",  color: "#b0d8e8", info: "From Champagne, France only. Traditional method. Toasty, citrus, brioche. The luxury standard.", brands: ["House Champagne", "Mumm Napa Split"] },
                { id: "prosecco",  label: "PROSECCO",  sublabel: "Italy · fruity · light",    color: "#a8d0d8", info: "Italian sparkling wine. Tank-fermented. Lighter, fruitier, less toasty than Champagne.", brands: ["La Marca Prosecco Split"] },
              ]
            },
          ]
        },
        {
          id: "mocktails", label: "MOCKTAILS", sublabel: "Zero-proof", color: "#4A90A4",
          info: "Alcohol-free drinks crafted with the same care as cocktails. Complex, balanced, and bartender-made.",
          brands: ["0.0 Michelada", "Cinderella", "Cuddles on Gunthers St.", "Juice Spritzer", "Lavender Grapefruit Mocktail", "Michelada/Virgin Mary", "No-Jito", "Red Bull Watermelon Wave", "Rosemary Smash", "Sober Sunrise", "Sweet Sunrise", "Virgin Mary", "Virgin Mojito", "Wild Berry Spritz"]
        },
      ]
    },
    {
      id: "distilled",
      label: "DISTILLED SPIRITS",
      sublabel: "Fermented + heat",
      color: "#C9A84C",
      info: "Distillation concentrates alcohol by boiling and recapturing vapor. Produces spirits 20–95% ABV. The base ingredient and aging define the final spirit.",
      children: [
        {
          id: "grain",
          label: "GRAIN-BASED",
          sublabel: "From grains",
          color: "#D4820A",
          info: "Made from fermented grain mash — barley, corn, rye, wheat. This family produces whiskey, vodka, and gin.",
          children: [
            {
              id: "whiskey",
              label: "WHISKEY",
              sublabel: "Aged in oak",
              color: "#c87830",
              info: "Grain spirit aged in oak barrels. The grain bill, barrel type, and region define the style. Must be aged — unaged grain spirit is just moonshine.",
              children: [
                { id: "bourbon",          label: "BOURBON",          sublabel: "≥51% corn · USA · new oak",      color: "#D4820A", info: "American whiskey. ≥51% corn, new charred oak barrels, no additives. Sweet, vanilla, caramel. Does NOT have to be from Kentucky.",                                             brands: ["Buffalo Trace", "Maker's Mark", "Eagle Rare", "Angel's Envy", "Woodford Reserve", "Wild Turkey", "Jim Beam", "Howler Head", "Royal Crown (well)"] },
                { id: "tennessee",        label: "TENNESSEE",        sublabel: "Bourbon + charcoal filter",       color: "#b86820", info: "Meets all bourbon rules BUT is filtered through maple charcoal (Lincoln County Process) before barreling. This extra step disqualifies it as bourbon.",              brands: ["Jack Daniels", "Gentleman's Jack", "Jack Apple", "Jack Honey"] },
                { id: "rye",              label: "RYE WHISKEY",      sublabel: "≥51% rye · spicy",               color: "#a06020", info: "High rye content creates bold, spicy, peppery flavor. Drier than bourbon. Classic base for Manhattans and Old Fashioneds.",                                         brands: ["Bulleit Rye", "Knob Creek Rye"] },
                { id: "scotch",           label: "SCOTCH",           sublabel: "Scotland · used oak · 3yr",      color: "#9a7a30", info: "Made in Scotland, aged ≥3 years in used oak (often old bourbon barrels). Malted barley base. Islay Scotches are famously peaty/smoky.",                         brands: ["Chivas", "Dewars", "Glenlivet 12", "JW Black", "JW Red", "Loch Lomond 12yr", "Monkey Shoulder", "The Macallan 12", "Clan McGregor (well)"] },
                { id: "irish",            label: "IRISH",            sublabel: "Ireland · triple distilled",     color: "#4a9a60", info: "Made in Ireland, aged ≥3 years. Usually triple-distilled for exceptional smoothness. Lighter and more approachable than Scotch.",                                  brands: ["Jameson", "Jameson Black Barrel", "Jameson Orange", "Paddy's"] },
                { id: "canadian",         label: "CANADIAN",         sublabel: "Canada · light blend",           color: "#4a8ab8", info: "Made in Canada, aged ≥3 years. Usually a blend of grains. Lighter-bodied than American styles.",                                                                   brands: ["Crown Royal", "Crown Peach", "Crown Chocolate", "Canadian Club", "Rich and Rare"] },
                { id: "flavored_whiskey", label: "FLAVORED WHISKEY", sublabel: "Whiskey + additives",            color: "#8060b8", info: "A base whiskey with added natural or artificial flavors. Cannot be called 'straight' whiskey. Often lower ABV. More approachable, less traditional.",             brands: ["Fireball", "Fireball Blazing Apple", "Skrewball", "Southern Comfort", "Kurvball", "TX Whiskey"] },
              ]
            },
            {
              id: "vodka",
              label: "VODKA",
              sublabel: "Neutral · no aging",
              color: "#a0b8d0",
              info: "Highly distilled neutral spirit. Intentionally flavorless. Made from grain (or potatoes, grapes). Filtered repeatedly for purity. No aging required.",
              brands: ["Absolut", "Absolut Citron", "Absolut Vanil", "Aspen", "Deep Eddy Lemon", "Deep Eddy Lime", "Deep Eddy Peach", "Deep Eddy Ruby Red", "Deep Eddy Sweet Tea", "Grey Goose", "Ketel One", "Skyy", "Skyy Raspberry", "Skyy Watermelon", "Stoli", "Svedka Mango Pineapple", "Three Olives", "Tito's", "Nikola (well)", "Western Son Blueberry", "Western Son Cucumber", "Western Son Peach", "Western Son Prickly Pear", "Western Son Watermelon", "Wheatley"]
            },
            {
              id: "gin",
              label: "GIN",
              sublabel: "Vodka + botanicals",
              color: "#60a888",
              info: "Essentially neutral grain spirit re-distilled with botanicals. Juniper is mandatory — it's what makes gin, gin. Dozens of other botanicals add complexity.",
              brands: ["Beefeater", "Bombay Sapphire", "Fords", "Hendrick's", "Tanqueray", "Mr. Boston (well)"]
            },
          ]
        },
        {
          id: "sugarcane",
          label: "SUGARCANE-BASED",
          sublabel: "From cane / molasses",
          color: "#6B8E3E",
          info: "Distilled from sugarcane juice or molasses (a byproduct of sugar refining). Produces rum, cachaça, and agricole.",
          children: [
            { id: "rum",     label: "RUM",     sublabel: "Molasses · Caribbean",    color: "#5a8a30", info: "Made from molasses or sugarcane juice. Aged in used oak barrels. Light rums are filtered for neutrality; dark rums are aged longer for complexity.", brands: ["Bacardi", "Bacardi Lime", "Bacardi Raspberry", "Captain Morgan", "Cruzan Strawberry", "Myers Dark", "Malibu", "Parrot Bay Coconut Rum", "Calypso (well)"] },
            { id: "cachaca", label: "CACHAÇA", sublabel: "Fresh cane juice · Brazil", color: "#3a7a20", info: "Brazilian spirit made from fresh sugarcane juice (not molasses). Earthier and more vegetal than rum. Base of the Caipirinha.", brands: [] },
          ]
        },
        {
          id: "agave",
          label: "AGAVE-BASED",
          sublabel: "From agave plant",
          color: "#609060",
          info: "Distilled from cooked agave hearts (piñas). The agave species and cooking method define the final spirit.",
          children: [
            { id: "tequila", label: "TEQUILA", sublabel: "Blue agave · Mexico",  color: "#70a850", info: "Made exclusively from blue Weber agave in specific Mexican regions (mainly Jalisco). Blanco = unaged, Reposado = 2–12mo, Añejo = 1–3yr.", brands: ["1800 Reposado", "Altos Plata", "Camarena Silver", "Cantera Negra Coffee", "Casamigos Blanco", "Casamigos Reposado", "DJ 1942", "Don Julio Silver", "Espolon Silver", "Flecha Azul Blanco", "Ghost Tequila", "Hornitos Plata", "Jose Cuervo", "Patron Silver", "Teramana", "Torada (well)"] },
            { id: "mezcal",  label: "MEZCAL",  sublabel: "Any agave · smoky",    color: "#508840", info: "Can use any of 40+ agave species. Piñas are roasted in underground pits, creating signature smokiness. All tequila is mezcal — not vice versa.", brands: [] },
          ]
        },
        {
          id: "grape",
          label: "GRAPE-BASED",
          sublabel: "Distilled wine",
          color: "#8B4060",
          info: "Wine that has been distilled into a stronger spirit. Brandy, cognac, armagnac, grappa, and pisco all fall here.",
          children: [
            { id: "cognac", label: "COGNAC", sublabel: "Cognac region · France", color: "#c84060", info: "Brandy from the Cognac region of France using specific grapes (mainly Ugni Blanc). Double-distilled in copper pot stills. VS, VSOP, XO aging grades.", brands: ["Hennessy", "Hennessy VSOP"] },
            { id: "brandy", label: "BRANDY", sublabel: "Distilled wine · global", color: "#a83050", info: "Any spirit distilled from wine or fruit juice. Cognac is the most famous type. Served as a digestif or in cocktails like Sidecars.", brands: [] },
            { id: "pisco",  label: "PISCO",  sublabel: "Peru / Chile",            color: "#883040", info: "South American grape brandy. Unaged, with intense fruity character. Base of the Pisco Sour.", brands: [] },
          ]
        },
        {
          id: "cocktails", label: "COCKTAILS", sublabel: "Gunthers's menu", color: "#C9A84C",
          info: "Gunthers's full specialty cocktail menu — house originals and seasonal drinks built from the spirits on our menu.",
          children: [
            { id: "cocktails-classic",   label: "CLASSICS",   sublabel: "Timeless builds",    color: "#b8942a", info: "The foundational cocktails every bartender knows — Margarita, Old Fashioned, Manhattan, Negroni, and more.", brands: ["Amaretto Sour", "Appletini", "Bay Breeze", "Black Russian", "Bloody Mary", "Blue Hawaiian", "Cape Cod", "Chocolate Martini", "Cosmopolitan", "Cubra Libra", "Fuzzy Navel", "Gimlet", "Greyhound", "Hurricane", "Irish Coffee", "Kahlua & Cream", "Kahlua Coffee", "L.I. Iced Tea", "Lemon Drop Martini", "Lynchburg Lemonade", "Madras", "Manhattan", "Margarita", "Martini", "Melon Ball", "Mimosa", "Mind Eraser", "Moscow Mule", "Negroni", "Old Fashioned", "Ranch Water", "Raspberry L.I. Tea", "Tequila Sunrise", "Whiskey Sour", "White Russian"] },
            { id: "cocktails-specialty", label: "SPECIALTY",  sublabel: "Gunthers's originals",  color: "#a08020", info: "Gunthers's house specialty cocktails — seasonal, signature, and brand-forward builds exclusive to our menu.", brands: ["Altos Strawberry Rita", "Bacardi Superior Mojito", "Belmont Buffalo", "Blackberry Smash", "Boozeberry Punch", "Casamigos Passion Fruit Mint Rita", "Cold Brew Espresso Martini", "Cucumber Cooler", "Espolòn Watermelon Rita", "Firebox Margarita", "Fords Strawberry Gimlet", "Fresh Melon Paloma", "Funky Monkey", "Garrison Brothers Honeydew Highball", "Grand Cadillac Margarita", "Heart Break Martini", "Hibiscus Mule", "Island Time", "Jameson Sangria", "JD Apple Margarita", "Maker's Mark Gold Rush", "Maliblue Bull", "Patrón Perrier Ranch Water", "Perfect Patrón Rita", "Premium LIT", "Prickly Pear Margarita", "Raspberry Cosmo", "Raspberry Piña Colada", "Red Flag Rita", "Side Piece", "Spicy Paloma", "Spicy Pineapple Margarita", "Teremana Ranch Water", "The OG Rita", "Tito's Blueberry Lemonade", "Tropical Heat Rita", "TX Old Fashioned", "Watermelon Cucumber Lemonade", "Whiskey LIT", "Wildberry Sangria"] },
            { id: "cocktails-shots",     label: "SHOTS",      sublabel: "One and done",       color: "#906018", info: "Gunthers's shot menu — layered, shaken, and stirred. Fast, fun, and memorable.", brands: ["2 Liquor", "3 Liquor", "3 Wisemen", "4 Horsemen", "Alabama Slammer", "B-52", "B-53", "Blow Job", "Bull Blaster", "Buttery Nipple", "Chocolate Cake", "Green Tea Shot", "ICB", "Jello Shot", "Kamikazi", "Lemon Drop", "Liquid Cocaine", "Mexican Candy", "Oatmeal Cookie", "Orange Tea", "Paddy's Green Tea Shot", "Pineapple Upside Down Cake", "Purple Hooter", "Red Headed Slut", "Red Snapper", "Screaming Orgasm", "Sex on the Beach"] },
          ]
        },
        {
          id: "liqueurs",
          label: "LIQUEURS",
          sublabel: "Spirit + sugar + flavor",
          color: "#9060b8",
          info: "Any spirit with added sugar (≥2.5%), flavoring, and often lower ABV. The base spirit can be anything. Think of them as flavored, sweetened spirits.",
          children: [
            { id: "herbal",   label: "HERBAL",    sublabel: "Botanical blends", color: "#6060a8", info: "Complex blends of herbs, roots, bark, and spices. Often used as digestifs.",              brands: ["Jagermeister", "Jager Cold Brew", "Aperol", "Campari"] },
            { id: "coffee_l", label: "COFFEE",    sublabel: "Coffee-flavored",  color: "#604020", info: "Coffee extract combined with a base spirit and sugar. Rich and sweet.",                   brands: ["Kamora Coffee Liqueur"] },
            { id: "cream_l",  label: "CREAM",     sublabel: "Dairy + spirit",   color: "#a09080", info: "Whiskey or another spirit emulsified with cream. Must be refrigerated after opening.",    brands: ["House Irish Cream"] },
            { id: "fruit_l",  label: "FRUIT",     sublabel: "Fruit-flavored",   color: "#a04060", info: "Spirits flavored with fruit — berries, citrus, tropical fruits.",                        brands: ["Grand Marnier", "Peach Schnapps", "Watermelon Schnapps", "Malibu"] },
            { id: "nut_l",    label: "NUT / SEED", sublabel: "Nut-flavored",    color: "#806040", info: "Flavored with nuts, seeds, or beans. Rich, warming, dessert-like.",                      brands: ["Frangelico", "Amaretto", "Goldschlager"] },
            { id: "floral_l", label: "FLORAL",    sublabel: "Flower-based",     color: "#9060c0", info: "Delicate floral extracts — elderflower, rose, lavender. Light and aromatic.",            brands: ["St. Germain"] },
            { id: "misc_l",   label: "OTHER",     sublabel: "Misc liqueurs",    color: "#7a7a7a", info: "Unique liqueurs that don't fit neatly into other categories.",                           brands: ["Tuaca", "Rumpleminze", "Goldschlager"] },
          ]
        },
      ]
    },
  ]
};
export const LEGEND_SECTIONS = [
  {
    title: "Spirit Family",
    items: [
      { label: "Grain-Based",      sublabel: "Whiskey, Vodka, Gin",         color: "#D4820A" },
      { label: "Sugarcane-Based",  sublabel: "Rum, Cachaça",                color: "#5a8a30" },
      { label: "Agave-Based",      sublabel: "Tequila, Mezcal",             color: "#70a850" },
      { label: "Grape-Based",      sublabel: "Cognac, Brandy, Pisco",       color: "#c84060" },
      { label: "Liqueurs",         sublabel: "Flavored & sweetened spirits", color: "#9060b8" },
      { label: "Fermented Only",   sublabel: "Beer, Wine, Cider",           color: "#6B8E3E" },
    ]
  },
  {
    title: "Whiskey Sub-Types",
    items: [
      { label: "Bourbon",          sublabel: "≥51% corn · new oak · USA",   color: "#D4820A" },
      { label: "Tennessee",        sublabel: "Bourbon + charcoal filter",   color: "#b86820" },
      { label: "Rye",              sublabel: "≥51% rye · spicy",            color: "#a06020" },
      { label: "Scotch",           sublabel: "Scotland · used oak · 3yr",   color: "#9a7a30" },
      { label: "Irish",            sublabel: "Triple distilled · smooth",   color: "#4a9a60" },
      { label: "Canadian",         sublabel: "Light blend · 3yr",           color: "#4a8ab8" },
      { label: "Flavored",         sublabel: "Whiskey + additives",         color: "#8060b8" },
    ]
  },
  {
    title: "Node Types",
    items: [
      { label: "Has Gunthers's brands", sublabel: "Gold dot in top-right corner", color: "#C9A84C", dot: true },
      { label: "Category only",      sublabel: "No brands on Gunthers's menu",    color: "#5a5470", dot: false },
    ]
  },
];