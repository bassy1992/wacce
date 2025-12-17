#!/usr/bin/env python
"""
Simple script to populate subjects on Railway
Run this with: railway run python populate_railway_subjects.py
"""
import os
import sys
import django

# Add the wacebackend directory to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'wacebackend'))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wace_api.settings')
django.setup()

# Now import and run the command
from django.core.management import call_command

print("=" * 70)
print("POPULATING SUBJECTS ON RAILWAY")
print("=" * 70)

try:
    call_command('populate_subjects')
    print("\n" + "=" * 70)
    print("✅ SUCCESS! Subjects populated on Railway")
    print("=" * 70)
except Exception as e:
    print("\n" + "=" * 70)
    print(f"❌ ERROR: {e}")
    print("=" * 70)
    sys.exit(1)
