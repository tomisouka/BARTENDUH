import { useState } from "react";
import { ESPRESSO_DRINKS, DRINK_GROUPS } from "../data/coffee";

const MILK_COLOR = "#4A90A4";

function MilkBar({ shots, milk, color }) {
  const maxMilk = 200;
  const shotMl = shots * 36;
  const totalMl = shotMl + milk;
  const shotPct = Math.min((shotMl / Math.max(totalMl, 1)) * 100, 100);
  const milkPct = Math.min((milk / Math.max(totalMl, 1)) * 100, 100);

  if (milk === 0) return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, letterSpacing: "0.15em", color: "#5a5470", textTransform: "uppercase" }}>Composition</div>
      <div style={{ height: 8, borderRadius: 4, background: color, width: "100%" }} />
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "#5a5470" }}>100% espresso</div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, letterSpacing: "0.15em", color: "#5a5470", textTransform: "uppercase" }}>Composition</div>
      <div style={{ height: 8, borderRadius: 4, display: "flex", overflow: "hidden" }}>
        <div style={{ width: `${shotPct}%`, background: color, transition: "width 0.4s ease" }} />
        <div style={{ width: `${milkPct}%`, background: MILK_COLOR, opacity: 0.6, transition: "width 0.4s ease" }} />
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: `${color}cc` }}>■ Espresso {Math.round(shotPct)}%</span>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: `${MILK_COLOR}99` }}>■ Milk {Math.round(milkPct)}%</span>
      </div>
    </div>
  );
}

function DrinkCard({ drink, isActive, onClick }) {
  return (
    <div onClick={onClick}
      style={{ background: isActive ? `${drink.color}12` : "#0e0c14", border: `1px solid ${isActive ? drink.color + "70" : "#2a2535"}`, borderRadius: 12, padding: "14px", cursor: "pointer", transition: "all 0.18s", display: "flex", flexDirection: "column", gap: 8 }}
      onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = drink.color + "40"; e.currentTarget.style.background = drink.color + "08"; }}}
      onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = "#2a2535"; e.currentTarget.style.background = "#0e0c14"; }}}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 18 }}>{drink.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, fontWeight: 700, color: isActive ? drink.color : "#c8b898", letterSpacing: "0.05em" }}>{drink.label}</div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: "#5a5470" }}>{drink.size}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: drink.color, background: `${drink.color}15`, border: `1px solid ${drink.color}30`, borderRadius: 10, padding: "2px 6px" }}>{drink.ratio}</div>
        </div>
      </div>
      <MilkBar shots={drink.shots} milk={drink.milk} color={drink.color} />
    </div>
  );
}

