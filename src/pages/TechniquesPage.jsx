import Section from "../components/Section";
import ClickCard from "../components/ClickCard";
import DataTable from "../components/DataTable";
import { FUNDAMENTALS, CORE_SPIRITS, MODIFIERS, GLASSWARE, BAR_TERMS, RATIOS, GOLDEN_RULES, PRO_TIPS, TROUBLESHOOTING, HOME_BAR } from "../data/techniques";
import { T } from "../theme";

export default function TechniquesPage() {
  return (
    <div>
      <Section title="The Five Fundamentals" color="#4A90A4">
        {FUNDAMENTALS.map((item, i) => <ClickCard key={i} item={item} accent="#4A90A4" />)}
      </Section>
      <Section title="Core Spirits" color="#C9A84C">
        {CORE_SPIRITS.map((item, i) => <ClickCard key={i} item={item} accent="#C9A84C" />)}
      </Section>
      <Section title="Key Modifiers" color="#D4712B">
        {MODIFIERS.map((item, i) => <ClickCard key={i} item={item} accent="#D4712B" />)}
      </Section>
      <Section title="Golden Ratios" color="#A0522D">
        {RATIOS.map((item, i) => <ClickCard key={i} item={item} accent="#A0522D" />)}
      </Section>
      <Section title="The Golden Rules" color="#C9A84C">
        {GOLDEN_RULES.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 14, padding: "10px 0", borderBottom: `1px solid rgba(255,255,255,0.05)` }}>
            <span style={{ fontSize: 13, color: "#C9A84C", fontWeight: 700, minWidth: 22, paddingTop: 1 }}>{i + 1}.</span>
            <div>
              <span style={{ fontSize: 14, fontWeight: 600, color: T.cream }}>{item.rule}</span>
              <span style={{ fontSize: 13, color: T.muted, marginLeft: 8 }}>— {item.detail}</span>
            </div>
          </div>
        ))}
      </Section>
      <Section title="Pro Tips" color="#6B8E3E">
        {PRO_TIPS.map((item, i) => <ClickCard key={i} item={item} accent="#6B8E3E" />)}
      </Section>
      <Section title="Troubleshooting" color="#8B7BA8">
        <DataTable rows={TROUBLESHOOTING} cols={["Problem", "Cause", "Fix"]} />
      </Section>
      <Section title="Glassware" color="#8B7BA8">
        <DataTable rows={GLASSWARE} cols={["Glass", "Size", "Best For"]} />
      </Section>
      <Section title="Bar Terms Glossary" color="#6B8E3E">
        <DataTable rows={BAR_TERMS} cols={["Term", "Meaning"]} />
      </Section>
      <Section title="Build Your Home Bar" color="#D4820A">
        {HOME_BAR.map((level, i) => (
          <div key={i} style={{
            border: `1px solid rgba(212,130,10,0.3)`, borderRadius: 12,
            marginBottom: 12, overflow: "hidden",
          }}>
            <div style={{
              background: "rgba(212,130,10,0.1)",
              padding: "12px 16px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              borderBottom: `1px solid rgba(212,130,10,0.2)`,
            }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#D4820A" }}>{level.level}</span>
              <span style={{ fontSize: 12, color: T.muted, fontFamily: "'DM Mono', monospace" }}>{level.cost}</span>
            </div>
            <div style={{ padding: "12px 16px", display: "flex", flexWrap: "wrap", gap: 8 }}>
              {level.items.map((item, j) => (
                <span key={j} style={{
                  fontSize: 12, color: T.cream,
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid rgba(255,255,255,0.08)`,
                  borderRadius: 6, padding: "4px 10px",
                }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </Section>
    </div>
  );
}