import { useState } from "react";
import Section from "../components/Section";
import ClickCard from "../components/ClickCard";
import DataTable from "../components/DataTable";
import { SPIRITS, FERMENTED, GRAINS, STORAGE } from "../data/spirits";
import { T } from "../theme";

function SpiritCard({ spirit }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: `1px solid ${open ? spirit.color + "55" : T.border}`, borderRadius: 12, marginBottom: 10, overflow: "hidden", transition: "border-color 0.2s" }}>
      <div onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", padding: "14px 16px", cursor: "pointer", gap: 12 }}>
        <span style={{ fontSize: 24 }}>{spirit.emoji}</span>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 15, fontWeight: "bold", color: open ? spirit.color : T.cream }}>{spirit.name}</span>
          <span style={{ fontSize: 11, color: T.muted, marginLeft: 10 }}>{spirit.abv}</span>
        </div>
        <span style={{ color: T.dim, fontSize: 11 }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 12, color: T.muted, fontStyle: "italic", margin: "12px 0 14px", lineHeight: 1.6 }}>⚗️ {spirit.process}</div>
          {spirit.note && <div style={{ fontSize: 12, color: spirit.color, marginBottom: 12, padding: "8px 12px", background: spirit.color + "15", borderRadius: 8 }}>{spirit.note}</div>}
          {spirit.types.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: `1px solid rgba(255,255,255,0.04)` }}>
              <span style={{ fontSize: 13, fontWeight: "bold", color: spirit.color, minWidth: 140 }}>{t.name}</span>
              <span style={{ fontSize: 13, color: T.cream }}>{t.detail}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SpiritsPage() {
  return (
    <div>
      <Section title="Distilled Spirits" color="#A0522D">
        {SPIRITS.map((s, i) => <SpiritCard key={i} spirit={s} />)}
      </Section>

      <Section title="Fermented Drinks" color="#C9A84C">
        {FERMENTED.map((item, i) => (
          <ClickCard key={i} item={{ name: `${item.name} · ${item.abv}`, detail: item.process, notes: item.styles.join(" · ") }} accent="#C9A84C" />
        ))}
      </Section>

      <Section title="Grains — The Foundation" color="#6B8E3E">
        {GRAINS.map((g, i) => (
          <ClickCard key={i} item={{ name: g.name, detail: `${g.usedIn} · ${g.starch} starch`, notes: `${g.flavor} — ${g.note}` }} accent="#6B8E3E" />
        ))}
      </Section>

      <Section title="Storage — Unopened" color="#4A90A4">
        <DataTable rows={STORAGE.unopened} cols={["Type", "Shelf Life", "Storage", "Notes"]} />
      </Section>

      <Section title="Storage — Opened" color="#8B7BA8">
        <DataTable rows={STORAGE.opened} cols={["Type", "Use By", "Storage"]} />
      </Section>

      <Section title="Golden Rules of Storage" color="#D4712B">
        {STORAGE.rules.map((r, i) => <ClickCard key={i} item={{ name: r.rule, detail: "", notes: r.detail }} accent="#D4712B" />)}
      </Section>
    </div>
  );
}