"use client";

import React from "react";
import { FONTS, Icon, SAMPLE_ENTITIES, TYPE_META, type Entity, type EntityType } from "../design-system";
import type { PageId } from "../app-shell";

type Props = {
  onNavigate: (p: PageId) => void;
  onOpenEntity: (id: string) => void;
};

function FacetGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: "var(--bkb-text)", marginBottom: 8, letterSpacing: "-0.005em" }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function FacetCheck({
  active,
  onClick,
  color,
  children,
  radio,
}: {
  active: boolean;
  onClick?: () => void;
  color?: string;
  children: React.ReactNode;
  radio?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        width: "100%",
        textAlign: "left",
        border: "none",
        background: "transparent",
        padding: "5px 6px",
        borderRadius: 4,
        cursor: "pointer",
        fontSize: 12,
        color: active ? "var(--bkb-text)" : "var(--bkb-textMuted)",
        fontFamily: FONTS.body,
      }}
    >
      <span
        style={{
          width: 13,
          height: 13,
          borderRadius: radio ? 999 : 3,
          border: `1.5px solid ${active ? color || "var(--bkb-primary)" : "var(--bkb-borderStrong)"}`,
          background: active ? color || "var(--bkb-primary)" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {active && !radio && <Icon name="check" size={9} style={{ color: "white" }} />}
        {active && radio && <span style={{ width: 5, height: 5, borderRadius: 999, background: "white" }} />}
      </span>
      {children}
    </button>
  );
}

function EntityRow({
  entity,
  selected,
  onClick,
  onOpen,
}: {
  entity: Entity;
  selected: boolean;
  onClick: () => void;
  onOpen: () => void;
}) {
  const meta = TYPE_META[entity.type];
  return (
    <div
      onClick={onClick}
      className="bkb-hover-row"
      style={{
        display: "grid",
        gridTemplateColumns: "28px 1fr auto auto",
        gap: 14,
        alignItems: "center",
        padding: "14px 28px",
        borderBottom: "1px solid var(--bkb-border)",
        cursor: "pointer",
        background: selected ? "var(--bkb-surfaceAlt)" : "transparent",
        borderLeft: selected ? `3px solid ${meta.color}` : "3px solid transparent",
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 6,
          background: "var(--bkb-surface)",
          border: `1px solid ${meta.color}`,
          color: meta.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name={meta.icon} size={14} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: "var(--bkb-text)" }}>{entity.name}</span>
          <span className="bkb-mono" style={{ fontSize: 11, color: "var(--bkb-textSubtle)" }}>
            bkb:{entity.type}/{entity.id}
          </span>
        </div>
        <div
          style={{
            fontSize: 12,
            color: "var(--bkb-textMuted)",
            marginTop: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {entity.desc}
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, fontSize: 11, color: "var(--bkb-textMuted)" }}>
        {entity.evidence > 0 && (
          <span>
            <b style={{ color: "var(--bkb-evidence)" }}>{entity.evidence}</b> ev.
          </span>
        )}
        {entity.pubs > 0 && (
          <span>
            <b style={{ color: "var(--bkb-publication)" }}>{entity.pubs}</b> pub.
          </span>
        )}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
        className="bkb-btn bkb-btn-ghost"
        style={{ padding: "4px 10px", fontSize: 11 }}
      >
        Open <Icon name="arrow" size={11} />
      </button>
    </div>
  );
}

