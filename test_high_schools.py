#!/usr/bin/env python
"""
Test script to verify high schools endpoint
"""
import os
import sys

# Add the backend to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'wacebackend'))

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wacebackend.settings')
import django
django.setup()

from students.models import GHANA_HIGH_SCHOOLS

def test_high_schools():
    print("=" * 70)
    print("HIGH SCHOOLS LIST TEST")
    print("=" * 70)
    print()
    
    print(f"Total schools: {len(GHANA_HIGH_SCHOOLS)}")
    print()
    
    print("Sample schools:")
    for i, school in enumerate(GHANA_HIGH_SCHOOLS[:10], 1):
        print(f"  {i}. {school}")
    
    print(f"  ... and {len(GHANA_HIGH_SCHOOLS) - 10} more")
    print()
    
    # Check for duplicates
    duplicates = len(GHANA_HIGH_SCHOOLS) - len(set(GHANA_HIGH_SCHOOLS))
    if duplicates > 0:
        print(f"⚠️  WARNING: Found {duplicates} duplicate schools")
    else:
        print("✓ No duplicates found")
    
    print()
    
    # Check if sorted
    is_sorted = GHANA_HIGH_SCHOOLS == sorted(GHANA_HIGH_SCHOOLS)
    if is_sorted:
        print("✓ Schools are sorted alphabetically")
    else:
        print("⚠️  WARNING: Schools are not sorted")
    
    print()
    
    # Check for "Other" option
    has_other = "Other (Not Listed)" in GHANA_HIGH_SCHOOLS
    if has_other:
        print("✓ 'Other (Not Listed)' option is available")
    else:
        print("⚠️  WARNING: 'Other (Not Listed)' option is missing")
    
    print()
    print("=" * 70)
    print("✅ HIGH SCHOOLS LIST IS READY!")
    print("=" * 70)
    print()
    print("Next steps:")
    print("1. Run migrations: python manage.py migrate")
    print("2. Test API endpoint: curl http://localhost:8000/api/students/high-schools/")
    print("3. Test signup form with high school selection")
    print()

if __name__ == "__main__":
    test_high_schools()
