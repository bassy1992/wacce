@echo off
echo ============================================================
echo FIX RAILWAY CONNECTION
echo ============================================================
echo.
echo Step 1: Link Railway CLI to your project
echo.
railway link
echo.
echo Step 2: Test connection
echo.
railway status
echo.
echo ============================================================
echo If successful, you can now run:
echo   railway run python wacebackend/manage.py createsuperuser
echo ============================================================
pause
