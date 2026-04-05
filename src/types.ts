export interface Overview {
  description: string;
  tone: string;
  bgColor: string;
  personality: string;
  antiPatterns: string;
}

export interface ColorEntry {
  name: string;
  hex: string;
  desc: string;
}

export interface TypographyEntry {
  name: string;
  value: string;
}

export interface ComponentEntry {
  name: string;
  css: string;
  props: Record<string, string>;
}

export interface TokenMap {
  [category: string]: Record<string, string>;
}

export interface DiffRow {
  category: string;
  token: string;
  oldValue: string;
  newValue: string;
}
