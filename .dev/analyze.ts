#!/usr/bin/env bun
/**
 * Agent Prompt Repo Analyzer
 * Usage:
 *   bun analyze.ts view [prompts-dir]
 *   bun analyze.ts lint [prompts-dir]
 */

import { readdir, readFile, stat } from "fs/promises";
import { join, basename, dirname, relative, resolve } from "path";

// ─────────────────────────────────────────────────────────────
// Token estimation  (GPT-3.5/4 BPE approximation, no native deps)
// ─────────────────────────────────────────────────────────────

function estimateTokens(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.round(words * 1.3 + text.length * 0.05);
}

// ─────────────────────────────────────────────────────────────
// Embed resolution:  {{{embed 'filename.md'}}}
// ─────────────────────────────────────────────────────────────

async function resolveEmbeds(
  content: string,
  dir: string,
  visited = new Set<string>(),
): Promise<string> {
  const pat = /\{\{\{embed\s+['"]([^'"]+)['"]\s*\}\}\}/g;
  let result = content;
  for (const m of [...content.matchAll(pat)]) {
    const absEmbed = join(dir, m[1]);
    if (visited.has(absEmbed)) {
      result = result.replace(m[0], `<!-- circular: ${m[1]} -->`);
      continue;
    }
    try {
      const sub = await readFile(absEmbed, "utf-8");
      result = result.replace(
        m[0],
        await resolveEmbeds(sub, dir, new Set(visited).add(absEmbed)),
      );
    } catch {
      result = result.replace(m[0], `<!-- not found: ${m[1]} -->`);
    }
  }
  return result;
}

// ─────────────────────────────────────────────────────────────
// Markdown helpers
// ─────────────────────────────────────────────────────────────

