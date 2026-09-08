import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { COFFEE_TREE } from "../data/coffee";

const TREE = COFFEE_TREE;

// ── Layout engine ──────────────────────────────────────────────────────────
const NODE_W = 200, NODE_H = 80, HGAP = 40, VGAP = 130;

function layoutTree(node) {
  const nodes = [], edges = [];
  function measure(n) {
    if (!n.children?.length) return 1;
    return n.children.reduce((s, c) => s + measure(c), 0);
  }
  function place(n, depth, xOffset) {
    const leaves = measure(n);
    const x = xOffset + (leaves * (NODE_W + HGAP)) / 2 - NODE_W / 2;
    const y = depth * (NODE_H + VGAP);
    nodes.push({ ...n, x, y, w: NODE_W, h: NODE_H, depth });
    if (n.children) {
      let childX = xOffset;
      n.children.forEach(child => {
        const cl = measure(child);
        place(child, depth + 1, childX);
        const cn = nodes.find(nd => nd.id === child.id);
        if (cn) edges.push({ x1: x + NODE_W / 2, y1: y + NODE_H, x2: cn.x + NODE_W / 2, y2: cn.y, color: n.color });
        childX += cl * (NODE_W + HGAP);
      });
    }
  }
  place(node, 0, 0);
  return { nodes, edges };
}

function TreeNode({ node, selected, onClick }) {
  const isSel = selected?.id === node.id;
  const hasBrands = node.brands?.length > 0;
  const labelSize = node.depth === 0 ? 14 : node.depth <= 2 ? 13 : 12;
  return (
    <g transform={`translate(${node.x},${node.y})`} onClick={() => onClick(node)} style={{ cursor: "pointer" }}>
      {isSel && <rect x={-6} y={-6} width={node.w + 12} height={node.h + 12} rx={12} fill={`${node.color}28`} style={{ filter: `blur(8px)` }} />}
      <rect x={0} y={0} width={node.w} height={node.h} rx={8} fill={isSel ? `${node.color}1a` : "#13111a"} stroke={isSel ? node.color : "#2a2535"} strokeWidth={isSel ? 2 : 1} />
      <rect x={0} y={0} width={node.w} height={4} rx={2} fill={node.color} />
      {hasBrands && <circle cx={node.w - 12} cy={node.h - 12} r={5} fill={node.color} opacity={0.75} />}
      <text x={12} y={28} fontFamily="'DM Mono',monospace" fontSize={labelSize} fontWeight="700" letterSpacing="0.06em" fill={node.color}>{node.label}</text>
      <text x={12} y={46} fontFamily="'DM Sans',sans-serif" fontSize={10} fill="#8a84a0">{node.sublabel}</text>
      {hasBrands && <text x={12} y={65} fontFamily="'DM Mono',monospace" fontSize={9} fill={node.color} opacity={0.65}>● {node.brands.length} varieties</text>}
    </g>
  );
}

function getPath(tree, targetId, path = []) {
  const cur = { id: tree.id, label: tree.label, color: tree.color };
  if (tree.id === targetId) return [...path, cur];
  if (tree.children) for (const c of tree.children) { const r = getPath(c, targetId, [...path, cur]); if (r) return r; }
  return null;
}

