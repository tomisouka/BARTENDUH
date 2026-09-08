import { useState } from "react";
import Section from "../components/Section";
import DataTable from "../components/DataTable";
import ClickCard from "../components/ClickCard";
import { TOP_BRANDS, REDS, WHITES, SPARKLING, FORTIFIED, PAIRINGS, SERVING, TERMS } from "../data/wine";
import { T } from "../theme";

function WineCard({ wine, accent, fields }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: `1px solid ${open ? accent + "55" : T.border}`, borderRadius: 12, marginBottom: 8, overflow: "hidden" }}>
      <div onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", padding: "13px 16px", cursor: "pointer", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 14, fontWeight: "bold", color: open ? accent : T.cream }}>{wine.name}</span>
          {wine.abv && <span style={{ fontSize: 11, color: T.muted, marginLeft: 8 }}>{wine.abv}</span>}
          {wine.origin && <span style={{ fontSize: 11, color: T.muted, marginLeft: 8 }}>{wine.origin}</span>}
        </div>
        <span style={{ color: T.dim, fontSize: 11 }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div style={{ padding: "0 16px 14px", borderTop: `1px solid ${T.border}` }}>
          {wine.tannins && (
            <div style={{ display: "flex", gap: 16, margin: "10px 0", flexWrap: "wrap" }}>
              {wine.tannins && <span style={{ fontSize: 11, color: T.muted }}>Tannins: <span style={{ color: accent }}>{wine.tannins}</span></span>}
              {wine.body    && <span style={{ fontSize: 11, color: T.muted }}>Body: <span style={{ color: accent }}>{wine.body}</span></span>}
            </div>
          )}
          {wine.flavor && <div style={{ fontSize: 13, color: T.cream, margin: "8px 0", lineHeight: 1.6 }}>{wine.flavor}</div>}
          {wine.serve  && <div style={{ fontSize: 12, color: T.muted }}>🌡️ Serve: {wine.serve}</div>}
          {wine.glass  && <div style={{ fontSize: 12, color: T.muted }}>🥂 Glass: {wine.glass}</div>}
          {wine.examples && <div style={{ fontSize: 12, color: accent, marginTop: 8, fontStyle: "italic" }}>e.g. {wine.examples}</div>}
        </div>
      )}
    </div>
  );
}

export default function WinePage() {
  return (
    <div>
      <Section title="Top Brands Worldwide" color="#8B1A35">
        <DataTable rows={TOP_BRANDS.map(b => ({ rank: `#${b.rank}`, brand: b.brand, origin: b.origin, style: b.style, notes: b.notes }))} cols={["Rank", "Brand", "Origin", "Style", "Notes"]} />
      </Section>

      <Section title="Red Wines 🔴" color="#8B1A35">
        {REDS.map((w, i) => <WineCard key={i} wine={w} accent="#8B1A35" />)}
      </Section>

      <Section title="White Wines 🟡" color="#C9A84C">
        {WHITES.map((w, i) => <WineCard key={i} wine={w} accent="#C9A84C" />)}
      </Section>

      <Section title="Sparkling & Rosé 🌸" color="#C4617A">
        {SPARKLING.map((w, i) => <WineCard key={i} wine={w} accent="#C4617A" />)}
      </Section>

      <Section title="Dessert & Fortified 🍯" color="#A0522D">
        {FORTIFIED.map((w, i) => <WineCard key={i} wine={w} accent="#A0522D" />)}
      </Section>

      <Section title="Food Pairings 🍽️" color="#6B8E3E">
        <DataTable rows={PAIRINGS} cols={["Wine", "Pairs With"]} />
      </Section>

      <Section title="Serving Guide 🌡️" color="#4A90A4">
        <DataTable rows={SERVING} cols={["Type", "Temp", "Glass"]} />
      </Section>

      <Section title="Wine Terminology 📚" color="#8B7BA8">
        <DataTable rows={TERMS} cols={["Term", "Meaning"]} />
      </Section>
    </div>
  );
}