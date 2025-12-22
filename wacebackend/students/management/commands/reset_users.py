"""
Django management command to delete all users and create a fresh admin
Usage: python manage.py reset_users
"""
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User


class Command(BaseCommand):
    help = 'Delete all users and create a fresh admin account'

    def handle(self, *args, **options):
        self.stdout.write("=" * 70)
        self.stdout.write("RESETTING ALL USERS")
        self.stdout.write("=" * 70)
        self.stdout.write("")
        
        # Count existing users
        user_count = User.objects.count()
        self.stdout.write(f"Found {user_count} existing users")
        
        # Delete all users
        User.objects.all().delete()
        self.stdout.write(self.style.SUCCESS("✅ Deleted all users"))
        self.stdout.write("")
        
        # Create fresh admin
        admin = User.objects.create_superuser(
            username='admin',
            email='admin@excelwassce.com',
            password='Admin123!'
        )
        
        self.stdout.write(self.style.SUCCESS("✅ Created new admin user!"))
        self.stdout.write("")
        self.stdout.write("=" * 70)
        self.stdout.write("LOGIN CREDENTIALS")
        self.stdout.write("=" * 70)
        self.stdout.write(f"Username: admin")
        self.stdout.write(f"Password: Admin123!")
        self.stdout.write(f"Email: {admin.email}")
        self.stdout.write("")
        self.stdout.write("Login at:")
        self.stdout.write("  Local: http://localhost:8000/admin/")
        self.stdout.write("  Railway: https://wacce-production.up.railway.app/admin/")
        self.stdout.write("")
