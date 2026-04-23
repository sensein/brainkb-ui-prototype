"use client";

import React from "react";
import { Theme, type ThemeName } from "./design-system";
import { Shell, type PageId } from "./app-shell";
import { Landing, LandingNav } from "./pages/Landing";
import { Explorer } from "./pages/Explorer";
import { EntityDetail } from "./pages/Entity";
import { Dashboard } from "./pages/Dashboard";
import { Admin } from "./pages/Admin";
import { Auth } from "./pages/Auth";
import { Docs } from "./pages/Docs";
import { CommandPalette } from "./CommandPalette";

type Props = {
  initialPage?: PageId;
  theme?: ThemeName;
  layout?: "sidebar" | "topbar";
};

export function Prototype({ initialPage = "home", theme = "light", layout = "topbar" }: Props) {
  const [page, setPage] = React.useState<PageId>(initialPage);
  const [entityId, setEntityId] = React.useState("PV-interneuron-CA1");
  const [searchOpen, setSearchOpen] = React.useState(false);

  // Restore page from localStorage after mount (avoids SSR/hydration mismatch).
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("bkb-page") as PageId | null;
      if (saved) setPage(saved);
    } catch {}
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem("bkb-page", page);
    } catch {}
  }, [page]);

  React.useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const openEntity = (id: string) => {
    setEntityId(id);
    setPage("entity");
  };

  const bareChrome = page === "home" || page === "auth";

  const content = (() => {
    switch (page) {
      case "home":
        return <Landing onNavigate={setPage} />;
      case "explorer":
        return <Explorer onNavigate={setPage} onOpenEntity={openEntity} />;
      case "entity":
        return <EntityDetail entityId={entityId} onNavigate={setPage} onOpenEntity={openEntity} />;
      case "dashboard":
        return <Dashboard onNavigate={setPage} onOpenEntity={openEntity} />;
      case "admin":
        return <Admin />;
      case "auth":
        return <Auth onNavigate={setPage} />;
      case "docs":
        return <Docs />;
      default:
        return <Landing onNavigate={setPage} />;
    }
  })();

  return (
    <Theme theme={theme} style={{ minHeight: "100vh" }}>
      {bareChrome ? (
        page === "home" ? (
          <>
            <LandingNav onNavigate={setPage} />
            {content}
          </>
        ) : (
          content
        )
      ) : (
        <Shell page={page} onNavigate={setPage} layout={layout} onOpenSearch={() => setSearchOpen(true)}>
          {content}
        </Shell>
      )}
      {searchOpen && (
        <CommandPalette
          onClose={() => setSearchOpen(false)}
          onNavigate={(p, id) => {
            if (id) openEntity(id);
            else setPage(p);
            setSearchOpen(false);
          }}
        />
      )}
    </Theme>
  );
}
