import { readdirSync, statSync, mkdirSync } from "node:fs";
import { join, dirname, basename, extname } from "node:path";
import sharp from "sharp";

const PAGES_DIR = join(process.cwd(), "src/pages");
const OUT_DIR = join(process.cwd(), "public/og");

const WIDTH = 1200;
const HEIGHT = 630;

function escapeXml(s: string): string {
  return s.replace(
    /[<>&"']/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[c]!,
  );
}

function svg(label: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="100%" height="100%" fill="#ffffff"/>
  <text x="${WIDTH / 2}" y="${HEIGHT / 2}" text-anchor="middle" dominant-baseline="middle" font-family="Georgia, 'Latin Modern Roman', 'Times New Roman', serif" font-size="64" fill="#000000">${escapeXml(label)}</text>
</svg>`;
}

async function render(label: string, outPath: string) {
  mkdirSync(dirname(outPath), { recursive: true });
  await sharp(Buffer.from(svg(label))).png().toFile(outPath);
  console.log("wrote", outPath, `(${label})`);
}

function isDir(p: string): boolean {
  try {
    return statSync(p).isDirectory();
  } catch {
    return false;
  }
}

async function main() {
  for (const entry of readdirSync(PAGES_DIR)) {
    if (entry.startsWith("_") || entry.startsWith(".")) continue;
    const full = join(PAGES_DIR, entry);
    if (!isDir(full)) continue;

    const section = entry;
    await render(section, join(OUT_DIR, `${section}.png`));

    for (const f of readdirSync(full)) {
      if (extname(f) !== ".tsx") continue;
      const slug = basename(f, ".tsx");
      await render(`${section}/${slug}`, join(OUT_DIR, section, `${slug}.png`));
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
