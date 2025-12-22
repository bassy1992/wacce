#!/usr/bin/env python
"""
Test script to verify video protection setup
Run this locally to test if signed URLs are working
"""
import os
import sys

# Add the backend to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'wacebackend'))

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wacebackend.settings')
import django
django.setup()

from courses.utils import generate_signed_video_url

def test_signed_urls():
    print("=" * 70)
    print("VIDEO PROTECTION TEST")
    print("=" * 70)
    print()
    
    # Test video URL
    test_url = "https://tailsandtrailsmedia.sfo3.cdn.digitaloceanspaces.com/videos/Confusing%20English%20Grammar_%20%E2%80%9CIS%E2%80%9D%20or%20%E2%80%9CARE%E2%80%9D_%20(1080p).mp4"
    
    print("1. Testing environment variables...")
    print()
    
    required_vars = [
        'DO_SPACES_ACCESS_KEY',
        'DO_SPACES_SECRET_KEY',
        'DO_SPACES_REGION',
        'DO_SPACES_BUCKET'
    ]
    
    missing_vars = []
    for var in required_vars:
        value = os.getenv(var)
        if value:
            # Mask sensitive values
            if 'KEY' in var:
                display_value = value[:4] + '...' + value[-4:] if len(value) > 8 else '***'
            else:
                display_value = value
            print(f"   ✓ {var}: {display_value}")
        else:
            print(f"   ✗ {var}: NOT SET")
            missing_vars.append(var)
    
    print()
    
    if missing_vars:
        print("❌ ERROR: Missing environment variables!")
        print()
        print("Please set the following variables:")
        for var in missing_vars:
            print(f"   - {var}")
        print()
        print("See VIDEO_PROTECTION_SETUP.md for instructions.")
        return False
    
    print("2. Testing signed URL generation...")
    print()
    print(f"   Original URL: {test_url[:60]}...")
    print()
    
    try:
        signed_url = generate_signed_video_url(test_url, expiration=3600)
        
        if signed_url == test_url:
            print("   ⚠️  WARNING: URL was not signed (returned original URL)")
            print("   This might indicate a configuration issue.")
            return False
        
        if 'X-Amz-Algorithm' in signed_url:
            print("   ✓ Signed URL generated successfully!")
            print()
            print(f"   Signed URL: {signed_url[:80]}...")
            print()
            print("   URL contains signature parameters:")
            if 'X-Amz-Algorithm' in signed_url:
                print("      ✓ X-Amz-Algorithm")
            if 'X-Amz-Credential' in signed_url:
                print("      ✓ X-Amz-Credential")
            if 'X-Amz-Date' in signed_url:
                print("      ✓ X-Amz-Date")
            if 'X-Amz-Expires' in signed_url:
                print("      ✓ X-Amz-Expires")
            if 'X-Amz-Signature' in signed_url:
                print("      ✓ X-Amz-Signature")
            print()
            print("=" * 70)
            print("✅ VIDEO PROTECTION IS WORKING!")
            print("=" * 70)
            print()
            print("Next steps:")
            print("1. Deploy to Railway: git push")
            print("2. Test video playback in your app")
            print("3. Verify URLs expire after 1 hour")
            print()
            return True
        else:
            print("   ❌ ERROR: URL does not contain signature parameters")
            return False
            
    except Exception as e:
        print(f"   ❌ ERROR: {str(e)}")
        print()
        print("This might indicate:")
        print("   - Invalid credentials")
        print("   - Network connectivity issues")
        print("   - Incorrect bucket/region configuration")
        return False

if __name__ == "__main__":
    success = test_signed_urls()
    sys.exit(0 if success else 1)
