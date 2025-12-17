#!/usr/bin/env python3
"""
Populate topics on Railway via admin login and Django shell command
"""
import requests

# Railway backend URL
BASE_URL = "https://wacce-production.up.railway.app/api"

# Admin credentials
ADMIN_USERNAME = "railwayadmin"
ADMIN_PASSWORD = "Willfynn1992@"

print("=" * 70)
print("POPULATING TOPICS ON RAILWAY")
print("=" * 70)

# Step 1: Get CSRF token
print("\n1. Getting CSRF token...")
session = requests.Session()
csrf_url = f"{BASE_URL}/auth/profile/"
response = session.get(csrf_url)
csrf_token = session.cookies.get('csrftoken', '')

# Step 2: Login as admin
print("\n2. Logging in as admin...")
login_url = f"{BASE_URL}/auth/signin/"
login_data = {
    "username": ADMIN_USERNAME,
    "password": ADMIN_PASSWORD
}

headers = {
    'X-CSRFToken': csrf_token,
    'Referer': BASE_URL
}

response = session.post(login_url, json=login_data, headers=headers)

if response.status_code == 200:
    print("✅ Login successful!")
else:
    print(f"❌ Login failed: {response.status_code}")
    print(f"   Response: {response.text}")
    exit(1)

# Update CSRF token after login
csrf_token = session.cookies.get('csrftoken', csrf_token)

# Step 3: Call populate topics endpoint
print("\n3. Calling populate topics endpoint...")
populate_url = f"{BASE_URL}/students/populate-topics/"

headers = {
    'X-CSRFToken': csrf_token,
    'Referer': BASE_URL
}

response = session.post(populate_url, headers=headers)

if response.status_code == 200:
    result = response.json()
    print("✅ Topics populated successfully!")
    print(f"\n📊 Summary:")
    print(f"   Total Topics: {result['summary']['total_topics']}")
    print(f"\n📝 Output:")
    print(result['output'])
else:
    print(f"❌ Failed to populate topics: {response.status_code}")
    print(f"   Response: {response.text}")
    exit(1)

print("\n" + "=" * 70)
print("✅ DONE! Check your subject pages at https://wacefront.vercel.app")
print("=" * 70)