function DrinkDetail({ drink }) {
  return (
    <div style={{ animation: "fadeIn 0.2s ease" }}>
      {/* Header */}
      <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid #2a2535" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>{drink.icon}</span>
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, color: drink.color, fontWeight: 700 }}>{drink.label}</div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "#5a5470", marginTop: 2 }}>{drink.size}</div>
          </div>
        </div>
      </div>

      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#c8b898", lineHeight: 1.8, marginBottom: 20 }}>{drink.desc}</p>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
        {[
          ["Shots", `${drink.shots} shot${drink.shots !== 1 ? "s" : ""}`],
          ["Ratio", drink.ratio],
          ["Milk", drink.milk === 0 ? "None" : `~${drink.milk}ml`],
          ["Size", drink.size],
        ].map(([label, val]) => (
          <div key={label} style={{ background: `${drink.color}08`, border: `1px solid ${drink.color}20`, borderRadius: 8, padding: "10px 12px" }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, letterSpacing: "0.15em", color: "#5a5470", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 14, fontWeight: 700, color: drink.color }}>{val}</div>
          </div>
        ))}
      </div>

      {/* Full composition bar */}
      <div style={{ background: "#0e0c14", border: "1px solid #2a2535", borderRadius: 10, padding: "14px", marginBottom: 20 }}>
        <MilkBar shots={drink.shots} milk={drink.milk} color={drink.color} />
      </div>

      {/* Build instructions */}
      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: "0.18em", color: "#5a5470", textTransform: "uppercase", marginBottom: 10 }}>How to Build</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {getBuildSteps(drink).map((step, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 12px", borderRadius: 8, background: "#0e0c14", border: "1px solid #1a1825" }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: `${drink.color}20`, border: `1px solid ${drink.color}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "'DM Mono',monospace", fontSize: 9, color: drink.color }}>{i + 1}</div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#c8b898", lineHeight: 1.6, margin: 0 }}>{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function getBuildSteps(drink) {
  const steps = {
    ristretto:  ["Grind finer than espresso and dose 7–9g", "Pull restricted shot — stop at 1:1 ratio (~7–9ml)", "Serve immediately in a demitasse"],
    espresso:   ["Dose 18g, distribute evenly, tamp with ~15kg pressure", "Lock portafilter, pre-infuse 2–3s, then full 9-bar pressure", "Extract to 1:2 ratio (~36g) in 25–30 seconds", "Serve immediately — espresso degrades fast"],
    lungo:      ["Dose 18g, grind slightly coarser than espresso", "Pull extended shot — allow to run to 1:3+ ratio (~60–90ml)", "More extraction = more caffeine but more bitterness"],
    doppio:     ["Use a double basket (18–21g dose)", "Pull as one shot to 1:2 ratio (~36–42ml per shot)", "Standard in most cafés — order this for lattes by default"],
    americano:  ["Pull one or two espresso shots", "Add hot water to the cup first (4–6oz)", "Pour espresso into water — not the other way — to preserve crema"],
    longblack:  ["Heat 150–200ml water in cup", "Pull a double espresso and float carefully on top of water", "The crema stays intact — the Antipodean way"],
    macchiato:  ["Pull a single espresso shot", "Add a small spoonful of dense microfoam on top", "The milk just 'marks' the espresso — keep it tiny"],
    cortado:    ["Pull one espresso shot into a 4–5oz glass", "Steam milk to ~60°C, minimal foam", "Pour equal volume of steamed milk directly over espresso"],
    piccolo:    ["Pull a ristretto into a small glass (90–100ml)", "Steam milk to silky microfoam (similar to latte)", "Pour 60ml of milk over the ristretto, leaving a thin foam layer"],
    flatwhite:  ["Pull a double ristretto (18g, 1:1 ratio) into a 5oz cup", "Steam 150ml whole milk to 55–60°C with fine silky microfoam", "Pour milk in a single smooth motion — 1cm foam layer on top"],
    cappuccino: ["Pull one espresso shot", "Steam milk to create thick, velvety foam (temp 60°C)", "Pour steamed milk then spoon thick foam on top — 1/3 each component"],
    latte:      ["Pull one or two espresso shots into a 8–12oz cup", "Steam 180–200ml milk to 60–65°C with silky microfoam", "Pour milk in one smooth motion, tip cup slightly", "Pour latte art if you can — the thin foam layer makes it possible"],
    breve:      ["Pull espresso shots as normal", "Steam half-and-half instead of milk — stop earlier (it froths faster)", "Pour over shots — richer and sweeter than regular latte"],
    mocha:      ["Add 1–2 tbsp chocolate syrup to cup", "Pull one espresso shot on top of chocolate", "Steam milk and pour over", "Top with whipped cream — optional but traditional"],
    affogato:   ["Scoop one or two balls of vanilla gelato into a glass", "Pull one hot espresso shot", "Pour espresso directly over gelato tableside — serve immediately"],
    shakerato:  ["Pull two espresso shots and let cool 30 seconds", "Add shots and simple syrup to cocktail shaker with ice", "Shake vigorously 15–20 seconds until silky foam forms", "Double-strain into a chilled coupe — no ice in the final drink"],
    con_panna:  ["Pull one espresso shot into a demitasse", "Pipe or spoon whipped cream directly on top", "Serve without stirring — the cream melts into the espresso as you drink"],
  };
  return steps[drink.id] || ["Pull espresso", "Add components as described", "Serve immediately"];
}

// ── Visual drink ladder ────────────────────────────────────────────────────
function DrinkLadder({ drinks, activeDrink, onSelect }) {
  const sorted = [...drinks].sort((a, b) => (a.milk + a.shots * 36) - (b.milk + b.shots * 36));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {sorted.map(d => {
        const total = d.milk + d.shots * 36;
        const shotPct = Math.min((d.shots * 36 / Math.max(total, 1)) * 100, 100);
        const milkPct = Math.min((d.milk / Math.max(total, 1)) * 100, 100);
        const isActive = activeDrink?.id === d.id;
        return (
          <div key={d.id} onClick={() => onSelect(d)}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", borderRadius: 8, cursor: "pointer", background: isActive ? `${d.color}15` : "transparent", border: `1px solid ${isActive ? d.color + "50" : "transparent"}`, transition: "all 0.15s" }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
          >
            <span style={{ fontSize: 14, width: 20 }}>{d.icon}</span>
            <div style={{ width: 80, flexShrink: 0 }}>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, fontWeight: 700, color: isActive ? d.color : "#8a84a0", letterSpacing: "0.04em", marginBottom: 3 }}>{d.label}</div>
              <div style={{ height: 5, borderRadius: 3, display: "flex", overflow: "hidden", width: "100%" }}>
                <div style={{ width: `${shotPct}%`, background: d.color }} />
                <div style={{ width: `${milkPct}%`, background: MILK_COLOR, opacity: 0.5 }} />
              </div>
            </div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: "#5a5470", marginLeft: "auto" }}>{d.size}</div>
          </div>
        );
      })}
    </div>
  );
}

