#!/usr/bin/env python
"""
Script to run migrations on Railway for authtoken
"""
import requests
import sys

# Railway API credentials
RAILWAY_API_URL = "https://wacce-production.up.railway.app/api"
ADMIN_USERNAME = "railwayadmin"
ADMIN_PASSWORD = "Willfynn1992@"

def run_migrations():
    """Run Django migrations via Railway shell"""
    print("=" * 70)
    print("RUNNING MIGRATIONS ON RAILWAY")
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
            print(f"✅ Token received: {data['token'][:20]}...")
            # Store token for future requests
            session.headers.update({'Authorization': f"Token {data['token']}"})
    else:
        print(f"❌ Login failed: {response.status_code}")
        print(response.text)
        return
    
    print("\n" + "=" * 70)
    print("INSTRUCTIONS TO RUN MIGRATIONS:")
    print("=" * 70)
    print("\n1. Go to Railway Dashboard: https://railway.app/")
    print("2. Select your 'wacce-production' project")
    print("3. Click on your Django service")
    print("4. Go to 'Settings' tab")
    print("5. Scroll down to 'Deploy' section")
    print("6. Click 'Open Terminal' or use the Railway CLI")
    print("\n7. Run these commands:")
    print("   python manage.py makemigrations")
    print("   python manage.py migrate")
    print("\nOR use Railway CLI:")
    print("   railway run python wacebackend/manage.py migrate")
    print("\n" + "=" * 70)

if __name__ == "__main__":
    run_migrations()
