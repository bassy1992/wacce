#!/bin/bash

# Railway Environment Variables Setup Script
# Run this after installing Railway CLI: npm install -g @railway/cli

echo "🚂 Setting up Railway Environment Variables for CORS Fix"
echo "=========================================================="
echo ""

# Check if railway CLI is installed
if ! command -v railway &> /dev/null
then
    echo "❌ Railway CLI not found!"
    echo "Install it with: npm install -g @railway/cli"
    exit 1
fi

echo "✅ Railway CLI found"
echo ""

# Login check
echo "Checking Railway login status..."
railway whoami &> /dev/null
if [ $? -ne 0 ]; then
    echo "Please login to Railway first:"
    railway login
fi

echo ""
echo "Setting environment variables..."
echo ""

# Set environment variables
railway variables set DEBUG=False
railway variables set DJANGO_SETTINGS_MODULE=wace_api.settings_production
railway variables set FRONTEND_URL=https://wacefront.vercel.app
railway variables set ALLOWED_ORIGINS=https://wacefront.vercel.app
railway variables set USE_HTTPS=True
railway variables set DJANGO_LOG_LEVEL=INFO

echo ""
echo "⚠️  IMPORTANT: You still need to set SECRET_KEY manually!"
echo ""
echo "Generate a secret key by running:"
echo "  python -c 'import secrets; print(secrets.token_urlsafe(50))'"
echo ""
echo "Then set it with:"
echo "  railway variables set SECRET_KEY=<your-generated-key>"
echo ""
echo "✅ Environment variables set successfully!"
echo ""
echo "Next steps:"
echo "1. Set SECRET_KEY (see above)"
echo "2. Deploy with: railway up"
echo "3. Check deployment: railway logs"
