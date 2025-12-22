#!/usr/bin/env python
"""
Reset bassy password on Railway
Run with: railway run python reset_bassy_password.py
"""
import os
import sys
import django

# Setup Django with Railway environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wace_api.settings')

# Add wacebackend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'wacebackend'))

django.setup()

from django.contrib.auth.models import User

print("=" * 70)
print("RESETTING BASSY PASSWORD ON RAILWAY")
print("=" * 70)
print()

try:
    user = User.objects.get(username='bassy')
    user.set_password('1234bassy')
    user.is_staff = True
    user.is_superuser = True
    user.save()
    
    print(f"✅ Success!")
    print(f"Username: {user.username}")
    print(f"Email: {user.email}")
    print(f"Is Staff: {user.is_staff}")
    print(f"Is Superuser: {user.is_superuser}")
    print(f"Password: 1234bassy")
    print()
    print("Try logging in at:")
    print("https://wacce-production.up.railway.app/admin/")
    print()
    
except User.DoesNotExist:
    print("❌ User 'bassy' not found!")
    print()
    print("Available users:")
    for u in User.objects.all()[:10]:
        print(f"  - {u.username} (staff={u.is_staff})")
except Exception as e:
    print(f"❌ Error: {e}")
