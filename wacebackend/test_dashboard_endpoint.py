#!/usr/bin/env python
"""Test the dashboard API endpoint"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wace_api.settings')
django.setup()

from django.test import RequestFactory, Client
from django.contrib.auth.models import User
from students.views import student_dashboard

# Create a test client
client = Client()

# Get the bassy user
user = User.objects.get(username='bassy')
print(f"Testing dashboard for user: {user.username}")

# Login
client.force_login(user)

# Make request to dashboard
response = client.get('/api/students/dashboard/')

print(f"\nResponse status: {response.status_code}")
print(f"Response content type: {response.get('Content-Type')}")

if response.status_code == 200:
    import json
    data = json.loads(response.content)
    print(f"\nDashboard data:")
    print(f"  Student: {data['student']['name']}")
    print(f"  Programme: {data['programme']['display_name']}")
    print(f"  Total subjects: {data['summary']['total_subjects']}")
    print(f"  Core subjects: {data['summary']['core_subjects_count']}")
    print(f"  Elective subjects: {data['summary']['elective_subjects_count']}")
    
    print(f"\nCore subjects:")
    for subject in data['subjects']['core']:
        print(f"    - {subject['name']} ({subject['code']})")
    
    print(f"\nElective subjects:")
    for subject in data['subjects']['elective']:
        print(f"    - {subject['name']} ({subject['code']})")
else:
    print(f"Error: {response.content}")
