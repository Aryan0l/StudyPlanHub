#!/bin/bash
# Quick Start Script for StudyPlan Hub
# Run this script to get started quickly

echo "🚀 StudyPlan Hub - Quick Start"
echo "=============================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Backend Setup
echo "📦 Setting up Backend..."
echo "------------------------"
cd server 2>/dev/null || { echo "❌ Cannot find server folder"; exit 1; }

if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo ""
    echo "⚠️  .env file not found"
    echo "📝 Creating .env from .env.example..."
    cp .env.example .env
    echo ""
    echo "⚠️  IMPORTANT: Edit server/.env and update:"
    echo "   - DATABASE_URL (your Neon PostgreSQL connection string)"
    echo "   - JWT_ACCESS_SECRET"
    echo "   - JWT_REFRESH_SECRET"
    echo ""
else
    echo "✅ .env file found"
fi

echo ""
echo "✅ Backend setup complete!"
echo ""

# Frontend Setup
echo "🎨 Setting up Frontend..."
echo "------------------------"
cd ../client 2>/dev/null || { echo "❌ Cannot find client folder"; exit 1; }

if [ ! -f "package.json" ]; then
    echo "❌ package.json not found in client folder"
    exit 1
fi

echo "✅ Frontend dependencies configured"
echo ""

echo "=============================="
echo "✅ Setup Complete!"
echo "=============================="
echo ""
echo "🚀 To start the application:"
echo ""
echo "Terminal 1 - Start Backend:"
echo "  cd server"
echo "  npm run dev"
echo ""
echo "Terminal 2 - Start Frontend:"
echo "  cd client"
echo "  npm start"
echo ""
echo "🌐 Open browser to: http://localhost:3000"
echo ""
echo "📖 Read README.md for detailed setup instructions"
