import { useState } from "react";
import { T } from "./theme";

import TechniquesPage  from "./pages/TechniquesPage";
import ClassicsPage    from "./pages/ClassicsPage";
import SpecialtyPage   from "./pages/SpecialtyPage";
import MocktailsPage   from "./pages/MocktailsPage";
import SpiritsPage     from "./pages/SpiritsPage";
import BeerPage        from "./pages/BeerPage";
import WinePage        from "./pages/WinePage";
import GunthersPage        from "./pages/GunthersPage";
import FermentationPage from "./pages/FermentationPage";
import BrandsPage       from "./pages/BrandsPage";
import PlaceholderPage   from "./pages/PlaceholderPage";
import QuizPage          from "./pages/QuizPage";
import LiquorTreePage    from "./pages/LiquorTreePage";
import WhiskeyPage          from "./pages/WhiskeyPage";
import CocktailRatiosPage   from "./pages/CocktailRatiosPage";
import TequilaMezcalPage    from "./pages/TequilaMezcalPage";
import GinGuidePage         from "./pages/GinGuidePage";
import FlavorProfilesPage   from "./pages/FlavorProfilesPage";
import WineRegionsPage      from "./pages/WineRegionsPage";
import ModifiersPage           from "./pages/ModifiersPage";
import CocktailKnowledgePage  from "./pages/CocktailKnowledgePage";
import ImageManagerPage  from "./pages/ImageManagerPage";
import TicketsPage       from "./pages/TicketsPage";
import AllBrandsPage    from "./pages/AllBrandsPage";
import CoffeeTreePage    from "./pages/CoffeeTreePage";
import BrewMethodsPage   from "./pages/BrewMethodsPage";
import EspressoDrinksPage from "./pages/EspressoDrinksPage";
import CoffeeQuizPage    from "./pages/CoffeeQuizPage";
import CoffeeBrandsPage  from "./pages/CoffeeBrandsPage";
import CoffeeBeansPage   from "./pages/CoffeeBeansPage";
import TastingProfilePage from "./pages/TastingProfilePage";

