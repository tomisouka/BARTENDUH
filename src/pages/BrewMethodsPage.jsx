import { useState } from "react";
import { BREW_METHODS, PROCESSING_METHODS, ROAST_LEVELS } from "../data/coffee";

const GRIND_POSITIONS = {
  "Extra Fine": 5,
  "Fine to Medium-Fine": 22,
  "Fine": 18,
  "Medium-Fine": 30,
  "Medium to Medium-Fine": 38,
  "Medium": 50,
  "Coarse": 75,
  "Extra Coarse": 92,
};

function GrindDial({ label }) {
  const pct = GRIND_POSITIONS[label] ?? 50;
  const stops = ["Extra Fine", "Fine", "Med-Fine", "Medium", "Coarse", "X-Coarse"];
  return (
    <div>
      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: "0.15em", color: "#5a5470", textTransform: "uppercase", marginBottom: 6 }}>Grind Size</div>
      <div style={{ position: "relative", height: 8, background: "#1a1825", borderRadius: 4, marginBottom: 6 }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, #4A90A4, #C9A84C)`, borderRadius: 4, transition: "width 0.5s ease" }} />
        <div style={{ position: "absolute", top: "50%", left: `${pct}%`, transform: "translate(-50%,-50%)", width: 14, height: 14, borderRadius: "50%", background: "#C9A84C", border: "2px solid #07060A", boxShadow: "0 0 8px rgba(201,168,76,0.6)", transition: "left 0.5s ease" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {stops.map(s => <span key={s} style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, color: "#3a3450", letterSpacing: 0 }}>{s}</span>)}
      </div>
    </div>
  );
}

function BrewCard({ method, isActive, onClick }) {
  return (
    <div onClick={onClick} style={{ background: isActive ? `${method.color}12` : "#0e0c14", border: `1px solid ${isActive ? method.color + "60" : "#2a2535"}`, borderRadius: 12, padding: "16px", cursor: "pointer", transition: "all 0.2s", display: "flex", flexDirection: "column", gap: 8 }}
      onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = method.color + "40"; e.currentTarget.style.background = method.color + "08"; } }}
      onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = "#2a2535"; e.currentTarget.style.background = "#0e0c14"; } }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 22 }}>{method.icon}</span>
        <div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 700, color: isActive ? method.color : "#c8b898", letterSpacing: "0.06em" }}>{method.label}</div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "#5a5470" }}>{method.category}</div>
        </div>
        <div style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: isActive ? method.color : "#2a2535", transition: "background 0.2s" }} />
      </div>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#7a748e", lineHeight: 1.6, margin: 0 }}>{method.desc}</p>
    </div>
  );
}

function StatBadge({ label, value, sub, color }) {
  return (
    <div style={{ background: `${color}0a`, border: `1px solid ${color}25`, borderRadius: 10, padding: "12px 14px", flex: 1, minWidth: 0 }}>
      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, letterSpacing: "0.18em", color: "#5a5470", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 15, fontWeight: 700, color, marginBottom: 2, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "#5a5470", lineHeight: 1.4 }}>{sub}</div>}
    </div>
  );
}

