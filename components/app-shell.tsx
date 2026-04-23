"use client";

import React from "react";
import { FONTS, Icon, Logo } from "./design-system";

export type PageId = "home" | "explorer" | "entity" | "dashboard" | "admin" | "auth" | "docs";

export const NAV_ITEMS: { id: PageId; label: string; icon: string }[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "explorer", label: "Explorer", icon: "graph" },
  { id: "dashboard", label: "Dashboard", icon: "dash" },
  { id: "docs", label: "Docs", icon: "doc" },
];

export const ADMIN_ITEMS: { id: PageId; label: string; icon: string }[] = [
  { id: "admin", label: "Admin", icon: "settings" },
];

type NavProps = {
  page: PageId;
  onNavigate: (p: PageId) => void;
  onOpenSearch: () => void;
};

function NavBtn({
  item,
  active,
  onClick,
}: {
  item: { id: PageId; label: string; icon: string };
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        border: "none",
        background: active ? "var(--bkb-surfaceAlt)" : "transparent",
        color: active ? "var(--bkb-text)" : "var(--bkb-textMuted)",
        padding: "8px 12px",
        borderRadius: 6,
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontSize: 13,
        fontWeight: active ? 500 : 400,
        cursor: "pointer",
        textAlign: "left",
        fontFamily: FONTS.body,
        letterSpacing: "-0.005em",
      }}
    >
      <Icon name={item.icon} size={15} /> {item.label}
      {active && (
        <span
          style={{
            marginLeft: "auto",
            width: 3,
            height: 14,
            borderRadius: 2,
            background: "var(--bkb-primary)",
          }}
        />
      )}
    </button>
  );
}

function MenuItem({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        border: "none",
        background: "transparent",
        width: "100%",
        textAlign: "left",
        padding: "7px 10px",
        borderRadius: 6,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontSize: 13,
        color: "var(--bkb-text)",
        fontFamily: FONTS.body,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bkb-surfaceAlt)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <Icon name={icon} size={14} style={{ color: "var(--bkb-textMuted)" }} /> {label}
    </button>
  );
}

export function UserMenu({
  onNavigate,
  compact,
}: {
  onNavigate: (p: PageId) => void;
  compact?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 10,
          width: compact ? "auto" : "100%",
          padding: compact ? 4 : 6,
          borderRadius: 6,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 999,
            background: "var(--bkb-primary)",
            color: "var(--bkb-primaryInk)",
            fontSize: 11,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONTS.body,
          }}
        >
          EM
        </div>
        {!compact && (
          <div style={{ textAlign: "left", lineHeight: 1.2, flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: "var(--bkb-text)" }}>E. Michaels</div>
            <div style={{ fontSize: 11, color: "var(--bkb-textSubtle)" }}>Allen Institute</div>
          </div>
        )}
        {!compact && <Icon name="down" size={14} style={{ color: "var(--bkb-textSubtle)" }} />}
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            bottom: compact ? "auto" : "100%",
            top: compact ? "100%" : "auto",
            right: 0,
            marginBottom: 6,
            marginTop: 6,
            minWidth: 220,
            zIndex: 50,
            background: "var(--bkb-surface)",
            border: "1px solid var(--bkb-border)",
            borderRadius: 10,
            boxShadow: "0 12px 32px rgba(0,0,0,0.10)",
            padding: 6,
          }}
        >
          <MenuItem icon="dash" label="Dashboard" onClick={() => { setOpen(false); onNavigate("dashboard"); }} />
          <MenuItem icon="settings" label="Settings" onClick={() => setOpen(false)} />
          <MenuItem icon="key" label="API keys" onClick={() => { setOpen(false); onNavigate("dashboard"); }} />
          <div style={{ height: 1, background: "var(--bkb-border)", margin: "4px 6px" }} />
          <MenuItem icon="logout" label="Sign out" onClick={() => { setOpen(false); onNavigate("auth"); }} />
        </div>
      )}
    </div>
  );
}

