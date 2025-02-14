import sharp from "sharp";
import { readFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function convertSvgToPng(inputPath, outputPath, size) {
  const svgBuffer = readFileSync(inputPath);
  await sharp(svgBuffer).resize(size, size).png().toFile(outputPath);
}

async function main() {
  const sizes = [192, 512];

  for (const size of sizes) {
    await convertSvgToPng(
      join(__dirname, "..", "public", `icon-${size}.svg`),
      join(__dirname, "..", "public", `icon-${size}.png`),
      size
    );
    console.log(`Generated icon-${size}.png`);
  }
}

main().catch(console.error);