const GROUPS = [
  {
    label: "Gunthers Bar",
    emoji: "🏛️",
    logo: "/guntherslogo.png",
    desc: "Everything specific to Gunthers — the menu, the brands, the recipes",
    sections: [
      { id:"gunthers",     title:"Gunthers Bar Menu",    emoji:"🏛️", logo:"/guntherslogo.png", color:"#C9A84C", desc:"Full house menu — beers, wines, cocktails by category",             page:GunthersPage },
      { id:"quiz",      title:"Spirit Quiz",        emoji:"🎯",                        color:"#e05a5a", desc:"Drill Gunthers's 112 brands — type the spirit or pick the right brand", page:QuizPage },
      { id:"specialty", title:"Specialty Recipes",  emoji:"🍹",                        color:"#D4712B", desc:"Gunthers bar menu — Old Fashioneds, Margaritas, Vodka & more",          page:SpecialtyPage },
      { id:"mocktails", title:"Mocktails",           emoji:"🥤",                        color:"#6B8E3E", desc:"Classics, fruity, sophisticated, and party punches",                 page:MocktailsPage },
    ],
  },
  {
    label: "Deep Dives",
    emoji: "🔬",
    desc: "The science, history, and business behind what's in the bottle",
    sections: [
      { id:"allbrands",    title:"All Brands",           emoji:"🏷️", color:"#D4820A", desc:"Every brand with images, sorted by spirit type and subtype",                  page:AllBrandsPage },
      { id:"tree",         title:"Liquor Family Tree",   emoji:"🌳", color:"#6B8E3E", desc:"Interactive diagram of every spirit category and how they relate",              page:LiquorTreePage },
      { id:"fermentation", title:"Fermentation Science", emoji:"🦠", color:"#6B8E3E", desc:"Yeast, phases, grain processing, byproducts, regional spirits",                page:FermentationPage },
      { id:"brands",       title:"Brand Ownership",      emoji:"🏢", color:"#8B7BA8", desc:"Who owns every beer & wine on the menu — indie, craft-gone-corporate, or macro", page:BrandsPage },
      { id:"whiskey",      title:"Bourbon vs Whisky",   emoji:"🥃", color:"#B8860B", desc:"What makes bourbon bourbon — and how every whiskey style differs",              page:WhiskeyPage },
      { id:"ratios",       title:"Cocktail Formulas",   emoji:"📐", color:"#6B8E3E", desc:"The 6 core templates, spirit index, and how to fix a drink mid-pour",         page:CocktailRatiosPage },
      { id:"tequilamezcal",title:"Tequila vs Mezcal",   emoji:"🌵", color:"#b8d96e", desc:"Agave types, aging tiers, pit roasting — what actually makes them different",   page:TequilaMezcalPage },
      { id:"ginbotanicals", title:"Gin Deep Dive",       emoji:"🌿", color:"#7abf8a", desc:"5 gin styles, the 12 key botanicals, and how to pair gin with tonic",          page:GinGuidePage },
      { id:"flavorprofiles",title:"Flavor Profiles",     emoji:"🎨", color:"#e8c840", desc:"The 5 flavor dimensions, spirit flavor map, and balance rules",                page:FlavorProfilesPage },
      { id:"wineregions",   title:"Wine Regions",        emoji:"🍷", color:"#8B1A35", desc:"Old World vs New World, 8 countries, regional grapes, and how to read a label", page:WineRegionsPage },
      { id:"modifiers",     title:"Mixers & Modifiers",  emoji:"🧪", color:"#4A90A4", desc:"Citrus, syrups, bitters, vermouth, garnishes — everything that isn't a base spirit", page:ModifiersPage },
      { id:"cocktailknow",  title:"Cocktail Knowledge",  emoji:"🍸", color:"#C9A84C", desc:"History, technique, variations, and why it works — the full classic canon", page:CocktailKnowledgePage },
    ],
  },
  {
    label: "Coffee",
    emoji: "☕",
    desc: "Origin, processing, brew methods, and every espresso drink explained",
    sections: [
      { id:"coffeetree",    title:"Coffee Origin Tree",  emoji:"🌍", color:"#8B6914", desc:"Interactive map of arabica & robusta — origins, varieties, and flavor profiles", page:CoffeeTreePage },
      { id:"brewmethods",   title:"Brew Methods",         emoji:"☕", color:"#C9A84C", desc:"Espresso, pour over, French press, AeroPress, cold brew — grind, ratio, temp, time", page:BrewMethodsPage },
      { id:"espressodrinks",title:"Espresso Drinks",       emoji:"🥛", color:"#4A90A4", desc:"Every drink from ristretto to latte — ratios, milk, and how to build each one", page:EspressoDrinksPage },
      { id:"coffeebeans",   title:"Bean Varietals",        emoji:"🌱", color:"#6B8E3E", desc:"Geisha, Bourbon, SL28, Typica — what makes each varietal unique, where it grows, and why it matters", page:CoffeeBeansPage },
      { id:"coffeebrands",  title:"Coffee Brands",         emoji:"🏷️", color:"#D4820A", desc:"Blue Bottle to Lavazza — third wave roasters, Italian institutions, and everything in between", page:CoffeeBrandsPage },
      { id:"coffeequiz",    title:"Coffee Quiz",           emoji:"🎯", color:"#e05a5a", desc:"20 questions on origins, processing, roast, and espresso — drill your coffee knowledge", page:CoffeeQuizPage },
    ],
  },
  {
    label: "Learn",
    emoji: "📖",
    desc: "Core bartending knowledge — techniques, recipes, and spirits",
    sections: [
      { id:"techniques", title:"Techniques & Fundamentals", emoji:"🧊", color:"#4A90A4", desc:"The five methods, terms, ratios, glassware, golden rules",   page:TechniquesPage },
      { id:"classics",   title:"Classic Cocktails",          emoji:"🍸", color:"#C9A84C", desc:"Spirit-forward, sours, highballs, aperitifs, dessert drinks", page:ClassicsPage },
      { id:"spirits",    title:"Spirits Encyclopedia",       emoji:"🥃", color:"#A0522D", desc:"Vodka, gin, rum, tequila, whiskey, brandy — full deep dives",  page:SpiritsPage },
      { id:"beer",       title:"Beer Guide",                 emoji:"🍺", color:"#D4820A", desc:"Top brands, styles, how to choose, quick reference",           page:BeerPage },
      { id:"wine",       title:"Wine Guide",                 emoji:"🍷", color:"#8B1A35", desc:"Reds, whites, rosé, champagne, regions, serving",              page:WinePage },
      { id:"tasting",    title:"Beer & Wine Profiles",       emoji:"🎨", color:"#9b6a2a", desc:"Color, flavor, and tasting notes for every style",              page:TastingProfilePage },
    ],
  },
  {
    label: "Tools",
    emoji: "🛠️",
    desc: "Admin and reference utilities",
    sections: [
      { id:"imgmgr",   title:"Image Manager", emoji:"🖼️", color:"#8B7BA8", desc:"Source and manage bottle images for every brand", page:ImageManagerPage },
      { id:"tickets",  title:"Dev Tickets",    emoji:"🎫", color:"#4A90A4", desc:"Todo tracker — open bugs, features, and refactors", page:TicketsPage },
    ],
  },
];
const SECTIONS = GROUPS.flatMap(g => g.sections);

