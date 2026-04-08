/**
 * Generates public/og-default.jpg — used as the default Open Graph image.
 * Uses the logo-light.png centered on a warm stone background.
 * Run: node scripts/generate-og.mjs
 */

import sharp from 'sharp';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const OG_W = 1200;
const OG_H = 630;

// Read logo and get dimensions
const logoPath = join(root, 'public/images/logo-light.png');
const logoBuffer = readFileSync(logoPath);
const { width: origW, height: origH } = await sharp(logoBuffer).metadata();

// Scale logo to max height of 220px
const logoH = 220;
const logoW = Math.round((origW / origH) * logoH);
const logoX = Math.round((OG_W - logoW) / 2);
const logoY = 160;

// Build SVG with logo embedded as base64 + text
const logoBase64 = logoBuffer.toString('base64');

const svg = `<svg width="${OG_W}" height="${OG_H}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <!-- Background: stone-50 -->
  <rect width="${OG_W}" height="${OG_H}" fill="#fafaf9"/>

  <!-- Logo -->
  <image href="data:image/png;base64,${logoBase64}"
    x="${logoX}" y="${logoY}" width="${logoW}" height="${logoH}"/>

  <!-- Site name -->
  <text x="${OG_W / 2}" y="${logoY + logoH + 68}"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="72" font-weight="600"
    fill="#1c1917" text-anchor="middle" letter-spacing="2">
    Ilustropoli
  </text>

  <!-- Tagline -->
  <text x="${OG_W / 2}" y="${logoY + logoH + 116}"
    font-family="Arial, Helvetica, sans-serif"
    font-size="26" fill="#78716c" text-anchor="middle" letter-spacing="1">
    Arte original · Hermosillo, Sonora
  </text>
</svg>`;

const outPath = join(root, 'public/og-default.jpg');

await sharp(Buffer.from(svg))
  .jpeg({ quality: 92 })
  .toFile(outPath);

console.log(`✓ OG image generated → public/og-default.jpg (${OG_W}×${OG_H})`);
