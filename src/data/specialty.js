export const SPECIALTY = [
  {
    category: "Old Fashioneds", color: "#C9A84C",
    recipes: [
      { name: "Classic Old Fashioned",      spirit: "Buffalo Trace",       method: "BUILD", ingredients: ["2 oz Buffalo Trace", "3 dashes Angostura Bitters", "0.25 oz Turbinado Simple"], garnish: "Orange Peel & Luxardo Cherry", glass: "Old Fashioned", notes: "Build in glass — whiskey, bitters, simple, fat ice cube, stir. DO NOT muddle fruit." },
      { name: "Black Walnut Old Fashioned", spirit: "Knob Creek Rye",      method: "BUILD", ingredients: ["2 oz Knob Creek Rye", "5 dashes Black Walnut Bitters", "0.5 oz Simple"], garnish: "Orange Peel & Luxardo Cherry", glass: "Old Fashioned" },
      { name: "Smokey Old Fashioned",       spirit: "Kurvball",            method: "BUILD", ingredients: ["2 oz Kurvball", "3 dashes Angostura Bitters", "2 dashes Orange Bitters"], garnish: "Orange Peel & Luxardo Cherry", glass: "Old Fashioned", notes: "No simple — Kurvball's smokiness carries it." },
      { name: "TX Old Fashioned",           spirit: "TX Blended Whiskey",  method: "BUILD", ingredients: ["2 oz TX Blended Whiskey", "0.25 oz Turbinado Simple", "2 dashes Angostura Bitters", "2 dashes Orange Bitters"], garnish: "Orange Peel & Luxardo Cherry", glass: "Old Fashioned" },
    ]
  },
  {
    category: "Margaritas", color: "#6B8E3E",
    recipes: [
      { name: "The OG Margarita",           spirit: "Hornitos Blanco",     method: "SHAKE",        ingredients: ["1.5 oz Hornitos Blanco", "0.75 oz Cointreau", "0.75 oz Lime Juice"], garnish: "Lime Wedge", glass: "9 oz Highball" },
      { name: "Spicy Pineapple Margarita",  spirit: "Casamigos Repo",      method: "SHAKE",        ingredients: ["1.5 oz Casamigos Repo", "1 oz Pineapple Juice", "0.5 oz Lime Juice", "0.5 oz Monin Hot Honey", "2 dashes Angostura Bitters"], glass: "9 oz Highball" },
      { name: "Firebox Margarita",          spirit: "Kurvball",            method: "SHAKE",        ingredients: ["2 oz Kurvball", "1.5 oz Pineapple Juice", "0.25 oz Monin Hot Honey", "2 oz Margarita Mix"], glass: "14 oz Collins", notes: "Hot honey rim or Tajin optional." },
      { name: "Perfect Patron Rita",        spirit: "Patron Silver",       method: "SHAKE",        ingredients: ["1 oz Patron Silver", "0.5 oz DeKuyper Triple Sec", "4 oz Margarita Mix"], garnish: "Lime Wedge", glass: "14 oz Collins" },
      { name: "Altos Strawberry Rita",      spirit: "Olmeca Altos Plata",  method: "SHAKE",        ingredients: ["1.5 oz Olmeca Altos Plata", "0.75 oz Lime Juice", "0.5 oz Monin Agave Nectar", "0.5 oz Finest Call Strawberry"], garnish: "Lime Wedge", glass: "14 oz Collins" },
      { name: "Tropical Heat Rita",         spirit: "Ghost Tequila",       method: "SHAKE",        ingredients: ["1.5 oz Ghost Tequila", "0.75 oz Finest Call Mango", "0.75 oz Lime Juice", "0.25 oz Réal Passion Fruit Syrup"], glass: "9 oz Highball" },
      { name: "Fresh Melon Paloma",         spirit: "Casamigos Blanco",    method: "SHAKE + BUILD",ingredients: ["1.5 oz Casamigos Blanco", "0.5 oz Lime Juice", "0.75 oz Monin Rock Melon Cantaloupe", "3 oz Q Mixers Grapefruit Soda"], garnish: "Lime Wedge", glass: "14 oz Collins", notes: "Shake tequila, lime, monin — strain over ice, top with grapefruit soda." },
      { name: "Teremana Ranch Water",       spirit: "Teremana Blanco",     method: "BUILD",        ingredients: ["1.5 oz Teremana Blanco", "0.75 oz Lime Juice", "4 oz Rambler Sparkling Water"], garnish: "Lime Wedge", glass: "14 oz Collins" },
    ]
  },
  {
    category: "Vodka Drinks", color: "#4A90A4",
    recipes: [
      { name: "Espresso Martini",           spirit: "Absolut Vanilia",       method: "SHAKE",        ingredients: ["1 oz Absolut Vanilia", "0.5 oz Kahlua", "0.5 oz Frangelico", "0.25 oz Finest Call Espresso"], garnish: "3 Coffee Beans", glass: "Martini" },
      { name: "Sex on Gunthers Street",        spirit: "Skyy Vodka",            method: "SHAKE",        ingredients: ["0.5 oz Skyy Vodka", "0.5 oz DeKuyper Melon", "0.5 oz Malibu", "0.5 oz DeKuyper Peachtree", "2 oz Cranberry Juice", "2 oz Pineapple Juice"], garnish: "Orange Slice & Cherry", glass: "14 oz Collins" },
      { name: "Tito's Blueberry Lemonade",  spirit: "Tito's",                method: "SHAKE",        ingredients: ["1.5 oz Tito's", "0.5 oz DeKuyper Triple Sec", "0.5 oz Blueberry Réal", "2 oz Lemon Sour"], garnish: "Lemon Wedge", glass: "14 oz Collins" },
      { name: "Hibiscus Mule",              spirit: "Wheatley Vodka",        method: "BUILD",        ingredients: ["1.5 oz Wheatley Vodka", "0.5 oz Lime Juice", "4 oz Q-Mixers Hibiscus Ginger Beer"], garnish: "Lime Wedge", glass: "Copper Mule Mug", notes: "Build in mug — fill with ice, add vodka & lime, top with ginger beer." },
      { name: "Maker's Hot Honey Lemonade", spirit: "Maker's Mark",          method: "SHAKE",        ingredients: ["1.5 oz Maker's Mark", "0.5 oz Monin Hot Honey", "3 oz Lemon Sour", "8-10 Mint Leaves"], garnish: "Lemon Wedge", glass: "14 oz Collins" },
      { name: "Cucumber Cooler",            spirit: "Western Son Cucumber",  method: "SHAKE + BUILD",ingredients: ["1.5 oz Western Son Cucumber", "0.75 oz Lemon Juice", "0.75 oz Simple", "5-7 Mint Leaves", "3 oz Soda"], garnish: "Mint Sprig", glass: "14 oz Collins", notes: "Shake vodka, lemon, simple, mint. Strain over ice, top with soda." },
    ]
  },
  {
    category: "Rum, Wine & More", color: "#8B1A35",
    recipes: [
      { name: "Raspberry Piña Colada",              spirit: "Bacardi Raspberry",      method: "SHAKE", ingredients: ["1 oz Bacardi Raspberry", "1 oz Malibu", "1 oz Pineapple Juice", "0.75 oz Coco Réal", "0.25 oz Grenadine"], garnish: "Cherry & Lemon Wedge", glass: "14 oz Collins" },
      { name: "Wildberry Sangria",                  spirit: "Apothic Crush Red Wine", method: "SHAKE", ingredients: ["4 oz Apothic Crush Red Wine", "0.5 oz Monin Wild Berry", "0.25 oz Monin Vanilla", "1 oz Lemon Sour"], garnish: "Orange Slice", glass: "Large Wine" },
      { name: "Garrison Brothers HoneyDew Highball", spirit: "Garrison Brothers",      method: "BUILD", ingredients: ["1.5 oz Garrison Brothers Honey Dew Whiskey", "4 oz Q-Mixers Soda"], garnish: "Lemon Wheel", glass: "Old Fashioned", notes: "Add fat ice cube, add whiskey, top with soda." },
    ]
  },
];
