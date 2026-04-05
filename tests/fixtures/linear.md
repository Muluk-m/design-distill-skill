# Linear Design System

> source_url: https://linear.app
> distilled: 2026-04-05

---

## Overview

Linear is a project management tool for software teams that treats speed and keyboard-first interaction as core product values. The marketing site and the application both use a dark-mode-first aesthetic built on near-black backgrounds, subtle white-alpha borders, and restrained accent colors. Typography is set exclusively in Inter Variable with OpenType features enabled (cv01, ss03) for a geometric, modern feel. The overall impression is dense, information-rich, and engineered, not playful.

**Tone**: dark -- background `#08090a` (app), `#010102` (marketing)
**Personality**: precise, fast, engineered, keyboard-native, opinionated
**Anti-patterns**: never uses bright backgrounds, rounded bubbly shapes, decorative illustrations, or colorful gradients in the UI chrome. No drop shadows on cards for depth hierarchy. No serif fonts anywhere.

## Colors

### Core Palette

- **Background Primary** (`#08090a`): main app background, near-true-black
- **Background Marketing** (`#010102`): marketing site hero and sections
- **Background Secondary** (`#1c1c1f`): sidebar, panels, secondary surfaces
- **Background Tertiary** (`#232326`): elevated cards, dropdowns, popovers
- **Background Quaternary** (`#28282c`): nested surfaces, hover states on tertiary
- **Background Quinary** (`#282828`): deepest nested surface
- **Background Panel** (`#0f1011`): floating panels, command palette backdrop
- **Background Level 3** (`#191a1b`): tertiary depth surface
- **Header Background** (`rgba(11,11,11,0.8)`): sticky header with backdrop blur

### Text Colors

- **Primary Text** (`#f7f8f8`): headings, primary content
- **Secondary Text** (`#d0d6e0`): body text, descriptions
- **Tertiary Text** (`#8a8f98`): muted labels, metadata
- **Quaternary Text** (`#62666d`): disabled text, placeholders
- **Inverted Text** (`#08090a`): text on light/CTA buttons

### Borders & Lines

- **Border Primary** (`#23252a`): card and container borders
- **Border Secondary** (`#34343a`): input borders, dividers
- **Border Tertiary** (`#3e3e44`): button outlines on secondary buttons
- **Line Primary** (`#37393a`): horizontal rules, separators
- **Line Secondary** (`#202122`): subtle dividers
- **Line Tertiary** (`#18191a`): faintest dividers
- **Line Quaternary** (`#141515`): near-invisible separators
- **Line Tint** (`#141516`): tint-level separator
- **White-alpha borders**: `rgba(255,255,255,0.05)`, `rgba(255,255,255,0.08)`, `rgba(255,255,255,0.10)`, `rgba(255,255,255,0.12)` used extensively for subtle glass-like edges

### Brand & Accent

- **Brand** (`#5e6ad2`): Linear indigo, used in logo and brand contexts
- **Accent** (`#7170ff`): primary interactive accent, links, focus rings
- **Accent Hover** (`#828fff`): lighter accent for hover states
- **Accent Tint** (`#18182f`): very dark indigo tint for active/selected backgrounds

### Semantic & Status

- **Green** (`#27a644`): success, completed, done states
- **Red** (`#eb5757`): urgent priority, errors, destructive actions
- **Orange** (`#fc7840`): warnings, high priority
- **Yellow** (`#f0bf00`): caution, medium priority, CTA highlight (marketing)
- **Blue** (`#4ea7fc`): informational, in-progress states
- **Teal** (`#00b8cc`): integration highlights, special features

### Feature-Specific

- **Linear Plan** (`#68cc58`): plan feature branding, bright green
- **Linear Build** (`#d4b144`): build feature branding, gold
- **Linear Security** (`#7a7fad`): security feature branding, muted indigo

### Label Dot Colors (issue categorization)

- Purple (`#8b5cf6`)
- Indigo (`#6366f1`)
- Emerald (`#10b981`)
- Cyan (`#06b6d4`)
- Pink (`#f79ce0`)
- Sky (`#55cdff`)

## Typography

- **Font Family**: `Inter Variable` with fallbacks `SF Pro Display, -apple-system, system-ui, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue`
- **Monospace Font**: `Berkeley Mono` with fallbacks `ui-monospace, SF Mono, Menlo`
- **OpenType Features**: `"cv01", "ss03"` enabled globally (alternate glyphs for a, l, etc.)

### Type Scale

