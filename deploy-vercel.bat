@echo off
echo 🚀 Deploying Samadhan Hub - Agnivirya Wellness Platform to Vercel...
echo.

echo 📦 Building for production...
call npm run vercel-build
if %errorlevel% neq 0 (
    echo ❌ Build failed! Please check the errors above.
    pause
    exit /b 1
)

echo.
echo 🔥 Deploying to Vercel...
echo.
echo 📋 Instructions:
echo 1. Make sure you have Vercel CLI installed: npm i -g vercel
echo 2. Run: vercel
echo 3. Follow the prompts to deploy
echo.
echo 💡 Or deploy via Vercel Dashboard:
echo - Push your code to GitHub
echo - Go to vercel.com
echo - Import your repository
echo - Build Command: npm run vercel-build
echo - Output Directory: client-agnivirya/dist
echo - Install Command: npm run install:all
echo.

echo 🎯 Ready to deploy! Choose your method above.
pause
