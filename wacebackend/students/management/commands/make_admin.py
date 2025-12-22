"""
Django management command to make a user admin
Usage: python manage.py make_admin <username>
"""
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User


class Command(BaseCommand):
    help = 'Make a user admin (staff and superuser)'

    def add_arguments(self, parser):
        parser.add_argument('username', type=str, help='Username to make admin')

    def handle(self, *args, **options):
        username = options['username']
        
        try:
            user = User.objects.get(username=username)
            user.is_staff = True
            user.is_superuser = True
            user.save()
            
            self.stdout.write(self.style.SUCCESS(f'✅ Successfully made {username} an admin!'))
            self.stdout.write(f'User: {username}')
            self.stdout.write(f'Email: {user.email}')
            self.stdout.write(f'Is Staff: {user.is_staff}')
            self.stdout.write(f'Is Superuser: {user.is_superuser}')
            
        except User.DoesNotExist:
            self.stdout.write(self.style.ERROR(f'❌ User "{username}" does not exist!'))
            self.stdout.write('Available users:')
            for u in User.objects.all()[:10]:
                self.stdout.write(f'  - {u.username} (staff={u.is_staff}, super={u.is_superuser})')
