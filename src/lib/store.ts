import { homedir } from "node:os";
import { join, resolve } from "node:path";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
  rmSync,
  cpSync,
} from "node:fs";

export interface StyleHeader {
  source_url?: string;
  distilled?: string;
  name?: string;
}

export interface CopyResult {
  copied: string[];
  skipped: string[];
}

function getBaseDir(): string {
  return process.env.DESIGN_DISTILL_HOME
    || join(homedir(), ".config", "design-distill");
}

function ensureDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
}

function validateName(name: string): void {
  if (!/^[a-z0-9][a-z0-9._-]*$/.test(name)) {
    console.error(
      `Invalid style name: "${name}". Use lowercase letters, numbers, hyphens, dots, or underscores.`
    );
    process.exit(1);
  }
  const resolved = resolve(getBaseDir(), name);
  if (!resolved.startsWith(getBaseDir())) {
    console.error(`Invalid style name: "${name}"`);
    process.exit(1);
  }
}

export function baseDir(): string {
  ensureDir(getBaseDir());
  return getBaseDir();
}

export function styleDir(name: string): string {
  validateName(name);
  return join(getBaseDir(), name);
}

export function stylePath(name: string): string {
  return join(styleDir(name), "DESIGN.md");
}

export function screenshotsDir(name: string): string {
  return join(styleDir(name), "screenshots");
}

export function ensureScreenshotsDir(name: string): string {
  const dir = screenshotsDir(name);
  ensureDir(dir);
  return dir;
}

export function listStyles(): string[] {
  ensureDir(getBaseDir());
  return readdirSync(getBaseDir(), { withFileTypes: true })
    .filter(
      (d: { isDirectory(): boolean; name: string }) => d.isDirectory() && existsSync(join(getBaseDir(), d.name, "DESIGN.md"))
    )
    .map((d: { name: string }) => d.name)
    .sort();
}

export function styleExists(name: string): boolean {
  return existsSync(stylePath(name));
}

export function readStyle(name: string): string {
  return readFileSync(stylePath(name), "utf-8");
}

export function writeStyle(name: string, content: string): void {
  const dir = styleDir(name);
  ensureDir(dir);
  writeFileSync(stylePath(name), content, "utf-8");
}

export function deleteStyle(name: string): void {
  rmSync(styleDir(name), { recursive: true, force: true });
}

export function parseDesignHeader(content: string): StyleHeader {
  const header: StyleHeader = {};
  const sourceMatch = content.match(/>\s*source_url:\s*(.+)/);
  if (sourceMatch) header.source_url = sourceMatch[1]!.trim();
  const dateMatch = content.match(/>\s*distilled:\s*(.+)/);
  if (dateMatch) header.distilled = dateMatch[1]!.trim();
  const nameMatch = content.match(/^#\s+(.+?)(?:\s+Design\b.*)?$/m);
  if (nameMatch) header.name = nameMatch[1]!.trim();
  return header;
}

export function copyBundledStyles(force = false): CopyResult {
  const bundledDir = join(
    new URL(".", import.meta.url).pathname,
    "..",
    "..",
    "bundled"
  );
  if (!existsSync(bundledDir)) return { copied: [], skipped: [] };

  const copied: string[] = [];
  const skipped: string[] = [];

  for (const entry of readdirSync(bundledDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const src = join(bundledDir, entry.name, "DESIGN.md");
    if (!existsSync(src)) continue;

    if (styleExists(entry.name) && !force) {
      skipped.push(entry.name);
      continue;
    }

    const destDir = styleDir(entry.name);
    ensureDir(destDir);
    cpSync(src, stylePath(entry.name));
    copied.push(entry.name);
  }

  return { copied, skipped };
}
