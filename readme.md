# BrainKB UI — Redesign Prototype

Implementation of the new BrainKB UI wireframe, ported from a Claude Design
handoff bundle to a Next.js 14 app. Pixel-perfect port of the seven-page
prototype: Landing, Explorer, Entity, Dashboard, Admin, Auth, Docs.

## Stack

- Next.js 14 (App Router) + React 18 + TypeScript
- Inline-styles + CSS variables (no Tailwind); themes via OKLCH tokens
- Instrument Serif / Inter / JetBrains Mono (Google Fonts)

## Getting Started

```bash
git clone <repo-url>
cd <project-folder>
npm install
npm run dev
```

Open <http://localhost:3000>.

## Scripts

| Script          | Purpose                                              |
| --------------- | ---------------------------------------------------- |
| `npm run dev`   | Start the Next.js dev server.                        |
| `npm run build` | Production build. Set `EXPORT=true` for static HTML. |
| `npm run start` | Serve the production build (non-export mode).        |
| `npm run lint`  | Lint with `next lint`.                               |

### Static export

```bash
EXPORT=true NEXT_PUBLIC_BASE_PATH=/your-subpath npm run build
npx serve out
```

Output lands in `out/`. `NEXT_PUBLIC_BASE_PATH` is only needed if the site is
served under a sub-path (e.g. GitHub project pages).

## Project layout

```
app/
  layout.tsx         Root layout, Google Fonts, global CSS
  page.tsx           Mounts <Prototype /> (state-driven router)
  globals.css        bkb-* utilities, scrollbar, buttons, chips, keyframes
components/
  design-system.tsx  Theme tokens, Icon set, Logo, sample data (SAMPLE_ENTITIES, TYPE_META)
  app-shell.tsx      Topbar / Sidebar chrome, UserMenu
  CommandPalette.tsx ⌘K overlay
  Prototype.tsx      Root component — owns page/entity/search state
  pages/
    Landing.tsx      Public hero, architecture, KG preview, explore grid, footer
    Explorer.tsx     Faceted list + graph view with entity side-panel
    Entity.tsx       Detail page with tabs (overview, assertions, graph, history…)
    Dashboard.tsx    Overview, workflows, API keys, query history, contributions
    Admin.tsx        Admin panel (stats, sync, data, enrich, pull, delete, export)
    Auth.tsx         Split-screen sign-in / sign-up
    Docs.tsx         Three-column docs layout
    shared.tsx       ConfBar (confidence indicator)
```

## Navigation model

The prototype uses a single page route; `components/Prototype.tsx` holds
`page` / `entityId` / `searchOpen` in React state and renders the right page
component, mirroring the original design. Last visited page is persisted in
`localStorage`. ⌘K (or Ctrl+K) opens the command palette.

## Deployment

`.github/workflows/pages.yml` publishes to the `gh-pages` branch:

- **Push to `main`** → deploys to the Pages root
  (`https://<host>/<repo>/`).
- **Pull request to `main`** → deploys a preview to `pr-<N>/`
  (`https://<host>/<repo>/pr-<N>/`) and posts the URL as a PR comment. `<N>`
  is the PR number, so each PR gets its own directory and multiple open PRs
  can be previewed side-by-side.
- **PR closed or merged** → the `cleanup` job removes that PR's directory
  from `gh-pages`. Numbers are never reused, so stale preview URLs stay dead.
- Root and `pr-<N>/` deploys coexist — `keep_files: true` means a `main`
  deploy won't wipe out live PR previews.

One-time setup in repo Settings → Pages: **Source = Deploy from a branch**,
**Branch = `gh-pages` / root**. PRs from forks cannot deploy previews (no
write token).

## License

Apache 2.0
