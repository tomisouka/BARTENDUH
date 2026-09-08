import { useState } from "react";
import Section from "../components/Section";
import { T } from "../theme";
import {
  YEAST_TYPES,
  WILD_ORGANISMS,
  FERMENTATION_PHASES,
  FERMENTATION_TEMPS,
  ATTENUATION,
  FERMENTATION_VESSELS,
  SPECIAL_TECHNIQUES,
  FLAVOR_BYPRODUCTS,
  YEAST_TOLERANCE,
  SUGAR_SOURCES,
  FERMENTATION_MONITORING,
  GRAIN_PROCESSING,
  SPECIAL_GRAIN_TECHNIQUES,
  GRAIN_TO_GLASS,
  REGIONAL_SPIRITS,
  VERMOUTH,
  FERMENTED_VS_DISTILLED,
} from "../data/fermentation";

const C = "#6B8E3E"; // fermentation green accent

// ── Reusable mini components ──────────────────────────────────────────────────

function Pill({ label, color = C }) {
  return (
    <span style={{
      display: "inline-block", fontSize: 10, letterSpacing: "0.12em",
      textTransform: "uppercase", color, border: `1px solid ${color}50`,
      padding: "2px 8px", borderRadius: 20,
      fontFamily: "'DM Mono', monospace",
    }}>
      {label}
    </span>
  );
}

function InfoRow({ label, value, color = T.muted }) {
  return (
    <div style={{ display: "flex", gap: 10, padding: "6px 0", borderBottom: `1px solid rgba(255,255,255,0.04)` }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: C, minWidth: 140, textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "'DM Mono', monospace" }}>
        {label}
      </span>
      <span style={{ fontSize: 12, color, lineHeight: 1.55 }}>{value}</span>
    </div>
  );
}

function CollapsibleCard({ title, subtitle, emoji, accent = C, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      border: `1px solid ${open ? accent + "55" : T.border}`,
      borderRadius: 12, marginBottom: 10, overflow: "hidden",
      transition: "border-color 0.2s",
    }}>
      <div onClick={() => setOpen(!open)} style={{
        display: "flex", alignItems: "center",
        padding: "14px 16px", cursor: "pointer", gap: 12,
      }}>
        {emoji && <span style={{ fontSize: 22 }}>{emoji}</span>}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: "bold", color: open ? accent : T.cream }}>{title}</div>
          {subtitle && <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{subtitle}</div>}
        </div>
        <span style={{ color: T.dim, fontSize: 11 }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${T.border}` }}>
          {children}
        </div>
      )}
    </div>
  );
}

function SimpleTable({ rows, cols }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, marginTop: 8 }}>
        <thead>
          <tr>
            {cols.map((c, i) => (
              <th key={i} style={{
                textAlign: "left", padding: "8px 12px",
                color: C, fontFamily: "'DM Mono', monospace",
                fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
                borderBottom: `1px solid ${T.border}`,
              }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent" }}>
              {row.map((cell, j) => (
                <td key={j} style={{
                  padding: "8px 12px", color: T.cream,
                  borderBottom: `1px solid rgba(255,255,255,0.03)`,
                  lineHeight: 1.5,
                }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Section renderers ─────────────────────────────────────────────────────────

function FermentedVsDistilled() {
  const d = FERMENTED_VS_DISTILLED;
  return (
    <Section title="Fermented vs. Distilled" color={C} subtitle="The fundamental split in how alcoholic drinks are made">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        {[d.fermented, d.distilled].map((side, i) => (
          <div key={i} style={{
            background: `linear-gradient(135deg, ${C}15, ${T.card})`,
            border: `1px solid ${C}40`, borderRadius: 12, padding: 16,
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C, marginBottom: 8 }}>{side.label}</div>
            <div style={{ fontSize: 12, color: T.muted, marginBottom: 6, lineHeight: 1.6 }}>{side.process}</div>
            <div style={{ fontSize: 11, color: T.cream }}><strong>ABV:</strong> {side.abv}</div>
            <div style={{ fontSize: 11, color: T.muted, marginTop: 4 }}>{side.examples}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ padding: "10px 14px", background: "rgba(255,255,255,0.03)", borderRadius: 8, borderLeft: `3px solid ${C}`, fontSize: 12, color: T.cream }}>
          🔢 <strong>Proof:</strong> {d.proofNote}
        </div>
        <div style={{ padding: "10px 14px", background: "rgba(255,255,255,0.03)", borderRadius: 8, borderLeft: `3px solid #C9A84C`, fontSize: 12, color: T.cream }}>
          🪵 <strong>Aging:</strong> {d.agingNote}
        </div>
      </div>
    </Section>
  );
}

