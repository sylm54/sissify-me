import AdmZip from "adm-zip";
import { createHash } from "crypto";
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "fs";
import { join, resolve } from "path";

const devDir = import.meta.dir!;
const rootDir = resolve(devDir, "..");
const outputPath = join(devDir, "sissifyme.zip");

// Update channel index, served beside the zip (url is relative to this file).
const indexPath = join(devDir, "index.json");

// Everything that should not ship inside the framework archive.
const exclude = new Set(["README.md", ".git", ".dev", ".github"]);

// ─────────────────────────────────────────────────────────────
// manifest.json — required, identifies the framework
// ─────────────────────────────────────────────────────────────

const manifestPath = join(rootDir, "manifest.json");
if (!existsSync(manifestPath)) {
  throw new Error(
    `Missing ${manifestPath}. A framework requires a root manifest.json (see FRAMEWORKS.md).`,
  );
}
const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));

for (const field of ["id", "name", "description", "version"]) {
  if (typeof manifest[field] !== "string" || !manifest[field]) {
    throw new Error(`manifest.json is missing required field: "${field}"`);
  }
}

// ─────────────────────────────────────────────────────────────
// config.json — optional install-time options mapping to parts
// ─────────────────────────────────────────────────────────────

const configPath = join(rootDir, "config.json");
const config = existsSync(configPath)
  ? JSON.parse(readFileSync(configPath, "utf-8"))
  : null;

const partFolders = new Set<string>();
if (config) {
  if (!Array.isArray(config.options)) {
    throw new Error(
      `config.json must declare an "options" array (see FRAMEWORKS.md → The config).`,
    );
  }
  const seenGroupIds = new Set<string>();
  for (const group of config.options) {
    if (typeof group !== "object" || group === null) {
      throw new Error(`config.json: every option group must be an object.`);
    }
    for (const field of ["type", "id", "title", "choices"]) {
      if (group[field] === undefined) {
        throw new Error(
          `config.json: option group is missing required field "${field}".`,
        );
      }
    }
    if (group.type !== "single" && group.type !== "multiple") {
      throw new Error(
        `config.json: option group "${group.id}" has invalid type "${group.type}" (expected "single" or "multiple").`,
      );
    }
    if (seenGroupIds.has(group.id)) {
      throw new Error(`config.json: duplicate option group id "${group.id}".`);
    }
    seenGroupIds.add(group.id);

    if (!Array.isArray(group.choices) || group.choices.length === 0) {
      throw new Error(
        `config.json: option group "${group.id}" must have a non-empty "choices" array.`,
      );
    }
    const seenChoiceIds = new Set<string>();
    for (const choice of group.choices) {
      for (const field of ["id", "label", "part"]) {
        if (typeof choice[field] !== "string" || !choice[field]) {
          throw new Error(
            `config.json: choice in group "${group.id}" is missing required string field "${field}".`,
          );
        }
      }
      if (seenChoiceIds.has(choice.id)) {
        throw new Error(
          `config.json: duplicate choice id "${choice.id}" in group "${group.id}".`,
        );
      }
      seenChoiceIds.add(choice.id);
      partFolders.add(choice.part);
    }

    // Validate the default references an existing choice.
    const ids = new Set(group.choices.map((ch: { id: string }) => ch.id));
    if (group.type === "single" && group.default !== undefined) {
      if (!ids.has(group.default)) {
        throw new Error(
          `config.json: option group "${group.id}" default "${group.default}" does not match any choice id.`,
        );
      }
    } else if (group.type === "multiple" && group.default !== undefined) {
      if (!Array.isArray(group.default)) {
        throw new Error(
          `config.json: option group "${group.id}" (multiple) default must be an array of choice ids.`,
        );
      }
      for (const d of group.default) {
        if (!ids.has(d)) {
          throw new Error(
            `config.json: option group "${group.id}" default "${d}" does not match any choice id.`,
          );
        }
      }
    }
  }
}

// ─────────────────────────────────────────────────────────────
// Layout checks — base/ is required; referenced parts must exist
// ─────────────────────────────────────────────────────────────

const baseDir = join(rootDir, "base");
if (!statSync(baseDir, { throwIfNoEntry: false })?.isDirectory()) {
  throw new Error(
    `Missing ${baseDir}. The new layout requires a base/ folder (see FRAMEWORKS.md → ZIP layout).`,
  );
}

for (const part of partFolders) {
  const partDir = join(rootDir, part);
  if (!statSync(partDir, { throwIfNoEntry: false })?.isDirectory()) {
    throw new Error(
      `config.json references part "${part}" but ${partDir} does not exist.`,
    );
  }
}

if (!statSync(join(rootDir, "base", "prompts"), { throwIfNoEntry: false })?.isDirectory()) {
  console.warn(
    "Warning: no base/prompts/ directory found; the archive will contain sandbox content only.",
  );
}

// ─────────────────────────────────────────────────────────────
// Build the archive (flat root: manifest.json, config.json, base/, parts)
// ─────────────────────────────────────────────────────────────

const zip = new AdmZip();

for (const entry of readdirSync(rootDir)) {
  if (exclude.has(entry)) continue;

  const fullPath = join(rootDir, entry);
  const stat = statSync(fullPath);

  if (stat.isDirectory()) {
    zip.addLocalFolder(fullPath, entry);
  } else {
    zip.addLocalFile(fullPath);
  }
}

zip.writeZip(outputPath);

// SHA-256 for the update index document (see FRAMEWORKS.md → Distributing over the network).
const sha256 = createHash("sha256")
  .update(readFileSync(outputPath))
  .digest("hex");

const index: Record<string, string> = {
  version: manifest.version,
  // Relative to the index document itself, so both can be uploaded side by side.
  url: "./sissifyme.zip",
  sha256,
  description: manifest.description,
};
if (typeof manifest.min_app_version === "string" && manifest.min_app_version) {
  index.min_app_version = manifest.min_app_version;
}
writeFileSync(indexPath, JSON.stringify(index, null, 2) + "\n");

console.log(`Created ${outputPath}`);
console.log(`Created ${indexPath}`);
console.log(`version   ${manifest.version}`);
console.log(`sha256    ${sha256}`);
if (config) {
  console.log(`parts     ${partFolders.size} referenced by config.json`);
}
