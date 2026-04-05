# GitHub Design System

> source_url: https://github.com
> distilled: 2026-04-05

---

## Overview

GitHub's marketing homepage uses their Primer design system adapted for a dramatic dark-mode presentation. The page is built on a near-black canvas (`#0D1117`) with white and light-blue text, purple-to-blue gradient accents, and a single green CTA that anchors the conversion funnel. The typography uses their custom "Mona Sans" variable font at large display sizes, creating a confident, developer-focused aesthetic that balances technical credibility with visual polish.

**Tone**: dark -- background `#0D1117`
**Personality**: developer-first, precise, confident, technically credible, quietly bold
**Anti-patterns**: never uses bright/playful colors, never uses rounded bubbly shapes, never uses decorative illustrations, never uses light backgrounds on marketing pages, never mixes multiple competing CTAs in a single viewport

## Colors

### Core Palette
- **Background Primary** (`#0D1117`): Main page background, dark navy-charcoal. The defining color of GitHub's dark theme.
- **Background Elevated** (`#151A22`): Slightly lighter surface for cards and raised elements over the primary background.
- **Background Surface** (`#FFFFFF`): Used in app-context UI (dropdowns, modals, search overlays) -- never on marketing surfaces.
- **Background Subtle** (`#F6F8FA`): Light gray used for secondary surfaces in app-context (form backgrounds, code blocks).

### Text
- **Text Primary** (`#F0F6FC`): Main body and heading text on dark backgrounds. A warm off-white, not pure white.
- **Text Secondary** (`#8B949E`): Muted descriptive text, labels, and secondary information.
- **Text Muted** (`#59636A`): Tertiary text, captions, timestamps.
- **Text on Light** (`#1F2328`): Primary text color on light/white surfaces (app context).
- **Text on Light Secondary** (`#59636E`): Secondary text on light surfaces.

### Brand & Accent
- **Green Primary** (`#1A7F37`): Primary CTA button background ("Sign up for GitHub"). The single green action on the page.
- **Green Hover** (`#2EA043`): Hover state for green buttons.
- **Green Active** (`#238636`): Active/pressed state for green buttons.
- **Blue Link** (`#79C0FF`): All inline links and navigation actions on dark backgrounds. A soft sky blue.
- **Blue Accent** (`#1F6FEB`): Interactive blue for focused states, selections, and video player controls.
- **Blue Bright** (`#388BFD`): Code mirror selections, diff highlights.

### Semantic
- **Danger** (`#DA3633`): Destructive actions, error states.
- **Warning** (`#D29922`): Attention-requiring states, caution indicators.
- **Success** (`#1F883D`): Positive confirmation, merge indicators.
- **Purple Accent** (`#8957E5`): Labels, decorative accents, gradient endpoints.

### Gradients
- Hero section uses a purple-to-blue atmospheric gradient behind the headline, creating a sense of depth. Gradient moves from deep indigo (`#161B22`) through purple mid-tones toward the dark background.
- Tab indicator gradients use `#8C93FB` to `#F0F6FC` transitions.

## Typography

### Font Stack
- **Display**: `"Mona Sans", MonaSansFallback, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif`
- **Body/UI**: `"Mona Sans VF", -apple-system, system-ui, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif`
- **Monospace**: `"Mona Sans Mono", monospace` (used for labels like "GitHub customers")

### Scale
| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| Display XL | `64px` | `425` | `69.12px` (1.08) | Hero headline ("The future of building...") |
| Display L | `40px` | `460` | `48px` (1.2) | Section headings ("Accelerate your entire workflow") |
| Heading M | `24px` | `600` | `36px` (1.5) | Feature section titles |
| Heading S | `22px` | `480-600` | `30.8px` (1.4) | Card titles, accordion headers |
| Body L | `18px` | `400` | `27px` (1.5) | Hero subtitle paragraph |
| Body M | `16px` | `400` | `24px` (1.5) | Section body text, link text |
| Body S | `14px` | `400-500` | `21px` (1.5) | Navigation items, button text, small labels |
| Caption | `12px` | `400-600` | `18-19.5px` | Eyebrow labels, category headers |

### Weight System
Mona Sans uses a continuous variable weight axis. Key stops:
- `400`: Body text, navigation links
- `425-460`: Display headings (slightly heavier than regular)
- `480`: Sub-headings, accordion titles
- `500`: Button text, nav menu items, emphasized body
- `600`: Section headings, bold labels
- `700`: Subscribe button (rare, high-emphasis only)

## Elevation

GitHub uses a layered elevation system with box-shadows rather than z-index stacking.

| Level | Shadow | Usage |
|-------|--------|-------|
| **Level 0** | None | Flat surfaces, inline content |
| **Level 1** | `0 1px 0 rgba(31,35,40,0.04) inset` | Subtle inset borders on inputs, separators |
| **Level 2** | `0 0 0 1px rgb(61,68,77), 0 6px 12px -3px rgba(1,4,9,0.4), 0 6px 18px rgba(1,4,9,0.4)` | Floating cards on dark backgrounds |
| **Level 3** | `0 0 0 1px rgba(209,217,224,0.5), 0 6px 12px -3px rgba(37,41,46,0.04), 0 6px 18px rgba(37,41,46,0.12)` | Dropdown menus, search overlays (light context) |
| **Level 4** | `0 0 0 1px rgba(209,217,224,0), 0 40px 80px rgba(37,41,46,0.24)` | Modal dialogs, large overlays |

All shadows use a `0 0 0 1px` ring for border definition instead of CSS borders. This is a Primer pattern.

## Spacing

