import { useState, useRef, useEffect, useCallback, useReducer, useMemo } from "react";
import { TREE, LEGEND_SECTIONS } from "../data/tree";

// ── Layout engine ──────────────────────────────────────────────────────────
// Node size varies by depth: root/level-1 nodes are bigger, leaves are normal
const NODE_W = 200;
const NODE_H = 80;
const HGAP   = 40;
const VGAP   = 130;

function layoutTree(node) {
  const nodes = [], edges = [];

  function measure(n) {
    if (!n.children || n.children.length === 0) return 1;
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
        const childLeaves = measure(child);
        place(child, depth + 1, childX);
        const childNode = nodes.find(nd => nd.id === child.id);
        if (childNode) {
          edges.push({
            x1: x + NODE_W / 2, y1: y + NODE_H,
            x2: childNode.x + NODE_W / 2, y2: childNode.y,
            color: n.color,
          });
        }
        childX += childLeaves * (NODE_W + HGAP);
      });
    }
  }

  place(node, 0, 0);
  return { nodes, edges };
}

// ── Node component ─────────────────────────────────────────────────────────
function TreeNode({ node, selected, onClick }) {
  const isSelected = selected?.id === node.id;
  const hasBrands  = node.brands && node.brands.length > 0;
  const isDeep     = node.depth >= 3; // leaf-level nodes

  // Font sizes scale by depth so top nodes read better from afar
  const labelSize   = node.depth === 0 ? 14 : node.depth <= 2 ? 13 : 12;
  const sublabelSize = node.depth === 0 ? 11 : 10;

  return (
    <g
      transform={`translate(${node.x},${node.y})`}
      onClick={() => onClick(node)}
      style={{ cursor: "pointer" }}
    >
      {/* Selection glow */}
      {isSelected && (
        <rect x={-6} y={-6} width={node.w + 12} height={node.h + 12}
          rx={12} fill={`${node.color}28`}
          style={{ filter: `blur(8px)` }}
        />
      )}

      {/* Card background */}
      <rect x={0} y={0} width={node.w} height={node.h} rx={8}
        fill={isSelected ? `${node.color}1a` : "#13111a"}
        stroke={isSelected ? node.color : "#2a2535"}
        strokeWidth={isSelected ? 2 : 1}
      />

      {/* Top color bar instead of left stripe — easier to read at a glance */}
      <rect x={0} y={0} width={node.w} height={4} rx={2} fill={node.color} />

      {/* Brand indicator dot */}
      {hasBrands && (
        <circle cx={node.w - 12} cy={node.h - 12} r={5} fill={node.color} opacity={0.75} />
      )}

      {/* Label — bold, larger */}
      <text x={12} y={28}
        fontFamily="'DM Mono', monospace"
        fontSize={labelSize}
        fontWeight="700"
        letterSpacing="0.06em"
        fill={node.color}
      >{node.label}</text>

      {/* Sublabel */}
      <text x={12} y={46}
        fontFamily="'DM Sans', sans-serif"
        fontSize={sublabelSize}
        fill="#8a84a0"
      >{node.sublabel}</text>

      {/* Brand count */}
      {hasBrands && (
        <text x={12} y={65}
          fontFamily="'DM Mono', monospace"
          fontSize={9}
          fill={node.color}
          opacity={0.65}
        >● {node.brands.length} on menu</text>
      )}
    </g>
  );
}

// ── Get path from root to a node ──────────────────────────────────────────
function getPath(tree, targetId, path = []) {
  const current = { id: tree.id, label: tree.label, color: tree.color };
  if (tree.id === targetId) return [...path, current];
  if (tree.children) {
    for (const child of tree.children) {
      const result = getPath(child, targetId, [...path, current]);
      if (result) return result;
    }
  }
  return null;
}

// ── Legend ─────────────────────────────────────────────────────────────────


