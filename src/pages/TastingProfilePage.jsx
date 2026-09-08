import { useState } from "react";
import Section from "../components/Section";
import { T } from "../theme";
import { STYLES as BEER_STYLES } from "../data/beer";
import { REDS, WHITES, SPARKLING, FORTIFIED } from "../data/wine";

// ── color data mapped onto existing style names ──────────────────────────────
const BEER_COLORS = {
  "IPA":               { hex: "#c9a84c", name: "Golden to Amber" },
  "Pale Ale":          { hex: "#d4872a", name: "Pale to Amber" },
  "Stout":             { hex: "#1a0e08", name: "Opaque Black" },
  "Porter":            { hex: "#2d1810", name: "Dark Brown to Black" },
  "Wheat Beer":        { hex: "#e8c547", name: "Hazy Golden Straw" },
  "Sour":              { hex: "#a0c070", name: "Pale Straw to Hazy" },
  "Belgian Ale":       { hex: "#c47a2a", name: "Gold to Chestnut" },
  "Amber Ale":         { hex: "#c8581a", name: "Amber to Copper" },
  "Pale Lager":        { hex: "#f0d070", name: "Pale Straw" },
  "Light Lager":       { hex: "#f4e080", name: "Very Pale Straw" },
  "Pilsner":           { hex: "#f0c850", name: "Pale Gold" },
  "Bock":              { hex: "#8b4513", name: "Deep Amber to Brown" },
  "Märzen/Oktoberfest":{ hex: "#d4702a", name: "Amber to Copper" },
  "Dark Lager":        { hex: "#1a1008", name: "Dark Brown to Black" },
};

const WINE_COLORS = {
  "Cabernet Sauvignon": { hex: "#6b1a22", name: "Deep Ruby to Garnet" },
  "Pinot Noir":         { hex: "#9b3a4a", name: "Pale Ruby" },
  "Merlot":             { hex: "#7a2030", name: "Medium Ruby" },
  "Syrah / Shiraz":     { hex: "#4a0e18", name: "Inky Purple-Black" },
  "Malbec":             { hex: "#5c1830", name: "Deep Purple-Red" },
  "Zinfandel":          { hex: "#8b2030", name: "Medium to Deep Ruby" },
  "Chardonnay":         { hex: "#f0d060", name: "Pale Gold to Straw" },
  "Sauvignon Blanc":    { hex: "#d4e060", name: "Pale Green-Gold" },
  "Pinot Grigio":       { hex: "#e0d8b0", name: "Pale Straw to Coppery" },
  "Riesling":           { hex: "#f8f0a0", name: "Near-Clear to Pale Straw" },
  "Moscato":            { hex: "#f8f4c0", name: "Pale Straw" },
  "Champagne":          { hex: "#f8f0d0", name: "Pale Straw with Bubbles" },
  "Prosecco":           { hex: "#f4ecc0", name: "Pale Straw to Gold" },
  "Cava":               { hex: "#f0e8b0", name: "Pale Straw" },
  "Rosé Wine":          { hex: "#e8a0a8", name: "Pale Salmon to Coral" },
  "Port":               { hex: "#6b1a10", name: "Deep Ruby to Tawny" },
  "Sherry":             { hex: "#c8901a", name: "Pale Gold to Amber" },
};

// ── sub-components ────────────────────────────────────────────────────────────
function ColorPip({ hex, name, size = 9 }) {
  if (!hex) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <div style={{
        width: size, height: size, borderRadius: "50%", flexShrink: 0,
        background: hex, boxShadow: "0 0 0 1px rgba(255,255,255,0.12)",
      }} />
      {name && <span style={{ fontSize: 10, color: T.muted, letterSpacing: "0.06em" }}>{name}</span>}
    </div>
  );
}

function DrinkCard({ name, abv, detail, examples, accent, colorHex, colorName, extra }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      border: `1px solid ${open ? accent + "55" : T.border}`,
      borderRadius: 12, marginBottom: 8, overflow: "hidden",
      transition: "border-color 0.2s",
    }}>
      <div
        onClick={() => setOpen(!open)}
        style={{ display: "flex", alignItems: "center", padding: "12px 16px", cursor: "pointer", gap: 10 }}
      >
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 14, fontWeight: "bold", color: open ? accent : T.cream }}>{name}</span>
          {abv && <span style={{ fontSize: 11, color: T.muted, marginLeft: 8 }}>{abv}</span>}
        </div>
        {colorHex && <ColorPip hex={colorHex} size={9} />}
        <span style={{ color: T.dim, fontSize: 10, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }}>▼</span>
      </div>

      {open && (
        <div style={{ padding: "0 16px 14px", borderTop: `1px solid ${T.border}` }}>
          {colorHex && (
            <div style={{ marginTop: 10, marginBottom: 8 }}>
              <ColorPip hex={colorHex} name={colorName} size={11} />
            </div>
          )}
          {detail && <div style={{ fontSize: 13, color: T.cream, margin: "8px 0 6px", lineHeight: 1.65 }}>{detail}</div>}
          {extra && <div style={{ fontSize: 12, color: T.muted, marginBottom: 6 }}>{extra}</div>}
          {examples && <div style={{ fontSize: 12, color: accent, fontStyle: "italic" }}>e.g. {examples}</div>}
        </div>
      )}
    </div>
  );
}

