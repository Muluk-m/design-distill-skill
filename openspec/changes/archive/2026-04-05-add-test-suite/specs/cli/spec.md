## MODIFIED Requirements

### Requirement: Store BASE_DIR supports environment variable override
The `BASE_DIR` constant in store.ts SHALL use `process.env.DESIGN_DISTILL_HOME` when set, falling back to `~/.config/design-distill/` when not set.

#### Scenario: Environment variable set
- **WHEN** `DESIGN_DISTILL_HOME=/tmp/test-lib` is set
- **THEN** all store functions operate on `/tmp/test-lib/` instead of `~/.config/design-distill/`

#### Scenario: Environment variable not set
- **WHEN** `DESIGN_DISTILL_HOME` is not set
- **THEN** store functions operate on `~/.config/design-distill/` as before
