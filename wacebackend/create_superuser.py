#!/usr/bin/env python
"""Create a superuser for Railway deployment"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wace_api.settings')
django.setup()

from django.contrib.auth.models import User

# Superuser credentials
USERNAME = 'admin'
EMAIL = 'admin@wace.edu.gh'
PASSWORD = 'WaceAdmin2024!'  # Change this to a secure password

print("=" * 60)
print("CREATING SUPERUSER FOR RAILWAY")
print("=" * 60)

# Check if user already exists
if User.objects.filter(username=USERNAME).exists():
    print(f"\n⚠️  User '{USERNAME}' already exists!")
    user = User.objects.get(username=USERNAME)
    print(f"   Email: {user.email}")
    print(f"   Is Staff: {user.is_staff}")
    print(f"   Is Superuser: {user.is_superuser}")
    
    # Update to superuser if not already
    if not user.is_superuser or not user.is_staff:
        user.is_staff = True
        user.is_superuser = True
        user.set_password(PASSWORD)
        user.save()
        print("\n✅ Updated existing user to superuser!")
    else:
        print("\n✅ User is already a superuser!")
else:
    # Create new superuser
    user = User.objects.create_superuser(
        username=USERNAME,
        email=EMAIL,
        password=PASSWORD
    )
    print(f"\n✅ Superuser created successfully!")

print("\n" + "=" * 60)
print("SUPERUSER CREDENTIALS")
print("=" * 60)
print(f"Username: {USERNAME}")
print(f"Email: {EMAIL}")
print(f"Password: {PASSWORD}")
print("\n⚠️  IMPORTANT: Change the password after first login!")
print("=" * 60)
