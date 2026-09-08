import { useState } from "react";
import { GIN_GUIDE } from "../data/deepdives";

const mono  = "'DM Mono', monospace";
const sans  = "'Inter', system-ui, sans-serif";
const bebas = "'Bebas Neue', sans-serif";
const FONT  = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap";

const C = {
  black: "#080604", card: "#181410", border: "#2a2218",
  gold: "#e0b84e", goldD: "#b8904a", cream: "#f5f0e8", muted: "#c8b898", dim: "#887060",
};

const TABS = [
  { key: "styles",     label: "🫙 Styles"      },
  { key: "botanicals", label: "🌿 Botanicals"  },
  { key: "pairing",    label: "🍸 G&T Pairing" },
];

export default function GinGuidePage() {
  const [tab,        setTab]        = useState("styles");
  const [activeStyle, setActiveStyle] = useState(GIN_GUIDE.styles[0]);

  return (
    <>
      <link href={FONT} rel="stylesheet" />
      <div style={{ background: C.black, minHeight: "100vh", color: C.cream, fontFamily: sans }}>

        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: bebas, fontSize: "clamp(36px,6vw,58px)", color: "#7abf8a", letterSpacing: "0.04em", lineHeight: 1, marginBottom: 8 }}>Gin Deep Dive</div>
          <p style={{ fontFamily: mono, fontSize: 12, color: C.muted, maxWidth: 520, lineHeight: 1.75, margin: "0 0 8px" }}>
            {GIN_GUIDE.intro}
          </p>
          <div style={{ display: "inline-block", fontFamily: mono, fontSize: 11, color: "#7abf8a", background: "rgba(122,191,138,0.1)", border: "1px solid rgba(122,191,138,0.35)", borderRadius: 4, padding: "4px 12px", letterSpacing: "0.08em" }}>
            The Rule: {GIN_GUIDE.the_rule}
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
          {TABS.map(({ key, label }) => (
            <button key={key} onClick={() => setTab(key)} style={{
              padding: "8px 16px", background: tab === key ? "rgba(122,191,138,0.1)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${tab === key ? "rgba(122,191,138,0.5)" : C.border}`,
              borderRadius: 20, cursor: "pointer", fontFamily: mono, fontSize: 11,
              letterSpacing: "0.08em", color: tab === key ? "#7abf8a" : C.muted, transition: "all 0.15s",
            }}>{label}</button>
          ))}
        </div>

        {/* Styles */}
        {tab === "styles" && (
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.4fr)", gap: 16, alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {GIN_GUIDE.styles.map(style => (
                <div key={style.name} onClick={() => setActiveStyle(style)}
                  style={{ padding: "14px 16px", background: activeStyle.name === style.name ? `${style.color}15` : C.card,
                    border: `1px solid ${activeStyle.name === style.name ? style.color + "60" : C.border}`,
                    borderRadius: 10, cursor: "pointer", transition: "all 0.15s" }}>
                  <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 14, color: activeStyle.name === style.name ? style.color : C.cream }}>{style.name}</div>
                  <div style={{ fontFamily: mono, fontSize: 10, color: C.dim, marginTop: 3 }}>{style.flavor}</div>
                </div>
              ))}
            </div>

            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "24px 24px 28px", position: "sticky", top: 80 }}>
              <div style={{ fontFamily: bebas, fontSize: 36, color: activeStyle.color, letterSpacing: "0.04em", marginBottom: 6 }}>{activeStyle.name}</div>
              <p style={{ fontFamily: sans, fontSize: 13, color: C.cream, lineHeight: 1.75, margin: "0 0 18px" }}>{activeStyle.desc}</p>

              <div style={{ fontFamily: mono, fontSize: 11, color: activeStyle.color, letterSpacing: "0.08em", marginBottom: 12 }}>Flavor Profile</div>
              <div style={{ fontFamily: sans, fontSize: 13, color: C.muted, marginBottom: 20 }}>{activeStyle.flavor}</div>

              <div style={{ fontFamily: mono, fontSize: 11, color: activeStyle.color, letterSpacing: "0.08em", marginBottom: 10 }}>Best For</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                {activeStyle.cocktails.map(c => (
                  <span key={c} style={{ fontFamily: mono, fontSize: 11, color: C.muted, background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 16, padding: "4px 10px" }}>{c}</span>
                ))}
              </div>

              <div style={{ fontFamily: mono, fontSize: 11, color: activeStyle.color, letterSpacing: "0.08em", marginBottom: 10 }}>Examples</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                {activeStyle.examples.map(e => (
                  <span key={e} style={{ fontFamily: sans, fontWeight: 600, fontSize: 12, color: activeStyle.color, background: `${activeStyle.color}12`, border: `1px solid ${activeStyle.color}40`, borderRadius: 16, padding: "4px 10px" }}>{e}</span>
                ))}
              </div>

              <div style={{ fontFamily: mono, fontSize: 11, color: activeStyle.color, letterSpacing: "0.08em", marginBottom: 10 }}>Rules</div>
              {activeStyle.rules.map((r, i) => (
                <div key={i} style={{ fontFamily: sans, fontSize: 12, color: C.muted, lineHeight: 1.65, paddingLeft: 12, borderLeft: `2px solid ${activeStyle.color}40`, marginBottom: 6 }}>{r}</div>
              ))}
            </div>
          </div>
        )}

        {/* Botanicals */}
        {tab === "botanicals" && (
          <div>
            <p style={{ fontFamily: sans, fontSize: 13, color: C.muted, lineHeight: 1.75, marginBottom: 20 }}>
              Every gin has a unique botanical bill — a secret recipe of herbs, spices, roots, and peels redistilled with neutral spirit. Juniper is always first. Everything else is the distiller's choice.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {GIN_GUIDE.botanicals.map(({ name, role, flavor, found_in }) => (
                <div key={name} style={{ display: "grid", gridTemplateColumns: "140px 120px 1fr 160px", gap: 12, padding: "14px 16px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, alignItems: "center" }}>
                  <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 13, color: name === "Juniper" ? "#7abf8a" : C.cream }}>{name}</div>
                  <div style={{ fontFamily: mono, fontSize: 10, color: "#7abf8a", letterSpacing: "0.06em" }}>{role}</div>
                  <div style={{ fontFamily: sans, fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{flavor}</div>
                  <div style={{ fontFamily: mono, fontSize: 10, color: C.dim, textAlign: "right" }}>{found_in}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* G&T Pairing */}
        {tab === "pairing" && (
          <div>
            <p style={{ fontFamily: sans, fontSize: 13, color: C.muted, lineHeight: 1.75, marginBottom: 20 }}>
              The G&T is simple but getting it right makes a real difference. Match your tonic and garnish to the gin's dominant character.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {GIN_GUIDE.pairing_guide.map(({ gin_type, tonic, garnish, reason }) => (
                <div key={gin_type} style={{ display: "grid", gridTemplateColumns: "160px 1fr 1fr", gap: 16, padding: "18px 20px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, alignItems: "start" }}>
                  <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 13, color: "#7abf8a" }}>{gin_type}</div>
                  <div>
                    <div style={{ fontFamily: mono, fontSize: 10, color: C.dim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Tonic</div>
                    <div style={{ fontFamily: sans, fontSize: 13, color: C.cream }}>{tonic}</div>
                    <div style={{ fontFamily: mono, fontSize: 10, color: C.dim, letterSpacing: "0.1em", textTransform: "uppercase", margin: "10px 0 4px" }}>Garnish</div>
                    <div style={{ fontFamily: sans, fontSize: 13, color: C.cream }}>{garnish}</div>
                  </div>
                  <div style={{ fontFamily: sans, fontSize: 12, color: C.muted, lineHeight: 1.65, fontStyle: "italic", borderLeft: `2px solid rgba(122,191,138,0.3)`, paddingLeft: 12 }}>{reason}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
