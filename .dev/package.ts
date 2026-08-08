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

// A framework must declare a manifest.json at its root (see FRAMEWORKS.md).
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

if (!statSync(join(rootDir, "prompts"), { throwIfNoEntry: false })?.isDirectory()) {
  console.warn(
    "Warning: no prompts/ directory found; the archive will contain sandbox content only.",
  );
}

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
