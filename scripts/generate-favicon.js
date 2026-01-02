const sharp = require('sharp');
const toIco = require('to-ico');
const fs = require('fs');
const path = require('path');

async function generateFavicon() {
  try {
    // Create a combined SVG from both rectangles
    const combinedSvg = `
      <svg width="32" height="32" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.6273 2.95529L2.95532 0L3.36383e-05 17.672L17.672 20.6273C19.2553 21.2155 20.5353 23.0718 20.8465 24.3978L27.2111 20.6273C26.4466 18.8786 23.7149 14.9569 18.9041 13.2597L20.6273 2.95529Z" fill="black"/>
        <path d="M6.58386 2.95529L24.2559 0L27.2111 17.672L9.53915 20.6273C7.95586 21.2155 6.67592 23.0718 6.3647 24.3978L5.40477e-05 20.6273C0.764575 18.8786 3.49631 14.9569 8.30706 13.2597L6.58386 2.95529Z" fill="black"/>
      </svg>
    `;
    
    // Convert to PNG in multiple sizes for ICO
    const sizes = [16, 32, 48];
    const pngBuffers = await Promise.all(
      sizes.map(size => 
        sharp(Buffer.from(combinedSvg))
          .resize(size, size, { 
            fit: 'contain', 
            background: { r: 255, g: 255, b: 255, alpha: 1 } 
          })
          .png()
          .toBuffer()
      )
    );
    
    // Create ICO file from multiple PNG sizes
    const icoBuffer = await toIco(pngBuffers);
    
    // Save as favicon.ico
    fs.writeFileSync(
      path.join(__dirname, '../app/favicon.ico'),
      icoBuffer
    );
    
    console.log('✅ Favicon generated successfully at app/favicon.ico');
  } catch (error) {
    console.error('Error generating favicon:', error);
    process.exit(1);
  }
}

generateFavicon();

