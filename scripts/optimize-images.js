#!/usr/bin/env node

/**
 * Image Optimization Script for Bell & Barks
 * Converts images to modern formats and creates responsive variants
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const WEBP_DIR = path.join(IMAGES_DIR, 'webp');
const RESPONSIVE_DIR = path.join(IMAGES_DIR, 'responsive');

// Ensure output directories exist
if (!fs.existsSync(WEBP_DIR)) {
  fs.mkdirSync(WEBP_DIR, { recursive: true });
}

if (!fs.existsSync(RESPONSIVE_DIR)) {
  fs.mkdirSync(RESPONSIVE_DIR, { recursive: true });
}

// Image optimization settings
const QUALITY = 85;
const RESPONSIVE_SIZES = [400, 800, 1200, 1600];

// Get all image files
const imageFiles = fs.readdirSync(IMAGES_DIR)
  .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
  .filter(file => !file.includes('webp'));

console.log(`🖼️  Found ${imageFiles.length} images to optimize...`);

// Function to convert to WebP
function convertToWebP(inputFile) {
  const baseName = path.parse(inputFile).name;
  const webpFile = path.join(WEBP_DIR, `${baseName}.webp`);
  const inputPath = path.join(IMAGES_DIR, inputFile);
  
  try {
    console.log(`📸 Converting ${inputFile} to WebP...`);
    execSync(`npx imagemin ${inputPath} --out-dir=${WEBP_DIR} --plugin=webp={quality:${QUALITY}}`, { stdio: 'inherit' });
    console.log(`✅ Created ${baseName}.webp`);
  } catch (error) {
    console.error(`❌ Failed to convert ${inputFile}:`, error.message);
  }
}

// Function to create responsive variants
function createResponsiveVariants(inputFile) {
  const baseName = path.parse(inputFile).name;
  const extension = path.parse(inputFile).ext.toLowerCase();
  const inputPath = path.join(IMAGES_DIR, inputFile);
  
  RESPONSIVE_SIZES.forEach(size => {
    try {
      console.log(`📐 Creating ${size}px variant of ${inputFile}...`);
      const outputPath = path.join(RESPONSIVE_DIR, `${baseName}-${size}w${extension}`);
      execSync(`npx sharp resize ${size} --input ${inputPath} --output ${outputPath}`, { stdio: 'inherit' });
      
      // Also create WebP variant
      const webpOutput = path.join(RESPONSIVE_DIR, `${baseName}-${size}w.webp`);
      execSync(`npx sharp resize ${size} --format webp --quality ${QUALITY} --input ${inputPath} --output ${webpOutput}`, { stdio: 'inherit' });
      
      console.log(`✅ Created responsive variants for ${size}px`);
    } catch (error) {
      console.error(`❌ Failed to create responsive variant for ${inputFile} at ${size}px:`, error.message);
    }
  });
}

// Function to optimize existing images
function optimizeOriginal(inputFile) {
  const inputPath = path.join(IMAGES_DIR, inputFile);
  const tempPath = path.join(IMAGES_DIR, `temp_${inputFile}`);
  
  try {
    console.log(`🔧 Optimizing original ${inputFile}...`);
    execSync(`npx imagemin ${inputPath} --out-dir=${path.dirname(tempPath)} --plugin=mozjpeg={quality:${QUALITY}} --plugin=pngquant={quality:[0.6,0.8]}`, { stdio: 'inherit' });
    
    // Replace original with optimized version
    if (fs.existsSync(tempPath)) {
      fs.renameSync(tempPath, inputPath);
      console.log(`✅ Optimized ${inputFile}`);
    }
  } catch (error) {
    console.error(`❌ Failed to optimize ${inputFile}:`, error.message);
  }
}

// Main optimization process
async function optimizeImages() {
  console.log('🚀 Starting image optimization process...\n');
  
  for (const file of imageFiles) {
    console.log(`\n📋 Processing ${file}...`);
    
    // 1. Optimize original
    optimizeOriginal(file);
    
    // 2. Convert to WebP
    convertToWebP(file);
    
    // 3. Create responsive variants
    createResponsiveVariants(file);
    
    console.log(`✨ Completed processing ${file}\n`);
  }
  
  // Generate usage instructions
  generateUsageInstructions();
  
  console.log('🎉 Image optimization completed!');
  console.log('📊 Summary:');
  console.log(`   • Processed ${imageFiles.length} images`);
  console.log(`   • Created WebP variants in ${WEBP_DIR}`);
  console.log(`   • Created ${RESPONSIVE_SIZES.length} responsive sizes for each image`);
  console.log(`   • Check RESPONSIVE_IMAGES.md for usage instructions`);
}

// Generate usage instructions
function generateUsageInstructions() {
  const instructions = `# Responsive Images Usage Guide

## Generated Image Variants

For each original image, the following variants have been created:

### WebP Formats (in /images/webp/)
- Original size WebP versions for better compression

### Responsive Variants (in /images/responsive/)
- 400px width variants (mobile)
- 800px width variants (tablet)
- 1200px width variants (desktop)
- 1600px width variants (large desktop)

## Usage in OptimizedImage Component

\`\`\`jsx
<OptimizedImage
  src="/images/hero-img.png"
  alt="Hero image"
  width={1200}
  height={800}
  srcSet={{
    mobile: "/images/responsive/hero-img-400w.webp",
    tablet: "/images/responsive/hero-img-800w.webp",
    desktop: "/images/responsive/hero-img-1200w.webp",
    large: "/images/responsive/hero-img-1600w.webp"
  }}
/>
\`\`\`

## Performance Benefits

- **WebP Format**: 25-35% smaller file sizes
- **Responsive Images**: Serve appropriate sizes for each device
- **Optimized Compression**: Reduced file sizes without quality loss

## Image Files Processed

${imageFiles.map(file => `- ${file}`).join('\n')}

Generated on: ${new Date().toISOString()}
`;

  fs.writeFileSync(path.join(__dirname, '..', 'RESPONSIVE_IMAGES.md'), instructions);
}

// Install required packages if not present
function checkDependencies() {
  const requiredPackages = ['imagemin', 'imagemin-webp', 'imagemin-mozjpeg', 'imagemin-pngquant', 'sharp-cli'];
  
  console.log('📦 Checking dependencies...');
  
  try {
    requiredPackages.forEach(pkg => {
      execSync(`npm list ${pkg}`, { stdio: 'ignore' });
    });
    console.log('✅ All dependencies are installed');
  } catch (error) {
    console.log('📥 Installing required packages...');
    execSync(`npm install --save-dev ${requiredPackages.join(' ')}`, { stdio: 'inherit' });
  }
}

// Run the optimization
if (require.main === module) {
  checkDependencies();
  optimizeImages().catch(console.error);
}

module.exports = { optimizeImages, convertToWebP, createResponsiveVariants };
