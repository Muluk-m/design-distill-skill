---
name: design-distill
description: |
  Distill and reuse design systems. Three modes:
  1. Distill mode: Extract a design system from a website URL (via dembrandt) or local project —
     colors, typography, spacing, component language, visual personality — into a structured
     DESIGN.md document (compatible with Google Stitch DESIGN.md specification).
     Saves to both project (`./DESIGN.md`) and global library (`~/.config/design-distill/<name>.md`).
  2. Design mode: When DESIGN.md exists or a named style is referenced, load it and re-screenshot
     the source site for visual calibration, then generate style-consistent frontend code/HTML/designs.
  3. Library mode: List, browse, and manage saved design systems from the global library.
  Triggers: "distill the design from", "reference this site's style", "match this project's UI",
  "no more AI-looking UI", "make a page that looks like XX", "extract design system",
  "use the style from", "use the X style", "list my styles", "show saved designs",
  "what styles do I have". When DESIGN.md exists, any design task auto-enters design mode.
---

# Design Distill

Three modes, auto-detected:

## Mode Detection

**Step 1: Check if the user referenced a named style or library action:**

- User says "use the **linear** style", "apply **vercel** design", etc. → load from global library, enter **Design Mode**
- User says "list my styles", "show saved designs", "what styles do I have" → enter **Library Mode**

**Step 2: If no named style, check for project-level design document:**

```bash
find . -maxdepth 3 \( -name "DESIGN.md" -o -name "DESIGN-DISTILL.md" \) 2>/dev/null | head -5
```

**Resolution order** (first match wins):
1. **Explicit named style** (from user input) → load from `~/.config/design-distill/<name>.md`, enter **Design Mode**
2. **Project `DESIGN.md`** found → enter **Design Mode**
3. **Project `DESIGN-DISTILL.md`** found (no DESIGN.md) → enter **Design Mode** (backward compatible)
4. **No file, no named style** → enter **Distill Mode**

---

## Global Style Library

Design systems are stored in a global library at `~/.config/design-distill/`. Each file is a complete DESIGN.md named `<style-name>.md` (kebab-case).

```
~/.config/design-distill/
├── linear.md
├── vercel.md
├── deepclick.md
└── ...
```

The directory is created automatically on first distill (`mkdir -p`). If creation fails (permissions), the skill writes only the project-level file and warns the user.

### List Styles

Triggered by: "list my styles", "show saved designs", "what styles do I have"

```bash
ls ~/.config/design-distill/*.md 2>/dev/null
```

For each file, read the `source_url` and `distilled` fields from the header and display:

| Style | Source | Distilled |
|-------|--------|-----------|
| linear | https://linear.app | 2026-04-04 |
| vercel | https://vercel.com | 2026-04-03 |

If no files exist, respond: "No styles saved yet. Distill a website to start your library."

### Load Style by Name

When the user references a style name (e.g., "use the linear style"):

```bash
cat ~/.config/design-distill/<name>.md 2>/dev/null
```

- **Found** → load as the active DESIGN.md, enter Design Mode
- **Not found** → respond: "Style '<name>' not found. Run 'list my styles' to see available styles, or distill a new one."

---

## Distill Mode: Extract a Design System

### Step 1: Confirm Source

If the user hasn't specified, ask:
- Website URL or local project path?

### Step 2: Extract (pick one based on source)

#### Source A: Website URL

**Check if dembrandt is available:**

```bash
npx dembrandt --version 2>/dev/null
```

If dembrandt is found, **also check Playwright browser availability:**

```bash
# macOS
ls ~/Library/Caches/ms-playwright/chromium*/chrome-*/chrome* 2>/dev/null | head -1
# Linux
ls ~/.cache/ms-playwright/chromium*/chrome-linux/chrome 2>/dev/null | head -1
```

- **Both pass** → use dembrandt
- **dembrandt found but Playwright browser missing** → prompt the user:
  > "dembrandt is installed but needs Playwright browsers. Run `npx playwright install chromium` (~100MB) to enable high-quality extraction, or continue with browser-based extraction."
  - If user chooses to install → suggest running the command, then retry
  - If user chooses to skip → fall back to `/browse` extraction
- **dembrandt not found** → fall back to `/browse` extraction

##### With dembrandt (preferred)

Run extraction and take screenshots in parallel:

1. **Extract tokens:**
   ```bash
   npx dembrandt <url> --json-only
   ```
   Capture the JSON output — it contains `colors`, `typography`, `spacing`, `borderRadius`, `shadows`, `components`, and more with confidence scores.

