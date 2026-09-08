import { useState, useEffect, useMemo } from "react";
import { BEER, WINE, LIQUOR } from "../data/gunthers";
import { BEER_INFO, BRAND_INFO } from "../data/brandInfo";
import { getLiquorImage, getBeerImage, getWineImage } from "../data/images";

const mono  = "'DM Mono', monospace";
const sans  = "'Inter', system-ui, sans-serif";
const bebas = "'Bebas Neue', sans-serif";
const FONT_LINK = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap";

const C = {
  black: "#080604", dark: "#0e0c09", card: "#181410", border: "#332b20",
  gold: "#e0b84e", goldL: "#f5d878", goldD: "#b8904a",
  cream: "#f5f0e8", muted: "#c8b898", dim: "#887060",
  indie: "#88c860", corp: "#e07878",
};

// ── Build flat brand list with type/subtype ───────────────────────────────────

// Liquor: pull from LIQUOR object — keys are type groups
const LIQUOR_GROUPS = {
  vodka:    { type: "Spirits", subtype: "Vodka",           color: "#a0c8e8" },
  gin:      { type: "Spirits", subtype: "Gin",             color: "#7abf8a" },
  rum:      { type: "Spirits", subtype: "Rum",             color: "#c9a84c" },
  tequila:  { type: "Spirits", subtype: "Tequila",         color: "#b8d96e" },
  bourbon:  { type: "Spirits", subtype: "Bourbon & Whiskey", color: "#e0a040" },
  scotch:   { type: "Spirits", subtype: "Scotch",          color: "#e8c840" },
  cordials: { type: "Spirits", subtype: "Cordials & Liqueurs", color: "#a078d4" },
};

const BEER_SUBTYPES = {
  "Light Lager": "#d49030", "Dark Lager": "#b86020", "Bock": "#a05020",
  "Pilsner": "#c8a030", "IPA": "#f0a878", "Stout": "#8878a0",
  "Porter": "#7868a0", "Wheat": "#c8c060", "Ale": "#d49040",
  "Amber / Red": "#a06030", "Seasonal": "#8B6E3E",
  "Cider": "#88c860", "Dry Cider": "#6B9E2E", "Fruit Cider": "#8B7E3E",
  "Seltzer": "#60c8c8", "Hard Tea": "#c8a860", "RTD": "#a880c0",
};

const WINE_SUBTYPES = {
  "Cabernet Sauvignon": "#7a1828", "Merlot": "#8a2030", "Malbec": "#6a1840",
  "Pinot Noir": "#a02830", "Red Blend": "#902838",
  "Chardonnay": "#d4b840", "Pinot Grigio": "#c8c060", "Sauvignon Blanc": "#b8b848",
  "Riesling": "#d0c838", "Moscato": "#c8a840",
  "Dry Rosé": "#d06880", "White Zinfandel": "#e89098",
  "Champagne": "#b0d8e8", "Prosecco": "#a8d0d8",
};

