---
name: design-dna
description: |
  提炼并复用设计系统 DNA。两种模式：
  1. 提炼模式：从网站 URL 或本地项目中提取设计系统（颜色、字体、间距、组件语言、视觉个性），
     存入本地风格库（~/.config/design-dna/）。
  2. 设计模式：从风格库加载已有设计 DNA 和截图，基于真实视觉参考生成前端代码/HTML/设计稿。
  触发词：「提炼设计系统」「参考这个网站的风格」「照这个项目的 UI 风格」「告别 AI 味」
  「帮我做个和 XX 一样风格的页面」「extract design system」「reference this design」
  已有风格可通过名称直接调用（如"用 linear 风格做个登录页"）。
---

# Design DNA

## 前置检查

运行以下命令检查 `ddna` CLI 是否已安装：

```bash
which ddna
```

如果未找到，执行安装：

```bash
npm install -g design-dna
```

安装完成后验证：`ddna --version`

---

## 模式判断

执行 `ddna list` 查看已有风格。

- 用户明确要求**提炼**某个网站/项目 → 进入「**提炼模式**」
- 用户要求**设计/生成**页面，且指定了已有风格名 → 进入「**设计模式**」
- 用户指定了一个**不存在的风格名** → 询问是否先提炼，再进入设计模式

---

## 提炼模式：提取设计 DNA

### Step 1：确认来源

如果用户未明确，询问：
- 网站 URL 还是本地项目路径？
- 用什么名称保存这个风格？（默认从域名推导，如 linear.app → `linear`）

### Step 2：提取（根据来源选一个）

#### 来源 A：网站 URL

**先截图，眼见为实。** 在分析任何 CSS 之前，先截图观察真实视觉效果——亮色/暗色、风格气质、布局密度，这些用肉眼判断比分析代码更准确。

准备截图目录：
```bash
ddna path {name} screenshots
```

按顺序执行（使用你的浏览器能力）：

1. 访问目标 URL，截取完整首页截图，保存到截图目录下 `home.png`
2. 访问 1-2 个有代表性的子页面（如 /pricing、/docs），分别截图保存
3. 从截图中直接识别：
   - 背景色调性（亮/暗/中性）
   - 主要文字颜色
   - CTA 按钮的颜色和形态
   - 卡片/面板的外观
   - 整体排版密度

4. 在页面中执行以下 JavaScript 提取 CSS 变量：
```javascript
JSON.stringify(Object.fromEntries(
  [...document.styleSheets]
    .flatMap(s => { try { return [...s.cssRules] } catch(e) { return [] } })
    .filter(r => r.selectorText === ':root' || r.selectorText === 'html')
    .flatMap(r => [...r.style])
    .map(v => [v, getComputedStyle(document.documentElement).getPropertyValue(v)])
))
```

5. 如果步骤 4 结果稀少，采样关键元素的计算颜色（background-color、color、border-color）
6. 提取字体引用（`<head>` 里的 link 标签、@import）

如果目标网站有 /design、/brand、/style-guide、/storybook，也去访问提取。

**截图是第一位的**。如果 CSS 变量提取失败，依靠截图目视分析也能得出准确结论。

##### 无浏览器降级

如果你无法访问浏览器或网页，告知用户：

> "我当前无法访问浏览器。你可以：
> 1. 手动截图首页和关键子页面，告诉我截图路径
> 2. 直接粘贴网站的 CSS 变量 / tailwind 配置
> 我会基于你提供的信息提炼设计 DNA。"

用户提供截图后，将截图复制到 `ddna path {name} screenshots` 输出的目录中。

#### 来源 B：本地项目

按优先级依次读取：

1. **Tailwind 配置**（最丰富）— 搜索 `tailwind.config.*`
2. **CSS 自定义变量** — 搜索 `:root` 或 `html` 选择器中的变量
3. **设计 token 文件** — 搜索 `tokens.*`、`design-tokens.*`、`theme.*`
4. **组件采样** — 读取 Button、Card 等核心组件的样式

### Step 3：生成并保存

按照 `references/template.md` 的结构组装 DNA 文档。

**关键原则：**
- 每个值都给具体数字/颜色，不写"偏深的蓝色"，写 `#1a1a2e`
- 视觉判断（亮/暗、气质）以截图为准，不凭印象猜

生成完成后，通过 CLI 保存到风格库：

```bash
ddna save {name} --source-url {url} <<'EOF'
{生成的 DNA 文档内容}
EOF
```

告知用户：
> "已保存风格 `{name}`。下次直接说'用 {name} 风格做个页面'即可。
> 运行 `ddna list` 查看所有已保存的风格。"

---

## 设计模式：基于 DNA 设计

### Step 1：加载 DNA + 截图

```bash
ddna show {name}
```

读取 DNA 内容后，检查截图目录：

```bash
ls "$(ddna path {name} screenshots)" 2>/dev/null
```

如果有截图文件，用 Read 工具加载截图作为视觉锚点。

如果 DNA 中包含 `source_url`，且用户的设计任务涉及特定页面类型（如定价页），考虑访问源网站对应子页面重新截图。

为什么要看截图而不只看 DNA 文档？因为文字描述容易偏向刻板印象（"开发者工具 = 暗色"），而截图是事实。

### Step 2：风格校准

看着截图和 DNA，理解：
- **最核心的视觉事实**：背景是亮还是暗？用什么字体？CTA 什么颜色？
- 这个设计的气质关键词（3 个以内）
- 有哪些反模式绝对不能出现（DNA 的 Don't 列表）

### Step 3：生成设计

根据用户需求生成前端代码、HTML 或设计稿。

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
