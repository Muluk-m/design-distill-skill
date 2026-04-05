import { describe, it, expect } from "vitest";
import { parseDesignHeader } from "../../src/lib/store.js";

describe("parseDesignHeader", () => {
  it("parses source_url from blockquote", () => {
    const h = parseDesignHeader("> source_url: https://example.com\n");
    expect(h.source_url).toBe("https://example.com");
  });

  it("parses distilled date", () => {
    const h = parseDesignHeader("> distilled: 2026-01-01\n");
    expect(h.distilled).toBe("2026-01-01");
  });

  it("parses project name from heading", () => {
    const h = parseDesignHeader("# Linear Design System\n");
    expect(h.name).toBe("Linear");
  });

  it("strips 'Design System' suffix from name", () => {
    const h = parseDesignHeader("# Vercel Design System\n");
    expect(h.name).toBe("Vercel");
  });

  it("parses all fields together", () => {
    const content = `# Test Design System

> source_url: https://example.com
> distilled: 2026-01-01
`;
    const h = parseDesignHeader(content);
    expect(h.source_url).toBe("https://example.com");
    expect(h.distilled).toBe("2026-01-01");
    expect(h.name).toBe("Test");
  });

  it("returns empty object for content without headers", () => {
    const h = parseDesignHeader("Just some text\n");
    expect(h.source_url).toBeUndefined();
    expect(h.distilled).toBeUndefined();
    // "Just some text" doesn't match "# Heading"
    expect(h.name).toBeUndefined();
  });
});
