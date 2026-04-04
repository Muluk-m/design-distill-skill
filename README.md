# Design DNA — Claude Code Skill

> 提炼任意网站或本地项目的设计系统，然后用它生成同风格页面。告别千篇一律的 AI UI 味。

## 两种模式

**提炼模式** — 从 URL 或本地项目提取设计 DNA，生成 `DESIGN-DNA.md`：
- 截图优先：先肉眼观察背景色调、CTA 形态、排版密度，再分析 CSS
- 精确提取：CSS 变量、计算颜色、字体引用
- 输出结构化文档：颜色系统、字体、间距、圆角、组件词汇、Do/Don't

**设计模式** — 发现已有 `DESIGN-DNA.md` 时自动进入：
- 重新截图源网站作为视觉锚点（防止凭文字印象出偏差）
- 严格从 DNA 调色板取色，不引入新颜色
- 生成前端代码 / HTML / 设计稿

## 安装

将 `design-dna/` 目录复制到你的 Claude Code skills 路径：

```bash
# 克隆到 Claude Code 全局 skills 目录
git clone https://github.com/Mulum-m/design-dna-skill ~/.claude/skills/design-dna
```

或者只用于当前项目：

```bash
git clone https://github.com/Mulum-m/design-dna-skill .claude/skills/design-dna
```

## 使用

安装后，在 Claude Code 中直接说：

```
提炼 https://linear.app 的设计系统
```

```
帮我做一个登录页，风格和上次一样
```

```
参考 ./src 这个项目的 UI 风格，做一个用户设置页
```

触发词包括：`提炼设计系统`、`参考这个网站的风格`、`照这个项目的 UI 风格`、`告别 AI 味`、`帮我做个和 XX 一样风格的页面`、`extract design system`、`reference this design`。

## 文件结构

```
design-dna/
├── SKILL.md              # 主技能文件（提炼 + 设计两阶段逻辑）
├── references/
│   └── template.md       # DESIGN-DNA.md 输出模板（中性，无预设值）
└── evals/
    └── evals.json        # 测试用例（Vercel 提取 + 定价页生成）
```

## 依赖

- [Claude Code](https://claude.ai/code)
- [gstack browse skill](https://github.com/garrynewman/gstack)（网站截图，提炼 URL 来源时需要）

## License

MIT
