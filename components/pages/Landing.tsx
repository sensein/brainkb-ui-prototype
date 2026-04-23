"use client";

import React from "react";
import { FONTS, Icon, Logo } from "../design-system";
import type { PageId } from "../app-shell";

type NavProps = { onNavigate: (p: PageId) => void };

function FloatingGraph() {
  const nodes = [
    { x: 180, y: 60, r: 7, c: "oklch(0.78 0.13 170)", label: "Agent" },
    { x: 80, y: 130, r: 5, c: "oklch(0.80 0.13 285)", label: "" },
    { x: 280, y: 130, r: 6, c: "oklch(0.82 0.12 75)", label: "Pub" },
    { x: 120, y: 230, r: 5, c: "oklch(0.78 0.13 170)", label: "" },
    { x: 220, y: 240, r: 7, c: "oklch(0.80 0.13 285)", label: "Evidence" },
    { x: 180, y: 310, r: 5, c: "oklch(0.82 0.12 75)", label: "" },
    { x: 40, y: 260, r: 4, c: "oklch(0.78 0.13 170)", label: "" },
    { x: 320, y: 60, r: 4, c: "oklch(0.82 0.12 75)", label: "" },
  ];
  const edges: [number, number][] = [[0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [4, 5], [3, 6], [1, 6], [2, 7]];
  return (
    <svg viewBox="0 0 360 360" style={{ width: "100%", height: "100%" }}>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="oklch(0.78 0.13 170 / 0.4)"
          strokeWidth="1"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={n.r + 3} fill={n.c} opacity="0.2" />
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.c} />
          {n.label && (
            <text x={n.x + n.r + 6} y={n.y + 3} fontSize="10" fontFamily={FONTS.mono} fill="oklch(0.88 0.02 170)">
              {n.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

function Hero({ onNavigate }: NavProps) {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, oklch(0.22 0.03 200) 0%, oklch(0.18 0.025 200) 100%)",
        color: "oklch(0.96 0.006 85)",
        padding: "80px 64px 72px",
      }}
    >
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.35 }}>
        <defs>
          <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="oklch(0.74 0.14 170 / 0.25)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      <div
        style={{
          position: "absolute",
          top: 40,
          right: 64,
          width: 360,
          height: 360,
          opacity: 0.85,
          pointerEvents: "none",
        }}
      >
        <FloatingGraph />
      </div>

      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 11,
            padding: "5px 11px",
            borderRadius: 999,
            border: "1px solid oklch(0.74 0.14 170 / 0.3)",
            background: "oklch(0.74 0.14 170 / 0.08)",
            color: "oklch(0.82 0.12 170)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          <span className="bkb-pulse-dot" style={{ background: "oklch(0.74 0.14 170)" }} />
          v2.0 · NIH Reach Tools
        </div>
        <h1
          style={{
            fontFamily: FONTS.display,
            fontSize: 88,
            lineHeight: 0.98,
            margin: "28px 0 20px",
            letterSpacing: "-0.02em",
            maxWidth: 820,
            fontWeight: 400,
          }}
        >
          The open
          <br />
          <em style={{ fontStyle: "italic", color: "oklch(0.78 0.13 170)" }}>neuroscience</em>
          <br />
          knowledge graph.
        </h1>
        <p
          style={{
            fontSize: 17,
            maxWidth: 540,
            color: "oklch(0.82 0.012 200)",
            lineHeight: 1.55,
            margin: 0,
            fontWeight: 300,
          }}
        >
          Browse agents, evidence, projects, and publications across a unified, LLM-ready graph. Query with natural
          language, SPARQL, or the visual explorer.
        </p>

        <div
          style={{
            marginTop: 36,
            maxWidth: 620,
            display: "flex",
            gap: 10,
            alignItems: "center",
            background: "oklch(1 0 0 / 0.06)",
            border: "1px solid oklch(1 0 0 / 0.15)",
            borderRadius: 10,
            padding: "6px 6px 6px 16px",
            backdropFilter: "blur(8px)",
          }}
        >
          <Icon name="search" size={16} style={{ color: "oklch(0.78 0.13 170)" }} />
          <input
            placeholder="Try 'dopaminergic neurons in V1' or 'projects by Allen Institute'"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: 14,
              fontFamily: FONTS.body,
            }}
          />
          <button
            onClick={() => onNavigate("explorer")}
            className="bkb-btn"
            style={{ background: "oklch(0.74 0.14 170)", color: "oklch(0.18 0.022 200)", fontWeight: 600 }}
          >
            Search <Icon name="arrow" size={13} />
          </button>
        </div>
        <div
          style={{
            marginTop: 14,
            display: "flex",
            gap: 18,
            flexWrap: "wrap",
            fontSize: 12,
            color: "oklch(0.72 0.015 200)",
          }}
        >
          <span>Popular:</span>
          {["Patch-seq", "Hippocampus CA1", "Allen Brain Atlas", "Optogenetics", "Connectomics"].map((t) => (
            <a
              key={t}
              style={{
                color: "oklch(0.85 0.04 170)",
                cursor: "pointer",
                textDecoration: "none",
                borderBottom: "1px dotted currentColor",
              }}
            >
              {t}
            </a>
          ))}
        </div>

        <div
          style={{
            marginTop: 72,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            background: "oklch(1 0 0 / 0.1)",
            border: "1px solid oklch(1 0 0 / 0.1)",
            borderRadius: 2,
          }}
        >
          {[
            { n: "73,060", l: "RDF triples", c: "oklch(0.78 0.13 170)" },
            { n: "5,811", l: "Entities", c: "oklch(0.80 0.13 285)" },
            { n: "12,847", l: "Evidence assertions", c: "oklch(0.82 0.12 75)" },
            { n: "3,241", l: "Publications linked", c: "oklch(0.82 0.06 85)" },
          ].map((s, i) => (
            <div key={i} style={{ background: "oklch(0.20 0.025 200)", padding: "22px 24px" }}>
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 36,
                  letterSpacing: "-0.02em",
                  color: s.c,
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "oklch(0.72 0.015 200)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginTop: 2,
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const logos = ["Allen Institute", "NIH BRAIN", "Stanford Neuro", "EBI", "Janelia", "MIT McGovern", "UCSF", "Max Planck"];
  return (
    <div
      style={{
        borderTop: "1px solid var(--bkb-border)",
        borderBottom: "1px solid var(--bkb-border)",
        padding: "22px 64px",
        background: "var(--bkb-surfaceAlt)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 40, maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            fontSize: 11,
            color: "var(--bkb-textSubtle)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            flexShrink: 0,
          }}
        >
          Powering research at
        </div>
        <div
          style={{
            display: "flex",
            gap: 36,
            flex: 1,
            justifyContent: "space-between",
            fontFamily: FONTS.display,
            fontSize: 17,
            color: "var(--bkb-textMuted)",
            letterSpacing: "-0.01em",
            fontStyle: "italic",
          }}
        >
          {logos.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Layers() {
  const layers = [
    {
      n: "01",
      title: "Agents & extraction",
      desc: "Multi-agent LLM pipeline extracts entities, relations, and provenance from papers, datasets, and structured sources.",
      color: "var(--bkb-agent)",
    },
    {
      n: "02",
      title: "Evidence & provenance",
      desc: "Every assertion linked to source text, version, and curator. Confidence scoring and conflict resolution built-in.",
      color: "var(--bkb-evidence)",
    },
    {
      n: "03",
      title: "Knowledge graph store",
      desc: "RDF triples on an open SPARQL endpoint. Neuro-specific ontologies aligned to NIMH Data Archive, UBERON, and NCBI.",
      color: "var(--bkb-primary)",
    },
    {
      n: "04",
      title: "NIH Reach toolkit",
      desc: "Cross-referenced views for funding officers, PIs, and the curious public. Export-ready for reporting.",
      color: "var(--bkb-publication)",
    },
  ];
  return (
    <section style={{ padding: "96px 64px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ maxWidth: 620, marginBottom: 64 }}>
        <div
          style={{
            fontSize: 11,
            color: "var(--bkb-textSubtle)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Architecture
        </div>
        <h2
          style={{
            fontFamily: FONTS.display,
            fontSize: 52,
            lineHeight: 1,
            margin: 0,
            letterSpacing: "-0.02em",
            fontWeight: 400,
          }}
        >
          Four layers. <em style={{ color: "var(--bkb-primary)" }}>One</em> trustworthy graph.
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
        {layers.map((l) => (
          <div key={l.n} style={{ borderTop: `2px solid ${l.color}`, paddingTop: 18 }}>
            <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: "var(--bkb-textSubtle)", marginBottom: 10 }}>
              {l.n} / 04
            </div>
            <h3
              style={{
                fontFamily: FONTS.display,
                fontSize: 22,
                margin: "0 0 10px",
                letterSpacing: "-0.01em",
                fontWeight: 400,
              }}
            >
              {l.title}
            </h3>
            <p style={{ fontSize: 13, color: "var(--bkb-textMuted)", lineHeight: 1.55, margin: 0 }}>{l.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function EntityPreviewCard() {
  return (
    <div className="bkb-card" style={{ padding: 0, overflow: "hidden", boxShadow: "0 20px 48px rgba(0,0,0,0.08)" }}>
      <div
        style={{
          padding: "14px 18px",
          borderBottom: "1px solid var(--bkb-border)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "var(--bkb-surface)",
        }}
      >
        <span className="bkb-chip" style={{ borderColor: "var(--bkb-agent)", color: "var(--bkb-agent)" }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--bkb-agent)" }} /> Agent
        </span>
        <span className="bkb-mono" style={{ fontSize: 11, color: "var(--bkb-textMuted)" }}>
          bkb:agent/PV-interneuron-CA1
        </span>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--bkb-textSubtle)" }}>
          <Icon name="eye" size={12} style={{ verticalAlign: "middle", marginRight: 4 }} /> 2.4k views
        </span>
      </div>
      <div style={{ padding: 24, background: "var(--bkb-surface)" }}>
        <h3
          style={{
            fontFamily: FONTS.display,
            fontSize: 26,
            margin: "0 0 4px",
            letterSpacing: "-0.015em",
            fontWeight: 400,
          }}
        >
          PV+ interneuron <em style={{ color: "var(--bkb-textMuted)" }}>(CA1)</em>
        </h3>
        <div style={{ fontSize: 12, color: "var(--bkb-textSubtle)", marginBottom: 20 }}>
          Fast-spiking parvalbumin-positive GABAergic interneuron · Hippocampal region CA1
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            background: "var(--bkb-border)",
            border: "1px solid var(--bkb-border)",
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          {[
            { n: 47, l: "Evidence", c: "var(--bkb-evidence)" },
            { n: 23, l: "Publications", c: "var(--bkb-publication)" },
            { n: 8, l: "Datasets", c: "var(--bkb-primary)" },
          ].map((s) => (
            <div key={s.l} style={{ background: "var(--bkb-surface)", padding: "14px 16px" }}>
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 28,
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
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 11,
            color: "var(--bkb-textSubtle)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Recent assertions
        </div>
        <div style={{ marginTop: 8 }}>
          {[
            { p: "expressesMarker", o: "Parvalbumin", src: "Kepecs 2014" },
            { p: "locatedIn", o: "stratum pyramidale", src: "Pelkey 2017" },
            { p: "firingRate", o: "40–200 Hz", src: "Hu 2014" },
          ].map((a, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 0",
                borderBottom: i < 2 ? "1px solid var(--bkb-border)" : "none",
                fontSize: 12,
                gap: 8,
              }}
            >
              <span className="bkb-mono" style={{ color: "var(--bkb-textMuted)", fontSize: 11 }}>
                {a.p}
              </span>
              <span style={{ color: "var(--bkb-textSubtle)" }}>→</span>
              <span style={{ color: "var(--bkb-text)", fontWeight: 500 }}>{a.o}</span>
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: 11,
                  color: "var(--bkb-publication)",
                  fontStyle: "italic",
                }}
              >
                {a.src}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KgPreview({ onNavigate }: NavProps) {
  return (
    <section
      style={{
        background: "var(--bkb-surfaceAlt)",
        borderTop: "1px solid var(--bkb-border)",
        borderBottom: "1px solid var(--bkb-border)",
        padding: "96px 64px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              color: "var(--bkb-textSubtle)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Cross-linked by design
          </div>
          <h2
            style={{
              fontFamily: FONTS.display,
              fontSize: 44,
              lineHeight: 1.05,
              margin: "0 0 20px",
              letterSpacing: "-0.02em",
              fontWeight: 400,
            }}
          >
            Follow the thread from <em>agent</em> to <em>evidence</em> to <em>publication</em>.
          </h2>
          <p style={{ fontSize: 15, color: "var(--bkb-textMuted)", lineHeight: 1.6, margin: "0 0 28px" }}>
            Every entity shows its incoming and outgoing edges. Click an assertion to see the extracting agent, the
            source paragraph, and the paper it came from — with provenance baked into every node.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => onNavigate("explorer")} className="bkb-btn bkb-btn-primary">
              Open Explorer <Icon name="arrow" size={13} />
            </button>
            <button onClick={() => onNavigate("docs")} className="bkb-btn bkb-btn-ghost">
              Read the docs
            </button>
          </div>
        </div>
        <EntityPreviewCard />
      </div>
    </section>
  );
}

function ExploreGrid({ onNavigate }: NavProps) {
  const cards: { title: string; desc: string; cta: string; page: PageId; icon: string }[] = [
    {
      title: "Knowledge Graph Explorer",
      desc: "Faceted search across all entities. Filter by type, evidence level, source, and ontology.",
      cta: "Open Explorer",
      page: "explorer",
      icon: "graph",
    },
    {
      title: "Multi-agent Workflows",
      desc: "Run extraction pipelines on your own corpus. Configure agents, review proposals, promote to graph.",
      cta: "Go to Dashboard",
      page: "dashboard",
      icon: "flow",
    },
    {
      title: "SPARQL & API",
      desc: "Direct access via the SPARQL endpoint or REST API. Tokens managed from your dashboard.",
      cta: "Read docs",
      page: "docs",
      icon: "doc",
    },
    {
      title: "Contribute data",
      desc: "Submit datasets, publications, or annotations. Every contribution is versioned and attributed.",
      cta: "Go to Dashboard",
      page: "dashboard",
      icon: "upload",
    },
  ];
  return (
    <section style={{ padding: "96px 64px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 40, display: "flex", alignItems: "end", justifyContent: "space-between" }}>
        <div>
          <div
            style={{
              fontSize: 11,
              color: "var(--bkb-textSubtle)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Explore BrainKB
          </div>
          <h2
            style={{
              fontFamily: FONTS.display,
              fontSize: 44,
              margin: 0,
              letterSpacing: "-0.02em",
              fontWeight: 400,
            }}
          >
            Four ways in.
          </h2>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
        {cards.map((c) => (
          <button
            key={c.title}
            onClick={() => onNavigate(c.page)}
            className="bkb-card"
            style={{
              textAlign: "left",
              padding: 28,
              cursor: "pointer",
              border: "1px solid var(--bkb-border)",
              background: "var(--bkb-surface)",
              transition: "all .2s",
              fontFamily: FONTS.body,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--bkb-primary)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--bkb-border)";
              e.currentTarget.style.transform = "none";
            }}
          >
            <div style={{ display: "flex", alignItems: "start", gap: 20 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  background: "var(--bkb-surfaceAlt)",
                  border: "1px solid var(--bkb-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--bkb-primary)",
                  flexShrink: 0,
                }}
              >
                <Icon name={c.icon} size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 22,
                    margin: "0 0 8px",
                    letterSpacing: "-0.01em",
                    color: "var(--bkb-text)",
                    fontWeight: 400,
                  }}
                >
                  {c.title}
                </h3>
                <p style={{ fontSize: 13, color: "var(--bkb-textMuted)", lineHeight: 1.55, margin: "0 0 14px" }}>
                  {c.desc}
                </p>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "var(--bkb-primary)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  {c.cta} <Icon name="arrow" size={12} />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Ingest", d: "Papers, datasets, and structured sources enter the pipeline." },
    { n: "02", t: "Extract", d: "Agents propose assertions with source spans and confidence." },
    { n: "03", t: "Review", d: "Curators accept, edit, or reject. Conflicts are surfaced." },
    { n: "04", t: "Publish", d: "Accepted triples hit the graph with full provenance." },
  ];
  return (
    <section style={{ background: "oklch(0.20 0.025 200)", color: "oklch(0.96 0.006 85)", padding: "96px 64px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            fontSize: 11,
            color: "oklch(0.72 0.015 200)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          How it works
        </div>
        <h2
          style={{
            fontFamily: FONTS.display,
            fontSize: 44,
            margin: "0 0 56px",
            letterSpacing: "-0.02em",
            fontWeight: 400,
            maxWidth: 680,
          }}
        >
          From paper to <em style={{ color: "oklch(0.78 0.13 170)" }}>triple</em>, with provenance at every step.
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            background: "oklch(1 0 0 / 0.1)",
            border: "1px solid oklch(1 0 0 / 0.1)",
          }}
        >
          {steps.map((s, i) => (
            <div
              key={s.n}
              style={{ background: "oklch(0.20 0.025 200)", padding: "28px 24px", position: "relative" }}
            >
              <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: "oklch(0.78 0.13 170)", marginBottom: 18 }}>
                {s.n}
              </div>
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 26,
                  letterSpacing: "-0.01em",
                  marginBottom: 8,
                  fontWeight: 400,
                }}
              >
                {s.t}
              </div>
              <div style={{ fontSize: 13, color: "oklch(0.74 0.015 200)", lineHeight: 1.5 }}>{s.d}</div>
              {i < 3 && (
                <div style={{ position: "absolute", top: 38, right: -8, color: "oklch(0.78 0.13 170)" }}>
                  <Icon name="arrow" size={14} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        background: "var(--bkb-surface)",
        borderTop: "1px solid var(--bkb-border)",
        padding: "48px 64px 32px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
          gap: 48,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <Logo size={24} />
            <div style={{ fontFamily: FONTS.display, fontSize: 20, letterSpacing: "-0.02em" }}>BrainKB</div>
          </div>
          <div style={{ fontSize: 12, color: "var(--bkb-textMuted)", lineHeight: 1.6, maxWidth: 320 }}>
            An open neuroscience knowledge graph. Built with NIH BRAIN Initiative support.
          </div>
        </div>
        {[
          { h: "Product", items: ["Explorer", "Dashboard", "SPARQL API", "Changelog"] },
          { h: "Resources", items: ["Documentation", "Ontologies", "Data sources", "Citation"] },
          { h: "About", items: ["Team", "Governance", "Privacy", "Contact"] },
        ].map((col) => (
          <div key={col.h}>
            <div
              style={{
                fontSize: 11,
                color: "var(--bkb-textSubtle)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              {col.h}
            </div>
            {col.items.map((it) => (
              <div key={it} style={{ fontSize: 13, color: "var(--bkb-textMuted)", padding: "4px 0", cursor: "pointer" }}>
                {it}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div
        style={{
          maxWidth: 1200,
          margin: "40px auto 0",
          paddingTop: 20,
          borderTop: "1px solid var(--bkb-border)",
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          color: "var(--bkb-textSubtle)",
        }}
      >
        <div>© 2026 BrainKB · Licensed CC-BY 4.0</div>
        <div>v2.0.3 · graph updated 2 hours ago</div>
      </div>
    </footer>
  );
}

export function LandingNav({ onNavigate }: NavProps) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "16px 64px",
        display: "flex",
        alignItems: "center",
        gap: 32,
        background: scrolled ? "oklch(0.18 0.025 200 / 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid oklch(1 0 0 / 0.08)" : "1px solid transparent",
        transition: "all .2s",
        color: "oklch(0.96 0.006 85)",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
        onClick={() => onNavigate("home")}
      >
        <Logo size={24} />
        <span style={{ fontFamily: FONTS.display, fontSize: 22, letterSpacing: "-0.02em" }}>BrainKB</span>
      </div>
      <nav style={{ display: "flex", gap: 22, fontSize: 13, marginLeft: 24 }}>
        {[
          { id: "explorer" as PageId, l: "Explorer" },
          { id: "dashboard" as PageId, l: "Dashboard" },
          { id: "admin" as PageId, l: "Admin" },
          { id: "docs" as PageId, l: "Docs" },
        ].map((it) => (
          <a
            key={it.id}
            onClick={() => onNavigate(it.id)}
            style={{ color: "oklch(0.82 0.012 200)", cursor: "pointer", fontWeight: 400 }}
          >
            {it.l}
          </a>
        ))}
      </nav>
      <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
        <button
          onClick={() => onNavigate("auth")}
          style={{
            background: "transparent",
            border: "1px solid oklch(1 0 0 / 0.2)",
            color: "inherit",
            padding: "7px 14px",
            borderRadius: 6,
            fontSize: 13,
            cursor: "pointer",
            fontFamily: FONTS.body,
          }}
        >
          Sign in
        </button>
        <button
          onClick={() => onNavigate("auth")}
          style={{
            background: "oklch(0.74 0.14 170)",
            border: "none",
            color: "oklch(0.18 0.022 200)",
            padding: "7px 14px",
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: FONTS.body,
          }}
        >
          Get started
        </button>
      </div>
    </header>
  );
}

export function Landing({ onNavigate }: NavProps) {
  return (
    <div>
      <Hero onNavigate={onNavigate} />
      <Marquee />
      <Layers />
      <KgPreview onNavigate={onNavigate} />
      <ExploreGrid onNavigate={onNavigate} />
      <HowItWorks />
      <Footer />
    </div>
  );
}
