"""
Reset admin password - Run with: python manage.py shell < reset_admin_password.py
"""
from django.contrib.auth.models import User

print("=" * 70)
print("RESETTING ADMIN PASSWORDS")
print("=" * 70)
print()

# Reset password for all admin users
new_password = "Admin123!"

for username in ['admin', 'bassy', 'gradupadmin', 'railwayadmin']:
    try:
        user = User.objects.get(username=username)
        user.set_password(new_password)
        user.is_staff = True
        user.is_superuser = True
        user.save()
        print(f"✓ Reset password for: {username}")
    except User.DoesNotExist:
        print(f"✗ User not found: {username}")

print()
print("=" * 70)
print("NEW PASSWORD FOR ALL ADMINS: Admin123!")
print("=" * 70)
print()
print("Try logging in with:")
print("  Username: admin")
print("  Password: Admin123!")
print()
