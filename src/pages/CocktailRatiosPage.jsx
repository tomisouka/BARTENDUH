import { useState } from "react";
import { COCKTAIL_RATIOS, ADJUST_TO_TASTE, SPIRIT_INDEX, CLASSICS } from "../data/classics";

const mono  = "'DM Mono', monospace";
const sans  = "'Inter', system-ui, sans-serif";
const bebas = "'Bebas Neue', sans-serif";
const FONT  = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap";

const C = {
  black: "#080604", dark: "#0e0c09", card: "#181410", border: "#2a2218",
  gold: "#e0b84e", goldD: "#b8904a", cream: "#f5f0e8", muted: "#c8b898", dim: "#887060",
};

const STYLES = `
  @keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
  @keyframes scaleIn { from { opacity:0; transform:scale(0.97) } to { opacity:1; transform:scale(1) } }
  .ratio-card:hover .ratio-glow { opacity: 1 !important; }
  .ratio-card:hover { border-color: var(--card-color, #e0b84e) !important; }
  .example-pill:hover { opacity: 1 !important; transform: translateY(-1px); }
  .spirit-row:hover { background: rgba(255,255,255,0.04) !important; }
`;

// ── Formula visualizer ────────────────────────────────────────────────────────
function FormulaBar({ parts, color }) {
  // Fixed widths per part count to always fill the bar
  const widths = {
    2: [60, 40],
    3: [50, 25, 25],
    4: [45, 20, 15, 20],
  };
  const w = widths[parts.length] || parts.map(() => Math.floor(100 / parts.length));
  const partColors = [color, `${color}88`, `${color}55`, `${color}33`];

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", height: 36, borderRadius: 6, overflow: "hidden", gap: 2 }}>
        {parts.map((p, i) => (
          <div key={p} style={{
            width: `${w[i]}%`, background: partColors[i],
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 10, fontFamily: mono, color: i === 0 ? C.black : C.cream,
            fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
            transition: "all 0.3s",
          }}>{p}</div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 2, marginTop: 4 }}>
        {parts.map((p, i) => (
          <div key={p} style={{ width: `${w[i]}%`, textAlign: "center", fontFamily: mono, fontSize: 9, color: C.dim, letterSpacing: "0.06em" }}>
            {p === "Spirit" ? "2 oz" : p === "Citrus" ? "¾ oz" : p === "Sweet" ? "¾ oz" : p === "Modifier" ? "1 oz" : p === "Mixer" ? "4-6 oz" : p === "Soda" ? "2-3 oz" : p === "Cream / Egg" ? "1 oz" : p === "Liqueur" ? "1 oz" : p === "Garnish" ? "express" : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Ratio card ────────────────────────────────────────────────────────────────
function RatioCard({ ratio, active, onClick }) {
  return (
    <div className="ratio-card" onClick={onClick}
      style={{
        position: "relative", overflow: "hidden",
        background: active ? `linear-gradient(160deg, ${ratio.color}18, ${C.card})` : C.card,
        border: `1px solid ${active ? ratio.color + "60" : C.border}`,
        borderRadius: 14, padding: "22px 22px 18px", cursor: "pointer",
        transition: "border-color 0.2s, background 0.2s",
        animation: "fadeUp 0.4s ease both",
        "--card-color": ratio.color,
      }}>

      {/* Glow orb */}
      <div className="ratio-glow" style={{
        position: "absolute", top: -40, right: -40, width: 140, height: 140,
        borderRadius: "50%", background: `radial-gradient(circle, ${ratio.color}20 0%, transparent 70%)`,
        opacity: active ? 1 : 0, transition: "opacity 0.3s", pointerEvents: "none",
      }}/>

      {/* Method badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
          color: ratio.color, border: `1px solid ${ratio.color}40`, background: `${ratio.color}12`,
          borderRadius: 3, padding: "3px 8px" }}>{ratio.method}</span>
        <span style={{ fontFamily: mono, fontSize: 10, color: C.dim, letterSpacing: "0.06em" }}>
          {ratio.examples.length} drinks
        </span>
      </div>

      {/* Name */}
      <div style={{ fontFamily: bebas, fontSize: 32, color: active ? ratio.color : C.cream,
        letterSpacing: "0.04em", lineHeight: 1, marginBottom: 4, transition: "color 0.2s" }}>
        {ratio.name}
      </div>
      <div style={{ fontFamily: mono, fontSize: 11, color: ratio.color, letterSpacing: "0.12em", marginBottom: 14 }}>
        {ratio.formula}
      </div>

      {/* Mini bar */}
      <div style={{ display: "flex", height: 8, borderRadius: 4, overflow: "hidden", gap: 2 }}>
        {ratio.parts.slice(0, 3).map((p, i) => (
          <div key={p} style={{ flex: i === 0 ? 2 : 1, background: i === 0 ? ratio.color : `${ratio.color}${i === 1 ? "70" : "40"}`, borderRadius: 2 }}/>
        ))}
      </div>

      {/* Example pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 14 }}>
        {ratio.examples.slice(0, 3).map(ex => (
          <span key={ex} className="example-pill"
            style={{ fontFamily: mono, fontSize: 10, color: C.muted, background: "rgba(255,255,255,0.04)",
              border: `1px solid ${C.border}`, borderRadius: 20, padding: "3px 9px",
              opacity: 0.7, transition: "all 0.15s", cursor: "default" }}>{ex}</span>
        ))}
        {ratio.examples.length > 3 && (
          <span style={{ fontFamily: mono, fontSize: 10, color: C.dim, padding: "3px 6px" }}>
            +{ratio.examples.length - 3} more
          </span>
        )}
      </div>
    </div>
  );
}

// ── Expanded detail panel ─────────────────────────────────────────────────────
function RatioDetail({ ratio }) {
  return (
    <div style={{ animation: "scaleIn 0.22s ease both" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
        <div style={{ fontFamily: bebas, fontSize: 52, color: ratio.color, letterSpacing: "0.04em", lineHeight: 1 }}>
          {ratio.name}
        </div>
        <div style={{ fontFamily: mono, fontSize: 14, color: ratio.color, letterSpacing: "0.1em" }}>
          {ratio.formula}
        </div>
        <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
          color: ratio.color, border: `1px solid ${ratio.color}40`, background: `${ratio.color}12`,
          borderRadius: 3, padding: "4px 10px", marginLeft: "auto" }}>{ratio.method}</span>
      </div>

      {/* Formula bar */}
      <FormulaBar parts={ratio.parts} color={ratio.color} />

      {/* Ratio detail */}
      <div style={{ fontFamily: mono, fontSize: 12, color: C.muted, letterSpacing: "0.06em",
        background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`, borderRadius: 8,
        padding: "12px 16px", marginBottom: 20 }}>
        {ratio.ratio_detail}
      </div>

      {/* Description */}
      <p style={{ fontFamily: sans, fontSize: 14, color: C.cream, lineHeight: 1.75, margin: "0 0 20px" }}>
        {ratio.desc}
      </p>

      {/* Mnemonic */}
      <div style={{ background: `${ratio.color}12`, border: `1px solid ${ratio.color}30`,
        borderLeft: `3px solid ${ratio.color}`, borderRadius: 6, padding: "12px 16px", marginBottom: 24 }}>
        <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.2em", color: ratio.color, textTransform: "uppercase", marginBottom: 6 }}>Remember it</div>
        <div style={{ fontFamily: sans, fontSize: 13, color: C.cream, fontStyle: "italic", lineHeight: 1.6 }}>"{ratio.mnemonic}"</div>
      </div>

      {/* Notes */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: C.dim, marginBottom: 10 }}>Bartender Notes</div>
        <p style={{ fontFamily: sans, fontSize: 13, color: C.muted, lineHeight: 1.75, margin: 0 }}>{ratio.notes}</p>
      </div>

      {/* Examples */}
      <div>
        <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: C.dim, marginBottom: 12 }}>Examples</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {ratio.examples.map(ex => (
            <span key={ex} style={{ fontFamily: sans, fontWeight: 600, fontSize: 13, color: ratio.color,
              background: `${ratio.color}12`, border: `1px solid ${ratio.color}40`,
              borderRadius: 20, padding: "6px 14px" }}>{ex}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Spirit index panel ────────────────────────────────────────────────────────
function SpiritIndexPanel() {
  const SPIRIT_COLORS = {
    "Vodka": "#a0c8e8", "Gin": "#7abf8a", "Rum": "#c9a84c",
    "Tequila": "#b8d96e", "Whiskey": "#e0a040", "Brandy": "#d4943c", "Wine": "#8B1A35",
  };
  return (
    <div>
      <div style={{ fontFamily: bebas, fontSize: 38, color: C.gold, letterSpacing: "0.04em", marginBottom: 6 }}>By Spirit</div>
      <p style={{ fontFamily: sans, fontSize: 13, color: C.muted, lineHeight: 1.7, margin: "0 0 24px" }}>
        Know your base spirit — every classic cocktail mapped to what's in the well.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {Object.entries(SPIRIT_INDEX).map(([spirit, drinks]) => {
          const color = SPIRIT_COLORS[spirit] || C.gold;
          return (
            <div key={spirit} className="spirit-row"
              style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 16px",
                background: "rgba(255,255,255,0.025)", border: `1px solid ${C.border}`,
                borderLeft: `3px solid ${color}`, borderRadius: 8, transition: "background 0.15s" }}>
              <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 13, color, minWidth: 70, flexShrink: 0, paddingTop: 1 }}>{spirit}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {drinks.map(d => (
                  <span key={d} style={{ fontFamily: mono, fontSize: 11, color: C.muted,
                    background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`,
                    borderRadius: 16, padding: "3px 10px" }}>{d}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Adjust to taste panel ─────────────────────────────────────────────────────
function AdjustPanel() {
  return (
    <div>
      <div style={{ fontFamily: bebas, fontSize: 38, color: C.gold, letterSpacing: "0.04em", marginBottom: 6 }}>Adjust to Taste</div>
      <p style={{ fontFamily: sans, fontSize: 13, color: C.muted, lineHeight: 1.7, margin: "0 0 24px" }}>
        Something's off — here's how to fix it without starting over.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {ADJUST_TO_TASTE.map(({ problem, fix, emoji }) => (
          <div key={problem}
            style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "16px 18px",
              background: C.card, border: `1px solid ${C.border}`, borderRadius: 10 }}>
            <span style={{ fontSize: 22, flexShrink: 0, marginTop: 1 }}>{emoji}</span>
            <div>
              <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 13, color: "#e05a5a", marginBottom: 4 }}>{problem}</div>
              <div style={{ fontFamily: sans, fontSize: 13, color: C.muted, lineHeight: 1.65 }}>{fix}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
const SIDE_TABS = [
  { key: "ratios",  label: "📐 Formulas",     desc: "The 6 core templates" },
  { key: "spirits", label: "🥃 By Spirit",    desc: "What to make with what" },
  { key: "adjust",  label: "⚖️ Adjust",       desc: "Fix a drink mid-pour" },
];

export default function CocktailRatiosPage() {
  const [activeRatio, setActiveRatio] = useState(COCKTAIL_RATIOS[0]);
  const [sideTab,     setSideTab]     = useState("ratios");

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href={FONT} rel="stylesheet" />
      <style>{STYLES}</style>

      <div style={{ background: C.black, minHeight: "100vh", color: C.cream, fontFamily: sans }}>

        {/* Page header */}
        <div style={{ padding: "0 0 32px" }}>
          <div style={{ fontFamily: bebas, fontSize: "clamp(40px,6vw,64px)", color: C.gold,
            letterSpacing: "0.04em", lineHeight: 1, marginBottom: 8 }}>Cocktail Formulas</div>
          <p style={{ fontFamily: sans, fontSize: 13, color: C.dim, margin: 0, maxWidth: 480, lineHeight: 1.7 }}>
            Every cocktail is built on one of six templates. Learn the formula and you can riff on anything — no memorizing recipes.
          </p>
        </div>

        {/* Side tab selector */}
        <div style={{ display: "flex", gap: 6, marginBottom: 28, flexWrap: "wrap" }}>
          {SIDE_TABS.map(({ key, label, desc }) => (
            <button key={key} onClick={() => setSideTab(key)} style={{
              padding: "10px 18px", background: sideTab === key ? `${C.gold}18` : "rgba(255,255,255,0.03)",
              border: `1px solid ${sideTab === key ? C.gold + "60" : C.border}`,
              borderRadius: 10, cursor: "pointer", textAlign: "left", transition: "all 0.15s",
            }}>
              <div style={{ fontFamily: sans, fontWeight: 600, fontSize: 13, color: sideTab === key ? C.gold : C.muted }}>{label}</div>
              <div style={{ fontFamily: mono, fontSize: 10, color: C.dim, marginTop: 2 }}>{desc}</div>
            </button>
          ))}
        </div>

        {/* ── Formulas view — two column ── */}
        {sideTab === "ratios" && (
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.5fr)", gap: 20, alignItems: "start" }}>

            {/* Left: card grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, alignContent: "start" }}>
              {COCKTAIL_RATIOS.map((r, i) => (
                <div key={r.name} style={{ animationDelay: `${i * 0.06}s` }}>
                  <RatioCard ratio={r} active={activeRatio?.name === r.name} onClick={() => setActiveRatio(r)} />
                </div>
              ))}
            </div>

            {/* Right: detail */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "28px 28px 32px", position: "sticky", top: 80 }}>
              {activeRatio
                ? <RatioDetail ratio={activeRatio} />
                : <div style={{ color: C.dim, fontFamily: mono, fontSize: 13, textAlign: "center", padding: "60px 0" }}>← pick a formula</div>
              }
            </div>
          </div>
        )}

        {sideTab === "spirits" && (
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "28px 28px 32px" }}>
            <SpiritIndexPanel />
          </div>
        )}

        {sideTab === "adjust" && (
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "28px 28px 32px", maxWidth: 640 }}>
            <AdjustPanel />
          </div>
        )}

      </div>
    </>
  );
}
