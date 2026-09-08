import { T } from "../theme";

/**
 * DataTable — simple styled table with mobile horizontal scroll
 *
 * Props:
 *   rows    — array of objects OR array of arrays
 *   headers — column header labels (array of strings)
 *   cols    — alias for headers
 *   accent  — accent color
 */
export default function DataTable({ headers, cols, rows, accent = T.gold }) {
  const columnLabels = headers ?? cols ?? [];

  // Normalize rows — objects become arrays of their values
  const normalizedRows = rows.map(row =>
    Array.isArray(row) ? row : Object.values(row)
  );

  return (
    <div className="mobile-table-wrap" style={{
      borderRadius: 12, overflow: "hidden",
      border: `1px solid ${T.border}`,
      marginBottom: 16,
      overflowX: "auto",
      WebkitOverflowScrolling: "touch",
    }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 320 }}>
        <thead>
          <tr style={{ background: `${accent}15` }}>
            {columnLabels.map((h, i) => (
              <th key={i} style={{
                padding: "10px 14px", textAlign: "left",
                fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase",
                color: accent, borderBottom: `1px solid ${accent}30`,
                fontFamily: "'DM Mono', monospace", fontWeight: 500,
                whiteSpace: "nowrap",
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {normalizedRows.map((row, ri) => (
            <tr key={ri} style={{
              background: ri % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)",
            }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{
                  padding: "10px 14px", fontSize: 13,
                  color: ci === 0 ? T.cream : T.muted,
                  fontWeight: ci === 0 ? 500 : 400,
                  borderBottom: ri < normalizedRows.length - 1 ? `1px solid ${T.border}` : "none",
                  lineHeight: 1.5,
                  verticalAlign: "top",
                }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}