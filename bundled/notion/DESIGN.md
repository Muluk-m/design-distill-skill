# Notion Design System

> source_url: https://notion.so
> distilled: 2026-04-05

---

## Overview

Notion presents a clean, minimal workspace aesthetic built on a white canvas with warm neutral tones and restrained use of accent color. The homepage uses playful hand-drawn character illustrations to soften what is otherwise a highly functional, tool-first interface. Typography is tight and confident, using a custom Inter variant (NotionInter) with aggressive negative letter-spacing on headlines. The overall feel is "productivity tool that doesn't look like enterprise software."

**Tone**: light -- background `#FFFFFF`
**Personality**: minimal, warm-neutral, functional, playful-but-professional, tool-first
**Anti-patterns**: never uses gradients on UI chrome, never uses saturated background fills on content areas, never uses decorative borders, never uses drop caps or ornamental typography, never uses dark mode on marketing pages

## Colors

### Core Palette

- **Primary** (`#0075DE`): CTA buttons, active links, interactive highlights. Notion's signature blue.
- **Primary Active** (`#005BAB`): Pressed/active state for primary buttons.
- **Secondary Surface** (`#E6F3FE`): Light blue tint for secondary buttons and highlighted surfaces.
- **Secondary Text** (`#005BAB`): Text on secondary blue surfaces.

### Neutrals

- **Text Primary** (`#000000` at 95% opacity / `#000000F2`): Main body and heading text. Near-black, not pure black.
- **Text Normal** (`#000000` at 90% opacity / `#000000E6`): Standard content text.
- **Text Dark** (`#111111`): Darkest text variant.
- **Text Medium** (`#000000` at 60% opacity): Secondary text.
- **Text Light** (`#000000` at 40% opacity): Tertiary/muted text.
- **Text Extra Light** (`#000000` at 20% opacity): Placeholder and disabled text.
- **Text Disabled** (`#0000004D`): Disabled state text (30% black).
- **Dark Gray** (`#31302E`): Footer text, secondary navigation.
- **Medium Gray** (`#615D59`): Supporting body text.
- **Light Gray** (`#A39E98`): Captions, metadata, timestamps.
- **White** (`#FFFFFF`): Page background, button text on primary.

### Borders

- **Border Base** (`#0000001A`): Standard divider lines (black at 10%).
- **Border Regular** (`#00000014`): Lighter dividers (black at 8%).

### Semantic Colors

- **Red 500** (`#F64932`): Error states, destructive actions.
- **Green 500** (`#1AAE39`): Success states, confirmations.
- **Yellow 500** (`#FFB110`): Warning states.
- **Orange 600** (`#DD5B00`): Warning text.
- **Blue 400** (`#62AEF0`): Info highlights, lighter blue accents.
- **Purple 500** (`#9849E8`): Tags, categories.
- **Pink 500** (`#FF64C8`): Tags, categories.
- **Teal 400** (`#2A9D99`): Tags, categories.
- **Brown 500** (`#9C7054`): Tags, categories.

### Extended Palette (each has 200-900 range)

| Hue    | 200       | 400       | 600       | 800       |
|--------|-----------|-----------|-----------|-----------|
| Red    | `#FDD3CD` | `#F77463` | `#E32D14` | `#6F0D00` |
| Orange | `#FFDEC4` | `#FF8A33` | `#DD5B00` | `#793400` |
| Yellow | `#FFE4AF` | `#FFC95E` | `#E89D01` | `#A16C00` |
| Green  | `#D0F4D8` | `#68CE7E` | `#14832B` | `#0A4216` |
| Teal   | `#BDE6E4` | `#2A9D99` | `#0A7B77` | `#0A4D4B` |
| Blue   | (primary) | `#62AEF0` | (primary) | `#002A4F` |
| Purple | `#EADBFA` | `#AD6DED` | `#7237AE` | `#391C57` |
| Pink   | `#FFCDF1` | `#FF83DD` | `#D13F9D` | `#6C1B4F` |
| Brown  | `#EBD5C5` | `#B18164` | `#885D3D` | `#654124` |

## Typography

**Font Family**: `NotionInter, Inter, -apple-system, system-ui, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, "Segoe UI Emoji", "Segoe UI Symbol"`

### Scale

