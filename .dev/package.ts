import AdmZip from "adm-zip";
import { join, resolve } from "path";
import { readdirSync, statSync } from "fs";

const devDir = import.meta.dir!;
const rootDir = resolve(devDir, "..");
const outputPath = join(devDir, "sissify-me.zip");

const exclude = new Set(["README.md", ".git", ".dev"]);

const zip = new AdmZip();

const entries = readdirSync(rootDir);

for (const entry of entries) {
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
console.log(`Created ${outputPath}`);