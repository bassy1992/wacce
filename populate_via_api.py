#!/usr/bin/env python3
"""
Script to populate subjects via API endpoint
This works by calling the Railway-hosted API endpoint
"""
import requests
import sys

# Your Railway app URL
RAILWAY_URL = input("Enter your Railway app URL (e.g., https://your-app.railway.app): ").strip()
if not RAILWAY_URL:
    print("❌ Railway URL is required!")
    sys.exit(1)

# Remove trailing slash
RAILWAY_URL = RAILWAY_URL.rstrip('/')

# Admin credentials
print("\nEnter admin credentials:")
username = input("Admin username: ").strip()
password = input("Admin password: ").strip()

if not username or not password:
    print("❌ Username and password are required!")
    sys.exit(1)

print("\n🔐 Logging in...")

# Login to get session
session = requests.Session()
login_url = f"{RAILWAY_URL}/api/auth/signin/"

try:
    login_response = session.post(login_url, json={
        'username': username,
        'password': password
    })
    
    if login_response.status_code != 200:
        print(f"❌ Login failed: {login_response.text}")
        sys.exit(1)
    
    user_data = login_response.json()
    if not user_data.get('user', {}).get('is_staff'):
        print("❌ User is not an admin!")
        sys.exit(1)
    
    print("✅ Logged in successfully!")
    
except Exception as e:
    print(f"❌ Login error: {e}")
    sys.exit(1)

print("\n📚 Populating subjects...")

# Call populate endpoint
populate_url = f"{RAILWAY_URL}/api/students/populate-subjects/"

try:
    response = session.post(populate_url)
    
    if response.status_code == 200:
        data = response.json()
        print("\n✅ SUCCESS!")
        print("\n" + "=" * 70)
        print(data.get('output', ''))
        print("=" * 70)
        print("\n📊 Summary:")
        summary = data.get('summary', {})
        print(f"   Total Subjects: {summary.get('total_subjects', 0)}")
        print(f"   Core Subjects: {summary.get('core_subjects', 0)}")
        print(f"   Elective Subjects: {summary.get('elective_subjects', 0)}")
        print(f"   Programme-Subject Links: {summary.get('programme_subject_links', 0)}")
        print("\n✅ Subjects populated successfully!")
        print("\nYou can now refresh the dashboard to see the subjects.")
    else:
        print(f"❌ Failed: {response.status_code}")
        print(response.text)
        sys.exit(1)
        
except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(1)
