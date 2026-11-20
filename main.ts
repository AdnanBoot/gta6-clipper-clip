import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

interface VideoManifest {
  url: string;
}

/**
 * Validates that VIDEO.json contains valid JSON with a non-empty string `url` field.
 */
function parseAndValidateVideoJson(filePath: string): VideoManifest {
  const raw = readFileSync(filePath, 'utf8');
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    throw new Error(`Invalid JSON in ${filePath}: ${(err as Error).message}`);
  }

  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    typeof (parsed as Record<string, unknown>).url !== 'string' ||
    ((parsed as Record<string, unknown>).url as string).trim().length === 0
  ) {
    throw new Error(`VIDEO.json at ${filePath} must contain a non-empty string "url" field`);
  }

  return parsed as VideoManifest;
}

/**
 * Entrypoint for the gta6-clipper-01 competition entry.
 * Validates VIDEO.json and copies it from MAKEFUN_BOT_DIR into MAKEFUN_OUTPUT_DIR.
 */
function main(): void {
  const sourceDir = resolve(process.env.MAKEFUN_BOT_DIR || process.cwd());
  const targetDir = resolve(process.env.MAKEFUN_OUTPUT_DIR || '/output');

  const sourceFile = resolve(sourceDir, 'VIDEO.json');
  const targetFile = resolve(targetDir, 'VIDEO.json');

  if (!existsSync(sourceFile)) {
    console.error(`[clipper-entry] Missing VIDEO.json at ${sourceFile}`);
    process.exit(1);
  }

  let manifest: VideoManifest;
  try {
    manifest = parseAndValidateVideoJson(sourceFile);
  } catch (err) {
    console.error(`[clipper-entry] Validation failed: ${(err as Error).message}`);
    process.exit(1);
  }

  mkdirSync(targetDir, { recursive: true });
  copyFileSync(sourceFile, targetFile);
  console.log(`[clipper-entry] Validated url=${manifest.url}`);
  console.log(`[clipper-entry] Copied ${sourceFile} -> ${targetFile}`);
}

main();
