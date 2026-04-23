"use client";

import React from "react";
import { FONTS, Icon, TYPE_META, type EntityType } from "../design-system";
import type { PageId } from "../app-shell";
import { ConfBar } from "./shared";

type Props = {
  onNavigate: (p: PageId) => void;
  onOpenEntity: (id: string) => void;
};

function WorkflowMini() {
  const steps = [
    { n: "Ingest", state: "done", c: "var(--bkb-accent)" },
    { n: "Chunk", state: "done", c: "var(--bkb-accent)" },
    { n: "Extract", state: "running", c: "var(--bkb-primary)" },
    { n: "Validate", state: "queued", c: "var(--bkb-borderStrong)" },
    { n: "Review", state: "queued", c: "var(--bkb-borderStrong)" },
    { n: "Publish", state: "queued", c: "var(--bkb-borderStrong)" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${steps.length}, 1fr)`, gap: 4 }}>
      {steps.map((s) => (
        <div key={s.n} style={{ position: "relative" }}>
          <div
            style={{
              height: 6,
              borderRadius: 3,
              background:
                s.state === "running"
                  ? `linear-gradient(90deg, ${s.c} 60%, var(--bkb-borderStrong) 60%)`
                  : s.c,
            }}
          />
          <div
            style={{
              fontSize: 11,
              color: s.state === "queued" ? "var(--bkb-textSubtle)" : "var(--bkb-text)",
              marginTop: 8,
              fontWeight: s.state === "running" ? 600 : 400,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {s.n}
            {s.state === "running" && <span className="bkb-pulse-dot" style={{ width: 5, height: 5 }} />}
          </div>
        </div>
      ))}
    </div>
  );
}

function DashOverview({
  setTab,
  onOpenEntity,
}: {
  setTab: (t: string) => void;
  onOpenEntity: (id: string) => void;
}) {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { n: "147", l: "Assertions contributed", d: "+12 this week", c: "var(--bkb-agent)", icon: "agent" },
          { n: "38", l: "Queries this month", d: "+5 vs. last month", c: "var(--bkb-evidence)", icon: "search" },
          { n: "2", l: "Active workflows", d: "1 running · 1 paused", c: "var(--bkb-primary)", icon: "flow" },
          { n: "3", l: "API keys", d: "2 active · 1 rotated", c: "var(--bkb-publication)", icon: "key" },
        ].map((s) => (
          <div key={s.l} className="bkb-card" style={{ padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 6,
                  background: "var(--bkb-surfaceAlt)",
                  color: s.c,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name={s.icon} size={14} />
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
            <div
              style={{
                fontFamily: FONTS.display,
                fontSize: 38,
                letterSpacing: "-0.02em",
                color: s.c,
                fontWeight: 400,
                lineHeight: 1,
              }}
            >
              {s.n}
            </div>
            <div style={{ fontSize: 11, color: "var(--bkb-textSubtle)", marginTop: 6 }}>{s.d}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20 }}>
        <div>
          <div className="bkb-card" style={{ padding: 22, marginBottom: 20 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 14,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--bkb-textSubtle)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  Active workflow
                </div>
                <h3
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 22,
                    margin: 0,
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Extract inhibitory interneuron assertions — Q2 corpus
                </h3>
              </div>
              <span
                className="bkb-chip"
                style={{ borderColor: "var(--bkb-accent)", color: "var(--bkb-accent)", background: "transparent" }}
              >
                <span className="bkb-pulse-dot" /> Running
              </span>
            </div>
            <WorkflowMini />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 14,
                fontSize: 12,
                color: "var(--bkb-textMuted)",
              }}
            >
              <span>
                Progress: <b style={{ color: "var(--bkb-text)" }}>134 / 200</b> papers ·{" "}
                <b style={{ color: "var(--bkb-text)" }}>412</b> proposals
              </span>
              <button
                onClick={() => setTab("workflows")}
                className="bkb-btn bkb-btn-ghost"
                style={{ padding: "4px 10px", fontSize: 11 }}
              >
                Open <Icon name="arrow" size={11} />
              </button>
            </div>
          </div>

          <div className="bkb-card" style={{ marginBottom: 20 }}>
            <div
              style={{
                padding: "14px 18px",
                borderBottom: "1px solid var(--bkb-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>Pending your review</div>
                <div style={{ fontSize: 12, color: "var(--bkb-textMuted)" }}>23 proposals waiting · 4 conflicts flagged</div>
              </div>
              <button className="bkb-btn bkb-btn-ghost" style={{ padding: "4px 10px", fontSize: 11 }}>
                Review all
              </button>
            </div>
            {[
              { p: "expressesMarker", s: "PV+ int. (CA1)", o: "Calretinin (CR)", conf: 0.64, conflict: true },
              { p: "firingRateRange", s: "SST+ Martinotti", o: "5–40 Hz", conf: 0.81 },
              { p: "locatedIn", s: "Basket cell (DG)", o: "stratum granulosum", conf: 0.93 },
              { p: "synapticInputFrom", s: "PV+ int. (CA1)", o: "Entorhinal cortex layer III", conf: 0.71 },
            ].map((a, i, arr) => (
              <div
                key={i}
                style={{
                  padding: "12px 18px",
                  borderBottom: i < arr.length - 1 ? "1px solid var(--bkb-border)" : "none",
                  display: "grid",
                  gridTemplateColumns: "1fr auto auto auto",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ color: "var(--bkb-text)", fontWeight: 500 }}>{a.s}</span>
                    <span className="bkb-mono" style={{ fontSize: 11, color: "var(--bkb-textMuted)" }}>
                      {a.p}
                    </span>
                    <Icon name="arrow" size={10} style={{ color: "var(--bkb-textSubtle)" }} />
                    <span>{a.o}</span>
                    {a.conflict && (
                      <span
                        className="bkb-chip"
                        style={{ borderColor: "var(--bkb-danger)", color: "var(--bkb-danger)", fontSize: 10 }}
                      >
                        conflict
                      </span>
                    )}
                  </div>
                </div>
                <ConfBar v={a.conf} />
                <button className="bkb-btn bkb-btn-ghost" style={{ padding: "4px 8px", fontSize: 11 }}>
                  <Icon name="check" size={12} /> Accept
                </button>
                <button className="bkb-btn bkb-btn-ghost" style={{ padding: "4px 8px", fontSize: 11 }}>
                  <Icon name="x" size={12} /> Reject
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="bkb-card" style={{ padding: 18, marginBottom: 16 }}>
            <div
              style={{
                fontSize: 11,
                color: "var(--bkb-textSubtle)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Recent activity
            </div>
            {[
              { t: "Accepted 7 assertions", s: "PV+ interneuron (CA1)", d: "2h ago", c: "var(--bkb-accent)" },
              { t: "Ran SPARQL query", s: "dopaminergic AND V1", d: "4h ago", c: "var(--bkb-evidence)" },
              { t: "Created workflow", s: "Q2 corpus extraction", d: "Yesterday", c: "var(--bkb-primary)" },
              { t: "API key rotated", s: "prod-research-pipeline", d: "2d ago", c: "var(--bkb-publication)" },
              { t: "Rejected proposal", s: "channelExpression conflict", d: "3d ago", c: "var(--bkb-danger)" },
            ].map((a, i, arr) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 10,
                  padding: "8px 0",
                  borderBottom: i < arr.length - 1 ? "1px solid var(--bkb-border)" : "none",
                }}
              >
                <div
                  style={{ width: 6, height: 6, borderRadius: 999, background: a.c, marginTop: 6, flexShrink: 0 }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: "var(--bkb-text)" }}>{a.t}</div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--bkb-textMuted)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {a.s}
                  </div>
                </div>
                <div style={{ fontSize: 11, color: "var(--bkb-textSubtle)", flexShrink: 0 }}>{a.d}</div>
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
                marginBottom: 12,
              }}
            >
              Bookmarked entities
            </div>
            {[
              { id: "PV-interneuron-CA1", name: "PV+ interneuron (CA1)", type: "agent" as EntityType },
              { id: "patch-seq-2023", name: "Patch-seq v3", type: "evidence" as EntityType },
              { id: "hippocampus-CA1", name: "Hippocampal CA1", type: "agent" as EntityType },
            ].map((b) => {
              const m = TYPE_META[b.type];
              return (
                <button
                  key={b.id}
                  onClick={() => onOpenEntity(b.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    width: "100%",
                    padding: "8px 0",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: FONTS.body,
                  }}
                >
                  <Icon name={m.icon} size={14} style={{ color: m.color }} />
                  <span style={{ fontSize: 12, color: "var(--bkb-text)", flex: 1 }}>{b.name}</span>
                  <Icon name="arrow" size={11} style={{ color: "var(--bkb-textSubtle)" }} />
                </button>
              );
            })}
          </div>

          <div className="bkb-card" style={{ padding: 18, background: "var(--bkb-surfaceAlt)" }}>
            <div style={{ fontFamily: FONTS.display, fontSize: 18, marginBottom: 6, letterSpacing: "-0.01em" }}>
              Contribute data
            </div>
            <div style={{ fontSize: 12, color: "var(--bkb-textMuted)", lineHeight: 1.5, marginBottom: 14 }}>
              Submit datasets, annotations, or structured corpora for ingestion.
            </div>
            <button className="bkb-btn bkb-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              <Icon name="upload" size={13} /> Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentPipeline() {
  const agents = [
    { name: "ingest", role: "Fetch & parse PDFs", status: "idle", throughput: "200/200", c: "var(--bkb-textMuted)" },
    { name: "chunker", role: "Semantic segmentation", status: "idle", throughput: "200/200", c: "var(--bkb-textMuted)" },
    { name: "extract-v2", role: "LLM entity + relation extraction", status: "running", throughput: "134/200", c: "var(--bkb-agent)" },
    { name: "validator", role: "Ontology alignment (UBERON, MeSH)", status: "running", throughput: "312 triples", c: "var(--bkb-evidence)" },
    { name: "cross-ref", role: "Graph neighborhood lookup", status: "running", throughput: "284 matches", c: "var(--bkb-primary)" },
    { name: "reviewer", role: "Conflict detection & routing", status: "waiting", throughput: "23 flagged", c: "var(--bkb-publication)" },
  ];
  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", gap: 10, alignItems: "stretch", overflowX: "auto" }} className="bkb-scroll">
        {agents.map((a, i) => (
          <React.Fragment key={a.name}>
            <div
              style={{
                minWidth: 180,
                flex: 1,
                padding: 14,
                borderRadius: 8,
                border: `1px solid ${a.status === "running" ? a.c : "var(--bkb-border)"}`,
                background: a.status === "running" ? `color-mix(in oklch, ${a.c}, transparent 90%)` : "var(--bkb-surface)",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                <Icon name="agent" size={12} style={{ color: a.c }} />
                <span className="bkb-mono" style={{ fontSize: 12, fontWeight: 600 }}>
                  {a.name}
                </span>
                {a.status === "running" && (
                  <span className="bkb-pulse-dot" style={{ marginLeft: "auto", background: a.c }} />
                )}
              </div>
              <div style={{ fontSize: 11, color: "var(--bkb-textMuted)", marginBottom: 10 }}>{a.role}</div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--bkb-textSubtle)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {a.status}
              </div>
              <div style={{ fontFamily: FONTS.display, fontSize: 18, color: a.c, fontWeight: 400 }}>{a.throughput}</div>
            </div>
            {i < agents.length - 1 && (
              <div style={{ display: "flex", alignItems: "center", color: "var(--bkb-textSubtle)" }}>
                <Icon name="arrow" size={14} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function DashWorkflows() {
  const logLines = [
    "[14:02:41] chunker: split paper#143 → 24 chunks",
    "[14:02:43] extract-v2: proposed expressesMarker(PV+ int. CA1, Parvalbumin) conf=0.97",
    "[14:02:44] extract-v2: proposed locatedIn(PV+ int. CA1, stratum oriens) conf=0.84",
    "[14:02:44] validator: aligned to UBERON:0003881 ✓",
    "[14:02:45] cross-ref: found 3 supporting citations in graph",
    "[14:02:46] conflict-check: ⚠ firingRateRange disputed (0.78 vs 0.94)",
    "[14:02:47] → flagged for human review · queued in dashboard",
    "[14:02:48] chunker: split paper#144 → 31 chunks",
    "[14:02:51] extract-v2: proposed synapticInputFrom(PV+ int. CA1, CA3) conf=0.81",
  ];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        <div className="bkb-card" style={{ padding: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <div>
              <div style={{ fontSize: 15, fontWeight: 500 }}>Q2 corpus extraction</div>
              <div style={{ fontSize: 11, color: "var(--bkb-textMuted)", marginTop: 2 }}>200 papers · started 2h ago</div>
            </div>
            <span
              className="bkb-chip"
              style={{ borderColor: "var(--bkb-accent)", color: "var(--bkb-accent)", background: "transparent" }}
            >
              <span className="bkb-pulse-dot" /> Running
            </span>
          </div>
          <WorkflowMini />
        </div>
        <div className="bkb-card" style={{ padding: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <div>
              <div style={{ fontSize: 15, fontWeight: 500 }}>Hippocampus rescan</div>
              <div style={{ fontSize: 11, color: "var(--bkb-textMuted)", marginTop: 2 }}>42 papers · paused</div>
            </div>
            <span className="bkb-chip">Paused</span>
          </div>
          <WorkflowMini />
        </div>
      </div>

      <div className="bkb-card" style={{ marginBottom: 16 }}>
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid var(--bkb-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: 15, fontWeight: 500 }}>Agent pipeline — Q2 corpus extraction</div>
            <div style={{ fontSize: 12, color: "var(--bkb-textMuted)", marginTop: 2 }}>Live proposals from the extract stage</div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button className="bkb-btn bkb-btn-ghost">
              <Icon name="pause" size={12} /> Pause
            </button>
            <button className="bkb-btn bkb-btn-ghost">
              <Icon name="settings" size={12} /> Configure
            </button>
          </div>
        </div>
        <AgentPipeline />
      </div>

      <div className="bkb-card">
        <div
          style={{
            padding: "14px 20px",
            borderBottom: "1px solid var(--bkb-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 500 }}>Live agent log</div>
          <span style={{ fontSize: 11, color: "var(--bkb-textMuted)" }}>Following tail · 412 proposals generated</span>
        </div>
        <div
          className="bkb-mono bkb-scroll"
          style={{
            fontSize: 12,
            padding: 16,
            background: "var(--bkb-surfaceAlt)",
            color: "var(--bkb-textMuted)",
            lineHeight: 1.7,
            maxHeight: 220,
            overflow: "auto",
          }}
        >
          {logLines.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashKeys() {
  const keys = [
    { name: "prod-research-pipeline", prefix: "bkb_live_4a7c...e91f", scope: "read, query, propose", created: "Oct 12, 2025", last: "3 min ago", calls: "142.4k" },
    { name: "local-dev", prefix: "bkb_test_9f2b...02c4", scope: "read, query", created: "Dec 3, 2025", last: "Yesterday", calls: "2.8k" },
    { name: "notebooks-sandbox", prefix: "bkb_test_e15a...77ba", scope: "read", created: "Mar 22, 2026", last: "2 weeks ago", calls: "412" },
  ];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <h2
            style={{
              fontFamily: FONTS.display,
              fontSize: 24,
              margin: 0,
              letterSpacing: "-0.01em",
              fontWeight: 400,
            }}
          >
            API keys
          </h2>
          <div style={{ fontSize: 12, color: "var(--bkb-textMuted)", marginTop: 4 }}>
            Manage credentials for SPARQL, REST, and agent endpoints.
          </div>
        </div>
        <button className="bkb-btn bkb-btn-primary">
          <Icon name="plus" size={13} /> New API key
        </button>
      </div>

      <div className="bkb-card">
        <div
          style={{
            padding: "10px 20px",
            background: "var(--bkb-surfaceAlt)",
            borderBottom: "1px solid var(--bkb-border)",
            display: "grid",
            gridTemplateColumns: "1.2fr 1.5fr 1fr 1fr 0.8fr auto",
            gap: 16,
            fontSize: 11,
            color: "var(--bkb-textMuted)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          <span>Name</span>
          <span>Key</span>
          <span>Scope</span>
          <span>Last used</span>
          <span>Calls</span>
          <span></span>
        </div>
        {keys.map((k, i) => (
          <div
            key={k.name}
            className="bkb-hover-row"
            style={{
              padding: "14px 20px",
              borderBottom: i < keys.length - 1 ? "1px solid var(--bkb-border)" : "none",
              display: "grid",
              gridTemplateColumns: "1.2fr 1.5fr 1fr 1fr 0.8fr auto",
              gap: 16,
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{k.name}</div>
              <div style={{ fontSize: 11, color: "var(--bkb-textSubtle)" }}>Created {k.created}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                className="bkb-mono"
                style={{ fontSize: 12, background: "var(--bkb-surfaceAlt)", padding: "3px 8px", borderRadius: 4 }}
              >
                {k.prefix}
              </span>
              <Icon name="copy" size={13} style={{ color: "var(--bkb-textMuted)", cursor: "pointer" }} />
            </div>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {k.scope.split(", ").map((s) => (
                <span key={s} className="bkb-chip" style={{ fontSize: 10 }}>
                  {s}
                </span>
              ))}
            </div>
            <span style={{ fontSize: 12, color: "var(--bkb-textMuted)" }}>{k.last}</span>
            <span className="bkb-mono" style={{ fontSize: 12, color: "var(--bkb-text)" }}>
              {k.calls}
            </span>
            <button className="bkb-btn bkb-btn-ghost" style={{ padding: "4px 8px", fontSize: 11 }}>
              <Icon name="dots" size={12} />
            </button>
          </div>
        ))}
      </div>

      <div className="bkb-card" style={{ marginTop: 20, padding: 20 }}>
        <div
          style={{
            fontSize: 11,
            color: "var(--bkb-textSubtle)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Usage this month
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {[
            { l: "Total calls", v: "145,612", lim: "500k quota" },
            { l: "SPARQL queries", v: "3,847", lim: "10k quota" },
            { l: "Proposals", v: "412", lim: "unlimited" },
          ].map((u) => (
            <div key={u.l}>
              <div style={{ fontSize: 12, color: "var(--bkb-textMuted)" }}>{u.l}</div>
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 28,
                  letterSpacing: "-0.015em",
                  fontWeight: 400,
                }}
              >
                {u.v}
              </div>
              <div style={{ fontSize: 11, color: "var(--bkb-textSubtle)" }}>{u.lim}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashHistory() {
  const queries = [
    { q: "dopaminergic neurons in V1", type: "natural", t: "2h ago", results: 18 },
    { q: 'SELECT ?s WHERE { ?s bkb:expressesMarker "PV" }', type: "sparql", t: "4h ago", results: 47 },
    { q: "Patch-seq protocol validation", type: "natural", t: "Yesterday", results: 12 },
    { q: "GABAergic interneurons hippocampus", type: "natural", t: "Yesterday", results: 203 },
    { q: "SELECT ?p ?o WHERE { bkb:agent/PV-interneuron-CA1 ?p ?o }", type: "sparql", t: "2d ago", results: 47 },
    { q: "optogenetics in awake behaving mice", type: "natural", t: "3d ago", results: 34 },
    { q: "channelExpression disputed", type: "natural", t: "1w ago", results: 8 },
  ];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <h2
            style={{
              fontFamily: FONTS.display,
              fontSize: 24,
              margin: 0,
              letterSpacing: "-0.01em",
              fontWeight: 400,
            }}
          >
            Query history
          </h2>
          <div style={{ fontSize: 12, color: "var(--bkb-textMuted)", marginTop: 4 }}>
            38 queries this month · average 23 results per query
          </div>
        </div>
        <button className="bkb-btn bkb-btn-ghost">
          <Icon name="upload" size={13} /> Export CSV
        </button>
      </div>
      <div className="bkb-card">
        {queries.map((q, i) => (
          <div
            key={i}
            className="bkb-hover-row"
            style={{
              padding: "14px 20px",
              borderBottom: i < queries.length - 1 ? "1px solid var(--bkb-border)" : "none",
              display: "grid",
              gridTemplateColumns: "70px 1fr auto auto auto",
              gap: 16,
              alignItems: "center",
            }}
          >
            <span
              className="bkb-chip"
              style={{
                borderColor: q.type === "sparql" ? "var(--bkb-primary)" : "var(--bkb-accent)",
                color: q.type === "sparql" ? "var(--bkb-primary)" : "var(--bkb-accent)",
                background: "transparent",
                justifyContent: "center",
              }}
            >
              {q.type === "sparql" ? "SPARQL" : "NL"}
            </span>
            <div
              className={q.type === "sparql" ? "bkb-mono" : ""}
              style={{
                fontSize: 13,
                color: "var(--bkb-text)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {q.q}
            </div>
            <span style={{ fontSize: 12, color: "var(--bkb-textMuted)" }}>{q.results} results</span>
            <span style={{ fontSize: 12, color: "var(--bkb-textSubtle)" }}>{q.t}</span>
            <div style={{ display: "flex", gap: 4 }}>
              <button className="bkb-btn bkb-btn-ghost" style={{ padding: "4px 8px", fontSize: 11 }}>
                <Icon name="sync" size={11} /> Rerun
              </button>
              <button className="bkb-btn bkb-btn-ghost" style={{ padding: "4px 8px", fontSize: 11 }}>
                <Icon name="bookmark" size={11} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContribHeatmap({ cells }: { cells: number[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 4 }}>
      {Array.from({ length: 12 }).map((_, w) => (
        <div key={w} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {Array.from({ length: 7 }).map((_, d) => {
            const v = cells[w * 7 + d] ?? 0;
            const opacity = 0.12 + v * 0.2;
            return (
              <div
                key={d}
                style={{
                  aspectRatio: "1",
                  background: v === 0 ? "var(--bkb-surfaceAlt)" : "var(--bkb-agent)",
                  opacity: v === 0 ? 1 : opacity,
                  borderRadius: 3,
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

function DashContributions() {
  // Deterministic-looking heatmap (avoid hydration mismatch).
  const cells = React.useMemo(() => {
    const out: number[] = [];
    let seed = 7;
    for (let i = 0; i < 12 * 7; i++) {
      seed = (seed * 9301 + 49297) % 233280;
      out.push(Math.floor((seed / 233280) * 5));
    }
    return out;
  }, []);
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { n: "147", l: "Accepted assertions", c: "var(--bkb-accent)" },
          { n: "12", l: "Under review", c: "var(--bkb-publication)" },
          { n: "6", l: "Rejected", c: "var(--bkb-textMuted)" },
        ].map((s) => (
          <div key={s.l} className="bkb-card" style={{ padding: 16 }}>
            <div
              style={{
                fontFamily: FONTS.display,
                fontSize: 32,
                letterSpacing: "-0.02em",
                color: s.c,
                fontWeight: 400,
                lineHeight: 1,
              }}
            >
              {s.n}
            </div>
            <div style={{ fontSize: 12, color: "var(--bkb-textMuted)", marginTop: 4 }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div className="bkb-card" style={{ padding: 20, marginBottom: 20 }}>
        <div
          style={{
            fontSize: 11,
            color: "var(--bkb-textSubtle)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          Contribution activity · last 12 weeks
        </div>
        <ContribHeatmap cells={cells} />
      </div>

      <div className="bkb-card">
        <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--bkb-border)", fontSize: 14, fontWeight: 500 }}>
          Recent contributions
        </div>
        {[
          { t: "Accepted", p: "expressesMarker", s: "PV+ int. (CA1) → Parvalbumin", d: "2h ago", c: "var(--bkb-accent)" },
          { t: "Accepted", p: "firingRateRange", s: "Basket cell (DG) → 20-80 Hz", d: "2h ago", c: "var(--bkb-accent)" },
          { t: "Under review", p: "synapticInputFrom", s: "PV+ int. (CA1) → Entorhinal III", d: "Yesterday", c: "var(--bkb-publication)" },
          { t: "Accepted", p: "locatedIn", s: "SST+ Martinotti → layer V/VI", d: "2d ago", c: "var(--bkb-accent)" },
          { t: "Rejected", p: "channelExpression", s: "PV+ int. (CA1) → Kv1.1 (insufficient evidence)", d: "3d ago", c: "var(--bkb-textMuted)" },
        ].map((c, i, arr) => (
          <div
            key={i}
            style={{
              padding: "12px 20px",
              borderBottom: i < arr.length - 1 ? "1px solid var(--bkb-border)" : "none",
              display: "grid",
              gridTemplateColumns: "90px 1fr auto",
              gap: 14,
              alignItems: "center",
              fontSize: 12,
            }}
          >
            <span style={{ color: c.c, fontWeight: 500 }}>● {c.t}</span>
            <div>
              <span className="bkb-mono" style={{ fontSize: 11, color: "var(--bkb-textMuted)" }}>
                {c.p}
              </span>
              <span style={{ marginLeft: 8, color: "var(--bkb-text)" }}>{c.s}</span>
            </div>
            <span style={{ color: "var(--bkb-textSubtle)" }}>{c.d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Dashboard({ onOpenEntity }: Props) {
  const [tab, setTab] = React.useState("overview");
  return (
    <div style={{ minHeight: "100%", background: "var(--bkb-bg)" }}>
      <div style={{ background: "var(--bkb-surface)", borderBottom: "1px solid var(--bkb-border)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 32px 0" }}>
          <div
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--bkb-textSubtle)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                Dashboard
              </div>
              <h1
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 40,
                  margin: 0,
                  letterSpacing: "-0.02em",
                  fontWeight: 400,
                }}
              >
                Welcome back, <em>Elena</em>
              </h1>
              <div style={{ fontSize: 13, color: "var(--bkb-textMuted)", marginTop: 4 }}>
                Allen Institute · Contributor since Oct 2024 · <b style={{ color: "var(--bkb-text)" }}>147 assertions</b>{" "}
                in the graph
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="bkb-btn bkb-btn-ghost">
                <Icon name="bell" size={13} /> 3 new
              </button>
              <button className="bkb-btn bkb-btn-primary" onClick={() => setTab("workflows")}>
                <Icon name="sparkle" size={13} /> New workflow
              </button>
            </div>
          </div>

          <div style={{ display: "flex", gap: 2, marginBottom: -1 }}>
            {[
              { id: "overview", l: "Overview" },
              { id: "workflows", l: "Multi-agent workflows" },
              { id: "keys", l: "API keys" },
              { id: "history", l: "Query history" },
              { id: "contributions", l: "Contributions" },
            ].map((t) => (
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
                {t.l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 32px" }}>
        {tab === "overview" && <DashOverview setTab={setTab} onOpenEntity={onOpenEntity} />}
        {tab === "workflows" && <DashWorkflows />}
        {tab === "keys" && <DashKeys />}
        {tab === "history" && <DashHistory />}
        {tab === "contributions" && <DashContributions />}
      </div>
    </div>
  );
}
