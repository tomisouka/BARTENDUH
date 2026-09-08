import { useState } from "react";
import { WHISKEY_TYPES, QUICK_COMPARE } from "../data/whiskey";

const FONT = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap";

const C = {
  bg: "#07060A", dark: "#0e0c12", card: "#13111a", border: "#2a2535",
  gold: "#C9A84C", goldL: "#e8c96a", goldD: "#9a7a30", amber: "#D4820A",
  cream: "#f0ead8", muted: "#a099b8", dim: "#5a5470",
  red: "#c84040", blue: "#4a8ab8", green: "#4a9a60", purple: "#8060b8", teal: "#409890",
};

function Card({ type, expanded, onToggle }) {
  return (
    <div onClick={onToggle} style={{ background: expanded ? `${type.color}12` : C.card, border: `1px solid ${expanded ? type.color + "60" : C.border}`, borderRadius: 16, padding: "20px 22px", cursor: "pointer", transition: "all 0.25s ease", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: type.color, borderRadius: "3px 0 0 3px" }} />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 20 }}>{type.flag}</span>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: type.color, fontWeight: 700 }}>{type.name}</span>
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, marginBottom: expanded ? 16 : 0 }}>
            {type.origin} · {type.grain} · {type.flavor}
          </div>
        </div>
        <div style={{ color: type.color, fontSize: 18, fontFamily: "'DM Mono', monospace", flexShrink: 0, marginTop: 4 }}>{expanded ? "▲" : "▼"}</div>
      </div>

      {expanded && (
        <div style={{ animation: "fadeIn 0.2s ease" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.cream, lineHeight: 1.8, marginBottom: 20 }}>{type.desc}</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
            {[["Grain", type.grain], ["Aging", type.aging], ["Min ABV", type.abv]].map(([k, v]) => (
              <div key={k} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 14px" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.dim, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 3 }}>{k}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.cream, fontWeight: 600 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.18em", color: type.color, textTransform: "uppercase", marginBottom: 10 }}>Legal Requirements</div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {type.rules.map((r, i) => (
                <li key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, padding: "5px 0", borderBottom: `1px solid rgba(255,255,255,0.04)`, display: "flex", gap: 10 }}>
                  <span style={{ color: type.color, flexShrink: 0 }}>—</span>{r}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: `${type.color}15`, border: `1px solid ${type.color}40`, borderRadius: 10, padding: "12px 16px", marginBottom: 20 }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.18em", color: type.color, textTransform: "uppercase", marginBottom: 6 }}>💡 Key Fact</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.cream, lineHeight: 1.65 }}>{type.myth}</div>
          </div>
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.18em", color: C.dim, textTransform: "uppercase", marginBottom: 10 }}>On Gunthers's Menu</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {type.brands.map(b => (
                <span key={b} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: type.color, background: `${type.color}18`, border: `1px solid ${type.color}40`, borderRadius: 20, padding: "4px 12px" }}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function WhiskeyPage() {
  const [expanded, setExpanded] = useState("Bourbon");
  const [compareOpen, setCompareOpen] = useState(false);
  const toggle = (name) => setExpanded(e => e === name ? null : name);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href={FONT} rel="stylesheet" />
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideDown { from { opacity: 0; max-height: 0; } to { opacity: 1; max-height: 1000px; } }
        .wrow:hover { background: rgba(255,255,255,0.04) !important; }
      `}</style>

      <div style={{ color: C.cream, paddingBottom: 60 }}>
        {/* Hero */}
        <div style={{ textAlign: "center", padding: "40px 0 48px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.3em", color: C.goldD, textTransform: "uppercase", marginBottom: 14 }}>The Whiskey Family</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,6vw,52px)", fontWeight: 900, color: C.cream, margin: "0 0 16px", lineHeight: 1.1 }}>Bourbon vs. Whiskey</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.muted, maxWidth: 480, margin: "0 auto", lineHeight: 1.8 }}>
            All bourbon is whiskey. Not all whiskey is bourbon. Here's why — and how every style on Gunthers's menu fits into the family.
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 14, marginTop: 28, background: `${C.amber}15`, border: `1px solid ${C.amber}50`, borderRadius: 12, padding: "14px 24px" }}>
            <span style={{ fontSize: 24 }}>🥃</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.amber, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>The Golden Rule</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: C.cream, fontStyle: "italic" }}>Bourbon = American whiskey made from ≥51% corn, aged in new charred oak, with no additives.</div>
            </div>
          </div>
        </div>

        {/* Quick compare table */}
        <div style={{ margin: "36px 0 0" }}>
          <div onClick={() => setCompareOpen(o => !o)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", background: C.card, border: `1px solid ${C.border}`, borderRadius: compareOpen ? "12px 12px 0 0" : 12, cursor: "pointer" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: "0.2em", color: C.gold, textTransform: "uppercase" }}>📊 Side-by-Side Comparison</div>
            <span style={{ color: C.goldD, fontFamily: "'DM Mono', monospace" }}>{compareOpen ? "▲" : "▼"}</span>
          </div>
          {compareOpen && (
            <div style={{ border: `1px solid ${C.border}`, borderTop: "none", borderRadius: "0 0 12px 12px", overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: "rgba(201,168,76,0.08)" }}>
                      <th style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: C.gold, textTransform: "uppercase", padding: "12px 16px", textAlign: "left", fontWeight: 400, borderBottom: `1px solid ${C.border}` }}></th>
                      {["Bourbon", "Scotch", "Irish", "Canadian"].map(h => (
                        <th key={h} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: C.gold, textTransform: "uppercase", padding: "12px 16px", textAlign: "left", fontWeight: 400, borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {QUICK_COMPARE.map((row, i) => (
                      <tr key={i} className="wrow" style={{ borderBottom: `1px solid ${C.border}`, transition: "background 0.1s" }}>
                        <td style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.dim, padding: "11px 16px", whiteSpace: "nowrap", letterSpacing: "0.08em", textTransform: "uppercase" }}>{row.label}</td>
                        <td style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.cream, padding: "11px 16px" }}>{row.bourbon}</td>
                        <td style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.cream, padding: "11px 16px" }}>{row.scotch}</td>
                        <td style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.cream, padding: "11px 16px" }}>{row.irish}</td>
                        <td style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.cream, padding: "11px 16px" }}>{row.canadian}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Whiskey family tree */}
        <div style={{ margin: "40px 0 32px", padding: "24px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 16 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.2em", color: C.dim, textTransform: "uppercase", marginBottom: 16, textAlign: "center" }}>The Whiskey Family Tree</div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
            <div style={{ background: `${C.gold}20`, border: `2px solid ${C.gold}`, borderRadius: 10, padding: "10px 28px", fontFamily: "'Playfair Display', serif", fontSize: 18, color: C.gold, fontWeight: 700 }}>WHISKEY / WHISKY</div>
            <div style={{ width: 2, height: 20, background: C.border }} />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
              {[
                { name: "Bourbon",   color: C.amber,    sub: "American" },
                { name: "Tennessee", color: "#c87830",  sub: "American" },
                { name: "Rye",       color: "#b86030",  sub: "American" },
                { name: "Scotch",    color: C.goldD,    sub: "Scottish" },
                { name: "Irish",     color: C.green,    sub: "Irish"    },
                { name: "Canadian",  color: C.blue,     sub: "Canadian" },
              ].map(({ name, color, sub }) => (
                <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 2, height: 16, background: C.border }} />
                  <div onClick={(e) => { e.stopPropagation(); toggle(name); }} style={{ background: `${color}18`, border: `1px solid ${color}60`, borderRadius: 8, padding: "8px 14px", textAlign: "center", cursor: "pointer" }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color, fontWeight: 600 }}>{name}</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.dim, marginTop: 2 }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cards */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.2em", color: C.dim, textTransform: "uppercase", marginBottom: 16 }}>Click any type to expand</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {WHISKEY_TYPES.map(type => (
              <Card key={type.name} type={type} expanded={expanded === type.name} onToggle={() => toggle(type.name)} />
            ))}
          </div>
        </div>

        {/* Cheat sheet */}
        <div style={{ marginTop: 40, padding: "24px", background: `${C.amber}0f`, border: `1px solid ${C.amber}30`, borderRadius: 16, textAlign: "center" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: C.amber, marginBottom: 16 }}>The Bartender's Cheat Sheet</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              ["Bourbon",   "Sweet → Manhattan, Old Fashioned, Whiskey Sour", C.amber  ],
              ["Tennessee", "Smooth → Jack & Coke, Lynchburg Lemonade",       "#c87830"],
              ["Scotch",    "Smoky → Neat, on the rocks, Rob Roy",             C.goldD  ],
              ["Irish",     "Light → Irish Coffee, neat",                      C.green  ],
              ["Rye",       "Spicy → Manhattan, Sazerac",                      "#b86030"],
            ].map(([type, use, color]) => (
              <div key={type} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 16px", textAlign: "left", minWidth: 200, flex: "1 1 200px" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, color, marginBottom: 4 }}>{type}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{use}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}