function DashboardCard({ section, onClick, index }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="card-hover fade-up"
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        animationDelay: `${index * 0.06}s`,
        background: hov
          ? `linear-gradient(135deg, ${section.color}18, ${T.card})`
          : T.card,
        border: `1px solid ${hov ? section.color + "60" : T.border}`,
        borderRadius: 16,
        padding: "20px 18px",
        cursor: "pointer",
        boxShadow: hov
          ? `0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px ${section.color}30, inset 0 1px 0 rgba(255,255,255,0.05)`
          : "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow orb top-right */}
      <div style={{
        position:"absolute", top:-40, right:-40,
        width:120, height:120, borderRadius:"50%",
        background: `radial-gradient(circle, ${section.color}25 0%, transparent 70%)`,
        opacity: hov ? 1 : 0,
        transition: "opacity 0.3s ease",
        pointerEvents:"none",
      }}/>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
        {section.logo ? (
          <img
            src={section.logo}
            alt={section.title}
            style={{
              width:36, height:36, objectFit:"contain",
              filter: hov ? `drop-shadow(0 0 8px ${section.color}90)` : "none",
              transition:"filter 0.3s",
              borderRadius: 4,
            }}
          />
        ) : (
          <span style={{ fontSize:28, filter: hov ? "drop-shadow(0 0 8px currentColor)" : "none", transition:"filter 0.3s" }}>
            {section.emoji}
          </span>
        )}
        <span style={{
          fontSize:9, letterSpacing:"0.15em", textTransform:"uppercase",
          color: section.color, border:`1px solid ${section.color}40`,
          padding:"3px 8px", borderRadius:20,
          fontFamily:"'DM Mono', monospace",
        }}>
          {section.id}
        </span>
      </div>

      <h2 style={{
        fontSize:14, fontWeight:600, color: hov ? section.color : T.cream,
        margin:"0 0 6px", transition:"color 0.25s",
        fontFamily:"'Inter', system-ui, sans-serif",
        letterSpacing:"0.01em",
      }}>
        {section.title}
      </h2>
      <p style={{ fontSize:12, color:T.muted, lineHeight:1.65, margin:"0 0 16px" }}>
        {section.desc}
      </p>

      {/* Bottom accent bar */}
      <div style={{
        height:2, borderRadius:2,
        background: hov
          ? `linear-gradient(90deg, ${section.color}, transparent)`
          : "rgba(255,255,255,0.06)",
        transition:"background 0.3s ease",
      }}/>
    </div>
  );
}

