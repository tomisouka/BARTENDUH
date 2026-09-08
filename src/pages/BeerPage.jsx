import { useState } from "react";
import Section from "../components/Section";
import DataTable from "../components/DataTable";
import ClickCard from "../components/ClickCard";
import { TOP_BRANDS, STYLES, REGIONS, QUICK_REFS } from "../data/beer";
import { T } from "../theme";

function StyleCard({ style, accent }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: `1px solid ${open ? accent + "55" : T.border}`, borderRadius: 12, marginBottom: 8, overflow: "hidden" }}>
      <div onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", padding: "13px 16px", cursor: "pointer", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 14, fontWeight: "bold", color: open ? accent : T.cream }}>{style.name}</span>
          <span style={{ fontSize: 11, color: T.muted, marginLeft: 8 }}>{style.abv}</span>
        </div>
        <span style={{ color: T.dim, fontSize: 11 }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div style={{ padding: "0 16px 14px", borderTop: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 13, color: T.cream, margin: "10px 0 6px", lineHeight: 1.6 }}>{style.flavor}</div>
          {style.examples && <div style={{ fontSize: 12, color: accent, fontStyle: "italic" }}>e.g. {style.examples}</div>}
        </div>
      )}
    </div>
  );
}

export default function BeerPage() {
  return (
    <div>
      <Section title="Top Brands Worldwide" color="#D4820A">
        <DataTable rows={TOP_BRANDS.map(b => ({ rank: `#${b.rank}`, brand: b.brand, origin: b.origin, style: b.style, notes: b.notes }))} cols={["Rank", "Brand", "Origin", "Style", "Notes"]} />
      </Section>

      <Section title="Beer Styles" color="#C9A84C">
        {STYLES.map((family, fi) => (
          <div key={fi} style={{ marginBottom: 28 }}>
            <div style={{ padding: "10px 14px", background: family.color + "15", border: `1px solid ${family.color}30`, borderRadius: 10, marginBottom: 10 }}>
              <div style={{ fontSize: 15, fontWeight: "bold", color: family.color }}>{family.family}</div>
              <div style={{ fontSize: 12, color: T.muted, marginTop: 4 }}>{family.note}</div>
            </div>
            {family.styles.map((s, si) => <StyleCard key={si} style={s} accent={family.color} />)}
          </div>
        ))}
      </Section>

      <Section title="By Region" color="#6B8E3E">
        {REGIONS.map((r, i) => (
          <ClickCard key={i} item={{ name: `${r.flag} ${r.region}`, detail: "", notes: r.highlights.join(" · ") }} accent="#6B8E3E" />
        ))}
      </Section>

      <Section title="Strength Scale" color="#A0522D">
        <DataTable rows={QUICK_REFS.strength} cols={["Level", "ABV", "Examples"]} />
      </Section>

      <Section title="Flavor Guide" color="#8B7BA8">
        <DataTable rows={QUICK_REFS.flavors} cols={["If You Like...", "Try These"]} />
      </Section>

      <Section title="Food Pairings" color="#4A90A4">
        <DataTable rows={QUICK_REFS.pairings} cols={["Food", "Best Beer Style"]} />
      </Section>

      <Section title="Serving Temperatures" color="#D4712B">
        <DataTable rows={QUICK_REFS.temps} cols={["Style", "Temp", "Why"]} />
      </Section>

      <Section title="Beer Terminology" color="#C9A84C">
        <DataTable rows={QUICK_REFS.terms} cols={["Term", "Meaning"]} />
      </Section>
    </div>
  );
}