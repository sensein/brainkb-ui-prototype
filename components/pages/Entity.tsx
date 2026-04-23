"use client";

import React from "react";
import { FONTS, Icon, SAMPLE_ENTITIES, TYPE_META, type Entity as EntityT } from "../design-system";
import type { PageId } from "../app-shell";
import { ConfBar } from "./shared";

type Props = {
  entityId?: string;
  onNavigate: (p: PageId) => void;
  onOpenEntity: (id: string) => void;
};

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 14 }}>
        <h2
          style={{
            fontFamily: FONTS.display,
            fontSize: 22,
            margin: 0,
            letterSpacing: "-0.01em",
            fontWeight: 400,
          }}
        >
          {title}
        </h2>
        {hint && <div style={{ fontSize: 12, color: "var(--bkb-textSubtle)" }}>{hint}</div>}
      </div>
      {children}
    </div>
  );
}

function AssertionRow({ a, last }: { a: { p: string; o: string; src: string; conf: number }; last: boolean }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto auto",
        gap: 16,
        alignItems: "center",
        padding: "14px 18px",
        borderBottom: last ? "none" : "1px solid var(--bkb-border)",
      }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
          <span className="bkb-mono" style={{ color: "var(--bkb-textMuted)", fontSize: 12 }}>
            {a.p}
          </span>
          <Icon name="arrow" size={11} style={{ color: "var(--bkb-textSubtle)" }} />
          <span style={{ color: "var(--bkb-text)", fontWeight: 500 }}>{a.o}</span>
        </div>
        <div style={{ fontSize: 11, color: "var(--bkb-textSubtle)", marginTop: 4 }}>
          Extracted by <b style={{ color: "var(--bkb-agent)" }}>llm-extract-v2</b> · Reviewed by <b>E. Michaels</b>
        </div>
      </div>
      <div style={{ fontSize: 11, color: "var(--bkb-publication)", fontStyle: "italic" }}>{a.src}</div>
      <ConfBar v={a.conf} />
    </div>
  );
}

