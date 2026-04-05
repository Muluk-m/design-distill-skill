## Why

项目零测试覆盖。纯函数（parser、color utils）和文件系统操作（store）没有任何自动化验证。每次改 extractSpacing 或 parseDesignHeader 这类逻辑都靠手动 `node -e` 验证，容易遗漏回归。

## What Changes

- 重构：将 preview.ts/diff.ts 中的私有 parser 函数抽到 `src/lib/parsers.ts`（导出，可测）
- 重构：将 preview.ts/diff.ts 中的 color 工具函数抽到 `src/lib/color.ts`（导出，可测）
- 重构：`store.ts` 的 `BASE_DIR` 支持 `DESIGN_DISTILL_HOME` 环境变量覆盖（测试隔离）
- 新增 vitest 配置和测试套件：单元测试 + 集成测试
- 新增 `npm test` script

## Capabilities

### New Capabilities

- `test-infrastructure`: vitest 配置、测试目录结构、fixtures、npm scripts
- `unit-tests`: 纯函数单元测试（parsers, color utils, parseDesignHeader, generateHtml）
- `integration-tests`: 文件系统集成测试（store 读写）和 CLI 集成测试（命令输出验证）

### Modified Capabilities

- `cli`: store.ts 的 BASE_DIR 支持环境变量覆盖；preview.ts 和 diff.ts 中的 parser/color 函数抽到共享模块

## Impact

- **新增 devDependencies**: vitest
- **文件结构**: 新增 `tests/` 目录，`src/lib/parsers.ts`，`src/lib/color.ts`
- **重构**: preview.ts 和 diff.ts 变小，import 共享模块替代内联函数
- **CI**: 未来可直接 `npm test` 作为 CI 步骤
