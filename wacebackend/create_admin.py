#!/usr/bin/env python
"""Simple script to create admin user - run this on Railway"""
import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wace_api.settings')
django.setup()

from django.contrib.auth.models import User

# Admin credentials
USERNAME = 'railwayadmin'
EMAIL = 'admin@wace.edu.gh'
PASSWORD = 'SecurePass2024!'

try:
    # Check if user exists
    if User.objects.filter(username=USERNAME).exists():
        user = User.objects.get(username=USERNAME)
        user.is_staff = True
        user.is_superuser = True
        user.set_password(PASSWORD)
        user.save()
        print(f"✅ Updated user '{USERNAME}' to superuser")
    else:
        # Create new superuser
        User.objects.create_superuser(
            username=USERNAME,
            email=EMAIL,
            password=PASSWORD
        )
        print(f"✅ Created superuser '{USERNAME}'")
    
    print(f"\nLogin credentials:")
    print(f"Username: {USERNAME}")
    print(f"Password: {PASSWORD}")
    print(f"\nAdmin URL: https://your-backend-url.railway.app/admin/")
    
except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(1)
