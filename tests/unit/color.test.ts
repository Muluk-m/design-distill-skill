import { describe, it, expect } from "vitest";
import { isDark, contrastColor, surfaceColor, deltaE } from "../../src/lib/color.js";

describe("isDark", () => {
  it("returns true for black", () => {
    expect(isDark("#000000")).toBe(true);
  });

  it("returns true for dark background #0a0a0a", () => {
    expect(isDark("#0a0a0a")).toBe(true);
  });

  it("returns false for white", () => {
    expect(isDark("#ffffff")).toBe(false);
  });

  it("returns false for light gray", () => {
    expect(isDark("#fafafa")).toBe(false);
  });

  it("returns true for mid-dark color", () => {
    expect(isDark("#1a1a2e")).toBe(true);
  });
});

describe("contrastColor", () => {
  it("returns light text for dark backgrounds", () => {
    expect(contrastColor("#000000")).toBe("rgba(255,255,255,0.9)");
    expect(contrastColor("#0a0a0a")).toBe("rgba(255,255,255,0.9)");
  });

  it("returns dark text for light backgrounds", () => {
    expect(contrastColor("#ffffff")).toBe("rgba(0,0,0,0.85)");
    expect(contrastColor("#fafafa")).toBe("rgba(0,0,0,0.85)");
  });
});

describe("surfaceColor", () => {
  it("lightens dark background by +12 per channel", () => {
    const result = surfaceColor("#0a0a0a", true);
    // 0x0a + 12 = 22 = 0x16
    expect(result).toBe("#161616");
  });

  it("returns #ffffff for light mode", () => {
    expect(surfaceColor("#fafafa", false)).toBe("#ffffff");
  });

  it("clamps at 255", () => {
    const result = surfaceColor("#fafafa", true);
    // 0xfa (250) + 12 = 262 → clamped to 255 = 0xff
    expect(result).toBe("#ffffff");
  });
});

describe("deltaE", () => {
  it("returns 0 for identical colors", () => {
    expect(deltaE("#5E6AD2", "#5E6AD2")).toBe(0);
  });

  it("returns max distance for black vs white", () => {
    const d = deltaE("#000000", "#ffffff");
    // sqrt(255^2 * 3) ≈ 441.67
    expect(d).toBeCloseTo(441.67, 0);
  });

  it("returns reasonable distance for similar colors", () => {
    const d = deltaE("#5E6AD2", "#5E6AD3");
    expect(d).toBeGreaterThan(0);
    expect(d).toBeLessThan(5);
  });

  it("returns NaN for invalid hex", () => {
    expect(deltaE("invalid", "#000000")).toBeNaN();
  });
});
