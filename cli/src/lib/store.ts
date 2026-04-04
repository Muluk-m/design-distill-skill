import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";

const BASE_DIR = join(homedir(), ".config", "design-dna");
const STYLES_DIR = join(BASE_DIR, "styles");
const SCREENSHOTS_DIR = join(BASE_DIR, "screenshots");

function ensureDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
}

function validateName(name: string): void {
  if (!/^[a-z0-9][a-z0-9._-]*$/.test(name)) {
    console.error(`Invalid style name: "${name}". Use lowercase letters, numbers, hyphens, dots, or underscores.`);
    process.exit(1);
  }
  const resolved = resolve(STYLES_DIR, name);
  if (!resolved.startsWith(STYLES_DIR)) {
    console.error(`Invalid style name: "${name}"`);
    process.exit(1);
  }
}

export function stylesDir(): string {
  ensureDir(STYLES_DIR);
  return STYLES_DIR;
}

export function stylePath(name: string): string {
  validateName(name);
  return join(STYLES_DIR, `${name}.md`);
}

export function screenshotsPath(name: string): string {
  validateName(name);
  return join(SCREENSHOTS_DIR, name);
}

export function ensureScreenshotsDir(name: string): string {
  const dir = screenshotsPath(name);
  ensureDir(dir);
  return dir;
}

export function listStyles(): string[] {
  ensureDir(STYLES_DIR);
  return readdirSync(STYLES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
    .sort();
}

export function styleExists(name: string): boolean {
  return existsSync(stylePath(name));
}

export function readStyle(name: string): string {
  return readFileSync(stylePath(name), "utf-8");
}

export function writeStyle(name: string, content: string): void {
  ensureDir(STYLES_DIR);
  writeFileSync(stylePath(name), content, "utf-8");
}

export function deleteStyle(name: string): void {
  rmSync(stylePath(name), { force: true });
  rmSync(screenshotsPath(name), { recursive: true, force: true });
}