// ── Sidebar ────────────────────────────────────────────────────────────────
function SidebarNode({ node, depth, selected, onSelect, expandedIds, toggleExpand }) {
  const isSel = selected?.id === node.id;
  const hasChildren = !!node.children?.length;
  const isExpanded = expandedIds.has(node.id);
  return (
    <div>
      <div onClick={() => { onSelect(node); if (hasChildren) toggleExpand(node.id); }}
        style={{ display: "flex", alignItems: "center", gap: 7, padding: `5px 10px 5px ${12 + depth * 14}px`, cursor: "pointer", borderRadius: 6, margin: "1px 6px", background: isSel ? `${node.color}20` : "transparent", border: isSel ? `1px solid ${node.color}50` : "1px solid transparent" }}
        onMouseEnter={e => { if (!isSel) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
        onMouseLeave={e => { if (!isSel) e.currentTarget.style.background = "transparent"; }}
      >
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: node.color, flexShrink: 0, opacity: isSel ? 1 : 0.6 }} />
        <span style={{ fontFamily: depth === 0 ? "'DM Mono',monospace" : "'DM Sans',sans-serif", fontSize: depth === 0 ? 11 : 11, fontWeight: isSel ? 700 : depth === 0 ? 600 : 400, color: isSel ? node.color : depth === 0 ? "#c8b898" : "#a099b8", flex: 1, lineHeight: 1.3 }}>{node.label}</span>
        {hasChildren && <span style={{ fontSize: 9, color: "#5a5470", transform: isExpanded ? "rotate(90deg)" : "none", display: "inline-block", transition: "transform 0.18s" }}>▶</span>}
      </div>
      {hasChildren && isExpanded && (
        <div style={{ borderLeft: `1px solid ${node.color}25`, marginLeft: 15 + depth * 14 }}>
          {node.children.map(c => <SidebarNode key={c.id} node={c} depth={depth + 1} selected={selected} onSelect={onSelect} expandedIds={expandedIds} toggleExpand={toggleExpand} />)}
        </div>
      )}
    </div>
  );
}

function TreeSidebar({ open, onToggle, nodes, selected, onSelect, TREE }) {
  const [expandedIds, setExpandedIds] = useState(() => new Set(["arabica", "robusta"]));
  const toggleExpand = id => setExpandedIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  useEffect(() => {
    if (!selected) return;
    function findPath(node, tid, path = []) {
      if (node.id === tid) return path;
      if (node.children) for (const c of node.children) { const r = findPath(c, tid, [...path, node.id]); if (r) return r; }
      return null;
    }
    const path = findPath(TREE, selected.id);
    if (path) setExpandedIds(prev => new Set([...prev, ...path]));
  }, [selected, TREE]);

  return (
    <>
      <div onClick={onToggle} style={{ position: "absolute", left: open ? 216 : 0, top: 54, zIndex: 25, width: 22, height: 44, background: "rgba(13,11,18,0.97)", border: "1px solid #2a2535", borderLeft: open ? "1px solid #2a2535" : "none", borderRadius: "0 8px 8px 0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "left 0.25s ease" }}>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "#5a5470", transform: open ? "rotate(180deg)" : "none", display: "inline-block", transition: "transform 0.25s" }}>▶</span>
      </div>
      <div style={{ position: "absolute", left: open ? 0 : -216, top: 54, bottom: 0, width: 216, zIndex: 24, background: "rgba(10,8,16,0.97)", borderRight: "1px solid #2a2535", transition: "left 0.25s ease", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "12px 14px 8px", borderBottom: "1px solid #2a2535", flexShrink: 0 }}>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: "0.2em", color: "#5a5470", textTransform: "uppercase" }}>Navigate</div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "6px 0 12px" }}>
          {TREE.children.map(c => <SidebarNode key={c.id} node={c} depth={0} selected={selected} onSelect={onSelect} expandedIds={expandedIds} toggleExpand={toggleExpand} />)}
        </div>
      </div>
    </>
  );
}

// ── Animated transform hook ────────────────────────────────────────────────
function useAnimatedTransform(initial) {
  const [transform, setTransform] = useState(initial);
  const animRef = useRef(null), currentRef = useRef(initial);
  const animateTo = useCallback((target, duration = 320) => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const start = { ...currentRef.current }, t0 = performance.now();
    const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    function step(now) {
      const t = Math.min((now - t0) / duration, 1), e = ease(t);
      const next = { x: start.x + (target.x - start.x) * e, y: start.y + (target.y - start.y) * e, scale: start.scale + (target.scale - start.scale) * e };
      currentRef.current = next; setTransform({ ...next });
      if (t < 1) animRef.current = requestAnimationFrame(step); else animRef.current = null;
    }
    animRef.current = requestAnimationFrame(step);
  }, []);
  const setImmediate = useCallback((updater) => {
    if (typeof updater === "function") {
      setTransform(prev => { const next = updater(prev); currentRef.current = next; return next; });
    } else { currentRef.current = updater; setTransform({ ...updater }); }
  }, []);
  return [transform, animateTo, setImmediate, currentRef];
}