function Legend() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div style={{
      position: "absolute", bottom: 12, left: 12, zIndex: 10,
      background: "rgba(10,8,16,0.96)", border: "1px solid #2a2535",
      borderRadius: 12, backdropFilter: "blur(16px)",
      width: open ? 260 : "auto",
      transition: "width 0.25s ease",
      overflow: "hidden",
      boxShadow: open ? "0 8px 32px rgba(0,0,0,0.6)" : "none",
    }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: open ? "12px 14px 10px" : "10px 14px",
          cursor: "pointer", userSelect: "none",
          borderBottom: open ? "1px solid #2a2535" : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13 }}>🗺️</span>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.18em", color: "#C9A84C", textTransform: "uppercase" }}>Legend</span>
        </div>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "#5a5470", marginLeft: 10, transition: "transform 0.2s", display: "inline-block", transform: open ? "rotate(180deg)" : "none" }}>▲</span>
      </div>

      {open && (
        <div style={{ animation: "fadeIn 0.18s ease" }}>
          <div style={{ display: "flex", borderBottom: "1px solid #2a2535" }}>
            {LEGEND_SECTIONS.map((s, i) => (
              <div
                key={i}
                onClick={() => setActiveSection(i)}
                style={{
                  flex: 1, padding: "8px 4px", textAlign: "center",
                  fontFamily: "'DM Mono',monospace", fontSize: 9,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  color: activeSection === i ? "#C9A84C" : "#5a5470",
                  borderBottom: activeSection === i ? "2px solid #C9A84C" : "2px solid transparent",
                  cursor: "pointer", transition: "all 0.15s",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}
              >{s.title}</div>
            ))}
          </div>
          <div style={{ padding: "12px 14px 14px" }}>
            {LEGEND_SECTIONS[activeSection].items.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i < LEGEND_SECTIONS[activeSection].items.length - 1 ? 10 : 0 }}>
                <div style={{ flexShrink: 0 }}>
                  <div style={{ width: 28, height: 20, borderRadius: 4, background: `${item.color}20`, border: `1px solid ${item.color}60`, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: item.color }} />
                    {item.dot === true && (
                      <div style={{ position: "absolute", right: 4, top: "50%", transform: "translateY(-50%)", width: 5, height: 5, borderRadius: "50%", background: item.color }} />
                    )}
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: item.color, fontWeight: 600, lineHeight: 1.3 }}>{item.label}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "#5a5470", lineHeight: 1.3 }}>{item.sublabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Sidebar nav tree ──────────────────────────────────────────────────────
function SidebarNode({ node, depth, selected, onSelect, expandedIds, toggleExpand }) {
  const isSelected = selected?.id === node.id;
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded  = expandedIds.has(node.id);
  const indent = depth * 14;

  return (
    <div>
      <div
        onClick={() => { onSelect(node); if (hasChildren) toggleExpand(node.id); }}
        style={{
          display: "flex", alignItems: "center", gap: 7,
          padding: `5px 10px 5px ${12 + indent}px`,
          cursor: "pointer", borderRadius: 6, margin: "1px 6px",
          background: isSelected ? `${node.color}20` : "transparent",
          border: isSelected ? `1px solid ${node.color}50` : "1px solid transparent",
          transition: "background 0.15s, border-color 0.15s",
        }}
        onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
        onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}
      >
        {/* Color dot */}
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: node.color, flexShrink: 0, opacity: isSelected ? 1 : 0.6 }} />
        {/* Label */}
        <span style={{ fontFamily: depth === 0 ? "'Playfair Display',serif" : "'DM Sans',sans-serif", fontSize: depth === 0 ? 12 : 11, fontWeight: isSelected ? 700 : depth === 0 ? 600 : 400, color: isSelected ? node.color : depth === 0 ? "#c8b898" : "#a099b8", flex: 1, lineHeight: 1.3, letterSpacing: depth === 0 ? "0.04em" : 0 }}>
          {node.label}
        </span>
        {/* Expand toggle */}
        {hasChildren && (
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: "#5a5470", flexShrink: 0, transform: isExpanded ? "rotate(90deg)" : "none", display: "inline-block", transition: "transform 0.18s" }}>▶</span>
        )}
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div style={{ borderLeft: `1px solid ${node.color}25`, marginLeft: 12 + indent + 3 }}>
          {node.children.map(child => (
            <SidebarNode key={child.id} node={child} depth={depth + 1} selected={selected} onSelect={onSelect} expandedIds={expandedIds} toggleExpand={toggleExpand} />
          ))}
        </div>
      )}
    </div>
  );
}

function TreeSidebar({ open, onToggle, nodes, selected, onSelect, TREE }) {
  // Start with top-level nodes expanded
  const [expandedIds, setExpandedIds] = useState(() => new Set(["distilled", "grain", "sugarcane", "agave", "grape", "liqueurs"]));

  const toggleExpand = (id) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Auto-expand path to selected node
  useEffect(() => {
    if (!selected) return;
    // find ancestors
    function findPath(node, targetId, path = []) {
      if (node.id === targetId) return path;
      if (node.children) {
        for (const c of node.children) {
          const r = findPath(c, targetId, [...path, node.id]);
          if (r) return r;
        }
      }
      return null;
    }
    const path = findPath(TREE, selected.id);
    if (path) setExpandedIds(prev => new Set([...prev, ...path]));
  }, [selected, TREE]);

  return (
    <>
      {/* Toggle button — always visible */}
      <div
        onClick={onToggle}
        style={{
          position: "absolute", left: open ? 216 : 0, top: 54, zIndex: 25,
          width: 22, height: 44,
          background: "rgba(13,11,18,0.97)", border: "1px solid #2a2535",
          borderLeft: open ? "1px solid #2a2535" : "none",
          borderRadius: open ? "0 8px 8px 0" : "0 8px 8px 0",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", transition: "left 0.25s ease",
          backdropFilter: "blur(8px)",
        }}
        title={open ? "Close nav" : "Open nav"}
      >
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "#5a5470", transform: open ? "rotate(180deg)" : "none", display: "inline-block", transition: "transform 0.25s" }}>▶</span>
      </div>

      {/* Sidebar panel */}
      <div style={{
        position: "absolute", left: open ? 0 : -216, top: 54, bottom: 0,
        width: 216, zIndex: 24,
        background: "rgba(10,8,16,0.97)", borderRight: "1px solid #2a2535",
        backdropFilter: "blur(16px)",
        transition: "left 0.25s ease",
        display: "flex", flexDirection: "column",
        overflow: "hidden",
      }}>
        {/* Sidebar header */}
        <div style={{ padding: "12px 14px 8px", borderBottom: "1px solid #2a2535", flexShrink: 0 }}>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: "0.2em", color: "#5a5470", textTransform: "uppercase" }}>Navigate</div>
        </div>

        {/* Tree nav */}
        <div style={{ flex: 1, overflowY: "auto", padding: "6px 0 12px" }}>
          {TREE.children.map(child => (
            <SidebarNode key={child.id} node={child} depth={0} selected={selected} onSelect={onSelect} expandedIds={expandedIds} toggleExpand={toggleExpand} />
          ))}
        </div>
      </div>
    </>
  );
}

