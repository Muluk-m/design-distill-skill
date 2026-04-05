# Design Distill

**Stop generating generic-looking UIs.** Distill any website's real design system into a structured `DESIGN.md`, then generate code that actually matches.

```
You:    "Distill linear.app, then make me a settings page"
Agent:  → extracts colors, fonts, spacing, components from linear.app
        → saves as DESIGN.md (Stitch-compatible)
        → generates a settings page that looks like Linear, not like every other AI output
```

![Without vs With Design Distill](docs/demo-comparison.png)

*Same prompt: "Make a settings page like Linear." Left: generic AI output. Right: with Design Distill.*

## The Problem

Every AI-generated UI looks the same. Same gradients, same rounded cards, same blue buttons. You ask for "a settings page like Linear" and get generic Material Design.

Design Distill solves this by extracting the *real* design tokens from a live site and constraining generation to that palette.

## Install

```bash
# Install skills (design-distill + design-apply)
npx skills add Muluk-m/design-distill

# Install CLI + dependencies (dembrandt + Playwright)
npx design-distill init
```

After `init`, the `design-distill` CLI is available globally. 5 bundled design systems (GitHub, Linear, Notion, Stripe, Vercel) are pre-installed.

## Two Skills, One Library

```
  design-distill                    design-apply
  ──────────────                    ────────────
  "Distill linear.app"              "用 linear 做个博客主页"
        │                                 │
        ▼                                 ▼
  ┌──────────────┐               ┌──────────────────┐
  │  dembrandt   │               │  Load DESIGN.md   │
  │  (tokens)    │               │       +           │
  │      +       │── global ──▶  │  Re-screenshot    │
  │  screenshots │    library    │  source site      │
  │  (visual)    │               └──────────────────┘
  └──────────────┘                       │
                                         ▼
                                   Code that looks
                                   like the original
```

### design-distill — Extract Design Systems

Extracts design tokens via [dembrandt](https://github.com/nicholasgriffintn/dembrandt) + screenshots for visual ground truth. Outputs a [Stitch-compatible](https://stitch.withgoogle.com/docs/design-md/overview) `DESIGN.md` to the global library.

```
design-distill https://linear.app     # extract from URL → save to library
design-distill ./my-app               # extract from local project
```

### design-apply — Generate with Style Consistency

Loads a design system, re-screenshots the source site for visual calibration, generates code strictly constrained to the original palette, fonts, and component patterns.

```
design-apply 用 linear 做个博客主页    # load from library by name
design-apply 做个登录页                # auto-loads local ./DESIGN.md
```

### CLI — Manage Your Library

```bash
design-distill list                  # list saved styles
design-distill list --json           # JSON output
design-distill show <name>           # display DESIGN.md content
design-distill path <name>           # output filesystem path
design-distill remove <name>         # delete a style
design-distill diff <name>           # compare saved vs. live site
design-distill preview <name>        # visual HTML preview in browser
```

## Architecture

```
design-distill/
├── src/
│   ├── cli.ts                 ← entry point (TypeScript, built with tsdown)
│   ├── types.ts               ← shared type definitions
│   ├── commands/              ← init, list, show, remove, path, diff, preview
│   └── lib/
│       ├── store.ts           ← global library read/write (~/.config/design-distill/)
│       ├── parsers.ts         ← DESIGN.md section extractors
│       └── color.ts           ← color utilities (contrast, deltaE, etc.)
├── skills/
│   ├── design-distill/        ← extraction skill
│   └── design-apply/          ← generation skill
├── tests/
│   ├── unit/                  ← parsers, color, design-header, generate-html
│   └── integration/           ← store round-trip, CLI e2e
├── bundled/                   ← pre-bundled snapshots (github, linear, notion, stripe, vercel)
└── package.json
```

**CLI** handles data operations (storage, dependencies, library management).
**Skills** handle AI behavior (extraction intelligence, style-constrained generation).
**DESIGN.md** is the interchange format between them.

## Development

```bash
npm run build          # build with tsdown → dist/cli.mjs
npm test               # run 70 tests (vitest)
```

## Compatibility

Works with **Claude Code**, **Codex**, **Openclaw**, and any agent that supports [skills](https://skills.sh).

Output follows the [Google Stitch DESIGN.md specification](https://stitch.withgoogle.com/docs/design-md/overview).

## License

MIT
