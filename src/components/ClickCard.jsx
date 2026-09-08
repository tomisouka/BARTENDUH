import { useState } from "react";
import { T } from "../theme";

/**
 * ClickCard — expandable info card
 *
 * Two usage patterns:
 *   <ClickCard item={{ name, detail, notes, examples }} accent="#..." />
 *   <ClickCard title="..." subtitle="..." icon="..." accent="#...">children</ClickCard>
 */
export default function ClickCard({ title, subtitle, children, accent = T.gold, icon, item }) {
  const [open, setOpen] = useState(false);

  const resolvedTitle    = title    ?? item?.name   ?? "";
  const resolvedSubtitle = subtitle ?? item?.detail ?? "";

  const body = children ?? (item ? (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {item.notes && (
        <div style={{ fontSize: 13, color: T.cream, lineHeight: 1.65 }}>
          {item.notes}
        </div>
      )}
      {item.examples && (
        <div style={{ fontSize: 12, color: accent, fontStyle: "italic", marginTop: 4 }}>
          e.g. {item.examples}
        </div>
      )}
    </div>
  ) : null);

  return (
    <div style={{
      background: open ? `linear-gradient(160deg, ${accent}10, ${T.card})` : T.card,
      border: `1px solid ${open ? accent + "50" : T.border}`,
      borderRadius: 12, marginBottom: 8, overflow: "hidden",
      transition: "all 0.25s ease",
    }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center",
          padding: "13px 16px", cursor: "pointer", gap: 10, minHeight: 44,
        }}
      >
        {icon && <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>}
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: 14, fontWeight: 600, color: open ? accent : T.cream,
            fontFamily: "'Playfair Display', serif", transition: "color 0.2s",
          }}>{resolvedTitle}</div>
          {resolvedSubtitle && (
            <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{resolvedSubtitle}</div>
          )}
        </div>
        <span style={{
          color: T.dim, fontSize: 10, flexShrink: 0,
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.25s ease",
        }}>▼</span>
      </div>
      {open && body && (
        <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${accent}20` }}>
          <div style={{ paddingTop: 14 }}>{body}</div>
        </div>
      )}
    </div>
  );
}