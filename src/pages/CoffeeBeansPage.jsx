import { useState } from "react";
import { COFFEE_VARIETALS } from "../data/coffee";

const RARITY_COLOR = {
  "Ultra Premium":  "#8B7BA8",
  "Rare":           "#e05a5a",
  "Limited":        "#D4820A",
  "Common":         "#6B8E3E",
  "Very Common":    "#5a5470",
};

const YIELD_BAR    = { "Very Low": 10, "Low": 25, "Medium": 50, "High": 75, "Very High": 95 };
const RESIST_BAR   = { "Low": 10, "Medium": 40, "High": 70, "Very High": 95 };

// Species filter buckets — hybrids show under "Arabica" since they're arabica-based
const SPECIES_BUCKETS = {
  "all":      () => true,
  "Arabica":  v => v.species === "Arabica" || v.species === "Arabica × Robusta hybrid",
  "Robusta":  v => v.species === "Robusta",
  "Liberica": v => v.species === "Liberica",
};

function StatBar({ label, value, colorMap, accentColor }) {
  const pct = colorMap[value] ?? 50;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: "0.15em", color: "#5a5470", textTransform: "uppercase" }}>{label}</span>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: accentColor }}>{value}</span>
      </div>
      <div style={{ height: 5, background: "#1a1825", borderRadius: 3 }}>
        <div style={{ height: "100%", width: `${pct}%`, background: accentColor, borderRadius: 3, transition: "width 0.4s ease", opacity: 0.8 }} />
      </div>
    </div>
  );
}

function VarietalCard({ v, isActive, onClick }) {
  const rc = RARITY_COLOR[v.rarity] || "#C9A84C";
  return (
    <div onClick={onClick}
      style={{ background: isActive ? `${v.color}12` : "#0e0c14", border: `1px solid ${isActive ? v.color + "60" : "#2a2535"}`, borderRadius: 12, padding: "14px 16px", cursor: "pointer", transition: "all 0.18s" }}
      onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = v.color + "40"; e.currentTarget.style.background = v.color + "08"; }}}
      onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = "#2a2535"; e.currentTarget.style.background = "#0e0c14"; }}}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
        <div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 700, color: isActive ? v.color : "#c8b898", letterSpacing: "0.04em" }}>{v.name}</div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "#5a5470", marginTop: 2 }}>{v.species}</div>
        </div>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: rc, background: `${rc}15`, border: `1px solid ${rc}30`, borderRadius: 10, padding: "2px 7px", flexShrink: 0, letterSpacing: "0.05em" }}>{v.rarity}</span>
      </div>
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#7a748e", lineHeight: 1.5, marginBottom: 8 }}>{v.flavor}</div>
      <div style={{ display: "flex", gap: 6 }}>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: "#5a5470", background: "#1a1825", borderRadius: 8, padding: "2px 7px" }}>↑ {v.altitude}</span>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: "#5a5470", background: "#1a1825", borderRadius: 8, padding: "2px 7px" }}>{v.origin.split("→")[0].trim()}</span>
      </div>
    </div>
  );
}

function VarietalDetail({ v }) {
  const rc = RARITY_COLOR[v.rarity] || "#C9A84C";
  return (
    <div style={{ animation: "fadeIn 0.2s ease" }}>
      <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid #2a2535" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: "0.18em", color: rc, textTransform: "uppercase", background: `${rc}15`, border: `1px solid ${rc}30`, borderRadius: 10, padding: "2px 8px" }}>{v.rarity}</span>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: "#5a5470" }}>{v.species}</span>
        </div>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, color: v.color, fontWeight: 700, marginBottom: 4 }}>{v.name}</div>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#5a5470" }}>Origin: {v.origin}</div>
      </div>

      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#c8b898", lineHeight: 1.8, marginBottom: 20 }}>{v.desc}</p>

      <div style={{ background: `${v.color}10`, border: `1px solid ${v.color}25`, borderRadius: 10, padding: "12px 16px", marginBottom: 20 }}>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: "0.15em", color: "#5a5470", textTransform: "uppercase", marginBottom: 6 }}>Flavor Profile</div>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: v.color }}>{v.flavor}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
        <StatBar label="Yield"              value={v.yield}              colorMap={YIELD_BAR}   accentColor={v.color} />
        <StatBar label="Disease Resistance" value={v.diseaseResistance} colorMap={RESIST_BAR}  accentColor={v.color} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
        {[["Altitude", v.altitude], ["Species", v.species], ["Origin", v.origin]].map(([label, val]) => (
          <div key={label} style={{ display: "flex", gap: 12, padding: "9px 12px", background: "#0a0812", border: "1px solid #1a1825", borderRadius: 8 }}>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: v.color, minWidth: 90, flexShrink: 0 }}>{label}</span>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#a098b8" }}>{val}</span>
          </div>
        ))}
      </div>

      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: "0.15em", color: "#5a5470", textTransform: "uppercase", marginBottom: 10 }}>Where It's Grown</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {v.regions.map(r => (
          <span key={r} style={{ background: `${v.color}12`, border: `1px solid ${v.color}30`, borderRadius: 20, padding: "4px 12px", fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: v.color }}>{r}</span>
        ))}
      </div>
    </div>
  );
}

