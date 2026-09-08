import { useState } from "react";
import { TEQUILA_VS_MEZCAL } from "../data/deepdives";

const mono  = "'DM Mono', monospace";
const sans  = "'Inter', system-ui, sans-serif";
const bebas = "'Bebas Neue', sans-serif";
const FONT  = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap";

const C = {
  black: "#080604", dark: "#0e0c09", card: "#181410", border: "#2a2218",
  gold: "#e0b84e", goldD: "#b8904a", cream: "#f5f0e8", muted: "#c8b898", dim: "#887060",
  tequila: "#b8d96e", mezcal: "#e0906a",
};

const TABS = [
  { key: "compare",  label: "🌵 Side by Side"  },
  { key: "agave",    label: "🌱 Agave Types"   },
  { key: "ages",     label: "⏳ Tequila Ages"   },
  { key: "tips",     label: "🍹 Bar Tips"       },
];

export default function TequilaMezcalPage() {
  const [tab, setTab] = useState("compare");

  return (
    <>
      <link href={FONT} rel="stylesheet" />
      <div style={{ background: C.black, minHeight: "100vh", color: C.cream, fontFamily: sans }}>

        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: bebas, fontSize: "clamp(36px,6vw,58px)", letterSpacing: "0.04em", lineHeight: 1, marginBottom: 8 }}>
            <span style={{ color: C.tequila }}>Tequila</span>
            <span style={{ color: C.dim }}> vs </span>
            <span style={{ color: C.mezcal }}>Mezcal</span>
          </div>
          <p style={{ fontFamily: sans, fontSize: 13, color: C.muted, maxWidth: 520, lineHeight: 1.75, margin: 0 }}>
            {TEQUILA_VS_MEZCAL.intro}
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
          {TABS.map(({ key, label }) => (
            <button key={key} onClick={() => setTab(key)} style={{
              padding: "8px 16px", background: tab === key ? "rgba(184,217,110,0.12)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${tab === key ? C.tequila + "60" : C.border}`,
              borderRadius: 20, cursor: "pointer", fontFamily: mono, fontSize: 11,
              letterSpacing: "0.08em", color: tab === key ? C.tequila : C.muted, transition: "all 0.15s",
            }}>{label}</button>
          ))}
        </div>

        {/* Side by side comparison */}
        {tab === "compare" && (
          <div>
            {/* Header cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              {[["Tequila", C.tequila, "Blue Weber agave · Jalisco · Steamed · Controlled"], ["Mezcal", C.mezcal, "50+ agave varieties · Oaxaca · Pit roasted · Artisanal"]].map(([name, color, sub]) => (
                <div key={name} style={{ background: `${color}12`, border: `1px solid ${color}40`, borderRadius: 12, padding: "20px 20px 16px" }}>
                  <div style={{ fontFamily: bebas, fontSize: 38, color, letterSpacing: "0.04em", lineHeight: 1 }}>{name}</div>
                  <div style={{ fontFamily: mono, fontSize: 10, color: C.dim, marginTop: 6, lineHeight: 1.6, letterSpacing: "0.06em" }}>{sub}</div>
                </div>
              ))}
            </div>

            {/* Comparison rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Column headers */}
              <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr", gap: 8, padding: "8px 16px" }}>
                <div />
                <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: C.tequila }}>Tequila</div>
                <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: C.mezcal }}>Mezcal</div>
              </div>
              {TEQUILA_VS_MEZCAL.comparison.map(({ label, tequila, mezcal }, i) => (
                <div key={label} style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr", gap: 8, padding: "14px 16px", background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent", borderRadius: 8 }}>
                  <div style={{ fontFamily: mono, fontSize: 11, color: C.dim, letterSpacing: "0.1em", textTransform: "uppercase", paddingTop: 1 }}>{label}</div>
                  <div style={{ fontFamily: sans, fontSize: 13, color: C.cream, lineHeight: 1.5 }}>{tequila}</div>
                  <div style={{ fontFamily: sans, fontSize: 13, color: C.cream, lineHeight: 1.5 }}>{mezcal}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Agave types */}
        {tab === "agave" && (
          <div>
            <p style={{ fontFamily: sans, fontSize: 13, color: C.muted, lineHeight: 1.75, marginBottom: 20 }}>
              Tequila uses one agave. Mezcal can use over 50. The agave variety is the single biggest factor in mezcal's flavor — and the rarer the agave, the longer it takes to grow.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {TEQUILA_VS_MEZCAL.agave_types.map(({ name, pct, flavor, time }) => (
                <div key={name} style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "18px 20px", background: C.card, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.mezcal}`, borderRadius: 10 }}>
                  <div style={{ minWidth: 100, flexShrink: 0 }}>
                    <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 15, color: C.mezcal }}>{name}</div>
                    <div style={{ fontFamily: mono, fontSize: 10, color: C.dim, marginTop: 3 }}>{time} to mature</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: sans, fontSize: 13, color: C.cream, lineHeight: 1.65 }}>{flavor}</div>
                    <div style={{ fontFamily: mono, fontSize: 10, color: C.dim, marginTop: 4 }}>{pct} of production</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tequila ages */}
        {tab === "ages" && (
          <div>
            <p style={{ fontFamily: sans, fontSize: 13, color: C.muted, lineHeight: 1.75, marginBottom: 20 }}>
              The aging system is simple once you know it. The longer it sits in oak, the more it tastes like whiskey and less like agave. Neither is better — just different uses.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {TEQUILA_VS_MEZCAL.tequila_ages.map(({ name, aging, color, flavor }) => (
                <div key={name} style={{ display: "flex", gap: 16, padding: "18px 20px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, alignItems: "center" }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: color, flexShrink: 0, boxShadow: `0 0 8px ${color}80` }} />
                  <div style={{ minWidth: 160, flexShrink: 0 }}>
                    <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 14, color: C.cream }}>{name}</div>
                    <div style={{ fontFamily: mono, fontSize: 10, color: C.dim, marginTop: 2 }}>{aging}</div>
                  </div>
                  <div style={{ fontFamily: sans, fontSize: 13, color: C.muted, lineHeight: 1.65 }}>{flavor}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bar tips */}
        {tab === "tips" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {TEQUILA_VS_MEZCAL.bartender_tips.map((tip, i) => (
              <div key={i} style={{ display: "flex", gap: 14, padding: "16px 18px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10 }}>
                <span style={{ fontFamily: bebas, fontSize: 22, color: C.goldD, flexShrink: 0, lineHeight: 1, marginTop: 1 }}>{i + 1}</span>
                <p style={{ fontFamily: sans, fontSize: 13, color: C.muted, lineHeight: 1.75, margin: 0 }}>{tip}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
