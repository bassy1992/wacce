#!/usr/bin/env python3
"""
Test script for authentication endpoints
"""
import requests
import json

BASE_URL = "http://localhost:8000/api/auth"

def test_signup():
    """Test user registration"""
    print("🧪 Testing Signup...")
    
    # First, let's get a programme ID
    programmes_response = requests.get("http://localhost:8000/api/courses/programmes/")
    if programmes_response.status_code == 200:
        programmes = programmes_response.json()['programmes']
        programme_id = programmes[0]['id'] if programmes else 1
    else:
        programme_id = 1
    
    signup_data = {
        "username": "testuser123",
        "email": "test@example.com",
        "password": "password123",
        "first_name": "John",
        "last_name": "Doe",
        "phone_number": "+233123456789",
        "date_of_birth": "2000-01-15",
        "programme_id": programme_id,
        "previous_school": "Test Senior High School",
        "wassce_year": 2020,
        "index_number": "TEST123456"
    }
    
    response = requests.post(f"{BASE_URL}/signup/", 
                           json=signup_data,
                           headers={'Content-Type': 'application/json'})
    
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
    
    return response.status_code == 201

def test_signin():
    """Test user login"""
    print("\n🧪 Testing Signin...")
    
    signin_data = {
        "username": "testuser123",
        "password": "password123"
    }
    
    response = requests.post(f"{BASE_URL}/signin/", 
                           json=signin_data,
                           headers={'Content-Type': 'application/json'})
    
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
    
    return response.status_code == 200

def test_check_availability():
    """Test availability check"""
    print("\n🧪 Testing Check Availability...")
    
    response = requests.get(f"{BASE_URL}/check-availability/?username=testuser123&email=test@example.com")
    
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
    
    return response.status_code == 200

if __name__ == "__main__":
    print("🚀 Starting Authentication Tests...\n")
    
    # Test signup
    signup_success = test_signup()
    
    # Test signin if signup was successful
    if signup_success:
        test_signin()
    
    # Test availability check
    test_check_availability()
    
    print("\n✅ Tests completed!")