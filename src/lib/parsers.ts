import type { Overview, ColorEntry, TypographyEntry, ComponentEntry } from "../types.js";

export interface ExtractedToken {
  category: string;
  token: string;
  value: string;
}

export function extractOverview(content: string): Overview {
  const section = content.match(/## Overview\n([\s\S]*?)(?=\n---|\n## )/);
  if (!section) return { description: "", tone: "neutral", bgColor: "#ffffff", personality: "", antiPatterns: "" };
  const text = section[1]!;
  const toneMatch = text.match(/\*\*Tone\*\*:\s*(\w+)\s*.*?`(#[0-9a-fA-F]{3,8})`/);
  const personalityMatch = text.match(/\*\*Personality\*\*:\s*(.+)/);
  const antiMatch = text.match(/\*\*Anti-patterns\*\*:\s*(.+)/);
  const descLines = text.split("\n").filter((l) => l && !l.startsWith("**"));
  return {
    description: descLines.join(" ").trim(),
    tone: toneMatch?.[1] || "neutral",
    bgColor: toneMatch?.[2] || "#ffffff",
    personality: personalityMatch?.[1]?.trim() || "",
    antiPatterns: antiMatch?.[1]?.trim() || "",
  };
}

export function extractColors(content: string): ColorEntry[] {
  const colors: ColorEntry[] = [];
  const section = content.match(/## Colors\n([\s\S]*?)(?=\n## |\n---)/);
  if (!section) return colors;
  for (const line of section[1]!.split("\n")) {
    const m = line.match(/^-\s+\*\*(.+?)\*\*\s*\(`(#[0-9a-fA-F]{3,8})`\):\s*(.*)/);
    if (m) colors.push({ name: m[1]!, hex: m[2]!, desc: m[3]!.trim() });
  }
  return colors;
}

export function extractTypography(content: string): TypographyEntry[] {
  const typo: TypographyEntry[] = [];
  const section = content.match(/## Typography\n([\s\S]*?)(?=\n## |\n---)/);
  if (!section) return typo;
  for (const line of section[1]!.split("\n")) {
    const m = line.match(/^-\s+\*\*(.+?)\*\*:\s*`(.+?)`/);
    if (m) typo.push({ name: m[1]!, value: m[2]! });
  }
  return typo;
}

export function extractSpacing(content: string): string[] {
  const spacing: string[] = [];
  const section = content.match(/## Spacing\n([\s\S]*?)(?=\n## |\n---)/);
  if (!section) return spacing;
  for (const line of section[1]!.split("\n")) {
    const bullet = line.match(/^-\s+`(\d+(?:px|rem|em))`/);
    if (bullet) { spacing.push(bullet[1]!); continue; }
    const table = line.match(/\|\s*\d+(?:px|rem|em)\s*\|/);
    if (table) {
      for (const m of line.matchAll(/(\d+)px/g)) {
        const v = m[1]! + "px";
        if (!spacing.includes(v)) spacing.push(v);
      }
      continue;
    }
    const base = line.match(/\*\*.*?\*\*:?\s*(\d+(?:px|rem|em))/);
    if (base && !spacing.includes(base[1]!)) spacing.push(base[1]!);
    const prop = line.match(/^-\s+.+?:\s*`?(\d+(?:px|rem|em))/);
    if (prop && !spacing.includes(prop[1]!)) spacing.push(prop[1]!);
  }
  return spacing.sort((a, b) => parseInt(a) - parseInt(b)).filter((v) => parseInt(v) <= 128);
}

export function extractComponents(content: string): ComponentEntry[] {
  const components: ComponentEntry[] = [];
  const section = content.match(/## Components\n([\s\S]*?)(?=\n## |\n---)/);
  if (!section) return components;
  const parts = section[1]!.split(/\n### /);
  for (const part of parts.slice(1)) {
    const nameEnd = part.indexOf("\n");
    const name = part.slice(0, nameEnd).trim();
    const cssMatch = part.match(/```css\n([\s\S]*?)```/);
    const css = cssMatch ? cssMatch[1]!.trim() : "";
    const props: Record<string, string> = {};
    for (const line of css.split("\n")) {
      const m = line.match(/^\s*([\w-]+):\s*(.+?);/);
      if (m) props[m[1]!] = m[2]!.trim();
    }
    if (name) components.push({ name, css, props });
  }
  return components;
}

export function extractTokensFromContent(content: string): ExtractedToken[] {
  const tokens: ExtractedToken[] = [];
  let currentCategory = "";

  for (const line of content.split("\n")) {
    const headingMatch = line.match(/^##\s+(.+)/);
    if (headingMatch) {
      currentCategory = headingMatch[1]!.trim();
      continue;
    }

    const colorMatch = line.match(
      /^-\s+\*\*(.+?)\*\*\s*\(`(#[0-9a-fA-F]{3,8})`\)/
    );
    if (colorMatch) {
      tokens.push({
        category: currentCategory,
        token: colorMatch[1]!,
        value: colorMatch[2]!,
      });
      continue;
    }

    const fontMatch = line.match(/^-\s+\*\*(.+?)\*\*:\s*`(.+?)`/);
    if (fontMatch && currentCategory.toLowerCase().includes("typo")) {
      tokens.push({
        category: currentCategory,
        token: fontMatch[1]!,
        value: fontMatch[2]!,
      });
      continue;
    }

    const spacingMatch = line.match(/^-\s+`(\d+(?:px|rem|em))`/);
    if (spacingMatch && currentCategory.toLowerCase().includes("spac")) {
      tokens.push({
        category: currentCategory,
        token: `spacing-${tokens.filter((t) => t.category === currentCategory).length}`,
        value: spacingMatch[1]!,
      });
    }
  }

  return tokens;
}
