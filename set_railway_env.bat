@echo off
REM Railway Environment Variables Setup Script for Windows
REM Run this after installing Railway CLI: npm install -g @railway/cli

echo 🚂 Setting up Railway Environment Variables for CORS Fix
echo ==========================================================
echo.

REM Check if railway CLI is installed
where railway >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Railway CLI not found!
    echo Install it with: npm install -g @railway/cli
    exit /b 1
)

echo ✅ Railway CLI found
echo.

REM Login check
echo Checking Railway login status...
railway whoami >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Please login to Railway first:
    railway login
)

echo.
echo Setting environment variables...
echo.

REM Set environment variables
call railway variables set DEBUG=False
call railway variables set DJANGO_SETTINGS_MODULE=wace_api.settings_production
call railway variables set FRONTEND_URL=https://wacefront.vercel.app
call railway variables set ALLOWED_ORIGINS=https://wacefront.vercel.app
call railway variables set USE_HTTPS=True
call railway variables set DJANGO_LOG_LEVEL=INFO

echo.
echo ⚠️  IMPORTANT: You still need to set SECRET_KEY manually!
echo.
echo Generate a secret key by running:
echo   python -c "import secrets; print(secrets.token_urlsafe(50))"
echo.
echo Then set it with:
echo   railway variables set SECRET_KEY=^<your-generated-key^>
echo.
echo ✅ Environment variables set successfully!
echo.
echo Next steps:
echo 1. Set SECRET_KEY (see above)
echo 2. Deploy with: railway up
echo 3. Check deployment: railway logs
echo.
pause
