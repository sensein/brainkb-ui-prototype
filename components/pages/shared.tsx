"use client";

import React from "react";
import { FONTS } from "../design-system";

export function ConfBar({ v }: { v: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, width: 80 }}>
      <div
        style={{
          flex: 1,
          height: 4,
          background: "var(--bkb-surfaceAlt)",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${v * 100}%`,
            height: "100%",
            background: v > 0.9 ? "var(--bkb-accent)" : "var(--bkb-publication)",
          }}
        />
      </div>
      <span
        className="bkb-mono"
        style={{ fontSize: 10, color: "var(--bkb-textMuted)", width: 28, fontFamily: FONTS.mono }}
      >
        {v.toFixed(2)}
      </span>
    </div>
  );
}
