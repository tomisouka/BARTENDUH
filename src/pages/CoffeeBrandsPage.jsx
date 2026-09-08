import { useState } from "react";
import { COFFEE_BRANDS, BRAND_TIERS } from "../data/coffee";

const TIER_COLORS = {
  "Ultra Premium":      "#8B7BA8",
  "Specialty":          "#C9A84C",
  "Commercial Premium": "#D4820A",
  "Commercial":         "#6B8E3E",
  "Capsule / Commercial":"#5a5470",
  "Premium Single Origin":"#4A90A4",
};

function BrandCard({ brand, isActive, onClick }) {
  const tierColor = TIER_COLORS[brand.tier] || "#C9A84C";
  return (
    <div onClick={onClick}
      style={{ background: isActive ? `${brand.color}12` : "#0e0c14", border: `1px solid ${isActive ? brand.color + "60" : "#2a2535"}`, borderRadius: 12, padding: "16px", cursor: "pointer", transition: "all 0.18s" }}
      onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = brand.color + "40"; e.currentTarget.style.background = brand.color + "08"; }}}
      onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = "#2a2535"; e.currentTarget.style.background = "#0e0c14"; }}}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
        <span style={{ fontSize: 22, flexShrink: 0 }}>{brand.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 700, color: isActive ? brand.color : "#c8b898", marginBottom: 2, lineHeight: 1.3 }}>{brand.name}</div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#5a5470" }}>{brand.origin}{brand.founded ? ` · est. ${brand.founded}` : ""}</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: tierColor, background: `${tierColor}15`, border: `1px solid ${tierColor}30`, borderRadius: 10, padding: "2px 7px", letterSpacing: "0.06em" }}>{brand.tier}</span>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: "#8a84a0", background: "#1a1825", borderRadius: 10, padding: "2px 7px" }}>{brand.roast}</span>
      </div>
    </div>
  );
}

function BrandDetail({ brand }) {
  const tierColor = TIER_COLORS[brand.tier] || "#C9A84C";
  return (
    <div style={{ animation: "fadeIn 0.2s ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid #2a2535" }}>
        <span style={{ fontSize: 40 }}>{brand.icon}</span>
        <div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: "0.18em", color: tierColor, textTransform: "uppercase", marginBottom: 4 }}>{brand.tier}</div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: brand.color, fontWeight: 700, lineHeight: 1.2 }}>{brand.name}</div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#5a5470", marginTop: 3 }}>{brand.origin}{brand.founded ? ` · Founded ${brand.founded}` : ""}</div>
        </div>
      </div>

      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#c8b898", lineHeight: 1.8, marginBottom: 20 }}>{brand.desc}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
        {[
          ["Known For", brand.known],
          ["Roast Style", brand.roast],
          ["Best For", brand.bestFor],
          ["Where to Find", brand.availability],
        ].map(([label, value]) => (
          <div key={label} style={{ display: "flex", gap: 12, padding: "10px 14px", background: "#0a0812", border: "1px solid #1a1825", borderRadius: 8 }}>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: brand.color, minWidth: 110, flexShrink: 0, letterSpacing: "0.04em" }}>{label}</span>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#a098b8", lineHeight: 1.6 }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CoffeeBrandsPage() {
  const [active, setActive] = useState(COFFEE_BRANDS[0]);
  const [filterTier, setFilterTier] = useState("all");

  const filtered = filterTier === "all" ? COFFEE_BRANDS : COFFEE_BRANDS.filter(b => b.tier === filterTier);
  const tiers = ["all", ...BRAND_TIERS.filter(t => COFFEE_BRANDS.some(b => b.tier === t))];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet" />
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}`}</style>

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.2em", color: "#5a5470", textTransform: "uppercase", marginBottom: 8 }}>Coffee · Industry</div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: "#C9A84C", fontWeight: 700, margin: "0 0 8px" }}>Coffee Brands</h1>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#7a748e", lineHeight: 1.7, margin: 0 }}>From third-wave specialty roasters to Italian institutions — who's behind the beans.</p>
      </div>

      {/* Tier filter */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        {tiers.map(t => {
          const tc = t === "all" ? "#C9A84C" : (TIER_COLORS[t] || "#C9A84C");
          const isActive = filterTier === t;
          return (
            <button key={t} onClick={() => setFilterTier(t)}
              style={{ padding: "5px 12px", borderRadius: 20, border: `1px solid ${isActive ? tc + "60" : "#2a2535"}`, background: isActive ? `${tc}15` : "transparent", color: isActive ? tc : "#5a5470", fontSize: 11, fontFamily: "'DM Mono',monospace", cursor: "pointer", letterSpacing: "0.04em", textTransform: t === "all" ? "none" : "none" }}>
              {t === "all" ? "All" : t}
            </button>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(200px, 320px) 1fr", gap: 16, alignItems: "start" }}>
        {/* Left list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map(b => (
            <BrandCard key={b.id} brand={b} isActive={active?.id === b.id} onClick={() => setActive(b)} />
          ))}
        </div>

        {/* Right detail */}
        <div style={{ background: "#0e0c14", border: "1px solid #2a2535", borderRadius: 14, padding: "24px", position: "sticky", top: 20 }}>
          {active
            ? <BrandDetail brand={active} />
            : <div style={{ textAlign: "center", color: "#5a5470", fontFamily: "'DM Sans',sans-serif", fontSize: 13, padding: "40px 0" }}>Select a brand</div>
          }
        </div>
      </div>
    </>
  );
}