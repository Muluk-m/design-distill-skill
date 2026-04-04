# Design DNA

> Extract design systems from any website or project. Reuse them to generate pixel-faithful UIs. No more generic AI look.

## Why

Every AI-generated UI looks the same — the same gradients, the same rounded cards, the same blue buttons. Design DNA fixes this by capturing the *real* visual identity of any website and storing it locally. Next time you need a page, just say "use the Linear style" and get output that actually looks like Linear.

## How It Works

```
  "Extract linear.app"          "Design a login page
        │                        in Linear style"
        ▼                              │
  ┌───────────┐                        ▼
  │ Screenshot │─── analyze ───▶ ~/.config/design-dna/
  │ + CSS      │               ├── styles/linear.md
  └───────────┘                └── screenshots/linear/
                                       │
                                       ▼
                                 Generated code that
                                 actually looks like
                                 the original design
```

**Extract** — Your AI agent screenshots the site, pulls CSS variables and fonts, and saves a structured DNA file (colors, typography, spacing, component patterns, do/don't rules).

**Design** — Load a saved style by name. The agent reads the DNA + reference screenshots, then generates frontend code that stays true to the original.

## Install

### Skill (for AI Agents)

```bash
npx skills add Muluk-m/design-dna-skill
```

Works with **Claude Code**, **Codex**, **Openclaw**, and any agent that supports [skills](https://skills.sh).

### CLI

```bash
npm install -g design-dna
```

The skill auto-installs the CLI if missing — no manual setup needed.

## Usage

Tell your AI agent:

```
提炼 https://linear.app 的设计系统
```

```
Use the linear style to build a pricing page
```

```
参考 ./src 这个项目的 UI 风格，做一个设置页
```

### CLI

```bash
ddna list                          # List all saved styles
ddna show <name>                   # Output a style's DNA to stdout
ddna save <name> --source-url URL  # Save DNA from stdin
ddna delete <name>                 # Remove a style and its screenshots
ddna path <name> [screenshots]     # Print file/directory path
```

Styles live in `~/.config/design-dna/` and are shared across all your projects.

## How the DNA Looks

Each style is a Markdown file with structured design tokens:

```markdown
# Linear Design DNA

> source_url: https://linear.app

## Visual Personality
Color base: light — background `#FFFFFF`
Mood: minimal, focused, developer-oriented

## Color System
| Name       | Value     | Usage          |
|------------|-----------|----------------|
| Background | `#FFFFFF` | Page background|
| Accent     | `#5E6AD2` | Primary CTA    |
...

## Component Vocabulary
### Primary Button
background: #5E6AD2; color: #FFFFFF; border-radius: 8px;
```

## Project Structure

```
design-dna-skill/
├── skills/design-dna/        # AI agent skill
│   ├── SKILL.md              # Extraction + design workflows
│   └── references/
│       └── template.md       # DNA document template
├── cli/                      # ddna CLI (TypeScript)
│   └── src/
└── evals/
    └── evals.json
```

## License

MIT
