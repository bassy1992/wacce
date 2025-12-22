@echo off
echo ============================================================
echo VIDEO PROTECTION SETUP - Railway Environment Variables
echo ============================================================
echo.
echo This script will help you set up environment variables for
echo video protection using DigitalOcean Spaces signed URLs.
echo.
echo You'll need:
echo 1. DigitalOcean Spaces Access Key
echo 2. DigitalOcean Spaces Secret Key
echo 3. Railway CLI installed (railway.app/cli)
echo.
echo ============================================================
echo.

set /p ACCESS_KEY="Enter your DO Spaces Access Key: "
set /p SECRET_KEY="Enter your DO Spaces Secret Key: "

echo.
echo Setting environment variables on Railway...
echo.

railway variables set DO_SPACES_ACCESS_KEY=%ACCESS_KEY%
railway variables set DO_SPACES_SECRET_KEY=%SECRET_KEY%
railway variables set DO_SPACES_REGION=sfo3
railway variables set DO_SPACES_BUCKET=tailsandtrailsmedia

echo.
echo ============================================================
echo Environment variables set successfully!
echo ============================================================
echo.
echo Next steps:
echo 1. Deploy your changes: git push
echo 2. Railway will automatically redeploy
echo 3. Test video playback after deployment
echo.
echo See VIDEO_PROTECTION_SETUP.md for detailed instructions.
echo ============================================================
pause