function SectionShell({ section, onBack }) {
  const PageComponent = section.page;
  return (
    <div style={{ minHeight:"100vh", background:T.bg, fontFamily:"'DM Sans', sans-serif", color:T.cream }}>
      {/* Section header bar */}
      <div style={{
        background: `linear-gradient(180deg, ${section.color}20 0%, transparent 100%)`,
        borderBottom:`1px solid ${section.color}30`,
        padding:"14px 16px",
        position:"sticky", top:0, zIndex:100,
        backdropFilter:"blur(12px)",
        display:"flex", alignItems:"center", gap:12,
      }}>
        <button
          onClick={onBack}
          style={{
            background:"rgba(255,255,255,0.06)",
            border:`1px solid ${T.border}`,
            color:T.muted, padding:"8px 14px",
            borderRadius:8, cursor:"pointer",
            fontSize:13, fontFamily:"inherit",
            transition:"all 0.2s",
            minWidth:44, minHeight:44,
            display:"flex", alignItems:"center",
          }}
          onMouseEnter={e => { e.target.style.background="rgba(255,255,255,0.1)"; e.target.style.color=T.cream; }}
          onMouseLeave={e => { e.target.style.background="rgba(255,255,255,0.06)"; e.target.style.color=T.muted; }}
        >
          ← Back
        </button>
        {section.logo ? (
          <img src={section.logo} alt={section.title} style={{ width:24, height:24, objectFit:"contain", borderRadius:3 }} />
        ) : (
          <span style={{ fontSize:20 }}>{section.emoji}</span>
        )}
        <span style={{
          fontSize:15, fontWeight:700, fontFamily:"'Inter', system-ui, sans-serif",
          color:section.color,
          overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
        }}>
          {section.title}
        </span>
      </div>

      <div style={{ maxWidth:900, margin:"0 auto", padding:"clamp(20px, 4vw, 40px) clamp(16px, 4vw, 32px) 80px" }}>
        {PageComponent ? <PageComponent accentColor={section.color} section={section} /> : <PlaceholderPage section={section} />}
      </div>
    </div>
  );
}

