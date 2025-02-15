import sharp from "sharp";
import { readFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateFavicon() {
  const svgBuffer = readFileSync(
    join(__dirname, "..", "public", "favicon.svg")
  );

  // Generate ICO file (32x32)
  await sharp(svgBuffer)
    .resize(32, 32)
    .toFormat("png")
    .toFile(join(__dirname, "..", "public", "favicon.ico"));

  console.log("Generated favicon.ico");
}

generateFavicon().catch(console.error);
