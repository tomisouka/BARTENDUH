import { useState, useMemo } from "react";
import { T } from "../theme";
import {
  TICKETS, STATUSES, CATEGORIES, PRIORITIES,
  STATUS_LABEL, STATUS_COLOR, PRIORITY_COLOR, CATEGORY_COLOR,
} from "../data/tickets";

const mono = "'DM Mono', monospace";
const sans = "'Inter', system-ui, sans-serif";

// ── Pill ──────────────────────────────────────────────────────────────────────
function Pill({ label, color, small }) {
  return (
    <span style={{
      fontFamily: mono,
      fontSize: small ? 9 : 10,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color,
      border: `1px solid ${color}50`,
      background: `${color}12`,
      padding: small ? "2px 6px" : "3px 8px",
      borderRadius: 20,
      whiteSpace: "nowrap",
      flexShrink: 0,
    }}>
      {label}
    </span>
  );
}

// ── Ticket row ────────────────────────────────────────────────────────────────
function TicketRow({ ticket, accent }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen(o => !o)}
      style={{
        background: open ? `${accent}08` : "rgba(255,255,255,0.02)",
        border: `1px solid ${open ? accent + "40" : T.border}`,
        borderRadius: 10,
        padding: "12px 16px",
        cursor: "pointer",
        transition: "all 0.15s",
        userSelect: "none",
      }}
      onMouseEnter={e => { if (!open) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
      onMouseLeave={e => { if (!open) e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
    >
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <span style={{ fontFamily: mono, fontSize: 10, color: T.dim, flexShrink: 0 }}>{ticket.id}</span>

        <span style={{ flex: 1, minWidth: 0, fontSize: 13, fontWeight: 600, color: T.cream, fontFamily: sans,
          textDecoration: ticket.status === "done" ? "line-through" : "none",
          opacity: ticket.status === "done" ? 0.5 : 1,
        }}>
          {ticket.title}
        </span>

        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          <Pill label={ticket.status === "in-progress" ? "in progress" : ticket.status} color={STATUS_COLOR[ticket.status]} small />
          <Pill label={ticket.priority} color={PRIORITY_COLOR[ticket.priority]} small />
          <Pill label={ticket.category} color={CATEGORY_COLOR[ticket.category]} small />
        </div>

        <span style={{ color: T.dim, fontSize: 12, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none", flexShrink: 0 }}>▾</span>
      </div>

      {/* Notes */}
      {open && ticket.notes && (
        <div style={{
          marginTop: 10,
          paddingTop: 10,
          borderTop: `1px solid ${T.border}`,
          fontSize: 12,
          color: T.muted,
          lineHeight: 1.65,
          fontFamily: sans,
        }}>
          {ticket.notes}
        </div>
      )}
    </div>
  );
}

// ── Filter button ─────────────────────────────────────────────────────────────
function FilterBtn({ label, active, color, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: mono,
        fontSize: 10,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: active ? color : T.dim,
        background: active ? `${color}18` : "rgba(255,255,255,0.03)",
        border: `1px solid ${active ? color + "50" : T.border}`,
        padding: "5px 12px",
        borderRadius: 20,
        cursor: "pointer",
        transition: "all 0.15s",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function TicketsPage({ accentColor = T.gold }) {
  const [statusFilter,   setStatusFilter]   = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return TICKETS.filter(t => {
      if (statusFilter   !== "all" && t.status   !== statusFilter)   return false;
      if (categoryFilter !== "all" && t.category !== categoryFilter) return false;
      if (priorityFilter !== "all" && t.priority !== priorityFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!t.title.toLowerCase().includes(q) && !t.notes?.toLowerCase().includes(q) && !t.id.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [statusFilter, categoryFilter, priorityFilter, search]);

  const counts = useMemo(() => ({
    open:        TICKETS.filter(t => t.status === "open").length,
    "in-progress": TICKETS.filter(t => t.status === "in-progress").length,
    done:        TICKETS.filter(t => t.status === "done").length,
    total:       TICKETS.length,
  }), []);

  const pctDone = Math.round((counts.done / counts.total) * 100);

  return (
    <div>
      {/* Stats bar */}
      <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
        {[
          { label: "Total",       value: counts.total,          color: T.gold },
          { label: "Open",        value: counts.open,           color: STATUS_COLOR["open"] },
          { label: "In Progress", value: counts["in-progress"], color: STATUS_COLOR["in-progress"] },
          { label: "Done",        value: counts.done,           color: STATUS_COLOR["done"] },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ background: `${color}10`, border: `1px solid ${color}30`, borderRadius: 10, padding: "10px 16px", flex: "1 1 80px", minWidth: 80 }}>
            <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color, marginBottom: 4 }}>{label}</div>
            <div style={{ fontFamily: sans, fontSize: 22, fontWeight: 700, color }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: T.dim }}>Progress</span>
          <span style={{ fontFamily: mono, fontSize: 9, color: STATUS_COLOR["done"] }}>{pctDone}% done</span>
        </div>
        <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 4 }}>
          <div style={{ height: "100%", width: `${pctDone}%`, background: `linear-gradient(90deg, ${STATUS_COLOR["done"]}, #8aba60)`, borderRadius: 4, transition: "width 0.4s ease" }} />
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search tickets…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: "100%", boxSizing: "border-box",
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${T.border}`,
          borderRadius: 8,
          color: T.cream,
          fontFamily: sans,
          fontSize: 13,
          padding: "10px 14px",
          marginBottom: 16,
          outline: "none",
        }}
        onFocus={e => e.target.style.borderColor = accentColor + "60"}
        onBlur={e => e.target.style.borderColor = T.border}
      />

      {/* Filters */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
        <FilterBtn label="All" active={statusFilter === "all"} color={T.gold} onClick={() => setStatusFilter("all")} />
        {STATUSES.map(s => (
          <FilterBtn key={s} label={STATUS_LABEL[s]} active={statusFilter === s} color={STATUS_COLOR[s]} onClick={() => setStatusFilter(s)} />
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
        <FilterBtn label="All" active={categoryFilter === "all"} color={T.gold} onClick={() => setCategoryFilter("all")} />
        {CATEGORIES.map(c => (
          <FilterBtn key={c} label={c} active={categoryFilter === c} color={CATEGORY_COLOR[c]} onClick={() => setCategoryFilter(c)} />
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 24 }}>
        <FilterBtn label="All" active={priorityFilter === "all"} color={T.gold} onClick={() => setPriorityFilter("all")} />
        {PRIORITIES.map(p => (
          <FilterBtn key={p} label={p} active={priorityFilter === p} color={PRIORITY_COLOR[p]} onClick={() => setPriorityFilter(p)} />
        ))}
      </div>

      {/* Results count */}
      <div style={{ fontFamily: mono, fontSize: 10, color: T.dim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
        {filtered.length} ticket{filtered.length !== 1 ? "s" : ""}
      </div>

      {/* Ticket list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: T.dim, fontFamily: sans, fontSize: 13 }}>No tickets match your filters.</div>
        ) : (
          filtered.map(t => <TicketRow key={t.id} ticket={t} accent={accentColor} />)
        )}
      </div>
    </div>
  );
}