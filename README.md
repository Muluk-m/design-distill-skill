# Design Distill

> Distill any website's design system into a reusable `DESIGN.md`. Generate style-consistent UIs — no more generic AI look.

Compatible with the [Google Stitch DESIGN.md specification](https://stitch.withgoogle.com/docs/design-md/overview).

## Why

Every AI-generated UI looks the same — same gradients, same rounded cards, same blue buttons. Design Distill fixes this by capturing the *real* visual identity of any website and storing it as a structured document. Next time you need a page, just describe what you want and the AI generates code that actually matches the original design.

## How It Works

```
  "Distill linear.app"            "Make a pricing page"
        │                               │
        ▼                               ▼
  ┌──────────────┐              ┌──────────────────┐
  │  dembrandt   │              │ Load              │
  │  (tokens)    │              │ DESIGN.md         │
  │      +       │──── save ──▶ │       +           │
  │  screenshots │              │ Re-screenshot     │
  │  (visual)    │              │ source site       │
  └──────────────┘              └──────────────────┘
                                        │
                                        ▼
                                  Generated code
                                  that looks like
                                  the original
```

**Distill** — Uses [dembrandt](https://github.com/dembrandt/dembrandt) for precise token extraction (colors, fonts, spacing, components) combined with screenshots for visual ground truth. Outputs a structured `DESIGN.md` following the [Stitch DESIGN.md format](https://stitch.withgoogle.com/docs/design-md/format). Saves to both the current project and a global style library for cross-project reuse.

**Design** — Loads a design system from the project (`./DESIGN.md`) or by name from the global library ("use the linear style"), re-screenshots the source site for calibration, then generates frontend code constrained to the original palette, fonts, and component patterns.

**Library** — Manage your collection of saved design systems. List available styles, load by name in any project.

## Install

```bash
npx skills add Muluk-m/design-distill
```

Works with **Claude Code**, **Codex**, **Openclaw**, and any agent that supports [skills](https://skills.sh).

### Optional: Install dembrandt

For higher-quality token extraction, install [dembrandt](https://github.com/dembrandt/dembrandt):

```bash
npm install -g dembrandt
```

Without dembrandt, the skill falls back to browser-based extraction (screenshots + CSS variable sampling). Both paths produce good results.

> **Note:** dembrandt requires Playwright browsers. If you see a Playwright error, run `npx playwright install chromium`.

## Usage

Tell your AI agent:

```
Distill the design from https://linear.app
```

```
Extract the design system from this project
```

```
Make a login page (auto-loads DESIGN.md if it exists)
```

```
Build a dashboard that matches the Linear style
```

### Global Style Library

Every distilled design is saved to `~/.config/design-distill/` so you can reuse it across projects:

```
List my styles                              # see all saved designs
Use the linear style to make a settings page  # load from library
Distill the design from https://vercel.com    # auto-saves to library
```

### What You Get

A `DESIGN.md` file with structured design tokens:

```markdown
# Design System

> source_url: https://linear.app
> distilled: 2026-04-04

## Overview
A focused, minimal interface for a developer productivity tool.
Clean lines, low visual noise, high information density.

**Tone**: light — background `#FFFFFF`
**Personality**: minimal, precise, developer-focused
**Anti-patterns**: no gradients, no rounded-full buttons, no stock photo heroes

## Colors
- **Primary** (`#5E6AD2`): CTAs, active states
- **Secondary** (`#6074B9`): Supporting actions
- **Surface** (`#FFFFFF`): Page background
- **On-surface** (`#1A1A2E`): Primary text
...

## Components
### Primary Button
background: #5E6AD2; color: #FFFFFF; border-radius: 8px;
```

### Migrating from DESIGN-DISTILL.md

If you have an existing `DESIGN-DISTILL.md` from an earlier version, the skill will still detect and use it. To migrate, simply rename the file:

```bash
mv DESIGN-DISTILL.md DESIGN.md
```

The content format is compatible — no other changes needed.

## Project Structure

```
design-distill/
├── skills/design-distill/
│   ├── SKILL.md              # Skill definition (distill + design modes)
│   └── references/
│       └── template.md       # DESIGN.md template
├── README.md
└── LICENSE
```

## License

MIT