export default function EspressoDrinksPage() {
  const [activeDrink, setActiveDrink] = useState(ESPRESSO_DRINKS.find(d => d.id === "espresso"));
  const [activeGroup, setActiveGroup] = useState("all");

  const filteredDrinks = activeGroup === "all" ? ESPRESSO_DRINKS : ESPRESSO_DRINKS.filter(d => d.group === activeGroup);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet" />
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* Page header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.2em", color: "#5a5470", textTransform: "uppercase", marginBottom: 8 }}>Coffee · Espresso</div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: "#C9A84C", fontWeight: 700, margin: "0 0 8px" }}>Espresso Drinks</h1>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#7a748e", lineHeight: 1.7, margin: 0 }}>Every café drink starts from a single espresso shot. Water, milk, and temperature are the only variables — the differences between drinks are smaller than you think.</p>
      </div>

      {/* Group filter */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        <button onClick={() => setActiveGroup("all")} style={{ padding: "5px 12px", borderRadius: 20, border: `1px solid ${activeGroup === "all" ? "#C9A84C60" : "#2a2535"}`, background: activeGroup === "all" ? "#C9A84C15" : "transparent", color: activeGroup === "all" ? "#C9A84C" : "#5a5470", fontSize: 11, fontFamily: "'DM Mono',monospace", cursor: "pointer", letterSpacing: "0.05em" }}>All</button>
        {DRINK_GROUPS.map(g => (
          <button key={g.id} onClick={() => setActiveGroup(g.id)} style={{ padding: "5px 12px", borderRadius: 20, border: `1px solid ${activeGroup === g.id ? g.color + "60" : "#2a2535"}`, background: activeGroup === g.id ? `${g.color}15` : "transparent", color: activeGroup === g.id ? g.color : "#5a5470", fontSize: 11, fontFamily: "'DM Mono',monospace", cursor: "pointer", letterSpacing: "0.05em" }}>{g.label}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(180px, 300px) 1fr", gap: 16, alignItems: "start" }}>
        {/* Left — drink list + ladder */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Mini ratio ladder */}
          <div style={{ background: "#0e0c14", border: "1px solid #2a2535", borderRadius: 12, padding: "14px" }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: "0.15em", color: "#5a5470", textTransform: "uppercase", marginBottom: 10 }}>By Milk Ratio</div>
            <DrinkLadder drinks={filteredDrinks} activeDrink={activeDrink} onSelect={setActiveDrink} />
          </div>
        </div>

        {/* Right — detail */}
        <div style={{ background: "#0e0c14", border: "1px solid #2a2535", borderRadius: 14, padding: "24px", position: "sticky", top: 20 }}>
          {activeDrink
            ? <DrinkDetail drink={activeDrink} />
            : <div style={{ textAlign: "center", color: "#5a5470", fontFamily: "'DM Sans',sans-serif", fontSize: 13, padding: "40px 0" }}>Select a drink to see details</div>
          }
        </div>
      </div>
    </>
  );
}