import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  extractOverview,
  extractColors,
  extractTypography,
  extractSpacing,
  extractComponents,
  extractTokensFromContent,
} from "../../src/lib/parsers.js";

const minimal = readFileSync(
  join(__dirname, "../fixtures/minimal.md"),
  "utf-8"
);

describe("extractOverview", () => {
  it("parses tone and bgColor from minimal fixture", () => {
    const o = extractOverview(minimal);
    expect(o.tone).toBe("dark");
    expect(o.bgColor).toBe("#0a0a0a");
  });

  it("parses personality and anti-patterns", () => {
    const o = extractOverview(minimal);
    expect(o.personality).toBe("minimal, clean");
    expect(o.antiPatterns).toBe("never use gradients");
  });

  it("extracts description lines (non-bold)", () => {
    const o = extractOverview(minimal);
    expect(o.description).toContain("minimal test design system");
  });

  it("returns defaults for empty content", () => {
    const o = extractOverview("");
    expect(o.tone).toBe("neutral");
    expect(o.bgColor).toBe("#ffffff");
    expect(o.description).toBe("");
  });
});

describe("extractColors", () => {
  it("extracts all 4 colors from minimal fixture", () => {
    const colors = extractColors(minimal);
    expect(colors).toHaveLength(4);
    expect(colors.map((c) => c.name)).toEqual([
      "Primary",
      "Background",
      "Text",
      "Error",
    ]);
  });

  it("parses hex values correctly", () => {
    const colors = extractColors(minimal);
    expect(colors[0]!.hex).toBe("#5E6AD2");
    expect(colors[1]!.hex).toBe("#0a0a0a");
  });

  it("parses descriptions", () => {
    const colors = extractColors(minimal);
    expect(colors[0]!.desc).toBe("CTA buttons, active states");
  });

  it("returns empty array for missing section", () => {
    expect(extractColors("# No colors here")).toEqual([]);
  });
});

describe("extractTypography", () => {
  it("extracts font entries from minimal fixture", () => {
    const typo = extractTypography(minimal);
    expect(typo).toHaveLength(2);
    expect(typo[0]).toEqual({ name: "Headline Font", value: "Inter" });
    expect(typo[1]).toEqual({ name: "Body Font", value: "Inter" });
  });

  it("returns empty array for missing section", () => {
    expect(extractTypography("")).toEqual([]);
  });
});

describe("extractSpacing", () => {
  it("extracts and sorts spacing values", () => {
    const spacing = extractSpacing(minimal);
    expect(spacing).toEqual(["4px", "8px", "16px", "32px"]);
  });

  it("returns empty array for missing section", () => {
    expect(extractSpacing("")).toEqual([]);
  });
});

describe("extractComponents", () => {
  it("extracts 2 components from minimal fixture", () => {
    const comps = extractComponents(minimal);
    expect(comps).toHaveLength(2);
    expect(comps.map((c) => c.name)).toEqual(["Primary Button", "Card"]);
  });

  it("parses CSS props for Primary Button", () => {
    const comps = extractComponents(minimal);
    const btn = comps.find((c) => c.name === "Primary Button")!;
    expect(btn.props["background"]).toBe("#5E6AD2");
    expect(btn.props["border-radius"]).toBe("6px");
  });

  it("parses CSS props for Card", () => {
    const comps = extractComponents(minimal);
    const card = comps.find((c) => c.name === "Card")!;
    expect(card.props["background"]).toBe("#1a1a1a");
    expect(card.props["border-radius"]).toBe("8px");
  });

  it("returns empty for missing section", () => {
    expect(extractComponents("")).toEqual([]);
  });
});

describe("extractTokensFromContent", () => {
  it("extracts color tokens under Colors category", () => {
    const tokens = extractTokensFromContent(minimal);
    const colorTokens = tokens.filter((t) => t.category === "Colors");
    expect(colorTokens).toHaveLength(4);
    expect(colorTokens[0]).toEqual({
      category: "Colors",
      token: "Primary",
      value: "#5E6AD2",
    });
  });

  it("extracts typography tokens", () => {
    const tokens = extractTokensFromContent(minimal);
    const typoTokens = tokens.filter((t) => t.category === "Typography");
    expect(typoTokens).toHaveLength(2);
    expect(typoTokens[0]!.value).toBe("Inter");
  });

  it("extracts spacing tokens with auto-generated names", () => {
    const tokens = extractTokensFromContent(minimal);
    const spacingTokens = tokens.filter((t) => t.category === "Spacing");
    expect(spacingTokens).toHaveLength(4);
    expect(spacingTokens[0]!.token).toBe("spacing-0");
    expect(spacingTokens[0]!.value).toBe("4px");
  });

  it("returns empty for empty content", () => {
    expect(extractTokensFromContent("")).toEqual([]);
  });
});
