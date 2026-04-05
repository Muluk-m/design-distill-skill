# Vercel Design System

> source_url: https://vercel.com
> distilled: 2026-04-05

---

## Overview

Vercel's marketing site is a restrained, monochromatic light-mode design built around their custom Geist typeface. The page emphasizes information density through grid-based card layouts and subtle border work rather than flashy gradients or heavy illustration. Interactive elements use pill shapes (border-radius 9999px) for CTAs and small radii (4-6px) for utility controls. The only color bursts come from workflow-state accents (blue for develop, pink for preview, red-orange for ship) that map to Vercel's deploy pipeline.

**Tone**: light -- background `#fafafa` (page surface), cards `#ffffff`
**Personality**: minimal, technical, confident, monochrome-first, developer-oriented
**Anti-patterns**: never uses saturated hero gradients, never uses rounded-avatar social proof, never uses playful illustration or emoji, never uses colored backgrounds for sections (all sections sit on the same near-white surface separated by thin 1px borders)

## Colors

### Core Neutrals
- **Background** (`#fafafa`): page-level surface, also used in subtle badges and overlays
- **Surface / Card** (`#ffffff`): card backgrounds, button fills, elevated containers
- **Foreground / Text Primary** (`#171717`): headings, primary body text, primary button fill
- **Text Secondary** (`#4d4d4d`): subheadings, descriptive copy
- **Text Tertiary** (`#666666`): footer links, metadata labels
- **Text Muted** (`#808080`): placeholder text, disabled states
- **Text Subtle** (`#7d7d7d`): low-priority labels
- **Border Primary** (`#171717`): grid-line borders, structural dividers (used as partial borders: right + bottom)
- **Border Light** (`#ebebeb`): card outlines, tab containers, section separators
- **Border Alpha** (`rgba(0,0,0,0.08)`): subtle button outlines via box-shadow, input rings

### Accent -- Pipeline States
- **Develop** (`#0a72ef`): develop-stage labels, inline links, focus ring color
- **Preview** (`#de1d8d`): preview-stage labels
- **Ship** (`#ff5b4f`): ship-stage labels
- **Link Blue** (`#0072f5`): standard hyperlinks, focus outline `hsla(212,100%,48%,1)`

### Semantic / Console
- **Blue** (`#0070f3`): Vercel brand blue, console highlight, link default
- **Purple** (`#7928ca`): console accent
- **Pink** (`#eb367f`): console accent
- **Info Badge BG** (`#ebf5ff`): badge background for neutral/info pills
- **Info Badge Text** (`#0068d6`): badge foreground

## Typography

**Font Family**: `Geist` (sans-serif), fallback: `Arial, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Noto Sans`
**Mono Font**: `Geist Mono`, fallback: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Courier New`
**Font Features**: `"liga"` enabled globally; `"tnum"` for tabular/numeric contexts

| Scale         | Size   | Weight | Line-Height | Letter-Spacing | Usage                         |
|---------------|--------|--------|-------------|----------------|-------------------------------|
| Display       | 48px   | 600    | 1.00-1.17   | -2.4px         | Hero headline                 |
| Heading 1     | 40px   | 600    | 1.20        | -2.4px         | Section titles                |
| Heading 2     | 32px   | 600    | 1.25        | -1.28px        | Sub-section titles            |
| Heading 3     | 24px   | 500-600| 1.33        | -0.96px        | Card titles, feature headers  |
| Heading 4     | 20px   | 400    | 1.80        | normal         | Lead paragraphs               |
| Subhead       | 18px   | 400    | 1.56        | normal         | Feature descriptions          |
| Body          | 16px   | 400-500| 1.50        | normal         | Body copy, nav links          |
| Body (bold)   | 16px   | 600    | 1.50        | -0.32px        | Emphasized inline text        |
| Label         | 14px   | 400-500| 1.00-1.43   | normal         | Buttons, captions, nav items  |
| Caption       | 12px   | 400-500| 1.33        | normal         | Metadata, small labels        |
| Mono Label    | 13px   | 500    | 1.54        | normal         | Code snippets, tech labels    |
| Mono Micro    | 12px   | 500    | 1.00        | normal         | Uppercase category tags       |
| Micro         | 8px    | 600    | 1.00        | normal         | Tiny uppercase badges (mono)  |

**Key pattern**: Negative letter-spacing on all headings (scales with size: -2.4px at 48px down to -0.28px at 14px). Body text uses default spacing.

## Elevation

Vercel uses layered box-shadows to simulate subtle depth without dramatic lifts. Shadows are always black-alpha, never colored.

| Level    | Value                                                                                                        | Usage                         |
|----------|--------------------------------------------------------------------------------------------------------------|-------------------------------|
| Level 0  | `none`                                                                                                       | Primary (dark) buttons        |
| Level 1  | `rgba(0,0,0,0.04) 0px 2px 2px 0px`                                                                          | Subtle lift on cards          |
| Level 2  | `rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 2px 0px, #fafafa 0px 0px 0px 1px`              | Card outlines, icon buttons   |
| Level 3  | `rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.02) 0px 1px 1px 0px, rgba(0,0,0,0.04) 0px 4px 8px 0px, #fafafa 0px 0px 0px 1px` | Elevated popover cards |
| Focus    | `#ffffff 0px 0px 0px 2px, #0072f5 0px 0px 0px 4px`                                                          | Focus ring (white gap + blue) |
| Inset    | `#eaeaea 0px -1px 0px 0px inset`                                                                             | Tab bar bottom edge           |

