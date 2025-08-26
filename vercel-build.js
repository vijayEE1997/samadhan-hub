#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Starting Vercel build process...');

try {
  // Change to client directory
  const clientDir = path.join(__dirname, 'client-agnivirya');
  process.chdir(clientDir);
  
  console.log('📦 Installing client dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('🏗️ Building frontend...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully!');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
