#!/usr/bin/env python
"""
Create superuser on Railway via Django shell
Run this with: railway run python create_railway_superuser.py
"""
import os
import django

# Set up Django - use production settings for Railway
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wace_api.settings_production')

# Change to wacebackend directory
import sys
from pathlib import Path
backend_dir = Path(__file__).parent / 'wacebackend'
sys.path.insert(0, str(backend_dir))

django.setup()

from django.contrib.auth.models import User

print("=" * 70)
print("CREATE RAILWAY SUPERUSER")
print("=" * 70)
print()

# Get credentials
username = input("Enter username: ").strip()
email = input("Enter email: ").strip()
password = input("Enter password: ").strip()

if not all([username, email, password]):
    print("❌ All fields are required!")
    sys.exit(1)

try:
    # Check if user exists
    if User.objects.filter(username=username).exists():
        print(f"❌ User '{username}' already exists!")
        sys.exit(1)
    
    # Create superuser
    user = User.objects.create_superuser(
        username=username,
        email=email,
        password=password
    )
    
    print()
    print("✅ Superuser created successfully!")
    print(f"   Username: {username}")
    print(f"   Email: {email}")
    print()
    print("You can now login to the admin panel at:")
    print("https://wacce-production.up.railway.app/admin/")
    print()
    
except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(1)
