import { useState } from "react";
import { WINE_REGIONS } from "../data/deepdives";

const mono  = "'DM Mono', monospace";
const sans  = "'Inter', system-ui, sans-serif";
const bebas = "'Bebas Neue', sans-serif";
const FONT  = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap";
const C = { black: "#080604", card: "#181410", border: "#2a2218", gold: "#e0b84e", goldD: "#b8904a", cream: "#f5f0e8", muted: "#c8b898", dim: "#887060" };

const TABS = [
  { key: "oldnew",  label: "🌍 Old vs New World" },
  { key: "regions", label: "📍 Regions"           },
  { key: "labels",  label: "🏷️ Reading Labels"   },
];

export default function WineRegionsPage() {
  const [tab,           setTab]           = useState("oldnew");
  const [activeRegion,  setActiveRegion]  = useState(null);
  const [activeCountry, setActiveCountry] = useState(WINE_REGIONS.regions[0]);

  return (
    <>
      <link href={FONT} rel="stylesheet" />
      <div style={{ background: C.black, minHeight: "100vh", color: C.cream, fontFamily: sans }}>

        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: bebas, fontSize: "clamp(36px,6vw,58px)", color: "#8B1A35", letterSpacing: "0.04em", lineHeight: 1, marginBottom: 8 }}>Wine Regions</div>
          <p style={{ fontFamily: sans, fontSize: 13, color: C.muted, maxWidth: 520, lineHeight: 1.75, margin: 0 }}>{WINE_REGIONS.intro}</p>
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
          {TABS.map(({ key, label }) => (
            <button key={key} onClick={() => setTab(key)} style={{
              padding: "8px 16px", background: tab === key ? "rgba(139,26,53,0.15)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${tab === key ? "rgba(139,26,53,0.6)" : C.border}`,
              borderRadius: 20, cursor: "pointer", fontFamily: mono, fontSize: 11,
              letterSpacing: "0.08em", color: tab === key ? "#c04060" : C.muted, transition: "all 0.15s",
            }}>{label}</button>
          ))}
        </div>

        {/* Old vs New World */}
        {tab === "oldnew" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 28 }}>
              {Object.entries(WINE_REGIONS.old_vs_new).map(([key, world]) => (
                <div key={key} style={{ background: `${world.color}12`, border: `1px solid ${world.color}40`, borderRadius: 14, padding: "22px 22px 20px" }}>
                  <div style={{ fontFamily: bebas, fontSize: 34, color: world.color, letterSpacing: "0.04em", marginBottom: 6 }}>{world.label}</div>
                  <div style={{ fontFamily: mono, fontSize: 10, color: C.dim, letterSpacing: "0.08em", marginBottom: 16 }}>{world.regions}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
                    {world.characteristics.map((c, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <span style={{ color: world.color, fontSize: 12, flexShrink: 0, marginTop: 1 }}>—</span>
                        <span style={{ fontFamily: sans, fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{c}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontFamily: sans, fontSize: 12, color: C.dim, fontStyle: "italic", lineHeight: 1.65, borderTop: `1px solid ${world.color}20`, paddingTop: 14 }}>{world.example}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regions */}
        {tab === "regions" && (
          <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 16, alignItems: "start" }}>
            {/* Country list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {WINE_REGIONS.regions.map(country => (
                <button key={country.country} onClick={() => { setActiveCountry(country); setActiveRegion(null); }}
                  style={{ padding: "10px 14px", background: activeCountry.country === country.country ? `${country.color}18` : C.card,
                    border: `1px solid ${activeCountry.country === country.country ? country.color + "50" : C.border}`,
                    borderRadius: 8, cursor: "pointer", textAlign: "left", transition: "all 0.15s",
                    fontFamily: sans, fontWeight: 600, fontSize: 13,
                    color: activeCountry.country === country.country ? country.color : C.muted }}>
                  {country.country}
                </button>
              ))}
            </div>

            {/* Country detail */}
            <div>
              <div style={{ fontFamily: bebas, fontSize: 40, color: activeCountry.color, letterSpacing: "0.04em", marginBottom: 16 }}>
                {activeCountry.country}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {activeCountry.regions.map(region => (
                  <div key={region.name} onClick={() => setActiveRegion(activeRegion?.name === region.name ? null : region)}
                    style={{ padding: "18px 20px", background: activeRegion?.name === region.name ? `${activeCountry.color}10` : C.card,
                      border: `1px solid ${activeRegion?.name === region.name ? activeCountry.color + "50" : C.border}`,
                      borderRadius: 10, cursor: "pointer", transition: "all 0.15s" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 15, color: activeCountry.color }}>{region.name}</div>
                        <div style={{ fontFamily: mono, fontSize: 11, color: C.dim, marginTop: 3, letterSpacing: "0.06em" }}>{region.grapes}</div>
                      </div>
                      <span style={{ color: C.dim, fontSize: 12, fontFamily: mono }}>{ activeRegion?.name === region.name ? "▲" : "▼" }</span>
                    </div>
                    {activeRegion?.name === region.name && (
                      <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${activeCountry.color}20` }}>
                        <p style={{ fontFamily: sans, fontSize: 13, color: C.muted, lineHeight: 1.75, margin: "0 0 10px" }}>{region.style}</p>
                        <div style={{ fontFamily: mono, fontSize: 11, color: C.dim }}>Notable: <span style={{ color: activeCountry.color }}>{region.notable}</span></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reading labels */}
        {tab === "labels" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 660 }}>
            {WINE_REGIONS.label_reading.map(({ tip, detail }, i) => (
              <div key={i} style={{ padding: "18px 20px", background: C.card, border: `1px solid ${C.border}`, borderLeft: "3px solid #8B1A35", borderRadius: 10 }}>
                <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 14, color: "#c04060", marginBottom: 6 }}>{tip}</div>
                <p style={{ fontFamily: sans, fontSize: 13, color: C.muted, lineHeight: 1.75, margin: 0 }}>{detail}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
