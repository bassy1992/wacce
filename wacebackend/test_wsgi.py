#!/usr/bin/env python
"""
Test WSGI application startup
"""
import os
import sys

# Set environment variables
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wace_api.settings_production')
os.environ.setdefault('DEBUG', 'False')
os.environ.setdefault('SECRET_KEY', 'test-secret-key-for-validation')

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

try:
    print("Testing WSGI application...")
    
    # Import and create WSGI application
    from wace_api.wsgi import application
    print("✅ WSGI application imported successfully")
    
    # Test that it's callable
    if callable(application):
        print("✅ WSGI application is callable")
    else:
        print("❌ WSGI application is not callable")
        sys.exit(1)
    
    print("🎉 WSGI application test passed!")
    
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)