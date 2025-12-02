#!/usr/bin/env python3
"""
Test script for logout functionality
"""
import requests
import json

BASE_URL = "http://localhost:8000/api/auth"

def test_logout():
    """Test user logout"""
    print("🧪 Testing Logout...")
    
    # First login to get a session
    login_data = {
        "username": "testuser123",
        "password": "password123"
    }
    
    session = requests.Session()
    
    # Login
    login_response = session.post(f"{BASE_URL}/signin/", 
                                json=login_data,
                                headers={'Content-Type': 'application/json'})
    
    print(f"Login Status: {login_response.status_code}")
    
    if login_response.status_code == 200:
        # Now test logout
        logout_response = session.post(f"{BASE_URL}/signout/", 
                                     headers={'Content-Type': 'application/json'})
        
        print(f"Logout Status Code: {logout_response.status_code}")
        print(f"Logout Response: {logout_response.json()}")
        
        return logout_response.status_code == 200
    else:
        print("Login failed, cannot test logout")
        return False

if __name__ == "__main__":
    print("🚀 Starting Logout Test...\n")
    
    success = test_logout()
    
    if success:
        print("\n✅ Logout test passed!")
    else:
        print("\n❌ Logout test failed!")