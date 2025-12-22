#!/usr/bin/env python
"""
Create admin user via signup API, then manually promote to superuser via Railway shell
"""
import requests

RAILWAY_URL = "https://wacce-production.up.railway.app"

print("=" * 70)
print("STEP 1: Create User via API")
print("=" * 70)

# Create user via signup
signup_data = {
    "username": "bassy",
    "email": "wyarquah@gmail.com",
    "password": "1234bassy",
    "first_name": "Bassy",
    "last_name": "Admin",
    "phone_number": "+233000000000",
    "date_of_birth": "1990-01-01",
    "programme_id": 1,
    "previous_school": "Admin",
    "wassce_year": 2024,
    "index_number": "ADMIN001"
}

try:
    response = requests.post(f"{RAILWAY_URL}/api/auth/signup/", json=signup_data, timeout=30)
    
    if response.status_code == 201:
        print("✅ User 'bassy' created successfully!")
    elif response.status_code == 400 and "username" in response.text:
        print("⚠️  User 'bassy' already exists")
    else:
        print(f"❌ Error: {response.status_code}")
        print(response.text)
        exit(1)
        
except Exception as e:
    print(f"❌ Error: {e}")
    exit(1)

print()
print("=" * 70)
print("STEP 2: Promote to Superuser via Railway Shell")
print("=" * 70)
print()
print("Now go to Railway Dashboard and run this in the shell:")
print()
print("  python wacebackend/manage.py shell")
print()
print("Then paste this:")
print()
print("  from django.contrib.auth.models import User")
print("  user = User.objects.get(username='bassy')")
print("  user.is_staff = True")
print("  user.is_superuser = True")
print("  user.save()")
print("  print('✅ bassy is now a superuser!')")
print("  exit()")
print()
print("=" * 70)
