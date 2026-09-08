import { useState } from "react";
import Section from "../components/Section";
import RecipeCard from "../components/RecipeCard";
import DataTable from "../components/DataTable";
import ClickCard from "../components/ClickCard";
import { MOCKTAILS, MOCKTAIL_TIPS } from "../data/mocktails";
import { T } from "../theme";

function StockList() {
  const categories = [
    { label: "Mixers",    items: MOCKTAIL_TIPS.stockList.mixers,    color: "#4A90A4" },
    { label: "Syrups",    items: MOCKTAIL_TIPS.stockList.syrups,    color: "#C9A84C" },
    { label: "Fresh",     items: MOCKTAIL_TIPS.stockList.fresh,     color: "#6B8E3E" },
    { label: "Specialty", items: MOCKTAIL_TIPS.stockList.specialty, color: "#8B7BA8" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
      {categories.map((cat, i) => (
        <div key={i} style={{ border: `1px solid ${cat.color}30`, borderRadius: 12, overflow: "hidden" }}>
          <div style={{ background: `${cat.color}15`, padding: "8px 14px", borderBottom: `1px solid ${cat.color}20` }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: cat.color, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>{cat.label}</span>
          </div>
          <div style={{ padding: "10px 14px", display: "flex", flexDirection: "column", gap: 6 }}>
            {cat.items.map((item, j) => (
              <div key={j} style={{ fontSize: 12, color: T.cream, display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ color: cat.color, flexShrink: 0, marginTop: 1 }}>·</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MocktailsPage() {
  return (
    <div>
      {MOCKTAILS.map((cat, i) => (
        <Section key={i} title={cat.category} color={cat.color}>
          {cat.recipes.map((r, ri) => (
            <RecipeCard key={ri} recipe={r} accent={cat.color} />
          ))}
        </Section>
      ))}

      <Section title="Tips & Techniques" color="#6B8E3E">
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: T.dim, marginBottom: 10, fontFamily: "'DM Mono', monospace" }}>Balance — The Four Elements</div>
          <DataTable rows={MOCKTAIL_TIPS.balance} cols={["Element", "Sources"]} accent="#6B8E3E" />
          <div style={{ fontSize: 11, color: T.dim, fontStyle: "italic", marginTop: -8, marginBottom: 16 }}>{MOCKTAIL_TIPS.balanceNote}</div>
        </div>
        {MOCKTAIL_TIPS.principles.map((p, i) => (
          <ClickCard key={i} item={{ name: p.tip, detail: "", notes: p.detail }} accent="#6B8E3E" />
        ))}
      </Section>

      <Section title="What to Stock" color="#4A90A4">
        <StockList />
      </Section>

      <Section title="Non-Alcoholic Spirit Alternatives" color="#8B7BA8">
        {MOCKTAIL_TIPS.naSpirits.map((s, i) => (
          <ClickCard key={i} item={{ name: s.brand, detail: s.detail }} accent="#8B7BA8" />
        ))}
      </Section>

      <Section title="Quick 3-Ingredient Ideas" color="#C9A84C">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {MOCKTAIL_TIPS.quickIdeas.map((idea, i) => (
            <div key={i} style={{ display: "flex", gap: 14, padding: "10px 14px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#C9A84C", minWidth: 22, fontFamily: "'DM Mono', monospace", paddingTop: 1 }}>{i + 1}.</span>
              <div>
                <span style={{ fontSize: 13, fontWeight: 600, color: T.cream }}>{idea.name}</span>
                <span style={{ fontSize: 12, color: T.muted, marginLeft: 8 }}>— {idea.recipe}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}