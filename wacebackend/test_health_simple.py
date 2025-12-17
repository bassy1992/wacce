#!/usr/bin/env python
"""
Test health endpoint without database dependency
"""
import os
import sys
import django
from django.test import RequestFactory

# Set environment variables
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wace_api.settings_production')
os.environ.setdefault('DEBUG', 'False')
os.environ.setdefault('SECRET_KEY', 'test-secret-key-for-validation')

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

try:
    django.setup()
    print("✅ Django setup successful")
    
    # Test health endpoint
    from wace_api.health import health_check
    
    # Create a mock request
    factory = RequestFactory()
    request = factory.get('/api/health/')
    
    # Call the health check
    response = health_check(request)
    print(f"✅ Health check response status: {response.status_code}")
    print(f"✅ Health check response content: {response.content.decode()}")
    
    if response.status_code == 200:
        print("🎉 Health check endpoint works correctly!")
    else:
        print(f"❌ Health check failed with status {response.status_code}")
        sys.exit(1)
    
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)