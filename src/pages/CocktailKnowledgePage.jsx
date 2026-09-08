import { useState, useMemo } from "react";
import { COCKTAIL_KNOWLEDGE, FLAVOR_TAGS, COCKTAIL_ERAS } from "../data/cocktailKnowledge";
import { RECIPES } from "../data/gunthers";

const mono  = "'DM Mono', monospace";
const sans  = "'Inter', system-ui, sans-serif";
const bebas = "'Bebas Neue', sans-serif";
const FONT  = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap";

const C = {
  black: "#080604", dark: "#0e0c09", card: "#181410", border: "#2a2218",
  gold: "#e0b84e", goldD: "#b8904a", cream: "#f5f0e8", muted: "#c8b898", dim: "#887060",
};

const STYLES = `
  @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  .ck-row:hover { background: rgba(255,255,255,0.04) !important; }
  .ck-row:hover .ck-name { color: var(--accent) !important; }
  .tag-pill { transition: all 0.15s; }
  .tag-pill:hover { opacity: 1 !important; transform: translateY(-1px); }
`;

const DIFFICULTY_LABELS = { 1: "Easy", 2: "Medium", 3: "Advanced" };
const DIFFICULTY_COLORS = { 1: "#6B8E3E", 2: "#C9A84C", 3: "#e05a5a" };

const SPIRITS = ["All", "Gin", "Vodka", "Whiskey", "Bourbon", "Rye Whiskey", "Rum", "Dark Rum", "Tequila", "Cognac", "Scotch", "Low ABV", "Cachaça"];

// ── Tag pill ──────────────────────────────────────────────────────────────────
const IBA_COLORS = {
  "IBA Unforgettable": "#e0b84e",
  "IBA Contemporary":  "#4A90A4",
  "IBA New Era":       "#7abf8a",
};

function TagPill({ tag, small }) {
  const color = IBA_COLORS[tag] || FLAVOR_TAGS[tag] || C.dim;
  return (
    <span className="tag-pill" style={{
      fontFamily: mono, fontSize: small ? 9 : 10, letterSpacing: "0.08em",
      color, background: `${color}12`, border: `1px solid ${color}35`,
      borderRadius: 20, padding: small ? "2px 7px" : "3px 9px",
      opacity: 0.85, whiteSpace: "nowrap",
    }}>{tag}</span>
  );
}

