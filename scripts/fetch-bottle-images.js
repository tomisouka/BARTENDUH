/**
 * fetch-bottle-images.js
 *
 * Searches specsonline.com for each liquor brand, grabs the product image URL,
 * and writes the results into src/data/images.js
 *
 * Usage:
 *   node scripts/fetch-bottle-images.js
 *
 * Options:
 *   --dry-run     Print results without writing to images.js
 *   --only=Vodka  Only run a specific category
 */

import { writeFileSync, readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, "..");

// ── Brand list (mirrors baker.js LIQUOR) ──────────────────────────────────
const BRANDS = {
  Vodka:    ["Absolut","Absolut Citron","Absolut Vanil","Aspen","Deep Eddy Lemon","Deep Eddy Lime","Deep Eddy Peach","Deep Eddy Ruby Red","Deep Eddy Sweet Tea","Grey Goose","Ketel One","Skyy","Skyy Raspberry","Skyy Watermelon","Stoli","Svedka Mango Pineapple","Three Olives","Tito's","Nikola","Western Son Blueberry","Western Son Cucumber","Western Son Peach","Western Son Prickly Pear","Western Son Watermelon","Wheatley"],
  Gin:      ["Beefeater","Bombay Sapphire","Fords","Hendrick's","Tanqueray","Mr. Boston"],
  Rum:      ["Bacardi","Bacardi Lime","Bacardi Raspberry","Captain Morgan","Cruzan Strawberry","Malibu","Myers Dark","Parrot Bay Coconut Rum","Calypso"],
  Tequila:  ["1800 Reposado","Altos Plata","Camarena Silver","Cantera Negra Coffee","Casamigos Blanco","Casamigos Reposado","DJ 1942","Don Julio Silver","Espolon Silver","Flecha Azul Blanco","Ghost Tequila","Hornitos Plata","Jose Cuervo","Patron Silver","Teramana","Torada"],
  Bourbon:  ["Angel's Envy","Buffalo Trace","Bulleit Rye","Canadian Club","Crown Chocolate","Crown Peach","Crown Royal","Eagle Rare","Gentleman's Jack","Howler Head","Jack Apple","Jack Daniels","Jack Honey","Jameson","Jameson Black Barrel","Jameson Orange","Jim Beam","Knob Creek Rye","Kurvball","Maker's Mark","Paddy's","Rich and Rare","Skrewball","Southern Comfort","TX Whiskey","Royal Crown","Wild Turkey","Woodford Reserve"],
  Scotch:   ["Chivas","Dewars","Glenlivet 12","Hennessy","JW Black","JW Red","Loch Lomond 12yr","Monkey Shoulder","The Macallan 12","Well Scotch"],
  Cordials: ["Amaretto","Aperol","Campari","Fireball Blazing Apple","Fireball","Frangelico","Goldschlager","Grand Marnier","Hennessy VSOP","House Irish Cream","Jager Cold Brew","Jagermeister","Kamora Coffee Liqueur","Peach Schnapps","Rumpleminze","St. Germain","Tuaca","Watermelon Schnapps"],
};

// ── Optional search term overrides (if default search gives bad results) ───
const SEARCH_OVERRIDES = {
  "DJ 1942":              "Don Julio 1942",
  "JW Black":             "Johnnie Walker Black",
  "JW Red":               "Johnnie Walker Red",
  "Myers Dark":           "Myers Dark Rum",
  "Nikola":               "Nikola Vodka",
  "Calypso":              "Calypso Rum",
  "Torada":               "Torada Tequila",
  "Royal Crown":          "Royal Crown Canadian whisky",
  "Well Scotch":          "Scotch whisky",
  "House Irish Cream":    "Irish cream liqueur",
  "TX Whiskey":           "TX Texas Whiskey",
  "Flecha Azul Blanco":   "Flecha Azul tequila",
  "Ghost Tequila":        "Ghost tequila",
  "Cantera Negra Coffee": "Cantera Negra coffee tequila",
  "Howler Head":          "Howler Head bourbon",
  "Kurvball":             "Kurvball whiskey",
  "Skrewball":            "Skrewball peanut butter whiskey",
  "Kamora Coffee Liqueur":"Kamora coffee liqueur",
  "Jager Cold Brew":      "Jagermeister cold brew",
  "Fireball Blazing Apple":"Fireball cinnamon apple whisky",
  // Overrides for brands that previously returned wrong Crown Royal image
  "Absolut Vanil":        "Absolut Vanilia vodka",
  "Skyy Watermelon":      "Skyy watermelon vodka",
  "Espolon Silver":       "Espolon blanco tequila",
  "Eagle Rare":           "Eagle Rare bourbon",
  "Loch Lomond 12yr":     "Loch Lomond 12 scotch",
  "Rumpleminze":          "Rumple Minze peppermint schnapps",
};

