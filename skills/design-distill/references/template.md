# Design System

> source_url: [source URL, used by design mode for re-screenshotting]
> distilled: [date]

---

## Overview

[2-5 sentences describing the design's look and feel: emotional tone, complexity level, target audience.]

**Tone**: [light / dark / neutral] — background `[actual hex value]`
**Personality**: [up to 3 keywords, e.g., minimal, professional, playful]
**Anti-patterns**: [things this design would never do, observed from screenshots]

---

## Colors

<!-- Bullet format (Stitch-compatible): -->
- **Primary** (`[hex]`): [usage, e.g., CTAs, active states, key interactive elements]
- **Secondary** (`[hex]`): [usage, e.g., supporting actions, chips, toggle states]
- **Tertiary** (`[hex]`): [usage, e.g., accent highlights, badges, decorative elements]
- **Neutral** (`[hex]`): [usage, e.g., backgrounds, surfaces, non-chromatic UI]
- **Surface** (`[hex]`): [usage, e.g., card/panel backgrounds]
- **On-surface** (`[hex]`): [usage, e.g., primary text on backgrounds]
- **Error** (`[hex]`): [usage, e.g., validation errors, destructive actions]
- **Outline** (`[hex]`): [usage, e.g., borders, dividers]

<!-- Alternative table format (for distill mode with many colors): -->
<!--
| Name | Value | Usage |
|------|-------|-------|
| Primary | `[hex]` | [usage] |
| Secondary | `[hex]` | [usage] |
| ...  |       |       |
-->

### Gradients (if any)

```css
/* Record brand gradients here; delete this section if none */
```

---

## Typography

- **Headline Font**: [font name]
- **Body Font**: [font name]
- **Label Font**: [font name]

CDN import (if any):
```html
<!-- actual link tags observed in <head> -->
```

### Type Scale (optional, for distill mode)

| Name | Size | Line Height | Weight | Usage |
|------|------|-------------|--------|-------|
| H1 | `[actual value]` | `[actual value]` | `[actual value]` | Page title |
| H2 | `[actual value]` | `[actual value]` | `[actual value]` | Section title |
| H3 | `[actual value]` | `[actual value]` | `[actual value]` | Subsection title |
| Body | `[actual value]` | `[actual value]` | `[actual value]` | Body text |
| Small | `[actual value]` | `[actual value]` | `[actual value]` | Helper text |

Special treatments (letter-spacing, font-feature-settings, etc.):

---

## Elevation

<!-- Describe how the design conveys depth. Examples: -->
<!-- "This design uses no shadows. Depth is conveyed through border contrast and surface color variation." -->
<!-- "Subtle box-shadows on cards and modals: 0 1px 3px rgba(0,0,0,0.12)" -->

```css
/* Record actual shadows used, or note "uses borders instead of shadows" */
```

---

## Spacing

Base unit: `[actual value, typically 4px or 8px]`

Common usage:
- Button padding: `[actual value]`
- Card inner padding: `[actual value]`
- Section vertical spacing: `[actual value]`
- Grid gap: `[actual value]`

---

## Layout

```css
max-width: [actual value];
padding: 0 [actual value];
```

---

## Components

<!-- Reference: what to specify per component type -->
| Component | Specify |
|-----------|---------|
| Buttons | variants (primary, secondary, tertiary), sizing, padding, corner radius, states |
| Inputs | text fields, text areas, labels, helper text, error states |
| Cards | elevation, border, padding, corner radius |
| Chips | selection, filter, and action variants |
| Lists | item styling, dividers, leading/trailing elements |
| Checkboxes | checked, unchecked, indeterminate states |
| Tooltips | positioning, colors, timing |

### Primary Button
```css
background: [actual value];
color: [actual value];
padding: [actual value];
border-radius: [actual value];
/* hover: */
```

### Secondary Button
```css
background: [actual value];
color: [actual value];
border: [actual value];
/* hover: */
```

### Card
```css
background: [actual value];
border: [actual value];
border-radius: [actual value];
padding: [actual value];
```

### Other Distinctive Components (if any)
<!-- Record components unique to this design -->

---

## Do's and Don'ts

### Do
- [observed from screenshots / design intent]
- [observed from screenshots / design intent]

### Don't
- [observed from screenshots / design intent]
- [observed from screenshots / design intent]
