#!/usr/bin/env node

/**
 * Image Optimization Script
 * 
 * This script optimizes large background images by:
 * 1. Converting to WebP format (60-80% smaller than JPEG)
 * 2. Creating multiple sizes for responsive loading
 * 3. Creating tiny blur placeholders for progressive loading
 * 
 * Usage: node scripts/optimize-images.js
 * 
 * Prerequisites: npm install sharp --save-dev
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '../src/assets/img/freepik');
const OUTPUT_DIR = path.join(__dirname, '../src/assets/img/freepik/optimized');

// Configuration for different sizes
const SIZES = {
  placeholder: { width: 20, quality: 20 },  // Tiny blur placeholder
  small: { width: 640, quality: 75 },        // Mobile
  medium: { width: 1280, quality: 80 },      // Tablet
  large: { width: 1920, quality: 85 },       // Desktop
  full: { width: 2560, quality: 85 },        // Large screens
};

async function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

async function optimizeImage(filename) {
  const inputPath = path.join(SOURCE_DIR, filename);
  const baseName = path.parse(filename).name;
  
  console.log(`\n📸 Processing: ${filename}`);
  
  const inputStats = fs.statSync(inputPath);
  console.log(`   Original size: ${(inputStats.size / 1024 / 1024).toFixed(2)} MB`);
  
  let totalSaved = 0;
  
  for (const [sizeName, config] of Object.entries(SIZES)) {
    const outputFilename = `${baseName}-${sizeName}.webp`;
    const outputPath = path.join(OUTPUT_DIR, outputFilename);
    
    try {
      await sharp(inputPath)
        .resize(config.width, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: config.quality })
        .toFile(outputPath);
      
      const outputStats = fs.statSync(outputPath);
      const savedPercent = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
      totalSaved += inputStats.size - outputStats.size;
      
      console.log(`   ✓ ${sizeName}: ${(outputStats.size / 1024).toFixed(0)} KB (${savedPercent}% smaller)`);
    } catch (error) {
      console.error(`   ✗ ${sizeName}: Failed - ${error.message}`);
    }
  }
  
  // Also create a compressed JPEG fallback for Safari < 14
  const jpegOutputPath = path.join(OUTPUT_DIR, `${baseName}-large.jpg`);
  await sharp(inputPath)
    .resize(1920, null, { withoutEnlargement: true, fit: 'inside' })
    .jpeg({ quality: 80, progressive: true })
    .toFile(jpegOutputPath);
  
  console.log(`   📉 Total potential savings: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

async function main() {
  console.log('🚀 Starting image optimization...\n');
  
  await ensureOutputDir();
  
  const files = fs.readdirSync(SOURCE_DIR)
    .filter(file => /\.(jpg|jpeg|png)$/i.test(file));
  
  console.log(`Found ${files.length} images to optimize`);
  
  for (const file of files) {
    await optimizeImage(file);
  }
  
  console.log('\n✅ Optimization complete!');
  console.log(`\nOptimized images saved to: ${OUTPUT_DIR}`);
  console.log('\nNext steps:');
  console.log('1. Update src/shared/backgrounds.ts to use the optimized images');
  console.log('2. Use the LazyBackground component for progressive loading');
}

main().catch(console.error);
