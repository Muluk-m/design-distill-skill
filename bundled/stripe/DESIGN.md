# Stripe Design System

> source_url: https://stripe.com
> distilled: 2026-04-05

---

## Overview

Stripe's homepage uses a predominantly dark design with deep navy backgrounds, punctuated by signature luminous gradient effects that create a sense of depth and premium technology. The layout is information-dense yet breathable, combining editorial-quality typography with interactive product illustrations. Content sections alternate between dark immersive environments and lighter panels, with a consistent system of cards, badges, and code previews that reinforce Stripe's developer-first identity.

**Tone**: dark -- background `#0a0e27` transitioning through `#061b31` to `#000000`
**Personality**: premium, precise, developer-friendly, luminous, quietly confident
**Anti-patterns**: never uses harsh neon colors, never uses rounded-pill buttons, never uses playful/casual illustration, never uses heavy drop shadows on dark backgrounds, never clutters with decorative elements

## Colors

### Core Palette
- **Primary / Brand Violet** (`#533afd`): primary CTAs, links, interactive accents, button backgrounds. The single most important color in the system.
- **Brand Violet Hover** (`#4534d6`): darkened violet for hover/focus states on primary actions.
- **Brand Violet Light** (`#7f7dfc`): lighter violet used in gradient stops, secondary interactive elements.
- **Brand Violet Muted** (`#9a9afe`): subdued violet for input selector ranges, action background minimums.
- **Brand Violet Wash** (`#b9b9f9`): very light violet for subdued hover backgrounds and translucent overlays.
- **Brand Violet Tint** (`#e2e4ff`): near-white violet for subdued action backgrounds on light surfaces.

### Dark Mode Backgrounds
- **Deep Navy** (`#0a0e27`): darkest background, hero sections, immersive areas.
- **Dark Navy** (`#0d1738`): secondary dark background panels.
- **Navy 900** (`#1a2c44`): card backgrounds on dark sections.
- **Navy 950** (`#11273e`): neutral dark utility.
- **Navy 975** (`#0d253d`): deepest neutral for text-heavy dark sections.

### Text Colors
- **Heading Solid** (`#061b31`): primary heading color on light backgrounds.
- **Body Dark** (`#273951`): input labels, secondary headings on light.
- **Body Mid** (`#3c4f69`): neutral 700, secondary body text.
- **Body Muted** (`#64748d`): subdued headings, placeholder-weight text.
- **Body Light** (`#50617a`): tertiary text on light backgrounds.
- **Footer Text** (`#7d8ba4`): footer links, lowest-contrast body text.
- **White** (`#ffffff`): primary text on dark backgrounds, button text on primary CTAs.
- **Black** (`#000000`): used for structural borders, dark mode text containers.

### Accent Colors
- **Orange** (`#ff6118`): accent for specific product features (Payments terminal).
- **Orange Light** (`#ffe5da`): orange badge/tag backgrounds.
- **Green / Success** (`#00b261`): success states, positive indicators.
- **Green CTA** (`#00d66f`): checkout instant-buy buttons (Apple Pay style).
- **Green Success Light** (`#b6f2c7`): success badge backgrounds.
- **Ruby** (`#ea2261`): icon accents in gradient systems.
- **Magenta** (`#f96bee`): gradient middle stops, decorative.
- **Lemon** (`#f9b900`): warm accent, gradient stops.
- **Error** (`#d8351e`): error icon states.
- **Error Light** (`#feb9ac`): error badge backgrounds.

### Borders & Surfaces
- **Border Light** (`#e5edf5`): primary divider/border on light backgrounds (count: 101).
- **Border Subtle** (`#d4dee9`): input borders, selected states.
- **Surface Subdued** (`#f2f7fe`): lightest background panel.
- **Action Border Quiet** (`#d6d9fc`): quiet button borders (violet-tinted).

### Gradient System
Stripe's signature visual identity relies on multi-stop gradients, typically purple-to-blue luminous effects:
- **Gradient Stop 1** (`#bdb4ff`): light violet start.
- **Brand Dark 600** (`#533afd` at 70% opacity): core gradient violet.
- **Brand Dark 500** (`#5d64fe`): blue-shifted violet.
- **Brand Dark 400** (`#7389ff`): periwinkle transition.
- **Brand Dark 300** (`#92adff`): light blue.
- **Brand Dark 200** (`#a8bfff`): sky transition.
- **Brand Dark 100** (`#c3d3ff`): pale blue end.

Accent color gradients (used on icons and decorative elements):
- Ruby gradient: `#f84c31` -> `#ea2261` -> `#f03ca4`
- Orange gradient: `#fe8c2d` -> `#fd6252` -> `#fd5d7c`
- Magenta gradient: `#f98bf9` -> `#f96bee` -> `#b262f9`
- Lemon gradient: `#ffd552` -> `#ffaf2d` -> `#ff9014`

## Typography