function slugify(t: string) {
  return t
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function extractLinks(text: string): string[] {
  const pat = /`((?:[\w./-]+\/)?[\w.-]+\.md)`/g;
  return [...new Set([...text.matchAll(pat)].map((m) => m[1]))];
}

function extractFrontmatter(content: string) {
  const m = content.match(/^---\n[\s\S]*?\n---\n/);
  return m
    ? { frontmatter: m[0], body: content.slice(m[0].length) }
    : { frontmatter: "", body: content };
}

interface HeadingSection {
  heading: string;
  level: number;
  anchor: string;
  tokens: number;
  links: string[];
}

function parseHeadingSections(body: string): HeadingSection[] {
  const lines = body.split("\n");
  const sections: HeadingSection[] = [];
  let cur: { heading: string; level: number; lines: string[] } | null = null;

  const flush = () => {
    if (!cur) return;
    const content = cur.lines.join("\n").trim();
    sections.push({
      heading: cur.heading,
      level: cur.level,
      anchor: slugify(cur.heading),
      tokens: estimateTokens(content),
      links: extractLinks(content),
    });
    cur = null;
  };
  for (const line of lines) {
    const hm = line.match(/^(#{1,6})\s+(.+)$/);
    if (hm) {
      flush();
      cur = { heading: hm[2].trim(), level: hm[1].length, lines: [] };
    } else if (cur) cur.lines.push(line);
  }
  flush();
  return sections;
}

// ─────────────────────────────────────────────────────────────
// ParsedFile  — cached per absolute path
// ─────────────────────────────────────────────────────────────

interface ParsedFile {
  absPath: string;
  exists: boolean;
  rawContent: string;
  rawTokens: number;
  resolvedTokens: number;
  embeds: string[]; // sibling filenames from {{{embed}}}
  allLinks: string[]; // every `path/file.md` link in raw content
  frontmatter: string;
  frontmatterTokens: number;
  headings: HeadingSection[];
}

const cache = new Map<string, ParsedFile>();

async function parseFile(
  absPath: string,
  promptsDir: string,
): Promise<ParsedFile> {
  if (cache.has(absPath)) return cache.get(absPath)!;

  let rawContent = "";
  let exists = false;
  try {
    rawContent = await readFile(absPath, "utf-8");
    exists = true;
  } catch {
    const stub: ParsedFile = {
      absPath,
      exists: false,
      rawContent: "",
      rawTokens: 0,
      resolvedTokens: 0,
      embeds: [],
      allLinks: [],
      frontmatter: "",
      frontmatterTokens: 0,
      headings: [],
    };
    cache.set(absPath, stub);
    return stub;
  }

  const resolved = await resolveEmbeds(rawContent, promptsDir);
  const embedPat = /\{\{\{embed\s+['"]([^'"]+)['"]\s*\}\}\}/g;
  const embeds = [...rawContent.matchAll(embedPat)].map((m) => m[1]);
  const allLinks = extractLinks(rawContent);
  const { frontmatter, body } = extractFrontmatter(resolved);

  const result: ParsedFile = {
    absPath,
    exists,
    rawContent,
    rawTokens: estimateTokens(rawContent),
    resolvedTokens: estimateTokens(resolved),
    embeds,
    allLinks,
    frontmatter,
    frontmatterTokens: estimateTokens(frontmatter),
    headings: parseHeadingSections(body),
  };
  cache.set(absPath, result);
  return result;
}

// ─────────────────────────────────────────────────────────────
// Link resolution  (try several base dirs)
// ─────────────────────────────────────────────────────────────

function resolveLink(
  link: string,
  promptsDir: string,
  _sourceAbs: string,
): string {
  // Strip leading "prompts/" (or whatever the dir basename is) if present,
  // so `prompts/somepath/file.md` doesn't become `prompts/prompts/somepath/file.md`
  const dirBase = basename(promptsDir);
  const normalized = link.startsWith(dirBase + "/")
    ? link.slice(dirBase.length + 1)
    : link;
  return link; //join(promptsDir, normalized);
}

// ─────────────────────────────────────────────────────────────
// Terminal colors
// ─────────────────────────────────────────────────────────────

const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  gray: "\x1b[90m",
  bgRed: "\x1b[41m",
  bgYellow: "\x1b[43m",
};

function badge(tokens: number, warn = 800, err = 3000): string {
  if (isNaN(tokens) || !isFinite(tokens)) return `${c.dim}?t${c.reset}`;
  const l = `${tokens}t`;
  if (tokens >= err) return `${c.bgRed}${c.white} ${l} ${c.reset}`;
  if (tokens >= warn) return `${c.yellow}${l}${c.reset}`;
  return `${c.dim}${l}${c.reset}`;
}

function fileClr(tokens: number) {
  if (tokens >= 3000) return c.red;
  if (tokens >= 800) return c.yellow;
  return c.white;
}

// ─────────────────────────────────────────────────────────────
// Recursive tree rendering
// ─────────────────────────────────────────────────────────────

// visited = set of absPath strings already fully rendered (cycle guard)
async function renderFile(
  parsed: ParsedFile,
  label: string,
  kind: "file" | "embed" | "link",
  prefix: string,
  isLast: boolean,
  promptsDir: string,
  visited: Set<string>,
): Promise<void> {
  const branch = isLast ? "└──" : "├──";
  const childPfx = prefix + (isLast ? "    " : "│   ");
  const alreadySeen = visited.has(parsed.absPath) && kind !== "file";

  // ── Row label ──────────────────────────────────────────────
  if (kind === "file") {
    const hasEmbeds = parsed.embeds.length > 0;
    const embedNote = hasEmbeds
      ? `  ${c.gray}(raw: ${parsed.rawTokens}t + embeds → ${parsed.resolvedTokens}t)${c.reset}`
      : "";
    const fc = fileClr(parsed.resolvedTokens);
    console.log(
      `${prefix}${c.cyan}${branch}${c.reset} ${c.bold}${fc}${label}${c.reset}  ${badge(parsed.resolvedTokens)}${embedNote}`,
    );
  } else if (kind === "embed") {
    const tok = parsed.exists
      ? badge(parsed.resolvedTokens)
      : `${c.red}not found${c.reset}`;
    const cycleNote = alreadySeen ? `  ${c.gray}↩ already shown${c.reset}` : "";
    console.log(
      `${prefix}${c.cyan}${branch}${c.reset} ${c.magenta}⊕ embed${c.reset}  ${c.dim}${label}${c.reset}  ${tok}${cycleNote}`,
    );
  } else {
    const tok = parsed.exists
      ? badge(parsed.resolvedTokens)
      : `${c.red}not found${c.reset}`;
    const cycleNote = alreadySeen ? `  ${c.gray}↩ already shown${c.reset}` : "";
    const fc = parsed.exists ? fileClr(parsed.resolvedTokens) : c.gray;
    console.log(
      `${prefix}${c.cyan}${branch}${c.reset} ${c.blue}⇒ link${c.reset}   ${fc}${label}${c.reset}  ${tok}${cycleNote}`,
    );
  }

  if (!parsed.exists || alreadySeen) return;

  // Mark as visited before descending (prevents infinite loops)
  const newVisited = new Set(visited).add(parsed.absPath);

  // ── Children ───────────────────────────────────────────────
  // Collect ordered child items:
  //   1. Embeds (if any)
  //   2a. If resolvedTokens > 1000: frontmatter node + heading nodes (each with their links)
  //   2b. If resolvedTokens ≤ 1000: all links flat

  type Child =
    | { t: "embed"; name: string }
    | { t: "link"; target: string }
    | { t: "fm" }
    | { t: "heading"; h: HeadingSection };

  const children: Child[] = [];

  for (const e of parsed.embeds) children.push({ t: "embed", name: e });

  const showHeadings = parsed.resolvedTokens > 1000;

  if (showHeadings) {
    if (parsed.frontmatter) children.push({ t: "fm" });
    for (const h of parsed.headings) children.push({ t: "heading", h });
    // Links NOT inside any heading → show flat after headings
    const headingLinkSet = new Set(parsed.headings.flatMap((h) => h.links));
    const orphanLinks = parsed.allLinks.filter((l) => !headingLinkSet.has(l));
    for (const l of orphanLinks) children.push({ t: "link", target: l });
  } else {
    for (const l of parsed.allLinks) children.push({ t: "link", target: l });
  }

  // Render children
  for (let i = 0; i < children.length; i++) {
    const ch = children[i];
    const last = i === children.length - 1;

    if (ch.t === "embed") {
      const absEmbed = join(promptsDir, ch.name);
      const ep = await parseFile(absEmbed, promptsDir);
      await renderFile(
        ep,
        ch.name,
        "embed",
        childPfx,
        last,
        promptsDir,
        newVisited,
      );
    } else if (ch.t === "link") {
      const absLink = resolveLink(ch.target, promptsDir, parsed.absPath);
      const lp = await parseFile(absLink, promptsDir);
      await renderFile(
        lp,
        ch.target,
        "link",
        childPfx,
        last,
        promptsDir,
        newVisited,
      );
    } else if (ch.t === "fm") {
      const b2 = last ? "└──" : "├──";
      console.log(
        `${childPfx}${c.cyan}${b2}${c.reset} ${c.gray}--- frontmatter${c.reset}  ${badge(parsed.frontmatterTokens, 200, 500)}`,
      );
    } else if (ch.t === "heading") {
      await renderHeading(ch.h, parsed, childPfx, last, promptsDir, newVisited);
    }
  }
}

async function renderHeading(
  h: HeadingSection,
  sourceFile: ParsedFile,
  prefix: string,
  isLast: boolean,
  promptsDir: string,
  visited: Set<string>,
): Promise<void> {
  const branch = isLast ? "└──" : "├──";
  const childPfx = prefix + (isLast ? "    " : "│   ");
  const icons = ["", "◆", "◇", "▸", "▹", "·", "·"];
  const icon = icons[Math.min(h.level, 6)];
  const indent = "  ".repeat(Math.max(0, h.level - 1));
  console.log(
    `${prefix}${c.cyan}${branch}${c.reset} ${c.gray}${indent}${icon}${c.reset} ${h.heading}  ` +
      `${badge(h.tokens, 500, 3000)}  ${c.dim}#${h.anchor}${c.reset}`,
  );

  // Links inside this heading
  for (let i = 0; i < h.links.length; i++) {
    const absLink = resolveLink(h.links[i], promptsDir, sourceFile.absPath);
    const lp = await parseFile(absLink, promptsDir);
    await renderFile(
      lp,
      h.links[i],
      "link",
      childPfx,
      i === h.links.length - 1,
      promptsDir,
      visited,
    );
  }
}

// ─────────────────────────────────────────────────────────────
// File discovery
// ─────────────────────────────────────────────────────────────

async function discoverFiles(dir: string): Promise<string[]> {
  try {
    const entries = await readdir(dir);
    return entries
      .filter((f) => f.endsWith(".md"))
      .map((f) => join(dir, f))
      .sort();
  } catch {
    return [];
  }
}

// ─────────────────────────────────────────────────────────────
// VIEW command
// ─────────────────────────────────────────────────────────────

async function cmdView(promptsDir: string) {
  const files = await discoverFiles(promptsDir);
  if (files.length === 0) {
    console.log(`${c.yellow}No .md files in: ${promptsDir}${c.reset}`);
    return;
  }

  console.log(`\n${c.bold}${c.cyan}┌─ Agent Prompt Repo${c.reset}`);
  console.log(`${c.cyan}│  ${c.dim}${resolve(promptsDir)}${c.reset}`);
  console.log(
    `${c.cyan}└─────────────────────────────────────────${c.reset}\n`,
  );

  for (let i = 0; i < files.length; i++) {
    const parsed = await parseFile(files[i], promptsDir);
    await renderFile(
      parsed,
      basename(files[i]),
      "file",
      "",
      i === files.length - 1,
      promptsDir,
      new Set([files[i]]),
    );
  }

  const all = files.map((f) => cache.get(f)!).filter(Boolean);
  const total = all.reduce((s, f) => s + f.resolvedTokens, 0);
  const w800 = all.filter((f) => f.resolvedTokens >= 800).length;
  const w3000 = all.filter((f) => f.resolvedTokens >= 3000).length;

  console.log(`\n${c.dim}──────────────────────────────────────────${c.reset}`);
  console.log(
    `${c.bold}${files.length} files${c.reset}  total ${c.cyan}${total}t${c.reset}` +
      (w800 > 0 ? `  ${c.yellow}${w800} >800t${c.reset}` : "") +
      (w3000 > 0 ? `  ${c.red}${w3000} >3000t${c.reset}` : ""),
  );
  console.log();
}

// ─────────────────────────────────────────────────────────────
// LINT command
// ─────────────────────────────────────────────────────────────

interface Issue {
  severity: "warn" | "error";
  file: string;
  location?: string;
  message: string;
  tokens: number;
}

async function cmdLint(promptsDir: string) {
  const files = await discoverFiles(promptsDir);
  const issues: Issue[] = [];

  for (const fp of files) {
    const p = await parseFile(fp, promptsDir);
    const n = basename(fp);

    if (p.resolvedTokens > 3000)
      issues.push({
        severity: "error",
        file: n,
        message: "File exceeds 3000 tokens after embed resolution",
        tokens: p.resolvedTokens,
      });
    else if (p.resolvedTokens > 800)
      issues.push({
        severity: "warn",
        file: n,
        message: "File exceeds 800 tokens after embed resolution",
        tokens: p.resolvedTokens,
      });

    for (const h of p.headings) {
      if (h.tokens > 3000)
        issues.push({
          severity: "error",
          file: n,
          location: `#${h.anchor}`,
          message: `Heading "${h.heading}" exceeds 3000 tokens`,
          tokens: h.tokens,
        });
      else if (h.tokens > 800)
        issues.push({
          severity: "warn",
          file: n,
          location: `#${h.anchor}`,
          message: `Heading "${h.heading}" exceeds 800 tokens`,
          tokens: h.tokens,
        });
    }

    for (const e of p.embeds) {
      try {
        await stat(join(promptsDir, e));
      } catch {
        issues.push({
          severity: "error",
          file: n,
          location: `{{{embed '${e}'}}}`,
          message: `Embed target not found: ${e}`,
          tokens: 0,
        });
      }
    }

    for (const l of p.allLinks) {
      const lp = await parseFile(resolveLink(l, promptsDir, fp), promptsDir);
      if (!lp.exists)
        issues.push({
          severity: "warn",
          file: n,
          location: `\`${l}\``,
          message: `Linked file not found: ${l}`,
          tokens: 0,
        });
    }
  }

  console.log(
    `\n${c.bold}${c.cyan}Lint Results${c.reset}  ${c.dim}${promptsDir}${c.reset}\n`,
  );

  if (issues.length === 0) {
    console.log(`${c.green}✓ No issues found${c.reset}\n`);
    return;
  }

  let errors = 0,
    warnings = 0;
  for (const iss of issues) {
    const icon = iss.severity === "error" ? `${c.red}✖` : `${c.yellow}⚠`;
    const sev =
      iss.severity === "error"
        ? `${c.red}${c.bold}error${c.reset}`
        : `${c.yellow}${c.bold}warn ${c.reset}`;
    const loc = iss.location ? `${c.dim}${iss.location}  ${c.reset}` : "";
    const tok = iss.tokens > 0 ? `  ${c.dim}(${iss.tokens}t)${c.reset}` : "";
    console.log(
      `${icon}${c.reset} ${sev}  ${c.bold}${iss.file}${c.reset}  ${loc}${iss.message}${tok}`,
    );
    iss.severity === "error" ? errors++ : warnings++;
  }

  console.log(`\n${c.dim}──────────────────────────────────${c.reset}`);
  const parts = [
    errors > 0
      ? `${c.red}${c.bold}${errors} error${errors > 1 ? "s" : ""}${c.reset}`
      : "",
    warnings > 0
      ? `${c.yellow}${warnings} warning${warnings > 1 ? "s" : ""}${c.reset}`
      : "",
  ].filter(Boolean);
  console.log(parts.join("  ") + "\n");
  if (errors > 0) process.exit(1);
}

// ─────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────

async function main() {
  const [cmd, dir] = process.argv.slice(2);
  const promptsDir = dir ?? join(process.cwd(), "prompts");

  if (!cmd || (cmd !== "view" && cmd !== "lint")) {
    console.log(`
${c.bold}Usage:${c.reset}
  bun analyze.ts ${c.cyan}view${c.reset} [prompts-dir]   Recursive tree: tokens, embeds, links, headings
  bun analyze.ts ${c.cyan}lint${c.reset} [prompts-dir]   Warn/error on token overflows + broken refs

${c.bold}Token thresholds:${c.reset}
  ${c.yellow}warn${c.reset}   file > 800t  |  heading > 800t
  ${c.red}error${c.reset}  file > 3000t |  heading > 3000t

${c.bold}Tree legend:${c.reset}
  ${c.magenta}⊕ embed${c.reset}  — inlined via ${c.magenta}{{{embed 'file.md'}}}${c.reset}  (resolved before token count)
  ${c.blue}⇒ link${c.reset}   — referenced via ${c.blue}\`prompts/file.md\`${c.reset}        (followed, not inlined)
  ◆ / ◇ / ▸  — heading levels (shown when file > 1000t)
`);
    process.exit(0);
  }

  if (cmd === "view") await cmdView(promptsDir);
  else await cmdLint(promptsDir);
}

main().catch((e) => {
  console.error(`${c.red}Fatal:${c.reset}`, e.message);
  process.exit(1);
});
