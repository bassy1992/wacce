@echo off
echo ============================================================
echo CREATE RAILWAY SUPERUSER
echo ============================================================
echo.

railway run python wacebackend/manage.py shell -c "from django.contrib.auth.models import User; user, created = User.objects.get_or_create(username='railwayadmin', defaults={'email': 'admin@excelwassce.com', 'is_staff': True, 'is_superuser': True}); user.set_password('Admin123!'); user.is_staff = True; user.is_superuser = True; user.save(); print('✅ Superuser created!' if created else '✅ Superuser updated!'); print('Username: railwayadmin'); print('Password: Admin123!'); print('Login at: https://wacce-production.up.railway.app/admin/')"

echo.
echo ============================================================
echo DONE!
echo ============================================================
pause
