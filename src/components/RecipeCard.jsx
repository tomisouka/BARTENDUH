import { useState } from "react";
import { T } from "../theme";

const METHOD_COLORS = {
  STIR:          "#4A90A4",
  SHAKE:         "#C9A84C",
  "SHAKE HARD":  "#D4712B",
  BUILD:         "#6B8E3E",
  BLEND:         "#8B7BA8",
  "MUDDLE + BUILD": "#A0522D",
  "SHAKE + BUILD":  "#D4820A",
};

export default function RecipeCard({ recipe, accent }) {
  const [open, setOpen] = useState(false);
  const methodColor = METHOD_COLORS[recipe.method] || accent;

  return (
    <div style={{
      background: open ? `linear-gradient(160deg, ${accent}10, ${T.card})` : T.card,
      border: `1px solid ${open ? accent + "50" : T.border}`,
      borderRadius: 14,
      marginBottom: 10,
      overflow: "hidden",
      transition: "all 0.25s ease",
      boxShadow: open ? `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${accent}20` : "none",
    }}>
      {/* Header row */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center",
          padding: "14px 18px", cursor: "pointer", gap: 12,
        }}
      >
        {/* Left: name + spirit */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 14, fontWeight: 600, color: open ? accent : T.cream,
            fontFamily: "'Playfair Display', serif",
            transition: "color 0.2s", letterSpacing: "0.01em",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {recipe.name}
          </div>
          {recipe.spirit && (
            <div style={{ fontSize: 11, color: T.muted, marginTop: 2, fontFamily:"'DM Mono', monospace" }}>
              {recipe.spirit}
            </div>
          )}
        </div>

        {/* Method badge */}
        {recipe.method && (
          <span style={{
            fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase",
            color: methodColor, border: `1px solid ${methodColor}50`,
            padding: "3px 8px", borderRadius: 20, whiteSpace: "nowrap",
            fontFamily:"'DM Mono', monospace",
            background: `${methodColor}10`,
          }}>
            {recipe.method}
          </span>
        )}

        {/* Chevron */}
        <span style={{
          color: T.dim, fontSize: 10,
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.25s ease",
          flexShrink: 0,
        }}>▼</span>
      </div>

      {/* Body */}
      {open && (
        <div style={{
          padding: "0 18px 18px",
          borderTop: `1px solid ${accent}20`,
        }}>
          {/* Ingredients */}
          <div style={{ marginTop: 14 }}>
            <div style={{
              fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase",
              color: T.dim, marginBottom: 8, fontFamily:"'DM Mono', monospace",
            }}>Ingredients</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {recipe.ingredients.map((ing, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: T.cream, lineHeight: 1.5 }}>
                  <span style={{ color: accent, fontWeight: "bold", flexShrink: 0, marginTop: 1 }}>·</span>
                  {ing}
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          {recipe.steps && (
            <div style={{ marginTop: 16 }}>
              <div style={{
                fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase",
                color: T.dim, marginBottom: 8, fontFamily:"'DM Mono', monospace",
              }}>Method</div>
              {recipe.steps.map((s, i) => (
                <div key={i} style={{
                  display: "flex", gap: 10, fontSize: 13,
                  color: T.cream, lineHeight: 1.6, marginBottom: 6,
                }}>
                  <span style={{
                    color: accent, fontWeight: "bold", flexShrink: 0,
                    fontFamily: "'DM Mono', monospace", fontSize: 11,
                    minWidth: 16,
                  }}>{i + 1}.</span>
                  {s}
                </div>
              ))}
            </div>
          )}

          {/* Tags row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
            {recipe.glass && (
              <span style={{
                fontSize: 11, padding: "4px 12px",
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${T.border}`, borderRadius: 20,
                color: T.muted,
              }}>🥃 {recipe.glass}</span>
            )}
            {recipe.garnish && (
              <span style={{
                fontSize: 11, padding: "4px 12px",
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${T.border}`, borderRadius: 20,
                color: T.muted,
              }}>✨ {recipe.garnish}</span>
            )}
          </div>

          {/* Variations */}
          {recipe.variations && recipe.variations.length > 0 && (
            <div style={{ marginTop: 14 }}>
              <div style={{
                fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase",
                color: T.dim, marginBottom: 6, fontFamily:"'DM Mono', monospace",
              }}>Variations</div>
              {recipe.variations.map((v, i) => (
                <div key={i} style={{
                  fontSize: 12, color: T.muted, lineHeight: 1.7,
                  paddingLeft: 12, borderLeft: `2px solid ${accent}40`,
                  marginBottom: 4,
                }}>
                  {v}
                </div>
              ))}
            </div>
          )}

          {/* Notes */}
          {(recipe.notes || recipe.tip) && (
            <div style={{
              marginTop: 14, padding: "10px 14px",
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${T.border}`,
              borderRadius: 10, fontSize: 12,
              color: T.muted, lineHeight: 1.7, fontStyle: "italic",
            }}>
              📝 {recipe.notes || recipe.tip}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
