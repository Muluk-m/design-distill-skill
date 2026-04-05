export function isDark(hex: string): boolean {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}

export function contrastColor(hex: string): string {
  return isDark(hex) ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)";
}

export function surfaceColor(bgHex: string, dark: boolean): string {
  if (dark) {
    const h = bgHex.replace("#", "");
    const r = Math.min(255, parseInt(h.slice(0, 2), 16) + 12);
    const g = Math.min(255, parseInt(h.slice(2, 4), 16) + 12);
    const b = Math.min(255, parseInt(h.slice(4, 6), 16) + 12);
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  }
  return "#ffffff";
}

export function deltaE(hex1: string, hex2: string): number {
  const toRgb = (hex: string): [number, number, number] => {
    const h = hex.replace("#", "");
    return [
      parseInt(h.slice(0, 2), 16),
      parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16),
    ];
  };
  try {
    const [r1, g1, b1] = toRgb(hex1);
    const [r2, g2, b2] = toRgb(hex2);
    return Math.sqrt((r2 - r1) ** 2 + (g2 - g1) ** 2 + (b2 - b1) ** 2);
  } catch {
    return Infinity;
  }
}
