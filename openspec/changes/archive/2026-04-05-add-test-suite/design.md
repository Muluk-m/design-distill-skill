## Context

项目刚完成 JS→TS 重写，所有源码在 `src/` 下，tsdown 构建到 `dist/cli.mjs`。纯函数散落在 preview.ts 和 diff.ts 里作为私有函数，无法测试。store.ts 硬编码 `~/.config/design-distill/` 路径，测试会污染真实数据。

## Goals / Non-Goals

**Goals:**
- 抽出可复用的 parser 和 color utils 模块
- store.ts 路径可通过环境变量覆盖
- vitest 配置，单元测试覆盖所有纯函数
- 集成测试覆盖 store 读写和 CLI 命令输出
- `npm test` 一键运行

**Non-Goals:**
- 不做 E2E 测试（不测 init 的 npm install 和 Playwright 安装）
- 不做 snapshot 测试（HTML 输出太大，维护成本高）
- 不引入 CI 配置（后续可加）

## Decisions

### 1. 测试框架：vitest

原生 ESM + TS 支持，跟 tsdown 同生态（都基于 Rolldown/Vite），零配置即可运行 `.ts` 测试文件。

### 2. 模块抽取

```
src/lib/parsers.ts    ← extractOverview, extractColors, extractTypography,
                        extractSpacing, extractComponents, extractTokensFromContent
src/lib/color.ts      ← isDark, contrastColor, surfaceColor, deltaE
```

preview.ts 和 diff.ts 改为 import 这些模块。减少重复，preview.ts 从 ~430 行降到 ~280 行。

### 3. store.ts 路径隔离

```ts
const BASE_DIR = process.env.DESIGN_DISTILL_HOME
  || join(homedir(), ".config", "design-distill");
```

测试中设置 `DESIGN_DISTILL_HOME` 指向临时目录，afterEach 清理。

### 4. 测试文件结构

```
tests/
├── unit/
│   ├── parsers.test.ts
│   ├── color.test.ts
│   ├── design-header.test.ts
│   └── generate-html.test.ts
├── integration/
│   ├── store.test.ts
│   └── cli.test.ts
└── fixtures/
    ├── linear.md
    └── minimal.md
```

### 5. CLI 集成测试方式

用 `execSync('node dist/cli.mjs <cmd>', { env: { ...process.env, DESIGN_DISTILL_HOME: tmpDir } })` 跑真实 CLI，断言 stdout/stderr/exit code。需要先 build（`npm run build`），在 `globalSetup` 中执行一次。

## Risks / Trade-offs

- **重构可能引入回归**: 抽函数时移错位置 → 先手动验证 `npm run build && node dist/cli.mjs preview linear` 再提交
- **CLI 集成测试依赖 build**: 改源码后要先 build 才能跑集成测试 → vitest 配置中 globalSetup 自动 build
- **generateHtml 不好断言**: 输出是大段 HTML → 只断言关键片段（data-theme, accent color, 色板 hex 值），不做全文比对