// ── Cocktail detail panel ─────────────────────────────────────────────────────
function CocktailDetail({ name, knowledge, recipe }) {
  const [section, setSection] = useState("overview");
  if (!knowledge) return <div style={{ color: C.dim, fontFamily: mono, fontSize: 13, textAlign: "center", padding: "60px 0" }}>← select a cocktail</div>;

  const accentColor = FLAVOR_TAGS[knowledge.tags?.[0]] || C.gold;

  const SECTIONS = [
    { key: "overview",    label: "Overview"   },
    { key: "history",     label: "History"    },
    { key: "technique",   label: "Technique"  },
    { key: "variations",  label: `Variations (${knowledge.variations?.length || 0})` },
  ];

  return (
    <div style={{ animation: "fadeUp 0.2s ease both" }}>
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
          <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase",
            color: accentColor, border: `1px solid ${accentColor}40`, background: `${accentColor}12`,
            borderRadius: 3, padding: "3px 8px" }}>{knowledge.spirit}</span>
          <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.12em",
            color: DIFFICULTY_COLORS[knowledge.difficulty], border: `1px solid ${DIFFICULTY_COLORS[knowledge.difficulty]}40`,
            background: `${DIFFICULTY_COLORS[knowledge.difficulty]}12`, borderRadius: 3, padding: "3px 8px" }}>
            {DIFFICULTY_LABELS[knowledge.difficulty]}
          </span>
          {recipe && <span style={{ fontFamily: mono, fontSize: 10, color: C.gold, border: `1px solid ${C.gold}40`, background: `${C.gold}12`, borderRadius: 3, padding: "3px 8px" }}>On Gunthers's Menu</span>}
        </div>
        <div style={{ fontFamily: bebas, fontSize: 44, color: accentColor, letterSpacing: "0.04em", lineHeight: 1, marginBottom: 10 }}>{name}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {knowledge.tags?.map(t => <TagPill key={t} tag={t} />)}
        </div>
      </div>

      {/* Sub-nav */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: `1px solid ${C.border}`, paddingBottom: 0 }}>
        {SECTIONS.map(({ key, label }) => (
          <button key={key} onClick={() => setSection(key)} style={{
            padding: "8px 14px", background: "transparent",
            border: "none", borderBottom: `2px solid ${section === key ? accentColor : "transparent"}`,
            cursor: "pointer", fontFamily: mono, fontSize: 11, letterSpacing: "0.08em",
            color: section === key ? accentColor : C.dim, transition: "all 0.15s", marginBottom: -1,
          }}>{label}</button>
        ))}
      </div>

      {/* Overview */}
      {section === "overview" && (
        <div style={{ animation: "fadeUp 0.15s ease both" }}>
          {/* Recipe if on Gunthers's menu */}
          {recipe && (
            <div style={{ marginBottom: 20, padding: "16px 18px", background: `${C.gold}08`, border: `1px solid ${C.gold}25`, borderRadius: 10 }}>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: C.goldD, marginBottom: 10 }}>Gunthers's Recipe</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {recipe.ingredients.map((ing, i) => (
                  <div key={i} style={{ fontFamily: sans, fontSize: 13, color: C.muted, display: "flex", gap: 8 }}>
                    <span style={{ color: C.goldD, flexShrink: 0 }}>—</span>{ing}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Why it works */}
          {knowledge.why_it_works && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: C.dim, marginBottom: 8 }}>Why It Works</div>
              <p style={{ fontFamily: sans, fontSize: 13, color: C.cream, lineHeight: 1.8, margin: 0 }}>{knowledge.why_it_works}</p>
            </div>
          )}

          {/* If you like this */}
          {knowledge.try_if_you_like?.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: C.dim, marginBottom: 10 }}>If You Like This, Try</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {knowledge.try_if_you_like.map(drink => (
                  <span key={drink} style={{ fontFamily: sans, fontWeight: 600, fontSize: 12, color: accentColor,
                    background: `${accentColor}12`, border: `1px solid ${accentColor}40`,
                    borderRadius: 20, padding: "5px 12px", cursor: "default" }}>{drink}</span>
                ))}
              </div>
            </div>
          )}

          {/* Common mistakes */}
          {knowledge.common_mistakes?.length > 0 && (
            <div>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: C.dim, marginBottom: 10 }}>Common Mistakes</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {knowledge.common_mistakes.map((m, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, padding: "8px 12px", background: "rgba(224,90,90,0.06)", border: "1px solid rgba(224,90,90,0.2)", borderRadius: 6 }}>
                    <span style={{ color: "#e05a5a", flexShrink: 0, fontSize: 12 }}>✗</span>
                    <span style={{ fontFamily: sans, fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* History */}
      {section === "history" && (
        <div style={{ animation: "fadeUp 0.15s ease both" }}>
          <p style={{ fontFamily: sans, fontSize: 14, color: C.cream, lineHeight: 1.85, margin: 0 }}>{knowledge.history}</p>
        </div>
      )}

      {/* Technique */}
      {section === "technique" && (
        <div style={{ animation: "fadeUp 0.15s ease both" }}>
          <div style={{ padding: "18px 20px", background: `${accentColor}08`, border: `1px solid ${accentColor}25`, borderLeft: `3px solid ${accentColor}`, borderRadius: 10, marginBottom: 20 }}>
            <p style={{ fontFamily: sans, fontSize: 13, color: C.cream, lineHeight: 1.85, margin: 0 }}>{knowledge.technique}</p>
          </div>
          {recipe?.instructions && (
            <div>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: C.dim, marginBottom: 8 }}>Gunthers's Method</div>
              <p style={{ fontFamily: sans, fontSize: 13, color: C.muted, lineHeight: 1.8, margin: 0 }}>{recipe.instructions}</p>
            </div>
          )}
        </div>
      )}

      {/* Variations */}
      {section === "variations" && (
        <div style={{ animation: "fadeUp 0.15s ease both" }}>
          {knowledge.variations?.length === 0
            ? <div style={{ color: C.dim, fontFamily: mono, fontSize: 13, padding: "20px 0" }}>No documented variations.</div>
            : <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {knowledge.variations?.map(v => (
                  <div key={v.name} style={{ padding: "16px 18px", background: C.card, border: `1px solid ${C.border}`, borderLeft: `3px solid ${accentColor}50`, borderRadius: 10 }}>
                    <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 14, color: accentColor, marginBottom: 6 }}>{v.name}</div>
                    <p style={{ fontFamily: sans, fontSize: 13, color: C.muted, lineHeight: 1.7, margin: 0 }}>{v.change}</p>
                  </div>
                ))}
              </div>
          }
        </div>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
const TABS = [
  { key: "all",  label: "📖 All Cocktails" },
  { key: "eras", label: "📅 By Era"        },
];

