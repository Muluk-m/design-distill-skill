---
name: design-distill
description: |
  Extract a design system from a website URL or local project into a structured DESIGN.md document
  (compatible with Google Stitch DESIGN.md specification). Saves to global library only
  (~/.config/design-distill/<name>/DESIGN.md), never to the project root.
  When invoked without arguments, lists all saved design systems.
argument-hint: "<URL 或本地项目路径>"
---

# Design Distill

## No-Argument Behavior: List Styles

When invoked without arguments, list all saved styles:

```bash
design-distill list
```

If `design-distill` is not found, suggest: "Run `npx design-distill init` to install the CLI globally."

Display the result and ask what the user wants to do next.

---

## Distill from URL

### Step 1: Confirm Source

If the user provided a URL, use it directly. Otherwise ask:
- Website URL?
- Style name? (default: derive from domain, e.g., `https://linear.app` → `linear`)

### Step 2: Check Dependencies

```bash
npx dembrandt --version 2>/dev/null
```

#### With dembrandt (preferred)

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

#### Without dembrandt (fallback)

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

### Step 3: Generate DESIGN.md

Assemble the document using the structure from `references/template.md`.

**Key principles:**
- Every value must be concrete — write `#1a1a2e`, not "a dark blue"
- Visual judgments (light/dark, personality) come from screenshots, not assumptions
- Include `source_url` in the header for design-apply to re-screenshot

### Step 4: Save to Global Library Only

**Derive default style name:**
- URL source: extract domain without TLD (e.g., `https://linear.app` → `linear`)
- Confirm with user

**Check for collision:**
```bash
design-distill path <name> 2>/dev/null
```

If the style exists, ask: "Style `<name>` already exists. Overwrite or choose a different name?"

**Save:**
```bash
design-distill show <name> 2>/dev/null  # verify after save
```

Write the DESIGN.md to `~/.config/design-distill/<name>/DESIGN.md`:
```bash
mkdir -p ~/.config/design-distill/<name>
# Write DESIGN.md content to ~/.config/design-distill/<name>/DESIGN.md
```

**Save screenshots** to `~/.config/design-distill/<name>/screenshots/` for archival.
Previous screenshots are overwritten on re-distill.

**IMPORTANT: Do NOT write DESIGN.md to the project root directory.**
The distilled design system belongs to the global library, not the current project.

**Completion message:**
> "Saved to global library as `<name>`. Use `design-apply 用 <name> 做个 <页面>` to generate with this style."

---

## Distill from Local Project

### Step 1: Read Design Sources

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

### Step 2: Generate and Save

Same as URL flow Step 3-4, but:
- Style name defaults to directory name (e.g., `./my-app` → `my-app`)
- No `source_url` in header (local projects don't have one)
- No screenshots to archive