// Flatten all brands into a single array
function buildAllBrands() {
  const brands = [];

  // Spirits / Liquor
  Object.entries(LIQUOR_GROUPS).forEach(([key, meta]) => {
    (LIQUOR[key] || []).forEach(item => {
      const name = item.name;
      const info = BRAND_INFO[name];
      brands.push({
        id: `spirit-${name}`,
        name,
        display: name,
        type: meta.type,
        subtype: meta.subtype,
        color: meta.color,
        origin: info?.origin || "—",
        owner: info?.style || "—",
        ownerFull: null,
        note: info?.note || null,
        getImage: () => Promise.resolve(getLiquorImage(name)),
        category: "spirits",
      });
    });
  });

  // Beer
  const allBeers = [
    ...BEER.domesticDraft, ...BEER.craftDraft, ...BEER.importDraft,
    ...BEER.domesticBottle, ...(BEER.craftBottle || []), ...BEER.importBottle,
  ];
  // Dedupe by clean name
  const seenBeer = new Set();
  allBeers.forEach(item => {
    const raw = item.name;
    const clean = raw.replace(/^D /, "");
    if (seenBeer.has(clean)) return;
    seenBeer.add(clean);
    const info = BEER_INFO[raw] || BEER_INFO[clean];
    const subtype = item.style || "Ale";
    const color = BEER_SUBTYPES[subtype] || "#c87020";
    // Broad type from style
    const type = ["IPA","Stout","Porter","Wheat","Ale","Amber / Red","Seasonal"].includes(subtype) ? "Ale"
               : ["Seltzer","Hard Tea","RTD"].includes(subtype) ? "Hard Seltzer"
               : ["Dry Cider","Fruit Cider","Cider"].includes(subtype) ? "Cider"
               : "Lager";
    brands.push({
      id: `beer-${clean}`,
      name: raw,
      display: clean,
      type,
      subtype,
      color,
      origin: info?.origin || "—",
      owner: info?.owner || "—",
      ownerFull: info?.owner || null,
      note: info?.note || null,
      getImage: () => getBeerImage(raw),
      category: "beer",
    });
  });

  // Wine
  const allWines = [...WINE.byGlass, ...WINE.byBottle];
  const seenWine = new Set();
  allWines.forEach(raw => {
    const clean = raw.replace(/^[GB] /, "");
    if (seenWine.has(clean)) return;
    seenWine.add(clean);
    // Detect subtype from name
    const lc = clean.toLowerCase();
    let subtype = "Wine";
    if (lc.includes("cabernet") || lc.includes("cab")) subtype = "Cabernet Sauvignon";
    else if (lc.includes("merlot"))    subtype = "Merlot";
    else if (lc.includes("malbec"))    subtype = "Malbec";
    else if (lc.includes("pinot noir")) subtype = "Pinot Noir";
    else if (lc.includes("apothic") || lc.includes("crush")) subtype = "Red Blend";
    else if (lc.includes("chardonnay")) subtype = "Chardonnay";
    else if (lc.includes("pinot grigio")) subtype = "Pinot Grigio";
    else if (lc.includes("sauvignon blanc")) subtype = "Sauvignon Blanc";
    else if (lc.includes("riesling") || lc.includes("reisling")) subtype = "Riesling";
    else if (lc.includes("moscato")) subtype = "Moscato";
    else if (lc.includes("white zinfandel") || lc.includes("white zin")) subtype = "White Zinfandel";
    else if (lc.includes("rosé") || lc.includes("rose") || lc.includes("prophecy")) subtype = "Dry Rosé";
    else if (lc.includes("prosecco")) subtype = "Prosecco";
    else if (lc.includes("champagne")) subtype = "Champagne";
    else if (lc.includes("mumm") || lc.includes("la marca")) subtype = "Prosecco";

    const redSubtypes = ["Cabernet Sauvignon","Merlot","Malbec","Pinot Noir","Red Blend"];
    const sparklingSubtypes = ["Champagne","Prosecco"];
    const roseSubtypes = ["Dry Rosé","White Zinfandel"];
    const type = redSubtypes.includes(subtype) ? "Red Wine"
               : sparklingSubtypes.includes(subtype) ? "Sparkling"
               : roseSubtypes.includes(subtype) ? "Rosé"
               : "White Wine";

    const color = WINE_SUBTYPES[subtype] || "#8B1A35";
    brands.push({
      id: `wine-${clean}`,
      name: raw,
      display: clean,
      type,
      subtype,
      color,
      origin: "—",
      owner: "—",
      ownerFull: null,
      note: null,
      getImage: () => getWineImage(raw),
      category: "wine",
    });
  });

  return brands;
}

const ALL_BRANDS = buildAllBrands();

// ── Grouping structure ────────────────────────────────────────────────────────
// category → type → subtype → brands[]
function groupBrands(brands) {
  const groups = {};
  brands.forEach(b => {
    if (!groups[b.category])          groups[b.category] = {};
    if (!groups[b.category][b.type])  groups[b.category][b.type] = {};
    if (!groups[b.category][b.type][b.subtype]) groups[b.category][b.type][b.subtype] = [];
    groups[b.category][b.type][b.subtype].push(b);
  });
  return groups;
}