**Pattern**: The signature shadow is a 1px `rgba(0,0,0,0.08)` ring (via `0px 0px 0px 1px`) that acts as a border substitute. An inner `#fafafa 0px 0px 0px 1px` ring adds a subtle background-matching outline behind the shadow.

## Spacing

**Base unit**: 4px (Tailwind-style scale)
**Grid**: 8px underlying rhythm

| Token | Value | Common Usage                                      |
|-------|-------|---------------------------------------------------|
| 0.5   | 2px   | Tight padding (inline badges, icon gaps)           |
| 1     | 4px   | Inner padding, border-radius default               |
| 1.5   | 6px   | Small button padding, icon containers              |
| 2     | 8px   | Button horizontal padding, list gaps               |
| 3     | 12px  | Card inner padding, section gaps                   |
| 4     | 16px  | Standard section padding, nav height contribution  |
| 8     | 32px  | Major section gaps                                 |
| 12    | 48px  | Section vertical padding, large gaps               |
| 22.5  | 90px  | Hero-level vertical spacing                        |
| 33.75 | 135px | Full-bleed section spacing                         |

**Max content width**: ~1200px centered. Breakpoints cluster at 768px (tablet), 1024px (desktop), 1200px (wide).

## Border Radius

| Token    | Value   | Usage                                              |
|----------|---------|----------------------------------------------------|
| xs       | 2px     | Inline code badges, tiny accents                   |
| sm       | 4px     | Table cells, grid items, utility containers        |
| default  | 6px     | Buttons (utility), cards, input fields, code blocks|
| md       | 8px     | List items, medium containers                      |
| lg       | 12px    | Image cards (often top-only: `12px 12px 0 0`)      |
| xl       | 16px    | Large containers (rare)                            |
| pill     | 9999px  | CTA buttons, navigation pills, badges, tabs        |
| circle   | 50%     | Icon buttons, menu toggle, avatar placeholders     |

## Components

### Primary Button (CTA)
```css
background-color: #171717;
color: #ffffff;
padding: 0px 10px;
border-radius: 100px; /* pill */
font-size: 14px;
font-weight: 500;
font-family: Geist;
box-shadow: rgba(0,0,0,0.04) 0px 2px 2px 0px;
border: none;
/* hover: slight scale transform, background stays dark */
/* focus: white 2px ring + blue 4px ring */
```

### Secondary Button (Ghost/Outline)
```css
background-color: #ffffff;
color: #171717;
padding: 0px 14px;
border-radius: 100px; /* pill */
font-size: 16px;
font-weight: 500;
font-family: Geist;
box-shadow: rgba(0,0,0,0.08) 0px 0px 0px 1px; /* acts as border */
border: none;
/* hover: invert to dark bg, white text */
```

