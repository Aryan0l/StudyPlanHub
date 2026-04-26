# Quick Start Script for StudyPlan Hub (Windows PowerShell)
# Run with: powershell -ExecutionPolicy Bypass -File quick-start.ps1

Write-Host "🚀 StudyPlan Hub - Quick Start" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Backend Setup
Write-Host "📦 Setting up Backend..." -ForegroundColor Cyan
Write-Host "------------------------" -ForegroundColor Cyan

Push-Location "server"
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "✅ Dependencies already installed" -ForegroundColor Green
}

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host ""
    Write-Host "⚠️  .env file not found" -ForegroundColor Yellow
    Write-Host "📝 Creating .env from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host ""
    Write-Host "⚠️  IMPORTANT: Edit server\.env and update:" -ForegroundColor Yellow
    Write-Host "   - DATABASE_URL (your Neon PostgreSQL connection string)" -ForegroundColor Yellow
    Write-Host "   - JWT_ACCESS_SECRET" -ForegroundColor Yellow
    Write-Host "   - JWT_REFRESH_SECRET" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host "✅ .env file found" -ForegroundColor Green
}

Pop-Location
Write-Host "✅ Backend setup complete!" -ForegroundColor Green
Write-Host ""

# Frontend Setup
Write-Host "🎨 Setting up Frontend..." -ForegroundColor Cyan
Write-Host "------------------------" -ForegroundColor Cyan

Push-Location "client"
if (-not (Test-Path "package.json")) {
    Write-Host "❌ package.json not found in client folder" -ForegroundColor Red
    Pop-Location
    exit 1
}

Write-Host "✅ Frontend dependencies configured" -ForegroundColor Green
Pop-Location
Write-Host ""

Write-Host "==============================" -ForegroundColor Cyan
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host "==============================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 To start the application:" -ForegroundColor Cyan
Write-Host ""
Write-Host "Terminal 1 - Start Backend:" -ForegroundColor Yellow
Write-Host "  cd server" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Terminal 2 - Start Frontend:" -ForegroundColor Yellow
Write-Host "  cd client" -ForegroundColor White
Write-Host "  npm start" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Open browser to: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "📖 Read README.md for detailed setup instructions" -ForegroundColor Cyan
