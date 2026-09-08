import { useState, useMemo, useRef, useEffect } from "react";
import { T } from "../theme";
import { LIQUOR_IMAGES, getBeerImage, getWineImage } from "../data/images";
import { LIQUOR } from "../data/gunthers";

const mono  = "'DM Mono', monospace";
const sans  = "'Inter', system-ui, sans-serif";

// ── Liquor category map ───────────────────────────────────────────────────────
const getName = x => typeof x === "string" ? x : x.name;
const getNames = arr => arr.map(getName);
const WHISKEY_KEYS = ["bourbon", "tennessee", "rye", "irish", "canadian", "flavored"];

const LIQUOR_CATS = {
  "All":      null,
  "Vodka":    getNames(LIQUOR.vodka),
  "Gin":      getNames(LIQUOR.gin),
  "Rum":      getNames(LIQUOR.rum),
  "Tequila":  getNames(LIQUOR.tequila),
  "Whiskey":  WHISKEY_KEYS.flatMap(k => getNames(LIQUOR[k] || [])),
  "Scotch":   getNames(LIQUOR.scotch),
  "Cognac":   getNames(LIQUOR.cognac),
  "Cordials": getNames(LIQUOR.cordials),
};

// ── All beer + wine brand names from images.js (must stay in sync) ────────────
const BEER_BRANDS = [
  "Bud Lt","Bud Light","Budweiser","Coors Lt","Coors Light","Lone Star",
  "Michelob Ultra","Miller Lite","PBR","Sam Adam's Boston Lager",
  "Shiner Bock","Shiner Lt Blonde","Shiner Cheer","Shiner Oktoberfest",
  "Stone IPA","Yuengling","Yuengling Lager","Yuengling Flight",
  "Angry Orchard","Angry Orchard Mango Peach",
  "Austin Eastcider Original","Austin Eastcider Blood Orange",
  "Blue Moon","Boddington's","Corona","Corona Premier",
  "Dogfish Head 60 Minute","Dogfish Head 90 Minute",
  "Dos Equis","Ghost in the Machine","Guinness","Harp","Heineken","Heineken Silver",
  "Hopadillo","Karbach Yuletide Confessions","Lagunitas IPA","Love St",
  "Modelo Especial","Newcastle","Pacifico","Pumpkinator",
  "Real Ale Fresh Kicks","Sam Smith Chocolate Porter",
  "Sierra Nevada Hazy Little Thing","Smithwick's",
  "St. Arn Art Car IPA","St. Arnold Oktoberfest","St. Arnold Spring Bock","St. Arnold Strawberry Cider",
  "Stella Artois","Strongbow","Sunny Little Thing","Twisted Tea",
  "Carbliss Assorted","High Noon Assorted","JD Down Home Punch",
  "Nutrl Assorted","Truly Pineapple","Truly Strawberry","Truly Wild Berry","White Claw Black Cherry",
];

const WINE_BRANDS = [
  "Alamos Malbec","Apothic Crush",
  "Barefoot Cabernet","Barefoot Chardonnay","Barefoot Merlot",
  "Barefoot Pinot Grigio","Barefoot White Zinfandel",
  "Chateau Ste Michelle Reisling","Cupcake Moscato Split",
  "Ecco Domani Pinot Grigio","House Champagne",
  "Kendall Jackson Chardonnay","La Marca Prosecco Split","Mumm Napa Split",
  "Oyster Bay Pinot Noir","Prophecy Rose","Seven Daughters Moscato",
  "Starborough Sauvignon Blanc","Storypoint Cabernet",
];

// Status values for beer/wine review
// "pending"   → not yet reviewed
// "confirmed" → wiki image looks correct, approved
// "override"  → custom URL set by user (always use this)
// "rejected"  → image is wrong / missing, needs a real URL

const STATUS_COLORS = {
  pending:     { color: "#887060", bg: "rgba(136,112,96,0.12)",  border: "rgba(136,112,96,0.3)"  },
  confirmed:   { color: "#6B8E3E", bg: "rgba(107,142,62,0.12)",  border: "rgba(107,142,62,0.35)" },
  unconfirmed: { color: "#4A90A4", bg: "rgba(74,144,164,0.12)",  border: "rgba(74,144,164,0.35)" },
  update:      { color: "#C9A84C", bg: "rgba(201,168,76,0.12)",  border: "rgba(201,168,76,0.35)" },
  override:    { color: "#a078d4", bg: "rgba(160,120,212,0.12)", border: "rgba(160,120,212,0.35)"},
  rejected:    { color: "#e05a5a", bg: "rgba(224,90,90,0.12)",   border: "rgba(224,90,90,0.35)"  },
};
const STATUS_LABELS = {
  pending:     "Pending",
  confirmed:   "✓ Confirmed",
  unconfirmed: "? Unconfirmed",
  update:      "🔄 Needs Update",
  override:    "⚡ Override",
  rejected:    "✗ Rejected",
};