export default function CoffeeBeansPage() {
  const [active,        setActive]        = useState(COFFEE_VARIETALS[0]);
  const [filterSpecies, setFilterSpecies] = useState("all");
  const [filterRarity,  setFilterRarity]  = useState("all");

  const rarities = ["all", "Ultra Premium", "Rare", "Limited", "Common", "Very Common"];

  const filtered = COFFEE_VARIETALS.filter(v =>
    SPECIES_BUCKETS[filterSpecies](v) &&
    (filterRarity === "all" || v.rarity === filterRarity)
  );

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet" />
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}`}</style>

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.2em", color: "#5a5470", textTransform: "uppercase", marginBottom: 8 }}>Coffee · Varietals</div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: "#C9A84C", fontWeight: 700, margin: "0 0 8px" }}>Coffee Beans</h1>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#7a748e", lineHeight: 1.7, margin: 0 }}>The varietal is the grape of coffee — Geisha, Bourbon, SL28, Typica. Each one tastes different, grows differently, and tells a different story.</p>
      </div>

      {/* Species filter */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
        {Object.keys(SPECIES_BUCKETS).map(s => {
          const isActive = filterSpecies === s;
          return (
            <button key={s} onClick={() => setFilterSpecies(s)}
              style={{ padding: "5px 12px", borderRadius: 20, border: `1px solid ${isActive ? "#C9A84C60" : "#2a2535"}`, background: isActive ? "#C9A84C15" : "transparent", color: isActive ? "#C9A84C" : "#5a5470", fontSize: 11, fontFamily: "'DM Mono',monospace", cursor: "pointer" }}>
              {s === "all" ? "All Species" : s}
            </button>
          );
        })}
      </div>

      {/* Rarity filter */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        {rarities.map(r => {
          const rc = r === "all" ? "#5a5470" : (RARITY_COLOR[r] || "#5a5470");
          const isActive = filterRarity === r;
          return (
            <button key={r} onClick={() => setFilterRarity(r)}
              style={{ padding: "4px 10px", borderRadius: 20, border: `1px solid ${isActive ? rc + "60" : "#2a2535"}`, background: isActive ? `${rc}15` : "transparent", color: isActive ? rc : "#5a5470", fontSize: 10, fontFamily: "'DM Mono',monospace", cursor: "pointer" }}>
              {r === "all" ? "All Rarity" : r}
            </button>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(200px, 300px) 1fr", gap: 16, alignItems: "start" }}>
        {/* Left list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map(v => (
            <VarietalCard key={v.id} v={v} isActive={active?.id === v.id} onClick={() => setActive(v)} />
          ))}
          {filtered.length === 0 && (
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#5a5470", textAlign: "center", padding: "24px 0" }}>No varietals match filters</div>
          )}
        </div>

        {/* Right detail */}
        <div style={{ background: "#0e0c14", border: "1px solid #2a2535", borderRadius: 14, padding: "24px", position: "sticky", top: 20 }}>
          {active
            ? <VarietalDetail v={active} />
            : <div style={{ textAlign: "center", color: "#5a5470", fontFamily: "'DM Sans',sans-serif", fontSize: 13, padding: "40px 0" }}>Select a varietal</div>
          }
        </div>
      </div>
    </>
  );
}