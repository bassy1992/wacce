import requests
import json

BASE_URL = 'http://localhost:8000/api/auth'

# You'll need to replace this with a valid token after logging in
TOKEN = 'your_auth_token_here'

headers = {
    'Content-Type': 'application/json',
    'Authorization': f'Token {TOKEN}'
}

def test_get_notifications():
    """Test getting email notification preferences"""
    print("\n=== Testing GET Email Notifications ===")
    response = requests.get(f'{BASE_URL}/email-notifications/', headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

def test_update_notifications():
    """Test updating email notification preferences"""
    print("\n=== Testing UPDATE Email Notifications ===")
    data = {
        'course_updates': True,
        'assignment_reminders': False,
        'announcements': True,
        'weekly_summary': True
    }
    response = requests.post(
        f'{BASE_URL}/email-notifications/',
        headers=headers,
        json=data
    )
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

def test_change_password():
    """Test changing password"""
    print("\n=== Testing Change Password ===")
    data = {
        'current_password': 'oldpassword123',
        'new_password': 'newpassword456',
        'confirm_password': 'newpassword456'
    }
    response = requests.post(
        f'{BASE_URL}/change-password/',
        headers=headers,
        json=data
    )
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

def test_update_profile():
    """Test updating profile"""
    print("\n=== Testing Update Profile ===")
    data = {
        'first_name': 'John',
        'last_name': 'Doe',
        'email': 'john.doe@example.com',
        'phone_number': '+233123456789'
    }
    response = requests.put(
        f'{BASE_URL}/profile/update/',
        headers=headers,
        json=data
    )
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

def test_delete_account():
    """Test account deletion (WARNING: This will delete the account!)"""
    print("\n=== Testing Delete Account (COMMENTED OUT FOR SAFETY) ===")
    print("Uncomment the code below to test account deletion")
    # data = {
    #     'password': 'your_password',
    #     'confirmation': 'DELETE'
    # }
    # response = requests.post(
    #     f'{BASE_URL}/delete-account/',
    #     headers=headers,
    #     json=data
    # )
    # print(f"Status: {response.status_code}")
    # print(f"Response: {json.dumps(response.json(), indent=2)}")

if __name__ == '__main__':
    print("Account Settings API Tests")
    print("=" * 50)
    print("\nNOTE: Update the TOKEN variable with a valid auth token first!")
    print("You can get a token by logging in through the API or admin panel.")
    
    # Uncomment the tests you want to run
    # test_get_notifications()
    # test_update_notifications()
    # test_change_password()  # Be careful with this one!
    # test_update_profile()
    # test_delete_account()  # VERY DANGEROUS - Will delete the account!
    
    print("\n" + "=" * 50)
    print("Tests completed!")
