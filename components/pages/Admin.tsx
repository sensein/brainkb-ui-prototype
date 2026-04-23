"use client";

import React from "react";
import { FONTS, Icon } from "../design-system";

function AdminStats() {
  return (
    <div>
      <h1
        style={{
          fontFamily: FONTS.display,
          fontSize: 32,
          margin: "0 0 4px",
          letterSpacing: "-0.02em",
          fontWeight: 400,
        }}
      >
        Statistics
      </h1>
      <div style={{ fontSize: 13, color: "var(--bkb-textMuted)", marginBottom: 24 }}>
        Manage NIH research data and knowledge graph
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
        {[
          { n: "52", l: "Projects", icon: "project", c: "var(--bkb-primary)" },
          { n: "47", l: "People", icon: "person", c: "var(--bkb-agent)" },
          { n: "5,811", l: "Skills", icon: "sparkle", c: "var(--bkb-publication)" },
        ].map((s) => (
          <div
            key={s.l}
            className="bkb-card"
            style={{ padding: 20, display: "flex", alignItems: "center", gap: 16 }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 8,
                background: `color-mix(in oklch, ${s.c}, transparent 90%)`,
                color: s.c,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name={s.icon} size={22} />
            </div>
            <div>
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
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 36,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  fontWeight: 400,
                  marginTop: 2,
                }}
              >
                {s.n}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bkb-card" style={{ padding: 20, marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 14 }}>Knowledge Graph Statistics</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
          {[
            { n: 52, l: "Projects", icon: "project", c: "var(--bkb-primary)" },
            { n: 47, l: "People", icon: "person", c: "var(--bkb-agent)" },
            { n: 222, l: "Research Areas", icon: "sparkle", c: "var(--bkb-evidence)" },
            { n: 46, l: "Publications", icon: "pub", c: "var(--bkb-publication)" },
            { n: "73,060", l: "RDF Triples", icon: "database", c: "var(--bkb-primary)" },
            { n: "73,060", l: "Graph Size", icon: "graph", c: "var(--bkb-agent)" },
          ].map((s) => (
            <div
              key={s.l}
              style={{
                padding: 14,
                border: "1px solid var(--bkb-border)",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <Icon name={s.icon} size={18} style={{ color: s.c }} />
              <div>
                <div style={{ fontSize: 11, color: "var(--bkb-textMuted)" }}>{s.l}</div>
                <div
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 22,
                    letterSpacing: "-0.015em",
                    fontWeight: 400,
                  }}
                >
                  {s.n}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bkb-card" style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 15, fontWeight: 500 }}>System health</div>
          <span className="bkb-chip" style={{ borderColor: "var(--bkb-accent)", color: "var(--bkb-accent)" }}>
            <span className="bkb-pulse-dot" /> All systems operational
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {[
            { l: "SPARQL endpoint", v: "142ms p50" },
            { l: "Agent pipeline", v: "3 active" },
            { l: "Storage", v: "2.4 / 10 GB" },
            { l: "Last sync", v: "6 min ago" },
          ].map((h) => (
            <div key={h.l} style={{ padding: 12, border: "1px solid var(--bkb-border)", borderRadius: 6 }}>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--bkb-textMuted)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {h.l}
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>{h.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminSync() {
  const sources = [
    { s: "NIH RePORTER", last: "6 min ago", status: "idle", c: "var(--bkb-primary)" },
    { s: "PubMed", last: "2h ago", status: "running", c: "var(--bkb-accent)" },
    { s: "Allen Brain Atlas", last: "Yesterday", status: "idle", c: "var(--bkb-primary)" },
    { s: "UBERON ontology", last: "1w ago", status: "idle", c: "var(--bkb-primary)" },
  ];
  return (
    <div>
      <h1
        style={{
          fontFamily: FONTS.display,
          fontSize: 32,
          margin: "0 0 4px",
          letterSpacing: "-0.02em",
          fontWeight: 400,
        }}
      >
        Sync data
      </h1>
      <div style={{ fontSize: 13, color: "var(--bkb-textMuted)", marginBottom: 24 }}>
        Trigger synchronization from upstream sources
      </div>
      {sources.map((src) => (
        <div
          key={src.s}
          className="bkb-card"
          style={{
            padding: 18,
            marginBottom: 10,
            display: "grid",
            gridTemplateColumns: "1fr auto auto auto",
            gap: 16,
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{src.s}</div>
            <div style={{ fontSize: 12, color: "var(--bkb-textMuted)" }}>Last sync: {src.last}</div>
          </div>
          {src.status === "running" ? (
            <span className="bkb-chip" style={{ borderColor: src.c, color: src.c }}>
              <span className="bkb-pulse-dot" /> Syncing
            </span>
          ) : (
            <span className="bkb-chip">Idle</span>
          )}
          <button className="bkb-btn bkb-btn-ghost">
            <Icon name="settings" size={12} />
          </button>
          <button className="bkb-btn bkb-btn-primary">
            <Icon name="sync" size={12} /> Sync now
          </button>
        </div>
      ))}
    </div>
  );
}

function AdminData() {
  const rows = [
    { id: "prj-NS119213", name: "Circuit mechanisms of PV+ interneurons", pi: "E. Michaels", inst: "Allen Institute", status: "Active" },
    { id: "prj-NS107810", name: "Patch-seq profiling of cortical neurons", pi: "D. Park", inst: "UCSF", status: "Active" },
    { id: "prj-NS115701", name: "Connectomics of mouse V1", pi: "J. Rinaldi", inst: "Janelia", status: "Completed" },
    { id: "prj-NS121344", name: "Hippocampal memory replay mechanisms", pi: "R. Chen", inst: "MIT", status: "Active" },
    { id: "prj-NS118902", name: "Optogenetic dissection of anxiety circuits", pi: "L. Okonkwo", inst: "Stanford", status: "Active" },
  ];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 20 }}>
        <div>
          <h1
            style={{
              fontFamily: FONTS.display,
              fontSize: 32,
              margin: "0 0 4px",
              letterSpacing: "-0.02em",
              fontWeight: 400,
            }}
          >
            Data view
          </h1>
          <div style={{ fontSize: 13, color: "var(--bkb-textMuted)" }}>Browse and edit graph entities</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input className="bkb-input" placeholder="Search…" style={{ width: 220 }} />
          <button className="bkb-btn bkb-btn-ghost">
            <Icon name="filter" size={12} />
          </button>
        </div>
      </div>
      <div className="bkb-card">
        <div
          style={{
            padding: "10px 18px",
            background: "var(--bkb-surfaceAlt)",
            borderBottom: "1px solid var(--bkb-border)",
            display: "grid",
            gridTemplateColumns: "140px 1fr 140px 180px 100px auto",
            gap: 16,
            fontSize: 11,
            color: "var(--bkb-textMuted)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          <span>ID</span>
          <span>Name</span>
          <span>PI</span>
          <span>Institution</span>
          <span>Status</span>
          <span></span>
        </div>
        {rows.map((r, i) => (
          <div
            key={r.id}
            className="bkb-hover-row"
            style={{
              padding: "12px 18px",
              borderBottom: i < rows.length - 1 ? "1px solid var(--bkb-border)" : "none",
              display: "grid",
              gridTemplateColumns: "140px 1fr 140px 180px 100px auto",
              gap: 16,
              alignItems: "center",
              fontSize: 13,
            }}
          >
            <span className="bkb-mono" style={{ fontSize: 11, color: "var(--bkb-textMuted)" }}>
              {r.id}
            </span>
            <span style={{ fontWeight: 500 }}>{r.name}</span>
            <span>{r.pi}</span>
            <span style={{ color: "var(--bkb-textMuted)" }}>{r.inst}</span>
            <span
              className="bkb-chip"
              style={{
                borderColor: r.status === "Active" ? "var(--bkb-accent)" : "var(--bkb-textSubtle)",
                color: r.status === "Active" ? "var(--bkb-accent)" : "var(--bkb-textMuted)",
              }}
            >
              {r.status}
            </span>
            <button className="bkb-btn bkb-btn-ghost" style={{ padding: "4px 8px" }}>
              <Icon name="dots" size={12} />
            </button>
          </div>
        ))}
        <div style={{ padding: "12px 18px", fontSize: 12, color: "var(--bkb-textMuted)" }}>
          Showing 5 of 52 projects
        </div>
      </div>
    </div>
  );
}

function AdminEnrich() {
  return (
    <div>
      <h1
        style={{
          fontFamily: FONTS.display,
          fontSize: 32,
          margin: "0 0 4px",
          letterSpacing: "-0.02em",
          fontWeight: 400,
        }}
      >
        Enrich authors
      </h1>
      <div style={{ fontSize: 13, color: "var(--bkb-textMuted)", marginBottom: 24 }}>
        Run LLM enrichment pipeline to augment author profiles with ORCID, affiliations, and publication history.
      </div>
      <div className="bkb-card" style={{ padding: 24, display: "flex", gap: 24, alignItems: "center" }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 10,
            background: "color-mix(in oklch, var(--bkb-agent), transparent 90%)",
            color: "var(--bkb-agent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="sparkle" size={28} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 500 }}>47 authors · 12 incomplete profiles</div>
          <div style={{ fontSize: 12, color: "var(--bkb-textMuted)" }}>
            Will query ORCID, Scholar, and NIH RePORTER. Approx. 3 min.
          </div>
        </div>
        <button className="bkb-btn bkb-btn-primary">
          <Icon name="play" size={13} /> Start enrichment
        </button>
      </div>
    </div>
  );
}

function AdminPull() {
  return (
    <div>
      <h1
        style={{
          fontFamily: FONTS.display,
          fontSize: 32,
          margin: "0 0 4px",
          letterSpacing: "-0.02em",
          fontWeight: 400,
        }}
      >
        Pull all NIH
      </h1>
      <div style={{ fontSize: 13, color: "var(--bkb-textMuted)", marginBottom: 24 }}>
        Bulk-pull grants, projects and publications from NIH RePORTER.
      </div>
      <div className="bkb-card" style={{ padding: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 14 }}>Filters</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
          <div>
            <label style={{ fontSize: 11, color: "var(--bkb-textMuted)" }}>Institute</label>
            <input className="bkb-input" defaultValue="NINDS, NIMH, NIA" />
          </div>
          <div>
            <label style={{ fontSize: 11, color: "var(--bkb-textMuted)" }}>Fiscal year</label>
            <input className="bkb-input" defaultValue="2024-2026" />
          </div>
          <div>
            <label style={{ fontSize: 11, color: "var(--bkb-textMuted)" }}>Activity code</label>
            <input className="bkb-input" defaultValue="R01, R21, U01" />
          </div>
          <div>
            <label style={{ fontSize: 11, color: "var(--bkb-textMuted)" }}>Keywords</label>
            <input className="bkb-input" defaultValue="neuroscience, brain" />
          </div>
        </div>
        <button className="bkb-btn bkb-btn-primary">
          <Icon name="upload" size={13} /> Estimate & pull
        </button>
      </div>
    </div>
  );
}

function AdminDelete() {
  return (
    <div>
      <h1
        style={{
          fontFamily: FONTS.display,
          fontSize: 32,
          margin: "0 0 4px",
          letterSpacing: "-0.02em",
          fontWeight: 400,
        }}
      >
        Delete data
      </h1>
      <div style={{ fontSize: 13, color: "var(--bkb-textMuted)", marginBottom: 24 }}>
        Remove entities or assertions. All deletions are versioned and reversible within 30 days.
      </div>
      <div
        className="bkb-card"
        style={{ padding: 24, borderColor: "var(--bkb-danger)", borderLeft: "3px solid var(--bkb-danger)" }}
      >
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6, color: "var(--bkb-danger)" }}>Danger zone</div>
        <div style={{ fontSize: 13, color: "var(--bkb-textMuted)", marginBottom: 14 }}>
          Destructive operations. Confirm intent — these actions cascade through the graph.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <button className="bkb-btn bkb-btn-ghost" style={{ justifyContent: "space-between" }}>
            Delete rejected proposals (412) <Icon name="arrow" size={12} />
          </button>
          <button className="bkb-btn bkb-btn-ghost" style={{ justifyContent: "space-between" }}>
            Purge unresolved conflicts (23) <Icon name="arrow" size={12} />
          </button>
          <button
            className="bkb-btn bkb-btn-ghost"
            style={{
              justifyContent: "space-between",
              borderColor: "var(--bkb-danger)",
              color: "var(--bkb-danger)",
            }}
          >
            Drop entire namespace… <Icon name="arrow" size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminExport() {
  return (
    <div>
      <h1
        style={{
          fontFamily: FONTS.display,
          fontSize: 32,
          margin: "0 0 4px",
          letterSpacing: "-0.02em",
          fontWeight: 400,
        }}
      >
        Export / import
      </h1>
      <div style={{ fontSize: 13, color: "var(--bkb-textMuted)", marginBottom: 24 }}>
        Move data in and out of BrainKB in standard graph formats.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {[
          {
            t: "Export graph",
            d: "Download full graph or filtered subset. Supports Turtle, JSON-LD, N-Triples.",
            cta: "Configure export",
            icon: "upload",
          },
          {
            t: "Import RDF",
            d: "Upload an external graph. Validated against BrainKB ontology before merging.",
            cta: "Upload file",
            icon: "upload",
          },
        ].map((c) => (
          <div key={c.t} className="bkb-card" style={{ padding: 20 }}>
            <Icon name={c.icon} size={22} style={{ color: "var(--bkb-primary)" }} />
            <div style={{ fontSize: 16, fontWeight: 500, marginTop: 12 }}>{c.t}</div>
            <div style={{ fontSize: 12, color: "var(--bkb-textMuted)", marginTop: 4, marginBottom: 16, lineHeight: 1.5 }}>
              {c.d}
            </div>
            <button className="bkb-btn bkb-btn-ghost">
              {c.cta} <Icon name="arrow" size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Admin() {
  const [tab, setTab] = React.useState("stats");
  const items = [
    { id: "stats", l: "Statistics", icon: "dash" },
    { id: "sync", l: "Sync data", icon: "sync" },
    { id: "data", l: "Data view", icon: "database" },
    { id: "enrich", l: "Enrich authors", icon: "sparkle" },
    { id: "pull", l: "Pull all NIH", icon: "upload" },
    { id: "delete", l: "Delete data", icon: "x" },
    { id: "export", l: "Export / import", icon: "upload" },
  ];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "220px 1fr",
        minHeight: "100%",
        background: "var(--bkb-bg)",
      }}
    >
      <aside
        style={{
          background: "var(--bkb-surface)",
          borderRight: "1px solid var(--bkb-border)",
          padding: "20px 12px",
        }}
      >
        <div
          style={{
            padding: "4px 10px 16px",
            borderBottom: "1px solid var(--bkb-border)",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "var(--bkb-textSubtle)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Admin
          </div>
          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: 18,
              letterSpacing: "-0.01em",
              marginTop: 2,
            }}
          >
            NIH Resource Finder
          </div>
        </div>
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => setTab(it.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              width: "100%",
              textAlign: "left",
              padding: "8px 10px",
              border: "none",
              background: tab === it.id ? "var(--bkb-surfaceAlt)" : "transparent",
              color: tab === it.id ? "var(--bkb-text)" : "var(--bkb-textMuted)",
              borderRadius: 6,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: FONTS.body,
              fontWeight: tab === it.id ? 500 : 400,
              marginBottom: 2,
            }}
          >
            <Icon name={it.icon} size={14} /> {it.l}
          </button>
        ))}
      </aside>
      <main style={{ padding: "28px 36px" }}>
        {tab === "stats" && <AdminStats />}
        {tab === "sync" && <AdminSync />}
        {tab === "data" && <AdminData />}
        {tab === "enrich" && <AdminEnrich />}
        {tab === "pull" && <AdminPull />}
        {tab === "delete" && <AdminDelete />}
        {tab === "export" && <AdminExport />}
      </main>
    </div>
  );
}
