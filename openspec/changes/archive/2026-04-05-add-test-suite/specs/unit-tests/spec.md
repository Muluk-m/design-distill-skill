## ADDED Requirements

### Requirement: Parser unit tests
All parser functions extracted to `src/lib/parsers.ts` SHALL have unit tests covering normal and edge cases.

#### Scenario: extractOverview parses tone and bgColor
- **WHEN** content contains `**Tone**: dark — background \`#0a0a0a\``
- **THEN** result.tone === "dark" and result.bgColor === "#0a0a0a"

#### Scenario: extractColors parses color entries
- **WHEN** content contains `- **Primary** (\`#5E6AD2\`): CTA buttons`
- **THEN** result includes { name: "Primary", hex: "#5E6AD2", desc: "CTA buttons" }

#### Scenario: extractSpacing handles table format
- **WHEN** content contains `| space-2 | 8px | padding |`
- **THEN** result includes "8px"

#### Scenario: extractSpacing handles bullet format
- **WHEN** content contains `- \`16px\` — section spacing`
- **THEN** result includes "16px"

#### Scenario: extractComponents parses CSS blocks
- **WHEN** content contains a ### Primary Button with ```css block containing `border-radius: 6px;`
- **THEN** result includes component with props["border-radius"] === "6px"

#### Scenario: extractTokensFromContent extracts color tokens
- **WHEN** content has Colors section with `- **Primary** (\`#5E6AD2\`): usage`
- **THEN** extracted token has category containing "Color", token "Primary", value "#5E6AD2"

### Requirement: Color utility unit tests
All color functions in `src/lib/color.ts` SHALL have unit tests.

#### Scenario: isDark identifies dark colors
- **WHEN** hex is "#000000"
- **THEN** isDark returns true

#### Scenario: isDark identifies light colors
- **WHEN** hex is "#ffffff"
- **THEN** isDark returns false

#### Scenario: deltaE returns 0 for identical colors
- **WHEN** hex1 === hex2 === "#ff0000"
- **THEN** deltaE returns 0

#### Scenario: contrastColor returns light text for dark bg
- **WHEN** hex is "#000000"
- **THEN** contrastColor returns a string containing "255"

### Requirement: parseDesignHeader unit tests
`parseDesignHeader` SHALL have unit tests.

#### Scenario: Parses source_url
- **WHEN** content contains `> source_url: https://linear.app`
- **THEN** result.source_url === "https://linear.app"

#### Scenario: Parses distilled date
- **WHEN** content contains `> distilled: 2026-04-05`
- **THEN** result.distilled === "2026-04-05"

#### Scenario: Handles missing fields
- **WHEN** content has no source_url or distilled
- **THEN** result.source_url is undefined and result.distilled is undefined

### Requirement: generateHtml unit tests
`generateHtml` SHALL have tests verifying key structural output.

#### Scenario: HTML contains theme toggle
- **WHEN** generateHtml is called with valid inputs
- **THEN** output contains `data-theme=` and `setTheme`

#### Scenario: HTML uses accent color
- **WHEN** colors include a Primary entry with hex #5E6AD2
- **THEN** output contains `--accent: #5E6AD2` or the hex value appears in the CSS
