"use client";

import React from "react";
import { FONTS, Icon } from "../design-system";

const SECTIONS = [
  {
    group: "Getting started",
    items: [
      { id: "intro", l: "Introduction" },
      { id: "auth", l: "Authentication" },
      { id: "quick", l: "Quickstart" },
    ],
  },
  {
    group: "Core concepts",
    items: [
      { id: "model", l: "Graph data model" },
      { id: "agents", l: "Agents & evidence" },
      { id: "prov", l: "Provenance" },
    ],
  },
  {
    group: "API",
    items: [
      { id: "sparql", l: "SPARQL endpoint" },
      { id: "rest", l: "REST reference" },
      { id: "webhooks", l: "Webhooks" },
    ],
  },
  {
    group: "Workflows",
    items: [
      { id: "extraction", l: "Multi-agent extraction" },
      { id: "review", l: "Review & curation" },
      { id: "publish", l: "Publish to graph" },
    ],
  },
];

export function Docs() {
  const [section, setSection] = React.useState("intro");
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "240px 1fr 200px",
        minHeight: "100%",
        background: "var(--bkb-bg)",
      }}
    >
      <aside
        style={{
          borderRight: "1px solid var(--bkb-border)",
          padding: "24px 18px",
          background: "var(--bkb-surface)",
        }}
      >
        <div style={{ position: "relative", marginBottom: 18 }}>
          <Icon
            name="search"
            size={13}
            style={{ position: "absolute", left: 10, top: 9, color: "var(--bkb-textSubtle)" }}
          />
          <input className="bkb-input" placeholder="Search docs" style={{ paddingLeft: 30, fontSize: 12 }} />
        </div>
        {SECTIONS.map((g) => (
          <div key={g.group} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--bkb-text)", marginBottom: 6 }}>{g.group}</div>
            {g.items.map((it) => (
              <button
                key={it.id}
                onClick={() => setSection(it.id)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "5px 8px",
                  border: "none",
                  background: section === it.id ? "var(--bkb-surfaceAlt)" : "transparent",
                  color: section === it.id ? "var(--bkb-text)" : "var(--bkb-textMuted)",
                  borderRadius: 4,
                  fontSize: 12,
                  cursor: "pointer",
                  fontFamily: FONTS.body,
                  borderLeft: section === it.id ? "2px solid var(--bkb-primary)" : "2px solid transparent",
                  paddingLeft: 8,
                  fontWeight: section === it.id ? 500 : 400,
                }}
              >
                {it.l}
              </button>
            ))}
          </div>
        ))}
      </aside>

      <main style={{ padding: "40px 56px", maxWidth: 760 }}>
        <div
          style={{
            fontSize: 11,
            color: "var(--bkb-textSubtle)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Getting started
        </div>
        <h1
          style={{
            fontFamily: FONTS.display,
            fontSize: 44,
            margin: "0 0 14px",
            letterSpacing: "-0.02em",
            fontWeight: 400,
          }}
        >
          Introduction
        </h1>
        <p style={{ fontSize: 16, color: "var(--bkb-textMuted)", lineHeight: 1.7, margin: "0 0 24px" }}>
          BrainKB is an open, provenance-first knowledge graph for neuroscience. Every assertion links to the
          extracting agent, the source paragraph, and the publication it came from — so you can trust, verify, and
          contribute.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
          {[
            { t: "Browse the graph", d: "Explore agents, evidence, and publications visually or with faceted filters.", icon: "graph" },
            { t: "Query with SPARQL", d: "Run federated queries against an open endpoint. API keys from your dashboard.", icon: "doc" },
            { t: "Run a workflow", d: "Ingest your corpus; agents propose assertions you review and promote.", icon: "flow" },
            { t: "Contribute", d: "Submit datasets or annotations. Every contribution is versioned and attributed.", icon: "upload" },
          ].map((c) => (
            <div key={c.t} className="bkb-card" style={{ padding: 16 }}>
              <Icon name={c.icon} size={16} style={{ color: "var(--bkb-primary)", marginBottom: 8 }} />
              <div style={{ fontSize: 14, fontWeight: 500 }}>{c.t}</div>
              <div style={{ fontSize: 12, color: "var(--bkb-textMuted)", marginTop: 3, lineHeight: 1.5 }}>{c.d}</div>
            </div>
          ))}
        </div>

        <h2
          style={{
            fontFamily: FONTS.display,
            fontSize: 28,
            margin: "32px 0 12px",
            letterSpacing: "-0.015em",
            fontWeight: 400,
          }}
        >
          Your first query
        </h2>
        <p style={{ fontSize: 14, color: "var(--bkb-textMuted)", lineHeight: 1.7, margin: "0 0 14px" }}>
          BrainKB exposes a standard SPARQL 1.1 endpoint. Authenticated requests require a bearer token from your
          dashboard.
        </p>

        <div
          className="bkb-mono"
          style={{
            fontSize: 12,
            background: "var(--bkb-surfaceAlt)",
            padding: 16,
            borderRadius: 8,
            border: "1px solid var(--bkb-border)",
            whiteSpace: "pre",
            overflow: "auto",
            lineHeight: 1.7,
            marginBottom: 24,
          }}
        >
{`curl https://api.brainkb.org/sparql \\
  -H "Authorization: Bearer $BKB_API_KEY" \\
  --data-urlencode 'query=
    PREFIX bkb: <https://brainkb.org/ns/>
    SELECT ?s ?p ?o WHERE {
      bkb:agent/PV-interneuron-CA1 ?p ?o .
    } LIMIT 20
  '`}
        </div>

        <div
          className="bkb-card"
          style={{
            padding: 16,
            display: "flex",
            alignItems: "center",
            gap: 14,
            background: "var(--bkb-surfaceAlt)",
          }}
        >
          <Icon name="info" size={18} style={{ color: "var(--bkb-primary)" }} />
          <div style={{ fontSize: 13, color: "var(--bkb-textMuted)" }}>
            <b style={{ color: "var(--bkb-text)" }}>Heads up.</b> Rate limits are 100 req/min on SPARQL and 500/min on
            REST. Upgrade to research tier from Settings.
          </div>
        </div>
      </main>

      <aside style={{ padding: "40px 20px", fontSize: 12 }}>
        <div
          style={{
            fontSize: 11,
            color: "var(--bkb-textSubtle)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          On this page
        </div>
        {["Your first query", "Authentication", "Rate limits"].map((o) => (
          <div key={o} style={{ padding: "4px 0", color: "var(--bkb-textMuted)", cursor: "pointer" }}>
            {o}
          </div>
        ))}
      </aside>
    </div>
  );
}