| Context | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| Hero Display | 72px (4.50rem) | 510 | 1.00 | -1.584px |
| Page Title | 64px (4.00rem) | 510 | 1.00 | -1.408px |
| Section Heading | 48px (3.00rem) | 510 | 1.00 | -1.056px |
| Large Heading | 32px (2.00rem) | 400 | 1.13 | -0.704px |
| Medium Heading | 24px (1.50rem) | 400 | 1.33 | -0.288px |
| Small Heading | 20px (1.25rem) | 590 | 1.33 | -0.24px |
| Subheading | 18px (1.13rem) | 400 | 1.60 | -0.165px |
| Emphasized Subheading | 17px (1.06rem) | 590 | 1.60 | -- |
| Body | 16px (1.00rem) | 400 | 1.50 | -- |
| Body Medium | 16px (1.00rem) | 510 | 1.50 | -- |
| Body Semibold | 16px (1.00rem) | 590 | 1.50 | -- |
| Small Body | 15px (0.94rem) | 400 | 1.60 | -0.165px |
| Small Body Medium | 15px (0.94rem) | 510 | 1.60 | -0.165px |
| Small Body Light | 15px (0.94rem) | 300 | 1.47 | -0.165px |
| UI Text | 14px (0.88rem) | 510 | 1.50 | -- |
| UI Caption | 14px (0.88rem) | 400 | 1.50 | -0.182px |
| Small UI | 13px (0.81rem) | 510 | 1.50 | -0.13px |
| Micro | 12px (0.75rem) | 510 | 1.40 | -- |
| Badge Text | 11px (0.69rem) | 510 | 1.40 | -- |
| Overline | 10px (0.63rem) | 400 | 1.50 | -0.15px, `uppercase` |

### Weight Mapping

Linear uses Inter Variable's custom weight axis:
- **300**: Light (used sparingly, secondary descriptions)
- **400**: Regular (body text, inputs)
- **510**: Medium (navigation items, buttons, labels) -- this is Linear's signature "medium" weight
- **590**: Semibold (emphasized headings, active states)

## Elevation

Linear avoids traditional card shadows. Depth is communicated through background color shifts (primary -> secondary -> tertiary -> quaternary) and subtle border treatments.

### Shadow Tokens

- **Hairline bottom**: `rgba(0,0,0,0.03) 0px 1.2px 0px 0px` -- used on list items and table rows (31 instances)
- **Dropdown shadow**: `rgba(0,0,0,0.4) 0px 2px 4px 0px` -- menus, popovers (16 instances)
- **Inset depth**: `rgba(0,0,0,0.2) 0px 0px 12px 0px inset` -- recessed panels (7 instances)
- **Inset border ring**: `rgb(35,37,42) 0px 0px 0px 1px inset` -- card outlines via shadow (5 instances)
- **CTA micro-shadow**: `rgba(0,0,0,0) 0px 8px 2px, rgba(0,0,0,0.01) 0px 5px 2px, rgba(0,0,0,0.04) 0px 3px 2px, rgba(0,0,0,0.07) 0px 1px 1px, rgba(0,0,0,0.08) 0px 0px 1px` -- layered subtle lift on primary CTA buttons
- **Focus ring**: `rgba(0,0,0,0.1) 0px 4px 12px, rgba(0,0,0,0.2) 0px 0px 0px 2px` -- keyboard focus indicator
- **Panel float**: `rgba(8,9,10,0.6) 0px 4px 32px` -- floating panels, modals
- **Overlay**: `rgba(0,0,0,0.85)` -- modal backdrop

## Spacing

**Base unit**: 8px (confirmed by 46 instances at 8px, most frequent spacing value)

### Common Spacing Values

| Token | Value | Usage |
|-------|-------|-------|
| `space-0.5` | 4px | Icon gaps, tight padding |
| `space-1` | 8px | Base unit, inline spacing, small padding |
| `space-1.5` | 12px | Button horizontal padding, list item padding |
| `space-2` | 16px | Section padding, card internal spacing |
| `space-2.5` | 20px | Medium gaps |
| `space-3` | 24px | Card padding, section gaps |
| `space-3.5` | 28px | Large gaps |
| `space-4` | 32px | Section separators |
| `space-6` | 48px | Major section spacing |
| `space-7` | 56px | Large section gaps |
| `space-12` | 96px | Page section vertical spacing |
| `space-16` | 128px | Hero section vertical padding |

### Border Radius Scale

| Value | Count | Usage |
|-------|-------|-------|
| 2px | 48 | Inline badges, status indicators, tiny elements |
| 4px | 43 | Buttons, input fields, small cards |
| 5px | 2 | Combobox, search inputs |
| 6px | 46 | Cards, panels, sidebar items, primary containers |
| 8px | 15 | Larger cards, modal corners |
| 12px | 23 | Section containers, feature cards, header |
| 22px | 5 | Pill-shaped elements |
| 50% | 38 | Avatars, status dots, icon buttons |
| 9999px | 2 | Full pill/capsule buttons (label badges) |

