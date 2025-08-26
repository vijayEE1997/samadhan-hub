@echo off
echo 🚀 Samadhan Hub - Agnivirya Wellness Platform - Mode Selection
echo.
echo 📋 Available Modes:
echo 1. Development (dev/local/sandbox)
echo 2. Production (prod/vercel)
echo.
set /p choice="Select mode (1 or 2): "

if "%choice%"=="1" (
    echo.
    echo 🔧 Starting in DEVELOPMENT mode...
    echo.
    echo 📦 Installing dependencies...
    call npm run install:all
    echo.
    echo 🔥 Starting development servers...
    echo Frontend: http://localhost:3000
    echo Backend:  http://localhost:5000
    echo Config:   http://localhost:5000/api/config
    echo.
    call npm run dev
) else if "%choice%"=="2" (
    echo.
    echo 🚀 Starting in PRODUCTION mode...
    echo.
    echo 📦 Installing dependencies...
    call npm run install:all
    echo.
    echo 🔨 Building for production...
    call npm run prod:build
    echo.
    echo 🚀 Starting production server...
    call npm run prod
) else (
    echo.
    echo ❌ Invalid choice. Please select 1 or 2.
    echo.
    pause
    exit /b 1
)

pause
