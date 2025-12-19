#!/usr/bin/env python
"""
Script to update ALL video URLs on Railway via API
"""
import requests
import sys

# Railway API credentials
RAILWAY_API_URL = "https://wacce-production.up.railway.app/api"
ADMIN_USERNAME = "railwayadmin"
ADMIN_PASSWORD = "Willfynn1992@"

def update_all_video_urls():
    """Update all video URLs via Railway API"""
    print("=" * 70)
    print("UPDATING ALL VIDEO URLs ON RAILWAY")
    print("=" * 70)
    
    # Login first
    print("\n1. Logging in as admin...")
    login_url = f"{RAILWAY_API_URL}/auth/signin/"
    login_data = {
        "username": ADMIN_USERNAME,
        "password": ADMIN_PASSWORD
    }
    
    session = requests.Session()
    response = session.post(login_url, json=login_data)
    
    if response.status_code == 200:
        print("✅ Login successful")
        data = response.json()
        if 'token' in data:
            print("✅ Token received")
            # Store token for future requests
            session.headers.update({'Authorization': f"Token {data['token']}"})
    else:
        print(f"❌ Login failed: {response.status_code}")
        print(response.text)
        return
    
    # Update all video URLs
    print("\n2. Updating all video URLs...")
    update_url = f"{RAILWAY_API_URL}/students/update-all-video-urls/"
    
    # Get CSRF token
    csrf_response = session.get(f"{RAILWAY_API_URL}/")
    csrf_token = session.cookies.get('csrftoken', '')
    
    headers = {
        'X-CSRFToken': csrf_token,
        'Referer': RAILWAY_API_URL
    }
    
    response = session.post(update_url, headers=headers)
    
    if response.status_code == 200:
        result = response.json()
        print("\n✅ SUCCESS!")
        print("\n" + "=" * 70)
        print("OUTPUT:")
        print("=" * 70)
        print(result.get('output', ''))
        print("\n" + "=" * 70)
        print("All video URLs updated successfully on Railway!")
        print("=" * 70)
    else:
        print(f"\n❌ Failed: {response.status_code}")
        print(response.text)

if __name__ == "__main__":
    update_all_video_urls()
