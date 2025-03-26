const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);

// Function to get all HTML files in a directory (recursive)
async function getAllHTMLFiles(dir) {
  const files = await readdir(dir);
  const htmlFiles = [];
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = await stat(filePath);
    
    if (stats.isDirectory()) {
      const subDirFiles = await getAllHTMLFiles(filePath);
      htmlFiles.push(...subDirFiles);
    } else if (file.endsWith('.html')) {
      htmlFiles.push(filePath);
    }
  }
  
  return htmlFiles;
}

// Function to update the Tailwind config in HTML files
async function updateTailwindConfig(htmlFilePath) {
  try {
    let content = await readFile(htmlFilePath, 'utf8');
    
    // Check if the file contains a Tailwind config with fontFamily
    if (content.includes('fontFamily: {') && content.includes('sans: [')) {
      // Check if Raleway is already present
      if (!content.includes('raleway: [')) {
        // Replace the fontFamily configuration
        content = content.replace(
          /fontFamily: {\s*sans: \[\s*'Arial',\s*'sans-serif'\s*\],\s*},/g,
          `fontFamily: {
          sans: ['Arial', 'sans-serif'],
          raleway: ['Raleway', 'sans-serif'],
        },`
        );
      }
    }
    
    // Add Google Fonts link if it doesn't exist
    if (!content.includes('fonts.googleapis.com')) {
      // Find the first <link or <script tag
      const linkIndex = content.indexOf('<link');
      const scriptIndex = content.indexOf('<script');
      
      let insertIndex;
      if (linkIndex >= 0 && (scriptIndex < 0 || linkIndex < scriptIndex)) {
        insertIndex = linkIndex;
      } else if (scriptIndex >= 0) {
        insertIndex = scriptIndex;
      } else {
        // If no link or script tags are found, just add to the beginning
        insertIndex = 0;
      }
      
      // Add Google Fonts link
      const googleFontLink = '<link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap" rel="stylesheet">\n';
      content = content.slice(0, insertIndex) + googleFontLink + content.slice(insertIndex);
    }
    
    // Write the modified content back to the file
    await writeFile(htmlFilePath, content, 'utf8');
    console.log(`Updated ${htmlFilePath}`);
  } catch (error) {
    console.error(`Error updating ${htmlFilePath}:`, error);
  }
}

// Main function
async function main() {
  try {
    const rootDir = process.cwd();
    const htmlFiles = await getAllHTMLFiles(rootDir);
    
    console.log(`Found ${htmlFiles.length} HTML files to process`);
    
    for (const file of htmlFiles) {
      await updateTailwindConfig(file);
    }
    
    console.log('All HTML files have been updated!');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
