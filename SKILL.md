---
name: design-dna
description: |
  提炼并复用设计系统 DNA。两种模式：
  1. 提炼模式：从网站 URL 或本地项目中提取设计系统（颜色、字体、间距、组件语言、视觉个性），
     生成结构化的 DESIGN-DNA.md 文档。
  2. 设计模式：当项目中已有 DESIGN-DNA.md 时，加载它并**重新截图源网站**作为视觉锚点，
     基于真实视觉参考生成前端代码/HTML/设计稿，彻底告别千篇一律的 AI UI 味。
  当用户说"提炼设计系统"、"参考这个网站的风格"、"照这个项目的 UI 风格"、
  "告别 AI 味"、"帮我做个和 XX 一样风格的页面"、"extract design system"、
  "reference this design"时触发。已有 DESIGN-DNA.md 时，设计任务自动进入设计模式。
---

# Design DNA

这个 skill 有两个阶段，自动检测当前在哪个阶段：

## 阶段判断

首先检查是否已有设计系统文件：

```bash
find . -name "DESIGN-DNA.md" -maxdepth 3 2>/dev/null | head -5
```

- **有文件** → 进入「**设计模式**」
- **没有文件** → 进入「**提炼模式**」

---

## 提炼模式：提取设计 DNA

### Step 1：确认来源

问用户（如果不明确）：
- 网站 URL 还是本地项目路径？
- 设计系统文件保存到哪里？（默认：当前工作目录的 `DESIGN-DNA.md`）

### Step 2：提取（根据来源选一个）

#### 来源 A：网站 URL

**先截图，眼见为实。** 在分析任何 CSS 之前，先用 `/browse` 截图观察真实视觉效果——亮色/暗色、风格气质、布局密度，这些用肉眼判断比分析代码更准确。

```
用 /browse 访问网站，按顺序执行：

1. 截图首页（注意：观察真实的背景色——是亮色还是暗色？不要凭印象猜）
2. 截图 1-2 个有代表性的子页面（如 /pricing、/docs）
3. 从截图中直接识别：
   - 背景色调性（亮/暗/中性）
   - 主要文字颜色
   - CTA 按钮的颜色和形态
   - 卡片/面板的外观
   - 整体排版密度

4. 再用 JS 提取精确的 CSS 变量值：
   Object.fromEntries(
     [...document.styleSheets]
       .flatMap(s => { try { return [...s.cssRules] } catch(e) { return [] } })
       .filter(r => r.selectorText === ':root' || r.selectorText === 'html')
       .flatMap(r => [...r.style])
       .map(v => [v, getComputedStyle(document.documentElement).getPropertyValue(v)])
   )
5. 采样关键元素的计算颜色（background-color、color、border-color）——仅当步骤 4 结果稀少时才需要，因为 CSS 变量往往已覆盖
6. 提取字体引用（<head> 里的 link 标签、@import）
```

如果目标网站有 `/design`、`/brand`、`/style-guide`、`/storybook`，也去访问。

**截图是第一位的**。如果 CSS 变量提取失败，依靠截图目视分析也能得出准确结论。

#### 来源 B：本地项目

按优先级依次读取：

```bash
# 1. Tailwind 配置（最丰富）
find . -name "tailwind.config.*" -not -path "*/node_modules/*" | head -3

# 2. CSS 自定义变量
grep -r "^:root\|^html" --include="*.css" --include="*.scss" -l | head -10

# 3. 设计 token 文件
find . -name "tokens.*" -o -name "design-tokens.*" -o -name "theme.*" \
  -not -path "*/node_modules/*" | head -5

# 4. 组件采样
find . -path "*/components/*" \( -name "Button*" -o -name "Card*" \) | head -5
```

### Step 3：生成 DESIGN-DNA.md

提炼完成后，生成结构化文档：

- **每个值都给具体数字/颜色**，不写"偏深的蓝色"，写 `#1a1a2e`
- **文档顶部必须记录 source_url**（如果来自网站），供设计模式重新截图用
- 使用 `references/template.md` 作为结构参考

---

## 设计模式：基于 DNA 设计

### Step 1：读取 DNA + 重新截图

```bash
cat DESIGN-DNA.md
```

读完后，**提取 `source_url` 字段**。如果有 URL，立即用 `/browse` 重新截图（`$B` 是 browse skill 的命令前缀）——

```
$B goto <source_url>
$B screenshot /tmp/dna-reference.png
# 如果有相关子页面（如用户要做定价页，就截 /pricing）：
$B goto <source_url>/pricing
$B screenshot /tmp/dna-reference-sub.png
```

然后用 Read 工具把截图加载进来，**眼睛看着参考图**再设计。

为什么要重新截图而不只看 DNA 文档？因为文字描述容易偏向刻板印象（"开发者工具 = 暗色"），而截图是事实。Vercel 默认就是亮色模式，只看文字 DNA 很容易出错。

### Step 2：风格校准

看着截图和 DNA，理解：
- **最核心的视觉事实**：背景是亮还是暗？用什么字体？CTA 什么颜色？
- 这个设计的气质关键词（3 个以内）
- 有哪些反模式绝对不能出现（DNA 的 Don't 列表）

### Step 3：生成设计

根据用户需求生成前端代码、HTML 或 Pencil 设计稿。

**关键原则：**
- 颜色必须来自 DNA 的调色板，不引入新颜色
- 字体必须用 DNA 指定的字族
- 参考截图中的实际排版比例和视觉密度
- 组件形态参考 DNA 的组件词汇

**生成后自我检查**：
- [ ] 背景色调性和截图一致（亮/暗别搞反）
- [ ] 字体正确
- [ ] CTA 按钮颜色和形态与截图一致
- [ ] 没有用到 DNA 之外的颜色
- [ ] 整体气质和截图接近

---

## 输出规范

提炼模式产物 `DESIGN-DNA.md` 的顶部必须包含：

```markdown
# [项目名] Design DNA

> source_url: https://example.com
> 提炼时间：YYYY-MM-DD
```

告知用户文件路径，并说明：
> "下次直接说'帮我做个 [新页面]'，我会自动加载 DESIGN-DNA.md 并重新截图参考，保持风格一致。"
