#!/usr/bin/env python
"""
Create admin user on Railway via API and then promote to superuser
"""
import requests
import json

RAILWAY_URL = "https://wacce-production.up.railway.app"

print("=" * 70)
print("CREATE RAILWAY ADMIN USER")
print("=" * 70)
print()

# Step 1: Create a regular user via signup
print("Step 1: Creating user account...")
print()

username = input("Enter username (e.g., railwayadmin): ").strip() or "railwayadmin"
email = input("Enter email: ").strip() or "admin@excelwassce.com"
password = input("Enter password: ").strip() or "Admin123!"

signup_data = {
    "username": username,
    "email": email,
    "password": password,
    "first_name": "Railway",
    "last_name": "Admin",
    "phone_number": "+233000000000",
    "date_of_birth": "1990-01-01",
    "programme_id": 1,
    "previous_school": "N/A",
    "wassce_year": 2024,
    "index_number": "ADMIN001"
}

try:
    response = requests.post(
        f"{RAILWAY_URL}/api/auth/signup/",
        json=signup_data,
        timeout=30
    )
    
    if response.status_code == 201:
        print(f"✅ User '{username}' created successfully!")
    elif response.status_code == 400:
        print(f"⚠️  User might already exist. Trying to login...")
    else:
        print(f"❌ Error creating user: {response.status_code}")
        print(response.text)
        exit(1)
        
except Exception as e:
    print(f"❌ Error: {e}")
    exit(1)

print()
print("=" * 70)
print("NEXT STEP: Make user admin via Railway CLI")
print("=" * 70)
print()
print("Run these commands in your terminal:")
print()
print("1. Connect to Railway:")
print("   railway link")
print()
print("2. Open Railway shell:")
print("   railway shell")
print()
print("3. Inside the shell, run:")
print(f"   python manage.py shell")
print()
print("4. Then paste this Python code:")
print()
print(f"   from django.contrib.auth.models import User")
print(f"   user = User.objects.get(username='{username}')")
print(f"   user.is_staff = True")
print(f"   user.is_superuser = True")
print(f"   user.save()")
print(f"   print('✅ {username} is now a superuser!')")
print(f"   exit()")
print()
print("=" * 70)
print()
print("After that, you can login at:")
print(f"  URL: {RAILWAY_URL}/admin/")
print(f"  Username: {username}")
print(f"  Password: {password}")
print()