| Role        | Size   | Weight | Line Height | Letter Spacing |
|-------------|--------|--------|-------------|----------------|
| Display     | 64px   | 700    | 1.00        | -2.125px       |
| Hero H1     | 54px   | 700    | 1.04        | -1.875px       |
| H1          | 26px   | 700    | 1.23        | -0.625px       |
| H2          | 24px   | 500    | 0.83        | --             |
| H3          | 22px   | 700    | 1.27        | -0.25px        |
| H4 / Large  | 20px   | 600    | 1.40        | -0.125px       |
| Body Large  | 20px   | 400    | 1.50        | --             |
| Subhead     | 18.72px| 700    | 1.50        | --             |
| Body        | 16px   | 400    | 1.50        | --             |
| Body Medium | 16px   | 500    | 1.50        | --             |
| Body Bold   | 16px   | 700    | 1.50        | --             |
| UI          | 15px   | 400    | 1.33        | --             |
| UI Medium   | 15px   | 600    | 1.33        | --             |
| Caption     | 14px   | 400    | 1.43        | --             |
| Caption Med | 14px   | 500    | 1.43        | --             |
| Overline    | 12px   | 600    | 1.17        | 0.125px        |
| Small       | 12px   | 400    | 1.33        | 0.125px        |

**Font Features**: `"lnum", "locl" 0` on body and button text (lining numerals).

## Elevation

### Shadow Levels

| Level | Value | Usage |
|-------|-------|-------|
| **Level 100** (Subtle) | `0px 4px 18px rgba(0,0,0,0.04), 0px 2px 7.85px rgba(0,0,0,0.027), 0px 0.8px 2.93px rgba(0,0,0,0.02), 0px 0.18px 1.04px rgba(0,0,0,0.01)` | Cards, content panels, bento tiles |
| **Level 200** (Medium) | `0px 3px 9px rgba(0,0,0,0.03), 0px 0.7px 1.46px rgba(0,0,0,0.016)` | Hover states on buttons and cards |
| **Level 300** (Raised) | `0px 20px 50px rgba(0,0,0,0.08), 0px 6px 16px rgba(0,0,0,0.04)` | Modals, popovers, dropdowns |
| **Level 400** (Dramatic) | `0px 23px 52px rgba(0,0,0,0.05), 0px 14px 28px rgba(0,0,0,0.04), 0px 7px 15px rgba(0,0,0,0.02), 0px 3px 7px rgba(0,0,0,0.02), 0px 1px 3px rgba(0,0,0,0.01)` | Hero media, featured content |

Notion shadows are very subtle, multi-layered, and use extremely low opacity black values. The layered approach creates a natural, diffused shadow effect.

## Spacing

**Base Unit**: 4px (with an effective 8px grid system)

| Token | Value | Usage |
|-------|-------|-------|
| `xs`  | 2px   | Micro gaps, badge padding |
| `s`   | 4px   | Inner padding for compact elements, button vertical padding |
| `sm`  | 6px   | Small gaps between related items |
| `m`   | 8px   | Standard gap, icon-to-text spacing |
| `ml`  | 12px  | Medium-large gaps |
| `l`   | 16px  | Section padding, card internal spacing |
| `xl`  | 24px  | Section separators, card gutters |
| `2xl` | 32px  | Major section spacing |
| `3xl` | 36px  | Large section breaks |
| `4xl` | 64px  | Hero-level vertical spacing |
| `5xl` | 80px  | Page-level vertical rhythm |
| `6xl` | 96px  | Maximum section spacing |

Most common values by frequency: 4px (115 uses), 24px (43 uses), 16px (39 uses), 8px (29 uses).

## Border Radius

| Token     | Value  | Usage |
|-----------|--------|-------|
| `small`   | 4px    | Input fields, inline tags, small buttons |
| `default` | 5px    | Navigation items, menu items, list cards |
| `medium`  | 8px    | Primary buttons, tabs, standard cards |
| `large`   | 12px   | Content cards, modals, media containers |
| `xl`      | 16px   | Featured cards, article cards |
| `pill`    | 1000px | Badges, status indicators |
| `circle`  | 50%    | Avatars, icon buttons |

## Components

### Primary Button

```css
.button-primary {
  background-color: #0075DE;
  color: #FFFFFF;
  font-family: NotionInter, Inter, -apple-system, system-ui;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  padding: 4px 14px;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: transform 0.1s ease;
}
.button-primary:hover {
  transform: scale(1.05);
}
.button-primary:active {
  background-color: #005BAB;
  transform: scale(0.9);
}
```

### Secondary Button (CTA style)

