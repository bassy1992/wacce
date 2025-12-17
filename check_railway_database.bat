@echo off
REM Script to check Railway database status
echo 🔍 Checking Railway Database Status
echo =====================================
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

echo 📊 Checking database contents...
echo.

echo --- Subjects Count ---
railway run python wacebackend/manage.py shell -c "from courses.models import Subject; print(f'Total Subjects: {Subject.objects.count()}'); print(f'Core Subjects: {Subject.objects.filter(subject_type=\"core\").count()}'); print(f'Elective Subjects: {Subject.objects.filter(subject_type=\"elective\").count()}')"

echo.
echo --- Programme-Subject Links ---
railway run python wacebackend/manage.py shell -c "from courses.models import ProgrammeSubject; print(f'Total Links: {ProgrammeSubject.objects.count()}')"

echo.
echo --- Programmes and Their Subjects ---
railway run python wacebackend/manage.py shell -c "from students.models import Programme; from courses.models import ProgrammeSubject; [print(f'{p.get_name_display()}: {ProgrammeSubject.objects.filter(programme=p).count()} subjects') for p in Programme.objects.all()]"

echo.
echo --- Students ---
railway run python wacebackend/manage.py shell -c "from students.models import Student; print(f'Total Students: {Student.objects.count()}'); [print(f'  - {s.user.username} ({s.user.get_full_name()}): {s.programme.get_name_display()}') for s in Student.objects.all()]"

echo.
echo ✅ Database check complete!
echo.
pause
