import { useState } from "react";
import { BEER_BRANDS, WINE_BRANDS, OWNERSHIP_COLORS, OWNERSHIP_LABELS } from "../data/brands";
import { T } from "../theme";

const mono  = "'DM Mono', monospace";
const sans  = "'Inter', sans-serif";
const bebas = "'Bebas Neue', sans-serif";

const FONT_LINK = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap";

// ── Ownership filter tabs ─────────────────────────────────────────────────────
const FILTERS = [
  { key: "all",              label: "All" },
  { key: "independent",      label: "Independent" },
  { key: "craft-corporate",  label: "Craft → Corporate" },
  { key: "macro",            label: "Macro" },
];

// ── Single brand card ─────────────────────────────────────────────────────────
function BrandCard({ brand }) {
  const [open, setOpen] = useState(false);
  const color = OWNERSHIP_COLORS[brand.ownership];
  const label = OWNERSHIP_LABELS[brand.ownership];

  return (
    <div
      onClick={() => setOpen(o => !o)}
      style={{
        background: T.card,
        border: `1px solid ${open ? color + "55" : T.border}`,
        borderLeft: `3px solid ${color}`,
        borderRadius: 2,
        cursor: "pointer",
        transition: "border-color 0.15s, background 0.15s",
        overflow: "hidden",
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: sans, fontWeight: 600, fontSize: 15, color: T.cream, lineHeight: 1.3 }}>
            {brand.name}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
            <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color, background: color + "18", border: `1px solid ${color}44`, borderRadius: 2, padding: "2px 7px" }}>
              {label}
            </span>
            <span style={{ fontFamily: mono, fontSize: 11, color: T.dim }}>
              {brand.origin} · est. {brand.founded}
            </span>
          </div>
        </div>
        <span style={{ fontFamily: mono, fontSize: 12, color: T.dim, flexShrink: 0 }}>{open ? "▲" : "▼"}</span>
      </div>

      {/* Expanded detail */}
      {open && (
        <div style={{ borderTop: `1px solid ${T.border}`, padding: "14px 16px 16px" }}>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.15em", color: T.dim, textTransform: "uppercase", marginBottom: 6 }}>Owner</div>
          <div style={{ fontFamily: sans, fontSize: 13, color: T.cream, marginBottom: 12 }}>{brand.owner}</div>

          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.15em", color: T.dim, textTransform: "uppercase", marginBottom: 6 }}>Note</div>
          <div style={{ fontFamily: sans, fontSize: 13, color: T.muted, lineHeight: 1.7, marginBottom: 14 }}>{brand.note}</div>

          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.15em", color: T.dim, textTransform: "uppercase", marginBottom: 8 }}>On Menu</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {brand.beers?.map((b, i) => (
              <span key={i} style={{ fontFamily: mono, fontSize: 11, color, border: `1px solid ${color}44`, borderRadius: 2, padding: "3px 8px", background: color + "10" }}>
                {b.replace(/^D /, "").replace(/^[GB] /, "")}
              </span>
            ))}
            {brand.wines?.map((w, i) => (
              <span key={i} style={{ fontFamily: mono, fontSize: 11, color, border: `1px solid ${color}44`, borderRadius: 2, padding: "3px 8px", background: color + "10" }}>
                {w.replace(/^[GB] /, "")}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Legend ────────────────────────────────────────────────────────────────────
function Legend() {
  const items = [
    { key: "independent",    desc: "Privately or founder-owned, qualifies as craft" },
    { key: "craft-corporate",desc: "Started as craft, now majority-owned by a multinational" },
    { key: "macro",          desc: "Always been a large commercial or multinational brand" },
  ];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
      {items.map(({ key, desc }) => (
        <div key={key} style={{ display: "flex", alignItems: "flex-start", gap: 8, flex: "1 1 220px" }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: OWNERSHIP_COLORS[key], marginTop: 2, flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: mono, fontSize: 11, color: OWNERSHIP_COLORS[key], letterSpacing: "0.12em", textTransform: "uppercase" }}>{OWNERSHIP_LABELS[key]}</div>
            <div style={{ fontFamily: sans, fontSize: 11, color: T.dim, marginTop: 2, lineHeight: 1.5 }}>{desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
function BrandSection({ title, brands, filter, search }) {
  const filtered = brands.filter(b => {
    const matchesFilter = filter === "all" || b.ownership === filter;
    const q = search.toLowerCase();
    const matchesSearch = !q
      || b.name.toLowerCase().includes(q)
      || b.owner.toLowerCase().includes(q)
      || b.origin.toLowerCase().includes(q)
      || b.note.toLowerCase().includes(q)
      || (b.beers || b.wines || []).some(x => x.toLowerCase().includes(q));
    return matchesFilter && matchesSearch;
  });

  if (!filtered.length) return null;

  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <div style={{ fontFamily: bebas, fontSize: 26, color: T.gold, letterSpacing: "0.06em" }}>{title}</div>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${T.gold}44, transparent)` }} />
        <span style={{ fontFamily: mono, fontSize: 11, color: T.dim }}>{filtered.length} brand{filtered.length !== 1 ? "s" : ""}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map((b, i) => <BrandCard key={i} brand={b} />)}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function BrandsPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Stats
  const allBrands = [...BEER_BRANDS, ...WINE_BRANDS];
  const counts = {
    independent:    allBrands.filter(b => b.ownership === "independent").length,
    "craft-corporate": allBrands.filter(b => b.ownership === "craft-corporate").length,
    macro:          allBrands.filter(b => b.ownership === "macro").length,
  };

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.cream, fontFamily: sans }}>
      <link rel="stylesheet" href={FONT_LINK} />

      {/* Hero */}
      <div style={{ padding: "48px clamp(16px,5vw,60px) 32px", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.3em", color: T.dim, textTransform: "uppercase", marginBottom: 10 }}>Reference</div>
        <div style={{ fontFamily: bebas, fontSize: "clamp(36px,8vw,64px)", color: T.gold, letterSpacing: "0.04em", lineHeight: 1, marginBottom: 12 }}>Brand Ownership</div>
        <div style={{ fontFamily: sans, fontSize: 14, color: T.muted, maxWidth: 560, lineHeight: 1.7 }}>
          Who actually owns the beers and wines on the Gunthers menu — from independent Texas craft breweries to the world's largest multinationals.
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 24, marginTop: 24, flexWrap: "wrap" }}>
          {[
            { label: "Independent",      count: counts.independent,       color: OWNERSHIP_COLORS.independent },
            { label: "Craft → Corporate",count: counts["craft-corporate"], color: OWNERSHIP_COLORS["craft-corporate"] },
            { label: "Macro",            count: counts.macro,              color: OWNERSHIP_COLORS.macro },
          ].map(({ label, count, color }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
              <span style={{ fontFamily: mono, fontSize: 12, color }}>{count}</span>
              <span style={{ fontFamily: mono, fontSize: 12, color: T.dim }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div style={{ padding: "20px clamp(16px,5vw,60px)", borderBottom: `1px solid ${T.border}`, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        {/* Search */}
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search brands, owners, origins..."
          style={{ flex: "1 1 200px", minWidth: 0, background: T.card, border: `1px solid ${T.border}`, borderRadius: 2, padding: "8px 12px", color: T.cream, fontFamily: mono, fontSize: 12, outline: "none", fontSize: 16 }}
        />
        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                fontFamily: mono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "7px 14px", borderRadius: 2, cursor: "pointer", transition: "all 0.15s",
                background: filter === f.key ? (f.key === "all" ? T.gold : OWNERSHIP_COLORS[f.key]) : "transparent",
                border: `1px solid ${filter === f.key ? (f.key === "all" ? T.gold : OWNERSHIP_COLORS[f.key]) : T.border}`,
                color: filter === f.key ? "#1c1810" : T.dim,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "32px clamp(16px,5vw,60px) 80px", maxWidth: 900, margin: "0 auto" }}>
        <Legend />
        <BrandSection title="Beer" brands={BEER_BRANDS} filter={filter} search={search} />
        <BrandSection title="Wine" brands={WINE_BRANDS} filter={filter} search={search} />

        {/* Empty state */}
        {!BEER_BRANDS.concat(WINE_BRANDS).some(b =>
          (filter === "all" || b.ownership === filter) &&
          (!search || b.name.toLowerCase().includes(search.toLowerCase()))
        ) && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: T.dim, fontFamily: mono, fontSize: 13 }}>
            No brands match your search.
          </div>
        )}
      </div>
    </div>
  );
}