function GraphView({
  onSelect,
  selected,
}: {
  onSelect: (id: string) => void;
  selected: string;
}) {
  const nodes: { id: string; x: number; y: number; r: number; type: EntityType; label: string }[] = [
    { id: "PV-interneuron-CA1", x: 400, y: 200, r: 22, type: "agent", label: "PV+ int. CA1" },
    { id: "hippocampus-CA1", x: 240, y: 140, r: 20, type: "agent", label: "CA1" },
    { id: "dopaminergic-V1", x: 580, y: 140, r: 18, type: "agent", label: "DA/V1" },
    { id: "patch-seq-2023", x: 220, y: 300, r: 17, type: "evidence", label: "Patch-seq" },
    { id: "optogenetics-chr2", x: 580, y: 320, r: 17, type: "evidence", label: "ChR2" },
    { id: "kepecs-2014", x: 340, y: 380, r: 14, type: "pub", label: "Kepecs 14" },
    { id: "pelkey-2017", x: 480, y: 400, r: 14, type: "pub", label: "Pelkey 17" },
    { id: "allen-brain-atlas", x: 120, y: 220, r: 15, type: "project", label: "Allen Atlas" },
    { id: "brain-initiative", x: 700, y: 220, r: 15, type: "project", label: "BRAIN" },
    { id: "elena-michaels", x: 400, y: 70, r: 12, type: "person", label: "E. Michaels" },
  ];
  const edges: [string, string][] = [
    ["PV-interneuron-CA1", "hippocampus-CA1"],
    ["PV-interneuron-CA1", "patch-seq-2023"],
    ["PV-interneuron-CA1", "kepecs-2014"],
    ["PV-interneuron-CA1", "pelkey-2017"],
    ["PV-interneuron-CA1", "optogenetics-chr2"],
    ["hippocampus-CA1", "allen-brain-atlas"],
    ["dopaminergic-V1", "optogenetics-chr2"],
    ["dopaminergic-V1", "brain-initiative"],
    ["patch-seq-2023", "allen-brain-atlas"],
    ["elena-michaels", "PV-interneuron-CA1"],
    ["elena-michaels", "brain-initiative"],
    ["kepecs-2014", "hippocampus-CA1"],
  ];
  return (
    <div style={{ height: "100%", minHeight: 600, position: "relative" }} className="bkb-dot-grid">
      <svg viewBox="0 0 820 460" style={{ width: "100%", height: "100%", display: "block" }}>
        {edges.map(([a, b], i) => {
          const na = nodes.find((n) => n.id === a)!;
          const nb = nodes.find((n) => n.id === b)!;
          const active = selected === a || selected === b;
          return (
            <line
              key={i}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke={active ? "var(--bkb-primary)" : "var(--bkb-borderStrong)"}
              strokeWidth={active ? 1.5 : 1}
              opacity={active ? 0.9 : 0.4}
            />
          );
        })}
        {nodes.map((n) => {
          const meta = TYPE_META[n.type];
          const active = selected === n.id;
          return (
            <g key={n.id} onClick={() => onSelect(n.id)} style={{ cursor: "pointer" }}>
              <circle cx={n.x} cy={n.y} r={n.r + 6} fill={meta.color} opacity={active ? 0.25 : 0.12} />
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill="var(--bkb-surface)"
                stroke={meta.color}
                strokeWidth={active ? 2.5 : 1.5}
              />
              <text
                x={n.x}
                y={n.y + n.r + 14}
                textAnchor="middle"
                fontSize="11"
                fontFamily={FONTS.body}
                fill="var(--bkb-text)"
                fontWeight={active ? 600 : 400}
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          background: "var(--bkb-surface)",
          border: "1px solid var(--bkb-border)",
          borderRadius: 8,
          padding: 12,
          fontSize: 11,
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Legend</div>
        {(Object.entries(TYPE_META) as [EntityType, (typeof TYPE_META)[EntityType]][]).map(([t, m]) => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ width: 10, height: 10, borderRadius: 999, background: m.color }} />
            <span style={{ color: "var(--bkb-textMuted)" }}>{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PanelStat({ n, l, c }: { n: number; l: string; c: string }) {
  return (
    <div style={{ background: "var(--bkb-surface)", padding: "12px 14px" }}>
      <div style={{ fontFamily: FONTS.display, fontSize: 24, letterSpacing: "-0.015em", color: c, fontWeight: 400 }}>
        {n}
      </div>
      <div style={{ fontSize: 10, color: "var(--bkb-textMuted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
        {l}
      </div>
    </div>
  );
}

function EntitySidePanel({ entity, onOpen }: { entity?: Entity; onOpen: () => void }) {
  if (!entity) return null;
  const meta = TYPE_META[entity.type];
  const links: { id: string; type: EntityType; rel: string }[] = [
    { id: "hippocampus-CA1", type: "agent", rel: "locatedIn" },
    { id: "patch-seq-2023", type: "evidence", rel: "measuredBy" },
    { id: "kepecs-2014", type: "pub", rel: "citedIn" },
    { id: "pelkey-2017", type: "pub", rel: "citedIn" },
    { id: "optogenetics-chr2", type: "evidence", rel: "probedWith" },
  ];
  return (
    <div style={{ padding: "24px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <span className="bkb-chip" style={{ borderColor: meta.color, color: meta.color, background: "transparent" }}>
          <Icon name={meta.icon} size={11} /> {meta.label}
        </span>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--bkb-textSubtle)" }}>Updated {entity.updated}</span>
      </div>
      <h2
        style={{
          fontFamily: FONTS.display,
          fontSize: 24,
          margin: "0 0 4px",
          letterSpacing: "-0.015em",
          fontWeight: 400,
        }}
      >
        {entity.name}
      </h2>
      <div className="bkb-mono" style={{ fontSize: 11, color: "var(--bkb-textSubtle)", marginBottom: 12 }}>
        bkb:{entity.type}/{entity.id}
      </div>
      <p style={{ fontSize: 13, color: "var(--bkb-textMuted)", lineHeight: 1.55, margin: "0 0 20px" }}>{entity.desc}</p>

      <button
        onClick={onOpen}
        className="bkb-btn bkb-btn-primary"
        style={{ width: "100%", justifyContent: "center" }}
      >
        Open detail page <Icon name="arrow" size={13} />
      </button>

      <div
        style={{
          marginTop: 24,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 1,
          background: "var(--bkb-border)",
          border: "1px solid var(--bkb-border)",
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        <PanelStat n={entity.evidence} l="Evidence" c="var(--bkb-evidence)" />
        <PanelStat n={entity.pubs} l="Publications" c="var(--bkb-publication)" />
      </div>

      <div
        style={{
          marginTop: 24,
          fontSize: 11,
          color: "var(--bkb-textSubtle)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        Linked entities (8)
      </div>
      {links.map((l, i) => {
        const lmeta = TYPE_META[l.type];
        const target = SAMPLE_ENTITIES.find((e) => e.id === l.id);
        return (
          <div
            key={i}
            style={{
              padding: "10px 0",
              borderBottom: "1px solid var(--bkb-border)",
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: 999, background: lmeta.color }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, color: "var(--bkb-textSubtle)", fontFamily: FONTS.mono }}>{l.rel}</div>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--bkb-text)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {target?.name || l.id}
              </div>
            </div>
          </div>
        );
      })}

      <div
        style={{
          marginTop: 24,
          fontSize: 11,
          color: "var(--bkb-textSubtle)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        SPARQL
      </div>
      <div
        className="bkb-mono"
        style={{
          fontSize: 11,
          background: "var(--bkb-surfaceAlt)",
          padding: 12,
          borderRadius: 6,
          border: "1px solid var(--bkb-border)",
          color: "var(--bkb-textMuted)",
          lineHeight: 1.6,
          whiteSpace: "pre-wrap",
        }}
      >
        {`SELECT ?o ?p WHERE {
  bkb:${entity.id} ?p ?o .
} LIMIT 50`}
      </div>
    </div>
  );
}

export function Explorer({ onNavigate, onOpenEntity }: Props) {
  const [query, setQuery] = React.useState("");
  const [activeTypes, setActiveTypes] = React.useState<Set<EntityType>>(
    new Set(["agent", "evidence", "pub", "project", "person"]),
  );
  const [selected, setSelected] = React.useState("PV-interneuron-CA1");
  const [view, setView] = React.useState<"list" | "graph">("list");

  const toggle = (t: EntityType) => {
    const next = new Set(activeTypes);
    if (next.has(t)) next.delete(t);
    else next.add(t);
    setActiveTypes(next);
  };

  const filtered = SAMPLE_ENTITIES.filter(
    (e) =>
      activeTypes.has(e.type) &&
      (!query || e.name.toLowerCase().includes(query.toLowerCase()) || e.desc.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(220px, 240px) minmax(0, 1fr) minmax(300px, 340px)",
        minHeight: "calc(100vh - 56px)",
        background: "var(--bkb-bg)",
      }}
    >
      <div style={{ borderRight: "1px solid var(--bkb-border)", padding: "24px 20px", background: "var(--bkb-surface)" }}>
        <div
          style={{
            fontSize: 11,
            color: "var(--bkb-textSubtle)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Filters
        </div>

        <FacetGroup title="Entity type">
          {(Object.entries(TYPE_META) as [EntityType, (typeof TYPE_META)[EntityType]][]).map(([t, m]) => (
            <FacetCheck key={t} active={activeTypes.has(t)} onClick={() => toggle(t)} color={m.color}>
              <Icon name={m.icon} size={13} /> {m.label}
              <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--bkb-textSubtle)" }}>
                {SAMPLE_ENTITIES.filter((e) => e.type === t).length}
              </span>
            </FacetCheck>
          ))}
        </FacetGroup>

        <FacetGroup title="Evidence level">
          {["High (>20 sources)", "Medium (5-20)", "Low (<5)", "Unverified"].map((l, i) => (
            <FacetCheck key={l} active={i < 2}>
              {l}
            </FacetCheck>
          ))}
        </FacetGroup>

        <FacetGroup title="Ontology">
          {["UBERON", "NCBI Gene", "MeSH", "NIMH CDE", "OBI"].map((o) => (
            <FacetCheck key={o} active={false}>
              {o}
            </FacetCheck>
          ))}
        </FacetGroup>

        <FacetGroup title="Updated">
          {["Last 24h", "Last week", "Last month", "Last year"].map((l, i) => (
            <FacetCheck key={l} active={i === 1} radio>
              {l}
            </FacetCheck>
          ))}
        </FacetGroup>
      </div>

      <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div style={{ padding: "20px 28px 0", borderBottom: "1px solid var(--bkb-border)", background: "var(--bkb-surface)" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              color: "var(--bkb-textMuted)",
              marginBottom: 12,
            }}
          >
            <span style={{ cursor: "pointer" }} onClick={() => onNavigate("home")}>
              BrainKB
            </span>
            <Icon name="chevron" size={12} />
            <span style={{ color: "var(--bkb-text)" }}>Explorer</span>
          </div>
          <h1
            style={{
              fontFamily: FONTS.display,
              fontSize: 34,
              margin: "0 0 4px",
              letterSpacing: "-0.02em",
              fontWeight: 400,
            }}
          >
            Knowledge Graph Explorer
          </h1>
          <div style={{ fontSize: 13, color: "var(--bkb-textMuted)", marginBottom: 20 }}>
            Browse agents, evidence, publications and projects across the unified graph.
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16 }}>
            <div style={{ flex: 1, position: "relative" }}>
              <Icon
                name="search"
                size={15}
                style={{ position: "absolute", left: 12, top: 11, color: "var(--bkb-textSubtle)" }}
              />
              <input
                className="bkb-input"
                placeholder="Search entities, assertions, SPARQL…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ paddingLeft: 36 }}
              />
            </div>
            <button className="bkb-btn bkb-btn-ghost">
              <Icon name="filter" size={13} /> Advanced
            </button>
            <div style={{ display: "flex", border: "1px solid var(--bkb-border)", borderRadius: 6, overflow: "hidden" }}>
              <button
                onClick={() => setView("list")}
                style={{
                  padding: "7px 12px",
                  fontSize: 12,
                  border: "none",
                  background: view === "list" ? "var(--bkb-surfaceAlt)" : "transparent",
                  cursor: "pointer",
                  color: view === "list" ? "var(--bkb-text)" : "var(--bkb-textMuted)",
                  fontFamily: FONTS.body,
                  fontWeight: view === "list" ? 500 : 400,
                }}
              >
                List
              </button>
              <button
                onClick={() => setView("graph")}
                style={{
                  padding: "7px 12px",
                  fontSize: 12,
                  border: "none",
                  borderLeft: "1px solid var(--bkb-border)",
                  background: view === "graph" ? "var(--bkb-surfaceAlt)" : "transparent",
                  cursor: "pointer",
                  color: view === "graph" ? "var(--bkb-text)" : "var(--bkb-textMuted)",
                  fontFamily: FONTS.body,
                  fontWeight: view === "graph" ? 500 : 400,
                }}
              >
                Graph
              </button>
            </div>
          </div>

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", paddingBottom: 14 }}>
            {Array.from(activeTypes).map((t) => (
              <span
                key={t}
                className="bkb-chip"
                style={{ borderColor: TYPE_META[t].color, color: TYPE_META[t].color, background: "transparent" }}
              >
                {TYPE_META[t].label}
                <span onClick={() => toggle(t)} style={{ cursor: "pointer", opacity: 0.7 }}>
                  <Icon name="x" size={10} />
                </span>
              </span>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflow: "auto", background: "var(--bkb-bg)" }} className="bkb-scroll">
          {view === "list" ? (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "14px 28px",
                  fontSize: 12,
                  color: "var(--bkb-textMuted)",
                }}
              >
                <span>
                  <b style={{ color: "var(--bkb-text)" }}>{filtered.length}</b> of {SAMPLE_ENTITIES.length} entities
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                  <Icon name="sort" size={12} /> Sort: Most linked
                </span>
              </div>
              {filtered.map((e) => (
                <EntityRow
                  key={e.id}
                  entity={e}
                  selected={selected === e.id}
                  onClick={() => setSelected(e.id)}
                  onOpen={() => onOpenEntity(e.id)}
                />
              ))}
            </div>
          ) : (
            <GraphView onSelect={setSelected} selected={selected} />
          )}
        </div>
      </div>

      <div
        style={{ borderLeft: "1px solid var(--bkb-border)", background: "var(--bkb-surface)", overflow: "auto" }}
        className="bkb-scroll"
      >
        <EntitySidePanel
          entity={SAMPLE_ENTITIES.find((e) => e.id === selected)}
          onOpen={() => onOpenEntity(selected)}
        />
      </div>
    </div>
  );
}