// ── Image preview lightbox ───────────────────────────────────────────────────
function ImagePreview({ url, name, onClose }) {
  const [zoom, setZoom] = useState(1);         // 1 = fit, 2 = 2×, 3 = 3×
  const [origin, setOrigin] = useState("50% 50%");
  const imgRef = useRef(null);

  useEffect(() => {
    const fn = e => {
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") setZoom(z => Math.min(z + 0.5, 4));
      if (e.key === "-") setZoom(z => Math.max(z - 0.5, 1));
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  // Click on image to zoom in/out in steps, using click position as origin
  const handleImgClick = (e) => {
    e.stopPropagation();
    const rect = imgRef.current.getBoundingClientRect();
    const ox = ((e.clientX - rect.left) / rect.width * 100).toFixed(1) + "%";
    const oy = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1) + "%";
    setOrigin(`${ox} ${oy}`);
    setZoom(z => z >= 3 ? 1 : z + 1);
  };

  const steps = [1, 2, 3];
  const isZoomed = zoom > 1;

  return (
    <div onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.94)", backdropFilter: "blur(8px)",
               display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
               cursor: isZoomed ? "zoom-out" : "zoom-out" }}>

      {/* Inner container — stops backdrop click */}
      <div onClick={e => e.stopPropagation()}
        style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
                 maxWidth: isZoomed ? "95vw" : 520, maxHeight: "90vh" }}>

        {/* Image */}
        <div style={{ overflow: isZoomed ? "auto" : "visible", borderRadius: 8,
                      maxWidth: isZoomed ? "90vw" : "100%", maxHeight: isZoomed ? "80vh" : "72vh",
                      boxShadow: "0 0 80px rgba(0,0,0,0.9)" }}>
          <img
            ref={imgRef}
            src={url}
            alt={name}
            onClick={handleImgClick}
            style={{
              display: "block",
              maxWidth: isZoomed ? "none" : "100%",
              maxHeight: isZoomed ? "none" : "72vh",
              width: isZoomed ? `${zoom * 400}px` : undefined,
              objectFit: "contain",
              borderRadius: 8,
              cursor: zoom >= 3 ? "zoom-out" : "zoom-in",
              transformOrigin: origin,
              transition: "width 0.2s ease",
              userSelect: "none",
            }}
          />
        </div>

        {/* Name */}
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em" }}>
          {name}
        </div>

        {/* Zoom controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24, padding: "6px 14px" }}>
          <button onClick={() => setZoom(z => Math.max(z - 0.5, 1))}
            disabled={zoom <= 1}
            style={{ background: "none", border: "none", color: zoom <= 1 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)",
                     fontSize: 18, cursor: zoom <= 1 ? "default" : "pointer", lineHeight: 1, padding: "0 2px" }}>−</button>

          {steps.map(s => (
            <button key={s} onClick={() => setZoom(s)}
              style={{ width: 28, height: 28, borderRadius: "50%", border: "none", fontSize: 11,
                       fontFamily: "'DM Mono', monospace", cursor: "pointer", transition: "all 0.15s",
                       background: zoom === s ? "rgba(201,168,76,0.9)" : "rgba(255,255,255,0.08)",
                       color: zoom === s ? "#1a1400" : "rgba(255,255,255,0.6)",
                       fontWeight: zoom === s ? 700 : 400 }}>{s}×</button>
          ))}

          <button onClick={() => setZoom(z => Math.min(z + 0.5, 4))}
            disabled={zoom >= 4}
            style={{ background: "none", border: "none", color: zoom >= 4 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)",
                     fontSize: 18, cursor: zoom >= 4 ? "default" : "pointer", lineHeight: 1, padding: "0 2px" }}>+</button>

          {/* Magnifying glass zoom-in shortcut */}
          <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.12)", margin: "0 2px" }} />
          <button onClick={() => setZoom(z => z >= 3 ? 1 : z + 1)}
            title="Zoom in (click image to zoom at point)"
            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: 16,
                     cursor: "pointer", lineHeight: 1, padding: "0 2px" }}>🔍</button>
        </div>

        {/* Hint */}
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em" }}>
          click image to zoom at point · esc to close
        </div>

        {/* Close button */}
        <button onClick={onClose}
          style={{ position: "absolute", top: -12, right: -12, background: "rgba(255,255,255,0.08)",
                   border: "1px solid rgba(255,255,255,0.15)", borderRadius: "50%", width: 30, height: 30,
                   color: "rgba(255,255,255,0.6)", fontSize: 14, cursor: "pointer",
                   display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
      </div>
    </div>
  );
}

