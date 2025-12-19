import requests
import json

# Test the change password endpoint
BASE_URL = 'http://localhost:8000/api/auth'

# First, let's test if the endpoint exists
print("Testing Change Password Endpoint")
print("=" * 50)

# Test 1: Check if endpoint is accessible (should return 401 without auth)
print("\n1. Testing endpoint accessibility (no auth)...")
response = requests.post(f'{BASE_URL}/change-password/', json={})
print(f"Status Code: {response.status_code}")
print(f"Response: {response.text}")

# Test 2: Try with a test login first
print("\n2. Attempting to login first...")
login_data = {
    'username': 'testuser',  # Replace with actual test user
    'password': 'testpass123'
}
login_response = requests.post(f'{BASE_URL}/signin/', json=login_data)
print(f"Login Status: {login_response.status_code}")

if login_response.status_code == 200:
    data = login_response.json()
    token = data.get('token')
    print(f"Token received: {token[:20]}..." if token else "No token")
    
    # Test 3: Try change password with auth
    print("\n3. Testing change password with authentication...")
    headers = {
        'Authorization': f'Token {token}',
        'Content-Type': 'application/json'
    }
    
    password_data = {
        'current_password': 'testpass123',
        'new_password': 'newpass456',
        'confirm_password': 'newpass456'
    }
    
    change_response = requests.post(
        f'{BASE_URL}/change-password/',
        headers=headers,
        json=password_data
    )
    print(f"Status Code: {change_response.status_code}")
    print(f"Response: {change_response.text}")
else:
    print("Login failed. Create a test user first or update credentials.")

print("\n" + "=" * 50)
