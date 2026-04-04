# Design Distill

**Stop generating generic-looking UIs.** Distill any website's real design system, then generate code that actually matches.

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

## The Fix

```bash
npx skills add Muluk-m/design-distill
```

Then tell your AI agent:

```
Distill the design from https://linear.app
```

That's it. The skill extracts the real design tokens (colors, fonts, spacing, components) and saves them as a structured `DESIGN.md`. Every design task after that uses the real palette, real fonts, real component patterns.

## How It Works

```
  "Distill linear.app"            "Make a pricing page"
        │                               │
        ▼                               ▼
  ┌──────────────┐              ┌──────────────────┐
  │  dembrandt   │              │  Load DESIGN.md   │
  │  (tokens)    │              │       +           │
  │      +       │──── save ──▶ │  Re-screenshot    │
  │  screenshots │              │  source site      │
  │  (visual)    │              └──────────────────┘
  └──────────────┘                      │
                                        ▼
                                  Code that looks
                                  like the original
```

1. **Distill** — Extracts design tokens via [dembrandt](https://github.com/nicholasgriffintn/dembrandt) + screenshots for visual ground truth. Outputs a [Stitch-compatible](https://stitch.withgoogle.com/docs/design-md/overview) `DESIGN.md`.

2. **Design** — Loads `DESIGN.md`, re-screenshots the source site for calibration, generates code constrained to the original palette and patterns.

3. **Library** — Every distilled design is saved globally (`~/.config/design-distill/`). Reuse across projects by name: "use the linear style".

## Usage

```
Distill the design from https://vercel.com       # extract + save
Make a login page                                 # auto-loads DESIGN.md
Build a dashboard in the Linear style             # loads from library
List my styles                                    # see saved designs
```

### What You Get

A `DESIGN.md` with concrete, usable values:

```markdown
# Design System

> source_url: https://linear.app
> distilled: 2026-04-04

## Overview
Focused, minimal interface. Clean lines, low visual noise, high information density.

**Tone**: light — background `#FFFFFF`
**Personality**: minimal, precise, developer-focused
**Anti-patterns**: no gradients, no rounded-full buttons, no stock photo heroes

## Colors
- **Primary** (`#5E6AD2`): CTAs, active states
- **Surface** (`#FFFFFF`): Page background
- **On-surface** (`#1A1A2E`): Primary text

## Components
### Primary Button
background: #5E6AD2; color: #FFFFFF; border-radius: 8px;
```

## Compatibility

Works with **Claude Code**, **Codex**, **Openclaw**, and any agent that supports [skills](https://skills.sh).

Output follows the [Google Stitch DESIGN.md specification](https://stitch.withgoogle.com/docs/design-md/overview) — compatible with any tool that reads Stitch design documents.

Dependencies ([dembrandt](https://github.com/nicholasgriffintn/dembrandt) + Playwright) are installed automatically on first use. Falls back to browser-based extraction if installation fails.

## License

MIT