// ── Async beer/wine brand row ─────────────────────────────────────────────────
function AsyncBrandRow({ name, fetcher, status, overrideUrl, onStatus, onOverride, onPreview }) {
  const [fetchedImg, setFetchedImg] = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [editing,    setEditing]    = useState(false);
  const [draft,      setDraft]      = useState(overrideUrl || "");
  const [imgErr,     setImgErr]     = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setFetchedImg(null);
    fetcher(name).then(url => {
      if (!cancelled) { setFetchedImg(url); setLoading(false); }
    });
    return () => { cancelled = true; };
  }, [name]);

  const displayUrl = overrideUrl || fetchedImg;
  const showImg    = displayUrl && !imgErr;
  const sc         = STATUS_COLORS[status] || STATUS_COLORS.pending;

  const handleSaveOverride = () => {
    const val = draft.trim();
    onOverride(name, val);
    onStatus(name, val ? "override" : status === "override" ? "pending" : status);
    setEditing(false);
    setImgErr(false);
  };

  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 14px",
      background: sc.bg, border: `1px solid ${sc.border}`,
      borderRadius: 10, flexWrap: "wrap", transition: "all 0.2s",
    }}>
      {/* Thumbnail — click to preview */}
      <div onClick={() => showImg && onPreview && onPreview(displayUrl, name)}
        style={{ width: 52, height: 64, flexShrink: 0, borderRadius: 6, background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${T.border}`, overflow: "hidden", cursor: showImg ? "zoom-in" : "default" }}>
        {loading
          ? <span style={{ fontSize: 11, color: T.dim, fontFamily: mono }}>...</span>
          : showImg
            ? <img src={displayUrl} alt={name} style={{ maxWidth: 48, maxHeight: 60, objectFit: "contain" }} onError={() => setImgErr(true)} />
            : <span style={{ fontSize: 18, opacity: 0.25 }}>🖼</span>
        }
      </div>

      {/* Name + URL info */}
      <div style={{ flex: 1, minWidth: 140 }}>
        <div style={{ fontFamily: sans, fontWeight: 600, fontSize: 13, color: T.cream, marginBottom: 2 }}>{name}</div>
        {editing ? (
          <input autoFocus value={draft} onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleSaveOverride(); if (e.key === "Escape") setEditing(false); }}
            placeholder="Paste direct image URL…"
            style={{ width: "100%", padding: "5px 8px", background: "rgba(255,255,255,0.06)", border: `1px solid ${T.gold}60`, borderRadius: 6, color: T.cream, fontSize: 11, fontFamily: mono, outline: "none", boxSizing: "border-box", marginTop: 2 }}
          />
        ) : overrideUrl ? (
          <div style={{ fontSize: 10, color: T.gold, fontFamily: mono, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 280 }}>{overrideUrl}</div>
        ) : loading ? (
          <div style={{ fontSize: 10, color: T.dim, fontFamily: mono }}>Loading…</div>
        ) : fetchedImg ? (
          <div style={{ fontSize: 10, color: T.dim, fontFamily: mono, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 280 }}>wiki: {fetchedImg.slice(0, 60)}…</div>
        ) : (
          <div style={{ fontSize: 10, color: "#e05a5a", fontFamily: mono }}>No image found</div>
        )}
      </div>

      {/* Status badge */}
      {!editing && (
        <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 16, flexShrink: 0, fontFamily: mono, letterSpacing: "0.08em", background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, alignSelf: "center" }}>
          {STATUS_LABELS[status]}
        </span>
      )}

      {/* Actions */}
      <div style={{ display: "flex", gap: 5, flexShrink: 0, alignItems: "center", flexWrap: "wrap" }}>
        {editing ? (
          <>
            <button onClick={handleSaveOverride} style={{ padding: "5px 12px", background: `${T.gold}20`, border: `1px solid ${T.gold}60`, borderRadius: 6, color: T.gold, fontSize: 11, fontFamily: mono, cursor: "pointer" }}>Save</button>
            <button onClick={() => setEditing(false)} style={{ padding: "5px 8px", background: "rgba(255,255,255,0.04)", border: `1px solid ${T.border}`, borderRadius: 6, color: T.dim, fontSize: 11, fontFamily: mono, cursor: "pointer" }}>✕</button>
          </>
        ) : (
          <>
            {/* Always-visible status buttons — active one is highlighted */}
            {[
              { key: "confirmed",   label: "✓ Confirmed",   color: "#6B8E3E", bg: "rgba(107,142,62,0.15)",  border: "rgba(107,142,62,0.45)"  },
              { key: "unconfirmed", label: "? Unconfirmed", color: "#4A90A4", bg: "rgba(74,144,164,0.12)",  border: "rgba(74,144,164,0.45)"  },
              { key: "update",      label: "🔄 Update",      color: "#C9A84C", bg: "rgba(201,168,76,0.12)",  border: "rgba(201,168,76,0.45)"  },
              { key: "rejected",    label: "✗ Rejected",    color: "#e05a5a", bg: "rgba(224,90,90,0.12)",   border: "rgba(224,90,90,0.45)"   },
            ].map(({ key, label, color, bg, border }) => (
              <button key={key} onClick={() => onStatus(name, status === key ? "pending" : key)}
                style={{
                  padding: "5px 10px", borderRadius: 6, fontSize: 11, fontFamily: mono, cursor: "pointer",
                  background: status === key ? bg : "rgba(255,255,255,0.03)",
                  border: `1px solid ${status === key ? border : "rgba(255,255,255,0.08)"}`,
                  color: status === key ? color : "rgba(255,255,255,0.25)",
                  fontWeight: status === key ? 700 : 400,
                  transition: "all 0.15s",
                }}
                onMouseEnter={e => { if (status !== key) { e.currentTarget.style.background = bg; e.currentTarget.style.borderColor = border; e.currentTarget.style.color = color; }}}
                onMouseLeave={e => { if (status !== key) { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.25)"; }}}
              >{label}</button>
            ))}
            {/* Override URL */}
            <button onClick={() => { setDraft(overrideUrl || ""); setEditing(true); }}
              style={{ padding: "5px 10px", background: overrideUrl ? "rgba(160,120,212,0.15)" : "rgba(255,255,255,0.03)", border: `1px solid ${overrideUrl ? "rgba(160,120,212,0.45)" : "rgba(255,255,255,0.08)"}`, borderRadius: 6, color: overrideUrl ? "#a078d4" : T.muted, fontSize: 11, fontFamily: mono, cursor: "pointer" }}>⚡ URL</button>
          </>
        )}
      </div>
    </div>
  );
}

// ── Export modal (shared) ─────────────────────────────────────────────────────
function ExportModal({ title, subtitle, code, onClose }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => navigator.clipboard.writeText(code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  return (
    <div onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#100e18", border: `1px solid ${T.border}`, borderRadius: 16, width: "100%", maxWidth: 700, maxHeight: "85vh", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "18px 20px 14px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 13, fontWeight: 700, color: T.gold }}>{title}</div>
            <div style={{ fontFamily: sans, fontSize: 12, color: T.dim, marginTop: 3 }}>{subtitle}</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: T.dim, fontSize: 18, cursor: "pointer" }}>✕</button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "14px 20px" }}>
          <pre style={{ fontFamily: mono, fontSize: 11, color: "#c8b898", lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-all", background: "#0a0810", border: `1px solid ${T.border}`, borderRadius: 8, padding: 14 }}>{code}</pre>
        </div>
        <div style={{ padding: "14px 20px", borderTop: `1px solid ${T.border}`, display: "flex", gap: 10 }}>
          <button onClick={handleCopy}
            style={{ flex: 1, padding: 10, background: copied ? "#6B8E3E20" : `${T.gold}20`, border: `1px solid ${copied ? "#6B8E3E60" : T.gold + "60"}`, borderRadius: 8, color: copied ? "#6B8E3E" : T.gold, fontFamily: mono, fontSize: 13, cursor: "pointer", transition: "all 0.2s" }}>
            {copied ? "✓ Copied!" : "Copy to Clipboard"}
          </button>
          <button onClick={onClose} style={{ padding: "10px 20px", background: "rgba(255,255,255,0.04)", border: `1px solid ${T.border}`, borderRadius: 8, color: T.dim, fontFamily: mono, fontSize: 13, cursor: "pointer" }}>Close</button>
        </div>
      </div>
    </div>
  );
}

// ── Liquor add-brand row (module-level to prevent remount on parent re-render) ──
function LiquorAddRow({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [url,  setUrl]  = useState("");
  if (!open) return (
    <button onClick={() => setOpen(true)}
      style={{ width: "100%", padding: 10, background: "rgba(255,255,255,0.025)", border: `1px dashed ${T.border}`, borderRadius: 10, color: T.dim, fontSize: 13, fontFamily: mono, cursor: "pointer" }}>
      + Add Brand
    </button>
  );
  return (
    <div style={{ padding: 14, background: "rgba(201,168,76,0.04)", border: `1px solid ${T.gold}40`, borderRadius: 10, display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ fontFamily: mono, fontSize: 10, color: T.gold, letterSpacing: "0.15em", textTransform: "uppercase" }}>Add New Brand</div>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Brand name" autoFocus
        style={{ padding: "7px 10px", background: "rgba(255,255,255,0.06)", border: `1px solid ${T.border}`, borderRadius: 6, color: T.cream, fontSize: 13, fontFamily: sans, outline: "none" }} />
      <input value={url} onChange={e => setUrl(e.target.value)} placeholder="Image URL (optional)"
        onKeyDown={e => { if (e.key === "Enter") { onAdd(name.trim(), url.trim()); setName(""); setUrl(""); setOpen(false); } }}
        style={{ padding: "7px 10px", background: "rgba(255,255,255,0.06)", border: `1px solid ${T.border}`, borderRadius: 6, color: T.cream, fontSize: 12, fontFamily: mono, outline: "none" }} />
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => { onAdd(name.trim(), url.trim()); setName(""); setUrl(""); setOpen(false); }}
          style={{ padding: "7px 18px", background: `${T.gold}20`, border: `1px solid ${T.gold}60`, borderRadius: 6, color: T.gold, fontSize: 12, fontFamily: mono, cursor: "pointer" }}>Add</button>
        <button onClick={() => setOpen(false)}
          style={{ padding: "7px 12px", background: "rgba(255,255,255,0.04)", border: `1px solid ${T.border}`, borderRadius: 6, color: T.dim, fontSize: 12, fontFamily: mono, cursor: "pointer" }}>Cancel</button>
      </div>
    </div>
  );
}

// ── Liquor brand row (module-level to prevent remount + autoFocus scroll bug) ──
function LiquorRow({ name, url, statuses, onSave, onRemove, onStatus, onPreview }) {
  const [imgErr,  setImgErr]  = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft,   setDraft]   = useState(url || "");
  const hasSrc = url && url.trim() && !imgErr;
  const status = statuses[name] || "pending";
  const sc = STATUS_COLORS[status] || STATUS_COLORS.pending;
  const handleSaveRow = () => { onSave(name, draft.trim()); setEditing(false); setImgErr(false); };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: sc.bg, border: `1px solid ${editing ? "'DM Mono', monospace".gold + "40" : sc.border}`, borderRadius: 10, flexWrap: "wrap", transition: "all 0.15s" }}>

      <div onClick={() => hasSrc && onPreview && onPreview(url, name)}
        style={{ width: 40, height: 50, flexShrink: 0, borderRadius: 6, background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: "1px solid rgba(51,43,32,1)", cursor: hasSrc ? "zoom-in" : "default" }}>
        {hasSrc ? <img src={url} alt={name} style={{ maxWidth: 36, maxHeight: 46, objectFit: "contain" }} onError={() => setImgErr(true)} /> : <span style={{ fontSize: 18, opacity: 0.3 }}>🍶</span>}
      </div>

      <div style={{ flex: 1, minWidth: 120 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#f5f0e8", marginBottom: 2 }}>{name}</div>
        {editing
          ? <input autoFocus value={draft} onChange={e => setDraft(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") handleSaveRow(); if (e.key === "Escape") { setDraft(url || ""); setEditing(false); } }}
              placeholder="Paste image URL…"
              style={{ width: "100%", padding: "5px 8px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(201,168,76,0.6)", borderRadius: 6, color: "#f5f0e8", fontSize: 11, fontFamily: "'DM Mono', monospace", outline: "none", boxSizing: "border-box", marginTop: 2 }} />
          : hasSrc
            ? <div style={{ fontSize: 10, color: "#887060", fontFamily: "'DM Mono', monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 320 }}>{url}</div>
            : <div style={{ fontSize: 10, color: "#e05a5a", fontFamily: "'DM Mono', monospace" }}>No image</div>
        }
      </div>

      {!editing && (
        <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 16, flexShrink: 0, fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>
          {STATUS_LABELS[status]}
        </span>
      )}

      <div style={{ display: "flex", gap: 5, flexShrink: 0, flexWrap: "wrap" }}>
        {editing ? (
          <>
            <button onClick={handleSaveRow} style={{ padding: "5px 12px", background: "rgba(201,168,76,0.2)", border: "1px solid rgba(201,168,76,0.6)", borderRadius: 6, color: "#e0b84e", fontSize: 11, fontFamily: "'DM Mono', monospace", cursor: "pointer" }}>Save</button>
            <button onClick={() => { setDraft(url || ""); setEditing(false); }} style={{ padding: "5px 8px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(51,43,32,1)", borderRadius: 6, color: "#887060", fontSize: 11, fontFamily: "'DM Mono', monospace", cursor: "pointer" }}>✕</button>
          </>
        ) : (
          <>
            {[
              { key: "confirmed",   label: "✓ Confirmed",   color: "#6B8E3E", bg: "rgba(107,142,62,0.15)",  border: "rgba(107,142,62,0.45)"  },
              { key: "unconfirmed", label: "? Unconfirmed", color: "#4A90A4", bg: "rgba(74,144,164,0.12)",  border: "rgba(74,144,164,0.45)"  },
              { key: "update",      label: "🔄 Update",      color: "#C9A84C", bg: "rgba(201,168,76,0.12)",  border: "rgba(201,168,76,0.45)"  },
              { key: "rejected",    label: "✗ Rejected",    color: "#e05a5a", bg: "rgba(224,90,90,0.12)",   border: "rgba(224,90,90,0.45)"   },
            ].map(({ key, label, color, bg: sbg, border: sb }) => (
              <button key={key}
                onClick={() => onStatus(name, status === key ? "pending" : key)}
                style={{ padding: "5px 9px", borderRadius: 6, fontSize: 11, fontFamily: "'DM Mono', monospace", cursor: "pointer", transition: "all 0.15s",
                  background: status === key ? sbg : "rgba(255,255,255,0.03)",
                  border: `1px solid ${status === key ? sb : "rgba(255,255,255,0.08)"}`,
                  color: status === key ? color : "rgba(255,255,255,0.25)",
                  fontWeight: status === key ? 700 : 400,
                }}
                onMouseEnter={e => { if (status !== key) { e.currentTarget.style.background = sbg; e.currentTarget.style.borderColor = sb; e.currentTarget.style.color = color; }}}
                onMouseLeave={e => { if (status !== key) { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.25)"; }}}
              >{label}</button>
            ))}
            <button onClick={() => { setDraft(url || ""); setEditing(true); }}
              style={{ padding: "5px 9px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(51,43,32,1)", borderRadius: 6, color: "#c8b898", fontSize: 11, fontFamily: "'DM Mono', monospace", cursor: "pointer" }}>✎ Edit</button>
            <button onClick={() => { if (window.confirm(`Remove "${name}"?`)) onRemove(name); }}
              style={{ padding: "5px 7px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(51,43,32,1)", borderRadius: 6, color: "#887060", fontSize: 11, fontFamily: "'DM Mono', monospace", cursor: "pointer" }}>✕</button>
          </>
        )}
      </div>
    </div>
  );
}

// ── Liquor tab ────────────────────────────────────────────────────────────────
function LiquorTab() {
  const [urls,       setUrls]       = useState({ ...LIQUOR_IMAGES });
  const [statuses, setStatuses] = useState(() => {
    try {
      const saved = localStorage.getItem("imgmgr:liquor:statuses");
      return saved ? JSON.parse(saved) : Object.fromEntries(Object.keys(LIQUOR_IMAGES).map(k => [k, "pending"]));
    } catch { return Object.fromEntries(Object.keys(LIQUOR_IMAGES).map(k => [k, "pending"])); }
  });
  const handleStatus = (name, s) => setStatuses(prev => {
    const next = { ...prev, [name]: s };
    try { localStorage.setItem("imgmgr:liquor:statuses", JSON.stringify(next)); } catch {}
    return next;
  });
  const [cat,        setCat]        = useState("All");
  const [filter,     setFilter]     = useState("all");
  const [search,     setSearch]     = useState("");
  const [showExport, setShowExport] = useState(false);
  const [preview,    setPreview]    = useState(null); // { url, name }


  const handleSave   = (name, url) => setUrls(prev => ({ ...prev, [name]: url }));
  const handleRemove = (name)      => setUrls(prev => { const n = { ...prev }; delete n[name]; return n; });
  const handleAdd    = (name, url) => setUrls(prev => ({ ...prev, [name]: url }));

  const ENTRIES = useMemo(() => Object.entries(urls), [urls]);
  const TOTAL   = ENTRIES.length;
  const FILLED  = ENTRIES.filter(([, v]) => v && v.trim()).length;
  const pct     = Math.round((FILLED / TOTAL) * 100);

  const catBrands = useMemo(() => {
    const list = LIQUOR_CATS[cat];
    return list ? ENTRIES.filter(([n]) => list.includes(n)) : ENTRIES;
  }, [cat, ENTRIES]);

  const STATUS_FILTER_KEYS = ["confirmed","unconfirmed","update","rejected"];
  const visible = useMemo(() => catBrands.filter(([name, url]) => {
    const matchSearch = !search || name.toLowerCase().includes(search.toLowerCase());
    const hasSrc = url && url.trim();
    const st = statuses[name] || "pending";
    const matchFilter = filter === "all"
      || (filter === "filled" && hasSrc)
      || (filter === "missing" && !hasSrc)
      || STATUS_FILTER_KEYS.includes(filter) && st === filter
      || filter === "pending" && st === "pending";
    return matchSearch && matchFilter;
  }), [catBrands, filter, search, statuses]);

  const catFilled  = catBrands.filter(([, v]) => v && v.trim()).length;
  const catTotal   = catBrands.length;
  const statusCounts = useMemo(() => {
    const c = { pending: 0, confirmed: 0, unconfirmed: 0, update: 0, rejected: 0 };
    catBrands.forEach(([n]) => { const s = statuses[n] || "pending"; c[s] = (c[s]||0) + 1; });
    return c;
  }, [catBrands, statuses]);
  const hasChanges = useMemo(() => Object.entries(urls).some(([k, v]) => LIQUOR_IMAGES[k] !== v) || Object.keys(urls).length !== Object.keys(LIQUOR_IMAGES).length, [urls]);

  const exportCode = `export const LIQUOR_IMAGES = {\n${Object.entries(urls).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`).join("\n")}\n};`;


  return (
    <div>
      {preview && <ImagePreview url={preview.url} name={preview.name} onClose={() => setPreview(null)} />}
      {showExport && <ExportModal title="Export LIQUOR_IMAGES" subtitle="Replace the LIQUOR_IMAGES export in src/data/images.js" code={exportCode} onClose={() => setShowExport(false)} />}

      {/* Progress + export */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: T.muted }}>Coverage</span>
            <span style={{ fontSize: 12, color: T.gold, fontFamily: mono }}>{FILLED} / {TOTAL} ({pct}%)</span>
          </div>
          <div style={{ height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${T.gold}, #D4712B)`, borderRadius: 3, transition: "width 0.4s" }} />
          </div>
        </div>
        <button onClick={() => setShowExport(true)} style={{ padding: "10px 18px", background: hasChanges ? `${T.gold}25` : "rgba(255,255,255,0.04)", border: `1px solid ${hasChanges ? T.gold + "70" : T.border}`, borderRadius: 9, color: hasChanges ? T.gold : T.muted, fontFamily: mono, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          {hasChanges && <span style={{ width: 7, height: 7, borderRadius: "50%", background: T.gold, display: "inline-block" }} />}
          Export
        </button>
      </div>

      {/* Category tabs */}
      <div style={{ display: "flex", gap: 4, overflowX: "auto", marginBottom: 12, paddingBottom: 2 }}>
        {Object.keys(LIQUOR_CATS).map(c => (
          <button key={c} onClick={() => setCat(c)} style={{ padding: "6px 14px", background: cat === c ? T.gold + "10" : "none", border: `1px solid ${cat === c ? T.gold + "60" : T.border}`, borderRadius: 20, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, fontSize: 12, fontWeight: cat === c ? 700 : 500, color: cat === c ? T.gold : T.muted, transition: "all 0.2s" }}>{c}</button>
        ))}
      </div>

      {/* Filter + search */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 13, opacity: 0.4 }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…" style={{ width: "100%", padding: "7px 12px 7px 30px", background: "rgba(255,255,255,0.04)", border: `1px solid ${T.border}`, borderRadius: 8, color: T.cream, fontSize: 13, outline: "none", fontFamily: sans, boxSizing: "border-box" }} />
        </div>
        {[
          ["all",         `All (${catTotal})`],
          ["filled",      `Filled (${catFilled})`],
          ["missing",     `Missing (${catTotal - catFilled})`],
          ["confirmed",   `✓ ${statusCounts.confirmed}`],
          ["unconfirmed", `? ${statusCounts.unconfirmed}`],
          ["update",      `🔄 ${statusCounts.update}`],
          ["rejected",    `✗ ${statusCounts.rejected}`],
        ].map(([f, label]) => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "6px 11px", background: filter === f ? "rgba(255,255,255,0.07)" : "none", border: `1px solid ${T.border}`, borderRadius: 8, cursor: "pointer", fontSize: 11, color: filter === f ? T.cream : T.muted, fontFamily: mono, whiteSpace: "nowrap" }}>
            {label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {visible.map(([name, url]) => <LiquorRow key={name} name={name} url={url} statuses={statuses} onSave={handleSave} onRemove={handleRemove} onStatus={handleStatus} onPreview={(u, n) => setPreview({ url: u, name: n })} />)}
        {!search && <LiquorAddRow onAdd={handleAdd} />}
      </div>
    </div>
  );
}

// ── Beer / Wine review tab ────────────────────────────────────────────────────
function ReviewTab({ brands, fetcher, accentColor, exportConstName, exportFileName }) {
  // status map: name → "pending" | "confirmed" | "override" | "rejected"
  const [statuses, setStatuses] = useState(() => {
    try {
      const saved = localStorage.getItem(`imgmgr:${exportConstName}:statuses`);
      return saved ? JSON.parse(saved) : Object.fromEntries(brands.map(b => [b, "pending"]));
    } catch { return Object.fromEntries(brands.map(b => [b, "pending"])); }
  });
  const [overrides, setOverrides] = useState(() => {
    try {
      const saved = localStorage.getItem(`imgmgr:${exportConstName}:overrides`);
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });
  const [filter,    setFilter]    = useState("all");
  const [search,    setSearch]    = useState("");
  const [showExport, setShowExport] = useState(false);
  const [preview,   setPreview]   = useState(null); // { url, name }

  const handleStatus = (name, status) => setStatuses(prev => {
    const next = { ...prev, [name]: status };
    try { localStorage.setItem(`imgmgr:${exportConstName}:statuses`, JSON.stringify(next)); } catch {}
    return next;
  });
  const handleOverride = (name, url) => setOverrides(prev => {
    const next = { ...prev, [name]: url };
    try { localStorage.setItem(`imgmgr:${exportConstName}:overrides`, JSON.stringify(next)); } catch {}
    return next;
  });

  const counts = useMemo(() => {
    const c = { pending: 0, confirmed: 0, unconfirmed: 0, update: 0, override: 0, rejected: 0 };
    brands.forEach(b => c[statuses[b]] = (c[statuses[b]] || 0) + 1);
    return c;
  }, [statuses, brands]);

  const visible = useMemo(() => brands.filter(name => {
    const matchSearch = !search || name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || statuses[name] === filter;
    return matchSearch && matchFilter;
  }), [brands, statuses, search, filter]);

  const exportCode = [
    `// Copy this into images.js to replace the ${exportConstName} block`,
    `const ${exportConstName} = {`,
    ...brands
      .filter(name => overrides[name] || statuses[name] === "confirmed")
      .map(name => {
        const url = overrides[name] || "/* wiki */";
        return `  ${JSON.stringify(name)}: ${JSON.stringify(overrides[name] || "")} // ${statuses[name]}`;
      }),
    `};`,
  ].join("\n");

  const reviewed = counts.confirmed + counts.unconfirmed + counts.update + counts.override + counts.rejected;
  const pct = Math.round((reviewed / brands.length) * 100);

  return (
    <div>
      {preview && <ImagePreview url={preview.url} name={preview.name} onClose={() => setPreview(null)} />}
      {showExport && <ExportModal title={`Export ${exportConstName}`} subtitle={`Add confirmed overrides to ${exportFileName}`} code={exportCode} onClose={() => setShowExport(false)} />}

      {/* Progress */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap", alignItems: "stretch" }}>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: T.muted }}>Reviewed</span>
            <span style={{ fontSize: 12, color: accentColor, fontFamily: mono }}>{reviewed} / {brands.length} ({pct}%)</span>
          </div>
          <div style={{ height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: accentColor, borderRadius: 3, transition: "width 0.4s" }} />
          </div>
          {/* Status counts */}
          <div style={{ display: "flex", gap: 12, marginTop: 10, flexWrap: "wrap" }}>
            {Object.entries(STATUS_LABELS).map(([k, label]) => (
              <span key={k} style={{ fontFamily: mono, fontSize: 10, color: STATUS_COLORS[k].color }}>
                {counts[k]} {label.replace("✓ ","").replace("⚡ ","").replace("✗ ","")}
              </span>
            ))}
          </div>
        </div>
        <button onClick={() => setShowExport(true)} style={{ padding: "10px 18px", background: `${accentColor}20`, border: `1px solid ${accentColor}60`, borderRadius: 9, color: accentColor, fontFamily: mono, fontSize: 12, cursor: "pointer" }}>
          Export Overrides
        </button>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
        {[
          ["all",         `All (${brands.length})`],
          ["pending",     `Pending (${counts.pending})`],
          ["confirmed",   `✓ ${counts.confirmed}`],
          ["unconfirmed", `? ${counts.unconfirmed}`],
          ["update",      `🔄 ${counts.update}`],
          ["override",    `⚡ ${counts.override}`],
          ["rejected",    `✗ ${counts.rejected}`],
        ].map(([key, label]) => (
          <button key={key} onClick={() => setFilter(key)} style={{ padding: "6px 12px", background: filter === key ? `${accentColor}15` : "none", border: `1px solid ${filter === key ? accentColor + "60" : T.border}`, borderRadius: 20, cursor: "pointer", fontSize: 11, color: filter === key ? accentColor : T.muted, fontFamily: mono, transition: "all 0.15s" }}>{label}</button>
        ))}
        <div style={{ position: "relative", flex: 1, minWidth: 160 }}>
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 12, opacity: 0.4 }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…" style={{ width: "100%", padding: "6px 10px 6px 28px", background: "rgba(255,255,255,0.04)", border: `1px solid ${T.border}`, borderRadius: 8, color: T.cream, fontSize: 12, outline: "none", fontFamily: sans, boxSizing: "border-box" }} />
        </div>
      </div>

      {/* Brand rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {visible.length === 0
          ? <div style={{ textAlign: "center", padding: "40px 0", color: T.dim, fontSize: 13, fontFamily: mono }}>No brands match.</div>
          : visible.map(name => (
            <AsyncBrandRow
              key={name}
              name={name}
              fetcher={fetcher}
              status={statuses[name]}
              overrideUrl={overrides[name] || ""}
              onStatus={handleStatus}
              onOverride={handleOverride}
              onPreview={(url, n) => setPreview({ url, name: n })}
            />
          ))
        }
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
const TABS = [
  { key: "liquor", label: "🥃 Liquor", color: T.gold   },
  { key: "beer",   label: "🍺 Beer",   color: "#D4820A" },
  { key: "wine",   label: "🍷 Wine",   color: "#8B1A35" },
];

export default function ImageManagerPage() {
  const [tab, setTab] = useState("liquor");

  return (
    <div style={{ fontFamily: sans, color: T.cream }}>
      <div style={{ marginBottom: 4 }}>
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, fontWeight: 800, color: T.gold, margin: "0 0 4px" }}>Image Manager</h1>
        <p style={{ color: T.dim, fontSize: 13, margin: 0 }}>Manage bottle images across Liquor, Beer, and Wine. Confirm wiki fetches, reject bad ones, paste override URLs.</p>
      </div>

      {/* Top-level tabs */}
      <div style={{ display: "flex", gap: 6, margin: "20px 0 24px", borderBottom: `1px solid ${T.border}`, paddingBottom: 0 }}>
        {TABS.map(({ key, label, color }) => (
          <button key={key} onClick={() => setTab(key)} style={{
            padding: "10px 20px", background: tab === key ? `${color}18` : "transparent",
            border: "none", borderBottom: `2px solid ${tab === key ? color : "transparent"}`,
            cursor: "pointer", fontSize: 13, fontWeight: tab === key ? 700 : 500,
            color: tab === key ? color : T.muted, fontFamily: sans,
            transition: "all 0.15s", marginBottom: -1,
          }}>{label}</button>
        ))}
      </div>

      {tab === "liquor" && <LiquorTab />}
      {tab === "beer"   && <ReviewTab brands={BEER_BRANDS} fetcher={getBeerImage} accentColor="#D4820A" exportConstName="BEER_LOCAL" exportFileName="images.js" />}
      {tab === "wine"   && <ReviewTab brands={WINE_BRANDS} fetcher={getWineImage} accentColor="#8B1A35" exportConstName="WINE_LOCAL" exportFileName="images.js" />}
    </div>
  );
}