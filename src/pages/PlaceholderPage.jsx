import { T } from "../theme";

export default function PlaceholderPage({ section }) {
  return (
    <div style={{ textAlign: "center", padding: "80px 20px", border: `1px dashed ${T.border}`, borderRadius: 16 }}>
      <span style={{ fontSize: 48, display: "block", marginBottom: 16 }}>{section.emoji}</span>
      <p style={{ color: T.muted, fontSize: 15, marginBottom: 8 }}>{section.title} — coming next.</p>
      <p style={{ color: T.dim, fontSize: 12 }}>Content from your HTML files will be migrated here.</p>
    </div>
  );
}
