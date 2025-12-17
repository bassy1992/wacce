#!/usr/bin/env python
"""
Test production settings configuration
"""
import os
import sys
import django

# Set environment variables
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wace_api.settings_production')
os.environ.setdefault('DEBUG', 'False')
os.environ.setdefault('SECRET_KEY', 'test-secret-key-for-validation')

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

try:
    django.setup()
    print("✅ Django setup successful")
    
    from django.conf import settings
    print(f"✅ Settings loaded: DEBUG={settings.DEBUG}")
    print(f"✅ Database engine: {settings.DATABASES['default']['ENGINE']}")
    print(f"✅ Allowed hosts: {settings.ALLOWED_HOSTS}")
    
    # Test database connection
    from django.db import connection
    with connection.cursor() as cursor:
        cursor.execute("SELECT 1")
        print("✅ Database connection successful")
    
    # Test WSGI application
    from django.core.wsgi import get_wsgi_application
    application = get_wsgi_application()
    print("✅ WSGI application created successfully")
    
    print("\n🎉 All production settings tests passed!")
    
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)