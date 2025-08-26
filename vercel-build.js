#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Starting Vercel build process...');

try {
  // Change to client directory
  const clientDir = path.join(__dirname, 'client-agnivirya');
  process.chdir(clientDir);
  
  console.log('📦 Installing client dependencies...');
  execSync('npm ci --production=false', { stdio: 'inherit' });
  
  console.log('🔧 Checking TypeScript installation...');
  try {
    execSync('npx tsc --version', { stdio: 'inherit' });
  } catch (tscError) {
    console.log('📦 Installing TypeScript globally...');
    execSync('npm install -g typescript', { stdio: 'inherit' });
  }
  
  console.log('🏗️ Building frontend...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully!');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