export default function CocktailKnowledgePage() {
  const [tab,          setTab]          = useState("all");
  const [activeKey,    setActiveKey]    = useState(null);
  const [search,       setSearch]       = useState("");
  const [spiritFilter, setSpiritFilter] = useState("All");
  const [tagFilter,    setTagFilter]    = useState(null);
  const [diffFilter,   setDiffFilter]   = useState(null);

  // Merge knowledge with gunthers recipes
  const allEntries = useMemo(() => {
    return Object.entries(COCKTAIL_KNOWLEDGE).map(([name, knowledge]) => ({
      name,
      knowledge,
      recipe: RECIPES[name] || null,
      onMenu: !!RECIPES[name],
    }));
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return allEntries.filter(({ name, knowledge }) => {
      const matchSearch = !q || name.toLowerCase().includes(q) || knowledge.spirit?.toLowerCase().includes(q) || knowledge.tags?.some(t => t.toLowerCase().includes(q));
      const matchSpirit = spiritFilter === "All" || knowledge.spirit === spiritFilter;
      const matchTag    = !tagFilter || knowledge.tags?.includes(tagFilter);
      const matchDiff   = !diffFilter || knowledge.difficulty === diffFilter;
      return matchSearch && matchSpirit && matchTag && matchDiff;
    });
  }, [allEntries, search, spiritFilter, tagFilter, diffFilter]);

  const activeEntry = filtered.find(e => e.name === activeKey) || null;

  // All unique tags across all cocktails
  const allTags = useMemo(() => {
    const tags = new Set();
    allEntries.forEach(e => e.knowledge.tags?.forEach(t => tags.add(t)));
    return [...tags].sort();
  }, [allEntries]);

  return (
    <>
      <link href={FONT} rel="stylesheet" />
      <style>{STYLES}</style>

      <div style={{ background: C.black, minHeight: "100vh", color: C.cream, fontFamily: sans }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: bebas, fontSize: "clamp(36px,6vw,58px)", color: C.gold, letterSpacing: "0.04em", lineHeight: 1, marginBottom: 8 }}>
            Cocktail Knowledge
          </div>
          <p style={{ fontFamily: sans, fontSize: 13, color: C.muted, maxWidth: 520, lineHeight: 1.75, margin: 0 }}>
            {allEntries.length} cocktails — history, technique, variations, and why each one works. Gunthers recipes included.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
          {TABS.map(({ key, label }) => (
            <button key={key} onClick={() => setTab(key)} style={{
              padding: "8px 16px", background: tab === key ? `${C.gold}18` : "rgba(255,255,255,0.03)",
              border: `1px solid ${tab === key ? C.gold + "60" : C.border}`,
              borderRadius: 20, cursor: "pointer", fontFamily: mono, fontSize: 11,
              letterSpacing: "0.08em", color: tab === key ? C.gold : C.muted, transition: "all 0.15s",
            }}>{label}</button>
          ))}
        </div>

        {/* ── ALL COCKTAILS ── */}
        {tab === "all" && (
          <div>
            {/* Filters */}
            <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
              {/* Search */}
              <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
                <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 13, opacity: 0.4 }}>⌕</span>
                <input value={search} onChange={e => { setSearch(e.target.value); setActiveKey(null); }} placeholder="Search cocktails, spirits, tags…"
                  style={{ width: "100%", padding: "7px 12px 7px 30px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 8, color: C.cream, fontSize: 12, outline: "none", fontFamily: sans, boxSizing: "border-box" }} />
                {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: C.dim, cursor: "pointer", fontSize: 11 }}>✕</button>}
              </div>
              {/* Spirit */}
              <select value={spiritFilter} onChange={e => { setSpiritFilter(e.target.value); setActiveKey(null); }}
                style={{ padding: "7px 10px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, color: C.muted, fontFamily: mono, fontSize: 11, cursor: "pointer", outline: "none" }}>
                {SPIRITS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {/* Difficulty */}
              {[null, 1, 2, 3].map(d => (
                <button key={d} onClick={() => { setDiffFilter(d === diffFilter ? null : d); setActiveKey(null); }} style={{
                  padding: "6px 11px", background: diffFilter === d && d !== null ? `${DIFFICULTY_COLORS[d]}18` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${diffFilter === d && d !== null ? DIFFICULTY_COLORS[d] + "60" : C.border}`,
                  borderRadius: 20, cursor: "pointer", fontFamily: mono, fontSize: 10,
                  color: diffFilter === d && d !== null ? DIFFICULTY_COLORS[d] : C.dim, transition: "all 0.15s",
                }}>{d === null ? "All Levels" : DIFFICULTY_LABELS[d]}</button>
              ))}
            </div>

            {/* IBA filter strip */}
            <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontFamily: mono, fontSize: 10, color: C.dim, letterSpacing: "0.1em" }}>IBA:</span>
              {["IBA Unforgettable", "IBA Contemporary", "IBA New Era"].map(tag => {
                const color = IBA_COLORS[tag];
                const active = tagFilter === tag;
                return (
                  <button key={tag} onClick={() => { setTagFilter(active ? null : tag); setActiveKey(null); }}
                    style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.08em", color,
                      background: active ? `${color}20` : `${color}08`,
                      border: `1px solid ${active ? color + "60" : color + "25"}`,
                      borderRadius: 20, padding: "3px 10px", cursor: "pointer", opacity: active ? 1 : 0.7,
                    }}>{tag}</button>
                );
              })}
            </div>

            {/* Flavor tag filter strip */}
            <div style={{ display: "flex", gap: 5, marginBottom: 16, flexWrap: "wrap" }}>
              {allTags.filter(t => !t.startsWith("IBA")).map(tag => {
                const color = FLAVOR_TAGS[tag] || C.dim;
                const active = tagFilter === tag;
                return (
                  <button key={tag} onClick={() => { setTagFilter(active ? null : tag); setActiveKey(null); }} className="tag-pill"
                    style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.08em", color,
                      background: active ? `${color}20` : `${color}08`,
                      border: `1px solid ${active ? color + "60" : color + "25"}`,
                      borderRadius: 20, padding: "3px 9px", cursor: "pointer", opacity: active ? 1 : 0.6,
                    }}>{tag}</button>
                );
              })}
            </div>

            {/* Two-col layout */}
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.4fr)", gap: 16, alignItems: "start" }}>

              {/* Left: list */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontFamily: mono, fontSize: 10, color: C.dim, letterSpacing: "0.1em", marginBottom: 6 }}>
                  {filtered.length} cocktails
                </div>
                {filtered.length === 0 && (
                  <div style={{ textAlign: "center", padding: "40px 0", color: C.dim, fontFamily: mono, fontSize: 13 }}>Nothing matches.</div>
                )}
                {filtered.map(({ name, knowledge, onMenu }) => {
                  const accent = FLAVOR_TAGS[knowledge.tags?.[0]] || C.gold;
                  const isActive = activeKey === name;
                  return (
                    <div key={name} className="ck-row"
                      onClick={() => setActiveKey(isActive ? null : name)}
                      style={{
                        padding: "12px 14px", background: isActive ? `${accent}10` : C.card,
                        border: `1px solid ${isActive ? accent + "50" : C.border}`,
                        borderRadius: 8, cursor: "pointer", transition: "all 0.15s",
                        "--accent": accent,
                      }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="ck-name" style={{ fontFamily: sans, fontWeight: 700, fontSize: 14, color: isActive ? accent : C.cream, transition: "color 0.15s", marginBottom: 4 }}>{name}</div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                            {knowledge.tags?.slice(0, 4).map(t => <TagPill key={t} tag={t} small />)}
                          </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                          <span style={{ fontFamily: mono, fontSize: 9, color: DIFFICULTY_COLORS[knowledge.difficulty] }}>
                            {DIFFICULTY_LABELS[knowledge.difficulty]}
                          </span>
                          {onMenu && <span style={{ fontFamily: mono, fontSize: 9, color: C.goldD }}>Gunthers's</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right: detail */}
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "24px 24px 28px", position: "sticky", top: 80, minHeight: 300 }}>
                <CocktailDetail
                  name={activeEntry?.name}
                  knowledge={activeEntry?.knowledge}
                  recipe={activeEntry?.recipe}
                />
              </div>
            </div>
          </div>
        )}

        {/* ── BY ERA ── */}
        {tab === "eras" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {COCKTAIL_ERAS.map(({ era, color, desc, drinks }) => (
              <div key={era} style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `3px solid ${color}`, borderRadius: 14, padding: "22px 24px" }}>
                <div style={{ fontFamily: bebas, fontSize: 28, color, letterSpacing: "0.04em", marginBottom: 4 }}>{era}</div>
                <p style={{ fontFamily: sans, fontSize: 13, color: C.muted, lineHeight: 1.7, margin: "0 0 16px" }}>{desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {drinks.map(d => {
                    const k = COCKTAIL_KNOWLEDGE[d];
                    const accent = k ? FLAVOR_TAGS[k.tags?.[0]] || color : color;
                    return (
                      <button key={d} onClick={() => { setTab("all"); setActiveKey(d); }}
                        style={{ fontFamily: sans, fontWeight: 600, fontSize: 13, color: accent,
                          background: `${accent}10`, border: `1px solid ${accent}35`,
                          borderRadius: 20, padding: "7px 14px", cursor: "pointer", transition: "all 0.15s",
                        }}>{d}</button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </>
  );
}
