#!/usr/bin/env python
"""Create superuser on Railway database from local machine"""
import os
import sys

# Railway database URL from your variables
DATABASE_URL = "postgresql://postgres:UisPBdeTEAChdrXLDyAQyqWYQhSzsjUO@shuttle.proxy.rlwy.net:40249/railway"

# Set environment variables
os.environ['DATABASE_URL'] = DATABASE_URL
os.environ['DJANGO_SETTINGS_MODULE'] = 'wace_api.settings_production'
os.environ['SECRET_KEY'] = 'BIwSwCu5bfSuQ_gs6Weo0_8GveSF-6ID_FHKfDtuLk2saJRly0Ck7kpI_XONDAdCN5c'
os.environ['DEBUG'] = 'False'
os.environ['ALLOWED_ORIGINS'] = 'https://wacefront.vercel.app'
os.environ['FRONTEND_URL'] = 'https://wacefront.vercel.app'

# Add wacebackend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'wacebackend'))

import django
django.setup()

from django.contrib.auth.models import User

# Admin credentials
USERNAME = 'railwayadmin'
EMAIL = 'admin@wace.edu.gh'
PASSWORD = 'WaceAdmin2024!'

print("=" * 60)
print("CREATING SUPERUSER ON RAILWAY DATABASE")
print("=" * 60)

try:
    # Check if user exists
    if User.objects.filter(username=USERNAME).exists():
        user = User.objects.get(username=USERNAME)
        user.is_staff = True
        user.is_superuser = True
        user.set_password(PASSWORD)
        user.save()
        print(f"\n✅ Updated user '{USERNAME}' to superuser")
    else:
        # Create new superuser
        user = User.objects.create_superuser(
            username=USERNAME,
            email=EMAIL,
            password=PASSWORD
        )
        print(f"\n✅ Created superuser '{USERNAME}'")
    
    print("\n" + "=" * 60)
    print("LOGIN CREDENTIALS")
    print("=" * 60)
    print(f"Username: {USERNAME}")
    print(f"Email: {EMAIL}")
    print(f"Password: {PASSWORD}")
    print(f"\nAdmin URL: https://wacce-production.up.railway.app/admin/")
    print("=" * 60)
    
except Exception as e:
    print(f"\n❌ Error: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
