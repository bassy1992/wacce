#!/usr/bin/env python3
"""
Test script for login functionality
"""
import requests
import json

BASE_URL = "http://localhost:8000/api/auth"

def test_login():
    """Test user login"""
    print("🧪 Testing Login...")
    
    # Test with existing user
    login_data = {
        "username": "testuser123",
        "password": "password123"
    }
    
    response = requests.post(f"{BASE_URL}/signin/", 
                           json=login_data,
                           headers={'Content-Type': 'application/json'})
    
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
    
    return response.status_code == 200

def test_login_with_email():
    """Test user login with email"""
    print("\n🧪 Testing Login with Email...")
    
    # Test with email instead of username
    login_data = {
        "username": "test@example.com",  # Using email as username
        "password": "password123"
    }
    
    response = requests.post(f"{BASE_URL}/signin/", 
                           json=login_data,
                           headers={'Content-Type': 'application/json'})
    
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
    
    return response.status_code == 200

def test_invalid_login():
    """Test invalid login"""
    print("\n🧪 Testing Invalid Login...")
    
    login_data = {
        "username": "nonexistent",
        "password": "wrongpassword"
    }
    
    response = requests.post(f"{BASE_URL}/signin/", 
                           json=login_data,
                           headers={'Content-Type': 'application/json'})
    
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
    
    return response.status_code == 401

if __name__ == "__main__":
    print("🚀 Starting Login Tests...\n")
    
    # Test valid login
    test_login()
    
    # Test login with email
    test_login_with_email()
    
    # Test invalid login
    test_invalid_login()
    
    print("\n✅ Tests completed!")