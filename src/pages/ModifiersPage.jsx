import { useState, useMemo } from "react";
import { MODIFIERS, MODIFIER_ROLES } from "../data/modifiers";

const mono  = "'DM Mono', monospace";
const sans  = "'Inter', system-ui, sans-serif";
const bebas = "'Bebas Neue', sans-serif";
const FONT  = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap";

const C = {
  black: "#080604", dark: "#0e0c09", card: "#181410", border: "#2a2218",
  gold: "#e0b84e", goldD: "#b8904a", cream: "#f5f0e8", muted: "#c8b898", dim: "#887060",
};

const STYLES = `
  @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  .mod-item:hover { border-color: var(--cat-color) !important; background: rgba(255,255,255,0.04) !important; }
  .mod-item:hover .mod-name { color: var(--cat-color) !important; }
`;

// ── Item detail panel ─────────────────────────────────────────────────────────
function ItemDetail({ item, color }) {
  if (!item) return (
    <div style={{ textAlign: "center", padding: "60px 0", color: C.dim, fontFamily: mono, fontSize: 13 }}>
      ← select an item
    </div>
  );
  return (
    <div style={{ animation: "fadeUp 0.2s ease both" }}>
      {/* Role badge */}
      <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
        color, border: `1px solid ${color}40`, background: `${color}12`,
        borderRadius: 3, padding: "3px 10px", display: "inline-block", marginBottom: 12 }}>
        {item.role}
      </div>

      {/* Name */}
      <div style={{ fontFamily: bebas, fontSize: 42, color, letterSpacing: "0.04em", lineHeight: 1, marginBottom: 6 }}>
        {item.name}
      </div>

      {/* ABV */}
      {item.abv !== "0%" && (
        <div style={{ fontFamily: mono, fontSize: 11, color: C.dim, marginBottom: 16 }}>ABV: {item.abv}</div>
      )}

      {/* Divider */}
      <div style={{ height: 1, background: `linear-gradient(to right, ${color}40, transparent)`, marginBottom: 20 }} />

      {/* Description */}
      <p style={{ fontFamily: sans, fontSize: 14, color: C.cream, lineHeight: 1.8, margin: "0 0 24px" }}>
        {item.desc}
      </p>

      {/* Pairs with */}
      {item.pairs.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: C.dim, marginBottom: 10 }}>
            Pairs with
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {item.pairs.map(p => (
              <span key={p} style={{ fontFamily: sans, fontWeight: 600, fontSize: 12, color,
                background: `${color}12`, border: `1px solid ${color}40`,
                borderRadius: 20, padding: "4px 12px" }}>{p}</span>
            ))}
          </div>
        </div>
      )}

      {/* Substitutes */}
      {item.substitutes.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: C.dim, marginBottom: 10 }}>
            Substitutes
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {item.substitutes.map(s => (
              <div key={s} style={{ fontFamily: sans, fontSize: 13, color: C.muted, paddingLeft: 10, borderLeft: `2px solid ${color}30` }}>{s}</div>
            ))}
          </div>
        </div>
      )}

      {/* Brands */}
      {item.brands?.length > 0 && (
        <div>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: C.dim, marginBottom: 10 }}>
            Brands
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {item.brands.map(b => {
              const tierColors = {
                "The One":      { color: "#e0b84e", bg: "rgba(224,184,78,0.1)",  border: "rgba(224,184,78,0.3)"  },
                "Best":         { color: "#6B8E3E", bg: "rgba(107,142,62,0.1)",  border: "rgba(107,142,62,0.3)"  },
                "Great":        { color: "#6B8E3E", bg: "rgba(107,142,62,0.08)", border: "rgba(107,142,62,0.25)" },
                "Also Great":   { color: "#4A90A4", bg: "rgba(74,144,164,0.1)",  border: "rgba(74,144,164,0.3)"  },
                "Good":         { color: "#4A90A4", bg: "rgba(74,144,164,0.08)", border: "rgba(74,144,164,0.2)"  },
                "Also Good":    { color: "#4A90A4", bg: "rgba(74,144,164,0.08)", border: "rgba(74,144,164,0.2)"  },
                "Budget":       { color: "#887060", bg: "rgba(136,112,96,0.08)", border: "rgba(136,112,96,0.25)" },
                "Make Your Own":{ color: "#b8d96e", bg: "rgba(184,217,110,0.08)",border: "rgba(184,217,110,0.25)"},
                "Craft":        { color: "#a078d4", bg: "rgba(160,120,212,0.08)",border: "rgba(160,120,212,0.25)"},
                "Avoid":        { color: "#e05a5a", bg: "rgba(224,90,90,0.08)",  border: "rgba(224,90,90,0.25)"  },
              };
              const tc = tierColors[b.tier] || tierColors["Good"];
              return (
                <div key={b.name} style={{ padding: "10px 12px", background: tc.bg, border: `1px solid ${tc.border}`, borderRadius: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase",
                      color: tc.color, background: `${tc.color}15`, border: `1px solid ${tc.color}40`,
                      borderRadius: 3, padding: "2px 6px", flexShrink: 0 }}>{b.tier}</span>
                    <span style={{ fontFamily: sans, fontWeight: 700, fontSize: 12, color: C.cream }}>{b.name}</span>
                  </div>
                  <div style={{ fontFamily: sans, fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{b.note}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ModifiersPage() {
  const [activeItem,    setActiveItem]    = useState(null);
  const [activeColor,   setActiveColor]   = useState(C.gold);
  const [activeCat,     setActiveCat]     = useState("All");
  const [search,        setSearch]        = useState("");
  const [tab,           setTab]           = useState("browse");

  const allItems = useMemo(() => MODIFIERS.flatMap(cat => cat.items.map(item => ({ ...item, category: cat.category, color: cat.color }))), []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return allItems.filter(item => {
      const matchCat  = activeCat === "All" || item.category === activeCat;
      const matchSearch = !q || item.name.toLowerCase().includes(q) || item.role.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || item.pairs.some(p => p.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [allItems, activeCat, search]);

  const groupedFiltered = useMemo(() => {
    if (activeCat !== "All") {
      const cat = MODIFIERS.find(c => c.category === activeCat);
      return cat ? [{ ...cat, items: filtered }] : [];
    }
    return MODIFIERS.map(cat => ({
      ...cat,
      items: filtered.filter(i => i.category === cat.category),
    })).filter(c => c.items.length > 0);
  }, [filtered, activeCat]);

  return (
    <>
      <link href={FONT} rel="stylesheet" />
      <style>{STYLES}</style>

      <div style={{ background: C.black, minHeight: "100vh", color: C.cream, fontFamily: sans }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: bebas, fontSize: "clamp(36px,6vw,58px)", color: C.gold, letterSpacing: "0.04em", lineHeight: 1, marginBottom: 8 }}>
            Mixers & Modifiers
          </div>
          <p style={{ fontFamily: sans, fontSize: 13, color: C.muted, maxWidth: 520, lineHeight: 1.75, margin: 0 }}>
            Everything that isn't a base spirit — citrus, syrups, bitters, vermouth, garnishes, carbonation, and the tricks that tie a drink together.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
          {[["browse", "📖 Browse"], ["roles", "🎭 By Role"]].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{
              padding: "8px 16px", background: tab === key ? `${C.gold}18` : "rgba(255,255,255,0.03)",
              border: `1px solid ${tab === key ? C.gold + "60" : C.border}`,
              borderRadius: 20, cursor: "pointer", fontFamily: mono, fontSize: 11,
              letterSpacing: "0.08em", color: tab === key ? C.gold : C.muted, transition: "all 0.15s",
            }}>{label}</button>
          ))}
        </div>

        {/* ── BROWSE TAB ── */}
        {tab === "browse" && (
          <div>
            {/* Category + search bar */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
              {/* Category pills */}
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {["All", ...MODIFIERS.map(c => c.category)].map(cat => {
                  const catData = MODIFIERS.find(c => c.category === cat);
                  const color = catData?.color || C.gold;
                  const active = activeCat === cat;
                  return (
                    <button key={cat} onClick={() => { setActiveCat(cat); setActiveItem(null); }} style={{
                      padding: "5px 12px", background: active ? `${color}18` : "rgba(255,255,255,0.03)",
                      border: `1px solid ${active ? color + "60" : C.border}`,
                      borderRadius: 20, cursor: "pointer", fontFamily: mono, fontSize: 10,
                      letterSpacing: "0.08em", color: active ? color : C.dim,
                      whiteSpace: "nowrap", transition: "all 0.15s",
                    }}>{cat === "All" ? "All" : catData?.emoji + " " + cat}</button>
                  );
                })}
              </div>

              {/* Search */}
              <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
                <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 13, opacity: 0.4 }}>⌕</span>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, role, or spirit…"
                  style={{ width: "100%", padding: "7px 12px 7px 30px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 8, color: C.cream, fontSize: 12, outline: "none", fontFamily: sans, boxSizing: "border-box" }} />
                {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: C.dim, cursor: "pointer", fontSize: 11, fontFamily: mono }}>✕</button>}
              </div>
            </div>

            {/* Two-col layout: list + detail */}
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.3fr)", gap: 16, alignItems: "start" }}>

              {/* Left: grouped list */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {groupedFiltered.length === 0 && (
                  <div style={{ textAlign: "center", padding: "40px 0", color: C.dim, fontFamily: mono, fontSize: 13 }}>No modifiers match.</div>
                )}
                {groupedFiltered.map(cat => (
                  <div key={cat.category}>
                    {/* Category header */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, paddingBottom: 8, borderBottom: `1px solid ${cat.color}30` }}>
                      <span style={{ fontSize: 16 }}>{cat.emoji}</span>
                      <span style={{ fontFamily: sans, fontWeight: 700, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: cat.color }}>{cat.category}</span>
                      <span style={{ fontFamily: mono, fontSize: 10, color: C.dim }}>{cat.items.length}</span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      {cat.items.map(item => (
                        <div key={item.name} className="mod-item"
                          onClick={() => { setActiveItem(item); setActiveColor(cat.color); }}
                          style={{
                            padding: "12px 14px", background: activeItem?.name === item.name ? `${cat.color}12` : C.card,
                            border: `1px solid ${activeItem?.name === item.name ? cat.color + "50" : C.border}`,
                            borderRadius: 8, cursor: "pointer", transition: "all 0.15s",
                            "--cat-color": cat.color,
                          }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                            <div>
                              <div className="mod-name" style={{ fontFamily: sans, fontWeight: 600, fontSize: 13, color: activeItem?.name === item.name ? cat.color : C.cream, transition: "color 0.15s" }}>{item.name}</div>
                              <div style={{ fontFamily: mono, fontSize: 10, color: C.dim, marginTop: 2, letterSpacing: "0.06em" }}>{item.role}</div>
                            </div>
                            {item.abv !== "0%" && (
                              <span style={{ fontFamily: mono, fontSize: 10, color: C.dim, flexShrink: 0 }}>{item.abv}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: detail panel */}
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "24px 24px 28px", position: "sticky", top: 80, minHeight: 300 }}>
                <ItemDetail item={activeItem} color={activeColor} />
              </div>
            </div>
          </div>
        )}

        {/* ── ROLES TAB ── */}
        {tab === "roles" && (
          <div>
            <p style={{ fontFamily: sans, fontSize: 13, color: C.muted, lineHeight: 1.75, marginBottom: 24, maxWidth: 520 }}>
              Every non-spirit ingredient plays one of these roles. Know the role and you can substitute freely — a sour is a sour whether it's lemon or lime.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
              {MODIFIER_ROLES.map(({ role, color, emoji, desc, examples }) => (
                <div key={role} style={{ background: `${color}0e`, border: `1px solid ${color}35`, borderRadius: 12, padding: "20px 20px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 22 }}>{emoji}</span>
                    <div style={{ fontFamily: bebas, fontSize: 26, color, letterSpacing: "0.04em", lineHeight: 1 }}>{role}</div>
                  </div>
                  <p style={{ fontFamily: sans, fontSize: 12, color: C.muted, lineHeight: 1.7, margin: "0 0 14px" }}>{desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {examples.map(ex => (
                      <span key={ex} style={{ fontFamily: mono, fontSize: 10, color, background: `${color}12`, border: `1px solid ${color}30`, borderRadius: 16, padding: "3px 8px" }}>{ex}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
