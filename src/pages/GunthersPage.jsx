import { useState, useRef, useEffect, useMemo } from "react";
import { BEER, WINE, MOCKTAILS_MENU, LIQUOR, COCKTAILS_MENU, SPECIALTY_MENU, SHOTS_MENU, SUMMARY, RECIPES } from "../data/gunthers";
import { getDrinkImage, getBeerImage, getWineImage, getLiquorImage } from "../data/images";
import { BRAND_INFO, BEER_INFO } from "../data/brandInfo";
import { WINE_TYPES } from "../data/wine";


// ── Liquor brand modal ────────────────────────────────────────────────────────

const FONT_LINK = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap";

const C = {
  black:  "#080604",
  dark:   "#0e0c09",
  card:   "#181410",
  border: "#332b20",
  gold:   "#e0b84e",
  goldL:  "#f5d878",
  goldD:  "#b8904a",
  cream:  "#f5f0e8",
  muted:  "#c8b898",
  dim:    "#887060",
  draft:  "#6ab8f0",
  bottle: "#90d860",
  ipa:    "#f0a878",
};

const mono  = "'DM Mono', monospace";
const sans  = "'Inter', system-ui, sans-serif";
const bebas = "'Bebas Neue', sans-serif";
const serif = sans; // alias — no more thin serif anywhere

const sortAlpha = (arr) =>
  [...arr].sort((a, b) => {
    const na = (typeof a === "string" ? a : a.name).replace(/^(D |G |B )/, "").toLowerCase();
    const nb = (typeof b === "string" ? b : b.name).replace(/^(D |G |B )/, "").toLowerCase();
    return na.localeCompare(nb);
  });

const getRawName    = (x) => typeof x === "string" ? x : x.name;
const getDisplayName = (x) => getRawName(x).replace(/^(G |B )/, "");

// ── Wine type detection ───────────────────────────────────────────────────────
// Returns { type, color, label } based on the wine name

function getWineType(name) {
  const lc = name.toLowerCase();
  for (const wt of WINE_TYPES) {
    if (wt.keywords.some(k => lc.includes(k))) return wt;
  }
  return { type:"other", color:"#9a8060", label:"Wine" };
}

// ── Injected styles ───────────────────────────────────────────────────────────

const STYLES = `
  * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
  @keyframes fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes slideIn  { from{opacity:0;transform:translateY(8px)}  to{opacity:1;transform:translateY(0)} }
  @keyframes modalIn  { from{opacity:0;transform:scale(0.96) translateY(10px)} to{opacity:1;transform:scale(1) translateY(0)} }
  @keyframes orb1     { 0%,100%{transform:scale(1) translateX(-50%)} 50%{transform:scale(1.1) translateX(-50%)} }
  @keyframes orb2     { 0%,100%{opacity:0.6} 50%{opacity:1} }
  .gunthers-fade1 { animation: fadeUp 0.65s 0.0s ease both; }
  .gunthers-fade2 { animation: fadeUp 0.65s 0.1s ease both; }
  .gunthers-fade3 { animation: fadeUp 0.65s 0.2s ease both; }
  .gunthers-fade4 { animation: fadeUp 0.65s 0.3s ease both; }
  .bi:hover { background: #221c14 !important; border-color: #554030 !important; }
  .bi:hover .bi-bar { transform: scaleY(1) !important; }
  .bi:hover .bi-name { color: #f5d878 !important; }
  .bc:hover { background: #221c14 !important; border-color: #554030 !important; }
  .bc:hover .bc-name { color: #f5d878 !important; }
  .bc:hover .bc-bar  { transform: scaleY(1) !important; }
  .nav-pill:hover { background: rgba(224,184,78,0.09) !important; }
  .sr-row:hover { background: rgba(224,184,78,0.06) !important; }
  .trow:hover { background: rgba(224,184,78,0.05) !important; }
  @media (max-width: 600px) {
    .gunthers-hero { font-size: clamp(44px,14vw,80px) !important; }
    .gunthers-section { font-size: clamp(22px,5vw,32px) !important; }
    .bi-name, .bc-name { font-size: 13px !important; }
    .gunthers-modal-name { font-size: 26px !important; }
    .gunthers-modal-wrap { flex-direction: column !important; max-height: 92vh; overflow-y: auto; }
    .gunthers-modal-recipe { padding: 20px 16px !important; overflow-y: visible !important; }
    .gunthers-modal-img { width: 100% !important; height: 220px !important; align-self: auto !important; flex-shrink: 0; }
    .gunthers-modal-img img { position: relative !important; height: 220px !important; }
  }
  @media (min-width: 601px) {
    .gunthers-modal-wrap { max-height: 90vh; }
  }
`;

// ── Ambient background ────────────────────────────────────────────────────────

function AmbientBg() {
  return (
    <div style={{ position:"fixed",inset:0,zIndex:0,pointerEvents:"none",overflow:"hidden" }}>
      <div style={{ position:"absolute",top:"-15%",left:"50%",transform:"translateX(-50%)",width:800,height:800,background:"radial-gradient(ellipse,rgba(224,184,78,0.06) 0%,transparent 65%)",animation:"orb1 9s ease-in-out infinite" }}/>
      <div style={{ position:"absolute",bottom:"-5%",right:"-8%",width:500,height:500,background:"radial-gradient(ellipse,rgba(92,168,224,0.03) 0%,transparent 65%)",animation:"orb2 13s ease-in-out 1s infinite" }}/>
      <div style={{ position:"absolute",top:"50%",left:"-5%",width:400,height:400,background:"radial-gradient(ellipse,rgba(200,72,120,0.025) 0%,transparent 65%)",animation:"orb2 11s ease-in-out 3s infinite" }}/>
      <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.022 }}>
        <filter id="bg-grain"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
        <rect width="100%" height="100%" filter="url(#bg-grain)"/>
      </svg>
    </div>
  );
}

// ── Liquor brand modal ────────────────────────────────────────────────────────

