#!/usr/bin/env python
"""
Create superuser on Railway via API
"""
import requests

RAILWAY_URL = "https://wacce-production.up.railway.app"

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
    exit(1)

# Create user via signup endpoint
signup_url = f"{RAILWAY_URL}/api/auth/signup/"
signup_data = {
    "username": username,
    "email": email,
    "password": password,
    "first_name": "Admin",
    "last_name": "User",
    "phone_number": "+233000000000",
    "date_of_birth": "1990-01-01",
    "programme_id": 1,
    "previous_school": "N/A",
    "wassce_year": 2024,
    "index_number": "ADMIN001"
}

print()
print(f"Creating user on Railway: {username}")
print()

try:
    response = requests.post(signup_url, json=signup_data, timeout=30)
    
    if response.status_code == 201:
        print("✅ User created successfully!")
        print()
        print("=" * 70)
        print("IMPORTANT: Make user admin via Railway shell")
        print("=" * 70)
        print()
        print("Run this command:")
        print(f"  railway run python manage.py shell")
        print()
        print("Then paste this:")
        print(f"  from django.contrib.auth.models import User")
        print(f"  user = User.objects.get(username='{username}')")
        print(f"  user.is_staff = True")
        print(f"  user.is_superuser = True")
        print(f"  user.save()")
        print(f"  print('✅ {username} is now admin!')")
        print()
    else:
        print(f"❌ Error: {response.status_code}")
        print(response.text)
        
except Exception as e:
    print(f"❌ Error: {e}")