2. **Take screenshots for visual ground truth** using `/browse`:
   - Homepage — observe the real background color (light or dark? don't guess from the brand name)
   - 1-2 representative subpages (e.g., /pricing, /docs)

3. **Combine both sources:**
   - Use dembrandt's exact values (hex colors, px/rem sizes, font names) for the data
   - Use screenshots to validate: overall lightness/darkness, visual density, design personality
   - When they conflict, trust the screenshot

##### Without dembrandt (fallback)

Use `/browse` for everything:

```
1. Visit the URL, screenshot the full homepage
2. Screenshot 1-2 subpages
3. From the screenshots, directly identify:
   - Background tonality (light/dark/neutral)
   - Primary text color
   - CTA button color and shape
   - Card/panel appearance
   - Overall layout density

4. Extract CSS variables via JavaScript:
   Object.fromEntries(
     [...document.styleSheets]
       .flatMap(s => { try { return [...s.cssRules] } catch(e) { return [] } })
       .filter(r => r.selectorText === ':root' || r.selectorText === 'html')
       .flatMap(r => [...r.style])
       .map(v => [v, getComputedStyle(document.documentElement).getPropertyValue(v)])
   )

5. Sample computed colors from key elements (only if step 4 yields sparse results)
6. Extract font references from <head> link tags and @import rules
```

If the site has `/design`, `/brand`, `/style-guide`, or `/storybook`, visit those too.

**Screenshots are primary.** If CSS extraction fails, visual analysis from screenshots alone can produce accurate results.

#### Source B: Local Project

Read in priority order:

```bash
# 1. Tailwind config (richest source)
find . -name "tailwind.config.*" -not -path "*/node_modules/*" | head -3

# 2. CSS custom properties
grep -r "^:root\|^html" --include="*.css" --include="*.scss" -l | head -10

# 3. Design token files
find . -name "tokens.*" -o -name "design-tokens.*" -o -name "theme.*" \
  -not -path "*/node_modules/*" | head -5

# 4. Component sampling
find . -path "*/components/*" \( -name "Button*" -o -name "Card*" \) | head -5
```

### Step 3: Generate DESIGN.md

Assemble the document using the structure from `references/template.md`.

**Key principles:**
- Every value must be concrete — write `#1a1a2e`, not "a dark blue"
- Visual judgments (light/dark, personality) come from screenshots, not assumptions
- Include `source_url` in the header (if from a website) for design mode to re-screenshot

### Step 4: Save to Project + Global Library

**Derive default style name:**
- URL source: extract domain without TLD (e.g., `https://linear.app` → `linear`)
- Local project: use directory name (e.g., `./my-app` → `my-app`)

**Confirm with user:**
> "Save as style name `<name>`? (enter to confirm, or type a different name)"

**Check for collision:**
```bash
ls ~/.config/design-distill/<name>.md 2>/dev/null
```
If the file exists, ask: "Style `<name>` already exists. Overwrite or choose a different name?"

**Write to both locations:**
```bash
# Project-level
# (write ./DESIGN.md with the generated content)

# Global library
mkdir -p ~/.config/design-distill
# (write ~/.config/design-distill/<name>.md with identical content)
```

If `mkdir -p` fails, write only the project-level file and warn: "Could not write to global library. Style saved to project only."

**Completion message:**
> "Saved to `./DESIGN.md` and global library as `<name>`. Use 'apply <name> style' in any project to reuse it."

---

## Design Mode: Generate with Style Consistency

### Step 1: Load Document + Re-screenshot

Load the design document based on how design mode was entered:

```bash
# If entered via named style:
cat ~/.config/design-distill/<name>.md

# If entered via project-level file:
cat DESIGN.md
# (or DESIGN-DISTILL.md for backward compat)
```

Extract the `source_url` field. If present, immediately re-screenshot using `/browse`:

```
Visit <source_url>, take a screenshot
If the user's task involves a specific page type (e.g., pricing), also screenshot that subpage
```

Load the screenshots with the Read tool — **look at the reference images** before designing.

Why re-screenshot instead of just reading the document? Text descriptions drift toward stereotypes ("developer tool = dark mode"), while screenshots are facts. Vercel's default is light mode — relying on text alone would get this wrong.

### Step 2: Style Calibration

Looking at both the screenshots and the document, identify:
- **Core visual facts**: Background light or dark? What font? CTA color?
- **Personality keywords** (3 max)
- **Anti-patterns** from the Don't list — what this design would never do

### Step 3: Generate

Produce frontend code, HTML, or design artifacts based on the user's request.

**Constraints:**
- Colors must come from the document's palette — no new colors
- Fonts must match the document's font families
- Reference the screenshot's actual proportions and visual density
- Component shapes follow the document's component vocabulary

**Post-generation self-check:**
- [ ] Background tonality matches the screenshot (don't flip light/dark)
- [ ] Fonts are correct
- [ ] CTA button color and shape match the screenshot
- [ ] No colors used outside the palette
- [ ] Overall feel matches the screenshot

