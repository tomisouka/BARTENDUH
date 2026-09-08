/**
 * spiritTree.js
 * Full hierarchy of how spirits are made and categorized.
 * structure: category → subcategory → styles → gunthersBrands (from our menu)
 */

export const SPIRIT_TREE = [
  {
    id: "fermented",
    label: "Fermented",
    color: "#6B8E3E",
    icon: "🌾",
    desc: "Made by fermenting sugar or starch with yeast — no distillation. Lower ABV.",
    children: [
      {
        id: "beer",
        label: "Beer",
        icon: "🍺",
        desc: "Brewed from malted barley, hops, water, and yeast.",
        children: [
          {
            id: "lager",
            label: "Lager",
            desc: "Cold-fermented, clean and crisp. Most popular beer style worldwide.",
            styles: ["Light Lager", "Dark Lager", "Bock", "Pilsner"],
            gunthersBrands: ["Bud Light", "Coors Light", "Miller Lite", "Modelo Especial", "Shiner Bock", "Dos Equis"],
          },
          {
            id: "ale",
            label: "Ale",
            desc: "Warm-fermented, more complex and fruity than lagers.",
            styles: ["IPA", "Pale Ale", "Stout", "Porter", "Wheat", "Sour"],
            gunthersBrands: ["Guinness", "Blue Moon", "Dogfish Head 60 Minute", "Lagunitas IPA", "St. Arnold Art Car IPA"],
          },
          {
            id: "cider",
            label: "Cider",
            desc: "Fermented apple juice. Naturally gluten-free.",
            styles: ["Dry Cider", "Sweet Cider", "Fruit Cider"],
            gunthersBrands: ["Angry Orchard", "Austin Eastcider Original", "Austin Eastcider Blood Orange", "St. Arnold Strawberry Cider"],
          },
          {
            id: "seltzer",
            label: "Hard Seltzer",
            desc: "Fermented cane sugar or malted barley base with added flavor. Very light and low-calorie.",
            styles: ["Hard Seltzer", "Hard Tea", "RTD"],
            gunthersBrands: ["White Claw", "High Noon", "Truly", "Twisted Tea", "Carbliss"],
          },
        ],
      },
      {
        id: "wine",
        label: "Wine",
        icon: "🍷",
        desc: "Fermented from grapes or other fruit.",
        children: [
          {
            id: "still-wine",
            label: "Still Wine",
            desc: "No carbonation. The classic form of wine.",
            styles: ["Red", "White", "Rosé"],
            gunthersBrands: ["Barefoot (house)"],
          },
          {
            id: "sparkling",
            label: "Sparkling Wine",
            desc: "Secondary fermentation creates bubbles. Champagne is from the Champagne region of France.",
            styles: ["Champagne", "Prosecco", "Cava", "Sparkling Rosé"],
            gunthersBrands: [],
          },
          {
            id: "fortified",
            label: "Fortified Wine",
            desc: "Wine with distilled spirit added to stop fermentation and boost ABV.",
            styles: ["Port", "Sherry", "Vermouth", "Madeira"],
            gunthersBrands: [],
          },
        ],
      },
    ],
  },
  {
    id: "distilled",
    label: "Distilled Spirits",
    color: "#C9A84C",
    icon: "🔥",
    desc: "Fermented liquid is heated and the alcohol vapor is collected and condensed — concentrating the ABV.",
    children: [
      {
        id: "grain",
        label: "Grain Spirits",
        icon: "🌽",
        desc: "Distilled from a fermented grain mash — corn, wheat, rye, barley, or a combination.",
        children: [
          {
            id: "vodka",
            label: "Vodka",
            desc: "Neutral grain spirit, distilled to high proof then diluted. Nearly flavorless by design — the mixer's best friend.",
            rules: ["Must be distilled to at least 95% ABV", "Bottled at minimum 40% ABV", "No aging required"],
            flavorNotes: "Clean, neutral. Subtle grain sweetness depending on base.",
            gunthersBrands: ["Tito's", "Grey Goose", "Ketel One", "Absolut", "Stoli", "Wheatley", "Three Olives", "Skyy", "Nikola (well)"],
            subcategories: [
              { label: "Flavored Vodka", desc: "Natural or artificial flavors added post-distillation.", gunthersBrands: ["Absolut Citron", "Absolut Vanil", "Deep Eddy Lemon", "Deep Eddy Lime", "Deep Eddy Peach", "Deep Eddy Ruby Red", "Deep Eddy Sweet Tea", "Skyy Raspberry", "Skyy Watermelon", "Svedka Mango Pineapple", "Western Son Blueberry", "Western Son Cucumber", "Western Son Peach", "Western Son Prickly Pear", "Western Son Watermelon"] },
            ],
          },
          {
            id: "whiskey",
            label: "Whiskey / Whisky",
            desc: "Aged grain spirit. The grain bill, distillation method, barrel type, and aging location all define the style.",
            rules: ["Must be distilled from grain mash", "Must be aged in oak (duration varies by type)", "Minimum 40% ABV to bottle"],
            flavorNotes: "Vanilla, caramel, oak, spice, smoke — varies widely by style.",
            gunthersBrands: [],
            subcategories: [
              {
                label: "Bourbon",
                desc: "American whiskey. 51%+ corn mash. New charred oak barrels. No minimum age (2yr for 'straight'). Must enter barrel at ≤125 proof.",
                gunthersBrands: ["Jack Daniels", "Maker's Mark", "Woodford Reserve", "Buffalo Trace", "Angel's Envy", "Wild Turkey", "Jim Beam", "Knob Creek Rye", "Bulleit Rye", "TX Whiskey", "Royal Crown (well)"],
              },
              {
                label: "Tennessee Whiskey",
                desc: "Like bourbon but filtered through sugar maple charcoal before aging (Lincoln County Process). Jack Daniel's is the classic.",
                gunthersBrands: ["Jack Daniels", "Gentleman's Jack", "Jack Apple", "Jack Honey"],
              },
              {
                label: "Irish Whiskey",
                desc: "Triple-distilled, smooth and light. Aged 3+ years in used oak. Spelled 'whiskey'.",
                gunthersBrands: ["Jameson", "Jameson Black Barrel", "Jameson Orange", "Paddy's"],
              },
              {
                label: "Scotch Whisky",
                desc: "Made in Scotland, aged 3+ years. Spelled 'whisky'. Often peated/smoky. Single malt = one distillery, blended = multiple.",
                gunthersBrands: ["JW Red", "JW Black", "Chivas", "Dewars", "Glenlivet 12", "Monkey Shoulder", "The Macallan 12", "Loch Lomond 12yr"],
              },
              {
                label: "Canadian Whisky",
                desc: "Light, smooth, usually blended. Often rye-heavy. Aged 3+ years.",
                gunthersBrands: ["Crown Royal", "Crown Peach", "Crown Chocolate", "Canadian Club", "Rich and Rare"],
              },
              {
                label: "Rye Whiskey",
                desc: "51%+ rye mash. Spicier and drier than bourbon. Having a major craft revival.",
                gunthersBrands: ["Bulleit Rye", "Knob Creek Rye"],
              },
              {
                label: "Flavored / Specialty Whiskey",
                desc: "Whiskey with added flavors — honey, apple, cinnamon, peanut butter, etc.",
                gunthersBrands: ["Fireball", "Fireball Blazing Apple", "Skrewball", "Howler Head", "Kurvball", "Jack Honey", "Jack Apple", "Southern Comfort"],
              },
            ],
          },
          {
            id: "gin",
            label: "Gin",
            desc: "Neutral grain spirit re-distilled with botanicals. Must contain juniper as the dominant flavor.",
            rules: ["Juniper must be the primary flavor", "Minimum 40% ABV", "No aging required (though some aged gins exist)"],
            flavorNotes: "Juniper-forward, herbal, citrus, floral — varies by botanical bill.",
            gunthersBrands: ["Tanqueray", "Bombay Sapphire", "Hendrick's", "Beefeater", "Fords", "Mr. Boston (well)"],
            subcategories: [
              { label: "London Dry", desc: "Bold juniper, no artificial flavors added after distillation. The classic style.", gunthersBrands: ["Tanqueray", "Beefeater", "Fords", "Mr. Boston"] },
              { label: "New Western / Contemporary", desc: "Juniper dialed back, other botanicals take center stage.", gunthersBrands: ["Hendrick's", "Bombay Sapphire"] },
            ],
          },
        ],
      },
      {
        id: "sugarcane",
        label: "Sugarcane Spirits",
        icon: "🎋",
        desc: "Distilled from fermented sugarcane juice or molasses.",
        children: [
          {
            id: "rum",
            label: "Rum",
            desc: "Made from sugarcane molasses or fresh sugarcane juice. Huge range from light to dark and funky.",
            rules: ["Must be made from sugarcane byproducts", "No minimum age in most countries", "Usually aged in used bourbon barrels"],
            flavorNotes: "Molasses, vanilla, tropical fruit, caramel — lighter in white rums, richer in dark.",
            gunthersBrands: ["Bacardi", "Captain Morgan", "Myers Dark", "Malibu", "Calypso (well)"],
            subcategories: [
              { label: "White / Silver Rum", desc: "Lightly aged or filtered clear. Clean, neutral.", gunthersBrands: ["Bacardi", "Calypso"] },
              { label: "Spiced Rum", desc: "Dark rum with added spices — vanilla, cinnamon, clove.", gunthersBrands: ["Captain Morgan"] },
              { label: "Dark / Black Rum", desc: "Heavily aged and/or molasses-heavy. Rich and bold.", gunthersBrands: ["Myers Dark"] },
              { label: "Coconut / Flavored Rum", desc: "Rum with added coconut or fruit flavor. Lower ABV.", gunthersBrands: ["Malibu", "Parrot Bay Coconut Rum", "Bacardi Lime", "Bacardi Raspberry", "Cruzan Strawberry"] },
            ],
          },
        ],
      },
      {
        id: "agave",
        label: "Agave Spirits",
        icon: "🌵",
        desc: "Distilled from cooked agave plant. Mexico's most iconic spirits category.",
        children: [
          {
            id: "tequila",
            label: "Tequila",
            desc: "Made from Blue Weber agave in Jalisco, Mexico (and a few other states). Must be 51%+ agave (100% for premium).",
            rules: ["Blue Weber agave only", "Must be produced in designated Mexican states", "100% agave = no added sugars"],
            flavorNotes: "Vegetal, citrus, pepper, earth — sweeter with aging.",
            gunthersBrands: ["Patron Silver", "Don Julio Silver", "Casamigos Blanco", "Casamigos Reposado", "1800 Reposado", "Espolon Silver", "Altos Plata", "Jose Cuervo", "Torada (well)"],
            subcategories: [
              { label: "Blanco / Silver", desc: "Unaged or aged < 60 days. Purest agave expression.", gunthersBrands: ["Patron Silver", "Don Julio Silver", "Casamigos Blanco", "Espolon Silver", "Altos Plata", "Jose Cuervo", "Torada", "Hornitos Plata", "Flecha Azul Blanco", "Ghost Tequila", "Camarena Silver", "Teramana"] },
              { label: "Reposado", desc: "Aged 2–12 months in oak. Smooth with a hint of wood.", gunthersBrands: ["1800 Reposado", "Casamigos Reposado"] },
              { label: "Añejo", desc: "Aged 1–3 years. Richer, more complex, sipping tequila.", gunthersBrands: ["DJ 1942"] },
              { label: "Flavored Tequila", desc: "Tequila base with added flavors.", gunthersBrands: ["Cantera Negra Coffee"] },
            ],
          },
          {
            id: "mezcal",
            label: "Mezcal",
            desc: "Like tequila but can use any agave variety. The agave hearts (piñas) are roasted in underground pits, creating the signature smokiness.",
            rules: ["Any agave variety", "Piñas roasted before fermentation", "Mostly made in Oaxaca"],
            flavorNotes: "Smoky, earthy, complex — far more varied than tequila.",
            gunthersBrands: [],
          },
        ],
      },
      {
        id: "grape",
        label: "Grape / Wine Spirits",
        icon: "🍇",
        desc: "Distilled from wine or grape pomace.",
        children: [
          {
            id: "cognac",
            label: "Cognac",
            desc: "French brandy from the Cognac region. Made from white wine grapes, double pot-distilled, aged in Limousin oak. VS = 2yr, VSOP = 4yr, XO = 10yr.",
            rules: ["Must come from Cognac AOC region", "Ugni Blanc grapes", "Double distillation in copper pot stills", "Limousin oak aging"],
            flavorNotes: "Dried fruit, vanilla, oak, honey, floral.",
            gunthersBrands: ["Hennessy", "Hennessy VSOP"],
          },
          {
            id: "brandy",
            label: "Brandy",
            desc: "Generic term for distilled wine. Cognac is the most famous type. Also includes Armagnac, Pisco, and American brandies.",
            rules: ["Distilled from fermented fruit (usually grapes)", "Usually aged in oak"],
            flavorNotes: "Fruit-forward, warm, oaky.",
            gunthersBrands: [],
          },
        ],
      },
      {
        id: "liqueurs",
        label: "Liqueurs & Cordials",
        icon: "🍬",
        desc: "Distilled spirits sweetened and flavored with fruits, herbs, spices, cream, or nuts. Lower ABV than base spirits.",
        children: [
          {
            id: "herbal",
            label: "Herbal / Bitter",
            desc: "Complex botanical recipes — often used as digestifs or in classic cocktails.",
            gunthersBrands: ["Jagermeister", "Jager Cold Brew", "Campari", "Aperol", "St. Germain"],
          },
          {
            id: "orange",
            label: "Orange Liqueur",
            desc: "Triple sec, Cointreau, Grand Marnier — essential for margaritas and cosmopolitans.",
            gunthersBrands: ["Grand Marnier"],
          },
          {
            id: "cream",
            label: "Cream Liqueur",
            desc: "Dairy cream emulsified with spirit. Rich and sweet.",
            gunthersBrands: ["House Irish Cream"],
          },
          {
            id: "coffee",
            label: "Coffee Liqueur",
            desc: "Coffee flavor in a sweet spirit base. Essential for espresso martinis.",
            gunthersBrands: ["Kamora Coffee Liqueur"],
          },
          {
            id: "nut",
            label: "Nut & Sweet",
            desc: "Almond, hazelnut, and other dessert-style liqueurs.",
            gunthersBrands: ["Amaretto (De Kuyper)", "Frangelico"],
          },
          {
            id: "schnapps",
            label: "Schnapps",
            desc: "Sweet, syrupy, fruit or mint flavored. Very low ABV. Mostly used as mixers.",
            gunthersBrands: ["Peach Schnapps (De Kuyper)", "Watermelon Schnapps (De Kuyper)", "Goldschlager", "Rumpleminze"],
          },
          {
            id: "cinnamon",
            label: "Cinnamon Spirits",
            desc: "Spicy-sweet cinnamon flavored whiskey — technically a liqueur.",
            gunthersBrands: ["Fireball", "Fireball Blazing Apple"],
          },
          {
            id: "italian",
            label: "Italian Liqueurs",
            desc: "Brandy or neutral spirit base with Italian fruit and spice profiles.",
            gunthersBrands: ["Tuaca", "Frangelico", "Aperol", "Campari"],
          },
        ],
      },
    ],
  },
];

// Flat list of all nodes for search
export function flattenTree(nodes, depth = 0, path = []) {
  const result = [];
  for (const node of nodes) {
    const nodePath = [...path, node.label];
    result.push({ ...node, depth, path: nodePath, children: undefined, subcategories: undefined });
    if (node.children) result.push(...flattenTree(node.children, depth + 1, nodePath));
    if (node.subcategories) {
      for (const sub of node.subcategories) {
        result.push({ ...sub, depth: depth + 2, path: [...nodePath, sub.label] });
      }
    }
  }
  return result;
}