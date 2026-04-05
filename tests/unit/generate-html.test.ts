import { describe, it, expect } from "vitest";
import { generateHtml } from "../../src/commands/preview.js";

describe("generateHtml", () => {
  const header = { source_url: "https://example.com", distilled: "2026-01-01", name: "Test" };
  const overview = {
    description: "A test design system",
    tone: "dark",
    bgColor: "#0a0a0a",
    personality: "minimal, clean",
    antiPatterns: "never use gradients",
  };
  const colors = [
    { name: "Primary", hex: "#5E6AD2", desc: "CTA buttons" },
    { name: "Background", hex: "#0a0a0a", desc: "main bg" },
  ];
  const typography = [{ name: "Headline Font", value: "Inter" }];
  const spacing = ["4px", "8px", "16px"];
  const components = [
    {
      name: "Primary Button",
      css: "background: #5E6AD2;\ncolor: #ffffff;\npadding: 8px 16px;\nborder-radius: 6px;",
      props: { background: "#5E6AD2", color: "#ffffff", padding: "8px 16px", "border-radius": "6px" },
    },
    {
      name: "Card",
      css: "background: #1a1a1a;\nborder-radius: 8px;",
      props: { background: "#1a1a1a", "border-radius": "8px" },
    },
  ];

  it("sets data-theme to dark for dark bgColor", () => {
    const html = generateHtml("test", header, overview, colors, typography, spacing, components);
    expect(html).toContain('data-theme="dark"');
  });

  it("sets data-theme to light for light bgColor", () => {
    const lightOverview = { ...overview, tone: "light", bgColor: "#fafafa" };
    const html = generateHtml("test", header, lightOverview, colors, typography, spacing, components);
    expect(html).toContain('data-theme="light"');
  });

  it("includes accent color from Primary", () => {
    const html = generateHtml("test", header, overview, colors, typography, spacing, components);
    expect(html).toContain("--accent: #5E6AD2");
  });

  it("renders color swatches", () => {
    const html = generateHtml("test", header, overview, colors, typography, spacing, components);
    expect(html).toContain("background:#5E6AD2");
    expect(html).toContain("background:#0a0a0a");
  });

  it("includes font family in body style", () => {
    const html = generateHtml("test", header, overview, colors, typography, spacing, components);
    expect(html).toContain("Inter, system-ui, sans-serif");
  });

  it("renders spacing bars", () => {
    const html = generateHtml("test", header, overview, colors, typography, spacing, components);
    expect(html).toContain("4px");
    expect(html).toContain("16px");
  });

  it("renders source URL link", () => {
    const html = generateHtml("test", header, overview, colors, typography, spacing, components);
    expect(html).toContain('href="https://example.com"');
  });

  it("renders personality tags", () => {
    const html = generateHtml("test", header, overview, colors, typography, spacing, components);
    expect(html).toContain("minimal");
    expect(html).toContain("clean");
  });

  it("renders button component", () => {
    const html = generateHtml("test", header, overview, colors, typography, spacing, components);
    expect(html).toContain("Primary Action");
  });

  it("renders card component", () => {
    const html = generateHtml("test", header, overview, colors, typography, spacing, components);
    expect(html).toContain("Component Preview");
  });
});
