# Overview

This contains the implementation of the wireframe design for new BrainKB UI.

## Getting Started

1. **Clone the repository** and navigate into the project directory:

   ```bash
   git clone <repo-url>
   cd <project-folder>
   ```
   
2. Install dependencies:

   ```bash
     npm install
   ```
3. Start the development server: `npm run dev`.

## Views

<img width="3024" height="6990" alt="screencapture-localhost-3001-2026-04-23-08_00_31" src="https://github.com/user-attachments/assets/8ffd8e4a-87af-4809-85aa-fc0e664e0ccf" />
<img width="3024" height="1874" alt="screencapture-localhost-3001-2026-04-23-08_00_40" src="https://github.com/user-attachments/assets/fc23dc4c-ea68-4cdf-89d2-0b6e6fd34f20" />
<img width="3024" height="2820" alt="screencapture-localhost-3001-2026-04-23-08_00_49" src="https://github.com/user-attachments/assets/bd1ce78f-5b1c-4564-999e-4179a2e051c2" />


## Visual diff (Argos CI)

Every PR build also takes full-page screenshots of the seven pages and uploads
them to [Argos CI](https://argos-ci.com/). Argos compares them against the
latest `main` baseline and posts a GitHub check with per-page diffs; the PR
comment includes a direct link.

One-time setup:

1. Sign in to Argos with GitHub, install the Argos GitHub App on this repo.
2. Copy the project's `ARGOS_TOKEN` from the Argos dashboard and add it as a
   repo secret named `ARGOS_TOKEN` (Settings → Secrets and variables →
   Actions). Without it, the visual job still runs locally but skips upload.
3. Merge once to `main` so Argos captures an initial baseline.

Local run:

```bash
npm run build          # produces out/
npm run test:visual    # serves out/ and runs Playwright; add ARGOS_TOKEN to upload
```

Page navigation in tests relies on `Prototype.tsx` reading `bkb-page` from
`localStorage` — `tests/visual/pages.spec.ts` seeds that via
`page.addInitScript` before visiting `/`.

## License
Apache 2.0
