import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import {
  writeStyle,
  readStyle,
  styleExists,
  listStyles,
  deleteStyle,
  styleDir,
  parseDesignHeader,
  copyBundledStyles,
} from "../../src/lib/store.js";

let tmpDir: string;

beforeEach(() => {
  tmpDir = mkdtempSync(join(tmpdir(), "design-distill-test-"));
  process.env.DESIGN_DISTILL_HOME = tmpDir;
});

afterEach(() => {
  rmSync(tmpDir, { recursive: true, force: true });
  delete process.env.DESIGN_DISTILL_HOME;
});

describe("store round-trip", () => {
  it("writeStyle + readStyle preserves content", () => {
    const content = "# Test\n\n> source_url: https://example.com\n";
    writeStyle("test-style", content);
    expect(readStyle("test-style")).toBe(content);
  });

  it("styleExists returns true after write, false before", () => {
    expect(styleExists("new-style")).toBe(false);
    writeStyle("new-style", "# New");
    expect(styleExists("new-style")).toBe(true);
  });

  it("listStyles returns sorted names", () => {
    writeStyle("bravo", "# B");
    writeStyle("alpha", "# A");
    writeStyle("charlie", "# C");
    expect(listStyles()).toEqual(["alpha", "bravo", "charlie"]);
  });

  it("listStyles returns empty array when no styles", () => {
    expect(listStyles()).toEqual([]);
  });

  it("deleteStyle removes the style", () => {
    writeStyle("to-delete", "# Delete me");
    expect(styleExists("to-delete")).toBe(true);
    deleteStyle("to-delete");
    expect(styleExists("to-delete")).toBe(false);
  });
});

describe("validateName (via styleDir)", () => {
  it("rejects path traversal attempts", () => {
    const mockExit = vi.spyOn(process, "exit").mockImplementation((() => {
      throw new Error("process.exit called");
    }) as never);

    expect(() => styleDir("../etc/passwd")).toThrow("process.exit called");
    expect(mockExit).toHaveBeenCalledWith(1);

    mockExit.mockRestore();
  });

  it("rejects names starting with special chars", () => {
    const mockExit = vi.spyOn(process, "exit").mockImplementation((() => {
      throw new Error("process.exit called");
    }) as never);

    expect(() => styleDir(".hidden")).toThrow("process.exit called");
    expect(() => styleDir("-dash")).toThrow("process.exit called");

    mockExit.mockRestore();
  });

  it("accepts valid names", () => {
    expect(() => styleDir("valid-name")).not.toThrow();
    expect(() => styleDir("my.style")).not.toThrow();
    expect(() => styleDir("v2")).not.toThrow();
  });
});

describe("parseDesignHeader", () => {
  it("works via store export", () => {
    const header = parseDesignHeader("# Test Design System\n> source_url: https://x.com\n> distilled: 2026-01-01\n");
    expect(header.name).toBe("Test");
    expect(header.source_url).toBe("https://x.com");
    expect(header.distilled).toBe("2026-01-01");
  });
});

describe("copyBundledStyles", () => {
  it("copies bundled styles to DESIGN_DISTILL_HOME", () => {
    const result = copyBundledStyles();
    expect(result.copied.length).toBeGreaterThan(0);
    expect(result.skipped).toEqual([]);
    for (const name of result.copied) {
      expect(styleExists(name)).toBe(true);
    }
  });

  it("skips existing styles without force", () => {
    copyBundledStyles();
    const result2 = copyBundledStyles();
    expect(result2.copied).toEqual([]);
    expect(result2.skipped.length).toBeGreaterThan(0);
  });

  it("overwrites existing styles with force", () => {
    copyBundledStyles();
    const result2 = copyBundledStyles(true);
    expect(result2.copied.length).toBeGreaterThan(0);
    expect(result2.skipped).toEqual([]);
  });
});
