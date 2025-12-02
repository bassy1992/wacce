#!/bin/bash

# ExcelWASSCE Backend Deployment Script for Railway

echo "🚂 Deploying ExcelWASSCE Backend to Railway..."

# Check if railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

# Login to Railway (if not already logged in)
echo "🔐 Checking Railway authentication..."
railway whoami || railway login

# Deploy to Railway
echo "🚀 Deploying to Railway..."
railway up

echo "✅ Deployment initiated!"
echo "🔗 Check your Railway dashboard for deployment status"
echo ""
echo "📝 Next steps:"
echo "   1. Set environment variables in Railway dashboard"
echo "   2. Add PostgreSQL database service"
echo "   3. Update frontend VITE_API_URL to your Railway URL"
echo "   4. Create superuser: railway run python manage.py createsuperuser"