// ── Args ───────────────────────────────────────────────────────────────────
const args      = process.argv.slice(2);
const DRY_RUN   = args.includes("--dry-run");
const DEBUG     = args.includes("--debug");
const FORCE     = args.includes("--force");
const ONLY_CAT  = (args.find(a => a.startsWith("--only=")) || "").replace("--only=", "");

// Brands to force re-fetch even if they already have an image (used with --force)
const FORCE_BRANDS = new Set([
  "Absolut Vanil",
  "Skyy Watermelon",
  "Cantera Negra Coffee",
  "Espolon Silver",
  "Eagle Rare",
  "Loch Lomond 12yr",
  "Fireball Blazing Apple",
  "Rumpleminze",
  "Royal Crown",
]);

// ── Helpers ────────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.5",
};

function extractImageFromHtml(html) {
  // Try multiple patterns — Specs may use different markup
  const patterns = [
    // WooCommerce standard product image
    /class="[^"]*wp-post-image[^"]*"[^>]*src="([^"]+)"/i,
    // Reverse — src before class
    /src="(https?:\/\/static\.specsonline\.com\/wp-content\/uploads\/[^"]+\.(?:jpg|jpeg|png|webp))"/i,
    // srcset first entry
    /srcset="(https?:\/\/static\.specsonline\.com\/wp-content\/uploads\/[^"\s]+\.(?:jpg|jpeg|png|webp))/i,
    // data-src (lazy load)
    /data-src="(https?:\/\/static\.specsonline\.com\/wp-content\/uploads\/[^"]+\.(?:jpg|jpeg|png|webp))"/i,
    // Any specsonline static image
    /(https:\/\/static\.specsonline\.com\/wp-content\/uploads\/\d{4}\/\d{2}\/[^"'\s]+\.(?:jpg|jpeg|png|webp))/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      const url = match[1];
      // Skip tiny thumbnails (often 150x150 or woocommerce placeholders)
      if (url.includes("placeholder") || url.includes("woocommerce-placeholder")) continue;
      return url;
    }
  }
  return null;
}

async function searchSpecs(brandName) {
  const query = SEARCH_OVERRIDES[brandName] || brandName;
  const url   = `https://specsonline.com/?s=${encodeURIComponent(query)}&post_type=product`;

  try {
    const res  = await fetch(url, { headers: HEADERS });
    const html = await res.text();

    if (DEBUG) {
      console.log(`\n  [DEBUG] Search URL: ${url}`);
      console.log(`  [DEBUG] Status: ${res.status}`);
      console.log(`  [DEBUG] HTML snippet (first img tag):`);
      const imgIdx = html.indexOf("<img");
      if (imgIdx > -1) console.log("  " + html.slice(imgIdx, imgIdx + 300));
    }

    return extractImageFromHtml(html);
  } catch (err) {
    if (DEBUG) console.log(`  [DEBUG] Fetch error: ${err.message}`);
    return null;
  }
}

