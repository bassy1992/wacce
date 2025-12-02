#!/bin/bash

# ExcelWASSCE Frontend Deployment Script for Vercel

echo "🚀 Deploying ExcelWASSCE Frontend to Vercel..."

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Build the project
echo "📦 Building project..."
npm run vercel-build

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "🔗 Your app should be live at the URL shown above"
echo ""
echo "📝 Don't forget to:"
echo "   1. Set environment variables in Vercel dashboard"
echo "   2. Update VITE_API_URL to your backend URL"
echo "   3. Configure CORS on your backend for the new domain"