// ── Brand image card ──────────────────────────────────────────────────────────
function BrandCard({ brand }) {
  const [img, setImg] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    brand.getImage().then(url => { if (!cancelled && url) setImg(url); });
    return () => { cancelled = true; };
  }, [brand.id]);

  const isIndie = brand.ownerFull?.includes("Independent");

  return (
    <div onClick={() => setOpen(o => !o)} style={{
      background: open ? `linear-gradient(160deg, ${brand.color}12, ${C.card})` : C.card,
      border: `1px solid ${open ? brand.color + "55" : C.border}`,
      borderRadius: 10, overflow: "hidden", cursor: "pointer",
      transition: "all 0.2s", display: "flex", flexDirection: "column",
    }}>
      {/* Image area */}
      <div style={{
        height: 130, background: "rgba(0,0,0,0.4)", display: "flex",
        alignItems: "center", justifyContent: "center", padding: 12,
        borderBottom: `1px solid ${C.border}`, position: "relative",
        flexShrink: 0,
      }}>
        {img
          ? <img src={img} alt={brand.display} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
          : <div style={{ fontFamily: mono, fontSize: 11, color: C.dim, letterSpacing: "0.1em" }}>No image</div>
        }
        {/* subtype badge top-right */}
        <div style={{
          position: "absolute", top: 8, right: 8,
          fontFamily: mono, fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase",
          color: brand.color, border: `1px solid ${brand.color}50`,
          background: `${brand.color}15`, borderRadius: 3, padding: "2px 6px",
        }}>{brand.subtype}</div>
      </div>

      {/* Name */}
      <div style={{ padding: "10px 12px 8px" }}>
        <div style={{ fontFamily: sans, fontWeight: 600, fontSize: 13, color: C.cream, lineHeight: 1.3 }}>{brand.display}</div>
        {brand.origin !== "—" && (
          <div style={{ fontFamily: mono, fontSize: 10, color: C.dim, marginTop: 3, letterSpacing: "0.05em" }}>{brand.origin}</div>
        )}
        {brand.ownerFull && brand.ownerFull !== "—" && (
          <div style={{ fontFamily: mono, fontSize: 10, color: isIndie ? C.indie : C.corp, marginTop: 2, letterSpacing: "0.05em" }}>
            {brand.ownerFull}
          </div>
        )}
      </div>

      {/* Expanded note */}
      {open && brand.note && (
        <div style={{ padding: "0 12px 12px", borderTop: `1px solid ${brand.color}20`, paddingTop: 8 }}>
          <p style={{ fontFamily: sans, fontSize: 12, color: C.muted, lineHeight: 1.65, margin: 0 }}>{brand.note}</p>
        </div>
      )}
    </div>
  );
}

// ── Category header ───────────────────────────────────────────────────────────
const CATEGORY_META = {
  spirits:      { label: "Spirits",      emoji: "🥃", color: "#e0b84e" },
  beer:         { label: "Beer",         emoji: "🍺", color: "#D4820A" },
  wine:         { label: "Wine",         emoji: "🍷", color: "#8B1A35" },
};