### Font Family
- **Primary**: `sohne-var` (variable font), fallback: `SF Pro Display`
- **Monospace**: `SourceCodePro`, fallback: `SFMono-Regular`
- **OpenType Features**: `"ss01"` enabled globally, `"tnum"` for tabular numeric data

### Type Scale

| Context | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| Display / Hero H1 | 56px (3.50rem) | 300 (Light) | 1.03 | -1.4px |
| Page H1 | 48px (3.00rem) | 300 | 1.03 | -0.96px |
| Section H1 | 44px (2.75rem) | 300 | 1.15 | -0.88px |
| Card H1 | 32px (2.00rem) | 300 | 1.10 | -0.64px |
| Subsection H1 | 26px (1.63rem) | 300-400 | 1.12 | -0.26px |
| Small H1 | 22px (1.38rem) | 300 | 1.10 | -0.22px |
| Body Large / H2 | 18px (1.13rem) | 300 | 1.40 | -- |
| Body / Link / Button | 16px (1.00rem) | 300-600 | 1.00-1.40 | -- |
| Button Small / Caption | 14px (0.88rem) | 300-600 | 1.00 | -- |
| Caption / Label | 13px (0.81rem) | 400 | -- | -0.39px (tnum) |
| Small Caption | 12px (0.75rem) | 300-400 | 1.33-1.45 | -- |
| Micro / Badge | 11px (0.69rem) | 300-400 | 1.00-1.45 | -0.33px |
| Tiny | 10px (0.63rem) | 300-400 | 1.15 | -0.3px (tnum) |
| Code Inline | 12px (0.75rem) | 500-700 | 2.00 | -- |
| Code Micro | 9px (0.56rem) | 500 | 1.00 | -- |

### Weight Usage
- **300 (Light)**: headlines, body text, captions. Stripe's default weight.
- **400 (Regular)**: secondary headings, captions, badge labels.
- **600 (Semibold)**: buttons, links, navigation items, emphasis.
- **700 (Bold)**: code syntax highlighting only.

### Key Typographic Rules
- Headlines use extremely tight line-height (1.03-1.15) with negative letter-spacing for a compressed, editorial feel.
- Body text uses relaxed line-height (1.40) for readability.
- Buttons always use weight 600.
- Tabular data uses `"tnum"` feature with negative letter-spacing for alignment.

## Elevation

### Shadow System

| Level | Shadow | Usage |
|-------|--------|-------|
| **xs** | `rgba(0,55,112,0.06) 0 top, rgba(0,59,137,0.05) 0 bottom` | Subtle card lift |
| **sm** | `rgba(0,55,112,0.08) 0 top, rgba(0,59,137,0.05) 0 bottom` | Default card elevation |
| **md** | `rgba(23,23,23,0.06) 0 3px 6px` | Medium card hover |
| **lg** | `rgba(0,55,112,0.10) 0 top, rgba(0,59,137,0.04) 0 bottom` | Elevated panels |
| **xl** | `rgba(0,55,112,0.14) 0 top, rgba(0,59,137,0.06) 0 bottom` | Popovers, modals |
| **Hero** | `rgba(50,50,93,0.25) 0 30px 45px -30px, rgba(0,0,0,0.1) 0 18px 36px -18px` | Primary feature cards (count: 8) |
| **Popover** | `rgba(6,27,49,0.12) 0 bottom, rgba(39,57,81,0.08) 0 top` | Dropdown menus |
| **Inset** | `rgba(10,37,64,0.22) 0 -1.85px 4.63px inset` | Pressed/inset button states |

### Shadow Characteristics
- Stripe uses blue-tinted shadows (`rgba(50,50,93,...)` and `rgba(0,55,112,...)`) rather than pure black, creating a cooler, more refined lift.
- Large negative spread values (-30px, -18px) keep shadows tight and focused.
- Two-layer shadows are standard: a colored ambient layer plus a darker contact shadow.

## Spacing

### Base Unit
8px grid system with half-step support.

### Scale

| Token | Value | Usage |
|-------|-------|-------|
| `space-0.5` | 1px | Hairline borders, dividers |
| `space-1` | 2px | Tight internal padding |
| `space-2` | 4px | Icon margins, badge padding |
| `space-3` | 6px | Badge padding, tight gaps (most frequent small value, count: 79) |
| `space-4` | 8px | Standard gap, input padding (most frequent, count: 122) |
| `space-5` | 12px | Card internal padding, list gaps (count: 69) |
| `space-6` | 16px | Section internal padding, button padding-x |
| `space-7` | 20px | Button padding-x (primary), medium gaps |
| `space-8` | 24px | Large button padding-x, section padding |
| `space-9` | 32px | Section gaps, large internal spacing |
| `space-10` | 48px | Major section separators |
| `space-11` | 64px | Page-level section padding |
| `space-12` | 96px | Hero section vertical padding |

### Border Radius