function FamilyBlock({ label, note, accent, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{
        padding: "10px 14px",
        background: accent + "15",
        border: `1px solid ${accent}30`,
        borderRadius: 10, marginBottom: 10,
      }}>
        <div style={{ fontSize: 15, fontWeight: "bold", color: accent }}>{label}</div>
        {note && <div style={{ fontSize: 12, color: T.muted, marginTop: 4 }}>{note}</div>}
      </div>
      {children}
    </div>
  );
}

// ── tabs ──────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "beer", label: "🍺 Beer",  accent: "#D4820A" },
  { id: "wine", label: "🍷 Wine",  accent: "#8B1A35" },
];

// ── page ──────────────────────────────────────────────────────────────────────
export default function TastingProfilePage() {
  const [tab, setTab] = useState("beer");
  const accent = TABS.find(t => t.id === tab).accent;

  return (
    <div>
      {/* Tab bar */}
      <div style={{
        display: "flex", gap: 6, marginBottom: 28,
        background: T.surface, border: `1px solid ${T.border}`,
        borderRadius: 10, padding: 4,
      }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1, padding: "9px 12px", border: "none", cursor: "pointer",
              borderRadius: 7, fontFamily: "inherit", fontSize: 13, fontWeight: 600,
              transition: "all 0.18s",
              background: tab === t.id ? T.card : "transparent",
              color: tab === t.id ? t.accent : T.muted,
              borderBottom: tab === t.id ? `2px solid ${t.accent}` : "2px solid transparent",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── BEER ── */}
      {tab === "beer" && (
        <div>
          {BEER_STYLES.map((family, fi) => (
            <Section key={fi} title={family.family} color={family.color} subtitle={family.note}>
              {family.styles.map((s, si) => {
                const c = BEER_COLORS[s.name];
                return (
                  <DrinkCard
                    key={si}
                    name={s.name}
                    abv={s.abv}
                    detail={s.flavor}
                    examples={s.examples}
                    accent={family.color}
                    colorHex={c?.hex}
                    colorName={c?.name}
                  />
                );
              })}
            </Section>
          ))}
        </div>
      )}

      {/* ── WINE ── */}
      {tab === "wine" && (
        <div>
          <Section title="Red Wines" color="#8B1A35">
            <FamilyBlock label="REDS" note="Fermented with skins · Tannins · Bold & structured" accent="#8B1A35">
              {REDS.map((w, i) => {
                const c = WINE_COLORS[w.name];
                return (
                  <DrinkCard
                    key={i}
                    name={w.name}
                    abv={w.abv}
                    detail={w.flavor}
                    examples={w.examples}
                    accent="#8B1A35"
                    colorHex={c?.hex}
                    colorName={c?.name}
                    extra={`Tannins: ${w.tannins} · Body: ${w.body}`}
                  />
                );
              })}
            </FamilyBlock>
          </Section>

          <Section title="White Wines" color="#C9A84C">
            <FamilyBlock label="WHITES" note="Fermented without skins · Fresh & aromatic" accent="#C9A84C">
              {WHITES.map((w, i) => {
                const c = WINE_COLORS[w.name];
                return (
                  <DrinkCard
                    key={i}
                    name={w.name}
                    abv={w.abv}
                    detail={w.flavor}
                    examples={w.examples}
                    accent="#C9A84C"
                    colorHex={c?.hex}
                    colorName={c?.name}
                  />
                );
              })}
            </FamilyBlock>
          </Section>

          <Section title="Sparkling & Rosé" color="#a0d0e0">
            <FamilyBlock label="SPARKLING & ROSÉ" note="Secondary fermentation · Celebratory" accent="#4A90A4">
              {SPARKLING.map((w, i) => {
                const c = WINE_COLORS[w.name];
                return (
                  <DrinkCard
                    key={i}
                    name={w.name}
                    abv={w.abv}
                    detail={w.flavor}
                    examples={w.examples}
                    accent="#4A90A4"
                    colorHex={c?.hex}
                    colorName={c?.name}
                    extra={`Serve: ${w.serve} · Origin: ${w.origin}`}
                  />
                );
              })}
            </FamilyBlock>
          </Section>

          <Section title="Fortified" color="#A0522D">
            <FamilyBlock label="FORTIFIED" note="Brandy-fortified · 15–22% ABV" accent="#A0522D">
              {FORTIFIED.map((w, i) => {
                const c = WINE_COLORS[w.name];
                return (
                  <DrinkCard
                    key={i}
                    name={w.name}
                    abv={w.abv}
                    detail={w.flavor}
                    accent="#A0522D"
                    colorHex={c?.hex}
                    colorName={c?.name}
                    extra={`Serve: ${w.serve} · Origin: ${w.origin}`}
                  />
                );
              })}
            </FamilyBlock>
          </Section>
        </div>
      )}
    </div>
  );
}