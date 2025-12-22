#!/bin/bash
# Create superuser on Railway - Run this in Railway's shell

cd wacebackend

python manage.py shell << EOF
from django.contrib.auth.models import User

username = 'bassy'
email = 'wyarquah@gmail.com'
password = '1234bassy'

if User.objects.filter(username=username).exists():
    print(f'User {username} already exists')
else:
    User.objects.create_superuser(username, email, password)
    print(f'✅ Superuser {username} created successfully!')
EOF