GitHub uses a 4px base unit with an 8px grid system.

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | `4px` | Tight icon padding |
| `space-2` | `8px` | Inner element padding, nav item padding (`8px 12px`) |
| `space-3` | `12px` | Input field padding, compact button padding |
| `space-4` | `16px` | Standard button padding, tab pill padding (`8px 16px`) |
| `space-5` | `24px` | Section inner padding, subscribe button padding (`16px 24px`) |
| `space-6` | `28px` | CTA button horizontal padding |
| `space-8` | `40px` | Footer top padding |
| `space-10` | `48px` | Card section padding (`64px 48px`) |
| `space-12` | `64px` | Large section vertical padding |

Max content width is `1280px` with responsive breakpoints.

## Components

### Primary CTA Button (Green)
The single highest-priority action on the page.
```
background: #1A7F37
color: #FFFFFF
border-radius: 6px
padding: 6px 28px
font-size: 16px
font-weight: 400
height: 48px
border: none
hover-background: #2EA043
active-background: #238636
```

### Secondary Button (Outline on Dark)
Used for "Try GitHub Copilot free" and similar secondary CTAs.
```
background: rgba(31, 35, 40, 0.4)
color: #79C0FF
border: 2px solid #FFFFFF
border-radius: 8px
padding: 6px 28px
font-size: 16px
```

### Tertiary Button (Ghost on Dark)
Subscribe and outline-style buttons on dark surfaces.
```
background: transparent
color: #F0F6FC
border: 1px solid rgba(255, 255, 255, 0.25)
border-radius: 6px
padding: 16px 24px
font-size: 16px
font-weight: 700
```

### App-Context Button (Light)
Used inside modals, dropdowns, and app surfaces.
```
background: #F6F8FA
color: #25292E
border: 1px solid #D1D9E0
border-radius: 6px
padding: 5px 16px
font-size: 14px
font-weight: 500
```

### App-Context Primary Button (Green, Light)
Submit and confirm actions in app context.
```
background: #1F883D
color: #FFFFFF
border: 1px solid rgba(31, 35, 40, 0.15)
border-radius: 6px
padding: 5px 16px
font-size: 14px
font-weight: 500
```

### Tab Pill
Used for feature category switching (Code, Plan, Collaborate, Automate, Secure).
```
background: transparent
color: #FFFFFF
border: 1px solid transparent
border-radius: 60px
padding: 8px 16px
font-size: 16px
font-weight: 400
active-border: 1px solid rgba(255, 255, 255, 0.25)
```

### Email Input (Hero)
```
background: transparent (on dark)
color: #FFFFFF
border: none (contained within form group)
border-radius: 8px (container)
padding: 18px 12px 0 18px
font-size: 16px
height: 46px
placeholder-color: #8B949E
```

### Navigation Link
```
color: #FFFFFF
font-size: 14px
font-weight: 400
padding: 8px
hover-color: rgba(255, 255, 255, 0.75)
```

### Section Link (Dark)
All inline links on dark marketing surfaces.
```
color: #79C0FF
font-size: 16px
font-weight: 400
text-decoration: none
hover-text-decoration: underline
```

### Card (Dark Surface)
Feature cards and content panels on the dark background.
```
background: transparent (inherits dark bg)
border: none (uses box-shadow ring)
box-shadow: 0 0 0 1px rgb(61, 68, 77), 0 6px 12px -3px rgba(1,4,9,0.4), 0 6px 18px rgba(1,4,9,0.4)
border-radius: 0px (GitHub cards are rectangular or use subtle rounding)
padding: 64px 48px (large feature cards)
```

### Customer Story Card
```
padding: 64px 48px
background: transparent
border: 1px solid rgba(255, 255, 255, 0.1)
color: #F0F6FC
```

### Dropdown / Overlay (Light)
Search results, mega-menus, and popover panels.
```
background: #FFFFFF
box-shadow: 0 0 0 1px rgba(209,217,224,0.5), 0 6px 12px -3px rgba(37,41,46,0.04), 0 6px 18px rgba(37,41,46,0.12)
border-radius: 12px
color: #1F2328
```

### Footer
```
background: #0D1117 (same as page)
color: #F0F6FC
padding-top: 40px
border-top: none (seamless with page)
link-color: #8B949E (muted, not blue)
```

## Do's and Don'ts

### Do's
- Use `#0D1117` as the default background for all marketing and landing pages
- Use a single green CTA per viewport to maintain focus hierarchy
- Use `#79C0FF` for all clickable text links on dark backgrounds
- Use box-shadow rings (`0 0 0 1px`) instead of CSS borders for card edges
- Use Mona Sans variable font with weight `425-460` for display headings
- Use pill-shaped tabs (`border-radius: 60px`) for category navigation
- Use atmospheric purple-blue gradients for visual depth behind hero sections
- Keep body text at `16-18px` with `1.5` line height for readability
- Use `#F0F6FC` (warm off-white) for text instead of pure `#FFFFFF`
- Use `6px` border-radius for buttons and `8px` for inputs

### Don'ts
- Never use bright or saturated background colors on marketing pages
- Never use more than one green CTA button in the same viewport
- Never use light mode backgrounds on marketing/landing pages (light mode is for the app only)
- Never use pure black (`#000000`) as a background -- always use `#0D1117`
- Never use decorative illustrations or cartoon-style graphics
- Never use rounded/bubbly button shapes -- keep `6px` radius, not `9999px`
- Never use colored text for emphasis -- use font weight or size changes instead
- Never use underlines on links by default -- only on hover
- Never mix multiple accent colors in the same section -- blue links OR green buttons, not both
- Never use shadows on dark-background marketing cards -- use 1px border rings only