| Value | Count | Usage |
|-------|-------|-------|
| 4px | 132 | Buttons, inputs, badges, cards (primary radius) |
| 6px | 116 | Navigation, larger cards, content panels |
| 8px | 4 | Larger containers |
| 16px | 3 | Modal-scale containers |
| 100% | 3 | Circular elements (avatars, indicators) |

Stripe defaults to small, tight radii (4-6px). Nothing is heavily rounded.

## Components

### Primary Button
- Background: `#533afd` (Brand Violet)
- Text: `#ffffff`, weight 600, size 16px
- Padding: `15.5px 24px 16.5px`
- Border: none
- Radius: 4px
- Hover: `#4534d6` (darkened violet)
- Always uses font feature `"ss01"`

### Secondary Button (Outline)
- Background: transparent or `rgba(255,255,255,0.65)`
- Text: `#533afd`
- Border: `1px solid #b9b9f9` (violet wash)
- Padding: `14.5px 24px 15.5px`
- Radius: 4px
- Weight: 600, size 16px

### Ghost Button
- Background: transparent
- Text: `#533afd`
- Border: `1px solid #d6d9fc` (quiet violet)
- Padding: variable
- Radius: 4px
- Weight: 600

### Navigation Button (Small)
- Background: transparent or `#533afd`
- Text: `#533afd` or `#ffffff`
- Padding: `10.5px 20px 13.5px`
- Radius: 4px
- Weight: 600, size 14px
- Border: `1px solid #ffffff` (on dark) or none (filled variant)

### Card
- Background: dark (`#1a2c44` range) or white (`#ffffff`)
- Border: `1px solid #e5edf5` (light) or bottom-border `#061b31` (dark)
- Radius: 6px (primary), some use 4px
- Shadow: hero-level (`rgba(50,50,93,0.25) 0 30px 45px -30px`) or standard sm
- Padding: 12-24px internal

### Badge / Status Pill
- **Success**: bg `rgba(21,190,83,0.2)`, text `#108c3d`, border `rgba(21,190,83,0.4)`
- **Neutral**: bg `#ebeef1`, text `#50617a`, border `#d8dee4`
- **Amount Pill**: bg `#ffffff`, text `#000000`, border `#f6f9fc`
- Radius: 4px
- Font size: 10-11px
- Padding: `1px 6px`

### Input Field
- Background: `rgba(255,255,255,0.25)` (translucent on dark)
- Focus background: `rgba(255,255,255,0.50)`
- Border: `1px solid rgba(43,145,223,0.2)`
- Radius: 4px
- Label color: `#273951`

### Links
- **Primary**: `#533afd`, weight 600, no underline
- **On dark**: `#7389ff` (lighter blue-violet), weight 600, no underline
- **On dark (white)**: `#ffffff`, weight 600, underline
- **Footer**: `#7d8ba4`, weight 300, no underline
- **Muted**: `#50617a`, weight 300, underline

### Code Block
- Font: `SourceCodePro`, 12px, weight 500
- Line height: 2.00 (generous for readability)
- Keyword emphasis: weight 700
- Micro labels: 9px, uppercase transform for language tags

### Divider
- Horizontal rule: `1px solid #e5edf5` (top border, count: 44)
- On dark: `1px solid #061b31` (bottom border, count: 17)
- Dashed variant: `1px dashed #362baa` (count: 12, used for connection lines)

## Do's and Don'ts

### Do
- Use the 4px border-radius consistently on interactive elements (buttons, inputs, badges)
- Use `sohne-var` with `"ss01"` feature enabled for all UI text
- Use weight 300 (Light) as the default text weight, not 400
- Use blue-tinted box shadows (`rgba(50,50,93,...)`) instead of pure black
- Use the multi-layer shadow pattern (ambient + contact) for elevated elements
- Use tight letter-spacing (-0.02em to -0.025em) on headlines
- Use very tight line-height (1.03-1.15) on display typography
- Use the violet gradient glow as a background effect for hero/feature sections
- Use translucent white overlays on dark backgrounds for inputs and secondary surfaces
- Use dashed borders (`#362baa`) for connection/flow diagrams
- Use `"tnum"` font feature for any numeric/financial data

### Don't
- Don't use border-radius larger than 8px on buttons (Stripe keeps things sharp)
- Don't use pure black text on white backgrounds (use `#061b31` instead)
- Don't use pure black shadows (always blue-tint them)
- Don't use the brand violet (`#533afd`) for large background fills (it's for accents and CTAs)
- Don't use underlines on primary links (only footer/muted links get underlines)
- Don't use weight 700/800/900 for UI text (max is 600 for buttons, 700 only in code)
- Don't use warm-toned shadows (Stripe's shadow palette is exclusively cool/blue)
- Don't use large padding on badges (keep it tight: `1px 6px`)
- Don't use rounded pill shapes (everything is subtly squared with 4-6px radius)
- Don't mix the accent color gradients arbitrarily (each gradient family, ruby/orange/magenta/lemon, is a fixed 3-stop progression)
