@echo off
REM Script to populate subjects on Railway deployment
echo 🚂 Populating Subjects on Railway
echo ===================================
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

REM Check login
echo Checking Railway login status...
railway whoami >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Please login to Railway first:
    railway login
    exit /b 1
)

echo.
echo 📚 Running populate_subjects.py on Railway...
echo.

railway run python wacebackend/populate_subjects.py

echo.
echo ✅ Done! Check the output above to verify subjects were created.
echo.
pause
