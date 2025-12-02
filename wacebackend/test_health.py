#!/usr/bin/env python
"""
Simple script to test if Django can start and the health endpoint works
"""
import os
import sys
import django
from django.conf import settings
from django.test.utils import get_runner

if __name__ == "__main__":
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wace_api.settings_production')
    django.setup()
    
    # Test basic Django functionality
    print("✅ Django settings loaded successfully")
    print(f"DEBUG: {settings.DEBUG}")
    print(f"ALLOWED_HOSTS: {settings.ALLOWED_HOSTS}")
    print(f"DATABASE: {settings.DATABASES['default']['ENGINE']}")
    
    # Test health endpoint
    try:
        from wace_api.health import health_check
        from django.http import HttpRequest
        
        request = HttpRequest()
        response = health_check(request)
        print(f"✅ Health check endpoint works: {response.content.decode()}")
    except Exception as e:
        print(f"❌ Health check failed: {e}")
        sys.exit(1)
    
    print("✅ All tests passed!")