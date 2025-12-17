#!/usr/bin/env python3
"""
Simple script to populate subjects via API endpoint
Edit the variables below before running
"""
import requests
import sys

# ============================================
# EDIT THESE VALUES:
# ============================================
RAILWAY_URL = "https://wacce-production.up.railway.app"
ADMIN_USERNAME = "admin"  # Change this to your admin username
ADMIN_PASSWORD = "your_password"  # Change this to your admin password
# ============================================

print("🚂 Populating Subjects on Railway")
print("=" * 70)
print(f"Railway URL: {RAILWAY_URL}")
print(f"Admin User: {ADMIN_USERNAME}")
print("=" * 70)

# Remove trailing slash
RAILWAY_URL = RAILWAY_URL.rstrip('/')

print("\n🔐 Logging in...")

# Login to get session
session = requests.Session()
login_url = f"{RAILWAY_URL}/api/auth/signin/"

try:
    login_response = session.post(login_url, json={
        'username': ADMIN_USERNAME,
        'password': ADMIN_PASSWORD
    })
    
    if login_response.status_code != 200:
        print(f"❌ Login failed: {login_response.text}")
        print("\nPlease check your admin credentials in the script.")
        sys.exit(1)
    
    user_data = login_response.json()
    if not user_data.get('user', {}).get('is_staff'):
        print("❌ User is not an admin!")
        print("\nThe user must have admin/staff privileges.")
        sys.exit(1)
    
    print("✅ Logged in successfully!")
    
except Exception as e:
    print(f"❌ Login error: {e}")
    print("\nMake sure:")
    print("1. Railway app is deployed and running")
    print("2. Admin credentials are correct")
    print("3. You have internet connection")
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
        print("\n🎉 You can now refresh the dashboard to see the subjects.")
    else:
        print(f"❌ Failed: {response.status_code}")
        print(response.text)
        sys.exit(1)
        
except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(1)
