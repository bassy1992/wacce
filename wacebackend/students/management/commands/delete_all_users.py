from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from students.models import Student


class Command(BaseCommand):
    help = 'Delete all users and students (except superusers)'

    def add_arguments(self, parser):
        parser.add_argument(
            '--confirm',
            action='store_true',
            help='Confirm deletion of all users',
        )

    def handle(self, *args, **options):
        if not options['confirm']:
            self.stdout.write(self.style.WARNING(
                '\n⚠️  This will delete ALL users and students (except superusers)!'
            ))
            self.stdout.write(self.style.WARNING(
                'Run with --confirm flag to proceed: python manage.py delete_all_users --confirm'
            ))
            return

        # Count before deletion
        total_users = User.objects.filter(is_superuser=False).count()
        total_students = Student.objects.count()

        self.stdout.write(f"\n📊 Found {total_users} regular users and {total_students} students")
        
        # Delete students first (due to foreign key)
        deleted_students = Student.objects.all().delete()
        self.stdout.write(self.style.SUCCESS(f"✅ Deleted {deleted_students[0]} students"))
        
        # Delete regular users (keep superusers)
        deleted_users = User.objects.filter(is_superuser=False).delete()
        self.stdout.write(self.style.SUCCESS(f"✅ Deleted {deleted_users[0]} regular users"))
        
        # Show remaining superusers
        superusers = User.objects.filter(is_superuser=True)
        if superusers.exists():
            self.stdout.write(f"\n👑 Kept {superusers.count()} superuser(s):")
            for su in superusers:
                self.stdout.write(f"   - {su.username} ({su.email})")
        
        self.stdout.write(self.style.SUCCESS(f"\n✅ Done! Database is clean and ready for new registrations."))
