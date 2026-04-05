---
name: design:apply
description: |
  Generate style-consistent frontend code using a saved design system from the global library
  or a local DESIGN.md. Loads the design system, re-screenshots the source site for visual
  calibration, and produces code strictly constrained to the design's palette, typography,
  and component language.
argument-hint: "用 <风格名> 做一个 <页面描述>"
---

# Design Apply

## Step 1: Load Design System

Resolve the design system based on priority:

### Priority 1: Explicit style name from user input

If the user mentions a style name (e.g., "用 linear 做个博客主页"):

```bash
npx design-distill path <name> 2>/dev/null
```

If the style exists, read its DESIGN.md:
```bash
npx design-distill show <name>
```

If not found, report the error and list available styles:
```bash
npx design-distill list
```

### Priority 2: Local `./DESIGN.md`

If no explicit style name but `./DESIGN.md` exists in the current project:

```bash
cat ./DESIGN.md
```

This is the project's own design system (e.g., the user is building a product and has documented their own design language).

### Priority 3: No style available

If neither an explicit name nor a local DESIGN.md:

```bash
npx design-distill list
```

Display available styles and ask the user to choose one. If no styles exist at all, suggest running `design:distill` first.

---

## Step 2: Re-Screenshot Source for Visual Calibration

Extract the `source_url` field from the loaded DESIGN.md.

### If source_url is present

Use `/browse` to visit the URL and take screenshots:

```
Visit <source_url>, take a screenshot of the homepage
If the user's task involves a specific page type (e.g., pricing), also screenshot that subpage
```

Load the screenshots with the Read tool — **look at the reference images** before designing.

Why re-screenshot? Text descriptions drift toward stereotypes ("developer tool = dark mode"), while screenshots are facts. Vercel's default is light mode.

### If re-screenshot fails (404, timeout, site unreachable)

**Fallback to archived screenshots:**

Check if archived screenshots exist:
```bash
ls ~/.config/design-distill/<name>/screenshots/ 2>/dev/null
```

If archived screenshots exist:
- Load them for visual calibration
- Warn: "Using archived screenshots (source site unavailable)"

If no archived screenshots:
- Generate based on document values only
- Warn: "Source site unavailable, no archived screenshots. Generating from document values only."

### If no source_url

The design system was extracted from a local project. Generate based on document values only, without screenshots.

---

## Step 3: Style Calibration

Looking at both the screenshots (if available) and the document, identify:

- **Core visual facts**: Background light or dark? What font? CTA color?
- **Personality keywords** (3 max)
- **Anti-patterns** from the Don't list — what this design would never do

---

## Step 4: Generate

Produce frontend code, HTML, or design artifacts based on the user's request.

**Constraints:**
- Colors must come from the document's palette — no new colors
- Fonts must match the document's font families
- Reference the screenshot's actual proportions and visual density
- Component shapes follow the document's component vocabulary

---

## Step 5: Post-Generation Self-Check

After generating code, verify:

- [ ] Background tonality matches the screenshot (don't flip light/dark)
- [ ] Fonts are correct (exact family names from DESIGN.md)
- [ ] CTA button color and shape match the screenshot
- [ ] No colors used outside the palette
- [ ] Overall feel matches the screenshot

If any check fails, fix the issue before presenting the result.