function EvidenceTimeline() {
  const data = [2, 4, 3, 7, 5, 9, 12, 8, 14, 18, 15, 22, 19, 25, 23, 28, 31, 29, 35, 38, 34, 41, 44, 47];
  const max = Math.max(...data);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "end", gap: 3, height: 100, marginBottom: 10 }}>
        {data.map((v, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${(v / max) * 100}%`,
              background: "var(--bkb-evidence)",
              opacity: 0.25 + (i / data.length) * 0.75,
              borderRadius: "2px 2px 0 0",
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--bkb-textSubtle)" }}>
        <span>2020</span>
        <span>2022</span>
        <span>2024</span>
        <span>2026</span>
      </div>
    </div>
  );
}

function OverviewTab({ onOpenEntity }: { entity: EntityT; onOpenEntity: (id: string) => void }) {
  const top = [
    { p: "expressesMarker", o: "Parvalbumin (PV)", src: "Kepecs 2014", conf: 0.98 },
    { p: "locatedIn", o: "stratum pyramidale", src: "Pelkey 2017", conf: 0.96 },
    { p: "firingRateRange", o: "40–200 Hz", src: "Hu 2014", conf: 0.94 },
    { p: "inhibitoryTarget", o: "CA1 pyramidal neurons", src: "Pelkey 2017", conf: 0.92 },
    { p: "channelExpression", o: "Kv3.1, Kv3.2", src: "Rudy 1999", conf: 0.89 },
  ];
  const links: { id: string }[] = [
    { id: "hippocampus-CA1" },
    { id: "patch-seq-2023" },
    { id: "kepecs-2014" },
    { id: "pelkey-2017" },
    { id: "allen-brain-atlas" },
    { id: "optogenetics-chr2" },
  ];
  return (
    <div>
      <Section title="Top assertions" hint="Highest-confidence claims">
        <div className="bkb-card">
          {top.map((a, i) => (
            <AssertionRow key={i} a={a} last={i === 4} />
          ))}
        </div>
      </Section>

      <Section title="Cross-linked entities" hint="Follow the thread">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {links.map((l) => {
            const e = SAMPLE_ENTITIES.find((x) => x.id === l.id);
            if (!e) return null;
            const m = TYPE_META[e.type];
            return (
              <button
                key={l.id}
                onClick={() => onOpenEntity(l.id)}
                className="bkb-card"
                style={{
                  padding: 14,
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: FONTS.body,
                  borderLeft: `3px solid ${m.color}`,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: m.color,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  {m.label}
                </div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--bkb-text)", marginBottom: 3 }}>{e.name}</div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--bkb-textMuted)",
                    lineHeight: 1.4,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {e.desc}
                </div>
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Evidence timeline" hint="Assertions over time">
        <div className="bkb-card" style={{ padding: 20 }}>
          <EvidenceTimeline />
        </div>
      </Section>
    </div>
  );
}

function AssertionsTab() {
  const items = [
    { p: "expressesMarker", o: "Parvalbumin (PV)", src: "Kepecs 2014", conf: 0.98 },
    { p: "expressesMarker", o: "Calbindin (CB)", src: "Gulyás 1999", conf: 0.62, disputed: true },
    { p: "locatedIn", o: "stratum pyramidale", src: "Pelkey 2017", conf: 0.96 },
    { p: "locatedIn", o: "stratum oriens", src: "Klausberger 2003", conf: 0.84 },
    { p: "firingRateRange", o: "40–200 Hz", src: "Hu 2014", conf: 0.94 },
    { p: "firingRateRange", o: "100-500 Hz (burst)", src: "Bartos 2007", conf: 0.78 },
    { p: "inhibitoryTarget", o: "CA1 pyramidal neurons", src: "Pelkey 2017", conf: 0.92 },
    { p: "channelExpression", o: "Kv3.1, Kv3.2", src: "Rudy 1999", conf: 0.89 },
    { p: "synapticInputFrom", o: "CA3 Schaffer collaterals", src: "Gulyás 2010", conf: 0.81 },
    { p: "developmentalOrigin", o: "MGE (medial ganglionic eminence)", src: "Xu 2008", conf: 0.95 },
  ];
  return (
    <Section title="All assertions" hint={`${items.length} of 47 · filtered by confidence > 0.5`}>
      <div className="bkb-card">
        {items.map((a, i) => (
          <div
            key={i}
            style={{
              padding: "14px 18px",
              borderBottom: i < items.length - 1 ? "1px solid var(--bkb-border)" : "none",
              display: "grid",
              gridTemplateColumns: "1fr auto auto",
              gap: 16,
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
                <span className="bkb-mono" style={{ color: "var(--bkb-textMuted)", fontSize: 12 }}>
                  {a.p}
                </span>
                <Icon name="arrow" size={11} style={{ color: "var(--bkb-textSubtle)" }} />
                <span style={{ color: "var(--bkb-text)", fontWeight: 500 }}>{a.o}</span>
                {a.disputed && (
                  <span
                    className="bkb-chip"
                    style={{
                      borderColor: "var(--bkb-danger)",
                      color: "var(--bkb-danger)",
                      fontSize: 10,
                    }}
                  >
                    disputed
                  </span>
                )}
              </div>
              <div style={{ fontSize: 11, color: "var(--bkb-textSubtle)", marginTop: 4 }}>
                via <b style={{ color: "var(--bkb-agent)" }}>llm-extract-v2</b> · {a.src}
              </div>
            </div>
            <div style={{ fontSize: 11, color: "var(--bkb-textMuted)" }}>3 sources</div>
            <ConfBar v={a.conf} />
          </div>
        ))}
      </div>
    </Section>
  );
}

function EvidenceTab() {
  return (
    <Section title="Evidence sources" hint="Protocols, datasets, and methods referencing this entity">
      <div style={{ display: "grid", gap: 12 }}>
        {[
          { name: "Patch-seq v3 protocol", type: "Protocol", refs: 34 },
          { name: "Allen Mouse Brain Atlas ISH dataset", type: "Dataset", refs: 28 },
          { name: "Optogenetics — ChR2 activation", type: "Method", refs: 19 },
          { name: "Single-cell RNA-seq (MouseLight)", type: "Dataset", refs: 12 },
        ].map((e) => (
          <div key={e.name} className="bkb-card" style={{ padding: 16, display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 6,
                background: "var(--bkb-surfaceAlt)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--bkb-evidence)",
              }}
            >
              <Icon name="evidence" size={18} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{e.name}</div>
              <div style={{ fontSize: 12, color: "var(--bkb-textMuted)" }}>
                {e.type} · {e.refs} references
              </div>
            </div>
            <button className="bkb-btn bkb-btn-ghost">
              Open <Icon name="arrow" size={12} />
            </button>
          </div>
        ))}
      </div>
    </Section>
  );
}

function PublicationsTab() {
  return (
    <Section title="Citing publications" hint="23 papers reference this entity">
      <div style={{ display: "grid", gap: 12 }}>
        {[
          { t: "Interneuron cell types are fit to function", a: "Kepecs A, Fishell G", j: "Nature", y: 2014, refs: 12 },
          { t: "Hippocampal GABAergic inhibitory interneurons", a: "Pelkey KA, et al.", j: "Physiol Rev", y: 2017, refs: 8 },
          { t: "Interneurons of the hippocampus", a: "Freund TF, Buzsáki G", j: "Hippocampus", y: 1996, refs: 6 },
          { t: "Fast-spiking, parvalbumin⁺ GABAergic interneurons", a: "Hu H, Gan J, Jonas P", j: "Science", y: 2014, refs: 9 },
        ].map((p) => (
          <div
            key={p.t}
            className="bkb-card"
            style={{ padding: 18, borderLeft: "3px solid var(--bkb-publication)" }}
          >
            <div
              style={{
                fontFamily: FONTS.display,
                fontSize: 18,
                lineHeight: 1.25,
                marginBottom: 6,
                letterSpacing: "-0.01em",
              }}
            >
              {p.t}
            </div>
            <div style={{ fontSize: 12, color: "var(--bkb-textMuted)", marginBottom: 10 }}>
              {p.a} · <i>{p.j}</i> · {p.y}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <span className="bkb-chip">{p.refs} assertions extracted</span>
              <span className="bkb-chip">Peer-reviewed</span>
              <button className="bkb-btn bkb-btn-ghost" style={{ marginLeft: "auto", padding: "4px 10px", fontSize: 11 }}>
                View paper
              </button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function GraphTab() {
  return (
    <Section title="Local subgraph" hint="2-hop neighborhood">
      <div className="bkb-card bkb-dot-grid" style={{ height: 460, position: "relative" }}>
        <svg viewBox="0 0 640 440" style={{ width: "100%", height: "100%" }}>
          <circle cx="320" cy="220" r="28" fill="var(--bkb-agent)" opacity="0.2" />
          <circle cx="320" cy="220" r="22" fill="var(--bkb-surface)" stroke="var(--bkb-agent)" strokeWidth="2.5" />
          <text x="320" y="224" textAnchor="middle" fontSize="11" fontFamily={FONTS.body} fontWeight="600">
            PV+ int.
          </text>
          {[
            { x: 140, y: 100, c: "var(--bkb-agent)", l: "CA1" },
            { x: 500, y: 100, c: "var(--bkb-evidence)", l: "Patch-seq" },
            { x: 120, y: 300, c: "var(--bkb-publication)", l: "Kepecs 14" },
            { x: 180, y: 380, c: "var(--bkb-publication)", l: "Pelkey 17" },
            { x: 540, y: 320, c: "var(--bkb-evidence)", l: "ChR2" },
            { x: 460, y: 380, c: "var(--bkb-primary)", l: "Allen" },
          ].map((n, i) => (
            <g key={i}>
              <line
                x1="320"
                y1="220"
                x2={n.x}
                y2={n.y}
                stroke="var(--bkb-borderStrong)"
                strokeWidth="1"
                opacity="0.5"
              />
              <circle cx={n.x} cy={n.y} r="16" fill="var(--bkb-surface)" stroke={n.c} strokeWidth="1.5" />
              <text x={n.x} y={n.y + 30} textAnchor="middle" fontSize="10" fill="var(--bkb-text)">
                {n.l}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </Section>
  );
}

function HistoryTab() {
  const rows = [
    { d: "2 days ago", u: "E. Michaels", a: "Added assertion", det: "channelExpression → Kv3.1, Kv3.2" },
    { d: "5 days ago", u: "llm-extract-v2", a: "Proposed", det: "3 new assertions from Pelkey 2017" },
    { d: "1 week ago", u: "J. Rinaldi", a: "Merged", det: "synapticInputFrom (consolidated 4 duplicates)" },
    { d: "2 weeks ago", u: "System", a: "Ontology update", det: "Aligned to UBERON 2026-Q1" },
  ];
  return (
    <Section title="Revision history">
      <div className="bkb-card">
        {rows.map((h, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 16,
              padding: 16,
              borderBottom: i < rows.length - 1 ? "1px solid var(--bkb-border)" : "none",
            }}
          >
            <div style={{ fontSize: 11, color: "var(--bkb-textSubtle)", width: 90, flexShrink: 0 }}>{h.d}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13 }}>
                <b>{h.u}</b> <span style={{ color: "var(--bkb-textMuted)" }}>{h.a.toLowerCase()}</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--bkb-textMuted)", fontFamily: FONTS.mono, marginTop: 2 }}>
                {h.det}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function DetailSidebar() {
  return (
    <aside>
      <div className="bkb-card" style={{ padding: 18, marginBottom: 16 }}>
        <div
          style={{
            fontSize: 11,
            color: "var(--bkb-textSubtle)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          Identifiers
        </div>
        {[
          { k: "BrainKB", v: "bkb:agent/PV-interneuron-CA1" },
          { k: "UBERON", v: "UBERON:0003881" },
          { k: "MeSH", v: "D017966" },
          { k: "NIMH CDE", v: "ND-0042" },
        ].map((id) => (
          <div key={id.k} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 12 }}>
            <span style={{ color: "var(--bkb-textMuted)" }}>{id.k}</span>
            <span className="bkb-mono" style={{ color: "var(--bkb-text)", fontSize: 11 }}>
              {id.v}
            </span>
          </div>
        ))}
      </div>

      <div className="bkb-card" style={{ padding: 18, marginBottom: 16 }}>
        <div
          style={{
            fontSize: 11,
            color: "var(--bkb-textSubtle)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          Contributors
        </div>
        {["E. Michaels", "J. Rinaldi", "llm-extract-v2", "D. Park"].map((n) => (
          <div key={n} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", fontSize: 12 }}>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 999,
                background: "var(--bkb-surfaceAlt)",
                border: "1px solid var(--bkb-border)",
                fontSize: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--bkb-textMuted)",
              }}
            >
              {n
                .split(/[ -]/)
                .map((x) => x[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>
            <span>{n}</span>
          </div>
        ))}
      </div>

      <div className="bkb-card" style={{ padding: 18 }}>
        <div
          style={{
            fontSize: 11,
            color: "var(--bkb-textSubtle)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          Cite this entity
        </div>
        <div
          className="bkb-mono"
          style={{
            fontSize: 11,
            background: "var(--bkb-surfaceAlt)",
            padding: 10,
            borderRadius: 5,
            color: "var(--bkb-textMuted)",
            lineHeight: 1.5,
          }}
        >
          BrainKB (2026). PV+ interneuron (CA1). bkb:agent/PV-interneuron-CA1
        </div>
        <button
          className="bkb-btn bkb-btn-ghost"
          style={{ width: "100%", justifyContent: "center", marginTop: 10, fontSize: 11 }}
        >
          <Icon name="copy" size={12} /> Copy BibTeX
        </button>
      </div>
    </aside>
  );
}

export function EntityDetail({ entityId = "PV-interneuron-CA1", onNavigate, onOpenEntity }: Props) {
  const entity = SAMPLE_ENTITIES.find((e) => e.id === entityId) || SAMPLE_ENTITIES[0];
  const meta = TYPE_META[entity.type];
  const [tab, setTab] = React.useState("overview");

  const stats = [
    { n: entity.evidence, l: "Evidence assertions", c: "var(--bkb-evidence)" },
    { n: entity.pubs, l: "Publications", c: "var(--bkb-publication)" },
    { n: 8, l: "Linked agents", c: "var(--bkb-agent)" },
    { n: 12, l: "Projects", c: "var(--bkb-primary)" },
    { n: 4, l: "Contributing curators", c: "var(--bkb-textMuted)" },
  ];

  const tabs = [
    { id: "overview", l: "Overview" },
    { id: "assertions", l: "Assertions", n: entity.evidence },
    { id: "evidence", l: "Evidence", n: entity.evidence },
    { id: "publications", l: "Publications", n: entity.pubs },
    { id: "graph", l: "Graph" },
    { id: "history", l: "History" },
  ];

  return (
    <div style={{ minHeight: "100%", background: "var(--bkb-bg)" }}>
      <div style={{ background: "var(--bkb-surface)", borderBottom: "1px solid var(--bkb-border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 32px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              color: "var(--bkb-textMuted)",
              marginBottom: 16,
            }}
          >
            <span style={{ cursor: "pointer" }} onClick={() => onNavigate("home")}>
              BrainKB
            </span>
            <Icon name="chevron" size={11} />
            <span style={{ cursor: "pointer" }} onClick={() => onNavigate("explorer")}>
              Explorer
            </span>
            <Icon name="chevron" size={11} />
            <span style={{ color: "var(--bkb-text)" }}>{meta.label}s</span>
            <Icon name="chevron" size={11} />
            <span style={{ color: "var(--bkb-text)" }}>{entity.name}</span>
          </div>
          <div style={{ display: "flex", alignItems: "start", gap: 24 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span
                  className="bkb-chip"
                  style={{ borderColor: meta.color, color: meta.color, background: "transparent" }}
                >
                  <Icon name={meta.icon} size={11} /> {meta.label}
                </span>
                <span className="bkb-chip">
                  <span className="bkb-pulse-dot" /> Live · {entity.updated}
                </span>
                <span className="bkb-mono" style={{ fontSize: 11, color: "var(--bkb-textSubtle)" }}>
                  bkb:{entity.type}/{entity.id}
                </span>
              </div>
              <h1
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 48,
                  margin: "0 0 10px",
                  letterSpacing: "-0.02em",
                  fontWeight: 400,
                }}
              >
                {entity.name}
              </h1>
              <p style={{ fontSize: 15, color: "var(--bkb-textMuted)", lineHeight: 1.55, margin: 0, maxWidth: 720 }}>
                {entity.desc}. A canonical entry in the BrainKB agent ontology, cross-referenced with UBERON, NIMH
                CDE, and the Allen Brain Atlas.
              </p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="bkb-btn bkb-btn-ghost">
                <Icon name="bookmark" size={13} /> Save
              </button>
              <button className="bkb-btn bkb-btn-ghost">
                <Icon name="copy" size={13} /> Cite
              </button>
              <button className="bkb-btn bkb-btn-primary">
                <Icon name="sparkle" size={13} /> Query with agent
              </button>
            </div>
          </div>

          <div
            style={{
              marginTop: 28,
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 1,
              background: "var(--bkb-border)",
              border: "1px solid var(--bkb-border)",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            {stats.map((s) => (
              <div key={s.l} style={{ background: "var(--bkb-surface)", padding: "16px 20px" }}>
                <div
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 30,
                    letterSpacing: "-0.02em",
                    color: s.c,
                    fontWeight: 400,
                  }}
                >
                  {s.n}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--bkb-textMuted)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 2, marginTop: 24, marginBottom: -1 }}>
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  padding: "10px 16px",
                  border: "none",
                  background: "transparent",
                  color: tab === t.id ? "var(--bkb-text)" : "var(--bkb-textMuted)",
                  borderBottom: `2px solid ${tab === t.id ? "var(--bkb-primary)" : "transparent"}`,
                  fontSize: 13,
                  fontWeight: tab === t.id ? 500 : 400,
                  cursor: "pointer",
                  fontFamily: FONTS.body,
                }}
              >
                {t.l}{" "}
                {t.n !== undefined && (
                  <span style={{ color: "var(--bkb-textSubtle)", fontSize: 11, marginLeft: 4 }}>{t.n}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "32px",
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          gap: 32,
        }}
      >
        <div>
          {tab === "overview" && <OverviewTab entity={entity} onOpenEntity={onOpenEntity} />}
          {tab === "assertions" && <AssertionsTab />}
          {tab === "evidence" && <EvidenceTab />}
          {tab === "publications" && <PublicationsTab />}
          {tab === "graph" && <GraphTab />}
          {tab === "history" && <HistoryTab />}
        </div>
        <DetailSidebar />
      </div>
    </div>
  );
}
