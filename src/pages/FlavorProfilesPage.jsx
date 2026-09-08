import { useState } from "react";
import { FLAVOR_PROFILES } from "../data/deepdives";

const mono  = "'DM Mono', monospace";
const sans  = "'Inter', system-ui, sans-serif";
const bebas = "'Bebas Neue', sans-serif";
const FONT  = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap";
const C = { black: "#080604", card: "#181410", border: "#2a2218", gold: "#e0b84e", goldD: "#b8904a", cream: "#f5f0e8", muted: "#c8b898", dim: "#887060" };

const TABS = [
  { key: "dimensions", label: "🎨 The 5 Dimensions" },
  { key: "map",        label: "📊 Spirit Map"        },
  { key: "rules",      label: "⚖️ Balance Rules"     },
];

function DotRating({ value, max = 5, color }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: max }, (_, i) => (
        <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i < value ? color : "rgba(255,255,255,0.08)", transition: "background 0.2s" }} />
      ))}
    </div>
  );
}

export default function FlavorProfilesPage() {
  const [tab,    setTab]    = useState("dimensions");
  const [active, setActive] = useState(FLAVOR_PROFILES.dimensions[0]);

  return (
    <>
      <link href={FONT} rel="stylesheet" />
      <div style={{ background: C.black, minHeight: "100vh", color: C.cream, fontFamily: sans }}>

        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: bebas, fontSize: "clamp(36px,6vw,58px)", color: C.gold, letterSpacing: "0.04em", lineHeight: 1, marginBottom: 8 }}>Flavor Profiles</div>
          <p style={{ fontFamily: sans, fontSize: 13, color: C.muted, maxWidth: 520, lineHeight: 1.75, margin: 0 }}>{FLAVOR_PROFILES.intro}</p>
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
          {TABS.map(({ key, label }) => (
            <button key={key} onClick={() => setTab(key)} style={{
              padding: "8px 16px", background: tab === key ? `${C.gold}18` : "rgba(255,255,255,0.03)",
              border: `1px solid ${tab === key ? C.gold + "60" : C.border}`,
              borderRadius: 20, cursor: "pointer", fontFamily: mono, fontSize: 11,
              letterSpacing: "0.08em", color: tab === key ? C.gold : C.muted, transition: "all 0.15s",
            }}>{label}</button>
          ))}
        </div>

        {/* 5 Dimensions */}
        {tab === "dimensions" && (
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.5fr)", gap: 16, alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {FLAVOR_PROFILES.dimensions.map(d => (
                <div key={d.name} onClick={() => setActive(d)}
                  style={{ padding: "14px 16px", background: active.name === d.name ? `${d.color}15` : C.card,
                    border: `1px solid ${active.name === d.name ? d.color + "60" : C.border}`,
                    borderLeft: `3px solid ${d.color}`, borderRadius: 10, cursor: "pointer", transition: "all 0.15s",
                    display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 22 }}>{d.emoji}</span>
                  <div>
                    <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 14, color: active.name === d.name ? d.color : C.cream }}>{d.name}</div>
                    <div style={{ fontFamily: mono, fontSize: 10, color: C.dim, marginTop: 2 }}>{d.sources.slice(0, 2).join(" · ")}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "24px 24px 28px", position: "sticky", top: 80 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                <span style={{ fontSize: 36 }}>{active.emoji}</span>
                <div style={{ fontFamily: bebas, fontSize: 40, color: active.color, letterSpacing: "0.04em", lineHeight: 1 }}>{active.name}</div>
              </div>
              <p style={{ fontFamily: sans, fontSize: 13, color: C.cream, lineHeight: 1.75, margin: "0 0 20px" }}>{active.desc}</p>

              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: active.color, marginBottom: 8 }}>Sources</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                {active.sources.map(s => (
                  <span key={s} style={{ fontFamily: mono, fontSize: 11, color: C.muted, background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 16, padding: "3px 10px" }}>{s}</span>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                <div style={{ background: "rgba(224,90,90,0.08)", border: "1px solid rgba(224,90,90,0.25)", borderRadius: 8, padding: "12px 14px" }}>
                  <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.18em", color: "#e05a5a", textTransform: "uppercase", marginBottom: 6 }}>Too Much</div>
                  <p style={{ fontFamily: sans, fontSize: 12, color: C.muted, lineHeight: 1.65, margin: 0 }}>{active.too_much}</p>
                </div>
                <div style={{ background: "rgba(107,142,62,0.08)", border: "1px solid rgba(107,142,62,0.25)", borderRadius: 8, padding: "12px 14px" }}>
                  <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.18em", color: "#6B8E3E", textTransform: "uppercase", marginBottom: 6 }}>Too Little</div>
                  <p style={{ fontFamily: sans, fontSize: 12, color: C.muted, lineHeight: 1.65, margin: 0 }}>{active.too_little}</p>
                </div>
              </div>

              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: active.color, marginBottom: 8 }}>Spirits that taste {active.name.toLowerCase()}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {active.spirits_that_read_sweet?.map(s => <span key={s} style={{ fontFamily: mono, fontSize: 11, color: active.color, background: `${active.color}12`, border: `1px solid ${active.color}40`, borderRadius: 16, padding: "3px 10px" }}>{s}</span>)}
                {active.spirits_that_read_sour?.map(s => <span key={s} style={{ fontFamily: mono, fontSize: 11, color: active.color, background: `${active.color}12`, border: `1px solid ${active.color}40`, borderRadius: 16, padding: "3px 10px" }}>{s}</span>)}
                {active.spirits_that_read_bitter?.map(s => <span key={s} style={{ fontFamily: mono, fontSize: 11, color: active.color, background: `${active.color}12`, border: `1px solid ${active.color}40`, borderRadius: 16, padding: "3px 10px" }}>{s}</span>)}
                {active.spirits_that_read_boozy?.map(s => <span key={s} style={{ fontFamily: mono, fontSize: 11, color: active.color, background: `${active.color}12`, border: `1px solid ${active.color}40`, borderRadius: 16, padding: "3px 10px" }}>{s}</span>)}
                {active.spirits_that_read_savory?.map(s => <span key={s} style={{ fontFamily: mono, fontSize: 11, color: active.color, background: `${active.color}12`, border: `1px solid ${active.color}40`, borderRadius: 16, padding: "3px 10px" }}>{s}</span>)}
              </div>
            </div>
          </div>
        )}

        {/* Spirit flavor map */}
        {tab === "map" && (
          <div>
            <p style={{ fontFamily: sans, fontSize: 13, color: C.muted, lineHeight: 1.75, marginBottom: 20 }}>
              Dot ratings show relative intensity per dimension — not absolute scores. Use this to understand why certain spirits work in certain cocktails.
            </p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
                <thead>
                  <tr style={{ background: C.card, borderBottom: `2px solid ${C.goldD}` }}>
                    <th style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.15em", color: C.gold, textTransform: "uppercase", padding: "12px 16px", textAlign: "left", fontWeight: 400 }}>Spirit</th>
                    {FLAVOR_PROFILES.dimensions.map(d => (
                      <th key={d.name} style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.12em", color: d.color, textTransform: "uppercase", padding: "12px 12px", textAlign: "center", fontWeight: 400 }}>{d.emoji} {d.name}</th>
                    ))}
                    <th style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.12em", color: C.dim, textTransform: "uppercase", padding: "12px 16px", textAlign: "left", fontWeight: 400 }}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {FLAVOR_PROFILES.spirit_flavor_map.map((row, i) => (
                    <tr key={row.spirit} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                      <td style={{ fontFamily: sans, fontWeight: 600, fontSize: 13, color: C.cream, padding: "13px 16px" }}>{row.spirit}</td>
                      {FLAVOR_PROFILES.dimensions.map(d => {
                        const key = d.name.toLowerCase().split(" / ")[0];
                        const val = row[key] || row.savory || 0;
                        const actualVal = key === "sweet" ? row.sweet : key === "sour" ? row.sour : key === "bitter" ? row.bitter : key === "strong" ? row.boozy : row.savory;
                        return (
                          <td key={d.name} style={{ padding: "13px 12px", textAlign: "center" }}>
                            <DotRating value={actualVal} color={d.color} />
                          </td>
                        );
                      })}
                      <td style={{ fontFamily: sans, fontSize: 11, color: C.dim, padding: "13px 16px", fontStyle: "italic" }}>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Balance rules */}
        {tab === "rules" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 680 }}>
            {FLAVOR_PROFILES.balance_rules.map(({ rule, detail }, i) => (
              <div key={i} style={{ padding: "18px 20px", background: C.card, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.gold}`, borderRadius: 10 }}>
                <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 14, color: C.gold, marginBottom: 6 }}>{rule}</div>
                <p style={{ fontFamily: sans, fontSize: 13, color: C.muted, lineHeight: 1.75, margin: 0 }}>{detail}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
