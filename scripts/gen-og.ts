import { readdirSync, statSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname, basename, extname } from "node:path";
import { Resvg } from "@resvg/resvg-js";

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

const FONT = "Georgia, 'Latin Modern Roman', 'Times New Roman', serif";
const FONT_SIZE = 64;
const PADDING = 80;
const MAX_WIDTH = WIDTH - PADDING * 2;
const CHARS_PER_EM = 0.55;

function wrapLines(label: string): string[] {
  if (label.length * CHARS_PER_EM * FONT_SIZE <= MAX_WIDTH) return [label];

  const slashIdx = label.indexOf("/");
  if (slashIdx !== -1) {
    return [label.slice(0, slashIdx + 1), label.slice(slashIdx + 1)];
  }
  return [label];
}

function svg(label: string): string {
  const lines = wrapLines(label);
  const lineHeight = FONT_SIZE * 1.4;
  const blockHeight = lineHeight * (lines.length - 1);
  const startY = HEIGHT / 2 - blockHeight / 2;

  const tspans = lines
    .map(
      (line, i) =>
        `<tspan x="${WIDTH / 2}" dy="${i === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`,
    )
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="100%" height="100%" fill="#ffffff"/>
  <text x="${WIDTH / 2}" y="${startY}" text-anchor="middle" dominant-baseline="middle" font-family="${FONT}" font-size="${FONT_SIZE}" fill="#000000">${tspans}</text>
</svg>`;
}

function render(label: string, outPath: string) {
  mkdirSync(dirname(outPath), { recursive: true });
  const resvg = new Resvg(svg(label), { fitTo: { mode: "width", value: WIDTH } });
  const png = resvg.render().asPng();
  writeFileSync(outPath, png);
  console.log("wrote", outPath, `(${label})`);
}

function isDir(p: string): boolean {
  try {
    return statSync(p).isDirectory();
  } catch {
    return false;
  }
}

function main() {
  render("artiehumphreys.com", join(OUT_DIR, "home.png"));

  for (const entry of readdirSync(PAGES_DIR)) {
    if (entry.startsWith("_") || entry.startsWith(".")) continue;
    const full = join(PAGES_DIR, entry);
    if (!isDir(full)) continue;

    const section = entry;
    render(section, join(OUT_DIR, `${section}.png`));

    for (const f of readdirSync(full)) {
      if (extname(f) !== ".tsx") continue;
      const slug = basename(f, ".tsx");
      render(`${section}/${slug}`, join(OUT_DIR, section, `${slug}.png`));
    }
  }
}

main();