// ── Smooth animated transform ──────────────────────────────────────────────
function useAnimatedTransform(initial) {
  const [transform, setTransform] = useState(initial);
  const animRef    = useRef(null);
  const currentRef = useRef(initial);

  const animateTo = useCallback((target, duration = 320) => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const start = { ...currentRef.current };
    const startTime = performance.now();
    const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    function step(now) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const e = ease(t);
      const next = {
        x:     start.x     + (target.x     - start.x)     * e,
        y:     start.y     + (target.y     - start.y)     * e,
        scale: start.scale + (target.scale - start.scale) * e,
      };
      currentRef.current = next;
      setTransform({ ...next }); // new object each frame so React batches properly
      if (t < 1) animRef.current = requestAnimationFrame(step);
      else animRef.current = null;
    }
    animRef.current = requestAnimationFrame(step);
  }, []);

  const setImmediate = useCallback((updater) => {
    if (typeof updater === "function") {
      setTransform(prev => {
        const next = updater(prev);
        currentRef.current = next;
        return next;
      });
    } else {
      currentRef.current = updater;
      setTransform({ ...updater });
    }
  }, []);

  // Expose currentRef so callbacks can read scale without stale closure
  return [transform, animateTo, setImmediate, currentRef];
}

// ── Detail panel content (shared by desktop panel + mobile sheet) ──────────
function DetailPanelContent({ selected, nodes, panToNode }) {
  const path = getPath(TREE, selected.id) || [];

  return (
    <>
      <div style={{ width: 32, height: 3, background: selected.color, borderRadius: 2, marginBottom: 14 }} />

      {/* Breadcrumb */}
      {path.length > 1 && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: "0.18em", color: "#5a5470", textTransform: "uppercase", marginBottom: 8 }}>Family Path</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {path.map((step, i) => {
              const isLast = i === path.length - 1;
              const stepNode = nodes.find(n => n.id === step.id);
              return (
                <div key={step.id} style={{ display: "flex", alignItems: "stretch" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 20, flexShrink: 0 }}>
                    <div style={{ width: isLast ? 10 : 7, height: isLast ? 10 : 7, borderRadius: "50%", background: isLast ? step.color : `${step.color}60`, border: isLast ? `2px solid ${step.color}` : `1px solid ${step.color}40`, flexShrink: 0, boxShadow: isLast ? `0 0 6px ${step.color}80` : "none", zIndex: 1 }} />
                    {!isLast && <div style={{ width: 1, flex: 1, background: `linear-gradient(to bottom, ${step.color}40, ${path[i+1]?.color || step.color}30)`, minHeight: 18 }} />}
                  </div>
                  <div style={{ paddingLeft: 8, paddingBottom: isLast ? 0 : 10, display: "flex", alignItems: "flex-start" }}>
                    <span onClick={() => stepNode && !isLast && panToNode(stepNode)}
                      style={{ fontFamily: isLast ? "'DM Sans',sans-serif" : "'DM Mono',monospace", fontSize: isLast ? 13 : 10, fontWeight: isLast ? 700 : 400, color: isLast ? step.color : `${step.color}80`, letterSpacing: isLast ? 0 : "0.05em", lineHeight: 1.4, cursor: (!isLast && stepNode) ? "pointer" : "default", textDecoration: (!isLast && stepNode) ? "underline dotted" : "none" }}>
                      {step.label}
                    </span>
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
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.2em", color: "#5a5470", textTransform: "uppercase", marginBottom: 10 }}>On Gunthers's Menu</div>
          <div style={{ marginBottom: 12 }}>{selected.brands.map(b => <span key={b} className="brand-chip">{b}</span>)}</div>
        </>
      )}

      {selected.children && (
        <>
          <div style={{ height: 1, background: "#2a2535", margin: "14px 0 10px" }} />
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.2em", color: "#5a5470", textTransform: "uppercase", marginBottom: 10 }}>Sub-categories</div>
          {selected.children.map(c => {
            const childNode = nodes.find(n => n.id === c.id);
            return (
              <div key={c.id} onClick={() => childNode && panToNode(childNode)}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, marginBottom: 4, cursor: "pointer", border: `1px solid ${c.color}30`, background: `${c.color}08`, transition: "background 0.15s, border-color 0.15s" }}
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

// ── Mobile drilldown (replaces diagram on small screens) ──────────────────
function MobileDrilldown({ TREE }) {
  const [stack, setStack] = useState([TREE]); // stack of nodes, last = current view
  const current = stack[stack.length - 1];

  const push = (node) => setStack(s => [...s, node]);
  const pop  = () => setStack(s => s.slice(0, -1));

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#07060A" }}>
      {/* Breadcrumb header */}
      <div style={{ padding: "10px 14px", borderBottom: "1px solid #2a2535", background: "rgba(7,6,10,0.97)", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        {stack.length > 1 && (
          <button onClick={pop} style={{ background: "none", border: "none", color: "#C9A84C", fontSize: 18, cursor: "pointer", padding: "0 6px 0 0", lineHeight: 1 }}>‹</button>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Mini breadcrumb trail */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "nowrap", overflow: "hidden" }}>
            {stack.map((n, i) => (
              <span key={n.id} style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: i < stack.length - 1 ? 1 : 0, minWidth: 0 }}>
                {i > 0 && <span style={{ color: "#3a3450", fontSize: 11 }}>›</span>}
                <span
                  onClick={() => i < stack.length - 1 && setStack(s => s.slice(0, i + 1))}
                  style={{ fontFamily: "'DM Mono',monospace", fontSize: i === stack.length - 1 ? 13 : 10, fontWeight: i === stack.length - 1 ? 700 : 400, color: i === stack.length - 1 ? n.color : "#5a5470", cursor: i < stack.length - 1 ? "pointer" : "default", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", letterSpacing: "0.04em" }}>
                  {n.label}
                </span>
              </span>
            ))}
          </div>
          {current.sublabel && (
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "#5a5470", marginTop: 2 }}>{current.sublabel}</div>
          )}
        </div>
      </div>

      {/* Current node info card */}
      {current.info && (
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #1a1825", background: `${current.color}08`, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{ width: 3, height: 20, background: current.color, borderRadius: 2, flexShrink: 0 }} />
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, color: current.color, fontWeight: 700 }}>{current.label}</span>
          </div>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#a098b8", lineHeight: 1.7, margin: 0 }}>{current.info}</p>
          {current.brands?.length > 0 && (
            <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 4 }}>
              {current.brands.map(b => (
                <span key={b} style={{ background: `${current.color}15`, border: `1px solid ${current.color}40`, borderRadius: 12, padding: "2px 9px", fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: current.color }}>{b}</span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Children list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
        {current.children?.map(child => (
          <div
            key={child.id}
            onClick={() => push(child)}
            style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", borderBottom: "1px solid #12101a", cursor: "pointer", transition: "background 0.12s", WebkitTapHighlightColor: "transparent" }}
            onTouchStart={e => e.currentTarget.style.background = `${child.color}10`}
            onTouchEnd={e => { e.currentTarget.style.background = "transparent"; }}
          >
            {/* Color bar */}
            <div style={{ width: 4, height: 36, background: child.color, borderRadius: 2, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, fontWeight: 700, color: child.color, letterSpacing: "0.04em" }}>{child.label}</div>
              {child.sublabel && <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#5a5470", marginTop: 2 }}>{child.sublabel}</div>}
              {child.brands?.length > 0 && (
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: `${child.color}80`, marginTop: 3 }}>● {child.brands.length} on menu</div>
              )}
            </div>
            {/* Chevron if has children, dot if leaf */}
            {child.children
              ? <span style={{ color: "#3a3450", fontSize: 18, flexShrink: 0 }}>›</span>
              : <div style={{ width: 7, height: 7, borderRadius: "50%", background: `${child.color}50`, flexShrink: 0 }} />
            }
          </div>
        ))}

        {/* Leaf node — no children */}
        {!current.children && (
          <div style={{ padding: "24px 16px", textAlign: "center" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${current.color}20`, border: `2px solid ${current.color}60`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: current.color }} />
            </div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#5a5470" }}>This is a base spirit category</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function LiquorTreePage() {
  // ── stable layout — memoized so nodes array never changes identity ──
  const { nodes, edges } = useMemo(() => layoutTree(TREE), []);

  const minX = useMemo(() => Math.min(...nodes.map(n => n.x)) - 40, [nodes]);
  const minY = useMemo(() => Math.min(...nodes.map(n => n.y)) - 40, [nodes]);
  const maxX = useMemo(() => Math.max(...nodes.map(n => n.x + n.w)) + 40, [nodes]);
  const maxY = useMemo(() => Math.max(...nodes.map(n => n.y + n.h)) + 40, [nodes]);
  const canvasW = maxX - minX;
  const canvasH = maxY - minY;

  // ── Mobile detection ──
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const [transform, animateTo, setImmediate, transformRef] = useAnimatedTransform({ x: 0, y: 0, scale: 1 });
  const [selected, setSelected] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 640);
  const [mobilePanel, setMobilePanel] = useState(false); // mobile bottom sheet for detail
  const [dragging, setDragging] = useState(false);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef   = useRef(null);
  const dragStart   = useRef(null);
  const containerRef = useRef(null);
  // momentum
  const lastPos     = useRef(null);
  const velocity    = useRef({ x: 0, y: 0 });
  const momentumRef = useRef(null);

  // ── Search — stable deps now that nodes is memoized ──
  useEffect(() => {
    if (!query.trim()) { setSearchResults([]); return; }
    const q = query.toLowerCase();
    const results = nodes.filter(n =>
      n.label.toLowerCase().includes(q) ||
      (n.sublabel || "").toLowerCase().includes(q) ||
      (n.info || "").toLowerCase().includes(q) ||
      (n.brands || []).some(b => b.toLowerCase().includes(q))
    );
    setSearchResults(results);
  }, [query]); // nodes is stable — no need in deps

  // ── Pan to node (animated) ──
  const panToNode = useCallback((node, targetScale) => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    // Read current scale from ref to avoid stale closure / infinite re-creation
    const currentScale = transformRef.current.scale;
    const scale = targetScale ?? Math.max(currentScale, 0.8);
    const x = width / 2 - (node.x + node.w / 2) * scale;
    const y = height / 2 - (node.y + node.h / 2) * scale;
    animateTo({ x, y, scale });
    setSelected(node);
    setQuery("");
    setSearchResults([]);
    setSearchOpen(false);
    if (isMobile) setMobilePanel(true);
  }, [animateTo, isMobile, transformRef]); // no transform.scale dep!

  // ── Fit screen (animated) ──
  const fitScreen = useCallback(() => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const scaleX = width / canvasW;
    const scaleY = height / canvasH;
    const scale = Math.min(scaleX, scaleY, 1) * 0.92;
    const x = (width - canvasW * scale) / 2 - minX * scale;
    const y = (height - canvasH * scale) / 2 - minY * scale;
    animateTo({ x, y, scale });
  }, [canvasW, canvasH, minX, minY, animateTo]);

  // ── Initial fit ──
  useEffect(() => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const scaleX = width / canvasW;
    const scaleY = height / canvasH;
    const scale = Math.min(scaleX, scaleY, 1) * 0.92;
    const x = (width - canvasW * scale) / 2 - minX * scale;
    const y = (height - canvasH * scale) / 2 - minY * scale;
    setImmediate({ x, y, scale });
  }, []);

  // ── Click outside search ──
  useEffect(() => {
    const fn = (e) => { if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  // ── Wheel zoom (immediate, centered on cursor) ──
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.12 : 0.89;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    setImmediate(t => {
      const newScale = Math.min(Math.max(t.scale * factor, 0.15), 4);
      return {
        x: cx - (cx - t.x) * (newScale / t.scale),
        y: cy - (cy - t.y) * (newScale / t.scale),
        scale: newScale,
      };
    });
  }, [setImmediate]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  // ── Drag (from anywhere on canvas including nodes) ──
  const hasDragged = useRef(false);

  const handleMouseDown = useCallback((e) => {
    if (momentumRef.current) cancelAnimationFrame(momentumRef.current);
    setDragging(true);
    hasDragged.current = false;
    dragStart.current = { x: e.clientX - transform.x, y: e.clientY - transform.y };
    lastPos.current = { x: e.clientX, y: e.clientY, t: performance.now() };
    velocity.current = { x: 0, y: 0 };
  }, [transform.x, transform.y]);

  const handleMouseMove = useCallback((e) => {
    if (!dragging) return;
    const nx = e.clientX - dragStart.current.x;
    const ny = e.clientY - dragStart.current.y;
    // track velocity for momentum
    if (lastPos.current) {
      const dt = performance.now() - lastPos.current.t;
      if (dt > 0) {
        velocity.current = {
          x: (e.clientX - lastPos.current.x) / dt,
          y: (e.clientY - lastPos.current.y) / dt,
        };
      }
    }
    lastPos.current = { x: e.clientX, y: e.clientY, t: performance.now() };
    if (Math.abs(nx - transform.x) > 2 || Math.abs(ny - transform.y) > 2) hasDragged.current = true;
    setImmediate(t => ({ ...t, x: nx, y: ny }));
  }, [dragging, setImmediate]);

  const handleMouseUp = useCallback((e) => {
    if (!dragging) return;
    setDragging(false);
    // Apply momentum
    const v = { ...velocity.current };
    const MIN_VEL = 0.3;
    if (Math.abs(v.x) < MIN_VEL && Math.abs(v.y) < MIN_VEL) return;

    let vx = v.x * 14;
    let vy = v.y * 14;
    const decay = 0.88;

    function coast() {
      vx *= decay;
      vy *= decay;
      if (Math.abs(vx) < 0.3 && Math.abs(vy) < 0.3) return;
      setImmediate(t => ({ ...t, x: t.x + vx, y: t.y + vy }));
      momentumRef.current = requestAnimationFrame(coast);
    }
    momentumRef.current = requestAnimationFrame(coast);
  }, [dragging, setImmediate]);

  // ── Touch ──
  const touchState = useRef({ lastDist: null });
  const handleTouch = {
    onTouchStart: (e) => {
      if (momentumRef.current) cancelAnimationFrame(momentumRef.current);
      if (e.touches.length === 1) {
        setDragging(true);
        hasDragged.current = false;
        dragStart.current = { x: e.touches[0].clientX - transform.x, y: e.touches[0].clientY - transform.y };
        lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: performance.now() };
        velocity.current = { x: 0, y: 0 };
      }
    },
    onTouchMove: (e) => {
      if (e.touches.length === 1 && dragging) {
        const nx = e.touches[0].clientX - dragStart.current.x;
        const ny = e.touches[0].clientY - dragStart.current.y;
        if (lastPos.current) {
          const dt = performance.now() - lastPos.current.t;
          if (dt > 0) velocity.current = { x: (e.touches[0].clientX - lastPos.current.x) / dt, y: (e.touches[0].clientY - lastPos.current.y) / dt };
        }
        lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: performance.now() };
        hasDragged.current = true;
        setImmediate(t => ({ ...t, x: nx, y: ny }));
      }
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (touchState.current.lastDist) {
          const factor = dist / touchState.current.lastDist;
          setImmediate(t => ({ ...t, scale: Math.min(Math.max(t.scale * factor, 0.15), 4) }));
        }
        touchState.current.lastDist = dist;
      }
    },
    onTouchEnd: () => {
      setDragging(false);
      touchState.current.lastDist = null;
      const v = { ...velocity.current };
      let vx = v.x * 14, vy = v.y * 14;
      const decay = 0.88;
      function coast() {
        vx *= decay; vy *= decay;
        if (Math.abs(vx) < 0.3 && Math.abs(vy) < 0.3) return;
        setImmediate(t => ({ ...t, x: t.x + vx, y: t.y + vy }));
        momentumRef.current = requestAnimationFrame(coast);
      }
      if (Math.abs(vx) > 4 || Math.abs(vy) > 4) momentumRef.current = requestAnimationFrame(coast);
    },
  };

  // ── Zoom buttons (animated, zoom toward center) ──
  const zoomBy = useCallback((factor) => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const cx = width / 2, cy = height / 2;
    setImmediate(t => {
      const newScale = Math.min(Math.max(t.scale * factor, 0.15), 4);
      return {
        x: cx - (cx - t.x) * (newScale / t.scale),
        y: cy - (cy - t.y) * (newScale / t.scale),
        scale: newScale,
      };
    });
  }, [setImmediate]);

  // ── Node click: single = zoom to 0.7 + select, double = zoom in more ──
  const clickTimer = useRef(null);
  const handleNodeClick = useCallback((node) => {
    if (hasDragged.current) return;
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
      // double-click → zoom in close
      panToNode(node, Math.min(transformRef.current.scale * 1.8, 2.5));
    } else {
      clickTimer.current = setTimeout(() => {
        clickTimer.current = null;
        // single click → always land at 0.7 so the node is comfortably readable
        panToNode(node, 0.7);
      }, 220);
    }
  }, [panToNode, transformRef]);

  // ── On mobile, skip the diagram entirely — show drilldown list ──
  if (isMobile) {
    return (
      <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet" />
        <div style={{ width: "100%", height: "88vh", minHeight: 500, borderRadius: 12, overflow: "hidden", border: "1px solid #2a2535" }}>
          <MobileDrilldown TREE={TREE} />
        </div>
      </>
    );
  }

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes fadeIn    { from { opacity:0; }                    to { opacity:1; } }
        @keyframes panelSlide { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }
        @keyframes sheetUp   { from { transform:translateY(100%); }  to { transform:translateY(0); } }
        .brand-chip { display:inline-block; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:20px; padding:3px 10px; font-size:11px; margin:3px 2px; font-family:'DM Sans',sans-serif; color:#c8b898; }
        .tree-nav-sb::-webkit-scrollbar { width:4px; }
        .tree-nav-sb::-webkit-scrollbar-track { background:transparent; }
        .tree-nav-sb::-webkit-scrollbar-thumb { background:#2a2535; border-radius:2px; }
      `}</style>

      <div style={{ position: "relative", width: "100%", height: isMobile ? "92vh" : "84vh", minHeight: 480, background: "#07060A", borderRadius: isMobile ? 12 : 16, overflow: "hidden", border: "1px solid #2a2535" }}>

        {/* ── Header ── */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 30, padding: isMobile ? "8px 10px" : "10px 14px", background: "rgba(7,6,10,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid #2a2535", display: "flex", alignItems: "center", gap: isMobile ? 8 : 12 }}>
          <div style={{ flexShrink: 0 }}>
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 14 : 17, color: "#C9A84C", fontWeight: 700 }}>Liquor Family Tree</span>
          </div>

          {/* Search */}
          <div style={{ flex: 1, position: "relative", maxWidth: isMobile ? "100%" : 320 }} ref={searchRef}>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 13, opacity: 0.4, pointerEvents: "none" }}>🔍</span>
              <input
                value={query}
                onChange={e => { setQuery(e.target.value); setSearchOpen(true); }}
                onFocus={() => setSearchOpen(true)}
                placeholder={isMobile ? "Search…" : "Search spirits or brands…"}
                style={{ width: "100%", padding: "7px 28px 7px 30px", background: "rgba(255,255,255,0.05)", border: `1px solid ${query ? "#C9A84C60" : "#2a2535"}`, borderRadius: 8, color: "#f0ead8", fontSize: isMobile ? 12 : 13, fontFamily: "'DM Sans',sans-serif", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box" }}
              />
              {query && <button onClick={() => { setQuery(""); setSearchResults([]); }} style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#5a5470", cursor: "pointer", fontSize: 13, padding: 2 }}>✕</button>}
            </div>
            {searchOpen && searchResults.length > 0 && (
              <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, background: "rgba(10,8,16,0.98)", border: "1px solid #C9A84C40", borderRadius: 10, zIndex: 200, maxHeight: 240, overflowY: "auto", boxShadow: "0 16px 40px rgba(0,0,0,0.8)", animation: "fadeIn 0.15s ease" }}>
                <div style={{ padding: "7px 12px 5px", fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: "0.15em", color: "#5a5470", textTransform: "uppercase", borderBottom: "1px solid #2a2535" }}>{searchResults.length} result{searchResults.length !== 1 ? "s" : ""}</div>
                {searchResults.map((node, i) => (
                  <div key={node.id} onClick={() => panToNode(node)}
                    style={{ padding: "9px 12px", cursor: "pointer", borderBottom: i < searchResults.length - 1 ? "1px solid #2a2535" : "none", display: "flex", alignItems: "center", gap: 10, transition: "background 0.1s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <div style={{ width: 3, height: 28, borderRadius: 2, background: node.color, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: node.color, fontWeight: 600 }}>{node.label}</div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#5a5470" }}>{node.sublabel}</div>
                      {query && (node.brands || []).filter(b => b.toLowerCase().includes(query.toLowerCase())).slice(0, 2).map(b => (
                        <span key={b} style={{ display: "inline-block", fontFamily: "'DM Mono',monospace", fontSize: 10, color: "#C9A84C", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: 10, padding: "1px 7px", marginTop: 3, marginRight: 4 }}>{b}</span>
                      ))}
                    </div>
                    <span style={{ color: "#3a3450", fontSize: 12 }}>→</span>
                  </div>
                ))}
              </div>
            )}
            {searchOpen && query && searchResults.length === 0 && (
              <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, background: "rgba(10,8,16,0.98)", border: "1px solid #2a2535", borderRadius: 10, padding: "12px", zIndex: 200, textAlign: "center" }}>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#5a5470" }}>No results for "{query}"</div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div style={{ display: "flex", gap: isMobile ? 4 : 6, marginLeft: "auto", flexShrink: 0 }}>
            {/* Mobile: nav toggle in header */}
            {isMobile && (
              <button onClick={() => setSidebarOpen(o => !o)} style={{ background: sidebarOpen ? "rgba(201,168,76,0.1)" : "rgba(255,255,255,0.05)", border: `1px solid ${sidebarOpen ? "#C9A84C60" : "#2a2535"}`, borderRadius: 7, width: 30, height: 30, color: "#C9A84C", fontSize: 13, cursor: "pointer", fontFamily: "'DM Mono',monospace", display: "flex", alignItems: "center", justifyContent: "center" }}>☰</button>
            )}
            {[["−", () => zoomBy(0.75)], ["+", () => zoomBy(1.33)], ["⤢", fitScreen]].map(([icon, fn]) => (
              <button key={icon} onClick={fn} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #2a2535", borderRadius: 7, width: isMobile ? 30 : 32, height: isMobile ? 30 : 32, color: "#C9A84C", fontSize: icon === "⤢" ? 12 : 16, cursor: "pointer", fontFamily: "'DM Mono',monospace", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,168,76,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
              >{icon}</button>
            ))}
          </div>
        </div>

        {/* ── Sidebar (desktop: slide in/out left, mobile: overlay) ── */}
        {!isMobile && (
          <TreeSidebar
            open={sidebarOpen}
            onToggle={() => setSidebarOpen(o => !o)}
            nodes={nodes}
            selected={selected}
            onSelect={(node) => {
              const n = nodes.find(nd => nd.id === node.id);
              if (!n) return;
              const depthScale = [0.5, 0.65, 0.85, 1.1, 1.3][Math.min(n.depth, 4)];
              panToNode(n, depthScale);
            }}
            TREE={TREE}
          />
        )}

        {/* Mobile sidebar overlay */}
        {isMobile && sidebarOpen && (
          <div style={{ position: "absolute", inset: 0, top: 46, zIndex: 40, display: "flex" }}>
            {/* Backdrop */}
            <div onClick={() => setSidebarOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(2px)" }} />
            {/* Panel */}
            <div style={{ position: "relative", width: "80%", maxWidth: 280, background: "rgba(10,8,16,0.99)", borderRight: "1px solid #2a2535", display: "flex", flexDirection: "column", animation: "fadeIn 0.2s ease", zIndex: 1 }}>
              <div style={{ padding: "12px 14px 8px", borderBottom: "1px solid #2a2535", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: "0.2em", color: "#5a5470", textTransform: "uppercase" }}>Navigate</div>
                <button onClick={() => setSidebarOpen(false)} style={{ background: "none", border: "none", color: "#5a5470", fontSize: 16, cursor: "pointer", padding: 0 }}>✕</button>
              </div>
              <div className="tree-nav-sb" style={{ flex: 1, overflowY: "auto", padding: "6px 0 20px" }}>
                {TREE.children.map(child => (
                  <SidebarNode key={child.id} node={child} depth={0}
                    selected={selected}
                    onSelect={(node) => {
                      const n = nodes.find(nd => nd.id === node.id);
                      if (!n) return;
                      const depthScale = [0.5, 0.65, 0.85, 1.1, 1.3][Math.min(n.depth, 4)];
                      panToNode(n, depthScale);
                      setSidebarOpen(false);
                    }}
                    expandedIds={new Set(["distilled","grain","sugarcane","agave","grape","liqueurs","whiskey"])}
                    toggleExpand={() => {}}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Canvas ── */}
        <div
          ref={containerRef}
          style={{ position: "absolute", inset: 0, top: isMobile ? 46 : 54, left: (!isMobile && sidebarOpen) ? 216 : 0, overflow: "hidden", cursor: dragging ? "grabbing" : "grab", transition: "left 0.25s ease" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          {...handleTouch}
        >
          <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"
                patternTransform={`translate(${transform.x % 40},${transform.y % 40})`}>
                <circle cx="20" cy="20" r="1" fill="#2a2535" opacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <g transform={`translate(${transform.x},${transform.y}) scale(${transform.scale})`}>
              {edges.map((e, i) => (
                <path key={i}
                  d={`M${e.x1},${e.y1} C${e.x1},${e.y1 + 50} ${e.x2},${e.y2 - 50} ${e.x2},${e.y2}`}
                  fill="none" stroke={e.color} strokeWidth={2} opacity={0.45}
                  strokeDasharray="5 4"
                />
              ))}
              {nodes.map(node => {
                const isMatch  = searchResults.length > 0 && searchResults.find(r => r.id === node.id);
                const isDimmed = searchResults.length > 0 && !isMatch;
                return (
                  <g key={node.id} style={{ opacity: isDimmed ? 0.2 : 1, transition: "opacity 0.2s" }}>
                    {isMatch && (
                      <rect x={node.x - 6} y={node.y - 6} width={node.w + 12} height={node.h + 12}
                        rx={12} fill="none" stroke={node.color} strokeWidth={2.5} opacity={0.8}
                        style={{ filter: `drop-shadow(0 0 8px ${node.color})` }}
                      />
                    )}
                    <TreeNode node={node} selected={selected} onClick={handleNodeClick} />
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* ── Desktop detail panel (right side) ── */}
        {!isMobile && selected && (
          <div style={{ position: "absolute", right: 12, top: 66, bottom: 12, width: 280, background: "rgba(13,11,18,0.97)", border: `1px solid ${selected.color}50`, borderRadius: 14, padding: "20px 18px", overflowY: "auto", zIndex: 20, animation: "panelSlide 0.2s ease", backdropFilter: "blur(16px)" }}>
            <button onClick={() => { setSelected(null); fitScreen(); }} style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", color: "#5a5470", fontSize: 16, cursor: "pointer" }}>✕</button>
            <DetailPanelContent selected={selected} nodes={nodes} panToNode={panToNode} fitScreen={fitScreen} setSelected={setSelected} />
          </div>
        )}

        {/* ── Mobile bottom sheet ── */}
        {isMobile && selected && mobilePanel && (
          <>
            <div onClick={() => setMobilePanel(false)} style={{ position: "absolute", inset: 0, top: 46, background: "rgba(0,0,0,0.4)", zIndex: 30 }} />
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 35, background: "rgba(13,11,18,0.99)", border: `1px solid ${selected.color}40`, borderRadius: "16px 16px 0 0", padding: "0 16px 24px", maxHeight: "65vh", overflowY: "auto", animation: "sheetUp 0.25s ease" }}>
              {/* Handle */}
              <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 4px" }}>
                <div style={{ width: 36, height: 4, background: "#2a2535", borderRadius: 2 }} />
              </div>
              <button onClick={() => { setSelected(null); setMobilePanel(false); fitScreen(); }} style={{ position: "absolute", top: 14, right: 16, background: "none", border: "none", color: "#5a5470", fontSize: 16, cursor: "pointer" }}>✕</button>
              <DetailPanelContent selected={selected} nodes={nodes} panToNode={(n) => { panToNode(n); setMobilePanel(true); }} fitScreen={fitScreen} setSelected={setSelected} />
            </div>
          </>
        )}

        {/* Mobile: tap to open detail if selected but panel closed */}
        {isMobile && selected && !mobilePanel && (
          <div onClick={() => setMobilePanel(true)} style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", zIndex: 20, background: `${selected.color}20`, border: `1px solid ${selected.color}60`, borderRadius: 20, padding: "7px 18px", cursor: "pointer", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: selected.color, display: "inline-block" }} />
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: selected.color, fontWeight: 600 }}>{selected.label}</span>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: `${selected.color}80` }}>↑</span>
          </div>
        )}

        {!isMobile && <Legend />}

        {/* Zoom % */}
        <div style={{ position: "absolute", bottom: 12, right: (!isMobile && selected) ? 304 : 12, zIndex: 10, background: "rgba(13,11,18,0.85)", border: "1px solid #2a2535", borderRadius: 8, padding: "5px 10px", backdropFilter: "blur(8px)" }}>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#5a5470" }}>{Math.round(transform.scale * 100)}%</span>
        </div>
      </div>
    </>
  );
}