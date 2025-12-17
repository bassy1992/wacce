#!/usr/bin/env python3
"""
Update English videos on Railway via API
"""
import requests

BASE_URL = "https://wacce-production.up.railway.app/api"
ADMIN_USERNAME = "railwayadmin"
ADMIN_PASSWORD = "Willfynn1992@"

print("=" * 70)
print("UPDATING ENGLISH VIDEOS ON RAILWAY")
print("=" * 70)

# Login
print("\n1. Logging in...")
session = requests.Session()
csrf_url = f"{BASE_URL}/auth/profile/"
response = session.get(csrf_url)
csrf_token = session.cookies.get('csrftoken', '')

login_url = f"{BASE_URL}/auth/signin/"
response = session.post(login_url, json={
    "username": ADMIN_USERNAME,
    "password": ADMIN_PASSWORD
}, headers={'X-CSRFToken': csrf_token, 'Referer': BASE_URL})

if response.status_code == 200:
    print("✅ Login successful!")
else:
    print(f"❌ Login failed: {response.status_code}")
    exit(1)

csrf_token = session.cookies.get('csrftoken', csrf_token)

# Update videos
print("\n2. Updating English videos...")
update_url = f"{BASE_URL}/students/update-english-videos/"
response = session.post(update_url, headers={
    'X-CSRFToken': csrf_token,
    'Referer': BASE_URL
})

if response.status_code == 200:
    result = response.json()
    print("✅ Videos updated successfully!")
    print(f"\n📝 Output:")
    print(result['output'])
else:
    print(f"❌ Failed: {response.status_code}")
    print(f"   Response: {response.text}")
    exit(1)

print("\n" + "=" * 70)
print("✅ DONE!")
print("=" * 70)
