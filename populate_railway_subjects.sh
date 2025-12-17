#!/bin/bash
# Script to populate subjects on Railway deployment

echo "🚂 Populating Subjects on Railway"
echo "==================================="
echo ""

# Check if railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found!"
    echo "Install it with: npm install -g @railway/cli"
    exit 1
fi

echo "✅ Railway CLI found"
echo ""

# Check login
echo "Checking Railway login status..."
if ! railway whoami &> /dev/null; then
    echo "Please login to Railway first:"
    railway login
    exit 1
fi

echo ""
echo "📚 Running populate_subjects.py on Railway..."
echo ""

railway run python wacebackend/populate_subjects.py

echo ""
echo "✅ Done! Check the output above to verify subjects were created."
echo ""
