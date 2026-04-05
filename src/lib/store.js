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

const BASE_DIR = join(homedir(), ".config", "design-distill");

function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

function validateName(name) {
  if (!/^[a-z0-9][a-z0-9._-]*$/.test(name)) {
    console.error(
      `Invalid style name: "${name}". Use lowercase letters, numbers, hyphens, dots, or underscores.`
    );
    process.exit(1);
  }
  const resolved = resolve(BASE_DIR, name);
  if (!resolved.startsWith(BASE_DIR)) {
    console.error(`Invalid style name: "${name}"`);
    process.exit(1);
  }
}

export function baseDir() {
  ensureDir(BASE_DIR);
  return BASE_DIR;
}

export function styleDir(name) {
  validateName(name);
  return join(BASE_DIR, name);
}

export function stylePath(name) {
  return join(styleDir(name), "DESIGN.md");
}

export function screenshotsDir(name) {
  return join(styleDir(name), "screenshots");
}

export function ensureScreenshotsDir(name) {
  const dir = screenshotsDir(name);
  ensureDir(dir);
  return dir;
}

export function listStyles() {
  ensureDir(BASE_DIR);
  return readdirSync(BASE_DIR, { withFileTypes: true })
    .filter(
      (d) => d.isDirectory() && existsSync(join(BASE_DIR, d.name, "DESIGN.md"))
    )
    .map((d) => d.name)
    .sort();
}

export function styleExists(name) {
  return existsSync(stylePath(name));
}

export function readStyle(name) {
  return readFileSync(stylePath(name), "utf-8");
}

export function writeStyle(name, content) {
  const dir = styleDir(name);
  ensureDir(dir);
  writeFileSync(stylePath(name), content, "utf-8");
}

export function deleteStyle(name) {
  rmSync(styleDir(name), { recursive: true, force: true });
}

export function parseDesignHeader(content) {
  const header = {};
  const sourceMatch = content.match(/>\s*source_url:\s*(.+)/);
  if (sourceMatch) header.source_url = sourceMatch[1].trim();
  const dateMatch = content.match(/>\s*distilled:\s*(.+)/);
  if (dateMatch) header.distilled = dateMatch[1].trim();
  const nameMatch = content.match(/^#\s+(.+?)(?:\s+Design\b.*)?$/m);
  if (nameMatch) header.name = nameMatch[1].trim();
  return header;
}

export function copyBundledStyles(force = false) {
  const bundledDir = join(
    new URL(".", import.meta.url).pathname,
    "..",
    "..",
    "bundled"
  );
  if (!existsSync(bundledDir)) return [];

  const copied = [];
  const skipped = [];

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
