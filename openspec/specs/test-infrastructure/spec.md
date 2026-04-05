## ADDED Requirements

### Requirement: Vitest configuration
The project SHALL have a vitest configuration that runs all `tests/**/*.test.ts` files with ESM and TypeScript support.

#### Scenario: Run all tests
- **WHEN** developer runs `npm test`
- **THEN** vitest discovers and executes all test files under `tests/`

### Requirement: Test fixtures
The project SHALL include test fixtures in `tests/fixtures/` with at least one real DESIGN.md sample and one minimal DESIGN.md for edge case testing.

#### Scenario: Fixtures available
- **WHEN** any test imports a fixture file
- **THEN** the fixture contains valid DESIGN.md content with known values for assertion

### Requirement: CLI integration test build
CLI integration tests SHALL automatically build `dist/cli.mjs` before running via vitest globalSetup.

#### Scenario: Fresh clone test run
- **WHEN** developer runs `npm test` without prior build
- **THEN** globalSetup runs `tsdown` first, then tests execute against built output