function LiquorModal({ name, onClose }) {
  const info = BRAND_INFO[name];
  const img  = getLiquorImage(name);
  const display = name.replace(/^(G |B )/, "");

  useEffect(() => {
    const fn = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <div onClick={onClose} style={{ position:"fixed",inset:0,zIndex:1000,background:"rgba(0,0,0,0.88)",backdropFilter:"blur(10px) saturate(0.6)",display:"flex",alignItems:"center",justifyContent:"center",padding:16 }}>
      <div onClick={e=>e.stopPropagation()} style={{ display:"flex",maxWidth:680,width:"100%",background:"linear-gradient(160deg,#1c1810 0%,#100e08 100%)",border:`1px solid ${C.goldD}`,borderRadius:2,overflow:"hidden",animation:"modalIn 0.22s cubic-bezier(0.16,1,0.3,1) both",position:"relative" }}>

        {/* Close */}
        <button onClick={onClose} style={{ position:"absolute",top:14,right:16,background:"none",border:"none",color:C.dim,fontSize:18,cursor:"pointer",fontFamily:mono,lineHeight:1,padding:4,zIndex:10,transition:"color 0.15s" }} onMouseEnter={e=>e.currentTarget.style.color=C.gold} onMouseLeave={e=>e.currentTarget.style.color=C.dim}>✕</button>

        {/* Bottle image */}
        {img && (
          <div style={{ width:160,flexShrink:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",padding:"28px 16px",borderRight:`1px solid ${C.border}` }}>
            <img src={img} alt={display} style={{ maxWidth:"100%",maxHeight:220,objectFit:"contain" }}/>
          </div>
        )}

        {/* Info */}
        <div style={{ flex:1,padding:"32px 28px",minWidth:0 }}>
          {info && <div style={{ fontFamily:mono,fontSize:11,letterSpacing:"0.28em",color:C.goldD,textTransform:"uppercase",marginBottom:6 }}>{info.style}</div>}
          <div style={{ fontFamily:bebas,fontSize:36,color:C.gold,letterSpacing:"0.04em",lineHeight:1,marginBottom:16 }}>{display}</div>

          <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:20 }}>
            <div style={{ flex:1,height:1,background:`linear-gradient(to right,${C.goldD},transparent)` }}/>
            <span style={{ fontFamily:mono,fontSize:12,color:C.dim,letterSpacing:"0.2em" }}>✦</span>
          </div>

          {info ? (
            <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
              <div style={{ display:"flex",gap:20,flexWrap:"wrap" }}>
                <div>
                  <div style={{ fontFamily:mono,fontSize:10,letterSpacing:"0.2em",color:C.goldD,textTransform:"uppercase",marginBottom:3 }}>Origin</div>
                  <div style={{ fontFamily:sans,fontWeight:500,fontSize:14,color:C.cream }}>{info.origin}</div>
                </div>
                <div>
                  <div style={{ fontFamily:mono,fontSize:10,letterSpacing:"0.2em",color:C.goldD,textTransform:"uppercase",marginBottom:3 }}>ABV</div>
                  <div style={{ fontFamily:sans,fontWeight:500,fontSize:14,color:C.cream }}>{info.abv}</div>
                </div>
              </div>
              <div>
                <div style={{ fontFamily:mono,fontSize:10,letterSpacing:"0.2em",color:C.goldD,textTransform:"uppercase",marginBottom:6 }}>About</div>
                <p style={{ fontFamily:sans,fontWeight:400,fontSize:14,color:C.muted,lineHeight:1.75,margin:0 }}>{info.note}</p>
              </div>
            </div>
          ) : (
            <p style={{ fontFamily:sans,fontSize:14,color:C.dim,fontStyle:"italic" }}>No info available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────

function Modal({ name, recipe, type, onClose }) {
  const [img, setImg] = useState(null);

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  useEffect(() => {
    setImg(null);
    if (type === "beer")       getBeerImage(name).then(setImg);
    else if (type === "wine")  getWineImage(name).then(setImg);
    else                       getDrinkImage(name).then(setImg);
  }, [name, type]);

  const display = name.replace(/^D /, "");

  return (
    <div onClick={onClose} style={{ position:"fixed",inset:0,zIndex:1000,background:"rgba(0,0,0,0.9)",backdropFilter:"blur(10px) saturate(0.6)",display:"flex",alignItems:"center",justifyContent:"center",padding:16,overflowY:"auto" }}>
      <div onClick={e=>e.stopPropagation()} className="gunthers-modal-wrap" style={{ display:"flex",gap:12,maxWidth:860,width:"100%",alignItems:"stretch",animation:"modalIn 0.22s cubic-bezier(0.16,1,0.3,1) both" }}>

        {/* Recipe card */}
        <div className="gunthers-modal-recipe" style={{ flex:1,background:"linear-gradient(160deg,#1c1810 0%,#100e08 100%)",border:`1px solid ${C.goldD}`,borderRadius:2,padding:"32px 28px",position:"relative",overflowY:"auto",minWidth:0 }}>
          {[["tl",0],["tr",1],["bl",2],["br",3]].map(([,i]) => (
            <div key={i} style={{ position:"absolute",top:i<2?12:undefined,bottom:i>=2?12:undefined,left:i%2===0?12:undefined,right:i%2!==0?12:undefined,width:14,height:14,borderTop:i<2?`1px solid ${C.goldD}`:undefined,borderBottom:i>=2?`1px solid ${C.goldD}`:undefined,borderLeft:i%2===0?`1px solid ${C.goldD}`:undefined,borderRight:i%2!==0?`1px solid ${C.goldD}`:undefined }}/>
          ))}
          <button onClick={onClose} style={{ position:"absolute",top:14,right:16,background:"none",border:"none",color:C.dim,fontSize:18,cursor:"pointer",fontFamily:mono,lineHeight:1,padding:4,transition:"color 0.15s",zIndex:10 }} onMouseEnter={e=>e.currentTarget.style.color=C.gold} onMouseLeave={e=>e.currentTarget.style.color=C.dim}>✕</button>
          <div style={{ fontFamily:mono,fontSize:11,letterSpacing:"0.28em",color:C.goldD,textTransform:"uppercase",marginBottom:6 }}>{recipe.label}</div>
          <div className="gunthers-modal-name" style={{ fontFamily:bebas,fontSize:38,color:C.gold,letterSpacing:"0.04em",lineHeight:1,marginBottom:16 }}>{display}</div>
          <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:20 }}>
            <div style={{ flex:1,height:1,background:`linear-gradient(to right,${C.goldD},transparent)` }}/>
            <span style={{ fontFamily:mono,fontSize:12,color:C.dim,letterSpacing:"0.2em" }}>✦</span>
          </div>
          <div style={{ fontFamily:mono,fontSize:11,letterSpacing:"0.18em",color:C.goldD,textTransform:"uppercase",marginBottom:10 }}>Ingredients</div>
          <ul style={{ listStyle:"none",margin:"0 0 20px",padding:0 }}>
            {recipe.ingredients.map((ing,i) => (
              <li key={i} style={{ fontFamily:sans,fontWeight:500,fontSize:13,color:C.cream,padding:"8px 0",borderBottom:`1px solid rgba(42,37,32,0.8)`,display:"flex",gap:10,alignItems:"baseline",lineHeight:1.55 }}>
                <span style={{ color:C.goldD,flexShrink:0,fontSize:13 }}>—</span>{ing}
              </li>
            ))}
          </ul>
          <div style={{ fontFamily:mono,fontSize:11,letterSpacing:"0.18em",color:C.goldD,textTransform:"uppercase",marginBottom:10 }}>Instructions</div>
          <p style={{ fontFamily:sans,fontWeight:400,fontSize:13,color:C.muted,lineHeight:1.85,margin:0 }}>{recipe.instructions}</p>
        </div>

        {/* Image card — desktop: right side | mobile: below via CSS */}
        {img && (
          <div className="gunthers-modal-img" style={{ width:260,flexShrink:0,borderRadius:2,overflow:"hidden",border:`1px solid ${C.goldD}`,position:"relative",alignSelf:"stretch" }}>
            <img src={img} alt={display} style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",display:"block",position:"absolute",inset:0 }}/>
            <div style={{ position:"absolute",inset:0,background:"linear-gradient(to bottom, transparent 50%, rgba(8,6,4,0.92) 100%)" }}/>
            <div style={{ position:"absolute",bottom:16,left:16,right:16 }}>
              <div style={{ fontFamily:bebas,fontSize:22,color:C.gold,letterSpacing:"0.04em",lineHeight:1.1 }}>{display}</div>
              <div style={{ fontFamily:mono,fontSize:10,letterSpacing:"0.2em",color:C.muted,textTransform:"uppercase",marginTop:4 }}>{recipe.label}</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// ── Item row ──────────────────────────────────────────────────────────────────

// Style tag colors for beer — keyed by item.style value
const BEER_STYLE_COLORS = {
  "Light Lager": { color: "#a8c8e8", border: "rgba(168,200,232,0.35)" },
  "Dark Lager":  { color: "#c87820", border: "rgba(200,120,32,0.4)"  },
  "Bock":        { color: "#b86020", border: "rgba(184,96,32,0.4)"   },
  "Pilsner":     { color: "#c8b840", border: "rgba(200,184,64,0.35)" },
  "IPA":         { color: "#f0a878", border: "rgba(240,168,120,0.4)" },
  "Stout":       { color: "#8878a0", border: "rgba(136,120,160,0.4)" },
  "Porter":      { color: "#7868a0", border: "rgba(120,104,160,0.4)" },
  "Wheat":       { color: "#c8c060", border: "rgba(200,192,96,0.35)" },
  "Ale":         { color: "#d49040", border: "rgba(212,144,64,0.4)"  },
  "Cider":       { color: "#88c860", border: "rgba(136,200,96,0.35)" },
  "Seltzer":     { color: "#60c8c8", border: "rgba(96,200,200,0.35)" },
  "Hard Tea":    { color: "#c8a860", border: "rgba(200,168,96,0.35)" },
  "RTD":         { color: "#a880c0", border: "rgba(168,128,192,0.35)"},
  "Seasonal":    { color: "#c89060", border: "rgba(200,144,96,0.35)" },
};

function Item({ item, onOpen, onOpenLiquor, type }) {
  const name      = getRawName(item);
  const display   = getDisplayName(item);
  const tag       = typeof item === "object" ? item.tag    : null;
  const style     = typeof item === "object" ? item.style  : null;
  const format    = typeof item === "object" ? item.format : null;
  const isHouse   = typeof item === "object" ? item.house  : false;
  const recipe    = RECIPES[name];
  const isDraft   = name.startsWith("D ");
  const isBeer    = type === "beer";
  const isLiquor  = type === undefined;
  const hasLiquorInfo = isLiquor && (getLiquorImage(name) || BRAND_INFO[name]);
  const beerInfo  = isBeer ? (BEER_INFO[name] || BEER_INFO[name.replace(/^D /, "")] || null) : null;
  const [beerOpen, setBeerOpen] = useState(false);
  const beerStyleColor = isBeer && style ? BEER_STYLE_COLORS[style] || { color: C.dim, border: "rgba(255,255,255,0.15)" } : null;
  const accent    = beerStyleColor ? beerStyleColor.color : isDraft ? C.draft : C.bottle;

  const handleClick = () => {
    if (isLiquor && hasLiquorInfo) { onOpenLiquor(name); return; }
    if (isBeer && beerInfo) { setBeerOpen(o => !o); return; }
    if (recipe) onOpen(name, recipe, type);
  };

  const isClickable = (isLiquor && hasLiquorInfo) || (isBeer && beerInfo) || !!recipe;
  return (
  <div style={{ border:`1px solid ${isHouse ? "rgba(201,168,76,0.3)" : beerOpen ? (beerStyleColor ? beerStyleColor.border : C.border) : C.border}`,borderRadius:0,overflow:"hidden",transition:"border-color 0.2s",marginBottom:0 }}>
    <div className="bi" onClick={handleClick}
      style={{ padding:"16px 20px 16px 22px",background:C.card,border:"none",color:C.cream,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,position:"relative",overflow:"hidden",cursor:isClickable?"pointer":"default",transition:"background 0.15s" }}>

      <div className="bi-bar" style={{ position:"absolute",left:0,top:0,bottom:0,width:3,background: isHouse ? C.gold : accent,transform:"scaleY(0)",transformOrigin:"bottom",transition:"transform 0.18s ease" }}/>

      <span className="bi-name" style={{ fontFamily:sans,fontSize:16,fontWeight:600,letterSpacing:"0.01em",flex:1,transition:"color 0.15s",userSelect:"none",lineHeight:1.4 }}>
        {display}
        {recipe && <span style={{ display:"inline-block",width:4,height:4,borderRadius:"50%",background:C.goldD,marginLeft:7,verticalAlign:"middle",position:"relative",top:-1 }}/>}
      </span>

      <div style={{ display:"flex",gap:6,alignItems:"center",flexShrink:0 }}>
        {isHouse && <span style={{ fontFamily:mono,fontSize:11,color:C.gold,border:"1px solid rgba(201,168,76,0.45)",borderRadius:2,padding:"3px 8px",letterSpacing:"0.1em",textTransform:"uppercase" }}>House</span>}
        {isBeer && style && beerStyleColor && (
          <span style={{ fontFamily:mono,fontSize:11,color:beerStyleColor.color,border:`1px solid ${beerStyleColor.border}`,borderRadius:2,padding:"3px 8px",letterSpacing:"0.07em" }}>{style}</span>
        )}
        {tag && !style && <span style={{ fontFamily:mono,fontSize:13,color:C.ipa,border:"1px solid rgba(224,144,96,0.4)",borderRadius:2,padding:"3px 8px",letterSpacing:"0.07em" }}>{tag}</span>}
        {isLiquor && tag && (() => {
          const LIQUOR_TAG_COLORS = {
            // Vodka — icy blue
            "Vodka":                  { color: "#7ec8e3", border: "rgba(126,200,227,0.35)" },
            "Flavored Vodka":         { color: "#7ec8e3", border: "rgba(126,200,227,0.35)" },
            // Gin — botanical green
            "London Dry Gin":         { color: "#7abf8a", border: "rgba(122,191,138,0.35)" },
            "Scottish Gin":           { color: "#7abf8a", border: "rgba(122,191,138,0.35)" },
            // Rum — warm amber
            "White Rum":              { color: "#c9a84c", border: "rgba(201,168,76,0.35)" },
            "Dark Rum":               { color: "#a0641a", border: "rgba(160,100,26,0.45)" },
            "Spiced Rum":             { color: "#c47b3a", border: "rgba(196,123,58,0.4)" },
            "Flavored Rum":           { color: "#c9a84c", border: "rgba(201,168,76,0.35)" },
            "Coconut Rum Liqueur":    { color: "#c9a84c", border: "rgba(201,168,76,0.35)" },
            // Tequila — agave green/gold
            "Blanco":                 { color: "#b8d96e", border: "rgba(184,217,110,0.35)" },
            "Reposado":               { color: "#d4a830", border: "rgba(212,168,48,0.4)" },
            "Flavored Tequila":       { color: "#b8d96e", border: "rgba(184,217,110,0.35)" },
            "Blanco Tequila":         { color: "#b8d96e", border: "rgba(184,217,110,0.35)" },
            "Reposado Tequila":       { color: "#d4a830", border: "rgba(212,168,48,0.4)" },
            // Whiskey family — warm amber/brown tones
            "Bourbon":                { color: "#e0a040", border: "rgba(224,160,64,0.4)" },
            "Tennessee Whiskey":      { color: "#d48830", border: "rgba(212,136,48,0.4)" },
            "Irish Whiskey":          { color: "#98c060", border: "rgba(152,192,96,0.35)" },
            "Rye Whiskey":            { color: "#c87840", border: "rgba(200,120,64,0.4)" },
            "Canadian Whisky":        { color: "#c8a060", border: "rgba(200,160,96,0.35)" },
            "Flavored Whiskey":       { color: "#d4884a", border: "rgba(212,136,74,0.4)" },
            "Texas Whiskey":          { color: "#e0a040", border: "rgba(224,160,64,0.4)" },
            "Peach Whiskey Liqueur":  { color: "#d4884a", border: "rgba(212,136,74,0.4)" },
            // Scotch — smoky gold
            "Blended Scotch":         { color: "#c8b060", border: "rgba(200,176,96,0.4)" },
            "Single Malt":            { color: "#e8c840", border: "rgba(232,200,64,0.45)" },
            "Single Malt Scotch":     { color: "#e8c840", border: "rgba(232,200,64,0.45)" },
            "Scotch":                 { color: "#c8b060", border: "rgba(200,176,96,0.4)" },
            // Cognac — deep gold
            "Cognac":                 { color: "#d4943c", border: "rgba(212,148,60,0.45)" },
          };
          const tc = LIQUOR_TAG_COLORS[tag] || { color: C.dim, border: "rgba(255,255,255,0.1)" };
          return <span style={{ fontFamily:mono,fontSize:11,color:tc.color,border:`1px solid ${tc.border}`,borderRadius:2,padding:"3px 8px",letterSpacing:"0.07em" }}>{tag}</span>;
        })()}
        {format && <span style={{ fontFamily:mono,fontSize:13,borderRadius:2,padding:"3px 8px",letterSpacing:"0.07em",color:isDraft?C.draft:C.bottle,border:`1px solid ${isDraft?"rgba(92,168,224,0.35)":"rgba(130,208,80,0.35)"}` }}>{format}</span>}
        {isDraft && !format && <span style={{ fontFamily:mono,fontSize:13,color:C.draft,border:"1px solid rgba(92,168,224,0.35)",borderRadius:2,padding:"3px 8px",letterSpacing:"0.07em" }}>Draft</span>}
        {hasLiquorInfo && <span style={{ fontFamily:mono,fontSize:13,color:C.goldD,lineHeight:1 }}>›</span>}
        {isBeer && beerInfo && <span style={{ fontFamily:mono,fontSize:13,color:C.goldD,lineHeight:1,transition:"transform 0.2s",display:"inline-block",transform:beerOpen?"rotate(180deg)":"none" }}>▼</span>}
      </div>
    </div>
    {isBeer && beerInfo && beerOpen && (
      <div style={{ padding:"14px 22px 18px",borderTop:`1px solid ${beerStyleColor ? beerStyleColor.border : "rgba(255,255,255,0.08)"}`,background:"rgba(0,0,0,0.25)",animation:"slideIn 0.16s ease both" }}>
        <div style={{ display:"flex",gap:24,flexWrap:"wrap",marginBottom:10 }}>
          <div>
            <div style={{ fontFamily:mono,fontSize:10,letterSpacing:"0.18em",color:C.goldD,textTransform:"uppercase",marginBottom:3 }}>Origin</div>
            <div style={{ fontFamily:sans,fontWeight:500,fontSize:13,color:C.cream }}>{beerInfo.origin}</div>
          </div>
          <div>
            <div style={{ fontFamily:mono,fontSize:10,letterSpacing:"0.18em",color:C.goldD,textTransform:"uppercase",marginBottom:3 }}>Owner</div>
            <div style={{ fontFamily:sans,fontWeight:500,fontSize:13,color:beerInfo.owner.includes("Independent") ? "#88c860" : "#e07878" }}>{beerInfo.owner}</div>
          </div>
          <div>
            <div style={{ fontFamily:mono,fontSize:10,letterSpacing:"0.18em",color:C.goldD,textTransform:"uppercase",marginBottom:3 }}>ABV</div>
            <div style={{ fontFamily:sans,fontWeight:500,fontSize:13,color:C.cream }}>{beerInfo.abv}</div>
          </div>
        </div>
        <p style={{ fontFamily:sans,fontSize:13,color:C.muted,lineHeight:1.7,margin:0 }}>{beerInfo.note}</p>
      </div>
    )}
  </div>
  );
}

// ── Cocktail chip ─────────────────────────────────────────────────────────────

function Chip({ name, onOpen }) {
  const recipe   = RECIPES[name];
  const ingCount = recipe?.ingredients?.length;
  return (
    <div className="bc" onClick={recipe ? () => onOpen(name, recipe) : undefined}
      style={{ padding:"15px 18px",background:C.card,border:`1px solid ${C.border}`,color:C.cream,cursor:recipe?"pointer":"default",position:"relative",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"space-between",transition:"background 0.15s,border-color 0.15s" }}>
      <div className="bc-bar" style={{ position:"absolute",left:0,top:0,bottom:0,width:3,background:C.gold,transform:"scaleY(0)",transformOrigin:"bottom",transition:"transform 0.18s ease" }}/>
      <span className="bc-name" style={{ fontFamily:sans,fontSize:16,fontWeight:600,letterSpacing:"0.01em",flex:1,transition:"color 0.15s",userSelect:"none",lineHeight:1.4 }}>{name}</span>
      <div style={{ display:"flex",alignItems:"center",gap:8,flexShrink:0 }}>
        {recipe && ingCount && <span style={{ fontFamily:mono,fontSize:13,color:C.dim,letterSpacing:"0.06em" }}>{ingCount} ing.</span>}
        {recipe && <span style={{ fontFamily:mono,fontSize:14,color:C.goldD,lineHeight:1 }}>›</span>}
      </div>
    </div>
  );
}

// ── Wine item (color-coded by type) ──────────────────────────────────────────

function WineItem({ item, onOpen }) {
  const name    = getRawName(item);
  const display = getDisplayName(item);
  const recipe  = RECIPES[name];
  const wt      = getWineType(name);

  return (
    <div className="bi" onClick={recipe ? () => onOpen(name, recipe, "wine") : undefined}
      style={{ padding:"16px 20px 16px 22px",background:C.card,border:`1px solid ${C.border}`,color:C.cream,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,position:"relative",overflow:"hidden",cursor:recipe?"pointer":"default",transition:"background 0.15s,border-color 0.15s" }}>

      <div className="bi-bar" style={{ position:"absolute",left:0,top:0,bottom:0,width:3,background:wt.color,transform:"scaleY(0)",transformOrigin:"bottom",transition:"transform 0.18s ease" }}/>

      <span className="bi-name" style={{ fontFamily:sans,fontSize:16,fontWeight:600,letterSpacing:"0.01em",flex:1,transition:"color 0.15s",userSelect:"none",lineHeight:1.4 }}>
        {display}
        {recipe && <span style={{ display:"inline-block",width:4,height:4,borderRadius:"50%",background:C.goldD,marginLeft:7,verticalAlign:"middle",position:"relative",top:-1 }}/>}
      </span>

      <span style={{ fontFamily:mono,fontSize:13,letterSpacing:"0.1em",padding:"3px 10px",borderRadius:2,flexShrink:0,color:wt.color,border:`1px solid ${wt.color}50`,background:`${wt.color}12` }}>
        {wt.label}
      </span>
    </div>
  );
}



function Sub({ title, count, badge, badgeColor, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ marginBottom:34 }}>
      <div onClick={() => setOpen(o=>!o)} style={{ display:"flex",alignItems:"center",gap:10,marginBottom:open?14:0,cursor:"pointer",flexWrap:"wrap",padding:"8px 0",userSelect:"none" }}>
        <span style={{ fontFamily:sans,fontWeight:700,fontSize:13,letterSpacing:"0.06em",color:open?C.gold:C.muted,textTransform:"uppercase",whiteSpace:"nowrap",transition:"color 0.15s" }}>{title}</span>
        {badge && <span style={{ fontFamily:mono,fontSize:14,letterSpacing:"0.1em",padding:"2px 8px",borderRadius:2,textTransform:"uppercase",color:badgeColor,background:`${badgeColor}18`,border:`1px solid ${badgeColor}50` }}>{badge}</span>}
        <div style={{ flex:1,height:1,background:C.border,minWidth:16 }}/>
        <span style={{ fontFamily:mono,fontSize:14,color:C.dim,padding:"2px 8px",border:`1px solid ${C.border}`,borderRadius:2 }}>{count}</span>
        <span style={{ color:C.goldD,fontSize:13,fontFamily:mono,transition:"transform 0.2s",display:"inline-block",transform:open?"rotate(180deg)":"none" }}>▼</span>
      </div>
      {open && <div style={{ animation:"slideIn 0.18s ease both" }}>{children}</div>}
    </div>
  );
}

// ── Top section ───────────────────────────────────────────────────────────────

function Top({ id, emoji, title, count, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section id={id} style={{ marginBottom:60 }}>
      <div onClick={() => setOpen(o=>!o)} style={{ display:"flex",alignItems:"center",gap:18,marginBottom:open?34:0,paddingBottom:16,borderBottom:`2px solid ${open?C.goldD:C.border}`,cursor:"pointer",transition:"border-color 0.22s",userSelect:"none" }}>
        <span style={{ fontSize:26,flexShrink:0 }}>{emoji}</span>
        <span className="gunthers-section" style={{ fontFamily:bebas,fontSize:"clamp(38px,5.5vw,54px)",color:open?C.gold:C.cream,letterSpacing:"0.05em",lineHeight:1,transition:"color 0.22s" }}>{title}</span>
        <span style={{ fontFamily:mono,fontSize:14,color:C.dim,letterSpacing:"0.12em",marginLeft:"auto",flexShrink:0 }}>{count} items</span>
        <span style={{ fontFamily:mono,fontSize:14,color:C.goldD,marginLeft:6,transition:"transform 0.2s",display:"inline-block",transform:open?"rotate(180deg)":"none" }}>▼</span>
      </div>
      {open && <div style={{ animation:"slideIn 0.2s ease both" }}>{children}</div>}
    </section>
  );
}

function Grid({ children, min=320 }) {
  return <div style={{ display:"grid",gridTemplateColumns:`repeat(auto-fill,minmax(${min}px,1fr))`,gap:6 }}>{children}</div>;
}

function Divider() {
  return (
    <div style={{ display:"flex",alignItems:"center",gap:14,margin:"52px 0" }}>
      <div style={{ flex:1,height:1,background:`linear-gradient(to right,transparent,${C.border})` }}/>
      <span style={{ fontFamily:mono,fontSize:13,color:C.goldD,letterSpacing:"0.2em" }}>✦</span>
      <div style={{ flex:1,height:1,background:`linear-gradient(to left,transparent,${C.border})` }}/>
    </div>
  );
}

// ── Search ────────────────────────────────────────────────────────────────────

function buildIndex() {
  const push = (arr, cat) => arr.map(x => ({ name:getRawName(x), display:getDisplayName(x), cat, item:x }));
  return [
    ...push(BEER.domesticDraft, "Domestic Draft"),
    ...push(BEER.craftDraft, "Craft Draft"),
    ...push(BEER.importDraft, "Import Draft"),
    ...push(BEER.domesticBottle, "Domestic Bottle/Can"),
    ...push(BEER.craftBottle, "Craft Bottle"),
    ...push(BEER.importBottle, "Import Bottle"),
    ...(BEER.cocktails||[]).map(x=>({name:getRawName(x),display:getDisplayName(x),cat:"Beer Cocktails",item:x})),
    ...push(WINE.byGlass, "Wine by Glass"),
    ...push(WINE.byBottle, "Wine by Bottle"),
    ...MOCKTAILS_MENU.map(n=>({name:n,display:n,cat:"Mocktails",item:n})),
    ...Object.entries(LIQUOR).flatMap(([k,arr])=>push(arr,`Liquor — ${k}`)),
    ...COCKTAILS_MENU.map(n=>({name:n,display:n,cat:"Cocktails",item:n})),
    ...SPECIALTY_MENU.map(n=>({name:n,display:n,cat:"Specialty",item:n})),
    ...SHOTS_MENU.map(n=>({name:n,display:n,cat:"Shots",item:n})),
  ];
}

function Search({ onOpen }) {
  const [q, setQ]           = useState("");
  const [results, setR]     = useState([]);
  const [focused, setF]     = useState(false);
  const index               = useMemo(buildIndex, []);
  const wrap                = useRef();

  useEffect(() => {
    if (!q.trim()) { setR([]); return; }
    const lq = q.toLowerCase();
    setR(index.filter(x => x.display.toLowerCase().includes(lq)).slice(0, 10));
  }, [q, index]);

  useEffect(() => {
    const fn = e => { if (wrap.current && !wrap.current.contains(e.target)) setF(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const showDrop = focused && results.length > 0;

  return (
    <div ref={wrap} style={{ position:"relative",maxWidth:460,margin:"0 auto",padding:"0 40px" }}>
      <div style={{ position:"relative" }}>
        <span style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",fontFamily:mono,fontSize:16,color:C.dim,pointerEvents:"none" }}>⌕</span>
        <input value={q} onChange={e=>setQ(e.target.value)} onFocus={()=>setF(true)} placeholder="Search the full menu…"
          style={{ width:"100%",padding:"12px 36px 12px 42px",background:"rgba(255,255,255,0.04)",border:`1px solid ${focused?C.goldD:C.border}`,borderRadius:4,color:C.cream,fontSize:15,outline:"none",fontFamily:sans,fontWeight:500,letterSpacing:"0.01em",transition:"border-color 0.2s",boxSizing:"border-box" }}/>
        {q && <button onClick={()=>{setQ("");setR([]);}} style={{ position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:C.dim,cursor:"pointer",fontSize:13,fontFamily:mono,lineHeight:1,padding:2 }}>✕</button>}
      </div>

      {showDrop && (
        <div style={{ position:"absolute",left:40,right:40,top:"calc(100% + 4px)",background:C.dark,border:`1px solid ${C.goldD}`,borderRadius:2,zIndex:200,maxHeight:340,overflowY:"auto",boxShadow:"0 20px 50px rgba(0,0,0,0.75)",animation:"slideIn 0.14s ease both" }}>
          {results.map((r,i) => {
            const rec = RECIPES[r.name];
            return (
              <div key={i} className="sr-row" onClick={()=>{ if(rec)onOpen(r.name,rec); setF(false); setQ(""); }}
                style={{ padding:"9px 14px",borderBottom:`1px solid ${C.border}`,cursor:rec?"pointer":"default",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"background 0.1s" }}>
                <div>
                  <div style={{ fontFamily:sans,fontWeight:600,fontSize:15,color:C.cream }}>{r.display}</div>
                  <div style={{ fontFamily:mono,fontSize:12,color:C.dim,letterSpacing:"0.08em",textTransform:"uppercase",marginTop:2 }}>{r.cat}</div>
                </div>
                {rec && <span style={{ fontFamily:mono,fontSize:13,color:C.goldD }}>›</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

// ── Beer section (extracted to allow useState hook) ──────────────────────────

const STYLE_ORDER = ["Light Lager","Dark Lager","Ale","Wheat","Bock","IPA","Stout","Porter","Cider","Seltzer","Hard Tea","RTD","Seasonal"];

const ALL_BEERS = [
  ...BEER.domesticDraft,
  ...BEER.craftDraft,
  ...BEER.importDraft,
  ...BEER.domesticBottle,
  ...(BEER.craftBottle||[]),
  ...BEER.importBottle,
];

function BeerSection({ onOpen }) {
  const [sort, setSort] = useState("format");

  const byStyle = useMemo(() =>
    STYLE_ORDER.reduce((acc, s) => {
      const items = sortAlpha(ALL_BEERS.filter(x => (x.style || "") === s));
      if (items.length) acc[s] = items;
      return acc;
    }, {}),
  []);

  const allIpas = useMemo(() => sortAlpha(ALL_BEERS.filter(x => x.tag?.toLowerCase().includes("ipa"))), []);

  return (
    <>
      {/* Toggle */}
      <div style={{ display:"flex",gap:8,marginBottom:20 }}>
        {[["format","By Format"],["style","By Style"]].map(([v,label]) => (
          <button key={v} onClick={()=>setSort(v)}
            style={{ fontFamily:mono,fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",padding:"6px 16px",
              background:sort===v?C.goldD:"transparent",border:`1px solid ${sort===v?C.goldD:C.border}`,
              color:sort===v?"#1c1810":C.dim,cursor:"pointer",borderRadius:2,transition:"all 0.15s" }}>
            {label}
          </button>
        ))}
      </div>

      {sort === "format" ? (
        <>
          <Sub title="Domestic Draft"        count={BEER.domesticDraft.length}         badge="Draft"         badgeColor={C.draft}  defaultOpen={true}>
            <Grid>{sortAlpha(BEER.domesticDraft).map((x,i)=><Item key={i} item={x} onOpen={onOpen} type="beer"/>)}</Grid>
          </Sub>
          <Sub title="Craft Draft"           count={BEER.craftDraft.length}            badge="Draft"         badgeColor={C.draft}>
            <Grid>{sortAlpha(BEER.craftDraft.filter(x => !x.tag?.toLowerCase().includes("ipa"))).map((x,i)=><Item key={i} item={x} onOpen={onOpen} type="beer"/>)}</Grid>
          </Sub>
          <Sub title="Import Draft"          count={BEER.importDraft.length}           badge="Draft"         badgeColor={C.draft}>
            <Grid>{sortAlpha(BEER.importDraft).map((x,i)=><Item key={i} item={x} onOpen={onOpen} type="beer"/>)}</Grid>
          </Sub>
          <Sub title="Domestic Bottle & Can" count={BEER.domesticBottle.length}        badge="Bottle / Can"  badgeColor={C.bottle}>
            <Grid>{sortAlpha(BEER.domesticBottle).map((x,i)=><Item key={i} item={x} onOpen={onOpen} type="beer"/>)}</Grid>
          </Sub>
          <Sub title="Craft Bottle & Can"    count={(BEER.craftBottle||[]).length}     badge="Bottle / Can"  badgeColor={C.bottle}>
            <Grid>{sortAlpha(BEER.craftBottle||[]).map((x,i)=><Item key={i} item={x} onOpen={onOpen} type="beer"/>)}</Grid>
          </Sub>
          <Sub title="Import Bottle & Can"   count={BEER.importBottle.length}          badge="Bottle / Can"  badgeColor={C.bottle}>
            <Grid>{sortAlpha(BEER.importBottle).map((x,i)=><Item key={i} item={x} onOpen={onOpen} type="beer"/>)}</Grid>
          </Sub>
          {allIpas.length > 0 && (
            <Sub title="IPAs" count={allIpas.length} badge="IPA / Hoppy" badgeColor={C.ipa}>
              <Grid>{allIpas.map((x,i)=><Item key={i} item={x} onOpen={onOpen} type="beer"/>)}</Grid>
            </Sub>
          )}
        </>
      ) : (
        <>
          {Object.entries(byStyle).map(([style, items]) => (
            <Sub key={style} title={style} count={items.length}>
              <Grid>{items.map((x,i)=><Item key={i} item={x} onOpen={onOpen} type="beer"/>)}</Grid>
            </Sub>
          ))}
        </>
      )}

      {!!BEER.cocktails?.length && (
        <Sub title="Beer Cocktails" count={BEER.cocktails.length}>
          <Grid>{sortAlpha(BEER.cocktails).map((x,i)=><Item key={i} item={x} onOpen={onOpen}/>)}</Grid>
        </Sub>
      )}
      {!!BEER.bigBeerDomestic?.length && (
        <Sub title="Big Beer — Domestic" count={BEER.bigBeerDomestic.length}>
          <Grid>{sortAlpha(BEER.bigBeerDomestic).map((x,i)=><Item key={i} item={x} onOpen={onOpen}/>)}</Grid>
        </Sub>
      )}
      {!!BEER.bigBeerImport?.length && (
        <Sub title="Big Beer — Import & Craft" count={BEER.bigBeerImport.length}>
          <Grid>{sortAlpha(BEER.bigBeerImport).map((x,i)=><Item key={i} item={x} onOpen={onOpen}/>)}</Grid>
        </Sub>
      )}
    </>
  );
}

export default function GunthersPage() {
  const [modal, setModal] = useState(null);
  const [liquorModal, setLiquorModal] = useState(null);
  const open  = (name, recipe, type) => setModal({ name, recipe, type });
  const close = () => setModal(null);
  const openLiquor  = (name) => setLiquorModal(name);
  const closeLiquor = () => setLiquorModal(null);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
      <link href={FONT_LINK} rel="stylesheet"/>
      <style>{STYLES}</style>

      <div style={{ background:C.black,minHeight:"100vh",color:C.cream,position:"relative" }}>
        <AmbientBg/>

        <div style={{ position:"relative",zIndex:1 }}>

          {/* HERO */}
          <div style={{ textAlign:"center",padding:"72px 40px 48px",borderBottom:`1px solid ${C.border}`,overflow:"hidden" }}>
            <div className="gunthers-fade1" style={{ display:"flex",alignItems:"center",gap:12,maxWidth:220,margin:"0 auto 28px" }}>
              <div style={{ flex:1,height:1,background:`linear-gradient(to right,transparent,${C.goldD})` }}/>
              <div style={{ width:4,height:4,borderRadius:"50%",background:C.goldD }}/>
              <div style={{ flex:1,height:1,background:`linear-gradient(to left,transparent,${C.goldD})` }}/>
            </div>

            <div className="gunthers-fade2" style={{ fontFamily:mono,fontSize:14,letterSpacing:"0.38em",color:C.muted,textTransform:"uppercase",marginBottom:18 }}>Houston, TX</div>

            <div className="gunthers-fade3 gunthers-hero" style={{ fontFamily:bebas,fontSize:"clamp(80px,18vw,200px)",lineHeight:0.88,letterSpacing:"0.05em",background:`linear-gradient(160deg,${C.goldL} 0%,${C.gold} 45%,${C.goldD} 100%)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",userSelect:"none" }}>
              Gunthers
            </div>

            <div className="gunthers-fade3" style={{ fontFamily:mono,fontSize:14,letterSpacing:"0.25em",textTransform:"uppercase",color:C.muted,marginTop:20 }}>Full Bar Menu</div>

            <div className="gunthers-fade4" style={{ display:"flex",alignItems:"center",gap:16,margin:"30px auto 0",maxWidth:280 }}>
              <div style={{ flex:1,height:1,background:`linear-gradient(to right,transparent,${C.goldD})` }}/>
              <span style={{ fontFamily:mono,fontSize:14,color:C.goldD,letterSpacing:"0.22em" }}>EST. Gunthers ST.</span>
              <div style={{ flex:1,height:1,background:`linear-gradient(to left,transparent,${C.goldD})` }}/>
            </div>
          </div>

          {/* LEGEND */}
          <div style={{ display:"flex",justifyContent:"center",gap:28,flexWrap:"wrap",padding:"12px 40px",background:C.dark,borderBottom:`1px solid ${C.border}` }}>
            {[[C.draft,"Draft"],[C.bottle,"Bottle / Can"],[C.ipa,"IPA / Hoppy"]].map(([color,label]) => (
              <div key={label} style={{ display:"flex",alignItems:"center",gap:8,fontFamily:mono,fontSize:14,letterSpacing:"0.15em",color:C.muted,textTransform:"uppercase" }}>
                <div style={{ width:8,height:8,borderRadius:"50%",background:color,flexShrink:0,boxShadow:`0 0 5px ${color}70` }}/>{label}
              </div>
            ))}
          </div>

          {/* STICKY NAV */}
          <div style={{ display:"flex",justifyContent:"center",flexWrap:"wrap",borderBottom:`1px solid ${C.border}`,background:"rgba(8,6,4,0.96)",backdropFilter:"blur(12px)",overflowX:"auto",WebkitOverflowScrolling:"touch" }}>
            <div style={{ display:"flex",minWidth:"max-content",justifyContent:"center" }}>
            {[["#beer","🍺","Beer",SUMMARY.beer],["#wine","🍷","Wine",SUMMARY.wine],["#mocktails","🍹","Mocktails",SUMMARY.mocktails],["#liquor","🥃","Liquor",SUMMARY.liquor],["#cocktails","🍸","Cocktails",SUMMARY.cocktails],["#specialty","🌟","Specialty",SUMMARY.specialty],["#shots","🔥","Shots",SUMMARY.shots]].map(([href,emoji,label,count]) => (
              <a key={label} href={href} className="nav-pill" style={{ padding:"16px 22px",borderRight:`1px solid ${C.border}`,textAlign:"center",textDecoration:"none",transition:"background 0.18s",display:"block" }}>
                <span style={{ fontSize:18,display:"block",marginBottom:5 }}>{emoji}</span>
                <span style={{ fontFamily:sans,fontWeight:600,fontSize:11,letterSpacing:"0.08em",color:C.muted,textTransform:"uppercase",display:"block",marginBottom:4 }}>{label}</span>
                <span style={{ fontFamily:bebas,fontSize:26,color:C.gold,lineHeight:1 }}>{count}</span>
              </a>
            ))}
            </div>
          </div>

          {/* SEARCH */}
          <div style={{ padding:"24px 0 18px",borderBottom:`1px solid ${C.border}`,background:C.black }}>
            <Search onOpen={open}/>
          </div>

          {/* MAIN CONTENT */}
          <div style={{ maxWidth:1400,margin:"0 auto",padding:"50px 40px 80px" }}>

            <Top id="beer" emoji="🍺" title="Beer" count={SUMMARY.beer} defaultOpen={true}>
              <BeerSection onOpen={open}/>
            </Top>

            <Divider/>

            <Top id="wine" emoji="🍷" title="Wine" count={SUMMARY.wine} defaultOpen={true}>
              {/* Wine type legend */}
              <div style={{ display:"flex",gap:16,flexWrap:"wrap",marginBottom:20,padding:"10px 14px",background:"rgba(255,255,255,0.02)",border:`1px solid ${C.border}`,borderRadius:2 }}>
                {WINE_TYPES.map(wt => (
                  <div key={wt.type} style={{ display:"flex",alignItems:"center",gap:7,fontFamily:mono,fontSize:14,letterSpacing:"0.15em",color:C.muted,textTransform:"uppercase" }}>
                    <div style={{ width:8,height:8,borderRadius:"50%",background:wt.color,flexShrink:0,boxShadow:`0 0 5px ${wt.color}70` }}/>
                    {wt.label}
                  </div>
                ))}
              </div>
              <Sub title="By the Glass"  count={WINE.byGlass.length}><Grid>{sortAlpha(WINE.byGlass).map((x,i)=><WineItem key={i} item={x} onOpen={open}/>)}</Grid></Sub>
              <Sub title="By the Bottle" count={WINE.byBottle.length}><Grid>{sortAlpha(WINE.byBottle).map((x,i)=><WineItem key={i} item={x} onOpen={open}/>)}</Grid></Sub>
            </Top>

            <Divider/>

            <Top id="mocktails" emoji="🍹" title="Mocktails" count={SUMMARY.mocktails}>
              <Grid min={300}>{sortAlpha(MOCKTAILS_MENU).map((n,i)=><Chip key={i} name={n} onOpen={open}/>)}</Grid>
            </Top>

            <Divider/>

            <Top id="liquor" emoji="🥃" title="Liquor" count={SUMMARY.liquor}>
              {[["vodka","Vodka"],["gin","Gin"],["rum","Rum"],["tequila","Tequila"],["bourbon","Bourbon & Whiskey"],["scotch","Scotch"],["cordials","Cordials & Liqueurs"]].map(([k,l])=>(
                <Sub key={k} title={l} count={LIQUOR[k].length}><Grid>{sortAlpha(LIQUOR[k]).map((x,i)=><Item key={i} item={x} onOpen={open} onOpenLiquor={openLiquor}/>)}</Grid></Sub>
              ))}
            </Top>

            <Divider/>

            <Top id="cocktails" emoji="🍸" title="Cocktails" count={SUMMARY.cocktails}>
              <Grid min={300}>{sortAlpha(COCKTAILS_MENU).map((n,i)=><Chip key={i} name={n} onOpen={open}/>)}</Grid>
            </Top>

            <Divider/>

            <Top id="specialty" emoji="🌟" title="Specialty" count={SUMMARY.specialty}>
              <Grid min={300}>{sortAlpha(SPECIALTY_MENU).map((n,i)=><Chip key={i} name={n} onOpen={open}/>)}</Grid>
            </Top>

            <Divider/>

            <Top id="shots" emoji="🔥" title="Shots" count={SUMMARY.shots}>
              <Grid min={280}>{sortAlpha(SHOTS_MENU).map((n,i)=><Chip key={i} name={n} onOpen={open}/>)}</Grid>
            </Top>

            {/* SUMMARY TABLE */}
            <div style={{ marginTop:80,paddingTop:56,borderTop:`1px solid ${C.border}` }}>
              <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:36 }}>
                <div style={{ flex:1,height:1,background:`linear-gradient(to right,transparent,${C.border})` }}/>
                <span style={{ fontFamily:bebas,fontSize:36,color:C.gold,letterSpacing:"0.08em" }}>Menu Summary</span>
                <div style={{ flex:1,height:1,background:`linear-gradient(to left,transparent,${C.border})` }}/>
              </div>
              <table style={{ width:"100%",borderCollapse:"collapse",fontSize:14 }}>
                <thead>
                  <tr style={{ background:C.card,borderBottom:`2px solid ${C.goldD}` }}>
                    <th style={{ fontFamily:mono,fontSize:14,letterSpacing:"0.18em",color:C.gold,textTransform:"uppercase",padding:"13px 20px",textAlign:"left",fontWeight:400 }}>Category</th>
                    <th style={{ fontFamily:mono,fontSize:14,letterSpacing:"0.18em",color:C.gold,textTransform:"uppercase",padding:"13px 20px",textAlign:"right",fontWeight:400 }}>Items</th>
                  </tr>
                </thead>
                <tbody>
                  {[["🍺 Beer",SUMMARY.beer],["🍷 Wine",SUMMARY.wine],["🍹 Mocktails",SUMMARY.mocktails],["🥃 Liquor",SUMMARY.liquor],["🍸 Cocktails",SUMMARY.cocktails],["🌟 Specialty",SUMMARY.specialty],["🔥 Shots",SUMMARY.shots]].map(([label,count])=>(
                    <tr key={label} className="trow" style={{ borderBottom:`1px solid ${C.border}`,transition:"background 0.12s" }}>
                      <td style={{ padding:"13px 20px",fontFamily:sans,fontWeight:500,color:C.cream,fontSize:15 }}>{label}</td>
                      <td style={{ padding:"13px 20px",fontFamily:sans,fontWeight:700,color:C.gold,fontSize:15,textAlign:"right" }}>{count}</td>
                    </tr>
                  ))}
                  <tr style={{ background:C.card,borderTop:`2px solid ${C.goldD}` }}>
                    <td style={{ padding:"15px 20px",fontFamily:bebas,fontSize:20,color:C.gold,letterSpacing:"0.06em" }}>Total</td>
                    <td style={{ padding:"15px 20px",fontFamily:bebas,fontSize:20,color:C.gold,textAlign:"right" }}>{SUMMARY.total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FOOTER */}
          <footer style={{ textAlign:"center",padding:"32px 40px",borderTop:`1px solid ${C.border}` }}>
            <div style={{ display:"flex",alignItems:"center",gap:12,maxWidth:240,margin:"0 auto 14px" }}>
              <div style={{ flex:1,height:1,background:`linear-gradient(to right,transparent,${C.goldD})` }}/>
              <div style={{ width:4,height:4,borderRadius:"50%",background:C.goldD }}/>
              <div style={{ flex:1,height:1,background:`linear-gradient(to left,transparent,${C.goldD})` }}/>
            </div>
            <p style={{ fontFamily:mono,fontSize:14,letterSpacing:"0.28em",color:C.dim,textTransform:"uppercase" }}>Gunthers Bar · Houston, TX</p>
          </footer>
        </div>
      </div>

      {modal && <Modal name={modal.name} recipe={modal.recipe} type={modal.type} onClose={close}/>}
      {liquorModal && <LiquorModal name={liquorModal} onClose={closeLiquor}/>}
    </>
  );
}