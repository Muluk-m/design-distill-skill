## 1. 重构：抽出共享模块

- [x] 1.1 创建 `src/lib/parsers.ts`：从 preview.ts 抽出 `extractOverview`, `extractColors`, `extractTypography`, `extractSpacing`, `extractComponents`；从 diff.ts 抽出 `extractTokensFromContent`。全部导出
- [x] 1.2 创建 `src/lib/color.ts`：从 preview.ts 抽出 `isDark`, `contrastColor`, `surfaceColor`；从 diff.ts 抽出 `deltaE`。全部导出
- [x] 1.3 更新 `preview.ts`：删除内联 parser/color 函数，改为 import `src/lib/parsers.ts` 和 `src/lib/color.ts`
- [x] 1.4 更新 `diff.ts`：删除内联 `extractTokensFromContent` 和 `deltaE`，改为 import 共享模块
- [x] 1.5 更新 `store.ts`：`BASE_DIR` 改为 `process.env.DESIGN_DISTILL_HOME || join(homedir(), ".config", "design-distill")`
- [x] 1.6 验证重构：`npm run build && node dist/cli.mjs list && node dist/cli.mjs preview linear` 正常工作

## 2. 测试基础设施

- [x] 2.1 安装 vitest：`npm install -D vitest`
- [x] 2.2 创建 `vitest.config.ts`
- [x] 2.3 添加 `npm test` script 到 package.json
- [x] 2.4 创建 `tests/fixtures/minimal.md`：最小有效 DESIGN.md（包含 Overview, Colors, Typography, Spacing, Components 各一项）
- [x] 2.5 创建 `tests/fixtures/linear.md`：从 `bundled/linear/DESIGN.md` 复制
- [x] 2.6 创建 `tests/setup.ts`：globalSetup 执行 `tsdown` build

## 3. 单元测试

- [x] 3.1 创建 `tests/unit/parsers.test.ts`：测试 extractOverview, extractColors, extractTypography, extractSpacing, extractComponents, extractTokensFromContent
- [x] 3.2 创建 `tests/unit/color.test.ts`：测试 isDark, contrastColor, surfaceColor, deltaE
- [x] 3.3 创建 `tests/unit/design-header.test.ts`：测试 parseDesignHeader
- [x] 3.4 创建 `tests/unit/generate-html.test.ts`：测试 generateHtml 输出包含 data-theme, accent color, 色板

## 4. 集成测试

- [x] 4.1 创建 `tests/integration/store.test.ts`：使用临时目录测试 writeStyle/readStyle 往返、listStyles、deleteStyle、copyBundledStyles、validateName 拒绝路径穿越
- [x] 4.2 创建 `tests/integration/cli.test.ts`：用 execSync 运行 `node dist/cli.mjs` 测试 list（空/有数据/--json）、show（存在/不存在）、path、preview

## 5. 验证

- [x] 5.1 `npm test` 全部通过
- [x] 5.2 `npm run build` 仍然成功（确认重构没破坏构建）
