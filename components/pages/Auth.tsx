"use client";

import React from "react";
import { FONTS, Icon, Logo } from "../design-system";
import type { PageId } from "../app-shell";

export function Auth({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const [mode, setMode] = React.useState<"signin" | "signup">("signin");
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bkb-bg)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      <div
        style={{
          background: "linear-gradient(180deg, oklch(0.22 0.03 200) 0%, oklch(0.18 0.025 200) 100%)",
          color: "oklch(0.96 0.006 85)",
          padding: "56px 56px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
          onClick={() => onNavigate("home")}
        >
          <Logo size={24} />
          <span style={{ fontFamily: FONTS.display, fontSize: 22 }}>BrainKB</span>
        </div>
        <div>
          <h2
            style={{
              fontFamily: FONTS.display,
              fontSize: 48,
              lineHeight: 1.05,
              margin: "0 0 16px",
              letterSpacing: "-0.02em",
              fontWeight: 400,
            }}
          >
            The open<br />
            <em style={{ color: "oklch(0.78 0.13 170)" }}>neuroscience</em>
            <br />
            knowledge graph.
          </h2>
          <p style={{ fontSize: 14, color: "oklch(0.82 0.012 200)", lineHeight: 1.6, maxWidth: 380 }}>
            Contribute to the graph, run multi-agent workflows, and query across 73k assertions with a unified API.
          </p>
        </div>
        <div
          style={{
            fontSize: 11,
            color: "oklch(0.62 0.015 200)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Supported by NIH BRAIN Initiative
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 48 }}>
        <div style={{ width: 360 }}>
          <div
            style={{
              fontSize: 11,
              color: "var(--bkb-textSubtle)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            {mode === "signin" ? "Sign in" : "Create account"}
          </div>
          <h1
            style={{
              fontFamily: FONTS.display,
              fontSize: 32,
              margin: "0 0 28px",
              letterSpacing: "-0.02em",
              fontWeight: 400,
            }}
          >
            {mode === "signin" ? "Welcome back." : "Join BrainKB."}
          </h1>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button className="bkb-btn bkb-btn-ghost" style={{ justifyContent: "center", padding: "10px 14px" }}>
              <span style={{ fontFamily: FONTS.mono, fontSize: 12 }}>O</span> Continue with ORCID
            </button>
            <button className="bkb-btn bkb-btn-ghost" style={{ justifyContent: "center", padding: "10px 14px" }}>
              Continue with institutional SSO
            </button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              margin: "20px 0",
              fontSize: 11,
              color: "var(--bkb-textSubtle)",
            }}
          >
            <div style={{ flex: 1, height: 1, background: "var(--bkb-border)" }} />
            OR
            <div style={{ flex: 1, height: 1, background: "var(--bkb-border)" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {mode === "signup" && (
              <div>
                <label style={{ fontSize: 11, color: "var(--bkb-textMuted)" }}>Full name</label>
                <input className="bkb-input" defaultValue="Elena Michaels" />
              </div>
            )}
            <div>
              <label style={{ fontSize: 11, color: "var(--bkb-textMuted)" }}>Email</label>
              <input className="bkb-input" defaultValue="elena@alleninstitute.org" />
            </div>
            <div>
              <label style={{ fontSize: 11, color: "var(--bkb-textMuted)" }}>Password</label>
              <input className="bkb-input" type="password" defaultValue="••••••••••" />
            </div>
            <button
              onClick={() => onNavigate("dashboard")}
              className="bkb-btn bkb-btn-primary"
              style={{ justifyContent: "center", padding: "10px 14px", marginTop: 6 }}
            >
              {mode === "signin" ? "Sign in" : "Create account"} <Icon name="arrow" size={13} />
            </button>
          </div>
          <div style={{ marginTop: 24, fontSize: 12, color: "var(--bkb-textMuted)", textAlign: "center" }}>
            {mode === "signin" ? (
              <>
                No account?{" "}
                <a
                  onClick={() => setMode("signup")}
                  style={{ color: "var(--bkb-primary)", cursor: "pointer" }}
                >
                  Create one
                </a>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <a
                  onClick={() => setMode("signin")}
                  style={{ color: "var(--bkb-primary)", cursor: "pointer" }}
                >
                  Sign in
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
