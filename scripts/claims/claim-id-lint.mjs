// scripts/claims/claim-id-lint.mjs
import fg from "fast-glob";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();

const DEFAULTS = {
  markdownGlobs: ["docs/**/*.md", "src/**/*.md", "src/**/*.mdx", "*.md", "**/*.md", "**/*.mdx"],
  ignoreGlobs: ["**/node_modules/**", "**/.next/**", "**/dist/**", "**/build/**", "**/.git/**"],
};

// Canonical: KS-FOO-001 (3 digits)
const CANONICAL = /\bKS-[A-Z0-9]{2,32}-\d{3}\b/g;

// Suspicious variants we want to FAIL:
// - KS_DECIDE_001
// - KS-DECIDE-01
// - ks-decide-001
// - KS-DECIDE001
// - KS–DECIDE–001 (en dash)
const SUSPICIOUS = [
  /\bKS[_][A-Z0-9_]{2,32}[_]\d{1,4}\b/g,         // underscores
  /\bKS-[A-Z0-9]{2,32}-\d{1,2}\b/g,              // wrong digit count
  /\bks-[a-z0-9]{2,32}-\d{3}\b/g,                // lowercase
  /\bKS-[A-Z0-9]{2,32}\d{3}\b/g,                 // missing dash before digits
  /\bKS[–—-][A-Z0-9]{2,32}[–—-]\d{3}\b/g,        // en/em dash used
];

// Optional stricter mode:
// REQUIRE_CANONICAL=1 -> if it looks like "claim:" in a line, enforce canonical presence.
function lintFile(file, strictMode) {
  const abs = path.resolve(ROOT, file);
  const text = fs.readFileSync(abs, "utf8");

  const canonicalFound = new Set(text.match(CANONICAL) ?? []);
  const issues = [];

  for (const re of SUSPICIOUS) {
    const matches = text.match(re) ?? [];
    for (const m of matches) {
      if (!canonicalFound.has(m)) {
        issues.push({ kind: "SUSPICIOUS_CLAIM_ID", match: m });
      }
    }
  }

  if (strictMode) {
    const lines = text.split(/\r?\n/);
    lines.forEach((line, idx) => {
      // Any line that uses “Claim”, “Claim ID”, “KS-” mention but doesn't include a canonical ID
      const looksLikeClaimLine =
        /\bclaim\b/i.test(line) || /\bclaim id\b/i.test(line) || /\bKS\b/.test(line);

      if (looksLikeClaimLine && !(line.match(CANONICAL)?.length)) {
        // If it contains any suspicious pattern, show it; otherwise just flag missing canonical
        const suspicious = SUSPICIOUS.some((re) => re.test(line));
        issues.push({
          kind: suspicious ? "NON_CANONICAL_CLAIM_LINE" : "MISSING_CANONICAL_CLAIM_ID",
          match: line.trim().slice(0, 200),
          line: idx + 1,
        });
      }
    });
  }

  return issues;
}

function main() {
  const strictMode = process.env.REQUIRE_CANONICAL === "1";

  const globs = process.env.MD_GLOBS
    ? process.env.MD_GLOBS.split(",").map((s) => s.trim()).filter(Boolean)
    : DEFAULTS.markdownGlobs;

  const files = fg.sync(globs, {
    cwd: ROOT,
    ignore: DEFAULTS.ignoreGlobs,
    onlyFiles: true,
    unique: true,
    dot: true,
  });

  const all = [];
  for (const f of files) {
    const issues = lintFile(f, strictMode);
    if (issues.length) all.push({ file: f, issues });
  }

  if (all.length) {
    console.error("\n❌ CLAIM ID LINT FAILED\n");
    for (const item of all) {
      console.error(`- ${item.file}`);
      for (const i of item.issues) {
        if (i.line) console.error(`    [${i.kind}] line ${i.line}: ${i.match}`);
        else console.error(`    [${i.kind}] ${i.match}`);
      }
    }
    console.error("\nFix claim IDs to canonical format: KS-FOO-001\n");
    process.exit(1);
  }

  console.log(`✅ Claim ID lint passed. (${files.length} markdown files scanned)`);
}

main();