// ── Main page ─────────────────────────────────────────────────────────────────
export default function AllBrandsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    let list = ALL_BRANDS;
    if (activeCategory !== "all") list = list.filter(b => b.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(b =>
        b.display.toLowerCase().includes(q) ||
        b.subtype.toLowerCase().includes(q) ||
        b.origin.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, activeCategory]);

  const grouped = useMemo(() => groupBrands(filtered), [filtered]);

  const CATEGORY_ORDER = ["spirits", "beer", "wine"];

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href={FONT_LINK} rel="stylesheet" />

      <div style={{ background: C.black, minHeight: "100vh", color: C.cream }}>

        {/* Header */}
        <div style={{ padding: "32px 24px 20px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontFamily: bebas, fontSize: 40, color: C.gold, letterSpacing: "0.06em", lineHeight: 1 }}>All Brands</div>
          <div style={{ fontFamily: mono, fontSize: 11, color: C.dim, letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 4 }}>
            {ALL_BRANDS.length} brands · Spirits · Beer · Wine
          </div>
        </div>

        {/* Controls */}
        <div style={{ padding: "16px 24px", display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", borderBottom: `1px solid ${C.border}` }}>
          {/* Category filter */}
          <div style={{ display: "flex", gap: 6 }}>
            {[["all", "All", C.gold], ...CATEGORY_ORDER.map(c => [c, CATEGORY_META[c].emoji + " " + CATEGORY_META[c].label, CATEGORY_META[c].color])].map(([key, label, color]) => (
              <button key={key} onClick={() => setActiveCategory(key)} style={{
                fontFamily: mono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "6px 14px", borderRadius: 4, cursor: "pointer", transition: "all 0.15s",
                background: activeCategory === key ? color + "22" : "transparent",
                border: `1px solid ${activeCategory === key ? color : C.border}`,
                color: activeCategory === key ? color : C.dim,
              }}>{label}</button>
            ))}
          </div>

          {/* Search */}
          <div style={{ position: "relative", flex: 1, minWidth: 200, maxWidth: 340 }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontFamily: mono, fontSize: 14, color: C.dim, pointerEvents: "none" }}>⌕</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search brands, styles, origins…"
              style={{ width: "100%", padding: "8px 12px 8px 36px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 4, color: C.cream, fontSize: 13, outline: "none", fontFamily: sans, boxSizing: "border-box" }} />
            {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: C.dim, cursor: "pointer", fontSize: 12, fontFamily: mono }}>✕</button>}
          </div>

          <div style={{ fontFamily: mono, fontSize: 11, color: C.dim, marginLeft: "auto" }}>{filtered.length} brands</div>
        </div>

        {/* Content */}
        <div style={{ padding: "24px 24px 80px" }}>
          {CATEGORY_ORDER.filter(cat => grouped[cat]).map(cat => {
            const meta = CATEGORY_META[cat];
            return (
              <div key={cat} style={{ marginBottom: 60 }}>
                {/* Category header */}
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28, paddingBottom: 12, borderBottom: `2px solid ${meta.color}40` }}>
                  <span style={{ fontSize: 24 }}>{meta.emoji}</span>
                  <span style={{ fontFamily: bebas, fontSize: 36, color: meta.color, letterSpacing: "0.05em" }}>{meta.label}</span>
                </div>

                {Object.entries(grouped[cat]).map(([type, subtypes]) => (
                  <div key={type} style={{ marginBottom: 40 }}>
                    {/* Type label */}
                    <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 14, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16, paddingLeft: 4, borderLeft: `3px solid ${meta.color}60`, paddingLeft: 10 }}>
                      {type}
                    </div>

                    {Object.entries(subtypes).map(([subtype, brands]) => {
                      const subtypeColor = brands[0]?.color || meta.color;
                      return (
                        <div key={subtype} style={{ marginBottom: 24 }}>
                          {/* Subtype label */}
                          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                            <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: subtypeColor, border: `1px solid ${subtypeColor}50`, background: `${subtypeColor}12`, borderRadius: 3, padding: "3px 10px" }}>
                              {subtype}
                            </span>
                            <span style={{ fontFamily: mono, fontSize: 11, color: C.dim }}>{brands.length}</span>
                            <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${subtypeColor}30, transparent)` }} />
                          </div>

                          {/* Brand cards grid */}
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
                            {brands.map(brand => <BrandCard key={brand.id} brand={brand} />)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", paddingTop: 60, color: C.dim, fontFamily: mono, fontSize: 13 }}>No brands match "{search}"</div>
          )}
        </div>
      </div>
    </>
  );
}