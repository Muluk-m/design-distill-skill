## ADDED Requirements

### Requirement: Store integration tests
Store functions SHALL be tested against a real temporary directory using `DESIGN_DISTILL_HOME` environment variable.

#### Scenario: Write and read roundtrip
- **WHEN** writeStyle("test-style", content) is called then readStyle("test-style") is called
- **THEN** the returned content matches the written content exactly

#### Scenario: List includes written styles
- **WHEN** writeStyle("alpha", ...) and writeStyle("beta", ...) are called
- **THEN** listStyles() returns an array containing "alpha" and "beta"

#### Scenario: Delete removes style
- **WHEN** writeStyle("to-delete", ...) then deleteStyle("to-delete") is called
- **THEN** styleExists("to-delete") returns false

#### Scenario: copyBundledStyles copies to empty library
- **WHEN** library is empty and copyBundledStyles() is called
- **THEN** result.copied includes bundled style names and result.skipped is empty

#### Scenario: copyBundledStyles skips existing
- **WHEN** library already has "linear" and copyBundledStyles() is called without force
- **THEN** result.skipped includes "linear"

#### Scenario: validateName rejects path traversal
- **WHEN** styleDir("../evil") is called
- **THEN** process exits with error

### Requirement: CLI integration tests
CLI commands SHALL be tested by executing `node dist/cli.mjs` with `DESIGN_DISTILL_HOME` set to a temp directory.

#### Scenario: list with empty library
- **WHEN** `node dist/cli.mjs list` runs against empty library
- **THEN** stdout contains "No styles saved yet."

#### Scenario: list with data
- **WHEN** library contains a style and `node dist/cli.mjs list` runs
- **THEN** stdout contains the style name in table format

#### Scenario: list --json
- **WHEN** `node dist/cli.mjs list --json` runs with data
- **THEN** stdout is valid JSON array with name, source_url, distilled fields

#### Scenario: show existing style
- **WHEN** `node dist/cli.mjs show <name>` runs for existing style
- **THEN** stdout contains the full DESIGN.md content

#### Scenario: show nonexistent style
- **WHEN** `node dist/cli.mjs show nonexistent` runs
- **THEN** stderr contains "not found" and exit code is 1

#### Scenario: path existing style
- **WHEN** `node dist/cli.mjs path <name>` runs for existing style
- **THEN** stdout contains absolute path ending in DESIGN.md

#### Scenario: preview existing style
- **WHEN** `node dist/cli.mjs preview <name>` runs for existing style
- **THEN** stdout contains "Preview written to:" and a .html path