function MethodDetail({ method }) {
  const [tipOpen, setTipOpen] = useState(null);
  return (
    <div style={{ animation: "fadeIn 0.2s ease" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid #2a2535" }}>
        <span style={{ fontSize: 36 }}>{method.icon}</span>
        <div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: "0.2em", color: method.color, textTransform: "uppercase", marginBottom: 3 }}>{method.category}</div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: method.color, fontWeight: 700 }}>{method.label}</div>
        </div>
      </div>

      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#c8b898", lineHeight: 1.8, marginBottom: 20 }}>{method.desc}</p>

      {/* Stats row */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        <StatBadge label="Ratio" value={method.ratio} sub={method.ratioDetail} color={method.color} />
        <StatBadge label="Temp" value={method.temp} color={method.color} />
        <StatBadge label="Time" value={method.time} sub={method.timeDetail} color={method.color} />
      </div>

      {/* Grind dial */}
      <div style={{ background: "#0e0c14", border: "1px solid #2a2535", borderRadius: 10, padding: "14px", marginBottom: 20 }}>
        <GrindDial label={method.grind} />
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#5a5470", marginTop: 8 }}>{method.grindDetail}</div>
      </div>

      {/* Flavor & caffeine */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <div style={{ flex: 1, background: "#0e0c14", border: "1px solid #2a2535", borderRadius: 10, padding: "12px" }}>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, letterSpacing: "0.18em", color: "#5a5470", textTransform: "uppercase", marginBottom: 6 }}>Body</div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#c8b898" }}>{method.body}</div>
        </div>
        <div style={{ flex: 1, background: "#0e0c14", border: "1px solid #2a2535", borderRadius: 10, padding: "12px" }}>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, letterSpacing: "0.18em", color: "#5a5470", textTransform: "uppercase", marginBottom: 6 }}>Caffeine</div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#c8b898" }}>{method.caffeine}</div>
        </div>
        <div style={{ flex: 1, background: "#0e0c14", border: "1px solid #2a2535", borderRadius: 10, padding: "12px" }}>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, letterSpacing: "0.18em", color: "#5a5470", textTransform: "uppercase", marginBottom: 6 }}>Acidity</div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#c8b898" }}>{method.acid}</div>
        </div>
      </div>

      {/* Tips */}
      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: "0.18em", color: "#5a5470", textTransform: "uppercase", marginBottom: 10 }}>Pro Tips</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {method.tips.map((tip, i) => (
          <div key={i} onClick={() => setTipOpen(tipOpen === i ? null : i)}
            style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", borderRadius: 8, border: `1px solid ${tipOpen === i ? method.color + "40" : "#1a1825"}`, background: tipOpen === i ? `${method.color}08` : "transparent", cursor: "pointer", transition: "all 0.15s" }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: `${method.color}20`, border: `1px solid ${method.color}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "'DM Mono',monospace", fontSize: 9, color: method.color }}>{i + 1}</div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#c8b898", lineHeight: 1.6, margin: 0 }}>{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BrewMethodsPage() {
  const [activeMethod, setActiveMethod] = useState(BREW_METHODS[0]);
  const [activeTab, setActiveTab] = useState("methods"); // methods | processing | roast

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet" />
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* Page header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.2em", color: "#5a5470", textTransform: "uppercase", marginBottom: 8 }}>Coffee · Extraction</div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: "#C9A84C", fontWeight: 700, margin: "0 0 8px" }}>Brew Methods</h1>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#7a748e", lineHeight: 1.7, margin: 0 }}>Every brewing method extracts coffee differently. Grind size, water temperature, contact time, and pressure all shape the final cup.</p>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "#0e0c14", borderRadius: 10, padding: 4, border: "1px solid #2a2535" }}>
        {[["methods", "Brew Methods"], ["processing", "Processing"], ["roast", "Roast Levels"]].map(([id, label]) => (
          <button key={id} onClick={() => setActiveTab(id)}
            style={{ flex: 1, padding: "8px 12px", borderRadius: 7, border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: activeTab === id ? 600 : 400, background: activeTab === id ? "#C9A84C20" : "transparent", color: activeTab === id ? "#C9A84C" : "#5a5470", transition: "all 0.15s", borderBottom: activeTab === id ? "2px solid #C9A84C" : "2px solid transparent" }}>
            {label}
          </button>
        ))}
      </div>

      {/* ── Brew Methods Tab ── */}
      {activeTab === "methods" && (
        <div style={{ display: "grid", gridTemplateColumns: "minmax(200px, 340px) 1fr", gap: 16, alignItems: "start" }}>
          {/* Left: method list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {BREW_METHODS.map(m => (
              <BrewCard key={m.id} method={m} isActive={activeMethod?.id === m.id} onClick={() => setActiveMethod(m)} />
            ))}
          </div>
          {/* Right: detail */}
          <div style={{ background: "#0e0c14", border: "1px solid #2a2535", borderRadius: 14, padding: "24px", position: "sticky", top: 20 }}>
            {activeMethod ? <MethodDetail method={activeMethod} /> : <div style={{ textAlign: "center", color: "#5a5470", fontFamily: "'DM Sans',sans-serif", fontSize: 13, padding: "40px 0" }}>Select a method to see details</div>}
          </div>
        </div>
      )}

      {/* ── Processing Methods Tab ── */}
      {activeTab === "processing" && (
        <div>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#7a748e", lineHeight: 1.7, marginBottom: 20 }}>How coffee cherries are processed after harvest dramatically shapes the flavor of the bean — often more than the roast.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px,100%), 1fr))", gap: 12 }}>
            {PROCESSING_METHODS.map(p => (
              <div key={p.id} style={{ background: "#0e0c14", border: `1px solid ${p.color}30`, borderRadius: 14, padding: "20px", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 28 }}>{p.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, fontWeight: 700, color: p.color, letterSpacing: "0.05em" }}>{p.label}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#5a5470" }}>{p.sublabel}</div>
                  </div>
                </div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#a098b8", lineHeight: 1.7, margin: 0 }}>{p.description}</p>
                <div style={{ background: `${p.color}10`, border: `1px solid ${p.color}25`, borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: "0.15em", color: "#5a5470", textTransform: "uppercase", marginBottom: 4 }}>Flavor Profile</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: p.color }}>{p.flavor}</div>
                </div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#5a5470" }}>🌍 {p.regions}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Roast Levels Tab ── */}
      {activeTab === "roast" && (
        <div>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#7a748e", lineHeight: 1.7, marginBottom: 20 }}>Roasting transforms green coffee beans through hundreds of chemical reactions. The roaster decides when to stop — trading origin flavors for roast character.</p>
          {/* Visual roast spectrum */}
          <div style={{ background: "#0e0c14", border: "1px solid #2a2535", borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: "0.15em", color: "#5a5470", textTransform: "uppercase", marginBottom: 12 }}>Roast Spectrum</div>
            <div style={{ position: "relative", height: 24, borderRadius: 12, background: "linear-gradient(90deg, #f5d78a 0%, #C9A84C 20%, #D4820A 45%, #A0522D 70%, #3a2010 100%)", marginBottom: 12 }}>
              {ROAST_LEVELS.map((r, i) => (
                <div key={r.id} style={{ position: "absolute", top: "50%", left: `${10 + i * 26}%`, transform: "translate(-50%,-50%)", width: 16, height: 16, borderRadius: "50%", background: r.color, border: "2px solid #07060A", boxShadow: `0 0 6px ${r.color}80` }} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: "#5a5470" }}>180°C ← LIGHT</span>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: "#5a5470" }}>DARK → 245°C</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(240px,100%), 1fr))", gap: 12 }}>
            {ROAST_LEVELS.map(r => (
              <div key={r.id} style={{ background: "#0e0c14", border: `1px solid ${r.color}30`, borderRadius: 14, padding: "20px", display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 24 }}>{r.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 700, color: r.color, letterSpacing: "0.05em" }}>{r.label}</div>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "#5a5470" }}>{r.temp}</div>
                  </div>
                </div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#a098b8", lineHeight: 1.7, margin: 0 }}>{r.description}</p>
                <div style={{ background: `${r.color}10`, border: `1px solid ${r.color}25`, borderRadius: 8, padding: "8px 10px" }}>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: r.color }}>{r.flavor}</div>
                </div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "#5a5470", fontStyle: "italic" }}>{r.examples}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}