function Sidebar({ page, onNavigate, onOpenSearch }: NavProps) {
  return (
    <aside
      style={{
        width: 232,
        flexShrink: 0,
        borderRight: "1px solid var(--bkb-border)",
        background: "var(--bkb-surface)",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      <div style={{ padding: "18px 16px 12px", display: "flex", alignItems: "center", gap: 10 }}>
        <Logo size={26} />
        <div style={{ lineHeight: 1.1 }}>
          <div style={{ fontFamily: FONTS.display, fontSize: 19, letterSpacing: "-0.02em" }}>BrainKB</div>
          <div
            style={{
              fontSize: 10,
              color: "var(--bkb-textSubtle)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Neuroscience KG
          </div>
        </div>
      </div>

      <button
        onClick={onOpenSearch}
        className="bkb-btn bkb-btn-ghost"
        style={{
          margin: "4px 12px 14px",
          padding: "7px 10px",
          justifyContent: "space-between",
          background: "var(--bkb-surfaceAlt)",
          fontWeight: 400,
          color: "var(--bkb-textMuted)",
        }}
      >
        <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Icon name="search" size={14} /> Search entities…
        </span>
        <span className="bkb-kbd">⌘K</span>
      </button>

      <nav style={{ padding: "0 8px", flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        <div
          style={{
            fontSize: 10,
            color: "var(--bkb-textSubtle)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "10px 12px 6px",
          }}
        >
          Navigate
        </div>
        {NAV_ITEMS.map((item) => (
          <NavBtn key={item.id} item={item} active={page === item.id} onClick={() => onNavigate(item.id)} />
        ))}
        <div
          style={{
            fontSize: 10,
            color: "var(--bkb-textSubtle)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "18px 12px 6px",
          }}
        >
          Manage
        </div>
        {ADMIN_ITEMS.map((item) => (
          <NavBtn key={item.id} item={item} active={page === item.id} onClick={() => onNavigate(item.id)} />
        ))}
      </nav>

      <div style={{ padding: 12, borderTop: "1px solid var(--bkb-border)" }}>
        <UserMenu onNavigate={onNavigate} />
      </div>
    </aside>
  );
}

function Topbar({ page, onNavigate, onOpenSearch }: NavProps) {
  const items = [...NAV_ITEMS, ...ADMIN_ITEMS];
  return (
    <header
      style={{
        height: 56,
        flexShrink: 0,
        borderBottom: "1px solid var(--bkb-border)",
        background: "var(--bkb-surface)",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: 24,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Logo size={22} />
        <div style={{ fontFamily: FONTS.display, fontSize: 19, letterSpacing: "-0.02em" }}>BrainKB</div>
      </div>
      <nav style={{ display: "flex", gap: 2 }}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              border: "none",
              background: "transparent",
              color: page === item.id ? "var(--bkb-text)" : "var(--bkb-textMuted)",
              padding: "8px 12px",
              fontSize: 13,
              cursor: "pointer",
              fontFamily: FONTS.body,
              fontWeight: page === item.id ? 500 : 400,
              borderBottom: page === item.id ? "2px solid var(--bkb-primary)" : "2px solid transparent",
              borderRadius: 0,
              marginBottom: -1,
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <button
        onClick={onOpenSearch}
        className="bkb-btn bkb-btn-ghost"
        style={{
          marginLeft: "auto",
          width: 320,
          justifyContent: "space-between",
          background: "var(--bkb-surfaceAlt)",
          fontWeight: 400,
          color: "var(--bkb-textMuted)",
        }}
      >
        <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Icon name="search" size={14} /> Search entities, projects, people…
        </span>
        <span className="bkb-kbd">⌘K</span>
      </button>
      <UserMenu onNavigate={onNavigate} compact />
    </header>
  );
}

export function Shell({
  page,
  onNavigate,
  layout,
  children,
  onOpenSearch,
}: NavProps & { layout: "sidebar" | "topbar"; children: React.ReactNode }) {
  if (layout === "topbar") {
    return (
      <div style={{ minHeight: "100%", display: "flex", flexDirection: "column" }}>
        <Topbar page={page} onNavigate={onNavigate} onOpenSearch={onOpenSearch} />
        <main style={{ flex: 1 }}>{children}</main>
      </div>
    );
  }
  return (
    <div style={{ minHeight: "100%", display: "flex" }}>
      <Sidebar page={page} onNavigate={onNavigate} onOpenSearch={onOpenSearch} />
      <main style={{ flex: 1, minWidth: 0 }}>{children}</main>
    </div>
  );
}