### Utility Button (Square-ish)
```css
background-color: #ffffff;
color: #171717;
padding: 0px 6px;
border-radius: 6px;
font-size: 14px;
font-weight: 500;
box-shadow: #ebebeb 0px 0px 0px 1px;
/* hover: background darkens */
```

### Icon Button (Circle)
```css
background-color: #ffffff;
color: #171717;
padding: 0px;
border-radius: 50%;
box-shadow: rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 2px 0px, #fafafa 0px 0px 0px 1px;
/* 32x32 or 40x40 touch target */
```

### Card
```css
background-color: #ffffff;
border: none; /* borders via grid lines */
padding: 24px; /* or 12px for compact */
border-radius: 8px; /* or 0 when in a bordered grid */
box-shadow: rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 2px 0px, #fafafa 0px 0px 0px 1px;
```
Cards in grid layouts use structural `#171717` borders (right + bottom only) instead of individual shadows, creating a spreadsheet-like visual.

### Badge / Pill
```css
/* Info variant */
background-color: #ebf5ff;
color: #0068d6;
padding: 0px 10px;
border-radius: 9999px;
font-size: 12px;
font-weight: 500;
text-transform: capitalize;

/* Neutral/subtle variant */
background-color: #fafafa;
color: #4d4d4d;
font-size: 14px;
font-weight: 400;
border-radius: 0px;
```

### Navigation Bar
```css
/* Sticky top nav */
background-color: #ffffff; /* or semi-transparent with backdrop-blur */
height: 48px;
border-bottom: 1px solid #ebebeb;
font-size: 14px;
font-weight: 400;
color: #4d4d4d;
/* Active link: #171717 */
```

### Link
```css
/* Standard */
color: #0072f5;
text-decoration: underline;
font-weight: 400;

/* Navigation/Footer */
color: #666666;
text-decoration: none;
/* hover: underline */

/* Dark context */
color: #ffffff;
text-decoration: none;
font-weight: 500;
```

### Tab Bar
```css
border-bottom: 1px solid #ebebeb;
border-radius: 32px; /* container pill */
/* Active tab: 2px solid #171717 bottom border */
/* Inactive tab: 2px solid #4d4d4d bottom border */
font-size: 14px;
border-radius: 64px; /* individual tab pills */
```

### Section Divider
```css
border-bottom: 1px solid #ebebeb; /* light variant */
/* or */
border-right: 1px solid #171717;
border-bottom: 1px solid #171717; /* grid variant: dark, structural */
```

## Do's and Don'ts

**Do:**
- Use `#171717` as the single dark neutral for text and dark buttons. Never use pure `#000000` for UI surfaces.
- Use box-shadow `0px 0px 0px 1px` as a border substitute. This gives crisper rendering and avoids layout shifts.
- Use pill radius (`border-radius: 9999px`) for all primary CTAs and navigation elements.
- Use negative letter-spacing on headings. Scale it proportionally: roughly -0.04em.
- Separate content sections with thin `#ebebeb` rules, not background-color bands.
- Use the Geist font family exclusively. Fall back to system sans-serif.
- Keep the page monochromatic. Introduce color only for pipeline states (develop/preview/ship) or interactive links.
- Use `#fafafa` as the page-level background, `#ffffff` for cards and elevated surfaces.

**Don't:**
- Don't use colored section backgrounds (no blue/purple/gradient hero banners).
- Don't use border-radius between 16px and 9999px on buttons. It's either small utility (6px) or full pill (9999px).
- Don't use drop shadows with visible blur spread. Vercel shadows are tight 1-2px lifts only.
- Don't use font weights above 600. The type system tops out at semibold.
- Don't use decorative icons or emoji in headings. Vercel headings are text-only.
- Don't mix warm and cool neutrals. Every gray in the palette is a pure neutral (equal R=G=B values).
- Don't use solid borders on buttons. Use `box-shadow` rings instead.
- Don't center-align body copy. Headings may center, but descriptions left-align or center only in hero contexts.