```css
.button-secondary {
  background-color: #E6F3FE;
  color: #005BAB;
  font-size: 16px;
  font-weight: 600;
  padding: 10px 19px;
  border-radius: 10px;
  border: 1px solid transparent;
}
.button-secondary:hover {
  transform: scale(1.05);
}
.button-secondary:active {
  transform: scale(0.9);
}
```

### Tertiary Button (Ghost)

```css
.button-tertiary {
  background-color: #FFFFFF;
  color: rgba(0, 0, 0, 0.95);
  font-size: 16px;
  font-weight: 500;
  padding: 4px 14px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.button-tertiary:hover {
  transform: scale(1.05);
}
.button-tertiary:active {
  transform: scale(0.9);
}
```

### Navigation Button (Ghost, no border)

```css
.button-nav {
  background-color: transparent;
  color: rgba(0, 0, 0, 0.95);
  font-size: 16px;
  font-weight: 500;
  padding: 6px 16px 6px 12px;
  border-radius: 8px;
  border: 1px solid transparent;
}
```

### Play/Pause Icon Button

```css
.button-icon-round {
  background-color: rgba(0, 0, 0, 0.05);
  color: #FFFFFF;
  padding: 0;
  border-radius: 50%;
  border: none;
}
```

### Badge

```css
.badge {
  background-color: #F2F9FF;
  color: #005BAB;
  font-size: 12px;
  font-weight: 600;
  line-height: 14px;
  letter-spacing: 0.125px;
  padding: 2px 7px;
  border-radius: 1000px;
  border: none;
}
```

### Text Input

```css
.input-text {
  background-color: #FFFFFF;
  color: rgba(0, 0, 0, 0.9);
  font-size: 16px;
  padding: 6px;
  border: 1px solid #DDDDDD;
  border-radius: 4px;
}
.input-text:focus {
  outline: 2px solid #0075DE;
}
```

### Card (Bento tile)

```css
.card {
  background-color: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0px 4px 18px rgba(0,0,0,0.04),
              0px 2px 7.85px rgba(0,0,0,0.027),
              0px 0.8px 2.93px rgba(0,0,0,0.02),
              0px 0.18px 1.04px rgba(0,0,0,0.01);
}
```

### Link Styles

| Variant | Color | Weight | Decoration | Hover |
|---------|-------|--------|------------|-------|
| Default | `rgba(0,0,0,0.95)` | 400 | underline | blue underline |
| Blue    | `#0075DE` | 400 | none | underline |
| Nav     | `#31302E` | 400 | none | underline |
| On-dark | `#FFFFFF` | 500 | none | underline |
| CTA     | `#005BAB` | 600 | none | none |

## Breakpoints

| Name     | Value  |
|----------|--------|
| Mobile S | 375px  |
| Mobile L | 440px  |
| Tablet S | 600px  |
| Tablet   | 768px  |
| Desktop S| 1032px |
| Desktop  | 1200px |
| Desktop L| 1440px |
| Wide     | 1800px |

## Icons

SVG-based icon system. No external icon library detected.

## Do's and Don'ts

### Do

- Use the 4px/8px spacing grid consistently
- Keep shadows subtle and multi-layered (never a single heavy shadow)
- Use `rgba(0,0,0,0.1)` for borders, never solid gray hex values
- Use near-black text (`#000000F2`) instead of pure `#000000`
- Apply `scale(1.05)` on hover and `scale(0.9)` on active for interactive elements
- Use negative letter-spacing on headings 20px and above
- Keep cards white with thin 1px borders and layered shadows
- Use the blue palette (`#0075DE` / `#E6F3FE` / `#005BAB`) as the single accent system
- Use warm neutrals (`#31302E`, `#615D59`, `#A39E98`) instead of cool grays
- Use `border-radius: 8px` as the default for interactive elements

### Don't

- Don't use pure black (`#000000`) for text; always use 90-95% opacity
- Don't use heavy box shadows with visible edges
- Don't use colored backgrounds for content sections (keep everything on white)
- Don't use more than one accent color at a time; blue is the only interactive color
- Don't round corners beyond 16px on content elements (pills only for badges)
- Don't use font weights below 400 or above 700
- Don't add decorative borders or double borders
- Don't use transitions longer than 200ms; Notion interactions feel snappy
- Don't use uppercase text transforms (only the 12px overline uses slight letter-spacing)
- Don't use serif fonts anywhere in the interface
