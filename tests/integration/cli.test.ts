import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { execSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const CLI = join(__dirname, "../../dist/cli.mjs");
let tmpDir: string;

function run(args: string, options?: { expectFail?: boolean }): string {
  try {
    return execSync(`node ${CLI} ${args}`, {
      encoding: "utf-8",
      env: { ...process.env, DESIGN_DISTILL_HOME: tmpDir },
      timeout: 10000,
    }).trim();
  } catch (e: any) {
    if (options?.expectFail) return e.stderr?.trim() || e.stdout?.trim() || "";
    throw e;
  }
}

beforeEach(() => {
  tmpDir = mkdtempSync(join(tmpdir(), "design-distill-cli-"));
});

afterEach(() => {
  rmSync(tmpDir, { recursive: true, force: true });
});

describe("list command", () => {
  it("returns message when no styles", () => {
    const out = run("list");
    expect(out).toContain("No styles saved yet");
  });

  it("lists styles after adding one", () => {
    // Manually create a style
    const styleDir = join(tmpDir, "test-style");
    mkdirSync(styleDir, { recursive: true });
    writeFileSync(join(styleDir, "DESIGN.md"), "# Test\n");

    const out = run("list");
    expect(out).toContain("test-style");
  });

  it("supports --json flag", () => {
    const styleDir = join(tmpDir, "my-style");
    mkdirSync(styleDir, { recursive: true });
    writeFileSync(join(styleDir, "DESIGN.md"), "# My Style\n");

    const out = run("list --json");
    const data = JSON.parse(out);
    expect(Array.isArray(data)).toBe(true);
    expect(data.some((e: any) => e.name === "my-style")).toBe(true);
  });
});

describe("show command", () => {
  it("prints DESIGN.md content for existing style", () => {
    const styleDir = join(tmpDir, "show-test");
    mkdirSync(styleDir, { recursive: true });
    writeFileSync(join(styleDir, "DESIGN.md"), "# Show Test\n\nSome content.\n");

    const out = run("show show-test");
    expect(out).toContain("# Show Test");
    expect(out).toContain("Some content.");
  });

  it("exits with error for non-existent style", () => {
    const out = run("show nonexistent", { expectFail: true });
    expect(out).toContain("not found");
  });
});

describe("path command", () => {
  it("prints the path for a style", () => {
    const styleDir = join(tmpDir, "path-test");
    mkdirSync(styleDir, { recursive: true });
    writeFileSync(join(styleDir, "DESIGN.md"), "# Path Test\n");

    const out = run("path path-test");
    expect(out).toContain("path-test");
    expect(out).toContain("DESIGN.md");
  });
});

describe("preview command", () => {
  it("generates HTML file for existing style", () => {
    const styleDir = join(tmpDir, "preview-test");
    mkdirSync(styleDir, { recursive: true });
    writeFileSync(
      join(styleDir, "DESIGN.md"),
      `# Preview Test Design System

> source_url: https://example.com
> distilled: 2026-01-01

---

## Overview

A test design system.

**Tone**: dark — background \`#0a0a0a\`
**Personality**: clean

---

## Colors

- **Primary** (\`#5E6AD2\`): CTA buttons

---

## Typography

- **Body Font**: \`Inter\`

---

## Spacing

- \`8px\` — base

---

## Components

### Primary Button
\`\`\`css
background: #5E6AD2;
color: #ffffff;
padding: 8px 16px;
border-radius: 6px;
\`\`\`
`
    );

    const out = run("preview preview-test");
    expect(out).toContain("Preview written to:");
    expect(out).toContain(".html");
  });

  it("exits with error for non-existent style", () => {
    const out = run("preview nonexistent", { expectFail: true });
    expect(out).toContain("not found");
  });
});
