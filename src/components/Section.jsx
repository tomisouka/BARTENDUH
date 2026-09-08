import { T } from "../theme";

export default function Section({ title, color, children, subtitle }) {
  return (
    <div style={{ marginBottom: 40 }}>
      {/* Section header */}
      <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{
          width: 3, height: 24, borderRadius: 2,
          background: `linear-gradient(180deg, ${color}, ${color}40)`,
          flexShrink: 0,
        }}/>
        <div>
          <h2 style={{
            fontSize: 18, fontWeight: 700, color: color,
            fontFamily: "'Playfair Display', serif",
            letterSpacing: "0.01em", margin: 0,
          }}>
            {title}
          </h2>
          {subtitle && (
            <p style={{ fontSize: 12, color: T.muted, margin: "3px 0 0", lineHeight: 1.5 }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