// ── Detail panel content ───────────────────────────────────────────────────
function DetailContent({ selected, nodes, panToNode }) {
  const path = getPath(TREE, selected.id) || [];
  return (
    <>
      <div style={{ width: 32, height: 3, background: selected.color, borderRadius: 2, marginBottom: 14 }} />
      {path.length > 1 && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: "0.18em", color: "#5a5470", textTransform: "uppercase", marginBottom: 8 }}>Origin Path</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {path.map((step, i) => {
              const isLast = i === path.length - 1;
              const sn = nodes.find(n => n.id === step.id);
              return (
                <div key={step.id} style={{ display: "flex", alignItems: "stretch" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 20, flexShrink: 0 }}>
                    <div style={{ width: isLast ? 10 : 7, height: isLast ? 10 : 7, borderRadius: "50%", background: isLast ? step.color : `${step.color}60`, border: isLast ? `2px solid ${step.color}` : `1px solid ${step.color}40`, flexShrink: 0, boxShadow: isLast ? `0 0 6px ${step.color}80` : "none" }} />
                    {!isLast && <div style={{ width: 1, flex: 1, background: `linear-gradient(to bottom, ${step.color}40, ${path[i+1]?.color || step.color}30)`, minHeight: 18 }} />}
                  </div>
                  <div style={{ paddingLeft: 8, paddingBottom: isLast ? 0 : 10 }}>
                    <span onClick={() => sn && !isLast && panToNode(sn)} style={{ fontFamily: isLast ? "'DM Sans',sans-serif" : "'DM Mono',monospace", fontSize: isLast ? 13 : 10, fontWeight: isLast ? 700 : 400, color: isLast ? step.color : `${step.color}80`, cursor: (!isLast && sn) ? "pointer" : "default", textDecoration: (!isLast && sn) ? "underline dotted" : "none" }}>{step.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.2em", color: selected.color, textTransform: "uppercase", marginBottom: 6 }}>{selected.sublabel}</div>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: selected.color, fontWeight: 700, marginBottom: 14, lineHeight: 1.2 }}>{selected.label}</div>
      <div style={{ height: 1, background: "#2a2535", marginBottom: 14 }} />
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#c8b898", lineHeight: 1.8, marginBottom: 16 }}>{selected.info}</p>
      {selected.brands?.length > 0 && (
        <>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.2em", color: "#5a5470", textTransform: "uppercase", marginBottom: 10 }}>Notable Varieties</div>
          <div style={{ marginBottom: 12, display: "flex", flexWrap: "wrap", gap: 4 }}>
            {selected.brands.map(b => <span key={b} style={{ background: `${selected.color}15`, border: `1px solid ${selected.color}40`, borderRadius: 20, padding: "3px 10px", fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: selected.color }}>{b}</span>)}
          </div>
        </>
      )}
      {selected.children && (
        <>
          <div style={{ height: 1, background: "#2a2535", margin: "14px 0 10px" }} />
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.2em", color: "#5a5470", textTransform: "uppercase", marginBottom: 10 }}>Sub-categories</div>
          {selected.children.map(c => {
            const cn = nodes.find(n => n.id === c.id);
            return (
              <div key={c.id} onClick={() => cn && panToNode(cn)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, marginBottom: 4, cursor: "pointer", border: `1px solid ${c.color}30`, background: `${c.color}08`, transition: "background 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.background = `${c.color}18`; e.currentTarget.style.borderColor = `${c.color}60`; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${c.color}08`; e.currentTarget.style.borderColor = `${c.color}30`; }}
              >
                <div style={{ width: 3, height: 20, borderRadius: 2, background: c.color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: c.color, fontWeight: 600 }}>{c.label}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#5a5470" }}>{c.sublabel}</div>
                </div>
                <span style={{ color: `${c.color}60`, fontSize: 12 }}>→</span>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}

// ── Mobile drilldown ───────────────────────────────────────────────────────
function MobileDrilldown() {
  const [stack, setStack] = useState([TREE]);
  const cur = stack[stack.length - 1];
  const push = node => setStack(s => [...s, node]);
  const pop  = () => setStack(s => s.slice(0, -1));
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#07060A" }}>
      <div style={{ padding: "10px 14px", borderBottom: "1px solid #2a2535", background: "rgba(7,6,10,0.97)", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        {stack.length > 1 && <button onClick={pop} style={{ background: "none", border: "none", color: "#C9A84C", fontSize: 20, cursor: "pointer", padding: "0 6px 0 0", lineHeight: 1 }}>‹</button>}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, overflow: "hidden" }}>
            {stack.map((n, i) => (
              <span key={n.id} style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: i < stack.length - 1 ? 1 : 0 }}>
                {i > 0 && <span style={{ color: "#3a3450", fontSize: 11 }}>›</span>}
                <span onClick={() => i < stack.length - 1 && setStack(s => s.slice(0, i + 1))} style={{ fontFamily: "'DM Mono',monospace", fontSize: i === stack.length - 1 ? 13 : 10, fontWeight: i === stack.length - 1 ? 700 : 400, color: i === stack.length - 1 ? n.color : "#5a5470", cursor: i < stack.length - 1 ? "pointer" : "default", whiteSpace: "nowrap" }}>{n.label}</span>
              </span>
            ))}
          </div>
          {cur.sublabel && <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "#5a5470", marginTop: 2 }}>{cur.sublabel}</div>}
        </div>
      </div>
      {cur.info && (
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #1a1825", background: `${cur.color}08`, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{ width: 3, height: 20, background: cur.color, borderRadius: 2 }} />
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, color: cur.color, fontWeight: 700 }}>{cur.label}</span>
          </div>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#a098b8", lineHeight: 1.7, margin: 0 }}>{cur.info}</p>
          {cur.brands?.length > 0 && (
            <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 4 }}>
              {cur.brands.map(b => <span key={b} style={{ background: `${cur.color}15`, border: `1px solid ${cur.color}40`, borderRadius: 12, padding: "2px 9px", fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: cur.color }}>{b}</span>)}
            </div>
          )}
        </div>
      )}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
        {cur.children?.map(child => (
          <div key={child.id} onClick={() => push(child)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", borderBottom: "1px solid #12101a", cursor: "pointer" }}
            onTouchStart={e => e.currentTarget.style.background = `${child.color}10`}
            onTouchEnd={e => { e.currentTarget.style.background = "transparent"; }}
          >
            <div style={{ width: 4, height: 36, background: child.color, borderRadius: 2, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, fontWeight: 700, color: child.color, letterSpacing: "0.04em" }}>{child.label}</div>
              {child.sublabel && <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#5a5470", marginTop: 2 }}>{child.sublabel}</div>}
              {child.brands?.length > 0 && <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: `${child.color}80`, marginTop: 3 }}>● {child.brands.length} varieties</div>}
            </div>
            {child.children ? <span style={{ color: "#3a3450", fontSize: 18 }}>›</span> : <div style={{ width: 7, height: 7, borderRadius: "50%", background: `${child.color}50` }} />}
          </div>
        ))}
        {!cur.children && (
          <div style={{ padding: "24px 16px", textAlign: "center" }}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#5a5470" }}>This is a base coffee origin</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function CoffeeTreePage() {
  const { nodes, edges } = useMemo(() => layoutTree(TREE), []);
  const minX = useMemo(() => Math.min(...nodes.map(n => n.x)) - 40, [nodes]);
  const minY = useMemo(() => Math.min(...nodes.map(n => n.y)) - 40, [nodes]);
  const maxX = useMemo(() => Math.max(...nodes.map(n => n.x + n.w)) + 40, [nodes]);
  const maxY = useMemo(() => Math.max(...nodes.map(n => n.y + n.h)) + 40, [nodes]);
  const canvasW = maxX - minX, canvasH = maxY - minY;

  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const [transform, animateTo, setImmediate, transformRef] = useAnimatedTransform({ x: 0, y: 0, scale: 1 });
  const [selected, setSelected] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 640);
  const [dragging, setDragging] = useState(false);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null), dragStart = useRef(null), containerRef = useRef(null);
  const lastPos = useRef(null), velocity = useRef({ x: 0, y: 0 }), momentumRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) { setSearchResults([]); return; }
    const q = query.toLowerCase();
    setSearchResults(nodes.filter(n => n.label.toLowerCase().includes(q) || (n.sublabel || "").toLowerCase().includes(q) || (n.info || "").toLowerCase().includes(q) || (n.brands || []).some(b => b.toLowerCase().includes(q))));
  }, [query]);

  const panToNode = useCallback((node, targetScale) => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const scale = targetScale ?? 0.7;
    animateTo({ x: width / 2 - (node.x + node.w / 2) * scale, y: height / 2 - (node.y + node.h / 2) * scale, scale });
    setSelected(node); setQuery(""); setSearchResults([]); setSearchOpen(false);
  }, [animateTo]);

  const fitScreen = useCallback(() => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const scale = Math.min(width / canvasW, height / canvasH, 1) * 0.92;
    animateTo({ x: (width - canvasW * scale) / 2 - minX * scale, y: (height - canvasH * scale) / 2 - minY * scale, scale });
  }, [canvasW, canvasH, minX, minY, animateTo]);

  useEffect(() => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const scale = Math.min(width / canvasW, height / canvasH, 1) * 0.92;
    setImmediate({ x: (width - canvasW * scale) / 2 - minX * scale, y: (height - canvasH * scale) / 2 - minY * scale, scale });
  }, []);

  useEffect(() => { const fn = e => { if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false); }; document.addEventListener("mousedown", fn); return () => document.removeEventListener("mousedown", fn); }, []);

  const handleWheel = useCallback(e => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.12 : 0.89;
    const rect = containerRef.current.getBoundingClientRect();
    setImmediate(t => { const s = Math.min(Math.max(t.scale * factor, 0.15), 4); return { x: (e.clientX - rect.left) - ((e.clientX - rect.left) - t.x) * (s / t.scale), y: (e.clientY - rect.top) - ((e.clientY - rect.top) - t.y) * (s / t.scale), scale: s }; });
  }, [setImmediate]);

  useEffect(() => { const el = containerRef.current; if (!el) return; el.addEventListener("wheel", handleWheel, { passive: false }); return () => el.removeEventListener("wheel", handleWheel); }, [handleWheel]);

  const hasDragged = useRef(false);
  const handleMouseDown = useCallback(e => {
    if (momentumRef.current) cancelAnimationFrame(momentumRef.current);
    setDragging(true); hasDragged.current = false;
    dragStart.current = { x: e.clientX - transform.x, y: e.clientY - transform.y };
    lastPos.current = { x: e.clientX, y: e.clientY, t: performance.now() };
    velocity.current = { x: 0, y: 0 };
  }, [transform.x, transform.y]);

  const handleMouseMove = useCallback(e => {
    if (!dragging) return;
    const nx = e.clientX - dragStart.current.x, ny = e.clientY - dragStart.current.y;
    if (lastPos.current) { const dt = performance.now() - lastPos.current.t; if (dt > 0) velocity.current = { x: (e.clientX - lastPos.current.x) / dt, y: (e.clientY - lastPos.current.y) / dt }; }
    lastPos.current = { x: e.clientX, y: e.clientY, t: performance.now() };
    if (Math.abs(nx - transform.x) > 2 || Math.abs(ny - transform.y) > 2) hasDragged.current = true;
    setImmediate(t => ({ ...t, x: nx, y: ny }));
  }, [dragging, transform.x, transform.y, setImmediate]);

  const handleMouseUp = useCallback(() => {
    if (!dragging) return;
    setDragging(false);
    const v = { ...velocity.current }; if (Math.abs(v.x) < 0.3 && Math.abs(v.y) < 0.3) return;
    let vx = v.x * 14, vy = v.y * 14; const decay = 0.88;
    function coast() { vx *= decay; vy *= decay; if (Math.abs(vx) < 0.3 && Math.abs(vy) < 0.3) return; setImmediate(t => ({ ...t, x: t.x + vx, y: t.y + vy })); momentumRef.current = requestAnimationFrame(coast); }
    momentumRef.current = requestAnimationFrame(coast);
  }, [dragging, setImmediate]);

  const touchState = useRef({ lastDist: null });
  const handleTouch = {
    onTouchStart: e => {
      if (momentumRef.current) cancelAnimationFrame(momentumRef.current);
      if (e.touches.length === 1) { setDragging(true); hasDragged.current = false; dragStart.current = { x: e.touches[0].clientX - transform.x, y: e.touches[0].clientY - transform.y }; lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: performance.now() }; velocity.current = { x: 0, y: 0 }; }
    },
    onTouchMove: e => {
      if (e.touches.length === 1 && dragging) {
        const nx = e.touches[0].clientX - dragStart.current.x, ny = e.touches[0].clientY - dragStart.current.y;
        if (lastPos.current) { const dt = performance.now() - lastPos.current.t; if (dt > 0) velocity.current = { x: (e.touches[0].clientX - lastPos.current.x) / dt, y: (e.touches[0].clientY - lastPos.current.y) / dt }; }
        lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: performance.now() }; hasDragged.current = true; setImmediate(t => ({ ...t, x: nx, y: ny }));
      }
      if (e.touches.length === 2) { const dx = e.touches[0].clientX - e.touches[1].clientX, dy = e.touches[0].clientY - e.touches[1].clientY, dist = Math.sqrt(dx*dx+dy*dy); if (touchState.current.lastDist) { const factor = dist / touchState.current.lastDist; setImmediate(t => ({ ...t, scale: Math.min(Math.max(t.scale * factor, 0.15), 4) })); } touchState.current.lastDist = dist; }
    },
    onTouchEnd: () => { setDragging(false); touchState.current.lastDist = null; const v = { ...velocity.current }; let vx = v.x * 14, vy = v.y * 14; const decay = 0.88; function coast() { vx *= decay; vy *= decay; if (Math.abs(vx) < 0.3 && Math.abs(vy) < 0.3) return; setImmediate(t => ({ ...t, x: t.x + vx, y: t.y + vy })); momentumRef.current = requestAnimationFrame(coast); } if (Math.abs(vx) > 4 || Math.abs(vy) > 4) momentumRef.current = requestAnimationFrame(coast); },
  };

  const zoomBy = useCallback(factor => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    setImmediate(t => { const s = Math.min(Math.max(t.scale * factor, 0.15), 4); return { x: width/2 - (width/2 - t.x) * (s/t.scale), y: height/2 - (height/2 - t.y) * (s/t.scale), scale: s }; });
  }, [setImmediate]);

  const clickTimer = useRef(null);
  const handleNodeClick = useCallback(node => {
    if (hasDragged.current) return;
    if (clickTimer.current) { clearTimeout(clickTimer.current); clickTimer.current = null; panToNode(node, Math.min(transformRef.current.scale * 1.8, 2.5)); }
    else { clickTimer.current = setTimeout(() => { clickTimer.current = null; panToNode(node, 0.7); }, 220); }
  }, [panToNode, transformRef]);

  if (isMobile) return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet" />
      <div style={{ width: "100%", height: "88vh", minHeight: 500, borderRadius: 12, overflow: "hidden", border: "1px solid #2a2535" }}>
        <MobileDrilldown />
      </div>
    </>
  );

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet" />
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes panelSlide{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}`}</style>

      <div style={{ position: "relative", width: "100%", height: "84vh", minHeight: 480, background: "#07060A", borderRadius: 16, overflow: "hidden", border: "1px solid #2a2535" }}>

        {/* Header */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 30, padding: "10px 14px", background: "rgba(7,6,10,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid #2a2535", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, color: "#C9A84C", fontWeight: 700, flexShrink: 0 }}>☕ Coffee Origin Tree</span>
          <div style={{ flex: 1, position: "relative", maxWidth: 300 }} ref={searchRef}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 12, opacity: 0.4, pointerEvents: "none" }}>🔍</span>
            <input value={query} onChange={e => { setQuery(e.target.value); setSearchOpen(true); }} onFocus={() => setSearchOpen(true)} placeholder="Search origins, varietals…"
              style={{ width: "100%", padding: "7px 28px 7px 30px", background: "rgba(255,255,255,0.05)", border: `1px solid ${query ? "#C9A84C60" : "#2a2535"}`, borderRadius: 8, color: "#f0ead8", fontSize: 13, fontFamily: "'DM Sans',sans-serif", outline: "none", boxSizing: "border-box" }} />
            {query && <button onClick={() => { setQuery(""); setSearchResults([]); }} style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#5a5470", cursor: "pointer", fontSize: 13 }}>✕</button>}
            {searchOpen && searchResults.length > 0 && (
              <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, background: "rgba(10,8,16,0.98)", border: "1px solid #C9A84C40", borderRadius: 10, zIndex: 200, maxHeight: 240, overflowY: "auto", boxShadow: "0 16px 40px rgba(0,0,0,0.8)", animation: "fadeIn 0.15s ease" }}>
                {searchResults.map((node, i) => (
                  <div key={node.id} onClick={() => panToNode(node)} style={{ padding: "9px 12px", cursor: "pointer", borderBottom: i < searchResults.length - 1 ? "1px solid #2a2535" : "none", display: "flex", alignItems: "center", gap: 10 }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <div style={{ width: 3, height: 28, borderRadius: 2, background: node.color, flexShrink: 0 }} />
                    <div><div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: node.color, fontWeight: 600 }}>{node.label}</div><div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#5a5470" }}>{node.sublabel}</div></div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: 6, marginLeft: "auto", flexShrink: 0 }}>
            {[["−", () => zoomBy(0.75)], ["+", () => zoomBy(1.33)], ["⤢", fitScreen]].map(([icon, fn]) => (
              <button key={icon} onClick={fn} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #2a2535", borderRadius: 7, width: 32, height: 32, color: "#C9A84C", fontSize: icon === "⤢" ? 12 : 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(201,168,76,0.1)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>{icon}</button>
            ))}
          </div>
        </div>

        <TreeSidebar open={sidebarOpen} onToggle={() => setSidebarOpen(o => !o)} nodes={nodes} selected={selected}
          onSelect={node => { const n = nodes.find(nd => nd.id === node.id); if (n) panToNode(n, [0.5, 0.65, 0.85, 1.0, 1.3][Math.min(n.depth, 4)]); }} TREE={TREE} />

        {/* Canvas */}
        <div ref={containerRef} style={{ position: "absolute", inset: 0, top: 54, left: sidebarOpen ? 216 : 0, overflow: "hidden", cursor: dragging ? "grabbing" : "grab", transition: "left 0.25s ease" }}
          onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} {...handleTouch}>
          <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
            <defs><pattern id="cgrid" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform={`translate(${transform.x % 40},${transform.y % 40})`}><circle cx="20" cy="20" r="1" fill="#2a2535" opacity="0.4" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#cgrid)" />
            <g transform={`translate(${transform.x},${transform.y}) scale(${transform.scale})`}>
              {edges.map((e, i) => <path key={i} d={`M${e.x1},${e.y1} C${e.x1},${e.y1+50} ${e.x2},${e.y2-50} ${e.x2},${e.y2}`} fill="none" stroke={e.color} strokeWidth={2} opacity={0.45} strokeDasharray="5 4" />)}
              {nodes.map(node => {
                const isMatch = searchResults.length > 0 && searchResults.find(r => r.id === node.id);
                const isDimmed = searchResults.length > 0 && !isMatch;
                return (
                  <g key={node.id} style={{ opacity: isDimmed ? 0.2 : 1, transition: "opacity 0.2s" }}>
                    {isMatch && <rect x={node.x-6} y={node.y-6} width={node.w+12} height={node.h+12} rx={12} fill="none" stroke={node.color} strokeWidth={2.5} opacity={0.8} style={{ filter: `drop-shadow(0 0 8px ${node.color})` }} />}
                    <TreeNode node={node} selected={selected} onClick={handleNodeClick} />
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Detail panel */}
        {selected && (
          <div style={{ position: "absolute", right: 12, top: 66, bottom: 12, width: 280, background: "rgba(13,11,18,0.97)", border: `1px solid ${selected.color}50`, borderRadius: 14, padding: "20px 18px", overflowY: "auto", zIndex: 20, animation: "panelSlide 0.2s ease", backdropFilter: "blur(16px)" }}>
            <button onClick={() => { setSelected(null); fitScreen(); }} style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", color: "#5a5470", fontSize: 16, cursor: "pointer" }}>✕</button>
            <DetailContent selected={selected} nodes={nodes} panToNode={panToNode} />
          </div>
        )}

        <div style={{ position: "absolute", bottom: 12, right: selected ? 304 : 12, zIndex: 10, background: "rgba(13,11,18,0.85)", border: "1px solid #2a2535", borderRadius: 8, padding: "5px 10px" }}>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#5a5470" }}>{Math.round(transform.scale * 100)}%</span>
        </div>
      </div>
    </>
  );
}