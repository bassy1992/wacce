@echo off
REM Create superuser on Railway (Windows)

echo Creating superuser on Railway...
cd wacebackend
python create_superuser.py
pause
