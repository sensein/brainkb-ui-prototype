"use client";

import React from "react";
import { FONTS, Icon, SAMPLE_ENTITIES, TYPE_META } from "./design-system";
import type { PageId } from "./app-shell";

type Props = {
  onClose: () => void;
  onNavigate: (page: PageId, id?: string) => void;
};

export function CommandPalette({ onClose, onNavigate }: Props) {
  const [q, setQ] = React.useState("");
  const entities = SAMPLE_ENTITIES.filter((e) => !q || e.name.toLowerCase().includes(q.toLowerCase()));
  const pages: { id: PageId; l: string; icon: string }[] = [
    { id: "home", l: "Home", icon: "home" },
    { id: "explorer", l: "Explorer", icon: "graph" },
    { id: "dashboard", l: "Dashboard", icon: "dash" },
    { id: "admin", l: "Admin", icon: "settings" },
    { id: "docs", l: "Docs", icon: "doc" },
  ];
  const filteredPages = pages.filter((p) => !q || p.l.toLowerCase().includes(q.toLowerCase()));
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        zIndex: 1000,
        display: "flex",
        alignItems: "start",
        justifyContent: "center",
        paddingTop: "15vh",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 600,
          maxHeight: 520,
          background: "var(--bkb-surface)",
          color: "var(--bkb-text)",
          border: "1px solid var(--bkb-border)",
          borderRadius: 12,
          boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          fontFamily: FONTS.body,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 18px",
            borderBottom: "1px solid var(--bkb-border)",
          }}
        >
          <Icon name="search" size={16} style={{ color: "var(--bkb-textMuted)" }} />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search entities, pages, SPARQL…"
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: 15,
              fontFamily: FONTS.body,
              background: "transparent",
              color: "var(--bkb-text)",
            }}
          />
          <span className="bkb-kbd">esc</span>
        </div>
        <div style={{ overflow: "auto", flex: 1 }}>
          {filteredPages.length > 0 && (
            <div>
              <div
                style={{
                  padding: "10px 18px 4px",
                  fontSize: 10,
                  color: "var(--bkb-textSubtle)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Pages
              </div>
              {filteredPages.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onNavigate(p.id)}
                  className="bkb-hover-row"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 18px",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: "var(--bkb-text)",
                    textAlign: "left",
                    fontFamily: FONTS.body,
                    fontSize: 13,
                  }}
                >
                  <Icon name={p.icon} size={14} style={{ color: "var(--bkb-textMuted)" }} />
                  {p.l}
                </button>
              ))}
            </div>
          )}
          {entities.length > 0 && (
            <div>
              <div
                style={{
                  padding: "10px 18px 4px",
                  fontSize: 10,
                  color: "var(--bkb-textSubtle)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Entities
              </div>
              {entities.slice(0, 6).map((e) => {
                const m = TYPE_META[e.type];
                return (
                  <button
                    key={e.id}
                    onClick={() => onNavigate("entity", e.id)}
                    className="bkb-hover-row"
                    style={{
                      width: "100%",
                      display: "grid",
                      gridTemplateColumns: "20px 1fr auto",
                      gap: 12,
                      alignItems: "center",
                      padding: "10px 18px",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      color: "var(--bkb-text)",
                      textAlign: "left",
                      fontFamily: FONTS.body,
                    }}
                  >
                    <Icon name={m.icon} size={14} style={{ color: m.color }} />
                    <div>
                      <div style={{ fontSize: 13 }}>{e.name}</div>
                      <div className="bkb-mono" style={{ fontSize: 11, color: "var(--bkb-textSubtle)" }}>
                        bkb:{e.type}/{e.id}
                      </div>
                    </div>
                    <span className="bkb-chip" style={{ fontSize: 10, borderColor: m.color, color: m.color }}>
                      {m.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