function GroupCard({ group, onClick, index }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="card-hover fade-up"
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        animationDelay: `${index * 0.08}s`,
        background: hov ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hov ? T.gold + "50" : T.border}`,
        borderRadius: 16,
        padding: "24px 20px",
        cursor: "pointer",
        display: "flex", alignItems: "center", gap: 16,
        transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
        boxShadow: hov ? `0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)` : "none",
      }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 12, flexShrink: 0,
        background: hov ? `rgba(201,168,76,0.15)` : "rgba(255,255,255,0.05)",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background 0.2s",
      }}>
        {group.logo
          ? <img src={group.logo} alt={group.label} style={{ width: 28, height: 28, objectFit: "contain", borderRadius: 3 }}/>
          : <span style={{ fontSize: 22 }}>{group.emoji}</span>
        }
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: hov ? T.gold : T.cream, fontFamily: "'Inter', system-ui, sans-serif", marginBottom: 4, transition: "color 0.2s" }}>
          {group.label}
        </div>
        <div style={{ fontSize: 12, color: T.dim, lineHeight: 1.5 }}>{group.desc}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
        <span style={{ fontSize: 10, color: T.dim, fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em" }}>
          {group.sections.length} sections
        </span>
        <span style={{ fontSize: 18, color: hov ? T.gold : T.dim, transition: "color 0.2s, transform 0.2s", transform: hov ? "translateX(3px)" : "none" }}>›</span>
      </div>
    </div>
  );
}

export default function App() {
  const [active,    setActive]    = useState(null);   // section page open
  const [activeGroup, setActiveGroup] = useState(null); // group drilled into

  // Level 3 — section page
  if (active) return <SectionShell section={active} onBack={() => setActive(null)} />;

  // Level 2 — group's section tabs
  if (activeGroup) {
    const group = activeGroup;
    return (
      <div style={{ minHeight:"100vh", background:T.bg, fontFamily:"'DM Sans', sans-serif", color:T.cream }}>
        {/* Ambient */}
        <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0,
          background:"radial-gradient(ellipse 80% 50% at 50% -20%, rgba(201,168,76,0.07) 0%, transparent 60%)" }}/>

        {/* Header */}
        <header style={{ borderBottom:`1px solid ${T.border}`, backdropFilter:"blur(16px)", background:"rgba(8,6,4,0.85)", position:"sticky", top:0, zIndex:100 }}>
          <div style={{ maxWidth:1100, margin:"0 auto", padding:"14px 16px", display:"flex", alignItems:"center", gap:12 }}>
            <button
              onClick={() => setActiveGroup(null)}
              style={{ background:"rgba(255,255,255,0.06)", border:`1px solid ${T.border}`, color:T.muted, padding:"8px 14px", borderRadius:8, cursor:"pointer", fontSize:13, fontFamily:"inherit", display:"flex", alignItems:"center" }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.1)"; e.currentTarget.style.color=T.cream; }}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.color=T.muted; }}
            >← Back</button>
            {group.logo
              ? <img src={group.logo} alt={group.label} style={{ width:22, height:22, objectFit:"contain", borderRadius:3 }}/>
              : <span style={{ fontSize:18 }}>{group.emoji}</span>
            }
            <span style={{ fontSize:15, fontWeight:700, color:T.gold, fontFamily:"'Inter', system-ui, sans-serif" }}>{group.label}</span>
          </div>
        </header>

        {/* Section cards */}
        <main style={{ maxWidth:900, margin:"0 auto", padding:"32px 16px 80px", position:"relative", zIndex:1 }}>
          <p style={{ fontSize:12, color:T.dim, marginBottom:28 }}>{group.desc}</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(min(260px, 100%), 1fr))", gap:12 }}>
            {group.sections.map((s, i) => (
              <DashboardCard key={s.id} section={s} index={i} onClick={() => setActive(s)} />
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Level 1 — group list
  return (
    <div style={{ minHeight:"100vh", background:T.bg, fontFamily:"'DM Sans', sans-serif", color:T.cream, position:"relative", overflowX:"hidden" }}>
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0,
        background:"radial-gradient(ellipse 80% 50% at 50% -20%, rgba(201,168,76,0.07) 0%, transparent 60%)" }}/>
      <div style={{ position:"fixed", bottom:0, left:0, right:0, height:300, pointerEvents:"none", zIndex:0,
        background:"radial-gradient(ellipse 60% 40% at 30% 100%, rgba(160,82,45,0.06) 0%, transparent 70%)" }}/>

      {/* Header */}
      <header style={{ borderBottom:`1px solid ${T.border}`, backdropFilter:"blur(16px)", background:"rgba(8,6,4,0.85)", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"12px 16px", display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:32, height:32, borderRadius:9, background:`linear-gradient(135deg, ${T.gold}, ${T.amber})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, boxShadow:`0 4px 16px rgba(201,168,76,0.3)`, flexShrink:0 }}>🍹</div>
          <div>
            <div style={{ fontSize:14, fontWeight:700, fontFamily:"'Inter', system-ui, sans-serif", color:T.gold, letterSpacing:"0.03em" }}>Behind the Bar</div>
            <div style={{ fontSize:9, color:T.dim, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"'DM Mono', monospace" }}>Bartending Notes</div>
          </div>
        </div>
      </header>

      <div style={{ position:"relative", zIndex:1 }}>
        {/* Hero */}
        <section style={{ maxWidth:600, margin:"0 auto", padding:"clamp(40px,8vw,80px) 16px 32px", textAlign:"center" }} className="fade-up">
          <h1 style={{ fontSize:"clamp(28px,7vw,48px)", fontWeight:900, fontFamily:"'Inter', system-ui, sans-serif", margin:"0 0 12px",
            background:`linear-gradient(135deg, ${T.gold} 0%, ${T.cream} 50%, ${T.amber} 100%)`,
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", lineHeight:1.1 }}>
            Your Bar,<br/>Your Knowledge
          </h1>
          <p style={{ fontSize:13, color:T.muted, lineHeight:1.75, margin:0 }}>
            Everything you're learning behind the stick — organized, searchable, and always in reach.
          </p>
        </section>

        {/* Group list */}
        <main style={{ maxWidth:700, margin:"0 auto", padding:"0 16px 80px", display:"flex", flexDirection:"column", gap:10 }}>
          {GROUPS.map((g, i) => (
            <GroupCard key={g.label} group={g} index={i} onClick={() => setActiveGroup(g)} />
          ))}
        </main>

        <footer style={{ textAlign:"center", padding:"20px 16px", fontSize:10, color:T.dim, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"'DM Mono', monospace", borderTop:`1px solid ${T.border}` }}>
          Behind the Bar · Study Edition
        </footer>
      </div>
    </div>
  );
}