function YeastTypes() {
  return (
    <Section title="Yeast Types" color={C} subtitle="The living engines of fermentation">
      {YEAST_TYPES.map((y, i) => (
        <CollapsibleCard key={i} title={y.name} subtitle={y.scientific} emoji={y.emoji} accent={y.color || C}>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 2 }}>
            <InfoRow label="Temp Range" value={y.temp} />
            <InfoRow label="Location" value={y.location} />
            <InfoRow label="Flavor Profile" value={y.flavor} />
            <InfoRow label="Used In" value={y.usedIn} />
            <InfoRow label="Personality" value={y.personality} color={y.color || C} />
          </div>
        </CollapsibleCard>
      ))}

      {/* Wild organisms subsection */}
      <div style={{ marginTop: 16, marginBottom: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "'DM Mono', monospace", marginBottom: 10 }}>
          Wild Yeast & Bacteria
        </div>
        {WILD_ORGANISMS.map((w, i) => (
          <div key={i} style={{
            display: "flex", gap: 12, padding: "8px 0",
            borderBottom: `1px solid rgba(255,255,255,0.04)`,
          }}>
            <span style={{ fontWeight: 700, color: C, fontSize: 13, minWidth: 130 }}>{w.name}</span>
            <div>
              <div style={{ fontSize: 12, color: T.cream }}>{w.flavor}</div>
              <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>Used in: {w.usedIn}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function FermentationPhasesSection() {
  return (
    <Section title="Fermentation Phases" color={C} subtitle="What happens from pitch to final gravity">
      {FERMENTATION_PHASES.map((p, i) => (
        <CollapsibleCard key={i} title={p.phase} subtitle={p.timeframe} accent={C}>
          <div style={{ marginTop: 12 }}>
            <InfoRow label="Yeast State" value={p.yeastState} />
            <InfoRow label="Visible Signs" value={p.visible} />
            {p.critical && <InfoRow label="Critical" value={p.critical} color="#D4820A" />}
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 11, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace", marginBottom: 6 }}>What's happening:</div>
              <ul style={{ margin: 0, padding: "0 0 0 20px", display: "flex", flexDirection: "column", gap: 4 }}>
                {p.happening.map((h, j) => (
                  <li key={j} style={{ fontSize: 12, color: T.muted, lineHeight: 1.5 }}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        </CollapsibleCard>
      ))}
    </Section>
  );
}

function TempsAndAttenuation() {
  return (
    <Section title="Temperatures & Attenuation" color={C} subtitle="How fermentation conditions shape the final product">
      {/* Temps */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "'DM Mono', monospace", marginBottom: 10 }}>
          Fermentation Temps by Drink
        </div>
        <SimpleTable
          cols={["Zone", "Temp Range", "Result"]}
          rows={FERMENTATION_TEMPS.map(t => [
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span>{t.indicator}</span><span>{t.zone}</span></span>,
            t.range,
            t.result,
          ])}
        />
      </div>

      {/* Attenuation */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "'DM Mono', monospace", marginBottom: 10 }}>
          Attenuation — How Much Sugar Gets Eaten
        </div>
        <SimpleTable
          cols={["Level", "Range", "Result", "Examples"]}
          rows={ATTENUATION.map(a => [a.type, a.range, a.result, a.examples])}
        />
      </div>
    </Section>
  );
}

function VesselsSection() {
  return (
    <Section title="Fermentation Vessels" color={C} subtitle="Container choice affects oxygen, flavor, and process">
      {FERMENTATION_VESSELS.map((v, i) => (
        <CollapsibleCard key={i} title={v.type} subtitle={`Used for: ${v.usedFor}`} accent={C}>
          <div style={{ marginTop: 12 }}>
            <InfoRow label="Setup" value={v.setup} />
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: C, fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Benefits</div>
                {v.benefits.map((b, j) => <div key={j} style={{ fontSize: 12, color: T.muted, padding: "3px 0" }}>✓ {b}</div>)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: "#D4820A", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Risks</div>
                {v.risks.map((r, j) => <div key={j} style={{ fontSize: 12, color: T.muted, padding: "3px 0" }}>⚠ {r}</div>)}
              </div>
            </div>
          </div>
        </CollapsibleCard>
      ))}
    </Section>
  );
}

function SpecialTechniquesSection() {
  return (
    <Section title="Special Fermentation Techniques" color={C} subtitle="Advanced methods used in specific styles">
      {SPECIAL_TECHNIQUES.map((t, i) => (
        <CollapsibleCard key={i} title={t.name} subtitle={`${t.usedIn} · ${t.flavor}`} accent={C}>
          <div style={{ marginTop: 12, marginBottom: 8, fontSize: 12, color: T.muted, lineHeight: 1.6 }}>{t.summary}</div>
          <div style={{ fontSize: 11, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace", marginBottom: 6 }}>Steps:</div>
          <ol style={{ margin: 0, padding: "0 0 0 20px", display: "flex", flexDirection: "column", gap: 4 }}>
            {t.steps.map((s, j) => (
              <li key={j} style={{ fontSize: 12, color: T.cream, lineHeight: 1.5 }}>{s}</li>
            ))}
          </ol>
        </CollapsibleCard>
      ))}
    </Section>
  );
}

function FlavorByproductsSection() {
  return (
    <Section title="Flavor Byproducts" color={C} subtitle="Chemistry of what yeast leaves behind">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
        {FLAVOR_BYPRODUCTS.map((b, i) => (
          <div key={i} style={{
            background: T.card, border: `1px solid ${T.border}`,
            borderRadius: 12, padding: 14,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 20 }}>{b.emoji}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.cream }}>{b.name}</div>
                <Pill label={b.type} />
              </div>
            </div>
            <div style={{ fontSize: 11, color: T.muted, marginBottom: 6 }}>
              {b.flavors.join(" · ")}
            </div>
            <div style={{ fontSize: 11, color: T.dim, lineHeight: 1.5 }}>
              <strong style={{ color: T.muted }}>More from:</strong> {b.morFrom}
            </div>
            <div style={{ fontSize: 11, color: T.dim, marginTop: 4, lineHeight: 1.5 }}>
              <strong style={{ color: T.muted }}>Common in:</strong> {b.commonIn}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function YeastToleranceSection() {
  return (
    <Section title="Yeast Alcohol Tolerance" color={C} subtitle="The ceiling each yeast can reach before dying">
      <SimpleTable
        cols={["Yeast Type", "Max ABV", "Note"]}
        rows={YEAST_TOLERANCE.map(y => [y.yeast, y.maxAbv, y.note])}
      />
    </Section>
  );
}

function SugarSourcesSection() {
  return (
    <Section title="Sugar Sources by Drink" color={C} subtitle="What yeast is actually eating to make alcohol">
      <SimpleTable
        cols={["Drink", "Sugar Type", "Origin"]}
        rows={SUGAR_SOURCES.map(s => [s.drink, s.sugar, s.origin])}
      />
    </Section>
  );
}

function MonitoringSection() {
  return (
    <Section title="Monitoring Fermentation" color={C} subtitle="How brewers and distillers track progress">
      {FERMENTATION_MONITORING.map((m, i) => (
        <CollapsibleCard key={i} title={m.tool} subtitle={m.measures} accent={C}>
          <div style={{ marginTop: 12 }}>
            <InfoRow label="How It Works" value={m.how} />
            {m.abvCalc && <InfoRow label="ABV Formula" value={m.abvCalc} color="#C9A84C" />}
            <InfoRow label="Tools Needed" value={m.tools} />
          </div>
        </CollapsibleCard>
      ))}
    </Section>
  );
}

function GrainProcessingSection() {
  return (
    <Section title="Grain Processing — Beer & Spirits" color={C} subtitle="From raw grain to fermentable sugar">
      {GRAIN_PROCESSING.map((step, i) => (
        <CollapsibleCard key={i} title={step.step} subtitle={`Applies to: ${step.appliesTo} · Purpose: ${step.purpose}`} accent={C}>
          <div style={{ marginTop: 12 }}>
            {step.stages.map((s, j) => (
              <div key={j} style={{
                padding: "10px 12px", marginBottom: 6,
                background: "rgba(255,255,255,0.02)", borderRadius: 8,
                borderLeft: `2px solid ${C}50`,
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C, marginBottom: 4 }}>{s.name}</div>
                <div style={{ fontSize: 12, color: T.muted, lineHeight: 1.6 }}>{s.detail}</div>
              </div>
            ))}
            <div style={{ marginTop: 10, padding: "10px 12px", background: `${C}15`, borderRadius: 8, fontSize: 12, color: T.cream, lineHeight: 1.6 }}>
              <strong>Result:</strong> {step.result}
            </div>
          </div>
        </CollapsibleCard>
      ))}

      {/* Special techniques */}
      <div style={{ marginTop: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "'DM Mono', monospace", marginBottom: 10 }}>
          Special Grain Techniques
        </div>
        {SPECIAL_GRAIN_TECHNIQUES.map((t, i) => (
          <CollapsibleCard key={i} title={t.name} subtitle={`Used in: ${t.usedIn}`} accent={C}>
            <div style={{ marginTop: 12 }}>
              <InfoRow label="How" value={t.how} />
              <InfoRow label="Why" value={t.why} />
              {t.note && (
                <div style={{ marginTop: 10, padding: "8px 12px", background: "#C9A84C15", borderRadius: 8, fontSize: 12, color: T.muted, lineHeight: 1.6 }}>
                  ⚠️ {t.note}
                </div>
              )}
            </div>
          </CollapsibleCard>
        ))}
      </div>
    </Section>
  );
}

function GrainToGlassSection() {
  return (
    <Section title="Grain to Glass — Process Comparison" color={C} subtitle="Side-by-side breakdown of how each drink is made">
      {GRAIN_TO_GLASS.map((d, i) => (
        <div key={i} style={{
          border: `1px solid ${T.border}`, borderRadius: 12,
          padding: "14px 16px", marginBottom: 10,
          background: "rgba(255,255,255,0.015)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 22 }}>{d.emoji}</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: T.cream }}>{d.drink}</span>
          </div>
          <div style={{ fontSize: 11, color: T.muted, lineHeight: 1.7, fontFamily: "'DM Mono', monospace", marginBottom: 8 }}>
            {d.process}
          </div>
          <div style={{ padding: "8px 12px", background: `${C}12`, borderRadius: 8, fontSize: 12, color: C, lineHeight: 1.5 }}>
            🔑 <strong>Key diff:</strong> {d.keyDiff}
          </div>
        </div>
      ))}
    </Section>
  );
}

function RegionalSpiritsSection() {
  return (
    <Section title="Regional Spirits" color={C} subtitle="Spirits beyond the Western canon">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
        {REGIONAL_SPIRITS.map((s, i) => (
          <div key={i} style={{
            background: T.card,
            border: `1px solid ${s.color}40`,
            borderRadius: 12, padding: 16,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div>
                <span style={{ fontSize: 20, marginRight: 8 }}>{s.emoji}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: s.color }}>{s.name}</span>
              </div>
              <Pill label={s.abv} color={s.color} />
            </div>
            <div style={{ fontSize: 11, color: T.muted, marginBottom: 4 }}><strong style={{ color: T.dim }}>Region:</strong> {s.region}</div>
            <div style={{ fontSize: 11, color: T.muted, marginBottom: 4 }}><strong style={{ color: T.dim }}>Base:</strong> {s.base}</div>
            <div style={{ fontSize: 11, color: T.muted, marginBottom: 4 }}><strong style={{ color: T.dim }}>Flavor:</strong> {s.flavor}</div>
            <div style={{ fontSize: 11, color: T.dim, lineHeight: 1.5 }}>
              <strong style={{ color: T.muted }}>Use:</strong> {s.use}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function VermouthSection() {
  const v = VERMOUTH;
  return (
    <Section title="Vermouth" color={C} subtitle="The most abused ingredient in the bar">
      <div style={{
        padding: "12px 16px", marginBottom: 16,
        background: "#D4712B15", border: `1px solid #D4712B40`,
        borderRadius: 10, fontSize: 12, color: T.cream, lineHeight: 1.7,
      }}>
        <strong>What it is:</strong> {v.what}<br />
        <strong>ABV:</strong> {v.abv}
      </div>

      <div style={{
        padding: "12px 16px", marginBottom: 16,
        background: "#D4820A15", border: `1px solid #D4820A50`,
        borderRadius: 10, fontSize: 12, color: "#D4820A", lineHeight: 1.7,
        fontWeight: 600,
      }}>
        ⚠️ {v.critical}
      </div>

      {v.types.map((t, i) => (
        <div key={i} style={{
          display: "flex", gap: 12, padding: "10px 12px",
          border: `1px solid ${T.border}`, borderRadius: 10,
          marginBottom: 8, background: "rgba(255,255,255,0.015)",
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.cream, marginBottom: 4 }}>{t.name}</div>
            <div style={{ fontSize: 11, color: T.muted }}>🎨 {t.color} · {t.taste}</div>
            <div style={{ fontSize: 11, color: T.dim, marginTop: 3 }}>Use in: {t.use}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <Pill label={t.example.split(",")[0]} />
          </div>
        </div>
      ))}

      <div style={{ marginTop: 12, padding: "12px 16px", background: "rgba(255,255,255,0.03)", borderRadius: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, fontFamily: "'DM Mono', monospace" }}>Storage</div>
        <div style={{ fontSize: 12, color: T.muted, lineHeight: 1.7 }}>
          <strong style={{ color: T.cream }}>Opened:</strong> {v.storage.opened}<br />
          <strong style={{ color: T.cream }}>Unopened:</strong> {v.storage.unopened}
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: "#D4820A", fontStyle: "italic" }}>💡 {v.storage.tip}</div>
      </div>
    </Section>
  );
}

// ── Tab navigation ────────────────────────────────────────────────────────────

const TABS = [
  { id: "overview",    label: "Overview",    emoji: "⚗️" },
  { id: "yeast",       label: "Yeast",       emoji: "🦠" },
  { id: "process",     label: "Process",     emoji: "🔄" },
  { id: "grain",       label: "Grain",       emoji: "🌾" },
  { id: "byproducts",  label: "Byproducts",  emoji: "🧪" },
  { id: "regional",    label: "Regional",    emoji: "🌍" },
  { id: "vermouth",    label: "Vermouth",    emoji: "🍷" },
];

export default function FermentationPage() {
  const [tab, setTab] = useState("overview");

  return (
    <div>
      {/* Tab bar */}
      <div style={{
        display: "flex", gap: 6, marginBottom: 28,
        flexWrap: "wrap",
      }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: "7px 14px", borderRadius: 8,
              background: tab === t.id ? `${C}22` : "rgba(255,255,255,0.04)",
              border: `1px solid ${tab === t.id ? C + "70" : T.border}`,
              color: tab === t.id ? C : T.muted,
              fontSize: 12, cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.15s",
            }}
          >
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "overview" && (
        <>
          <FermentedVsDistilled />
          <TempsAndAttenuation />
          <YeastToleranceSection />
          <SugarSourcesSection />
        </>
      )}

      {tab === "yeast" && (
        <>
          <YeastTypes />
          <MonitoringSection />
        </>
      )}

      {tab === "process" && (
        <>
          <FermentationPhasesSection />
          <VesselsSection />
          <SpecialTechniquesSection />
        </>
      )}

      {tab === "grain" && (
        <>
          <GrainToGlassSection />
          <GrainProcessingSection />
        </>
      )}

      {tab === "byproducts" && (
        <FlavorByproductsSection />
      )}

      {tab === "regional" && (
        <RegionalSpiritsSection />
      )}

      {tab === "vermouth" && (
        <VermouthSection />
      )}
    </div>
  );
}