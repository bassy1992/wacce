#!/bin/bash
# Create superuser on Railway

echo "Creating superuser on Railway..."
echo ""

railway run bash -c "cd wacebackend && python manage.py shell << 'EOF'
from django.contrib.auth.models import User

# Try to get or create the user
username = 'railwayadmin'
email = 'admin@excelwassce.com'
password = 'Admin123!'

try:
    user = User.objects.get(username=username)
    print(f'User {username} already exists. Updating...')
except User.DoesNotExist:
    user = User.objects.create_user(username=username, email=email, password=password)
    print(f'User {username} created.')

# Make superuser
user.is_staff = True
user.is_superuser = True
user.set_password(password)
user.save()

print('✅ Superuser created/updated successfully!')
print(f'Username: {username}')
print(f'Password: {password}')
print(f'Login at: https://wacce-production.up.railway.app/admin/')
EOF
"