## Components

### Primary Button (CTA / Inverted)

```css
background-color: #e6e6e6;
color: #08090a;
padding: 0px 12px;
border-radius: 4px;
border: 1px solid #e6e6e6;
font-weight: 510;
font-size: 13px;
box-shadow: rgba(0,0,0,0) 0px 8px 2px, rgba(0,0,0,0.01) 0px 5px 2px,
            rgba(0,0,0,0.04) 0px 3px 2px, rgba(0,0,0,0.07) 0px 1px 1px,
            rgba(0,0,0,0.08) 0px 0px 1px;
/* Focus state */
box-shadow: rgba(0,0,0,0.1) 0px 4px 12px, rgba(0,0,0,0.2) 0px 0px 0px 2px;
```

Light button on dark background. Stands out by color inversion.

### Secondary Button

```css
background-color: #28282c;
color: #f7f8f8;
padding: 0px 16px;
border-radius: 4px;
border: 1px solid #3e3e44;
font-weight: 510;
font-size: 15px;
```

Dark button with subtle border, used for secondary actions like "Log in."

### Ghost / Sidebar Navigation Item

```css
background-color: rgba(255,255,255,0.04);
color: #d0d6e0;
padding: 0px 6px;
border-radius: 6px;
border: none;
font-weight: 510;
font-size: 13px;
```

Near-transparent background, blends into sidebar. Hover lifts to `rgba(255,255,255,0.08)`.

### Icon Button (Circular)

```css
background-color: rgba(255,255,255,0.03);
color: #f7f8f8;
border-radius: 50%;
border: 1px solid rgba(255,255,255,0.08);
```

Used for action buttons in issue views (comment, attach, etc.).

### Label Badge (Pill)

```css
background-color: transparent;
color: #d0d6e0;
padding: 0px 10px 0px 5px;
border-radius: 9999px;
border: 1px solid #23252a;
font-weight: 510;
font-size: 12px;
```

Contains a colored dot indicator on the left. Used for issue labels.

### Text Input / Textarea

```css
background-color: rgba(255,255,255,0.02);
color: #d0d6e0;
border: 1px solid rgba(255,255,255,0.08);
border-radius: 6px;
padding: 12px 14px;
box-shadow: rgba(0,0,0,0.2) 0px 0px 0px 1px;
```

Nearly invisible background, relies on subtle border and inset shadow for definition.

### Card / Feature Panel

```css
background-color: #1c1c1f; /* or #232326 for elevated */
border: 1px solid rgba(255,255,255,0.05);
border-radius: 12px 12px 0px 0px; /* top-rounded variant */
/* or full: border-radius: 12px; */
```

No box-shadow for cards. Depth is communicated by background color alone.

### Links

```css
color: #ffffff; /* or #f7f8f8 for primary */
text-decoration: none;
font-weight: 510;
/* Secondary links */
color: #8a8f98;
font-weight: 400;
```

No underlines. Links are distinguished by weight and color, not decoration.

### Status Dots

Small circular indicators using label colors at `border-radius: 50%`, sizes around 6-8px. Used inline with issue labels.

### Marketing CTA (Yellow Highlight)

On the marketing homepage, Linear uses a bright yellow (`#f0bf00`) accent block as a high-contrast call-to-action element against the near-black background. This neon-on-black treatment is distinctive to Linear's marketing pages.

## Do's and Don'ts

### Do

- Use the 8px spacing grid consistently
- Keep backgrounds dark, use background-color shifts (not shadows) for depth hierarchy
- Use `rgba(255,255,255, 0.05-0.12)` for borders instead of solid grays when possible
- Set Inter Variable with `font-feature-settings: "cv01", "ss03"` on all text
- Use weight 510 as the default "medium" for UI elements (it is Linear's signature weight)
- Use tight negative letter-spacing on headings (scale: roughly -2.2% of font size)
- Prefer icon buttons with circular shape and white-alpha borders for inline actions
- Use `border-radius: 6px` as the default container radius
- Keep link text un-decorated (no underlines)

### Don't

- Don't use light/white backgrounds in the application UI
- Don't use box-shadow for card elevation (use background-color tiers instead)
- Don't use rounded/pill buttons for primary actions (pills are only for label badges)
- Don't use colors outside the defined palette for status indicators
- Don't use serif or decorative fonts anywhere
- Don't use text-decoration on links
- Don't use large border-radius (>12px) on cards or containers
- Don't use gradients in the UI chrome (gradients appear only in marketing hero accents)
- Don't use weight 700/bold; Linear's heaviest standard weight is 590
- Don't add decorative illustrations or emoji to the interface