async function getProductPageImage(brandName) {
  // Try search first
  const fromSearch = await searchSpecs(brandName);
  if (fromSearch) return fromSearch;

  // Fallback: try direct slug URL
  const slug = (SEARCH_OVERRIDES[brandName] || brandName)
    .toLowerCase()
    .replace(/[''']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const url = `https://specsonline.com/shop/spirits/${slug}/`;
  if (DEBUG) console.log(`  [DEBUG] Trying direct URL: ${url}`);

  try {
    const res  = await fetch(url, { headers: HEADERS });
    if (!res.ok) return null;
    const html = await res.text();
    return extractImageFromHtml(html);
  } catch {
    return null;
  }
}

// ── Read existing images.js to preserve already-filled entries ─────────────
function readExistingImages(filepath) {
  try {
    const content = readFileSync(filepath, "utf8");
    const existing = {};
    const lines = content.split("\n");
    for (const line of lines) {
      const match = line.match(/"([^"]+)":\s*"(https?:\/\/[^"]+)"/);
      if (match) existing[match[1]] = match[2];
    }
    return existing;
  } catch {
    return {};
  }
}

// ── Write results back into images.js ─────────────────────────────────────
function writeImagesToFile(results, filepath) {
  const content = readFileSync(filepath, "utf8");

  // Replace each empty entry with the found URL
  let updated = content;
  for (const [name, url] of Object.entries(results)) {
    if (!url) continue;
    // Match the key with empty string value
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/'/g, "['''']");
    const regex = new RegExp(`("${escaped}":\\s*)""`);
    if (regex.test(updated)) {
      updated = updated.replace(regex, `$1"${url}"`);
    }
  }

  writeFileSync(filepath, updated, "utf8");
}

// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
  const imagesPath = join(ROOT, "src/data/images.js");
  const existing   = readExistingImages(imagesPath);

  const results  = {};
  let found = 0, skipped = 0, failed = 0;

  const categories = ONLY_CAT
    ? Object.entries(BRANDS).filter(([cat]) => cat.toLowerCase() === ONLY_CAT.toLowerCase())
    : Object.entries(BRANDS);

  console.log(`\n🍾 Specs Bottle Image Scraper`);
  console.log(`   Mode: ${DRY_RUN ? "DRY RUN (no file writes)" : "LIVE"}`);
  console.log(`   Categories: ${ONLY_CAT || "All"}`);
  console.log(`   Brands to process: ${categories.flatMap(([,b]) => b).length}\n`);

  for (const [category, brands] of categories) {
    console.log(`\n── ${category} ${"─".repeat(40 - category.length)}`);

    for (const brand of brands) {
      // Skip if already has an image (unless --force and in FORCE_BRANDS list)
      if (existing[brand] && !(FORCE && FORCE_BRANDS.has(brand))) {
        console.log(`  ⏭  ${brand.padEnd(30)} (already set)`);
        skipped++;
        results[brand] = existing[brand];
        continue;
      }

      process.stdout.write(`  🔍 ${brand.padEnd(30)} `);

      const url = await getProductPageImage(brand);

      if (url) {
        console.log(`✓  ${url.split("/").pop()}`);
        results[brand] = url;
        found++;
      } else {
        console.log(`✗  not found`);
        results[brand] = "";
        failed++;
      }

      // Polite delay to avoid rate limiting
      await sleep(800 + Math.random() * 400);
    }
  }

  console.log(`\n${"═".repeat(50)}`);
  console.log(`  ✓ Found:   ${found}`);
  console.log(`  ⏭ Skipped: ${skipped} (already had images)`);
  console.log(`  ✗ Missing: ${failed}`);
  console.log(`${"═".repeat(50)}\n`);

  if (!DRY_RUN) {
    writeImagesToFile(results, imagesPath);
    console.log(`✅ images.js updated → ${imagesPath}\n`);

    if (failed > 0) {
      console.log(`⚠  ${failed} brands couldn't be found automatically.`);
      console.log(`   Use the Image Manager in the app to fill these in manually.\n`);
      const missing = Object.entries(results).filter(([,v]) => !v).map(([k]) => k);
      console.log(`   Missing:\n   ${missing.join("\n   ")}\n`);
    }
  } else {
    console.log("DRY RUN — nothing written. Run without --dry-run to save.\n");
    console.log("Preview:");
    for (const [name, url] of Object.entries(results)) {
      if (url) console.log(`  "${name}": "${url}"`);
    }
  }
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
